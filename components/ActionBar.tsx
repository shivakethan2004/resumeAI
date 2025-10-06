// ActionBar.tsx
import React from 'react';
import { FileText, Eye, Wand2, CheckCircle, Save, Download, RefreshCw } from 'lucide-react';
import { ActiveTab } from '@/types/types';
interface ActionBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isProcessing: boolean;
  onAIGenerate: () => void;
  onValidate: () => void;
  onSave: () => void;
  onExport: () => void;
}

export default function ActionBar({
  activeTab,
  setActiveTab,
  isProcessing,
  onAIGenerate,
  onValidate,
  onSave,
  onExport
}: ActionBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('builder')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
            activeTab === 'builder'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Builder
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
            activeTab === 'preview'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onAIGenerate}
          disabled={isProcessing}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50"
        >
          {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
          AI Enhance (5₡)
        </button>
        <button
          onClick={onValidate}
          disabled={isProcessing}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
        >
          <CheckCircle className="w-4 h-4" />
          Validate (5₡)
        </button>
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition"
        >
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>
    </div>
  );
}