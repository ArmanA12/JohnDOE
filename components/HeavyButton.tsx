

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// Override HTMLMotionProps children to be standard ReactNode to avoid type mismatch in standard components
interface HeavyButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const HeavyButton: React.FC<HeavyButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-8 py-4 text-sm'
  };

  const variantConfigs = {
    primary: {
      outer: 'bg-zinc-900 dark:bg-[#0d0d0d]',
      inner: 'bg-zinc-800 dark:bg-white/[0.05] text-white',
      shadow: 'shadow-[0_4px_0_#000] active:shadow-none'
    },
    secondary: {
      outer: 'bg-amber-600 dark:bg-amber-900',
      inner: 'bg-gradient-to-br from-amber-400 to-amber-600 text-white',
      shadow: 'shadow-[0_4px_0_#92400e] active:shadow-none'
    },
    outline: {
      outer: 'bg-zinc-50 dark:bg-[#0d0d0d]',
      inner: 'bg-white/60 dark:bg-white/[0.02] text-zinc-900 dark:text-zinc-400',
      shadow: 'shadow-[0_4px_0_#e2e8f0] dark:shadow-[0_4px_0_#000] active:shadow-none'
    }
  };

  const config = variantConfigs[variant];

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 2 }}
      className={`
        relative p-[3px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all duration-200
        ${config.outer} ${config.shadow} ${className}
      `}
      {...props}
    >
      <div className="absolute inset-[3px] pointer-events-none z-20 border-t border-white/20 dark:border-white/10 bg-gradient-to-b from-white/10 to-transparent rounded-[13px]" />
      <div className={`
        relative z-10 flex items-center justify-center gap-2 rounded-[13px]
        ${config.inner} ${sizeClasses[size]}
      `}>
        {children}
      </div>
    </motion.button>
  );
};