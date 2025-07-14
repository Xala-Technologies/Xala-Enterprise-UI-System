// PageLayout component for @xala-mock/ui-system
// Norwegian-compliant page layout with semantic structure

import React, { forwardRef } from 'react';

import { PageLayoutProps } from '../../types/layout.types';

// Helper function to generate CSS using design tokens
const getPageLayoutStyles = (props: PageLayoutProps): React.CSSProperties => {
  const {
    padding = 'none',
    margin = 'none',
    background = 'transparent',
    variant = 'modern',
    fullWidth = false,
    municipality,
  } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'grid',
    minHeight: '100vh',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateColumns: props.sidebar ? 'auto 1fr' : '1fr',
    gridTemplateAreas: props.sidebar
      ? `"sidebar header"
         "sidebar main"
         "sidebar footer"`
      : `"header"
         "main"
         "footer"`,
    width: fullWidth ? '100%' : undefined,
    maxWidth: fullWidth ? undefined : 'var(--container-max-width)',
    margin: fullWidth ? '0' : '0 auto',
    backgroundColor: getBackgroundToken(background),
    padding: getPaddingToken(padding),
    fontFamily: 'var(--font-family-sans)',
    lineHeight: 'var(--line-height-normal)',
  };

  // Municipality-specific theme
  if (municipality) {
    baseStyles.colorScheme = `var(--theme-${municipality})`;
  }

  // Variant-specific adjustments
  const variantStyles = getVariantStyles(variant);

  return { ...baseStyles, ...variantStyles };
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

// Get variant-specific styles
const getVariantStyles = (variant: string): React.CSSProperties => {
  const variants: Record<string, React.CSSProperties> = {
    government: {
      backgroundColor: 'var(--color-white)',
      border: 'var(--border-width) solid var(--border-primary)',
      borderRadius: 'var(--border-radius-sm)', // Minimal rounding for government
    },
    municipal: {
      backgroundColor: 'var(--background-primary)',
      borderRadius: 'var(--border-radius-base)', // Municipal standard
      boxShadow: 'var(--shadow-sm)', // Subtle municipal shadow
    },
    modern: {
      backgroundColor: 'var(--background-primary)',
      borderRadius: 'var(--border-radius-md)',
      boxShadow: 'var(--shadow-base)',
    },
  };
  return variants[variant] || variants.modern;
};

// PageLayout component with forwardRef for className/style props
export const PageLayout = forwardRef<HTMLDivElement, PageLayoutProps>((props, ref) => {
  const {
    children,
    header,
    footer,
    sidebar,
    className,
    style,
    testId,
    'aria-label': ariaLabel,
    ...layoutProps
  } = props;

  const pageStyles = getPageLayoutStyles(layoutProps);
  const combinedStyles = { ...pageStyles, ...style };

  return (
    <div
      ref={ref}
      className={className}
      style={combinedStyles}
      data-testid={testId}
      aria-label={ariaLabel}
      role='main'
    >
      {/* Header area */}
      {header && (
        <header style={{ gridArea: 'header' }} role='banner'>
          {header}
        </header>
      )}

      {/* Sidebar area (if provided) */}
      {sidebar && (
        <aside
          style={{
            gridArea: 'sidebar',
            borderRight: 'var(--border-width) solid var(--border-primary)',
            backgroundColor: 'var(--background-secondary)',
            padding: 'var(--spacing-4)',
          }}
          role='navigation'
          aria-label='Sidebar navigation'
        >
          {sidebar}
        </aside>
      )}

      {/* Main content area */}
      <main
        style={{
          gridArea: 'main',
          padding: 'var(--spacing-6)',
          minHeight: 'var(--main-min-height)', // Minimum content height
          display: 'flex',
          flexDirection: 'column',
        }}
        role='main'
      >
        {children}
      </main>

      {/* Footer area */}
      {footer && (
        <footer
          style={{
            gridArea: 'footer',
            borderTop: 'var(--border-width) solid var(--border-primary)',
            backgroundColor: 'var(--background-secondary)',
            padding: 'var(--spacing-4)',
          }}
          role='contentinfo'
        >
          {footer}
        </footer>
      )}
    </div>
  );
});

PageLayout.displayName = 'PageLayout';
