/**
 * @fileoverview PageLayout Component v5.0.0 - CVA Design System
 * @description Modern PageLayout component using CVA pattern with semantic tokens
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, CVA-pattern
 */

import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * PageLayout variants using semantic Tailwind classes with CVA pattern
 * All spacing uses semantic token classes
 */
const pageLayoutVariants = cva('min-h-screen w-full', {
  variants: {
    variant: {
      modern: 'flex flex-col bg-background text-foreground',
      classic: 'bg-card text-card-foreground',
      minimal: 'bg-transparent',
      dashboard: 'flex flex-col bg-background text-foreground min-h-screen',
    },
    fullWidth: {
      true: 'w-full max-w-none',
      false: 'max-w-7xl mx-auto',
    },
    background: {
      primary: 'bg-background',
      secondary: 'bg-secondary',
      muted: 'bg-muted',
      card: 'bg-card',
      transparent: 'bg-transparent',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    },
    margin: {
      none: 'm-0',
      sm: 'm-4',
      md: 'm-6',
      lg: 'm-8',
      xl: 'm-12',
    },
  },
  defaultVariants: {
    variant: 'modern',
    fullWidth: false,
    background: 'primary',
    padding: 'md',
    margin: 'none',
  },
});

const pageHeaderVariants = cva(
  'w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
  {
    variants: {
      sticky: {
        true: 'sticky top-0 z-50',
        false: 'relative',
      },
      size: {
        sm: 'py-2',
        md: 'py-4',
        lg: 'py-6',
      },
    },
    defaultVariants: {
      sticky: false,
      size: 'md',
    },
  }
);

const pageBodyVariants = cva('flex flex-1 w-full', {
  variants: {
    layout: {
      default: 'flex-col',
      sidebar: 'flex-row',
      'sidebar-right': 'flex-row-reverse',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
    },
  },
  defaultVariants: {
    layout: 'default',
    gap: 'md',
  },
});

const pageSidebarVariants = cva(
  'flex-shrink-0 border-border bg-card',
  {
    variants: {
      width: {
        sm: 'w-64',
        md: 'w-72',
        lg: 'w-80',
        xl: 'w-96',
      },
      position: {
        left: 'border-r',
        right: 'border-l',
      },
      collapsible: {
        true: 'transition-all duration-300 ease-in-out',
        false: '',
      },
    },
    defaultVariants: {
      width: 'md',
      position: 'left',
      collapsible: false,
    },
  }
);

const pageContentVariants = cva('flex flex-1 flex-col min-w-0', {
  variants: {
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
});

const pageFooterVariants = cva(
  'w-full mt-auto border-t border-border bg-background',
  {
    variants: {
      size: {
        sm: 'py-4',
        md: 'py-6',
        lg: 'py-8',
      },
      sticky: {
        true: 'sticky bottom-0',
        false: 'relative',
      },
    },
    defaultVariants: {
      size: 'md',
      sticky: false,
    },
  }
);

/**
 * Base variant props from class-variance-authority
 */
export interface PageLayoutProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageLayoutVariants> {
  readonly header?: React.ReactNode;
  readonly footer?: React.ReactNode;
  readonly sidebar?: React.ReactNode;
  readonly sidebarPosition?: 'left' | 'right';
  readonly sidebarWidth?: 'sm' | 'md' | 'lg' | 'xl';
  readonly sidebarCollapsible?: boolean;
  readonly headerSticky?: boolean;
  readonly footerSticky?: boolean;
  readonly contentPadding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  readonly testId?: string;
}

// =============================================================================
// PAGELAYOUT COMPONENT
// =============================================================================

/**
 * PageLayout component with pure CVA pattern styling
 */
export const PageLayout = forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ 
    className, 
    variant, 
    fullWidth, 
    background, 
    padding, 
    margin,
    header,
    footer,
    sidebar,
    sidebarPosition = 'left',
    sidebarWidth = 'md',
    sidebarCollapsible = false,
    headerSticky = false,
    footerSticky = false,
    contentPadding = 'md',
    testId,
    children,
    ...props 
  }, ref) => {
    const hasLayoutWithSidebar = sidebar && (sidebarPosition === 'left' || sidebarPosition === 'right');
    const bodyLayout = hasLayoutWithSidebar 
      ? (sidebarPosition === 'right' ? 'sidebar-right' : 'sidebar') 
      : 'default';

    return (
      <div
        ref={ref}
        className={cn(
          pageLayoutVariants({
            variant,
            fullWidth,
            background,
            padding,
            margin,
          }),
          className
        )}
        data-testid={testId}
        {...props}
      >
        {header && (
          <header className={cn(pageHeaderVariants({ sticky: headerSticky }))}>
            {header}
          </header>
        )}

        <div className={cn(pageBodyVariants({ layout: bodyLayout }))}>
          {sidebar && sidebarPosition === 'left' && (
            <aside className={cn(pageSidebarVariants({ 
              width: sidebarWidth, 
              position: 'left',
              collapsible: sidebarCollapsible 
            }))}>
              {sidebar}
            </aside>
          )}

          <main className={cn(pageContentVariants({ padding: contentPadding }))}>
            {children}
          </main>

          {sidebar && sidebarPosition === 'right' && (
            <aside className={cn(pageSidebarVariants({ 
              width: sidebarWidth, 
              position: 'right',
              collapsible: sidebarCollapsible 
            }))}>
              {sidebar}
            </aside>
          )}
        </div>

        {footer && (
          <footer className={cn(pageFooterVariants({ sticky: footerSticky }))}>
            {footer}
          </footer>
        )}
      </div>
    );
  }
);

PageLayout.displayName = 'PageLayout';

/**
 * PageLayout variants type exports
 */
export type PageLayoutVariants = VariantProps<typeof pageLayoutVariants>;
export { pageLayoutVariants };
