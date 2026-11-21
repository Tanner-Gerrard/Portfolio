/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ReactNode } from 'react';
import { Project, ViewType } from './types';
import { PROJECTS } from './constants';
import { ConnectView } from './views/ConnectView';
import { DetailView } from './views/DetailView';
import { IndexView } from './views/IndexView';
import { NotFoundView } from './views/NotFoundView';
import { ProfessionalWorkView } from './views/ProfessionalWorkView';

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

const CANONICAL_ORIGIN = 'https://nihilalpine.com';

const OG_IMAGE_BY_PROJECT: Record<string, string> = {
  '01': `${CANONICAL_ORIGIN}/images/og/01-corium-glove.jpg`,
  '02': `${CANONICAL_ORIGIN}/images/og/02-alptour-pack.jpg`,
  '03': `${CANONICAL_ORIGIN}/images/og/03-ventour-jacket.jpg`,
  '04': `${CANONICAL_ORIGIN}/images/og/04-stridetour-pant.jpg`,
};

function normalizePath(rawPath: string): string {
  if (!rawPath || rawPath === '/') return '/';
  return rawPath.replace(/\/+$/, '') || '/';
}

// fallow-ignore-next-line complexity
function parseRoute(rawPath: string, hash: string): { view: ViewType; project: Project; canonicalPath: string } {
  const path = normalizePath(rawPath);

  // Clean canonical paths take priority
  if (path === '/connect') {
    return { view: 'connect', project: PROJECTS[0], canonicalPath: '/connect' };
  }
  if (path === '/professional-work') {
    return { view: 'work', project: PROJECTS[0], canonicalPath: '/professional-work' };
  }
  if (path.startsWith('/project/')) {
    const segments = path.split('/').filter(Boolean);
    const projectId = segments.length === 2 ? segments[1] : null;
    const project = projectId ? PROJECTS.find(p => p.id === projectId) : null;
    if (project) {
      return { view: 'detail', project, canonicalPath: `/project/${project.id}` };
    }
    return { view: 'not-found', project: PROJECTS[0], canonicalPath: path };
  }

  // Legacy hash URLs resolve cleanly and redirect to canonical paths
  if (hash === '#/connect') {
    return { view: 'connect', project: PROJECTS[0], canonicalPath: '/connect' };
  }
  if (hash === '#/professional-work') {
    return { view: 'work', project: PROJECTS[0], canonicalPath: '/professional-work' };
  }

  const match = hash.match(/^#\/project\/([^/]+)\/?$/);
  const projectId = match ? match[1] : null;
  const project = projectId ? PROJECTS.find(p => p.id === projectId) : null;

  if (project) {
    return { view: 'detail', project, canonicalPath: `/project/${project.id}` };
  }

  if (path === '/' || path === '/index.html') {
    return { view: 'index', project: PROJECTS[0], canonicalPath: '/' };
  }

  return { view: 'not-found', project: PROJECTS[0], canonicalPath: path };
}

function getInitialRouteState() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  return parseRoute(path, hash);
}

function AppContent() {
  const [initialData] = useState(() => getInitialRouteState());
  const [activeProject, setActiveProject] = useState<Project>(initialData.project);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [view, setView] = useState<ViewType>(initialData.view);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileHero, setShowMobileHero] = useState(true);

  const navTo = (newView: 'index' | 'detail' | 'connect' | 'work', project?: Project) => {
    setView(newView);
    setIsMenuOpen(false);

    const routes: Record<string, string> = {
      index: '/',
      connect: '/connect',
      work: '/professional-work',
      detail: project ? `/project/${project.id}` : '/'
    };

    if (newView === 'index') setHoveredProject(null);
    if (newView === 'detail' && project) setActiveProject(project);

    const targetPath = routes[newView] || '/';
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const state = parseRoute(path, hash);

      // Automatically redirect legacy hash routes to clean URLs
      const isLegacyHash =
        hash === '#' ||
        hash === '#/' ||
        hash.startsWith('#/connect') ||
        hash.startsWith('#/professional-work') ||
        hash.startsWith('#/project/');
      if (isLegacyHash && state.view !== 'not-found' && (normalizePath(path) !== state.canonicalPath || hash)) {
        window.history.replaceState({}, '', `${state.canonicalPath}${window.location.search}`);
      }

      setActiveProject(state.project);
      setView(state.view);
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

    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    // Initial path & hash handle
    handleNavigation();

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  useEffect(() => {
    let title = "Alpine Equipment, Nothing Unnecessary";
    let description = "Tanner Gerrard is a Softgoods and Technical Apparel Designer specializing in Alpinism and high-performance outdoor equipment. Explore the nihil portfolio.";
    let canonicalUrl = `${CANONICAL_ORIGIN}/`;
    let ogImage = `${CANONICAL_ORIGIN}/images/og/site.jpg`;
    let robots = "index, follow";

    if (view === 'detail') {
      title = `${activeProject.title} | nihil`;
      description = `Technical analysis and process archive for the ${activeProject.title}. ${activeProject.subtitle}. Designed by Tanner Gerrard.`;
      canonicalUrl = `${CANONICAL_ORIGIN}/project/${activeProject.id}`;
      ogImage = OG_IMAGE_BY_PROJECT[activeProject.id] || ogImage;
    } else if (view === 'connect') {
      title = `Connect | nihil`;
      description = "Get in touch with Tanner Gerrard for collaborations in Softgoods and Technical Apparel design, field testing, and direct inquiries.";
      canonicalUrl = `${CANONICAL_ORIGIN}/connect`;
      ogImage = `${CANONICAL_ORIGIN}/images/og/connect.jpg`;
    } else if (view === 'work') {
      title = `Static Labs — Professional Work | nihil`;
      description = "FP1 Minimalist Chest Pack and modular on-water carry systems developed for Static Labs in partnership with Caid Lunt. Visit staticlabs.us.";
      canonicalUrl = `${CANONICAL_ORIGIN}/professional-work`;
      ogImage = `${CANONICAL_ORIGIN}/images/og/professional-work.jpg`;
    } else if (view === 'not-found') {
      title = `404 — Route Not Found | nihil`;
      description = "The requested page could not be found on nihilalpine.com. Return to the portfolio index or browse selected alpine equipment projects.";
      robots = "noindex, follow";
    }

    document.title = title;

    const setMeta = (selector: string, attr: 'content' | 'href', value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('link[rel="canonical"]', 'href', canonicalUrl);
    setMeta('meta[name="robots"]', 'content', robots);
    setMeta('meta[name="title"]', 'content', title);
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[name="twitter:url"]', 'content', canonicalUrl);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);

  }, [view, activeProject]);

  if (view === 'connect') {
    return <ConnectView view={view} navTo={navTo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />;
  }

  if (view === 'work') {
    return <ProfessionalWorkView view={view} navTo={navTo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />;
  }

  if (view === 'detail') {
    return <DetailView view={view} navTo={navTo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} activeProject={activeProject} />;
  }

  if (view === 'not-found') {
    return (
      <NotFoundView
        view={view}
        navTo={navTo}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleProjectClick={(p) => { navTo('detail', p); window.scrollTo(0, 0); }}
      />
    );
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
