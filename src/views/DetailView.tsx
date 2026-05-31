import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, ViewProps } from '../types';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

let apiLoaded = false;
const loadYoutubeAPI = () => {
  if (apiLoaded) return Promise.resolve();
  return new Promise<void>((resolve) => {
    if (window.YT && window.YT.Player) {
      apiLoaded = true;
      resolve();
      return;
    }
    const existingScript = document.getElementById('youtube-iframe-api');
    if (!existingScript) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }
    const checkAPI = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(checkAPI);
        apiLoaded = true;
        resolve();
      }
    }, 100);
  });
};

const ExpandedVideoPlayer = ({ videoUrl, fallbackImage, title = "Video player" }: { videoUrl: string; fallbackImage?: string; title?: string }) => {
  const ytId = getYoutubeId(videoUrl);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<any>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (!ytId) return;

    let player: any = null;
    let isDestroyed = false;

    loadYoutubeAPI().then(() => {
      if (isDestroyed || !containerRef.current) return;

      const playerDiv = document.createElement('div');
      playerDiv.className = "w-full h-full";
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(playerDiv);

      player = new window.YT.Player(playerDiv, {
        videoId: ytId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          vq: 'hd2160',
        },
        events: {
          onReady: (event: any) => {
            event.target.unMute();
            event.target.setVolume(100);
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (event.data === 0) { // ENDED is 0
              event.target.playVideo();
            }
          },
        },
      });
      playerRef.current = player;
    });

    return () => {
      isDestroyed = true;
      if (player && typeof player.destroy === 'function') {
        player.destroy();
      }
      playerRef.current = null;
    };
  }, [ytId]);

  if (ytId) {
    return (
      <div className="w-[85vw] max-w-4xl aspect-[16/9] border border-white/10 shadow-2xl rounded overflow-hidden bg-black flex items-center justify-center">
        <div ref={containerRef} className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="relative max-w-full max-h-[75vh] md:max-h-[80vh] flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl}
        poster={fallbackImage}
        autoPlay
        playsInline
        controls
        loop
        className="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain border border-white/10 shadow-2xl rounded"
      />
    </div>
  );
};

const ProcessVideoPlayer = ({ videoUrl, imageUrl, title }: { videoUrl: string; imageUrl?: string; title: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const ytId = getYoutubeId(videoUrl);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!isVisible) {
    return (
      <div ref={containerRef} className="w-full h-full bg-charcoal relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="w-6 h-6 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-charcoal">
      {ytId ? (
        <div className="w-full h-full relative overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd2160`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full h-full select-none pointer-events-none"
            style={{ border: 'none' }}
          />
          <div className="absolute inset-0 bg-transparent z-10" />
        </div>
      ) : (
        <video 
          src={videoUrl} 
          poster={imageUrl}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export const DetailView = ({ view, navTo, isMenuOpen, setIsMenuOpen, activeProject }: ViewProps & { activeProject: Project }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [pulseTrigger, setPulseTrigger] = useState(0);
  const [showArrows, setShowArrows] = useState(true);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const isSwipingRef = React.useRef<boolean>(false);
  const touchStartX = React.useRef<number | null>(null);
  const touchStartY = React.useRef<number | null>(null);

  const resetArrowTimer = React.useCallback(() => {
    setShowArrows(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      const isTouch = window.matchMedia('(hover: none)').matches || ('ontouchstart' in window);
      if (isTouch) {
        setShowArrows(false);
      }
    }, 2500);
  }, []);

  React.useEffect(() => {
    if (expandedIndex !== null) {
      resetArrowTimer();
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [expandedIndex, resetArrowTimer]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwipingRef.current = false;
    resetArrowTimer();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    resetArrowTimer();
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.touches[0].clientX;
    const diffY = touchStartY.current - e.touches[0].clientY;
    if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
      isSwipingRef.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    resetArrowTimer();
    if (touchStartX.current === null || touchStartY.current === null) return;
    if (e.changedTouches && e.changedTouches.length > 0) {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = touchStartX.current - endX;
      const diffY = touchStartY.current - endY;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 40) {
          isSwipingRef.current = true;
          if (diffX > 0) {
            setExpandedIndex((prev) => {
              if (prev === null) return null;
              return (prev + 1) % zoomableImages.length;
            });
          } else {
            setExpandedIndex((prev) => {
              if (prev === null) return null;
              return (prev - 1 + zoomableImages.length) % zoomableImages.length;
            });
          }
        }
      }
    }
    setTimeout(() => {
      isSwipingRef.current = false;
    }, 100);
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Formulate the ordered list of expand-enabled zoom images matching the reading layout order (reading a book)
  const heroImage = activeProject.image;
  const detail1 = activeProject.detailImages?.[0] || "https://images.unsplash.com/photo-1551632811-561730d164a1?auto=format&fit=crop&q=80&w=600";
  const detail2 = activeProject.detailImages?.[1] || "https://images.unsplash.com/photo-1614743224377-669be740e557?auto=format&fit=crop&q=80&w=600";
  
  const zoomableImages: string[] = [heroImage, detail1, detail2];
  if (activeProject.process) {
    activeProject.process.forEach(item => {
      zoomableImages.push(item.video || item.image);
    });
  }

  const getFallbackImage = () => {
    if (expandedIndex === null) return '';
    if (expandedIndex >= 3 && activeProject.process && activeProject.process[expandedIndex - 3]) {
      return activeProject.process[expandedIndex - 3].image;
    }
    return zoomableImages[expandedIndex] || '';
  };
  const fallbackImageForExpandedView = getFallbackImage();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpandedIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setExpandedIndex((prev) => {
          if (prev === null) return null;
          return (prev - 1 + zoomableImages.length) % zoomableImages.length;
        });
      } else if (e.key === 'ArrowRight') {
        setExpandedIndex((prev) => {
          if (prev === null) return null;
          return (prev + 1) % zoomableImages.length;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomableImages.length]);

  React.useEffect(() => {
    if (expandedIndex === null) {
      setPulseTrigger(0);
    } else if (prevIndex !== null) {
      const isWrapForward = prevIndex === zoomableImages.length - 1 && expandedIndex === 0;
      const isWrapBackward = prevIndex === 0 && expandedIndex === zoomableImages.length - 1;
      if (isWrapForward || isWrapBackward) {
        setPulseTrigger(p => p + 1);
      }
    }
    setPrevIndex(expandedIndex);
  }, [expandedIndex, zoomableImages.length]);

  const expandedImage = expandedIndex !== null ? zoomableImages[expandedIndex] : null;

  return (
    <div className="min-h-screen bg-surface font-sans selection:bg-dynasty/20">
    <Header view={view} navTo={navTo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} className="bg-surface/80 backdrop-blur-md" />

    <main className="max-w-[1600px] mx-auto pt-6 pb-32">
      <section className="px-8 md:px-10 lg:px-12">
        <div className="lg:hidden mb-12">
          <p className="text-technical-label text-dynasty mb-4">2026 // SELECTED WORKS</p>
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
              <div 
                className="aspect-square bg-surface-dim/30 overflow-hidden cursor-zoom-in group"
                onClick={() => setExpandedIndex(1)}
              >
                <img 
                  src={activeProject.detailImages?.[0] || "https://images.unsplash.com/photo-1551632811-561730d164a1?auto=format&fit=crop&q=80&w=600"} 
                  alt="Detail 1" 
                  className="w-full h-full object-cover opacity-100 transition-all duration-700 hover:scale-105" 
                  loading="lazy"
                />
               </div>
              <div 
                className="aspect-square bg-surface-dim/30 overflow-hidden cursor-zoom-in group"
                onClick={() => setExpandedIndex(2)}
              >
                 <img 
                  src={activeProject.detailImages?.[1] || "https://images.unsplash.com/photo-1614743224377-669be740e557?auto=format&fit=crop&q=80&w=600"} 
                  alt="Detail 2" 
                  className="w-full h-full object-cover opacity-100 transition-all duration-700 hover:scale-105" 
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>

          <div className="space-y-12 h-full flex flex-col">
            <div className="hidden lg:block">
              <p className="text-technical-label text-dynasty mb-4">2026 // SELECTED WORKS</p>
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
                {activeProject.technicalOverview || (activeProject.id === '01' 
                  ? 'The Alptour is a modular alpine system designed for approach-to-summit efficiency. Constructed from Ultra 200X, it balances extreme abrasion resistance with a weight-to-volume ratio optimized for sustained vertical movement.'
                  : `Engineered for high-output movement in variable alpine conditions. The ${activeProject.title} utilizes a hyper-breathable shell combined with strategic wind-resistant paneling.`)}
              </p>
            </div>

            <div className="space-y-6 flex-grow">
              <h3 className="text-technical-label border-b border-outline pb-2">Key Features</h3>
              <ul className="space-y-4">
                {(activeProject.keyFeatures || (activeProject.id === '01' ? [
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
                ])).map((feature, i) => (
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
          {activeProject.designQuote || (activeProject.id === '01' 
            ? '"The heaviest part of the climb is the approach, so why carry the same pack for both?"'
            : '"We don\'t solve for comfort; we solve for survival in movement."')}
        </p>
        <div className="grid sm:grid-cols-2 gap-12 md:gap-16 text-gray-500 text-lg">
          {activeProject.designNarrative ? (
            activeProject.designNarrative.map((para, i) => (
              <p key={i}>{para}</p>
            ))
          ) : activeProject.id === '01' ? (
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
                <div 
                  className="aspect-[16/9] bg-charcoal overflow-hidden group cursor-zoom-in relative"
                  onClick={() => setExpandedIndex(3 + idx)}
                >
                  {item.video ? (
                    <ProcessVideoPlayer 
                      videoUrl={item.video} 
                      imageUrl={item.image} 
                      title={item.title} 
                    />
                  ) : (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    />
                  )}
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

    <AnimatePresence>
      {expandedIndex !== null && expandedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => {
            if (isSwipingRef.current) return;
            setExpandedIndex(null);
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center cursor-zoom-out p-4 md:p-8 select-none"
        >
          {/* Top navigation status bar */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-50">
            <motion.span 
              key={pulseTrigger}
              animate={pulseTrigger > 0 ? {
                color: ["rgba(255, 255, 255, 0.4)", "#ce2c21", "#ce2c21", "rgba(255, 255, 255, 0.4)"]
              } : {}}
              transition={{ duration: 0.8, times: [0, 0.25, 0.7, 1], ease: "easeInOut" }}
              className="text-xs font-mono tracking-widest text-white/40 uppercase inline-block"
            >
              INDEX // [ {(expandedIndex + 1).toString().padStart(2, '0')} / {zoomableImages.length.toString().padStart(2, '0')} ]
            </motion.span>
            <button 
              onClick={() => setExpandedIndex(null)}
              className="text-white/60 hover:text-white transition-colors duration-200 focus:outline-none p-2"
            >
              <span className="text-xs font-mono tracking-widest uppercase">Close // Esc</span>
            </button>
          </div>

          {/* Left Navigation Arrow */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setExpandedIndex((prev) => {
                if (prev === null) return null;
                return (prev - 1 + zoomableImages.length) % zoomableImages.length;
              });
            }}
            animate={{ opacity: showArrows ? 0.5 : 0, pointerEvents: showArrows ? 'auto' : 'none' }}
            whileHover={{ opacity: showArrows ? 1 : 0, scale: showArrows ? 1.05 : 1 }}
            whileTap={{ scale: showArrows ? 0.95 : 1 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/5 border border-white/10 text-white rounded-full focus:outline-none z-50"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Right Navigation Arrow */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setExpandedIndex((prev) => {
                if (prev === null) return null;
                return (prev + 1) % zoomableImages.length;
              });
            }}
            animate={{ opacity: showArrows ? 0.5 : 0, pointerEvents: showArrows ? 'auto' : 'none' }}
            whileHover={{ opacity: showArrows ? 1 : 0, scale: showArrows ? 1.05 : 1 }}
            whileTap={{ scale: showArrows ? 0.95 : 1 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/5 border border-white/10 text-white rounded-full focus:outline-none z-50"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </motion.button>
          
          <div className="relative max-w-5xl max-h-[80vh] flex items-center justify-center limit-click" onClick={(e) => e.stopPropagation()}>
            <motion.div
              key={expandedIndex}
              initial={{ opacity: 0.5, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center justify-center p-2"
            >
              {(() => {
                if (!expandedImage) return null;
                const ytId = getYoutubeId(expandedImage);
                const isDirectVideo = /(\.mp4|\.webm|\.mov)/i.test(expandedImage);
                if (ytId || isDirectVideo) {
                  return (
                    <ExpandedVideoPlayer 
                      videoUrl={expandedImage}
                      fallbackImage={fallbackImageForExpandedView}
                      title="Process view"
                    />
                  );
                }
                return (
                  <img 
                    src={expandedImage || fallbackImageForExpandedView || ''} 
                    alt={`Expanded view ${expandedIndex + 1}`} 
                    className="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain select-none border border-white/10 shadow-2xl cursor-zoom-out animate-none"
                    onClick={() => setExpandedIndex(null)}
                    referrerPolicy="no-referrer"
                  />
                );
              })()}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
};
