/**
 * @fileoverview Dashboard Component - Enterprise Layout
 * @description SSR-safe dashboard layout with CVA variants and design tokens
 * @version 5.0.0
 * @compliance WCAG AAA, NSM, Enterprise Standards, SSR-Safe
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

// =============================================================================
// CVA VARIANTS
// =============================================================================

const dashboardVariants = cva(
  'space-y-6 p-6 bg-background',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        elevated: 'bg-card text-card-foreground shadow-sm',
        minimal: 'bg-transparent p-4',
      },
      spacing: {
        compact: 'space-y-4 p-4',
        normal: 'space-y-6 p-6',
        spacious: 'space-y-8 p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      spacing: 'normal',
    },
  }
);

const dashboardHeaderVariants = cva(
  'flex items-center justify-between pb-4 border-b border-border',
  {
    variants: {
      size: {
        sm: 'pb-2',
        md: 'pb-4',
        lg: 'pb-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const kpiGridVariants = cva(
  'grid gap-4',
  {
    variants: {
      columns: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      },
    },
    defaultVariants: {
      columns: 3,
    },
  }
);

const kpiCardVariants = cva(
  'p-6 bg-card text-card-foreground border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        success: 'bg-green-50 text-green-900 border-green-200',
        warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
        danger: 'bg-red-50 text-red-900 border-red-200',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// =============================================================================
// INTERFACES
// =============================================================================

export interface KPICardData {
  readonly id: string;
  readonly title: string;
  readonly value: string | number;
  readonly previousValue?: string | number;
  readonly trend?: 'up' | 'down' | 'neutral';
  readonly trendPercentage?: number;
  readonly icon?: React.ReactNode;
  readonly color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
  readonly isLoading?: boolean;
  readonly onClick?: () => void;
  readonly ariaLabel?: string;
}

export interface QuickAction {
  readonly id: string;
  readonly label: string;
  readonly icon?: React.ReactNode;
  readonly onClick: () => void;
  readonly variant?: 'primary' | 'secondary' | 'outline';
  readonly isDisabled?: boolean;
  readonly badge?: string | number;
}

export interface ActivityItem {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly timestamp: string;
  readonly type?: 'info' | 'success' | 'warning' | 'error';
  readonly icon?: React.ReactNode;
  readonly avatar?: string;
  readonly userName?: string;
  readonly isRead?: boolean;
}

export interface DashboardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardVariants> {
  readonly title?: string;
  readonly subtitle?: string;
  readonly kpiCards?: readonly KPICardData[];
  readonly quickActions?: readonly QuickAction[];
  readonly activityItems?: readonly ActivityItem[];
  readonly showKPIGrid?: boolean;
  readonly showQuickActions?: boolean;
  readonly showActivity?: boolean;
  readonly kpiColumns?: 1 | 2 | 3 | 4;
  readonly headerAction?: React.ReactNode;
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const DashboardHeader = forwardRef<
  HTMLDivElement,
  {
    readonly title?: string;
    readonly subtitle?: string;
    readonly action?: React.ReactNode;
    readonly size?: 'sm' | 'md' | 'lg';
  }
>(({ title, subtitle, action, size }, ref) => (
  <div ref={ref} className={cn(dashboardHeaderVariants({ size }))}>
    <div>
      {title && (
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      )}
      {subtitle && (
        <p className="text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
    {action && <div>{action}</div>}
  </div>
));

DashboardHeader.displayName = 'DashboardHeader';

const KPICard = forwardRef<
  HTMLDivElement,
  KPICardData & VariantProps<typeof kpiCardVariants>
>(({ 
  title, 
  value, 
  previousValue, 
  trend, 
  trendPercentage, 
  icon, 
  color = 'default', 
  isLoading, 
  onClick, 
  ariaLabel,
  size,
  ...props 
}, ref) => {
  const getTrendIcon = () => {
    if (trend === 'up') return '↗';
    if (trend === 'down') return '↘';
    return '→';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-muted-foreground';
  };

  const CardElement = onClick ? 'button' : 'div';

  return (
    <CardElement
      ref={ref}
      className={cn(
        kpiCardVariants({ variant: color, size }),
        onClick && 'cursor-pointer hover:scale-[1.02] transition-transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
      )}
      onClick={onClick}
      aria-label={ariaLabel || `${title}: ${value}`}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground truncate">
            {title}
          </p>
          <div className="flex items-baseline space-x-2 mt-1">
            {isLoading ? (
              <div className="h-8 w-16 bg-muted animate-pulse rounded" />
            ) : (
              <p className="text-2xl font-bold">{value}</p>
            )}
            {trend && trendPercentage !== undefined && (
              <span className={cn('text-sm font-medium flex items-center', getTrendColor())}>
                <span className="mr-1">{getTrendIcon()}</span>
                {Math.abs(trendPercentage)}%
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className="flex-shrink-0 ml-4 text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
    </CardElement>
  );
});

KPICard.displayName = 'KPICard';

// =============================================================================
// DASHBOARD COMPONENT
// =============================================================================

export const Dashboard = forwardRef<HTMLDivElement, DashboardProps>(
  (
    {
      className,
      variant,
      spacing,
      title = 'Dashboard',
      subtitle,
      kpiCards = [],
      quickActions = [],
      activityItems = [],
      showKPIGrid = true,
      showQuickActions = true,
      showActivity = true,
      kpiColumns = 3,
      headerAction,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div 
        ref={ref} 
        className={cn(dashboardVariants({ variant, spacing }), className)}
        {...props}
      >
        {(title || subtitle || headerAction) && (
          <DashboardHeader
            title={title}
            subtitle={subtitle}
            action={headerAction}
          />
        )}

        {showKPIGrid && kpiCards.length > 0 && (
          <section aria-labelledby="kpi-section">
            <h2 id="kpi-section" className="sr-only">
              Key Performance Indicators
            </h2>
            <div className={cn(kpiGridVariants({ columns: kpiColumns }))}>
              {kpiCards.map((kpi) => (
                <KPICard key={kpi.id} {...kpi} />
              ))}
            </div>
          </section>
        )}

        {showQuickActions && quickActions.length > 0 && (
          <section aria-labelledby="quick-actions-section">
            <h2 id="quick-actions-section" className="text-lg font-semibold mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-wrap gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  disabled={action.isDisabled}
                  className={cn(
                    'inline-flex items-center space-x-2 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
                    {
                      'bg-primary text-primary-foreground hover:bg-primary/90': action.variant === 'primary',
                      'bg-secondary text-secondary-foreground hover:bg-secondary/80': action.variant === 'secondary',
                      'bg-transparent border border-border text-foreground hover:bg-muted': action.variant === 'outline',
                    }
                  )}
                  aria-label={action.label}
                >
                  {action.icon && <span>{action.icon}</span>}
                  <span>{action.label}</span>
                  {action.badge && (
                    <span className="ml-2 px-2 py-1 text-xs bg-background text-foreground rounded-full">
                      {action.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {showActivity && activityItems.length > 0 && (
          <section aria-labelledby="activity-section">
            <h2 id="activity-section" className="text-lg font-semibold mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {activityItems.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    'flex items-start space-x-3 p-4 bg-card border border-border rounded-lg',
                    !item.isRead && 'bg-muted/50'
                  )}
                >
                  <div className="flex-shrink-0">
                    {item.avatar ? (
                      <img 
                        src={item.avatar} 
                        alt={item.userName || 'User'} 
                        className="h-8 w-8 rounded-full"
                      />
                    ) : item.icon ? (
                      <div className="h-8 w-8 flex items-center justify-center text-muted-foreground">
                        {item.icon}
                      </div>
                    ) : (
                      <div className="h-8 w-8 bg-muted rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {item.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {children}
      </div>
    );
  }
);

Dashboard.displayName = 'Dashboard';

// Legacy exports for backward compatibility
export { Dashboard as EnhancedDashboard };
export type { DashboardProps as EnhancedDashboardProps };

// CVA variants for external use
export { dashboardVariants, kpiCardVariants };

export default Dashboard;