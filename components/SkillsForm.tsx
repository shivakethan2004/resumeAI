// SkillsForm.tsx
import React from 'react';

interface SkillsFormProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export default function SkillsForm({ skills, onChange }: SkillsFormProps) {
  const [skillInput, setSkillInput] = React.useState('');

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      onChange([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    onChange(skills.filter(s => s !== skill));
  };

  const inputClass =
    "flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-500";

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a skill (e.g., Python, React, AWS)"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
          className={inputClass}
        />
        <button
          onClick={addSkill}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="hover:text-indigo-900 focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
