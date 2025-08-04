/**
 * @fileoverview CVA Progress Components - Pure CSS Animations
 * @description Progress components using CVA pattern with semantic Tailwind classes
 * @version 5.1.0
 * @compliance CVA pattern, Pure CSS animations, Framework-agnostic
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * Progress component variants using CVA
 */
const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-neutral-200 dark:bg-neutral-800",
        success: "bg-success-100 dark:bg-success-900/20",
        warning: "bg-warning-100 dark:bg-warning-900/20",
        destructive: "bg-destructive-100 dark:bg-destructive-900/20",
      },
      size: {
        sm: "h-2",
        default: "h-4",
        lg: "h-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-primary-600 dark:bg-primary-500",
        success: "bg-success-600 dark:bg-success-500",
        warning: "bg-warning-600 dark:bg-warning-500",
        destructive: "bg-destructive-600 dark:bg-destructive-500",
      },
      animated: {
        true: "transition-transform duration-300 ease-in-out",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      animated: false,
    },
  }
);

const progressIndeterminateVariants = cva(
  "absolute inset-0 rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary-600/30 dark:bg-primary-500/30",
        success: "bg-success-600/30 dark:bg-success-500/30",
        warning: "bg-warning-600/30 dark:bg-warning-500/30",
        destructive: "bg-destructive-600/30 dark:bg-destructive-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const progressIndeterminateBarVariants = cva(
  "h-full w-1/3 rounded-full animate-[progress-indeterminate_2s_ease-in-out_infinite]",
  {
    variants: {
      variant: {
        default: "bg-primary-600 dark:bg-primary-500",
        success: "bg-success-600 dark:bg-success-500",
        warning: "bg-warning-600 dark:bg-warning-500",
        destructive: "bg-destructive-600 dark:bg-destructive-500",
      },
    },
    defaultVariants: {
      variant: "default",
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
 * Enhanced Progress component using CVA pattern
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
      variant = 'default',
      size = 'default',
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
          <div className={cn(progressIndeterminateVariants({ variant }))}>
            <div className={cn(progressIndeterminateBarVariants({ variant }))} />
          </div>
        ) : (
          // Determinate progress
          <div 
            className={cn(progressIndicatorVariants({ variant, animated }))}
            style={{ transform: `translateX(-${100 - percentage}%)` }}
          />
        )}
      </div>
    );

    if (!label && !displayValue && !helperText) {
      return progressElement;
    }

    return (
      <div className="flex flex-col gap-2">
        {/* Label and value */}
        {(label || displayValue) && (
          <div className="flex justify-between items-center">
            {label && (
              <label className="text-sm font-medium text-foreground">
                {label}
              </label>
            )}
            {displayValue && (
              <span className="text-sm text-muted-foreground">
                {displayValue}
              </span>
            )}
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
 * Circular Progress component variants using CVA
 */
const circularProgressVariants = cva(
  "relative inline-flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "w-8 h-8",
        default: "w-10 h-10",
        lg: "w-12 h-12",
        xl: "w-16 h-16",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const circularProgressSvgVariants = cva(
  "transform -rotate-90 transition-all duration-300 ease-in-out",
  {
    variants: {
      indeterminate: {
        true: "animate-spin",
        false: "",
      },
    },
    defaultVariants: {
      indeterminate: false,
    },
  }
);

/**
 * Circular Progress component props
 */
export interface CircularProgressProps extends VariantProps<typeof circularProgressVariants> {
  readonly value?: number;
  readonly max?: number;
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

export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      value = 0,
      max = 100,
      size = 'default',
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
    
    // Size mapping for SVG dimensions
    const sizeMap = {
      sm: 32,
      default: 40,
      lg: 48,
      xl: 64,
    };
    
    const svgSize = sizeMap[size as keyof typeof sizeMap];
    const radius = (svgSize - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Color mapping using Tailwind classes
    const getStrokeColor = (): string => {
      switch (variant) {
        case 'success':
          return 'stroke-success-600 dark:stroke-success-500';
        case 'warning':
          return 'stroke-warning-600 dark:stroke-warning-500';
        case 'destructive':
          return 'stroke-destructive-600 dark:stroke-destructive-500';
        case 'default':
        default:
          return 'stroke-primary-600 dark:stroke-primary-500';
      }
    };

    const displayValue = getCircularDisplayValue(showPercentage, showValue, percentage, value);

    return (
      <div ref={ref} className={cn(circularProgressVariants({ size }), className)}>
        <svg
          width={svgSize}
          height={svgSize}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : value}
          aria-label={label}
          role="progressbar"
          className={cn(circularProgressSvgVariants({ indeterminate }))}
        >
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="fill-transparent stroke-neutral-200 dark:stroke-neutral-800"
          />

          {/* Progress circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={indeterminate ? `${circumference * 0.25} ${circumference}` : strokeDasharray}
            strokeDashoffset={indeterminate ? 0 : strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              "fill-transparent transition-all duration-300 ease-in-out",
              getStrokeColor()
            )}
          />
        </svg>

        {/* Center text */}
        {displayValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-foreground">
              {displayValue}
            </span>
          </div>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';

