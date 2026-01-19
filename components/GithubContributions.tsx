
import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// We distribute 53 weeks across 12 months precisely
const MONTH_SPANS = [4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 6]; 

const ContributionKey: React.FC<{ level: number }> = ({ level }) => {
  const ledRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef<HTMLDivElement>(null);

  const getLedColor = (l: number) => {
    switch (l) {
      case 0: return 'bg-zinc-800 dark:bg-zinc-900 opacity-20';
      case 1: return 'bg-emerald-500 opacity-40 shadow-[0_0_4px_rgba(16,185,129,0.3)]';
      case 2: return 'bg-emerald-400 opacity-60 shadow-[0_0_8px_rgba(52,211,153,0.5)]';
      case 3: return 'bg-emerald-300 opacity-80 shadow-[0_0_12px_rgba(110,231,183,0.7)]';
      case 4: return 'bg-white shadow-[0_0_15px_rgba(255,255,255,1),0_0_5px_rgba(52,211,153,1)]';
      default: return 'bg-zinc-800';
    }
  };

  return (
    <div className="contribution-day-item group relative" data-level={level} data-activated="false">
      <div 
        ref={keyRef}
        className="premium-key w-full h-full rounded-[2px] sm:rounded-[3px] bg-white dark:bg-[#0d0d0d] relative flex items-center justify-center transition-all duration-300"
        style={{ opacity: 0.1, transform: 'scale(0.8)' }}
      >
        <div className="absolute inset-[1px] rounded-[1px] border-t border-white/10 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        <div 
          ref={ledRef}
          className={`status-led w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-500 ${getLedColor(level)}`}
          style={{ opacity: 0 }}
        />
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
        <div className="bg-[#111] border border-white/10 px-2 py-1 rounded text-[8px] font-black text-emerald-400 uppercase tracking-widest whitespace-nowrap shadow-2xl">
          {level === 0 ? 'No' : level * 4} Commits
        </div>
      </div>
    </div>
  );
};

export const GithubContributions: React.FC = () => {
  const chassisRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  // Flatten weeks for a single grid container to avoid alignment sub-pixel drift
  const flatContributions = useMemo(() => {
    return Array.from({ length: 53 * 7 }, () => {
      return Math.random() > 0.85 ? Math.floor(Math.random() * 5) : (Math.random() > 0.6 ? 1 : 0);
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      gsap.set(chassisRef.current, { opacity: 0, y: 20 });
      
      tl.to(chassisRef.current, { opacity: 1, y: 0, duration: 1.2 })
        .to(scanLineRef.current, {
          top: "115%", 
          duration: 4, 
          ease: "power2.inOut",
          onUpdate: function() {
            const progress = this.progress();
            const items = document.querySelectorAll(".contribution-day-item");
            const threshold = progress * items.length;
            
            items.forEach((item, i) => {
              if (i < threshold && item.getAttribute('data-activated') !== 'true') {
                item.setAttribute('data-activated', 'true');
                const key = item.querySelector('.premium-key');
                const led = item.querySelector('.status-led');
                const level = parseInt(item.getAttribute('data-level') || '0');
                
                const isDark = document.documentElement.classList.contains('dark');
                const shadowColor = isDark ? '#000' : '#e2e8f0';
                
                gsap.to(key, { 
                  opacity: 1, 
                  scale: 1, 
                  boxShadow: isDark 
                    ? `inset 0 1px 2px rgba(255, 255, 255, 0.05), 0 2px 0 #000, 0 5px 15px rgba(0, 0, 0, 0.1)` 
                    : `0 2px 4px rgba(0,0,0,0.05), 0 2px 0 #e2e8f0`,
                  duration: 0.4,
                  ease: "back.out(2)"
                });

                if (level > 0) {
                  gsap.to(led, { opacity: 1, scale: 1.2, duration: 0.3, delay: 0.1 });
                } else {
                  gsap.to(led, { opacity: 0.2, duration: 0.3 });
                }
              }
            });
          },
          onComplete: () => {
            gsap.to(scanLineRef.current, { opacity: 0, duration: 1 });
          }
        });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        ref={chassisRef} 
        style={{ boxShadow: 'var(--premium-shadow)' }}
        className="w-full relative overflow-hidden bg-zinc-50 dark:bg-[#0d0d0d] rounded-[3rem] py-8 sm:py-16 px-6 sm:px-12 border border-zinc-200 dark:border-white/5 transition-all duration-500"
      >
        <div ref={scanLineRef} className="scan-line" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="flex items-center justify-between mb-12 relative z-10">
          <div className="space-y-1">
            <div className="text-[10px] font-black text-zinc-900 dark:text-white uppercase tracking-[0.3em] flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
              Live Contribution Velocity
            </div>
            <p className="text-xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              364 <span className="text-zinc-500 font-medium italic">Commits tracked in current cycle</span>
            </p>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar relative z-10">
          <div className="min-w-[900px] flex flex-col gap-4">
            
            {/* Months Header - Precisely aligned using the MONTH_SPANS array */}
            <div className="grid grid-cols-53 text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-4">
              {MONTHS.map((m, i) => (
                <span 
                  key={m} 
                  className="pl-1" 
                  style={{ gridColumn: `span ${MONTH_SPANS[i]}` }}
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Year Grid: 53 columns, 7 rows (days flow down) */}
            <div className="grid grid-cols-53 grid-rows-7 grid-flow-col gap-1.5 sm:gap-2 h-[100px] sm:h-[130px]">
              {flatContributions.map((level, idx) => (
                <ContributionKey key={idx} level={level} />
              ))}
            </div>

            <div className="flex items-center justify-between mt-12 pt-8 border-t border-zinc-200 dark:border-white/5">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                  <span>Less</span>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4].map(l => (
                      <div key={l} className="w-3.5 h-3.5 rounded-[3px] bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-white/5 flex items-center justify-center">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          l === 0 ? 'bg-zinc-300 dark:bg-zinc-700' : 
                          l === 1 ? 'bg-emerald-900' : 
                          l === 2 ? 'bg-emerald-600' : 
                          l === 3 ? 'bg-emerald-400' : 'bg-white'
                        }`} />
                      </div>
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">System Engine: V8 Distribution</span>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
