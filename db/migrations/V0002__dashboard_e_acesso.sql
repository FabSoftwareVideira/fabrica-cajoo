CREATE TABLE public.usuarios (
  id uuid PRIMARY KEY,
  nome varchar(120) NOT NULL CHECK (length(btrim(nome)) > 0),
  email varchar(254) UNIQUE,
  senha_hash text,
  trocar_senha boolean NOT NULL DEFAULT true,
  cargo varchar(120) NOT NULL DEFAULT '',
  foto text NOT NULL DEFAULT '',
  bio varchar(1000) NOT NULL DEFAULT '',
  visivel boolean NOT NULL DEFAULT false,
  ordem integer NOT NULL DEFAULT 0,
  gestao integer NOT NULL DEFAULT 2026 CHECK (gestao BETWEEN 2000 AND 2200),
  criado_em timestamptz NOT NULL DEFAULT now(),
  CHECK ((email IS NULL) = (senha_hash IS NULL)),
  CHECK (email IS NULL OR email = lower(email))
);

-- Uma única referência, sem um campo de papel por usuário: a troca é atômica.
CREATE TABLE public.administracao (
  singleton boolean PRIMARY KEY DEFAULT true CHECK (singleton),
  usuario_id uuid NOT NULL UNIQUE REFERENCES public.usuarios(id) ON DELETE RESTRICT
);

CREATE TABLE public.sessoes (
  token_hash char(64) PRIMARY KEY,
  usuario_id uuid NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
  csrf_token char(64) NOT NULL,
  expira_em timestamptz NOT NULL
);
CREATE INDEX sessoes_expiracao_idx ON public.sessoes (expira_em);
CREATE INDEX sessoes_usuario_idx ON public.sessoes (usuario_id);

CREATE TABLE public.limites_login (
  chave char(64) PRIMARY KEY,
  tentativas integer NOT NULL,
  reinicia_em timestamptz NOT NULL
);

CREATE TABLE public.midias (
  id uuid PRIMARY KEY,
  conteudo bytea NOT NULL,
  criado_por uuid REFERENCES public.usuarios(id) ON DELETE SET NULL,
  criado_em timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.comunicados ADD COLUMN conteudo text NOT NULL DEFAULT '';
ALTER TABLE public.comunicados ADD COLUMN autor varchar(120) NOT NULL DEFAULT 'CAJOO';
ALTER TABLE public.comunicados ADD COLUMN tags text[] NOT NULL DEFAULT '{}';

CREATE TABLE public.galeria (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nome varchar(200) NOT NULL CHECK (length(btrim(nome)) > 0),
  descricao text NOT NULL,
  categoria varchar(60) NOT NULL,
  data date NOT NULL,
  local varchar(160) NOT NULL DEFAULT '',
  imagens text[] NOT NULL CHECK (cardinality(imagens) BETWEEN 1 AND 12),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);

-- Três posições possíveis garantem o limite, inclusive em requisições concorrentes.
CREATE TABLE public.destaques (
  posicao smallint PRIMARY KEY CHECK (posicao BETWEEN 1 AND 3),
  comunicado_id bigint UNIQUE REFERENCES public.comunicados(id) ON DELETE CASCADE,
  galeria_id bigint UNIQUE REFERENCES public.galeria(id) ON DELETE CASCADE,
  CHECK (num_nonnulls(comunicado_id, galeria_id) = 1)
);
