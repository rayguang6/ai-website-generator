'use client';

import { useState } from 'react';
import { WireframeData } from '@/app/types/wireframe';

interface AIWireframeGeneratorProps {
  onGenerate: (data: WireframeData) => void;
  onCancel: () => void;
}

export default function AIWireframeGenerator({ onGenerate, onCancel }: AIWireframeGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [pageName, setPageName] = useState('');
  const [pageType, setPageType] = useState('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a description of the website you want to generate');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-wireframe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          pageName: pageName || 'My Website',
          pageType
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate wireframe');
      }

      const wireframeData = await response.json();
      onGenerate(wireframeData);
    } catch (err) {
      console.error('Error generating wireframe:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate wireframe');
    } finally {
      setIsLoading(false);
    }
  };

  const examplePrompts = [
    'A coffee shop website with a split hero section and horizontal features',
    'A fitness app landing page with a video hero and masonry testimonials',
    'A travel booking platform with an imageBg hero and carousel testimonials',
    'A modern portfolio with a minimal navigation and sideImage features',
    'An e-commerce store with a transparent navigation and imageCards features'
  ];

  const handleUseExample = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Generate Wireframe with AI</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="pageName">
              Website Name
            </label>
            <input
              id="pageName"
              type="text"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              placeholder="My Amazing Website"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="pageType">
              Page Type
            </label>
            <select
              id="pageType"
              value={pageType}
              onChange={(e) => setPageType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="landing">Landing Page</option>
              <option value="product">Product Page</option>
              <option value="about">About Page</option>
              <option value="contact">Contact Page</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="prompt">
              Describe Your Website
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the type of website you want to create, its purpose, key features, and target audience..."
              className="w-full h-32 p-3 border border-gray-300 rounded-md"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              <span className="font-medium">Layout Tips:</span> Include layout preferences in your prompt. 
              Try phrases like "use a split hero section" or "arrange features horizontally".
            </p>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
            <h4 className="font-medium text-sm text-blue-800 mb-2">Available Layout Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
              <div>
                <p><span className="font-medium">Navigation:</span> standard, centered, minimal, transparent</p>
                <p><span className="font-medium">Hero:</span> centered, split, imageBg, video, minimal</p>
              </div>
              <div>
                <p><span className="font-medium">Features:</span> grid, horizontal, vertical, imageCards, sideImage</p>
                <p><span className="font-medium">Testimonials:</span> grid, carousel, masonry, minimal</p>
                <p><span className="font-medium">Footer:</span> standard, simple, compact, centered</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Example Prompts:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleUseExample(example)}
                  className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                'Generate Wireframe'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 