import  { useState } from 'react';
import {  Search, Calendar, ChevronRight, Share2, Bookmark, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type NewsCategory = 'Todos' | 'Editais' | 'Eventos' | 'Acordos' | 'Coordenação';

interface NewsItem {
  id: string;
  title: string;
  category: NewsCategory;
  date: string;
  excerpt: string;
  isImportant?: boolean;
}

const MOCK_NEWS: NewsItem[] = [
  { id: '1', title: 'Abertura de Inscrições: I Semana de Computação', category: 'Eventos', date: '04 Mai 2024', excerpt: 'O CAJOO convida todos para a semana acadêmica com foco em tendências de mercado e novas tecnologias.', isImportant: true },
  { id: '2', title: 'Edital de Monitoria 2024.1 Disponibilizado', category: 'Editais', date: '02 Mai 2024', excerpt: 'A coordenação de curso publicou o edital para vagas de monitoria em disciplinas do núcleo comum.' },
  { id: '3', title: 'Reunião do Colegiado: Alteração de Grade', category: 'Coordenação', date: '01 Mai 2024', excerpt: 'Informações sobre a última reunião do colegiado que tratou sobre a flexibilização de pré-requisitos.' },
  { id: '4', title: 'Novo Acordo de Intercâmbio Acadêmico', category: 'Acordos', date: '28 Abr 2024', excerpt: 'O instituto firmou parceria com universidades europeias para pesquisa em Ciência de Dados.' },
  { id: '5', title: 'Nota Oficial: Reforma dos Laboratórios', category: 'Coordenação', date: '25 Abr 2024', excerpt: 'Comunicado oficial sobre o cronograma de manutenção dos laboratórios do bloco B.' },
];

export default function Comunicados() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = MOCK_NEWS.filter(n => {
    const matchesCategory = activeCategory === 'Todos' || n.category === activeCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container" style={{ paddingTop: '10rem', paddingBottom: '8rem' }}>
      <div className="max-w-4xl mb-24 px-4">
        <span className="text-purple-500 font-black uppercase tracking-extra-widest mb-4" style={{ display: 'block', fontSize: '10px' }}>Informativo Acadêmico</span>
        <h1 className="font-black mb-10 text-white tracking-tight" style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)', lineHeight: '0.9' }}>
          Comunicados <span className="gradient-text">Oficiais</span>
        </h1>
        <p className="text-zinc-500 font-medium" style={{ fontSize: '1.25rem', lineHeight: '1.6', maxWidth: '42rem' }}>
          Fique por dentro das decisões, editais e eventos que impactam sua jornada no curso de Computação.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start', padding: '0 1rem' }}>
        {/* Sidebar Filters */}
        <div style={{ position: 'sticky', top: '8rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
             <div className="relative">
                <Search className="absolute" size={16} style={{ left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#52525b' }} />
                <input 
                  type="text" 
                  placeholder="Pesquisar comunicados..." 
                  style={{ 
                    width: '100%', backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.05)', 
                    borderRadius: '9999px', padding: '1rem 1rem 1rem 3rem', fontSize: '0.75rem', 
                    fontWeight: 500, outline: 'none', color: '#d4d4d8'
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             
             <div>
                <h4 style={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.3em', color: '#3f3f46', marginBottom: '2rem', padding: '0 1rem' }}>Filtrar por Tipo</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {['Todos', 'Editais', 'Eventos', 'Acordos', 'Coordenação'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat as NewsCategory)}
                      style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                        padding: '1rem 1.5rem', borderRadius: '9999px', fontSize: '10px', 
                        fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer',
                        backgroundColor: activeCategory === cat ? 'white' : 'transparent',
                        color: activeCategory === cat ? 'black' : '#52525b',
                        border: 'none', transition: 'all 0.3s ease'
                      }}
                    >
                      {cat}
                      <span style={{ 
                        width: '0.375rem', height: '0.375rem', borderRadius: '50%',
                        backgroundColor: cat === 'Editais' ? '#f97316' : 
                                         cat === 'Eventos' ? '#8b5cf6' : 
                                         cat === 'Coordenação' ? '#3b82f6' : '#27272a'
                      }} />
                    </button>
                  ))}
                </div>
             </div>
             
             <div style={{ padding: '2rem', borderRadius: '2rem', background: 'rgba(139, 92, 246, 0.03)', border: '1px solid rgba(139, 92, 246, 0.1)', position: 'relative', overflow: 'hidden' }}>
                <Info size={24} style={{ color: '#8b5cf6', marginBottom: '1.5rem' }} />
                <h5 style={{ color: 'white', fontWeight: 700, marginBottom: '0.75rem', letterSpacing: '-0.025em' }}>Transparência</h5>
                <p style={{ fontSize: '10px', color: '#71717a', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.6, marginBottom: '1.5rem' }}>O CAJOO preza pela clareza na comunicação institucional.</p>
                <button className="secondary-button" style={{ width: '100%', padding: '0.875rem', borderRadius: '9999px', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Inscrições Abertas</button>
             </div>
        </div>

        {/* Content List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 3 }}>
           <AnimatePresence mode="popLayout">
             {filteredNews.map((news) => (
                <motion.div
                  layout
                  key={news.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="glass-card"
                  style={{ 
                    padding: '2.5rem', borderLeft: '2px solid',
                    borderLeftColor: news.category === 'Editais' ? '#f97316' : 
                                     news.category === 'Eventos' ? '#8b5cf6' : 
                                     news.category === 'Coordenação' ? '#3b82f6' : '#27272a'
                  }}
                >
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#52525b' }}>
                         <Calendar size={12} style={{ opacity: 0.5, color: '#8b5cf6' }} /> {news.date}
                      </span>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                         <button style={{ background: 'none', border: 'none', color: '#3f3f46', cursor: 'pointer' }}><Bookmark size={16} /></button>
                         <button style={{ background: 'none', border: 'none', color: '#3f3f46', cursor: 'pointer' }}><Share2 size={16} /></button>
                      </div>
                   </div>
                   
                   <h3 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.025em', color: '#e4e4e7', lineHeight: 1.2 }}>{news.title}</h3>
                   <p style={{ color: '#71717a', fontWeight: 500, lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '42rem' }}>{news.excerpt}</p>
                   
                   <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '1rem', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#a78bfa' }}>
                      Acessar Documento 
                      <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ChevronRight size={16} />
                      </div>
                   </button>
                </motion.div>
             ))}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
