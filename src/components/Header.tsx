import {
  ArrowUpRight,
  Camera,
  FileText,
  GraduationCap,
  Home,
  LogOut,
  Megaphone,
  Menu,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CajooLogo } from './CajooLogo';

const navItems = [
  { label: 'Início', path: '/', icon: Home },
  { label: 'Comunicados', path: '/comunicados', icon: Megaphone },
  { label: 'Galeria', path: '/galeria', icon: Camera },
  { label: 'Curso', path: '/curso', icon: GraduationCap },
  { label: 'Recursos', path: '/recursos', icon: FileText },
  { label: 'O CAJOO', path: '/ca', icon: Users },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnResize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', outside);
    desktop.addEventListener('change', closeOnResize);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', outside);
      desktop.removeEventListener('change', closeOnResize);
    };
  }, [open]);

  return (
    <header
      ref={header}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#08080d]/95 backdrop-blur-xl"
    >
      <div className="site-container flex items-center justify-between gap-4 h-20">
        <Link to="/" aria-label="CAJOO — início" className="shrink-0">
          <CajooLogo size="lg" />
        </Link>
        <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-1">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end
              className={({ isActive }) =>
                `min-h-11 flex items-center px-3.5 rounded-xl text-sm font-semibold transition-colors ${isActive ? 'text-purple-200 bg-purple-400/10' : 'text-zinc-300 hover:text-white hover:bg-white/5'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <Link to="/dashboard" className="button-secondary !min-h-11 !px-3 !py-2">
              Meu painel <ArrowUpRight size={17} />
            </Link>
          ) : (
            <Link to="/login" className="button-secondary !min-h-11 !px-3 sm:!px-4 !py-2 !text-sm">
              Área do CA <ArrowUpRight size={17} className="hidden sm:block" />
            </Link>
          )}
          <button
            ref={toggle}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="lg:hidden w-11 h-11 grid place-items-center rounded-xl bg-white/5 border border-white/10 text-purple-200"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Navegação mobile"
          className="lg:hidden max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 bg-[#0e0b15]"
        >
          <div className="site-container py-4 grid gap-1">
            {navItems.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3.5 rounded-xl font-semibold ${isActive ? 'bg-purple-500/15 text-purple-200' : 'text-zinc-200 hover:bg-white/5'}`
                }
              >
                <Icon size={22} />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
