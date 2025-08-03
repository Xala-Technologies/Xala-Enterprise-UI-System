/**
 * @fileoverview Dashboard Layout Component v5.0.0 - Enterprise Analytics Layout
 * @description Comprehensive dashboard layout for analytics, metrics, and data visualization
 * @version 5.0.0
 * @compliance WCAG 2.2 AAA, Enterprise Standards, SSR-Safe, Norwegian Compliance
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// DASHBOARD LAYOUT VARIANTS
// =============================================================================

const dashboardLayoutVariants = cva(
  [
    'min-h-screen w-full',
    'bg-background text-foreground',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      layout: {
        standard: 'grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]',
        compact: 'grid grid-cols-1 lg:grid-cols-[240px_1fr]',
        wide: 'grid grid-cols-1 lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr]',
        fluid: 'flex flex-col lg:flex-row',
        minimal: 'grid grid-cols-1',
      },
      spacing: {
        none: 'gap-0',
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
        xl: 'gap-12',
      },
      density: {
        comfortable: 'p-6 lg:p-8',
        compact: 'p-4 lg:p-6',
        dense: 'p-2 lg:p-4',
      },
    },
    defaultVariants: {
      layout: 'standard',
      spacing: 'md',
      density: 'comfortable',
    },
  }
);

const dashboardHeaderVariants = cva(
  [
    'sticky top-0 z-40',
    'w-full',
    'border-b border-border',
    'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'transition-all duration-200 ease-in-out',
  ],
  {
    variants: {
      size: {
        sm: 'h-14 px-4',
        md: 'h-16 px-6',
        lg: 'h-20 px-8',
      },
      shadow: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
      },
    },
    defaultVariants: {
      size: 'md',
      shadow: 'sm',
    },
  }
);

const dashboardSidebarVariants = cva(
  [
    'sticky top-0',
    'h-screen',
    'border-r border-border',
    'bg-background',
    'overflow-y-auto',
    'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border',
  ],
  {
    variants: {
      width: {
        narrow: 'w-56',
        standard: 'w-64 lg:w-72',
        wide: 'w-80 lg:w-96',
      },
      padding: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      width: 'standard',
      padding: 'md',
    },
  }
);

const dashboardContentVariants = cva(
  [
    'flex-1',
    'overflow-y-auto',
    'bg-background',
  ],
  {
    variants: {
      maxWidth: {
        none: 'max-w-none',
        sm: 'max-w-2xl',
        md: 'max-w-4xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
        full: 'max-w-full',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-12',
      },
    },
    defaultVariants: {
      maxWidth: 'full',
      padding: 'lg',
    },
  }
);

const dashboardGridVariants = cva(
  [
    'grid gap-6',
  ],
  {
    variants: {
      columns: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 lg:grid-cols-2',
        3: 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
        auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        responsive: 'grid-cols-[repeat(auto-fit,minmax(300px,1fr))]',
      },
      gap: {
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
        xl: 'gap-12',
      },
    },
    defaultVariants: {
      columns: 'auto',
      gap: 'md',
    },
  }
);

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly layout?: 'standard' | 'compact' | 'wide' | 'fluid' | 'minimal';
  readonly spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  readonly density?: 'comfortable' | 'compact' | 'dense';
  readonly skipToMainContent?: boolean;
  readonly 'aria-label'?: string;
}

export interface DashboardHeaderProps extends React.HTMLAttributes<HTMLElement> {
  readonly children: ReactNode;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly shadow?: 'none' | 'sm' | 'md';
  readonly actions?: ReactNode;
  readonly breadcrumbs?: ReactNode;
  readonly title?: string;
}

export interface DashboardSidebarProps extends React.HTMLAttributes<HTMLElement> {
  readonly children: ReactNode;
  readonly width?: 'narrow' | 'standard' | 'wide';
  readonly padding?: 'sm' | 'md' | 'lg';
  readonly collapsible?: boolean;
  readonly collapsed?: boolean;
  readonly onToggle?: () => void;
}

export interface DashboardContentProps extends React.HTMLAttributes<HTMLElement> {
  readonly children: ReactNode;
  readonly maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  readonly padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface DashboardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly columns?: 1 | 2 | 3 | 4 | 'auto' | 'responsive';
  readonly gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface DashboardStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly columns?: 2 | 3 | 4 | 'auto';
}

export interface DashboardChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly title?: string;
  readonly description?: string;
  readonly actions?: ReactNode;
  readonly loading?: boolean;
  readonly error?: string;
}

// =============================================================================
// DASHBOARD HEADER COMPONENT
// =============================================================================

export const DashboardHeader = forwardRef<HTMLElement, DashboardHeaderProps>(
  (
    {
      children,
      size = 'md',
      shadow = 'sm',
      actions,
      breadcrumbs,
      title,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing } = useTokens();

    const headerStyles: React.CSSProperties = {
      backgroundColor: colors.background?.default,
      borderBottomColor: colors.border?.default,
    };

    return (
      <header
        ref={ref}
        className={cn(dashboardHeaderVariants({ size, shadow }), className)}
        style={headerStyles}
        {...props}
      >
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-4">
            {title && (
              <h1 className="text-xl font-semibold text-foreground truncate">
                {title}
              </h1>
            )}
            {breadcrumbs}
          </div>
          
          <div className="flex items-center space-x-2">
            {children}
            {actions}
          </div>
        </div>
      </header>
    );
  }
);

DashboardHeader.displayName = 'DashboardHeader';

// =============================================================================
// DASHBOARD SIDEBAR COMPONENT
// =============================================================================

export const DashboardSidebar = forwardRef<HTMLElement, DashboardSidebarProps>(
  (
    {
      children,
      width = 'standard',
      padding = 'md',
      collapsible = false,
      collapsed = false,
      onToggle,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors } = useTokens();

    const sidebarStyles: React.CSSProperties = {
      backgroundColor: colors.background?.default,
      borderRightColor: colors.border?.default,
    };

    return (
      <aside
        ref={ref}
        className={cn(
          dashboardSidebarVariants({ width, padding }),
          collapsed && 'lg:w-16',
          className
        )}
        style={sidebarStyles}
        aria-label="Dashboard navigation"
        {...props}
      >
        {collapsible && (
          <div className="flex justify-between items-center mb-6">
            <span className={cn('font-semibold text-foreground', collapsed && 'lg:hidden')}>
              Dashboard
            </span>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-secondary/10 transition-colors"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <span className="sr-only">
                {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              </span>
              {/* Icon would go here */}
            </button>
          </div>
        )}
        
        <nav className={cn(collapsed && 'lg:space-y-2')}>
          {children}
        </nav>
      </aside>
    );
  }
);

DashboardSidebar.displayName = 'DashboardSidebar';

// =============================================================================
// DASHBOARD CONTENT COMPONENT
// =============================================================================

export const DashboardContent = forwardRef<HTMLElement, DashboardContentProps>(
  (
    {
      children,
      maxWidth = 'full',
      padding = 'lg',
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors } = useTokens();

    const contentStyles: React.CSSProperties = {
      backgroundColor: colors.background?.default,
    };

    return (
      <main
        ref={ref}
        id="main-content"
        className={cn(dashboardContentVariants({ maxWidth, padding }), className)}
        style={contentStyles}
        role="main"
        aria-label="Dashboard content"
        {...props}
      >
        {children}
      </main>
    );
  }
);

DashboardContent.displayName = 'DashboardContent';

// =============================================================================
// DASHBOARD GRID COMPONENT
// =============================================================================

export const DashboardGrid = forwardRef<HTMLDivElement, DashboardGridProps>(
  (
    {
      children,
      columns = 'auto',
      gap = 'md',
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(dashboardGridVariants({ columns, gap }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DashboardGrid.displayName = 'DashboardGrid';

// =============================================================================
// DASHBOARD STATS COMPONENT
// =============================================================================

export const DashboardStats = forwardRef<HTMLDivElement, DashboardStatsProps>(
  (
    {
      children,
      columns = 'auto',
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const gridColumns = columns === 'auto' 
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`;

    return (
      <div
        ref={ref}
        className={cn(
          'grid gap-4 mb-8',
          gridColumns,
          className
        )}
        role="group"
        aria-label="Dashboard statistics"
        {...props}
      >
        {children}
      </div>
    );
  }
);

DashboardStats.displayName = 'DashboardStats';

// =============================================================================
// DASHBOARD CHART CONTAINER COMPONENT
// =============================================================================

export const DashboardChartContainer = forwardRef<HTMLDivElement, DashboardChartContainerProps>(
  (
    {
      children,
      title,
      description,
      actions,
      loading = false,
      error,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, borderRadius } = useTokens();

    const containerStyles: React.CSSProperties = {
      backgroundColor: colors.background?.paper || colors.background?.default,
      borderColor: colors.border?.default,
      borderRadius: borderRadius?.lg,
      padding: spacing?.[6],
    };

    return (
      <div
        ref={ref}
        className={cn(
          'border rounded-lg bg-card text-card-foreground shadow-sm',
          className
        )}
        style={containerStyles}
        {...props}
      >
        {(title || description || actions) && (
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-1">
              {title && (
                <h3 className="text-lg font-semibold leading-none tracking-tight">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex items-center space-x-2">
                {actions}
              </div>
            )}
          </div>
        )}

        <div className="relative">
          {loading && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-md z-10"
              aria-label="Loading chart data"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div 
              className="flex items-center justify-center p-8 text-center"
              role="alert"
              aria-live="polite"
            >
              <div className="space-y-2">
                <p className="text-sm font-medium text-destructive">
                  Error loading chart
                </p>
                <p className="text-xs text-muted-foreground">
                  {error}
                </p>
              </div>
            </div>
          )}

          {!loading && !error && children}
        </div>
      </div>
    );
  }
);

DashboardChartContainer.displayName = 'DashboardChartContainer';

// =============================================================================
// MAIN DASHBOARD LAYOUT COMPONENT
// =============================================================================

export const DashboardLayout = forwardRef<HTMLDivElement, DashboardLayoutProps>(
  (
    {
      children,
      layout = 'standard',
      spacing = 'md',
      density = 'comfortable',
      skipToMainContent = true,
      className,
      'aria-label': ariaLabel = 'Dashboard application',
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors } = useTokens();

    const layoutStyles: React.CSSProperties = {
      backgroundColor: colors.background?.default,
      color: colors.text?.primary,
    };

    return (
      <div
        ref={ref}
        className={cn(
          dashboardLayoutVariants({ layout, spacing, density }),
          className
        )}
        style={layoutStyles}
        role="application"
        aria-label={ariaLabel}
        {...props}
      >
        {skipToMainContent && (
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary-foreground"
          >
            Skip to main content
          </a>
        )}
        {children}
      </div>
    );
  }
);

DashboardLayout.displayName = 'DashboardLayout';

// =============================================================================
// COMPOUND COMPONENT ATTACHMENTS
// =============================================================================

DashboardLayout.Header = DashboardHeader;
DashboardLayout.Sidebar = DashboardSidebar;
DashboardLayout.Content = DashboardContent;
DashboardLayout.Grid = DashboardGrid;
DashboardLayout.Stats = DashboardStats;
DashboardLayout.ChartContainer = DashboardChartContainer;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type DashboardLayoutVariant = VariantProps<typeof dashboardLayoutVariants>;
export type DashboardHeaderVariant = VariantProps<typeof dashboardHeaderVariants>;
export type DashboardSidebarVariant = VariantProps<typeof dashboardSidebarVariants>;
export type DashboardContentVariant = VariantProps<typeof dashboardContentVariants>;
export type DashboardGridVariant = VariantProps<typeof dashboardGridVariants>;

export { 
  dashboardLayoutVariants, 
  dashboardHeaderVariants, 
  dashboardSidebarVariants, 
  dashboardContentVariants,
  dashboardGridVariants 
};