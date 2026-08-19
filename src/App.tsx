import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { SobreCurso } from './pages/SobreCurso';
import { CentroAcademico } from './pages/CentroAcademico';
import { Recursos } from './pages/Recursos';
import { Comunicados } from './pages/Comunicados';
import { Galeria } from './pages/Galeria';
import { Contato } from './pages/Contato';
import { Login } from './pages/Login';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[#050505] text-gray-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
          <Header />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/curso" element={<SobreCurso />} />
              <Route path="/ca" element={<CentroAcademico />} />
              <Route path="/recursos" element={<Recursos />} />
              <Route path="/comunicados" element={<Comunicados />} />
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
