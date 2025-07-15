/**
 * @fileoverview Input Component using Semantic Design Tokens
 * @description Modern input component using consolidated design token system
 * @version 3.0.0
 */

import * as React from 'react';
import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// TYPES
// =============================================================================

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'error' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  warning?: string;
  required?: boolean;
  optional?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  unit?: string;
  showPasswordToggle?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  helperTextClassName?: string;
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

/**
 * Input wrapper component
 */
const InputWrapper = React.forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    className?: string;
  }
>(({ children, className }, ref) => (
  <div ref={ref} className={cn('relative', className)}>
    {children}
  </div>
));

InputWrapper.displayName = 'InputWrapper';

/**
 * Input label component
 */
const InputLabel = React.forwardRef<
  HTMLLabelElement,
  {
    children: ReactNode;
    htmlFor?: string;
    required?: boolean;
    optional?: boolean;
    className?: string;
  }
>(({ children, htmlFor, required, optional, className }, ref) => (
  <label
    ref={ref}
    htmlFor={htmlFor}
    className={cn(
      'block text-sm font-medium text-foreground',
      required && 'after:content-["*"] after:ml-0.5 after:text-destructive',
      optional &&
        'after:content-["(optional)"] after:ml-1 after:text-muted-foreground after:font-normal',
      className
    )}
  >
    {children}
  </label>
));

InputLabel.displayName = 'InputLabel';

/**
 * Input message component for errors, success, warnings, and helper text
 */
const InputMessage = React.forwardRef<
  HTMLParagraphElement,
  {
    children: ReactNode;
    type?: 'default' | 'error' | 'success' | 'warning';
    className?: string;
    id?: string;
  }
>(({ children, type = 'default', className, id }, ref): React.ReactElement => {
  const messageClasses = {
    default: 'text-muted-foreground',
    error: 'text-destructive',
    success: 'text-success',
    warning: 'text-warning',
  };

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
}: {
  isVisible: boolean;
  onToggle: () => void;
}): React.ReactElement => (
  <button
    type="button"
    onClick={onToggle}
    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
    aria-label={isVisible ? 'Hide password' : 'Show password'}
  >
    {isVisible ? '🙈' : '👁️'}
  </button>
);

// =============================================================================
// COMPONENT VARIANTS
// =============================================================================

const inputVariants = (props: { variant?: string; size?: string }): string => {
  const { variant = 'default', size = 'md' } = props;

  const baseClasses = [
    'flex w-full rounded-md border border-input bg-background px-3 py-2',
    'text-sm ring-offset-background file:border-0 file:bg-transparent',
    'file:text-sm file:font-medium placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  ];

  const variantClasses = {
    default: 'border-input',
    error: 'border-destructive focus-visible:ring-destructive',
    success: 'border-success focus-visible:ring-success',
    warning: 'border-warning focus-visible:ring-warning',
  };

  const sizeClasses = {
    sm: 'h-9 px-2 text-xs',
    md: 'h-10 px-3 text-sm',
    lg: 'h-11 px-4 text-base',
  };

  return cn(
    baseClasses,
    variantClasses[variant as keyof typeof variantClasses],
    sizeClasses[size as keyof typeof sizeClasses]
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      type = 'text',
      label,
      helperText,
      error,
      success,
      warning,
      required = false,
      optional = false,
      startIcon,
      endIcon,
      unit,
      showPasswordToggle = false,
      containerClassName,
      labelClassName,
      helperTextClassName,
      className,
      maxLength,
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ): React.ReactElement => {
    // State management
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [currentValue, setCurrentValue] = useState(value || '');

    // Generate unique IDs
    const inputId = useMemo(() => `input-${Math.random().toString(36).substr(2, 9)}`, []);
    const helperTextId = useMemo(() => `helper-${inputId}`, [inputId]);
    const errorId = useMemo(() => `error-${inputId}`, [inputId]);
    const successId = useMemo(() => `success-${inputId}`, [inputId]);
    const warningId = useMemo(() => `warning-${inputId}`, [inputId]);

    // Determine input type
    const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

    // Determine variant based on state
    const computedVariant = error ? 'error' : success ? 'success' : warning ? 'warning' : variant;

    // Handle change events
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setCurrentValue(newValue);
        onChange?.(e);
      },
      [onChange]
    );

    // Character count logic
    const charCount = String(currentValue).length;
    const isOverLimit = maxLength ? charCount > maxLength : false;

    // Accessibility attributes
    const describedBy =
      [helperText && helperTextId, error && errorId, success && successId, warning && warningId]
        .filter(Boolean)
        .join(' ') || undefined;

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
            {...props}
          />

          {/* End elements */}
          {(endIcon || unit || (type === 'password' && showPasswordToggle)) && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {endIcon && <span className="text-muted-foreground">{endIcon}</span>}
              {unit && <span className="text-muted-foreground text-sm">{unit}</span>}
              {type === 'password' && showPasswordToggle && (
                <PasswordToggle
                  isVisible={isPasswordVisible}
                  onToggle={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
            </div>
          )}
        </InputWrapper>

        {/* Helper text */}
        {helperText && (
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

        {/* Character count */}
        {maxLength && (
          <div
            className={cn('text-xs', isOverLimit ? 'text-destructive' : 'text-muted-foreground')}
          >
            {charCount}/{maxLength}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// =============================================================================
// EXPORTS
// =============================================================================

export default Input;
export { InputLabel, InputMessage, InputWrapper, PasswordToggle };
