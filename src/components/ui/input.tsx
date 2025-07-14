/**
 * Input component with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type InputHTMLAttributes } from 'react';

/**
 * Input variants using class-variance-authority
 */
const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        destructive: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500',
      },
      size: {
        default: 'h-10',
        sm: 'h-9',
        lg: 'h-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * Input component props interface
 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  readonly error?: boolean;
  readonly success?: boolean;
}

/**
 * Input component
 * @param variant - Input variant
 * @param size - Input size
 * @param className - Additional CSS classes
 * @param error - Error state
 * @param success - Success state
 * @param type - Input type
 * @param props - Additional input props
 * @returns Input JSX element
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, error, success, type, ...props }, ref): React.ReactElement => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant: computedVariant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

/**
 * Input variants type export
 */
export type InputVariant = VariantProps<typeof inputVariants>['variant'];
export type InputSize = VariantProps<typeof inputVariants>['size'];
