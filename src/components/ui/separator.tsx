/**
 * @fileoverview Separator Component - Norwegian Compliance
 * @description Separator component for visual message grouping in chat interfaces
 * @version 1.0.0
 * @compliance WCAG 2.2 AAA, Norwegian Enterprise Standards
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils/cn';

/**
 * Separator component variants using semantic design tokens
 */
const separatorVariants = cva('shrink-0 bg-border', {
  variants: {
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
    variant: {
      default: 'bg-border',
      muted: 'bg-muted',
      accent: 'bg-accent',
      destructive: 'bg-destructive/20',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    spacing: {
      none: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
  compoundVariants: [
    // Horizontal spacing variants
    {
      orientation: 'horizontal',
      spacing: 'sm',
      className: 'my-2',
    },
    {
      orientation: 'horizontal',
      spacing: 'md',
      className: 'my-4',
    },
    {
      orientation: 'horizontal',
      spacing: 'lg',
      className: 'my-6',
    },
    {
      orientation: 'horizontal',
      spacing: 'xl',
      className: 'my-8',
    },
    // Vertical spacing variants
    {
      orientation: 'vertical',
      spacing: 'sm',
      className: 'mx-2',
    },
    {
      orientation: 'vertical',
      spacing: 'md',
      className: 'mx-4',
    },
    {
      orientation: 'vertical',
      spacing: 'lg',
      className: 'mx-6',
    },
    {
      orientation: 'vertical',
      spacing: 'xl',
      className: 'mx-8',
    },
    // Size variants
    {
      size: 'sm',
      orientation: 'horizontal',
      className: 'h-[0.5px]',
    },
    {
      size: 'lg',
      orientation: 'horizontal',
      className: 'h-[2px]',
    },
    {
      size: 'sm',
      orientation: 'vertical',
      className: 'w-[0.5px]',
    },
    {
      size: 'lg',
      orientation: 'vertical',
      className: 'w-[2px]',
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'default',
    size: 'md',
    spacing: 'none',
  },
});

/**
 * Separator Props interface
 */
export interface SeparatorProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {
  /** Decorative separator (no semantic meaning) */
  readonly decorative?: boolean;
  /** Label text for the separator */
  readonly label?: string;
  /** Position of the label */
  readonly labelPosition?: 'start' | 'center' | 'end';
}

/**
 * Separator component for visual message grouping
 *
 * @example
 * ```tsx
 * // Basic separator
 * <Separator />
 *
 * // Separator with label
 * <Separator label="Today" labelPosition="center" />
 *
 * // Vertical separator
 * <Separator orientation="vertical" spacing="md" />
 *
 * // Accent separator
 * <Separator variant="accent" spacing="lg" />
 * ```
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = 'horizontal',
      variant,
      size,
      spacing,
      decorative = true,
      label,
      labelPosition = 'center',
      ...props
    },
    ref
  ) => {
    // If there's a label, render with label wrapper
    if (label) {
      return (
        <div
          className={cn(
            'relative flex items-center',
            orientation === 'horizontal' ? 'w-full' : 'h-full flex-col',
            spacing && separatorVariants({ orientation, spacing }),
            className
          )}
        >
          {labelPosition !== 'start' && (
            <div
              className={cn(separatorVariants({ orientation, variant, size }), 'flex-1')}
              role={decorative ? 'presentation' : 'separator'}
              {...(orientation && { 'aria-orientation': orientation })}
            />
          )}

          <span
            className={cn(
              'text-sm text-muted-foreground bg-background',
              orientation === 'horizontal' ? 'px-3' : 'py-3'
            )}
          >
            {label}
          </span>

          {labelPosition !== 'end' && (
            <div
              className={cn(separatorVariants({ orientation, variant, size }), 'flex-1')}
              role={decorative ? 'presentation' : 'separator'}
              {...(orientation && { 'aria-orientation': orientation })}
            />
          )}
        </div>
      );
    }

    // Basic separator without label
    return (
      <div
        ref={ref}
        className={cn(separatorVariants({ orientation, variant, size, spacing }), className)}
        role={decorative ? 'presentation' : 'separator'}
        {...(orientation && { 'aria-orientation': orientation })}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

/**
 * Separator component variants export
 */
export { separatorVariants };
