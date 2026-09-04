'use client';

import React from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  duration?: number;
  onClose?: (id: string) => void;
}

const toastStyles = {
  success: 'bg-success-500',
  error: 'bg-danger-500',
  warning: 'bg-warning-500',
  info: 'bg-primary-500',
};

export function Toast({
  id,
  type,
  message,
  title,
  duration = 5000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={clsx(
        'text-white rounded-lg shadow-lg p-4 mb-3 flex items-start gap-3 animate-slideIn',
        toastStyles[type]
      )}
    >
      <div className="flex-1 min-w-0">
        {title && <p className="font-medium">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.(id);
        }}
        className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Toast Container Component
export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
      <div className="pointer-events-auto">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  );
}
