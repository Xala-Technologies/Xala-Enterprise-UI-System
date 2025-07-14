/**
 * @fileoverview PageLayout Component - Enterprise Standards Compliant
 * @module PageLayout
 * @description Page layout component using design tokens (no inline styles)
 */

import React from 'react';

import type { PageLayoutProps } from '../../types/layout.types';

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
  municipality,
  fullWidth = false,
  background = 'primary',
  padding = 'md',
  margin = 'none',
  className = '',
  testId,
  ...props
}: PageLayoutProps): JSX.Element {
  // Build CSS classes using design tokens
  const pageClasses = React.useMemo(() => {
    const classes = ['page-layout'];

    // Variant classes
    classes.push(`page-layout--${variant}`);

    // Municipality classes
    if (municipality) {
      classes.push(`page-layout--municipality-${municipality}`);
    }

    // Background classes
    classes.push(`page-layout--bg-${background}`);

    // Padding classes
    classes.push(`page-layout--padding-${padding}`);

    // Margin classes
    classes.push(`page-layout--margin-${margin}`);

    // Feature classes
    if (fullWidth) {
      classes.push('page-layout--full-width');
    }

    if (sidebar) {
      classes.push('page-layout--with-sidebar');
    }

    // Custom classes
    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [variant, municipality, background, padding, margin, fullWidth, sidebar, className]);

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
