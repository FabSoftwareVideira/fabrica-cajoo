import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon, Calendar, MapPin, Eye, Sparkles } from 'lucide-react';

import { GALERIA_DATA } from '../data/mockData';
import { EventoGaleria } from '../types';
import { LightboxModal } from '../components/LightboxModal';
import { NeonButton } from '../components/NeonButton';
import { HeroParticles } from '../components/HeroParticles';

export const Galeria: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedEvento, setSelectedEvento] = useState<EventoGaleria | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const categories = ['Todos', 'Acadêmico', 'Competição', 'Integração', 'Visita Técnica'];

  const filteredGaleria = GALERIA_DATA.filter((item) => {
    return selectedCategory === 'Todos' || item.category === selectedCategory;
  });

  const handleOpenLightbox = (evento: EventoGaleria) => {
    setSelectedEvento(evento);
    setActiveImageIndex(0);
  };

  const handlePrevImage = () => {
    if (!selectedEvento) return;
    const total = selectedEvento.galleryImages.length > 0 ? selectedEvento.galleryImages.length : 1;
    setActiveImageIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!selectedEvento) return;
    const total = selectedEvento.galleryImages.length > 0 ? selectedEvento.galleryImages.length : 1;
    setActiveImageIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
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
            className="absolute top-0 right-0 w-[450px] h-[450px] bg-purple-600/15 blur-[140px] pointer-events-none rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" 
          />

          <HeroParticles />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Galeria de <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">Eventos</span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed max-w-2xl mx-auto">
              Confira fotos das Semanas Acadêmicas, Minicursos, Projetos de Extensão e momentos de integração do CAJOO.
            </p>
          </div>
        </motion.div>
      </section>

      {/* CATEGORY TABS */}
      <section className="flex justify-center">
        <div className="glass-panel p-2 rounded-2xl border border-purple-500/30 flex items-center gap-2 overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-cyan-300'
                  : 'bg-purple-950/30 text-gray-400 hover:text-white hover:bg-purple-900/40 border border-purple-900/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY MASONRY / GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGaleria.map((evento) => (
          <motion.div
            key={evento.id}
            whileHover={{ y: -6 }}
            className="group relative rounded-xl overflow-hidden glass-panel border border-purple-500/30 hover:border-cyan-400/80 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            onClick={() => handleOpenLightbox(evento)}
          >
            {/* Image Container with Hover Scale */}
            <div className="relative h-44 sm:h-48 overflow-hidden bg-black">
              <img
                src={evento.mainImage}
                alt={evento.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-[#05050a]/40 to-transparent" />

              {/* Photo Count Badge */}
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2 py-0.5 text-[10px] font-mono text-white bg-purple-950/80 border border-purple-500/40 rounded-md flex items-center gap-1 backdrop-blur-md">
                  <ImageIcon className="w-3 h-3 text-cyan-400" />
                  {evento.galleryImages.length} fotos
                </span>
              </div>

              {/* Overlay Eye Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-purple-950/40 backdrop-blur-xs">
                <div className="p-2.5 rounded-full bg-cyan-500 text-black shadow-[0_0_15px_#06b6d4]">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Bottom Details */}
            <div className="p-4 space-y-2 relative z-10 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-mono font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {evento.title}
                </h3>
                <p className="text-xs text-gray-300 font-sans line-clamp-2 leading-relaxed">
                  {evento.description}
                </p>
              </div>

              <div className="pt-2 border-t border-purple-900/30 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                <span className="flex items-center gap-1 truncate">
                  <Calendar className="w-3 h-3 text-purple-400 shrink-0" />
                  {evento.eventDate}
                </span>
                <span className="flex items-center gap-1 text-gray-400 truncate">
                  <MapPin className="w-3 h-3 text-purple-400 shrink-0" />
                  {evento.location}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* LIGHTBOX MODAL */}
      <LightboxModal
        evento={selectedEvento}
        currentImageIndex={activeImageIndex}
        onClose={() => setSelectedEvento(null)}
        onPrevImage={handlePrevImage}
        onNextImage={handleNextImage}
      />

    </div>
  );
};
