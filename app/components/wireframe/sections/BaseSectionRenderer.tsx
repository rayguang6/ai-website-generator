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
  
  const handleLayoutChange = (updatedSection: Section) => {
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
        <div className="absolute top-12 right-2 p-2 flex gap-1 bg-white bg-opacity-90 rounded-lg shadow-sm">
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
        </div>
      )}

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