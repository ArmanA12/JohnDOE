
import React, { useState, useEffect } from 'react';
import { ScanSearch, Moon, Sun, Spade } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, setIsDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', short: 'A', href: '#about' },
    { name: 'Experience', short: 'E', href: '#experience' },
    { name: 'Projects', short: 'P', href: '#projects' },
    { name: 'Activities', short: 'Ac', href: '#activities' },
  ];

  return (
    <div className="fixed top-4 lg:top-8 left-0 right-0 z-[100] px-4 lg:px-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ boxShadow: 'var(--premium-shadow)' }}
        className={`
          relative mx-auto pointer-events-auto transition-all duration-500
          bg-zinc-50 dark:bg-[#0d0d0d] 
          p-[5px]
          ${isScrolled 
            ? 'max-w-[340px] md:max-w-[550px] lg:max-w-[800px] rounded-full' 
            : 'max-w-full md:max-w-[1000px] rounded-[1.5rem] lg:rounded-[2.2rem]'
          }
        `}
      >
        <div className={`
          absolute inset-[5px] pointer-events-none z-20
          border-t border-white dark:border-white/[0.08] 
          bg-gradient-to-b from-white/40 dark:from-white/[0.02] to-transparent
          ${isScrolled ? 'rounded-full' : 'rounded-[1.2rem] lg:rounded-[1.8rem]'}
        `} />

        <div className={`
          relative z-10 flex items-center justify-between w-full px-3 md:px-6 lg:px-8 py-1 lg:py-3
          bg-white/60 dark:bg-white/[0.02] 
          border-white dark:border-white/[0.02]
          ${isScrolled ? 'rounded-full' : 'rounded-[1.2rem] lg:rounded-[1.8rem]'}
        `}>
          
          <div className="flex items-center gap-2 lg:gap-3 group cursor-pointer shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div style={{
              backgroundImage: "linear-gradient(to right bottom, #f59e09, #ed8d02, #e57d00, #dc6c00, #d35b00)",
            }} className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center transition-all group-hover:rotate-[12deg] shadow-sm shrink-0">
              <Spade size={16} className="text-white" />
            </div>
            <span className={`font-black tracking-tight uppercase text-zinc-900 dark:text-white transition-all ${isScrolled ? 'hidden md:block' : 'text-xs lg:text-xl'}`}>
              John<span className="text-amber-500"> DOE</span>
            </span>
          </div>

          <div className="flex items-center gap-0 lg:gap-6">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-2 md:px-3 py-2 font-black tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-amber-500 transition-all text-[10px] lg:text-[12px] uppercase"
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="inline md:hidden">{item.short}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1 lg:gap-3 shrink-0">
            <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <ScanSearch size={16} />
            </button>
            <div className="w-[1px] h-3 bg-black/5 dark:bg-white/10 mx-1"></div>
            <button onClick={() => setIsDark(!isDark)} className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-amber-500 transition-colors">
              <AnimatePresence mode="wait">
                <motion.div key={isDark ? 'dark' : 'light'} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
