/**
 * Progress component with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';
import { useTokens } from '@/hooks/useTokens';

/**
 * Progress variants using class-variance-authority with semantic design tokens
 */
const progressVariants = cva(
  'relative h-4 w-full overflow-hidden rounded-full bg-secondary transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-secondary',
        success: 'bg-success/10',
        warning: 'bg-warning/10',
        destructive: 'bg-destructive/10',
      },
      size: {
        sm: 'h-2',
        default: 'h-4',
        lg: 'h-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * Progress indicator variants using semantic design tokens
 */
const progressIndicatorVariants = cva(
  'h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning',
        destructive: 'bg-destructive',
      },
      animated: {
        true: 'bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      animated: false,
    },
  }
);

/**
 * Progress component props interface
 */
export interface ProgressProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  readonly value?: number;
  readonly max?: number;
  readonly label?: string;
  readonly showValue?: boolean;
  readonly showPercentage?: boolean;
  readonly animated?: boolean;
  readonly indeterminate?: boolean;
  readonly helperText?: string;
  readonly size?: 'sm' | 'default' | 'lg';
}

/**
 * Format display value - pure function
 */
const getDisplayValue = (
  showPercentage: boolean,
  showValue: boolean,
  percentage: number,
  value: number,
  max: number
): string | null => {
  if (showPercentage) {
    return `${Math.round(percentage)}%`;
  }
  if (showValue) {
    return `${value}/${max}`;
  }
  return null;
};

/**
 * Enhanced Progress component
 * @param variant - Progress variant (default, success, warning, destructive)
 * @param size - Progress size (sm, default, lg)
 * @param value - Current progress value
 * @param max - Maximum progress value (default: 100)
 * @param label - Progress label
 * @param showValue - Whether to show current value
 * @param showPercentage - Whether to show percentage
 * @param animated - Whether to show animation
 * @param indeterminate - Whether progress is indeterminate
 * @param helperText - Additional helper text
 * @param className - Additional CSS classes
 * @param props - Additional div props
 * @returns Enhanced Progress JSX element
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      variant,
      size,
      value = 0,
      max = 100,
      label,
      showValue = false,
      showPercentage = false,
      animated = false,
      indeterminate = false,
      helperText,
      ...props
    },
    ref
  ): React.ReactElement => {
    const tokens = useTokens();
    
    // Calculate percentage
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Format display value
    const displayValue = getDisplayValue(showPercentage, showValue, percentage, value, max);

    const progressElement = (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        aria-label={label}
        aria-describedby={helperText ? `${label}-helper` : undefined}
        className={cn(progressVariants({ variant, size }), className)}
        {...props}
      >
        {indeterminate ? (
          // Indeterminate progress animation
          <div className="h-full w-full bg-primary/30 animate-pulse">
            <div
              className={cn(
                'h-full w-1/3 bg-primary animate-bounce',
                progressIndicatorVariants({ variant, animated: false })
              )}
              style={{
                animation: 'progress-indeterminate 2s ease-in-out infinite',
              }}
            />
          </div>
        ) : (
          // Determinate progress
          <div
            className={cn(progressIndicatorVariants({ variant, animated }))}
            style={{
              transform: `translateX(-${100 - percentage}%)`,
            }}
          />
        )}
      </div>
    );

    if (!label && !displayValue && !helperText) {
      return progressElement;
    }

    return (
      <div className="progress-field space-y-2">
        {/* Label and value */}
        {(label || displayValue) && (
          <div className="flex justify-between items-center">
            {label && <label className="text-sm font-medium text-foreground">{label}</label>}
            {displayValue && <span className="text-sm text-muted-foreground">{displayValue}</span>}
          </div>
        )}

        {progressElement}

        {helperText && (
          <p id={`${label}-helper`} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

/**
 * Circular Progress component
 */
export interface CircularProgressProps {
  readonly value?: number;
  readonly max?: number;
  readonly size?: number;
  readonly strokeWidth?: number;
  readonly variant?: 'default' | 'success' | 'warning' | 'destructive';
  readonly showValue?: boolean;
  readonly showPercentage?: boolean;
  readonly indeterminate?: boolean;
  readonly className?: string;
  readonly label?: string;
}

/**
 * Format circular display value - pure function
 */
const getCircularDisplayValue = (
  showPercentage: boolean,
  showValue: boolean,
  percentage: number,
  value: number
): string | null => {
  if (showPercentage) {
    return `${Math.round(percentage)}%`;
  }
  if (showValue) {
    return `${value}`;
  }
  return null;
};

export const CircularProgress = forwardRef<SVGSVGElement, CircularProgressProps>(
  (
    {
      value = 0,
      max = 100,
      size = 40,
      strokeWidth = 4,
      variant = 'default',
      showValue = false,
      showPercentage = false,
      indeterminate = false,
      className,
      label,
    },
    ref
  ): React.ReactElement => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Using semantic design tokens instead of hardcoded colors
    const colorMap = {
      default: 'text-primary',
      success: 'text-success',
      warning: 'text-warning',
      destructive: 'text-destructive',
    };

    const displayValue = getCircularDisplayValue(showPercentage, showValue, percentage, value);

    return (
      <div className="circular-progress relative inline-flex items-center justify-center">
        <svg
          ref={ref}
          className={cn('transform -rotate-90', className)}
          width={size}
          height={size}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : value}
          aria-label={label}
          role="progressbar"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-secondary"
          />

          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={indeterminate ? 0 : strokeDashoffset}
            strokeLinecap="round"
            className={cn('transition-all duration-300 ease-in-out', colorMap[variant], {
              'animate-spin': indeterminate,
            })}
            style={{
              strokeDasharray: indeterminate
                ? `${circumference * 0.25} ${circumference}`
                : strokeDasharray,
            }}
          />
        </svg>

        {/* Center text */}
        {displayValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-foreground">{displayValue}</span>
          </div>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';

/**
 * Progress variants type exports
 */
export type ProgressVariant = VariantProps<typeof progressVariants>['variant'];
export type ProgressSize = VariantProps<typeof progressVariants>['size'];
