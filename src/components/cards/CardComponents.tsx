/**
 * Card Components
 * Comprehensive card system with statistic cards and chart containers
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type ReactNode } from 'react';

/**
 * Card variants using design tokens
 */
const cardVariants = cva(
  [
    'rounded-lg border bg-card text-card-foreground shadow-sm',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'border-border',
        primary: 'border-primary/20 bg-primary/5',
        secondary: 'border-secondary/20 bg-secondary/5',
        outline: 'border-border bg-transparent',
        elevated: 'shadow-md hover:shadow-lg',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Statistic card variants using design tokens
 */
const statCardVariants = cva(
  [
    'rounded-lg border bg-card text-card-foreground shadow-sm',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'border-border',
        primary: 'border-primary/20 bg-primary/5',
        secondary: 'border-secondary/20 bg-secondary/5',
        success: 'border-green-200 bg-green-50',
        warning: 'border-yellow-200 bg-yellow-50',
        error: 'border-red-200 bg-red-50',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Chart card variants using design tokens
 */
const chartCardVariants = cva(
  [
    'rounded-lg border bg-card text-card-foreground shadow-sm',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'border-border',
        primary: 'border-primary/20',
        secondary: 'border-secondary/20',
        elevated: 'shadow-md',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Card Props
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card variant */
  readonly variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'elevated';
  /** Card size */
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Card title */
  readonly title?: string;
  /** Card description */
  readonly description?: string;
  /** Card header */
  readonly header?: ReactNode;
  /** Card footer */
  readonly footer?: ReactNode;
  /** Card content */
  readonly children?: ReactNode;
}

/**
 * Statistic Card Props
 */
export interface StatisticCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Statistic card variant */
  readonly variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /** Statistic card size */
  readonly size?: 'sm' | 'md' | 'lg';
  /** Statistic title */
  readonly title: string;
  /** Statistic value */
  readonly value: string | number;
  /** Statistic change */
  readonly change?: {
    readonly value: number;
    readonly type: 'increase' | 'decrease' | 'neutral';
  };
  /** Statistic icon */
  readonly icon?: ReactNode;
  /** Statistic description */
  readonly description?: string;
}

/**
 * Chart Card Props
 */
export interface ChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Chart card variant */
  readonly variant?: 'default' | 'primary' | 'secondary' | 'elevated';
  /** Chart card size */
  readonly size?: 'sm' | 'md' | 'lg';
  /** Chart title */
  readonly title: string;
  /** Chart subtitle */
  readonly subtitle?: string;
  /** Chart actions */
  readonly actions?: ReactNode;
  /** Chart content */
  readonly children: ReactNode;
  /** Chart footer */
  readonly footer?: ReactNode;
}

/**
 * Card Component
 * @param props - Card properties
 * @returns React.ReactElement
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      size = 'md',
      title,
      description,
      header,
      footer,
      children,
      className,
      ...props
    },
    ref
  ): void => {
    return (
      <div ref={ref} className={cn(cardVariants({ _variant, _size }), className)} {...props}>
        {/* Card Header */}
        {(header || title || description) && (
          <div className="space-y-1.5 mb-4">
            {header}
            {title && (
              <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>
            )}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}

        {/* Card Content */}
        {children}

        {/* Card Footer */}
        {footer && <div className="pt-4 mt-4 border-t border-border">{footer}</div>}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Statistic Card Component
 * @param props - Statistic card properties
 * @returns React.ReactElement
 */
export const StatisticCard = forwardRef<HTMLDivElement, StatisticCardProps>(
  (
    {
      variant = 'default',
      size = 'md',
      title,
      value,
      change,
      icon,
      description,
      className,
      ...props
    },
    ref
  ): void => {
    /**
     * Get change indicator color
     * @param type - Change type
     * @returns Color class
     */
    const getChangeColor = (type: 'increase' | 'decrease' | 'neutral'): string => {
      switch (type) {
        case 'increase':
          return 'text-green-600';
        case 'decrease':
          return 'text-red-600';
        case 'neutral':
          return 'text-muted-foreground';
        default:
          return 'text-muted-foreground';
      }
    };

    /**
     * Get change icon
     * @param type - Change type
     * @returns Icon JSX
     */
    const getChangeIcon = (type: 'increase' | 'decrease' | 'neutral'): ReactNode => {
      switch (type) {
        case 'increase':
          return (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17l9.2-9.2M17 17V7H7"
              />
            </svg>
          );
        case 'decrease':
          return (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 7l-9.2 9.2M7 7v10h10"
              />
            </svg>
          );
        case 'neutral':
          return (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8" />
            </svg>
          );
        default:
          return null;
      }
    };

    return (
      <div ref={ref} className={cn(statCardVariants({ _variant, _size }), className)} {...props}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <div className={cn('flex items-center gap-1 text-sm', getChangeColor(change.type))}>
                {getChangeIcon(change.type)}
                <span>{Math.abs(change.value)}%</span>
              </div>
            )}
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          </div>

          {icon && (
            <div className="flex-shrink-0 p-2 rounded-full bg-primary/10 text-primary">{icon}</div>
          )}
        </div>
      </div>
    );
  }
);

StatisticCard.displayName = 'StatisticCard';

/**
 * Chart Card Component
 * @param props - Chart card properties
 * @returns React.ReactElement
 */
export const ChartCard = forwardRef<HTMLDivElement, ChartCardProps>(
  (
    {
      variant = 'default',
      size = 'md',
      title,
      subtitle,
      actions,
      children,
      footer,
      className,
      ...props
    },
    ref
  ): void => {
    return (
      <div ref={ref} className={cn(chartCardVariants({ _variant, _size }), className)} {...props}>
        {/* Chart Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>

          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>

        {/* Chart Content */}
        <div className="w-full h-full">{children}</div>

        {/* Chart Footer */}
        {footer && <div className="pt-4 mt-4 border-t border-border">{footer}</div>}
      </div>
    );
  }
);

ChartCard.displayName = 'ChartCard';

/**
 * Card component variants and types
 */
export type CardVariant = VariantProps<typeof cardVariants>;
export type StatisticCardVariant = VariantProps<typeof statCardVariants>;
export type ChartCardVariant = VariantProps<typeof chartCardVariants>;

export { cardVariants, chartCardVariants, statCardVariants };
