import { Save, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import type { User } from '../../types';
import { api, errorMessage } from '../../lib/api';
import { Modal } from '../Modal';
import { ImagePicker } from './ImagePicker';

export function PersonEditor({
  person,
  currentId,
  onClose,
  onSaved,
}: {
  person?: User;
  currentId: string;
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [name, setName] = useState(person?.name || ''),
    [position, setPosition] = useState(person?.position || '');
  const [photoUrl, setPhoto] = useState(person?.photoUrl || ''),
    [bio, setBio] = useState(person?.bio || '');
  const [email, setEmail] = useState(person?.email || ''),
    [password, setPassword] = useState(''),
    [currentPassword, setCurrentPassword] = useState('');
  const [visible, setVisible] = useState(person?.visible ?? true),
    [order, setOrder] = useState(person?.order || 0),
    [year, setYear] = useState(person?.year || new Date().getFullYear());
  const [busy, setBusy] = useState(false),
    [uploading, setUploading] = useState(false),
    [error, setError] = useState('');
  const self = person?.id === currentId;
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api(`/people${person ? `/${person.id}` : ''}`, person ? 'PUT' : 'POST', {
        name,
        position,
        photoUrl,
        bio,
        email,
        password,
        currentPassword,
        visible,
        order,
        year,
      });
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
      titleId="person-editor-title"
      className="max-w-2xl"
    >
      <div className="editor-heading">
        <div>
          <span className="eyebrow">Pessoas</span>
          <h2 id="person-editor-title">{person ? 'Editar perfil' : 'Cadastrar pessoa'}</h2>
        </div>
        <button
          type="button"
          className="icon-button"
          aria-label="Fechar editor"
          onClick={onClose}
          disabled={busy || uploading}
        >
          <X />
        </button>
      </div>
      <form onSubmit={submit} className="editor-form form-stack">
        <fieldset disabled={busy} className="form-stack">
          <div className="form-columns">
            <label className="field">
              Nome
              <input required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="field">
              Cargo na gestão
              <input
                maxLength={120}
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Ex.: Comunicação"
              />
            </label>
          </div>
          <div>
            <p className="font-semibold mb-3">Foto do perfil</p>
            <ImagePicker
              images={photoUrl ? [photoUrl] : []}
              max={1}
              onChange={(images) => setPhoto(images[0] || '')}
              onBusy={setUploading}
            />
          </div>
          <label className="field">
            Apresentação
            <textarea rows={3} maxLength={1000} value={bio} onChange={(e) => setBio(e.target.value)} />
          </label>
          <div className="form-columns">
            <label className="field">
              Ano da gestão
              <input
                type="number"
                required
                min={2000}
                max={2200}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </label>
            <label className="field">
              Ordem de exibição
              <input
                type="number"
                required
                min={0}
                max={999}
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
              />
            </label>
          </div>
          <label className="checkbox-row">
            <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />
            <span>Exibir na página O CAJOO</span>
          </label>
          <div className="form-divider">
            <h3>Acesso ao painel</h3>
            <p>
              {self
                ? 'Mantenha seu e-mail de acesso atualizado.'
                : 'Informe um e-mail e uma senha inicial para liberar o acesso. Sem e-mail, a pessoa terá somente o perfil público.'}
            </p>
          </div>
          <label className="field">
            E-mail
            <input
              type="email"
              required={!!person?.hasAccess}
              maxLength={254}
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {!self && (
            <label className="field">
              {person?.hasAccess ? 'Nova senha temporária (opcional)' : 'Senha inicial'}
              <input
                type="password"
                required={!!email && !person?.hasAccess}
                minLength={8}
                maxLength={128}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Pelo menos 8 caracteres"
              />
              <small>A pessoa deverá trocar a senha no primeiro acesso.</small>
            </label>
          )}
          {self && email !== person?.email && (
            <label className="field">
              Confirme sua senha atual
              <input
                type="password"
                required
                maxLength={128}
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>
          )}
        </fieldset>
        {error && (
          <p role="alert" className="feedback-error">
            {error}
          </p>
        )}
        <div className="editor-actions">
          <button type="button" disabled={busy || uploading} onClick={onClose} className="button-secondary">
            Cancelar
          </button>
          <button className="button-primary" disabled={busy || uploading}>
            <Save size={18} />
            {busy ? 'Salvando…' : 'Salvar pessoa'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
