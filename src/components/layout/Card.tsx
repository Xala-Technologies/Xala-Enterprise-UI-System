// Card component for @xala-mock/ui-system
// Content cards with Norwegian metadata and compliance features

import React, { forwardRef } from 'react';

import { CardProps } from '../../types/layout.types';

// Helper function to generate CSS using design tokens
const getCardStyles = (props: CardProps): React.CSSProperties => {
  const {
    padding = 'md',
    margin = 'none',
    background = 'primary',
    variant = 'default',
    shadow = 'md',
    borderRadius = 'md',
    interactive = false,
  } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: getBackgroundToken(background),
    padding: getPaddingToken(padding),
    margin: getMarginToken(margin),
    borderRadius: getBorderRadiusToken(borderRadius),
    boxShadow: getShadowToken(shadow),
    border: getBorderFromVariant(variant),
    fontFamily: 'var(--font-family-sans)',
    lineHeight: 'var(--line-height-normal)',
    transition: interactive ? 'all 0.2s ease-in-out' : 'none',
    cursor: interactive ? 'pointer' : 'default',
  };

  // Variant-specific styles
  const variantStyles = getVariantStyles(variant);

  // Interactive styles
  const interactiveStyles = interactive ? getInteractiveStyles() : {};

  return { ...baseStyles, ...variantStyles, ...interactiveStyles };
};

// Get background color token
const getBackgroundToken = (background: string): string => {
  const backgrounds = {
    primary: 'var(--background-primary)',
    secondary: 'var(--background-secondary)',
    tertiary: 'var(--color-gray-50)',
    transparent: 'transparent',
  };
  return backgrounds[background as keyof typeof backgrounds] || backgrounds.primary;
};

// Get padding token
const getPaddingToken = (padding: string): string => {
  const paddings = {
    none: '0',
    sm: 'var(--spacing-4)',
    md: 'var(--spacing-6)',
    lg: 'var(--spacing-8)',
    xl: 'var(--spacing-12)',
  };
  return paddings[padding as keyof typeof paddings] || paddings.md;
};

// Get margin token
const getMarginToken = (margin: string): string => {
  const margins = {
    none: '0',
    sm: 'var(--spacing-4)',
    md: 'var(--spacing-6)',
    lg: 'var(--spacing-8)',
    xl: 'var(--spacing-12)',
  };
  return margins[margin as keyof typeof margins] || margins.none;
};

// Get border radius token
const getBorderRadiusToken = (borderRadius: string): string => {
  const radiuses = {
    none: 'var(--border-radius-none)',
    sm: 'var(--border-radius-sm)',
    md: 'var(--border-radius-md)',
    lg: 'var(--border-radius-lg)',
    official: 'var(--border-radius-sm)', // Government standard
    municipal: 'var(--border-radius-base)', // Municipal standard
  };
  return radiuses[borderRadius as keyof typeof radiuses] || radiuses.md;
};

// Get shadow token
const getShadowToken = (shadow: string): string => {
  const shadows = {
    none: 'var(--shadow-none)',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
  };
  return shadows[shadow as keyof typeof shadows] || shadows.md;
};

// Get border from variant
const getBorderFromVariant = (variant: string): string => {
  const borders = {
    default: 'none',
    outlined: 'var(--border-width) solid var(--border-primary)',
    elevated: 'none',
    government: 'var(--border-width) solid var(--color-gray-300)',
    municipal: 'var(--border-width) solid var(--color-primary-200)',
  };
  return borders[variant as keyof typeof borders] || borders.default;
};

// Get variant-specific styles
const getVariantStyles = (variant: string): React.CSSProperties => {
  const variants: Record<string, React.CSSProperties> = {
    default: {},
    outlined: {
      boxShadow: 'var(--shadow-sm)',
    },
    elevated: {
      boxShadow: 'var(--shadow-lg)',
    },
    government: {
      borderRadius: 'var(--border-radius-sm)',
      boxShadow: 'var(--shadow-sm)',
      backgroundColor: 'var(--color-white)',
    },
    municipal: {
      borderRadius: 'var(--border-radius-base)',
      borderLeft: 'var(--border-accent-width) solid var(--color-primary-500)',
    },
  };
  return variants[variant] || variants.default;
};

// Get interactive styles
const getInteractiveStyles = (): React.CSSProperties => ({
  ':hover': {
    boxShadow: 'var(--shadow-lg)',
    transform: 'translateY(var(--transform-hover))',
  },
  ':focus': {
    outline: 'var(--focus-ring-width) solid var(--shadow-focus)',
    outlineOffset: 'var(--focus-ring-offset)',
  },
});

// Norwegian metadata component
const MetadataSection = ({ metadata }: { metadata: CardProps['metadata'] }) => {
  if (!metadata) { return null; }

  return (
    <div
      style={{
        marginTop: 'var(--spacing-4)',
        paddingTop: 'var(--spacing-4)',
        borderTop: 'var(--border-width) solid var(--border-primary)',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--text-secondary)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-1)',
      }}
    >
      {metadata.classification && (
        <div
          style={{
            fontWeight: 'var(--font-weight-medium)',
            color: getClassificationColor(metadata.classification),
          }}
        >
          {metadata.classification}
        </div>
      )}
      {metadata.municipality && <div>Kommune: {metadata.municipality}</div>}
      {metadata.lastUpdated && <div>Sist oppdatert: {metadata.lastUpdated}</div>}
      {metadata.compliance && metadata.compliance.length > 0 && (
        <div>Compliance: {metadata.compliance.join(', ')}</div>
      )}
    </div>
  );
};

// Get classification color
const getClassificationColor = (classification: string): string => {
  const colors = {
    ÅPEN: 'var(--color-green-600)',
    BEGRENSET: 'var(--color-orange-600)',
    KONFIDENSIELT: 'var(--color-red-600)',
    HEMMELIG: 'var(--color-red-800)',
  };
  return colors[classification as keyof typeof colors] || 'var(--text-secondary)';
};

// Card component with forwardRef for className/style props
export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    children,
    header,
    footer,
    metadata,
    className,
    style,
    testId,
    'aria-label': ariaLabel,
    interactive,
    ...cardProps
  } = props;

  const cardStyles = getCardStyles({ ...cardProps, interactive });
  const combinedStyles = { ...cardStyles, ...style };

  return (
    <div
      ref={ref}
      className={className}
      style={combinedStyles}
      data-testid={testId}
      aria-label={ariaLabel}
      role={interactive ? 'button' : 'article'}
      tabIndex={interactive ? 0 : undefined}
    >
      {/* Header section */}
      {header && (
        <div
          style={{
            marginBottom: 'var(--spacing-4)',
            paddingBottom: 'var(--spacing-4)',
            borderBottom: 'var(--border-width) solid var(--border-primary)',
          }}
        >
          {header}
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1 }}>{children}</div>

      {/* Norwegian metadata */}
      <MetadataSection metadata={metadata} />

      {/* Footer section */}
      {footer && (
        <div
          style={{
            marginTop: 'var(--spacing-4)',
            paddingTop: 'var(--spacing-4)',
            borderTop: 'var(--border-width) solid var(--border-primary)',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
});

Card.displayName = 'Card';
