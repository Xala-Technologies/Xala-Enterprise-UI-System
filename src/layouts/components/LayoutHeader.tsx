/**
 * @fileoverview LayoutHeader Component v5.0.0 - Token-Based Design System
 * @description Header component for layout system using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// HEADER VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Header variants following CVA pattern
 */
const headerVariants = cva(
  [
    'w-full border-b border-border',
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'sticky top-0 z-50',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      platform: {
        mobile: 'h-16 px-4',
        tablet: 'h-18 px-6',
        desktop: 'h-20 px-8',
        auto: 'h-16 px-4 md:h-18 md:px-6 lg:h-20 lg:px-8',
      },
    },
    defaultVariants: {
      platform: 'auto',
    },
  }
);

// =============================================================================
// HEADER INTERFACE
// =============================================================================

export interface LayoutHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Header content */
  readonly children?: ReactNode;

  /** Platform variant */
  readonly platform?: 'mobile' | 'tablet' | 'desktop' | 'auto';

  /** Header title */
  readonly title?: string;

  /** Navigation items */
  readonly navigation?: ReactNode;

  /** Action items */
  readonly actions?: ReactNode;
}

// =============================================================================
// HEADER STYLES UTILITY
// =============================================================================

/**
 * Platform-specific styles utility
 */
const usePlatformStyles = (platform: LayoutHeaderProps['platform'] = 'auto') => {
  const { spacing } = useTokens();

  return React.useMemo((): React.CSSProperties => {
    switch (platform) {
      case 'mobile':
        return { height: '64px', padding: `0 ${spacing?.[4] || '1rem'}` };
      case 'tablet':
        return { height: '72px', padding: `0 ${spacing?.[6] || '1.5rem'}` };
      case 'desktop':
        return { height: '80px', padding: `0 ${spacing?.[8] || '2rem'}` };
      default: // auto
        return { 
          height: '64px', 
          padding: `0 ${spacing?.[4] || '1rem'}`,
        };
    }
  }, [platform, spacing]);
};

/**
 * Header theme styles utility
 */
const useHeaderStyles = (platformStyles: React.CSSProperties, customStyle?: React.CSSProperties) => {
  const { colors, getToken } = useTokens();

  return React.useMemo((): React.CSSProperties => ({
    width: '100%',
    borderBottom: `1px solid ${colors.border?.default || '#e2e8f0'}`,
    backgroundColor: colors.background?.default || '#ffffff',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)', // Safari support
    position: 'sticky',
    top: 0,
    zIndex: getToken('zIndex.sticky') as number || 50,
    transition: `all ${getToken('animation.duration.fast') as string || '200ms'} ${getToken('animation.easing.smooth') as string || 'ease-in-out'}`,
    boxShadow: getToken('shadows.sm') as string || '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    ...platformStyles,
    ...customStyle,
  }), [colors, getToken, platformStyles, customStyle]);
};

// =============================================================================
// HEADER COMPONENT
// =============================================================================

/**
 * LayoutHeader Component with token-based styling
 * Follows SRP by handling only header-specific layout concerns
 */
export const LayoutHeader = forwardRef<HTMLElement, LayoutHeaderProps>(
  (
    { children, platform = 'auto', title, navigation, actions, className, style, ...props },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography } = useTokens();
    
    // Custom hooks for separation of concerns
    const platformStyles = usePlatformStyles(platform);
    const headerStyles = useHeaderStyles(platformStyles, style);

    // Memoized styles for performance
    const containerStyles = React.useMemo((): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%',
      maxWidth: '100%',
    }), []);

    const titleStyles = React.useMemo((): React.CSSProperties => ({
      fontSize: typography?.fontSize?.xl || '1.25rem',
      fontWeight: typography?.fontWeight?.semibold || 600,
      color: colors.text?.primary || '#111827',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      margin: 0,
    }), [colors.text?.primary, typography]);

    const actionsStyles = React.useMemo((): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      gap: spacing?.[2] || '0.5rem',
    }), [spacing]);

    return (
      <header
        ref={ref}
        role="banner"
        className={cn(headerVariants({ platform }), className)}
        style={headerStyles}
        {...props}
      >
        <div style={containerStyles}>
          {/* Logo/Title */}
          {title && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={titleStyles}>{title}</h1>
            </div>
          )}

          {/* Navigation */}
          {navigation && (
            <nav role="navigation" aria-label="Main navigation">
              {navigation}
            </nav>
          )}

          {/* Actions */}
          {actions && <div style={actionsStyles}>{actions}</div>}

          {/* Custom content */}
          {children}
        </div>
      </header>
    );
  }
);

LayoutHeader.displayName = 'LayoutHeader';

// Export variants type for external usage
export type LayoutHeaderVariant = VariantProps<typeof headerVariants>;
export { headerVariants };