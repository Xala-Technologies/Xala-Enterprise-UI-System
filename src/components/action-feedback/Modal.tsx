// Modal component for @xala-mock/ui-system
// Norwegian-compliant modal with accessibility and focus management

import React from 'react';

/**
 * Modal text configuration interface
 */
export interface ModalTexts {
  readonly closeButtonAriaLabel: string;
  readonly closeButtonTitle: string;
  readonly classificationLabel: string;
  readonly auditActiveText: string;
}

/**
 * Default text configuration for modal
 */
const defaultTexts: ModalTexts = {
  closeButtonAriaLabel: 'Close modal',
  closeButtonTitle: 'Close',
  classificationLabel: '🔒 Classification:',
  auditActiveText: '📝 Audit active',
};

/**
 * Norwegian action context interface
 */
export interface NorwegianActionContext {
  classification: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  category?: string;
  municipality?: string;
  auditLog?: boolean;
}

/**
 * Modal component props interface
 */
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly isOpen?: boolean;
  // readonly open?: boolean; // Unused - keeping for API compatibility
  readonly onOpenChange?: (open: boolean) => void;
  readonly title?: string;
  readonly titleKey?: string;
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';
  readonly centered?: boolean;
  readonly closable?: boolean;
  readonly closeOnEscape?: boolean;
  readonly closeOnOverlay?: boolean;
  readonly showOverlay?: boolean;
  readonly scrollable?: boolean;
  readonly persistent?: boolean;
  readonly norwegian?: NorwegianActionContext;
  readonly ariaLabel?: string;
  readonly testId?: string;
  readonly texts?: Partial<ModalTexts>;
  readonly onClose?: () => void;
  readonly onEscapeKey?: () => void;
  readonly onOverlayClick?: () => void;
}

// Helper functions
const getClassificationIcon = (level: string): string => {
  const icons = { ÅPEN: '🟢', BEGRENSET: '🟡', KONFIDENSIELT: '🔴', HEMMELIG: '⚫' };
  return icons[level as keyof typeof icons] || '📋';
};

const getCategoryIcon = (category: string): string => {
  const icons = { system: '⚙️', validation: '✅', security: '🔒', process: '🔄', user: '👤' };
  return icons[category as keyof typeof icons] || '📋';
};

// Helper function to generate CSS using design tokens
const getModalStyles = (props: ModalProps): React.CSSProperties => {
  // eslint-disable-next-line no-unused-vars
  const { size: _size = 'md', centered: _centered = true, norwegian: _norwegian } = props;

  // Base modal overlay styles
  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--color-black-alpha-50)',
    display: 'flex',
    alignItems: _centered ? 'center' : 'flex-start',
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
  const scrollableStyles = scrollable ? { overflow: 'hidden' } : {};

  // Norwegian classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);

  return { ...baseStyles, ...sizeStyles, ...scrollableStyles, ...classificationStyles };
};

// Get size-based styles
const getSizeStyles = (size: string): React.CSSProperties => {
  const sizes = {
    sm: { maxWidth: 'var(--modal-width-sm)' },
    md: { maxWidth: 'var(--modal-width-md)' },
    lg: { maxWidth: 'var(--modal-width-lg)' },
    xl: { maxWidth: 'var(--modal-width-xl)' },
    full: { maxWidth: '95vw', maxHeight: '95vh' },
  };
  return sizes[size as keyof typeof sizes] || sizes.md;
};

// Get Norwegian classification styles
const getClassificationStyles = (classification?: string): React.CSSProperties => {
  if (!classification) {
    return {};
  }

  const classificationStyles: Record<string, React.CSSProperties> = {
    ÅPEN: { borderTop: 'var(--border-accent-width) solid var(--color-green-500)' },
    BEGRENSET: { borderTop: 'var(--border-accent-width) solid var(--color-orange-500)' },
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
  texts,
}: {
  titleKey?: string;
  title?: string;
  closable: boolean;
  norwegian?: { classification?: string; category?: string };
  onClose: () => void;
  texts: ModalTexts;
}): React.ReactElement => {
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <h2
          id="modal-title"
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
          aria-label={texts.closeButtonAriaLabel}
          title={texts.closeButtonTitle}
        >
          ×
        </button>
      )}
    </div>
  );
};

// Classification indicator component
const ClassificationIndicator = ({ level }: { level: string }): React.ReactElement => {
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
const CategoryIndicator = ({ category }: { category: string }): React.ReactElement => {
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
const ModalBody = ({
  children,
  scrollable,
}: {
  children: React.ReactNode;
  scrollable: boolean;
}): React.ReactElement => {
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

// Focus trap hook
const useFocusTrap = (
  isOpen: boolean,
  enabled: boolean,
  containerRef: React.RefObject<HTMLElement>
): void => {
  React.useEffect(() => {
    if (!isOpen || !enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstFocusable?.focus();

    const handleTab = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTab);
    return (): void => container.removeEventListener('keydown', handleTab);
  }, [isOpen, enabled, containerRef]);
};

// Modal component
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  // eslint-disable-next-line no-unused-vars
  (props, _ref): React.ReactElement => {
    const {
      isOpen,
      title,
      titleKey,
      size = 'md',
      centered: _centered = true,
      closable = true,
      closeOnEscape = true,
      closeOnOverlay = true,
      showOverlay = true,
      scrollable = false,
      persistent = false,
      children,
      className = '',
      style,
      norwegian,
      ariaLabel,
      testId = 'modal',
      onClose,
      onEscapeKey,
      onOverlayClick,
      texts: userTexts,
      onOpenChange,
      ...divProps
    } = props;

    // Merge default texts with user provided texts
    const texts: ModalTexts = {
      ...defaultTexts,
      ...userTexts,
    };

    const modalRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Pure component - escape key handling moved to parent
    React.useEffect(() => {
      const handleEscape = (event: KeyboardEvent): void => {
        if (event.key === 'Escape' && closeOnEscape && !persistent) {
          onEscapeKey?.();
          onClose?.();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
      }

      return (): void => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeOnEscape, persistent, onEscapeKey, onClose]);

    // Use focus trap
    const actualIsOpen = typeof isOpen === 'boolean' ? isOpen : false;
    useFocusTrap(actualIsOpen, true, contentRef);

    const handleClose = (): void => {
      if (!persistent) {
        onOpenChange?.(false);
        onClose?.();
      }
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>): void => {
      if (closeOnOverlay && !persistent && event.target === event.currentTarget) {
        onOverlayClick?.();
        onClose?.();
      }
    };

    if (!actualIsOpen) {
      return <></>;
    }

    const overlayStyles = getModalStyles(props);
    const contentStyles = getModalContentStyles(props);
    const combinedOverlayStyles = { ...overlayStyles, ...style };

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
                titleKey={titleKey || undefined}
                title={title || undefined}
                closable={closable}
                norwegian={norwegian || undefined}
                onClose={handleClose}
                texts={texts}
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
                  {texts.classificationLabel} {norwegian.classification}
                  {norwegian.municipality && ` • ${norwegian.municipality}`}
                </span>
                {norwegian.auditLog && <span>{texts.auditActiveText}</span>}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

Modal.displayName = 'Modal';

// Rename internal components to avoid redeclaration
const _ModalHeader = ModalHeader;
const _ModalBody = ModalBody;

export { _ModalBody as ModalBody, _ModalHeader as ModalHeader };
export const ModalContent = _ModalBody;
