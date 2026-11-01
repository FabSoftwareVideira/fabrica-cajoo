import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, errorMessage } from '../lib/api';
import type { Comunicado, EventoGaleria, TeamMember } from '../types';

interface Content {
  notices: Comunicado[];
  galleries: EventoGaleria[];
  team: TeamMember[];
}
const empty: Content = { notices: [], galleries: [], team: [] };
const Context = createContext<
  (Content & { loading: boolean; error: string; refresh: () => Promise<void> }) | null
>(null);
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    try {
      setContent(await api<Content>('/content'));
      setError('');
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void refresh();
    const update = () => {
      void refresh();
    };
    window.addEventListener('focus', update);
    return () => window.removeEventListener('focus', update);
  }, [refresh]);
  return <Context.Provider value={{ ...content, loading, error, refresh }}>{children}</Context.Provider>;
}
export function useContent() {
  const value = useContext(Context);
  if (!value) throw new Error('ContentProvider ausente');
  return value;
}
