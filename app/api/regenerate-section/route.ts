import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Section } from '@/app/types/wireframe';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Map of layout options for each section type
const layoutOptions = {
  navigation: ["standard", "centered", "minimal", "transparent", "fullwidth", "bordered", "dropdown", "glassmorphic", "hamburger", "sidebar", "floating", "gradient"],
  hero: ["centered", "split", "imageBg", "video", "minimal", "animated", "parallax", "slideshow", "3d", "geometric", "gradient", "interactive", "scroll"],
  features: ["grid", "horizontal", "vertical", "imageCards", "sideImage", "alternating", "carousel", "tabbed", "timeline", "interactive", "accordion", "masonry", "iconGrid"],
  testimonials: ["grid", "carousel", "masonry", "minimal", "cards", "quote", "timeline", "slider", "bubbles", "spotlight", "video", "avatars", "magazine"],
  pricing: ["standard", "horizontal", "compact", "toggle", "cards", "comparison", "tiered", "minimalist", "feature-focused", "interactive", "slider", "floating", "subscription"],
  contact: ["standard", "split", "minimal", "fullwidth", "boxed", "map", "floating", "sidebar", "interactive", "stepper", "modern", "card", "integrated"],
  cta: ["standard", "banner", "full", "popup", "floating", "side", "animated", "notification", "gradient", "interactive", "timeline", "sticky", "overlay"],
  footer: ["standard", "simple", "compact", "centered", "multicolumn", "dark", "minimal", "logo", "newsletter", "social", "app", "contact", "gradient"]
};

export async function POST(request: Request) {
  try {
    const { section, pageName, pageType } = await request.json();

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

    // Create prompt based on section type and content
    const sectionDescription = `a ${section.type} section for a ${pageType} page called "${pageName}"`;

    // Additional context based on section type
    let additionalContext = '';
    switch (section.type) {
      case 'navigation':
        additionalContext = `with ${section.content.menuItems?.length || 0} menu items`;
        break;
      case 'hero':
        additionalContext = `with headline "${section.content.headline || ''}"`;
        break;
      case 'features':
        additionalContext = `with ${section.content.features?.length || 0} features`;
        break;
      case 'testimonials':
        additionalContext = `with ${section.content.testimonials?.length || 0} testimonials`;
        break;
      case 'pricing':
        additionalContext = `with ${section.content.tiers?.length || 0} pricing tiers`;
        break;
      case 'contact':
        additionalContext = section.content.formFields ? 'with contact form' : 'with contact information';
        break;
      case 'cta':
        additionalContext = `with heading "${section.content.heading || ''}"`;
        break;
      case 'footer':
        additionalContext = `with ${section.content.menuGroups?.length || 0} menu groups`;
        break;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert UI/UX designer specializing in modern, beautiful website wireframes. Your task is to regenerate a section of a wireframe with a different, visually stunning layout.
          
          Generate a new JSON object for ${sectionDescription} ${additionalContext}.
          
          Available layout options for ${section.type} sections:
          ${availableLayouts.join(', ')}
          
          Make sure to:
          1. Create a visually beautiful and modern design using the latest web design trends 
          2. Include detailed visual elements like gradients, shadows, animations, and micro-interactions
          3. Use a cohesive color scheme that enhances the user experience
          4. Incorporate thoughtful spacing, typography, and visual hierarchy
          5. Change the layout to a different one from the current layout
          6. Keep the same general content but enhance or modify it to fit the new layout
          7. Return ONLY the section JSON with no additional text

          The current section layout is: ${section.content.layout || 'standard'}

          Return ONLY the JSON with no additional text or explanation.`
        },
        {
          role: "user",
          content: `Regenerate this ${section.type} section with a different, beautiful layout: ${JSON.stringify(section)}`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      return NextResponse.json(
        { error: 'Failed to generate section content' },
        { status: 500 }
      );
    }

    try {
      const newSection = JSON.parse(responseContent);
      // Ensure section ID remains the same
      newSection.id = section.id;
      newSection.type = section.type;
      
      // Validate the response structure
      if (!newSection.content) {
        console.error('Invalid section structure - missing content property:', newSection);
        return NextResponse.json(
          { 
            error: 'Generated section has invalid structure', 
            fallbackSection: createFallbackSection(section) 
          },
          { status: 400 }
        );
      }
      
      // For specific section types, ensure required properties exist
      switch (section.type) {
        case 'navigation':
          if (!newSection.content.menuItems) {
            newSection.content.menuItems = section.content.menuItems || [];
          }
          if (!newSection.content.logo) {
            newSection.content.logo = section.content.logo || 'Logo';
          }
          break;
        case 'hero':
          if (!newSection.content.headline) {
            newSection.content.headline = section.content.headline || 'Headline';
          }
          break;
        case 'features':
          if (!Array.isArray(newSection.content.features)) {
            newSection.content.features = section.content.features || [];
          }
          break;
        case 'testimonials':
          if (!Array.isArray(newSection.content.testimonials)) {
            newSection.content.testimonials = section.content.testimonials || [];
          }
          break;
        case 'pricing':
          if (!Array.isArray(newSection.content.tiers)) {
            newSection.content.tiers = section.content.tiers || [];
          }
          break;
        case 'cta':
          if (!newSection.content.heading) {
            newSection.content.heading = section.content.heading || 'Call to Action';
          }
          if (!newSection.content.buttonText) {
            newSection.content.buttonText = section.content.buttonText || 'Get Started';
          }
          break;
      }
      
      return NextResponse.json(newSection);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      return NextResponse.json(
        { 
          error: 'Failed to parse generated section',
          fallbackSection: createFallbackSection(section)
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error regenerating section:', error);
    return NextResponse.json(
      { 
        error: 'Failed to regenerate section',
        fallbackSection: createFallbackSection(section)
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