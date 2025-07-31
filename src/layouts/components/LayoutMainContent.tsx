/**
 * @fileoverview LayoutMainContent Component v5.0.0 - Token-Based Design System
 * @description Main content component for layout system using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// MAIN CONTENT VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Main content variants following CVA pattern
 */
const mainContentVariants = cva(
  ['flex-1 overflow-auto', 'transition-all duration-300', 'motion-reduce:transition-none'],
  {
    variants: {
      platform: {
        mobile: 'p-4',
        tablet: 'p-6',
        desktop: 'p-8',
        auto: 'p-4 md:p-6 lg:p-8',
      },
      maxWidth: {
        none: 'max-w-none',
        sm: 'max-w-sm mx-auto',
        md: 'max-w-md mx-auto',
        lg: 'max-w-lg mx-auto',
        xl: 'max-w-xl mx-auto',
        '2xl': 'max-w-2xl mx-auto',
        '4xl': 'max-w-4xl mx-auto',
        '6xl': 'max-w-6xl mx-auto',
        full: 'max-w-full mx-auto',
      },
    },
    defaultVariants: {
      platform: 'auto',
      maxWidth: 'none',
    },
  }
);

// =============================================================================
// MAIN CONTENT INTERFACE
// =============================================================================

export interface LayoutMainContentProps extends React.HTMLAttributes<HTMLElement> {
  /** Main content */
  readonly children: ReactNode;

  /** Platform variant */
  readonly platform?: 'mobile' | 'tablet' | 'desktop' | 'auto';

  /** Maximum width */
  readonly maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full';

  /** Main content title */
  readonly title?: string;
}

// =============================================================================
// MAIN CONTENT HOOKS AND UTILITIES
// =============================================================================

/**
 * Platform-specific padding utility
 */
const usePlatformPadding = (platform: LayoutMainContentProps['platform'] = 'auto') => {
  const { spacing } = useTokens();

  return React.useMemo((): string => {
    switch (platform) {
      case 'mobile':
        return spacing?.[4] || '1rem';
      case 'tablet':
        return spacing?.[6] || '1.5rem';
      case 'desktop':
        return spacing?.[8] || '2rem';
      default: // auto
        return spacing?.[4] || '1rem'; // Base mobile padding
    }
  }, [platform, spacing]);
};

/**
 * Max width styles utility
 */
const useMaxWidthStyles = (maxWidth: LayoutMainContentProps['maxWidth'] = 'none') => {
  return React.useMemo((): React.CSSProperties => {
    switch (maxWidth) {
      case 'sm':
        return { maxWidth: '640px', margin: '0 auto' };
      case 'md':
        return { maxWidth: '768px', margin: '0 auto' };
      case 'lg':
        return { maxWidth: '1024px', margin: '0 auto' };
      case 'xl':
        return { maxWidth: '1280px', margin: '0 auto' };
      case '2xl':
        return { maxWidth: '1536px', margin: '0 auto' };
      case '4xl':
        return { maxWidth: '1792px', margin: '0 auto' };
      case '6xl':
        return { maxWidth: '2048px', margin: '0 auto' };
      case 'full':
        return { maxWidth: '100%', margin: '0 auto' };
      default: // none
        return { maxWidth: 'none' };
    }
  }, [maxWidth]);
};

/**
 * Main content theme styles utility
 */
const useMainContentStyles = (
  platformPadding: string,
  maxWidthStyles: React.CSSProperties,
  customStyle?: React.CSSProperties
) => {
  return React.useMemo((): React.CSSProperties => ({
    flex: 1,
    overflow: 'auto',
    padding: platformPadding,
    transition: 'all 300ms ease-in-out',
    ...maxWidthStyles,
    ...customStyle,
  }), [platformPadding, maxWidthStyles, customStyle]);
};

// =============================================================================
// MAIN CONTENT COMPONENT
// =============================================================================

/**
 * LayoutMainContent Component with token-based styling
 * Follows SRP by handling only main content-specific layout concerns
 */
export const LayoutMainContent = forwardRef<HTMLElement, LayoutMainContentProps>(
  (
    { children, platform = 'auto', maxWidth = 'none', title, className, style, ...props },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography } = useTokens();
    
    // Custom hooks for separation of concerns
    const platformPadding = usePlatformPadding(platform);
    const maxWidthStyles = useMaxWidthStyles(maxWidth);
    const mainStyles = useMainContentStyles(platformPadding, maxWidthStyles, style);

    // Memoized title styles for performance
    const titleStyles = React.useMemo((): React.CSSProperties => ({
      fontSize: typography?.fontSize?.['2xl'] || '1.5rem',
      fontWeight: typography?.fontWeight?.bold || 700,
      color: colors.text?.primary || '#111827',
      marginBottom: spacing?.[6] || '1.5rem',
      margin: `0 0 ${spacing?.[6] || '1.5rem'} 0`,
    }), [colors.text?.primary, typography, spacing]);

    return (
      <main
        ref={ref}
        id="main-content"
        role="main"
        aria-label={title || 'Main content'}
        className={cn(mainContentVariants({ platform, maxWidth }), className)}
        style={mainStyles}
        {...props}
      >
        {/* Main content title */}
        {title && <h1 style={titleStyles}>{title}</h1>}

        {children}
      </main>
    );
  }
);

LayoutMainContent.displayName = 'LayoutMainContent';

// Export variants type for external usage
export type LayoutMainContentVariant = VariantProps<typeof mainContentVariants>;
export { mainContentVariants };