// HeaderForm.tsx
import { Header } from '@/types/types';
import React from 'react';

interface HeaderFormProps {
  header: Header;
  onChange: (header: Header) => void;
}

export default function HeaderForm({ header, onChange }: HeaderFormProps) {
  const updateField = (field: keyof Header, value: string) => {
    onChange({ ...header, [field]: value });
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-500";

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={header.name}
        onChange={(e) => updateField('name', e.target.value)}
        className={inputClass}
      />
      <input
        type="email"
        placeholder="Email"
        value={header.email}
        onChange={(e) => updateField('email', e.target.value)}
        className={inputClass}
      />
      <input
        type="tel"
        placeholder="Phone (+91-XXXXXXXXXX)"
        value={header.phone}
        onChange={(e) => updateField('phone', e.target.value)}
        className={inputClass}
      />
      <input
        type="text"
        placeholder="LinkedIn URL"
        value={header.linkedin}
        onChange={(e) => updateField('linkedin', e.target.value)}
        className={inputClass}
      />
      <input
        type="text"
        placeholder="GitHub URL"
        value={header.github}
        onChange={(e) => updateField('github', e.target.value)}
        className={inputClass}
      />
    </div>
  );
}
