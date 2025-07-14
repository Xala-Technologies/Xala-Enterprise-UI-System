// Modal component for @xala-mock/ui-system
// Norwegian-compliant modal with accessibility and focus management

import React, { useEffect } from 'react';

import type { ModalProps } from '../../types/action-feedback.types';

// Helper function to generate CSS using design tokens
const getModalStyles = (props: ModalProps): React.CSSProperties => {
  const { size = 'md', centered = true, norwegian } = props;

  // Base modal overlay styles
  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--color-black-alpha-50)',
    display: 'flex',
    alignItems: centered ? 'center' : 'flex-start',
    justifyContent: 'center',
    zIndex: 'var(--z-index-modal)',
    padding: 'var(--spacing-4)',
    backdropFilter: 'blur(var(--blur-sm))',
    animation: 'modal-fade-in var(--transition-duration-normal) ease-out',
  };

  return overlayStyles;
};

// Get modal content styles
const getModalContentStyles = (props: ModalProps): React.CSSProperties => {
  const { size = 'md', centered = true, scrollable = false, norwegian } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    backgroundColor: 'var(--background-primary)',
    borderRadius: 'var(--border-radius-lg)',
    boxShadow: 'var(--shadow-2xl)',
    border: 'var(--border-width) solid var(--border-primary)',
    fontFamily: 'var(--font-family-sans)',
    position: 'relative',
    width: '100%',
    maxHeight: centered ? '90vh' : 'calc(100vh - var(--spacing-8))',
    marginTop: centered ? 0 : 'var(--spacing-4)',
    display: 'flex',
    flexDirection: 'column',
    animation: 'modal-slide-in var(--transition-duration-normal) ease-out',
  };

  // Size-based styles
  const sizeStyles = getSizeStyles(size);

  // Scrollable content handling
  const scrollableStyles = scrollable
    ? {
        overflow: 'hidden',
      }
    : {};

  // Norwegian classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);

  return {
    ...baseStyles,
    ...sizeStyles,
    ...scrollableStyles,
    ...classificationStyles,
  };
};

// Get size-based styles
const getSizeStyles = (size: string): React.CSSProperties => {
  const sizes = {
    sm: {
      maxWidth: 'var(--modal-width-sm)',
    },
    md: {
      maxWidth: 'var(--modal-width-md)',
    },
    lg: {
      maxWidth: 'var(--modal-width-lg)',
    },
    xl: {
      maxWidth: 'var(--modal-width-xl)',
    },
    full: {
      maxWidth: '95vw',
      maxHeight: '95vh',
    },
  };
  return sizes[size as keyof typeof sizes] || sizes.md;
};

// Get Norwegian classification styles
const getClassificationStyles = (classification?: string): React.CSSProperties => {
  if (!classification) {
    return {};
  }

  const classificationStyles: Record<string, React.CSSProperties> = {
    ÅPEN: {
      borderTop: 'var(--border-accent-width) solid var(--color-green-500)',
    },
    BEGRENSET: {
      borderTop: 'var(--border-accent-width) solid var(--color-orange-500)',
    },
    KONFIDENSIELT: {
      borderTop: 'var(--border-accent-width) solid var(--color-red-500)',
      boxShadow: '0 0 0 var(--border-width) var(--color-red-200), var(--shadow-2xl)',
    },
    HEMMELIG: {
      borderTop: 'var(--border-accent-width) solid var(--color-red-800)',
      boxShadow: '0 0 0 var(--border-width-thick) var(--color-red-400), var(--shadow-2xl)',
      backgroundColor: 'var(--color-red-50)',
    },
  };

  return classificationStyles[classification] || {};
};

// Modal header component
const ModalHeader = ({
  titleKey,
  title,
  closable,
  norwegian,
  onClose,
}: {
  titleKey?: string;
  title?: string;
  closable: boolean;
  norwegian?: { classification?: string };
  onClose: () => void;
}): void => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--spacing-6)',
        borderBottom: 'var(--border-width) solid var(--border-secondary)',
        borderRadius: 'var(--border-radius-lg) var(--border-radius-lg) 0 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-3)',
        }}
      >
        <h2
          style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-primary)',
            margin: 0,
          }}
        >
          {/* TODO: Replace with actual localization */}
          {title || titleKey}
        </h2>

        {/* Classification indicator */}
        {norwegian?.classification && <ClassificationIndicator level={norwegian.classification} />}

        {/* Category indicator */}
        {norwegian?.category && <CategoryIndicator category={norwegian.category} />}
      </div>

      {closable && (
        <button
          style={{
            width: 'var(--spacing-8)',
            height: 'var(--spacing-8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            borderRadius: 'var(--border-radius-base)',
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: 'var(--font-size-xl)',
            transition: 'all var(--transition-duration-fast) ease',
          }}
          onClick={onClose}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.backgroundColor = 'var(--color-gray-100)';
            (e.target as HTMLElement).style.color = 'var(--text-primary)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.backgroundColor = 'transparent';
            (e.target as HTMLElement).style.color = 'var(--text-secondary)';
          }}
          aria-label="Lukk modal"
          title="Lukk"
        >
          ×
        </button>
      )}
    </div>
  );
};

// Classification indicator component
const ClassificationIndicator = ({ level }: { level: string }): void => {
  const getClassificationIcon = (classification: string): string => {
    const icons = {
      ÅPEN: '🟢',
      BEGRENSET: '🟡',
      KONFIDENSIELT: '🔴',
      HEMMELIG: '⚫',
    };
    return icons[classification as keyof typeof icons] || '❓';
  };

  return (
    <span
      style={{
        fontSize: 'var(--font-size-sm)',
        padding: 'var(--spacing-1) var(--spacing-2)',
        backgroundColor: 'var(--color-gray-100)',
        borderRadius: 'var(--border-radius-sm)',
        border: 'var(--border-width) solid var(--border-secondary)',
      }}
      aria-label={`Classification: ${level}`}
      title={`Klassifisering: ${level}`}
    >
      {getClassificationIcon(level)} {level}
    </span>
  );
};

// Category indicator component
const CategoryIndicator = ({ category }: { category: string }): void => {
  const getCategoryIcon = (category: string): string => {
    const icons = {
      form: '📝',
      confirmation: '✔️',
      information: 'ℹ️',
      warning: '⚠️',
      error: '❌',
    };
    return icons[category as keyof typeof icons] || '📋';
  };

  return (
    <span
      style={{
        fontSize: 'var(--font-size-xs)',
        padding: 'var(--spacing-1) var(--spacing-2)',
        backgroundColor: 'var(--color-blue-100)',
        color: 'var(--color-blue-800)',
        borderRadius: 'var(--border-radius-sm)',
      }}
      aria-label={`Category: ${category}`}
      title={`Kategori: ${category}`}
    >
      {getCategoryIcon(category)} {category}
    </span>
  );
};

// Modal body component
const ModalBody = ({ _children, _scrollable }: { children: React.ReactNode; scrollable: boolean }): void => {
  return (
    <div
      style={{
        flex: 1,
        padding: 'var(--spacing-6)',
        overflow: scrollable ? 'auto' : 'visible',
        color: 'var(--text-primary)',
        lineHeight: 'var(--line-height-relaxed)',
      }}
    >
      {children}
    </div>
  );
};

// Focus trap hook (simplified implementation)
const useFocusTrap = (
  isOpen: boolean,
  enabled: boolean,
  containerRef: React.RefObject<HTMLElement>
): void => {
  useEffect((): void => {
    if (!isOpen || !enabled || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') {
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement.focus();

    return (): void => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen, enabled, containerRef]);
};

// Modal component with forwardRef
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref): void => {
  const {
    isOpen,
    titleKey,
    title,
    children,
    size = 'md',
    centered = true,
    closable = true,
    closeOnEscape = true,
    closeOnOverlay = true,
    showOverlay = true,
    persistent = false,
    scrollable = false,
    norwegian,
    onOpen,
    onClose,
    onEscapeKey,
    onOverlayClick,
    className,
    style,
    testId,
    'aria-label': ariaLabel,
    ...divProps
  } = props;

  const modalRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Focus trap management
  useFocusTrap(isOpen, norwegian?.focusTrap !== false, contentRef);

  // Handle escape key
  useEffect((): void => {
    if (!isOpen || !closeOnEscape) {
      return;
    }

    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onEscapeKey?.();
        if (!persistent) {
          onClose?.();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, persistent, onEscapeKey, onClose]);

  // Handle modal opening
  useEffect((): void => {
    if (isOpen) {
      onOpen?.();

      // Announce to screen readers
      if (norwegian?.announceOnOpen && norwegian.announceMessageKey) {
        // TODO: Implement screen reader announcement
      }

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return (): void => {
      document.body.style.overflow = '';
    };
  }, [isOpen, onOpen, norwegian]);

  const overlayStyles = getModalStyles(props);
  const contentStyles = getModalContentStyles(props);
  const combinedOverlayStyles = { ...overlayStyles, ...style };

  const handleOverlayClick = (e: React.MouseEvent<HTMLElement>): void => {
    if (e.target === e.currentTarget && closeOnOverlay && !persistent) {
      onOverlayClick?.();
      onClose?.();
    }
  };

  const handleClose = (): void => {
    if (norwegian?.closeConfirmationRequired) {
      // TODO: Show confirmation dialog
      return;
    }
    onClose?.();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Modal overlay */}
      {showOverlay && (
        <div
          style={combinedOverlayStyles}
          onClick={handleOverlayClick}
          data-testid={`${testId}-overlay`}
        />
      )}

      {/* Modal content */}
      <div
        ref={modalRef}
        style={overlayStyles}
        className={className}
        data-testid={testId}
        data-size={size}
        data-classification={norwegian?.classification}
        data-municipality={norwegian?.municipality}
        data-category={norwegian?.category}
        onClick={handleOverlayClick}
        {...divProps}
      >
        <div
          ref={contentRef}
          style={contentStyles}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title || titleKey ? 'modal-title' : undefined}
          aria-label={ariaLabel || title || titleKey}
          onClick={e => e.stopPropagation()}
        >
          {/* Modal header */}
          {(title || titleKey) && (
            <ModalHeader
              titleKey={titleKey}
              title={title}
              closable={closable}
              norwegian={norwegian}
              onClose={handleClose}
            />
          )}

          {/* Modal body */}
          <ModalBody scrollable={scrollable}>{children}</ModalBody>

          {/* Norwegian compliance footer */}
          {norwegian?.classification && (
            <div
              style={{
                padding: 'var(--spacing-4) var(--spacing-6)',
                borderTop: 'var(--border-width) solid var(--border-secondary)',
                backgroundColor: 'var(--color-gray-25)',
                borderRadius: '0 0 var(--border-radius-lg) var(--border-radius-lg)',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--text-tertiary)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>
                🔒 Klassifisering: {norwegian.classification}
                {norwegian.municipality && ` • ${norwegian.municipality}`}
              </span>
              {norwegian.auditLog && <span>📝 Revisjon aktivert</span>}
            </div>
          )}
        </div>
      </div>
    </>
  );
});

Modal.displayName = 'Modal';
