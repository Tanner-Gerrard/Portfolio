import React from 'react';
import { motion } from 'motion/react';
import { Project, ViewProps } from '../types';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const DetailView = ({ view, navTo, isMenuOpen, setIsMenuOpen, activeProject }: ViewProps & { activeProject: Project }) => (
  <div className="min-h-screen bg-surface font-sans selection:bg-dynasty/20">
    <Header view={view} navTo={navTo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} className="bg-surface/80 backdrop-blur-md" />

    <main className="max-w-[1600px] mx-auto pt-6 pb-32">
      <section className="px-8 md:px-10 lg:px-12">
        <div className="lg:hidden mb-12">
          <p className="text-technical-label text-gray-400 mb-4">{activeProject.year} // SYSTEM_STUDIO</p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase leading-[0.85] mb-6">
            {activeProject.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 uppercase tracking-tight leading-snug">
            {activeProject.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="space-y-12">
            <div className="aspect-[4/5] bg-charcoal transition-all duration-700 overflow-hidden">
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
                  src={activeProject.detailImages?.[0] || "https://images.unsplash.com/photo-1551632811-561730d164a1?auto=format&fit=crop&q=80&w=600"} 
                  alt="Detail 1" 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" 
                  loading="lazy"
                />
              </div>
              <div className="aspect-square bg-surface-dim/30 overflow-hidden">
                 <img 
                  src={activeProject.detailImages?.[1] || "https://images.unsplash.com/photo-1614743224377-669be740e557?auto=format&fit=crop&q=80&w=600"} 
                  alt="Detail 2" 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" 
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>

          <div className="space-y-12 h-full flex flex-col">
            <div className="hidden lg:block">
              <p className="text-technical-label text-gray-400 mb-4">{activeProject.year} // SYSTEM_STUDIO</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-[0.85] mb-6">
                {activeProject.title}
              </h1>
              <div className="flex justify-between items-start">
                <p className="text-xl md:text-2xl text-gray-500 uppercase tracking-tight leading-snug max-w-md">
                  {activeProject.subtitle}
                </p>
              </div>
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
                <p className="text-data-mono text-lg">
                  {activeProject.id === '01' ? 'V4 Prototype under Development' : 'Production Ready'}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-technical-label border-b border-outline pb-2">Technical Overview</h3>
              <p className="text-gray-600 leading-relaxed">
                {activeProject.id === '01' 
                  ? 'The Alptour is a modular alpine system designed for approach-to-summit efficiency. Constructed from Ultra 200X, it balances extreme abrasion resistance with a weight-to-volume ratio optimized for sustained vertical movement.'
                  : `Engineered for high-output movement in variable alpine conditions. The ${activeProject.title} utilizes a hyper-breathable shell combined with strategic wind-resistant paneling.`}
              </p>
            </div>

            <div className="space-y-6 flex-grow">
              <h3 className="text-technical-label border-b border-outline pb-2">Key Features</h3>
              <ul className="space-y-4">
                {(activeProject.id === '01' ? [
                  "Dual ice-tool attachments with pick-protection",
                  "A-frame and diagonal ski carry compatibility",
                  "Removable HDPE framesheet with AL stay",
                  "Ultra 200X high-tenacity composite construction",
                  "Roll-top closure for +/- 10L volume flexibility"
                ] : [
                  "Anatomical shaping for fit and comfort",
                  "Articulated elbows for unrestricted mobility",
                  "Gusseted underarms for lift-off protection",
                  "Adjustable StormHood™ with laminated brim",
                  "Hem drawcord seals out drafts"
                ]).map((feature, i) => (
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

      <section className="mt-32 px-8 md:px-10 lg:px-12 border-t border-outline pt-24 max-w-4xl">
        <h3 className="text-technical-label text-dynasty mb-8 tracking-[0.3em]">Design Narrative</h3>
        <p className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 leading-[1.1] mb-12">
          {activeProject.id === '01' 
            ? '"The heaviest part of the climb is the approach, so why carry the same pack for both?"'
            : '"We don\'t solve for comfort; we solve for survival in movement."'}
        </p>
        <div className="grid sm:grid-cols-2 gap-12 md:gap-16 text-gray-500 text-lg">
          {activeProject.id === '01' ? (
            <>
              <p>
                The Alptour Pack was conceived on long technical approaches, where a 45L pack was necessary for the hike in, but became a liability on technical terrain. 
                Existing solutions were either too heavy when empty or too flimsy to carry hard hardware comfortably.
              </p>
              <p>
                By utilizing a removable internal frame and a unique side-compression logic, the Alptour collapses into a high-stability 25L summit pack. 
                It is the result of four years of iterative prototyping, testing the limits of Ultra 200X composites and procedural patterning.
              </p>
            </>
          ) : (
            <>
              <p>
                The {activeProject.title} was born out of a necessity for a middle ground between a traditional windbreaker and a full shell. 
                Existing solutions often trapped too much heat during high-exertion activities like speed climbing or trail running.
              </p>
              <p>
                By utilizing laser-cut ventilation at high-sweat zones and high-tenacity ripstop at exposure points, we created a garment that essentially 
                disappears on the body, providing a micro-climate that adapts as the user's output fluctuates.
              </p>
            </>
          )}
        </div>
      </section>

      {activeProject.process && (
        <section className="mt-48 px-8 md:px-10 lg:px-12 border-t border-outline pt-24">
          <div className="mb-16">
            <h3 className="text-technical-label text-dynasty mb-4 tracking-[0.3em]">Process Archive</h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[0.85]">
              From Sketch <br/>to System.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-flow-row-dense gap-x-12 md:gap-x-16 lg:gap-x-24 gap-y-24">
            {activeProject.process.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`space-y-6 ${item.span || ''}`}
              >
                <div className="aspect-[16/9] bg-charcoal overflow-hidden group">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 hover:scale-105"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-1">
                    <p className="text-[10px] font-mono text-dynasty tracking-widest uppercase mb-1">{item.phase}</p>
                    <h4 className="text-xl font-bold uppercase tracking-tighter">{item.title}</h4>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </main>

    <Footer navTo={navTo} showBackToIndex={true} className="border-t border-outline" />
  </div>
);
