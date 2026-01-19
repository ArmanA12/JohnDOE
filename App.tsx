
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { HeavyCard } from './components/HeavyCard';
import { HeavyButton } from './components/HeavyButton';
import TechSkillCard from './components/TechSkillCard';
import { GithubContributions } from './components/GithubContributions';
import { 
  Github, Mail, MessageSquare, ArrowUpRight, Send, Linkedin, Twitter
} from 'lucide-react';
import { Experience, Project } from './types';

const DUMMY_EXPERIENCES: (Experience & { description: string })[] = [
  {
    company: 'NeuralSync Labs',
    role: 'Lead AI Engineer',
    logo: 'https://picsum.photos/seed/nsync/100/100',
    period: 'Jan 2024 - Present',
    description: 'Architecting distributed multi-agent systems using LangGraph. Orchestrating high-performance RAG pipelines for enterprise-scale cognitive automation.'
  },
  {
    company: 'Munshot AI',
    role: 'Artificial Intelligence Intern',
    logo: 'https://picsum.photos/seed/mun/100/100',
    period: 'Aug 2023 - Dec 2023',
    description: 'Optimizing vector search benchmarks and fine-tuning local LLMs for specific reasoning tasks. Implementing automated evaluation suites for model performance.'
  }
];

const DUMMY_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ContextMemory V2',
    description: 'A revolutionary memory layer for agentic systems. It uses hierarchical vector storage to maintain long-term context without token overflow. Optimized for low-latency retrieval in real-time conversations.',
    tags: ['Python', 'OpenAI', 'Redis', 'Pinecone'],
    links: { website: '#', source: '#' },
    image: 'data:image/jpeg;base64,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'
  },
  {
    id: '2',
    title: 'AlxAI Agent Orchestrator',
    description: 'A visual playground for building multi-agent workflows. Connect specialized LLM nodes to solve complex reasoning tasks in parallel with built-in error handling and self-correction loops.',
    tags: ['Next.js', 'LangGraph', 'Tailwind', 'Zustand'],
    links: { website: '#', source: '#' },
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'VisionFlow AI',
    description: 'Advanced real-time object detection and classification pipeline designed for high-throughput video streams. Utilizes custom YOLOv8 models fine-tuned for industrial safety environments.',
    tags: ['PyTorch', 'Computer Vision', 'FastAPI', 'CUDA'],
    links: { website: '#', source: '#' },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'HomeSage ML',
    description: 'Intelligent real-estate valuation engine that integrates multi-modal data including geo-spatial features and historical market sentiment to provide 98% accuracy in pricing predictions.',
    tags: ['Scikit-Learn', 'XGBoost', 'Pandas', 'Folium'],
    links: { website: '#', source: '#' },
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    title: 'N8N Custom Nodes',
    description: 'High-performance extension pack for N8N allowing direct integration with proprietary vector databases and private LLM endpoints. Features advanced debugging and state monitoring tools.',
    tags: ['TypeScript', 'N8N', 'Node.js', 'REST API'],
    links: { source: '#' },
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    title: 'TensorLink Bridge',
    description: 'A low-level bridge between edge devices and cloud-based inference servers, optimizing data serialization using Protobuf and ensuring end-to-end encryption for sensitive medical data.',
    tags: ['C++', 'Protobuf', 'Python', 'WebSockets'],
    links: { source: '#' },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
  }
];

const ExperienceItem: React.FC<{ exp: Experience & { description: string } }> = ({ exp }) => {
  return (
    <div className="group relative flex items-start gap-4 md:gap-6 py-8 border-b border-zinc-200/50 dark:border-white/5 last:border-0">
      <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 p-1 border border-zinc-200 dark:border-white/5">
        <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover rounded-xl" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
          <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
            {exp.company}
          </h3>
          <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {exp.period}
          </span>
        </div>
        <h4 className="text-sm md:text-base font-bold text-amber-500 uppercase tracking-wider">
          {exp.role}
        </h4>
        <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-3xl">
          {exp.description}
        </p>
      </div>
    </div>
  );
};

const ContactInput: React.FC<{ label: string; placeholder: string; type?: string; isTextArea?: boolean }> = ({ label, placeholder, type = "text", isTextArea = false }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 ml-1">
        {label}
      </label>
      <div className="relative group p-[2px] rounded-2xl bg-zinc-200 dark:bg-[#111] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_0_#000]">
        <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none z-10" />
        {isTextArea ? (
          <textarea 
            placeholder={placeholder}
            rows={5}
            className="w-full bg-white/60 dark:bg-white/[0.02] text-zinc-900 dark:text-white p-4 rounded-xl outline-none placeholder:text-zinc-400 text-sm font-medium resize-none transition-all focus:bg-white/80 dark:focus:bg-white/[0.05]"
          />
        ) : (
          <input 
            type={type}
            placeholder={placeholder}
            className="w-full bg-white/60 dark:bg-white/[0.02] text-zinc-900 dark:text-white px-4 py-4 rounded-xl outline-none placeholder:text-zinc-400 text-sm font-medium transition-all focus:bg-white/80 dark:focus:bg-white/[0.05]"
          />
        )}
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{ tag: string; title: string; description: string }> = ({ tag, title, description }) => (
  <div className="text-center md:text-left space-y-4 mb-12">
    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">{tag}</div>
    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter leading-none">{title}</h2>
    <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto md:mx-0 text-balance text-sm md:text-base">
      {description}
    </p>
  </div>
);

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#030303';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#fafafa';
    }
  }, [isDark]);

  return (
    <div className="min-h-screen transition-colors duration-500 pb-24 overflow-x-hidden">
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      
      <main className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-48 space-y-24 md:space-y-48">
        
        {/* HERO SECTION */}
        <section id="about" className="relative">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-24">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-500 text-[10px] font-black uppercase tracking-widest mx-auto lg:mx-0">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Available for new projects
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.95] md:leading-[0.9]">
                  Crafting <span className="text-amber-500">Intelligent</span> Systems
                </h1>
                <p className="text-base md:text-2xl font-medium text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0 text-balance">
                  I'm John DOE, an AI/ML Engineer dedicated to building agentic architectures that perceive, remember, and act.
                </p>
              </div>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <HeavyButton variant="secondary" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2">
                  <Mail size={16} /> Get in touch
                </HeavyButton>
                <HeavyButton variant="outline" size="lg" className="flex items-center gap-2">
                  <Github size={16} /> View GitHub
                </HeavyButton>
              </div>
            </div>

            <div className="shrink-0 relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 md:w-40 md:h-40 bg-amber-500/20 rounded-full blur-[60px] md:blur-[80px] pointer-events-none" />
              <HeavyCard className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 !p-[6px]">
                <div className="w-full h-full rounded-[1.2rem] md:rounded-[1.6rem] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                  <img src="https://picsum.photos/seed/profile-john/600/600" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </HeavyCard>
            </div>
          </div>
        </section>

        {/* EXPERTISE GRID */}
        <section className="space-y-4">
          <SectionHeader 
            tag="Competencies" 
            title="Technical Expertise" 
            description="Explore my technical stack through this tactile module interface. Every key represents a field of deep engineering focus."
          />
          <TechSkillCard />
        </section>

        {/* PROJECTS SHOWCASE */}
        <section id="projects" className="space-y-4">
          <SectionHeader 
            tag="Featured Work" 
            title="Selected Projects" 
            description="A showcase of engineering excellence in AI, distributed systems, and modern web architectures."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16">
            {DUMMY_PROJECTS.map((project) => (
              <div key={project.id} className="group flex flex-col">
                <HeavyCard noPadding className="mb-6 md:mb-8 aspect-video overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full rounded-[1.2rem] lg:rounded-[1.8rem] object-cover group-hover:scale-105 transition-transform duration-700" />
                </HeavyCard>
                <div className="space-y-4 px-1 flex-1 flex flex-col">
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">{project.title}</h3>
                    <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-black text-amber-500 tracking-[0.2em] uppercase">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 pt-6 mt-auto">
                    <HeavyButton variant="primary" size="sm" className="flex items-center gap-2">
                      Live Preview <ArrowUpRight size={14} />
                    </HeavyButton>
                    <HeavyButton variant="outline" size="sm">
                      <Github size={14} /> Source
                    </HeavyButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* OPEN SOURCE CONTRIBUTIONS */}
        <section id="activities" className="space-y-4">
          <SectionHeader 
            tag="Velocity" 
            title="Open Source" 
            description="Committed to the community. Tracking engineering velocity and open-source contributions across multiple frameworks."
          />
          <GithubContributions />
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="space-y-4">
          <SectionHeader 
            tag="Career Path" 
            title="Experience" 
            description="Engineering impact at startups and research labs. Focus on AI integration and scalable backend systems."
          />
          <div className="divide-y divide-zinc-200/50 dark:divide-white/5 border-t border-zinc-200/50 dark:border-white/5 mt-8">
            {DUMMY_EXPERIENCES.map((exp, idx) => (
              <ExperienceItem key={idx} exp={exp} />
            ))}
          </div>
        </section>

        {/* CONTACT SECTION - FULLY RESPONSIVE */}
        <section id="contact" className="space-y-4">
          <SectionHeader 
            tag="Collaboration" 
            title="Contact" 
            description="Ready to build something next-gen? Reach out for collaboration or consulting inquiries."
          />

          <HeavyCard className="!p-[4px]" noPadding>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-6 sm:p-10 md:p-16 lg:p-20">
              {/* BRANDING COLUMN */}
              <div className="lg:col-span-5 space-y-10 md:space-y-14">
                <div className="space-y-6 md:space-y-8">
                  <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.85]">
                    Let's Build <br className="hidden sm:block" /><span className="text-amber-500">Something Bold.</span>
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-sm text-base md:text-lg">
                    Have a vision for a multi-agent system or high-performance AI architecture? Let's engineer the future together.
                  </p>
                </div>

                <div className="flex flex-col gap-6 md:gap-8">
                  <div className="flex items-center gap-4 md:gap-6 group cursor-pointer">
                    <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[1.6rem] bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-black transition-all group-hover:scale-110 shadow-xl">
                      <Mail size={24} className="md:w-8 md:h-8" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">Direct Communication</div>
                      <div className="text-zinc-900 dark:text-white font-black text-lg md:text-2xl truncate">hello@johndoe.ai</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 md:gap-6 group cursor-pointer">
                    <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[1.6rem] bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-black transition-all group-hover:scale-110 shadow-xl">
                      <MessageSquare size={24} className="md:w-8 md:h-8" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">Social Presence</div>
                      <div className="text-zinc-900 dark:text-white font-black text-lg md:text-2xl truncate">@johndoe_dev</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FORM COLUMN */}
              <div className="lg:col-span-7">
                <div className="bg-zinc-100/30 dark:bg-white/[0.01] p-6 sm:p-10 md:p-14 lg:p-16 rounded-[2rem] md:rounded-[3rem] border border-zinc-200 dark:border-white/5 shadow-inner">
                  <form className="space-y-8 md:space-y-10" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                      <ContactInput label="Identity" placeholder="Your Name" />
                      <ContactInput label="Electronic Mail" placeholder="you@company.com" type="email" />
                    </div>
                    <ContactInput label="Subject Matrix" placeholder="Project Inquiry, Speaking, etc." />
                    <ContactInput label="Transmission Content" placeholder="Tell me about your mission..." isTextArea />
                    
                    <div className="pt-6">
                      <HeavyButton variant="secondary" size="lg" className="w-full md:w-auto flex items-center gap-3">
                        Execute Transmission <Send size={18} />
                      </HeavyButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </HeavyCard>
        </section>

        {/* FOOTER */}
        <footer className="pt-12 md:pt-24 pb-8 md:pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-400 border-t border-zinc-200 dark:border-white/5 pt-12">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-white shrink-0">
                <span className="text-[10px]">JD</span>
              </div>
              © 2025 John DOE • HeavyUI Framework
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <a href="#" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                <Twitter size={14} /> Twitter
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                <Github size={14} /> Github
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                <Linkedin size={14} /> Linkedin
              </a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default App;
