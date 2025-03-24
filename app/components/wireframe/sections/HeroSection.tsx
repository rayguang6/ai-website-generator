'use client';

import { HeroContent } from '@/app/types/wireframe';
import BaseSectionRenderer, { SectionRendererProps } from './BaseSectionRenderer';

export default function HeroSection(props: SectionRendererProps) {
  const { section, editMode } = props;
  const content = section.content as HeroContent;
  
  // Get layout type with fallback to 'centered'
  const layoutType = content?.layout || 'centered';
  
  // Render the appropriate hero layout based on the layout type
  const renderHeroLayout = () => {
    switch (layoutType) {
      case 'split':
        return (
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{content?.headline || 'Headline'}</h1>
              {content?.subheadline && (
                <p className="text-lg text-gray-600 mb-8">{content.subheadline}</p>
              )}
              
              {content?.cta && (
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg shadow-md hover:shadow-lg transition">
                  {content.cta.text || 'Call to Action'}
                </button>
              )}
            </div>
            <div className="w-full md:w-1/2 bg-gray-100 min-h-[300px] md:min-h-[500px] flex items-center justify-center">
              <div className="text-gray-400 p-4 text-center">
                {content?.backgroundImage ? `Image: ${content.backgroundImage}` : 'Hero Image'}
              </div>
            </div>
          </div>
        );
      
      case 'imageBg':
        return (
          <div className="relative min-h-[500px] flex items-center justify-center">
            {/* Background Image Container */}
            <div className="absolute inset-0 bg-blue-900 flex items-center justify-center">
              <div className="text-blue-200 text-opacity-50">
                {content?.backgroundImage ? `Image: ${content.backgroundImage}` : 'Background Image'}
              </div>
            </div>
            
            {/* Content Container */}
            <div className="relative z-10 max-w-3xl mx-auto p-8 text-center rounded-lg bg-white bg-opacity-95 shadow-xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{content?.headline || 'Headline'}</h1>
              {content?.subheadline && (
                <p className="text-xl text-gray-600 mb-8">{content.subheadline}</p>
              )}
              
              {content?.searchBar && (
                <div className="w-full max-w-2xl mx-auto mb-8">
                  <div className="relative shadow-lg">
                    <input
                      type="text"
                      placeholder={content.searchBar.placeholder || 'Search...'}
                      className="w-full p-4 pr-12 border border-gray-300 rounded-lg bg-white"
                      readOnly
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition">
                      Search
                    </button>
                  </div>
                </div>
              )}
              
              {content?.cta && (
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg shadow-md hover:shadow-lg transition mt-4">
                  {content.cta.text || 'Call to Action'}
                </button>
              )}
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Video Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              <div className="text-white text-opacity-50 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Background Video</span>
              </div>
            </div>
            
            {/* Content Container */}
            <div className="relative z-10 max-w-4xl mx-auto p-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">{content?.headline || 'Headline'}</h1>
              {content?.subheadline && (
                <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">{content.subheadline}</p>
              )}
              
              {content?.cta && (
                <button className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-900 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
                  {content.cta.text || 'Call to Action'}
                </button>
              )}
            </div>
          </div>
        );
      
      case 'minimal':
        return (
          <div className="py-16 px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{content?.headline || 'Headline'}</h1>
              {content?.subheadline && (
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">{content.subheadline}</p>
              )}
              
              {content?.cta && (
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition">
                  {content.cta.text || 'Call to Action'}
                </button>
              )}
            </div>
          </div>
        );
      
      case 'geometric':
        return (
          <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
            {/* Geometric shapes background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-500 opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-purple-500 opacity-20 transform translate-x-1/2"></div>
              <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-pink-500 opacity-20 transform translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <svg className="absolute w-full h-full text-white opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="0,0 100,0 50,100" />
                </svg>
              </div>
            </div>
            
            {/* Content Container */}
            <div className="relative z-10 max-w-4xl mx-auto p-8 text-center">
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 md:p-12 rounded-xl shadow-2xl border border-white border-opacity-20">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">{content?.headline || 'Headline'}</h1>
                {content?.subheadline && (
                  <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">{content.subheadline}</p>
                )}
                
                {content?.cta && (
                  <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 border border-white border-opacity-20">
                    {content.cta.text || 'Call to Action'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case 'gradient':
        return (
          <div className="min-h-[600px] relative overflow-hidden bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 animate-gradient-x"></div>
            </div>
            
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-none text-white drop-shadow-lg">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                    {content?.headline || 'Headline'}
                  </span>
                </h1>
                
                {content?.subheadline && (
                  <p className="text-xl md:text-2xl font-light text-white text-opacity-90 mb-10 max-w-3xl mx-auto">
                    {content.subheadline}
                  </p>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  {content?.cta && (
                    <button className="px-8 py-4 bg-white text-purple-700 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
                      {content.cta.text || 'Primary Action'}
                    </button>
                  )}
                  
                  <button className="px-8 py-4 bg-transparent hover:bg-white hover:bg-opacity-10 text-white border border-white border-opacity-50 rounded-full font-bold text-lg transition">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case '3d':
        return (
          <div className="relative min-h-[650px] overflow-hidden bg-gray-900">
            {/* 3D effect background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800">
              <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmZmZmMDUiPjwvcmVjdD4KPHBhdGggZD0iTTI4IDY2TDAgNTBMMCAxNkwyOCAwTDU2IDE2TDU2IDUwTDI4IDY2TDI4IDEwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmMTAiIHN0cm9rZS13aWR0aD0iMiI+PC9wYXRoPgo8cGF0aCBkPSJNMjggMEwyOCAzNEw1NiA1MEw1NiAxNkwyOCAwWiIgZmlsbD0iI2ZmZmZmZjA1IiBzdHJva2U9IiNmZmZmZmYxMCIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+Cjwvc3ZnPg==')]"></div>
              </div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-[650px] px-8 max-w-7xl mx-auto">
              <div className="lg:w-1/2 py-12 lg:py-0">
                <h1 className="text-4xl md:text-6xl font-black leading-tight text-white mb-6">
                  {content?.headline || 'Headline'}
                </h1>
                {content?.subheadline && (
                  <p className="text-xl text-blue-200 mb-10 max-w-xl">
                    {content.subheadline}
                  </p>
                )}
                
                {content?.cta && (
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <button className="relative px-8 py-4 bg-gray-900 rounded-lg leading-none font-medium text-lg text-white">
                      {content.cta.text || 'Call to Action'}
                    </button>
                  </div>
                )}
              </div>
              
              <div className="lg:w-1/2 flex justify-center mt-12 lg:mt-0">
                <div className="relative w-80 h-80 perspective-1000">
                  <div className="w-full h-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl transform rotate-12 rotateY-12"></div>
                  <div className="absolute top-4 left-4 w-full h-full bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl shadow-2xl"></div>
                  <div className="absolute top-8 left-8 w-full h-full bg-gray-800 rounded-2xl shadow-2xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'scroll':
        return (
          <div className="min-h-screen relative bg-white">
            {/* First section - Full height */}
            <div className="h-screen flex flex-col items-center justify-center text-center px-4 relative">
              <div className="max-w-4xl mx-auto z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  {content?.headline || 'Headline'}
                </h1>
                {content?.subheadline && (
                  <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">{content.subheadline}</p>
                )}
                
                {/* Scroll indicator */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                  <span className="text-gray-500 mb-2">Scroll Down</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
              
              {/* Background circle decoration */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 opacity-60"></div>
              </div>
            </div>
            
            {/* Second section with CTA - Shorter height */}
            <div className="min-h-[50vh] bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to get started?</h2>
                {content?.cta && (
                  <button className="px-8 py-4 bg-white text-blue-700 hover:bg-blue-50 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
                    {content.cta.text || 'Call to Action'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
        
      case 'interactive':
        return (
          <div className="relative min-h-[600px] bg-gray-900 flex items-center justify-center overflow-hidden">
            {/* Interactive background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-full h-full">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute w-full h-full">
                  <path fill="rgba(59, 130, 246, 0.2)" d="M0,0 L100,0 L100,20 C75,40 25,40 0,20 Z"></path>
                  <path fill="rgba(139, 92, 246, 0.15)" d="M0,20 C25,40 75,40 100,20 L100,40 C75,60 25,60 0,40 Z"></path>
                  <path fill="rgba(236, 72, 153, 0.1)" d="M0,40 C25,60 75,60 100,40 L100,60 C75,80 25,80 0,60 Z"></path>
                  <path fill="rgba(59, 130, 246, 0.05)" d="M0,60 C25,80 75,80 100,60 L100,80 C75,100 25,100 0,80 Z"></path>
                  <path fill="rgba(139, 92, 246, 0.025)" d="M0,80 C25,100 75,100 100,80 L100,100 L0,100 Z"></path>
                </svg>
              </div>
            </div>
            
            <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4 py-16">
              <div className="md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white">
                  {content?.headline || 'Headline'}
                </h1>
                {content?.subheadline && (
                  <p className="text-xl text-blue-200 mb-8 max-w-xl">{content.subheadline}</p>
                )}
                
                {content?.cta && (
                  <div className="mt-8 flex flex-wrap gap-4">
                    <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 relative overflow-hidden group">
                      <span className="relative z-10">{content.cta.text || 'Get Started'}</span>
                      <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                    </button>
                    <button className="px-8 py-4 bg-transparent hover:bg-white/5 text-white border border-white/20 rounded-lg font-bold text-lg transition">
                      Learn More
                    </button>
                  </div>
                )}
              </div>
              
              <div className="md:w-1/2">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-6 opacity-20"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl transform -rotate-3 opacity-40"></div>
                  <div className="relative h-full w-full bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8 flex items-center justify-center">
                    <div className="text-gray-500 text-lg">Interactive Demo</div>
                    
                    {/* Interactive dots */}
                    <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="absolute top-4 left-10 w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="absolute top-4 left-16 w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default: // 'centered' layout (default)
        return (
          <div className={`p-6 ${!editMode ? 'min-h-[500px]' : 'min-h-[300px]'} bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center text-center relative overflow-hidden`}>
            {content?.backgroundImage && (
              <div className="absolute inset-0 opacity-10 bg-gray-400 flex items-center justify-center text-gray-500 text-sm">
                Background Image Placeholder
              </div>
            )}
            
            <div className="relative z-10 max-w-4xl mx-auto px-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{content?.headline || 'Headline'}</h1>
              {content?.subheadline && (
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{content.subheadline}</p>
              )}
              
              {content?.searchBar && (
                <div className="w-full max-w-2xl mx-auto mb-8">
                  <div className="relative shadow-lg">
                    <input
                      type="text"
                      placeholder={content.searchBar.placeholder || 'Search...'}
                      className="w-full p-4 pr-12 border border-gray-300 rounded-lg bg-white"
                      readOnly
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition">
                      Search
                    </button>
                  </div>
                  {content.searchBar.filters && content.searchBar.filters.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 justify-center">
                      {content.searchBar.filters.map((filter, index) => (
                        <div key={index} className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm shadow-sm hover:shadow transition cursor-pointer">
                          {filter}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {content?.cta && (
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
                  {content.cta.text || 'Call to Action'}
                </button>
              )}
            </div>
          </div>
        );
    }
  };
  
  return (
    <BaseSectionRenderer {...props}>
      {renderHeroLayout()}
    </BaseSectionRenderer>
  );
} 