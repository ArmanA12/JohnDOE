
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
  SiTypescript, SiJavascript, SiPython, SiGo, SiRust, SiCplusplus, 
  SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiRedux, SiNodedotjs, 
  SiPostgresql, SiGraphql, SiPrisma, SiMongodb, SiRedis, SiFastapi, 
  SiDocker, SiGit, SiFigma, SiSupabase, SiKubernetes, SiTerraform, 
  SiNeovim, SiJest, SiSwift, SiVuedotjs, SiSvelte, SiThreedotjs 
} from 'react-icons/si';
import { FaAws, FaJava } from 'react-icons/fa';
import { Skill } from '../types';

export const SKILLS_DATA: Skill[] = [
  { id: '1', name: 'TypeScript', category: 'language', isKnown: true, icon: <SiTypescript /> },
  { id: '2', name: 'JavaScript', category: 'language', isKnown: true, icon: <SiJavascript /> },
  { id: '3', name: 'Python', category: 'language', isKnown: true, icon: <SiPython /> },
  { id: '8', name: 'React', category: 'frontend', isKnown: true, icon: <SiReact /> },
  { id: '9', name: 'Next.js', category: 'frontend', isKnown: true, icon: <SiNextdotjs /> },
  { id: '11', name: 'Tailwind CSS', category: 'frontend', isKnown: true, icon: <SiTailwindcss /> },
  { id: '14', name: 'Framer Motion', category: 'frontend', isKnown: true, icon: <SiFramer /> },
  { id: '15', name: 'Redux', category: 'frontend', isKnown: true, icon: <SiRedux /> },
  { id: '16', name: 'Node.js', category: 'backend', isKnown: true, icon: <SiNodedotjs /> },
  { id: '17', name: 'PostgreSQL', category: 'backend', isKnown: true, icon: <SiPostgresql /> },
  { id: '19', name: 'GraphQL', category: 'backend', isKnown: true, icon: <SiGraphql /> },
  { id: '22', name: 'Prisma', category: 'backend', isKnown: true, icon: <SiPrisma /> },
  { id: '23', name: 'Docker', category: 'devops', isKnown: true, icon: <SiDocker /> },
  { id: '28', name: 'Git', category: 'tools', isKnown: true, icon: <SiGit /> },
  { id: '29', name: 'Figma', category: 'tools', isKnown: true, icon: <SiFigma /> },
  { id: '4', name: 'Go Lang', category: 'language', isKnown: false, icon: <SiGo /> },
  { id: '5', name: 'Rust', category: 'language', isKnown: true, icon: <SiRust /> },
  { id: '6', name: 'C++', category: 'language', isKnown: false, icon: <SiCplusplus /> },
  { id: '7', name: 'Java', category: 'language', isKnown: true, icon: <FaJava /> },
  { id: '36', name: 'Swift', category: 'language', isKnown: true, icon: <SiSwift /> },
  { id: '10', name: 'Vue.js', category: 'frontend', isKnown: false, icon: <SiVuedotjs /> },
  { id: '12', name: 'Svelte', category: 'frontend', isKnown: false, icon: <SiSvelte /> },
  { id: '13', name: 'Three.js', category: 'frontend', isKnown: true, icon: <SiThreedotjs /> },
  { id: '18', name: 'MongoDB', category: 'backend', isKnown: false, icon: <SiMongodb /> },
  { id: '20', name: 'Redis', category: 'backend', isKnown: true, icon: <SiRedis /> },
  { id: '21', name: 'FastAPI', category: 'backend', isKnown: true, icon: <SiFastapi /> },
  { id: '24', name: 'Kubernetes', category: 'devops', isKnown: true, icon: <SiKubernetes /> },
  { id: '25', name: 'AWS', category: 'devops', isKnown: false, icon: <FaAws /> },
  { id: '27', name: 'Terraform', category: 'devops', isKnown: false, icon: <SiTerraform /> },
  { id: '30', name: 'Neovim', category: 'tools', isKnown: true, icon: <SiNeovim /> },
  { id: '32', name: 'Jest', category: 'tools', isKnown: false, icon: <SiJest /> },
  { id: '33', name: 'Supabase', category: 'tools', isKnown: true, icon: <SiSupabase /> },
];

interface SkillCardProps { 
  skill: Skill; 
  index: number; 
  isAutoHighlight?: boolean; 
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index, isAutoHighlight = true }) => {
  const isHighlighted = skill.isKnown;
  const iconRef = useRef<HTMLDivElement>(null);
  const ledRef = useRef<HTMLDivElement>(null);
  const keycapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const highlightColor = '#f59e09';
  const statusColor = '#d35b00';

  useEffect(() => {
    if (isHighlighted && isAutoHighlight) {
      const tl = gsap.timeline({ repeat: -1 });
      if (ledRef.current) {
        tl.to(ledRef.current, { opacity: 1, scale: 1.1, filter: 'blur(0.5px) brightness(1.5)', duration: 0.1, ease: "power2.in" })
          .to(ledRef.current, { opacity: 0.7, scale: 1, filter: 'blur(0.2px) brightness(1)', duration: 1.2, ease: "power1.out" })
          .to(ledRef.current, { opacity: 0.7, duration: 0.8 });
      }
      if (iconRef.current) {
        gsap.to(iconRef.current, { filter: `drop-shadow(0 0-shadow(0 0 12px ${highlightColor}60)`, scale: 1.02, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }
    }
  }, [isHighlighted, isAutoHighlight, skill]);

  const handleMouseEnter = () => {
    const parent = keycapRef.current?.closest('.grid-item');
    if (parent?.getAttribute('data-activated') !== 'true') return;
    gsap.to(keycapRef.current, { y: -6, scale: 1.04, duration: 0.3, ease: "power2.out" });
    if (tooltipRef.current) gsap.to(tooltipRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(keycapRef.current, { y: 0, scale: 1, duration: 0.5, ease: "elastic.out(1.2, 0.6)" });
    if (tooltipRef.current) gsap.to(tooltipRef.current, { opacity: 0, y: 10, scale: 0.9, duration: 0.2 });
  };

  return (
    <div className="relative group w-full aspect-square keycap-container">
      <div ref={tooltipRef} className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 transform translate-y-4 scale-90 z-50">
        <div className="bg-[#111] border border-white/10 px-4 py-2 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,1)] flex flex-col items-center">
          <span style={{ color: isHighlighted ? highlightColor : '#555' }} className="text-[10px] sm:text-[11px] font-black tracking-[0.1em] mono whitespace-nowrap uppercase">{skill.name}</span>
        </div>
      </div>

      <div ref={keycapRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        className="premium-key w-full h-full flex items-center justify-center cursor-pointer select-none rounded-2xl relative"
        style={{ boxShadow: `none` }}
      >
        <div className={`absolute inset-[3px] rounded-[13px] sm:rounded-[15px] pointer-events-none border-t border-white/10 ${isHighlighted ? 'bg-gradient-to-b from-orange-500/5 to-transparent' : 'bg-gradient-to-b from-white/[0.01] to-transparent'}`} />
        <div ref={iconRef} className="skill-icon text-2xl sm:text-4xl transition-colors duration-500 z-10 text-zinc-300 dark:text-zinc-700">{skill.icon}</div>
        {isHighlighted && (
          <div ref={ledRef} style={{ backgroundColor: statusColor }} className="status-led absolute opacity-0 scale-0 bottom-2.5 sm:bottom-3.5 w-2 sm:w-2.5 h-0.5 rounded-full shadow-[0_0_8px_rgba(211,91,0,1)]" />
        )}
      </div>
      {isHighlighted && <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-4 w-14 bg-orange-500/5 blur-3xl -z-10 rounded-full" />}
    </div>
  );
};

gsap.registerPlugin(TextPlugin);

const TechSkillCard: React.FC = () => {
  const chassisRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      gsap.set([chassisRef.current], { opacity: 0, y: 30 });
      gsap.set(".grid-item", { opacity: 0.2, scale: 0.95 });

      tl.to(chassisRef.current, { opacity: 1, y: 0, duration: 1.2 })
      .to(scanLineRef.current, { 
        top: "115%", duration: 3.5, ease: "power2.inOut",
        onUpdate: function() {
          const progress = this.progress();
          const itemsElements = document.querySelectorAll(".grid-item");
          const threshold = progress * itemsElements.length;
          
          itemsElements.forEach((item, i) => {
            if (i < threshold && item.getAttribute('data-activated') !== 'true') {
              item.setAttribute('data-activated', 'true');
              const isKnown = item.getAttribute('data-known') === 'true';
              const key = item.querySelector('.premium-key');
              const icon = item.querySelector('.skill-icon');
              const led = item.querySelector('.status-led');

              gsap.to(item, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" });

              // Apply the user's specific requested shadow to individual keys
              const isDark = document.documentElement.classList.contains('dark');
              const shadowValue = isDark
                ? `inset 0 1px 4px rgba(255, 255, 255, 0.1), 0 10px 0 #000, 0 25px 50px rgba(0, 0, 0, 0.9)`
                : `0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 4px 0 #e2e8f0`;

              gsap.to(key, { 
                boxShadow: shadowValue,
                duration: 0.5 
              });

              if (isKnown) {
                if (icon) gsap.to(icon, { color: "#f59e09", filter: "drop-shadow(0 0 15px rgba(245, 158, 9, 0.8))", duration: 0.5 });
                if (led) gsap.to(led, { opacity: 1, scale: 1, duration: 0.4 });
              }
            }
          });
        },
        onComplete: () => { gsap.to(scanLineRef.current, { opacity: 0, duration: 1 }); }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full flex items-center justify-center relative">
      <div className="w-full z-10 flex flex-col items-center">
        <div 
          ref={chassisRef} 
          style={{ boxShadow: 'var(--premium-shadow)' }}
          className="w-full relative overflow-hidden bg-zinc-50 dark:bg-[#0d0d0d] rounded-[3rem] py-12 sm:py-20 px-6 sm:px-12 border border-zinc-200 dark:border-white/5 transition-all duration-500"
        >
          <div ref={scanLineRef} className="scan-line" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
          
          <div className="flex flex-col gap-16 relative z-10">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto w-full">
              {SKILLS_DATA.map((skill, idx) => (
                <div key={skill.id} className="grid-item" data-known={skill.isKnown}>
                  <SkillCard skill={skill} index={idx} isAutoHighlight={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechSkillCard;
