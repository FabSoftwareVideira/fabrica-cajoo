import  { useState } from 'react';
import { Search, ExternalLink, Globe, BookOpen, GraduationCap, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Category = 'Oficiais' | 'Bibliotecas' | 'Estudos' | 'Diversos' | 'Todos';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: Category;
  url: string;
  provider: string;
}

const RESOURCES: Resource[] = [
  { id: '1', title: 'Portal do Aluno (SIGAA)', description: 'Acesso a notas, frequências, histórico escolar e planos de ensino oficiais.', category: 'Oficiais', provider: 'Instituto', url: 'https://sigaa.if.edu.br' },
  { id: '2', title: 'Moodle Institucional', description: 'Ambiente Virtual de Aprendizagem para materiais de aula e submissão de tarefas.', category: 'Oficiais', provider: 'Instituto', url: 'https://moodle.if.edu.br' },
  { id: '3', title: 'Biblioteca Central (Pergamum)', description: 'Reserva de livros físicos e acesso ao acervo digital do instituto.', category: 'Bibliotecas', provider: 'Biblioteca', url: 'https://biblioteca.if.edu.br' },
  { id: '4', title: 'IEEE Xplore Digital Library', description: 'Repositório de artigos científicos e pesquisas na área de tecnologia e engenharia.', category: 'Bibliotecas', provider: 'Externo', url: 'https://ieeexplore.ieee.org' },
  { id: '5', title: 'MDN Web Docs', description: 'A melhor documentação para desenvolvimento web (HTML, CSS, JS).', category: 'Estudos', provider: 'Comunidade', url: 'https://developer.mozilla.org' },
  { id: '6', title: 'Curso de Git e GitHub', description: 'Playlist recomendada para dominar o controle de versão.', category: 'Estudos', provider: 'YouTube', url: 'https://youtube.com/playlist?list=...' },
  { id: '7', title: 'Documentação Oficial React', description: 'Guia definitivo para aprender a biblioteca de UI.', category: 'Estudos', provider: 'React Team', url: 'https://react.dev' },
];

export default function OfficialResources() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = RESOURCES.filter(r => {
    const matchesCategory = activeCategory === 'Todos' || r.category === activeCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container" style={{ paddingTop: '10rem', paddingBottom: '8rem' }}>
      <div className="max-w-4xl mb-24 px-4">
        <span className="text-purple-500 font-black uppercase tracking-extra-widest mb-4" style={{ display: 'block', fontSize: '10px' }}>Ferramentas & Estudo</span>
        <h1 className="font-black mb-10 text-white tracking-tight" style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)', lineHeight: '0.9' }}>
          Recursos <span className="gradient-text">Oficiais</span>
        </h1>
        <p className="text-zinc-500 font-medium" style={{ fontSize: '1.25rem', lineHeight: '1.6', maxWidth: '42rem' }}>
          Links essenciais e curadoria de conteúdos para sua formação acadêmica e profissional, monitorados pelo CAJOO.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', padding: '0 1rem' }}>
        {/* Search and Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
          <div className="relative" style={{ flexGrow: 1 }}>
            <Search className="absolute" size={18} style={{ left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: '#52525b' }} />
            <input 
              type="text" 
              placeholder="Pesquisar por recurso ou ferramenta..."
              style={{ width: '100%', backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '9999px', padding: '1.25rem 2rem 1.25rem 4rem', fontSize: '1rem', fontWeight: 500, color: '#d4d4d8', outline: 'none' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', padding: '0.5rem' }}>
            {['Todos', 'Oficiais', 'Bibliotecas', 'Estudos'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as Category)}
                style={{ 
                  padding: '1.25rem 2rem', borderRadius: '9999px', fontSize: '10px', 
                  fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2rem', 
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

        {/* Resources Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <AnimatePresence mode="popLayout">
            {filteredResources.map((resource) => (
              <motion.div
                layout
                key={resource.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="glass-card"
                style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <div style={{ 
                    width: '3.5rem', height: '3.5rem', borderRadius: '1.25rem', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)',
                    backgroundColor: resource.category === 'Oficiais' ? 'rgba(139, 92, 246, 0.1)' :
                                    resource.category === 'Bibliotecas' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.02)',
                    color: resource.category === 'Oficiais' ? '#a78bfa' :
                           resource.category === 'Bibliotecas' ? '#60a5fa' : '#71717a'
                  }}>
                    {resource.category === 'Oficiais' ? <Globe size={24} /> : 
                     resource.category === 'Bibliotecas' ? <BookOpen size={24} /> : 
                     resource.category === 'Estudos' ? <GraduationCap size={24} /> : <LinkIcon size={24} />}
                  </div>
                  <span style={{ fontSize: '9px', fontWeight: 900, color: '#3f3f46', textTransform: 'uppercase', letterSpacing: '0.25em' }}>{resource.provider}</span>
                </div>
                
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'white', letterSpacing: '-0.025em' }}>{resource.title}</h3>
                <p style={{ color: '#71717a', fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.6, marginBottom: '2.5rem' }}>{resource.description}</p>
                
                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '10px', 
                      fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.25rem', 
                      color: 'white', textDecoration: 'none'
                    }}
                  >
                    Acessar Link <ExternalLink size={14} style={{ color: '#8b5cf6' }} />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
