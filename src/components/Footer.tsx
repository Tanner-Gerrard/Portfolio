import React from 'react';
import { Project } from '../types';

interface FooterProps {
  navTo: (newView: 'index' | 'detail' | 'connect' | 'work', project?: Project) => void;
  className?: string;
  showBackToIndex?: boolean;
}

export const Footer = ({ navTo, className = "border-t border-outline shrink-0", showBackToIndex = true }: FooterProps) => (
  <footer className={className}>
    <div className="max-w-[1600px] mx-auto px-8 md:px-10 lg:px-12 h-[42px] flex items-center justify-between">
      <div className="flex items-center gap-4">
        <p className="text-technical-label text-gray-400 uppercase tracking-widest whitespace-nowrap">© 2026 Tanner Gerrard</p>
      </div>
      
      {showBackToIndex && (
        <div className="flex items-center">
          <a
            href="/"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                e.preventDefault();
                navTo('index');
              }
            }}
            className="text-technical-label text-black hover:text-dynasty transition-colors uppercase tracking-widest font-bold flex items-center whitespace-nowrap"
          >
            Back to Index
          </a>
        </div>
      )}
    </div>
  </footer>
);
