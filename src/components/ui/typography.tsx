/**
 * Typography components inspired by Equinor Design System
 * Enterprise-grade typography with design tokens and accessibility
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type HTMLAttributes } from 'react';

/**
 * Typography variants using class-variance-authority
 */
const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',
      body: 'leading-7 [&:not(:first-child)]:mt-6',
      bodyLarge: 'text-lg leading-7 [&:not(:first-child)]:mt-6',
      bodySmall: 'text-sm leading-6 [&:not(:first-child)]:mt-4',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
    },
    textColor: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive',
      success: 'text-green-600',
      warning: 'text-yellow-600',
      info: 'text-blue-600',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
  },
  defaultVariants: {
    variant: 'body',
    textColor: 'default',
    align: 'left',
  },
});

/**
 * Typography component props interface
 */
export interface TypographyProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  readonly as?: React.ElementType;
  readonly truncate?: boolean;
}

/**
 * Typography component
 * @param variant - Typography variant
 * @param textColor - Text color
 * @param align - Text alignment
 * @param as - HTML element type
 * @param truncate - Truncate long text
 * @param className - Additional CSS classes
 * @param props - Additional props
 * @returns Typography JSX element
 */
export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    { className, variant, textColor, align, as: Component = 'p', truncate, ...props },
    ref
  ): React.ReactElement => {
    return (
      <Component
        ref={ref}
        className={cn(
          typographyVariants({ variant, textColor, align }),
          truncate && 'truncate',
          className
        )}
        {...props}
      />
    );
  }
);

Typography.displayName = 'Typography';

/**
 * Get appropriate HTML element from variant
 * @param variant - Typography variant
 * @returns HTML element tag
 */
 
// eslint-disable-next-line no-unused-vars
function _getElementFromVariant(variant: string | null | undefined): React.ElementType {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'code':
      return 'code';
    case 'blockquote':
      return 'blockquote';
    case 'lead':
    case 'large':
    case 'small':
    case 'muted':
    case 'body':
    case 'bodyLarge':
    case 'bodySmall':
    default:
      return 'p';
  }
}

/**
 * Convenience components for common typography patterns
 */
export const Heading = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ variant = 'h1', ...props }, ref) => (
    <Typography ref={ref as React.Ref<HTMLElement>} variant={variant} {...props} />
  )
);

Heading.displayName = 'Heading';

export const Text = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ variant = 'body', ...props }, ref) => (
    <Typography ref={ref as React.Ref<HTMLElement>} variant={variant} {...props} />
  )
);

Text.displayName = 'Text';

export const Code = forwardRef<HTMLElement, TypographyProps>(
  ({ variant = 'code', ...props }, ref) => <Typography ref={ref} variant={variant} {...props} />
);

Code.displayName = 'Code';

export const Blockquote = forwardRef<HTMLQuoteElement, TypographyProps>(
  ({ variant = 'blockquote', ...props }, ref) => (
    <Typography ref={ref as React.Ref<HTMLElement>} variant={variant} {...props} />
  )
);

Blockquote.displayName = 'Blockquote';

/**
 * Typography variants type exports
 */
export type TypographyVariant = VariantProps<typeof typographyVariants>['variant'];
export type TypographyColor = VariantProps<typeof typographyVariants>['textColor'];
export type TypographyAlign = VariantProps<typeof typographyVariants>['align'];
