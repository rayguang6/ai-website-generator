'use client';

import React from 'react';
import { ContactContent } from '@/app/types/wireframe';
import BaseSectionRenderer, { SectionRendererProps } from './BaseSectionRenderer';

export default function ContactSection(props: SectionRendererProps) {
  const { section } = props;
  const content = section.content as ContactContent;
  
  // Get layout type with fallback to 'standard'
  const layoutType = content?.layout || 'standard';
  
  // Default form fields if none provided
  const formFields = Array.isArray(content?.formFields) && content.formFields.length > 0 
    ? content.formFields 
    : ['Name', 'Email', 'Message'];
  
  // Render the appropriate contact layout based on the layout type
  const renderContactLayout = () => {
    switch (layoutType) {
      case 'split':
        return (
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:w-1/2 p-8 bg-blue-700 text-white">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              
              {content?.address && (
                <div className="mb-4 flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{content.address}</span>
                </div>
              )}
              
              {content?.email && (
                <div className="mb-4 flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{content.email}</span>
                </div>
              )}
              
              {content?.phone && (
                <div className="mb-4 flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{content.phone}</span>
                </div>
              )}
              
              {content?.mapLocation && (
                <div className="mt-8 bg-blue-800 rounded-lg p-4 h-48 flex items-center justify-center">
                  <div className="text-blue-200">Map: {content.mapLocation}</div>
                </div>
              )}
            </div>
            
            <div className="md:w-1/2 p-8">
              <div className="space-y-4">
                {formFields.map((field, index) => {
                  if (field.toLowerCase() === 'message') {
                    return (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                        <textarea
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={4}
                          placeholder={`Your ${field.toLowerCase()}`}
                          readOnly
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Your ${field.toLowerCase()}`}
                        readOnly
                      />
                    </div>
                  );
                })}
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition mt-2">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'minimal':
        return (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <div className="space-y-4">
              {formFields.map((field, index) => {
                if (field.toLowerCase() === 'message') {
                  return (
                    <div key={index}>
                      <textarea
                        className="w-full p-3 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                        rows={4}
                        placeholder={field}
                        readOnly
                      />
                    </div>
                  );
                }
                return (
                  <div key={index}>
                    <input
                      type="text"
                      className="w-full p-3 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                      placeholder={field}
                      readOnly
                    />
                  </div>
                );
              })}
              
              <div className="pt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full font-medium transition mt-2">
                  Send
                </button>
              </div>
            </div>
            
            {(content?.email || content?.phone) && (
              <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                {content.email && <div className="mb-1">{content.email}</div>}
                {content.phone && <div>{content.phone}</div>}
              </div>
            )}
          </div>
        );
      
      default: // 'standard' layout (default)
        return (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                <div className="space-y-4">
                  {formFields.map((field, index) => {
                    if (field.toLowerCase() === 'message') {
                      return (
                        <div key={index}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                          <textarea
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            placeholder={`Your ${field.toLowerCase()}`}
                            readOnly
                          />
                        </div>
                      );
                    }
                    return (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Your ${field.toLowerCase()}`}
                          readOnly
                        />
                      </div>
                    );
                  })}
                  
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition mt-2">
                    Send Message
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                
                {content?.address && (
                  <div className="mb-4">
                    <div className="font-medium mb-1">Address</div>
                    <div className="text-gray-600">{content.address}</div>
                  </div>
                )}
                
                {content?.email && (
                  <div className="mb-4">
                    <div className="font-medium mb-1">Email</div>
                    <div className="text-gray-600">{content.email}</div>
                  </div>
                )}
                
                {content?.phone && (
                  <div className="mb-4">
                    <div className="font-medium mb-1">Phone</div>
                    <div className="text-gray-600">{content.phone}</div>
                  </div>
                )}
                
                {content?.mapLocation && (
                  <div className="mt-6 bg-gray-200 rounded p-2 h-32 flex items-center justify-center">
                    <div className="text-gray-500 text-sm">Map: {content.mapLocation}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };
  
  return (
    <BaseSectionRenderer {...props}>
      <div className="py-16 px-6 bg-gray-100">
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
        
        {renderContactLayout()}
      </div>
    </BaseSectionRenderer>
  );
} 