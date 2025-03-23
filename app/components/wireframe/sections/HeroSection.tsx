'use client';

import { HeroContent } from '@/app/types/wireframe';
import BaseSectionRenderer, { SectionRendererProps } from './BaseSectionRenderer';

export default function HeroSection(props: SectionRendererProps) {
  const { section } = props;
  const content = section.content as HeroContent;
  
  return (
    <BaseSectionRenderer {...props}>
      <div className="p-6 min-h-[300px] bg-gray-50 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{content.headline}</h1>
        {content.subheadline && (
          <p className="text-xl text-gray-600 mb-6 max-w-2xl">{content.subheadline}</p>
        )}
        
        {content.searchBar && (
          <div className="w-full max-w-2xl mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder={content.searchBar.placeholder}
                className="w-full p-4 pr-12 border border-gray-300 rounded-lg"
                readOnly
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded">
                Search
              </button>
            </div>
            {content.searchBar.filters && content.searchBar.filters.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {content.searchBar.filters.map((filter, index) => (
                  <div key={index} className="px-3 py-1 bg-white border border-gray-300 rounded text-sm">
                    {filter}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {content.cta && (
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium">
            {content.cta.text}
          </button>
        )}
      </div>
    </BaseSectionRenderer>
  );
} 