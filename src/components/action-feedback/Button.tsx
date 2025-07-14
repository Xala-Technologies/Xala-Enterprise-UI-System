// Button component for @xala-mock/ui-system
// Norwegian-compliant button with accessibility and confirmation support

import React, { useState } from 'react';

import type { ButtonProps } from '../../types/action-feedback.types';

// Helper function
const getClassificationIcon = (level: string): string => {
  const icons = {
    'ÅPEN': '🟢',
    'BEGRENSET': '🟡',
    'KONFIDENSIELT': '🔴',
    'HEMMELIG': '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};


// Helper function to generate CSS using design tokens
const getButtonStyles = (props: ButtonProps): React.CSSProperties => {
  const {
    variant = 'primary',
    size = 'md',
    shape = 'rounded',
    fullWidth = false,
    disabled = false,
    loading = false,
    norwegian } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-2)',
    fontFamily: 'var(--font-family-sans)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-none)',
    textAlign: 'center',
    userSelect: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all var(--transition-duration-fast) ease-in-out',
    border: 'var(--border-width) solid transparent',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    position: 'relative',
    overflow: 'hidden',
  };

  // Size-based styles
  const sizeStyles = getSizeStyles(size);

  // Shape-based styles
  const shapeStyles = getShapeStyles(shape);

  // Variant-based styles
  const variantStyles = getVariantStyles(variant, disabled, loading);

  // Full width styling
  const widthStyles = getWidthStyles(fullWidth);

  // Norwegian classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);

  // Priority styling
  const priorityStyles = getPriorityStyles(norwegian?.priority);

  return {
    ...baseStyles,
    ...sizeStyles,
    ...shapeStyles,
    ...variantStyles,
    ...widthStyles,
    ...classificationStyles,
    ...priorityStyles,
  };
};

// Get size-based styles
const getSizeStyles = (size: string): React.CSSProperties => {
  const sizes = {
    sm: {
      padding: 'var(--spacing-2) var(--spacing-3)',
      fontSize: 'var(--font-size-sm)',
      minHeight: 'var(--button-height-sm)',
    },
    md: {
      padding: 'var(--spacing-3) var(--spacing-4)',
      fontSize: 'var(--font-size-base)',
      minHeight: 'var(--touch-target-min-height)', // Norwegian WCAG 2.2 accessibility
    },
    lg: {
      padding: 'var(--spacing-4) var(--spacing-6)',
      fontSize: 'var(--font-size-lg)',
      minHeight: 'var(--button-height-lg)',
    },
    xl: {
      padding: 'var(--spacing-5) var(--spacing-8)',
      fontSize: 'var(--font-size-xl)',
      minHeight: 'var(--button-height-xl)',
    },
  };
  return sizes[size as keyof typeof sizes] || sizes.md;
};

// Get shape-based styles
const getShapeStyles = (shape: string): React.CSSProperties => {
  const shapes = {
    rounded: {
      borderRadius: 'var(--border-radius-base)',
    },
    pill: {
      borderRadius: 'var(--border-radius-full)',
    },
    square: {
      borderRadius: 'var(--border-radius-sm)',
    },
  };
  return shapes[shape as keyof typeof shapes] || shapes.rounded;
};

// Get variant-based styles
const getVariantStyles = (
  variant: string,
  disabled: boolean,
  loading: boolean
): React.CSSProperties => {
  const alpha = disabled || loading ? '50' : '100';

  const variants = {
    primary: {
      backgroundColor: `var(--color-primary-${alpha === '50' ? '300' : '600'})`,
      color: 'var(--color-white)',
      borderColor: `var(--color-primary-${alpha === '50' ? '300' : '600'})`,
    },
    secondary: {
      backgroundColor: 'var(--background-primary)',
      color: `var(--color-primary-${alpha === '50' ? '400' : '600'})`,
      borderColor: `var(--color-primary-${alpha === '50' ? '300' : '600'})`,
    },
    tertiary: {
      backgroundColor: 'transparent',
      color: `var(--color-primary-${alpha === '50' ? '400' : '600'})`,
      borderColor: 'transparent',
    },
    danger: {
      backgroundColor: `var(--color-red-${alpha === '50' ? '300' : '600'})`,
      color: 'var(--color-white)',
      borderColor: `var(--color-red-${alpha === '50' ? '300' : '600'})`,
    },
    success: {
      backgroundColor: `var(--color-green-${alpha === '50' ? '300' : '600'})`,
      color: 'var(--color-white)',
      borderColor: `var(--color-green-${alpha === '50' ? '300' : '600'})`,
    },
    warning: {
      backgroundColor: `var(--color-orange-${alpha === '50' ? '300' : '600'})`,
      color: 'var(--color-white)',
      borderColor: `var(--color-orange-${alpha === '50' ? '300' : '600'})`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: `var(--text-${alpha === '50' ? 'tertiary' : 'primary'})`,
      borderColor: 'transparent',
    },
    link: {
      backgroundColor: 'transparent',
      color: `var(--color-primary-${alpha === '50' ? '400' : '600'})`,
      borderColor: 'transparent',
      textDecoration: 'underline',
      padding: '0',
      minHeight: 'auto',
    },
  };
  return variants[variant as keyof typeof variants] || variants.primary;
};

// Get width styles
const getWidthStyles = (fullWidth: boolean): React.CSSProperties => {
  return fullWidth ? { width: '100%' } : {};
};

// Get Norwegian classification styles
const getClassificationStyles = (classification?: string): React.CSSProperties => {
  if (!classification) {
    return {};
  }

  const classificationStyles: Record<string, React.CSSProperties> = {
    ÅPEN: {
      borderLeft: 'var(--border-accent-width) solid var(--color-green-500)',
    },
    BEGRENSET: {
      borderLeft: 'var(--border-accent-width) solid var(--color-orange-500)',
    },
    KONFIDENSIELT: {
      borderLeft: 'var(--border-accent-width) solid var(--color-red-500)',
      boxShadow: '0 0 0 var(--border-width) var(--color-red-200)',
    },
    HEMMELIG: {
      borderLeft: 'var(--border-accent-width) solid var(--color-red-800)',
      boxShadow: '0 0 0 var(--border-width) var(--color-red-400)',
      backgroundColor: 'var(--color-red-900)',
      color: 'var(--color-white)',
    },
  };

  return classificationStyles[classification] || {};
};

// Get priority styles
const getPriorityStyles = (priority?: string): React.CSSProperties => {
  if (!priority) {
    return {};
  }

  const priorityStyles: Record<string, React.CSSProperties> = {
    low: {
      opacity: '0.8',
    },
    medium: {
      // Default styling
    },
    high: {
      boxShadow: 'var(--shadow-md)',
      transform: 'translateY(var(--transform-hover))',
    },
    critical: {
      boxShadow: 'var(--shadow-lg)',
      animation: 'button-pulse 2s infinite',
      borderWidth: 'var(--border-width-thick)',
    },
  };

  return priorityStyles[priority] || {};
};

// Classification indicator component
const ClassificationIndicator = ({ level }: { level: string }): React.ReactElement => {
  return (
    <span
      style={{
        fontSize: 'var(--font-size-xs)',
        marginRight: 'var(--spacing-1)',
        opacity: '0.9',
      }}
      aria-label={`Classification: ${level}`}
      title={`Klassifisering: ${level}`}
    >
      {getClassificationIcon(level)}
    </span>
  );
};

// Loading spinner component
const LoadingSpinner = ({ size }: { size: string }): React.ReactElement => {
  const spinnerSize = size === 'sm' ? '12px' : size === 'lg' ? '20px' : '16px';
  return (
    <div
      style={{
        width: spinnerSize,
        height: spinnerSize,
        border: 'var(--border-width) solid transparent',
        borderTop: 'var(--border-width) solid currentColor',
        borderRadius: 'var(--border-radius-full)',
        animation: 'spin 1s linear infinite',
      }}
      role="status"
      aria-label="Laster..."
    />
  );
};

// Confirmation modal component (simplified inline implementation)
const ConfirmationDialog = ({
  isOpen,
  messageKey,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  messageKey?: string;
  onConfirm: () => void;
  onCancel: () => void;
}): React.ReactElement | null => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
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
      }}
      onClick={onCancel}
    >
      <div
        style={{
          backgroundColor: 'var(--background-primary)',
          padding: 'var(--spacing-6)',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          maxWidth: 'var(--modal-width-sm)',
          margin: 'var(--spacing-4)',
        }}
        onClick={e => e.stopPropagation()}
      >
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
          >
            Bekreft
          </button>
        </div>
      </div>
    </div>
  );
};

// Button component with forwardRef
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref): React.ReactElement => {
  const {
    variant = 'primary',
    size = 'md',
    shape = 'rounded',
    type = 'button',
    fullWidth = false,
    disabled = false,
    loading = false,
    children,
    labelKey,
    icon,
    iconPosition = 'start',
    className = '',
    style,
    norwegian,
    ariaLabel,
    testId = 'button',
    onClick,
    ...buttonProps
  } = props;

  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const isDisabled = disabled || loading;
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (norwegian?.requiresConfirmation) {
      setShowConfirmation(true);
    } else {
      onClick?.(event);
    }
  };
  
  const handleConfirm = (): void => {
    setShowConfirmation(false);
    onClick?.({} as React.MouseEvent<HTMLButtonElement>);
  };
  
  const handleCancel = (): void => {
    setShowConfirmation(false);
  };

  const combinedStyles = {
    ...getButtonStyles(props),
    ...style,
  };

  const buttonContent = (
    <>
      {loading && <LoadingSpinner size={size} />}
      {icon && iconPosition === 'start' && !loading && icon}
      {norwegian?.classification && <ClassificationIndicator level={norwegian.classification} />}
      {children || labelKey}
      {icon && iconPosition === 'end' && !loading && icon}
    </>
  );

  return (
    <>
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={className}
        style={combinedStyles}
        onClick={handleClick}
        aria-label={ariaLabel || (loading ? `Loading: ${labelKey || children}` : undefined)}
        aria-busy={loading}
        aria-disabled={isDisabled}
        data-testid={testId}
        data-variant={variant}
        data-size={size}
        data-classification={norwegian?.classification}
        data-municipality={norwegian?.municipality}
        data-action-type={norwegian?.actionType}
        data-priority={norwegian?.priority}
        {...buttonProps}
      >
        {buttonContent}
      </button>

      {/* Confirmation dialog */}
      <ConfirmationDialog
        isOpen={showConfirmation}
        messageKey={norwegian?.confirmationMessageKey}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
});

Button.displayName = 'Button';
