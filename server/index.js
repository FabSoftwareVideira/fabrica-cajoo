// Servidor de produção do Portal CAJOO.
//
// Por enquanto só serve o build estático gerado pelo Vite (pasta /dist).
// Este é o lugar para plugar o backend quando ele começar a ser desenvolvido:
// conexão com o Postgres, rotas /api, autenticação, etc.

import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// TODO: quando o backend existir, registrar as rotas de API aqui, antes do estático.
// Ex: app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '..', 'dist')));

// SPA fallback — qualquer rota não encontrada cai no index.html do React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portal CAJOO rodando na porta ${PORT} (${process.env.APP_ENV || 'production'})`);
});
