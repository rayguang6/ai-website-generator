'use client';

import { useState } from 'react';
import { Section } from '@/app/types/wireframe';
import EditSectionForm from '../EditSectionForm';
import SectionLayoutSelector from '../SectionLayoutSelector';

export interface SectionRendererProps {
  section: Section;
  onUpdate: (section: Section) => void;
  onReorder: (id: string, direction: 'up' | 'down') => void;
  onDelete: (id: string) => void;
  editMode: boolean;
  pageName?: string;
  pageType?: string;
}

export default function BaseSectionRenderer({
  section,
  onUpdate,
  onReorder,
  onDelete,
  editMode,
  pageName = 'Website',
  pageType = 'landing',
  children
}: SectionRendererProps & { children: React.ReactNode }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showLayoutSelector, setShowLayoutSelector] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = async () => {
    try {
      setIsRegenerating(true);
      
      const response = await fetch('/api/regenerate-section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section,
          pageName,
          pageType
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Error from regenerate-section API:', responseData.error);
        
        // If there's a fallback section provided, use it
        if (responseData.fallbackSection) {
          console.log('Using fallback section');
          onUpdate(responseData.fallbackSection);
          return;
        }
        
        throw new Error(responseData.error || 'Failed to regenerate section');
      }

      onUpdate(responseData);
    } catch (err) {
      console.error('Error regenerating section:', err);
      // Could add a toast notification here
    } finally {
      setIsRegenerating(false);
    }
  };
  
  const handleLayoutChange = (updatedSection: Section, layout: string) => {
    onUpdate(updatedSection);
    setShowLayoutSelector(false);
  };

  return (
    <div className="relative border border-gray-200 rounded-lg overflow-hidden">
      {/* Content */}
      <div className={`w-full ${isRegenerating ? 'opacity-50' : ''}`}>
        {children}
      </div>
      
      {/* Regenerating overlay */}
      {isRegenerating && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* Controls overlay - only visible in edit mode */}
      {editMode && (
        <div className="absolute top-0 right-0 p-2 flex gap-2 bg-white bg-opacity-90 rounded-bl-lg shadow-sm">
          <button
            onClick={() => setShowLayoutSelector(true)}
            className="p-1 text-gray-700 hover:text-green-500"
            aria-label="Change Layout"
            title="Change Layout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={handleRegenerate}
            className="p-1 text-gray-700 hover:text-purple-500"
            aria-label="Regenerate"
            disabled={isRegenerating}
            title="Regenerate with AI"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={() => setShowEditForm(true)}
            className="p-1 text-gray-700 hover:text-blue-500"
            aria-label="Edit"
            title="Edit Content"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onReorder(section.id, 'up')}
            className="p-1 text-gray-700 hover:text-blue-500"
            aria-label="Move up"
            title="Move Up"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={() => onReorder(section.id, 'down')}
            className="p-1 text-gray-700 hover:text-blue-500"
            aria-label="Move down"
            title="Move Down"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(section.id)}
            className="p-1 text-gray-700 hover:text-red-500"
            aria-label="Delete"
            title="Delete Section"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}

      {/* Section type label */}
      <div className="absolute top-0 left-0 bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700 rounded-br">
        {section.type}
        {section.content?.layout && (
          <span className="ml-1 text-gray-500">({section.content.layout})</span>
        )}
      </div>

      {/* Edit Form */}
      {showEditForm && (
        <EditSectionForm
          section={section}
          onUpdate={(updatedSection) => {
            onUpdate(updatedSection);
            setShowEditForm(false);
          }}
          onCancel={() => setShowEditForm(false)}
        />
      )}
      
      {/* Layout Selector */}
      {showLayoutSelector && (
        <SectionLayoutSelector
          section={section}
          onLayoutChange={handleLayoutChange}
          onClose={() => setShowLayoutSelector(false)}
        />
      )}
    </div>
  );
}