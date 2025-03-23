'use client';

import { NavigationContent, Section } from '@/app/types/wireframe';
import BaseSectionRenderer, { SectionRendererProps } from './BaseSectionRenderer';

export default function NavigationSection(props: SectionRendererProps) {
  const { section } = props;
  const content = section.content as NavigationContent;
  
  return (
    <BaseSectionRenderer {...props}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl">{content.logo}</div>
          <div className="hidden md:flex space-x-4">
            {Array.isArray(content.menuItems) && content.menuItems.map((item, index) => (
              <div key={index} className="text-gray-800 px-2 py-1 rounded bg-gray-100">
                {typeof item === 'string' ? item : item.name}
              </div>
            ))}
          </div>
          {content.cta && (
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded">
              {content.cta}
            </div>
          )}
        </div>
      </div>
    </BaseSectionRenderer>
  );
} 