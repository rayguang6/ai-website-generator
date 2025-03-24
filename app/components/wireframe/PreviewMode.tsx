'use client';

import { Wireframe, Section } from '@/app/types/wireframe';
import NavigationSection from './sections/NavigationSection';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import PricingSection from './sections/PricingSection';
import ContactSection from './sections/ContactSection';
import CTASection from './sections/CTASection';
import FooterSection from './sections/FooterSection';

interface PreviewModeProps {
  wireframe: Wireframe;
  onClose?: () => void;
}

export default function PreviewMode({ wireframe, onClose }: PreviewModeProps) {
  const renderSection = (section: Section) => {
    // In preview mode, we use the same section components but without the edit controls
    const previewProps = {
      section,
      onUpdate: () => {},
      onReorder: () => {},
      onDelete: () => {},
      editMode: false,
    };

    switch (section.type) {
      case 'navigation':
        return <NavigationSection {...previewProps} />;
      case 'hero':
        return <HeroSection {...previewProps} />;
      case 'features':
        return <FeaturesSection {...previewProps} />;
      case 'testimonials':
        return <TestimonialsSection {...previewProps} />;
      case 'pricing':
        return <PricingSection {...previewProps} />;
      case 'contact':
        return <ContactSection {...previewProps} />;
      case 'cta':
        return <CTASection {...previewProps} />;
      case 'footer':
        return <FooterSection {...previewProps} />;
      default:
        return (
          <div className="p-4 border border-gray-300 rounded-md bg-gray-100">
            <h3 className="text-lg font-medium mb-2">Unknown Section Type: {section.type}</h3>
            <pre className="text-xs overflow-auto bg-white p-2 rounded">
              {JSON.stringify(section.content, null, 2)}
            </pre>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white overflow-auto">
      {/* Preview header */}
      <div className="sticky top-0 bg-blue-600 text-white p-4 flex justify-between items-center shadow-md z-10">
        <h2 className="text-xl font-semibold">Preview: {wireframe.pageName}</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-blue-700 px-3 py-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Desktop</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-700 rounded-full"
            aria-label="Close Preview"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Preview content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {wireframe.sections.map((section) => (
          <div key={section.id} className="w-full">
            {renderSection(section)}
          </div>
        ))}
      </div>
    </div>
  );
} 