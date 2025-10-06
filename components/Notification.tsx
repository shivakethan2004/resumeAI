// Notification.tsx
import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { NotificationType } from '@/types/types';

interface NotificationProps {
  type: NotificationType;
  message: string;
  onClose: () => void;
}

export default function Notification({ type, message, onClose }: NotificationProps) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  };

  const styles = {
    success: 'bg-green-500 border-green-600',
    error: 'bg-red-500 border-red-600',
    info: 'bg-blue-500 border-blue-600'
  };

  const Icon = icons[type];

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border-l-4 flex items-center gap-3 ${styles[type]} text-white min-w-80 max-w-md animate-in slide-in-from-right-5 duration-300`}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button 
        onClick={onClose} 
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}