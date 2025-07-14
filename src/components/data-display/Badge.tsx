// Badge component for @xala-mock/ui-system
// Norwegian-compliant badge component with count and status indicators

import React from 'react';

import { BadgeProps } from '../../types/data-display.types';

// Helper function to generate CSS using design tokens
const getBadgeStyles = (props: BadgeProps): React.CSSProperties => {
  const {
    variant = 'default',
    size = 'md',
    shape = 'rounded',
    position = 'inline',
    pulse = false,
    norwegian,
  } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-family-sans)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-none)',
    textAlign: 'center',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    border: 'var(--border-width) solid transparent',
  };

  // Size-based styles
  const sizeStyles = getSizeStyles(size);

  // Shape-based styles
  const shapeStyles = getShapeStyles(shape);

  // Variant-based styles
  const variantStyles = getVariantStyles(variant);

  // Position-based styles
  const positionStyles = getPositionStyles(position);

  // Pulse animation
  const pulseStyles = getPulseStyles(pulse);

  // Norwegian classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);

  // Priority styling
  const priorityStyles = getPriorityStyles(norwegian?.priority);

  return {
    ...baseStyles,
    ...sizeStyles,
    ...shapeStyles,
    ...variantStyles,
    ...positionStyles,
    ...pulseStyles,
    ...classificationStyles,
    ...priorityStyles,
  };
};

// Get size-based styles
const getSizeStyles = (size: string): React.CSSProperties => {
  const sizes = {
    sm: {
      minWidth: 'var(--spacing-4)',
      height: 'var(--spacing-4)',
      padding: '0 var(--spacing-1)',
      fontSize: 'var(--font-size-xs)',
    },
    md: {
      minWidth: 'var(--spacing-5)',
      height: 'var(--spacing-5)',
      padding: '0 var(--spacing-2)',
      fontSize: 'var(--font-size-xs)',
    },
    lg: {
      minWidth: 'var(--spacing-6)',
      height: 'var(--spacing-6)',
      padding: '0 var(--spacing-3)',
      fontSize: 'var(--font-size-sm)',
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
const getVariantStyles = (variant: string): React.CSSProperties => {
  const variants = {
    default: {
      backgroundColor: 'var(--color-gray-500)',
      color: 'var(--color-white)',
    },
    primary: {
      backgroundColor: 'var(--color-primary-500)',
      color: 'var(--color-white)',
    },
    secondary: {
      backgroundColor: 'var(--color-gray-300)',
      color: 'var(--color-gray-700)',
    },
    success: {
      backgroundColor: 'var(--color-green-500)',
      color: 'var(--color-white)',
    },
    warning: {
      backgroundColor: 'var(--color-orange-500)',
      color: 'var(--color-white)',
    },
    error: {
      backgroundColor: 'var(--color-red-500)',
      color: 'var(--color-white)',
    },
    info: {
      backgroundColor: 'var(--color-blue-500)',
      color: 'var(--color-white)',
    },
    count: {
      backgroundColor: 'var(--color-primary-500)',
      color: 'var(--color-white)',
    },
  };
  return variants[variant as keyof typeof variants] || variants.default;
};

// Get position-based styles
const getPositionStyles = (position: string): React.CSSProperties => {
  if (position === 'inline') {
    return {};
  }

  const positions = {
    'top-right': {
      position: 'absolute',
      top: 'var(--badge-offset-negative)',
      right: 'var(--badge-offset-negative)',
    },
    'top-left': {
      position: 'absolute',
      top: 'var(--badge-offset-negative)',
      left: 'var(--badge-offset-negative)',
    },
    'bottom-right': {
      position: 'absolute',
      bottom: 'var(--badge-offset-negative)',
      right: 'var(--badge-offset-negative)',
    },
    'bottom-left': {
      position: 'absolute',
      bottom: 'var(--badge-offset-negative)',
      left: 'var(--badge-offset-negative)',
    },
  };

  return positions[position as keyof typeof positions] || {};
};

// Get pulse animation styles
const getPulseStyles = (pulse: boolean): React.CSSProperties => {
  if (!pulse) { return {}; }

  return {
    animation: 'badge-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    '@keyframes badge-pulse': {
      '0%, 100%': {
        opacity: 1,
      },
      '50%': {
        opacity: 0.5,
      },
    },
  };
};

// Get Norwegian classification styles
const getClassificationStyles = (classification?: string): React.CSSProperties => {
  if (!classification) { return {}; }

  const classificationStyles: Record<string, React.CSSProperties> = {
    ÅPEN: {
      backgroundColor: 'var(--color-green-500)',
      borderColor: 'var(--color-green-600)',
    },
    BEGRENSET: {
      backgroundColor: 'var(--color-orange-500)',
      borderColor: 'var(--color-orange-600)',
    },
    KONFIDENSIELT: {
      backgroundColor: 'var(--color-red-500)',
      borderColor: 'var(--color-red-600)',
    },
    HEMMELIG: {
      backgroundColor: 'var(--color-red-800)',
      borderColor: 'var(--color-red-900)',
      boxShadow: '0 0 0 var(--border-width) var(--color-red-400)',
    },
  };

  return classificationStyles[classification] || {};
};

// Get priority-based styles
const getPriorityStyles = (priority?: string): React.CSSProperties => {
  if (!priority) { return {}; }

  const priorityStyles: Record<string, React.CSSProperties> = {
    low: {
      backgroundColor: 'var(--color-gray-400)',
    },
    medium: {
      backgroundColor: 'var(--color-orange-500)',
    },
    high: {
      backgroundColor: 'var(--color-red-500)',
    },
    critical: {
      backgroundColor: 'var(--color-red-700)',
      animation: 'badge-pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
  };

  return priorityStyles[priority] || {};
};

// Format count with Norwegian standards
const formatCount = (count: number, maxCount?: number): string => {
  if (maxCount && count > maxCount) {
    // Use Norwegian number formatting
    if (maxCount >= 1000) {
      return `${Math.floor(maxCount / 1000)}k+`;
    }
    return `${maxCount}+`;
  }

  // Format numbers using Norwegian locale
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1).replace('.', ',')}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace('.', ',')}k`;
  }

  return count.toString();
};

// Classification indicator
const ClassificationIndicator = ({ level }: { level: string }) => {
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
      style={{ fontSize: 'var(--font-size-xs)', marginRight: 'var(--spacing-1)' }}
      aria-label={`Classification: ${level}`}
      title={`Klassifisering: ${level}`}
    >
      {getClassificationIcon(level)}
    </span>
  );
};

// Priority indicator
const PriorityIndicator = ({ priority }: { priority: string }) => {
  const getPriorityIcon = (priority: string): string => {
    const icons = {
      low: '⬇️',
      medium: '➡️',
      high: '⬆️',
      critical: '🚨',
    };
    return icons[priority as keyof typeof icons] || '';
  };

  return (
    <span
      style={{ fontSize: 'var(--font-size-xs)', marginRight: 'var(--spacing-1)' }}
      aria-label={`Priority: ${priority}`}
      title={`Prioritet: ${priority}`}
    >
      {getPriorityIcon(priority)}
    </span>
  );
};

// Badge component with forwardRef
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const {
    labelKey,
    children,
    variant = 'default',
    size = 'md',
    shape = 'rounded',
    position = 'inline',
    count,
    maxCount = 99,
    showZero = false,
    pulse = false,
    norwegian,
    className,
    style,
    testId,
    'aria-label': ariaLabel,
    ...spanProps
  } = props;

  const badgeStyles = getBadgeStyles(props);
  const combinedStyles = { ...badgeStyles, ...style };

  // Determine what to display
  const isCountBadge = typeof count === 'number';
  const shouldShow = isCountBadge ? count > 0 || showZero : true;

  // Don't render if count is 0 and showZero is false
  if (!shouldShow) {
    return null;
  }

  const displayText = isCountBadge
    ? formatCount(count, maxCount)
    : children || (labelKey ? labelKey : '');

  return (
    <span
      ref={ref}
      className={className}
      style={combinedStyles}
      aria-label={
        ariaLabel ||
        (isCountBadge ? `${count} notifications` : labelKey ? `Badge: ${labelKey}` : undefined)
      }
      data-testid={testId}
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      data-position={position}
      data-classification={norwegian?.classification}
      data-priority={norwegian?.priority}
      data-category={norwegian?.category}
      role='status'
      {...spanProps}
    >
      {/* Classification indicator */}
      {norwegian?.classification && <ClassificationIndicator level={norwegian.classification} />}

      {/* Priority indicator */}
      {norwegian?.priority && <PriorityIndicator priority={norwegian.priority} />}

      {/* Badge content */}
      <span>{displayText}</span>
    </span>
  );
});

Badge.displayName = 'Badge';
