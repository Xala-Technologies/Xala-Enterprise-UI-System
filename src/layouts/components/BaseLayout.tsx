/**
 * @fileoverview BaseLayout Component v5.0.0 - Token-Based Design System (SOLID Refactored)
 * @description Minimal base layout component following SOLID principles with full v5.0 token integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';
import { useLayout } from '../../hooks';

// =============================================================================
// BASE LAYOUT VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Base layout variants following CVA pattern
 */
const baseLayoutVariants = cva(
  [
    'min-h-screen w-full',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      platform: {
        mobile: 'flex flex-col',
        tablet: 'flex flex-col md:flex-row',
        desktop: 'flex flex-col lg:flex-row',
        auto: 'flex flex-col md:flex-row',
      },
      theme: {
        light: 'bg-background text-foreground',
        dark: 'bg-background text-foreground',
        system: 'bg-background text-foreground',
      },
      spacing: {
        none: 'p-0',
        sm: 'p-2 md:p-4',
        md: 'p-4 md:p-6',
        lg: 'p-6 md:p-8',
        xl: 'p-8 md:p-12',
      },
    },
    defaultVariants: {
      platform: 'auto',
      theme: 'system',
      spacing: 'md',
    },
  }
);

// =============================================================================
// BASE LAYOUT INTERFACE
// =============================================================================

export interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout content */
  readonly children: ReactNode;

  /** Platform variant */
  readonly platform?: 'mobile' | 'tablet' | 'desktop' | 'auto';

  /** Theme variant */
  readonly theme?: 'light' | 'dark' | 'system';

  /** Spacing variant */
  readonly spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  /** Skip to main content link */
  readonly skipToMainContent?: boolean;

  /** Accessibility label */
  readonly 'aria-label'?: string;
}

// =============================================================================
// BASE LAYOUT HOOKS AND UTILITIES
// =============================================================================

/**
 * Spacing styles utility hook
 * Follows SRP by handling only spacing-related styling
 */
const useSpacingStyles = (spacing: BaseLayoutProps['spacing'] = 'md') => {
  return React.useMemo((): React.CSSProperties => {
    switch (spacing) {
      case 'none':
        return { padding: 0 };
      case 'sm':
        return { padding: '0.5rem' };
      case 'lg':
        return { padding: '1.5rem' };
      case 'xl':
        return { padding: '2rem' };
      default: // md
        return { padding: '1rem' };
    }
  }, [spacing]);
};

/**
 * Base layout theme styles utility
 * Follows SRP by handling only theme-related styling
 */
const useBaseLayoutStyles = (
  spacing: BaseLayoutProps['spacing'],
  platform: BaseLayoutProps['platform'],
  customStyle?: React.CSSProperties
) => {
  const { colors } = useTokens();
  const spacingStyles = useSpacingStyles(spacing);

  return React.useMemo((): React.CSSProperties => ({
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: platform === 'mobile' ? 'column' : undefined,
    backgroundColor: colors.background?.default || '#ffffff',
    color: colors.text?.primary || '#111827',
    transition: 'all 300ms ease-in-out',
    ...spacingStyles,
    ...customStyle,
  }), [colors, spacingStyles, platform, customStyle]);
};

/**
 * Skip link styles utility
 * Follows SRP by handling only skip link styling
 */
const useSkipLinkStyles = () => {
  const { colors, spacing, getToken } = useTokens();
  
  return React.useMemo((): React.CSSProperties => ({
    position: 'absolute',
    top: spacing?.[4] || '1rem',
    left: spacing?.[4] || '1rem',
    zIndex: 50,
    padding: `${spacing?.[2] || '0.5rem'} ${spacing?.[4] || '1rem'}`,
    backgroundColor: colors.primary?.[500] || '#3b82f6',
    color: colors.background?.default || '#ffffff',
    borderRadius: getToken('borderRadius.md') as string || '0.375rem',
    textDecoration: 'none',
    outline: 'none',
    transform: 'translateY(-100px)',
    transition: 'transform 150ms ease-in-out',
    fontSize: getToken('typography.fontSize.sm') as string || '0.875rem',
    fontWeight: getToken('typography.fontWeight.medium') as number || 500,
  }), [colors, spacing, getToken]);
};

// =============================================================================
// BASE LAYOUT COMPONENT
// =============================================================================

/**
 * BaseLayout Component with token-based styling
 * Follows SOLID principles:
 * - SRP: Handles only base layout structure and accessibility
 * - OCP: Extensible through composition and props
 * - LSP: Can be substituted with specialized layouts
 * - ISP: Provides focused interface for base layout needs
 * - DIP: Depends on token abstractions, not concrete implementations
 */
export const BaseLayout = forwardRef<HTMLDivElement, BaseLayoutProps>(
  (
    {
      children,
      platform = 'auto',
      theme = 'system',
      spacing = 'md',
      skipToMainContent = true,
      className,
      'aria-label': ariaLabel = 'Main application layout',
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    // Use layout context for state management
    const { setLayout } = useLayout();
    
    // Custom hooks for separation of concerns
    const layoutStyles = useBaseLayoutStyles(spacing, platform, style);
    const skipLinkStyles = useSkipLinkStyles();

    // Update layout type on mount
    React.useEffect(() => {
      setLayout('base');
    }, [setLayout]);

    // Event handlers
    const handleSkipLinkFocus = React.useCallback((e: React.FocusEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.transform = 'translateY(0)';
      // Add focus ring
      e.currentTarget.style.outline = `2px solid ${layoutStyles.backgroundColor || '#3b82f6'}`;
      e.currentTarget.style.outlineOffset = '2px';
    }, [layoutStyles.backgroundColor]);

    const handleSkipLinkBlur = React.useCallback((e: React.FocusEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.transform = 'translateY(-100px)';
      // Remove focus ring
      e.currentTarget.style.outline = 'none';
    }, []);

    return (
      <div
        ref={ref}
        role="application"
        aria-label={ariaLabel}
        className={cn(baseLayoutVariants({ platform, theme, spacing }), className)}
        style={layoutStyles}
        {...props}
      >
        {/* Skip to main content link for accessibility */}
        {skipToMainContent && (
          <a
            href="#main-content"
            style={skipLinkStyles}
            onFocus={handleSkipLinkFocus}
            onBlur={handleSkipLinkBlur}
          >
            Skip to main content
          </a>
        )}

        {children}
      </div>
    );
  }
);

BaseLayout.displayName = 'BaseLayout';

// Export variants type for external usage
export type BaseLayoutVariant = VariantProps<typeof baseLayoutVariants>;
export { baseLayoutVariants };