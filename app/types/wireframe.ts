export interface MenuItem {
  name: string;
  url?: string;
}

export interface NavigationContent {
  logo: string;
  menuItems: string[] | MenuItem[];
  cta?: string;
  layout?: 'standard' | 'centered' | 'minimal' | 'transparent' | 'fullwidth' | 'bordered' | 'dropdown' | 'glassmorphic' | 'hamburger' | 'sidebar' | 'floating' | 'gradient';
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
  layout?: 'centered' | 'split' | 'imageBg' | 'video' | 'minimal' | 'animated' | 'parallax' | 'slideshow' | '3d' | 'geometric' | 'gradient' | 'interactive' | 'scroll';
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
  layout?: 'grid' | 'horizontal' | 'vertical' | 'imageCards' | 'sideImage' | 'alternating' | 'carousel' | 'tabbed' | 'timeline' | 'interactive' | 'accordion' | 'masonry' | 'iconGrid';
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
  layout?: 'grid' | 'carousel' | 'masonry' | 'minimal' | 'cards' | 'quote' | 'timeline' | 'slider' | 'bubbles' | 'spotlight' | 'video' | 'avatars' | 'magazine';
}

export interface PricingTier {
  name: string;
  price: string;
  description?: string;
  features: string[];
  isPopular?: boolean;
  cta?: string;
}

export interface PricingContent {
  heading?: string;
  subheading?: string;
  tiers: PricingTier[];
  layout?: 'standard' | 'horizontal' | 'compact' | 'toggle' | 'cards' | 'comparison' | 'tiered' | 'minimalist' | 'feature-focused' | 'interactive' | 'slider' | 'floating' | 'subscription';
}

export interface ContactContent {
  heading?: string;
  subheading?: string;
  address?: string;
  email?: string;
  phone?: string;
  formFields?: string[];
  mapLocation?: string;
  layout?: 'standard' | 'split' | 'minimal' | 'fullwidth' | 'boxed' | 'map' | 'floating' | 'sidebar' | 'interactive' | 'stepper' | 'modern' | 'card' | 'integrated';
}

export interface CTAContent {
  heading: string;
  subheading?: string;
  buttonText: string;
  buttonUrl?: string;
  backgroundImage?: string;
  layout?: 'standard' | 'banner' | 'full' | 'popup' | 'floating' | 'side' | 'animated' | 'notification' | 'gradient' | 'interactive' | 'timeline' | 'sticky' | 'overlay';
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
  layout?: 'standard' | 'simple' | 'compact' | 'centered' | 'multicolumn' | 'dark' | 'minimal' | 'logo' | 'newsletter' | 'social' | 'app' | 'contact' | 'gradient';
}

export type SectionContent = 
  | NavigationContent 
  | HeroContent 
  | FeaturesContent
  | TestimonialsContent
  | PricingContent
  | ContactContent
  | CTAContent
  | FooterContent
  | Record<string, any>; // For custom section types

export interface Section {
  id: string;
  type: 'navigation' | 'hero' | 'features' | 'testimonials' | 'pricing' | 'contact' | 'cta' | 'footer' | string;
  content: SectionContent;
}

export interface WireframeData {
  pageType: 'landing' | 'product' | 'about' | 'contact' | string;
  pageName: string;
  sections: Section[];
}

export interface Wireframe extends WireframeData {
  id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
} 