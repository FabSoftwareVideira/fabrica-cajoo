import { ArrowRight, Calendar, Search, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ComunicadoModal } from '../components/ComunicadoModal';
import { ContentStatus } from '../components/ContentStatus';
import { useContent } from '../context/ContentContext';
import { formatDate } from '../lib/api';

export function Comunicados() {
  const { notices, loading, error, refresh } = useContent();
  const [category, setCategory] = useState('Todos'),
    [search, setSearch] = useState('');
  const [params, setParams] = useSearchParams();
  const active = notices.find((n) => n.id === params.get('recado')) || null;
  const filtered = notices.filter(
    (n) =>
      (category === 'Todos' || n.category === category) &&
      `${n.title} ${n.description} ${n.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase()),
  );
  const featured = notices.find((n) => n.featured);
  return (
    <div className="site-container page-stack">
      <section className="page-hero">
        <span className="eyebrow">O que está acontecendo</span>
        <h1>
          Recados para a <span className="gradient-text">comunidade.</span>
        </h1>
        <p>Notícias, oportunidades e avisos para acompanhar a vida no campus.</p>
      </section>
      {featured && (
        <section className="notice-spotlight">
          <div>
            <span className="eyebrow">
              <Sparkles size={18} />
              Em destaque
            </span>
            <h2>{featured.title}</h2>
            <p>{featured.description}</p>
          </div>
          <button className="button-primary shrink-0" onClick={() => setParams({ recado: featured.id })}>
            Ler recado
            <ArrowRight size={18} />
          </button>
        </section>
      )}
      <section className="public-filter">
        <div className="filter-pills">
          {['Todos', 'Geral', 'Acadêmico', 'Eventos', 'Oportunidades', 'Estágio'].map((c) => (
            <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
        <label className="dashboard-search">
          <Search size={20} />
          <input
            aria-label="Buscar comunicados"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar recados…"
          />
        </label>
      </section>
      <ContentStatus
        loading={loading}
        error={error}
        onRetry={refresh}
        empty={
          !filtered.length
            ? notices.length
              ? 'Nenhum recado encontrado. Tente outra busca.'
              : 'Os próximos recados aparecerão aqui. Acompanhe as novidades do CAJOO!'
            : undefined
        }
      />
      <section className="public-content-grid">
        {filtered.map((item) => (
          <article key={item.id} className="notice-card">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge">{item.category}</span>
              <time dateTime={item.date}>
                <Calendar size={15} />
                {formatDate(item.date)}
              </time>
            </div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <div className="notice-card-footer">
              <span>{item.author}</span>
              <button onClick={() => setParams({ recado: item.id })} className="feature-link">
                Ler recado
                <ArrowRight size={18} />
              </button>
            </div>
          </article>
        ))}
      </section>
      <ComunicadoModal comunicado={active} onClose={() => setParams({})} />
    </div>
  );
}
