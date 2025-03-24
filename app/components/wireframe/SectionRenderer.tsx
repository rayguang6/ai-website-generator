import { Section } from '@/app/types/wireframe';
import NavigationSection from './sections/NavigationSection';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import PricingSection from './sections/PricingSection';
import ContactSection from './sections/ContactSection';
import CTASection from './sections/CTASection';
import FooterSection from './sections/FooterSection';

interface SectionRendererProps {
  section: Section;
  onEdit: (section: Section) => void;
  onDelete: (id: string) => void;
}

const SectionRenderer = ({ section, onEdit, onDelete }: SectionRendererProps) => {
  let renderedSection = null;
  
  switch (section.type) {
    case 'navigation':
      renderedSection = <NavigationSection section={section} onUpdate={onEdit} onDelete={() => onDelete(section.id)} onReorder={() => {}} editMode={false} />;
      break;
    case 'hero':
      renderedSection = <HeroSection section={section} onUpdate={onEdit} onDelete={() => onDelete(section.id)} onReorder={() => {}} editMode={false} />;
      break;
    case 'features':
      renderedSection = <FeaturesSection section={section} onUpdate={onEdit} onDelete={() => onDelete(section.id)} onReorder={() => {}} editMode={false} />;
      break;
    case 'testimonials':
      renderedSection = <TestimonialsSection section={section} onUpdate={onEdit} onDelete={() => onDelete(section.id)} onReorder={() => {}} editMode={false} />;
      break;
    case 'pricing':
      renderedSection = <PricingSection section={section} onUpdate={onEdit} onDelete={() => onDelete(section.id)} onReorder={() => {}} editMode={false} />;
      break;
    case 'contact':
      renderedSection = <ContactSection section={section} onUpdate={onEdit} onDelete={() => onDelete(section.id)} onReorder={() => {}} editMode={false} />;
      break;
    case 'cta':
      renderedSection = <CTASection section={section} onUpdate={onEdit} onDelete={() => onDelete(section.id)} onReorder={() => {}} editMode={false} />;
      break;
    case 'footer':
      renderedSection = <FooterSection section={section} onUpdate={onEdit} onDelete={() => onDelete(section.id)} onReorder={() => {}} editMode={false} />;
      break;
    default:
      renderedSection = <div>Unknown section type: {section.type}</div>;
  }
  
  return renderedSection;
}

export default SectionRenderer; 