// CertificationsForm.tsx
import { Certification } from '@/types/types';
import React from 'react';

interface CertificationsFormProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

export default function CertificationsForm({ certifications, onChange }: CertificationsFormProps) {
  const addCertification = () => {
    onChange([...certifications, { name: '', year: '' }]);
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  // shared input styling
  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-500";

  return (
    <div className="space-y-4">
      {certifications.map((cert, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
          <input
            type="text"
            placeholder="Certification Name"
            value={cert.name}
            onChange={(e) => updateCertification(index, 'name', e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Year"
            value={cert.year}
            onChange={(e) => updateCertification(index, 'year', e.target.value)}
            className={inputClass}
          />
        </div>
      ))}
      <button
        onClick={addCertification}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition font-medium"
      >
        + Add Certification
      </button>
    </div>
  );
}
