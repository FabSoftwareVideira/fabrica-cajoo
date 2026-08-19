import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Instagram, Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { CajooLogo } from './CajooLogo';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'cajoo.ifc@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative bg-[#060609] text-zinc-400 border-t border-zinc-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/80">
          
          {/* Column 1: CAJOO Info */}
          <div className="space-y-4">
            <CajooLogo size="md" />
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              O Centro Acadêmico de Ciência da Computação (CAJOO) é a entidade representativa oficial dos alunos de Ciência da Computação do Instituto Federal.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 font-sans">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              Navegação
            </h3>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/curso" className="hover:text-white transition-colors">
                  Sobre o Curso
                </Link>
              </li>
              <li>
                <Link to="/ca" className="hover:text-white transition-colors">
                  Centro Acadêmico
                </Link>
              </li>
              <li>
                <Link to="/recursos" className="hover:text-white transition-colors">
                  Recursos Oficiais
                </Link>
              </li>
              <li>
                <Link to="/comunicados" className="hover:text-white transition-colors">
                  Comunicados
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional Systems */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 font-sans">
              <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
              Acesso Rápido
            </h3>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <a href="https://sig.ifc.edu.br/sigaa/verTelaLogin.do" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Portal SIGAA IFC
                </a>
              </li>
              <li>
                <a href="https://moodle.ifc.edu.br" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Moodle Institucional
                </a>
              </li>
              <li>
                <a href="https://biblioteca.ifc.edu.br" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Biblioteca
                </a>
              </li>
              <li>
                <Link to="/galeria" className="hover:text-white transition-colors">
                  Galeria de Eventos
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white font-sans">
              Contato Oficial
            </h3>
            
            <button
              onClick={copyEmail}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 transition-all group"
            >
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">{email}</span>
              </div>
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-zinc-500 group-hover:text-white shrink-0" />
              )}
            </button>

            <div>
              <p className="text-xs text-zinc-400 mb-2 font-sans">Redes Sociais:</p>
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} CAJOO - Centro Acadêmico de Ciência da Computação.</p>
        </div>
      </div>
    </footer>
  );
};


