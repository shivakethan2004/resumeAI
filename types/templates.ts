// templates.ts
import { Template } from '@/types/types';

export interface TemplateOption {
  key: Template;
  name: string;
  labelColor: string;       // color for template button when selected
  borderClass: string;      // class for preview border
  headerClass: string;      // class for header
  sectionTitleClass: string; // class for section titles
}

export const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    key: 'modern',
    name: 'Modern',
    labelColor: 'bg-indigo-600 text-white',
    borderClass: 'border-l-4 border-indigo-600',
    headerClass: 'text-left text-4xl font-bold text-gray-800',
    sectionTitleClass: 'text-xl font-bold text-indigo-600 border-b-2 border-indigo-600',
  },
  {
    key: 'classic',
    name: 'Classic',
    labelColor: 'bg-gray-800 text-white',
    borderClass: 'border-t-2 border-gray-800',
    headerClass: 'text-center text-3xl font-bold text-gray-900 uppercase',
    sectionTitleClass: 'text-lg font-bold text-gray-900 uppercase border-b border-gray-800',
  },
  {
    key: 'minimal',
    name: 'Minimal',
    labelColor: 'bg-gray-100 text-gray-600',
    borderClass: 'border border-gray-200',
    headerClass: 'text-left text-3xl font-semibold text-gray-800',
    sectionTitleClass: 'text-lg font-semibold text-gray-800',
  },
  {
    key: 'creative',
    name: 'Creative',
    labelColor: 'bg-pink-600 text-white',
    borderClass: 'border-l-4 border-pink-600',
    headerClass: 'text-left text-4xl font-extrabold text-pink-700',
    sectionTitleClass: 'text-xl font-bold text-pink-600 border-b-2 border-pink-600',
  },
  {
    key: 'professional',
    name: 'Professional',
    labelColor: 'bg-green-600 text-white',
    borderClass: 'border-t-4 border-green-600',
    headerClass: 'text-left text-3xl font-bold text-green-800',
    sectionTitleClass: 'text-lg font-bold text-green-600 border-b-2 border-green-600',
  },
];
