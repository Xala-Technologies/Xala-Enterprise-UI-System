// Stack component for @xala-mock/ui-system
// Flexbox stacking with Norwegian responsive design patterns

import React, { forwardRef } from 'react';

import { StackProps } from '../../types/layout.types';

// Helper function to generate CSS using design tokens
const getStackStyles = (props: StackProps): React.CSSProperties => {
  const {
    padding = 'none',
    margin = 'none',
    background = 'transparent',
    direction = 'column',
    gap = 'md',
    align = 'stretch',
    justify = 'start',
    wrap = false,
    reverse = false,
  } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: getFlexDirection(direction, reverse),
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: getGapToken(gap),
    width: '100%',
    backgroundColor: getBackgroundToken(background),
    padding: getPaddingToken(padding),
    margin: getMarginToken(margin),
    fontFamily: 'var(--font-family-sans)',
  };

  return baseStyles;
};

// Function to get flex direction with proper typing
const getFlexDirection = (
  direction: 'horizontal' | 'vertical' = 'vertical',
  reverse: boolean = false
): 'row' | 'column' | 'row-reverse' | 'column-reverse' => {
  if (direction === 'horizontal') {
    return reverse ? 'row-reverse' : 'row';
  }
  return reverse ? 'column-reverse' : 'column';
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
  return paddings[padding as keyof typeof paddings] || paddings.none;
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

// Get gap token (Norwegian spacing standards)
const getGapToken = (gap: string): string => {
  const gaps = {
    none: '0',
    sm: 'var(--spacing-2)', // Norwegian small spacing
    md: 'var(--spacing-4)', // Norwegian form standard
    lg: 'var(--spacing-6)', // Section spacing
    xl: 'var(--spacing-8)', // Large component spacing
  };
  return gaps[gap as keyof typeof gaps] || gaps.md;
};

// Stack component with forwardRef for className/style props
export const Stack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  const { children, className, style, testId, 'aria-label': ariaLabel, ...stackProps } = props;

  const stackStyles = getStackStyles(stackProps);
  const combinedStyles = { ...stackStyles, ...style };

  return (
    <div
      ref={ref}
      className={className}
      style={combinedStyles}
      data-testid={testId}
      aria-label={ariaLabel}
      role='group'
    >
      {children}
    </div>
  );
});

Stack.displayName = 'Stack';
