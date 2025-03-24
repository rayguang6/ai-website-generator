'use client';

import { useState } from 'react';
import { WireframeData, Section } from '@/app/types/wireframe';
import NavigationSection from './sections/NavigationSection';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import PricingSection from './sections/PricingSection';
import ContactSection from './sections/ContactSection';
import CTASection from './sections/CTASection';
import FooterSection from './sections/FooterSection';
import AddSectionForm from './AddSectionForm';
import AIWireframeGenerator from './AIWireframeGenerator';
import PreviewMode from './PreviewMode';
import ErrorBoundary from './ErrorBoundary';

interface WireframeRendererProps {
  initialData: WireframeData;
}

export default function WireframeRenderer({ initialData }: WireframeRendererProps) {
  const [wireframeData, setWireframeData] = useState<WireframeData>(initialData);
  const [editMode, setEditMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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

  const handleGenerateAI = (generatedData: WireframeData) => {
    setWireframeData(generatedData);
    setShowAIGenerator(false);
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
          pageName={wireframeData.pageName}
          pageType={wireframeData.pageType}
        />;
      case 'hero':
        return <HeroSection 
          section={section}
          onUpdate={handleUpdateSection}
          onReorder={handleReorderSection}
          onDelete={handleDeleteSection}
          editMode={editMode}
          pageName={wireframeData.pageName}
          pageType={wireframeData.pageType}
        />;
      case 'features':
        return <FeaturesSection 
          section={section}
          onUpdate={handleUpdateSection}
          onReorder={handleReorderSection}
          onDelete={handleDeleteSection}
          editMode={editMode}
          pageName={wireframeData.pageName}
          pageType={wireframeData.pageType}
        />;
      case 'testimonials':
        return <TestimonialsSection 
          section={section}
          onUpdate={handleUpdateSection}
          onReorder={handleReorderSection}
          onDelete={handleDeleteSection}
          editMode={editMode}
          pageName={wireframeData.pageName}
          pageType={wireframeData.pageType}
        />;
      case 'pricing':
        return <PricingSection 
          section={section}
          onUpdate={handleUpdateSection}
          onReorder={handleReorderSection}
          onDelete={handleDeleteSection}
          editMode={editMode}
          pageName={wireframeData.pageName}
          pageType={wireframeData.pageType}
        />;
      case 'contact':
        return <ContactSection 
          section={section}
          onUpdate={handleUpdateSection}
          onReorder={handleReorderSection}
          onDelete={handleDeleteSection}
          editMode={editMode}
          pageName={wireframeData.pageName}
          pageType={wireframeData.pageType}
        />;
      case 'cta':
        return <CTASection 
          section={section}
          onUpdate={handleUpdateSection}
          onReorder={handleReorderSection}
          onDelete={handleDeleteSection}
          editMode={editMode}
          pageName={wireframeData.pageName}
          pageType={wireframeData.pageType}
        />;
      case 'footer':
        return <FooterSection 
          section={section}
          onUpdate={handleUpdateSection}
          onReorder={handleReorderSection}
          onDelete={handleDeleteSection}
          editMode={editMode}
          pageName={wireframeData.pageName}
          pageType={wireframeData.pageType}
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

  const renderSectionWithErrorHandling = (section: Section) => {
    return (
      <ErrorBoundary
        fallback={
          <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
            <h3 className="text-red-700 font-medium text-lg mb-2">Error rendering section</h3>
            <p className="text-red-600 text-sm mb-3">
              There was a problem displaying this {section.type} section
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => handleDeleteSection(section.id)}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Remove Section
              </button>
              <button
                onClick={() => handleRegenerateSection(section)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Try Regenerating
              </button>
            </div>
          </div>
        }
      >
        {renderSection(section)}
      </ErrorBoundary>
    );
  };

  const handleRegenerateSection = async (section: Section) => {
    try {
      const response = await fetch('/api/regenerate-section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section,
          pageName: wireframeData.pageName,
          pageType: wireframeData.pageType
        }),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('Error from regenerate-section API:', responseData.error);
        
        // If there's a fallback section provided, use it
        if (responseData.fallbackSection) {
          console.log('Using fallback section');
          handleUpdateSection(responseData.fallbackSection);
          return;
        }
        
        throw new Error(responseData.error || 'Failed to regenerate section');
      }

      handleUpdateSection(responseData);
    } catch (err) {
      console.error('Error regenerating section:', err);
      
      // Add a notification or toast here if you want to show the error to the user
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
            onClick={() => setShowPreview(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Preview
          </button>
          <button 
            onClick={handleExportJSON}
            className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition"
          >
            Export JSON
          </button>
          <button 
            onClick={() => setShowAIGenerator(true)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI Generate
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
              {renderSectionWithErrorHandling(section)}
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

      {showAIGenerator && (
        <AIWireframeGenerator
          onGenerate={handleGenerateAI}
          onCancel={() => setShowAIGenerator(false)}
        />
      )}

      {showPreview && (
        <PreviewMode
          wireframeData={wireframeData}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
} 