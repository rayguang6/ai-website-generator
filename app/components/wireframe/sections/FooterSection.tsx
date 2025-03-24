'use client';

import React from 'react';
import { FooterContent } from '@/app/types/wireframe';
import BaseSectionRenderer, { SectionRendererProps } from './BaseSectionRenderer';

export default function FooterSection(props: SectionRendererProps) {
  const { section } = props;
  const content = section.content as FooterContent;
  
  // Ensure arrays exist
  const menuGroups = Array.isArray(content?.menuGroups) ? content.menuGroups : [];
  const socialLinks = Array.isArray(content?.socialLinks) ? content.socialLinks : [];
  
  // Get layout type with fallback to 'standard'
  const layoutType = content?.layout || 'standard';
  
  // Common social icons
  const socialIconMap: Record<string, React.ReactNode> = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.057 10.057 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm5-7.5a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" clipRule="evenodd" />
        <path d="M9.75 15.02V8.48l6.35 3.27-6.35 3.27z" />
      </svg>
    ),
  };

  // Render a social icon or fallback to generic icon
  const renderSocialIcon = (name: string) => {
    if (socialIconMap[name.toLowerCase()]) {
      return socialIconMap[name.toLowerCase()];
    }
    
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    );
  };
  
  // Render the appropriate footer layout based on the layout type
  const renderFooterLayout = () => {
    switch (layoutType) {
      case 'simple':
        return (
          <footer className="bg-gray-800 text-gray-300">
            <div className="max-w-6xl mx-auto py-8 px-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-6 md:mb-0">
                  {content?.logo && (
                    <div className="text-white font-bold text-xl mb-2">{content.logo}</div>
                  )}
                  {content?.tagline && (
                    <p className="text-gray-400 text-sm">{content.tagline}</p>
                  )}
                </div>
                
                {menuGroups.length > 0 && menuGroups[0]?.items && (
                  <div className="flex flex-wrap gap-x-8 gap-y-2 mb-6 md:mb-0">
                    {Array.isArray(menuGroups[0].items) && menuGroups[0].items.map((item, idx) => (
                      <a key={idx} href="#" className="text-gray-400 hover:text-white text-sm transition">
                        {typeof item === 'string' ? item : item.name}
                      </a>
                    ))}
                  </div>
                )}
                
                {socialLinks.length > 0 && (
                  <div className="flex space-x-4">
                    {socialLinks.map((link, index) => (
                      <a 
                        key={index} 
                        href="#" 
                        className="text-gray-400 hover:text-white h-8 w-8 rounded-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition"
                      >
                        {renderSocialIcon(link)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              {content?.copyright && (
                <div className="border-t border-gray-700 mt-6 pt-6 text-center md:text-left text-gray-400 text-sm">
                  {content.copyright}
                </div>
              )}
            </div>
          </footer>
        );
      
      case 'compact':
        return (
          <footer className="bg-gray-800 text-gray-300">
            <div className="max-w-6xl mx-auto py-6 px-4">
              <div className="flex flex-col items-center text-center">
                {content?.logo && (
                  <div className="text-white font-bold text-lg mb-2">{content.logo}</div>
                )}
                
                {socialLinks.length > 0 && (
                  <div className="flex space-x-4 mb-4">
                    {socialLinks.map((link, index) => (
                      <a 
                        key={index} 
                        href="#" 
                        className="text-gray-400 hover:text-white h-7 w-7 rounded-full flex items-center justify-center hover:bg-gray-700 transition"
                      >
                        {renderSocialIcon(link)}
                      </a>
                    ))}
                  </div>
                )}
                
                {menuGroups.length > 0 && menuGroups[0]?.items && (
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4 max-w-xl">
                    {Array.isArray(menuGroups[0].items) && menuGroups[0].items.map((item, idx) => (
                      <a key={idx} href="#" className="text-gray-400 hover:text-white text-xs transition">
                        {typeof item === 'string' ? item : item.name}
                      </a>
                    ))}
                  </div>
                )}
                
                {content?.copyright && (
                  <div className="text-gray-500 text-xs">
                    {content.copyright}
                  </div>
                )}
              </div>
            </div>
          </footer>
        );
      
      case 'centered':
        return (
          <footer className="bg-gray-800 text-gray-300">
            <div className="max-w-5xl mx-auto py-16 px-4 text-center">
              {content?.logo && (
                <div className="text-white font-bold text-2xl mb-6">{content.logo}</div>
              )}
              
              {content?.tagline && (
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{content.tagline}</p>
              )}
              
              {menuGroups.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-8 text-left max-w-4xl mx-auto mb-12">
                  {menuGroups.map((group, index) => (
                    <div key={index}>
                      <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">{group.title}</h3>
                      <ul className="space-y-3">
                        {Array.isArray(group.items) ? group.items.map((item, idx) => (
                          <li key={idx}>
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                              {typeof item === 'string' ? item : item.name}
                            </a>
                          </li>
                        )) : null}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              
              {socialLinks.length > 0 && (
                <div className="flex justify-center space-x-6 mb-8">
                  {socialLinks.map((link, index) => (
                    <a 
                      key={index} 
                      href="#" 
                      className="text-gray-400 hover:text-white h-10 w-10 rounded-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition"
                    >
                      {renderSocialIcon(link)}
                    </a>
                  ))}
                </div>
              )}
              
              {content?.copyright && (
                <div className="text-gray-400 text-sm border-t border-gray-700 pt-8 max-w-3xl mx-auto">
                  {content.copyright}
                </div>
              )}
            </div>
          </footer>
        );
      
      default: // 'standard' layout (default)
        return (
          <footer className="bg-gray-800 text-gray-300">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 xl:col-span-3">
                <div className="md:col-span-1">
                  {content?.logo && (
                    <div className="text-white font-bold text-xl mb-4">{content.logo}</div>
                  )}
                  {content?.tagline && (
                    <p className="text-gray-400 mb-6 text-sm">{content.tagline}</p>
                  )}
                  {socialLinks.length > 0 && (
                    <div className="flex space-x-4">
                      {socialLinks.map((link, index) => (
                        <a 
                          key={index} 
                          href="#" 
                          className="text-gray-400 hover:text-white h-8 w-8 rounded-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition"
                        >
                          {renderSocialIcon(link)}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                
                {menuGroups.map((group, index) => (
                  <div key={index} className="md:col-span-1">
                    <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">{group.title}</h3>
                    <ul className="space-y-3">
                      {Array.isArray(group.items) ? group.items.map((item, idx) => (
                        <li key={idx}>
                          <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                            {typeof item === 'string' ? item : item.name}
                          </a>
                        </li>
                      )) : null}
                    </ul>
                  </div>
                ))}
              </div>
              
              {content?.copyright && (
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                  {content.copyright}
                </div>
              )}
            </div>
          </footer>
        );
    }
  };
  
  return (
    <BaseSectionRenderer {...props}>
      {renderFooterLayout()}
    </BaseSectionRenderer>
  );
} 