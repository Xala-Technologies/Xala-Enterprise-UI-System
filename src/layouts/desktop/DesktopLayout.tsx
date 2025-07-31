/**
 * @fileoverview DesktopLayout Component v5.0.0 - Token-Based Design System
 * @description Desktop layout system optimized for large screens using design tokens with SSR compatibility
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
// DESKTOP LAYOUT VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Desktop header variants using design tokens
 */
const desktopHeaderVariants = cva(
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
        elevated: 'shadow-lg',
      },
      size: {
        sm: 'h-16 px-6',
        md: 'h-20 px-8',
        lg: 'h-24 px-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Desktop sidebar variants using design tokens
 */
const desktopSidebarVariants = cva(
  [
    'flex h-full flex-col',
    'bg-background border-r border-border',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        card: 'bg-card',
        elevated: 'shadow-lg',
      },
      size: {
        sm: 'w-48',
        md: 'w-56',
        lg: 'w-64',
        xl: 'w-72',
      },
      collapsed: {
        true: 'w-16',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      collapsed: false,
    },
  }
);

/**
 * Desktop main content variants using design tokens
 */
const desktopMainContentVariants = cva(
  [
    'flex flex-1 flex-col',
    'bg-background',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        paper: 'bg-card',
        transparent: 'bg-transparent',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      maxWidth: {
        full: 'max-w-full',
        container: 'max-w-7xl mx-auto',
        content: 'max-w-4xl mx-auto',
        narrow: 'max-w-2xl mx-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      maxWidth: 'full',
    },
  }
);

/**
 * Desktop toolbar variants using design tokens
 */
const desktopToolbarVariants = cva(
  [
    'flex items-center gap-2',
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
        sm: 'h-10 px-3',
        md: 'h-12 px-4',
        lg: 'h-14 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Desktop status bar variants using design tokens
 */
const desktopStatusBarVariants = cva(
  [
    'flex items-center justify-between',
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'border-t border-border',
    'text-xs text-muted-foreground',
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
        sm: 'h-6 px-3',
        md: 'h-8 px-4',
        lg: 'h-10 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// =============================================================================
// DESKTOP LAYOUT INTERFACES
// =============================================================================

export interface DesktopHeaderProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof desktopHeaderVariants> {
  /** Header content */
  readonly children?: ReactNode;
  /** Logo or brand element */
  readonly logo?: ReactNode;
  /** Navigation items */
  readonly navigation?: ReactNode;
  /** Action items */
  readonly actions?: ReactNode;
  /** Sticky header */
  readonly sticky?: boolean;
  /** Blur effect */
  readonly blur?: boolean;
}

export interface DesktopSidebarProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof desktopSidebarVariants> {
  /** Sidebar content */
  readonly children: ReactNode;
  /** Collapse handler */
  readonly onCollapse?: (collapsed: boolean) => void;
  /** Resize handler */
  readonly onResize?: (width: number) => void;
  /** Resizable sidebar */
  readonly resizable?: boolean;
  /** Min width for resize */
  readonly minWidth?: number;
  /** Max width for resize */
  readonly maxWidth?: number;
}

export interface DesktopMainContentProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof desktopMainContentVariants> {
  /** Content */
  readonly children: ReactNode;
  /** Scrollable content */
  readonly scrollable?: boolean;
  /** Centered content */
  readonly centered?: boolean;
}

export interface DesktopToolbarProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof desktopToolbarVariants> {
  /** Toolbar content */
  readonly children?: ReactNode;
  /** Left items */
  readonly leftItems?: ReactNode;
  /** Center items */
  readonly centerItems?: ReactNode;
  /** Right items */
  readonly rightItems?: ReactNode;
  /** Sticky toolbar */
  readonly sticky?: boolean;
}

export interface DesktopStatusBarProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof desktopStatusBarVariants> {
  /** Status bar content */
  readonly children?: ReactNode;
  /** Left items */
  readonly leftItems?: ReactNode;
  /** Center items */
  readonly centerItems?: ReactNode;
  /** Right items */
  readonly rightItems?: ReactNode;
}

export interface DesktopLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout content */
  readonly children: ReactNode;
  /** Header component */
  readonly header?: ReactNode;
  /** Sidebar component */
  readonly sidebar?: ReactNode;
  /** Toolbar component */
  readonly toolbar?: ReactNode;
  /** Status bar component */
  readonly statusBar?: ReactNode;
  /** Full height layout */
  readonly fullHeight?: boolean;
  /** Responsive layout */
  readonly responsive?: boolean;
  /** Sidebar collapsed state */
  readonly sidebarCollapsed?: boolean;
  /** Skip to main content */
  readonly skipToMainContent?: boolean;
  /** Accessibility label */
  readonly 'aria-label'?: string;
}

// =============================================================================
// DESKTOP LAYOUT HOOKS
// =============================================================================

/**
 * Desktop-specific styles utility
 */
const useDesktopStyles = () => {
  const { colors, spacing, getToken } = useTokens();

  const resizeHandleStyles = React.useMemo((): React.CSSProperties => ({
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '4px',
    cursor: 'col-resize',
    backgroundColor: 'transparent',
    transition: 'background-color 150ms ease-in-out',
  }), []);

  const contentPadding = React.useMemo((): React.CSSProperties => ({
    padding: spacing?.[8] || '2rem',
  }), [spacing]);

  return { resizeHandleStyles, contentPadding };
};

// =============================================================================
// DESKTOP LAYOUT COMPONENTS
// =============================================================================

/**
 * DesktopHeader Component
 */
export const DesktopHeader = forwardRef<HTMLElement, DesktopHeaderProps>(
  ({ children, variant, size, logo, navigation, actions, sticky = true, blur = true, className, style, ...props }, ref) => {
    const { colors, spacing, typography } = useTokens();

    const headerStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: blur ? undefined : colors.background?.default || '#ffffff',
      borderBottomColor: colors.border?.default || '#e2e8f0',
      zIndex: sticky ? 50 : 'auto',
      ...style,
    }), [colors, sticky, blur, style]);

    return (
      <header
        ref={ref}
        className={cn(desktopHeaderVariants({ variant, size }), sticky && 'sticky', className)}
        style={headerStyles}
        role="banner"
        {...props}
      >
        <div className="h-full flex items-center justify-between w-full">
          {/* Logo section */}
          {logo && (
            <div className="flex items-center mr-8">
              {logo}
            </div>
          )}

          {/* Navigation section */}
          {navigation && (
            <nav className="flex-1 flex items-center" role="navigation" aria-label="Main navigation">
              {navigation}
            </nav>
          )}

          {/* Actions section */}
          {actions && (
            <div className="flex items-center gap-4 ml-8">
              {actions}
            </div>
          )}

          {children}
        </div>
      </header>
    );
  }
);

DesktopHeader.displayName = 'DesktopHeader';

/**
 * DesktopSidebar Component
 */
export const DesktopSidebar = forwardRef<HTMLElement, DesktopSidebarProps>(
  ({ children, variant, size, collapsed = false, resizable = false, minWidth = 200, maxWidth = 400, onCollapse, onResize, className, style, ...props }, ref) => {
    const { colors, spacing, getToken } = useTokens();
    const { resizeHandleStyles } = useDesktopStyles();
    const [width, setWidth] = useState<number | null>(null);
    const [isResizing, setIsResizing] = useState(false);

    const sidebarStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: colors.background?.default || '#ffffff',
      borderRightColor: colors.border?.default || '#e2e8f0',
      width: width || undefined,
      minWidth: collapsed ? undefined : minWidth,
      maxWidth: collapsed ? undefined : maxWidth,
      position: 'relative',
      ...style,
    }), [colors, width, minWidth, maxWidth, collapsed, style]);

    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
      if (!resizable || collapsed) return;
      e.preventDefault();
      setIsResizing(true);
    }, [resizable, collapsed]);

    React.useEffect(() => {
      if (!isResizing) return;

      const handleMouseMove = (e: MouseEvent) => {
        const newWidth = e.clientX;
        const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
        setWidth(clampedWidth);
        onResize?.(clampedWidth);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isResizing, minWidth, maxWidth, onResize]);

    return (
      <aside
        ref={ref}
        className={cn(desktopSidebarVariants({ variant, size, collapsed }), className)}
        style={sidebarStyles}
        role="complementary"
        aria-label="Sidebar navigation"
        {...props}
      >
        {children}
        
        {/* Resize handle */}
        {resizable && !collapsed && (
          <div
            style={{
              ...resizeHandleStyles,
              backgroundColor: isResizing ? colors.primary?.[500] || '#3b82f6' : undefined,
            }}
            onMouseDown={handleMouseDown}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.border?.default || '#e2e8f0';
            }}
            onMouseLeave={(e) => {
              if (!isResizing) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          />
        )}
      </aside>
    );
  }
);

DesktopSidebar.displayName = 'DesktopSidebar';

/**
 * DesktopMainContent Component
 */
export const DesktopMainContent = forwardRef<HTMLElement, DesktopMainContentProps>(
  ({ children, variant, padding, maxWidth, scrollable = true, centered = false, className, style, ...props }, ref) => {
    const { colors } = useTokens();

    const contentStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: variant === 'paper' ? colors.background?.paper || '#f9fafb' : colors.background?.default || '#ffffff',
      overflow: scrollable ? 'auto' : 'hidden',
      ...style,
    }), [colors, variant, scrollable, style]);

    return (
      <main
        ref={ref}
        id="main-content"
        className={cn(
          desktopMainContentVariants({ variant, padding, maxWidth }),
          centered && 'flex items-center justify-center',
          className
        )}
        style={contentStyles}
        role="main"
        {...props}
      >
        {children}
      </main>
    );
  }
);

DesktopMainContent.displayName = 'DesktopMainContent';

/**
 * DesktopToolbar Component
 */
export const DesktopToolbar = forwardRef<HTMLDivElement, DesktopToolbarProps>(
  ({ children, variant, size, leftItems, centerItems, rightItems, sticky = false, className, style, ...props }, ref) => {
    const { colors, spacing } = useTokens();

    const toolbarStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: colors.background?.default || '#ffffff',
      borderBottomColor: colors.border?.default || '#e2e8f0',
      position: sticky ? 'sticky' : 'static',
      top: sticky ? '80px' : undefined, // Below header
      zIndex: sticky ? 40 : undefined,
      ...style,
    }), [colors, sticky, style]);

    return (
      <div
        ref={ref}
        className={cn(desktopToolbarVariants({ variant, size }), className)}
        style={toolbarStyles}
        role="toolbar"
        {...props}
      >
        {/* Left section */}
        {leftItems && <div className="flex items-center gap-2">{leftItems}</div>}

        {/* Center section */}
        {centerItems && <div className="flex-1 flex items-center justify-center">{centerItems}</div>}

        {/* Right section */}
        {rightItems && <div className="flex items-center gap-2 ml-auto">{rightItems}</div>}

        {children}
      </div>
    );
  }
);

DesktopToolbar.displayName = 'DesktopToolbar';

/**
 * DesktopStatusBar Component
 */
export const DesktopStatusBar = forwardRef<HTMLDivElement, DesktopStatusBarProps>(
  ({ children, variant, size, leftItems, centerItems, rightItems, className, style, ...props }, ref) => {
    const { colors, typography } = useTokens();

    const statusBarStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: colors.background?.default || '#ffffff',
      borderTopColor: colors.border?.default || '#e2e8f0',
      fontSize: typography?.fontSize?.xs || '0.75rem',
      ...style,
    }), [colors, typography, style]);

    return (
      <div
        ref={ref}
        className={cn(desktopStatusBarVariants({ variant, size }), className)}
        style={statusBarStyles}
        role="status"
        aria-live="polite"
        {...props}
      >
        {/* Left section */}
        {leftItems && <div className="flex items-center gap-2">{leftItems}</div>}

        {/* Center section */}
        {centerItems && <div className="flex-1 flex items-center justify-center">{centerItems}</div>}

        {/* Right section */}
        {rightItems && <div className="flex items-center gap-2 ml-auto">{rightItems}</div>}

        {children}
      </div>
    );
  }
);

DesktopStatusBar.displayName = 'DesktopStatusBar';

// =============================================================================
// DESKTOP LAYOUT COMPONENT
// =============================================================================

/**
 * DesktopLayout Component with token-based styling
 * Optimized for large screens with professional desktop application features
 */
export const DesktopLayout = forwardRef<HTMLDivElement, DesktopLayoutProps>(
  (
    {
      children,
      header,
      sidebar,
      toolbar,
      statusBar,
      fullHeight = true,
      responsive = true,
      sidebarCollapsed = false,
      skipToMainContent = true,
      className,
      'aria-label': ariaLabel = 'Desktop application layout',
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(sidebarCollapsed);
    const { setLayout } = useLayout();

    React.useEffect(() => {
      setLayout('desktop');
    }, [setLayout]);

    React.useEffect(() => {
      setIsSidebarCollapsed(sidebarCollapsed);
    }, [sidebarCollapsed]);

    const handleSidebarCollapse = React.useCallback((collapsed: boolean) => {
      setIsSidebarCollapsed(collapsed);
    }, []);

    return (
      <BaseLayout
        ref={ref}
        platform="desktop"
        spacing="none"
        skipToMainContent={skipToMainContent}
        className={cn(
          'flex flex-col',
          fullHeight ? 'h-screen' : 'min-h-screen',
          className
        )}
        aria-label={ariaLabel}
        style={style}
        {...props}
      >
        {/* Header */}
        {header}

        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          {sidebar && React.cloneElement(sidebar as React.ReactElement, {
            collapsed: isSidebarCollapsed,
            onCollapse: handleSidebarCollapse,
          })}

          {/* Content area */}
          <div className="flex flex-1 flex-col">
            {/* Toolbar */}
            {toolbar}

            {/* Main content */}
            <DesktopMainContent scrollable>{children}</DesktopMainContent>

            {/* Status bar */}
            {statusBar}
          </div>
        </div>
      </BaseLayout>
    );
  }
);

DesktopLayout.displayName = 'DesktopLayout';

// =============================================================================
// DESKTOP LAYOUT COMPOSITION
// =============================================================================

export const DesktopLayoutComposition = {
  /**
   * Professional desktop application layout
   */
  Application: ({
    appName,
    navigation,
    userMenu,
    sidebarContent,
    toolbarItems,
    statusItems,
    children,
    ...props
  }: {
    appName?: string;
    navigation?: ReactNode;
    userMenu?: ReactNode;
    sidebarContent?: ReactNode;
    toolbarItems?: ReactNode;
    statusItems?: ReactNode;
    children: ReactNode;
  } & Omit<DesktopLayoutProps, 'children'>): React.ReactElement => {
    const [sidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
      <DesktopLayout
        sidebarCollapsed={sidebarCollapsed}
        header={
          <DesktopHeader
            logo={appName && <h1 className="text-xl font-bold">{appName}</h1>}
            navigation={navigation}
            actions={
              <div className="flex items-center gap-4">
                {userMenu}
                <button
                  onClick={() => setIsSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 rounded-md hover:bg-accent"
                  aria-label="Toggle sidebar"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            }
          />
        }
        sidebar={
          sidebarContent && (
            <DesktopSidebar resizable>{sidebarContent}</DesktopSidebar>
          )
        }
        toolbar={
          toolbarItems && (
            <DesktopToolbar leftItems={toolbarItems} />
          )
        }
        statusBar={
          statusItems && (
            <DesktopStatusBar leftItems={statusItems} />
          )
        }
        {...props}
      >
        {children}
      </DesktopLayout>
    );
  },

  /**
   * Dashboard layout with widgets
   */
  Dashboard: ({
    title,
    widgets,
    filters,
    actions,
    children,
    ...props
  }: {
    title?: string;
    widgets?: ReactNode;
    filters?: ReactNode;
    actions?: ReactNode;
    children: ReactNode;
  } & Omit<DesktopLayoutProps, 'children'>): React.ReactElement => {
    return (
      <DesktopLayout
        header={
          <DesktopHeader
            logo={title && <h1 className="text-xl font-bold">{title}</h1>}
            actions={actions}
          />
        }
        toolbar={
          filters && (
            <DesktopToolbar leftItems={filters} />
          )
        }
        statusBar={
          <DesktopStatusBar
            leftItems={<span>Last updated: {new Date().toLocaleTimeString()}</span>}
          />
        }
        {...props}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {widgets}
        </div>
        {children}
      </DesktopLayout>
    );
  },
};

// Export variants and types for external use
export type DesktopHeaderVariant = VariantProps<typeof desktopHeaderVariants>;
export type DesktopSidebarVariant = VariantProps<typeof desktopSidebarVariants>;
export type DesktopMainContentVariant = VariantProps<typeof desktopMainContentVariants>;
export type DesktopToolbarVariant = VariantProps<typeof desktopToolbarVariants>;
export type DesktopStatusBarVariant = VariantProps<typeof desktopStatusBarVariants>;

export { desktopHeaderVariants, desktopSidebarVariants, desktopMainContentVariants, desktopToolbarVariants, desktopStatusBarVariants };