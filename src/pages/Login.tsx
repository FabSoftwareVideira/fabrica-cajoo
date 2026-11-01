import { LogIn, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CajooLogo } from '../components/CajooLogo';
import { useAuth } from '../context/AuthContext';
import { errorMessage } from '../lib/api';

export function Login() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await auth.login(email, password);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  if (auth.loading)
    return (
      <div className="site-container page-stack" role="status">
        Carregando sua sessão…
      </div>
    );
  if (auth.user) return <Navigate to="/dashboard" replace />;
  return (
    <div className="login-layout site-container">
      <div className="login-intro">
        <span className="eyebrow">Nos bastidores do CAJOO</span>
        <h1 className="hero-title">
          Sua equipe.
          <br />
          Suas ideias.
          <br />
          <span className="gradient-text">Tudo conectado.</span>
        </h1>
        <p className="section-copy">
          Um espaço para cuidar da comunidade, compartilhar novidades e guardar os nossos melhores momentos.
        </p>
        <Link to="/" className="feature-link mt-8">
          <ArrowLeft size={18} />
          Voltar ao portal
        </Link>
      </div>
      <section className="login-card">
        <CajooLogo size="md" />
        <h2 className="text-3xl font-bold mt-6">Bom ter você aqui.</h2>
        <p className="text-zinc-400 mt-2 mb-7">Entre para acessar o painel da gestão.</p>
        <form onSubmit={submit} className="form-stack">
          <label className="field">
            E-mail
            <input
              type="email"
              autoComplete="username"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </label>
          <label className="field">
            Senha
            <div className="password-input">
              <input
                aria-label="Senha"
                type={visible ? 'text' : 'password'}
                autoComplete="current-password"
                required
                maxLength={128}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
                onClick={() => setVisible(!visible)}
              >
                {visible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </label>
          {(error || auth.error) && (
            <p role="alert" className="feedback-error">
              {error || auth.error}
            </p>
          )}
          <button className="button-primary w-full" disabled={busy}>
            {busy ? 'Entrando…' : 'Entrar no painel'}
            <LogIn size={19} />
          </button>
        </form>
        <p className="text-sm text-zinc-500 mt-6">O acesso é cadastrado pela administração do CA.</p>
      </section>
    </div>
  );
}
