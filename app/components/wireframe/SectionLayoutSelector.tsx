'use client';

import { useState } from 'react';
import { Section } from '@/app/types/wireframe';

// Map of layout options for each section type
const layoutOptions = {
  navigation: ["standard", "centered", "minimal", "transparent", "fullwidth", "bordered", "dropdown"],
  hero: ["centered", "split", "imageBg", "video", "minimal", "animated", "parallax", "slideshow"],
  features: ["grid", "horizontal", "vertical", "imageCards", "sideImage", "alternating", "carousel", "tabbed"],
  testimonials: ["grid", "carousel", "masonry", "minimal", "cards", "quote", "timeline", "slider"],
  pricing: ["standard", "horizontal", "compact", "toggle", "cards", "comparison", "tiered", "minimalist"],
  contact: ["standard", "split", "minimal", "fullwidth", "boxed", "map", "floating", "sidebar"],
  cta: ["standard", "banner", "full", "popup", "floating", "side", "animated", "notification"],
  footer: ["standard", "simple", "compact", "centered", "multicolumn", "dark", "minimal", "logo"]
};

interface SectionLayoutSelectorProps {
  section: Section;
  onLayoutChange: (section: Section, layout: string) => void;
  onClose: () => void;
}

export default function SectionLayoutSelector({ section, onLayoutChange, onClose }: SectionLayoutSelectorProps) {
  const [selectedLayout, setSelectedLayout] = useState<string | undefined>(
    section.content?.layout || 'standard'
  );
  
  const availableLayouts = layoutOptions[section.type as keyof typeof layoutOptions] || [];
  
  const handleApply = () => {
    if (!selectedLayout) return;
    
    // Create a new section with the updated layout
    const updatedSection: Section = {
      ...section,
      content: {
        ...section.content,
        layout: selectedLayout
      }
    };
    
    onLayoutChange(updatedSection, selectedLayout);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Change {section.type} Layout</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3">Select a layout style for this section:</p>
          <div className="grid grid-cols-2 gap-2">
            {availableLayouts.map((layout) => (
              <button
                key={layout}
                onClick={() => setSelectedLayout(layout)}
                className={`py-2 px-3 text-sm border rounded hover:bg-blue-50 text-left ${
                  selectedLayout === layout ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
                }`}
              >
                {layout}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Apply Layout
          </button>
        </div>
      </div>
    </div>
  );
} 