'use client';

import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import clsx from 'clsx';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  title?: string;
  message: string;
  closeable?: boolean;
  onClose?: () => void;
}

const alertStyles = {
  success: {
    container: 'bg-success-50 border border-success-200',
    icon: 'text-success-600',
    title: 'text-success-900',
    message: 'text-success-800',
    button: 'text-success-600 hover:bg-success-100',
  },
  error: {
    container: 'bg-danger-50 border border-danger-200',
    icon: 'text-danger-600',
    title: 'text-danger-900',
    message: 'text-danger-800',
    button: 'text-danger-600 hover:bg-danger-100',
  },
  warning: {
    container: 'bg-warning-50 border border-warning-200',
    icon: 'text-warning-600',
    title: 'text-warning-900',
    message: 'text-warning-800',
    button: 'text-warning-600 hover:bg-warning-100',
  },
  info: {
    container: 'bg-primary-50 border border-primary-200',
    icon: 'text-primary-600',
    title: 'text-primary-900',
    message: 'text-primary-800',
    button: 'text-primary-600 hover:bg-primary-100',
  },
};

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

export function Alert({
  type,
  title,
  message,
  closeable = false,
  onClose,
}: AlertProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  const Icon = iconMap[type];
  const style = alertStyles[type];

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <div className={clsx('rounded-lg p-4 flex gap-3', style.container)}>
      <Icon className={clsx('w-5 h-5 flex-shrink-0 mt-0.5', style.icon)} />
      <div className="flex-1">
        {title && <p className={clsx('font-medium', style.title)}>{title}</p>}
        <p className={clsx('text-sm', style.message)}>{message}</p>
      </div>
      {closeable && (
        <button
          onClick={handleClose}
          className={clsx('flex-shrink-0 p-1 rounded transition', style.button)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
