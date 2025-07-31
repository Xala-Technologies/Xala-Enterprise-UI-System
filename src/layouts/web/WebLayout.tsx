/**
 * @fileoverview WebLayout Component v5.0.0 - Token-Based Design System
 * @description Frontend layout system with navbar, boxed content, footer, and drawer using design tokens with SSR compatibility
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
// WEB LAYOUT VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Web navbar variants using design tokens
 */
const webNavbarVariants = cva(
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
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
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
        transparent: 'bg-transparent border-transparent',
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
 * Web drawer variants using design tokens
 */
const webDrawerVariants = cva(
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
// WEB LAYOUT INTERFACES
// =============================================================================

export interface WebNavbarProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof webNavbarVariants> {
  /** Navbar content */
  readonly children?: ReactNode;
  /** Logo component */
  readonly logo?: ReactNode;
  /** Navigation links */
  readonly navigation?: ReactNode;
  /** Search component */
  readonly search?: ReactNode;
  /** Action items */
  readonly actions?: ReactNode;
  /** Sticky navbar */
  readonly sticky?: boolean;
}

export interface WebContentProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof webContentVariants> {
  /** Content */
  readonly children: ReactNode;
  /** Content title */
  readonly title?: string;
  /** Breadcrumbs */
  readonly breadcrumbs?: ReactNode;
}

export interface WebFooterProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof webFooterVariants> {
  /** Footer content */
  readonly children: ReactNode;
  /** Copyright text */
  readonly copyright?: string;
  /** Links sections */
  readonly linkSections?: Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }>;
  /** Social links */
  readonly socialLinks?: ReactNode;
}

export interface WebDrawerProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof webDrawerVariants> {
  /** Drawer content */
  readonly children: ReactNode;
  /** Close handler */
  readonly onClose?: () => void;
  /** Header content */
  readonly header?: ReactNode;
}

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
  /** Skip to main content */
  readonly skipToMainContent?: boolean;
  /** Accessibility label */
  readonly 'aria-label'?: string;
}

// =============================================================================
// WEB LAYOUT HOOKS
// =============================================================================

/**
 * Web-specific styles utility
 */
const useWebStyles = () => {
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

  const containerStyles = React.useMemo((): React.CSSProperties => ({
    maxWidth: getToken('layout.maxWidth') as string || '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: spacing?.[4] || '1rem',
    paddingRight: spacing?.[4] || '1rem',
  }), [spacing, getToken]);

  return { overlayStyles, containerStyles };
};

// =============================================================================
// WEB LAYOUT COMPONENTS
// =============================================================================

/**
 * WebNavbar Component
 */
export const WebNavbar = forwardRef<HTMLElement, WebNavbarProps>(
  ({ children, variant, size, logo, navigation, search, actions, sticky = true, className, style, ...props }, ref) => {
    const { colors, spacing, typography } = useTokens();
    const { containerStyles } = useWebStyles();

    const navbarStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: colors.background?.default || '#ffffff',
      borderBottomColor: colors.border?.default || '#e2e8f0',
      zIndex: sticky ? 50 : 'auto',
      ...style,
    }), [colors, sticky, style]);

    return (
      <nav
        ref={ref}
        className={cn(webNavbarVariants({ variant, size }), sticky && 'sticky', className)}
        style={navbarStyles}
        role="navigation"
        aria-label="Main navigation"
        {...props}
      >
        <div style={containerStyles}>
          <div className="flex items-center justify-between h-full">
            {/* Logo section */}
            {logo && (
              <div className="flex items-center mr-8">
                {logo}
              </div>
            )}

            {/* Navigation section */}
            {navigation && (
              <div className="hidden md:flex items-center space-x-6 flex-1">
                {navigation}
              </div>
            )}

            {/* Search section */}
            {search && (
              <div className="flex-1 max-w-lg mx-8 hidden lg:block">
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
      </nav>
    );
  }
);

WebNavbar.displayName = 'WebNavbar';

/**
 * WebContent Component
 */
export const WebContent = forwardRef<HTMLElement, WebContentProps>(
  ({ children, boxed, padding, title, breadcrumbs, className, style, ...props }, ref) => {
    const { colors, spacing, typography } = useTokens();

    const contentStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: colors.background?.default || '#ffffff',
      minHeight: 'calc(100vh - 80px - 200px)', // Minus navbar and footer
      ...style,
    }), [colors, style]);

    const titleStyles = React.useMemo((): React.CSSProperties => ({
      fontSize: typography?.fontSize?.['3xl'] || '1.875rem',
      fontWeight: typography?.fontWeight?.bold || 700,
      color: colors.text?.primary || '#111827',
      marginBottom: spacing?.[8] || '2rem',
    }), [colors, spacing, typography]);

    return (
      <main
        ref={ref}
        id="main-content"
        className={cn(webContentVariants({ boxed, padding }), className)}
        style={contentStyles}
        role="main"
        {...props}
      >
        {breadcrumbs && (
          <div className="mb-4">
            {breadcrumbs}
          </div>
        )}
        
        {title && (
          <h1 style={titleStyles}>{title}</h1>
        )}

        {children}
      </main>
    );
  }
);

WebContent.displayName = 'WebContent';

/**
 * WebFooter Component
 */
export const WebFooter = forwardRef<HTMLElement, WebFooterProps>(
  ({ children, variant, size, copyright, linkSections, socialLinks, className, style, ...props }, ref) => {
    const { colors, spacing, typography } = useTokens();
    const { containerStyles } = useWebStyles();

    const footerStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: variant === 'dark' ? '#111827' : colors.background?.default || '#ffffff',
      borderTopColor: colors.border?.default || '#e2e8f0',
      ...style,
    }), [colors, variant, style]);

    const linkStyles = React.useMemo((): React.CSSProperties => ({
      color: variant === 'dark' ? '#9ca3af' : colors.text?.secondary || '#6b7280',
      fontSize: typography?.fontSize?.sm || '0.875rem',
      textDecoration: 'none',
      transition: 'color 150ms ease-in-out',
    }), [colors, typography, variant]);

    return (
      <footer
        ref={ref}
        className={cn(webFooterVariants({ variant, size }), className)}
        style={footerStyles}
        role="contentinfo"
        {...props}
      >
        <div style={containerStyles}>
          {/* Links sections */}
          {linkSections && linkSections.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              {linkSections.map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          style={linkStyles}
                          className="hover:text-primary transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
            {/* Copyright */}
            {copyright && (
              <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                {copyright}
              </p>
            )}

            {/* Social links */}
            {socialLinks && (
              <div className="flex items-center gap-4">
                {socialLinks}
              </div>
            )}
          </div>

          {children}
        </div>
      </footer>
    );
  }
);

WebFooter.displayName = 'WebFooter';

/**
 * WebDrawer Component
 */
export const WebDrawer = forwardRef<HTMLElement, WebDrawerProps>(
  ({ children, open, size, onClose, header, className, style, ...props }, ref) => {
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
        className={cn(webDrawerVariants({ open, size }), className)}
        style={drawerStyles}
        role="complementary"
        aria-label="Side panel"
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

WebDrawer.displayName = 'WebDrawer';

// =============================================================================
// WEB LAYOUT COMPONENT
// =============================================================================

/**
 * WebLayout Component with token-based styling
 * Optimized for web applications with responsive design
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
      skipToMainContent = true,
      className,
      'aria-label': ariaLabel = 'Web application layout',
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(drawerOpen);
    const { setLayout } = useLayout();
    const { overlayStyles } = useWebStyles();

    React.useEffect(() => {
      setLayout('web');
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
        platform="desktop"
        spacing="none"
        skipToMainContent={skipToMainContent}
        className={cn('min-h-screen w-full flex flex-col', className)}
        aria-label={ariaLabel}
        style={style}
        {...props}
      >
        {/* Navbar */}
        {navbar}

        {/* Main content area */}
        <div className="flex-1 flex relative">
          <div className="flex-1">
            {children}
          </div>

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

        {/* Footer */}
        {footer}
      </BaseLayout>
    );
  }
);

WebLayout.displayName = 'WebLayout';

// =============================================================================
// WEB LAYOUT COMPOSITION
// =============================================================================

export const WebLayoutComposition = {
  /**
   * Marketing website layout
   */
  Marketing: ({
    logo,
    navigation,
    cta,
    heroContent,
    features,
    footer,
    children,
    ...props
  }: {
    logo?: ReactNode;
    navigation?: ReactNode;
    cta?: ReactNode;
    heroContent?: ReactNode;
    features?: ReactNode;
    footer?: ReactNode;
    children?: ReactNode;
  } & Omit<WebLayoutProps, 'children'>): React.ReactElement => {
    return (
      <WebLayout
        navbar={
          <WebNavbar
            logo={logo}
            navigation={navigation}
            actions={cta}
          />
        }
        footer={
          <WebFooter variant="dark" size="lg">
            {footer}
          </WebFooter>
        }
        {...props}
      >
        {heroContent && (
          <div className="bg-gradient-to-b from-primary/5 to-transparent">
            <WebContent boxed padding="lg">
              {heroContent}
            </WebContent>
          </div>
        )}
        
        {features && (
          <WebContent boxed padding="lg">
            {features}
          </WebContent>
        )}
        
        {children && (
          <WebContent boxed padding="md">
            {children}
          </WebContent>
        )}
      </WebLayout>
    );
  },

  /**
   * Documentation website layout
   */
  Documentation: ({
    title,
    navigation,
    search,
    sidebar,
    toc,
    children,
    ...props
  }: {
    title?: string;
    navigation?: ReactNode;
    search?: ReactNode;
    sidebar?: ReactNode;
    toc?: ReactNode;
    children: ReactNode;
  } & Omit<WebLayoutProps, 'children'>): React.ReactElement => {
    const [tocOpen, setTocOpen] = useState(false);

    return (
      <WebLayout
        navbar={
          <WebNavbar
            logo={<h1 className="text-xl font-bold">{title}</h1>}
            navigation={navigation}
            search={search}
            actions={
              toc && (
                <button
                  onClick={() => setTocOpen(!tocOpen)}
                  className="p-2 rounded-md hover:bg-accent lg:hidden"
                  aria-label="Toggle table of contents"
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
            <WebDrawer header={<h2 className="text-lg font-semibold">Table of Contents</h2>}>
              {toc}
            </WebDrawer>
          )
        }
        drawerOpen={tocOpen}
        onDrawerClose={() => setTocOpen(false)}
        footer={
          <WebFooter size="sm" className="mt-16">
            <p className="text-center text-muted-foreground">
              © {new Date().getFullYear()} Documentation
            </p>
          </WebFooter>
        }
        {...props}
      >
        <div className="flex">
          {/* Sidebar */}
          {sidebar && (
            <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-border p-6">
              {sidebar}
            </aside>
          )}
          
          {/* Main content */}
          <WebContent boxed={false} padding="md" className="flex-1">
            <div className="max-w-4xl">
              {children}
            </div>
          </WebContent>
          
          {/* Desktop TOC */}
          {toc && (
            <aside className="hidden lg:block w-64 flex-shrink-0 p-6">
              <div className="sticky top-24">
                <h2 className="text-sm font-semibold mb-4">On this page</h2>
                {toc}
              </div>
            </aside>
          )}
        </div>
      </WebLayout>
    );
  },

  /**
   * Application layout with user menu
   */
  Application: ({
    appName,
    navigation,
    search,
    userMenu,
    notifications,
    children,
    ...props
  }: {
    appName?: string;
    navigation?: ReactNode;
    search?: ReactNode;
    userMenu?: ReactNode;
    notifications?: ReactNode;
    children: ReactNode;
  } & Omit<WebLayoutProps, 'children'>): React.ReactElement => {
    return (
      <WebLayout
        navbar={
          <WebNavbar
            logo={<h1 className="text-xl font-bold">{appName}</h1>}
            navigation={navigation}
            search={search}
            actions={
              <div className="flex items-center gap-4">
                {notifications}
                {userMenu}
              </div>
            }
          />
        }
        footer={
          <WebFooter size="sm" variant="secondary">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {appName}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <a href="#" className="hover:text-primary">Terms</a>
                <a href="#" className="hover:text-primary">Privacy</a>
                <a href="#" className="hover:text-primary">Support</a>
              </div>
            </div>
          </WebFooter>
        }
        {...props}
      >
        <WebContent boxed padding="md">
          {children}
        </WebContent>
      </WebLayout>
    );
  },
};

// Export variants and types for external use
export type WebNavbarVariant = VariantProps<typeof webNavbarVariants>;
export type WebContentVariant = VariantProps<typeof webContentVariants>;
export type WebFooterVariant = VariantProps<typeof webFooterVariants>;
export type WebDrawerVariant = VariantProps<typeof webDrawerVariants>;

export { webNavbarVariants, webContentVariants, webFooterVariants, webDrawerVariants };
