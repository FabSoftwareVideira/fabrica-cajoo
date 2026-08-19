import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, Share2, Check } from 'lucide-react';
import { Comunicado } from '../types';

interface ComunicadoModalProps {
  comunicado: Comunicado | null;
  onClose: () => void;
}

export const ComunicadoModal: React.FC<ComunicadoModalProps> = ({ comunicado, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!comunicado) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative max-w-2xl w-full bg-[#0c0c12] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-6 bg-zinc-900/60 border-b border-zinc-800/80 flex items-start justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 text-[11px] font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-md">
                {comunicado.category}
              </span>
              <h2 className="text-xl font-bold text-white mt-3 leading-snug">
                {comunicado.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mt-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  {comunicado.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-zinc-500" />
                  {comunicado.author}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-4 font-sans text-zinc-300 text-sm leading-relaxed">
            {comunicado.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-xs font-medium text-zinc-300 hover:text-white transition-colors px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-zinc-400" />}
              <span>{copied ? 'Link Copiado!' : 'Compartilhar'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

