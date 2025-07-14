// Container component for @xala-mock/ui-system
// Content containers with Norwegian width and accessibility standards

import React, { forwardRef } from 'react';

import { ContainerProps } from '../../types/layout.types';

// Helper function to generate CSS using design tokens
const getContainerStyles = (props: ContainerProps): React.CSSProperties => {
  const {
    padding = 'md',
    margin = 'none',
    background = 'transparent',
    size = 'lg',
    center = true,
    norwegian = { maxWidth: true, accessibility: true },
  } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'block',
    width: '100%',
    backgroundColor: getBackgroundToken(background),
    padding: getPaddingToken(padding, norwegian.accessibility),
    margin: center ? 'auto' : getMarginToken(margin),
    fontFamily: 'var(--font-family-sans)',
    lineHeight: 'var(--line-height-normal)',
  };

  // Size-based max width (Norwegian content guidelines)
  const sizeStyles = getSizeStyles(size, norwegian.maxWidth);

  return { ...baseStyles, ...sizeStyles };
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

// Get padding token with Norwegian accessibility enhancements
const getPaddingToken = (padding: string, accessibilityMode: boolean = true): string => {
  const basePaddings = {
    none: '0',
    sm: 'var(--spacing-4)',
    md: 'var(--spacing-6)',
    lg: 'var(--spacing-8)',
    xl: 'var(--spacing-12)',
  };

  // Enhanced padding for Norwegian accessibility standards
  const accessiblePaddings = {
    none: '0',
    sm: 'var(--spacing-6)', // Increased from 4
    md: 'var(--spacing-8)', // Increased from 6
    lg: 'var(--spacing-10)', // Increased from 8
    xl: 'var(--spacing-16)', // Increased from 12
  };

  const paddings = accessibilityMode ? accessiblePaddings : basePaddings;
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

// Get size styles with Norwegian content width guidelines
const getSizeStyles = (size: string, norwegianMaxWidth: boolean = true): React.CSSProperties => {
  // Standard container sizes
  const standardSizes: Record<string, React.CSSProperties> = {
    sm: { maxWidth: 'var(--container-sm)' },
    md: { maxWidth: 'var(--container-md)' },
    lg: { maxWidth: 'var(--container-lg)' },
    xl: { maxWidth: 'var(--container-xl)' },
    full: { maxWidth: 'none' },
  };

  // Norwegian-optimized container sizes (based on reading studies)
  const norwegianSizes: Record<string, React.CSSProperties> = {
    sm: {
      maxWidth: 'var(--container-norwegian-sm)', // Slightly wider for Norwegian text
      lineLength: 'var(--line-length-norwegian-sm)', // Optimal Norwegian line length
    },
    md: {
      maxWidth: 'var(--container-norwegian-md)', // Municipal standard
      lineLength: 'var(--line-length-norwegian-md)',
    },
    lg: {
      maxWidth: 'var(--container-norwegian-lg)', // Government portal standard
      lineLength: 'var(--line-length-norwegian-lg)',
    },
    xl: {
      maxWidth: 'var(--container-norwegian-xl)', // Full-width Norwegian layouts
      lineLength: 'var(--line-length-norwegian-xl)',
    },
    full: {
      maxWidth: 'none',
      width: '100%',
    },
  };

  const sizes = norwegianMaxWidth ? norwegianSizes : standardSizes;
  return sizes[size] || sizes.lg;
};

// Container component with forwardRef for className/style props
export const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const { children, className, style, testId, 'aria-label': ariaLabel, ...containerProps } = props;

  const containerStyles = getContainerStyles(containerProps);
  const combinedStyles = { ...containerStyles, ...style };

  return (
    <div
      ref={ref}
      className={className}
      style={combinedStyles}
      data-testid={testId}
      aria-label={ariaLabel}
      role='region'
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';
