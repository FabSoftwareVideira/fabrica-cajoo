# Portal CAJOO

Portal do Centro Acadêmico de Ciência da Computação do IFC. React + TypeScript + Vite no frontend; Express e PostgreSQL 16 no backend.

## Revisar localmente

Copie `.env.example` para `.env` se o arquivo ainda não existir e execute:

```bash
docker compose up --build
```

Abra **http://localhost:13001**. O Compose inicia o PostgreSQL, aplica os SQLs pendentes e sobe a API e o frontend. O banco local usa a porta 15433. Não é necessário instalar Node no Windows para executar com Docker.

Alternativa com Node.js 22 e PostgreSQL já disponível:

```bash
npm ci
npm run dev
```

Nesse caso, abra http://localhost:3000. O Vite encaminha `/api` para a API local na porta 3001. Use `POSTGRES_HOST=localhost` e `POSTGRES_PORT=15433` no `.env` para acessar o PostgreSQL do Compose.

## Primeiro acesso

- E-mail inicial: `admin@admin.com`
- Senha inicial: `123456`
- A primeira entrada exige escolher uma nova senha de pelo menos 8 caracteres.

A conta inicial é criada **uma única vez**, quando o banco ainda não tem administração. Reiniciar ou atualizar o site não recria a conta, não restaura a senha e não altera o administrador escolhido. Se necessário, `INITIAL_ADMIN_PASSWORD` define outra senha de bootstrap antes da primeira inicialização.

As nove pessoas da gestão atual são cadastradas com as fotos existentes e sem acesso ao painel. O administrador pode editar esses perfis e adicionar e-mail e senha para liberar o acesso, ou cadastrar outras pessoas.

### Administração única

Há exatamente uma referência de administrador no banco. Somente o administrador cadastra contas, altera outras pessoas ou transfere a administração.

1. Cadastre outra pessoa com e-mail e senha inicial.
2. Essa pessoa entra e troca a senha inicial, confirmando que tem acesso.
3. Em **Pessoas → Tornar administrador**, o administrador atual confirma a transferência com sua senha.
4. A outra conta passa a ser a única administradora; a anterior passa a ser integrante.
5. A conta anterior pode ser removida por ela mesma em **Minha conta**, ou pelo novo administrador.

Não é permitido remover o administrador atual. A troca ocorre em uma transação com bloqueio da linha de administração, inclusive quando há solicitações simultâneas. Os privilégios são consultados no servidor em cada requisição.

Integrantes podem editar e remover a própria conta e gerenciar recados, álbuns e destaques. As remoções de contas preservam os conteúdos publicados.

## Conteúdo do portal

- **Recados:** título, resumo, texto, categoria, data, autoria e palavras-chave; criar, editar e remover.
- **Galeria:** título, descrição, categoria, data, local e até 12 fotos por álbum; criar, editar, remover, trocar a capa e retirar fotos.
- **Pessoas:** nome, cargo, apresentação, foto redonda, ano, ordem de exibição e visibilidade na página O CAJOO.
- **Destaques:** checkbox em cada recado ou álbum; no máximo **3 no total**, com limite garantido também no banco. Sem seleção, a seção desaparece da home. Editar o conteúdo altera o destaque; remover o conteúdo também remove sua seleção.

Recados e galeria começam vazios, sem publicar notícias fictícias. A página pública consulta a API. Mudanças feitas no painel atualizam o portal; outras abas atualizam os dados ao receber foco.

Fotos podem ser enviadas do dispositivo (JPG, PNG, WebP ou AVIF, até 6 MB e 25 megapixels) ou indicadas por um link HTTPS. Os uploads são validados, orientados e convertidos em WebP de até 1800 px. Seus bytes ficam em `midias` no PostgreSQL, portanto acompanham o volume do banco e seu backup. Links externos dependem da disponibilidade do provedor da imagem.

## Deploy pela BRDrive / GitHub Actions

O workflow `.github/workflows/deploy.yml` continua usando o runner `self-hosted` já configurado na BRDrive. **Nenhum deploy precisa ser feito para revisar esta pasta.** Depois da revisão, o push para `main` (ou uma tag `v*`) executa o fluxo.

Pré-requisitos já usados pelo projeto:

- Runner self-hosted ativo, com Docker e Compose v2 (`--wait`).
- Rede externa `fabrica-network` e proxy do domínio apontando para `fabrica-cajoo-prod-web:3000`.
- Secret `ENV_FILE` contendo as variáveis de conexão abaixo. Se o volume já existir, mantenha as credenciais originais dele.

```dotenv
POSTGRES_USER=usuario_do_banco
POSTGRES_PASSWORD=senha_do_banco
POSTGRES_DB=cajoo-db
PUBLIC_ORIGIN=https://cajoo.fsw-ifc.brdrive.cloud
```

`PUBLIC_ORIGIN` tem esse domínio como padrão de produção. Não inclui barra final. O Compose define `POSTGRES_HOST`, `POSTGRES_PORT`, `PORT=3000` e `APP_ENV=production` nos containers; não é preciso colocar o IP do servidor nas variáveis do frontend. Os cookies são HttpOnly, SameSite=Lax e Secure em produção, que deve ser acessada por HTTPS.

O workflow:

1. Prepara as imagens com `npm ci`, TypeScript e o build estático.
2. Cria o PostgreSQL se necessário, preservando o nome e volume originais. Nunca usa `down` ou remove volumes.
3. Aplica os SQLs pendentes antes de substituir o site. Um banco vazio recebe toda a estrutura automaticamente.
4. Atualiza apenas o container web e espera `/api/health` confirmar a conexão com o banco.
5. Em alterações exclusivamente de SQL, mantém também o site em execução. A opção manual `database_only` faz o mesmo.

As fotos e os dados persistem no volume PostgreSQL. Faça backup desse volume/banco, incluindo a tabela `midias`, como parte da operação do servidor. Não use `docker compose down -v` para atualizar.

A inicialização de um banco vazio também é suportada pelo servidor. Em produção, depois de inicializado, os SQLs são aplicados pelo workflow/serviço de migração; reiniciar uma imagem antiga não reaplica scripts repetíveis antigos.

## Migrações SQL

Arquivos em `db/migrations/`:

- `V0001__criar_comunicados.sql`: modelagem inicial dos comunicados.
- `V0002__dashboard_e_acesso.sql`: pessoas, administração única, sessões, mídia, galeria e destaques.
- `R__documentar_comunicados.sql`: comentários do modelo, reaplicados quando o conteúdo muda.

Mudanças de estrutura: crie uma nova versão (`V0003__descricao.sql`, por exemplo). Uma versão já aplicada não deve ser editada, removida ou renomeada. Scripts `R__nome.sql` são reaplicados quando seu checksum muda e devem ser idempotentes.

Cada arquivo roda em uma transação. Não inclua `BEGIN`, `COMMIT`, `ROLLBACK`, comandos de psql ou operações incompatíveis com transações. Migrações devem ser compatíveis com o site que permanece no ar enquanto elas são aplicadas. Falhas interrompem o deploy antes da troca do site; não há rollback automático de migrações anteriores concluídas.

Para atualizar o banco local sem reiniciá-lo:

```bash
docker compose build cajoo-migrate
docker compose run --rm --no-deps cajoo-migrate
```

Ou, com Node e `.env`: `npm run db:migrate`.

Histórico no próprio banco:

```sql
SELECT filename, kind, success, checksum, executed_at, execution_ms, error_message, app_version
FROM public.schema_migrations ORDER BY id DESC;
```

## Verificação e manutenção

```bash
npm run typecheck
npm run build
npm audit
```

Os arquivos de testes foram removidos conforme solicitado. O workflow `check.yml` mantém a checagem de tipos e build em pull requests, sem publicar. O painel é carregado sob demanda, separado do bundle principal. Código legado duplicado, login simulado, dados de demonstração e efeitos que seguiam o cursor foram removidos.

As senhas são armazenadas com scrypt; as sessões usam tokens aleatórios, guardados por hash no banco. Alterar a senha invalida as outras sessões. Operações de escrita têm verificação de origem e CSRF, além de validação e autorização no backend.
