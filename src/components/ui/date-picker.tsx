/**
 * @fileoverview SSR-Safe DatePicker Component - Production Strategy Implementation
 * @description Date picker component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type InputHTMLAttributes } from 'react';
import { useTokens } from '../../hooks/useTokens';

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
    const { colors, spacing, typography, getToken } = useTokens();
    const inputId = props.id || 'date-picker';
    const hasError = Boolean(error) || state === 'error';
    const currentState = hasError ? 'error' : state;

    // Get border radius
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
    };

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            height: '32px',
            padding: `0 ${spacing[2]}`,
            fontSize: typography.fontSize.xs,
          };
        case 'lg':
          return {
            height: '48px',
            padding: `0 ${spacing[4]}`,
            fontSize: typography.fontSize.base,
          };
        default:
          return {
            height: '40px',
            padding: `0 ${spacing[3]}`,
            fontSize: typography.fontSize.sm,
          };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'outline':
          return {
            backgroundColor: colors.background?.default || '#ffffff',
            border: `2px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
          };
        case 'filled':
          return {
            backgroundColor: colors.neutral?.[100] || '#f3f4f6',
            border: `1px solid ${colors.neutral?.[100] || '#f3f4f6'}`,
          };
        default:
          return {
            backgroundColor: colors.background?.default || '#ffffff',
            border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
          };
      }
    };

    // State styles
    const getStateStyles = (): React.CSSProperties => {
      switch (currentState) {
        case 'error':
          return {
            borderColor: colors.danger?.[500] || '#ef4444',
          };
        case 'success':
          return {
            borderColor: colors.success?.[500] || '#22c55e',
          };
        case 'warning':
          return {
            borderColor: colors.warning?.[500] || '#f59e0b',
          };
        default:
          return {};
      }
    };

    // Container styles
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[2],
      ...style,
    };

    // Input styles
    const inputStyles: React.CSSProperties = {
      display: 'flex',
      width: '100%',
      borderRadius: borderRadius.md,
      fontFamily: typography.fontFamily.sans.join(', '),
      fontWeight: typography.fontWeight.normal,
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
      transition: 'all 150ms ease-in-out',
      outline: 'none',
      ...getSizeStyles(),
      ...getVariantStyles(),
      ...getStateStyles(),
    };

    // Label styles
    const labelStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.none,
      color: hasError 
        ? colors.danger?.[500] || '#ef4444'
        : colors.text?.primary || colors.neutral?.[900] || '#111827',
    };

    // Required indicator styles
    const requiredStyles: React.CSSProperties = {
      marginLeft: spacing[1],
      color: colors.danger?.[500] || '#ef4444',
    };

    // Helper text styles
    const helperTextStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
    };

    // Error text styles
    const errorTextStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: colors.danger?.[500] || '#ef4444',
    };

    return (
      <div className={className} style={containerStyles}>
        {label && (
          <label
            htmlFor={inputId}
            style={labelStyles}
          >
            {label}
            {required && <span style={requiredStyles}>*</span>}
          </label>
        )}

        <input
          ref={ref}
          type="date"
          id={inputId}
          style={inputStyles}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          onFocus={(e) => {
            if (currentState === 'error') {
              e.currentTarget.style.outline = `2px solid ${colors.danger?.[500] || '#ef4444'}`;
            } else if (currentState === 'success') {
              e.currentTarget.style.outline = `2px solid ${colors.success?.[500] || '#22c55e'}`;
            } else if (currentState === 'warning') {
              e.currentTarget.style.outline = `2px solid ${colors.warning?.[500] || '#f59e0b'}`;
            } else {
              e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
            }
            e.currentTarget.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
          {...props}
        />

        {showFormatHint && !error && !helperText && (
          <p style={helperTextStyles}>Format: dd.mm.åååå (norsk datoformat)</p>
        )}

        {helperText && !error && (
          <p id={`${inputId}-helper`} style={helperTextStyles}>
            {helperText}
          </p>
        )}

        {error && (
          <p id={`${inputId}-error`} style={errorTextStyles}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
