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
    <div className={`fixed bottom-8 left-1/2 z-[100] transition-all duration-300 transform -translate-x-1/2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className={`flex items-center px-6 py-4 rounded-2xl border shadow-xl w-max min-w-[300px] ${bgClass} ${borderClass}`}>
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1 pt-0.5">
          <p className={`text-sm font-semibold ${textClass}`}>{message}</p>
        </div>
        <div className="ml-6 flex-shrink-0 flex">
          <button
            className={`inline-flex rounded-full p-1 transition-colors ${bgClass} ${textClass} hover:bg-white/50 focus:outline-none`}
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
          >
            <span className="sr-only">Close</span>
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
