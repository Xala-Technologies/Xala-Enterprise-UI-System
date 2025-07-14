// Section component for @xala-mock/ui-system
// Semantic page sections following Norwegian compliance standards

import React, { forwardRef } from 'react';

import { SectionProps } from '../../types/layout.types';

// Helper function to generate CSS using design tokens
const getSectionStyles = (props: SectionProps): React.CSSProperties => {
  const {
    padding = 'md',
    margin = 'none',
    background = 'transparent',
    variant = 'primary',
    spacing = 'md',
  } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'block',
    width: '100%',
    backgroundColor: getBackgroundToken(background),
    padding: getPaddingToken(padding),
    margin: getMarginToken(margin),
    borderRadius: 'var(--border-radius-base)',
    fontFamily: 'var(--font-family-sans)',
    lineHeight: 'var(--line-height-normal)',
  };

  // Variant-specific styles
  const variantStyles = getVariantStyles(variant);

  // Spacing between child elements
  const spacingStyles = getSpacingStyles(spacing);

  return { ...baseStyles, ...variantStyles, ...spacingStyles };
};

// Get background color token
const getBackgroundToken = (background: string): string => {
  const backgrounds = {
    primary: 'var(--background-primary)',
    secondary: 'var(--background-secondary)',
    tertiary: 'var(--color-gray-50)',
    transparent: 'transparent',
  };
  return backgrounds[background as keyof typeof backgrounds] || backgrounds.transparent;
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
    sm: 'var(--spacing-4) 0',
    md: 'var(--spacing-6) 0',
    lg: 'var(--spacing-8) 0',
    xl: 'var(--spacing-12) 0',
  };
  return margins[margin as keyof typeof margins] || margins.none;
};

// Get variant-specific styles
const getVariantStyles = (variant: string): React.CSSProperties => {
  const variants: Record<string, React.CSSProperties> = {
    primary: {
      borderLeft: 'var(--border-accent-width) solid var(--color-primary-500)',
    },
    secondary: {
      borderLeft: 'var(--border-accent-width) solid var(--color-gray-300)',
    },
    accent: {
      borderLeft: 'var(--border-accent-width) solid var(--color-green-500)',
      backgroundColor: 'var(--color-green-50)',
    },
    neutral: {
      border: 'var(--border-width) solid var(--border-primary)',
    },
  };
  return variants[variant] || variants.primary;
};

// Get spacing styles for child elements
const getSpacingStyles = (spacing: string): React.CSSProperties => {
  const spacings = {
    none: {},
    sm: { gap: 'var(--spacing-2)' },
    md: { gap: 'var(--spacing-4)' },
    lg: { gap: 'var(--spacing-6)' },
    xl: { gap: 'var(--spacing-8)' },
  };

  const gapStyle = spacings[spacing as keyof typeof spacings] || spacings.md;

  return {
    ...gapStyle,
    display: 'flex',
    flexDirection: 'column',
  };
};

// Section component with forwardRef for className/style props
export const Section = forwardRef<HTMLElement, SectionProps>((props, ref) => {
  const {
    children,
    as = 'section',
    className,
    style,
    testId,
    'aria-label': ariaLabel,
    ...sectionProps
  } = props;

  const sectionStyles = getSectionStyles(sectionProps);
  const combinedStyles = { ...sectionStyles, ...style };

  // Create the appropriate semantic element
  const Component = as;

  return (
    <Component
      ref={ref as any}
      className={className}
      style={combinedStyles}
      data-testid={testId}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  );
});

Section.displayName = 'Section';
