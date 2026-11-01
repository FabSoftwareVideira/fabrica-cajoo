import { ArrowUpRight, Camera, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LightboxModal } from '../components/LightboxModal';
import { ContentStatus } from '../components/ContentStatus';
import { useContent } from '../context/ContentContext';
import { formatDate } from '../lib/api';

export function Galeria() {
  const { galleries, loading, error, refresh } = useContent();
  const [category, setCategory] = useState('Todos'),
    [image, setImage] = useState(0);
  const [params, setParams] = useSearchParams();
  const active = galleries.find((g) => g.id === params.get('album')) || null;
  const categories = ['Todos', ...new Set(galleries.map((g) => g.category))];
  const filtered = galleries.filter((g) => category === 'Todos' || g.category === category);
  return (
    <div className="site-container page-stack">
      <section className="page-hero">
        <span className="eyebrow">Nossa comunidade em movimento</span>
        <h1>
          Momentos que <span className="gradient-text">ficam.</span>
        </h1>
        <p>Encontros, aprendizados e conexões. Um pouco do que a gente constrói junto.</p>
      </section>
      {galleries.length > 0 && (
        <nav className="filter-pills" aria-label="Categorias da galeria">
          {categories.map((c) => (
            <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </nav>
      )}
      <ContentStatus
        loading={loading}
        error={error}
        onRetry={refresh}
        empty={
          !filtered.length
            ? 'Novos momentos estão chegando. Em breve, as fotos da nossa comunidade estarão aqui.'
            : undefined
        }
      />
      <section className="gallery-grid">
        {filtered.map((item) => (
          <button
            key={item.id}
            className="gallery-card"
            onClick={() => {
              setImage(0);
              setParams({ album: item.id });
            }}
            aria-label={`Abrir fotos de ${item.title}`}
          >
            <div className="gallery-cover">
              <img src={item.mainImage} alt={item.title} loading="lazy" decoding="async" />
              <span>
                <Camera size={16} />
                {item.galleryImages.length} fotos
              </span>
              <i>
                <ArrowUpRight size={26} />
              </i>
            </div>
            <div className="gallery-details">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="badge">{item.category}</span>
                <time dateTime={item.eventDate}>{formatDate(item.eventDate)}</time>
              </div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {item.location && (
                <span className="inline-flex items-center gap-2 text-sm text-zinc-400 mt-4">
                  <MapPin size={16} />
                  {item.location}
                </span>
              )}
            </div>
          </button>
        ))}
      </section>
      <LightboxModal
        evento={active}
        currentImageIndex={active ? Math.min(image, active.galleryImages.length - 1) : 0}
        onClose={() => setParams({})}
        onPrevImage={() => {
          if (active) setImage((i) => (i + active.galleryImages.length - 1) % active.galleryImages.length);
        }}
        onNextImage={() => {
          if (active) setImage((i) => (i + 1) % active.galleryImages.length);
        }}
      />
    </div>
  );
}
