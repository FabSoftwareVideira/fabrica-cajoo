import { RefreshCw } from 'lucide-react';
export function ContentStatus({
  loading,
  error,
  empty,
  onRetry,
}: {
  loading: boolean;
  error: string;
  empty?: string;
  onRetry: () => void;
}) {
  if (loading)
    return (
      <p role="status" className="empty-state">
        Carregando conteúdo…
      </p>
    );
  if (error)
    return (
      <div role="alert" className="empty-state">
        <p>{error}</p>
        <button onClick={onRetry} className="button-secondary mt-4">
          <RefreshCw size={18} />
          Tentar novamente
        </button>
      </div>
    );
  if (empty) return <p className="empty-state">{empty}</p>;
  return null;
}
