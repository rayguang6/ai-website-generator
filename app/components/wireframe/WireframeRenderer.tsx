'use client';

import { useState } from 'react';
import { WireframeData, Section } from '@/app/types/wireframe';
import NavigationSection from './sections/NavigationSection';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import FooterSection from './sections/FooterSection';
import AddSectionForm from './AddSectionForm';

interface WireframeRendererProps {
  initialData: WireframeData;
}

export default function WireframeRenderer({ initialData }: WireframeRendererProps) {
  const [wireframeData, setWireframeData] = useState<WireframeData>(initialData);
  const [editMode, setEditMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleUpdateSection = (updatedSection: Section) => {
    setWireframeData(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === updatedSection.id ? updatedSection : section
      )
    }));
  };

  const handleAddSection = (newSection: Section) => {
    setWireframeData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
    setShowAddForm(false);
  };

  const handleReorderSection = (id: string, direction: 'up' | 'down') => {
    const sectionIndex = wireframeData.sections.findIndex(s => s.id === id);
    if (
      (direction === 'up' && sectionIndex === 0) || 
      (direction === 'down' && sectionIndex === wireframeData.sections.length - 1)
    ) {
      return; // Can't move further in this direction
    }

    const newIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
    const newSections = [...wireframeData.sections];
    const [removedSection] = newSections.splice(sectionIndex, 1);
    newSections.splice(newIndex, 0, removedSection);

    setWireframeData(prev => ({
      ...prev,
      sections: newSections
    }));
  };

  const handleDeleteSection = (id: string) => {
    setWireframeData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== id)
    }));
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(wireframeData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${wireframeData.pageName.toLowerCase().replace(/\s+/g, '-')}-wireframe.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const renderSection = (section: Section) => {
    switch (section.type) {
      case 'navigation':
        return <NavigationSection 
          section={section}
          onUpdate={handleUpdateSection}
          onReorder={handleReorderSection}
          onDelete={handleDeleteSection}
          editMode={editMode}
        />;
      case 'hero':
        return <HeroSection 
          section={section}
          onUpdate={handleUpdateSection}
          onReorder={handleReorderSection}
          onDelete={handleDeleteSection}
          editMode={editMode}
        />;
      case 'features':
        return <FeaturesSection 
          section={section}
          onUpdate={handleUpdateSection}
          onReorder={handleReorderSection}
          onDelete={handleDeleteSection}
          editMode={editMode}
        />;
      case 'testimonials':
        return <TestimonialsSection 
          section={section}
          onUpdate={handleUpdateSection}
          onReorder={handleReorderSection}
          onDelete={handleDeleteSection}
          editMode={editMode}
        />;
      case 'footer':
        return <FooterSection 
          section={section}
          onUpdate={handleUpdateSection}
          onReorder={handleReorderSection}
          onDelete={handleDeleteSection}
          editMode={editMode}
        />;
      default:
        return (
          <div className="p-4 border border-gray-300 rounded-md bg-gray-100">
            <h3 className="text-lg font-medium mb-2">Unknown Section Type: {section.type}</h3>
            <pre className="text-xs overflow-auto bg-white p-2 rounded">
              {JSON.stringify(section.content, null, 2)}
            </pre>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <h1 className="text-xl font-bold">{wireframeData.pageName} Wireframe</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {editMode ? 'View Mode' : 'Edit Mode'}
          </button>
          <button 
            onClick={handleExportJSON}
            className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition"
          >
            Export JSON
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-[1fr_3fr] flex-1">
        <div className="bg-gray-100 p-4 border-r">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Page Structure</h2>
            {editMode && (
              <button 
                onClick={() => setShowAddForm(true)}
                className="p-1 text-blue-600 hover:text-blue-800"
                aria-label="Add section"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {wireframeData.sections.map(section => (
              <li 
                key={section.id}
                className="p-2 bg-white rounded border border-gray-200 cursor-pointer hover:bg-gray-50"
              >
                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-8 bg-white flex flex-col gap-8 overflow-auto">
          {wireframeData.sections.map(section => (
            <div key={section.id} className="relative">
              {renderSection(section)}
            </div>
          ))}
        </div>
      </div>

      {showAddForm && (
        <AddSectionForm 
          onAdd={handleAddSection}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
} 