'use client';

import React from 'react';
import { CTAContent } from '@/app/types/wireframe';
import BaseSectionRenderer, { SectionRendererProps } from './BaseSectionRenderer';

export default function CTASection(props: SectionRendererProps) {
  const { section } = props;
  const content = section.content as CTAContent;
  
  // Get layout type with fallback to 'standard'
  const layoutType = content?.layout || 'standard';
  
  // Render the appropriate CTA layout based on the layout type
  const renderCTALayout = () => {
    switch (layoutType) {
      case 'banner':
        return (
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-8 px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white">{content.heading}</h3>
                {content.subheading && (
                  <p className="text-blue-100 mt-2 text-lg max-w-xl">{content.subheading}</p>
                )}
              </div>
              <button className="px-8 py-3 bg-white text-blue-700 hover:bg-blue-50 rounded-md font-semibold shadow-md transition transform hover:-translate-y-0.5">
                {content.buttonText}
              </button>
            </div>
          </div>
        );
      
      case 'full':
        return (
          <div className="relative py-24 px-6 overflow-hidden">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700">
              {content.backgroundImage && (
                <div className="absolute inset-0 bg-blue-900 bg-opacity-60 flex items-center justify-center">
                  <span className="text-white text-opacity-20 text-xl">
                    Background: {content.backgroundImage}
                  </span>
                </div>
              )}
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-white"></div>
                <div className="absolute top-[60%] -right-[5%] w-[30%] h-[30%] rounded-full bg-white"></div>
                <div className="absolute top-[40%] left-[20%] w-[15%] h-[15%] rounded-full bg-white"></div>
              </div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{content.heading}</h2>
              {content.subheading && (
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">{content.subheading}</p>
              )}
              <button className="px-10 py-4 bg-white text-blue-700 hover:bg-blue-50 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                {content.buttonText}
              </button>
            </div>
          </div>
        );
        
      case 'popup':
        return (
          <div className="max-w-5xl mx-auto p-6 relative">
            <div className="p-8 md:p-12 bg-white rounded-2xl shadow-2xl border border-gray-200 relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 transform rotate-45 translate-x-8 -translate-y-8"></div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="md:w-3/4">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{content.heading}</h2>
                  {content.subheading && (
                    <p className="text-lg text-gray-600 mb-6">{content.subheading}</p>
                  )}
                </div>
                <div className="md:w-1/4 flex justify-center">
                  <button className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md transform transition hover:-translate-y-0.5">
                    {content.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'floating':
        return (
          <div className="relative max-w-6xl mx-auto px-4 py-16">
            {/* Main content area */}
            <div className="bg-gray-100 rounded-lg p-8 md:p-10">
              <div className="h-40 flex items-center justify-center bg-gray-200 rounded mb-4">
                <span className="text-gray-500">Content Area</span>
              </div>
            </div>
            
            {/* Floating CTA */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 w-full max-w-3xl">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl p-6 md:p-8 mx-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-semibold text-white">{content.heading}</h3>
                    {content.subheading && (
                      <p className="text-blue-100 mt-1">{content.subheading}</p>
                    )}
                  </div>
                  <button className="px-6 py-2 bg-white text-blue-700 hover:bg-blue-50 rounded-md font-medium shadow-md transition">
                    {content.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'side':
        return (
          <div className="max-w-6xl mx-auto p-4">
            <div className="flex flex-col md:flex-row bg-gradient-to-r from-purple-700 to-indigo-800 rounded-xl overflow-hidden shadow-lg">
              {/* Image/placeholder side */}
              <div className="md:w-1/2 bg-indigo-900 p-8 flex items-center justify-center">
                <div className="text-indigo-300 text-center">
                  {content.backgroundImage ? 
                    <div>
                      <span className="block text-xl mb-2">Image:</span>
                      <span>{content.backgroundImage}</span>
                    </div> : 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                </div>
              </div>
              
              {/* Content side */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{content.heading}</h2>
                {content.subheading && (
                  <p className="text-lg text-indigo-100 mb-8">{content.subheading}</p>
                )}
                <button className="px-8 py-3 bg-white text-indigo-700 hover:bg-indigo-50 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition">
                  {content.buttonText}
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'animated':
        return (
          <div className="max-w-6xl mx-auto p-4">
            <div className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg p-8 md:p-12 shadow-lg relative overflow-hidden">
              {/* Animated elements (simulated with static elements) */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute w-24 h-24 rounded-full bg-white opacity-10 top-[10%] left-[5%]"></div>
                <div className="absolute w-32 h-32 rounded-full bg-white opacity-10 top-[50%] left-[20%]"></div>
                <div className="absolute w-20 h-20 rounded-full bg-white opacity-10 top-[20%] right-[10%]"></div>
                <div className="absolute w-16 h-16 rounded-full bg-white opacity-10 bottom-[10%] right-[20%]"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.heading}</h2>
                {content.subheading && (
                  <p className="text-lg md:text-xl text-white text-opacity-90 mb-8 max-w-2xl mx-auto">{content.subheading}</p>
                )}
                <div className="inline-block animate-bounce">
                  <button className="px-8 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition">
                    {content.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'notification':
        return (
          <div className="max-w-md mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-blue-600 h-2"></div>
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{content.heading}</h3>
                    {content.subheading && (
                      <p className="text-gray-600 mt-1">{content.subheading}</p>
                    )}
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-sm transition">
                  {content.buttonText}
                </button>
              </div>
            </div>
          </div>
        );
      
      default: // 'standard' layout (default)
        return (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12 border border-gray-200">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{content.heading}</h2>
              {content.subheading && (
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{content.subheading}</p>
              )}
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium shadow-md hover:shadow-lg transition">
                {content.buttonText}
              </button>
            </div>
          </div>
        );
    }
  };
  
  return (
    <BaseSectionRenderer {...props}>
      {renderCTALayout()}
    </BaseSectionRenderer>
  );
} 