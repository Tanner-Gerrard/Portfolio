import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, ViewProps } from '../types';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PROJECTS, BASE_IMAGE } from '../constants';

export const IndexView = ({ view, navTo, isMenuOpen, setIsMenuOpen, showMobileHero, setShowMobileHero, hoveredProject, setHoveredProject, handleProjectClick }: ViewProps & { 
  showMobileHero: boolean, 
  setShowMobileHero: (show: boolean) => void,
  hoveredProject: Project | null,
  setHoveredProject: (project: Project | null) => void,
  handleProjectClick: (project: Project) => void
}) => (
  <div className="flex flex-col min-[480px]:flex-row h-screen min-[480px]:h-screen overflow-hidden bg-surface font-sans selection:bg-dynasty/20">
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

    <div className="w-full min-[480px]:w-[45%] min-[1250px]:w-[48%] min-[1440px]:w-[52%] 2xl:w-[55%] flex flex-col h-full border-r border-outline overflow-y-auto lg:overflow-hidden font-sans">
        <Header view={view} navTo={navTo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} className="w-full lg:static lg:w-auto lg:border-0" />

        <main className="flex-grow flex flex-col justify-center px-8 md:px-10 lg:px-12 py-12 lg:py-0">
          <div className="mb-16">
            <p className="text-technical-label text-dynasty mb-2">selected works // 2026</p>
            <h2 className="text-4xl md:text-[2.75rem] lg:text-5xl font-bold tracking-tighter uppercase leading-[0.9] max-w-lg">
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

        <Footer navTo={navTo} showBackToIndex={false} className="shrink-0 border-t border-outline" />
    </div>

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
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-20" />
        </motion.div>
      </AnimatePresence>

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
    </div>
  </div>
);
