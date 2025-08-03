/**
 * @fileoverview Badge Component v5.0.0 - CVA Pattern Implementation
 * @description Modern Badge component using CVA patterns with semantic Tailwind classes
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, CVA-based
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// BADGE VARIANTS USING CVA PATTERN
// =============================================================================

/**
 * Badge variants using semantic Tailwind classes
 */
const badgeVariants = cva(
  'inline-flex items-center rounded-full border font-semibold transition-colors cursor-default focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground border-transparent hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground border-transparent hover:bg-destructive/90',
        outline: 'bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground',
        success: 'bg-green-500 text-white border-transparent hover:bg-green-600',
        warning: 'bg-amber-500 text-white border-transparent hover:bg-amber-600',
        info: 'bg-blue-500 text-white border-transparent hover:bg-blue-600',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
        xl: 'px-4 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * Badge variant types
 */
export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info';

/**
 * Badge size types
 */
export type BadgeSize = 'default' | 'sm' | 'lg' | 'xl';

/**
 * Badge component props interface
 */
export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  readonly variant?: BadgeVariant;
  readonly size?: BadgeSize;
}

/**
 * Badge component
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'default', size = 'default', className, children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn(badgeVariants({ variant, size }), className)} 
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';