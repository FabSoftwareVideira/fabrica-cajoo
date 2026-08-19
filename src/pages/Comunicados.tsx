import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, Search, Calendar, User, Tag, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

import { COMUNICADOS_DATA } from '../data/mockData';
import { Comunicado } from '../types';
import { ComunicadoModal } from '../components/ComunicadoModal';
import { HeroParticles } from '../components/HeroParticles';
import { FadeInSection } from '../components/FadeInSection';

export const Comunicados: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeComunicado, setActiveComunicado] = useState<Comunicado | null>(null);

  const categories = ['Todos', 'Acadêmico', 'Eventos', 'Oportunidades', 'Estágio'];

  const filteredComunicados = COMUNICADOS_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featured = COMUNICADOS_DATA.find((item) => item.featured) || COMUNICADOS_DATA[0];

  return (
    <div className="pt-28 pb-20 space-y-12 sm:space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <section>
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 sm:p-12 lg:p-14 bg-[#07050e] border border-purple-900/40 overflow-hidden shadow-2xl text-center space-y-4"
        >
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
              Comunicados & <span className="bg-linear-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">Avisos</span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed max-w-2xl mx-auto">
              Notícias acadêmicas, editais de estágios, bolsas de pesquisa e informes oficiais da coordenação e do CAJOO.
            </p>
          </div>
        </motion.div>
      </section>

      {/* FEATURED NOTICE BANNER */}
      {featured && (
        <section>
          <div className="bg-[#0c0c12] rounded-2xl p-6 sm:p-8 border border-zinc-800/80 relative overflow-hidden space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
              <Sparkles className="w-4 h-4" />
              <span className="uppercase tracking-wider text-[11px]">Destaque Principal</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {featured.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                  {featured.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-zinc-500 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    {featured.author}
                  </span>
                </div>
              </div>

              <div className="flex lg:justify-end">
                <button
                  onClick={() => setActiveComunicado(featured)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2 shadow-md shadow-purple-900/20"
                >
                  <span>Ler Comunicado</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FILTER & SEARCH BAR */}
      <section className="bg-[#0c0c12] p-3 sm:p-4 rounded-2xl border border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar notícias..."
            className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-zinc-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 outline-none transition-colors"
          />
        </div>
      </section>

      {/* LIST OF NOTICES */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredComunicados.map((item) => (
          <div 
            key={item.id} 
            className="bg-[#0c0c12]/80 border border-zinc-800/60 hover:border-zinc-700/80 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-end">
                <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  {item.date}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-800/50 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500">Por {item.author}</span>
              <button 
                onClick={() => setActiveComunicado(item)}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
              >
                <span>Ler Mais</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {filteredComunicados.length === 0 && (
        <div className="bg-[#0c0c12] p-12 text-center rounded-2xl border border-zinc-800/80 text-zinc-400 space-y-1">
          <p className="text-sm font-bold text-white">Nenhum comunicado encontrado.</p>
          <p className="text-xs text-zinc-500">Tente alterar os termos de pesquisa ou o filtro de categorias.</p>
        </div>
      )}

      {/* READ MODAL */}
      <ComunicadoModal
        comunicado={activeComunicado}
        onClose={() => setActiveComunicado(null)}
      />

    </div>
  );
};

