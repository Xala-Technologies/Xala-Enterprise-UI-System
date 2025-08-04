/**
 * @fileoverview SSR-Safe DatePicker Component - Production Strategy Implementation
 * @description Date picker component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type InputHTMLAttributes } from 'react';
import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput, List, ListItem, Link } from '../semantic';

/**
 * DatePicker variant types
 */
export type DatePickerVariant = 'default' | 'outline' | 'filled';

/**
 * DatePicker size types
 */
export type DatePickerSize = 'sm' | 'md' | 'lg';

/**
 * DatePicker state types
 */
export type DatePickerState = 'default' | 'error' | 'success' | 'warning';

/**
 * DatePicker props interface
 */
export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
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
  /** Input styling variant */
  readonly variant?: DatePickerVariant;
  /** Input size */
  readonly size?: DatePickerSize;
  /** Input state */
  readonly state?: DatePickerState;
}

/**
 * Enhanced DatePicker component with Norwegian locale support
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      style,
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

    // Get border radius
    const borderRadius = {
      md: '0.375rem',
    };

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            height: '32px',
            padding: '0.5rem 0.75rem',
            fontSize: '0.75rem',
          };
        case 'lg':
          return {
            height: '48px',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
          };
        default:
          return {
            height: '40px',
            padding: '0.625rem 0.875rem',
            fontSize: '0.875rem',
          };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'outline':
          return {
            backgroundColor: '#ffffff',
            border: '2px solid #e5e7eb'
          };
        case 'filled':
          return {
            backgroundColor: '#f3f4f6',
            border: '1px solid transparent'
          };
        default:
          return {
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb'
          };
      }
    };

    // State styles
    const getStateStyles = (): React.CSSProperties => {
      switch (currentState) {
        case 'error':
          return {
            borderColor: '#ef4444',
          };
        case 'success':
          return {
            borderColor: '#22c55e',
          };
        case 'warning':
          return {
            borderColor: '#f59e0b',
          };
        default:
          return {};
      }
    };

    // Container styles
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      ...style,
    };

    // Input styles
    const inputStyles: React.CSSProperties = {
      display: 'flex',
      width: '100%',
      borderRadius: borderRadius.md,
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: '400',
      color: '#111827',
      transition: 'all 150ms ease-in-out',
      outline: 'none',
      ...getSizeStyles(),
      ...getVariantStyles(),
      ...getStateStyles(),
    };

    // Label styles
    const labelStyles: React.CSSProperties = {
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1',
      color: hasError 
        ? '#ef4444'
        : '#111827',
    };

    // Required indicator styles
    const requiredStyles: React.CSSProperties = {
      marginLeft: '0.25rem',
      color: '#ef4444',
    };

    // Helper text styles
    const helperTextStyles: React.CSSProperties = {
      fontSize: '0.75rem',
      color: '#6b7280',
    };

    // Error text styles
    const errorTextStyles: React.CSSProperties = {
      fontSize: '0.75rem',
      color: '#ef4444',
    };

    return (
      <Box className={className}>
        {label && (
          <Text as="label"
            htmlFor={inputId}
           
          >
            {label}
            {required && <Text as="span">*</Text>}
          </Text>
        )}

        <input
          ref={ref}
          type="date"
          id={inputId}
         
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          onFocus={(e) => {
            if (currentState === 'error') {
              e.currentTarget.style.outline = `2px solid #ef4444`;
            } else if (currentState === 'success') {
              e.currentTarget.style.outline = `2px solid #ef4444`;
            } else if (currentState === 'warning') {
              e.currentTarget.style.outline = `2px solid #ef4444`;
            } else {
              e.currentTarget.style.outline = `2px solid #ef4444`;
            }
            e.currentTarget.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
          {...props}
        />

        {showFormatHint && !error && !helperText && (
          <Text>Format: dd.mm.åååå (norsk datoformat)</Text>
        )}

        {helperText && !error && (
          <Text id={`${inputId}-helper`}>
            {helperText}
          </Text>
        )}

        {error && (
          <Text id={`${inputId}-error`}>
            {error}
          </Text>
        )}
      </Box>
    );
  }
);

DatePicker.displayName = 'DatePicker';
