import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User } from '../types';
import { api, setCsrf, errorMessage } from '../lib/api';

interface Session {
  user: User | null;
  csrf: string;
}
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  changePassword: (currentPassword: string, password: string) => Promise<void>;
}
const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apply = useCallback((session: Session) => {
    setUser(session.user);
    setCsrf(session.csrf);
    setError('');
  }, []);
  const refresh = useCallback(async () => {
    try {
      apply(await api<Session>('/auth/session'));
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [apply]);
  useEffect(() => {
    try {
      localStorage.removeItem('cajoo_auth_user');
    } catch {
      /* Armazenamento local desabilitado. */
    }
    void refresh();
    const update = () => {
      void refresh();
    };
    const expired = () => apply({ user: null, csrf: '' });
    window.addEventListener('focus', update);
    window.addEventListener('cajoo:unauthorized', expired);
    return () => {
      window.removeEventListener('focus', update);
      window.removeEventListener('cajoo:unauthorized', expired);
    };
  }, [refresh, apply]);
  async function login(email: string, password: string) {
    apply(await api<Session>('/auth/login', 'POST', { email, password }));
  }
  async function logout() {
    await api('/auth/logout', 'POST');
    apply({ user: null, csrf: '' });
  }
  async function changePassword(currentPassword: string, password: string) {
    apply(await api<Session>('/auth/password', 'PUT', { currentPassword, password }));
  }
  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, refresh, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('AuthProvider ausente');
  return value;
}
