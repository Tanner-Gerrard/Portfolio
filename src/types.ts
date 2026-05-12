export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  objectPosition?: string;
  specs: {
    material: string;
    movement: string;
    weight: string;
  };
  process?: {
    id: string;
    phase: string;
    title: string;
    description: string;
    image: string;
    span?: string;
  }[];
}

export interface ViewProps {
  view: 'index' | 'detail' | 'connect';
  navTo: (newView: 'index' | 'detail' | 'connect', project?: Project) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}
