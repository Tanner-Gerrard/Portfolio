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

const ExpandedVideoPlayer = ({ 
  videoUrl, 
  fallbackImage, 
  title = "Video player",
  aspect = "aspect-[16/9]"
}: { 
  videoUrl: string; 
  fallbackImage?: string; 
  title?: string;
  aspect?: string;
}) => {
  const ytId = getYoutubeId(videoUrl);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const [isPortrait, setIsPortrait] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 1024 && window.innerHeight > window.innerWidth;
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsPortrait(window.innerWidth < 1024 && window.innerHeight > window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

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
            if (event.data === 0) { // ENDED
              event.target.playVideo();
            }
          },
        },
      });
    });

    return () => {
      isDestroyed = true;
      if (player && typeof player.destroy === 'function') {
        player.destroy();
      }
    };
  }, [ytId]);

  if (ytId) {
    const isPortraitAspect = aspect.includes('aspect-[3/4]') || aspect.includes('aspect-[4/5]') || isPortrait;
    const aspectClass = isPortraitAspect 
      ? 'w-[75vw] md:w-[85vw] max-w-[500px] aspect-[3/4]' 
      : 'w-[95vw] md:w-[90vw] lg:w-full max-w-[1240px] aspect-[16/9] max-h-[78vh] md:max-h-[84vh] lg:max-h-[88vh]';

    return (
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`${aspectClass} border-0 shadow-2xl rounded-none overflow-hidden bg-black flex items-center justify-center relative`}
      >
        {isPortraitAspect && (
          <style dangerouslySetInnerHTML={{__html: `
            .youtube-portrait-crop iframe {
              position: absolute !important;
              top: 50% !important;
              left: 50% !important;
              transform: translate(-50%, -50%) !important;
              height: 100% !important;
              width: 237.04% !important;
              max-width: none !important;
            }
          `}} />
        )}
        <div ref={containerRef} className={`absolute inset-0 w-full h-full ${isPortraitAspect ? 'youtube-portrait-crop' : ''}`} />
      </div>
    );
  }

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className="relative max-w-full max-h-[78vh] md:max-h-[84vh] lg:max-h-[88vh] flex items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={fallbackImage}
        autoPlay
        playsInline
        controls
        loop
        className="max-w-full max-h-[78vh] md:max-h-[84vh] lg:max-h-[88vh] object-contain border-0 shadow-2xl rounded-none"
      />
    </div>
  );
};

const ProcessVideoPlayer = ({ videoUrl, imageUrl, title }: { videoUrl: string; imageUrl?: string; title: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const ytId = getYoutubeId(videoUrl);

  React.useEffect(() => {
    if (!containerRef.current) return;
    
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            io.disconnect();
          }
        });
      },
      {
        rootMargin: '100px',
      }
    );
    io.observe(containerRef.current);

    return () => {
      io.disconnect();
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
        <div className="absolute inset-0 overflow-hidden bg-charcoal">
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd2160`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-[237.04%] max-w-none landscape:inset-0 landscape:w-full landscape:h-full landscape:translate-x-0 landscape:translate-y-0 lg:inset-0 lg:w-full lg:h-full lg:translate-x-0 lg:translate-y-0 lg:aspect-auto select-none pointer-events-none"
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

const ExpandedNavButton = ({
  direction,
  onClick,
  showArrows,
}: {
  direction: 'left' | 'right';
  onClick: (e: React.MouseEvent) => void;
  showArrows: boolean;
}) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  return (
    <motion.button
      onClick={onClick}
      animate={{ opacity: showArrows ? 0.5 : 0, pointerEvents: showArrows ? 'auto' : 'none' }}
      whileHover={{ opacity: showArrows ? 1 : 0, scale: showArrows ? 1.05 : 1 }}
      whileTap={{ scale: showArrows ? 0.95 : 1 }}
      transition={{ duration: 0.2 }}
      className={`absolute ${direction === 'left' ? 'left-4 md:left-8' : 'right-4 md:right-8'} top-1/2 -translate-y-1/2 p-3 bg-white/5 border border-white/10 text-white rounded-full focus:outline-none z-50`}
      aria-label={`${direction === 'left' ? 'Previous' : 'Next'} image`}
    >
      <Icon size={24} />
    </motion.button>
  );
};

const renderPackSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto max-h-[340px] stroke-stone-300 fill-none stroke-[1] select-none">
    {/* Concentric rings to symbolize focus */}
    <circle cx="200" cy="150" r="80" className="stroke-stone-200" strokeDasharray="2 4" />
    
    {/* Technical Pack Drafting */}
    <path d="M140 70 L260 70 L245 250 L155 250 Z" className="stroke-stone-400" />
    {/* Roll top collar details */}
    <ellipse cx="200" cy="70" rx="60" ry="10" className="stroke-stone-300" />
    <path d="M140 70 C 140 85, 260 85, 260 70" className="stroke-stone-300" />
    
    {/* Aluminum Stay */}
    <line x1="200" y1="80" x2="200" y2="240" className="stroke-stone-300" strokeDasharray="4 2" />
    
    {/* Tension Cords */}
    <path d="M140 100 L175 140 L145 180 L180 220 L155 250" className="stroke-stone-200" strokeDasharray="3 3" />
    <path d="M260 100 L225 140 L255 180 L220 220 L245 250" className="stroke-stone-200" strokeDasharray="3 3" />
  </svg>
);

const renderJacketSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto max-h-[340px] stroke-stone-300 fill-none stroke-[1] select-none">
    <circle cx="200" cy="150" r="80" className="stroke-stone-200" strokeDasharray="2 4" />
    
    {/* Jacket Wireframe */}
    <path d="M175 75 Q200 45 225 75 Q200 85 175 75" className="stroke-stone-300" />
    <path d="M175 75 L165 95 L235 95 L225 75" className="stroke-stone-400" />
    <path d="M235 95 C265 110, 290 145, 305 210 L285 215 C272 165, 252 140, 235 125" className="stroke-stone-400" />
    <path d="M165 95 C135 110, 110 145, 95 210 L115 215 C128 165, 148 140, 165 125" className="stroke-stone-400" />
    <path d="M165 125 L160 240 L200 250 L240 240 L235 125" className="stroke-stone-300" />
    <line x1="200" y1="95" x2="200" y2="250" className="stroke-stone-400" strokeDasharray="3 2" />
  </svg>
);

const renderPantSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto max-h-[340px] stroke-stone-300 fill-none stroke-[1] select-none">
    <circle cx="200" cy="150" r="80" className="stroke-stone-200" strokeDasharray="2 4" />
    
    {/* Pants silhouette */}
    <path d="M150 65 L250 65" className="stroke-stone-300 stroke-[1.5]" />
    <path d="M150 65 L135 150 L142 265 L182 265 L190 140" className="stroke-stone-400" />
    <path d="M250 65 L265 150 L258 265 L218 265 L210 140" className="stroke-stone-400" />
    <path d="M190 140 Q200 148 210 140" className="stroke-stone-450" />
    <path d="M136 175 H160 M137 182 H155" className="stroke-stone-300" />
    <path d="M264 175 H240 M263 182 H245" className="stroke-stone-300" />
  </svg>
);

const renderGloveSVG = () => (
  <svg viewBox="0 0 540 360" className="w-full h-auto max-h-[345px] stroke-stone-800 fill-none stroke-[1.2] select-none">
    {/* Concentric subtle background tech grid circles to look minimal and technical */}
    <circle cx="270" cy="180" r="105" className="stroke-stone-100" strokeDasharray="3 12" />
    <circle cx="270" cy="180" r="145" className="stroke-stone-100/60" strokeDasharray="1 16" />
    
    {/* Micro scale indicators in corners */}
    <path d="M 40 40 H 55 M 40 40 V 55" className="stroke-stone-200" />
    <path d="M 500 40 H 485 M 500 40 V 55" className="stroke-stone-200" />
    <path d="M 40 320 H 55 M 40 320 V 305" className="stroke-stone-200" />
    <path d="M 500 320 H 485 M 500 320 V 305" className="stroke-stone-200" />

    {/* FINGER LOOPS (From Left to Right: Pinky, Ring, Middle, Index) */}
    {/* Loop 1: Pinky (Leftmost) */}
    <path d="M 194 99 C 181 65, 222 62, 232 95" className="stroke-stone-800" />
    <path d="M 194 99 C 205 82, 225 80, 232 95" className="stroke-stone-500" />
    <path d="M 222 69 C 215 72, 203 86, 201 95" className="stroke-stone-400" />

    {/* Loop 2: Ring */}
    <path d="M 235 88 C 232 46, 280 43, 287 86" className="stroke-stone-800" />
    <path d="M 235 88 C 248 68, 276 66, 287 86" className="stroke-stone-500" />
    <path d="M 273 53 C 265 58, 249 74, 246 86" className="stroke-stone-400" />

    {/* Loop 3: Middle */}
    <path d="M 290 84 C 288 35, 348 32, 355 83" className="stroke-stone-800" />
    <path d="M 290 84 C 308 61, 339 59, 355 83" className="stroke-stone-500" />
    <path d="M 338 42 C 328 48, 307 68, 303 82" className="stroke-stone-400" />

    {/* Loop 4: Index (Rightmost) */}
    <path d="M 358 84 C 356 38, 412 36, 401 100" className="stroke-stone-800" />
    <path d="M 358 84 C 374 62, 396 61, 401 100" className="stroke-stone-500" />
    <path d="M 393 45 C 383 50, 371 74, 369 90" className="stroke-stone-400" />

    {/* MAIN LEATHER WRAP SILHOUETTE */}
    <path 
      d="M 194 99 
         C 188 128, 186 160, 182 178 
         C 152 179, 114 186, 80 202 
         C 50 216, 26 230, 20 248 
         C 17 262, 25 272, 40 270 
         C 64 266, 108 248, 146 226 
         C 172 212, 185 214, 198 218 
         C 238 226, 280 226, 320 216 
         C 346 210, 364 196, 380 180 
         C 396 164, 422 153, 448 141 
         C 462 133, 462 121, 448 115 
         C 428 106, 398 97, 401 100" 
      className="stroke-stone-800 stroke-[1.5]" 
    />

    {/* Double Stitching along Left Wrap Pull Strap */}
    <path 
      d="M 183 186
         C 155 187, 118 194, 85 209 
         C 57 222, 35 235, 29 251
         C 27 257, 31 262, 38 261 
         C 59 257, 102 240, 139 219
         C 165 205, 178 207, 191 211"
      className="stroke-stone-400 stroke-[0.8]" 
      strokeDasharray="2 3" 
    />

    {/* PALM DURABILITY REINFORCEMENT PATCH (Double-Dashed Diagonal Shape) */}
    <path 
      d="M 272 221 L 322 171 C 362 181, 395 201, 410 208" 
      className="stroke-stone-500 stroke-[1]" 
      strokeDasharray="2.5 2.5" 
    />
    <path 
      d="M 270 225 L 322 175 C 362 185, 395 205, 412 212" 
      className="stroke-stone-400 stroke-[0.8]" 
      strokeDasharray="2.5 2.5" 
    />

    {/* VELCRO HOOK STRAP UNDER WRIST (Peaking on Right) */}
    <path 
      d="M 390 202 C 398 222, 408 222, 415 212 L 422 182" 
      className="stroke-stone-700 stroke-[1.2]" 
    />
    <path 
      d="M 394 204 C 400 218, 406 218, 411 211" 
      className="stroke-stone-400 stroke-[0.8]" 
      strokeDasharray="1.5 2" 
    />

    {/* DIAGONAL SEGMENT LINE ON LEFT BODY WRAP */}
    <path d="M 182 178 C 172 195, 155 210, 146 226" className="stroke-stone-300 stroke-[1]" strokeDasharray="3 3" />

    {/* SEWING ACCENTS / TACKS UNDERNEATH FINGER BASES */}
    {/* Pinky Tack */}
    <path d="M 198 108 H 218" className="stroke-stone-400 stroke-[1]" strokeDasharray="2 2" />
    <path d="M 200 112 H 220" className="stroke-stone-400 stroke-[1]" strokeDasharray="2 2" />
    
    {/* Ring Tack */}
    <path d="M 242 96 H 264" className="stroke-stone-400 stroke-[1]" strokeDasharray="2 2" />
    <path d="M 244 100 H 266" className="stroke-stone-400 stroke-[1]" strokeDasharray="2 2" />

    {/* Middle Tack */}
    <path d="M 296 92 H 318" className="stroke-stone-400 stroke-[1]" strokeDasharray="2 2" />
    <path d="M 298 96 H 320" className="stroke-stone-400 stroke-[1]" strokeDasharray="2 2" />
  </svg>
);

const StaticSchematic = ({ projectId }: { projectId: string }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgSrc, setImgSrc] = useState('/images/projects/glove-wireframer.svg');

  const renderSVG = () => {
    switch (projectId) {
      case '01': return renderPackSVG();
      case '02': return renderJacketSVG();
      case '03': return renderPantSVG();
      case '04':
      default:
        return renderGloveSVG();
    }
  };

  if (projectId === '04' && !imgFailed) {
    return (
      <div className="w-full max-w-full flex items-center justify-center opacity-95 select-none py-4">
        <img 
          src={imgSrc} 
          alt="Glove Wireframe" 
          className="w-full h-auto max-h-[350px] max-w-full object-contain mix-blend-darken"
          referrerPolicy="no-referrer"
          onError={() => {
            if (imgSrc.endsWith('.svg')) {
              setImgSrc('/images/projects/glove-wireframer.png');
            } else {
              setImgFailed(true);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-full flex items-center justify-center pointer-events-none opacity-80 select-none py-4">
      {renderSVG()}
    </div>
  );
};

// fallow-ignore-next-line complexity
export const DetailView = ({ view, navTo, isMenuOpen, setIsMenuOpen, activeProject }: ViewProps & { activeProject: Project }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeProcessIdx, setActiveProcessIdx] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [pulseTrigger, setPulseTrigger] = useState(0);
  const [showArrows, setShowArrows] = useState(true);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const isSwipingRef = React.useRef<boolean>(false);
  const touchStartX = React.useRef<number | null>(null);
  const touchStartY = React.useRef<number | null>(null);

  const getMediaCaption = (index: number) => {
    if (index === 0) {
      return {
        phase: `${activeProject.year} // SYSTEM OVERVIEW`,
        title: activeProject.title,
        description: activeProject.subtitle,
      };
    }
    if (index === 1) {
      return {
        phase: `DETAIL // 01`,
        title: `ANATOMICAL REFINEMENT`,
        description: activeProject.id === '04'
          ? `Detailed close-up study of the 0.8mm technical leather wrapping technique, highlighting the monolithic material usage and pure leather texture.`
          : `Macro analysis of secondary interfaces, seam construction integrity, and face fabrics interaction.`,
      };
    }
    if (index === 2) {
      return {
        phase: `DETAIL // 02`,
        title: `INTERFACE EXECUTION`,
        description: activeProject.id === '04'
          ? `Detailed inspection of the low-profile recessed wrist closure and high-strength UHMWPE stitching paths.`
          : `High-resolution detail of mechanical zippers, closure channels, and functional trim integrations.`,
      };
    }
    if (activeProject.process && index >= 3) {
      const item = activeProject.process[index - 3];
      if (item) {
        return {
          phase: item.phase,
          title: item.title,
          description: item.description,
        };
      }
    }
    return null;
  };

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
                {((activeProject.keyFeatures || (activeProject.id === '01' ? [
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
                ]))).map((feature, i) => (
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

      {activeProject.id === '04' ? (
        <section className="mt-16 px-8 md:px-10 lg:px-12 border-t border-outline/40 pt-12">
          <div className="grid grid-cols-1 lg:landscape:grid-cols-3 gap-12 lg:gap-16 items-start">
            
            {/* Left 1/3: Header */}
            <div className="col-span-1">
              <h3 className="text-technical-label text-dynasty mb-4 tracking-[0.3em]">System Anatomy</h3>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[0.85]">
                Corium Schematic.
              </h2>
            </div>

            {/* Right 2/3: PNG Image */}
            <div className="relative w-full flex justify-center items-center select-none col-span-1 lg:landscape:col-span-2">
              <picture className="w-full flex justify-center items-center">
                <source 
                  srcSet="/images/projects/Coriummobilecallout.png" 
                  media="(max-width: 768px)" 
                />
                <source 
                  srcSet="/images/projects/outlinecoriumglovecalloutportraitinter.png" 
                  media="(max-width: 1024px), (orientation: portrait)" 
                />
                <img 
                  src="/images/projects/outlinecoriumglovecallout.png" 
                  alt="Corium Glove Wireframe Callout Schematic" 
                  className="w-full h-auto max-h-[85vh] object-contain rounded-md" 
                  referrerPolicy="no-referrer"
                />
              </picture>
            </div>

          </div>
        </section>
      ) : (
        <section className="mt-32 px-8 md:px-10 lg:px-12 border-t border-outline/40 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
            
            {/* Left Column: High-Impact Typography & Narrative */}
            <div className="lg:col-span-7 min-w-0 max-w-full space-y-8 overflow-hidden">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#ce2c21]" />
                <h3 className="text-xs font-mono text-[#ce2c21] tracking-[0.3em] uppercase">DESIGN NARRATIVE</h3>
              </div>
              
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-extralight italic text-charcoal/90 leading-tight">
                {activeProject.designQuote || (activeProject.id === '01' 
                  ? '"The heaviest part of the climb is the approach, so why carry the same pack for both?"'
                  : '"We don\'t solve for comfort; we solve for survival in movement."')}
              </blockquote>
              
              <div className="text-stone-500 space-y-6 text-sm md:text-base leading-relaxed font-light">
                {activeProject.designNarrative ? (
                  activeProject.designNarrative.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                ) : activeProject.id === '01' ? (
                  <p>
                    The Alptour Pack was conceived on technical approaches where volume matters most, collapsing from a durable 45L load carrier to a high-stability 25L summit pack. It tests the limits of Ultra 200X composites and procedural patterning.
                  </p>
                ) : (
                  <p>
                    Born out of necessity for a micro-climate between a windbreaker and a full shell. By deploying laser venting in maximum heat zones and high-tenacity ripstops at exposure zones, the garment functions as an active auxiliary layer that disappears on the body.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Wireframe / StaticSchematic */}
            <div className="lg:col-span-5 min-w-0 max-w-full flex flex-col justify-center overflow-hidden">
              <div className="relative w-full max-w-full flex flex-col items-center justify-center py-4 overflow-hidden">
                <StaticSchematic projectId={activeProject.id} />
              </div>
            </div>

          </div>
        </section>
      )}

      {activeProject.process && (
        <section className={`${activeProject.id === '04' ? 'mt-20 pt-12' : 'mt-48 pt-24'} px-8 md:px-10 lg:px-12 border-t border-outline`}>
          <div className="mb-20">
            <h3 className="text-technical-label text-dynasty mb-4 tracking-[0.3em]">Process Archive</h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[0.85]">
              From Sketch <br/>to System.
            </h2>
          </div>

          {/* Reverted Layout: Three-wide for images, and full-width for video elements */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-16 items-start">
            {activeProject.process.map((item, idx) => {
              if (item.video) {
                return (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="col-span-1 md:col-span-2 lg:col-span-3 border-t border-outline pt-10 mt-4 first:border-0 first:pt-0 first:mt-0"
                  >
                    <div 
                      className="bg-charcoal overflow-hidden group cursor-zoom-in relative aspect-video portrait:aspect-[3/4] lg:aspect-video w-full rounded-none border-0 shadow-lg"
                      onClick={() => setExpandedIndex(3 + idx)}
                    >
                      <ProcessVideoPlayer 
                        videoUrl={item.video} 
                        imageUrl={item.image} 
                        title={item.title} 
                      />
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="col-span-1 space-y-5"
                >
                  <div 
                    className={`${item.aspect || activeProject.processGridAspect || 'aspect-[4/3]'} bg-charcoal overflow-hidden group cursor-zoom-in relative rounded-none border-0 shadow-sm relative`}
                    onClick={() => setExpandedIndex(3 + idx)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-dynasty/60 font-bold">{(idx + 1).toString().padStart(2, '0')}</span>
                      <p className="text-[10px] font-mono text-dynasty tracking-widest uppercase">{item.phase}</p>
                    </div>
                    <h4 className="text-lg font-bold uppercase tracking-tight text-charcoal">{item.title}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
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
          className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-md overflow-hidden cursor-zoom-out select-none flex flex-col items-center justify-center"
        >
          {/* Top navigation status bar */}
          <div className="fixed top-6 left-6 right-6 flex justify-between items-center z-50 pointer-events-none">
            <motion.span 
              key={pulseTrigger}
              animate={pulseTrigger > 0 ? {
                color: ["rgba(255, 255, 255, 0.4)", "#ce2c21", "#ce2c21", "rgba(255, 255, 255, 0.4)"]
              } : {}}
              transition={{ duration: 0.8, times: [0, 0.25, 0.7, 1], ease: "easeInOut" }}
              className="text-xs font-mono tracking-widest text-white/40 uppercase inline-block pointer-events-auto"
            >
              INDEX // [ {(expandedIndex + 1).toString().padStart(2, '0')} / {zoomableImages.length.toString().padStart(2, '0')} ]
            </motion.span>
            <button 
              onClick={() => setExpandedIndex(null)}
              className="text-white/60 hover:text-white transition-colors duration-200 focus:outline-none p-2 pointer-events-auto"
            >
              <span className="text-xs font-mono tracking-widest uppercase">Close // Esc</span>
            </button>
          </div>

          {/* Left Navigation Arrow */}
          <ExpandedNavButton
            direction="left"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedIndex((prev) => {
                if (prev === null) return null;
                return (prev - 1 + zoomableImages.length) % zoomableImages.length;
              });
            }}
            showArrows={showArrows}
          />

          {/* Right Navigation Arrow */}
          <ExpandedNavButton
            direction="right"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedIndex((prev) => {
                if (prev === null) return null;
                return (prev + 1) % zoomableImages.length;
              });
            }}
            showArrows={showArrows}
          />
          
          <div className="h-full w-full flex items-center justify-center p-4">
            <div className="relative max-w-none w-[95vw] h-[90vh] flex items-center justify-center limit-click">
              <motion.div
                key={expandedIndex}
                initial={{ opacity: 0.5, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-10 p-4 w-full h-full"
              >
                <div className="flex-grow min-w-0 flex items-center justify-center w-full max-h-[78vh] md:max-h-[84vh] lg:max-h-[88vh]">
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
                          aspect={activeProject.process && expandedIndex >= 3 ? activeProject.process[expandedIndex - 3].aspect : undefined}
                        />
                      );
                    }
                    return (
                      <img 
                        src={expandedImage || fallbackImageForExpandedView || ''} 
                        alt={`Expanded view ${expandedIndex + 1}`} 
                        className="max-w-full max-h-[78vh] md:max-h-[84vh] lg:max-h-[88vh] object-contain select-none border-0 shadow-2xl rounded-none cursor-zoom-out animate-none bg-charcoal/20"
                        onClick={() => setExpandedIndex(null)}
                        referrerPolicy="no-referrer"
                      />
                    );
                  })()}
                </div>

                {/* Minimalist technical details and descriptions beneath or alongside expanded media */}
                {(() => {
                  const caption = getMediaCaption(expandedIndex);
                  if (!caption) return null;
                  return (
                    <motion.div 
                      onClick={(e) => e.stopPropagation()}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="w-full md:w-[280px] lg:w-[320px] shrink-0 text-center md:text-left px-4 md:px-0 md:pl-8 lg:pl-10 select-text pointer-events-auto flex flex-col justify-center border-t border-white/10 md:border-t-0 md:border-l md:border-white/10 pt-6 md:pt-0 max-w-md md:max-w-none mx-auto md:mx-0"
                    >
                      <p className="text-[10px] sm:text-xs font-mono text-dynasty tracking-widest uppercase mb-2">
                        {caption.phase}
                      </p>
                      <h4 className="text-white text-base sm:text-lg lg:text-xl font-bold uppercase tracking-tight mb-2 lg:mb-4">
                        {caption.title}
                      </h4>
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                        {caption.description}
                      </p>
                    </motion.div>
                  );
                })()}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
};
