'use client';

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Wireframe, Section } from '@/app/types/wireframe';
import SectionRenderer from './SectionRenderer';
import SectionSelector from './SectionSelector';
import SectionLayoutSelector from './SectionLayoutSelector';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PreviewMode from './PreviewMode';

interface WireframeEditorProps {
  initialWireframe: Wireframe;
  onWireframeChange: (wireframe: Wireframe) => void;
  onPreviewClick?: () => void;
}

// Layout options for each section type
const layoutOptions = {
  navigation: ["standard", "centered", "minimal", "transparent", "fullwidth", "bordered", "dropdown", "glassmorphic", "hamburger", "sidebar", "floating", "gradient"],
  hero: ["centered", "split", "imageBg", "video", "minimal", "animated", "parallax", "slideshow", "3d", "geometric", "gradient", "interactive", "scroll"],
  features: ["grid", "horizontal", "vertical", "imageCards", "sideImage", "alternating", "carousel", "tabbed", "timeline", "interactive", "accordion", "masonry", "iconGrid"],
  testimonials: ["grid", "carousel", "masonry", "minimal", "cards", "quote", "timeline", "slider", "bubbles", "spotlight", "video", "avatars", "magazine"],
  pricing: ["standard", "horizontal", "compact", "toggle", "cards", "comparison", "tiered", "minimalist", "feature-focused", "interactive", "pricing-slider", "pricing-floating", "subscription"],
  contact: ["standard", "split", "minimal", "fullwidth", "boxed", "map", "contact-floating", "sidebar", "interactive", "stepper", "modern", "card", "integrated"],
  cta: ["standard", "banner", "full", "popup", "floating", "side", "animated", "notification", "cta-gradient", "cta-interactive", "cta-timeline", "sticky", "overlay"],
  footer: ["standard", "simple", "compact", "centered", "multicolumn", "dark", "minimal", "logo", "newsletter", "social", "app", "contact", "gradient"]
};

export default function WireframeEditor({
  initialWireframe,
  onWireframeChange,
  onPreviewClick
}: WireframeEditorProps) {
  const [wireframe, setWireframe] = useState<Wireframe>(initialWireframe);
  const [layoutEditSection, setLayoutEditSection] = useState<Section | null>(null);
  const [showLayoutSelector, setShowLayoutSelector] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    wireframe.sections.length > 0 ? wireframe.sections[0].id : null
  );
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  
  // Create refs for scrolling to sections
  const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  useEffect(() => {
    setWireframe(initialWireframe);
  }, [initialWireframe]);

  useEffect(() => {
    // If sections change and active section is removed, select the first available section
    if (activeSectionId && !wireframe.sections.some(section => section.id === activeSectionId)) {
      setActiveSectionId(wireframe.sections.length > 0 ? wireframe.sections[0].id : null);
    }
  }, [wireframe.sections, activeSectionId]);

  // Scroll to active section when it changes
  useEffect(() => {
    if (activeSectionId && sectionRefs.current[activeSectionId]) {
      sectionRefs.current[activeSectionId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [activeSectionId]);

  const handleAddSection = (section: Section) => {
    setWireframe((prev: Wireframe) => ({
      ...prev,
      sections: [...prev.sections, section]
    }));
    setActiveSectionId(section.id);
  };

  const handleUpdateSection = (updatedSection: Section) => {
    setWireframe((prev: Wireframe) => ({
      ...prev,
      sections: prev.sections.map((section: Section) =>
        section.id === updatedSection.id ? updatedSection : section
      )
    }));
  };

  const handleDeleteSection = (sectionId: string) => {
    // If deleting active section, select the previous section or the first one
    if (activeSectionId === sectionId) {
      const currentIndex = wireframe.sections.findIndex(section => section.id === sectionId);
      const newIndex = currentIndex > 0 ? currentIndex - 1 : (wireframe.sections.length > 1 ? 0 : null);
      setActiveSectionId(newIndex !== null ? wireframe.sections[newIndex]?.id || null : null);
    }

    setWireframe((prev: Wireframe) => ({
      ...prev,
      sections: prev.sections.filter((section: Section) => section.id !== sectionId)
    }));
  };

  const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
    setWireframe((prev: Wireframe) => {
      const sections = [...prev.sections];
      const index = sections.findIndex((section: Section) => section.id === sectionId);
      
      if (index === -1) return prev;
      
      if (direction === 'up' && index > 0) {
        // Move section up
        [sections[index], sections[index - 1]] = [sections[index - 1], sections[index]];
      } else if (direction === 'down' && index < sections.length - 1) {
        // Move section down
        [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
      }
      
      return {
        ...prev,
        sections
      };
    });
  };

  const handleLayoutChange = (updatedSection: Section) => {
    handleUpdateSection(updatedSection);
    setShowLayoutSelector(false);
  };

  const handleEditLayoutClick = (section: Section) => {
    setLayoutEditSection(section);
    setShowLayoutSelector(true);
    setActiveSectionId(section.id);
  };

  const handleCloseLayoutSelector = () => {
    setShowLayoutSelector(false);
    setLayoutEditSection(null);
  };

  // Icon mapping for section types
  const sectionIcons: Record<string, React.ReactNode> = {
    navigation: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
      </svg>
    ),
    hero: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM11 7h2v10h-2V7z"></path>
      </svg>
    ),
    features: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 6h4v4H4V6zm6 0h10v4H10V6zM4 14h4v4H4v-4zm6 0h10v4H10v-4z"></path>
      </svg>
    ),
    testimonials: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h-2v-2c0-2.209-3.582-4-8-4s-8 1.791-8 4v2H0v-2c0-4.418 5.373-8 12-8s12 3.582 12 8v2z"></path>
      </svg>
    ),
    pricing: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path>
      </svg>
    ),
    contact: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
      </svg>
    ),
    cta: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zM8.5 15H10V9H7v1.5h1.5zm4.5 0h1.5V9H12v1.5h1.5V12H12v1.5h1.5zm-8-10C3.67 5 3 5.67 3 6.5S3.67 8 4.5 8 6 7.33 6 6.5 5.33 5 4.5 5z"></path>
      </svg>
    ),
    footer: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 17h18v2H3zm0-7h18v5H3zm0-4h18v2H3z"></path>
      </svg>
    )
  };

  // Function to get a random layout different from the current one
  const getRandomLayout = (sectionType: string, currentLayout: string) => {
    const sectionLayoutOptions = layoutOptions[sectionType as keyof typeof layoutOptions] || ["standard"];
    
    // Filter out the current layout
    const availableLayouts = sectionLayoutOptions.filter(layout => layout !== currentLayout);
    
    if (availableLayouts.length === 0) {
      return currentLayout; // No other options available
    }
    
    // Get a random layout from the available options
    const randomIndex = Math.floor(Math.random() * availableLayouts.length);
    return availableLayouts[randomIndex];
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {isPreviewMode ? (
        <div className="preview-mode">
          <div className="sticky top-0 z-50 bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
            <h2 className="text-xl font-semibold">Preview</h2>
            <button
              onClick={() => setIsPreviewMode(false)}
              className="px-4 py-2 bg-white text-blue-700 rounded hover:bg-blue-50 transition-colors"
            >
              Exit Preview
            </button>
          </div>
          <div className="pt-2">
            {wireframe.sections.map((section) => (
              <div key={section.id}>
                <SectionRenderer
                  section={section}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="wireframe-editor">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{wireframe.name || 'Wireframe'}</h1>
            
            <div className="flex gap-2">
              <button
                onClick={() => setIsPreviewMode(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              >
                Preview
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left sidebar - Section list and selector */}
            <div className="w-full md:w-64 flex-shrink-0">
              <SectionSelector 
                onAddSection={handleAddSection}
                wireframe={wireframe}
              />
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Sections</h3>
                <div className="border rounded-lg overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {wireframe.sections.map((section: Section, index: number) => (
                      <li 
                        key={section.id} 
                        className={`hover:bg-gray-50 ${section.id === activeSectionId ? 'bg-blue-50' : ''}`}
                      >
                        <button
                          onClick={() => setActiveSectionId(section.id)}
                          className="w-full px-3 py-3 flex items-center justify-between text-left"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${section.id === activeSectionId ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                              {sectionIcons[section.type] || `${index + 1}`}
                            </div>
                            <div>
                              <span className="font-medium capitalize block">{section.type}</span>
                              <span className="text-xs text-gray-500 block">{section.content.layout || 'standard'}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {index > 0 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveSection(section.id, 'up');
                                }}
                                className="p-1 text-gray-400 hover:text-gray-600"
                                title="Move up"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                              </button>
                            )}
                            {index < wireframe.sections.length - 1 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveSection(section.id, 'down');
                                }}
                                className="p-1 text-gray-400 hover:text-gray-600"
                                title="Move down"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Right side - Complete website with all sections */}
            <div className="flex-1 overflow-auto">
              {wireframe.sections.length > 0 ? (
                <div className="space-y-8">
                  {wireframe.sections.map((section) => (
                    <div 
                      key={`${section.id}-${section.content.layout}`} 
                      ref={(el) => { sectionRefs.current[section.id] = el; }}
                      className={`relative border ${section.id === activeSectionId ? 'border-blue-400 shadow-md' : 'border-gray-200'} rounded-lg overflow-hidden transition-all duration-200`}
                    >
                      {/* Section header with controls */}
                      <div className="sticky top-0 z-20 w-full bg-white bg-opacity-95 backdrop-blur-sm border-b flex justify-between items-center py-2 px-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${section.id === activeSectionId ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                            {sectionIcons[section.type]}
                          </div>
                          <div>
                            <span className="font-medium capitalize">{section.type}</span>
                            <span className="text-xs text-gray-500 ml-2">{section.content.layout}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              const randomLayout = getRandomLayout(section.type, section.content.layout);
                              handleUpdateSection({
                                ...section,
                                content: {
                                  ...section.content,
                                  layout: randomLayout
                                }
                              });
                            }}
                            className="p-1 text-gray-400 hover:text-purple-600 hover:bg-gray-100 rounded"
                            title="Change layout"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const index = wireframe.sections.findIndex(s => s.id === section.id);
                              if (index > 0) handleMoveSection(section.id, 'up');
                            }}
                            className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded"
                            disabled={wireframe.sections.indexOf(section) === 0}
                            title="Move up"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const index = wireframe.sections.findIndex(s => s.id === section.id);
                              if (index < wireframe.sections.length - 1) handleMoveSection(section.id, 'down');
                            }}
                            className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded"
                            disabled={wireframe.sections.indexOf(section) === wireframe.sections.length - 1}
                            title="Move down"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          <button
                            onClick={() => handleEditLayoutClick(section)}
                            className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded"
                            title="Edit layout"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm10 0a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
                            </svg>
                          </button>
                          
                          <button
                            onClick={() => handleDeleteSection(section.id)}
                            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                            title="Delete section"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Section content */}
                      <div>
                        <SectionRenderer
                          section={section}
                          onEdit={handleUpdateSection}
                          onDelete={handleDeleteSection}
                        />
                      </div>
                      
                      {/* Layout selector (conditionally rendered) */}
                      {showLayoutSelector && layoutEditSection && layoutEditSection.id === section.id && (
                        <SectionLayoutSelector
                          section={section}
                          onLayoutChange={handleLayoutChange}
                          onClose={handleCloseLayoutSelector}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500">No sections added yet. Use the section selector to add sections to your wireframe.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DndProvider>
  );
} 