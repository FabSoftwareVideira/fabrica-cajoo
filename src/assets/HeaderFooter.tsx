import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from './context/AuthContext';

export function Header() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const desktopLinks = [
    { name: 'Início', href: '/' },
    { name: 'CA', href: '/ca' },
    { name: 'Contato', href: '/contato' },
  ];

  const allLinks = [
    { name: 'Início', href: '/' },
    { name: 'Comunicados', href: '/comunicados' },
    { name: 'Curso', href: '/curso' },
    { name: 'CA', href: '/ca' },
    { name: 'Recursos', href: '/recursos' },
    { name: 'Vagas', href: '/oportunidades' },
    { name: 'Demandas', href: '/demandas' },
    { name: 'Contato', href: '/contato' },
  ];

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        <Link
          to="/"
          className="logo-group"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
          }}
        >
          <div
            className="logo-box"
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "0.5rem",
              background:
                "linear-gradient(to bottom right, #8B5CF6, #EC4899, #F97316)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: "white",
              fontStyle: "italic",
            
            }}
          >
            C
          </div>
          <span
            className="gradient-text"
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              letterSpacing: "-0.05em",
            }}
          >
            CAJOO
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-links">
          {desktopLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link ${location.pathname === link.href ? "active" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div
          className="header-actions"
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          {user ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                paddingLeft: "1rem",
                borderLeft: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    color: "#F3F4F6",
                  }}
                >
                  {user.displayName}
                </span>
                <button
                  onClick={signOut}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    color: "#71717a",
                    fontSize: "0.5rem",
                    fontWeight: "900",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  Sair <LogOut size={10} />
                </button>
              </div>
              <img
                src={user.photoURL || ""}
                alt="Avatar"
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                }}
              />
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="secondary-button"
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
              }}
            >
              Entrar
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#71717a",
            }}
            className="mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mobile-nav"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "rgba(5, 5, 5, 0.98)",
              backdropFilter: "blur(20px)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            {allLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  color: location.pathname === link.href ? "white" : "#71717a",
                  fontSize: "0.75rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  padding: "0.5rem 0",
                }}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  const { user } = useAuth();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div style={{ gridColumn: 'span 2' }}>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', textDecoration: 'none' }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', background: 'linear-gradient(to bottom right, #8B5CF6, #F97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}>C</div>
                <span className="gradient-text" style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '-0.05em' }}>CAJOO</span>
              </Link>
              <p style={{ color: '#71717a', maxWidth: '320px', fontSize: '0.875rem', lineHeight: '1.6' }}>
                Centro Acadêmico de Ciência da Computação do IF. 
                Fomentando a tecnologia, união e representação dos estudantes.
              </p>
            </div>
            
            <div>
              <h4 style={{ color: 'white', fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Links Úteis</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0 }}>
                <li><Link to="/recursos" className="nav-link">Recursos Oficiais</Link></li>
                <li><Link to="/demandas" className="nav-link">Demandas Acadêmicas</Link></li>
                <li><Link to="/comunicados" className="nav-link">Comunicados</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: 'white', fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Social</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0 }}>
                <li><a href="#" className="nav-link">Instagram</a></li>
                <li><a href="#" className="nav-link">GitHub</a></li>
                <li><a href="#" className="nav-link">Discord</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Status Bar */}
      <div style={{ 
        height: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.8)',
        padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: '0.5rem', color: '#52525b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.25em'
      }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span>Status: <span style={{ color: '#10b981' }}>Online</span></span>
          <span>User: <span style={{ color: '#d4d4d8' }}>{user ? user.displayName : 'Visitante'}</span></span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', fontStyle: 'italic', opacity: 0.8 }}>
          <span>Desenvolvido pelo CA</span>
          <span>v2.4.0</span>
        </div>
      </div>
    </div>
  );
}
