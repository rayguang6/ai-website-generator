'use client';

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Section, Wireframe, WireframeData } from '@/app/types/wireframe';
import WireframeEditor from './WireframeEditor';
import PreviewMode from './PreviewMode';
import ErrorBoundary from './ErrorBoundary';
import wireframeStore from '@/app/data/wireframeStore';

interface AIWireframeGeneratorProps {
  initialWireframe?: Wireframe;
}

// Sample prompts for quick generation
const samplePrompts = {
  business: [
    "A professional website for a marketing agency that specializes in digital marketing, SEO, and social media management. Should have case studies and client testimonials.",
    "A corporate website for a financial consulting firm with services, team members, and a blog section discussing market trends.",
    "A business website for a law firm specializing in corporate law with practice areas, attorney profiles, and contact information.",
    "A modern website for a management consulting firm highlighting expertise in digital transformation and organizational change.",
    "A website for an accounting firm showcasing tax services, financial planning, and client resources.",
  ],
  ecommerce: [
    "An online store for handmade jewelry with product categories, featured collections, and customer reviews.",
    "A fashion e-commerce site with trending items, seasonal collections, and a style guide blog.",
    "A gourmet food marketplace with product categories, chef recommendations, and cooking tutorials.",
    "A sustainable products marketplace with eco-friendly items, impact metrics, and educational content.",
    "A premium electronics store with detailed product specifications, comparison tools, and expert reviews.",
  ],
  technology: [
    "A SaaS product website for project management software with features, pricing plans, and integration options.",
    "A mobile app landing page showcasing the app's features, user testimonials, and download information.",
    "A tech startup website with product information, team profiles, and investor relations.",
    "A cybersecurity company website highlighting threat protection services, case studies, and a resource center.",
    "An AI platform website demonstrating capabilities, use cases, and implementation process.",
  ],
  personal: [
    "A portfolio website for a professional photographer with galleries, services, and booking information.",
    "A personal blog for a travel influencer with destination guides, photography, and newsletter signup.",
    "A resume website for a UX designer with projects, skills, and professional experience.",
    "A professional website for a freelance writer showcasing writing samples, services, and client testimonials.",
    "A personal brand website for a public speaker with speaking topics, event calendar, and media kit.",
  ],
  health: [
    "A medical practice website with services, doctor profiles, patient testimonials, and appointment booking.",
    "A wellness center website with programs, practitioner bios, and client success stories.",
    "A fitness coaching site with training programs, nutrition tips, and transformation stories.",
    "A mental health practice website with therapy approaches, resources, and insurance information.",
    "A telemedicine platform with virtual consultation information, provider directory, and patient resources.",
  ],
  education: [
    "An online learning platform with course catalog, instructor profiles, and student testimonials.",
    "A university department website with program information, faculty profiles, and research highlights.",
    "A professional training institute with certification courses, learning outcomes, and career services.",
    "A coding bootcamp website with curriculum details, success stories, and enrollment information.",
    "An educational technology platform with features, implementation process, and case studies.",
  ],
  creative: [
    "A digital design agency showcasing their portfolio, creative process, and client work.",
    "A film production company with showreel, services, and past productions.",
    "An architecture firm website with project gallery, design philosophy, and team profiles.",
    "A music studio website with recording facilities, producer profiles, and booking information.",
    "An art gallery website with exhibition information, artist profiles, and online collection.",
  ]
};

// Default content for each section type
const defaultSections: Array<Omit<Section, 'id'>> = [
  {
    type: 'navigation',
    content: {
      logo: 'Your Logo',
      menuItems: ['Home', 'Features', 'Pricing', 'About', 'Contact'],
      layout: 'glassmorphic'
    }
  },
  {
    type: 'hero',
    content: {
      headline: 'Welcome to Our Website',
      subheadline: 'The best solution for your needs',
      buttonText: 'Get Started',
      buttonUrl: '#',
      layout: 'gradient'
    }
  },
  {
    type: 'features',
    content: {
      headline: 'Our Amazing Features',
      subheading: 'Discover what makes us different',
      features: [
        { title: 'Feature 1', description: 'Description of feature 1', icon: '🚀' },
        { title: 'Feature 2', description: 'Description of feature 2', icon: '⚡' },
        { title: 'Feature 3', description: 'Description of feature 3', icon: '🔍' },
        { title: 'Feature 4', description: 'Description of feature 4', icon: '🔒' }
      ],
      layout: 'iconGrid'
    }
  },
  {
    type: 'testimonials',
    content: {
      headline: 'What Our Customers Say',
      subheading: 'Real feedback from real users',
      testimonials: [
        { quote: 'This is an amazing product that has transformed how we work!', author: 'John Doe', role: 'CEO', avatar: '👨‍💼' },
        { quote: 'Saved us so much time and improved our workflow tremendously.', author: 'Jane Smith', role: 'Designer', avatar: '👩‍🎨' },
        { quote: 'The customer support is outstanding and very responsive.', author: 'Mike Johnson', role: 'Developer', avatar: '👨‍💻' }
      ],
      layout: 'bubbles'
    }
  },
  {
    type: 'pricing',
    content: {
      headline: 'Pricing Plans',
      subheadline: 'Choose the plan that works for you',
      tiers: [
        { name: 'Basic', price: '$9.99', features: ['Feature 1', 'Feature 2'], isPopular: false },
        { name: 'Pro', price: '$19.99', features: ['Feature 1', 'Feature 2', 'Feature 3'], isPopular: true },
        { name: 'Enterprise', price: '$49.99', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'], isPopular: false }
      ],
      layout: 'cards'
    }
  },
  {
    type: 'cta',
    content: {
      heading: 'Ready to Get Started?',
      subheading: 'Join thousands of satisfied customers today',
      buttonText: 'Sign Up Now',
      buttonUrl: '#',
      layout: 'gradient'
    }
  },
  {
    type: 'footer',
    content: {
      logo: 'Your Logo',
      tagline: '© 2023 Your Company. All rights reserved.',
      menuGroups: [
        {
          title: 'Product',
          items: [
            { name: 'Features', url: '#' },
            { name: 'Pricing', url: '#' },
            { name: 'FAQ', url: '#' }
          ]
        },
        {
          title: 'Company',
          items: [
            { name: 'About', url: '#' },
            { name: 'Blog', url: '#' },
            { name: 'Contact', url: '#' }
          ]
        }
      ],
      socialLinks: ['Twitter', 'Facebook', 'Instagram', 'LinkedIn'],
      layout: 'newsletter'
    }
  }
];

const AIWireframeGenerator: React.FC<AIWireframeGeneratorProps> = ({ initialWireframe }) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPromptSuggestions, setShowPromptSuggestions] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>('');
  const [wireframe, setWireframe] = useState<Wireframe>(() => {
    if (initialWireframe) {
      return { ...initialWireframe };
    }
    
    // Default wireframe structure
    return {
      id: uuidv4(),
      name: 'My Wireframe',
      pageType: 'landing',
      pageName: 'My Website',
      sections: defaultSections.map(section => ({
        ...section,
        id: uuidv4()
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  });

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleGenerateWireframe = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description of the website you want to create.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-wireframe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          pageType: wireframe.pageType,
          pageName: wireframe.name
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: WireframeData = await response.json();
      console.log('Generated wireframe data:', data); // Debug log
      
      // Create a completely new wireframe with the generated content
      const newWireframe: Wireframe = {
        id: uuidv4(),
        name: data.pageName || wireframe.name,
        pageName: data.pageName || wireframe.name,
        pageType: data.pageType || wireframe.pageType,
        sections: data.sections.map(section => {
          // Preserve the section type and layout if they exist
          const existingSection = wireframe.sections.find(s => s.type === section.type);
          return {
            ...section,
            id: uuidv4(),
            content: {
              ...section.content,
              layout: section.content.layout || existingSection?.content.layout || getRandomLayout(section.type)
            }
          };
        }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('New wireframe with AI content:', newWireframe); // Debug log

      // Store the new wireframe in our store
      wireframeStore.setActiveWireframe(newWireframe);
      
      // Update the state with the new wireframe
      setWireframe(newWireframe);

      // Clear the prompt and selected category after successful generation
      setPrompt('');
      setSelectedCategory(null);
      setShowPromptSuggestions(false);
      
      // Show success message
      setError('Wireframe generated successfully! You can now customize each section.');
    } catch (err) {
      console.error('Error generating wireframe:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An unknown error occurred while generating the wireframe.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Add a function to get random layout
  const getRandomLayout = (sectionType: string) => {
    const layouts = {
      navigation: ['standard', 'centered', 'glassmorphic'],
      hero: ['standard', 'split', 'gradient', 'video'],
      features: ['grid', 'list', 'cards', 'iconGrid'],
      testimonials: ['cards', 'grid', 'slider', 'bubbles'],
      pricing: ['cards', 'table', 'simple'],
      contact: ['split', 'centered', 'fullWidth'],
      cta: ['standard', 'gradient', 'image'],
      footer: ['simple', 'complex', 'newsletter']
    };

    const availableLayouts = layouts[sectionType as keyof typeof layouts] || ['standard'];
    return availableLayouts[Math.floor(Math.random() * availableLayouts.length)];
  };

  // Add useEffect to load stored wireframe on mount
  useEffect(() => {
    const storedWireframe = wireframeStore.getActiveWireframe();
    if (storedWireframe) {
      setWireframe(storedWireframe as Wireframe);
    }
  }, []);

  // Update handleWireframeChange to store changes
  const handleWireframeChange = (updatedWireframe: Wireframe) => {
    setWireframe(updatedWireframe);
    wireframeStore.setActiveWireframe(updatedWireframe);
  };

  const togglePreviewMode = () => {
    setIsPreview(!isPreview);
  };

  const handleExport = () => {
    // Create a JSON file for download
    const dataStr = JSON.stringify(wireframe, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `wireframe-${wireframe.name.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {!isPreview && (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
            AI Wireframe Generator
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Create Your Wireframe</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Website Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={wireframe.name}
                    onChange={(e) => setWireframe({ ...wireframe, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter website name"
                  />
                </div>
                
                <div>
                  <label htmlFor="pageType" className="block text-sm font-medium mb-1">
                    Page Type
                  </label>
                  <select
                    id="pageType"
                    value={wireframe.pageType}
                    onChange={(e) => setWireframe({ ...wireframe, pageType: e.target.value })}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="landing">Landing Page</option>
                    <option value="product">Product Page</option>
                    <option value="about">About Page</option>
                    <option value="contact">Contact Page</option>
                    <option value="services">Services Page</option>
                    <option value="blog">Blog Page</option>
                    <option value="portfolio">Portfolio Page</option>
                  </select>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="prompt" className="block text-sm font-medium">
                      Description
                    </label>
                    <button 
                      onClick={() => setShowPromptSuggestions(!showPromptSuggestions)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {showPromptSuggestions ? 'Hide suggestions' : 'Show suggestions'}
                    </button>
                  </div>
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={handlePromptChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the website you want to create..."
                    rows={4}
                  />
                  
                  {showPromptSuggestions && (
                    <div className="mt-4 bg-gray-100 dark:bg-gray-850 rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-2">Prompt Suggestions</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {Object.keys(samplePrompts).map(category => (
                          <button
                            key={category}
                            onClick={() => handleCategorySelect(category)}
                            className={`text-xs py-1 px-2 rounded-full transition-colors ${
                              selectedCategory === category
                                ? 'bg-blue-600 dark:bg-blue-700 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                          >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </button>
                        ))}
                      </div>
                      
                      {selectedCategory && (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {samplePrompts[selectedCategory as keyof typeof samplePrompts].map((samplePrompt, index) => (
                            <div
                              key={index}
                              onClick={() => handlePromptSelect(samplePrompt)}
                              className="cursor-pointer text-sm p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                              {samplePrompt.length > 120 ? samplePrompt.substring(0, 120) + '...' : samplePrompt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleGenerateWireframe}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md shadow transition-all duration-300 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    'Generate Wireframe'
                  )}
                </button>
                
                {error && (
                  <div className="text-red-600 dark:text-red-400 text-sm mt-2">
                    {error}
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">What's Included</h2>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 text-green-500 dark:text-green-400 mr-2">✓</span>
                  <span>AI-powered website structure based on your description</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 text-green-500 dark:text-green-400 mr-2">✓</span>
                  <span>Optimized section selection for your specific website type</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 text-green-500 dark:text-green-400 mr-2">✓</span>
                  <span>Customizable content for each section</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 text-green-500 dark:text-green-400 mr-2">✓</span>
                  <span>Multiple layout options for visual variety</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 text-green-500 dark:text-green-400 mr-2">✓</span>
                  <span>Professionally written copy tailored to your industry</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 text-green-500 dark:text-green-400 mr-2">✓</span>
                  <span>Responsive design preview</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 text-green-500 dark:text-green-400 mr-2">✓</span>
                  <span>Export functionality for your designs</span>
                </li>
              </ul>
              
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-sm font-medium mb-2">How it works:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Enter a detailed description of your website</li>
                  <li>Our AI analyzes your needs and selects the best sections</li>
                  <li>Content is generated for each section with appropriate layouts</li>
                  <li>Preview and customize your wireframe design</li>
                  <li>Export and use in your website development</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mb-4">
            <button
              onClick={togglePreviewMode}
              className="flex items-center gap-2 py-2 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Preview
            </button>
            
            <button
              onClick={handleExport}
              className="flex items-center gap-2 py-2 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export
            </button>
          </div>
          
          <ErrorBoundary>
            <WireframeEditor 
              initialWireframe={wireframe}
              onWireframeChange={handleWireframeChange} 
              onPreviewClick={togglePreviewMode}
            />
          </ErrorBoundary>
        </div>
      )}

      {isPreview && (
        <ErrorBoundary>
          <PreviewMode 
            wireframe={wireframe} 
            onClose={togglePreviewMode} 
          />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default AIWireframeGenerator; 