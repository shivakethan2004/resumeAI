// AuthScreen.tsx
import React from 'react';
import { FileText } from 'lucide-react';
import { AuthMode } from '@/types/types';

interface AuthScreenProps {
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onAuth: () => void;
}

export default function AuthScreen({
  authMode,
  setAuthMode,
  email,
  setEmail,
  password,
  setPassword,
  onAuth
}: AuthScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <FileText className="w-12 h-12 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">AI Resume Builder</h1>
        <p className="text-center text-gray-600 mb-6">Build ATS-friendly resumes with AI assistance</p>
        
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              authMode === 'login'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              authMode === 'signup'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={onAuth}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {authMode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          🎁 Get 50 free credits daily for AI-powered edits
        </p>
      </div>
    </div>
  );
}