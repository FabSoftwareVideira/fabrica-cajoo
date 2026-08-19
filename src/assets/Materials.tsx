import { useState } from 'react';
import { Search, Upload, FileText, ExternalLink, ShieldAlert,ArrowRight } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { motion, AnimatePresence } from  "framer-motion";

type Category = 'Provas' | 'Resumos' | 'Links' | 'Todos';

interface Material {
  id: string;
  title: string;
  discipline: string;
  category: Category;
  author: string;
  date: string;
  url: string;
}

const MOCK_MATERIALS: Material[] = [
  { id: '1', title: 'Prova P1 - Resolução', discipline: 'Cálculo I', category: 'Provas', author: 'João Silva', date: '2023-11-20', url: '#' },
  { id: '2', title: 'Resumo Grafos e Árvores', discipline: 'Estrutura de Dados', category: 'Resumos', author: 'Maria Oliveira', date: '2024-03-15', url: '#' },
  { id: '3', title: 'Playlist Curso de C++', discipline: 'Introdução à Programação', category: 'Links', author: 'CAJOO', date: '2024-01-10', url: '#' },
  { id: '4', title: 'Guia de Complexidade O(n)', discipline: 'Análise de Algoritmos', category: 'Resumos', author: 'Pedro Santos', date: '2023-10-05', url: '#' },
  { id: '5', title: 'P2 - 2023.2 Semestre Passado', discipline: 'Banco de Dados', category: 'Provas', author: 'Ana Costa', date: '2023-12-12', url: '#' },
];

export default function Materials() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMaterials = MOCK_MATERIALS.filter(m => {
    const matchesCategory = activeCategory === 'Todos' || m.category === activeCategory;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.discipline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container" style={{ paddingTop: '10rem', paddingBottom: '8rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '5rem', padding: '0 1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '3rem' }}>
          <div style={{ maxWidth: '48rem' }}>
            <span className="text-purple-500 font-black uppercase tracking-extra-widest mb-4" style={{ display: 'block', fontSize: '10px' }}>Base de Conhecimento</span>
            <h1 className="font-black mb-8 text-white tracking-tight" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: 1.1 }}>
              Repositório de <span className="gradient-text">Materiais</span>
            </h1>
            <p className="text-zinc-500 font-medium" style={{ fontSize: '1.25rem', lineHeight: 1.6 }}>
              Acesse e compartilhe conteúdos de estudo enviados pela comunidade acadêmica.
            </p>
          </div>
          
          {user ? (
            <button className="gradient-button" style={{ padding: '1rem 2.5rem', borderRadius: '9999px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Upload size={16} /> Enviar Material
            </button>
          ) : (
            <div style={{ padding: '1.25rem 2rem', borderRadius: '1.5rem', backgroundColor: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.2)', color: '#f97316', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '1rem', backdropFilter: 'blur(4px)' }}>
               <ShieldAlert size={20} />
               <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Login necessário para contribuição</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {/* Filters and Search */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div className="relative" style={{ flexGrow: 1 }}>
            <Search className="absolute" size={18} style={{ left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: '#52525b' }} />
            <input 
              type="text" 
              placeholder="Filtre por disciplina ou título do arquivo..."
              style={{ width: '100%', backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '9999px', padding: '1.25rem 2rem 1.25rem 4rem', fontSize: '1rem', fontWeight: 500, color: '#d4d4d8', outline: 'none', transition: 'all 0.3s ease' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', padding: '0.5rem' }}>
            {['Todos', 'Provas', 'Resumos', 'Links'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as Category)}
                style={{ 
                  padding: '1.25rem 2rem', borderRadius: '9999px', fontSize: '10px', 
                  fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', 
                  cursor: 'pointer', transition: 'all 0.3s ease', whiteSpace: 'nowrap',
                  backgroundColor: activeCategory === cat ? 'white' : '#111111',
                  color: activeCategory === cat ? 'black' : '#52525b',
                  border: activeCategory === cat ? '1px solid white' : '1px solid rgba(255,255,255,0.05)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <AnimatePresence mode="popLayout">
            {filteredMaterials.map((material) => (
              <motion.div
                layout
                key={material.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="glass-card"
                style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <div style={{ 
                    width: '3rem', height: '3rem', borderRadius: '1rem', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: material.category === 'Provas' ? 'rgba(239, 68, 68, 0.1)' :
                                    material.category === 'Resumos' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                    color: material.category === 'Provas' ? '#ef4444' :
                           material.category === 'Resumos' ? '#3b82f6' : '#10b981'
                  }}>
                    {material.category === 'Links' ? <ExternalLink size={20} /> : <FileText size={20} />}
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 900, color: '#3f3f46', textTransform: 'uppercase', letterSpacing: '0.25em' }}>{material.discipline}</span>
                </div>
                
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.025em', color: 'white' }}>{material.title}</h3>
                
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Enviado por {material.author}</span>
                    <span style={{ fontSize: '9px', color: '#52525b', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{material.date}</span>
                  </div>
                  <a 
                    href={material.url} 
                    style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52525b', transition: 'all 0.3s ease', textDecoration: 'none' }}
                  >
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredMaterials.length === 0 && (
          <div style={{ padding: '5rem 0', textAlign: 'center' }}>
            <p style={{ color: '#71717a', fontSize: '1.125rem' }}>Nenhum material encontrado com esses filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
