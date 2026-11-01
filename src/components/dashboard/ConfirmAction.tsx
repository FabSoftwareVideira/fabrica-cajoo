import { useState, type FormEvent } from 'react';
import { Modal } from '../Modal';
import { errorMessage } from '../../lib/api';
export function ConfirmAction({
  title,
  description,
  passwordRequired,
  confirmLabel,
  onConfirm,
  onClose,
}: {
  title: string;
  description: string;
  passwordRequired?: boolean;
  confirmLabel: string;
  onConfirm: (password: string) => Promise<void>;
  onClose: () => void;
}) {
  const [password, setPassword] = useState(''),
    [busy, setBusy] = useState(false),
    [error, setError] = useState('');
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await onConfirm(password);
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
        if (!busy) onClose();
      }}
      titleId="confirm-title"
      className="max-w-lg"
    >
      <form onSubmit={submit} className="editor-form form-stack">
        <h2 id="confirm-title" className="text-2xl font-bold">
          {title}
        </h2>
        <p className="text-zinc-400">{description}</p>
        {passwordRequired && (
          <label className="field">
            Sua senha atual
            <input
              type="password"
              required
              maxLength={128}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        )}
        {error && (
          <p role="alert" className="feedback-error">
            {error}
          </p>
        )}
        <div className="editor-actions">
          <button type="button" disabled={busy} className="button-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="button-primary" disabled={busy}>
            {busy ? 'Aguarde…' : confirmLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
}
