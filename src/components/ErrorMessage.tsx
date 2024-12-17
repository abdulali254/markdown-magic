import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-3xl p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center space-x-2">
        <AlertCircle className="w-5 h-5 text-red-500" />
        <p className="text-red-700">{message}</p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}