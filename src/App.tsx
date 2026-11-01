import { MotionConfig } from 'motion/react';
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';

import { Footer } from './components/Footer';
import { Header } from './components/Header';

import { CentroAcademico } from './pages/CentroAcademico';
import { Comunicados } from './pages/Comunicados';
import { Galeria } from './pages/Galeria';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Recursos } from './pages/Recursos';
import { SobreCurso } from './pages/SobreCurso';
const Dashboard = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Dashboard })));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen text-gray-100 flex flex-col font-sans">
              <a href="#main-content" className="skip-link">
                Pular para o conteúdo
              </a>
              <Header />

              <main id="main-content" className="flex-1 min-w-0" tabIndex={-1}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/curso" element={<SobreCurso />} />
                  <Route path="/ca" element={<CentroAcademico />} />
                  <Route path="/recursos" element={<Recursos />} />
                  <Route path="/comunicados" element={<Comunicados />} />
                  <Route path="/galeria" element={<Galeria />} />
                  <Route path="/contato" element={<Navigate to="/ca" replace />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/dashboard"
                    element={
                      <Suspense
                        fallback={
                          <div className="site-container page-stack" role="status">
                            Abrindo painel…
                          </div>
                        }
                      >
                        <Dashboard />
                      </Suspense>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </BrowserRouter>
        </MotionConfig>
      </ContentProvider>
    </AuthProvider>
  );
}
