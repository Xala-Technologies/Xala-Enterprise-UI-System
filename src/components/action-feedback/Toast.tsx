// Toast component for @xala-mock/ui-system
// Norwegian-compliant toast notification with accessibility and positioning

import React, { useEffect, useState } from 'react';

import type { ToastProps } from '../../types/action-feedback.types';

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
const getToastStyles = (props: ToastProps): React.CSSProperties => {
  const { variant = 'info', position = 'bottom-right', norwegian } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--spacing-3)',
    padding: 'var(--spacing-4)',
    minWidth: 'var(--toast-min-width)',
    maxWidth: 'var(--toast-max-width)',
    borderRadius: 'var(--border-radius-lg)',
    border: 'var(--border-width) solid transparent',
    fontFamily: 'var(--font-family-sans)',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-normal)',
    boxShadow: 'var(--shadow-xl)',
    backdropFilter: 'blur(var(--blur-md))',
    position: 'fixed',
    zIndex: 'var(--z-index-toast)',
    animation: 'toast-slide-in var(--transition-duration-normal) ease-out',
    cursor: 'pointer',
    transition: 'all var(--transition-duration-fast) ease',
  };

  // Position-based styles
  const positionStyles = getPositionStyles(position);

  // Variant-based styles
  const variantStyles = getVariantStyles(variant);

  // Priority styling
  const priorityStyles = getPriorityStyles(norwegian?.priority);

  // Classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);

  return {
    ...baseStyles,
    ...positionStyles,
    ...variantStyles,
    ...priorityStyles,
    ...classificationStyles,
  };
};

// Get position-based styles
const getPositionStyles = (position: string): React.CSSProperties => {
  const positions = {
    'top-left': {
      top: 'var(--spacing-4)',
      left: 'var(--spacing-4)',
    },
    'top-center': {
      top: 'var(--spacing-4)',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    'top-right': {
      top: 'var(--spacing-4)',
      right: 'var(--spacing-4)',
    },
    'bottom-left': {
      bottom: 'var(--spacing-4)',
      left: 'var(--spacing-4)',
    },
    'bottom-center': {
      bottom: 'var(--spacing-4)',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    'bottom-right': {
      bottom: 'var(--spacing-4)',
      right: 'var(--spacing-4)',
    },
  };
  return positions[position as keyof typeof positions] || positions['bottom-right'];
};

// Get variant-based styles
const getVariantStyles = (variant: string): React.CSSProperties => {
  const variants = {
    info: {
      backgroundColor: 'var(--color-blue-600)',
      borderColor: 'var(--color-blue-700)',
      color: 'var(--color-white)',
    },
    success: {
      backgroundColor: 'var(--color-green-600)',
      borderColor: 'var(--color-green-700)',
      color: 'var(--color-white)',
    },
    warning: {
      backgroundColor: 'var(--color-orange-600)',
      borderColor: 'var(--color-orange-700)',
      color: 'var(--color-white)',
    },
    error: {
      backgroundColor: 'var(--color-red-600)',
      borderColor: 'var(--color-red-700)',
      color: 'var(--color-white)',
    },
  };
  return variants[variant as keyof typeof variants] || variants.info;
};

// Get priority styles
const getPriorityStyles = (priority?: string): React.CSSProperties => {
  if (!priority) {
    return {};
  }

  const priorityStyles: Record<string, React.CSSProperties> = {
    low: {
      opacity: '0.9',
    },
    medium: {
      // Default styling
    },
    high: {
      borderWidth: 'var(--border-width-thick)',
      boxShadow: 'var(--shadow-2xl)',
    },
    critical: {
      borderWidth: 'var(--border-width-thick)',
      boxShadow: 'var(--shadow-2xl)',
      animation:
        'toast-pulse 2s infinite, toast-slide-in var(--transition-duration-normal) ease-out',
    },
  };

  return priorityStyles[priority] || {};
};

// Get Norwegian classification styles
const getClassificationStyles = (classification?: string): React.CSSProperties => {
  if (!classification) {
    return {};
  }

  const classificationStyles: Record<string, React.CSSProperties> = {
    ÅPEN: {
      borderLeft: 'var(--border-accent-width) solid var(--color-green-400)',
    },
    BEGRENSET: {
      borderLeft: 'var(--border-accent-width) solid var(--color-orange-400)',
    },
    KONFIDENSIELT: {
      borderLeft: 'var(--border-accent-width) solid var(--color-red-400)',
      backgroundColor: 'var(--color-red-800)',
    },
    HEMMELIG: {
      borderLeft: 'var(--border-accent-width) solid var(--color-red-300)',
      backgroundColor: 'var(--color-red-900)',
      boxShadow: '0 0 0 var(--border-width) var(--color-red-400), var(--shadow-xl)',
    },
  };

  return classificationStyles[classification] || {};
};

// Toast icon component
const ToastIcon = ({ _variant, icon }: { variant: string; icon?: React.ReactNode }): React.ReactElement => {
  if (icon) {
    return (
      <span
        style={{
          fontSize: 'var(--font-size-lg)',
          flexShrink: 0,
          marginTop: 'var(--spacing-1)',
        }}
        aria-hidden="true"
      >
        {icon}
      </span>
    );
  }

  const getVariantIcon = (variant: string): string => {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
    };
    return icons[variant as keyof typeof icons] || 'ℹ️';
  };

  return (
    <span
      style={{
        fontSize: 'var(--font-size-lg)',
        flexShrink: 0,
        marginTop: 'var(--spacing-1)',
      }}
      aria-hidden="true"
    >
      {getVariantIcon(variant)}
    </span>
  );
};

// Classification indicator component
const ClassificationIndicator = ({ level }: { level: string }): React.ReactElement => {
  return (
    <span
      style={{
        fontSize: 'var(--font-size-xs)',
        marginLeft: 'var(--spacing-2)',
        opacity: '0.9',
      }}
      aria-label={`Classification: ${level}`}
      title={`Klassifisering: ${level}`}
    >
      {getClassificationIcon(level)}
    </span>
  );
};

// Close button component
const CloseButton = ({ onClose }: { onClose: () => void }): React.ReactElement => {
  return (
    <button
      style={{
        marginLeft: 'auto',
        width: 'var(--spacing-5)',
        height: 'var(--spacing-5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        borderRadius: 'var(--border-radius-sm)',
        backgroundColor: 'transparent',
        color: 'currentColor',
        cursor: 'pointer',
        fontSize: 'var(--font-size-base)',
        opacity: '0.8',
        transition: 'all var(--transition-duration-fast) ease',
        flexShrink: 0,
      }}
      onClick={e => {
        e.stopPropagation();
        onClose();
      }}
      onMouseEnter={e => {
        (e.target as HTMLElement).style.opacity = '1';
        (e.target as HTMLElement).style.backgroundColor = 'var(--color-white-alpha-20)';
      }}
      onMouseLeave={e => {
        (e.target as HTMLElement).style.opacity = '0.8';
        (e.target as HTMLElement).style.backgroundColor = 'transparent';
      }}
      aria-label="Lukk varsel"
      title="Lukk"
    >
      ×
    </button>
  );
};

// Toast action button
const ToastActionButton = ({ action }: { action: { label: string; handler: () => void } }): React.ReactElement => {
  return (
    <button
      style={{
        padding: 'var(--spacing-2) var(--spacing-3)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
        backgroundColor: 'var(--color-white-alpha-20)',
        color: 'currentColor',
        border: 'var(--border-width) solid var(--color-white-alpha-30)',
        borderRadius: 'var(--border-radius-base)',
        cursor: 'pointer',
        transition: 'all var(--transition-duration-fast) ease',
        marginTop: 'var(--spacing-2)',
      }}
      onClick={e => {
        e.stopPropagation();
        action.handler();
      }}
      onMouseEnter={e => {
        (e.target as HTMLElement).style.backgroundColor = 'var(--color-white-alpha-30)';
      }}
      onMouseLeave={e => {
        (e.target as HTMLElement).style.backgroundColor = 'var(--color-white-alpha-20)';
      }}
      aria-label={action.labelKey}
    >
      {/* TODO: Replace with actual localization */}
      {action.labelKey}
    </button>
  );
};

// Progress bar for timed toasts
const ProgressBar = ({ duration, paused }: { duration: number; paused: boolean }): React.ReactElement => {
  return () => clearInterval(interval);
  }, [duration, paused]);

  if (duration <= 0) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--spacing-1)',
        backgroundColor: 'var(--color-white-alpha-20)',
        borderRadius: '0 0 var(--border-radius-lg) var(--border-radius-lg)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: 'var(--color-white)',
          transition: paused ? 'none' : 'width 0.1s linear',
        }}
      />
    </div>
  );
};

// Priority indicator
const getPriorityIcon = (priority: string): string => {
  const icons = {
    low: '▪',
    medium: '■',
    high: '◆',
    critical: '⬛',
  };
  return icons[priority as keyof typeof icons] || '■';
};

const PriorityIndicator = ({ priority }: { priority?: string }): React.ReactElement => {
  return (
    <span
      style={{
        fontSize: 'var(--font-size-xs)',
        marginLeft: 'var(--spacing-1)',
        opacity: '0.9',
      }}
      aria-label={`Priority: ${priority}`}
      title={`Prioritet: ${priority}`}
    >
      {getPriorityIcon(priority)}
    </span>
  );
};

// Toast component with forwardRef
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>((props, ref): React.ReactElement => {
  const {
    isOpen = true,
    variant = 'info',
    title,
    titleKey,
    message,
    messageKey,
    icon,
    duration = 5000,
    position = 'bottom-right',
    persistent = false,
    closable = true,
    pauseOnHover = true,
    children,
    className = '',
    style,
    actions,
    norwegian,
    ariaLabel,
    testId = 'toast',
    onClose,
    onOpen,
    onActionClick,
    ...divProps
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      onOpen?.();
    } else {
      setIsVisible(false);
    }
  }, [isOpen, onOpen]);

  useEffect(() => {
    if (!isVisible || persistent || isPaused) return;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, duration, persistent, isPaused]);

  const handleClose = (): void => {
    setIsVisible(false);
    onClose?.();
  };

  const handleMouseEnter = (): void => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = (): void => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const combinedStyles = {
    ...getToastStyles(props),
    ...style,
  };

  const getToastRole = (): string => {
    return variant === 'error' || variant === 'warning' ? 'alert' : 'status';
  };

  const getAriaLive = (): 'polite' | 'assertive' | 'off' => {
    if (variant === 'error') return 'assertive';
    if (variant === 'warning') return 'assertive';
    return 'polite';
  };

  const getVariantIcon = (variant: string): string => {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
    };
    return icons[variant as keyof typeof icons] || 'ℹ️';
  };

  if (!isVisible) {
    return <></>;
  }

  return (
    <div
      ref={ref}
      role={getToastRole()}
      aria-live={getAriaLive()}
      aria-atomic="true"
      className={className}
      style={combinedStyles}
      data-testid={testId}
      data-variant={variant}
      data-position={position}
      data-classification={norwegian?.classification}
      data-priority={norwegian?.priority}
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...divProps}
    >
      {/* Toast icon */}
      <div style={{ flexShrink: 0 }}>
        {icon || <span aria-hidden="true">{getVariantIcon(variant)}</span>}
      </div>

      {/* Toast content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Toast title */}
        {(title || titleKey) && (
          <div
            style={{
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--spacing-1)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-1)',
            }}
          >
            <span>{title || titleKey}</span>

            {/* Classification indicator */}
            {norwegian?.classification && (
              <ClassificationIndicator level={norwegian.classification} />
            )}

            {/* Priority indicator */}
            {norwegian?.priority && (
              <PriorityIndicator priority={norwegian.priority} />
            )}
          </div>
        )}

        {/* Toast message */}
        {(message || messageKey || children) && (
          <div
            style={{
              fontSize: 'var(--font-size-sm)',
              lineHeight: 'var(--line-height-relaxed)',
              color: 'inherit',
            }}
          >
            {children || message || messageKey}
          </div>
        )}

        {/* Action buttons */}
        {actions && actions.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: 'var(--spacing-2)',
              marginTop: 'var(--spacing-3)',
            }}
          >
            {actions.map((action, index) => (
              <button
                key={index}
                style={{
                  padding: 'var(--spacing-1) var(--spacing-2)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  backgroundColor: 'transparent',
                  color: 'currentColor',
                  border: 'var(--border-width) solid currentColor',
                  borderRadius: 'var(--border-radius-sm)',
                  cursor: 'pointer',
                }}
                onClick={() => onActionClick?.(action)}
              >
                {action.labelKey}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Close button */}
      {closable && <CloseButton onClose={handleClose} />}
    </div>
  );
});

Toast.displayName = 'Toast';
