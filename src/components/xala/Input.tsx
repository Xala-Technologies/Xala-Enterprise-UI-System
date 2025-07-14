/**
 * Xala Input Component
 * Based on Equinor Design System with WCAG AAA accessibility compliance
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

/**
 * Input variants using class-variance-authority
 */
const inputVariants = cva(
  [
    // Base styles
    'flex w-full rounded-md border px-3 py-2 text-sm ring-offset-background',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-colors',

    // Touch targets and accessibility
    'min-h-[44px]', // WCAG AAA minimum touch target size
    'touch-manipulation',

    // Motion preferences
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-input bg-background',
          'hover:border-input/80',
          'focus-visible:border-ring',
        ],
        success: [
          'border-success bg-background',
          'hover:border-success/80',
          'focus-visible:border-success focus-visible:ring-success',
        ],
        warning: [
          'border-warning bg-background',
          'hover:border-warning/80',
          'focus-visible:border-warning focus-visible:ring-warning',
        ],
        error: [
          'border-destructive bg-background',
          'hover:border-destructive/80',
          'focus-visible:border-destructive focus-visible:ring-destructive',
        ],
        ghost: [
          'border-transparent bg-transparent',
          'hover:border-input/40',
          'focus-visible:border-ring',
        ],
      },
      size: {
        sm: 'h-9 px-3 py-1 text-xs',
        default: 'h-10 px-3 py-2',
        lg: 'h-11 px-4 py-2',
        xl: 'h-12 px-4 py-3 text-base',
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
  /** Input label */
  readonly label?: string;

  /** Helper text */
  readonly helperText?: string;

  /** Error message */
  readonly error?: string;

  /** Success message */
  readonly success?: string;

  /** Warning message */
  readonly warning?: string;

  /** Icon to display at the start */
  readonly startIcon?: ReactNode;

  /** Icon to display at the end */
  readonly endIcon?: ReactNode;

  /** Unit or suffix text */
  readonly unit?: string;

  /** Show/hide password toggle for password inputs */
  readonly showPasswordToggle?: boolean;

  /** Required field indicator */
  readonly required?: boolean;

  /** Optional field indicator */
  readonly optional?: boolean;

  /** Character count display */
  readonly showCharCount?: boolean;

  /** Maximum character count */
  readonly maxLength?: number;

  /** Container class name */
  readonly containerClassName?: string;

  /** Label class name */
  readonly labelClassName?: string;

  /** Helper text class name */
  readonly helperTextClassName?: string;
}

/**
 * Input wrapper component
 */
const InputWrapper = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    className?: string;
  }
>(({ _children, className }, ref) => (
  <div ref={ref} className={cn('relative', className)}>
    {children}
  </div>
));

InputWrapper.displayName = 'InputWrapper';

/**
 * Input label component
 */
const InputLabel = forwardRef<
  HTMLLabelElement,
  {
    htmlFor: string;
    children: ReactNode;
    required?: boolean;
    optional?: boolean;
    className?: string;
  }
>(({ htmlFor, children, required, optional, className }, ref) => (
  <label
    ref={ref}
    htmlFor={htmlFor}
    className={cn(
      'block text-sm font-medium leading-6 text-foreground mb-2',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
  >
    {children}
    {required && (
      <span className="ml-1 text-destructive" aria-label="required">
        *
      </span>
    )}
    {optional && <span className="ml-1 text-muted-foreground text-xs">(optional)</span>}
  </label>
));

InputLabel.displayName = 'InputLabel';

/**
 * Input message component
 */
const InputMessage = forwardRef<
  HTMLParagraphElement,
  {
    children: ReactNode;
    type?: 'default' | 'success' | 'warning' | 'error';
    className?: string;
    id?: string;
  }
>(({ children, type = 'default', className, id }, ref): React.ReactElement => {
  return (
    <p
      ref={ref}
      id={id}
      className={cn('mt-2 text-sm', messageClasses[type], className)}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      {children}
    </p>
  );
});

InputMessage.displayName = 'InputMessage';

/**
 * Show/hide password toggle button
 */
const PasswordToggle = ({
  isVisible,
  onToggle,
  disabled,
}: {
  isVisible: boolean;
  onToggle: () => void;
  disabled?: boolean;
}): React.ReactElement => (
  <button
    type="button"
    onClick={onToggle}
    disabled={disabled}
    className={cn(
      'absolute inset-y-0 right-0 flex items-center pr-3',
      'text-muted-foreground hover:text-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors'
    )}
    aria-label={isVisible ? 'Hide password' : 'Show password'}
  >
    {isVisible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
  </button>
);

/**
 * Simple eye icons for password toggle
 */
const EyeIcon = ({ className }: { className?: string }): React.ReactElement => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = ({ className }: { className?: string }): React.ReactElement => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
    />
  </svg>
);

/**
 * Input component
 * @param variant - Input style variant
 * @param size - Input size
 * @param label - Input label
 * @param helperText - Helper text
 * @param error - Error message
 * @param success - Success message
 * @param warning - Warning message
 * @param startIcon - Icon at the start
 * @param endIcon - Icon at the end
 * @param unit - Unit or suffix text
 * @param showPasswordToggle - Show password toggle for password inputs
 * @param required - Required field indicator
 * @param optional - Optional field indicator
 * @param showCharCount - Show character count
 * @param maxLength - Maximum character count
 * @param containerClassName - Container class name
 * @param labelClassName - Label class name
 * @param helperTextClassName - Helper text class name
 * @param className - Additional CSS classes
 * @param props - Additional input props
 * @returns Input JSX element
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      size,
      label,
      helperText,
      error,
      success,
      warning,
      startIcon,
      endIcon,
      unit,
      showPasswordToggle = false,
      required = false,
      optional = false,
      showCharCount = false,
      maxLength,
      containerClassName,
      labelClassName,
      helperTextClassName,
      className,
      type = 'text',
      id,
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div className={cn('space-y-2', containerClassName)}>
        {/* Label */}
        {label && (
          <InputLabel
            htmlFor={inputId}
            required={required}
            optional={optional}
            className={labelClassName}
          >
            {label}
          </InputLabel>
        )}

        {/* Input wrapper */}
        <InputWrapper>
          {/* Start icon */}
          {startIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-muted-foreground">{startIcon}</span>
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            maxLength={maxLength}
            className={cn(
              inputVariants({ variant: computedVariant, size }),
              startIcon && 'pl-10',
              (endIcon || unit || (type === 'password' && showPasswordToggle)) && 'pr-10',
              className
            )}
            aria-describedby={describedBy || undefined}
            aria-invalid={error ? 'true' : 'false'}
            aria-required={required}
            {...props}
          />

          {/* End icon */}
          {endIcon && !unit && !(type === 'password' && showPasswordToggle) && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-muted-foreground">{endIcon}</span>
            </div>
          )}

          {/* Unit */}
          {unit && !(type === 'password' && showPasswordToggle) && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-muted-foreground text-sm">{unit}</span>
            </div>
          )}

          {/* Password toggle */}
          {type === 'password' && showPasswordToggle && (
            <PasswordToggle
              isVisible={isPasswordVisible}
              onToggle={() => setIsPasswordVisible(!isPasswordVisible)}
              disabled={disabled}
            />
          )}
        </InputWrapper>

        {/* Messages and character count */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            {/* Helper text */}
            {helperText && !error && !success && !warning && (
              <InputMessage id={helperTextId} className={helperTextClassName}>
                {helperText}
              </InputMessage>
            )}

            {/* Error message */}
            {error && (
              <InputMessage id={errorId} type="error" className={helperTextClassName}>
                {error}
              </InputMessage>
            )}

            {/* Success message */}
            {success && (
              <InputMessage id={successId} type="success" className={helperTextClassName}>
                {success}
              </InputMessage>
            )}

            {/* Warning message */}
            {warning && (
              <InputMessage id={warningId} type="warning" className={helperTextClassName}>
                {warning}
              </InputMessage>
            )}
          </div>

          {/* Character count */}
          {showCharCount && maxLength && (
            <div
              className={cn('text-xs', isOverLimit ? 'text-destructive' : 'text-muted-foreground')}
            >
              {charCount}/{maxLength}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Export input variants and types
 */
export type InputVariant = VariantProps<typeof inputVariants>['variant'];
export type InputSize = VariantProps<typeof inputVariants>['size'];

export { inputVariants };
