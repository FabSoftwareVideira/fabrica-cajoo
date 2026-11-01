import { ArrowUpRight, Instagram, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ContentStatus } from '../components/ContentStatus';
import { CajooLaptopIllustration } from '../components/CajooLaptopIllustration';

export function CentroAcademico() {
  const { team, loading, error, refresh } = useContent();
  return (
    <div className="site-container page-stack">
      <section className="community-panel ca-hero">
        <div>
          <span className="eyebrow">
            <Users size={20} /> Centro Acadêmico
          </span>
          <h1 className="hero-title max-w-4xl">
            Quem faz o <span className="gradient-text">CAJOO</span>
            <br />
            acontecer.
          </h1>
          <p className="section-copy max-w-2xl">
            Somos estudantes como você. Uma equipe que representa, acolhe e conecta a comunidade de Ciência da
            Computação.
          </p>
          <a href="#gestao" className="button-secondary mt-7">
            Conheça a gestão <Users size={20} />
          </a>
        </div>
        <CajooLaptopIllustration />
      </section>

      <section id="gestao" aria-labelledby="team-title">
        <div className="flex flex-wrap items-end justify-between gap-5 mb-9">
          <div>
            <span className="eyebrow">Gente que faz parte</span>
            <h2 id="team-title" className="section-title mt-3">
              Nossa gestão{' '}
              <span className="text-purple-400">
                {[...new Set(team.map((member) => member.year))].sort().join(' / ')}
              </span>
            </h2>
          </div>
          <span className="text-zinc-400">{team.length} integrantes. Uma comunidade.</span>
        </div>
        <ContentStatus
          loading={loading}
          error={error}
          onRetry={refresh}
          empty={!team.length ? 'A gestão será apresentada aqui em breve.' : undefined}
        />
        <div className="team-grid">
          {team.map((member) => (
            <article key={member.id} className="member-card">
              <div className="member-photo">
                {member.photoUrl ? (
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="600"
                  />
                ) : (
                  <Users size={48} />
                )}
              </div>
              <div className="member-details">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                {member.bio && <p className="member-bio">{member.bio}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="community-panel flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Seu lugar também é aqui</span>
          <h2 className="section-title mt-4">Todo estudante pode participar.</h2>
          <p className="section-copy">
            Uma sugestão, um projeto ou vontade de ajudar: tudo começa com uma conversa. Fale com a gestão e
            venha construir os próximos passos do CA.
          </p>
        </div>
        <div className="flex flex-col gap-3 shrink-0">
          <a
            href="https://www.instagram.com/ca.computacao/"
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary"
          >
            <Instagram size={20} /> Converse com o CA <ArrowUpRight size={18} />
          </a>
          <Link to="/comunicados" className="button-secondary">
            Acompanhar comunicados
          </Link>
        </div>
      </section>
    </div>
  );
}
