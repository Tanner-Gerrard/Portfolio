import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Project, ViewType } from '../types';

interface NavContentProps {
  className?: string;
  view: ViewType;
  navTo: (newView: 'index' | 'detail' | 'connect' | 'work', project?: Project) => void;
}

const handleSpaClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  cb: () => void
) => {
  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
    e.preventDefault();
    cb();
  }
};

const NavContent = ({ className = '', view, navTo }: NavContentProps) => {
  if (view === 'connect') {
    return null;
  }

  return (
    <nav className={className} aria-label="Primary Navigation">
      <a
        href="/professional-work"
        onClick={(e) => handleSpaClick(e, () => navTo('work'))}
        aria-current={view === 'work' ? 'page' : undefined}
        className={`text-technical-label transition-colors whitespace-nowrap uppercase ${
          view === 'work' ? 'text-dynasty' : 'text-black hover:text-dynasty'
        }`}
      >
        Professional Work
      </a>
      <a
        href="/connect"
        onClick={(e) => handleSpaClick(e, () => navTo('connect'))}
        className="text-technical-label text-black hover:text-dynasty transition-colors whitespace-nowrap uppercase"
      >
        Connect
      </a>
    </nav>
  );
};

export interface HeaderProps {
  view: ViewType;
  navTo: (newView: 'index' | 'detail' | 'connect' | 'work', project?: Project) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  className?: string;
}

export const Header = ({ view, navTo, isMenuOpen, setIsMenuOpen, className = '' }: HeaderProps) => {
  return (
    <header className={`z-50 shrink-0 ${className}`}>
      <div className="flex items-center justify-between px-8 lg:px-12 py-8">
        <a
          href="/"
          onClick={(e) => handleSpaClick(e, () => navTo('index'))}
          className={`text-xl font-semibold tracking-tight uppercase text-left transition-colors whitespace-nowrap ${
            view !== 'index' ? 'hover:text-dynasty' : ''
          }`}
        >
          Tanner Gerrard
        </a>
        {view !== 'connect' && (
          <div className="flex items-center gap-4 sm:gap-8">
            <NavContent
              className={`${
                view === 'index' ? 'hidden min-[1250px]:flex' : 'hidden min-[565px]:flex'
              } items-center gap-8 lg:gap-12`}
              view={view}
              navTo={navTo}
            />
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${
                view === 'index' ? 'min-[1250px]:hidden' : 'min-[565px]:hidden'
              } p-2 hover:text-dynasty transition-colors`}
              aria-label="Toggle Menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {view !== 'connect' && isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`${
              view === 'index' ? 'min-[1250px]:hidden' : 'min-[565px]:hidden'
            } bg-surface border-b border-outline overflow-hidden px-8 pb-8`}
          >
            <NavContent className="flex flex-col gap-4 pt-4" view={view} navTo={navTo} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
