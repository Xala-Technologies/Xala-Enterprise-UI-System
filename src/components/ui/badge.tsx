/**
 * Badge component with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Badge variants using class-variance-authority
 */
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  { variants: { variant: { default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        success: 'border-transparent bg-green-500 text-white hover:bg-green-500/80',
        warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80',
        info: 'border-transparent bg-blue-500 text-white hover:bg-blue-500/80', },
      size: { default: 'px-2.5 py-0.5',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm', }, },
    defaultVariants: { variant: 'default',
      size: 'default', }, }
);

/**
 * Badge component props interface
 */
export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { readonly asChild?: boolean; }

/**
 * Badge component
 * @param variant - Badge variant
 * @param size - Badge size
 * @param className - Additional CSS classes
 * @param asChild - Render as child element
 * @param props - Additional div props
 * @returns Badge JSX element
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, asChild = false, ...props }, ref): React.ReactElement => { return (
      <Comp ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props} />
    ); }
);

Badge.displayName = 'Badge';

/**
 * Badge variants type export
 */
export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
export type BadgeSize = VariantProps<typeof badgeVariants>['size'];
