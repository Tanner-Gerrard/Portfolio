import { Project } from './types';

const img01hero = '/images/projects/01-alptour-pack/hero.jpg';
const img02hero = '/images/projects/02-ventour-jacket/hero.jpg';
const img03hero = '/images/projects/03-stridetour-pant/hero.avif';
const img04hero = '/images/projects/04-corium-glove/hero.avif';
export const imgConnect = '/images/site/connect.avif';
const imgHero = '/images/site/hero.avif';

export const BASE_IMAGE = imgHero;

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'ALPTOUR PACK',
    subtitle: 'Approach heavy. summit light',
    year: '2026',
    category: 'LOAD ARCHITECTURE',
    image: img01hero,
    detailImages: [
      '/images/projects/01-alptour-pack/detail-1.avif',
      '/images/projects/01-alptour-pack/detail-2.avif'
    ],
    specs: {
      material: 'Ultra 200X',
      movement: 'Sustained',
      weight: '572g',
    },
    designQuote: '"The heaviest part of the climb is the approach, so why carry the same pack for both?"',
    designNarrative: [
      "Traditional alpine packs force a compromise: a larger, heavy-framed carrier to haul gear to basecamp, or a minimal, frameless assault pack that lacks stability and load distribution during technical approach hikes. Carrying both is a luxury that adds dead weight.",
      "The Alptour Pack resolves this binary via an adaptive volume architecture. Constructed from ultra-lightweight Ultra 200X woven composites, it functions as a highly supported 45L load hauler during the approach. Upon reaching high camp, a modular roll-top integration and internal tensioning harnesses collapse the pack into a stable, form-fitting 25L summit pack that sits centered against the thoracic spine, fully preserving core rotational mobility."
    ],
    process: [
      {
        id: 'p1',
        phase: 'PHASE 01 // INTERFACE',
        title: 'Initial Thumbnail Sketches',
        description: 'Exploring the interface between human and equipment. Volume studies focus on high-output movement and anatomical load distribution.',
        image: '/images/projects/01-alptour-pack/process-1.avif',
        span: 'lg:col-span-2'
      },
      {
        id: 'p2',
        phase: 'PHASE 02 // GEOMETRY',
        title: 'Pattern and Form Exploration',
        description: 'Translating 2D geometry into 3D volume. Utilizing complex darts and bias-cut transitions to minimize seam exposure.',
        image: '/images/projects/01-alptour-pack/process-2.avif',
      },
      {
        id: 'p3',
        phase: 'PHASE 03 // DIGITAL',
        title: 'V1 Digital Render',
        description: 'Verifying mechanical clearances and hardware integration in a digital workspace before physical cut and sew.',
        image: '/images/projects/01-alptour-pack/process-3.avif',
      },
      {
        id: 'p4',
        phase: 'PHASE 04 // OPTIMIZATION',
        title: 'V2 Cut & Sew Patterns',
        description: 'Nesting and material optimization. Managing grain-line alignment for high-tenacity non-stretch composites.',
        image: '/images/projects/01-alptour-pack/process-4.avif',
      },
      {
        id: 'p5',
        phase: 'PHASE 05 // PROTOTYPE',
        title: 'V3 Technical Prototype',
        description: 'Final technical assembly. Testing the symbiotic relationship between Ultra 200X and forged aluminum hardware.',
        image: '/images/projects/01-alptour-pack/process-5.avif',
        span: 'lg:col-span-2'
      }
    ]
  },
  {
    id: '02',
    title: 'VENTOUR JACKET',
    subtitle: 'Mapped protection. zoned breathability',
    year: '2026',
    category: 'CLIMATE SYSTEMS',
    image: img02hero,
    specs: {
      material: '(Un)calendared 6.6 Nylon',
      movement: 'Low Intensity',
      weight: '350g',
    },
    designQuote: '"We don\'t solve for comfort; we solve for survival in movement."',
    designNarrative: [
      "Standard outer shells assume a static external environment, resulting in a continuous loop of overheating during high-exertion ascents and rapid cooling when stationary. Traditional pit-zips are cumbersome, adding unnecessary weight and bulk.",
      "The Ventour Jacket introduces a dynamic micro-climate system. By pairing uncalendared 6.6 double-weave nylon at high-heat zones with a highly protective calendared ripstop over high-exposure areas, the jacket facilitates continuous passive vapor transition. Integrated laser-cut ventilation arrays under the arms and along the upper spine act as natural exhaust vents, ensuring that the garment stays on throughout the entire climb without requiring manual thermal management."
    ],
  },
  {
    id: '03',
    title: 'STRIDETOUR PANT',
    subtitle: 'High-output touring. mapped articulation',
    year: '2025',
    category: 'KINETIC SYSTEMS',
    image: img03hero,
    specs: {
      material: 'Mechanical Stretch 6.6 Nylon',
      movement: 'High Output',
      weight: '347g',
    },
    designQuote: '"True articulation is not about loose fabric; it is about the exact geometry of muscle shear."',
    designNarrative: [
      "Lower-body gear for technical touring must withstand extreme abrasion from rock, ice, and ski edges while offering unhindered dynamic movement. Traditional solutions rely on baggy cuts that flap in high winds, or heavy elastane blends that absorb moisture and lose mechanical recovery over time.",
      "The Stridetour Pant leverages procedural patterning to match the exact mechanics of lower-body movement. Constructed from durable, custom-woven mechanical stretch 6.6 nylon, the pants integrate three-dimensional knee articulation and a seamless diamond gusset. Every seam is rotated away from high-friction contact points, delivering absolute freedom during steep kick-turns and technical climbing while maintaining a streamlined, wind-cheating profile."
    ],
  },
  {
    id: '04',
    title: 'CORIUM GLOVE',
    subtitle: 'A durable second skin for your most demanding alpine ascents',
    year: '2024',
    category: 'DERMAL INTERFACE',
    image: img04hero,
    detailImages: [
      '/images/projects/04-corium-glove/process42.avif',
      '/images/projects/04-corium-glove/process43.avif'
    ],
    specs: {
      material: 'Leather & UHMWPE',
      movement: 'High Output',
      weight: '34g',
    },
    technicalOverview: 'Engineered specifically for thin hands. Constructed entirely from a specialized 0.8mm technical leather with a tightly woven collagen fiber structure, the glove delivers exceptional abrasion resistance and up to ten times the tensile strength of standard leather. It is stitched with UHMWPE thread and features a clean, recessed closure that resists peeling. By eliminating thick rubber overlays, this highly durable profile preserves critical tactile feedback and breathability while still providing protection from sharp granite crystals.',
    keyFeatures: [
      "0.8mm Technical Leather: High-density collagen fibers deliver 10x the tensile strength of standard leather, maximizing abrasion resistance, and nearly eliminating finger tear out.",
      "Tactile Sensitivity: Pure leather construction eliminates bulky rubber overlays for a direct connection to the rock.",
      "UHMWPE Stitching: Ultra-high-tenacity thread resists abrasion—unseen in crack gloves currently on the market.",
      "Recessed Closure: Flush design prevents the velcro wrist strap from peeling during deep hand jams.",
      "Molded Fasteners: Molded hook and velour loop minimizes bulk around the wrist.",
      "Continuous Airflow: Rubber-free design ensures continuous airflow, so the back of your hand stays dry in the hardest of cruxes.",
      "Anatomical Fit: Precision-patterned, natural leather actively molds to the hand over time, with inherent elasticity, so the fit won't bag out."
    ],
    designQuote: 'Replaces bulky rubber and disposable climbing tape with a high-performance second skin.',
    designNarrative: [
      "The Corium Glove eliminates the trade-off between bulky, insensitive rubber pads and disposable athletic tape with an ultra-lightweight, high-performance second skin. Crafted from thin, specialized 0.8mm technical leather that conforms dynamically to the hand's natural anatomy and retains its elasticity without bagging out, the glove features load-bearing seams stitched with high-tenacity UHMWPE thread for ultimate abrasion resistance against sharp granite. A fully recessed wrist closure sits completely flush below the surface line, preventing the fasteners from snagging or peeling open accidentally during deep, high-torque hand-jams in flared cracks."
    ],
    processGridAspect: 'aspect-[3/4]',
    process: [
      {
        id: 'cp1',
        phase: 'PHASE 01 // PATTERNING',
        title: '3D to 2D',
        description: 'Determining optimal coverage while still maintaining full range of motion. Understanding how the 3D pattern translates to 2D materials with appropriately placed seams.',
        image: '/images/projects/04-corium-glove/detail-1.avif',
      },
      {
        id: 'cp2',
        phase: 'PHASE 01 // PATTERNING',
        title: 'Anatomical Reference Points',
        description: 'Referencing anatomical points to place finger loop seams in the valleys to further durability. Experimenting with finger loop pattern angles for a narrow profile essential for quick "thin-hands" placements.',
        image: '/images/projects/04-corium-glove/detail-2.avif',
      },
      {
        id: 'cp3',
        phase: 'PHASE 01 // PATTERNING',
        title: 'Fit Adjustments',
        description: 'Initial fit, determining ideal finger loop dimensions.',
        image: '/images/projects/04-corium-glove/process47.avif',
      },
      {
        id: 'cp5',
        phase: 'PHASE 02 // CLOSURE ITERATION',
        title: 'Elastic loop velcro testing',
        description: 'First extensive testing with elastic loop velcro. Proved to not be strong enough elastic or durable enough. Recessed closure worked to prevent velcro from peeling.',
        image: '/images/projects/04-corium-glove/process44.avif',
      },
      {
        id: 'cp6',
        phase: 'PHASE 02 // CLOSURE ITERATION',
        title: 'Thickness offset and abrasion',
        description: 'Moved to self material closure. Thread is protected from abrasion by small thickness of hook velcro under wrist flap.',
        image: '/images/projects/04-corium-glove/process46.avif',
      },
      {
        id: 'cp7',
        phase: 'PHASE 02 // CLOSURE ITERATION',
        title: 'Experimenting with recess variations',
        description: 'Recess patch tension is better controlled when sewn underneath. Results in visually clean closure. CSM/Hypalon strap proved to be stiff, irritating at edges, and would build up too much perspiration in warm conditions; Material savings was not worth the cost.',
        image: '/images/projects/04-corium-glove/process45.avif',
      },
      {
        id: 'cp4',
        phase: 'PHASE 05 // PROTO ASSEMBLY',
        title: 'Anatomical Glove Interface',
        description: 'Real-time wear-testing of the active-fit assembly. Demonstrating the snug wrapping technique, perfect anatomical fit, dynamic finger articulation, and absolute tactile sensitivity.',
        image: img04hero,
        video: 'https://youtu.be/FKb5Zg6Q7TI&CONTROLS=0',
        span: 'lg:col-span-2',
        aspect: 'aspect-[16/9]'
      }
    ]
  },
];
