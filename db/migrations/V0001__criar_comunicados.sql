-- Estrutura dos comunicados. Alterações futuras devem usar uma nova migração V.
CREATE TABLE public.comunicados (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome varchar(200) NOT NULL CHECK (length(btrim(nome)) > 0),
    descricao text NOT NULL CHECK (length(btrim(descricao)) > 0),
    categoria varchar(40) NOT NULL CHECK (
        categoria IN ('Geral', 'Acadêmico', 'Eventos', 'Oportunidades', 'Estágio')
    ),
    data date NOT NULL DEFAULT CURRENT_DATE,
    criado_em timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX comunicados_data_idx ON public.comunicados (data DESC, id DESC);
CREATE INDEX comunicados_categoria_data_idx ON public.comunicados (categoria, data DESC);

CREATE FUNCTION public.atualizar_timestamp_comunicado()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
    NEW.atualizado_em = clock_timestamp();
    RETURN NEW;
END;
$$;

CREATE TRIGGER comunicados_atualizado_em
BEFORE UPDATE ON public.comunicados
FOR EACH ROW EXECUTE FUNCTION public.atualizar_timestamp_comunicado();
