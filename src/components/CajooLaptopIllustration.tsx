import { RotateCw } from 'lucide-react';
import { useState } from 'react';
import { CajooLogo } from './CajooLogo';

export function CajooLaptopIllustration({ className = '' }: { className?: string }) {
  const [cycle, setCycle] = useState(0);
  return (
    <div className={`laptop-scene ${className}`}>
      <div className="laptop-aura" aria-hidden="true" />
      <div
        key={cycle}
        className="laptop-stage"
        role="img"
        aria-label="Notebook CAJOO girando e abrindo a tela"
      >
        <div className="laptop-device">
          <div className="laptop-lid">
            <svg className="laptop-bracket left" viewBox="0 0 48 56" fill="none" aria-hidden="true">
              <path d="M34 12 17 28 34 44" />
            </svg>
            <svg className="laptop-bracket right" viewBox="0 0 48 56" fill="none" aria-hidden="true">
              <path d="M14 44 23 12 M30 12 43 28 30 44" />
            </svg>
            <div className="laptop-back">
              <span>
                cajoo<span className="text-fuchsia-400">.</span>
              </span>
            </div>
            <div className="laptop-display">
              <span className="laptop-camera" />
              <div className="laptop-screen-content">
                <CajooLogo size="lg" />
              </div>
            </div>
          </div>
          <div className="laptop-base">
            <div className="laptop-keys" />
            <div className="laptop-trackpad" />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setCycle((c) => c + 1)}
        className="laptop-replay"
        aria-label="Repetir animação do notebook"
      >
        <RotateCw size={16} />
        <span>Dar um giro</span>
      </button>
    </div>
  );
}
