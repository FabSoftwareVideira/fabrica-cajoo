import {
  ArrowUpRight,
  Camera,
  Check,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Pencil,
  Plus,
  Search,
  Shield,
  Sparkles,
  Trash2,
  UserRound,
  Users,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { api, errorMessage, formatDate } from '../lib/api';
import type { Comunicado, EventoGaleria, User } from '../types';
import { ContentEditor } from '../components/dashboard/ContentEditor';
import { PersonEditor } from '../components/dashboard/PersonEditor';
import { ConfirmAction } from '../components/dashboard/ConfirmAction';
import { PasswordForm } from '../components/dashboard/PasswordForm';
import { ContentStatus } from '../components/ContentStatus';

type Editor =
  | { kind: 'notice'; item?: Comunicado }
  | { kind: 'gallery'; item?: EventoGaleria }
  | { kind: 'person'; item?: User };
type Confirm = {
  title: string;
  description: string;
  passwordRequired?: boolean;
  confirmLabel: string;
  action: (password: string) => Promise<void>;
};
const tabs = [
  { id: 'overview', label: 'Visão geral', icon: LayoutDashboard },
  { id: 'notices', label: 'Recados', icon: Megaphone },
  { id: 'gallery', label: 'Galeria', icon: Camera },
  { id: 'people', label: 'Pessoas', icon: Users },
  { id: 'account', label: 'Minha conta', icon: UserRound },
];

export function Dashboard() {
  const auth = useAuth(),
    content = useContent();
  const [params, setParams] = useSearchParams();
  const view = tabs.some((t) => t.id === params.get('tab')) ? params.get('tab')! : 'overview';
  const [people, setPeople] = useState<User[]>([]),
    [peopleLoading, setPeopleLoading] = useState(true);
  const [editor, setEditor] = useState<Editor | null>(null),
    [confirm, setConfirm] = useState<Confirm | null>(null);
  const [search, setSearch] = useState(''),
    [error, setError] = useState(''),
    [message, setMessage] = useState(''),
    [busy, setBusy] = useState(false);
  const admin = auth.user?.role === 'admin';
  const highlights = [
    ...content.notices.filter((n) => n.featured).map((item) => ({ kind: 'notice' as const, item })),
    ...content.galleries.filter((g) => g.featured).map((item) => ({ kind: 'gallery' as const, item })),
  ];
  const loadPeople = useCallback(async () => {
    if (!auth.user || auth.user.mustChangePassword) return;
    setPeopleLoading(true);
    try {
      setPeople(await api<User[]>('/people'));
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setPeopleLoading(false);
    }
  }, [auth.user?.id, auth.user?.role, auth.user?.mustChangePassword]);
  useEffect(() => {
    void loadPeople();
  }, [loadPeople]);
  useEffect(() => {
    setSearch('');
    setError('');
    setMessage('');
  }, [view]);
  async function saved() {
    await Promise.all([content.refresh(), loadPeople(), auth.refresh()]);
    setMessage('Alterações publicadas no portal.');
  }
  async function highlight(kind: 'notice' | 'gallery', item: Comunicado | EventoGaleria) {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      await api(`/highlights/${kind}/${item.id}`, 'PUT', { featured: !item.featured });
      await content.refresh();
      setMessage(
        item.featured ? 'Destaque removido da página inicial.' : 'Destaque adicionado à página inicial.',
      );
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  function remove(kind: 'notice' | 'gallery', item: Comunicado | EventoGaleria) {
    setConfirm({
      title: `Remover ${kind === 'notice' ? 'recado' : 'álbum'}?`,
      description: `“${item.title}” deixará de aparecer no portal e nos destaques. Essa remoção não pode ser desfeita.`,
      confirmLabel: 'Remover',
      action: async () => {
        await api(`/${kind === 'notice' ? 'notices' : 'gallery'}/${item.id}`, 'DELETE');
        await content.refresh();
        setMessage('Conteúdo removido.');
      },
    });
  }
  function removePerson(person: User) {
    setConfirm({
      title: person.id === auth.user?.id ? 'Remover minha conta?' : `Remover ${person.name}?`,
      description:
        'O perfil e o acesso ao painel serão removidos. Os conteúdos publicados permanecerão no portal.',
      passwordRequired: true,
      confirmLabel: 'Remover conta',
      action: async (password) => {
        await api(`/people/${person.id}`, 'DELETE', { password });
        await saved();
      },
    });
  }
  function transfer(person: User) {
    setConfirm({
      title: 'Transferir a administração?',
      description: `${person.name} será a única pessoa administradora. Você continuará como integrante, com acesso ao conteúdo e ao próprio perfil.`,
      passwordRequired: true,
      confirmLabel: 'Transferir administração',
      action: async (password) => {
        await api('/admin/transfer', 'POST', { userId: person.id, password });
        await auth.refresh();
        await content.refresh();
        setMessage(`Administração transferida para ${person.name}.`);
      },
    });
  }
  async function logout() {
    try {
      await auth.logout();
    } catch (e) {
      setError(errorMessage(e));
    }
  }
  if (auth.loading)
    return (
      <div className="site-container page-stack" role="status">
        Carregando seu painel…
      </div>
    );
  if (!auth.user) return <Navigate to="/login" replace />;
  const user = auth.user;
  const filteredPeople = people.filter((p) =>
    `${p.name} ${p.email} ${p.position}`.toLowerCase().includes(search.toLowerCase()),
  );
  const entries = view === 'gallery' ? content.galleries : content.notices;
  const filteredEntries = entries.filter((p) =>
    `${p.title} ${p.description} ${p.category}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="dashboard-shell site-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-heading">
          <span className="eyebrow">Espaço da gestão</span>
          <p>Vamos fazer acontecer.</p>
        </div>
        <nav aria-label="Menu do painel">
          {tabs
            .filter((t) => t.id !== 'people' || admin)
            .map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                disabled={user.mustChangePassword && id !== 'account'}
                onClick={() => setParams({ tab: id })}
                aria-current={view === id ? 'page' : undefined}
                className={view === id ? 'active' : ''}
              >
                <Icon size={20} />
                <span>{label}</span>
                {view === id && <ChevronRight size={16} className="ml-auto hidden lg:block" />}
              </button>
            ))}
        </nav>
        <div className="sidebar-footer">
          <span className="account-avatar">
            {user.photoUrl ? <img src={user.photoUrl} alt="" /> : user.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <strong>{user.name}</strong>
            <span>{admin ? 'Administrador' : 'Integrante'}</span>
          </div>
          <button className="icon-button" aria-label="Sair do painel" onClick={logout}>
            <LogOut size={19} />
          </button>
        </div>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-page-heading">
          <div>
            <span className="eyebrow">CAJOO · Painel</span>
            <h1>{user.mustChangePassword ? 'Primeiro acesso' : tabs.find((t) => t.id === view)?.label}</h1>
            <p>
              {user.mustChangePassword
                ? 'Um pequeno passo antes de começar.'
                : view === 'overview'
                  ? `Olá, ${user.name.split(' ')[0]}. A comunidade começa aqui.`
                  : view === 'notices'
                    ? 'Novidades e avisos para quem faz parte.'
                    : view === 'gallery'
                      ? 'Os momentos que contam a nossa história.'
                      : view === 'people'
                        ? 'Quem faz o CAJOO acontecer.'
                        : 'Seu perfil, seu acesso e suas preferências.'}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/" className="button-secondary !text-sm">
              Ver portal
              <ArrowUpRight size={18} />
            </Link>
            <button className="icon-button lg:hidden" aria-label="Sair do painel" onClick={logout}>
              <LogOut size={18} />
            </button>
          </div>
        </header>
        {(error || auth.error) && (
          <p role="alert" className="feedback-error">
            {error || auth.error}
          </p>
        )}
        {message && (
          <p role="status" className="feedback-success">
            <Check size={18} />
            {message}
          </p>
        )}
        {user.mustChangePassword ? (
          <PasswordForm />
        ) : (
          <>
            {view === 'overview' && (
              <>
                <div className="dashboard-stats">
                  {[
                    {
                      label: 'Recados publicados',
                      count: content.notices.length,
                      icon: Megaphone,
                      tab: 'notices',
                    },
                    {
                      label: 'Álbuns na galeria',
                      count: content.galleries.length,
                      icon: Camera,
                      tab: 'gallery',
                    },
                    {
                      label: 'Destaques na home',
                      count: `${highlights.length}/3`,
                      icon: Sparkles,
                      tab: 'notices',
                    },
                  ].map(({ label, count, icon: Icon, tab }) => (
                    <button key={label} className="stat-card" onClick={() => setParams({ tab })}>
                      <Icon size={22} />
                      <strong>{count}</strong>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
                <div className="dashboard-panel dashboard-welcome">
                  <div>
                    <span className="eyebrow">Tem novidade por aí?</span>
                    <h2>Compartilhe com a comunidade.</h2>
                    <p>Publique um recado ou registre os melhores momentos do CAJOO.</p>
                    <div className="flex flex-wrap gap-3 mt-6">
                      <button className="button-primary" onClick={() => setEditor({ kind: 'notice' })}>
                        <Plus size={19} />
                        Criar recado
                      </button>
                      <button className="button-secondary" onClick={() => setEditor({ kind: 'gallery' })}>
                        <Camera size={19} />
                        Criar álbum
                      </button>
                    </div>
                  </div>
                  <span className="welcome-symbol" aria-hidden="true">
                    &lt;/&gt;
                  </span>
                </div>
                <section className="dashboard-panel">
                  <div className="section-heading-row">
                    <div>
                      <h2 className="text-xl font-bold">No radar do CAJOO</h2>
                      <p className="text-zinc-400 text-sm mt-1">
                        Até 3 recados ou álbuns em destaque na página inicial.
                      </p>
                    </div>
                    <span className="badge">
                      <Sparkles size={15} />
                      {highlights.length}/3
                    </span>
                  </div>
                  <ContentStatus
                    loading={content.loading}
                    error={content.error}
                    onRetry={content.refresh}
                    empty={
                      !highlights.length
                        ? 'Nenhum destaque selecionado. Marque “Destaque na home” nos cartões de recados ou álbuns.'
                        : undefined
                    }
                  />
                  <div className="highlight-list">
                    {highlights.map(({ kind, item }) => (
                      <div key={`${kind}-${item.id}`}>
                        <span className="feature-icon">
                          {kind === 'notice' ? <Megaphone size={20} /> : <Camera size={20} />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <strong>{item.title}</strong>
                          <span>{item.category}</span>
                        </div>
                        <button
                          disabled={busy}
                          onClick={() => highlight(kind, item)}
                          className="icon-button"
                          aria-label={`Remover destaque: ${item.title}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
            {(view === 'notices' || view === 'gallery') && (
              <>
                <div className="dashboard-toolbar">
                  <label className="dashboard-search">
                    <Search size={20} />
                    <input
                      aria-label={view === 'notices' ? 'Buscar recados no painel' : 'Buscar álbuns no painel'}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={view === 'notices' ? 'Buscar recados…' : 'Buscar álbuns…'}
                    />
                  </label>
                  <button
                    className="button-primary"
                    onClick={() => setEditor({ kind: view === 'notices' ? 'notice' : 'gallery' })}
                  >
                    <Plus size={19} />
                    {view === 'notices' ? 'Novo recado' : 'Novo álbum'}
                  </button>
                </div>
                <p className="dashboard-hint">
                  <Sparkles size={17} />
                  {highlights.length} de 3 destaques selecionados. Desmarque todos para ocultar a seção na
                  home.
                </p>
                <ContentStatus
                  loading={content.loading}
                  error={content.error}
                  onRetry={content.refresh}
                  empty={
                    !filteredEntries.length
                      ? search
                        ? 'Nenhum resultado para esta busca.'
                        : `Tudo pronto para seu primeiro ${view === 'notices' ? 'recado' : 'álbum'}.`
                      : undefined
                  }
                />
                <div className="dashboard-card-grid">
                  {filteredEntries.map((item) => {
                    const isGallery = view === 'gallery';
                    const kind = isGallery ? 'gallery' : 'notice';
                    return (
                      <article key={item.id} className="dashboard-content-card">
                        {isGallery && (
                          <img
                            className="dashboard-cover"
                            src={(item as EventoGaleria).mainImage}
                            alt=""
                            loading="lazy"
                          />
                        )}
                        <div className="dashboard-card-body">
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="badge">{item.category}</span>
                            <span className="text-sm text-zinc-500">
                              {formatDate(
                                isGallery ? (item as EventoGaleria).eventDate : (item as Comunicado).date,
                              )}
                            </span>
                          </div>
                          <h2>{item.title}</h2>
                          <p>{item.description}</p>
                          <label className="checkbox-row highlight-checkbox">
                            <input
                              type="checkbox"
                              checked={!!item.featured}
                              disabled={busy || (!item.featured && highlights.length >= 3)}
                              onChange={() => highlight(kind, item)}
                            />
                            <span>
                              <Sparkles size={17} />
                              Destaque na home
                            </span>
                          </label>
                          <div className="card-action-row">
                            <button
                              className="button-secondary"
                              onClick={() =>
                                setEditor(
                                  isGallery
                                    ? { kind: 'gallery', item: item as EventoGaleria }
                                    : { kind: 'notice', item: item as Comunicado },
                                )
                              }
                            >
                              <Pencil size={17} />
                              Editar
                            </button>
                            <button
                              className="icon-button text-rose-300"
                              aria-label={`Remover ${item.title}`}
                              onClick={() => remove(kind, item)}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}
            {view === 'people' && admin && (
              <>
                <div className="dashboard-toolbar">
                  <label className="dashboard-search">
                    <Search size={20} />
                    <input
                      aria-label="Buscar pessoas"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar pessoas…"
                    />
                  </label>
                  <button className="button-primary" onClick={() => setEditor({ kind: 'person' })}>
                    <Plus size={19} />
                    Cadastrar pessoa
                  </button>
                </div>
                <div className="admin-note">
                  <Shield size={23} />
                  <p>
                    Há sempre um único administrador. Para transferir, cadastre uma conta e peça à pessoa para
                    entrar e trocar a senha inicial. Ao transferir, você passa a ser integrante e pode remover
                    sua própria conta.
                  </p>
                </div>
                {peopleLoading ? (
                  <p role="status" className="empty-state">
                    Carregando pessoas…
                  </p>
                ) : (
                  <div className="dashboard-card-grid">
                    {filteredPeople.map((person) => (
                      <article key={person.id} className="person-card">
                        <span className="person-avatar">
                          {person.photoUrl ? (
                            <img src={person.photoUrl} alt="" loading="lazy" />
                          ) : (
                            <UserRound size={38} />
                          )}
                        </span>
                        <div className="min-w-0">
                          <h2>{person.name}</h2>
                          <p>{person.position || 'Equipe CAJOO'}</p>
                          <p className="text-sm break-all">{person.email || 'Perfil sem acesso ao painel'}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className="badge">
                              {person.role === 'admin'
                                ? 'Administrador'
                                : person.hasAccess
                                  ? 'Integrante'
                                  : 'Perfil público'}
                            </span>
                            {person.hasAccess && person.mustChangePassword && (
                              <span className="badge !text-amber-200">Primeiro acesso pendente</span>
                            )}
                          </div>
                        </div>
                        <div className="person-actions">
                          <button
                            className="button-secondary"
                            onClick={() => setEditor({ kind: 'person', item: person })}
                          >
                            <Pencil size={17} />
                            Editar
                          </button>
                          <button
                            className="icon-button text-rose-300"
                            disabled={person.role === 'admin'}
                            title={
                              person.role === 'admin'
                                ? 'Transfira a administração antes de remover'
                                : undefined
                            }
                            aria-label={`Remover ${person.name}`}
                            onClick={() => removePerson(person)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        {person.role !== 'admin' && person.hasAccess && !person.mustChangePassword && (
                          <button className="transfer-button" onClick={() => transfer(person)}>
                            <Shield size={16} />
                            Tornar administrador
                            <ArrowUpRight size={16} />
                          </button>
                        )}
                      </article>
                    ))}
                  </div>
                )}
                {!peopleLoading && !filteredPeople.length && (
                  <p className="empty-state">Nenhuma pessoa encontrada.</p>
                )}
              </>
            )}
            {view === 'people' && !admin && (
              <div className="empty-state">
                A gestão de contas é exclusiva do administrador.{' '}
                <button className="feature-link" onClick={() => setParams({ tab: 'account' })}>
                  Abrir meu perfil
                </button>
              </div>
            )}
            {view === 'account' && (
              <>
                <section className="dashboard-panel account-summary">
                  <span className="person-avatar">
                    {user.photoUrl ? <img src={user.photoUrl} alt="" /> : <UserRound size={38} />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="badge">{admin ? 'Administrador' : 'Integrante'}</span>
                    <h2 className="text-2xl font-bold mt-3">{user.name}</h2>
                    <p className="text-zinc-400 break-all">{user.email}</p>
                  </div>
                  <button
                    className="button-secondary"
                    onClick={() => setEditor({ kind: 'person', item: user })}
                  >
                    <Pencil size={18} />
                    Editar perfil
                  </button>
                </section>
                <PasswordForm />
                <section className="dashboard-panel max-w-2xl">
                  <h2 className="text-xl font-bold">Remover minha conta</h2>
                  <p className="text-zinc-400 mt-2 mb-5">
                    {admin
                      ? 'Antes de sair, transfira a administração para outra pessoa na seção Pessoas. Assim o CA continua com acesso ao painel.'
                      : 'Ao remover sua conta, seu acesso e perfil público serão excluídos. Os recados e álbuns publicados serão preservados.'}
                  </p>
                  <button
                    className="button-secondary !text-rose-300"
                    disabled={admin}
                    onClick={() => removePerson(user)}
                  >
                    <Trash2 size={18} />
                    Remover minha conta
                  </button>
                </section>
              </>
            )}
          </>
        )}
      </div>
      {editor &&
        (editor.kind === 'person' ? (
          <PersonEditor
            key={editor.item?.id || 'new-person'}
            person={editor.item}
            currentId={user.id}
            onClose={() => setEditor(null)}
            onSaved={saved}
          />
        ) : (
          <ContentEditor
            key={`${editor.kind}-${editor.item?.id || 'new'}`}
            kind={editor.kind}
            item={editor.item}
            onClose={() => setEditor(null)}
            onSaved={saved}
          />
        ))}
      {confirm && (
        <ConfirmAction
          title={confirm.title}
          description={confirm.description}
          passwordRequired={confirm.passwordRequired}
          confirmLabel={confirm.confirmLabel}
          onConfirm={confirm.action}
          onClose={() => setConfirm(null)}
        />
      )}
    </div>
  );
}
