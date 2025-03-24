import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Section, WireframeData } from '@/app/types/wireframe';
import { v4 as uuidv4 } from 'uuid';

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

// Analyze prompt to select appropriate sections
async function analyzeSectionsForWebsite(prompt: string): Promise<string[]> {
  // Always return all sections in a logical order
  return [
    'navigation',  // Always first
    'hero',        // Main banner second
    'features',    // Core features third
    'testimonials',// Social proof
    'pricing',     // Business offering
    'contact',     // Contact information
    'cta',         // Call to action
    'footer'       // Always last
  ];
}

// Generate content for each section
async function generateSectionContent(sectionType: string, prompt: string, pageType: string, pageName: string): Promise<any> {
  try {
    console.log(`Generating content for section: ${sectionType}`);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Generate SPECIFIC and DETAILED content for a ${sectionType} section of a ${pageType} website named "${pageName}".
          
          REQUIREMENTS:
          1. All content must be UNIQUE and SPECIFIC to the business/website
          2. NO placeholder or generic content
          3. Content should match the tone and purpose described in the prompt
          4. Include all required fields for the section type
          
          Return a JSON object with these fields based on the section type:
          
          For navigation:
          {
            "menuItems": ["Home", "About", ...], // 4-6 relevant menu items
            "logo": "Business Name",
            "cta": "Action Text" // Compelling call to action
          }
          
          For hero:
          {
            "headline": "Main headline", // Compelling, specific headline
            "subheadline": "Supporting text", // Detailed value proposition
            "buttonText": "CTA Button", // Action-oriented button text
            "buttonUrl": "#"
          }
          
          For features:
          {
            "headline": "Features Headline",
            "subheading": "Features Subheading",
            "features": [
              {
                "title": "Feature name", // Specific feature name
                "description": "Detailed feature description", // 2-3 sentences
                "icon": "✨" // Relevant emoji icon
              }
            ]
          }
          
          For testimonials:
          {
            "headline": "Testimonials Headline",
            "subheading": "Testimonials Subheading",
            "testimonials": [
              {
                "quote": "Detailed customer testimonial", // Real-sounding quote
                "author": "Full Name", // Realistic name
                "role": "Position", // Specific job title/role
                "company": "Company Name" // Where relevant
              }
            ]
          }
          
          For pricing:
          {
            "headline": "Pricing Headline",
            "subheading": "Pricing Subheading",
            "tiers": [
              {
                "name": "Plan name",
                "price": "Price",
                "features": ["Feature 1", ...], // 4-6 specific features
                "isPopular": boolean,
                "buttonText": "CTA Text"
              }
            ]
          }
          
          For contact:
          {
            "headline": "Contact Headline",
            "subheading": "Contact Subheading",
            "email": "contact@example.com",
            "phone": "Phone number",
            "address": "Business address",
            "formFields": ["Name", "Email", "Message"]
          }
          
          For cta:
          {
            "heading": "CTA Headline", // Compelling call to action
            "subheading": "Supporting text", // Why they should act
            "buttonText": "Action Text",
            "buttonUrl": "#"
          }
          
          For footer:
          {
            "logo": "Business Name",
            "tagline": "Company tagline",
            "menuGroups": [
              {
                "title": "Group Title",
                "items": [
                  { "name": "Link Name", "url": "#" }
                ]
              }
            ],
            "socialLinks": ["Twitter", "LinkedIn", ...],
            "copyright": "Copyright text"
          }`
        },
        {
          role: "user",
          content: `Create SPECIFIC content for the ${sectionType} section based on this description: ${prompt}`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0].message.content;
    console.log(`Content generated for ${sectionType}:`, responseContent);

    if (!responseContent) {
      throw new Error(`Failed to generate content for ${sectionType} section`);
    }

    try {
      const contentData = JSON.parse(responseContent);
      
      // Select a layout
      const layouts = layoutOptions[sectionType as keyof typeof layoutOptions] || ["standard"];
      contentData.layout = layouts[Math.floor(Math.random() * layouts.length)];
      
      return contentData;
    } catch (parseError) {
      console.error(`Failed to parse ${sectionType} content:`, parseError);
      throw new Error(`Failed to generate valid content for ${sectionType} section`);
    }
  } catch (error) {
    console.error(`Error generating ${sectionType} content:`, error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, pageType = 'landing', pageName = 'Website' } = body;
    
    console.log('Received request:', { prompt, pageType, pageName });

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Generate content for ALL section types
    const allSectionTypes = [
      'navigation',
      'hero',
      'features',
      'testimonials',
      'pricing',
      'contact',
      'cta',
      'footer'
    ];

    // Generate content for all sections in parallel
    const allSectionContents = await Promise.all(
      allSectionTypes.map(async (sectionType) => {
        try {
          const content = await generateSectionContent(sectionType, prompt, pageType, pageName);
          return {
            id: uuidv4(),
            type: sectionType,
            content
          };
        } catch (error) {
          console.error(`Error generating content for ${sectionType}:`, error);
          return null;
        }
      })
    );

    // Filter out any failed generations
    const allSections = allSectionContents.filter((section): section is Section => section !== null);

    // Get the selected sections for initial display
    const selectedSectionTypes = await analyzeSectionsForWebsite(prompt);
    
    // Create the visible sections array using the generated content
    const visibleSections = selectedSectionTypes.map(type => {
      const section = allSections.find(s => s.type === type);
      if (!section) {
        throw new Error(`Missing content for selected section type: ${type}`);
      }
      return section;
    });

    if (visibleSections.length === 0) {
      return NextResponse.json(
        { error: 'Failed to generate any sections for the wireframe' },
        { status: 500 }
      );
    }

    const wireframeData: WireframeData & { allSections: Section[] } = {
      pageType,
      pageName,
      sections: visibleSections,
      allSections // Include all generated sections in the response
    };

    console.log('Generated wireframe data:', JSON.stringify(wireframeData, null, 2));
    return NextResponse.json(wireframeData);
  } catch (error) {
    console.error('Error generating wireframe:', error);
    return NextResponse.json(
      { error: 'Failed to generate wireframe' },
      { status: 500 }
    );
  }
} 