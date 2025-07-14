/**
 * Web Layout Components
 * Frontend layout system with navbar, boxed content, footer, and drawer
 */

import { cn } from '@/lib/utils/cn';
import { platformTokens } from '@/tokens/platform-tokens';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type ReactNode } from 'react';

/**
 * Web navbar variants using design tokens
 */
const webNavbarVariants = cva(
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
 * Web content container variants using design tokens
 */
const webContentVariants = cva(
  ['flex-1 w-full', 'transition-all duration-300', 'motion-reduce:transition-none'],
  {
    variants: {
      boxed: {
        true: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
        false: 'w-full',
      },
      padding: {
        none: 'p-0',
        sm: 'py-4',
        md: 'py-8',
        lg: 'py-12',
      },
    },
    defaultVariants: {
      boxed: true,
      padding: 'md',
    },
  }
);

/**
 * Web footer variants using design tokens
 */
const webFooterVariants = cva(
  [
    'w-full border-t border-border',
    'bg-background/95 backdrop-blur',
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
        sm: 'py-4',
        md: 'py-8',
        lg: 'py-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Web Navbar Props
 */
export interface WebNavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Navbar variant */
  readonly variant?: 'default' | 'primary' | 'secondary';
  /** Navbar size */
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
 * Web Content Props
 */
export interface WebContentProps extends React.HTMLAttributes<HTMLElement> {
  /** Content */
  readonly children: ReactNode;
  /** Boxed layout */
  readonly boxed?: boolean;
  /** Content padding */
  readonly padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Content title */
  readonly title?: string;
}

/**
 * Web Footer Props
 */
export interface WebFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Footer content */
  readonly children: ReactNode;
  /** Footer variant */
  readonly variant?: 'default' | 'primary' | 'secondary';
  /** Footer size */
  readonly size?: 'sm' | 'md' | 'lg';
}

/**
 * Web Layout Props
 */
export interface WebLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout content */
  readonly children: ReactNode;
  /** Navbar component */
  readonly navbar?: ReactNode;
  /** Footer component */
  readonly footer?: ReactNode;
  /** Right drawer component */
  readonly rightDrawer?: ReactNode;
  /** Drawer open state */
  readonly drawerOpen?: boolean;
  /** Drawer close handler */
  readonly onDrawerClose?: () => void;
}

/**
 * Web Navbar Component
 * @param props - Navbar properties
 * @returns React.ReactElement
 */
export const WebNavbar = forwardRef<HTMLElement, WebNavbarProps>(
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
        aria-label="Main navigation"
        className={cn(webNavbarVariants({ variant, size }), className)}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

WebNavbar.displayName = 'WebNavbar';

/**
 * Web Content Component
 * @param props - Content properties
 * @returns React.ReactElement
 */
export const WebContent = forwardRef<HTMLElement, WebContentProps>(
  (
    { children, boxed = true, padding = 'md', title, className, ...props },
    ref
  ): React.ReactElement => {
    return (
      <main
        ref={ref}
        role="main"
        className={cn(webContentVariants({ boxed, padding }), className)}
        {...props}
      >
        {title && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          </div>
        )}

        {children}
      </main>
    );
  }
);

WebContent.displayName = 'WebContent';

/**
 * Web Footer Component
 * @param props - Footer properties
 * @returns React.ReactElement
 */
export const WebFooter = forwardRef<HTMLElement, WebFooterProps>(
  (
    { children, variant = 'default', size = 'md', className, ...props },
    ref
  ): React.ReactElement => {
    return (
      <footer
        ref={ref}
        role="contentinfo"
        className={cn(webFooterVariants({ variant, size }), className)}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </footer>
    );
  }
);

WebFooter.displayName = 'WebFooter';

/**
 * Web Layout Component
 * @param props - Layout properties
 * @returns React.ReactElement
 */
export const WebLayout = forwardRef<HTMLDivElement, WebLayoutProps>(
  (
    {
      children,
      navbar,
      footer,
      rightDrawer,
      drawerOpen = false,
      onDrawerClose,
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
        {navbar}

        <div className="flex-1 flex">
          <div className="flex-1">{children}</div>

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

        {footer}
      </div>
    );
  }
);

WebLayout.displayName = 'WebLayout';

/**
 * Web layout variants and types
 */
export type WebNavbarVariant = VariantProps<typeof webNavbarVariants>;
export type WebContentVariant = VariantProps<typeof webContentVariants>;
export type WebFooterVariant = VariantProps<typeof webFooterVariants>;

export { webContentVariants, webFooterVariants, webNavbarVariants };
