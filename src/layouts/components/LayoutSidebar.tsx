/**
 * @fileoverview LayoutSidebar Component v5.0.0 - Token-Based Design System
 * @description Sidebar component for layout system using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// SIDEBAR VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Sidebar variants following CVA pattern
 */
const sidebarVariants = cva(
  [
    'bg-card border-r border-border',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      platform: {
        mobile: 'fixed inset-y-0 left-0 w-64 transform z-40',
        tablet: 'w-64 flex-shrink-0',
        desktop: 'w-72 flex-shrink-0',
        auto: 'fixed inset-y-0 left-0 w-64 transform z-40 md:relative md:translate-x-0 md:w-64 lg:w-72',
      },
      collapsed: {
        true: 'w-16 overflow-hidden',
        false: '',
      },
      open: {
        true: 'translate-x-0',
        false: '-translate-x-full',
      },
    },
    defaultVariants: {
      platform: 'auto',
      collapsed: false,
      open: false,
    },
  }
);

// =============================================================================
// SIDEBAR INTERFACE
// =============================================================================

export interface LayoutSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Sidebar content */
  readonly children: ReactNode;

  /** Platform variant */
  readonly platform?: 'mobile' | 'tablet' | 'desktop' | 'auto';

  /** Collapsed state */
  readonly collapsed?: boolean;

  /** Open state (for mobile) */
  readonly open?: boolean;

  /** Close handler */
  readonly onClose?: () => void;

  /** Sidebar title */
  readonly title?: string;
}

// =============================================================================
// SIDEBAR HOOKS AND UTILITIES
// =============================================================================

/**
 * Platform detection hook for sidebar behavior
 */
const useLayoutPlatform = (): 'mobile' | 'tablet' | 'desktop' => {
  const [platform, setPlatform] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  React.useEffect(() => {
    const detectPlatform = (): void => {
      if (typeof window === 'undefined') return;
      
      const width = window.innerWidth;
      const mobileBreakpoint = 768;
      const tabletBreakpoint = 1024;
      
      if (width < mobileBreakpoint) {
        setPlatform('mobile');
      } else if (width < tabletBreakpoint) {
        setPlatform('tablet');
      } else {
        setPlatform('desktop');
      }
    };

    detectPlatform();
    window.addEventListener('resize', detectPlatform);
    return (): void => window.removeEventListener('resize', detectPlatform);
  }, []);

  return platform;
};

/**
 * Platform-specific styles utility
 */
const usePlatformStyles = (
  platform: LayoutSidebarProps['platform'],
  collapsed: boolean,
  open: boolean,
  detectedPlatform: 'mobile' | 'tablet' | 'desktop'
) => {
  return React.useMemo((): React.CSSProperties => {
    const baseWidth = collapsed ? '64px' : '256px';
    const desktopWidth = collapsed ? '64px' : '288px';
    const isMobile = detectedPlatform === 'mobile';
    
    switch (platform) {
      case 'mobile':
        return { 
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '256px',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          zIndex: 40,
        };
      case 'tablet':
        return { 
          width: baseWidth,
          flexShrink: 0,
        };
      case 'desktop':
        return { 
          width: desktopWidth,
          flexShrink: 0,
        };
      default: // auto
        return isMobile ? {
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '256px',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          zIndex: 40,
        } : {
          width: baseWidth,
          flexShrink: 0,
        };
    }
  }, [platform, collapsed, open, detectedPlatform]);
};

/**
 * Sidebar theme styles utility
 */
const useSidebarStyles = (platformStyles: React.CSSProperties, customStyle?: React.CSSProperties) => {
  const { colors } = useTokens();

  return React.useMemo((): React.CSSProperties => ({
    backgroundColor: colors.background?.paper || '#f9fafb',
    borderRight: `1px solid ${colors.border?.default || '#e2e8f0'}`,
    transition: 'all 300ms ease-in-out',
    ...platformStyles,
    ...customStyle,
  }), [colors, platformStyles, customStyle]);
};

// =============================================================================
// SIDEBAR COMPONENT
// =============================================================================

/**
 * LayoutSidebar Component with token-based styling
 * Follows SRP by handling only sidebar-specific layout concerns
 */
export const LayoutSidebar = forwardRef<HTMLElement, LayoutSidebarProps>(
  (
    {
      children,
      platform = 'auto',
      collapsed = false,
      open = false,
      onClose,
      title,
      className,
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography } = useTokens();
    const detectedPlatform = useLayoutPlatform();
    const isMobile = detectedPlatform === 'mobile';

    // Custom hooks for separation of concerns
    const platformStyles = usePlatformStyles(platform, collapsed, open, detectedPlatform);
    const sidebarStyles = useSidebarStyles(platformStyles, style);

    // Memoized styles for performance
    const overlayStyles = React.useMemo((): React.CSSProperties => ({
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 30,
    }), []);

    const headerStyles = React.useMemo((): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: spacing?.[4] || '1rem',
      borderBottom: `1px solid ${colors.border?.default || '#e2e8f0'}`,
    }), [spacing, colors.border?.default]);

    const titleStyles = React.useMemo((): React.CSSProperties => ({
      fontSize: typography?.fontSize?.lg || '1.125rem',
      fontWeight: typography?.fontWeight?.semibold || 600,
      color: colors.text?.primary || '#111827',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      margin: 0,
    }), [colors.text?.primary, typography]);

    const closeButtonStyles = React.useMemo((): React.CSSProperties => ({
      padding: spacing?.[2] || '0.5rem',
      borderRadius: '0.375rem',
      backgroundColor: 'transparent',
      border: 'none',
      color: colors.text?.secondary || '#6b7280',
      cursor: 'pointer',
      transition: 'all 150ms ease-in-out',
    }), [spacing, colors.text?.secondary]);

    const contentStyles = React.useMemo((): React.CSSProperties => ({
      flex: 1,
      overflowY: 'auto',
      padding: spacing?.[4] || '1rem',
    }), [spacing]);

    const handleCloseButtonHover = React.useCallback((e: React.MouseEvent<HTMLButtonElement>, isEnter: boolean) => {
      if (isEnter) {
        e.currentTarget.style.backgroundColor = '#f3f4f6';
        e.currentTarget.style.color = colors.text?.primary || '#111827';
      } else {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = colors.text?.secondary || '#6b7280';
      }
    }, [colors.text?.primary, colors.text?.secondary]);

    return (
      <>
        {/* Overlay for mobile */}
        {isMobile && open && (
          <div 
            style={overlayStyles} 
            onClick={onClose} 
            aria-hidden="true" 
          />
        )}

        <aside
          ref={ref}
          role="complementary"
          aria-label={title || 'Sidebar navigation'}
          className={cn(sidebarVariants({ platform, collapsed, open }), className)}
          style={sidebarStyles}
          {...props}
        >
          {/* Sidebar Header */}
          {title && (
            <div style={headerStyles}>
              <h2 style={titleStyles}>{title}</h2>
              {isMobile && (
                <button
                  onClick={onClose}
                  style={closeButtonStyles}
                  aria-label="Close sidebar"
                  onMouseEnter={(e) => handleCloseButtonHover(e, true)}
                  onMouseLeave={(e) => handleCloseButtonHover(e, false)}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Sidebar Content */}
          <div style={contentStyles}>{children}</div>
        </aside>
      </>
    );
  }
);

LayoutSidebar.displayName = 'LayoutSidebar';

// Export variants type for external usage
export type LayoutSidebarVariant = VariantProps<typeof sidebarVariants>;
export { sidebarVariants };