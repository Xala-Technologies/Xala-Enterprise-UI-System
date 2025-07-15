/**
 * DatePicker component - Pure presentational component
 * Supports Norwegian locale and enterprise standards
 * No client-side logic or state management
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type InputHTMLAttributes } from 'react';

/**
 * DatePicker input variants
 */
const datePickerVariants = cva(
  [
    'flex h-10 w-full rounded-md border border-input',
    'bg-background px-3 py-2 text-sm',
    'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'border-input',
        outline: 'border-2 border-input',
        filled: 'bg-muted border-muted',
      },
      size: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
      state: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500',
        warning: 'border-yellow-500 focus-visible:ring-yellow-500',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
);

/**
 * DatePicker props interface
 */
export interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    VariantProps<typeof datePickerVariants> {
  /** Label for the date picker */
  readonly label?: string;
  /** Error message to display */
  readonly error?: string;
  /** Helper text */
  readonly helperText?: string;
  /** Required field indicator */
  readonly required?: boolean;
  /** Show Norwegian date format hint */
  readonly showFormatHint?: boolean;
}

/**
 * DatePicker component - Pure presentational component
 * @param variant - Input styling variant
 * @param size - Input size
 * @param state - Input state (error, success, warning)
 * @param label - Input label
 * @param error - Error message
 * @param helperText - Helper text
 * @param required - Required field indicator
 * @param showFormatHint - Show Norwegian date format hint
 * @param className - Additional CSS classes
 * @param props - Additional input attributes
 * @returns DatePicker JSX element
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      state = 'default',
      label,
      error,
      helperText,
      required = false,
      showFormatHint = true,
      placeholder = 'dd.mm.åååå',
      ...props
    },
    ref
  ): React.ReactElement => {
    const inputId = props.id || 'date-picker';
    const hasError = Boolean(error) || state === 'error';
    const currentState = hasError ? 'error' : state;

    return (
      <div className="flex flex-col space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              hasError && 'text-destructive'
            )}
          >
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </label>
        )}

        <input
          ref={ref}
          type="date"
          id={inputId}
          className={cn(datePickerVariants({ variant, size, state: currentState }), className)}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />

        {showFormatHint && !error && !helperText && (
          <p className="text-xs text-muted-foreground">Format: dd.mm.åååå (norsk datoformat)</p>
        )}

        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}

        {error && (
          <p id={`${inputId}-error`} className="text-xs text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
