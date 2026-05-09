import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 5000 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgClass = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const borderClass = type === 'success' ? 'border-green-200' : 'border-red-200';
  const textClass = type === 'success' ? 'text-green-800' : 'text-red-800';
  const Icon = type === 'success' ? CheckCircle : AlertCircle;
  const iconColor = type === 'success' ? 'text-green-500' : 'text-red-500';

  return (
    <div className={`fixed top-24 right-4 z-[100] transition-all duration-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className={`flex items-start p-4 rounded-xl border shadow-lg max-w-sm w-full ${bgClass} ${borderClass}`}>
        <div className="flex-shrink-0">
          <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className={`text-sm font-medium ${textClass}`}>{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className={`inline-flex rounded-md ${bgClass} ${textClass} hover:opacity-75 focus:outline-none`}
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
