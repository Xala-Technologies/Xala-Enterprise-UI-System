/**
 * Button Icon Components
 * Icon-related components for Button component
 */

import React from 'react';

import { getClassificationIcon } from '../../utils/norwegian-compliance';

/**
 * Loading spinner component
 */
export interface LoadingSpinnerProps {
  size: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Loading spinner component
 * @param props - LoadingSpinner component props
 * @returns Loading spinner element
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size, className, style }) => {
  const spinnerSize = size === 'sm' ? '12px' : size === 'lg' ? '20px' : '16px';

  const spinnerStyle: React.CSSProperties = {
    width: spinnerSize,
    height: spinnerSize,
    border: 'var(--border-width) solid transparent',
    borderTop: 'var(--border-width) solid currentColor',
    borderRadius: 'var(--border-radius-full)',
    animation: 'spin 1s linear infinite',
    ...style,
  };

  return (
    <div
      className={className}
      style={spinnerStyle}
      role="status"
      aria-label="Laster..."
      data-testid="loading-spinner"
    />
  );
};

/**
 * Classification indicator component
 */
export interface ClassificationIndicatorProps {
  level: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Classification indicator component
 * @param props - ClassificationIndicator component props
 * @returns Classification indicator element
 */
export const ClassificationIndicator: React.FC<ClassificationIndicatorProps> = ({
  level,
  className,
  style,
}) => {
  const indicatorStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-xs)',
    marginRight: 'var(--spacing-1)',
    opacity: '0.9',
    ...style,
  };

  return (
    <span
      className={className}
      style={indicatorStyle}
      aria-label={`Classification: ${level}`}
      title={`Klassifisering: ${level}`}
      data-testid="classification-indicator"
    >
      {getClassificationIcon(level)}
    </span>
  );
};
