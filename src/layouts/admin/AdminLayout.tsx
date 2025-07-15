/**
 * Admin Layout Components
 * Dashboard layout system with top bar, sidebar, content area, and drawer
 */

import { cn } from '@/lib/utils/cn';
import { platformTokens } from '@/tokens/platform-tokens';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type ReactNode } from 'react';

/**
 * Admin top bar variants using design tokens
 */
const adminTopBarVariants = cva(
  [
    'sticky top-0 z-50 w-full',
    'bg-background/95 backdrop-blur',
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
      },
      size: {
        sm: 'h-16',
        md: 'h-20',
        lg: 'h-24',
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
    'bg-card border-r border-border',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
    'h-full flex flex-col',
  ],
  {
    variants: {
      variant: {
        default: 'bg-card',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
      },
      collapsed: {
        true: 'w-16 overflow-hidden',
        false: 'w-64',
      },
    },
    defaultVariants: {
      variant: 'default',
      collapsed: false,
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
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  }
);

/**
 * Admin Top Bar Props
 */
export interface AdminTopBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Top bar variant */
  readonly variant?: 'default' | 'primary' | 'secondary';
  /** Top bar size */
  readonly size?: 'sm' | 'md' | 'lg';
  /** Logo component */
  readonly logo?: ReactNode;
  /** Search component */
  readonly search?: ReactNode;
  /** Language toggle */
  readonly languageToggle?: ReactNode;
  /** Theme toggle */
  readonly themeToggle?: ReactNode;
  /** Login button */
  readonly loginButton?: ReactNode;
  /** Profile dropdown */
  readonly profileDropdown?: ReactNode;
}

/**
 * Admin Sidebar Props
 */
export interface AdminSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Sidebar content */
  readonly children: ReactNode;
  /** Sidebar variant */
  readonly variant?: 'default' | 'primary' | 'secondary';
  /** Collapsed state */
  readonly collapsed?: boolean;
  /** Collapse handler */
  // eslint-disable-next-line no-unused-vars
  readonly onCollapse?: (_collapsed: boolean) => void;
  /** Sidebar title */
  readonly title?: string;
}

/**
 * Admin Content Props
 */
export interface AdminContentProps extends React.HTMLAttributes<HTMLElement> {
  /** Content */
  readonly children: ReactNode;
  /** Content padding */
  readonly padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Content title */
  readonly title?: string;
  /** Content subtitle */
  readonly subtitle?: string;
  /** Content actions */
  readonly actions?: ReactNode;
}

/**
 * Admin Layout Props
 */
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
}

/**
 * Admin Top Bar Component
 * @param props - Top bar properties
 * @returns React.ReactElement
 */
export const AdminTopBar = forwardRef<HTMLElement, AdminTopBarProps>(
  (
    {
      variant = 'default',
      size = 'md',
      logo,
      search,
      languageToggle,
      themeToggle,
      loginButton,
      profileDropdown,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Admin navigation"
        className={cn(adminTopBarVariants({ variant, size }), className)}
        {...props}
      >
        <div className="px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex items-center">{logo}</div>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-8">{search}</div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {languageToggle}
              {themeToggle}
              {loginButton}
              {profileDropdown}
            </div>
          </div>
        </div>
      </nav>
    );
  }
);

AdminTopBar.displayName = 'AdminTopBar';

/**
 * Admin Sidebar Component
 * @param props - Sidebar properties
 * @returns React.ReactElement
 */
export const AdminSidebar = forwardRef<HTMLElement, AdminSidebarProps>(
  (
    { children, variant = 'default', collapsed = false, onCollapse, title, className, ...props },
    ref
  ): React.ReactElement => {
    return (
      <aside
        ref={ref}
        role="complementary"
        aria-label={title || 'Admin sidebar'}
        className={cn(adminSidebarVariants({ variant, collapsed }), className)}
        style={{
          width: collapsed ? '60px' : platformTokens.desktop.layout.sidebar.width,
        }}
        {...props}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {title && !collapsed && (
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            )}
            {onCollapse && (
              <button
                onClick={() => onCollapse(!collapsed)}
                className="p-1 rounded-md hover:bg-accent hover:text-accent-foreground"
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
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </aside>
    );
  }
);

AdminSidebar.displayName = 'AdminSidebar';

/**
 * Admin Content Component
 * @param props - Content properties
 * @returns React.ReactElement
 */
export const AdminContent = forwardRef<HTMLElement, AdminContentProps>(
  (
    { children, padding = 'md', title, subtitle, actions, className, ...props },
    ref
  ): React.ReactElement => {
    return (
      <main
        ref={ref}
        role="main"
        className={cn(adminContentVariants({ padding }), className)}
        {...props}
      >
        {/* Content Header */}
        {(title || actions) && (
          <div className="flex items-center justify-between mb-8">
            <div>
              {title && <h1 className="text-2xl font-bold text-foreground">{title}</h1>}
              {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center space-x-2">{actions}</div>}
          </div>
        )}

        {children}
      </main>
    );
  }
);

AdminContent.displayName = 'AdminContent';

/**
 * Admin Layout Component
 * @param props - Layout properties
 * @returns React.ReactElement
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
      sidebarCollapsed: _sidebarCollapsed = false,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(
          'min-h-screen w-full flex flex-col',
          'transition-all duration-300 ease-in-out',
          'motion-reduce:transition-none',
          className
        )}
        {...props}
      >
        {topBar}

        <div className="flex-1 flex overflow-hidden">
          {sidebar}

          <div className="flex-1 flex">
            {children}

            {rightDrawer && drawerOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black/50 z-40"
                  onClick={onDrawerClose}
                  aria-hidden="true"
                />
                <div
                  className="fixed right-0 top-0 bottom-0 w-96 bg-card border-l border-border z-50"
                  style={{
                    padding: platformTokens.desktop.layout.container.padding,
                  }}
                >
                  {rightDrawer}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

AdminLayout.displayName = 'AdminLayout';

/**
 * Admin layout variants and types
 */
export type AdminTopBarVariant = VariantProps<typeof adminTopBarVariants>;
export type AdminSidebarVariant = VariantProps<typeof adminSidebarVariants>;
export type AdminContentVariant = VariantProps<typeof adminContentVariants>;

export { adminContentVariants, adminSidebarVariants, adminTopBarVariants };
