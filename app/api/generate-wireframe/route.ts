import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Section } from '@/app/types/wireframe';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt, pageType = 'landing', pageName = 'Website' } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a website wireframe generation assistant. Your task is to convert text descriptions into structured JSON for a wireframe renderer.
          
          The JSON should follow this structure:
          {
            "pageType": "landing",
            "pageName": "Page Name",
            "sections": [
              {
                "id": "unique-id",
                "type": "section-type",
                "content": { ... section specific content ... }
              }
            ]
          }
          
          IMPORTANT: Always generate at least 5-7 different sections for a comprehensive website experience. Every page should include:
          - A navigation section
          - A hero section
          - 3-4 content sections (features, testimonials, pricing, etc.)
          - A footer section
          
          Available section types and their layout options:
          
          - navigation: Header with logo, menu items and optional CTA
            layouts: "standard" (default), "centered", "minimal", "transparent", "fullwidth", "bordered", "dropdown"
          
          - hero: Main banner with headline, subheadline, and optional search bar or CTA
            layouts: "centered" (default), "split", "imageBg", "video", "minimal", "animated", "parallax", "slideshow"
          
          - features: Grid of features with icons, titles and descriptions
            layouts: "grid" (default), "horizontal", "vertical", "imageCards", "sideImage", "alternating", "carousel", "tabbed"
          
          - testimonials: Customer testimonials with quotes and author info
            layouts: "grid" (default), "carousel", "masonry", "minimal", "cards", "quote", "timeline", "slider"
            
          - pricing: Pricing tiers with features and price points
            layouts: "standard", "horizontal", "compact", "toggle", "cards", "comparison", "tiered", "minimalist"
            
          - contact: Contact information or form elements
            layouts: "standard", "split", "minimal", "fullwidth", "boxed", "map", "floating", "sidebar"
            
          - cta: Call to action section with headline and button
            layouts: "standard", "banner", "full", "popup", "floating", "side", "animated", "notification"
          
          - footer: Website footer with menus and copyright
            layouts: "standard" (default), "simple", "compact", "centered", "multicolumn", "dark", "minimal", "logo"
          
          For each section, analyze the user request and choose an appropriate layout based on the content.
          Vary the layouts through the page to create visual interest. Include rich content and details for each section.
          
          Return ONLY the JSON with no additional text or explanation.`
        },
        {
          role: "user",
          content: `Create a wireframe for a ${pageType} page called "${pageName}" based on this description: ${prompt}`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      return NextResponse.json(
        { error: 'Failed to generate wireframe content' },
        { status: 500 }
      );
    }

    try {
      const wireframeData = JSON.parse(responseContent);
      return NextResponse.json(wireframeData);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse generated wireframe' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error generating wireframe:', error);
    return NextResponse.json(
      { error: 'Failed to generate wireframe' },
      { status: 500 }
    );
  }
} 