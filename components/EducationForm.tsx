// EducationForm.tsx
import { Education } from '@/types/types';
import React from 'react';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export default function EducationForm({ education, onChange }: EducationFormProps) {
  const addEducation = () => {
    onChange([...education, { degree: '', school: '', year: '' }]);
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  // Shared input styling
  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-500";

  return (
    <div className="space-y-4">
      {education.map((edu, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
          <input
            type="text"
            placeholder="Degree (e.g., B.Tech in Computer Science)"
            value={edu.degree}
            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="School/University"
            value={edu.school}
            onChange={(e) => updateEducation(index, 'school', e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Year"
            value={edu.year}
            onChange={(e) => updateEducation(index, 'year', e.target.value)}
            className={inputClass}
          />
        </div>
      ))}
      <button
        onClick={addEducation}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition font-medium"
      >
        + Add Education
      </button>
    </div>
  );
}
