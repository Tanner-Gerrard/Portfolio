/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Linkedin, Menu, X } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface p-8 text-center">
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter uppercase">Something went wrong.</h1>
            <p className="text-gray-600">The application encountered a technical error. Please try refreshing.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-charcoal text-white text-technical-label hover:bg-dynasty transition-colors"
            >
              Refresh Application
            </button>
            {this.state.error && (
              <pre className="mt-8 p-4 bg-gray-100 text-[10px] text-left overflow-auto max-h-40 font-mono text-charcoal">
                {this.state.error.stack}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  objectPosition?: string;
  specs: {
    material: string;
    movement: string;
    weight: string;
  };
}

const img01hero = '/images/01hero.jpg';
const img02hero = '/images/02hero.jpg';
const img03hero = '/images/03hero.avif';
const img04hero = '/images/04hero.avif';
const imgConnect = '/images/connect.avif';
const imgHero = '/images/hero.jpg';

const BASE_IMAGE = imgHero;

const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'ALPTOUR PACK',
    subtitle: 'Approach heavy. summit light',
    year: '2026',
    image: img01hero,
    specs: {
      material: 'Ultra 200X',
      movement: 'Sustained',
      weight: '572g',
    },
  },
  {
    id: '02',
    title: 'VENTOUR JACKET',
    subtitle: 'Mapped protection. zoned breathability',
    year: '2026',
    image: img02hero,
    specs: {
      material: '(Un)calendared 6.6 Nylon',
      movement: 'Low Intensity',
      weight: '350g',
    },
  },
  {
    id: '03',
    title: 'STRIDETOUR PANT',
    subtitle: 'High-output touring. mapped articulation',
    year: '2025',
    image: img03hero,
    specs: {
      material: 'Mechanical Stretch 6.6 Nylon',
      movement: 'High Output',
      weight: '347g',
    },
  },
  {
    id: '04',
    title: 'CRACK GLOVE',
    subtitle: 'Utra-durable leather. sensitive for tight jams',
    year: '2024',
    image: img04hero,
    specs: {
      material: 'Leather & UHMWPE',
      movement: 'High Output',
      weight: '34g',
    },
  },
];

interface NavContentProps {
  className?: string;
  view: 'index' | 'detail' | 'connect';
  navTo: (newView: 'index' | 'detail' | 'connect', project?: Project) => void;
}

const NavContent = ({ className = "", view, navTo }: NavContentProps) => {
  if (view === 'connect') {
    return (
      <nav className={className}>
        <button 
          onClick={() => navTo('index')}
          className="text-technical-label text-black hover:text-dynasty transition-colors whitespace-nowrap uppercase"
        >
          Back to Index
        </button>
      </nav>
    );
  }
  if (view === 'detail') {
    return (
      <nav className={className}>
        <button 
          onClick={() => navTo('index')}
          className="text-technical-label text-black hover:text-dynasty transition-colors whitespace-nowrap uppercase"
        >
          Professional Work
        </button>
        <button 
          onClick={() => navTo('connect')}
          className="text-technical-label text-black hover:text-dynasty transition-colors whitespace-nowrap uppercase"
        >
          Connect
        </button>
      </nav>
    );
  }
  return (
    <nav className={className}>
      <button onClick={() => navTo('index')} className="text-technical-label text-black hover:text-dynasty transition-colors uppercase whitespace-nowrap">Professional Work</button>
      <button 
        onClick={() => navTo('connect')} 
        className="text-technical-label text-black hover:text-dynasty transition-colors uppercase whitespace-nowrap"
      >
        Connect
      </button>
    </nav>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

function AppContent() {
  const [activeProject, setActiveProject] = useState<Project>(PROJECTS[0]);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [view, setView] = useState<'index' | 'detail' | 'connect'>('index');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileHero, setShowMobileHero] = useState(true);

  const handleProjectClick = (project: Project) => {
    navTo('detail', project);
    window.scrollTo(0, 0);
  };

  const isDraftMode = import.meta.env.VITE_ENABLE_DRAFTS === 'true';

  const navTo = (newView: 'index' | 'detail' | 'connect', project?: Project) => {
    // If not in draft mode, restrict navigation to Index only
    if (!isDraftMode && newView !== 'index') return;

    setView(newView);
    setIsMenuOpen(false);
    if (newView === 'index') {
      setHoveredProject(null);
      window.history.pushState({}, '', '/');
    } else if (newView === 'detail' && project) {
      setActiveProject(project);
      window.history.pushState({}, '', `/project/${project.id}`);
    } else if (newView === 'connect') {
      window.history.pushState({}, '', '/connect');
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;

      // Force index if not in draft mode
      if (!isDraftMode && path !== '/') {
        setView('index');
        window.history.replaceState({}, '', '/');
        return;
      }

      if (path === '/') {
        setView('index');
      } else if (path.startsWith('/project/')) {
        const id = path.split('/')[2];
        const project = PROJECTS.find(p => p.id === id);
        if (project) {
          setActiveProject(project);
          setView('detail');
        }
      } else if (path === '/connect') {
        setView('connect');
      }
    };

    const handleGlobalError = (event: ErrorEvent) => {
      // Log more details to help identify "Script error" causes
      console.log('DEBUG: Global Error Event handled', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
      
      // If it's a script error, it's likely CORS
      if (event.message === 'Script error.') {
        console.warn('CORS-masked error detected. Check for failed external scripts or Cross-Origin issues.');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('error', handleGlobalError);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('error', handleGlobalError);
    };
  }, [isDraftMode]);
  if (view === 'connect') {
    return (
      <div className="min-h-screen bg-surface font-sans selection:bg-dynasty/20 flex flex-col">
        <header className="bg-surface/80 backdrop-blur-md">
          <div className="flex items-center justify-between px-8 lg:px-12 py-8">
            <button 
              onClick={() => navTo('index')}
              className="text-xl font-bold tracking-tighter uppercase text-left hover:text-dynasty transition-colors"
            >
              Tanner Gerrard
            </button>
            <div className="flex items-center gap-8">
              <NavContent className="hidden xl:flex items-center gap-8" view={view} navTo={navTo} />
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="xl:hidden p-2 hover:text-dynasty transition-colors"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="xl:hidden bg-surface border-b border-outline overflow-hidden px-8 pb-8"
              >
                <NavContent className="flex flex-col gap-4 pt-4" view={view} navTo={navTo} />
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="max-w-[1600px] mx-auto pt-8 px-8 lg:px-12 pb-24 grid sm:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-technical-label text-dynasty tracking-[0.3em] uppercase">Connect // Networking</h2>
              <h1 className="text-5xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.85]">
                Let's Build Better Systems.
              </h1>
            </div>
            
            <div className="space-y-8 max-w-lg">
              <p className="text-xl text-gray-500 leading-relaxed italic">
                "Technical design is as much about people as it is about textiles."
              </p>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Currently based in Salt Lake City, focusing on advanced articulation and procedural design for technical softgoods. 
                  Always looking for collaborators who value functional honesty and disruptive construction.
                </p>
                <div className="pt-8 flex flex-col gap-4">
                  <a href="mailto:tannerbgerrard@gmail.com" className="text-2xl font-medium tracking-tight hover:text-dynasty transition-colors border-b border-outline pb-2 w-fit">
                    tannerbgerrard@gmail.com
                  </a>
                  <div className="flex gap-8 pt-4">
                    <a 
                      href="https://www.linkedin.com/in/tanner-gerrard-8376241ba" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-2 items-center text-technical-label hover:text-dynasty transition-colors"
                    >
                      <Linkedin className="w-5 h-5" /> LinkedIn
                    </a>
                    <a href="#" className="flex gap-2 items-center text-technical-label hover:text-dynasty transition-colors">
                      <Instagram className="w-5 h-5" /> Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="aspect-[3/4] lg:aspect-auto h-full max-h-[80vh] bg-charcoal relative overflow-hidden group">
            <img 
              src={imgConnect} 
              alt="Tanner Gerrard" 
              className="w-full h-full object-cover transition-all duration-700" 
              loading="lazy"
            />
          </div>
        </main>
      </div>
    );
  }

  if (view === 'detail') {
    return (
      <div className="min-h-screen bg-surface font-sans selection:bg-dynasty/20">
        {/* Detail Header */}
        <header className="bg-surface/80 backdrop-blur-md">
          <div className="flex items-center justify-between px-8 lg:px-12 py-8">
            <button 
              onClick={() => navTo('index')}
              className="text-xl font-bold tracking-tighter uppercase text-left hover:text-dynasty transition-colors"
            >
              Tanner Gerrard
            </button>
            <div className="flex items-center gap-4 sm:gap-8">
              <NavContent className="hidden xl:flex items-center gap-8 lg:gap-12" view={view} navTo={navTo} />
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="xl:hidden p-2 hover:text-dynasty transition-colors"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="xl:hidden bg-surface border-b border-outline overflow-hidden px-8 pb-8"
              >
                <NavContent className="flex flex-col gap-4 pt-4" view={view} navTo={navTo} />
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="max-w-[1600px] mx-auto pt-6 pb-32">
          {/* Hero Section */}
          <section className="px-8 lg:px-12">
            {/* Mobile Title/Subtitle */}
            <div className="lg:hidden mb-12">
              <p className="text-technical-label text-gray-400 mb-4">{activeProject.year} // SYSTEM_STUDIO</p>
              <h1 className="text-5xl font-bold tracking-tighter uppercase leading-[0.85] mb-6">
                {activeProject.title}
              </h1>
              <p className="text-xl text-gray-500 uppercase tracking-tight leading-snug">
                {activeProject.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              <div className="space-y-12">
                <div 
                  className="aspect-[4/5] bg-charcoal transition-all duration-700 overflow-hidden"
                >
                  <img 
                    src={activeProject.image} 
                    alt={activeProject.title} 
                    className="w-full h-full object-cover" 
                    style={{ objectPosition: activeProject.objectPosition || 'center' }}
                  />
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-2 gap-12"
                >
                  <div className="aspect-square bg-surface-dim/30 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1551632811-561730d164a1?auto=format&fit=crop&q=80&w=600" 
                      alt="Detail 1" 
                      className="w-full h-full object-cover opacity-30 hover:opacity-100 transition-opacity" 
                      loading="lazy"
                    />
                  </div>
                  <div className="aspect-square bg-surface-dim/30 overflow-hidden">
                     <img 
                      src="https://images.unsplash.com/photo-1614743224377-669be740e557?auto=format&fit=crop&q=80&w=600" 
                      alt="Detail 2" 
                      className="w-full h-full object-cover opacity-30 hover:opacity-100 transition-opacity" 
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </div>

              <div className="space-y-12">
                <div className="hidden lg:block">
                  <p className="text-technical-label text-gray-400 mb-4">{activeProject.year} // SYSTEM_STUDIO</p>
                  <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter uppercase leading-[0.85] mb-6">
                    {activeProject.title}
                  </h1>
                  <p className="text-xl text-gray-500 uppercase tracking-tight leading-snug max-w-md">
                    {activeProject.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 border-t border-outline pt-8">
                <div>
                  <p className="text-technical-label text-gray-400 mb-2">Movement</p>
                  <p className="text-data-mono text-lg">{activeProject.specs.movement}</p>
                </div>
                <div>
                  <p className="text-technical-label text-gray-400 mb-2">Weight</p>
                  <p className="text-data-mono text-lg">{activeProject.specs.weight}</p>
                </div>
                <div>
                  <p className="text-technical-label text-gray-400 mb-2">Material</p>
                  <p className="text-data-mono text-lg">{activeProject.specs.material}</p>
                </div>
                <div>
                  <p className="text-technical-label text-gray-400 mb-2">Design Status</p>
                  <p className="text-data-mono text-lg">Production Ready</p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-technical-label border-b border-outline pb-2">Technical Overview</h3>
                <p className="text-gray-600 leading-relaxed">
                  Engineered for high-output movement in variable alpine conditions. The {activeProject.title} utilizes a hyper-breathable shell combined with strategic wind-resistant paneling. 
                  Developed through extensive R&D to provide thermal regulation during rapid ascents while maintaining core protection against wind-chill.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-technical-label border-b border-outline pb-2">Key Features</h3>
                <ul className="space-y-4">
                  {[
                    "Anatomical shaping for fit and comfort",
                    "Articulated elbows for unrestricted mobility",
                    "Gusseted underarms for lift-off protection",
                    "Adjustable StormHood™ with laminated brim",
                    "Hem drawcord seals out drafts"
                  ].map((feature, i) => (
                    <li key={i} className="flex gap-4 items-start text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-dynasty mt-1.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

          {/* Large Narrative Section */}
          <section className="mt-32 px-8 lg:px-12 border-t border-outline pt-24 max-w-4xl">
            <h3 className="text-technical-label text-dynasty mb-8 tracking-[0.3em]">Design Narrative</h3>
            <p className="text-3xl lg:text-5xl font-medium tracking-tight text-gray-900 leading-[1.1] mb-12">
              "We don't solve for comfort; we solve for survival in movement."
            </p>
            <div className="grid sm:grid-cols-2 gap-12 text-gray-500 text-lg">
              <p>
                The {activeProject.title} was born out of a necessity for a middle ground between a traditional windbreaker and a full shell. 
                Existing solutions often trapped too much heat during high-exertion activities like speed climbing or trail running.
              </p>
              <p>
                By utilizing laser-cut ventilation at high-sweat zones and high-tenacity ripstop at exposure points, we created a garment that essentially 
                disappears on the body, providing a micro-climate that adapts as the user's output fluctuates.
              </p>
            </div>
          </section>
        </main>

        <footer className="border-t border-outline">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12 h-[42px] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-technical-label text-gray-400 uppercase tracking-widest whitespace-nowrap">© 2026 Tanner Gerrard</p>
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={() => {
                  setView('index');
                  setHoveredProject(null);
                  window.scrollTo(0, 0);
                }}
                className="text-technical-label text-black hover:text-dynasty transition-colors uppercase tracking-widest font-bold hidden min-[480px]:block h-3 flex items-center"
              >
                Back to Index
              </button>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-[480px]:flex-row h-screen min-[480px]:h-screen overflow-hidden bg-surface font-sans selection:bg-dynasty/20">
      {/* Mobile-only splash intro */}
      <AnimatePresence>
        {showMobileHero && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "circOut" }}
            onClick={() => setShowMobileHero(false)}
            className="min-[480px]:hidden fixed inset-0 z-[100] bg-charcoal cursor-pointer flex items-center justify-center overflow-hidden"
            style={{ 
              backgroundImage: `url(${BASE_IMAGE})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative z-10">
              <motion.p 
                initial={{ opacity: 0.35, fontWeight: 600 }}
                animate={{ opacity: 1, fontWeight: 900 }}
                transition={{ 
                  duration: 2.25, 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  ease: "easeInOut" 
                }}
                className="text-white text-[15.8px] uppercase tracking-[0.15em] text-center"
              >
                Tap to enter
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Index View Layout: Left Column (Navigation & Content) */}
      <div className="w-full min-[480px]:w-[45%] xl:w-[50%] 2xl:w-[55%] flex flex-col h-full border-r border-outline overflow-y-auto lg:overflow-hidden font-sans">
          {/* Header */}
          <header className="w-full lg:static lg:w-auto z-50 shrink-0 lg:border-0">
            <div className="flex items-center justify-between px-8 lg:px-12 py-8">
              <button 
                onClick={() => navTo('index')}
                className="text-xl font-bold tracking-tighter uppercase text-left transition-colors whitespace-nowrap"
              >
                Tanner Gerrard
              </button>
              <div className="flex items-center gap-4 sm:gap-8">
                <NavContent className="hidden xl:flex items-center gap-8 lg:ml-auto" view={view} navTo={navTo} />
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="xl:hidden p-2 hover:text-dynasty transition-colors"
                  aria-label="Toggle Menu"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="xl:hidden bg-surface border-t border-outline overflow-hidden px-8 pb-8"
                >
                  <NavContent className="flex flex-col gap-4 pt-4" view={view} navTo={navTo} />
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {/* Project List / Index */}
          <main className="flex-grow flex flex-col justify-center px-8 lg:px-12 py-12 lg:py-0">
            <div className="mb-16">
              <p className="text-technical-label text-dynasty mb-2">selected works // 2026</p>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase leading-[0.9] max-w-lg">
                Technical Apparel and Softgoods
              </h2>
            </div>

            <nav 
              className="flex flex-col space-y-0 border-t border-outline"
              onMouseLeave={() => setHoveredProject(null)}
            >
              {PROJECTS.map((project) => (
                <button
                  key={project.id}
                  onMouseEnter={() => setHoveredProject(project)}
                  onClick={() => handleProjectClick(project)}
                  className="group w-full text-left py-6 border-b border-outline transition-all duration-300"
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-data-mono text-gray-300">{project.id}</span>
                        <h3 className="text-xl font-medium tracking-tight uppercase transition-colors group-hover:text-dynasty">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-technical-label text-gray-400 max-w-sm">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </main>

      <footer className="px-8 lg:px-12 h-[42px] shrink-0 border-t border-outline flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-technical-label text-gray-400 uppercase tracking-widest whitespace-nowrap">© 2026 TANNER GERRARD</p>
        </div>
      </footer>
        </div>

        {/* Left Column: Visual Showcase */}
        <div className="hidden min-[480px]:block flex-grow relative bg-charcoal overflow-hidden group">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={hoveredProject ? hoveredProject.id : 'base'}
              className="absolute inset-0 cursor-pointer"
              onClick={() => hoveredProject && handleProjectClick(hoveredProject)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={hoveredProject ? hoveredProject.image : BASE_IMAGE}
                alt={hoveredProject ? hoveredProject.title : "Tanner Gerrard"}
                className="w-full h-full object-cover transition-all duration-700"
                style={{ objectPosition: hoveredProject?.objectPosition || 'center' }}
              />
              <div className="absolute inset-0 bg-charcoal/20 z-10 mix-blend-overlay" />
              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-20" />
            </motion.div>
          </AnimatePresence>

          {/* Floating Specs */}
          {hoveredProject && (
            <div className="absolute bottom-12 right-12 z-30 flex flex-col items-end gap-8 text-white">
              <div className="flex flex-col items-end">
                <p className="text-technical-label opacity-40 mb-1">Movement</p>
                <p className="text-data-mono text-lg text-right">{hoveredProject.specs.movement}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-technical-label opacity-40 mb-1">Weight</p>
                <p className="text-data-mono text-lg text-right">{hoveredProject.specs.weight}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-technical-label opacity-40 mb-1">Material</p>
                <p className="text-data-mono text-lg text-right">{hoveredProject.specs.material}</p>
              </div>
            </div>
          )}

          {/* Visual showcase background */}
        </div>

    </div>
  );
}
