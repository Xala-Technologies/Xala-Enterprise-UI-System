/**
 * @fileoverview MobileLayout Component v5.0.0 - Token-Based Design System
 * @description Mobile layout component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

import React, { forwardRef, useState, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';
import { useLayout } from '../../hooks';
import { BaseLayout } from '../BaseLayout';

// =============================================================================
// MOBILE LAYOUT VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Mobile header variants
 */
const mobileHeaderVariants = cva(
  [
    'sticky top-0 z-50 w-full',
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'border-b border-border',
    'h-16 px-4',
    'flex items-center justify-between',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        transparent: 'bg-transparent border-transparent',
      },
      size: {
        sm: 'h-12 px-3',
        md: 'h-16 px-4',
        lg: 'h-20 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Mobile bottom navigation variants
 */
const mobileBottomNavigationVariants = cva(
  [
    'fixed bottom-0 left-0 right-0 z-40',
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'border-t border-border',
    'h-16 px-4',
    'flex items-center justify-around',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        floating: 'mx-4 mb-4 rounded-full shadow-lg',
        minimal: 'bg-transparent backdrop-blur-none',
      },
      size: {
        sm: 'h-12',
        md: 'h-16',
        lg: 'h-20',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Mobile drawer variants
 */
const mobileDrawerVariants = cva(
  [
    'fixed inset-y-0 left-0 z-50',
    'w-64 bg-background',
    'transform transition-transform duration-300 ease-in-out',
    'motion-reduce:transition-none',
    'border-r border-border',
  ],
  {
    variants: {
      open: {
        true: 'translate-x-0',
        false: '-translate-x-full',
      },
      side: {
        left: 'left-0',
        right: 'right-0 left-auto',
      },
    },
    defaultVariants: {
      open: false,
      side: 'left',
    },
  }
);

/**
 * Mobile content variants
 */
const mobileContentVariants = cva(
  ['flex-1 overflow-auto', 'transition-all duration-300', 'motion-reduce:transition-none'],
  {
    variants: {
      paddingBottom: {
        none: 'pb-0',
        navigation: 'pb-16',
        large: 'pb-20',
      },
      paddingTop: {
        none: 'pt-0',
        header: 'pt-16',
        large: 'pt-20',
      },
    },
    defaultVariants: {
      paddingBottom: 'navigation',
      paddingTop: 'header',
    },
  }
);

// =============================================================================
// MOBILE LAYOUT INTERFACES
// =============================================================================

export interface MobileLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly header?: ReactNode;
  readonly bottomNavigation?: ReactNode;
  readonly drawer?: ReactNode;
  readonly drawerOpen?: boolean;
  readonly onDrawerClose?: () => void;
  readonly skipToMainContent?: boolean;
  readonly 'aria-label'?: string;
}

export interface MobileHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof mobileHeaderVariants> {
  readonly children: ReactNode;
  readonly menuButton?: ReactNode;
  readonly actions?: ReactNode;
  readonly sticky?: boolean;
}

export interface MobileBottomNavigationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof mobileBottomNavigationVariants> {
  readonly children?: ReactNode;
  readonly items?: Array<{
    icon: ReactNode;
    label: string;
    onClick: () => void;
    active?: boolean;
  }>;
}

export interface MobileDrawerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof mobileDrawerVariants> {
  readonly children: ReactNode;
  readonly onClose?: () => void;
  readonly header?: ReactNode;
}

export interface MobileContentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof mobileContentVariants> {
  readonly children: ReactNode;
}

// =============================================================================
// MOBILE LAYOUT HOOKS
// =============================================================================

/**
 * Mobile-specific styles utility
 */
const useMobileStyles = () => {
  const { colors, spacing, getToken } = useTokens();

  const overlayStyles = React.useMemo((): React.CSSProperties => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
    transition: 'opacity 300ms ease-in-out',
  }), []);

  const safeAreaStyles = React.useMemo((): React.CSSProperties => ({
    paddingTop: 'env(safe-area-inset-top)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  }), []);

  return { overlayStyles, safeAreaStyles };
};

// =============================================================================
// MOBILE LAYOUT COMPONENTS
// =============================================================================

/**
 * MobileHeader Component
 */
export const MobileHeader = forwardRef<HTMLElement, MobileHeaderProps>(
  ({ children, menuButton, actions, sticky = true, variant, size, className, style, ...props }, ref) => {
    const { colors, spacing, typography } = useTokens();

    const headerStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: colors.background?.default || '#ffffff',
      borderBottomColor: colors.border?.default || '#e2e8f0',
      zIndex: sticky ? 50 : 'auto',
      ...style,
    }), [colors, sticky, style]);

    return (
      <header
        ref={ref}
        className={cn(mobileHeaderVariants({ variant, size }), sticky && 'sticky', className)}
        style={headerStyles}
        {...props}
      >
        {menuButton && <div className="flex items-center">{menuButton}</div>}
        <div className="flex-1 flex items-center justify-center">{children}</div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </header>
    );
  }
);

MobileHeader.displayName = 'MobileHeader';

/**
 * MobileBottomNavigation Component
 */
export const MobileBottomNavigation = forwardRef<HTMLElement, MobileBottomNavigationProps>(
  ({ children, items, variant, size, className, style, ...props }, ref) => {
    const { colors, spacing } = useTokens();

    const navStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: colors.background?.default || '#ffffff',
      borderTopColor: colors.border?.default || '#e2e8f0',
      paddingBottom: 'env(safe-area-inset-bottom)',
      ...style,
    }), [colors, style]);

    return (
      <nav
        ref={ref}
        className={cn(mobileBottomNavigationVariants({ variant, size }), className)}
        style={navStyles}
        role="navigation"
        aria-label="Bottom navigation"
        {...props}
      >
        {items ? (
          items.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={cn(
                'flex flex-col items-center justify-center gap-1 p-2',
                'text-xs transition-colors',
                item.active ? 'text-primary' : 'text-muted-foreground'
              )}
              aria-label={item.label}
              aria-current={item.active ? 'page' : undefined}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))
        ) : (
          children
        )}
      </nav>
    );
  }
);

MobileBottomNavigation.displayName = 'MobileBottomNavigation';

/**
 * MobileDrawer Component
 */
export const MobileDrawer = forwardRef<HTMLElement, MobileDrawerProps>(
  ({ children, open, side, onClose, header, className, style, ...props }, ref) => {
    const { colors, spacing } = useTokens();

    const drawerStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: colors.background?.default || '#ffffff',
      borderRightColor: colors.border?.default || '#e2e8f0',
      paddingTop: 'env(safe-area-inset-top)',
      ...style,
    }), [colors, style]);

    return (
      <aside
        ref={ref}
        className={cn(mobileDrawerVariants({ open, side }), className)}
        style={drawerStyles}
        role="navigation"
        aria-label="Mobile navigation drawer"
        {...props}
      >
        {header && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            {header}
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-accent"
                aria-label="Close drawer"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </aside>
    );
  }
);

MobileDrawer.displayName = 'MobileDrawer';

/**
 * MobileContent Component
 */
export const MobileContent = forwardRef<HTMLElement, MobileContentProps>(
  ({ children, paddingBottom, paddingTop, className, style, ...props }, ref) => {
    const { colors } = useTokens();

    const contentStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: colors.background?.default || '#ffffff',
      minHeight: '100%',
      ...style,
    }), [colors, style]);

    return (
      <main
        ref={ref}
        id="main-content"
        className={cn(mobileContentVariants({ paddingBottom, paddingTop }), className)}
        style={contentStyles}
        role="main"
        {...props}
      >
        {children}
      </main>
    );
  }
);

MobileContent.displayName = 'MobileContent';

// =============================================================================
// MOBILE LAYOUT COMPONENT
// =============================================================================

/**
 * MobileLayout Component with token-based styling
 * Optimized for mobile devices with touch interactions and safe areas
 */
export const MobileLayout = forwardRef<HTMLDivElement, MobileLayoutProps>(
  (
    {
      children,
      header,
      bottomNavigation,
      drawer,
      drawerOpen = false,
      onDrawerClose,
      skipToMainContent = true,
      className,
      'aria-label': ariaLabel = 'Mobile application layout',
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(drawerOpen);
    const { setLayout } = useLayout();
    const { overlayStyles } = useMobileStyles();

    React.useEffect(() => {
      setLayout('mobile');
    }, [setLayout]);

    React.useEffect(() => {
      setIsDrawerOpen(drawerOpen);
    }, [drawerOpen]);

    const handleDrawerClose = React.useCallback(() => {
      setIsDrawerOpen(false);
      onDrawerClose?.();
    }, [onDrawerClose]);

    return (
      <BaseLayout
        ref={ref}
        platform="mobile"
        spacing="none"
        skipToMainContent={skipToMainContent}
        className={className}
        aria-label={ariaLabel}
        style={style}
        {...props}
      >
        {header}
        
        {/* Drawer overlay */}
        {isDrawerOpen && drawer && (
          <div
            style={overlayStyles}
            onClick={handleDrawerClose}
            aria-hidden="true"
          />
        )}
        
        {/* Drawer */}
        {drawer && React.cloneElement(drawer as React.ReactElement, {
          open: isDrawerOpen,
          onClose: handleDrawerClose,
        })}
        
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        
        {bottomNavigation}
      </BaseLayout>
    );
  }
);

MobileLayout.displayName = 'MobileLayout';

// =============================================================================
// MOBILE LAYOUT COMPOSITION
// =============================================================================

export const MobileLayoutComposition = {
  /**
   * Standard mobile app layout
   */
  App: ({
    title,
    menuItems,
    bottomNavItems,
    children,
    onMenuToggle,
    ...props
  }: {
    title?: string;
    menuItems?: ReactNode;
    bottomNavItems?: MobileBottomNavigationProps['items'];
    children: ReactNode;
    onMenuToggle?: () => void;
  } & Omit<MobileLayoutProps, 'children'>): React.ReactElement => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
      <MobileLayout
        drawerOpen={drawerOpen}
        onDrawerClose={() => setDrawerOpen(false)}
        header={
          <MobileHeader
            menuButton={
              <button
                onClick={() => {
                  setDrawerOpen(!drawerOpen);
                  onMenuToggle?.();
                }}
                className="p-2 rounded-md hover:bg-accent"
                aria-label="Open menu"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            }
          >
            {title && <h1 className="text-lg font-semibold">{title}</h1>}
          </MobileHeader>
        }
        drawer={
          <MobileDrawer header={<h2 className="text-lg font-semibold">Menu</h2>}>
            {menuItems}
          </MobileDrawer>
        }
        bottomNavigation={
          bottomNavItems && <MobileBottomNavigation items={bottomNavItems} />
        }
        {...props}
      >
        <MobileContent>{children}</MobileContent>
      </MobileLayout>
    );
  },
};

// Export variants for external use
export { mobileHeaderVariants, mobileBottomNavigationVariants, mobileDrawerVariants, mobileContentVariants };