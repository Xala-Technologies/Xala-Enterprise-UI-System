/**
 * @fileoverview PageLayout Component - Enterprise Standards Compliant
 * @module PageLayout
 * @description Page layout component using design tokens (no inline styles)
 */

import * as React from 'react';

import type { PageLayoutProps } from '../../types/layout.types';

/**
 * Build CSS classes using design tokens - pure function
 */
const getPageClasses = (
  variant: string,
  fullWidth: boolean,
  background: string,
  padding: string,
  margin: string,
  className: string
): string => {
  const classes = ['page-layout'];

  // Variant class
  classes.push(`page-layout--${variant}`);

  // Full width class
  if (fullWidth) {
    classes.push('page-layout--full-width');
  }

  // Background class
  classes.push(`page-layout--bg-${background}`);

  // Padding class
  classes.push(`page-layout--padding-${padding}`);

  // Margin class
  if (margin !== 'none') {
    classes.push(`page-layout--margin-${margin}`);
  }

  // Custom class
  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

/**
 * PageLayout component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export function PageLayout({
  children,
  header,
  footer,
  sidebar,
  variant = 'modern',

  // _municipality removed - unused parameter
  fullWidth = false,
  background = 'primary',
  padding = 'md',
  margin = 'none',
  className = '',
  testId,
  ...props
}: PageLayoutProps): React.ReactElement {
  // Build CSS classes using design tokens
  const pageClasses = getPageClasses(variant, fullWidth, background, padding, margin, className);

  return (
    <div className={pageClasses} data-testid={testId} {...props}>
      {header && <header className="page-layout__header">{header}</header>}

      <div className="page-layout__body">
        {sidebar && <aside className="page-layout__sidebar">{sidebar}</aside>}

        <main className="page-layout__content">{children}</main>
      </div>

      {footer && <footer className="page-layout__footer">{footer}</footer>}
    </div>
  );
}

PageLayout.displayName = 'PageLayout';
