-- Scripts R são reaplicados quando seu conteúdo muda; devem ser idempotentes.
COMMENT ON TABLE public.comunicados IS 'Comunicados e avisos do CAJOO.';
COMMENT ON COLUMN public.comunicados.nome IS 'Título do comunicado.';
COMMENT ON COLUMN public.comunicados.descricao IS 'Texto completo do comunicado.';
COMMENT ON COLUMN public.comunicados.categoria IS 'Geral, Acadêmico, Eventos, Oportunidades ou Estágio.';
COMMENT ON COLUMN public.comunicados.data IS 'Data de publicação, sem conversão de fuso horário.';
