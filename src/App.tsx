/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ReactNode } from 'react';
import { Project } from './types';
import { PROJECTS } from './constants';
import { ConnectView } from './views/ConnectView';
import { DetailView } from './views/DetailView';
import { IndexView } from './views/IndexView';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
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

  const navTo = (newView: 'index' | 'detail' | 'connect', project?: Project) => {
    setView(newView);
    setIsMenuOpen(false);

    const routes: Record<string, string> = {
      index: '/',
      connect: '/connect',
      detail: project ? `/project/${project.id}` : '/'
    };

    if (newView === 'index') setHoveredProject(null);
    if (newView === 'detail' && project) setActiveProject(project);

    window.history.pushState({}, '', routes[newView] || '/');
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;

      if (path === '/') return setView('index');
      if (path === '/connect') return setView('connect');

      const match = path.match(/^\/project\/([^/]+)$/);
      const projectId = match ? match[1] : null;
      const project = projectId ? PROJECTS.find(p => p.id === projectId) : null;
      
      if (project) {
        setActiveProject(project);
        setView('detail');
      }
    };

    const handleGlobalError = (event: ErrorEvent) => {
      console.log('DEBUG: Global Error Event handled', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
      if (event.message === 'Script error.') {
        console.warn('CORS-masked error detected. Check for failed external scripts or Cross-Origin issues.');
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.log('DEBUG: Unhandled Promise Rejection', {
        reason: event.reason,
        promise: event.promise
      });
      if (event.reason && String(event.reason).includes('[object ReadableStream]')) {
        console.warn('RELEVANT: Potential stream handling error detected. This often happens if a network response is logged without being consumed.');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    // Initial path handle
    handlePopState();

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  useEffect(() => {
    const brand = "Alpine Equipment, Nothing Unnecessary";
    let title = brand;
    let description = "Tanner Gerrard is a Softgoods and Technical Apparel Designer specializing in Alpinism and high-performance outdoor equipment. Explore the NIHIL portfolio.";

    if (view === 'detail') {
      title = `${activeProject.title} | ${brand}`;
      description = `Technical analysis and process archive for the ${activeProject.title}. ${activeProject.subtitle}. Designed by Tanner Gerrard.`;
    } else if (view === 'connect') {
      title = `Connect | ${brand}`;
      description = "Get in touch with Tanner Gerrard for collaborations in Softgoods and Technical Apparel design.";
    }

    document.title = title;
    
    // Update meta description dynamically
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
    
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

  }, [view, activeProject]);

  if (view === 'connect') {
    return <ConnectView view={view} navTo={navTo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />;
  }

  if (view === 'detail') {
    return <DetailView view={view} navTo={navTo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} activeProject={activeProject} />;
  }

  return (
    <IndexView 
      view={view} 
      navTo={navTo} 
      isMenuOpen={isMenuOpen} 
      setIsMenuOpen={setIsMenuOpen} 
      showMobileHero={showMobileHero} 
      setShowMobileHero={setShowMobileHero}
      hoveredProject={hoveredProject}
      setHoveredProject={setHoveredProject}
      handleProjectClick={(p) => { navTo('detail', p); window.scrollTo(0,0); }}
    />
  );
}
