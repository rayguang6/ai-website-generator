export interface MenuItem {
  name: string;
  url?: string;
}

export interface NavigationContent {
  logo: string;
  menuItems: string[] | MenuItem[];
  cta?: string;
}

export interface SearchBar {
  placeholder: string;
  filters?: string[];
}

export interface HeroContent {
  headline: string;
  subheadline?: string;
  searchBar?: SearchBar;
  backgroundImage?: string;
  cta?: {
    text: string;
    url?: string;
  };
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface FeaturesContent {
  heading?: string;
  subheading?: string;
  features: FeatureItem[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
}

export interface TestimonialsContent {
  heading?: string;
  subheading?: string;
  testimonials: TestimonialItem[];
}

export interface FooterContent {
  logo?: string;
  tagline?: string;
  menuGroups?: {
    title: string;
    items: MenuItem[];
  }[];
  socialLinks?: string[];
  copyright?: string;
}

export type SectionContent = 
  | NavigationContent 
  | HeroContent 
  | FeaturesContent
  | TestimonialsContent
  | FooterContent
  | Record<string, any>; // For custom section types

export interface Section {
  id: string;
  type: 'navigation' | 'hero' | 'features' | 'testimonials' | 'footer' | string;
  content: SectionContent;
}

export interface WireframeData {
  pageType: 'landing' | 'product' | 'about' | 'contact' | string;
  pageName: string;
  sections: Section[];
} 