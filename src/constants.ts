import { Project } from './types';

const img01hero = '/images/projects/01hero.jpg';
const img02hero = '/images/projects/02hero.jpg';
const img03hero = '/images/projects/03hero.avif';
const img04hero = '/images/projects/04hero.avif';
export const imgConnect = '/images/site/connect.avif';
const imgHero = '/images/projects/hero.jpg';

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
      '/images/process/detail/01detail-01.avif',
      '/images/process/detail/01detail-02.avif'
    ],
    specs: {
      material: 'Ultra 200X',
      movement: 'Sustained',
      weight: '572g',
    },
    process: [
      {
        id: 'p1',
        phase: 'PHASE 01 // INTERFACE',
        title: 'Initial Thumbnail Sketches',
        description: 'Exploring the interface between human and equipment. Volume studies focus on high-output movement and anatomical load distribution.',
        image: '/images/process/process_1.avif',
        span: 'lg:col-span-2'
      },
      {
        id: 'p2',
        phase: 'PHASE 02 // GEOMETRY',
        title: 'Pattern and Form Exploration',
        description: 'Translating 2D geometry into 3D volume. Utilizing complex darts and bias-cut transitions to minimize seam exposure.',
        image: '/images/process/process_2.avif',
      },
      {
        id: 'p3',
        phase: 'PHASE 03 // DIGITAL',
        title: 'V1 Digital Render',
        description: 'Verifying mechanical clearances and hardware integration in a digital workspace before physical cut and sew.',
        image: '/images/process/process_3.avif',
      },
      {
        id: 'p4',
        phase: 'PHASE 04 // OPTIMIZATION',
        title: 'V2 Cut & Sew Patterns',
        description: 'Nesting and material optimization. Managing grain-line alignment for high-tenacity non-stretch composites.',
        image: '/images/process/process_4.avif',
      },
      {
        id: 'p5',
        phase: 'PHASE 05 // PROTOTYPE',
        title: 'V3 Technical Prototype',
        description: 'Final technical assembly. Testing the symbiotic relationship between Ultra 200X and forged aluminum hardware.',
        image: '/images/process/process_5.avif',
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
  },
  {
    id: '04',
    title: 'CORIUM GLOVE',
    subtitle: 'A durable second skin for your most demanding alpine ascents',
    year: '2024',
    category: 'DERMAL INTERFACE',
    image: img04hero,
    detailImages: [
      '/images/process/detail/04detail-01.avif',
      '/images/process/detail/04detail-02.avif'
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
    designQuote: '"In technical alpinism, sensitivity and durability are paramount. By eliminating standard rubber overlays, the interface protects the hand without severing its connection to the rock."',
    designNarrative: [
      "Modern hand protection in crack climbing typically relies on bonding heavy natural rubber pads to fabric backings. While rubber provides initial friction, it wears rapidly, delaminates under extreme torque, blocks airflow, and adds substantial volume that dulls critical tactile feedback.",
      "The Corium Glove prioritizes material science over sheer mass. Utilizing a thin, specialized 0.8mm leather, it significantly outperforms traditional rubber constructions in long-term abrasion resistance. Fortified with high-strength UHMWPE stitching and a snag-free recessed wrist closure, the design functions as a highly durable, breathable second skin for the most demanding alpine environments."
    ],
    process: [
      {
        id: 'cp1',
        phase: 'PHASE 01 // TEXTURE',
        title: 'Material Stress Analysis',
        description: 'Analyzing the 0.8mm technical leather under high tensile strain. We select a tightly structured collagen matrix to match the durability of traditional thick rubber without the loss of sensitivity.',
        image: '/images/process/detail/04detail-01.avif',
      },
      {
        id: 'cp2',
        phase: 'PHASE 02 // SECURING SYSTEM',
        title: 'Flush Wrist Closure',
        description: 'Developing a recessed closure channel that prevents hook-and-loop fasteners from catching and peeling under extreme shear forces during hand-cracks.',
        image: '/images/process/detail/04detail-02.avif',
      },
      {
        id: 'cp3',
        phase: 'PHASE 03 // GEOMETRY',
        title: 'Precision-patterned Fit',
        description: 'Generating the 2D anatomical shapes. Laser-cut patterns ensure exact alignment with flex zones, allowing the natural leather to shape itself perfectly to the climber\'s hand over time.',
        image: '/images/process/process_2.avif',
      },
      {
        id: 'cp4',
        phase: 'PHASE 04 // PROTO ASSEMBLY',
        title: 'Anatomical Glove Interface',
        description: 'Real-time wear-testing of the active-fit assembly. Demonstrating the snug wrapping technique, perfect anatomical fit, dynamic finger articulation, and absolute tactile sensitivity.',
        image: img04hero,
        video: 'https://youtu.be/FKb5Zg6Q7TI&CONTROLS=0',
        span: 'lg:col-span-2'
      }
    ]
  },
];
