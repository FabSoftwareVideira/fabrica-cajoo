import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Megaphone, 
  Camera, 
  GraduationCap, 
  FileText, 
  Users, 
  Mail, 
  ArrowRight, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CajooLogo } from './CajooLogo';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Início', path: '/', icon: Home },
    { label: 'Comunicados', path: '/comunicados', icon: Megaphone },
    { label: 'Galeria', path: '/galeria', icon: Camera },
    { label: 'Curso', path: '/curso', icon: GraduationCap },
    { label: 'Recursos', path: '/recursos', icon: FileText },
    { label: 'Sobre o CA', path: '/ca', icon: Users },
    { label: 'Contato', path: '/contato', icon: Mail },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#060609]/95 backdrop-blur-xl border-b border-zinc-800/80 py-3 shadow-2xl' 
          : 'bg-[#060609]/75 backdrop-blur-md border-b border-zinc-900/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="outline-none shrink-0 py-1">
            <CajooLogo size="md" />
          </Link>

          {/* Center Navigation Bar */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-3.5 py-2 text-xs font-sans font-bold tracking-wide transition-all duration-200 rounded-xl ${
                    isActive
                      ? 'text-white bg-zinc-800/90 border border-purple-500/30'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-zinc-500'}`} />
                  <span>{item.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute -bottom-1 left-3 right-3 h-0.5 bg-linear-to-r from-purple-500 to-pink-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: ÁREA DO ALUNO Button & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <div className="flex items-center gap-3 bg-[#0d0d12] border border-zinc-800 rounded-xl px-3 py-1.5">
                <div className="w-7 h-7 rounded-lg overflow-hidden border border-purple-500/40 shrink-0">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white leading-tight">{user.name}</span>
                  <span className="text-[10px] text-purple-400 uppercase font-semibold">{user.role === 'member' ? 'Membro CA' : 'Estudante'}</span>
                </div>
                <button
                  onClick={logout}
                  title="Sair"
                  className="ml-2 text-zinc-400 hover:text-rose-400 transition-colors p-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-sans font-black text-xs uppercase tracking-wider text-white bg-linear-to-r from-purple-600 via-fuchsia-600 to-pink-500 border border-pink-400/30 shadow-[0_0_20px_rgba(217,70,239,0.25)] hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
                  <span>Área do CA</span>
                </button>
              </Link>
            )}

            {/* Mobile / Compact Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#0d0d12] border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors xl:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sliding Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-b border-purple-900/40 bg-[#090412]/95 backdrop-blur-2xl overflow-hidden mt-3"
          >
            <div className="px-4 pt-3 pb-6 space-y-2 max-w-7xl mx-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-sans font-bold transition-all ${
                      isActive
                        ? 'bg-linear-to-r from-purple-900/60 to-pink-900/60 text-white border border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.25)]'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-pink-400' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-pink-400' : 'text-gray-600'}`} />
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-purple-900/40">
                {user ? (
                  <div className="flex items-center justify-between bg-[#130b20] border border-purple-900/50 p-3 rounded-xl">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-lg object-cover border border-pink-500/40" />
                      <div>
                        <p className="text-xs font-bold text-white">{user.name}</p>
                        <p className="text-[10px] text-pink-300">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="px-3 py-1.5 text-xs bg-rose-950/60 text-rose-300 border border-rose-500/30 rounded-lg hover:bg-rose-900/80 font-sans"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="block">
                    <button className="w-full py-3 rounded-xl font-sans font-black text-xs uppercase tracking-wider text-white bg-linear-to-r from-purple-600 via-fuchsia-600 to-pink-500 border border-pink-400/30 shadow-[0_0_20px_rgba(217,70,239,0.35)] flex items-center justify-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      <span>Área do CA</span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


