// Alert component for @xala-mock/ui-system
// Norwegian-compliant alert component with accessibility and classification support

import React from 'react';

import type { AlertProps } from '../../types/action-feedback.types';

// Helper function to generate CSS using design tokens
const getAlertStyles = (props: AlertProps): React.CSSProperties => {
  const { variant = 'info', severity = 'medium', norwegian } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--spacing-3)',
    padding: 'var(--spacing-4)',
    borderRadius: 'var(--border-radius-base)',
    border: 'var(--border-width) solid transparent',
    fontFamily: 'var(--font-family-sans)',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-normal)',
    position: 'relative',
    minHeight: 'var(--touch-target-min-height)', // Norwegian accessibility
  };

  // Variant-based styles
  const variantStyles = getVariantStyles(variant);

  // Severity-based styles
  const severityStyles = getSeverityStyles(severity);

  // Norwegian classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);

  // Escalation level styling
  const escalationStyles = getEscalationStyles(norwegian?.escalationLevel);

  return {
    ...baseStyles,
    ...variantStyles,
    ...severityStyles,
    ...classificationStyles,
    ...escalationStyles,
  };
};

// Get variant-based styles
const getVariantStyles = (variant: string): React.CSSProperties => {
  const variants = {
    info: {
      backgroundColor: 'var(--color-blue-50)',
      borderColor: 'var(--color-blue-200)',
      color: 'var(--color-blue-800)',
    },
    success: {
      backgroundColor: 'var(--color-green-50)',
      borderColor: 'var(--color-green-200)',
      color: 'var(--color-green-800)',
    },
    warning: {
      backgroundColor: 'var(--color-orange-50)',
      borderColor: 'var(--color-orange-200)',
      color: 'var(--color-orange-800)',
    },
    error: {
      backgroundColor: 'var(--color-red-50)',
      borderColor: 'var(--color-red-200)',
      color: 'var(--color-red-800)',
    },
  };
  return variants[variant as keyof typeof variants] || variants.info;
};

// Get severity-based styles
const getSeverityStyles = (severity: string): React.CSSProperties => {
  const severities = {
    low: {
      borderLeftWidth: 'var(--border-width)',
    },
    medium: {
      borderLeftWidth: 'var(--border-accent-width)',
    },
    high: {
      borderLeftWidth: 'var(--border-thick-width)',
      boxShadow: 'var(--shadow-sm)',
    },
    critical: {
      borderLeftWidth: 'var(--border-thick-width)',
      boxShadow: 'var(--shadow-md)',
      borderWidth: 'var(--border-width-thick)',
    },
  };
  return severities[severity as keyof typeof severities] || severities.medium;
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
      backgroundColor: 'var(--color-red-25)',
    },
    HEMMELIG: {
      borderTop: 'var(--border-accent-width) solid var(--color-red-800)',
      backgroundColor: 'var(--color-red-50)',
      border: 'var(--border-width) solid var(--color-red-200)',
    },
  };

  return classificationStyles[classification] || {};
};

// Get escalation level styles
const getEscalationStyles = (escalationLevel?: string): React.CSSProperties => {
  if (!escalationLevel) {
    return {};
  }

  const escalationStyles: Record<string, React.CSSProperties> = {
    info: {
      // Default styling
    },
    warning: {
      borderWidth: 'var(--border-width-thick)',
    },
    critical: {
      borderWidth: 'var(--border-width-thick)',
      boxShadow: 'var(--shadow-lg)',
    },
    emergency: {
      borderWidth: 'var(--border-width-thick)',
      boxShadow: 'var(--shadow-xl)',
      animation: 'alert-pulse 1.5s infinite',
    },
  };

  return escalationStyles[escalationLevel] || {};
};

// Alert icon component
const AlertIcon = ({ variant }: { variant: string }): React.ReactElement => {
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
        fontSize: 'var(--font-size-xs)',
        marginLeft: 'var(--spacing-2)',
        opacity: '0.8',
      }}
      aria-label={`Classification: ${level}`}
      title={`Klassifisering: ${level}`}
    >
      {getClassificationIcon(level)}
    </span>
  );
};

// Severity indicator component
const SeverityIndicator = ({ severity }: { severity: string }): React.ReactElement => {
  const getSeverityIcon = (severity: string): string => {
    const icons = {
      low: '🔵',
      medium: '🟡',
      high: '🟠',
      critical: '🔴',
    };
    return icons[severity as keyof typeof icons] || '🔵';
  };

  return (
    <span
      style={{
        fontSize: 'var(--font-size-xs)',
        marginLeft: 'var(--spacing-1)',
        opacity: '0.8',
      }}
      aria-label={`Severity: ${severity}`}
      title={`Alvorlighetsgrad: ${severity}`}
    >
      {getSeverityIcon(severity)}
    </span>
  );
};

// Close button component
const CloseButton = ({ onClose }: { onClose: () => void }): React.ReactElement => {
  return (
    <button
      style={{
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
      }}
      onClick={onClose}
      onMouseEnter={e => {
        (e.target as HTMLElement).style.opacity = '1';
        (e.target as HTMLElement).style.backgroundColor = 'var(--color-black-alpha-10)';
      }}
      onMouseLeave={e => {
        (e.target as HTMLElement).style.opacity = '0.7';
        (e.target as HTMLElement).style.backgroundColor = 'transparent';
      }}
      aria-label="Lukk varsel"
      title="Lukk"
    >
      ×
    </button>
  );
};

// Action buttons component
interface AlertAction {
  variant?: string;
  handler: () => void;
  labelKey: string;
}

const AlertActions = ({ actions }: { actions: AlertAction[] }): React.ReactElement | null => {
  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--spacing-2)',
        marginTop: 'var(--spacing-3)',
        flexWrap: 'wrap',
      }}
    >
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
          aria-label={action.labelKey}
        >
          {/* TODO: Replace with actual localization */}
          {action.labelKey}
        </button>
      ))}
    </div>
  );
};

// Norwegian category indicator
const CategoryIndicator = ({ category }: { category?: string }): React.ReactElement | null => {
  if (!category) {
    return null;
  }

  const getCategoryIcon = (category: string): string => {
    const icons = {
      system: '⚙️',
      validation: '✅',
      security: '🔒',
      process: '🔄',
      user: '👤',
    };
    return icons[category as keyof typeof icons] || '📋';
  };

  return (
    <span
      style={{
        fontSize: 'var(--font-size-xs)',
        marginLeft: 'var(--spacing-2)',
        opacity: '0.8',
      }}
      aria-label={`Category: ${category}`}
      title={`Kategori: ${category}`}
    >
      {getCategoryIcon(category)}
    </span>
  );
};

// Alert component with forwardRef
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const {
    titleKey,
    messageKey,
    title,
    message,
    children,
    variant = 'info',
    severity = 'medium',
    closable = false,
    icon,
    actions,
    norwegian,
    onClose,
    onAcknowledge,
    className,
    style,
    testId,
    'aria-label': ariaLabel,
    ...divProps
  } = props;

  const alertStyles = getAlertStyles(props);
  const combinedStyles = { ...alertStyles, ...style };

  const handleClose = (): void => {
    onClose?.();
  };

  const handleAcknowledge = (): void => {
    onAcknowledge?.();
    if (norwegian?.requiresAcknowledgment) {
      // TODO: Log acknowledgment for audit purposes
    }
  };

  // Determine alert role based on variant and severity
  const getAlertRole = (): string => {
    if (variant === 'error' || severity === 'critical') {
      return 'alert';
    }
    return 'status';
  };

  // Generate live region announcement
  const getAriaLive = (): 'polite' | 'assertive' => {
    if (
      variant === 'error' ||
      severity === 'critical' ||
      norwegian?.escalationLevel === 'emergency'
    ) {
      return 'assertive';
    }
    return 'polite';
  };

  return (
    <div
      ref={ref}
      role={getAlertRole()}
      aria-live={getAriaLive()}
      aria-atomic="true"
      className={className}
      style={combinedStyles}
      data-testid={testId}
      data-variant={variant}
      data-severity={severity}
      data-classification={norwegian?.classification}
      data-municipality={norwegian?.municipality}
      data-category={norwegian?.category}
      data-escalation-level={norwegian?.escalationLevel}
      aria-label={ariaLabel}
      {...divProps}
    >
      {/* Alert icon */}
      {icon || <AlertIcon variant={variant} />}

      {/* Alert content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Alert title */}
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
            {/* TODO: Replace with actual localization */}
            <span>{title || titleKey}</span>

            {/* Classification indicator */}
            {norwegian?.classification && (
              <ClassificationIndicator level={norwegian.classification} />
            )}

            {/* Severity indicator */}
            <SeverityIndicator severity={severity} />

            {/* Category indicator */}
            <CategoryIndicator category={norwegian?.category} />
          </div>
        )}

        {/* Alert message */}
        {(message || messageKey || children) && (
          <div
            style={{
              fontSize: 'var(--font-size-sm)',
              lineHeight: 'var(--line-height-relaxed)',
              color: 'inherit',
            }}
          >
            {children ||
              message ||
              (messageKey ? /* TODO: Replace with actual localization */ messageKey : '')}
          </div>
        )}

        {/* Action buttons */}
        <AlertActions actions={actions || []} />

        {/* Acknowledgment requirement */}
        {norwegian?.requiresAcknowledgment && (
          <div style={{ marginTop: 'var(--spacing-3)' }}>
            <button
              style={{
                padding: 'var(--spacing-2) var(--spacing-4)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                backgroundColor: 'currentColor',
                color: 'var(--color-white)',
                border: 'none',
                borderRadius: 'var(--border-radius-base)',
                cursor: 'pointer',
              }}
              onClick={handleAcknowledge}
            >
              {/* TODO: Replace with actual localization */}
              {norwegian.acknowledgmentMessageKey || 'Bekreft lesing'}
            </button>
          </div>
        )}

        {/* Related documentation link */}
        {norwegian?.relatedDocumentationKey && (
          <div
            style={{
              marginTop: 'var(--spacing-2)',
              fontSize: 'var(--font-size-xs)',
            }}
          >
            <a
              href="#"
              style={{
                color: 'currentColor',
                textDecoration: 'underline',
              }}
            >
              {/* TODO: Replace with actual localization */}
              📖 {norwegian.relatedDocumentationKey}
            </a>
          </div>
        )}
      </div>

      {/* Close button */}
      {closable && <CloseButton onClose={handleClose} />}
    </div>
  );
});

Alert.displayName = 'Alert';
