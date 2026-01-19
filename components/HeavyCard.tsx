
import React from 'react';
import { motion } from 'framer-motion';

interface HeavyCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const HeavyCard: React.FC<HeavyCardProps> = ({ children, className = '', noPadding = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ boxShadow: 'var(--premium-shadow)' }}
      className={`
        relative group transition-all duration-500
        bg-zinc-50 dark:bg-[#0d0d0d] 
        p-[5px]
        rounded-[1.5rem] lg:rounded-[2.2rem]
        ${className}
      `}
    >
      {/* TOP BEVEL (Exact Same Style as Navbar) */}
      <div className={`
        absolute inset-[5px] pointer-events-none z-20
        border-t border-white dark:border-white/[0.08] 
        bg-gradient-to-b from-white/40 dark:from-white/[0.02] to-transparent
        rounded-[1.2rem] lg:rounded-[1.8rem]
      `} />

      {/* INNER BOX */}
      <div className={`
        relative z-10 w-full h-full
        bg-white/60 dark:bg-white/[0.02] 
        border border-white dark:border-white/[0.02]
        rounded-[1.2rem] lg:rounded-[1.8rem]
        ${noPadding ? '' : 'p-6 md:p-10'}
      `}>
        {children}
      </div>
    </motion.div>
  );
};
