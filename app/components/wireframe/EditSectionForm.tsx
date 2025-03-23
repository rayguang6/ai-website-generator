'use client';

import { useState } from 'react';
import { Section } from '@/app/types/wireframe';

interface EditSectionFormProps {
  section: Section;
  onUpdate: (updatedSection: Section) => void;
  onCancel: () => void;
}

export default function EditSectionForm({ section, onUpdate, onCancel }: EditSectionFormProps) {
  const [editedContent, setEditedContent] = useState<string>(
    JSON.stringify(section.content, null, 2)
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const parsedContent = JSON.parse(editedContent);
      const updatedSection: Section = {
        ...section,
        content: parsedContent
      };
      
      onUpdate(updatedSection);
    } catch (err) {
      setError('Invalid JSON format. Please check your input.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 p-4 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit {section.type} Section</h2>
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
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="content">
              Section Content (JSON)
            </label>
            <textarea
              id="content"
              className="w-full h-80 p-2 border border-gray-300 rounded font-mono text-sm"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 