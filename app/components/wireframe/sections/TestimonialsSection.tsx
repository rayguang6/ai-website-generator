'use client';

import { TestimonialsContent } from '@/app/types/wireframe';
import BaseSectionRenderer, { SectionRendererProps } from './BaseSectionRenderer';

export default function TestimonialsSection(props: SectionRendererProps) {
  const { section } = props;
  const content = section.content as TestimonialsContent;
  
  // Ensure testimonials exists and is an array
  const testimonials = Array.isArray(content?.testimonials) ? content.testimonials : [];
  
  // Get layout type with fallback to 'grid'
  const layoutType = content?.layout || 'grid';

  // Render the appropriate testimonials layout based on the layout type
  const renderTestimonialsLayout = () => {
    if (testimonials.length === 0) {
      return (
        <div className="p-6 bg-gray-50 rounded-lg text-center max-w-3xl mx-auto">
          <p className="text-gray-500">No testimonials available</p>
        </div>
      );
    }
    
    switch (layoutType) {
      case 'carousel':
        return (
          <div className="relative max-w-5xl mx-auto">
            {/* Carousel navigation controls */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 z-10 bg-white rounded-full shadow-md p-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 z-10 bg-white rounded-full shadow-md p-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            
            {/* Carousel track */}
            <div className="overflow-hidden px-8">
              <div className="flex transition-transform duration-300">
                {/* Only show the first testimonial in the carousel preview */}
                <div className="w-full flex-shrink-0">
                  <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition relative max-w-2xl mx-auto">
                    {/* Quote mark decoration */}
                    <div className="absolute top-4 left-4 text-gray-200 opacity-40">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1 0.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1 0.9-2 2-2V8z"/>
                      </svg>
                    </div>
                    
                    <blockquote className="text-gray-700 italic text-xl relative z-10 mb-6">
                      "{testimonials[0].quote}"
                    </blockquote>
                    
                    <div className="flex items-center mt-6">
                      {testimonials[0].avatar ? (
                        <div 
                          className="w-14 h-14 rounded-full bg-gray-200 mr-4 flex items-center justify-center overflow-hidden"
                          style={{ 
                            backgroundImage: testimonials[0].avatar.startsWith('http') ? `url(${testimonials[0].avatar})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          {!testimonials[0].avatar.startsWith('http') && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          )}
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-blue-100 mr-4 flex items-center justify-center text-blue-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonials[0].author}</h4>
                        {testimonials[0].role && (
                          <p className="text-sm text-gray-500">{testimonials[0].role}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carousel indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
          </div>
        );
      
      case 'masonry':
        return (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 max-w-6xl mx-auto space-y-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-white p-6 rounded-lg shadow-md break-inside-avoid-column mb-8 ${index % 3 === 0 ? 'bg-blue-50' : index % 3 === 1 ? 'bg-gray-50' : ''}`}
              >
                <blockquote className="text-gray-700 italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  {testimonial.avatar ? (
                    <div 
                      className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center overflow-hidden"
                      style={{ 
                        backgroundImage: testimonial.avatar.startsWith('http') ? `url(${testimonial.avatar})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 mr-3 flex items-center justify-center text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{testimonial.author}</h4>
                    {testimonial.role && (
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'minimal':
        return (
          <div className="max-w-4xl mx-auto space-y-12 py-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <blockquote className="text-gray-700 italic text-2xl mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="inline-flex flex-col items-center">
                  {testimonial.avatar && (
                    <div 
                      className="w-16 h-16 rounded-full bg-gray-200 mb-4 overflow-hidden"
                      style={{ 
                        backgroundImage: testimonial.avatar.startsWith('http') ? `url(${testimonial.avatar})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                  )}
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  {testimonial.role && (
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'bubbles':
        return (
          <div className="max-w-6xl mx-auto relative px-6">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-100 opacity-50"></div>
              <div className="absolute top-1/3 -right-10 w-32 h-32 rounded-full bg-purple-100 opacity-50"></div>
              <div className="absolute -bottom-10 left-1/4 w-36 h-36 rounded-full bg-pink-100 opacity-50"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className={`bg-white p-6 rounded-2xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2 ${index % 3 === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                >
                  {/* Top avatar with speech bubble styling */}
                  <div className="flex justify-center -mt-12 mb-4">
                    <div className={`w-16 h-16 rounded-full border-4 border-white shadow ${index % 5 === 0 ? 'bg-blue-500' : index % 5 === 1 ? 'bg-purple-500' : index % 5 === 2 ? 'bg-green-500' : index % 5 === 3 ? 'bg-pink-500' : 'bg-yellow-500'} flex items-center justify-center`}>
                      {testimonial.avatar ? (
                        <img 
                          src={testimonial.avatar.startsWith('http') ? testimonial.avatar : '#'} 
                          alt={testimonial.author}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-white font-bold text-xl">
                          {testimonial.author.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 italic text-center mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                    {testimonial.role && (
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'spotlight':
        return (
          <div className="max-w-5xl mx-auto">
            {/* Featured testimonial */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl overflow-hidden shadow-xl mb-12">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 bg-opacity-20 relative">
                  {testimonials[0].avatar ? (
                    <div className="h-full">
                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                      <img 
                        src={testimonials[0].avatar.startsWith('http') ? testimonials[0].avatar : '#'} 
                        alt={testimonials[0].author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-full w-full bg-indigo-800 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                        <span className="text-white font-bold text-4xl">
                          {testimonials[0].author.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                  <div className="mb-6">
                    <svg width="45" height="36" className="text-white opacity-50" viewBox="0 0 45 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.5 0C6.04125 0 0 6.03 0 13.5C0 20.97 6.04125 27 13.5 27C20.9588 27 27 20.97 27 13.5C27 6.03 20.9588 0 13.5 0ZM40.5 0C33.0413 0 27 6.03 27 13.5C27 20.97 33.0413 27 40.5 27C44.0287 27 44.955 25.695 44.955 25.695C40.7137 21.465 40.5 16.875 40.5 16.875H45V13.5C45 6.03 47.9587 0 40.5 0Z" />
                    </svg>
                  </div>
                  
                  <blockquote className="text-white text-xl md:text-2xl font-light mb-6">
                    "{testimonials[0].quote}"
                  </blockquote>
                  
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonials[0].author}</h4>
                    {testimonials[0].role && (
                      <p className="text-blue-100">{testimonials[0].role}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Secondary testimonials */}
            {testimonials.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.slice(1, 5).map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
                  >
                    <blockquote className="text-gray-700 italic mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex-shrink-0 mr-3 ${index % 4 === 0 ? 'bg-blue-100' : index % 4 === 1 ? 'bg-purple-100' : index % 4 === 2 ? 'bg-green-100' : 'bg-pink-100'} flex items-center justify-center`}>
                        <span className={`font-bold ${index % 4 === 0 ? 'text-blue-600' : index % 4 === 1 ? 'text-purple-600' : index % 4 === 2 ? 'text-green-600' : 'text-pink-600'}`}>
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                        {testimonial.role && (
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      case 'video':
        return (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Main video testimonial */}
              <div className="md:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="aspect-w-16 aspect-h-9 bg-gray-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white bg-opacity-25 flex items-center justify-center cursor-pointer group transition-all duration-300 hover:bg-opacity-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white group-hover:text-blue-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 rounded-lg px-4 py-2 text-white">
                    <span>{testimonials[0].author}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <blockquote className="text-gray-700 text-lg mb-4">
                    "{testimonials[0].quote}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    {testimonials[0].avatar ? (
                      <img 
                        src={testimonials[0].avatar.startsWith('http') ? testimonials[0].avatar : '#'} 
                        alt={testimonials[0].author}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-100 mr-4 flex items-center justify-center text-blue-500">
                        <span className="font-bold">{testimonials[0].author.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonials[0].author}</h4>
                      {testimonials[0].role && (
                        <p className="text-sm text-gray-500">{testimonials[0].role}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Thumbnail videos */}
              {testimonials.slice(1).map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gray-800 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white bg-opacity-25 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{testimonial.author}</h4>
                    {testimonial.role && (
                      <p className="text-sm text-gray-500 mb-2">{testimonial.role}</p>
                    )}
                    <p className="text-gray-700 text-sm line-clamp-2">"{testimonial.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'avatars':
        return (
          <div className="max-w-6xl mx-auto">
            {/* Avatar row */}
            <div className="flex flex-wrap justify-center mb-12">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-1">
                  <div 
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 ${index === 0 ? 'border-blue-500' : 'border-white'} shadow-md transition-transform hover:scale-110 cursor-pointer overflow-hidden`}
                  >
                    {testimonial.avatar ? (
                      <img 
                        src={testimonial.avatar.startsWith('http') ? testimonial.avatar : '#'} 
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${index % 5 === 0 ? 'bg-blue-500' : index % 5 === 1 ? 'bg-purple-500' : index % 5 === 2 ? 'bg-green-500' : index % 5 === 3 ? 'bg-pink-500' : 'bg-yellow-500'}`}>
                        <span className="text-white font-bold text-lg">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Featured testimonial */}
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-10 text-center">
              <div className="mb-8">
                <svg width="45" height="36" className="text-blue-500 opacity-25 mx-auto" viewBox="0 0 45 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 0C6.04125 0 0 6.03 0 13.5C0 20.97 6.04125 27 13.5 27C20.9588 27 27 20.97 27 13.5C27 6.03 20.9588 0 13.5 0ZM40.5 0C33.0413 0 27 6.03 27 13.5C27 20.97 33.0413 27 40.5 27C44.0287 27 44.955 25.695 44.955 25.695C40.7137 21.465 40.5 16.875 40.5 16.875H45V13.5C45 6.03 47.9587 0 40.5 0Z" />
                </svg>
              </div>
              
              <blockquote className="text-gray-700 text-xl md:text-2xl mb-6 font-light">
                "{testimonials[0].quote}"
              </blockquote>
              
              <div className="flex flex-col items-center">
                {testimonials[0].avatar ? (
                  <img 
                    src={testimonials[0].avatar.startsWith('http') ? testimonials[0].avatar : '#'} 
                    alt={testimonials[0].author}
                    className="w-16 h-16 rounded-full object-cover mb-4"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-500 mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {testimonials[0].author.charAt(0)}
                    </span>
                  </div>
                )}
                <h4 className="font-bold text-gray-900">{testimonials[0].author}</h4>
                {testimonials[0].role && (
                  <p className="text-blue-600">{testimonials[0].role}</p>
                )}
              </div>
            </div>
          </div>
        );
        
      case 'magazine':
        return (
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left sidebar */}
              <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 border-b border-white border-opacity-20 pb-4">What people say</h3>
                
                <div className="space-y-6">
                  {testimonials.slice(0, 3).map((testimonial, index) => (
                    <div 
                      key={index} 
                      className={`cursor-pointer p-3 rounded transition-colors ${index === 0 ? 'bg-white bg-opacity-10' : 'hover:bg-white hover:bg-opacity-5'}`}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                          <span className="font-bold text-sm">{testimonial.author.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{testimonial.author}</h4>
                          {testimonial.role && (
                            <p className="text-xs text-blue-200">{testimonial.role}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-blue-100 line-clamp-2">"{testimonial.quote.length > 60 ? testimonial.quote.substring(0, 60) + '...' : testimonial.quote}"</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Main content */}
              <div className="md:w-2/3 p-8 md:p-12">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Testimonial</h2>
                    <p className="text-blue-600">See what our clients have to say</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="max-w-2xl">
                  <blockquote className="text-gray-700 text-xl md:text-2xl mb-8 font-light leading-relaxed italic">
                    "{testimonials[0].quote}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    {testimonials[0].avatar ? (
                      <img 
                        src={testimonials[0].avatar.startsWith('http') ? testimonials[0].avatar : '#'} 
                        alt={testimonials[0].author}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-blue-100 mr-4 flex items-center justify-center text-blue-600">
                        <span className="font-bold text-xl">{testimonials[0].author.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-xl text-gray-900">{testimonials[0].author}</h4>
                      {testimonials[0].role && (
                        <p className="text-gray-600">{testimonials[0].role}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default: // 'grid' layout (default)
        return (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition relative"
              >
                {/* Quote mark decoration */}
                <div className="absolute top-4 left-4 text-gray-200 opacity-40">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1 0.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1 0.9-2 2-2V8z"/>
                  </svg>
                </div>
                
                <blockquote className="text-gray-700 italic text-lg relative z-10 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center mt-6">
                  {testimonial.avatar ? (
                    <div 
                      className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center overflow-hidden"
                      style={{ 
                        backgroundImage: testimonial.avatar.startsWith('http') ? `url(${testimonial.avatar})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {!testimonial.avatar.startsWith('http') && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 mr-4 flex items-center justify-center text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    {testimonial.role && (
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };
  
  return (
    <BaseSectionRenderer {...props}>
      <div className="py-16 px-6 bg-gradient-to-b from-indigo-50 to-white">
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
        
        {renderTestimonialsLayout()}
      </div>
    </BaseSectionRenderer>
  );
} 