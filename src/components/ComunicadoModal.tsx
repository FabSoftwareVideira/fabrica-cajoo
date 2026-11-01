import { Calendar, Check, Share2, User, X } from 'lucide-react';
import { useState } from 'react';
import type { Comunicado } from '../types';
import { Modal } from './Modal';
import { formatDate } from '../lib/api';

export function ComunicadoModal({
  comunicado,
  onClose,
}: {
  comunicado: Comunicado | null;
  onClose: () => void;
}) {
  const [message, setMessage] = useState('');
  const share = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/comunicados?recado=${comunicado?.id}`);
      setMessage('Link copiado!');
    } catch {
      setMessage('Não foi possível copiar. Use o endereço do navegador.');
    }
  };
  return (
    <Modal
      open={!!comunicado}
      onClose={() => {
        setMessage('');
        onClose();
      }}
      titleId="notice-title"
      className="max-w-2xl"
    >
      {comunicado && (
        <>
          <div className="p-5 sm:p-7 border-b border-white/10 flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <span className="inline-block text-sm text-purple-200 bg-purple-400/10 rounded-full px-3 py-1">
                {comunicado.category}
              </span>
              <h2 id="notice-title" className="text-2xl sm:text-3xl font-bold mt-4">
                {comunicado.title}
              </h2>
              <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mt-4">
                <span className="inline-flex items-center gap-2">
                  <Calendar size={17} />
                  {formatDate(comunicado.date)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <User size={17} />
                  {comunicado.author}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Fechar comunicado"
              className="w-11 h-11 rounded-xl grid place-items-center bg-white/5 shrink-0"
            >
              <X size={23} />
            </button>
          </div>
          <div className="p-5 sm:p-7 space-y-5 text-base text-zinc-300 leading-relaxed break-words whitespace-pre-wrap">
            {comunicado.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="p-5 border-t border-white/10 flex flex-wrap items-center gap-3 justify-between">
            <button onClick={share} className="button-secondary">
              {message === 'Link copiado!' ? <Check size={20} /> : <Share2 size={20} />} Compartilhar
            </button>
            <button onClick={onClose} className="button-secondary">
              Fechar
            </button>
            {message && (
              <p role="status" className="w-full text-sm text-purple-200">
                {message}
              </p>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
