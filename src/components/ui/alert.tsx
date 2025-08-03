/**
 * @fileoverview SSR-Safe Alert Component - Production Strategy Implementation
 * @description Alert component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

/**
 * Alert variants using semantic Tailwind classes
 * Pure CVA implementation with design token classes
 */
const alertVariants = cva(
  // Base classes using semantic tokens
  'relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success: 'border-success/50 text-success dark:border-success [&>svg]:text-success',
        warning: 'border-warning/50 text-warning dark:border-warning [&>svg]:text-warning',
        info: 'border-info/50 text-info dark:border-info [&>svg]:text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Alert variant types
 */
export type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

/**
 * Alert component props interface
 */
export interface AlertProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  variant?: AlertVariant;
  children?: React.ReactNode;
}

/**
 * Alert component
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        role="alert" 
        className={cn(alertVariants({ variant }), className)} 
        {...props}
      >
        {children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

/**
 * Alert Title component props interface
 */
export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

/**
 * Alert Title component
 */
export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h5 
        ref={ref} 
        className={cn('mb-1 font-medium leading-none tracking-tight', className)} 
        {...props}
      >
        {children}
      </h5>
    );
  }
);

AlertTitle.displayName = 'AlertTitle';

/**
 * Alert Description component props interface
 */
export interface AlertDescriptionProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * Alert Description component
 */
export const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn('text-sm [&_p]:leading-relaxed', className)} 
        {...props}
      >
        {children}
      </div>
    );
  }
);

AlertDescription.displayName = 'AlertDescription';

// Note: AlertIcon and AlertContent are no longer needed as the base Alert component
// handles icon positioning through CSS classes. Icons can be placed directly as children.