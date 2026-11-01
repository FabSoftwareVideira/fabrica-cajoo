import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from './db.js';
import { initializeDatabase } from './bootstrap.js';
import { api } from './api.js';

const app = express();
const root = fileURLToPath(new URL('../', import.meta.url));
app.disable('x-powered-by');
// HTTPS termina no proxy reverso imediatamente à frente do container na BRDrive.
app.set('trust proxy', 1);
app.use((_req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
  });
  next();
});
app.use('/api', express.json({ limit: '9mb' }), api);
app.use(express.static(path.join(root, 'dist')));
app.get('*', (_req, res) => res.sendFile(path.join(root, 'dist', 'index.html')));
app.use((error, _req, res, _next) => {
  let status = error.status || 500,
    message = error.message;
  if (error.code === '23505') {
    status = 409;
    message = 'Este e-mail já está cadastrado.';
  }
  if (error.code === '23503') {
    status = 409;
    message = 'Este registro está em uso ou não existe mais. Atualize a página.';
  }
  if (error.type === 'entity.too.large') {
    status = 413;
    message = 'Arquivo muito grande. Envie uma imagem de até 6 MB.';
  }
  if (error.type === 'entity.parse.failed') {
    status = 400;
    message = 'Conteúdo inválido.';
  }
  if (status >= 500) {
    console.error('Erro na API:', error.code || error.message);
    message = 'Não foi possível concluir agora. Tente novamente em instantes.';
  }
  res.status(status).json({ message });
});
try {
  await initializeDatabase();
  const server = app.listen(Number(process.env.PORT || 3000), '0.0.0.0', () =>
    console.log(`CAJOO: http://localhost:${process.env.PORT || 3000}`),
  );
  const shutdown = () => {
    server.close(() => pool.end().then(() => process.exit(0)));
    setTimeout(() => process.exit(1), 10000).unref();
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
} catch (error) {
  console.error('Falha ao inicializar o banco:', error.message);
  await pool.end();
  process.exitCode = 1;
}
