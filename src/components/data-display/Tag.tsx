// Tag component for @xala-mock/ui-system
// Norwegian-compliant tag component with classification and interaction support

import React from 'react';

import { TagProps } from '../../types/data-display.types';

// Helper function to generate CSS using design tokens
const getTagStyles = (props: TagProps): React.CSSProperties => {
  const {
    variant = 'default',
    size = 'md',
    interactive = false,
    removable = false,
    norwegian,
  } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-1)',
    fontFamily: 'var(--font-family-sans)',
    fontWeight: 'var(--font-weight-medium)',
    borderRadius: 'var(--border-radius-base)',
    border: 'var(--border-width) solid transparent',
    cursor: interactive ? 'pointer' : 'default',
    userSelect: 'none',
    transition: 'all 0.2s ease-in-out',
    whiteSpace: 'nowrap',
  };

  // Size-based styles
  const sizeStyles = getSizeStyles(size);

  // Variant-based styles
  const variantStyles = getVariantStyles(variant);

  // Interactive styles
  const interactiveStyles = getInteractiveStyles(interactive, variant);

  // Norwegian classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);

  return {
    ...baseStyles,
    ...sizeStyles,
    ...variantStyles,
    ...interactiveStyles,
    ...classificationStyles,
  };
};

// Get size-based styles
const getSizeStyles = (size: string): React.CSSProperties => {
  const sizes = {
    sm: {
      padding: 'var(--spacing-1) var(--spacing-2)',
      fontSize: 'var(--font-size-xs)',
      lineHeight: 'var(--line-height-tight)',
    },
    md: {
      padding: 'var(--spacing-2) var(--spacing-3)',
      fontSize: 'var(--font-size-sm)',
      lineHeight: 'var(--line-height-normal)',
    },
    lg: {
      padding: 'var(--spacing-3) var(--spacing-4)',
      fontSize: 'var(--font-size-base)',
      lineHeight: 'var(--line-height-normal)',
    },
  };
  return sizes[size as keyof typeof sizes] || sizes.md;
};

// Get variant-based styles
const getVariantStyles = (variant: string): React.CSSProperties => {
  const variants = {
    default: {
      backgroundColor: 'var(--color-gray-100)',
      color: 'var(--color-gray-700)',
      borderColor: 'var(--color-gray-200)',
    },
    primary: {
      backgroundColor: 'var(--color-primary-100)',
      color: 'var(--color-primary-700)',
      borderColor: 'var(--color-primary-200)',
    },
    secondary: {
      backgroundColor: 'var(--color-gray-100)',
      color: 'var(--color-gray-600)',
      borderColor: 'var(--color-gray-300)',
    },
    success: {
      backgroundColor: 'var(--color-green-100)',
      color: 'var(--color-green-700)',
      borderColor: 'var(--color-green-200)',
    },
    warning: {
      backgroundColor: 'var(--color-orange-100)',
      color: 'var(--color-orange-700)',
      borderColor: 'var(--color-orange-200)',
    },
    error: {
      backgroundColor: 'var(--color-red-100)',
      color: 'var(--color-red-700)',
      borderColor: 'var(--color-red-200)',
    },
    info: {
      backgroundColor: 'var(--color-blue-100)',
      color: 'var(--color-blue-700)',
      borderColor: 'var(--color-blue-200)',
    },
  };
  return variants[variant as keyof typeof variants] || variants.default;
};

// Get interactive styles
const getInteractiveStyles = (interactive: boolean, variant: string): React.CSSProperties => {
  if (!interactive) { return {}; }

  const baseInteractive = {
    ':hover': {
      transform: 'translateY(var(--transform-hover))',
      boxShadow: 'var(--shadow-sm)',
    },
    ':focus': {
      outline: 'var(--focus-ring-width) solid var(--shadow-focus)',
      outlineOffset: 'var(--focus-ring-offset)',
    },
    ':active': {
      transform: 'translateY(0)',
    },
  };

  // Variant-specific hover colors
  const hoverColors = {
    primary: { backgroundColor: 'var(--color-primary-200)' },
    success: { backgroundColor: 'var(--color-green-200)' },
    warning: { backgroundColor: 'var(--color-orange-200)' },
    error: { backgroundColor: 'var(--color-red-200)' },
    info: { backgroundColor: 'var(--color-blue-200)' },
    default: { backgroundColor: 'var(--color-gray-200)' },
    secondary: { backgroundColor: 'var(--color-gray-200)' },
  };

  return {
    ...baseInteractive,
    ':hover': {
      ...baseInteractive[':hover'],
      ...hoverColors[variant as keyof typeof hoverColors],
    },
  };
};

// Get Norwegian classification styles
const getClassificationStyles = (classification?: string): React.CSSProperties => {
  if (!classification) { return {}; }

  const classificationStyles: Record<string, React.CSSProperties> = {
    ÅPEN: {
      borderLeftColor: 'var(--color-green-500)',
      borderLeftWidth: 'var(--border-accent-width)',
    },
    BEGRENSET: {
      borderLeftColor: 'var(--color-orange-500)',
      borderLeftWidth: 'var(--border-accent-width)',
    },
    KONFIDENSIELT: {
      borderLeftColor: 'var(--color-red-500)',
      borderLeftWidth: 'var(--border-accent-width)',
      backgroundColor: 'var(--color-red-50)',
    },
    HEMMELIG: {
      borderLeftColor: 'var(--color-red-800)',
      borderLeftWidth: 'var(--border-accent-width)',
      backgroundColor: 'var(--color-red-100)',
      border: 'var(--border-width) solid var(--color-red-300)',
    },
  };

  return classificationStyles[classification] || {};
};

// Classification indicator component
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
      style={{ fontSize: 'var(--font-size-xs)' }}
      aria-label={`Classification: ${level}`}
      title={`Klassifisering: ${level}`}
    >
      {getClassificationIcon(level)}
    </span>
  );
};

// Remove button component
const RemoveButton = ({ onRemove, size }: { onRemove?: () => void; size: string }) => {
  if (!onRemove) { return null; }

  const buttonSize =
    size === 'sm' ? 'var(--spacing-3)' : size === 'lg' ? 'var(--spacing-5)' : 'var(--spacing-4)';

  return (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: buttonSize,
        height: buttonSize,
        border: 'none',
        borderRadius: 'var(--border-radius-full)',
        backgroundColor: 'transparent',
        color: 'currentColor',
        cursor: 'pointer',
        fontSize: 'var(--font-size-xs)',
        opacity: '0.7',
        transition: 'all 0.2s ease',
        marginLeft: 'var(--spacing-1)',
      }}
      onClick={e => {
        e.stopPropagation();
        onRemove();
      }}
      onMouseEnter={e => {
        (e.target as HTMLElement).style.opacity = '1';
        (e.target as HTMLElement).style.backgroundColor = 'var(--color-black-alpha-10)';
      }}
      onMouseLeave={e => {
        (e.target as HTMLElement).style.opacity = '0.7';
        (e.target as HTMLElement).style.backgroundColor = 'transparent';
      }}
      aria-label='Remove tag'
      title='Fjern'
    >
      ×
    </button>
  );
};

// Municipality indicator
const MunicipalityIndicator = ({ municipality }: { municipality?: string }) => {
  if (!municipality) { return null; }

  return (
    <span
      style={{
        fontSize: 'var(--font-size-xs)',
        opacity: '0.8',
        marginLeft: 'var(--spacing-1)',
      }}
      aria-label={`Municipality: ${municipality}`}
      title={`Kommune: ${municipality}`}
    >
      🏛️
    </span>
  );
};

// Tag component with forwardRef
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>((props, ref) => {
  const {
    labelKey,
    children,
    variant = 'default',
    size = 'md',
    interactive = false,
    removable = false,
    icon,
    norwegian,
    onClick,
    onRemove,
    className,
    style,
    testId,
    'aria-label': ariaLabel,
    ...spanProps
  } = props;

  const tagStyles = getTagStyles(props);
  const combinedStyles = { ...tagStyles, ...style };

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (interactive && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (interactive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick?.();
    }
    if (removable && event.key === 'Delete') {
      event.preventDefault();
      onRemove?.();
    }
  };

  return (
    <span
      ref={ref}
      className={className}
      style={combinedStyles}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : 'status'}
      aria-label={ariaLabel || (labelKey ? `Tag: ${labelKey}` : undefined)}
      data-testid={testId}
      data-variant={variant}
      data-size={size}
      data-classification={norwegian?.classification}
      data-municipality={norwegian?.municipality}
      data-category={norwegian?.category}
      {...spanProps}
    >
      {/* Icon */}
      {icon && <span style={{ fontSize: 'var(--font-size-sm)' }}>{icon}</span>}

      {/* Classification indicator */}
      {norwegian?.classification && <ClassificationIndicator level={norwegian.classification} />}

      {/* Tag content */}
      <span>
        {children ||
          (labelKey
            ? /* TODO: Replace with actual localization */
            labelKey
            : '')}
      </span>

      {/* Municipality indicator */}
      <MunicipalityIndicator municipality={norwegian?.municipality} />

      {/* Remove button */}
      {removable && <RemoveButton onRemove={onRemove} size={size} />}
    </span>
  );
});

Tag.displayName = 'Tag';
