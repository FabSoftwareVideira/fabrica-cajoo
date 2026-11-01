import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Calendar,
  ExternalLink,
  GraduationCap,
  Instagram,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CajooLaptopIllustration } from '../components/CajooLaptopIllustration';
import { FadeInSection } from '../components/FadeInSection';
import { HOME_FEATURES } from '../data/siteData';

const icons: Record<string, LucideIcon> = { ExternalLink, Bell, Calendar, BookOpen, Users, GraduationCap };

import { useContent } from '../context/ContentContext';
import { formatDate } from '../lib/api';

export function Home() {
  const { notices, galleries } = useContent();
  const highlights = [
    ...notices
      .filter((n) => n.featured)
      .map((n) => ({ ...n, link: `/comunicados?recado=${n.id}`, key: `notice-${n.id}` })),
    ...galleries
      .filter((g) => g.featured)
      .map((g) => ({ ...g, date: g.eventDate, link: `/galeria?album=${g.id}`, key: `gallery-${g.id}` })),
  ];
  return (
    <div className="site-container page-stack">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-content">
          <div>
            <span className="eyebrow">
              <span className="h-2 w-2 rounded-full bg-fuchsia-400" /> Centro Acadêmico · IFC
            </span>
            <h1 id="home-title" className="hero-title">
              Sua comunidade.
              <br />
              Seu espaço.
              <br />
              <span className="gradient-text">Seu CAJOO.</span>
            </h1>
            <p className="hero-description">
              Conectamos quem vive a Ciência da Computação. Recursos, oportunidades e pessoas para construir
              essa jornada com você.
            </p>
            <div className="hero-actions mt-8 flex flex-wrap gap-3">
              <Link to="/recursos" className="button-primary">
                Explorar recursos <ArrowRight size={20} />
              </Link>
              <Link to="/ca" className="button-secondary">
                Conhecer o CA <Users size={20} />
              </Link>
            </div>
          </div>
          <div className="hero-art">
            <CajooLaptopIllustration className="w-full" />
          </div>
        </div>
        <div className="hero-caption">
          <GraduationCap size={20} className="text-purple-400" />
          <span>De estudantes, para estudantes.</span>
          <span className="hidden sm:inline text-zinc-600">/</span>
          <span className="hidden sm:inline">Ciência da Computação</span>
        </div>
      </section>

      <section aria-labelledby="resources-title">
        <FadeInSection>
          <span className="eyebrow">O campus, mais perto</span>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div>
              <h2 id="resources-title" className="section-title">
                Tudo o que você precisa.
                <br />
                Em um só lugar.
              </h2>
              <p className="section-copy">Menos tempo procurando. Mais tempo vivendo a universidade.</p>
            </div>
            <span className="text-sm text-zinc-400">
              Explore o portal <ArrowRight size={18} className="inline ml-1 text-purple-400" />
            </span>
          </div>
        </FadeInSection>
        <div className="mt-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {HOME_FEATURES.map((feature, index) => {
            const Icon = icons[feature.iconName] || ExternalLink;
            return (
              <FadeInSection key={feature.id} delay={index * 40}>
                <Link to={feature.link} className="feature-card group">
                  <div className="flex items-start justify-between">
                    <span className="feature-icon">
                      <Icon size={26} />
                    </span>
                    <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-purple-300" />
                  </div>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                  <span className="feature-link">
                    Explorar <ArrowRight size={18} />
                  </span>
                </Link>
              </FadeInSection>
            );
          })}
        </div>
      </section>

      {highlights.length > 0 && (
        <section aria-labelledby="news-title">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="eyebrow">Fique por dentro</span>
              <h2 id="news-title" className="section-title mt-3">
                No radar do CAJOO
              </h2>
            </div>
            <Link to="/comunicados" className="feature-link min-h-11">
              Todos os comunicados <ArrowRight size={20} />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {highlights.map((item) => (
              <Link key={item.key} to={item.link} className="feature-card">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full bg-purple-400/10 px-3 py-1 text-purple-300">
                    {item.category}
                  </span>
                  <span className="text-zinc-400">{formatDate(item.date)}</span>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <span className="feature-link">
                  Saiba mais <ArrowUpRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="community-panel flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <span className="eyebrow">A comunidade começa com você</span>
          <h2 className="section-title mt-4">
            Tem uma ideia?
            <br />
            Vamos construir juntos.
          </h2>
          <p className="section-copy">
            O CA é feito de gente que participa. Conheça a gestão, traga suas sugestões e acompanhe o que está
            acontecendo.
          </p>
        </div>
        <div className="flex flex-col gap-3 shrink-0">
          <Link to="/ca" className="button-primary">
            Conheça nossa equipe <Users size={20} />
          </Link>
          <a
            href="https://www.instagram.com/ca.computacao/"
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary"
          >
            <Instagram size={20} /> @ca.computacao <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
