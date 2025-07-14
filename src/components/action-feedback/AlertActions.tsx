/**
 * Alert Actions Component
 * Action buttons for Alert component
 */

import React from 'react';

import type { AlertAction } from '../../types/action-feedback.types';

/**
 * Alert actions component props
 */
export interface AlertActionsProps {
  actions?: AlertAction[];
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Alert actions component
 * @param props - AlertActions component props
 * @returns Alert actions element or null
 */
export const AlertActions: React.FC<AlertActionsProps> = ({ actions, className, style }) => {
  if (!actions || actions.length === 0) {
    return null;
  }

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--spacing-2)',
    marginTop: 'var(--spacing-3)',
    flexWrap: 'wrap',
    ...style,
  };

  return (
    <div className={className} style={actionsStyle} data-testid="alert-actions">
      {actions.map((action, index) => (
        <button
          key={index}
          style={{
            padding: 'var(--spacing-2) var(--spacing-3)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
            border: 'var(--border-width) solid currentColor',
            borderRadius: 'var(--border-radius-base)',
            backgroundColor: action.variant === 'primary' ? 'currentColor' : 'transparent',
            color: action.variant === 'primary' ? 'var(--color-white)' : 'currentColor',
            cursor: 'pointer',
            transition: 'all var(--transition-duration-fast) ease',
          }}
          onClick={action.handler}
          aria-label={action.label}
          data-testid={`alert-action-${index}`}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

/**
 * Close button component
 */
export interface CloseButtonProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Close button component
 * @param props - CloseButton component props
 * @returns Close button element
 */
export const CloseButton: React.FC<CloseButtonProps> = ({ onClose, className, style }) => {
  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'var(--spacing-2)',
    right: 'var(--spacing-2)',
    width: 'var(--spacing-6)',
    height: 'var(--spacing-6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: 'var(--border-radius-sm)',
    backgroundColor: 'transparent',
    color: 'currentColor',
    cursor: 'pointer',
    fontSize: 'var(--font-size-lg)',
    opacity: '0.7',
    transition: 'all var(--transition-duration-fast) ease',
    ...style,
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const target = event.target as HTMLElement;
    target.style.opacity = '1';
    target.style.backgroundColor = 'var(--color-black-alpha-10)';
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const target = event.target as HTMLElement;
    target.style.opacity = '0.7';
    target.style.backgroundColor = 'transparent';
  };

  return (
    <button
      className={className}
      style={closeButtonStyle}
      onClick={onClose}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Lukk varsel"
      title="Lukk"
      data-testid="alert-close-button"
    >
      ×
    </button>
  );
};
