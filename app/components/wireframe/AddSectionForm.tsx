'use client';

import { useState } from 'react';
import { Section } from '@/app/types/wireframe';

interface AddSectionFormProps {
  onAdd: (newSection: Section) => void;
  onCancel: () => void;
}

const SECTION_TEMPLATES: Record<string, any> = {
  navigation: {
    logo: "Company Name",
    menuItems: ["Home", "About", "Services", "Contact"],
    cta: "Sign Up"
  },
  hero: {
    headline: "Main Headline",
    subheadline: "Subheadline text goes here",
    cta: {
      text: "Get Started",
      url: "#get-started"
    }
  },
  features: {
    heading: "Features Heading",
    subheading: "Features subheading text",
    features: [
      {
        title: "Feature 1",
        description: "Description of feature 1",
        icon: "icon-1"
      },
      {
        title: "Feature 2",
        description: "Description of feature 2",
        icon: "icon-2"
      }
    ]
  },
  testimonials: {
    heading: "Testimonials Heading",
    testimonials: [
      {
        quote: "This is an amazing product!",
        author: "John Doe",
        role: "CEO, Company"
      }
    ]
  },
  footer: {
    logo: "Company Name",
    menuGroups: [
      {
        title: "Company",
        items: [
          { name: "About Us", url: "/about" },
          { name: "Careers", url: "/careers" }
        ]
      }
    ],
    copyright: "© 2023 Company Name. All rights reserved."
  }
};

export default function AddSectionForm({ onAdd, onCancel }: AddSectionFormProps) {
  const [sectionType, setSectionType] = useState('navigation');
  const [sectionId, setSectionId] = useState('');
  const [content, setContent] = useState<string>(
    JSON.stringify(SECTION_TEMPLATES[sectionType], null, 2)
  );
  const [error, setError] = useState<string | null>(null);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setSectionType(newType);
    setContent(JSON.stringify(SECTION_TEMPLATES[newType], null, 2));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sectionId.trim()) {
      setError('Section ID is required');
      return;
    }

    try {
      const parsedContent = JSON.parse(content);
      const newSection: Section = {
        id: sectionId,
        type: sectionType,
        content: parsedContent
      };
      
      onAdd(newSection);
    } catch (err) {
      setError('Invalid JSON format. Please check your input.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 p-4 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Section</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="sectionId">
                Section ID
              </label>
              <input
                id="sectionId"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={sectionId}
                onChange={(e) => setSectionId(e.target.value)}
                placeholder="e.g., my-hero-section"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="sectionType">
                Section Type
              </label>
              <select
                id="sectionType"
                className="w-full p-2 border border-gray-300 rounded"
                value={sectionType}
                onChange={handleTypeChange}
              >
                <option value="navigation">Navigation</option>
                <option value="hero">Hero</option>
                <option value="features">Features</option>
                <option value="testimonials">Testimonials</option>
                <option value="footer">Footer</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="content">
              Section Content (JSON)
            </label>
            <textarea
              id="content"
              className="w-full h-64 p-2 border border-gray-300 rounded font-mono text-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              spellCheck={false}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 