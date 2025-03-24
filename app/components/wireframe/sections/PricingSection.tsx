'use client';

import React from 'react';
import { PricingContent } from '@/app/types/wireframe';
import BaseSectionRenderer, { SectionRendererProps } from './BaseSectionRenderer';

export default function PricingSection(props: SectionRendererProps) {
  const { section } = props;
  const content = section.content as PricingContent;
  
  // Ensure tiers exists and is an array
  const tiers = Array.isArray(content?.tiers) ? content.tiers : [];
  
  // Get layout type with fallback to 'standard'
  const layoutType = content?.layout || 'standard';
  
  // Render the appropriate pricing layout based on the layout type
  const renderPricingLayout = () => {
    if (tiers.length === 0) {
      return (
        <div className="p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-500">No pricing tiers available</p>
        </div>
      );
    }
    
    switch (layoutType) {
      case 'horizontal':
        return (
          <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
              <div 
                key={index} 
                className={`flex-1 p-6 border rounded-xl ${tier.isPopular ? 'border-blue-400 shadow-lg' : 'border-gray-200'} bg-white relative`}
              >
                {tier.isPopular && (
                  <div className="absolute top-0 right-0 mt-4 mr-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Popular</span>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{tier.price}</span>
                </div>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                <ul className="space-y-2 mb-8">
                  {tier.features && tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-2 px-4 rounded-md ${tier.isPopular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} transition`}
                >
                  {tier.cta || 'Choose Plan'}
                </button>
              </div>
            ))}
          </div>
        );
      
      case 'compact':
        return (
          <div className="max-w-3xl mx-auto">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {tiers.map((tier, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row p-4 ${index < tiers.length - 1 ? 'border-b border-gray-200' : ''} ${tier.isPopular ? 'bg-blue-50' : 'bg-white'}`}
                >
                  <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                    <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
                    <div className="text-2xl font-bold mb-2">{tier.price}</div>
                    {tier.isPopular && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">Popular</span>
                    )}
                  </div>
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <p className="text-gray-600 mb-3 text-sm">{tier.description}</p>
                    <ul className="space-y-1 text-sm">
                      {tier.features && tier.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                      {tier.features && tier.features.length > 3 && (
                        <li className="text-gray-500 text-xs ml-5">+{tier.features.length - 3} more features</li>
                      )}
                    </ul>
                  </div>
                  <div className="md:w-1/3 flex items-center justify-end">
                    <button 
                      className={`py-2 px-4 rounded-md ${tier.isPopular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} transition text-sm`}
                    >
                      {tier.cta || 'Choose Plan'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default: // 'standard' layout (default)
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-xl ${tier.isPopular ? 'shadow-xl border-2 border-blue-400 relative z-10 my-4 md:my-0 md:-m-4' : 'border border-gray-200 shadow-sm'} bg-white`}
              >
                {tier.isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{tier.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features && tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 px-4 rounded-md ${tier.isPopular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} transition font-medium`}
                >
                  {tier.cta || 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        );
    }
  };
  
  return (
    <BaseSectionRenderer {...props}>
      <div className="py-16 px-6 bg-gray-50">
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
        
        {renderPricingLayout()}
      </div>
    </BaseSectionRenderer>
  );
} 