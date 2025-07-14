/**
 * Desktop Layout Components
 * Comprehensive desktop-first layout system with keyboard navigation and multi-window support
 */

import { cn } from '@/lib/utils/cn';
import { platformTokens } from '@/tokens/platform-tokens';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, useEffect, useRef, useState, type ReactNode } from 'react';
import { BaseLayout } from '../BaseLayout';

/**
 * Desktop header variants
 */
const desktopHeaderVariants = cva(
  [
    'sticky top-0 z-50 w-full',
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'border-b border-border',
    'h-20 px-8',
    'flex items-center',
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
 * Desktop sidebar variants
 */
const desktopSidebarVariants = cva(
  [
    'flex flex-col',
    'bg-card border-r border-border',
    'h-full overflow-hidden',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-card',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        transparent: 'bg-transparent border-transparent',
      },
      size: {
        sm: 'w-56',
        md: 'w-72',
        lg: 'w-80',
        xl: 'w-96',
      },
      collapsed: {
        true: 'w-16 overflow-hidden',
        false: '',
      },
      position: {
        left: 'order-first',
        right: 'order-last border-l border-r-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      collapsed: false,
      position: 'left',
    },
  }
);

/**
 * Desktop main content variants
 */
const desktopMainContentVariants = cva(
  ['flex-1 overflow-auto', 'transition-all duration-300', 'motion-reduce:transition-none'],
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-8',
        lg: 'p-12',
        xl: 'p-16',
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
        full: 'max-w-full',
      },
      layout: {
        default: 'flex flex-col',
        grid: 'grid gap-6',
        dashboard: 'grid grid-cols-12 gap-6',
      },
    },
    defaultVariants: {
      padding: 'md',
      maxWidth: 'full',
      layout: 'default',
    },
  }
);

/**
 * Desktop toolbar variants
 */
const desktopToolbarVariants = cva(
  [
    'flex items-center',
    'bg-background border-b border-border',
    'h-12 px-4',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        muted: 'bg-muted text-muted-foreground',
      },
      position: {
        top: 'border-b',
        bottom: 'border-t border-b-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'top',
    },
  }
);

/**
 * Desktop status bar variants
 */
const desktopStatusBarVariants = cva(
  [
    'flex items-center justify-between',
    'bg-muted/50 text-muted-foreground',
    'h-8 px-4',
    'text-sm',
    'border-t border-border',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-muted/50 text-muted-foreground',
        primary: 'bg-primary/10 text-primary',
        secondary: 'bg-secondary/10 text-secondary',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        destructive: 'bg-destructive/10 text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Desktop Header Props
 */
export interface DesktopHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Header content */
  readonly children?: ReactNode;

  /** Header variant */
  readonly variant?: 'default' | 'primary' | 'secondary' | 'transparent' | 'elevated';

  /** Header size */
  readonly size?: 'sm' | 'md' | 'lg';

  /** Logo component */
  readonly logo?: ReactNode;

  /** Navigation component */
  readonly navigation?: ReactNode;

  /** Search component */
  readonly search?: ReactNode;

  /** Actions component */
  readonly actions?: ReactNode;

  /** User menu component */
  readonly userMenu?: ReactNode;

  /** Header title */
  readonly title?: string;

  /** Show breadcrumbs */
  readonly showBreadcrumbs?: boolean;

  /** Breadcrumb items */
  readonly breadcrumbs?: Array<{
    readonly label: string;
    readonly href?: string;
    readonly onClick?: () => void;
  }>;
}

/**
 * Desktop Sidebar Props
 */
export interface DesktopSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Sidebar content */
  readonly children: ReactNode;

  /** Sidebar variant */
  readonly variant?: 'default' | 'primary' | 'secondary' | 'transparent';

  /** Sidebar size */
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Collapsed state */
  readonly collapsed?: boolean;

  /** Sidebar position */
  readonly position?: 'left' | 'right';

  /** Collapse handler */
  readonly onCollapse?: (collapsed: boolean) => void;

  /** Sidebar header */
  readonly header?: ReactNode;

  /** Sidebar footer */
  readonly footer?: ReactNode;

  /** Sidebar title */
  readonly title?: string;

  /** Resizable */
  readonly resizable?: boolean;

  /** Minimum width */
  readonly minWidth?: number;

  /** Maximum width */
  readonly maxWidth?: number;
}

/**
 * Desktop Main Content Props
 */
export interface DesktopMainContentProps extends React.HTMLAttributes<HTMLElement> {
  /** Main content */
  readonly children: ReactNode;

  /** Content padding */
  readonly padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  /** Maximum width */
  readonly maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full';

  /** Layout type */
  readonly layout?: 'default' | 'grid' | 'dashboard';

  /** Content title */
  readonly title?: string;

  /** Content subtitle */
  readonly subtitle?: string;

  /** Content actions */
  readonly actions?: ReactNode;

  /** Content toolbar */
  readonly toolbar?: ReactNode;

  /** Content breadcrumbs */
  readonly breadcrumbs?: ReactNode;
}

/**
 * Desktop Toolbar Props
 */
export interface DesktopToolbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Toolbar content */
  readonly children: ReactNode;

  /** Toolbar variant */
  readonly variant?: 'default' | 'primary' | 'secondary' | 'muted';

  /** Toolbar position */
  readonly position?: 'top' | 'bottom';

  /** Left actions */
  readonly leftActions?: ReactNode;

  /** Right actions */
  readonly rightActions?: ReactNode;

  /** Center content */
  readonly centerContent?: ReactNode;
}

/**
 * Desktop Status Bar Props
 */
export interface DesktopStatusBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Status bar content */
  readonly children?: ReactNode;

  /** Status bar variant */
  readonly variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';

  /** Left content */
  readonly leftContent?: ReactNode;

  /** Right content */
  readonly rightContent?: ReactNode;

  /** Status message */
  readonly statusMessage?: string;

  /** Connection status */
  readonly connectionStatus?: 'connected' | 'disconnected' | 'connecting';
}

/**
 * Desktop Layout Props
 */
export interface DesktopLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout content */
  readonly children: ReactNode;

  /** Header component */
  readonly header?: ReactNode;

  /** Left sidebar component */
  readonly leftSidebar?: ReactNode;

  /** Right sidebar component */
  readonly rightSidebar?: ReactNode;

  /** Footer component */
  readonly footer?: ReactNode;

  /** Status bar component */
  readonly statusBar?: ReactNode;

  /** Toolbar component */
  readonly toolbar?: ReactNode;

  /** Left sidebar collapsed */
  readonly leftSidebarCollapsed?: boolean;

  /** Right sidebar collapsed */
  readonly rightSidebarCollapsed?: boolean;

  /** Full screen mode */
  readonly fullscreen?: boolean;

  /** Window controls */
  readonly windowControls?: ReactNode;
}

/**
 * Desktop Header Component
 */
export const DesktopHeader = forwardRef<HTMLElement, DesktopHeaderProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      logo,
      navigation,
      search,
      actions,
      userMenu,
      title,
      showBreadcrumbs = false,
      breadcrumbs = [],
      className,
      ...props
    },
    ref
  ): void => {
    return (
      <header
        ref={ref}
        role="banner"
        className={cn(desktopHeaderVariants({ variant, size }), className)}
        {...props}
      >
        {/* Logo */}
        {logo && <div className="flex items-center mr-8">{logo}</div>}

        {/* Title */}
        {title && (
          <div className="flex items-center mr-8">
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          </div>
        )}

        {/* Navigation */}
        {navigation && (
          <nav role="navigation" aria-label="Main navigation" className="flex-1">
            {navigation}
          </nav>
        )}

        {/* Search */}
        {search && <div className="flex items-center mx-4">{search}</div>}

        {/* Actions */}
        {actions && <div className="flex items-center space-x-2 mx-4">{actions}</div>}

        {/* User Menu */}
        {userMenu && <div className="flex items-center ml-4">{userMenu}</div>}

        {/* Breadcrumbs */}
        {showBreadcrumbs && breadcrumbs.length > 0 && (
          <nav
            role="navigation"
            aria-label="Breadcrumb"
            className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border"
          >
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <svg
                      className="w-4 h-4 mx-2 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      onClick={crumb.onClick}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Custom content */}
        {children}
      </header>
    );
  }
);

DesktopHeader.displayName = 'DesktopHeader';

/**
 * Desktop Sidebar Component
 */
export const DesktopSidebar = forwardRef<HTMLElement, DesktopSidebarProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      collapsed = false,
      position = 'left',
      onCollapse,
      header,
      footer,
      title,
      resizable = false,
      minWidth = 200,
      maxWidth = 400,
      className,
      ...props
    },
    ref
  ): void => {
    const [width, setWidth] = useState(platformTokens.layout.desktop.sidebar.width);
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);

    // Handle resize
    useEffect((): void => {
      if (!resizable) return;

      const handleMouseMove = (e: MouseEvent): void => {
        if (!isResizing) return;

        const sidebar = sidebarRef.current;
        if (!sidebar) return;

        const rect = sidebar.getBoundingClientRect();
        const newWidth = position === 'left' ? e.clientX - rect.left : rect.right - e.clientX;

        if (newWidth >= minWidth && newWidth <= maxWidth) {
          setWidth(`${newWidth}px`);
        }
      };

      const handleMouseUp = (): void => {
        setIsResizing(false);
      };

      if (isResizing) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'col-resize';
      }

      return (): void => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'default';
      };
    }, [isResizing, minWidth, maxWidth, position]);

    return (
      <aside
        ref={ref}
        role="complementary"
        aria-label={title || 'Sidebar'}
        className={cn(desktopSidebarVariants({ variant, size, collapsed, position }), className)}
        style={{ width: collapsed ? '4rem' : width }}
        {...props}
      >
        {/* Header */}
        {(title || header) && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            {title && !collapsed && (
              <h2 className="text-lg font-semibold text-foreground truncate">{title}</h2>
            )}
            {header}
            {onCollapse && (
              <button
                onClick={() => onCollapse(!collapsed)}
                className="p-1 rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <svg
                  className={cn(
                    'w-4 h-4 transition-transform',
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>

        {/* Footer */}
        {footer && <div className="p-4 border-t border-border">{footer}</div>}

        {/* Resize handle */}
        {resizable && !collapsed && (
          <div
            className={cn(
              'absolute top-0 w-1 h-full cursor-col-resize hover:bg-border transition-colors',
              position === 'left' ? 'right-0' : 'left-0'
            )}
            onMouseDown={() => setIsResizing(true)}
          />
        )}
      </aside>
    );
  }
);

DesktopSidebar.displayName = 'DesktopSidebar';

/**
 * Desktop Main Content Component
 */
export const DesktopMainContent = forwardRef<HTMLElement, DesktopMainContentProps>(
  (
    {
      children,
      padding = 'md',
      maxWidth = 'full',
      layout = 'default',
      title,
      subtitle,
      actions,
      toolbar,
      breadcrumbs,
      className,
      ...props
    },
    ref
  ): void => {
    return (
      <main
        ref={ref}
        role="main"
        aria-label={title || 'Main content'}
        className={cn(desktopMainContentVariants({ padding, maxWidth, layout }), className)}
        {...props}
      >
        {/* Breadcrumbs */}
        {breadcrumbs && <div className="mb-6">{breadcrumbs}</div>}

        {/* Title and Actions */}
        {(title || actions) && (
          <div className="flex items-center justify-between mb-8">
            <div>
              {title && <h1 className="text-3xl font-bold text-foreground">{title}</h1>}
              {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center space-x-2">{actions}</div>}
          </div>
        )}

        {/* Toolbar */}
        {toolbar && <div className="mb-6">{toolbar}</div>}

        {/* Content */}
        {children}
      </main>
    );
  }
);

DesktopMainContent.displayName = 'DesktopMainContent';

/**
 * Desktop Toolbar Component
 */
export const DesktopToolbar = forwardRef<HTMLElement, DesktopToolbarProps>(
  (
    {
      children,
      variant = 'default',
      position = 'top',
      leftActions,
      rightActions,
      centerContent,
      className,
      ...props
    },
    ref
  ): void => {
    return (
      <div
        ref={ref}
        role="toolbar"
        aria-label="Toolbar"
        className={cn(desktopToolbarVariants({ variant, position }), className)}
        {...props}
      >
        {/* Left Actions */}
        {leftActions && <div className="flex items-center space-x-2">{leftActions}</div>}

        {/* Center Content */}
        {centerContent && (
          <div className="flex-1 flex items-center justify-center mx-4">{centerContent}</div>
        )}

        {/* Right Actions */}
        {rightActions && <div className="flex items-center space-x-2 ml-auto">{rightActions}</div>}

        {/* Custom content */}
        {children}
      </div>
    );
  }
);

DesktopToolbar.displayName = 'DesktopToolbar';

/**
 * Desktop Status Bar Component
 */
export const DesktopStatusBar = forwardRef<HTMLElement, DesktopStatusBarProps>(
  (
    {
      children,
      variant = 'default',
      leftContent,
      rightContent,
      statusMessage,
      connectionStatus = 'connected',
      className,
      ...props
    },
    ref
  ): void => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Status bar"
        className={cn(desktopStatusBarVariants({ variant }), className)}
        {...props}
      >
        {/* Left Content */}
        <div className="flex items-center space-x-4">
          {leftContent}
          {statusMessage && <span className="text-sm">{statusMessage}</span>}
        </div>

        {/* Right Content */}
        <div className="flex items-center space-x-4">
          {rightContent}
          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                'w-2 h-2 rounded-full',
                connectionStatus === 'connected'
                  ? 'bg-green-500'
                  : connectionStatus === 'connecting'
                    ? 'bg-yellow-500 animate-pulse'
                    : 'bg-red-500'
              )}
            />
            <span className="text-xs capitalize">{connectionStatus}</span>
          </div>
        </div>

        {/* Custom content */}
        {children}
      </div>
    );
  }
);

DesktopStatusBar.displayName = 'DesktopStatusBar';

/**
 * Desktop Layout Component
 */
export const DesktopLayout = forwardRef<HTMLDivElement, DesktopLayoutProps>(
  (
    {
      children,
      header,
      leftSidebar,
      rightSidebar,
      footer,
      statusBar,
      toolbar,
      leftSidebarCollapsed = false,
      rightSidebarCollapsed = false,
      fullscreen = false,
      windowControls,
      className,
      ...props
    },
    ref
  ): void => {
    return (
      <BaseLayout
        ref={ref}
        platform="desktop"
        className={cn('desktop-layout', fullscreen && 'fixed inset-0 z-50', className)}
        {...props}
      >
        {/* Window Controls */}
        {windowControls && <div className="desktop-window-controls">{windowControls}</div>}

        {/* Header */}
        {header}

        {/* Toolbar */}
        {toolbar}

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          {leftSidebar}

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">{children}</div>

          {/* Right Sidebar */}
          {rightSidebar}
        </div>

        {/* Footer */}
        {footer}

        {/* Status Bar */}
        {statusBar}
      </BaseLayout>
    );
  }
);

DesktopLayout.displayName = 'DesktopLayout';

/**
 * Desktop layout composition utilities
 */
export const DesktopLayoutComposition = {
  /**
   * Standard desktop app layout
   */
  App: ({
    header,
    leftSidebar,
    rightSidebar,
    content,
    footer,
    statusBar,
    toolbar,
    leftSidebarCollapsed = false,
    rightSidebarCollapsed = false,
    ...props
  }: {
    header?: ReactNode;
    leftSidebar?: ReactNode;
    rightSidebar?: ReactNode;
    content: ReactNode;
    footer?: ReactNode;
    statusBar?: ReactNode;
    toolbar?: ReactNode;
    leftSidebarCollapsed?: boolean;
    rightSidebarCollapsed?: boolean;
  } & DesktopLayoutProps) => (
    <DesktopLayout
      leftSidebarCollapsed={leftSidebarCollapsed}
      rightSidebarCollapsed={rightSidebarCollapsed}
      {...props}
    >
      {header}
      {toolbar}
      <div className="flex flex-1 overflow-hidden">
        {leftSidebar}
        <DesktopMainContent>{content}</DesktopMainContent>
        {rightSidebar}
      </div>
      {footer}
      {statusBar}
    </DesktopLayout>
  ),

  /**
   * Dashboard layout
   */
  Dashboard: ({
    header,
    sidebar,
    content,
    toolbar,
    statusBar,
    sidebarCollapsed = false,
    ...props
  }: {
    header?: ReactNode;
    sidebar?: ReactNode;
    content: ReactNode;
    toolbar?: ReactNode;
    statusBar?: ReactNode;
    sidebarCollapsed?: boolean;
  } & DesktopLayoutProps) => (
    <DesktopLayout leftSidebarCollapsed={sidebarCollapsed} {...props}>
      {header}
      {toolbar}
      <div className="flex flex-1 overflow-hidden">
        {sidebar}
        <DesktopMainContent layout="dashboard" maxWidth="full">
          {content}
        </DesktopMainContent>
      </div>
      {statusBar}
    </DesktopLayout>
  ),

  /**
   * Document editor layout
   */
  Editor: ({
    header,
    leftSidebar,
    rightSidebar,
    content,
    toolbar,
    statusBar,
    ...props
  }: {
    header?: ReactNode;
    leftSidebar?: ReactNode;
    rightSidebar?: ReactNode;
    content: ReactNode;
    toolbar?: ReactNode;
    statusBar?: ReactNode;
  } & DesktopLayoutProps) => (
    <DesktopLayout {...props}>
      {header}
      {toolbar}
      <div className="flex flex-1 overflow-hidden">
        {leftSidebar}
        <DesktopMainContent padding="none" maxWidth="full">
          {content}
        </DesktopMainContent>
        {rightSidebar}
      </div>
      {statusBar}
    </DesktopLayout>
  ),
};

/**
 * Export desktop layout variants and types
 */
export type DesktopHeaderVariant = VariantProps<typeof desktopHeaderVariants>;
export type DesktopSidebarVariant = VariantProps<typeof desktopSidebarVariants>;
export type DesktopMainContentVariant = VariantProps<typeof desktopMainContentVariants>;
export type DesktopToolbarVariant = VariantProps<typeof desktopToolbarVariants>;
export type DesktopStatusBarVariant = VariantProps<typeof desktopStatusBarVariants>;

export {
  desktopHeaderVariants,
  desktopMainContentVariants,
  desktopSidebarVariants,
  desktopStatusBarVariants,
  desktopToolbarVariants,
};
