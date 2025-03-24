'use client';

import React from 'react';
import { Section } from '@/app/types/wireframe';

// Map of layout options for each section type
const layoutOptions = {
  navigation: ["standard", "centered", "minimal", "transparent", "fullwidth", "bordered", "dropdown", "glassmorphic", "hamburger", "sidebar", "floating", "gradient"],
  hero: ["centered", "split", "imageBg", "video", "minimal", "animated", "parallax", "slideshow", "3d", "geometric", "gradient", "interactive", "scroll"],
  features: ["grid", "horizontal", "vertical", "imageCards", "sideImage", "alternating", "carousel", "tabbed", "timeline", "interactive", "accordion", "masonry", "iconGrid"],
  testimonials: ["grid", "carousel", "masonry", "minimal", "cards", "quote", "timeline", "slider", "bubbles", "spotlight", "video", "avatars", "magazine"],
  pricing: ["standard", "horizontal", "compact", "toggle", "cards", "comparison", "tiered", "minimalist", "feature-focused", "interactive", "pricing-slider", "pricing-floating", "subscription"],
  contact: ["standard", "split", "minimal", "fullwidth", "boxed", "map", "contact-floating", "sidebar", "interactive", "stepper", "modern", "card", "integrated"],
  cta: ["standard", "banner", "full", "popup", "floating", "side", "animated", "notification", "cta-gradient", "cta-interactive", "cta-timeline", "sticky", "overlay"],
  footer: ["standard", "simple", "compact", "centered", "multicolumn", "dark", "minimal", "logo", "newsletter", "social", "app", "contact", "gradient"]
};

// Description for each layout to help users understand what they're selecting
const layoutDescriptions: Record<string, string> = {
  // Navigation
  standard: "Traditional horizontal menu with logo on the left",
  centered: "Centered menu items with logo in the middle",
  minimal: "Clean, simple navigation with minimal styling",
  transparent: "Transparent background that overlays content",
  fullwidth: "Full width navigation that spans entire page",
  bordered: "Navigation with decorative borders",
  dropdown: "Menu with dropdown submenus",
  glassmorphic: "Modern frosted glass effect",
  hamburger: "Mobile-friendly menu with hamburger icon",
  sidebar: "Vertical sidebar navigation",
  floating: "Navigation that floats over the content",
  gradient: "Colorful gradient background",
  
  // Hero
  imageBg: "Large background image with overlay text",
  video: "Video background with content overlay",
  animated: "Animated elements and transitions",
  parallax: "Parallax scrolling effect for depth",
  slideshow: "Rotating slideshow of content",
  "3d": "3D perspective elements and depth",
  geometric: "Abstract geometric background shapes",
  scroll: "Full-screen with scroll indicator",
  interactive: "Interactive elements that respond to user actions",
  
  // Features
  horizontal: "Features arranged horizontally with alternating sides",
  vertical: "Vertically stacked feature cards",
  imageCards: "Card-based layout with images",
  sideImage: "Large side image with feature list",
  alternating: "Features with alternating image positions",
  carousel: "Scrollable carousel of features",
  tabbed: "Tabbed interface for feature categories",
  timeline: "Features shown in a timeline format",
  accordion: "Expandable sections for each feature",
  masonry: "Pinterest-style grid with varying heights",
  iconGrid: "Grid of colorful icons with descriptions",
  
  // Testimonials
  cards: "Card-based testimonial layout",
  quote: "Large quote format with minimal styling",
  slider: "Sliding testimonial carousel",
  bubbles: "Speech bubble style testimonials",
  spotlight: "Featured testimonial with photo",
  magazine: "Editorial style layout with sidebar",
  avatars: "Interactive avatar selection row",
  
  // Pricing
  compact: "Compact pricing table without extra details",
  toggle: "Toggle between monthly/annual pricing",
  comparison: "Side-by-side plan comparison",
  tiered: "Tiered pricing with feature differences",
  minimalist: "Clean, minimal pricing display",
  "feature-focused": "Focus on features rather than price",
  "pricing-slider": "Interactive price slider",
  "pricing-floating": "Floating pricing cards with hover effects",
  subscription: "Subscription-based pricing display",
  
  // Contact
  split: "Split layout with form and contact info",
  boxed: "Boxed layout with drop shadow",
  map: "Contact form with map integration",
  "contact-floating": "Floating contact form over background",
  stepper: "Multi-step form with progress indicator",
  modern: "Modern layout with decorative elements",
  card: "Card-based contact form layout",
  integrated: "Form integrated with background graphics",
  
  // CTA
  banner: "Horizontal banner across the page",
  full: "Full-width call to action",
  popup: "Popup-style CTA with shadow effects",
  side: "Side-by-side text and button layout",
  notification: "Notification-style prompt",
  "cta-gradient": "Colorful gradient background for CTA",
  "cta-interactive": "Interactive CTA with hover effects",
  "cta-timeline": "CTA with timeline-based elements",
  sticky: "Sticky CTA that remains visible while scrolling",
  overlay: "CTA that overlays other content",
  
  // Footer
  simple: "Simple, clean footer with minimal elements",
  newsletter: "Footer with newsletter signup form",
  social: "Social media focused footer",
  app: "Footer with app download links",
  contact: "Contact information focused footer",
};

interface SectionLayoutSelectorProps {
  section: Section;
  onLayoutChange: (section: Section) => void;
  onClose: () => void;
}

export default function SectionLayoutSelector({ 
  section, 
  onLayoutChange,
  onClose 
}: SectionLayoutSelectorProps) {
  // Get available layouts for the current section type
  const sectionType = section.type as keyof typeof layoutOptions;
  const availableLayouts = layoutOptions[sectionType] || [];
  const currentLayout = section.content.layout || 'standard';

  const handleLayoutSelect = async (layout: string) => {
    if (layout === currentLayout) {
      onClose();
      return;
    }
    
    // Create updated section with new layout
    const updatedSection = {
      ...section,
      content: {
        ...section.content,
        layout
      }
    };
    
    // Apply layout change immediately
    onLayoutChange(updatedSection);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Select Layout</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 max-h-80 overflow-y-auto">
          {availableLayouts.map((layout) => (
            <button
              key={layout}
              onClick={() => handleLayoutSelect(layout)}
              className={`p-3 border rounded flex flex-col items-center transition-colors ${
                layout === currentLayout 
                  ? 'bg-blue-100 border-blue-400 text-blue-700' 
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
            >
              <div className="w-full h-12 flex items-center justify-center rounded bg-gray-100 mb-2">
                <span className="text-xs capitalize">{layout}</span>
              </div>
              <span className="text-xs font-medium truncate">{layout.replace(/-/g, ' ')}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 