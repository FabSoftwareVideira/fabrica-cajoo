import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User as UserIcon, Lock, LogIn, LogOut } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { CajooLogo } from '../components/CajooLogo';
import { CyberCard } from '../components/CyberCard';
import { NeonButton } from '../components/NeonButton';
import { HeroParticles } from '../components/HeroParticles';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/');
    } else {
      setErrorMsg(res.message || 'Erro ao realizar login.');
    }
  };

  return (
    <div className="pt-28 pb-16 flex items-center justify-center min-h-[85vh] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Glows */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-purple-600/15 blur-[140px] pointer-events-none rounded-full" 
      />
      <HeroParticles />
      
      <div className="max-w-md w-full relative z-10">
        
        {/* If user is already authenticated */}
        {user ? (
          <CyberCard className="text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-indigo-400/40 mx-auto">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <span className="px-3 py-1 text-[10px] font-mono uppercase rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                {user.role === 'member' ? 'Membro da Diretoria CA' : 'Estudante Autenticado'}
              </span>
              <h2 className="text-xl font-bold text-white pt-2">{user.name}</h2>
              <p className="text-xs text-slate-400">{user.email}</p>
              {user.matricula && (
                <p className="text-[11px] text-slate-500">Matrícula: {user.matricula}</p>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <NeonButton
                variant="primary"
                fullWidth
                onClick={() => navigate('/')}
              >
                Acessar Portal Principal
              </NeonButton>

              <NeonButton
                variant="danger"
                fullWidth
                onClick={logout}
                icon={<LogOut className="w-4 h-4" />}
              >
                Sair da Conta
              </NeonButton>
            </div>
          </CyberCard>
        ) : (
          
          /* Login Form */
          <CyberCard className="space-y-6">
            <div className="text-center space-y-2">
              <CajooLogo size="md" className="justify-center" />
              <h1 className="text-lg font-bold text-white pt-2">
                Acesso de Membros do CA
              </h1>
              <p className="text-xs text-slate-400 font-sans">
                Entre com suas credenciais do CAJOO para acessar o portal administrativo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  E-mail Acadêmico
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@estudante.ifc.edu.br"
                    className="w-full bg-[#080911] border border-white/10 focus:border-indigo-400 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#080911] border border-white/10 focus:border-indigo-400 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-300 bg-rose-950/50 p-2.5 rounded-xl border border-rose-500/30">
                  {errorMsg}
                </p>
              )}

              <NeonButton
                variant="primary"
                type="submit"
                fullWidth
                disabled={loading}
                icon={<LogIn className="w-4 h-4" />}
              >
                {loading ? 'Autenticando...' : 'Entrar no Portal'}
              </NeonButton>
            </form>
          </CyberCard>
        )}

      </div>

    </div>
  );
};

