/**
 * Toast Icon Components
 * Icon and indicator components for Toast
 */

import React from 'react';

// Helper function for classification icons
const getClassificationIcon = (level: string): string => {
  const icons = {
    'ÅPEN': '🟢',
    'BEGRENSET': '🟡',
    'KONFIDENSIELT': '🔴',
    'HEMMELIG': '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};

/**
 * Renders the icon for a Toast notification based on variant or custom icon.
 * @param props - ToastIconProps
 * @returns Toast icon element
 */
export interface ToastIconProps {
  readonly variant: string;
  readonly icon?: React.ReactNode;
}

const variantIcons: Record<string, string> = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌',
};

/**
 * ToastIcon renders the appropriate icon for the toast variant or a custom icon.
 */
export default function ToastIcon({ variant, icon }: ToastIconProps): React.ReactElement {
  if (icon) {
    return (
      <span
        style={{ fontSize: 'var(--font-size-lg)', flexShrink: 0, marginTop: 'var(--spacing-1)' }}
        aria-hidden="true"
      >
        {icon}
      </span>
    );
  }
  return (
    <span
      style={{ fontSize: 'var(--font-size-lg)', flexShrink: 0, marginTop: 'var(--spacing-1)' }}
      aria-hidden="true"
    >
      {variantIcons[variant] || variantIcons['info']}
    </span>
  );
}

/**
 * Classification indicator component
 */
export interface ClassificationIndicatorProps {
  level: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ClassificationIndicator: React.FC<ClassificationIndicatorProps> = ({
  level,
  className,
  style,
}) => {
  const indicatorStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-xs)',
    marginLeft: 'var(--spacing-2)',
    opacity: '0.9',
    ...style,
  };
  return (
    <span
      className={className}
      style={indicatorStyle}
      aria-label={`Classification: ${level}`}
      title={`Klassifisering: ${level}`}
      data-testid="toast-classification-indicator"
    >
      {getClassificationIcon(level)}
    </span>
  );
};

/**
 * Priority indicator component
 */
export interface PriorityIndicatorProps {
  priority?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const PriorityIndicator: React.FC<PriorityIndicatorProps> = ({
  priority,
  className,
  style,
}) => {
  if (!priority) return null;
  const indicatorStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-xs)',
    marginLeft: 'var(--spacing-1)',
    opacity: '0.9',
    ...style,
  };
  const getPriorityIcon = (priority: string): string => {
    const icons = {
      low: '▪',
      medium: '■',
      high: '◆',
      critical: '⬛',
    };
    return icons[priority as keyof typeof icons] || '■';
  };
  return (
    <span
      className={className}
      style={indicatorStyle}
      aria-label={`Priority: ${priority}`}
      title={`Prioritet: ${priority}`}
      data-testid="toast-priority-indicator"
    >
      {getPriorityIcon(priority)}
    </span>
  );
};
