import { NextResponse } from 'next/server';
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

export async function POST(request: Request) {
  try {
    const { section, layout } = await request.json();

    if (!section || !section.type) {
      return NextResponse.json(
        { error: 'Valid section is required' },
        { status: 400 }
      );
    }

    // Get available layouts for this section type
    const availableLayouts = layoutOptions[section.type as keyof typeof layoutOptions] || [];
    if (availableLayouts.length === 0) {
      return NextResponse.json(
        { error: 'No layout options available for this section type' },
        { status: 400 }
      );
    }

    // Create a copy of the section
    const newSection: Section = JSON.parse(JSON.stringify(section));
    
    // If a specific layout was provided, use it; otherwise choose a random one
    // that is different from the current one
    if (layout && availableLayouts.includes(layout)) {
      newSection.content.layout = layout;
    } else {
      // Get current layout
      const currentLayout = section.content.layout || 'standard';
      
      // Find a different layout
      const otherLayouts = availableLayouts.filter(l => l !== currentLayout);
      if (otherLayouts.length > 0) {
        // If we're in preview mode, we want to be more deterministic for better UX
        // We'll just pick the first different layout in the list
        const isPreview = request.headers.get('x-preview-mode') === 'true';
        if (isPreview) {
          newSection.content.layout = otherLayouts[0];
        } else {
          // Otherwise, pick a random layout for regeneration
          newSection.content.layout = otherLayouts[Math.floor(Math.random() * otherLayouts.length)];
        }
      } else {
        // If no other layouts, just use the current one
        newSection.content.layout = currentLayout;
      }
    }
    
    return NextResponse.json(newSection);
  } catch (error) {
    console.error('Error regenerating section:', error);
    let originalSection: any = { id: 'error', type: 'unknown', content: {} };
    try {
      // Try to extract the section from the request if possible
      const requestData = await request.clone().json();
      if (requestData && requestData.section) {
        originalSection = requestData.section;
      }
    } catch (e) {
      console.error('Failed to extract original section:', e);
    }

    return NextResponse.json(
      { 
        error: 'Failed to regenerate section',
        fallbackSection: createFallbackSection(originalSection)
      },
      { status: 500 }
    );
  }
}

// Helper function to create a fallback section when regeneration fails
function createFallbackSection(originalSection: Section): Section {
  const { id, type } = originalSection;
  let content: any = { ...originalSection.content };
  
  // Ensure layout is different from original
  const currentLayout = content.layout || 'standard';
  const availableLayouts = layoutOptions[type as keyof typeof layoutOptions] || [];
  
  if (availableLayouts.length > 1) {
    // Find a different layout
    const otherLayouts = availableLayouts.filter(l => l !== currentLayout);
    content.layout = otherLayouts[Math.floor(Math.random() * otherLayouts.length)];
  }
  
  // Ensure minimal content for each section type
  switch (type) {
    case 'navigation':
      content = {
        ...content,
        logo: content.logo || 'Logo',
        menuItems: Array.isArray(content.menuItems) ? content.menuItems : ['Home', 'About', 'Contact'],
        layout: content.layout
      };
      break;
    case 'hero':
      content = {
        ...content,
        headline: content.headline || 'Welcome to our website',
        subheadline: content.subheadline || 'Discover what we have to offer',
        layout: content.layout
      };
      break;
    case 'features':
      content = {
        ...content,
        features: Array.isArray(content.features) ? content.features : [
          { title: 'Feature 1', description: 'Description of feature 1' },
          { title: 'Feature 2', description: 'Description of feature 2' },
          { title: 'Feature 3', description: 'Description of feature 3' }
        ],
        layout: content.layout
      };
      break;
    case 'testimonials':
      content = {
        ...content,
        testimonials: Array.isArray(content.testimonials) ? content.testimonials : [
          { quote: 'This is an amazing service!', author: 'John Doe' }
        ],
        layout: content.layout
      };
      break;
    case 'pricing':
      content = {
        ...content,
        tiers: Array.isArray(content.tiers) ? content.tiers : [
          { name: 'Basic', price: '$9.99', features: ['Feature 1', 'Feature 2'] },
          { name: 'Pro', price: '$19.99', features: ['Feature 1', 'Feature 2', 'Feature 3'] }
        ],
        layout: content.layout
      };
      break;
    case 'contact':
      content = {
        ...content,
        heading: content.heading || 'Contact Us',
        email: content.email || 'info@example.com',
        layout: content.layout
      };
      break;
    case 'cta':
      content = {
        ...content,
        heading: content.heading || 'Ready to get started?',
        buttonText: content.buttonText || 'Get Started Now',
        layout: content.layout
      };
      break;
    case 'footer':
      content = {
        ...content,
        layout: content.layout
      };
      break;
  }
  
  return { id, type, content };
} 