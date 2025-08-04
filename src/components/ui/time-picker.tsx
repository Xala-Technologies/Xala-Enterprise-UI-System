/**
 * @fileoverview SSR-Safe TimePicker Component - Production Strategy Implementation
 * @description TimePicker component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Norwegian Enterprise Standards
 */

import React, { forwardRef, type InputHTMLAttributes } from 'react';
import { Box, Text } from '../semantic';

/**
 * TimePicker variant types
 */
export type TimePickerVariant = 'default' | 'outline' | 'filled';

/**
 * TimePicker size types
 */
export type TimePickerSize = 'sm' | 'md' | 'lg';

/**
 * TimePicker state types
 */
export type TimePickerState = 'default' | 'error' | 'success' | 'warning';

/**
 * TimePicker props interface
 */
export interface TimePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label for the time picker */
  readonly label?: string;
  /** Error message to display */
  readonly error?: string;
  /** Helper text */
  readonly helperText?: string;
  /** Required field indicator */
  readonly required?: boolean;
  /** Show Norwegian time format hint */
  readonly showFormatHint?: boolean;
  /** Use 24-hour format (default for Norwegian locale) */
  readonly use24Hour?: boolean;
  /** TimePicker variant */
  readonly variant?: TimePickerVariant;
  /** TimePicker size */
  readonly size?: TimePickerSize;
  /** TimePicker state */
  readonly state?: TimePickerState;
}

/**
 * Enhanced TimePicker component with token-based styling
 */
export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
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
      use24Hour = true,
      placeholder = 'tt:mm',
      ...props
    },
    ref
  ): React.ReactElement => {
        
    const inputId = props.id || 'time-picker';
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
            fontSize: '0.75rem',
          };
        case 'lg':
          return {
            height: '48px',
            fontSize: '1rem',
          };
        default: // md
          return {
            height: '40px',
            fontSize: '0.875rem',
          };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'outline':
          return {
            border: '2px solid',
            borderColor: '#e5e7eb',
          };
        case 'filled':
          return {
            backgroundColor: '#f3f4f6',
            borderColor: '#f3f4f6',
          };
        default:
          return {
            borderColor: '#e5e7eb',
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

    const sizeStyles = getSizeStyles();
    const variantStyles = getVariantStyles();
    const stateStyles = getStateStyles();

    // Input styles
    const inputStyles: React.CSSProperties = {
      display: 'flex',
      width: '100%',
      borderRadius: '0.375rem',
      border: '1px solid',
      backgroundColor: variant === 'filled' 
        ? ('#f3f4f6')
        : ('#ffffff'),
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      color: '#111827',
      outline: 'none',
      transition: 'all 150ms ease-in-out',
      ...(props.disabled && {
        cursor: 'not-allowed',
        opacity: 0.5,
      }),
      ...sizeStyles,
      ...variantStyles,
      ...stateStyles,
      ...style,
    };

    // Label styles
    const labelStyles: React.CSSProperties = {
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1',
      color: hasError 
        ? ('#ef4444')
        : ('#111827'),
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

    // Format hint styles
    const formatHintStyles: React.CSSProperties = {
      fontSize: '0.75rem',
      color: '#6b7280',
    };

    // Required indicator styles
    const requiredStyles: React.CSSProperties = {
      marginLeft: '0.25rem',
      color: '#ef4444',
    };

    // Placeholder color
    const placeholderColor = '#6b7280';

    return (
      <Box>
        {label && (
          <Text as="label" htmlFor={inputId}>
            {label}
            {required && <Text as="span">*</Text>}
          </Text>
        )}

        <Box>
          <input
            ref={ref}
            type="time"
            id={inputId}
            className={className}
           
            placeholder={placeholder}
            step={props.step || 300} // 5 minute steps by default
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            onFocus={(e) => {
              if (!props.disabled) {
                switch (currentState) {
                  case 'error':
                    e.currentTarget.style.outline = '2px solid var(--destructive)';
                    break;
                  case 'success':
                    e.currentTarget.style.outline = '2px solid var(--success)';
                    break;
                  case 'warning':
                    e.currentTarget.style.outline = '2px solid var(--warning)';
                    break;
                  default:
                    e.currentTarget.style.outline = '2px solid var(--primary)';
                    break;
                }
                e.currentTarget.style.outlineOffset = '2px';
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
            {...props}
          />
        </Box>

        {showFormatHint && !error && !helperText && (
          <Text>
            {use24Hour
              ? 'Format: tt:mm (24-timers format)'
              : 'Format: tt:mm AM/PM (12-timers format)'}
          </Text>
        )}

        {helperText && !error && (
          <Text id={-helper}>
            {helperText}
          </Text>
        )}

        {error && (
          <Text id={-error}>
            {error}
          </Text>
        )}
      </Box>
    );
  }
);

TimePicker.displayName = 'TimePicker';
