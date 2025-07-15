/**
 * Alert component system with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Alert variants using class-variance-authority with semantic design tokens
 */
const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success:
          'border-success/50 text-success-foreground dark:border-success [&>svg]:text-success',
        warning:
          'border-warning/50 text-warning-foreground dark:border-warning [&>svg]:text-warning',
        info: 'border-info/50 text-info-foreground dark:border-info [&>svg]:text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
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
