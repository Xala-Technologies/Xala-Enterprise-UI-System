/**
 * @fileoverview TabletLayout Component v5.0.0 - Token-Based Design System
 * @description Hybrid mobile/desktop layout system optimized for tablet devices using design tokens with SSR compatibility
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
// TABLET LAYOUT VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Tablet header variants using design tokens
 */
const tabletHeaderVariants = cva(
  [
    'sticky top-0 z-50 w-full',
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'border-b border-border',
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
        sm: 'h-16 px-4',
        md: 'h-18 px-6',
        lg: 'h-20 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Tablet sidebar variants using design tokens
 */
const tabletSidebarVariants = cva(
  [
    'fixed left-0 top-0 bottom-0 z-40',
    'bg-background border-r border-border',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
    'overflow-hidden',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        card: 'bg-card',
      },
      collapsed: {
        true: 'w-16 md:w-20',
        false: 'w-64 md:w-72',
      },
      position: {
        fixed: 'fixed',
        relative: 'relative',
      },
    },
    defaultVariants: {
      variant: 'default',
      collapsed: false,
      position: 'relative',
    },
  }
);

/**
 * Tablet content variants using design tokens
 */
const tabletContentVariants = cva(
  ['flex-1 overflow-auto', 'transition-all duration-300', 'motion-reduce:transition-none'],
  {
    variants: {
      sidebarCollapsed: {
        true: 'md:ml-20',
        false: 'md:ml-72',
      },
      hasRightDrawer: {
        true: 'mr-80',
        false: 'mr-0',
      },
    },
    defaultVariants: {
      sidebarCollapsed: false,
      hasRightDrawer: false,
    },
  }
);

/**
 * Tablet right drawer variants using design tokens
 */
const tabletRightDrawerVariants = cva(
  [
    'fixed right-0 top-0 bottom-0 z-40',
    'w-80 bg-background',
    'border-l border-border',
    'transform transition-transform duration-300 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      open: {
        true: 'translate-x-0',
        false: 'translate-x-full',
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

// =============================================================================
// TABLET LAYOUT INTERFACES
// =============================================================================

export interface TabletHeaderProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof tabletHeaderVariants> {
  /** Header content */
  readonly children?: ReactNode;
  /** Left content */
  readonly leftContent?: ReactNode;
  /** Center content */
  readonly centerContent?: ReactNode;
  /** Right content */
  readonly rightContent?: ReactNode;
  /** Sticky header */
  readonly sticky?: boolean;
}

export interface TabletSidebarProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof tabletSidebarVariants> {
  /** Sidebar content */
  readonly children: ReactNode;
  /** Collapse handler */
  readonly onCollapse?: (collapsed: boolean) => void;
  /** Header content */
  readonly header?: ReactNode;
}

export interface TabletContentProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof tabletContentVariants> {
  /** Content */
  readonly children: ReactNode;
}

export interface TabletRightDrawerProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof tabletRightDrawerVariants> {
  /** Drawer content */
  readonly children: ReactNode;
  /** Close handler */
  readonly onClose?: () => void;
  /** Header content */
  readonly header?: ReactNode;
}

export interface TabletLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout content */
  readonly children: ReactNode;
  /** Header component */
  readonly header?: ReactNode;
  /** Sidebar component */
  readonly sidebar?: ReactNode;
  /** Right drawer component */
  readonly rightDrawer?: ReactNode;
  /** Drawer open state */
  readonly drawerOpen?: boolean;
  /** Drawer close handler */
  readonly onDrawerClose?: () => void;
  /** Sidebar collapsed state */
  readonly sidebarCollapsed?: boolean;
  /** Skip to main content */
  readonly skipToMainContent?: boolean;
  /** Accessibility label */
  readonly 'aria-label'?: string;
}

// =============================================================================
// TABLET LAYOUT HOOKS
// =============================================================================

/**
 * Tablet-specific styles utility
 */
const useTabletStyles = () => {
  const { colors, spacing, getToken } = useTokens();

  const overlayStyles = React.useMemo((): React.CSSProperties => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 30,
    transition: 'opacity 300ms ease-in-out',
  }), []);

  const mainContentPadding = React.useMemo((): React.CSSProperties => ({
    padding: spacing?.[6] || '1.5rem',
  }), [spacing]);

  return { overlayStyles, mainContentPadding };
};

// =============================================================================
// TABLET LAYOUT COMPONENTS
// =============================================================================

/**
 * TabletHeader Component
 */
export const TabletHeader = forwardRef<HTMLElement, TabletHeaderProps>(
  ({ children, variant, size, leftContent, centerContent, rightContent, sticky = true, className, style, ...props }, ref) => {
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
        className={cn(tabletHeaderVariants({ variant, size }), sticky && 'sticky', className)}
        style={headerStyles}
        role="banner"
        {...props}
      >
        <div className="h-full flex items-center justify-between">
          {leftContent && <div className="flex items-center">{leftContent}</div>}
          {centerContent && (
            <div className="flex-1 flex items-center justify-center mx-4">{centerContent}</div>
          )}
          {rightContent && <div className="flex items-center gap-2">{rightContent}</div>}
          {children}
        </div>
      </header>
    );
  }
);

TabletHeader.displayName = 'TabletHeader';

/**
 * TabletSidebar Component
 */
export const TabletSidebar = forwardRef<HTMLElement, TabletSidebarProps>(
  ({ children, variant, collapsed = false, position, onCollapse, header, className, style, ...props }, ref) => {
    const { colors, spacing, getToken } = useTokens();

    const sidebarStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: colors.background?.default || '#ffffff',
      borderRightColor: colors.border?.default || '#e2e8f0',
      height: '100%',
      ...style,
    }), [colors, style]);

    const buttonStyles = React.useMemo((): React.CSSProperties => ({
      padding: spacing?.[2] || '0.5rem',
      borderRadius: getToken('borderRadius.md') as string || '0.375rem',
      transition: 'all 150ms ease-in-out',
    }), [spacing, getToken]);

    return (
      <aside
        ref={ref}
        className={cn(tabletSidebarVariants({ variant, collapsed, position }), className)}
        style={sidebarStyles}
        role="complementary"
        aria-label="Sidebar navigation"
        {...props}
      >
        {(header || onCollapse) && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            {header}
            {onCollapse && (
              <button
                onClick={() => onCollapse(!collapsed)}
                style={buttonStyles}
                className="hover:bg-accent hover:text-accent-foreground"
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <svg
                  className={cn(
                    'w-5 h-5 transition-transform',
                    collapsed ? 'rotate-0' : 'rotate-180'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </aside>
    );
  }
);

TabletSidebar.displayName = 'TabletSidebar';

/**
 * TabletContent Component
 */
export const TabletContent = forwardRef<HTMLElement, TabletContentProps>(
  ({ children, sidebarCollapsed, hasRightDrawer, className, style, ...props }, ref) => {
    const { colors } = useTokens();
    const { mainContentPadding } = useTabletStyles();

    const contentStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: colors.background?.default || '#ffffff',
      minHeight: '100%',
      ...mainContentPadding,
      ...style,
    }), [colors, mainContentPadding, style]);

    return (
      <main
        ref={ref}
        id="main-content"
        className={cn(tabletContentVariants({ sidebarCollapsed, hasRightDrawer }), className)}
        style={contentStyles}
        role="main"
        {...props}
      >
        {children}
      </main>
    );
  }
);

TabletContent.displayName = 'TabletContent';

/**
 * TabletRightDrawer Component
 */
export const TabletRightDrawer = forwardRef<HTMLElement, TabletRightDrawerProps>(
  ({ children, open, onClose, header, className, style, ...props }, ref) => {
    const { colors, spacing } = useTokens();

    const drawerStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: colors.background?.default || '#ffffff',
      borderLeftColor: colors.border?.default || '#e2e8f0',
      padding: spacing?.[6] || '1.5rem',
      ...style,
    }), [colors, spacing, style]);

    return (
      <aside
        ref={ref}
        className={cn(tabletRightDrawerVariants({ open }), className)}
        style={drawerStyles}
        role="complementary"
        aria-label="Right drawer"
        {...props}
      >
        {header && (
          <div className="flex items-center justify-between mb-4">
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
        <div className="flex-1 overflow-auto">{children}</div>
      </aside>
    );
  }
);

TabletRightDrawer.displayName = 'TabletRightDrawer';

// =============================================================================
// TABLET LAYOUT COMPONENT
// =============================================================================

/**
 * TabletLayout Component with token-based styling
 * Optimized for tablet devices with hybrid mobile/desktop features
 */
export const TabletLayout = forwardRef<HTMLDivElement, TabletLayoutProps>(
  (
    {
      children,
      header,
      sidebar,
      rightDrawer,
      drawerOpen = false,
      onDrawerClose,
      sidebarCollapsed = false,
      skipToMainContent = true,
      className,
      'aria-label': ariaLabel = 'Tablet application layout',
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(drawerOpen);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(sidebarCollapsed);
    const { setLayout } = useLayout();
    const { overlayStyles } = useTabletStyles();

    React.useEffect(() => {
      setLayout('tablet');
    }, [setLayout]);

    React.useEffect(() => {
      setIsDrawerOpen(drawerOpen);
    }, [drawerOpen]);

    React.useEffect(() => {
      setIsSidebarCollapsed(sidebarCollapsed);
    }, [sidebarCollapsed]);

    const handleDrawerClose = React.useCallback(() => {
      setIsDrawerOpen(false);
      onDrawerClose?.();
    }, [onDrawerClose]);

    const handleSidebarCollapse = React.useCallback((collapsed: boolean) => {
      setIsSidebarCollapsed(collapsed);
    }, []);

    return (
      <BaseLayout
        ref={ref}
        platform="tablet"
        spacing="none"
        skipToMainContent={skipToMainContent}
        className={className}
        aria-label={ariaLabel}
        style={style}
        {...props}
      >
        {header}
        
        <div className="flex-1 flex overflow-hidden relative">
          {/* Sidebar */}
          {sidebar && React.cloneElement(sidebar as React.ReactElement, {
            collapsed: isSidebarCollapsed,
            onCollapse: handleSidebarCollapse,
          })}
          
          {/* Main content */}
          <TabletContent 
            sidebarCollapsed={isSidebarCollapsed}
            hasRightDrawer={isDrawerOpen}
          >
            {children}
          </TabletContent>
          
          {/* Right drawer overlay */}
          {isDrawerOpen && rightDrawer && (
            <div
              style={overlayStyles}
              onClick={handleDrawerClose}
              aria-hidden="true"
            />
          )}
          
          {/* Right drawer */}
          {rightDrawer && React.cloneElement(rightDrawer as React.ReactElement, {
            open: isDrawerOpen,
            onClose: handleDrawerClose,
          })}
        </div>
      </BaseLayout>
    );
  }
);

TabletLayout.displayName = 'TabletLayout';

// =============================================================================
// TABLET LAYOUT COMPOSITION
// =============================================================================

export const TabletLayoutComposition = {
  /**
   * Standard tablet app layout with sidebar and header
   */
  App: ({
    title,
    navigation,
    actions,
    sidebarContent,
    drawerContent,
    children,
    ...props
  }: {
    title?: string;
    navigation?: ReactNode;
    actions?: ReactNode;
    sidebarContent?: ReactNode;
    drawerContent?: ReactNode;
    children: ReactNode;
  } & Omit<TabletLayoutProps, 'children'>): React.ReactElement => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [sidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
      <TabletLayout
        drawerOpen={drawerOpen}
        onDrawerClose={() => setDrawerOpen(false)}
        sidebarCollapsed={sidebarCollapsed}
        header={
          <TabletHeader
            leftContent={
              <button
                onClick={() => setIsSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-md hover:bg-accent"
                aria-label="Toggle sidebar"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            }
            centerContent={title && <h1 className="text-xl font-semibold">{title}</h1>}
            rightContent={
              <div className="flex items-center gap-2">
                {actions}
                {drawerContent && (
                  <button
                    onClick={() => setDrawerOpen(!drawerOpen)}
                    className="p-2 rounded-md hover:bg-accent"
                    aria-label="Toggle drawer"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m7-7H5" />
                    </svg>
                  </button>
                )}
              </div>
            }
          />
        }
        sidebar={
          sidebarContent && (
            <TabletSidebar header={<h2 className="text-lg font-semibold">Navigation</h2>}>
              {sidebarContent}
            </TabletSidebar>
          )
        }
        rightDrawer={
          drawerContent && (
            <TabletRightDrawer header={<h3 className="text-lg font-semibold">Details</h3>}>
              {drawerContent}
            </TabletRightDrawer>
          )
        }
        {...props}
      >
        {children}
      </TabletLayout>
    );
  },

  /**
   * Focused reading layout without sidebar
   */
  Reader: ({
    title,
    toc,
    children,
    ...props
  }: {
    title?: string;
    toc?: ReactNode;
    children: ReactNode;
  } & Omit<TabletLayoutProps, 'children'>): React.ReactElement => {
    const [tocOpen, setTocOpen] = useState(false);

    return (
      <TabletLayout
        drawerOpen={tocOpen}
        onDrawerClose={() => setTocOpen(false)}
        header={
          <TabletHeader
            centerContent={title && <h1 className="text-xl font-semibold">{title}</h1>}
            rightContent={
              toc && (
                <button
                  onClick={() => setTocOpen(!tocOpen)}
                  className="p-2 rounded-md hover:bg-accent"
                  aria-label="Table of contents"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )
            }
          />
        }
        rightDrawer={
          toc && (
            <TabletRightDrawer header={<h3 className="text-lg font-semibold">Table of Contents</h3>}>
              {toc}
            </TabletRightDrawer>
          )
        }
        {...props}
      >
        <div className="max-w-4xl mx-auto">{children}</div>
      </TabletLayout>
    );
  },
};

// Export variants and types for external use
export type TabletHeaderVariant = VariantProps<typeof tabletHeaderVariants>;
export type TabletSidebarVariant = VariantProps<typeof tabletSidebarVariants>;
export type TabletContentVariant = VariantProps<typeof tabletContentVariants>;
export type TabletRightDrawerVariant = VariantProps<typeof tabletRightDrawerVariants>;

export { tabletHeaderVariants, tabletSidebarVariants, tabletContentVariants, tabletRightDrawerVariants };
