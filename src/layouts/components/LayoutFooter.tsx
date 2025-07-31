/**
 * @fileoverview LayoutFooter Component v5.0.0 - Token-Based Design System
 * @description Footer component for layout system using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// FOOTER VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Footer variants following CVA pattern
 */
const footerVariants = cva(
  [
    'w-full border-t border-border',
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'mt-auto',
  ],
  {
    variants: {
      platform: {
        mobile: 'p-4',
        tablet: 'p-6',
        desktop: 'p-8',
        auto: 'p-4 md:p-6 lg:p-8',
      },
    },
    defaultVariants: {
      platform: 'auto',
    },
  }
);

// =============================================================================
// FOOTER INTERFACE
// =============================================================================

export interface LayoutFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Footer content */
  readonly children: ReactNode;

  /** Platform variant */
  readonly platform?: 'mobile' | 'tablet' | 'desktop' | 'auto';
}

// =============================================================================
// FOOTER HOOKS AND UTILITIES
// =============================================================================

/**
 * Platform-specific padding utility
 */
const usePlatformPadding = (platform: LayoutFooterProps['platform'] = 'auto') => {
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
 * Footer theme styles utility
 */
const useFooterStyles = (platformPadding: string, customStyle?: React.CSSProperties) => {
  const { colors } = useTokens();

  return React.useMemo((): React.CSSProperties => ({
    width: '100%',
    borderTop: `1px solid ${colors.border?.default || '#e2e8f0'}`,
    backgroundColor: colors.background?.default || '#ffffff',
    backdropFilter: 'blur(8px)',
    marginTop: 'auto',
    padding: platformPadding,
    ...customStyle,
  }), [colors, platformPadding, customStyle]);
};

// =============================================================================
// FOOTER COMPONENT
// =============================================================================

/**
 * LayoutFooter Component with token-based styling
 * Follows SRP by handling only footer-specific layout concerns
 */
export const LayoutFooter = forwardRef<HTMLElement, LayoutFooterProps>(
  ({ children, platform = 'auto', className, style, ...props }, ref): React.ReactElement => {
    // Custom hooks for separation of concerns
    const platformPadding = usePlatformPadding(platform);
    const footerStyles = useFooterStyles(platformPadding, style);

    return (
      <footer
        ref={ref}
        role="contentinfo"
        className={cn(footerVariants({ platform }), className)}
        style={footerStyles}
        {...props}
      >
        {children}
      </footer>
    );
  }
);

LayoutFooter.displayName = 'LayoutFooter';

// Export variants type for external usage
export type LayoutFooterVariant = VariantProps<typeof footerVariants>;
export { footerVariants };