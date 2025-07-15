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
  'flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
  {
    variants: {
      variant: {
        default: 'border-input focus-visible:ring-ring',
        destructive: 'border-destructive focus-visible:ring-destructive text-destructive',
        success: 'border-green-500 focus-visible:ring-green-500 text-green-800',
        warning: 'border-yellow-500 focus-visible:ring-yellow-500 text-yellow-800',
      },
      size: {
        sm: 'h-8 px-3 py-1 text-xs',
        default: 'h-10 px-3 py-2',
        lg: 'h-12 px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * Input wrapper variants for icon support
 */
const inputWrapperVariants = cva('relative flex items-center', {
  variants: {
    hasLeftIcon: {
      true: '',
      false: '',
    },
    hasRightIcon: {
      true: '',
      false: '',
    },
  },
});

/**
 * Input component props interface
 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  readonly error?: boolean;
  readonly success?: boolean;
  readonly leftIcon?: React.ReactNode;
  readonly rightIcon?: React.ReactNode;
  readonly helperText?: string;
  readonly errorText?: string;
  readonly successText?: string;
  readonly label?: string;
  readonly required?: boolean;
}

/**
 * Enhanced Input component with icons and helper text
 * @param variant - Input variant (default, destructive, success, warning)
 * @param size - Input size (sm, default, lg)
 * @param leftIcon - Icon to show on the left
 * @param rightIcon - Icon to show on the right
 * @param helperText - Helper text below input
 * @param errorText - Error text (overrides helperText when present)
 * @param successText - Success text (overrides helperText when present)
 * @param label - Input label
 * @param required - Whether input is required
 * @param error - Error state
 * @param success - Success state
 * @param className - Additional CSS classes
 * @param type - Input type
 * @param props - Additional input props
 * @returns Enhanced Input JSX element
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      helperText,
      errorText,
      successText,
      label,
      required,
      error,
      success,
      type = 'text',
      id,
      ...props
    },
    ref
  ): React.ReactElement => {
    // Generate ID if not provided and label exists
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    // Determine actual variant based on state
    const actualVariant =
      error || errorText ? 'destructive' : success || successText ? 'success' : variant;

    // Helper text to display
    const displayHelperText = errorText || successText || helperText;

    const inputElement = (
      <input
        id={inputId}
        type={type}
        className={cn(
          inputVariants({ variant: actualVariant, size }),
          {
            'pl-10': leftIcon && size === 'default',
            'pl-9': leftIcon && size === 'sm',
            'pl-12': leftIcon && size === 'lg',
            'pr-10': rightIcon && size === 'default',
            'pr-9': rightIcon && size === 'sm',
            'pr-12': rightIcon && size === 'lg',
          },
          className
        )}
        ref={ref}
        aria-invalid={error || !!errorText}
        aria-describedby={displayHelperText ? `${inputId}-helper` : undefined}
        aria-required={required}
        {...props}
      />
    );

    const content =
      leftIcon || rightIcon ? (
        <div
          className={cn(
            inputWrapperVariants({ hasLeftIcon: !!leftIcon, hasRightIcon: !!rightIcon })
          )}
        >
          {leftIcon && (
            <div
              className={cn(
                'absolute left-0 flex items-center justify-center text-muted-foreground pointer-events-none',
                {
                  'h-8 w-8': size === 'sm',
                  'h-10 w-10': size === 'default',
                  'h-12 w-12': size === 'lg',
                }
              )}
            >
              {leftIcon}
            </div>
          )}

          {inputElement}

          {rightIcon && (
            <div
              className={cn(
                'absolute right-0 flex items-center justify-center text-muted-foreground pointer-events-none',
                {
                  'h-8 w-8': size === 'sm',
                  'h-10 w-10': size === 'default',
                  'h-12 w-12': size === 'lg',
                }
              )}
            >
              {rightIcon}
            </div>
          )}
        </div>
      ) : (
        inputElement
      );

    if (!label && !displayHelperText) {
      return content;
    }

    return (
      <div className="input-field space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              {
                'text-destructive': error || errorText,
                'text-green-700': success || successText,
              }
            )}
          >
            {label}
            {required && (
              <span className="text-destructive ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {content}

        {displayHelperText && (
          <p
            id={`${inputId}-helper`}
            className={cn('text-xs', {
              'text-destructive': error || errorText,
              'text-green-600': success || successText,
              'text-muted-foreground': !error && !errorText && !success && !successText,
            })}
          >
            {displayHelperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Input variants type exports
 */
export type InputVariant = VariantProps<typeof inputVariants>['variant'];
export type InputSize = VariantProps<typeof inputVariants>['size'];
