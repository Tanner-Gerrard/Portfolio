export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category?: string;
  image: string;
  video?: string;
  youtubeUrl?: string;
  objectPosition?: string;
  detailImages?: [string, string] | string[];
  specs: {
    material: string;
    movement: string;
    weight: string;
  };
  technicalOverview?: string;
  keyFeatures?: string[];
  designQuote?: string;
  designNarrative?: string[];
  processGridAspect?: string;
  process?: {
    id: string;
    phase: string;
    title: string;
    description: string;
    image: string;
    video?: string;
    youtubeUrl?: string;
    span?: string;
    aspect?: string;
  }[];
}

export interface ViewProps {
  view: 'index' | 'detail' | 'connect';
  navTo: (newView: 'index' | 'detail' | 'connect', project?: Project) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}
