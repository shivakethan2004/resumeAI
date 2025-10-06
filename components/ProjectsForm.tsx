// ProjectsForm.tsx
import { Project } from '@/types/types';
import React from 'react';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export default function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
  const addProject = () => {
    onChange([...projects, { name: '', description: '' }]);
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  // shared input/textarea styling
  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-500";

  return (
    <div className="space-y-4">
      {projects.map((proj, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
          <input
            type="text"
            placeholder="Project Name"
            value={proj.name}
            onChange={(e) => updateProject(index, 'name', e.target.value)}
            className={inputClass}
          />
          <textarea
            placeholder="Project Description"
            value={proj.description}
            onChange={(e) => updateProject(index, 'description', e.target.value)}
            rows={3}
            className={inputClass}
          />
        </div>
      ))}
      <button
        onClick={addProject}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition font-medium"
      >
        + Add Project
      </button>
    </div>
  );
}
