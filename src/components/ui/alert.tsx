/**
 * Alert component system with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Alert variants using class-variance-authority
 */
const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  { variants: { variant: { default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success: 'border-green-500/50 text-green-800 dark:border-green-500 [&>svg]:text-green-800',
        warning:
          'border-yellow-500/50 text-yellow-800 dark:border-yellow-500 [&>svg]:text-yellow-800',
        info: 'border-blue-500/50 text-blue-800 dark:border-blue-500 [&>svg]:text-blue-800', }, },
    defaultVariants: { variant: 'default', }, }
);

/**
 * Alert component props interface
 */
export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

/**
 * Alert component
 * @param variant - Alert variant
 * @param className - Additional CSS classes
 * @param props - Additional div props
 * @returns Alert JSX element
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  )
);

Alert.displayName = 'Alert';

/**
 * Alert Title component props interface
 */
export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

/**
 * Alert Title component
 * @param className - Additional CSS classes
 * @param props - Additional heading props
 * @returns Alert Title JSX element
 */
export const AlertTitle = forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
);

AlertTitle.displayName = 'AlertTitle';

/**
 * Alert Description component props interface
 */
export interface AlertDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

/**
 * Alert Description component
 * @param className - Additional CSS classes
 * @param props - Additional paragraph props
 * @returns Alert Description JSX element
 */
export const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm [&p]:leading-relaxed', className)} {...props} />
  )
);

AlertDescription.displayName = 'AlertDescription';

/**
 * Alert variant type export
 */
export type AlertVariant = VariantProps<typeof alertVariants>['variant'];
