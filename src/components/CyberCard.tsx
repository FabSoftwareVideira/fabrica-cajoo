import React from 'react';
import { motion } from 'motion/react';

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'purple' | 'cyan' | 'mixed';
  hoverScale?: boolean;
  onClick?: () => void;
  badge?: string;
}

export const CyberCard: React.FC<CyberCardProps> = ({
  children,
  className = '',
  hoverScale = true,
  onClick,
  badge
}) => {
  return (
    <motion.div
      whileHover={hoverScale ? { scale: 1.03, y: -4 } : {}}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`
        relative rounded-2xl p-6 bg-[#0d0d12]/90 backdrop-blur-md transition-colors duration-300 overflow-hidden
        border border-zinc-800/80 hover:border-zinc-700/90 hover:bg-[#12121c] hover:shadow-xl hover:shadow-purple-950/40
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2.5 py-0.5 text-[10px] font-sans font-semibold tracking-wider uppercase rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
            {badge}
          </span>
        </div>
      )}

      {children}
    </motion.div>
  );
};



