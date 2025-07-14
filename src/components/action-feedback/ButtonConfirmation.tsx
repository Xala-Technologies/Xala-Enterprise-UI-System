/**
 * Button Confirmation Component
 * Confirmation dialog for Button component
 */

import React from 'react';

/**
 * Confirmation dialog component props
 */
export interface ConfirmationDialogProps {
  isOpen: boolean;
  messageKey?: string;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Confirmation dialog component
 * @param props - ConfirmationDialog component props
 * @returns Confirmation dialog element or null
 */
export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  messageKey,
  onConfirm,
  onCancel,
  className,
  style,
}) => {
  if (!isOpen) {
    return null;
  }

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--color-black-alpha-50)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 'var(--z-index-modal)',
    ...style,
  };

  const dialogStyle: React.CSSProperties = {
    backgroundColor: 'var(--background-primary)',
    padding: 'var(--spacing-6)',
    borderRadius: 'var(--border-radius-lg)',
    boxShadow: 'var(--shadow-xl)',
    maxWidth: 'var(--modal-width-sm)',
    margin: 'var(--spacing-4)',
  };

  const handleOverlayClick = (event: React.MouseEvent): void => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  const handleDialogClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  return (
    <div
      className={className}
      style={overlayStyle}
      onClick={handleOverlayClick}
      data-testid="confirmation-overlay"
    >
      <div style={dialogStyle} onClick={handleDialogClick} data-testid="confirmation-dialog">
        <div
          style={{
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--spacing-4)',
            color: 'var(--text-primary)',
          }}
        >
          Bekreft handling
        </div>

        <div
          style={{
            marginBottom: 'var(--spacing-6)',
            color: 'var(--text-secondary)',
          }}
        >
          {/* TODO: Replace with actual localization */}
          {messageKey || 'Er du sikker på at du vil utføre denne handlingen?'}
        </div>

        <div
          style={{
            display: 'flex',
            gap: 'var(--spacing-3)',
            justifyContent: 'flex-end',
          }}
        >
          <button
            style={{
              padding: 'var(--spacing-2) var(--spacing-4)',
              backgroundColor: 'var(--color-gray-200)',
              color: 'var(--color-gray-700)',
              border: 'var(--border-width) solid var(--color-gray-300)',
              borderRadius: 'var(--border-radius-base)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-sm)',
            }}
            onClick={onCancel}
            data-testid="confirmation-cancel"
          >
            Avbryt
          </button>

          <button
            style={{
              padding: 'var(--spacing-2) var(--spacing-4)',
              backgroundColor: 'var(--color-primary-600)',
              color: 'var(--color-white)',
              border: 'var(--border-width) solid var(--color-primary-600)',
              borderRadius: 'var(--border-radius-base)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-sm)',
            }}
            onClick={onConfirm}
            data-testid="confirmation-confirm"
          >
            Bekreft
          </button>
        </div>
      </div>
    </div>
  );
};
