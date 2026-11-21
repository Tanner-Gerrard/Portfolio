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

export type ViewType = 'index' | 'detail' | 'connect' | 'work' | 'not-found';

export interface ViewProps {
  view: ViewType;
  navTo: (newView: 'index' | 'detail' | 'connect' | 'work', project?: Project) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}
