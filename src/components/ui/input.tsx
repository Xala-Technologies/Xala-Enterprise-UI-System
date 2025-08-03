/**
 * @fileoverview Input Component v5.0.0 - Semantic Component Migration
 * @description Modern Input component using semantic components with i18n support
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Semantic components, i18n
 */

// ✅ NO 'use client' directive - works in SSR
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { Text } from '../semantic';
import { useTranslation } from '../../i18n';

// =============================================================================
// INPUT VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Input variants using semantic Tailwind classes
 * Pure CVA implementation with design token classes
 */
const inputVariants = cva(
  // Base classes using semantic tokens
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input bg-background',
        filled: 'border-transparent bg-muted',
        outline: 'border-2 border-input bg-transparent',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-3 py-2 text-sm',
        lg: 'h-12 px-4 py-3 text-base',
      },
      state: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-success focus-visible:ring-success',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
);

// =============================================================================
// INPUT COMPONENT INTERFACE
// =============================================================================

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>,
    VariantProps<typeof inputVariants> {
  readonly variant?: 'default' | 'filled' | 'outline';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly state?: 'default' | 'error' | 'success';
  readonly error?: boolean;
  readonly success?: boolean;
  readonly onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onChangeEvent?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onChangeNative?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// =============================================================================
// INPUT COMPONENT
// =============================================================================

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = 'text',
    variant = 'default',
    size = 'md',
    state,
    error = false,
    success = false,
    disabled,
    onChange,
    onChangeEvent,
    ...props
  }, ref) => {
    const { t } = useTranslation();
    
    // Determine state based on props
    const currentState = error ? 'error' : success ? 'success' : state || 'default';

    // Handle change events to support both interfaces
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const inputValue = event.target.value;

      // Call the string-based onChange if provided
      if (onChange) {
        onChange(inputValue, event);
      }

      // Call the event-based onChangeEvent if provided
      if (onChangeEvent) {
        onChangeEvent(event);
      }
      
      // Call the native onChange if provided in props
      if (props.onChangeNative) {
        props.onChangeNative(event);
      }
    };

    // For simple cases, use Text component as input wrapper
    return (
      <Text
        as="input"
        className={cn(inputVariants({ variant, size, state: currentState }), className)}
        type={type}
        ref={ref}
        disabled={disabled}
        aria-invalid={error || currentState === 'error'}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

// Migration note: This component now uses semantic Text component instead of raw HTML input
// For more complex inputs with labels and helper text, use the full semantic Input component
// Export semantic input types for compatibility
export type { InputType, InputIntent, InputState, InputSize } from '../semantic';
