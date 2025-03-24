'use client';

import React from 'react';
import { FeaturesContent } from '@/app/types/wireframe';
import BaseSectionRenderer, { SectionRendererProps } from './BaseSectionRenderer';

export default function FeaturesSection(props: SectionRendererProps) {
  const { section } = props;
  const content = section.content as FeaturesContent;
  
  // Common icons that can be used
  const iconMap: Record<string, React.ReactNode> = {
    'dollar-sign': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'check-circle': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'headphones': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    'shield': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    'speed': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    'star': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  };

  // Render an icon from our map or just display the icon name
  const renderIcon = (iconName: string | undefined) => {
    if (!iconName) return null;
    return iconMap[iconName] || <span className="text-sm">{iconName}</span>;
  };

  // Ensure that features exists and is an array before rendering
  const features = Array.isArray(content?.features) ? content.features : [];
  
  // Get layout type with fallback to 'grid'
  const layoutType = content?.layout || 'grid';
  
  // Render the appropriate features layout based on the layout type
  const renderFeaturesLayout = () => {
    if (features.length === 0) {
      return (
        <div className="p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-500">No features available</p>
        </div>
      );
    }

    switch (layoutType) {
      case 'horizontal':
        return (
          <div className="max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-center md:items-start gap-8 p-6 mb-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {feature.image && (
                  <div className="w-full md:w-1/3 bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[200px] mb-4 md:mb-0">
                    <div className="text-gray-400">Image: {feature.image}</div>
                  </div>
                )}
                <div className={`w-full ${feature.image ? 'md:w-2/3' : ''} flex flex-col`}>
                  <div className="flex items-center mb-3">
                    {feature.icon && (
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
                        {renderIcon(feature.icon)}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'vertical':
        return (
          <div className="max-w-3xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="border-b border-gray-200 last:border-0 py-8 first:pt-0"
              >
                {feature.image && (
                  <div className="w-full bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[200px] mb-6">
                    <div className="text-gray-400">Image: {feature.image}</div>
                  </div>
                )}
                <div className="flex items-start">
                  {feature.icon && (
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4 mt-1">
                      {renderIcon(feature.icon)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'imageCards':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition overflow-hidden bg-white"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                  {feature.image ? (
                    <div className="text-gray-400 text-center">Image: {feature.image}</div>
                  ) : feature.icon ? (
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      {renderIcon(feature.icon)}
                    </div>
                  ) : (
                    <div className="text-gray-400">No image</div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'sideImage':
        return (
          <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-12">
            <div className="w-full lg:w-1/2 bg-gray-100 rounded-lg min-h-[400px] flex items-center justify-center">
              <div className="text-gray-400">Main Section Image</div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex">
                    {feature.icon && (
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4 mt-1">
                        {renderIcon(feature.icon)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'timeline':
        return (
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform md:translate-x-px"></div>
            
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row md:items-center mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-5 w-4 h-4 rounded-full bg-blue-500 border-4 border-blue-50 transform -translate-x-1.5 md:-translate-x-2 z-10"></div>
                
                {/* Content */}
                <div className={`w-full md:w-5/12 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}>
                  <div className="p-5 rounded-lg shadow-lg border border-gray-100 bg-white">
                    <div className="mb-2 text-blue-500 font-bold">Step {index + 1}</div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
                
                {/* Image or Icon */}
                <div className="hidden md:block w-1/12"></div>
                
                <div className="hidden md:flex md:w-5/12 h-40 items-center justify-center">
                  {feature.image ? (
                    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">Image: {feature.image}</span>
                    </div>
                  ) : feature.icon ? (
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      {renderIcon(feature.icon)}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        );

      case 'interactive':
        return (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white border border-gray-100"
                >
                  {/* Top decoration */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  
                  <div className="p-6 pb-20">
                    {feature.icon && (
                      <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                        {renderIcon(feature.icon)}
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                  
                  {/* Learn more overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-16 flex items-end">
                    <div className="w-full p-4 flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-600">Learn More</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'accordion':
        return (
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                >
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer p-5 bg-white hover:bg-gray-50">
                      <div className="flex items-center">
                        {feature.icon && (
                          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 mr-4">
                            {renderIcon(feature.icon)}
                          </div>
                        )}
                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-5 pt-0 border-t border-gray-100">
                      <p className="text-gray-600">{feature.description}</p>
                      {feature.image && (
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400">Image: {feature.image}</span>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        );

      case 'masonry':
        // A variable to track which features get different heights
        const isTall = (index: number) => [0, 3, 4, 7].includes(index % 8);
        
        return (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white ${isTall(index) ? 'sm:row-span-2' : ''}`}
                >
                  {(feature.image || isTall(index)) && (
                    <div className={`bg-gradient-to-br ${index % 3 === 0 ? 'from-blue-400 to-blue-600' : index % 3 === 1 ? 'from-purple-400 to-purple-600' : 'from-pink-400 to-pink-600'} ${isTall(index) ? 'h-60' : 'h-40'} flex items-center justify-center text-white`}>
                      {feature.image ? (
                        <span>Image: {feature.image}</span>
                      ) : (
                        feature.icon && renderIcon(feature.icon)
                      )}
                    </div>
                  )}
                  <div className="p-5">
                    {!feature.image && feature.icon && !isTall(index) && (
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                        {renderIcon(feature.icon)}
                      </div>
                    )}
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'iconGrid':
        return (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 p-2">
              {features.map((feature, index) => {
                // Create a color based on index to vary the icon colors
                const colors = [
                  {bg: 'bg-blue-100', text: 'text-blue-600'},
                  {bg: 'bg-purple-100', text: 'text-purple-600'},
                  {bg: 'bg-green-100', text: 'text-green-600'},
                  {bg: 'bg-rose-100', text: 'text-rose-600'},
                  {bg: 'bg-amber-100', text: 'text-amber-600'},
                  {bg: 'bg-cyan-100', text: 'text-cyan-600'},
                ];
                const colorSet = colors[index % colors.length];
                
                return (
                  <div 
                    key={index} 
                    className="flex flex-col items-center text-center p-4 hover:bg-gray-50 rounded-lg transition group"
                  >
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full ${colorSet.bg} ${colorSet.text} mb-4 group-hover:scale-110 transition-transform`}>
                      {feature.icon ? renderIcon(feature.icon) : 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      }
                    </div>
                    <h3 className="text-md font-bold mb-1 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
        
      default: // 'grid' layout (default)
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-6 rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition group relative bg-white"
              >
                {feature.icon && (
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-5 group-hover:bg-blue-200 transition-colors">
                    {renderIcon(feature.icon)}
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
                {feature.image && (
                  <div className="mt-4 p-2 border border-gray-200 rounded bg-gray-50 text-xs text-gray-400 text-center w-full">
                    Image: {feature.image}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
    }
  };
  
  return (
    <BaseSectionRenderer {...props}>
      <div className="p-8 bg-white">
        {(content?.heading || content?.subheading) && (
          <div className="text-center mb-12">
            {content.heading && (
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.heading}</h2>
            )}
            {content.subheading && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.subheading}</p>
            )}
          </div>
        )}
        
        {renderFeaturesLayout()}
      </div>
    </BaseSectionRenderer>
  );
} 