'use client';

import { FooterContent } from '@/app/types/wireframe';
import BaseSectionRenderer, { SectionRendererProps } from './BaseSectionRenderer';

export default function FooterSection(props: SectionRendererProps) {
  const { section } = props;
  const content = section.content as FooterContent;
  
  return (
    <BaseSectionRenderer {...props}>
      <div className="p-6 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            {content.logo && (
              <div className="font-bold text-xl mb-4">{content.logo}</div>
            )}
            {content.tagline && (
              <p className="text-gray-600 mb-4">{content.tagline}</p>
            )}
            {content.socialLinks && content.socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {content.socialLinks.map((link, index) => (
                  <div key={index} className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    {link}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {content.menuGroups && content.menuGroups.map((group, index) => (
            <div key={index} className="col-span-1">
              <h3 className="font-medium mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.items.map((item, idx) => (
                  <li key={idx} className="text-gray-600 hover:text-gray-900 cursor-pointer">
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {content.copyright && (
          <div className="border-t border-gray-200 mt-8 pt-4 text-center text-gray-600 text-sm">
            {content.copyright}
          </div>
        )}
      </div>
    </BaseSectionRenderer>
  );
} 