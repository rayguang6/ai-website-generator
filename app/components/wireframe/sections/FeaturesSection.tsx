'use client';

import { FeaturesContent } from '@/app/types/wireframe';
import BaseSectionRenderer, { SectionRendererProps } from './BaseSectionRenderer';

export default function FeaturesSection(props: SectionRendererProps) {
  const { section } = props;
  const content = section.content as FeaturesContent;
  
  return (
    <BaseSectionRenderer {...props}>
      <div className="p-6">
        {(content.heading || content.subheading) && (
          <div className="text-center mb-10">
            {content.heading && (
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.heading}</h2>
            )}
            {content.subheading && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.subheading}</p>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-100">
              {feature.icon && (
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                  {feature.icon}
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </BaseSectionRenderer>
  );
} 