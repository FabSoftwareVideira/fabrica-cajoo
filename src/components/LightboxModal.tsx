import { formatDate } from '../lib/api';
import { Calendar, ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react';
import type { EventoGaleria } from '../types';
import { Modal } from './Modal';

export function LightboxModal({
  evento,
  currentImageIndex,
  onClose,
  onPrevImage,
  onNextImage,
}: {
  evento: EventoGaleria | null;
  currentImageIndex: number;
  onClose: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
}) {
  const images = evento ? (evento.galleryImages.length ? evento.galleryImages : [evento.mainImage]) : [];
  return (
    <Modal open={!!evento} onClose={onClose} titleId="gallery-title" className="max-w-5xl">
      {evento && (
        <>
          <div className="p-5 flex items-start justify-between gap-4 border-b border-white/10">
            <div>
              <span className="text-sm text-purple-300">{evento.category}</span>
              <h2 id="gallery-title" className="text-xl sm:text-2xl font-bold mt-2">
                {evento.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Fechar galeria"
              className="w-11 h-11 grid place-items-center rounded-xl bg-white/5 shrink-0"
            >
              <X size={24} />
            </button>
          </div>
          <div className="relative bg-black flex items-center justify-center">
            <img
              src={images[currentImageIndex]}
              alt={`${evento.title} — foto ${currentImageIndex + 1}`}
              className="w-full max-h-[55dvh] object-contain"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={onPrevImage}
                  aria-label="Foto anterior"
                  className="absolute left-3 rounded-full p-3 bg-black/80 border border-white/30"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={onNextImage}
                  aria-label="Próxima foto"
                  className="absolute right-3 rounded-full p-3 bg-black/80 border border-white/30"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          <div className="p-5 space-y-3">
            <p className="text-zinc-300">{evento.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-2">
                <Calendar size={17} />
                {formatDate(evento.eventDate)}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={17} />
                {evento.location}
              </span>
              <span className="sm:ml-auto text-purple-300">
                {currentImageIndex + 1} de {images.length}
              </span>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
