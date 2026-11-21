import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, ViewProps } from '../types';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PROJECTS, BASE_IMAGE } from '../constants';

export const NotFoundView = ({
  view,
  navTo,
  isMenuOpen,
  setIsMenuOpen,
  handleProjectClick,
}: ViewProps & {
  handleProjectClick: (project: Project) => void;
}) => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  return (
    <div className="flex flex-col min-[480px]:flex-row h-screen overflow-hidden bg-surface font-sans selection:bg-dynasty/20">
      <div className="w-full min-[480px]:w-[45%] min-[1250px]:w-[48%] min-[1440px]:w-[52%] 2xl:w-[55%] flex flex-col h-full border-r border-outline overflow-y-auto font-sans">
        <Header
          view={view}
          navTo={navTo}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          className="w-full lg:static lg:w-auto lg:border-0"
        />

        <main className="flex-grow flex flex-col justify-center px-8 md:px-10 lg:px-12 py-8 lg:py-0">
          <div className="mb-8">
            <p className="text-technical-label text-dynasty mb-2">Error 404 · Route Not Found</p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase leading-tight max-w-lg text-charcoal">
              Off-Route Coordinates
            </h1>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mt-3 max-w-md">
              The page you requested does not exist or has moved. Return to the main portfolio index or jump directly into a project below.
            </p>
            <div className="flex flex-wrap items-center gap-5 mt-6">
              <a
                href="/"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                    e.preventDefault();
                    navTo('index');
                  }
                }}
                className="px-6 py-3 bg-charcoal text-white text-technical-label hover:bg-dynasty transition-colors whitespace-nowrap"
              >
                Return to Index
              </a>
              <a
                href="/connect"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                    e.preventDefault();
                    navTo('connect');
                  }
                }}
                className="text-technical-label text-charcoal hover:text-dynasty border-b border-outline hover:border-dynasty pb-1 transition-colors whitespace-nowrap"
              >
                Contact &amp; Inquiries
              </a>
            </div>
          </div>

          <nav
            className="flex flex-col space-y-0 border-t border-outline"
            aria-label="Selected Projects"
            onMouseLeave={() => setHoveredProject(null)}
          >
            {PROJECTS.map((project) => (
              <a
                key={project.id}
                href={`/project/${project.id}`}
                onMouseEnter={() => setHoveredProject(project)}
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                    e.preventDefault();
                    handleProjectClick(project);
                  }
                }}
                className="block group w-full text-left py-4 border-b border-outline transition-all duration-300"
              >
                <div className="flex items-center justify-between relative z-10 w-full min-w-0">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-data-mono text-gray-300">{project.id}</span>
                      <h2 className="text-lg font-medium tracking-tight uppercase transition-colors group-hover:text-dynasty">
                        {project.title}
                      </h2>
                    </div>
                    <p className="text-technical-label text-gray-400 truncate pr-4">
                      {project.subtitle}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </nav>
        </main>

        <Footer navTo={navTo} showBackToIndex={true} className="shrink-0 border-t border-outline" />
      </div>

      <div className="hidden min-[480px]:block flex-grow relative bg-charcoal overflow-hidden group">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={hoveredProject ? hoveredProject.id : 'base'}
            className={`absolute inset-0 ${hoveredProject ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={() => hoveredProject && handleProjectClick(hoveredProject)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={hoveredProject ? hoveredProject.image : BASE_IMAGE}
              alt={
                hoveredProject
                  ? `${hoveredProject.title} — ${hoveredProject.subtitle}`
                  : 'Tanner Gerrard — Softgoods and Technical Apparel Portfolio'
              }
              className="w-full h-full object-cover transition-all duration-700"
              style={{ objectPosition: hoveredProject?.objectPosition || 'center' }}
            />
            <div className="absolute inset-0 bg-charcoal/20 z-10 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-20 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-12 right-12 z-30 flex flex-col items-end text-white pointer-events-none">
          <p className="text-technical-label opacity-40 mb-1">
            {hoveredProject ? 'Specification' : 'Status'}
          </p>
          <p className="text-data-mono text-lg text-right">
            {hoveredProject ? `${hoveredProject.specs.weight} · ${hoveredProject.specs.material}` : '404'}
          </p>
        </div>
      </div>
    </div>
  );
};
