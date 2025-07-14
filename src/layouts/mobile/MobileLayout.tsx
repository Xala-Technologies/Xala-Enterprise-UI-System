/**
 * Mobile Layout Components
 * Comprehensive mobile-first layout system with touch optimization
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, useState, type ReactNode } from 'react';
import { BaseLayout } from '../BaseLayout';

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
const mobileBottomNavVariants = cva(
  [
    'fixed bottom-0 left-0 right-0 z-50',
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'border-t border-border',
    'h-16 px-2',
    'flex items-center justify-around',
    'safe-area-inset-bottom',
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
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Mobile drawer variants
 */
const mobileDrawerVariants = cva(
  [
    'fixed inset-y-0 left-0 z-50',
    'w-80 max-w-[85vw]',
    'bg-background border-r border-border',
    'transform transition-transform duration-300 ease-in-out',
    'motion-reduce:transition-none',
    'overflow-y-auto',
  ],
  {
    variants: {
      position: {
        left: 'left-0',
        right: 'right-0',
      },
      open: {
        true: 'translate-x-0',
        false: '-translate-x-full',
      },
    },
    defaultVariants: {
      position: 'left',
      open: false,
    },
  }
);

/**
 * Mobile content variants
 */
const mobileContentVariants = cva(
  [
    'flex-1 overflow-auto',
    'p-4',
    'pb-20', // Space for bottom navigation
    'min-h-screen',
    'transition-all duration-300',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
      bottomSafe: {
        true: 'pb-20 safe-area-inset-bottom',
        false: 'pb-4',
      },
    },
    defaultVariants: {
      padding: 'md',
      bottomSafe: true,
    },
  }
);

/**
 * Mobile Header Props
 */
export interface MobileHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Header content */
  readonly children?: ReactNode;
  /** Header variant */
  readonly variant?: 'default' | 'primary' | 'secondary' | 'transparent';
  /** Header size */
  readonly size?: 'sm' | 'md' | 'lg';
  /** Left action (usually menu button) */
  readonly leftAction?: ReactNode;
  /** Right action (usually profile/settings) */
  readonly rightAction?: ReactNode;
  /** Center content (usually title) */
  readonly centerContent?: ReactNode;
  /** Header title */
  readonly title?: string;
  /** Show back button */
  readonly showBackButton?: boolean;
  /** Back button handler */
  readonly onBack?: () => void;
}

/**
 * Mobile Bottom Navigation Props
 */
export interface MobileBottomNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /** Navigation items */
  readonly items: Array<{
    readonly icon: ReactNode;
    readonly label: string;
    readonly href?: string;
    readonly active?: boolean;
    readonly onClick?: () => void;
    readonly badge?: string | number;
  }>;
  /** Bottom navigation variant */
  readonly variant?: 'default' | 'primary' | 'secondary' | 'transparent';
  /** Active item index */
  readonly activeIndex?: number;
  /** Navigation change handler */
  readonly onNavigate?: (index: number) => void;
}

/**
 * Mobile Drawer Props
 */
export interface MobileDrawerProps extends React.HTMLAttributes<HTMLElement> {
  /** Drawer content */
  readonly children: ReactNode;
  /** Drawer position */
  readonly position?: 'left' | 'right';
  /** Open state */
  readonly open?: boolean;
  /** Close handler */
  readonly onClose?: () => void;
  /** Drawer title */
  readonly title?: string;
  /** Header content */
  readonly header?: ReactNode;
  /** Footer content */
  readonly footer?: ReactNode;
}

/**
 * Mobile Content Props
 */
export interface MobileContentProps extends React.HTMLAttributes<HTMLElement> {
  /** Content */
  readonly children: ReactNode;
  /** Content padding */
  readonly padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Bottom safe area */
  readonly bottomSafe?: boolean;
  /** Content title */
  readonly title?: string;
  /** Pull to refresh */
  readonly pullToRefresh?: boolean;
  /** Refresh handler */
  readonly onRefresh?: () => void;
}

/**
 * Mobile Layout Props
 */
export interface MobileLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout content */
  readonly children: ReactNode;
  /** Header component */
  readonly header?: ReactNode;
  /** Bottom navigation component */
  readonly bottomNavigation?: ReactNode;
  /** Drawer component */
  readonly drawer?: ReactNode;
  /** Drawer open state */
  readonly drawerOpen?: boolean;
  /** Drawer close handler */
  readonly onDrawerClose?: () => void;
  /** Status bar style */
  readonly statusBarStyle?: 'default' | 'light' | 'dark';
}

/**
 * Mobile Header Component
 */
export const MobileHeader = forwardRef<HTMLElement, MobileHeaderProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      leftAction,
      rightAction,
      centerContent,
      title,
      showBackButton = false,
      onBack,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <header
        ref={ref}
        role="banner"
        className={cn(mobileHeaderVariants({ variant, size }), className)}
        {...props}
      >
        {/* Left Section */}
        <div className="flex items-center justify-start flex-1">
          {showBackButton && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mr-2"
              aria-label="Go back"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          {leftAction}
        </div>

        {/* Center Section */}
        <div className="flex items-center justify-center flex-1">
          {centerContent ||
            (title && <h1 className="text-lg font-semibold text-foreground truncate">{title}</h1>)}
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end flex-1">{rightAction}</div>

        {/* Custom content */}
        {children}
      </header>
    );
  }
);

MobileHeader.displayName = 'MobileHeader';

/**
 * Mobile Bottom Navigation Component
 */
export const MobileBottomNavigation = forwardRef<HTMLElement, MobileBottomNavigationProps>(
  (
    { items, variant = 'default', activeIndex = 0, onNavigate, className, ...props },
    ref
  ): React.ReactElement => {
    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Bottom navigation"
        className={cn(mobileBottomNavVariants({ variant }), className)}
        {...props}
      >
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.onClick?.();
              onNavigate?.(index);
            }}
            className={cn(
              'flex flex-col items-center justify-center p-2 rounded-md transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              activeIndex === index ? 'text-primary' : 'text-muted-foreground'
            )}
            aria-label={item.label}
            aria-current={activeIndex === index ? 'page' : undefined}
          >
            <div className="relative">
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs mt-1 truncate">{item.label}</span>
          </button>
        ))}
      </nav>
    );
  }
);

MobileBottomNavigation.displayName = 'MobileBottomNavigation';

/**
 * Mobile Drawer Component
 */
export const MobileDrawer = forwardRef<HTMLElement, MobileDrawerProps>(
  (
    {
      children,
      position = 'left',
      open = false,
      onClose,
      title,
      header,
      footer,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <>
        {/* Overlay */}
        {open && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} aria-hidden="true" />
        )}

        <aside
          ref={ref}
          role="complementary"
          aria-label={title || 'Navigation drawer'}
          className={cn(mobileDrawerVariants({ position, open }), className)}
          {...props}
        >
          {/* Header */}
          {(title || header) && (
            <div className="flex items-center justify-between p-4 border-b border-border">
              {title && <h2 className="text-lg font-semibold text-foreground truncate">{title}</h2>}
              {header}
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Close drawer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">{children}</div>

          {/* Footer */}
          {footer && <div className="p-4 border-t border-border">{footer}</div>}
        </aside>
      </>
    );
  }
);

MobileDrawer.displayName = 'MobileDrawer';

/**
 * Mobile Content Component
 */
export const MobileContent = forwardRef<HTMLElement, MobileContentProps>(
  (
    {
      children,
      padding = 'md',
      bottomSafe = true,
      title,
      pullToRefresh = false,
      onRefresh,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async (): Promise<void> => {
      if (onRefresh && !refreshing) {
        setRefreshing(true);
        await onRefresh();
        setRefreshing(false);
      }
    };

    return (
      <main
        ref={ref}
        role="main"
        aria-label={title || 'Main content'}
        className={cn(mobileContentVariants({ padding, bottomSafe }), className)}
        {...props}
      >
        {/* Pull to refresh indicator */}
        {pullToRefresh && refreshing && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Content title */}
        {title && <h1 className="text-2xl font-bold text-foreground mb-6">{title}</h1>}

        {children}
      </main>
    );
  }
);

MobileContent.displayName = 'MobileContent';

/**
 * Mobile Layout Component
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
      statusBarStyle = 'default',
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <BaseLayout
        ref={ref}
        platform="mobile"
        className={cn('relative overflow-hidden', className)}
        {...props}
      >
        {/* Header */}
        {header}

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">{children}</div>

        {/* Bottom Navigation */}
        {bottomNavigation}

        {/* Drawer */}
        {drawer}
      </BaseLayout>
    );
  }
);

MobileLayout.displayName = 'MobileLayout';

/**
 * Mobile layout composition utilities
 */
export const MobileLayoutComposition = {
  /**
   * Standard mobile app layout
   */
  App: ({
    header,
    content,
    bottomNavigation,
    drawer,
    drawerOpen = false,
    onDrawerClose,
    ...props
  }: {
    header?: ReactNode;
    content: ReactNode;
    bottomNavigation?: ReactNode;
    drawer?: ReactNode;
    drawerOpen?: boolean;
    onDrawerClose?: () => void;
  } & MobileLayoutProps) => (
    <MobileLayout drawerOpen={drawerOpen} onDrawerClose={onDrawerClose} {...props}>
      {header}
      <MobileContent>{content}</MobileContent>
      {bottomNavigation}
      {drawer}
    </MobileLayout>
  ),

  /**
   * Modal-like mobile layout
   */
  Modal: ({
    header,
    content,
    actions,
    onClose,
    ...props
  }: {
    header?: ReactNode;
    content: ReactNode;
    actions?: ReactNode;
    onClose?: () => void;
  } & MobileLayoutProps) => (
    <MobileLayout {...props}>
      {header}
      <MobileContent bottomSafe={false}>{content}</MobileContent>
      {actions && <div className="p-4 border-t border-border bg-background">{actions}</div>}
    </MobileLayout>
  ),

  /**
   * Fullscreen mobile layout
   */
  Fullscreen: ({
    content,
    ...props
  }: {
    content: ReactNode;
  } & MobileLayoutProps) => (
    <MobileLayout {...props}>
      <MobileContent padding="none" bottomSafe={false}>
        {content}
      </MobileContent>
    </MobileLayout>
  ),
};

/**
 * Export mobile layout variants and types
 */
export type MobileHeaderVariant = VariantProps<typeof mobileHeaderVariants>;
export type MobileBottomNavVariant = VariantProps<typeof mobileBottomNavVariants>;
export type MobileDrawerVariant = VariantProps<typeof mobileDrawerVariants>;
export type MobileContentVariant = VariantProps<typeof mobileContentVariants>;

export {
  mobileBottomNavVariants,
  mobileContentVariants,
  mobileDrawerVariants,
  mobileHeaderVariants,
};
