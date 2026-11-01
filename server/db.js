import 'dotenv/config';
import pg from 'pg';

export const pool = new pg.Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT || 15433),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  max: 10,
  connectionTimeoutMillis: 10000,
  statement_timeout: 15000,
});
pool.on('error', (error) => console.error('Conexão PostgreSQL:', error.code || error.message));

export async function transaction(work) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await work(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export function fail(status, message) {
  throw Object.assign(new Error(message), { status });
}

export async function lockAdmin(client, userId, required = true) {
  const { rows } = await client.query(
    'SELECT usuario_id FROM administracao WHERE singleton = true FOR UPDATE',
  );
  const isAdmin = rows[0]?.usuario_id === userId;
  if (required && !isAdmin) fail(403, 'Somente o administrador pode realizar esta ação.');
  return isAdmin;
}
