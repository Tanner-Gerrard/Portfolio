import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Project } from '../types';

interface NavContentProps {
  className?: string;
  view: 'index' | 'detail' | 'connect';
  navTo: (newView: 'index' | 'detail' | 'connect', project?: Project) => void;
}

const NavContent = ({ className = "", view, navTo }: NavContentProps) => {
  if (view === 'connect') {
    return null;
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

export interface HeaderProps {
  view: 'index' | 'detail' | 'connect';
  navTo: (newView: 'index' | 'detail' | 'connect', project?: Project) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  className?: string;
}

export const Header = ({ view, navTo, isMenuOpen, setIsMenuOpen, className = "" }: HeaderProps) => {
  return (
    <header className={`z-50 shrink-0 ${className}`}>
      <div className="flex items-center justify-between px-8 lg:px-12 py-8">
        <button 
          onClick={() => navTo('index')}
          className={`text-xl font-bold tracking-tighter uppercase text-left transition-colors whitespace-nowrap ${view !== 'index' ? 'hover:text-dynasty' : ''}`}
        >
          Tanner Gerrard
        </button>
        <div className="flex items-center gap-4 sm:gap-8">
          <NavContent className={`${view === 'index' ? 'hidden min-[1250px]:flex' : 'hidden min-[565px]:flex'} items-center gap-8 lg:gap-12`} view={view} navTo={navTo} />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${view === 'index' ? 'min-[1250px]:hidden' : 'min-[565px]:hidden'} p-2 hover:text-dynasty transition-colors`}
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
            className={`${view === 'index' ? 'min-[1250px]:hidden' : 'min-[565px]:hidden'} bg-surface border-b border-outline overflow-hidden px-8 pb-8`}
          >
            <NavContent className="flex flex-col gap-4 pt-4" view={view} navTo={navTo} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
