import { randomUUID } from 'node:crypto';
import { pool, transaction } from './db.js';
import { hashPassword } from './security.js';
import { migrate } from '../scripts/migrate.js';

export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query("SELECT to_regclass('public.administracao') AS ready");
    // Em produção o workflow aplica os arquivos novos. Uma imagem anterior não
    // deve reaplicar scripts repetíveis antigos depois de uma atualização só SQL.
    if (!rows[0].ready || process.env.APP_ENV !== 'production') await migrate(client);
  } finally {
    client.release();
  }
  await transaction(async (db) => {
    await db.query('SELECT pg_advisory_xact_lock(724091027)');
    if ((await db.query('SELECT singleton FROM administracao')).rowCount) return;
    const id = randomUUID();
    const password = process.env.INITIAL_ADMIN_PASSWORD || '123456';
    await db.query(
      `INSERT INTO usuarios (id,nome,email,senha_hash) VALUES ($1,'Administrador inicial','admin@admin.com',$2)`,
      [id, await hashPassword(password)],
    );
    await db.query('INSERT INTO administracao (usuario_id) VALUES ($1)', [id]);
    const members = [
      ['Gustavo', 'Presidente', 'gustavo'],
      ['Lucas', 'Vice-presidente', 'lucas'],
      ['Gabriela', 'Diretora de comunicação', 'gabriela'],
      ['Ana Paula', 'Secretária-geral', 'ana'],
      ['Willian', 'Tesoureiro', 'willian'],
      ['Calebe', 'Suplente', 'calebe'],
      ['Iarla', 'Suplente', 'iarla'],
      ['Alexandre', 'Suplente', 'alexandre'],
      ['Davi', 'Suplente', 'davi'],
    ];
    for (const [order, [name, position, photo]] of members.entries()) {
      await db.query(`INSERT INTO usuarios (id,nome,cargo,foto,visivel,ordem) VALUES ($1,$2,$3,$4,true,$5)`, [
        randomUUID(),
        name,
        position,
        `/team/${photo}.webp`,
        order,
      ]);
    }
    console.log('Banco inicializado. Primeiro acesso disponível; troca de senha obrigatória.');
  });
  await pool.query('DELETE FROM sessoes WHERE expira_em < now()');
  await pool.query('DELETE FROM limites_login WHERE reinicia_em < now()');
}
