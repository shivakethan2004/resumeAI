// SectionNavigation.tsx
import { ActiveSection } from '@/types/types';
import React from 'react';

interface SectionNavigationProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
}

export default function SectionNavigation({ activeSection, setActiveSection }: SectionNavigationProps) {
  const sections: ActiveSection[] = ['header', 'summary', 'skills', 'experience', 'education', 'projects', 'certifications'];

  return (
    <div className="col-span-3 bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold text-gray-800 mb-3">Sections</h3>
      <div className="space-y-1">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`w-full text-left px-3 py-2 rounded-lg capitalize transition ${
              activeSection === section
                ? 'bg-indigo-50 text-indigo-600 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  );
}