import { ArrowUpRight, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CajooLogo } from './CajooLogo';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0b11]">
      <div className="site-container py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1.3fr_.8fr_.9fr_1fr] gap-9 sm:gap-12">
          <div>
            <Link to="/" aria-label="CAJOO — início">
              <CajooLogo size="lg" />
            </Link>
            <p className="mt-5 text-base text-zinc-400 max-w-sm">
              A comunidade de Ciência da Computação do Instituto Federal Catarinense. Feita por estudantes,
              para estudantes.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-white text-lg">Explore o portal</h2>
            <ul className="mt-4 grid gap-1 text-zinc-400">
              {[
                ['/curso', 'Sobre o curso'],
                ['/ca', 'Centro Acadêmico'],
                ['/comunicados', 'Comunicados'],
                ['/galeria', 'Galeria'],
              ].map(([path, label]) => (
                <li key={path}>
                  <Link to={path} className="inline-flex items-center min-h-11 hover:text-purple-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-white text-lg">No seu dia a dia</h2>
            <ul className="mt-4 grid gap-1 text-zinc-400">
              {[
                ['https://sig.ifc.edu.br/sigaa/verTelaLogin.do', 'Portal SIGAA'],
                ['https://moodle.ifc.edu.br', 'Moodle'],
                ['https://biblioteca.ifc.edu.br', 'Biblioteca'],
              ].map(([url, label]) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 hover:text-purple-300"
                  >
                    {label}
                    <ArrowUpRight size={16} />
                  </a>
                </li>
              ))}
              <li>
                <Link to="/recursos" className="inline-flex min-h-11 items-center hover:text-purple-300">
                  Todos os recursos
                </Link>
              </li>
            </ul>
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-white text-lg">Vamos conversar</h2>
            <a
              href="mailto:cajoo.ifc@gmail.com"
              className="mt-5 flex min-h-11 items-center gap-2 text-zinc-300 text-base break-all hover:text-purple-300"
            >
              <Mail size={20} className="text-purple-400" />
              cajoo.ifc@gmail.com
            </a>
            <a
              href="https://www.instagram.com/ca.computacao/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do CAJOO: @ca.computacao"
              className="mt-4 inline-flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-zinc-200 hover:border-purple-400/50 hover:bg-purple-400/5"
            >
              <Instagram size={24} className="text-purple-300" />
              <span>@ca.computacao</span>
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap justify-between gap-3 text-sm text-zinc-400">
          <p>© {new Date().getFullYear()} CAJOO. Centro Acadêmico de Ciência da Computação.</p>
          <span>Conectando pessoas e ideias.</span>
        </div>
      </div>
    </footer>
  );
}
