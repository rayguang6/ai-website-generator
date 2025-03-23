'use client';

import { useState } from 'react';
import { Section } from '@/app/types/wireframe';
import EditSectionForm from '../EditSectionForm';

export interface SectionRendererProps {
  section: Section;
  onUpdate: (section: Section) => void;
  onReorder: (id: string, direction: 'up' | 'down') => void;
  onDelete: (id: string) => void;
  editMode: boolean;
}

export default function BaseSectionRenderer({
  section,
  onUpdate,
  onReorder,
  onDelete,
  editMode,
  children
}: SectionRendererProps & { children: React.ReactNode }) {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <div className="relative border border-gray-200 rounded-lg overflow-hidden">
      {/* Content */}
      <div className="w-full">
        {children}
      </div>
      
      {/* Controls overlay - only visible in edit mode */}
      {editMode && (
        <div className="absolute top-0 right-0 p-2 flex gap-2 bg-white bg-opacity-90 rounded-bl-lg shadow-sm">
          <button
            onClick={() => setShowEditForm(true)}
            className="p-1 text-gray-700 hover:text-blue-500"
            aria-label="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onReorder(section.id, 'up')}
            className="p-1 text-gray-700 hover:text-blue-500"
            aria-label="Move up"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={() => onReorder(section.id, 'down')}
            className="p-1 text-gray-700 hover:text-blue-500"
            aria-label="Move down"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(section.id)}
            className="p-1 text-gray-700 hover:text-red-500"
            aria-label="Delete"
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
    </div>
  );
}