'use client';

import { NavigationContent, Section } from '@/app/types/wireframe';
import BaseSectionRenderer, { SectionRendererProps } from './BaseSectionRenderer';
import React from 'react';

export default function NavigationSection(props: SectionRendererProps) {
  const { section } = props;
  const content = section.content as NavigationContent;
  
  // Ensure menuItems exists and is an array with proper format
  const menuItems = React.useMemo(() => {
    if (!Array.isArray(content?.menuItems)) {
      return [];
    }
    
    // Ensure each menu item is properly formatted
    return content.menuItems.map(item => {
      if (typeof item === 'string') {
        return item;
      }
      
      if (item && typeof item === 'object') {
        // If it's an object, ensure it has a name property
        if (typeof item.name === 'string') {
          return item;
        }
        
        // If the object doesn't have a valid name, try to convert it to string
        try {
          const itemName = String(item.name || 'Menu Item');
          return { name: itemName };
        } catch (e) {
          return { name: 'Menu Item' };
        }
      }
      
      // Fallback for invalid items
      return 'Menu Item';
    });
  }, [content?.menuItems]);
  
  // Get layout type with fallback to 'standard'
  const layoutType = content?.layout || 'standard';
  
  // Render the appropriate navigation layout based on the layout type
  const renderNavigationLayout = () => {
    switch (layoutType) {
      case 'centered':
        return (
          <div className="p-4 shadow-sm bg-white">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
              <div className="font-bold text-xl text-blue-800 mb-4">{content?.logo || 'Logo'}</div>
              
              <div className="flex items-center space-x-2 mb-2">
                {menuItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 cursor-pointer transition"
                  >
                    {typeof item === 'string' ? item : item.name}
                  </div>
                ))}
              </div>
              
              {content?.cta && (
                <div className="mt-2">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition">
                    {content.cta}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'minimal':
        return (
          <div className="p-3 border-b border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="font-bold text-lg text-gray-800">{content?.logo || 'Logo'}</div>
              
              <div className="flex items-center space-x-6">
                {menuItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition"
                  >
                    {typeof item === 'string' ? item : item.name}
                  </div>
                ))}
                
                {content?.cta && (
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition">
                    {content.cta}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'transparent':
        return (
          <div className="p-4 absolute top-0 left-0 right-0 z-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="font-bold text-xl text-white">{content?.logo || 'Logo'}</div>
              
              {/* Mobile menu button - only shown on small screens */}
              <button className="md:hidden p-2 rounded-md bg-white bg-opacity-20 hover:bg-opacity-30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="hidden md:flex space-x-1">
                {menuItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="px-3 py-2 rounded hover:bg-white hover:bg-opacity-10 text-white cursor-pointer transition"
                  >
                    {typeof item === 'string' ? item : item.name}
                  </div>
                ))}
              </div>
              
              {content?.cta && (
                <div className="hidden md:block">
                  <button className="px-4 py-2 bg-white text-blue-800 hover:bg-opacity-90 font-medium rounded-md transition">
                    {content.cta}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      
      default: // 'standard' layout (default)
        return (
          <div className="p-4 shadow-sm bg-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="font-bold text-xl text-blue-800">{content?.logo || 'Logo'}</div>
              
              {/* Mobile menu button - only shown on small screens */}
              <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="hidden md:flex space-x-1">
                {menuItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700 cursor-pointer transition"
                  >
                    {typeof item === 'string' ? item : item.name}
                  </div>
                ))}
              </div>
              
              {content?.cta && (
                <div className="hidden md:block">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition">
                    {content.cta}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
    }
  };
  
  return (
    <BaseSectionRenderer {...props}>
      {renderNavigationLayout()}
    </BaseSectionRenderer>
  );
} 