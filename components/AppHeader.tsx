// AppHeader.tsx
import React from 'react';
import { FileText, Coins, LogOut } from 'lucide-react';
import { User } from '@/types/types';

interface AppHeaderProps {
  user: User;
  credits: number;
  onLogout: () => void;
}

export default function AppHeader({ user, credits, onLogout }: AppHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-indigo-600" />
          <h1 className="text-xl font-bold text-gray-800">AI Resume Builder</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg">
            <Coins className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-indigo-600">{credits} Credits</span>
          </div>
          <span className="text-gray-600">{user.email}</span>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}