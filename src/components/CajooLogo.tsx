import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtext?: boolean;
}

export const CajooLogo: React.FC<LogoProps> = ({ className = '', size = 'md', showSubtext = false }) => {
  const sizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl'
  };

  return (
    <div className={`relative inline-flex items-center group cursor-pointer select-none ${className}`}>
      <div className="flex flex-col">
        <div className={`font-black tracking-tight text-white ${sizeClasses[size]} flex items-baseline font-sans`}>
          <span className="text-white tracking-tighter">cajoo</span>
          <span className="text-[#ec4899] font-black leading-none ml-0.5 text-[1.1em]">.</span>
        </div>
        {showSubtext && (
          <span className="text-[10px] text-zinc-400 tracking-widest uppercase font-semibold -mt-1 font-sans">
            Ciência da Computação
          </span>
        )}
      </div>
    </div>
  );
};



