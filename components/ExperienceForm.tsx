// ExperienceForm.tsx
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Experience } from '@/types/types';

interface ExperienceFormProps {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

export default function ExperienceForm({ experience, onChange }: ExperienceFormProps) {
  const addExperience = () => {
    onChange([...experience, { title: '', company: '', years: '', achievements: [''] }]);
  };

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addAchievement = (expIndex: number) => {
    const updated = [...experience];
    updated[expIndex].achievements.push('');
    onChange(updated);
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const updated = [...experience];
    updated[expIndex].achievements[achIndex] = value;
    onChange(updated);
  };

  const removeExperience = (index: number) => {
    onChange(experience.filter((_, i) => i !== index));
  };

  // shared class for input styling
  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-500";

  return (
    <div className="space-y-6">
      {experience.map((exp, expIndex) => (
        <div key={expIndex} className="p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-semibold text-gray-700">Experience {expIndex + 1}</h4>
            <button
              onClick={() => removeExperience(expIndex)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Job Title"
              value={exp.title}
              onChange={(e) => updateExperience(expIndex, 'title', e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Company Name"
              value={exp.company}
              onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Years (e.g., 2022-Present)"
              value={exp.years}
              onChange={(e) => updateExperience(expIndex, 'years', e.target.value)}
              className={inputClass}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
              {exp.achievements.map((ach, achIndex) => (
                <input
                  key={achIndex}
                  type="text"
                  placeholder="• Achievement with metrics (e.g., Increased revenue by 40%)"
                  value={ach}
                  onChange={(e) => updateAchievement(expIndex, achIndex, e.target.value)}
                  className={`${inputClass} mb-2`}
                />
              ))}
              <button
                onClick={() => addAchievement(expIndex)}
                className="text-indigo-600 text-sm hover:text-indigo-700 font-medium"
              >
                + Add Achievement
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addExperience}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition font-medium"
      >
        + Add Experience
      </button>
    </div>
  );
}
