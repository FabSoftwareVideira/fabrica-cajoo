import express from 'express';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { pool, transaction, lockAdmin, fail } from './db.js';
import {
  authenticate,
  protectWrites,
  requireLogin,
  requireReady,
  publicUser,
  hashPassword,
  verifyPassword,
  validPassword,
  createSession,
  clearSession,
  limitLogin,
} from './security.js';

export const api = express.Router();
const route = (fn) => (req, res, next) => Promise.resolve(fn(req, res)).catch(next);
function uuid(v) {
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(v))
    fail(400, 'Identificador inválido.');
  return v;
}
function id(v) {
  if (!/^[1-9]\d{0,17}$/.test(String(v))) fail(400, 'Identificador inválido.');
  return String(v);
}
function text(v, max, label, required = true) {
  if (typeof v !== 'string' || v.trim().length > max || (required && !v.trim()))
    fail(400, `Preencha ${label} corretamente (até ${max} caracteres).`);
  return v.trim();
}
function email(v) {
  const result = text(v, 254, 'o e-mail').toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result)) fail(400, 'Informe um e-mail válido.');
  return result;
}
function passwordInput(v) {
  if (typeof v !== 'string' || !v.length || v.length > 128)
    fail(400, 'Informe sua senha (até 128 caracteres).');
  return v;
}
function date(v) {
  if (
    typeof v !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(v) ||
    !Number.isFinite(Date.parse(v)) ||
    new Date(v).toISOString().slice(0, 10) !== v ||
    Number(v.slice(0, 4)) < 2000
  )
    fail(400, 'Informe uma data válida.');
  return v;
}
function integer(v, min, max) {
  if (!Number.isInteger(v) || v < min || v > max) fail(400, 'Valor numérico inválido.');
  return v;
}
function boolean(v) {
  if (typeof v !== 'boolean') fail(400, 'Seleção inválida.');
  return v;
}
function imageUrl(v) {
  const url = text(v, 2048, 'a imagem', false);
  if (!url) return '';
  if (/^\/team\/[a-z]+\.webp$/.test(url) || /^\/api\/media\/[a-f0-9-]{36}$/.test(url)) return url;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:' && !parsed.username && !parsed.password) return parsed.href;
  } catch {
    /* inválida */
  }
  fail(400, 'Use uma imagem enviada pelo painel ou um endereço HTTPS.');
}
const userSelect = 'SELECT u.*, (a.usuario_id = u.id) AS admin FROM usuarios u CROSS JOIN administracao a';
const noticeSelect = `SELECT c.*, to_char(c.data,'YYYY-MM-DD') AS iso_date, (d.posicao IS NOT NULL) AS featured FROM comunicados c LEFT JOIN destaques d ON d.comunicado_id=c.id`;
const gallerySelect = `SELECT g.*, to_char(g.data,'YYYY-MM-DD') AS iso_date, (d.posicao IS NOT NULL) AS featured FROM galeria g LEFT JOIN destaques d ON d.galeria_id=g.id`;
const notice = (r) => ({
  id: r.id,
  title: r.nome,
  description: r.descricao,
  category: r.categoria,
  date: r.iso_date,
  content: r.conteudo || r.descricao,
  author: r.autor,
  tags: r.tags,
  featured: r.featured,
});
const gallery = (r) => ({
  id: r.id,
  title: r.nome,
  description: r.descricao,
  category: r.categoria,
  eventDate: r.iso_date,
  location: r.local,
  galleryImages: r.imagens,
  mainImage: r.imagens[0],
  featured: r.featured,
});

api.use((_req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
api.get(
  '/health',
  route(async (_req, res) => {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  }),
);
api.get(
  '/content',
  route(async (_req, res) => {
    // Snapshot consistente: uma transferência de destaque não duplica os resultados.
    const result = await transaction(async (db) => {
      await db.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY');
      const notices = (await db.query(`${noticeSelect} ORDER BY c.data DESC,c.id DESC`)).rows.map(notice);
      const galleries = (await db.query(`${gallerySelect} ORDER BY g.data DESC,g.id DESC`)).rows.map(gallery);
      const team = (
        await db.query('SELECT id,nome,cargo,foto,bio,gestao FROM usuarios WHERE visivel ORDER BY ordem,nome')
      ).rows.map((r) => ({
        id: r.id,
        name: r.nome,
        role: r.cargo,
        photoUrl: r.foto,
        bio: r.bio,
        year: r.gestao,
      }));
      return { notices, galleries, team };
    });
    res.json(result);
  }),
);
api.get(
  '/media/:id',
  route(async (req, res) => {
    const { rows } = await pool.query('SELECT conteudo FROM midias WHERE id=$1', [uuid(req.params.id)]);
    if (!rows[0]) fail(404, 'Imagem não encontrada.');
    res
      .set({
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      })
      .send(rows[0].conteudo);
  }),
);
api.use(authenticate, protectWrites);
api.get('/auth/session', (req, res) =>
  res.json({ user: req.account ? publicUser(req.account) : null, csrf: req.account?.csrf_token || '' }),
);
api.post(
  '/auth/login',
  route(async (req, res) => {
    const address = email(req.body.email);
    const password = passwordInput(req.body.password);
    await limitLogin(req, address);
    const { rows } = await pool.query(`${userSelect} WHERE u.email=$1`, [address]);
    if (!(await verifyPassword(password, rows[0]?.senha_hash))) fail(401, 'E-mail ou senha incorretos.');
    if (req.account) await pool.query('DELETE FROM sessoes WHERE token_hash=$1', [req.account.token_hash]);
    const csrf = await createSession(res, rows[0].id);
    res.json({ user: publicUser(rows[0]), csrf });
  }),
);
api.use(requireLogin);
api.post(
  '/auth/logout',
  route(async (req, res) => {
    await pool.query('DELETE FROM sessoes WHERE token_hash=$1', [req.account.token_hash]);
    clearSession(res);
    res.status(204).end();
  }),
);
api.put(
  '/auth/password',
  route(async (req, res) => {
    const current = passwordInput(req.body.currentPassword);
    const next = validPassword(req.body.password);
    await limitLogin(req, req.account.email);
    if (next === current) fail(400, 'A nova senha deve ser diferente da senha atual.');
    await transaction(async (db) => {
      const { rows } = await db.query('SELECT senha_hash FROM usuarios WHERE id=$1 FOR UPDATE', [
        req.account.id,
      ]);
      if (!rows[0] || !(await verifyPassword(current, rows[0].senha_hash)))
        fail(400, 'Senha atual incorreta.');
      await db.query('UPDATE usuarios SET senha_hash=$2,trocar_senha=false WHERE id=$1', [
        req.account.id,
        await hashPassword(next),
      ]);
      await db.query('DELETE FROM sessoes WHERE usuario_id=$1', [req.account.id]);
    });
    const csrf = await createSession(res, req.account.id);
    const { rows } = await pool.query(`${userSelect} WHERE u.id=$1`, [req.account.id]);
    res.json({ user: publicUser(rows[0]), csrf });
  }),
);
api.use(requireReady);
api.get(
  '/people',
  route(async (req, res) => {
    const { rows } = await pool.query(
      `${userSelect} WHERE a.usuario_id=$1 OR u.id=$1 ORDER BY u.ordem,u.nome`,
      [req.account.id],
    );
    res.json(rows.map(publicUser));
  }),
);
function profile(b) {
  return [
    text(b.name, 120, 'o nome'),
    text(b.position, 120, 'o cargo', false),
    imageUrl(b.photoUrl),
    text(b.bio, 1000, 'a apresentação', false),
    boolean(b.visible),
    integer(b.order, 0, 999),
    integer(b.year, 2000, 2200),
  ];
}
api.post(
  '/people',
  route(async (req, res) => {
    const data = profile(req.body),
      address = req.body.email ? email(req.body.email) : null;
    const password = address ? await hashPassword(validPassword(req.body.password)) : null;
    const personId = randomUUID();
    await transaction(async (db) => {
      await lockAdmin(db, req.account.id);
      await db.query(
        'INSERT INTO usuarios (id,nome,cargo,foto,bio,visivel,ordem,gestao,email,senha_hash) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
        [personId, ...data, address, password],
      );
    });
    res.status(201).json({ id: personId });
  }),
);
api.put(
  '/people/:id',
  route(async (req, res) => {
    const personId = uuid(req.params.id),
      data = profile(req.body);
    await transaction(async (db) => {
      const admin = await lockAdmin(db, req.account.id, false);
      if (!admin && req.account.id !== personId) fail(403, 'Você pode editar somente o próprio perfil.');
      const { rows } = await db.query('SELECT * FROM usuarios WHERE id=$1 FOR UPDATE', [personId]);
      if (!rows[0]) fail(404, 'Pessoa não encontrada.');
      const old = rows[0],
        address = req.body.email ? email(req.body.email) : null;
      if (old.email && !address) fail(400, 'Uma conta com acesso deve manter seu e-mail.');
      let password = old.senha_hash,
        reset = old.trocar_senha;
      if (address !== old.email || req.body.password) {
        if (personId === req.account.id) {
          if (req.body.password) fail(400, 'Altere sua senha na seção Minha conta.');
          await limitLogin(req, req.account.email);
          if (!(await verifyPassword(passwordInput(req.body.currentPassword), old.senha_hash)))
            fail(400, 'Senha atual incorreta.');
        }
        if (req.body.password || (!old.email && address)) {
          password = await hashPassword(validPassword(req.body.password));
          reset = true;
        }
        await db.query('DELETE FROM sessoes WHERE usuario_id=$1 AND token_hash<>$2', [
          personId,
          req.account.token_hash,
        ]);
      }
      await db.query(
        'UPDATE usuarios SET nome=$2,cargo=$3,foto=$4,bio=$5,visivel=$6,ordem=$7,gestao=$8,email=$9,senha_hash=$10,trocar_senha=$11 WHERE id=$1',
        [personId, ...data, address, password, reset],
      );
    });
    res.json({ ok: true });
  }),
);
api.delete(
  '/people/:id',
  route(async (req, res) => {
    const personId = uuid(req.params.id);
    await limitLogin(req, req.account.email);
    if (!(await verifyPassword(passwordInput(req.body.password), req.account.senha_hash)))
      fail(400, 'Senha incorreta.');
    await transaction(async (db) => {
      const admin = await lockAdmin(db, req.account.id, false);
      if (!admin && personId !== req.account.id) fail(403, 'Você pode remover somente a própria conta.');
      if ((await db.query('SELECT 1 FROM administracao WHERE usuario_id=$1', [personId])).rowCount)
        fail(409, 'Transfira a administração para outra conta antes de remover esta conta.');
      if (!(await db.query('DELETE FROM usuarios WHERE id=$1', [personId])).rowCount)
        fail(404, 'Pessoa não encontrada.');
    });
    if (personId === req.account.id) clearSession(res);
    res.status(204).end();
  }),
);
api.post(
  '/admin/transfer',
  route(async (req, res) => {
    const target = uuid(req.body.userId);
    await limitLogin(req, req.account.email);
    if (!(await verifyPassword(passwordInput(req.body.password), req.account.senha_hash)))
      fail(400, 'Senha incorreta.');
    await transaction(async (db) => {
      await lockAdmin(db, req.account.id);
      if (target === req.account.id) fail(400, 'Escolha outra pessoa para administrar.');
      const { rows } = await db.query('SELECT email,trocar_senha FROM usuarios WHERE id=$1', [target]);
      if (!rows[0]?.email || rows[0].trocar_senha)
        fail(
          409,
          'A outra pessoa precisa acessar sua conta e trocar a senha inicial antes de receber a administração.',
        );
      await db.query('UPDATE administracao SET usuario_id=$1 WHERE singleton=true', [target]);
    });
    res.json({ ok: true });
  }),
);
function noticeData(b) {
  const category = text(b.category, 40, 'a categoria');
  if (!['Geral', 'Acadêmico', 'Eventos', 'Oportunidades', 'Estágio'].includes(category))
    fail(400, 'Categoria inválida.');
  if (!Array.isArray(b.tags) || b.tags.length > 10) fail(400, 'Use até 10 palavras-chave.');
  return [
    text(b.title, 200, 'o título'),
    text(b.description, 2000, 'o resumo'),
    category,
    date(b.date),
    text(b.content, 30000, 'o texto'),
    text(b.author, 120, 'a autoria'),
    b.tags.map((t) => text(t, 40, 'as palavras-chave')),
  ];
}
api.post(
  '/notices',
  route(async (req, res) => {
    const { rows } = await pool.query(
      'INSERT INTO comunicados (nome,descricao,categoria,data,conteudo,autor,tags) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id',
      noticeData(req.body),
    );
    res.status(201).json({ id: rows[0].id });
  }),
);
api.put(
  '/notices/:id',
  route(async (req, res) => {
    if (
      !(
        await pool.query(
          'UPDATE comunicados SET nome=$2,descricao=$3,categoria=$4,data=$5,conteudo=$6,autor=$7,tags=$8 WHERE id=$1',
          [id(req.params.id), ...noticeData(req.body)],
        )
      ).rowCount
    )
      fail(404, 'Recado não encontrado.');
    res.json({ ok: true });
  }),
);
api.delete(
  '/notices/:id',
  route(async (req, res) => {
    if (!(await pool.query('DELETE FROM comunicados WHERE id=$1', [id(req.params.id)])).rowCount)
      fail(404, 'Recado não encontrado.');
    res.status(204).end();
  }),
);
function galleryData(b) {
  if (!Array.isArray(b.galleryImages) || b.galleryImages.length < 1 || b.galleryImages.length > 12)
    fail(400, 'Inclua de 1 a 12 imagens no álbum.');
  const images = b.galleryImages.map(imageUrl);
  if (images.some((i) => !i)) fail(400, 'Informe todas as imagens.');
  return [
    text(b.title, 200, 'o título'),
    text(b.description, 2000, 'a descrição'),
    text(b.category, 60, 'a categoria'),
    date(b.eventDate),
    text(b.location, 160, 'o local', false),
    images,
  ];
}
api.post(
  '/gallery',
  route(async (req, res) => {
    const { rows } = await pool.query(
      'INSERT INTO galeria (nome,descricao,categoria,data,local,imagens) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id',
      galleryData(req.body),
    );
    res.status(201).json({ id: rows[0].id });
  }),
);
api.put(
  '/gallery/:id',
  route(async (req, res) => {
    if (
      !(
        await pool.query(
          'UPDATE galeria SET nome=$2,descricao=$3,categoria=$4,data=$5,local=$6,imagens=$7,atualizado_em=now() WHERE id=$1',
          [id(req.params.id), ...galleryData(req.body)],
        )
      ).rowCount
    )
      fail(404, 'Álbum não encontrado.');
    res.json({ ok: true });
  }),
);
api.delete(
  '/gallery/:id',
  route(async (req, res) => {
    if (!(await pool.query('DELETE FROM galeria WHERE id=$1', [id(req.params.id)])).rowCount)
      fail(404, 'Álbum não encontrado.');
    res.status(204).end();
  }),
);
api.put(
  '/highlights/:kind/:id',
  route(async (req, res) => {
    const column =
      req.params.kind === 'notice' ? 'comunicado_id' : req.params.kind === 'gallery' ? 'galeria_id' : null;
    if (!column) fail(400, 'Tipo de destaque inválido.');
    const entity = id(req.params.id),
      enabled = boolean(req.body.featured);
    await transaction(async (db) => {
      await db.query('SELECT pg_advisory_xact_lock(724091028)');
      if (!enabled) {
        await db.query(`DELETE FROM destaques WHERE ${column}=$1`, [entity]);
        return;
      }
      if ((await db.query(`SELECT 1 FROM destaques WHERE ${column}=$1`, [entity])).rowCount) return;
      const { rows } = await db.query(
        'SELECT n FROM generate_series(1,3) n WHERE n NOT IN (SELECT posicao FROM destaques) ORDER BY n LIMIT 1',
      );
      if (!rows[0]) fail(409, 'Você já tem 3 destaques. Desmarque um antes de escolher outro.');
      await db.query(`INSERT INTO destaques (posicao,${column}) VALUES ($1,$2)`, [rows[0].n, entity]);
    });
    res.json({ ok: true });
  }),
);
api.post(
  '/media',
  route(async (req, res) => {
    if (
      typeof req.body.data !== 'string' ||
      req.body.data.length > 8 * 1024 * 1024 ||
      !/^[A-Za-z0-9+/]+=*$/.test(req.body.data)
    )
      fail(400, 'Envie uma imagem de até 6 MB.');
    const source = Buffer.from(req.body.data, 'base64');
    let output;
    try {
      const decoder = sharp(source, { limitInputPixels: 25000000, animated: false });
      const meta = await decoder.metadata();
      if (!['jpeg', 'png', 'webp', 'avif'].includes(meta.format)) fail(400, 'Use JPG, PNG, WebP ou AVIF.');
      output = await decoder
        .rotate()
        .resize(1800, 1800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
    } catch {
      fail(400, 'Não foi possível ler esta imagem. Use JPG, PNG, WebP ou AVIF de até 25 megapixels.');
    }
    if (output.length > 3 * 1024 * 1024)
      fail(400, 'Imagem muito grande. Reduza a resolução e tente novamente.');
    const mediaId = randomUUID();
    await pool.query('INSERT INTO midias (id,conteudo,criado_por) VALUES ($1,$2,$3)', [
      mediaId,
      output,
      req.account.id,
    ]);
    res.status(201).json({ url: `/api/media/${mediaId}` });
  }),
);
api.use((_req, res) => res.status(404).json({ message: 'Recurso não encontrado.' }));
