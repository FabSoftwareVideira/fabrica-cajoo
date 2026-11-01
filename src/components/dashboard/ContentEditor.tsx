import { Save, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import type { Comunicado, EventoGaleria } from '../../types';
import { api, errorMessage, today } from '../../lib/api';
import { Modal } from '../Modal';
import { ImagePicker } from './ImagePicker';

export function ContentEditor({
  kind,
  item,
  onClose,
  onSaved,
}: {
  kind: 'notice' | 'gallery';
  item?: Comunicado | EventoGaleria;
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const notice = item as Comunicado | undefined,
    gallery = item as EventoGaleria | undefined;
  const [title, setTitle] = useState(item?.title || ''),
    [description, setDescription] = useState(item?.description || '');
  const [category, setCategory] = useState(item?.category || (kind === 'notice' ? 'Geral' : 'Integração'));
  const [date, setDate] = useState((kind === 'notice' ? notice?.date : gallery?.eventDate) || today());
  const [content, setContent] = useState(notice?.content || ''),
    [author, setAuthor] = useState(notice?.author || 'CAJOO');
  const [tags, setTags] = useState(notice?.tags?.join(', ') || '');
  const [location, setLocation] = useState(gallery?.location || ''),
    [images, setImages] = useState(gallery?.galleryImages || []);
  const [busy, setBusy] = useState(false),
    [uploading, setUploading] = useState(false),
    [error, setError] = useState('');
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const body =
        kind === 'notice'
          ? {
              title,
              description,
              category,
              date,
              content,
              author,
              tags: tags
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean),
            }
          : { title, description, category, eventDate: date, location, galleryImages: images };
      await api(
        `/${kind === 'notice' ? 'notices' : 'gallery'}${item ? `/${item.id}` : ''}`,
        item ? 'PUT' : 'POST',
        body,
      );
      await onSaved();
      onClose();
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal
      open
      onClose={() => {
        if (!busy && !uploading) onClose();
      }}
      titleId="content-editor-title"
      className="max-w-3xl"
    >
      <div className="editor-heading">
        <div>
          <span className="eyebrow">{kind === 'notice' ? 'Recados' : 'Galeria'}</span>
          <h2 id="content-editor-title">
            {item ? 'Editar' : 'Criar'} {kind === 'notice' ? 'recado' : 'álbum'}
          </h2>
        </div>
        <button
          type="button"
          className="icon-button"
          aria-label="Fechar editor"
          disabled={busy || uploading}
          onClick={onClose}
        >
          <X />
        </button>
      </div>
      <form onSubmit={submit} className="editor-form form-stack">
        <fieldset disabled={busy} className="form-stack">
          <label className="field">
            Título
            <input
              required
              maxLength={200}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                kind === 'notice' ? 'O que a comunidade precisa saber?' : 'Dê um nome a este momento'
              }
            />
          </label>
          <div className="form-columns">
            <label className="field">
              Categoria
              {kind === 'notice' ? (
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {['Geral', 'Acadêmico', 'Eventos', 'Oportunidades', 'Estágio'].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              ) : (
                <input
                  required
                  maxLength={60}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  list="gallery-categories"
                />
              )}
            </label>
            <label className="field">
              Data
              <input
                type="date"
                required
                min="2000-01-01"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>
          <datalist id="gallery-categories">
            {['Acadêmico', 'Competição', 'Integração', 'Visita Técnica'].map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <label className="field">
            {kind === 'notice' ? 'Resumo' : 'Descrição'}
            <textarea
              required
              rows={3}
              maxLength={2000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Conte um pouco mais…"
            />
          </label>
          {kind === 'notice' ? (
            <>
              <label className="field">
                Texto completo
                <textarea
                  required
                  rows={8}
                  maxLength={30000}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Escreva o recado. As quebras de linha serão preservadas."
                />
              </label>
              <div className="form-columns">
                <label className="field">
                  Autoria
                  <input
                    required
                    maxLength={120}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </label>
                <label className="field">
                  Palavras-chave
                  <input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Separadas por vírgula"
                    maxLength={410}
                  />
                </label>
              </div>
            </>
          ) : (
            <>
              <label className="field">
                Local
                <input
                  maxLength={160}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Onde aconteceu?"
                />
              </label>
              <div>
                <p className="font-semibold mb-3">
                  Fotos do álbum <span className="text-zinc-500 font-normal">{images.length}/12</span>
                </p>
                <ImagePicker images={images} onChange={setImages} onBusy={setUploading} />
              </div>
            </>
          )}
        </fieldset>
        {error && (
          <p className="feedback-error" role="alert">
            {error}
          </p>
        )}
        <div className="editor-actions">
          <button type="button" disabled={busy || uploading} onClick={onClose} className="button-secondary">
            Cancelar
          </button>
          <button className="button-primary" disabled={busy || uploading}>
            <Save size={18} />
            {busy ? 'Salvando…' : 'Salvar e publicar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
