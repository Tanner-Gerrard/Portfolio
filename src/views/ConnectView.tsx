import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import { ViewProps } from '../types';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { imgConnect } from '../constants';

export const ConnectView = ({ view, navTo, isMenuOpen, setIsMenuOpen }: ViewProps) => (
  <div className="min-h-screen bg-surface font-sans selection:bg-dynasty/20 flex flex-col">
    <Header view={view} navTo={navTo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} className="bg-surface/80 backdrop-blur-md" />

    <main className="flex-1 max-w-[1600px] mx-auto px-8 md:px-10 lg:px-12 pb-12 grid sm:grid-cols-2 gap-12 lg:gap-24 items-start pt-6">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-technical-label text-dynasty tracking-[0.3em] uppercase">Connect // Networking</h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.85]">
            Let's Build Better Systems.
          </h1>
        </div>
        
        <div className="space-y-6 max-w-lg">
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed italic">
            "Technical design is as much about people as it is about textiles."
          </p>
          <div className="space-y-4">
            <p className="text-gray-600">
              Currently based in Salt Lake City, focusing on advanced articulation and procedural design for technical softgoods. 
              Always looking for collaborators who value functional honesty and disruptive construction.
            </p>
            <div className="pt-4 flex flex-col gap-4">
              <a href="mailto:tannerbgerrard@gmail.com" className="text-2xl font-medium tracking-tight hover:text-dynasty transition-colors border-b border-outline pb-2 w-fit">
                tannerbgerrard@gmail.com
              </a>
              <div className="flex gap-8 pt-2">
                <a 
                  href="https://www.linkedin.com/in/tanner-gerrard-8376241ba" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center text-technical-label hover:text-dynasty transition-colors"
                >
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
                <a 
                  href="https://www.instagram.com/nihilalpine/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center text-technical-label hover:text-dynasty transition-colors"
                >
                  <Instagram className="w-5 h-5" /> nihilalpine
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

    <Footer navTo={navTo} showBackToIndex={true} className="border-t border-outline shrink-0" />
  </div>
);
