// Grid component for @xala-mock/ui-system
// CSS Grid layout with Norwegian responsive design patterns

import React, { forwardRef } from 'react';

import { GridProps } from '../../types/layout.types';

// Helper function to generate CSS using design tokens
const getGridStyles = (props: GridProps): React.CSSProperties => {
  const {
    padding = 'none',
    margin = 'none',
    background = 'transparent',
    columns = 'auto',
    rows = 'auto',
    gap = 'md',
    responsive,
    align = 'stretch',
    justify = 'stretch',
  } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'grid',
    width: '100%',
    backgroundColor: getBackgroundToken(background),
    padding: getPaddingToken(padding),
    margin: getMarginToken(margin),
    gap: getGapToken(gap),
    gridTemplateColumns: getColumnsValue(columns),
    gridTemplateRows: getRowsValue(rows),
    alignItems: align,
    justifyItems: justify,
    fontFamily: 'var(--font-family-sans)',
  };

  // Responsive grid adjustments
  const responsiveStyles = getResponsiveStyles(responsive);

  return { ...baseStyles, ...responsiveStyles };
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

// Get gap token
const getGapToken = (gap: string): string => {
  const gaps = {
    none: '0',
    sm: 'var(--spacing-2)',
    md: 'var(--spacing-4)',
    lg: 'var(--spacing-6)',
    xl: 'var(--spacing-8)',
  };
  return gaps[gap as keyof typeof gaps] || gaps.md;
};

// Get grid columns value
const getColumnsValue = (columns: number | string): string => {
  if (typeof columns === 'number') {
    return `repeat(${columns}, 1fr)`;
  }

  const columnTemplates = {
    auto: 'auto',
    fit: 'repeat(auto-fit, minmax(var(--card-min-width), 1fr))', // Norwegian card width standard
  };

  return columnTemplates[columns as keyof typeof columnTemplates] || columnTemplates.auto;
};

// Get grid rows value
const getRowsValue = (rows: number | string): string => {
  if (typeof rows === 'number') {
    return `repeat(${rows}, auto)`;
  }

  return rows === 'auto' ? 'auto' : 'auto';
};

// Get responsive grid styles (Norwegian breakpoints)
const getResponsiveStyles = (responsive?: GridProps['responsive']): Record<string, any> => {
  if (!responsive) {
    return {};
  }

  const styles: Record<string, any> = {};

  // Norwegian mobile-first responsive design
  if (responsive.mobile) {
    styles.gridTemplateColumns = `repeat(${responsive.mobile}, 1fr)`;
  }

  // Add media queries for larger screens
  if (responsive.tablet || responsive.desktop) {
    // Note: In a real implementation, we'd use CSS-in-JS or CSS modules
    // For now, we'll set a base responsive behavior
    styles.gridTemplateColumns = responsive.desktop
      ? `repeat(${responsive.desktop}, 1fr)`
      : styles.gridTemplateColumns;
  }

  return styles;
};

// Grid component with forwardRef for className/style props
export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const { children, className, style, testId, 'aria-label': ariaLabel, ...gridProps } = props;

  const gridStyles = getGridStyles(gridProps);
  const combinedStyles = { ...gridStyles, ...style };

  return (
    <div
      ref={ref}
      className={className}
      style={combinedStyles}
      data-testid={testId}
      aria-label={ariaLabel}
      role="grid"
    >
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';
