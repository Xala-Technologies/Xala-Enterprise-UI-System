/**
 * @fileoverview Section Component - Enterprise Standards Compliant
 * @module Section
 * @description Semantic section component using design tokens (no inline styles)
 */

import * as React from 'react';

import type { SectionProps } from '../../types/layout.types';

/**
 * Section component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export function Section({
  children,
  as = 'section',
  variant = 'primary',
  spacing = 'md',
  background = 'transparent',
  padding = 'md',
  margin = 'none',
  className = '',
  testId,
  ...props
}: SectionProps): React.ReactElement {
  // Build CSS classes using design tokens
  const sectionClasses = React.useMemo((): string => {
    const classes = ['section'];

    // Variant class
    classes.push(`section--${variant}`);

    // Spacing class
    classes.push(`section--spacing-${spacing}`);

    // Background class
    classes.push(`section--bg-${background}`);

    // Padding class
    classes.push(`section--padding-${padding}`);

    // Margin class
    if (margin !== 'none') {
      classes.push(`section--margin-${margin}`);
    }

    // Custom class
    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [variant, spacing, background, padding, margin, className]);

  const Component = as as React.ElementType; // Type assertion for polymorphic component

  return (
    <Component className={sectionClasses} data-testid={testId} {...props}>
      {children}
    </Component>
  );
}

Section.displayName = 'Section';
