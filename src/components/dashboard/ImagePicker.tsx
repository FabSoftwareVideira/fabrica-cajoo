import { Upload, X, ArrowLeft } from 'lucide-react';
import { useId, useState, type ChangeEvent } from 'react';
import { api, errorMessage } from '../../lib/api';

export function ImagePicker({
  images,
  onChange,
  max = 12,
  onBusy,
}: {
  images: string[];
  onChange: (images: string[]) => void;
  max?: number;
  onBusy?: (busy: boolean) => void;
}) {
  const inputId = useId();
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [url, setUrl] = useState('');
  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (!files.length) return;
    if (files.length + images.length > max) {
      setError(`Selecione no máximo ${max} imagem(ns).`);
      return;
    }
    setBusy(true);
    onBusy?.(true);
    setError('');
    const next = [...images];
    try {
      for (const file of files) {
        if (file.size > 6 * 1024 * 1024) throw new Error('Cada imagem pode ter até 6 MB.');
        const data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result).split(',')[1]);
          reader.onerror = () => reject(new Error('Não foi possível abrir o arquivo.'));
          reader.readAsDataURL(file);
        });
        const result = await api<{ url: string }>('/media', 'POST', { data });
        next.push(result.url);
        onChange([...next]);
      }
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
      onBusy?.(false);
    }
  }
  function addUrl() {
    try {
      if (new URL(url).protocol !== 'https:') throw new Error();
    } catch {
      setError('Use um endereço completo com https://.');
      return;
    }
    if (images.length >= max) {
      setError(`Limite de ${max} imagens.`);
      return;
    }
    onChange([...images, url.trim()]);
    setUrl('');
    setError('');
  }
  return (
    <div className="image-picker">
      <div className="image-picker-grid">
        {images.map((image, index) => (
          <div key={`${index}-${image}`} className="image-preview">
            <img src={image} alt={`Imagem ${index + 1}`} loading="lazy" />
            <button
              type="button"
              disabled={busy}
              aria-label={`Remover imagem ${index + 1}`}
              onClick={() => onChange(images.filter((_, i) => i !== index))}
            >
              <X size={18} />
            </button>
            {index === 0 ? (
              <span>Capa</span>
            ) : (
              <button
                type="button"
                className="image-cover-button"
                disabled={busy}
                aria-label={`Usar imagem ${index + 1} como capa`}
                onClick={() => onChange([image, ...images.filter((_, i) => i !== index)])}
              >
                <ArrowLeft size={16} />
                Capa
              </button>
            )}
          </div>
        ))}
      </div>
      {images.length < max && (
        <>
          <label htmlFor={inputId} className={`upload-area ${busy ? 'opacity-50' : ''}`}>
            <Upload size={23} />
            <span>
              {busy ? 'Otimizando e enviando…' : 'Selecionar fotos'}
              <small>JPG, PNG, WebP ou AVIF · até 6 MB por foto</small>
            </span>
            <input
              id={inputId}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              multiple={max > 1}
              disabled={busy}
              onChange={upload}
            />
          </label>
          <details className="text-sm text-zinc-400">
            <summary className="cursor-pointer py-2">Ou usar uma imagem por link</summary>
            <div className="flex gap-2 mt-2">
              <input
                aria-label="Endereço HTTPS da imagem"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://…"
                className="form-input min-w-0 flex-1"
              />
              <button
                type="button"
                className="button-secondary !px-3"
                disabled={busy || !url}
                onClick={addUrl}
              >
                Adicionar
              </button>
            </div>
          </details>
        </>
      )}
      {error && (
        <p className="feedback-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
