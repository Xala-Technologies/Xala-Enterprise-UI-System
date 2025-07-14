/**
 * Base Layout Component
 * Comprehensive layout system for all platforms with responsive design
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type ReactNode } from 'react';

/**
 * Base layout variants
 */
const baseLayoutVariants = cva(
  [
    'min-h-screen w-full',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      platform: {
        mobile: 'flex flex-col',
        tablet: 'flex flex-col md:flex-row',
        desktop: 'flex flex-col lg:flex-row',
        auto: 'flex flex-col md:flex-row',
      },
      theme: {
        light: 'bg-background text-foreground',
        dark: 'bg-background text-foreground',
        system: 'bg-background text-foreground',
      },
      spacing: {
        none: 'p-0',
        sm: 'p-2 md:p-4',
        md: 'p-4 md:p-6',
        lg: 'p-6 md:p-8',
        xl: 'p-8 md:p-12',
      },
    },
    defaultVariants: {
      platform: 'auto',
      theme: 'system',
      spacing: 'md',
    },
  }
);

/**
 * Header variants
 */
const headerVariants = cva(
  [
    'w-full border-b border-border',
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'sticky top-0 z-50',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      platform: {
        mobile: 'h-16 px-4',
        tablet: 'h-18 px-6',
        desktop: 'h-20 px-8',
        auto: 'h-16 px-4 md:h-18 md:px-6 lg:h-20 lg:px-8',
      },
    },
    defaultVariants: {
      platform: 'auto',
    },
  }
);

/**
 * Sidebar variants
 */
const sidebarVariants = cva(
  [
    'bg-card border-r border-border',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      platform: {
        mobile: 'fixed inset-y-0 left-0 w-64 transform z-40',
        tablet: 'w-64 flex-shrink-0',
        desktop: 'w-72 flex-shrink-0',
        auto: 'fixed inset-y-0 left-0 w-64 transform z-40 md:relative md:translate-x-0 md:w-64 lg:w-72',
      },
      collapsed: {
        true: 'w-16 overflow-hidden',
        false: '',
      },
      open: {
        true: 'translate-x-0',
        false: '-translate-x-full',
      },
    },
    defaultVariants: {
      platform: 'auto',
      collapsed: false,
      open: false,
    },
  }
);

/**
 * Main content variants
 */
const mainContentVariants = cva(
  ['flex-1 overflow-auto', 'transition-all duration-300', 'motion-reduce:transition-none'],
  {
    variants: {
      platform: {
        mobile: 'p-4',
        tablet: 'p-6',
        desktop: 'p-8',
        auto: 'p-4 md:p-6 lg:p-8',
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
        full: 'max-w-full mx-auto',
      },
    },
    defaultVariants: {
      platform: 'auto',
      maxWidth: 'none',
    },
  }
);

/**
 * Footer variants
 */
const footerVariants = cva(
  [
    'w-full border-t border-border',
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'mt-auto',
  ],
  {
    variants: {
      platform: {
        mobile: 'p-4',
        tablet: 'p-6',
        desktop: 'p-8',
        auto: 'p-4 md:p-6 lg:p-8',
      },
    },
    defaultVariants: {
      platform: 'auto',
    },
  }
);

/**
 * Platform detection hook
 */
const usePlatform = (): 'mobile' | 'tablet' | 'desktop' => {
  const [platform, setPlatform] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  React.useEffect(() => {
    const detectPlatform = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setPlatform('mobile');
      } else if (width < 1024) {
        setPlatform('tablet');
      } else {
        setPlatform('desktop');
      }
    };

    // Initial detection
    detectPlatform();

    // Add event listener
    window.addEventListener('resize', detectPlatform);

    // Cleanup
    return () => window.removeEventListener('resize', detectPlatform);
  }, []);

  return platform;
};

/**
 * Base Layout Props
 */
export interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout content */
  readonly children: ReactNode;

  /** Platform variant */
  readonly platform?: 'mobile' | 'tablet' | 'desktop' | 'auto';

  /** Theme variant */
  readonly theme?: 'light' | 'dark' | 'system';

  /** Spacing variant */
  readonly spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  /** Skip to main content link */
  readonly skipToMainContent?: boolean;

  /** Accessibility label */
  readonly 'aria-label'?: string;
}

/**
 * Header Props
 */
export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Header content */
  readonly children: ReactNode;

  /** Platform variant */
  readonly platform?: 'mobile' | 'tablet' | 'desktop' | 'auto';

  /** Header title */
  readonly title?: string;

  /** Navigation items */
  readonly navigation?: ReactNode;

  /** Action items */
  readonly actions?: ReactNode;
}

/**
 * Sidebar Props
 */
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Sidebar content */
  readonly children: ReactNode;

  /** Platform variant */
  readonly platform?: 'mobile' | 'tablet' | 'desktop' | 'auto';

  /** Collapsed state */
  readonly collapsed?: boolean;

  /** Open state (for mobile) */
  readonly open?: boolean;

  /** Close handler */
  readonly onClose?: () => void;

  /** Sidebar title */
  readonly title?: string;
}

/**
 * Main Content Props
 */
export interface MainContentProps extends React.HTMLAttributes<HTMLElement> {
  /** Main content */
  readonly children: ReactNode;

  /** Platform variant */
  readonly platform?: 'mobile' | 'tablet' | 'desktop' | 'auto';

  /** Maximum width */
  readonly maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full';

  /** Main content title */
  readonly title?: string;
}

/**
 * Footer Props
 */
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Footer content */
  readonly children: ReactNode;

  /** Platform variant */
  readonly platform?: 'mobile' | 'tablet' | 'desktop' | 'auto';
}

/**
 * Base Layout Component
 */
export const BaseLayout = forwardRef<HTMLDivElement, BaseLayoutProps>(
  (
    {
      children,
      platform = 'auto',
      theme = 'system',
      spacing = 'md',
      skipToMainContent = true,
      className,
      'aria-label': ariaLabel = 'Main application layout',
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        role="application"
        aria-label={ariaLabel}
        className={cn(baseLayoutVariants({ platform, theme, spacing }), className)}
        {...props}
      >
        {/* Skip to main content link */}
        {skipToMainContent && (
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Skip to main content
          </a>
        )}

        {children}
      </div>
    );
  }
);

BaseLayout.displayName = 'BaseLayout';

/**
 * Header Component
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    { children, platform = 'auto', title, navigation, actions, className, ...props },
    ref
  ): React.ReactElement => {
    return (
      <header
        ref={ref}
        role="banner"
        className={cn(headerVariants({ platform }), className)}
        {...props}
      >
        <div className="flex items-center justify-between h-full">
          {/* Logo/Title */}
          {title && (
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-foreground truncate">{title}</h1>
            </div>
          )}

          {/* Navigation */}
          {navigation && (
            <nav role="navigation" aria-label="Main navigation">
              {navigation}
            </nav>
          )}

          {/* Actions */}
          {actions && <div className="flex items-center space-x-2">{actions}</div>}

          {/* Custom content */}
          {children}
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';

/**
 * Sidebar Component
 */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      children,
      platform = 'auto',
      collapsed = false,
      open = false,
      onClose,
      title,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const detectedPlatform = usePlatform();
    const isMobile = detectedPlatform === 'mobile';

    return (
      <>
        {/* Overlay for mobile */}
        {isMobile && open && (
          <div className="fixed inset-0 bg-black/50 z-30" onClick={onClose} aria-hidden="true" />
        )}

        <aside
          ref={ref}
          role="complementary"
          aria-label={title || 'Sidebar navigation'}
          className={cn(sidebarVariants({ platform, collapsed, open }), className)}
          {...props}
        >
          {/* Sidebar Header */}
          {title && (
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground truncate">{title}</h2>
              {isMobile && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label="Close sidebar"
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
              )}
            </div>
          )}

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </aside>
      </>
    );
  }
);

Sidebar.displayName = 'Sidebar';

/**
 * Main Content Component
 */
export const MainContent = forwardRef<HTMLElement, MainContentProps>(
  (
    { children, platform = 'auto', maxWidth = 'none', title, className, ...props },
    ref
  ): React.ReactElement => {
    return (
      <main
        ref={ref}
        id="main-content"
        role="main"
        aria-label={title || 'Main content'}
        className={cn(mainContentVariants({ platform, maxWidth }), className)}
        {...props}
      >
        {/* Main content title */}
        {title && <h1 className="text-2xl font-bold text-foreground mb-6">{title}</h1>}

        {children}
      </main>
    );
  }
);

MainContent.displayName = 'MainContent';

/**
 * Footer Component
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ children, platform = 'auto', className, ...props }, ref): React.ReactElement => {
    return (
      <footer
        ref={ref}
        role="contentinfo"
        className={cn(footerVariants({ platform }), className)}
        {...props}
      >
        {children}
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

/**
 * Layout composition utilities
 */
export const LayoutComposition = {
  /**
   * Standard app layout with header, sidebar, main content, and footer
   */
  App: ({
    header,
    sidebar,
    main,
    footer,
    sidebarOpen = false,
    onSidebarClose,
    ...props
  }: {
    header?: ReactNode;
    sidebar?: ReactNode;
    main: ReactNode;
    footer?: ReactNode;
    sidebarOpen?: boolean;
    onSidebarClose?: () => void;
  } & BaseLayoutProps) => (
    <BaseLayout {...props}>
      {header}
      <div className="flex flex-1 overflow-hidden">
        {sidebar && (
          <Sidebar open={sidebarOpen} onClose={onSidebarClose}>
            {sidebar}
          </Sidebar>
        )}
        <MainContent>{main}</MainContent>
      </div>
      {footer}
    </BaseLayout>
  ),

  /**
   * Dashboard layout with collapsible sidebar
   */
  Dashboard: ({
    header,
    sidebar,
    main,
    footer,
    sidebarCollapsed = false,
    ...props
  }: {
    header?: ReactNode;
    sidebar?: ReactNode;
    main: ReactNode;
    footer?: ReactNode;
    sidebarCollapsed?: boolean;
  } & BaseLayoutProps) => (
    <BaseLayout {...props}>
      {header}
      <div className="flex flex-1 overflow-hidden">
        {sidebar && <Sidebar collapsed={sidebarCollapsed}>{sidebar}</Sidebar>}
        <MainContent maxWidth="full">{main}</MainContent>
      </div>
      {footer}
    </BaseLayout>
  ),

  /**
   * Centered layout for forms and content pages
   */
  Centered: ({
    header,
    main,
    footer,
    maxWidth = 'md',
    ...props
  }: {
    header?: ReactNode;
    main: ReactNode;
    footer?: ReactNode;
    maxWidth?: MainContentProps['maxWidth'];
  } & BaseLayoutProps) => (
    <BaseLayout {...props}>
      {header}
      <MainContent maxWidth={maxWidth}>{main}</MainContent>
      {footer}
    </BaseLayout>
  ),
};

/**
 * Export layout variants and types
 */
export type BaseLayoutVariant = VariantProps<typeof baseLayoutVariants>;
export type HeaderVariant = VariantProps<typeof headerVariants>;
export type SidebarVariant = VariantProps<typeof sidebarVariants>;
export type MainContentVariant = VariantProps<typeof mainContentVariants>;
export type FooterVariant = VariantProps<typeof footerVariants>;

export {
  baseLayoutVariants,
  footerVariants,
  headerVariants,
  mainContentVariants,
  sidebarVariants,
  usePlatform,
};
