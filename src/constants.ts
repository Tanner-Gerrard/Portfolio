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
    image: img01hero,
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
    image: img03hero,
    specs: {
      material: 'Mechanical Stretch 6.6 Nylon',
      movement: 'High Output',
      weight: '347g',
    },
  },
  {
    id: '04',
    title: 'CRACK GLOVE',
    subtitle: 'Utra-durable leather. sensitive for tight jams',
    year: '2024',
    image: img04hero,
    specs: {
      material: 'Leather & UHMWPE',
      movement: 'High Output',
      weight: '34g',
    },
  },
];
