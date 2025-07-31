/**
 * @fileoverview AdminLayout Component v5.0.0 - Token-Based Design System
 * @description Dashboard layout system with top bar, sidebar, content area, and drawer using design tokens with SSR compatibility
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
// ADMIN LAYOUT VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Admin top bar variants using design tokens
 */
const adminTopBarVariants = cva(
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
        dark: 'bg-gray-900 text-gray-100',
        elevated: 'shadow-lg',
      },
      size: {
        sm: 'h-14',
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
 * Admin sidebar variants using design tokens
 */
const adminSidebarVariants = cva(
  [
    'bg-background border-r border-border',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
    'h-full flex flex-col',
    'relative',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        card: 'bg-card',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        dark: 'bg-gray-900 text-gray-100',
      },
      collapsed: {
        true: 'w-16 overflow-hidden',
        false: 'w-64',
      },
      position: {
        fixed: 'fixed left-0 top-16 bottom-0',
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
 * Admin content area variants using design tokens
 */
const adminContentVariants = cva(
  ['flex-1 overflow-auto', 'transition-all duration-300', 'motion-reduce:transition-none'],
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      sidebarCollapsed: {
        true: 'ml-16',
        false: 'ml-64',
      },
      sidebarPosition: {
        fixed: '',
        relative: 'ml-0',
      },
    },
    defaultVariants: {
      padding: 'md',
      sidebarCollapsed: false,
      sidebarPosition: 'relative',
    },
  }
);

/**
 * Admin drawer variants using design tokens
 */
const adminDrawerVariants = cva(
  [
    'fixed right-0 top-0 bottom-0 z-50',
    'bg-background border-l border-border',
    'transform transition-transform duration-300 ease-in-out',
    'motion-reduce:transition-none',
    'shadow-2xl',
  ],
  {
    variants: {
      open: {
        true: 'translate-x-0',
        false: 'translate-x-full',
      },
      size: {
        sm: 'w-80',
        md: 'w-96',
        lg: 'w-[480px]',
      },
    },
    defaultVariants: {
      open: false,
      size: 'md',
    },
  }
);

// =============================================================================
// ADMIN LAYOUT INTERFACES
// =============================================================================

export interface AdminTopBarProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof adminTopBarVariants> {
  /** Top bar content */
  readonly children?: ReactNode;
  /** Logo component */
  readonly logo?: ReactNode;
  /** Search component */
  readonly search?: ReactNode;
  /** Navigation items */
  readonly navigation?: ReactNode;
  /** Action items */
  readonly actions?: ReactNode;
  /** Sticky top bar */
  readonly sticky?: boolean;
}

export interface AdminSidebarProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof adminSidebarVariants> {
  /** Sidebar content */
  readonly children: ReactNode;
  /** Collapse handler */
  readonly onCollapse?: (collapsed: boolean) => void;
  /** Sidebar header */
  readonly header?: ReactNode;
  /** Sidebar footer */
  readonly footer?: ReactNode;
}

export interface AdminContentProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof adminContentVariants> {
  /** Content */
  readonly children: ReactNode;
  /** Content header */
  readonly header?: ReactNode;
  /** Page title */
  readonly title?: string;
  /** Page subtitle */
  readonly subtitle?: string;
  /** Page actions */
  readonly actions?: ReactNode;
  /** Breadcrumbs */
  readonly breadcrumbs?: ReactNode;
}

export interface AdminDrawerProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof adminDrawerVariants> {
  /** Drawer content */
  readonly children: ReactNode;
  /** Close handler */
  readonly onClose?: () => void;
  /** Header content */
  readonly header?: ReactNode;
}

export interface AdminLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout content */
  readonly children: ReactNode;
  /** Top bar component */
  readonly topBar?: ReactNode;
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
  /** Sidebar position */
  readonly sidebarPosition?: 'fixed' | 'relative';
  /** Skip to main content */
  readonly skipToMainContent?: boolean;
  /** Accessibility label */
  readonly 'aria-label'?: string;
}

// =============================================================================
// ADMIN LAYOUT HOOKS
// =============================================================================

/**
 * Admin-specific styles utility
 */
const useAdminStyles = () => {
  const { colors, spacing, getToken } = useTokens();

  const overlayStyles = React.useMemo((): React.CSSProperties => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    zIndex: 40,
    transition: 'opacity 300ms ease-in-out',
  }), []);

  const pageHeaderStyles = React.useMemo((): React.CSSProperties => ({
    marginBottom: spacing?.[8] || '2rem',
    paddingBottom: spacing?.[6] || '1.5rem',
    borderBottom: `1px solid ${colors.border?.default || '#e2e8f0'}`,
  }), [colors, spacing]);

  return { overlayStyles, pageHeaderStyles };
};

// =============================================================================
// ADMIN LAYOUT COMPONENTS
// =============================================================================

/**
 * AdminTopBar Component
 */
export const AdminTopBar = forwardRef<HTMLElement, AdminTopBarProps>(
  ({ children, variant, size, logo, search, navigation, actions, sticky = true, className, style, ...props }, ref) => {
    const { colors, spacing, typography } = useTokens();

    const topBarStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: variant === 'dark' ? '#111827' : colors.background?.default || '#ffffff',
      borderBottomColor: colors.border?.default || '#e2e8f0',
      zIndex: sticky ? 50 : 'auto',
      ...style,
    }), [colors, sticky, variant, style]);

    return (
      <header
        ref={ref}
        className={cn(adminTopBarVariants({ variant, size }), sticky && 'sticky', className)}
        style={topBarStyles}
        role="banner"
        aria-label="Admin navigation"
        {...props}
      >
        <div className="px-6 h-full">
          <div className="flex items-center justify-between h-full gap-4">
            {/* Logo section */}
            {logo && (
              <div className="flex items-center flex-shrink-0">
                {logo}
              </div>
            )}

            {/* Navigation section */}
            {navigation && (
              <nav className="hidden md:flex items-center gap-6" role="navigation">
                {navigation}
              </nav>
            )}

            {/* Search section */}
            {search && (
              <div className="flex-1 max-w-lg mx-auto hidden lg:block">
                {search}
              </div>
            )}

            {/* Actions section */}
            {actions && (
              <div className="flex items-center gap-4 ml-auto">
                {actions}
              </div>
            )}

            {children}
          </div>
        </div>
      </header>
    );
  }
);

AdminTopBar.displayName = 'AdminTopBar';

/**
 * AdminSidebar Component
 */
export const AdminSidebar = forwardRef<HTMLElement, AdminSidebarProps>(
  ({ children, variant, collapsed = false, position, onCollapse, header, footer, className, style, ...props }, ref) => {
    const { colors, spacing, getToken } = useTokens();

    const sidebarStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: variant === 'dark' ? '#111827' : colors.background?.default || '#ffffff',
      borderRightColor: colors.border?.default || '#e2e8f0',
      ...style,
    }), [colors, variant, style]);

    const toggleButtonStyles = React.useMemo((): React.CSSProperties => ({
      padding: spacing?.[2] || '0.5rem',
      borderRadius: getToken('borderRadius.md') as string || '0.375rem',
      transition: 'all 150ms ease-in-out',
    }), [spacing, getToken]);

    return (
      <aside
        ref={ref}
        className={cn(adminSidebarVariants({ variant, collapsed, position }), className)}
        style={sidebarStyles}
        role="navigation"
        aria-label="Admin sidebar"
        aria-expanded={!collapsed}
        {...props}
      >
        {/* Sidebar Header */}
        {(header || onCollapse) && (
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              {header && !collapsed && header}
              {onCollapse && (
                <button
                  onClick={() => onCollapse(!collapsed)}
                  style={toggleButtonStyles}
                  className="hover:bg-accent hover:text-accent-foreground ml-auto"
                  aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  <svg
                    className={cn(
                      'w-5 h-5 transition-transform',
                      collapsed ? 'rotate-180' : 'rotate-0'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>

        {/* Sidebar Footer */}
        {footer && (
          <div className="p-4 border-t border-border">
            {footer}
          </div>
        )}
      </aside>
    );
  }
);

AdminSidebar.displayName = 'AdminSidebar';

/**
 * AdminContent Component
 */
export const AdminContent = forwardRef<HTMLElement, AdminContentProps>(
  ({ children, padding, sidebarCollapsed, sidebarPosition, header, title, subtitle, actions, breadcrumbs, className, style, ...props }, ref) => {
    const { colors, spacing, typography } = useTokens();
    const { pageHeaderStyles } = useAdminStyles();

    const contentStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: colors.background?.default || '#ffffff',
      minHeight: 'calc(100vh - 64px)', // Minus top bar height
      ...style,
    }), [colors, style]);

    const titleStyles = React.useMemo((): React.CSSProperties => ({
      fontSize: typography?.fontSize?.['2xl'] || '1.5rem',
      fontWeight: typography?.fontWeight?.bold || 700,
      color: colors.text?.primary || '#111827',
    }), [colors, typography]);

    const subtitleStyles = React.useMemo((): React.CSSProperties => ({
      fontSize: typography?.fontSize?.base || '1rem',
      color: colors.text?.secondary || '#6b7280',
      marginTop: spacing?.[2] || '0.5rem',
    }), [colors, spacing, typography]);

    return (
      <main
        ref={ref}
        id="main-content"
        className={cn(adminContentVariants({ padding, sidebarCollapsed, sidebarPosition }), className)}
        style={contentStyles}
        role="main"
        {...props}
      >
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <div className="mb-4">
            {breadcrumbs}
          </div>
        )}

        {/* Page Header */}
        {(header || title || actions) && (
          <div style={pageHeaderStyles}>
            {header || (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {title && <h1 style={titleStyles}>{title}</h1>}
                  {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
                </div>
                {actions && (
                  <div className="flex items-center gap-2 ml-8">
                    {actions}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {children}
      </main>
    );
  }
);

AdminContent.displayName = 'AdminContent';

/**
 * AdminDrawer Component
 */
export const AdminDrawer = forwardRef<HTMLElement, AdminDrawerProps>(
  ({ children, open, size, onClose, header, className, style, ...props }, ref) => {
    const { colors, spacing } = useTokens();

    const drawerStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: colors.background?.default || '#ffffff',
      borderLeftColor: colors.border?.default || '#e2e8f0',
      padding: spacing?.[6] || '1.5rem',
      paddingTop: '80px', // Account for top bar
      ...style,
    }), [colors, spacing, style]);

    return (
      <aside
        ref={ref}
        className={cn(adminDrawerVariants({ open, size }), className)}
        style={drawerStyles}
        role="complementary"
        aria-label="Admin side panel"
        {...props}
      >
        {header && (
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            {header}
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-accent transition-colors"
                aria-label="Close panel"
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

AdminDrawer.displayName = 'AdminDrawer';

// =============================================================================
// ADMIN LAYOUT COMPONENT
// =============================================================================

/**
 * AdminLayout Component with token-based styling
 * Optimized for dashboard and admin applications
 */
export const AdminLayout = forwardRef<HTMLDivElement, AdminLayoutProps>(
  (
    {
      children,
      topBar,
      sidebar,
      rightDrawer,
      drawerOpen = false,
      onDrawerClose,
      sidebarCollapsed = false,
      sidebarPosition = 'relative',
      skipToMainContent = true,
      className,
      'aria-label': ariaLabel = 'Admin dashboard layout',
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(drawerOpen);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(sidebarCollapsed);
    const { setLayout } = useLayout();
    const { overlayStyles } = useAdminStyles();

    React.useEffect(() => {
      setLayout('admin');
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
        platform="desktop"
        spacing="none"
        skipToMainContent={skipToMainContent}
        className={cn('min-h-screen w-full flex flex-col', className)}
        aria-label={ariaLabel}
        style={style}
        {...props}
      >
        {/* Top Bar */}
        {topBar}

        {/* Main content area */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Sidebar */}
          {sidebar && React.cloneElement(sidebar as React.ReactElement, {
            collapsed: isSidebarCollapsed,
            onCollapse: handleSidebarCollapse,
            position: sidebarPosition,
          })}

          {/* Content area with drawer */}
          <div className="flex-1 flex">
            <AdminContent 
              sidebarCollapsed={isSidebarCollapsed}
              sidebarPosition={sidebarPosition}
              className="flex-1"
            >
              {children}
            </AdminContent>

            {/* Drawer overlay */}
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
        </div>
      </BaseLayout>
    );
  }
);

AdminLayout.displayName = 'AdminLayout';

// =============================================================================
// ADMIN LAYOUT COMPOSITION
// =============================================================================

export const AdminLayoutComposition = {
  /**
   * Dashboard layout with metrics and widgets
   */
  Dashboard: ({
    appName,
    userMenu,
    navigation,
    metrics,
    widgets,
    children,
    ...props
  }: {
    appName?: string;
    userMenu?: ReactNode;
    navigation?: ReactNode;
    metrics?: ReactNode;
    widgets?: ReactNode;
    children: ReactNode;
  } & Omit<AdminLayoutProps, 'children'>): React.ReactElement => {
    const [sidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
      <AdminLayout
        sidebarCollapsed={sidebarCollapsed}
        topBar={
          <AdminTopBar
            logo={<h1 className="text-xl font-bold">{appName}</h1>}
            actions={
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-md hover:bg-accent">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                {userMenu}
              </div>
            }
          />
        }
        sidebar={
          <AdminSidebar
            header={<h2 className="text-lg font-semibold">Navigation</h2>}
            variant="card"
          >
            {navigation}
          </AdminSidebar>
        }
        {...props}
      >
        {/* Metrics Section */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics}
          </div>
        )}

        {/* Widgets Section */}
        {widgets && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {widgets}
          </div>
        )}

        {children}
      </AdminLayout>
    );
  },

  /**
   * Settings layout with sections
   */
  Settings: ({
    appName,
    sections,
    currentSection,
    children,
    ...props
  }: {
    appName?: string;
    sections?: Array<{ id: string; label: string; icon?: ReactNode }>;
    currentSection?: string;
    children: ReactNode;
  } & Omit<AdminLayoutProps, 'children'>): React.ReactElement => {
    return (
      <AdminLayout
        topBar={
          <AdminTopBar
            logo={<h1 className="text-xl font-bold">{appName} Settings</h1>}
            variant="secondary"
          />
        }
        sidebar={
          <AdminSidebar header={<h2 className="text-lg font-semibold">Settings</h2>}>
            <nav className="space-y-1">
              {sections?.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                    currentSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {section.icon}
                  <span>{section.label}</span>
                </a>
              ))}
            </nav>
          </AdminSidebar>
        }
        {...props}
      >
        <AdminContent
          title="Settings"
          subtitle="Manage your application settings and preferences"
        >
          {children}
        </AdminContent>
      </AdminLayout>
    );
  },
};

// Export variants and types for external use
export type AdminTopBarVariant = VariantProps<typeof adminTopBarVariants>;
export type AdminSidebarVariant = VariantProps<typeof adminSidebarVariants>;
export type AdminContentVariant = VariantProps<typeof adminContentVariants>;
export type AdminDrawerVariant = VariantProps<typeof adminDrawerVariants>;

export { adminTopBarVariants, adminSidebarVariants, adminContentVariants, adminDrawerVariants };