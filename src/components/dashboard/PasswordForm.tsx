import { KeyRound } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { errorMessage } from '../../lib/api';
export function PasswordForm() {
  const { user, changePassword } = useAuth();
  const [current, setCurrent] = useState(''),
    [password, setPassword] = useState(''),
    [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [success, setSuccess] = useState('');
  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirm) {
      setError('As novas senhas não coincidem.');
      return;
    }
    setBusy(true);
    try {
      await changePassword(current, password);
      setCurrent('');
      setPassword('');
      setConfirm('');
      setSuccess('Senha atualizada. Suas outras sessões foram encerradas.');
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="dashboard-panel max-w-2xl">
      <span className="feature-icon">
        <KeyRound />
      </span>
      <h2 className="text-2xl font-bold mt-4">
        {user?.mustChangePassword ? 'Vamos preparar seu acesso.' : 'Alterar minha senha'}
      </h2>
      <p className="text-zinc-400 mt-2 mb-6">
        {user?.mustChangePassword
          ? 'Troque a senha inicial por uma senha só sua para acessar o painel.'
          : 'Escolha uma senha de pelo menos 8 caracteres.'}
      </p>
      <form onSubmit={submit} className="form-stack">
        <label className="field">
          Senha atual
          <input
            type="password"
            required
            maxLength={128}
            autoComplete="current-password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </label>
        <div className="form-columns">
          <label className="field">
            Nova senha
            <input
              type="password"
              required
              minLength={8}
              maxLength={128}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="field">
            Confirmar nova senha
            <input
              type="password"
              required
              minLength={8}
              maxLength={128}
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>
        </div>
        {error && (
          <p role="alert" className="feedback-error">
            {error}
          </p>
        )}
        {success && (
          <p role="status" className="feedback-success">
            {success}
          </p>
        )}
        <button className="button-primary self-start" disabled={busy}>
          {busy ? 'Salvando…' : 'Salvar nova senha'}
        </button>
      </form>
    </section>
  );
}
