/**
 * Tablet Layout Components
 * Hybrid mobile/desktop layout system optimized for tablet devices
 */

import { cn } from '@/lib/utils/cn';
import { platformTokens } from '@/tokens/platform-tokens';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type ReactNode } from 'react';

/**
 * Tablet header variants using design tokens
 */
const tabletHeaderVariants = cva(
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
    'bg-card border-r border-border',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
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
 * Tablet Header Props
 */
export interface TabletHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Header variant */
  readonly variant?: 'default' | 'primary' | 'secondary';
  /** Header size */
  readonly size?: 'sm' | 'md' | 'lg';
  /** Left content */
  readonly leftContent?: ReactNode;
  /** Center content */
  readonly centerContent?: ReactNode;
  /** Right content */
  readonly rightContent?: ReactNode;
}

/**
 * Tablet Sidebar Props
 */
export interface TabletSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Sidebar content */
  readonly children: ReactNode;
  /** Sidebar variant */
  readonly variant?: 'default' | 'primary' | 'secondary';
  /** Collapsed state */
  readonly collapsed?: boolean;
  /** Collapse handler */
  readonly onCollapse?: (collapsed: boolean) => void;
}

/**
 * Tablet Layout Props
 */
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
}

/**
 * Tablet Header Component
 * @param props - Header properties
 * @returns JSX.Element
 */
export const TabletHeader = forwardRef<HTMLElement, TabletHeaderProps>(
  (
    {
      variant = 'default',
      size = 'md',
      leftContent,
      centerContent,
      rightContent,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        role="banner"
        className={cn(
          tabletHeaderVariants({ variant, size }),
          'flex items-center justify-between',
          className
        )}
        {...props}
      >
        <div className="flex items-center">{leftContent}</div>

        <div className="flex-1 flex items-center justify-center mx-4">{centerContent}</div>

        <div className="flex items-center space-x-2">{rightContent}</div>
      </header>
    );
  }
);

TabletHeader.displayName = 'TabletHeader';

/**
 * Tablet Sidebar Component
 * @param props - Sidebar properties
 * @returns JSX.Element
 */
export const TabletSidebar = forwardRef<HTMLElement, TabletSidebarProps>(
  ({ children, variant = 'default', collapsed = false, onCollapse, className, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        role="complementary"
        className={cn(
          tabletSidebarVariants({ variant, collapsed }),
          'h-full flex flex-col',
          className
        )}
        style={{
          width: collapsed
            ? platformTokens.componentSizes.tablet.button.sm.minWidth
            : platformTokens.layout.tablet.sidebar.width,
        }}
        {...props}
      >
        {onCollapse && (
          <div className="p-4 border-b border-border">
            <button
              onClick={() => onCollapse(!collapsed)}
              className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
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
          </div>
        )}

        <div className="flex-1 overflow-y-auto">{children}</div>
      </aside>
    );
  }
);

TabletSidebar.displayName = 'TabletSidebar';

/**
 * Tablet Layout Component
 * @param props - Layout properties
 * @returns JSX.Element
 */
export const TabletLayout = forwardRef<HTMLDivElement, TabletLayoutProps>(
  ({ children, header, sidebar, rightDrawer, drawerOpen = false, className, ...props }, ref) => {
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
        {header}

        <div className="flex-1 flex overflow-hidden">
          {sidebar}

          <main
            role="main"
            className="flex-1 overflow-auto"
            style={{
              padding: platformTokens.layout.tablet.container.padding,
            }}
          >
            {children}
          </main>

          {rightDrawer && drawerOpen && (
            <div
              className="w-80 bg-card border-l border-border"
              style={{
                padding: platformTokens.layout.tablet.container.padding,
              }}
            >
              {rightDrawer}
            </div>
          )}
        </div>
      </div>
    );
  }
);

TabletLayout.displayName = 'TabletLayout';

/**
 * Tablet layout variants and types
 */
export type TabletHeaderVariant = VariantProps<typeof tabletHeaderVariants>;
export type TabletSidebarVariant = VariantProps<typeof tabletSidebarVariants>;

export { tabletHeaderVariants, tabletSidebarVariants };
