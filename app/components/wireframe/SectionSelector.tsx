'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Section, Wireframe } from '@/app/types/wireframe';

// Default content for each section type
const defaultContents = {
  navigation: {
    title: "Navigation",
    description: "Main navigation for your website",
    layout: 'standard',
    logo: 'Your Logo',
    menuItems: ['Home', 'Features', 'Pricing', 'About', 'Contact']
  },
  hero: {
    title: "Welcome to Our Platform",
    description: "The best solution for your needs. Sign up today and get started with our amazing features.",
    layout: 'gradient',
    ctaText: "Get Started",
    ctaLink: "#",
    secondaryCtaText: "Learn More",
    secondaryCtaLink: "#",
    imageUrl: "/placeholder.jpg"
  },
  features: {
    title: "Our Key Features",
    description: "Discover what makes our platform stand out from the competition.",
    layout: 'grid',
    features: [
      {
        title: "Easy to Use",
        description: "Our intuitive interface makes it simple to get started.",
        icon: "star"
      },
      {
        title: "Fast Performance",
        description: "Optimized for speed to give you the best experience.",
        icon: "bolt"
      },
      {
        title: "Secure & Reliable",
        description: "Your data is safe with our enterprise-grade security.",
        icon: "shield"
      }
    ]
  },
  testimonials: {
    title: "What Our Customers Say",
    description: "Don't just take our word for it. Here's what our users think.",
    layout: 'grid',
    testimonials: [
      {
        quote: "This product has completely transformed how we work!",
        author: "Jane Smith",
        role: "CEO at TechCorp",
        avatarUrl: "/avatar1.jpg"
      },
      {
        quote: "I can't imagine going back to our old workflow.",
        author: "John Doe",
        role: "Marketing Director",
        avatarUrl: "/avatar2.jpg"
      }
    ]
  },
  pricing: {
    title: "Pricing Plans",
    description: "Choose the best plan for your needs.",
    layout: 'cards',
    tiers: [
      {
        name: "Basic",
        price: "$9.99",
        period: "monthly",
        features: ["Feature 1", "Feature 2", "Feature 3"],
        ctaText: "Get Started"
      },
      {
        name: "Pro",
        price: "$19.99",
        period: "monthly",
        features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
        ctaText: "Get Started",
        highlighted: true
      }
    ]
  },
  contact: {
    title: "Contact Us",
    description: "Have questions? Reach out to us and we'll get back to you as soon as possible.",
    layout: 'split',
    email: "info@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, Country",
    formFields: ["Name", "Email", "Message"]
  },
  cta: {
    title: "Ready to Get Started?",
    description: "Join thousands of satisfied customers today.",
    layout: 'cta-gradient',
    buttonText: "Sign Up Now",
    buttonUrl: "#"
  },
  footer: {
    title: "Footer",
    description: "Website footer with important links and information.",
    layout: 'multicolumn',
    logo: "Your Logo",
    copyright: "© 2023 Your Company. All rights reserved.",
    columns: [
      {
        title: "Product",
        links: [
          { text: "Features", url: "#" },
          { text: "Pricing", url: "#" },
          { text: "Customers", url: "#" }
        ]
      },
      {
        title: "Company",
        links: [
          { text: "About", url: "#" },
          { text: "Careers", url: "#" },
          { text: "Contact", url: "#" }
        ]
      },
      {
        title: "Resources",
        links: [
          { text: "Blog", url: "#" },
          { text: "Support", url: "#" },
          { text: "Documentation", url: "#" }
        ]
      }
    ],
    socialLinks: [
      { platform: "Twitter", url: "#" },
      { platform: "Facebook", url: "#" },
      { platform: "LinkedIn", url: "#" }
    ]
  }
};

interface SectionSelectorProps {
  onAddSection: (section: Section) => void;
  wireframe: Wireframe & { allSections?: Section[] };
}

export default function SectionSelector({ onAddSection, wireframe }: SectionSelectorProps) {
  const [showSectionOptions, setShowSectionOptions] = useState(false);

  const sectionTypes = [
    { type: 'navigation', label: 'Navigation', icon: 
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
      </svg>
    },
    { type: 'hero', label: 'Hero', icon: 
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM11 7h2v10h-2V7z"></path>
      </svg>
    },
    { type: 'features', label: 'Features', icon: 
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 6h4v4H4V6zm6 0h10v4H10V6zM4 14h4v4H4v-4zm6 0h10v4H10v-4z"></path>
      </svg>
    },
    { type: 'testimonials', label: 'Testimonials', icon: 
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h-2v-2c0-2.209-3.582-4-8-4s-8 1.791-8 4v2H0v-2c0-4.418 5.373-8 12-8s12 3.582 12 8v2z"></path>
      </svg>
    },
    { type: 'pricing', label: 'Pricing', icon: 
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path>
      </svg>
    },
    { type: 'contact', label: 'Contact', icon: 
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
      </svg>
    },
    { type: 'cta', label: 'CTA', icon: 
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"></path>
      </svg>
    },
    { type: 'footer', label: 'Footer', icon: 
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 17h18v2H3zm0-7h18v5H3zm0-4h18v2H3z"></path>
      </svg>
    }
  ];

  const handleAddSection = (type: string) => {
    // First try to find the section in allSections
    const storedSection = wireframe.allSections?.find(section => section.type === type);
    
    if (storedSection) {
      // Create a new section with the stored content but a new ID
      const newSection: Section = {
        id: uuidv4(),
        type,
        content: {
          ...storedSection.content,
          layout: storedSection.content.layout || 'standard'
        }
      };
      onAddSection(newSection);
    } else {
      // If no stored content found, try to find an existing section of the same type
      const existingSection = wireframe.sections.find(section => section.type === type);
      
      // Create new section with copied content or empty content if no existing section
      const newSection: Section = {
        id: uuidv4(),
        type,
        content: existingSection ? {
          ...existingSection.content,
          layout: existingSection.content.layout || 'standard'
        } : {
          title: `New ${type} section`,
          description: `This is a new ${type} section.`,
          layout: 'standard'
        }
      };
      
      onAddSection(newSection);
    }
    
    setShowSectionOptions(false);
  };

  return (
    <div className="section-selector">
      {!showSectionOptions ? (
        <button
          onClick={() => setShowSectionOptions(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Section
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
          <div className="flex justify-between items-center p-3 border-b bg-gray-50">
            <h3 className="font-medium">Select section type</h3>
            <button 
              onClick={() => setShowSectionOptions(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-3 grid grid-cols-2 gap-2">
            {sectionTypes.map((sectionType) => (
              <button
                key={sectionType.type}
                onClick={() => handleAddSection(sectionType.type)}
                className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-2">
                  {sectionType.icon}
                </div>
                <span className="text-sm font-medium">{sectionType.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 