import React from 'react';
import { motion } from 'motion/react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  onClick,
  disabled,
  type = 'button',
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-semibold gap-1.5 rounded-xl',
    md: 'px-5 py-2.5 text-xs font-bold gap-2 rounded-xl',
    lg: 'px-6 py-3 text-sm font-bold gap-2.5 rounded-xl'
  };

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-purple-600 to-indigo-600
      text-white
      hover:from-purple-500 hover:to-indigo-500
      border border-purple-400/20
    `,
    secondary: `
      bg-zinc-900/90 text-zinc-200
      hover:bg-zinc-800 hover:text-white
      border border-zinc-800
    `,
    outline: `
      bg-transparent text-zinc-300
      border border-zinc-800 hover:border-zinc-700
      hover:bg-zinc-900/60 hover:text-white
    `,
    danger: `
      bg-rose-950/60 text-rose-200
      border border-rose-800/40 hover:bg-rose-900/70 hover:text-white
    `
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center tracking-wide transition-all duration-200 cursor-pointer font-sans
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </motion.button>
  );
};


