/**
 * @fileoverview Section Component - Enterprise Standards Compliant
 * @module Section
 * @description Semantic section component using design tokens (no inline styles)
 */

import React from 'react';

import type { SectionProps } from '../../types/layout.types';

/**
 * Section component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export function Section({ children,
  as = 'section',
  variant = 'primary',
  spacing = 'md',
  background = 'transparent',
  padding = 'md',
  margin = 'none',
  className = '',
  testId,
  ...props }: SectionProps): React.ReactElement { // Build CSS classes using design tokens
  const sectionClasses = React.useMemo((): React.ReactElement => { return (
    <Component className={sectionClasses} data-testid={testId} {...props}>
      {children}
    </Component>
  ); }

Section.displayName = 'Section';
