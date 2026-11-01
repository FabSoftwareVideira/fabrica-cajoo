import 'dotenv/config';
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import pg from 'pg';

const defaultDirectory = fileURLToPath(new URL('../db/migrations/', import.meta.url));
const lockId = 724091026;

export async function readMigrations(directory = defaultDirectory) {
  const files = (await readdir(directory)).filter((name) => name.endsWith('.sql'));
  const versions = new Set();
  const migrations = await Promise.all(
    files.map(async (filename) => {
      const match = /^(V(\d{4,})|R)__([a-z0-9_]+)\.sql$/.exec(filename);
      if (!match)
        throw new Error(`Nome inválido: ${filename}. Use V0001__descricao.sql ou R__descricao.sql.`);
      const version = match[2] ? Number(match[2]) : null;
      if (version !== null && (!Number.isSafeInteger(version) || versions.has(version))) {
        throw new Error(`Versão inválida ou duplicada: ${filename}`);
      }
      if (version !== null) versions.add(version);
      // CRLF e LF são equivalentes; o checkout Windows não deve causar reaplicação.
      const sql = (await readFile(path.join(directory, filename), 'utf8'))
        .replace(/^\uFEFF/, '')
        .replace(/\r\n/g, '\n');
      if (!sql.trim()) throw new Error(`Migração vazia: ${filename}`);
      return {
        filename,
        version,
        kind: version === null ? 'repeatable' : 'versioned',
        sql,
        checksum: createHash('sha256').update(sql).digest('hex'),
      };
    }),
  );
  return migrations.sort(
    (a, b) => (a.version ?? Infinity) - (b.version ?? Infinity) || a.filename.localeCompare(b.filename),
  );
}

export async function migrate(
  client,
  { directory = defaultDirectory, log = console.log, lockWaitMs = 60000 } = {},
) {
  const migrations = await readMigrations(directory);
  let locked = false;
  try {
    const deadline = Date.now() + lockWaitMs;
    do {
      const result = await client.query('SELECT pg_try_advisory_lock($1) AS locked', [lockId]);
      locked = result.rows[0].locked;
      if (locked) break;
      if (Date.now() >= deadline)
        throw new Error('Outra migração está em execução. Tente novamente após ela terminar.');
      await new Promise((resolve) => setTimeout(resolve, 250));
    } while (!locked);

    await client.query(`CREATE TABLE IF NOT EXISTS public.schema_migrations (
      id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      filename text NOT NULL,
      checksum char(64) NOT NULL,
      kind text NOT NULL CHECK (kind IN ('versioned', 'repeatable')),
      success boolean NOT NULL,
      executed_at timestamptz NOT NULL DEFAULT clock_timestamp(),
      execution_ms integer NOT NULL,
      error_message text,
      app_version text
    )`);
    await client.query(`CREATE INDEX IF NOT EXISTS schema_migrations_filename_idx
      ON public.schema_migrations (filename, id DESC)`);
    const { rows } = await client.query(`SELECT DISTINCT ON (filename) filename, checksum, kind
      FROM public.schema_migrations WHERE success = true ORDER BY filename, id DESC`);
    const applied = new Map(rows.map((row) => [row.filename, row]));

    // Valida todo o histórico antes de executar qualquer alteração pendente.
    for (const row of rows.filter((item) => item.kind === 'versioned')) {
      const file = migrations.find((item) => item.filename === row.filename);
      if (!file || file.checksum !== row.checksum) {
        throw new Error(
          `Migração já aplicada foi removida ou editada: ${row.filename}. Restaure-a e crie uma nova V para alterar a estrutura.`,
        );
      }
    }
    const lastVersion = Math.max(
      0,
      ...migrations
        .filter((item) => item.version !== null && applied.has(item.filename))
        .map((item) => item.version),
    );
    for (const file of migrations) {
      if (file.version !== null && !applied.has(file.filename) && file.version < lastVersion) {
        throw new Error(`Migração fora de ordem: ${file.filename}. Use uma versão maior que ${lastVersion}.`);
      }
    }

    let count = 0;
    for (const file of migrations) {
      if (applied.get(file.filename)?.checksum === file.checksum) {
        log(`Já aplicada: ${file.filename}`);
        continue;
      }
      const start = Date.now();
      const record = (success, error = null) =>
        client.query(
          `INSERT INTO public.schema_migrations
        (filename, checksum, kind, success, execution_ms, error_message, app_version)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            file.filename,
            file.checksum,
            file.kind,
            success,
            Date.now() - start,
            error,
            process.env.APP_VERSION || 'local',
          ],
        );
      try {
        await client.query('BEGIN');
        await client.query("SET LOCAL lock_timeout = '15s'");
        await client.query("SET LOCAL statement_timeout = '5min'");
        await client.query(file.sql);
        await record(true);
        await client.query('COMMIT');
        count++;
        log(`Aplicada: ${file.filename}`);
      } catch (error) {
        await client.query('ROLLBACK');
        await record(false, error.message);
        throw new Error(`Falha em ${file.filename}: ${error.message}`, { cause: error });
      }
    }
    log(`${count} migração(ões) aplicada(s). Banco atualizado.`);
    return count;
  } finally {
    if (locked) await client.query('SELECT pg_advisory_unlock($1)', [lockId]);
  }
}

async function main() {
  const client = new pg.Client({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT || 5432),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    connectionTimeoutMillis: 15000,
    application_name: 'cajoo-migrations',
  });
  try {
    await client.connect();
    await migrate(client);
  } finally {
    await client.end();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
