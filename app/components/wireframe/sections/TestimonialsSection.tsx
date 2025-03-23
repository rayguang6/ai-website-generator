'use client';

import { TestimonialsContent } from '@/app/types/wireframe';
import BaseSectionRenderer, { SectionRendererProps } from './BaseSectionRenderer';

export default function TestimonialsSection(props: SectionRendererProps) {
  const { section } = props;
  const content = section.content as TestimonialsContent;
  
  return (
    <BaseSectionRenderer {...props}>
      <div className="p-6 bg-gray-50">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                {testimonial.avatar ? (
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center text-gray-500">
                    {testimonial.avatar}
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  {testimonial.role && (
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  )}
                </div>
              </div>
              <blockquote className="text-gray-700 italic">"{testimonial.quote}"</blockquote>
            </div>
          ))}
        </div>
      </div>
    </BaseSectionRenderer>
  );
} 