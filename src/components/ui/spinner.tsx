/**
 * @fileoverview CVA Spinner Component - Pure CSS Animations
 * @description Spinner component using CVA pattern with pure CSS spin animation
 * @version 5.1.0
 * @compliance CVA pattern, Pure CSS animations, Framework-agnostic
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Box } from '../semantic';

/**
 * Spinner component variants using CVA
 */
const spinnerVariants = cva(
  "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
  {
    variants: {
      size: {
        xs: "h-3 w-3 border",
        sm: "h-4 w-4 border",
        default: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-2",
        xl: "h-12 w-12 border-2",
      },
      variant: {
        default: "text-primary-600 dark:text-primary-400",
        secondary: "text-secondary-600 dark:text-secondary-400",
        success: "text-success-600 dark:text-success-400",
        warning: "text-warning-600 dark:text-warning-400",
        destructive: "text-destructive-600 dark:text-destructive-400",
        muted: "text-muted-foreground",
      },
      speed: {
        slow: "animate-[spin_2s_linear_infinite]",
        normal: "animate-spin",
        fast: "animate-[spin_0.5s_linear_infinite]",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      speed: "normal",
    },
  }
);

const spinnerContainerVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      fullScreen: {
        true: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
        false: "",
      },
    },
    defaultVariants: {
      fullScreen: false,
    },
  }
);

/**
 * Spinner component props interface
 */
export interface SpinnerProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /** Show spinner in full screen overlay */
  fullScreen?: boolean;
  /** Label for accessibility */
  label?: string;
  /** Additional text to display */
  text?: string;
}

/**
 * Spinner component using CVA pattern
 * @param size - Spinner size (xs, sm, default, lg, xl)
 * @param variant - Spinner color variant
 * @param speed - Animation speed (slow, normal, fast)
 * @param fullScreen - Show as full screen overlay
 * @param label - Accessibility label
 * @param text - Additional text to display
 * @param className - Additional CSS classes
 * @param props - Additional div props
 * @returns Spinner JSX element
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'default',
      variant = 'default',
      speed = 'normal',
      fullScreen = false,
      label = 'Loading',
      text,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const spinnerElement = (
      <Box
        className={cn(spinnerVariants({ size, variant, speed }))}
        role="status"
        aria-label={label}
        aria-hidden="true"
      />
    );

    if (fullScreen) {
      return (
        <Box
          ref={ref}
          className={cn(spinnerContainerVariants({ fullScreen: true }), className)}
          role="status"
          aria-label={label}
          {...props}
        >
          <Box className="flex flex-col items-center gap-4">
            {spinnerElement}
            {text && (
              <p className="text-sm text-muted-foreground animate-pulse">
                {text}
              </p>
            )}
            <span className="sr-only">{label}</span>
          </Box>
        </Box>
      );
    }

    if (text) {
      return (
        <Box
          ref={ref}
          className={cn("inline-flex items-center gap-2", className)}
          role="status"
          aria-label={label}
          {...props}
        >
          {spinnerElement}
          <span className="text-sm text-muted-foreground">
            {text}
          </span>
          <span className="sr-only">{label}</span>
        </Box>
      );
    }

    return (
      <Box
        ref={ref}
        className={cn(spinnerContainerVariants({ fullScreen: false }), className)}
        role="status"
        aria-label={label}
        {...props}
      >
        {spinnerElement}
        <span className="sr-only">{label}</span>
      </Box>
    );
  }
);

Spinner.displayName = 'Spinner';

/**
 * Dots Spinner Component - Alternative spinner style
 */
const dotsSpinnerVariants = cva(
  "inline-flex items-center gap-1",
  {
    variants: {
      size: {
        xs: "gap-0.5",
        sm: "gap-0.5", 
        default: "gap-1",
        lg: "gap-1.5",
        xl: "gap-2",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const dotVariants = cva(
  "rounded-full bg-current animate-pulse",
  {
    variants: {
      size: {
        xs: "h-1 w-1",
        sm: "h-1.5 w-1.5",
        default: "h-2 w-2",
        lg: "h-3 w-3",
        xl: "h-4 w-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface DotsSpinnerProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dotsSpinnerVariants> {
  /** Color variant */
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'muted';
  /** Label for accessibility */
  label?: string;
}

/**
 * Dots Spinner component - Three animated dots
 */
export const DotsSpinner = forwardRef<HTMLDivElement, DotsSpinnerProps>(
  (
    {
      size = 'default',
      variant = 'default',
      label = 'Loading',
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const variantClasses = {
      default: "text-primary-600 dark:text-primary-400",
      secondary: "text-secondary-600 dark:text-secondary-400", 
      success: "text-success-600 dark:text-success-400",
      warning: "text-warning-600 dark:text-warning-400",
      destructive: "text-destructive-600 dark:text-destructive-400",
      muted: "text-muted-foreground",
    };

    return (
      <Box
        ref={ref}
        className={cn(
          dotsSpinnerVariants({ size }),
          variantClasses[variant],
          className
        )}
        role="status"
        aria-label={label}
        {...props}
      >
        <Box 
          className={cn(
            dotVariants({ size }),
            "animate-[pulse_1.4s_ease-in-out_infinite]"
          )} 
        />
        <Box 
          className={cn(
            dotVariants({ size }),
            "animate-[pulse_1.4s_ease-in-out_infinite] [animation-delay:0.2s]"
          )} 
        />
        <Box 
          className={cn(
            dotVariants({ size }),
            "animate-[pulse_1.4s_ease-in-out_infinite] [animation-delay:0.4s]"
          )} 
        />
        <span className="sr-only">{label}</span>
      </Box>
    );
  }
);

DotsSpinner.displayName = 'DotsSpinner';

/**
 * Pulse Spinner Component - Pulsing circle
 */
export interface PulseSpinnerProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /** Label for accessibility */
  label?: string;
}

/**
 * Pulse Spinner component - Single pulsing circle
 */
export const PulseSpinner = forwardRef<HTMLDivElement, PulseSpinnerProps>(
  (
    {
      size = 'default',
      variant = 'default',
      label = 'Loading',
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const sizeClasses = {
      xs: "h-3 w-3",
      sm: "h-4 w-4", 
      default: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    };

    const variantClasses = {
      default: "bg-primary-600 dark:bg-primary-400",
      secondary: "bg-secondary-600 dark:bg-secondary-400",
      success: "bg-success-600 dark:bg-success-400", 
      warning: "bg-warning-600 dark:bg-warning-400",
      destructive: "bg-destructive-600 dark:bg-destructive-400",
      muted: "bg-muted-foreground",
    };

    return (
      <Box
        ref={ref}
        className={cn("inline-flex items-center justify-center", className)}
        role="status"
        aria-label={label}
        {...props}
      >
        <Box
          className={cn(
            "rounded-full animate-pulse",
            sizeClasses[size || 'default'],
            variantClasses[variant || 'default']
          )}
        />
        <span className="sr-only">{label}</span>
      </Box>
    );
  }
);

PulseSpinner.displayName = 'PulseSpinner';