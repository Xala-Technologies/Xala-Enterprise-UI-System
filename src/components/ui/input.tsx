/**
 * @fileoverview Input Component v5.0.0 - Token-Based Design System
 * @description Modern Input component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

// ✅ NO 'use client' directive - works in SSR
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// INPUT VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Input variants using token-based styling
 * Combines CVA with runtime token access for maximum flexibility
 */
const inputVariants = cva(
  // Base classes - framework-agnostic styling
  'flex w-full border transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        filled: '',
        outline: '',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
      state: {
        default: '',
        error: '',
        success: '',
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
    style,
    ...props
  }, ref) => {
    // ✅ Access design tokens for complete styling control
    const { colors, spacing, typography, getToken } = useTokens();
    
    // Determine state based on props
    const currentState = error ? 'error' : success ? 'success' : state || 'default';
    
    // Get token-based styles for variant
    const getVariantStyles = (): React.CSSProperties => {
      const baseStyles = {
        backgroundColor: colors.background?.default || '#ffffff',
        color: colors.text?.primary || '#000000',
      };

      switch (variant) {
        case 'filled':
          return {
            ...baseStyles,
            backgroundColor: colors.secondary?.[50] || colors.background?.paper || '#f8f9fa',
            border: '1px solid transparent',
          };
        case 'outline':
          return {
            backgroundColor: 'transparent',
            color: colors.text?.primary || '#000000',
            border: `2px solid ${colors.border?.default || '#e5e7eb'}`,
          };
        default:
          return {
            ...baseStyles,
            border: `1px solid ${colors.border?.default || '#e5e7eb'}`,
          };
      }
    };

    // Get token-based styles for size
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            height: '32px',
            padding: `0 ${spacing?.[3] || '0.75rem'}`,
            fontSize: typography?.fontSize?.sm || '0.875rem',
            borderRadius: getToken('borderRadius.md') as string || '0.375rem',
          };
        case 'md':
          return {
            height: '40px',
            padding: `0 ${spacing?.[4] || '1rem'}`,
            fontSize: typography?.fontSize?.base || '1rem',
            borderRadius: getToken('borderRadius.md') as string || '0.375rem',
          };
        case 'lg':
          return {
            height: '48px', 
            padding: `0 ${spacing?.[4] || '1rem'}`,
            fontSize: typography?.fontSize?.lg || '1.125rem',
            borderRadius: getToken('borderRadius.md') as string || '0.375rem',
          };
        default:
          return {};
      }
    };

    // Get token-based styles for state
    const getStateStyles = (): React.CSSProperties => {
      switch (currentState) {
        case 'error':
          return {
            borderColor: colors.status?.error || '#ef4444',
            // Focus styles would need to be added via CSS classes or pseudo-selectors
          };
        case 'success':
          return {
            borderColor: colors.status?.success || '#10b981',
          };
        default:
          return {};
      }
    };
    
    // Base styles from tokens
    const baseStyles: React.CSSProperties = {
      // Reset
      appearance: 'none',
      outline: 'none',
      margin: 0,
      
      // Layout
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      
      // Typography
      fontFamily: typography?.fontFamily?.sans?.join(', ') || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: typography?.fontWeight?.normal || 400,
      lineHeight: typography?.lineHeight?.normal || 1.5,
      
      // Interaction
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? 0.5 : 1,
      
      // Transitions
      transition: 'border-color 150ms ease-in-out, box-shadow 150ms ease-in-out',
    };

    // Combine all styles
    const dynamicStyles: React.CSSProperties = {
      ...baseStyles,
      ...getVariantStyles(),
      ...getSizeStyles(),
      ...getStateStyles(),
      ...style,
    };

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

    return (
      <input
        className={cn(inputVariants({ variant, size, state: currentState }), className)}
        type={type}
        ref={ref}
        disabled={disabled}
        style={dynamicStyles}
        aria-invalid={error || currentState === 'error'}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
