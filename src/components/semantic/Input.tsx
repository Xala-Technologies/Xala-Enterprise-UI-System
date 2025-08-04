/**
 * @fileoverview Semantic Input Component v5.0.0 - Complete Form Input Abstraction
 * @description Semantic input component with proper labeling and accessibility
 * @version 5.0.0
 * @compliance WCAG AAA, SSR-Safe, Framework-agnostic, Norwegian compliance, Form standards
 */

import React, { forwardRef, useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// SEMANTIC INPUT TYPES
// =============================================================================

/**
 * HTML input types that Input can represent
 */
export type InputType = 
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'url'
  | 'search'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'file'
  | 'hidden';

/**
 * Input semantic intents
 */
export type InputIntent = 
  | 'default'
  | 'search'
  | 'email'
  | 'password'
  | 'phone'
  | 'url'
  | 'number'
  | 'date'
  | 'file';

/**
 * Input validation states
 */
export type InputState = 'default' | 'error' | 'success' | 'warning';

/**
 * Input sizes (touch-friendly)
 */
export type InputSize = 'sm' | 'md' | 'lg' | 'xl';

// =============================================================================
// INPUT VARIANTS USING CVA AND DESIGN TOKENS
// =============================================================================

const inputVariants = cva(
  // Base classes using design tokens - WCAG AAA compliant
  'flex w-full rounded-md border bg-background px-3 py-2 text-sm transition-all duration-200 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      // Validation states
      state: {
        default: 'border-input hover:border-input/80 focus:border-primary',
        error: 'border-destructive hover:border-destructive/80 focus:border-destructive focus-visible:ring-destructive',
        success: 'border-success hover:border-success/80 focus:border-success focus-visible:ring-success',
        warning: 'border-warning hover:border-warning/80 focus:border-warning focus-visible:ring-warning',
      },
      
      // Touch-friendly sizes (WCAG AAA minimum 44px)
      size: {
        sm: 'h-9 text-sm',    // 36px - Compact
        md: 'h-11 text-sm',   // 44px - WCAG minimum
        lg: 'h-12 text-base', // 48px - Comfortable
        xl: 'h-14 text-lg',   // 56px - Large
      },
      
      // Input-specific styling
      variant: {
        default: '',
        filled: 'bg-muted border-muted',
        outline: 'border-2',
        ghost: 'border-transparent bg-transparent hover:bg-accent focus:bg-background',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'md',
      variant: 'default',
    },
  }
);

// Label variants
const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      state: {
        default: 'text-foreground',
        error: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
      },
      required: {
        true: "after:content-['*'] after:ml-0.5 after:text-destructive",
        false: '',
      },
    },
    defaultVariants: {
      state: 'default',
      required: false,
    },
  }
);

// Helper text variants
const helperTextVariants = cva(
  'text-xs mt-1.5',
  {
    variants: {
      state: {
        default: 'text-muted-foreground',
        error: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

// =============================================================================
// INPUT COMPONENT INTERFACE
// =============================================================================

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>,
    VariantProps<typeof inputVariants> {
  /** Input semantic intent */
  readonly intent?: InputIntent;
  /** Label text */
  readonly label?: string;
  /** Helper text */
  readonly helperText?: string;
  /** Error message */
  readonly errorMessage?: string;
  /** Success message */
  readonly successMessage?: string;
  /** Warning message */
  readonly warningMessage?: string;
  /** Validation state */
  readonly state?: InputState;
  /** Whether the field is required */
  readonly required?: boolean;
  /** Hide the label visually but keep it for screen readers */
  readonly labelHidden?: boolean;
  /** Prefix element/icon */
  readonly prefix?: React.ReactNode;
  /** Suffix element/icon */
  readonly suffix?: React.ReactNode;
  /** Container class name */
  readonly containerClassName?: string;
  /** Label class name */
  readonly labelClassName?: string;
  /** Language code for i18n */
  readonly lang?: string;
  /** Norwegian compliance classification */
  readonly nsmLevel?: 'OPEN' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';
  /** Auto-complete suggestions */
  readonly autoComplete?: string;
  /** Input mode for mobile keyboards */
  readonly inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
}

// =============================================================================
// SEMANTIC INPUT COMPONENT
// =============================================================================

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      intent = 'default',
      label,
      helperText,
      errorMessage,
      successMessage,
      warningMessage,
      state = 'default',
      size = 'md',
      variant = 'default',
      required = false,
      labelHidden = false,
      prefix,
      suffix,
      containerClassName,
      labelClassName,
      lang,
      nsmLevel,
      autoComplete,
      inputMode,
      type = 'text',
      id,
      className,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const helperTextId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const successId = `${inputId}-success`;
    const warningId = `${inputId}-warning`;

    // Auto-configure based on intent
    const getIntentConfig = () => {
      if (!intent || intent === 'default') return {};
      
      const configs: Record<InputIntent, Partial<InputProps>> = {
        default: {},
        search: {
          type: 'search',
          inputMode: 'search',
          autoComplete: 'off',
        },
        email: {
          type: 'email',
          inputMode: 'email',
          autoComplete: 'email',
        },
        password: {
          type: 'password',
          autoComplete: 'current-password',
        },
        phone: {
          type: 'tel',
          inputMode: 'tel',
          autoComplete: 'tel',
        },
        url: {
          type: 'url',
          inputMode: 'url',
          autoComplete: 'url',
        },
        number: {
          type: 'number',
          inputMode: 'numeric',
        },
        date: {
          type: 'date',
        },
        file: {
          type: 'file',
        },
      };
      
      return configs[intent] || {};
    };

    // Determine current state based on messages
    const getCurrentState = (): InputState => {
      if (errorMessage) return 'error';
      if (successMessage) return 'success';
      if (warningMessage) return 'warning';
      return state;
    };

    // Get helper text based on current state
    const getCurrentHelperText = () => {
      const currentState = getCurrentState();
      switch (currentState) {
        case 'error':
          return errorMessage;
        case 'success':
          return successMessage;
        case 'warning':
          return warningMessage;
        default:
          return helperText;
      }
    };

    // Build aria-describedby
    const buildAriaDescribedBy = () => {
      const describedByIds: string[] = [];
      
      if (ariaDescribedBy) {
        describedByIds.push(ariaDescribedBy);
      }
      
      const currentState = getCurrentState();
      switch (currentState) {
        case 'error':
          if (errorMessage) describedByIds.push(errorId);
          break;
        case 'success':
          if (successMessage) describedByIds.push(successId);
          break;
        case 'warning':
          if (warningMessage) describedByIds.push(warningId);
          break;
        default:
          if (helperText) describedByIds.push(helperTextId);
          break;
      }
      
      return describedByIds.join(' ') || undefined;
    };

    // Enhanced accessibility attributes
    const getAccessibilityAttributes = () => {
      const attributes: Record<string, any> = {};
      const currentState = getCurrentState();
      
      if (required) {
        attributes['aria-required'] = true;
      }
      
      if (currentState === 'error') {
        attributes['aria-invalid'] = true;
      }
      
      if (lang) {
        attributes.lang = lang;
      }
      
      // Add Norwegian compliance data attribute if specified
      if (nsmLevel) {
        attributes['data-nsm-level'] = nsmLevel;
      }
      
      return attributes;
    };

    const intentConfig = getIntentConfig();
    const currentState = getCurrentState();
    const currentHelperText = getCurrentHelperText();
    const finalAriaDescribedBy = buildAriaDescribedBy();
    const accessibilityAttributes = getAccessibilityAttributes();

    // Input wrapper for prefix/suffix
    const inputElement = (
      <div className="relative flex items-center">
        {prefix && (
          <div className="absolute left-3 z-10 flex items-center text-muted-foreground">
            {prefix}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={intentConfig.type || type}
          inputMode={intentConfig.inputMode || inputMode}
          autoComplete={intentConfig.autoComplete || autoComplete}
          className={cn(
            inputVariants({ state: currentState, size, variant }),
            prefix && 'pl-10',
            suffix && 'pr-10',
            className
          )}
          aria-describedby={finalAriaDescribedBy}
          {...accessibilityAttributes}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 z-10 flex items-center text-muted-foreground">
            {suffix}
          </div>
        )}
      </div>
    );

    // Return input only if no label or helper text
    if (!label && !currentHelperText) {
      return inputElement;
    }

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              labelVariants({ state: currentState, required }),
              labelHidden && 'sr-only',
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        
        {inputElement}
        
        {currentHelperText && (
          <p
            id={
              currentState === 'error' ? errorId :
              currentState === 'success' ? successId :
              currentState === 'warning' ? warningId :
              helperTextId
            }
            className={helperTextVariants({ state: currentState })}
            role={currentState === 'error' ? 'alert' : undefined}
          >
            {currentHelperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// =============================================================================
// SEMANTIC INPUT VARIANTS FOR CONVENIENCE
// =============================================================================

/**
 * Search Input component
 */
export const SearchInput = forwardRef<HTMLInputElement, Omit<InputProps, 'intent'>>(
  (props, ref) => <Input ref={ref} intent="search" {...props} />
);
SearchInput.displayName = 'SearchInput';

/**
 * Email Input component
 */
export const EmailInput = forwardRef<HTMLInputElement, Omit<InputProps, 'intent'>>(
  (props, ref) => <Input ref={ref} intent="email" {...props} />
);
EmailInput.displayName = 'EmailInput';

/**
 * Password Input component
 */
export const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, 'intent'>>(
  (props, ref) => <Input ref={ref} intent="password" {...props} />
);
PasswordInput.displayName = 'PasswordInput';

/**
 * Phone Input component
 */
export const PhoneInput = forwardRef<HTMLInputElement, Omit<InputProps, 'intent'>>(
  (props, ref) => <Input ref={ref} intent="phone" {...props} />
);
PhoneInput.displayName = 'PhoneInput';

/**
 * Number Input component
 */
export const NumberInput = forwardRef<HTMLInputElement, Omit<InputProps, 'intent'>>(
  (props, ref) => <Input ref={ref} intent="number" {...props} />
);
NumberInput.displayName = 'NumberInput';

/**
 * Date Input component
 */
export const DateInput = forwardRef<HTMLInputElement, Omit<InputProps, 'intent'>>(
  (props, ref) => <Input ref={ref} intent="date" {...props} />
);
DateInput.displayName = 'DateInput';

/**
 * File Input component
 */
export const FileInput = forwardRef<HTMLInputElement, Omit<InputProps, 'intent'>>(
  (props, ref) => <Input ref={ref} intent="file" {...props} />
);
FileInput.displayName = 'FileInput';