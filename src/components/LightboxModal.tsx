import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { EventoGaleria } from '../types';

interface LightboxModalProps {
  evento: EventoGaleria | null;
  currentImageIndex: number;
  onClose: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  evento,
  currentImageIndex,
  onClose,
  onPrevImage,
  onNextImage
}) => {
  if (!evento) return null;

  const images = evento.galleryImages.length > 0 ? evento.galleryImages : [evento.mainImage];
  const activeImage = images[currentImageIndex] || evento.mainImage;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-5xl w-full bg-[#0a0a14] border border-purple-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)] flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-4 bg-[#080810] border-b border-purple-900/30">
            <div>
              <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase bg-purple-900/60 text-cyan-300 border border-cyan-500/40 rounded-full">
                {evento.category}
              </span>
              <h3 className="text-lg font-bold font-mono text-white mt-1">{evento.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/40 text-gray-300 hover:text-white hover:bg-rose-900/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Display Area */}
          <div className="relative flex-1 bg-black flex items-center justify-center min-h-87.5 overflow-hidden">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              src={activeImage}
              alt={evento.title}
              className="max-h-[60vh] max-w-full object-contain"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={onPrevImage}
                  className="absolute left-4 p-3 rounded-full bg-black/70 border border-purple-500/40 text-cyan-300 hover:bg-purple-900/80 hover:scale-110 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={onNextImage}
                  className="absolute right-4 p-3 rounded-full bg-black/70 border border-purple-500/40 text-cyan-300 hover:bg-purple-900/80 hover:scale-110 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-4 bg-[#0a0a14] border-t border-purple-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs text-gray-300">{evento.description}</p>
              <div className="flex items-center gap-4 text-[11px] font-mono text-cyan-400 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  {evento.eventDate}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  {evento.location}
                </span>
              </div>
            </div>

            {images.length > 1 && (
              <span className="text-xs font-mono text-gray-400 shrink-0">
                {currentImageIndex + 1} de {images.length}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
