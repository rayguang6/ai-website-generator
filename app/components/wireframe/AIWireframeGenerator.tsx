'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Section, Wireframe, WireframeData } from '@/app/types/wireframe';
import WireframeEditor from './WireframeEditor';
import PreviewMode from './PreviewMode';
import ErrorBoundary from './ErrorBoundary';

interface AIWireframeGeneratorProps {
  initialWireframe?: Wireframe;
}

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
    type: 'testimonials',
    content: {
      headline: 'Featured Customer Story',
      subheading: 'See how our customers succeed',
      testimonials: [
        { quote: 'Since implementing this solution, our productivity has increased by 200%!', author: 'Sarah Williams', role: 'Operations Manager', avatar: '👩‍💼' }
      ],
      layout: 'spotlight'
    }
  },
  {
    type: 'features',
    content: {
      headline: 'Our Development Timeline',
      subheading: 'How we\'ve evolved over time',
      features: [
        { title: '2020', description: 'Founded the company with a vision to solve industry problems' },
        { title: '2021', description: 'Launched our first product and acquired initial customers' },
        { title: '2022', description: 'Expanded features based on customer feedback' },
        { title: '2023', description: 'Reached 10,000 active users milestone' }
      ],
      layout: 'timeline'
    }
  },
  {
    type: 'contact',
    content: {
      heading: 'Contact Us',
      email: 'info@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, Country',
      formFields: ['Name', 'Email', 'Subject', 'Message'],
      layout: 'split'
    }
  },
  {
    type: 'cta',
    content: {
      heading: 'Ready to get started?',
      subheading: 'Join thousands of satisfied customers today',
      buttonText: 'Get Started Now',
      buttonUrl: '#',
      layout: 'cta-gradient'
    }
  },
  {
    type: 'footer',
    content: {
      logo: 'Your Logo',
      tagline: '© 2023 Your Company. All rights reserved.',
      links: [
        { label: 'Privacy Policy', url: '#' },
        { label: 'Terms of Service', url: '#' },
        { label: 'Contact Us', url: '#' },
        { label: 'About Us', url: '#' }
      ],
      layout: 'multicolumn'
    }
  }
];

export default function AIWireframeGenerator({ initialWireframe }: AIWireframeGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [wireframe, setWireframe] = useState<Wireframe>(
    initialWireframe || {
      id: uuidv4(),
      name: 'New Wireframe',
      pageType: 'landing',
      pageName: 'Home',
      sections: defaultSections.map(section => ({
        ...section,
        id: uuidv4()
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  );

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
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
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: WireframeData = await response.json();
      
      setWireframe({
        ...wireframe,
        pageType: data.pageType,
        pageName: data.pageName,
        sections: data.sections.map(section => ({
          ...section,
          id: uuidv4() // Ensure each section has a unique ID
        })),
        updatedAt: new Date().toISOString()
      });
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

  const handleWireframeChange = (updatedWireframe: Wireframe) => {
    setWireframe(updatedWireframe);
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
    <ErrorBoundary>
      <div className="mx-auto max-w-6xl px-4 py-8">
        {isPreview ? (
          <div className="preview-mode">
            <div className="fixed top-0 left-0 w-full z-50 bg-indigo-700 text-white px-4 py-2 flex justify-between items-center">
              <h3 className="text-lg font-medium">Preview Mode</h3>
              <div className="flex gap-2">
                <button
                  onClick={togglePreviewMode}
                  className="px-3 py-1 bg-white text-indigo-700 rounded hover:bg-indigo-100 transition-colors"
                >
                  Exit Preview
                </button>
                <button
                  onClick={handleExport}
                  className="px-3 py-1 bg-indigo-800 text-white rounded hover:bg-indigo-900 transition-colors"
                >
                  Export
                </button>
              </div>
            </div>
            <div className="pt-14">
              <PreviewMode wireframe={wireframe} />
            </div>
          </div>
        ) : (
          <div className="edit-mode">
            <div className="mb-8 space-y-4">
              <h1 className="text-3xl font-bold">{wireframe.name}</h1>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <textarea
                    value={prompt}
                    onChange={handlePromptChange}
                    placeholder="Describe the website you want to create. For example: A modern landing page for a SaaS product with navigation, hero section, features, pricing, and contact form."
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={isGenerating}
                  />
                  
                  {error && (
                    <div className="mt-2 text-red-600 text-sm">{error}</div>
                  )}
                </div>
                
                <div className="flex flex-col justify-between">
                  <button
                    onClick={handleGenerateWireframe}
                    disabled={isGenerating || !prompt.trim()}
                    className={`px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      isGenerating ? 'cursor-wait' : ''
                    }`}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Wireframe'}
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={togglePreviewMode}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                      Preview
                    </button>
                    <button
                      onClick={handleExport}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <WireframeEditor
              initialWireframe={wireframe}
              onWireframeChange={handleWireframeChange}
              onPreviewClick={togglePreviewMode}
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
} 