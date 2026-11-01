import { randomBytes, scrypt as scryptCallback, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { pool, fail } from './db.js';

const scrypt = promisify(scryptCallback);
export const digest = (value) => createHash('sha256').update(value).digest('hex');
export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const key = await scrypt(password, salt, 64);
  return `scrypt:${salt}:${key.toString('hex')}`;
}
export async function verifyPassword(password, hash) {
  const [, salt, stored] = (hash || '').split(':');
  // Executa scrypt também para contas inexistentes.
  const key = await scrypt(String(password), salt || 'cajoo-nonexistent-account', 64);
  const expected = Buffer.from(stored || '00'.repeat(64), 'hex');
  return expected.length === key.length && timingSafeEqual(key, expected) && !!hash;
}
export function validPassword(password) {
  if (
    typeof password !== 'string' ||
    password.length < 8 ||
    password.length > 128 ||
    password === '12345678'
  ) {
    fail(400, 'Escolha uma senha de 8 a 128 caracteres, diferente de 12345678.');
  }
  return password;
}

const cookieName = 'cajoo_session';
const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.APP_ENV === 'production',
  sameSite: 'lax',
  path: '/',
});
export function clearSession(res) {
  res.clearCookie(cookieName, cookieOptions());
}
export async function createSession(res, userId) {
  const token = randomBytes(32).toString('hex');
  const csrf = randomBytes(32).toString('hex');
  await pool.query(
    "INSERT INTO sessoes (token_hash, usuario_id, csrf_token, expira_em) VALUES ($1,$2,$3,now() + interval '8 hours')",
    [digest(token), userId, csrf],
  );
  res.cookie(cookieName, token, { ...cookieOptions(), maxAge: 8 * 3600 * 1000 });
  return csrf;
}
export function publicUser(row) {
  return {
    id: row.id,
    name: row.nome,
    email: row.email || '',
    role: row.admin ? 'admin' : 'member',
    mustChangePassword: row.trocar_senha,
    position: row.cargo,
    photoUrl: row.foto,
    bio: row.bio,
    visible: row.visivel,
    order: row.ordem,
    year: row.gestao,
    hasAccess: !!row.email,
  };
}
export async function authenticate(req, _res, next) {
  try {
    const token = (req.headers.cookie || '')
      .split(';')
      .map((v) => v.trim())
      .find((v) => v.startsWith(`${cookieName}=`))
      ?.slice(cookieName.length + 1);
    if (token && /^[a-f0-9]{64}$/.test(token)) {
      const { rows } = await pool.query(
        `SELECT u.*, (a.usuario_id = u.id) AS admin, s.csrf_token, s.token_hash
        FROM sessoes s JOIN usuarios u ON u.id = s.usuario_id CROSS JOIN administracao a
        WHERE s.token_hash = $1 AND s.expira_em > now()`,
        [digest(token)],
      );
      req.account = rows[0];
    }
    next();
  } catch (error) {
    next(error);
  }
}
export function requireLogin(req, _res, next) {
  if (!req.account)
    return next(Object.assign(new Error('Entre na sua conta para continuar.'), { status: 401 }));
  next();
}
export function requireReady(req, _res, next) {
  if (req.account.trocar_senha)
    return next(Object.assign(new Error('Atualize sua senha inicial para continuar.'), { status: 403 }));
  next();
}
export function protectWrites(req, _res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  // Cabeçalho não simples + sem CORS impedem submissão de formulários de outros sites.
  if (req.get('X-Requested-With') !== 'CAJOO')
    return next(Object.assign(new Error('Requisição não autorizada.'), { status: 403 }));
  const origin = req.get('Origin');
  const allowed =
    process.env.PUBLIC_ORIGIN ||
    (process.env.APP_ENV === 'production' ? 'https://cajoo.fsw-ifc.brdrive.cloud' : null);
  if (origin && (allowed ? origin !== allowed : new URL(origin).host !== req.get('host'))) {
    return next(Object.assign(new Error('Origem da requisição não autorizada.'), { status: 403 }));
  }
  if (req.account && req.path !== '/auth/login' && req.get('X-CSRF-Token') !== req.account.csrf_token) {
    return next(
      Object.assign(new Error('Sua sessão mudou. Atualize a página e tente novamente.'), { status: 403 }),
    );
  }
  next();
}
export async function limitLogin(req, email) {
  const keys = [digest(`ip:${req.ip}`), digest(`account:${req.ip}:${email}`)];
  for (const [index, key] of keys.entries()) {
    const { rows } = await pool.query(
      `INSERT INTO limites_login VALUES ($1,1,now() + interval '15 minutes')
      ON CONFLICT (chave) DO UPDATE SET tentativas = CASE WHEN limites_login.reinicia_em < now() THEN 1 ELSE limites_login.tentativas + 1 END,
      reinicia_em = CASE WHEN limites_login.reinicia_em < now() THEN now() + interval '15 minutes' ELSE limites_login.reinicia_em END RETURNING tentativas`,
      [key],
    );
    if (rows[0].tentativas > (index ? (req.account ? 30 : 10) : 100))
      fail(429, 'Muitas tentativas. Aguarde 15 minutos e tente novamente.');
  }
}
