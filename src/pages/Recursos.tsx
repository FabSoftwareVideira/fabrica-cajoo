import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Laptop, 
  BookMarked, 
  FolderOpen, 
  CalendarDays, 
  Compass, 
  ExternalLink, 
  Search, 
  Filter,
  Check,
  Sparkles,
  Layers,
  Grid,
  Cpu,
  BookOpen,
  Building2
} from 'lucide-react';

import { RECURSOS_OFICIAIS } from '../data/mockData';
import { Recurso } from '../types';
import { CyberCard } from '../components/CyberCard';
import { NeonButton } from '../components/NeonButton';
import { HeroParticles } from '../components/HeroParticles';
import { FadeInSection } from '../components/FadeInSection';

export const Recursos: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: (
      <div className="transition-transform duration-300 group-hover:scale-110">
        <GraduationCap className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
      </div>
    ),
    Laptop: (
      <div className="transition-transform duration-300 group-hover:scale-110">
        <Laptop className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
      </div>
    ),
    BookMarked: (
      <div className="transition-transform duration-300 group-hover:scale-110">
        <BookMarked className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
      </div>
    ),
    FolderOpen: (
      <div className="transition-transform duration-300 group-hover:scale-110">
        <FolderOpen className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
      </div>
    ),
    CalendarDays: (
      <div className="transition-transform duration-300 group-hover:scale-110">
        <CalendarDays className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
      </div>
    ),
    Compass: (
      <div className="transition-transform duration-300 group-hover:scale-110">
        <Compass className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
      </div>
    )
  };

  const categories = [
    { name: 'Todos', icon: Grid },
    { name: 'Sistemas', icon: Cpu },
    { name: 'Biblioteca', icon: BookMarked },
    { name: 'Estudos', icon: BookOpen },
    { name: 'Institucional', icon: Building2 }
  ];

  const filteredRecursos = RECURSOS_OFICIAIS.filter((rec) => {
    const matchesCategory = selectedCategory === 'Todos' || rec.category === selectedCategory;
    const matchesSearch = rec.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rec.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAccess = (rec: Recurso) => {
    if (rec.isExternal && rec.url !== '#') {
      window.open(rec.url, '_blank');
    } else {
      setDownloadNotice(`Acessando ${rec.title}... Redirecionando para arquivo interno.`);
      setTimeout(() => setDownloadNotice(null), 3000);
    }
  };

  return (
    <div className="pt-28 pb-20 space-y-12 sm:space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HERO SECTION - Landing Pattern */}
      <section>
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 sm:p-12 lg:p-14 bg-[#07050e] border border-purple-900/40 overflow-hidden shadow-2xl text-center space-y-4"
        >
          {/* Ambient Glows */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-112.5 h-112.5 bg-purple-600/15 blur-[140px] pointer-events-none rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" 
          />

          <HeroParticles />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Recursos <span className="bg-linear-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">Oficiais</span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed max-w-2xl mx-auto">
              Acesse diretamente o SIGAA, Moodle, Biblioteca, horários de aula e manuais do curso em um clique.
            </p>
          </div>
        </motion.div>
      </section>

      {/* FILTER & SEARCH BAR */}
      <section className="bg-[#0c0c12] p-3 sm:p-4 rounded-2xl border border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`group px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 transition-transform duration-300 ${isSelected ? 'text-zinc-200' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar recurso..."
            className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-zinc-700 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-white placeholder-zinc-500 outline-none transition-colors"
          />
        </div>
      </section>

      {/* DOWNLOAD / ACTION TOAST NOTICE */}
      {downloadNotice && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs rounded-xl flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-zinc-400" />
            <span>{downloadNotice}</span>
          </div>
        </motion.div>
      )}

      {/* RECURSOS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecursos.map((rec) => (
          <CyberCard 
            key={rec.id} 
            className="flex flex-col justify-between h-full space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                {iconMap[rec.iconName]}
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-mono font-bold text-white">
                  {rec.title}
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {rec.description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80">
              <NeonButton
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => handleAccess(rec)}
                icon={<ExternalLink className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                Acessar Recurso
              </NeonButton>
            </div>
          </CyberCard>
        ))}
      </section>

      {filteredRecursos.length === 0 && (
        <div className="bg-[#0c0c12] p-12 text-center rounded-2xl border border-zinc-800/80 font-mono text-zinc-400 space-y-2">
          <p className="text-base font-bold text-white">Nenhum recurso encontrado.</p>
          <p className="text-xs">Tente buscar por outros termos ou selecionar outra categoria.</p>
        </div>
      )}

    </div>
  );
};
