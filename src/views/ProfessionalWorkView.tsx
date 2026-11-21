import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ViewProps } from '../types';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const STATIC_LABS_URL = 'https://staticlabs.us/';

const PACK_HIGHLIGHTS = [
  'Flat Chest Profile — Sits flush against the body so casting mechanics stay unobstructed.',
  'One Main + Two Quick-Access — Stripped-down compartment geometry with zero wasted volume.',
  'No-Shift G-Hook Harness — Locks tension securely in heavy current without strap creep.',
  'Modular Attachment Grid — Engineered for dedicated magnetic net, tippet, floatant, and tether mounting.',
];

const GALLERY_FRAMES = [
  {
    src: '/images/work/static-labs/fp1-field-2.jpg',
    title: 'On-Body Interface',
    caption: 'G-hook tensioning, stretch mesh access, and modular rigging',
    alt: 'Static Labs FP1 Minimalist Chest Pack worn on-body showing G-hooks and stretch mesh pocket',
  },
  {
    src: '/images/work/static-labs/fp1-field-1.jpg',
    title: 'Built for Movement',
    caption: 'Low-profile chest geometry staying clear during long days wading',
    alt: 'Angler wading in moving water wearing the Static Labs FP1 Minimalist Chest Pack',
  },
  {
    src: '/images/work/static-labs/fp1-gallery-2.jpg',
    title: 'Subtractive Architecture',
    caption: 'Stripped-down gridstop construction with zero dead volume',
    alt: 'Static Labs FP1 Minimalist Chest Pack white-grid ripstop flat-lay showing clean panel geometry',
  },
];

const ECOSYSTEM_ITEMS = [
  'FP1 Minimalist Chest Pack',
  'NH1 Mag-Net Holster',
  'TC1 Tippet Cinch',
  'PL1 Utility Tether',
  'GINK1 Floatant Holder',
];

export const ProfessionalWorkView = ({
  view,
  navTo,
  isMenuOpen,
  setIsMenuOpen,
}: ViewProps) => (
  <div className="min-h-screen bg-surface font-sans selection:bg-dynasty/20 flex flex-col">
    <Header
      view={view}
      navTo={navTo}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      className="bg-surface/80 backdrop-blur-md"
    />

    <main className="flex-1 max-w-[1600px] w-full mx-auto pt-6 pb-24">
      {/* Split Hero */}
      <section className="px-8 md:px-10 lg:px-12">
        <div className="lg:hidden mb-8 pb-6 border-b border-outline">
          <p className="text-technical-label text-dynasty mb-2">
            Professional Work · Commercial
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase leading-tight text-charcoal">
            Static Labs
          </h1>
          <p className="text-sm md:text-base text-gray-500 uppercase tracking-wide leading-relaxed mt-2">
            FP1 Minimalist Chest Pack &amp; Modular Carry
          </p>
          <p className="text-xs text-gray-400 mt-3">In partnership with Caid Lunt</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full"
          >
            <a
              href={STATIC_LABS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Static Labs official website"
              className="block aspect-[4/5] bg-surface-dim/30 overflow-hidden group relative w-full"
            >
              <img
                src="/images/work/static-labs/fp1-hero.jpg"
                alt="Static Labs FP1 Minimalist Chest Pack flat-lay with modular fly fishing accessories"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="eager"
              />
            </a>
          </motion.div>

          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col">
              <div className="hidden lg:block pb-6 border-b border-outline">
                <p className="text-technical-label text-dynasty mb-2">
                  Professional Work · Commercial
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight uppercase leading-tight text-charcoal">
                  Static Labs
                </h1>
                <p className="text-sm md:text-base text-gray-500 uppercase tracking-wide leading-relaxed mt-2">
                  FP1 Minimalist Chest Pack &amp; Modular Carry
                </p>
                <p className="text-xs text-gray-400 mt-3">In partnership with Caid Lunt</p>
              </div>

              <div className="py-6 border-b border-outline space-y-4">
                <h2 className="text-xs font-semibold tracking-wider uppercase text-charcoal">
                  Design Philosophy
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Built backward from everything that gets in the way on the water — catching zippers, creeping straps, and oversized pockets that interrupt a cast. We reduced the FP1 down to pure intention: one main compartment, two quick-access pockets, and no-shift G-hooks that hold flat against the chest.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  No filler features to justify, just the structure that earns its place on a long day wading — designed to disappear into how you move.
                </p>
              </div>

              <div className="py-6 border-b border-outline">
                <h2 className="text-xs font-semibold tracking-wider uppercase text-charcoal mb-4">
                  FP1 Architecture
                </h2>
                <ul className="space-y-3">
                  {PACK_HIGHLIGHTS.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 items-start text-sm text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 bg-dynasty mt-1.5 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 lg:mt-auto space-y-3">
              <a
                href={STATIC_LABS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-charcoal text-white text-technical-label hover:bg-dynasty transition-colors whitespace-nowrap group"
              >
                <span>Visit staticlabs.us</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="text-xs text-gray-500">
                Full specifications, colorways, and direct orders live at staticlabs.us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compact 3-Photo Pack Gallery */}
      <section className="mt-16 pt-12 px-8 md:px-10 lg:px-12 border-t border-outline">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-technical-label text-dynasty mb-2">
              FP1 Minimalist Chest Pack
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight uppercase leading-tight text-charcoal">
              Pack &amp; Field Details
            </h2>
          </div>
          <a
            href={STATIC_LABS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-technical-label text-charcoal hover:text-dynasty transition-colors whitespace-nowrap group"
          >
            <span>Explore Full Storefront</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {GALLERY_FRAMES.map((frame) => (
            <a
              key={frame.title}
              href={STATIC_LABS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block space-y-3"
            >
              <div className="aspect-[4/5] bg-surface-dim/30 overflow-hidden w-full">
                <img
                  src={frame.src}
                  alt={frame.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-semibold tracking-wider uppercase text-charcoal group-hover:text-dynasty transition-colors">
                  {frame.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {frame.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Brief Modular Ecosystem Row */}
      <section className="mt-16 pt-10 px-8 md:px-10 lg:px-12 border-t border-outline">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <p className="text-technical-label text-dynasty">Modular Ecosystem</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {ECOSYSTEM_ITEMS.map((item, idx) => (
                <React.Fragment key={item}>
                  {idx > 0 && <span className="mx-2 text-gray-300" aria-hidden="true">·</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </p>
          </div>

          <a
            href={STATIC_LABS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-charcoal hover:text-dynasty border-b border-outline hover:border-dynasty pb-1.5 transition-colors whitespace-nowrap w-fit group shrink-0"
          >
            <span>See the Full System on staticlabs.us</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </section>
    </main>

    <Footer
      navTo={navTo}
      showBackToIndex={true}
      className="border-t border-outline shrink-0"
    />
  </div>
);
