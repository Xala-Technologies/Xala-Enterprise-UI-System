/**
 * Card component system with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Card variants using class-variance-authority
 */
const cardVariants = cva('rounded-lg border bg-card text-card-foreground shadow-sm', {
  variants: {
    variant: {
      default: 'border-border',
      outlined: 'border-2 border-border',
      elevated: 'shadow-md',
      flat: 'shadow-none border-0',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Card component props interface
 */
export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/**
 * Card component
 * @param variant - Card variant
 * @param className - Additional CSS classes
 * @param props - Additional div props
 * @returns Card JSX element
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ _variant, className }))} {...props} />
  )
);

Card.displayName = 'Card';

/**
 * Card Header component props interface
 */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Card Header component
 * @param className - Additional CSS classes
 * @param props - Additional div props
 * @returns Card Header JSX element
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Title component props interface
 */
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

/**
 * Card Title component
 * @param className - Additional CSS classes
 * @param props - Additional heading props
 * @returns Card Title JSX element
 */
export const CardTitle = forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';

/**
 * Card Description component props interface
 */
export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

/**
 * Card Description component
 * @param className - Additional CSS classes
 * @param props - Additional paragraph props
 * @returns Card Description JSX element
 */
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);

CardDescription.displayName = 'CardDescription';

/**
 * Card Content component props interface
 */
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Card Content component
 * @param className - Additional CSS classes
 * @param props - Additional div props
 * @returns Card Content JSX element
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

/**
 * Card Footer component props interface
 */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Card Footer component
 * @param className - Additional CSS classes
 * @param props - Additional div props
 * @returns Card Footer JSX element
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);

CardFooter.displayName = 'CardFooter';

/**
 * Card variant type export
 */
export type CardVariant = VariantProps<typeof cardVariants>['variant'];
