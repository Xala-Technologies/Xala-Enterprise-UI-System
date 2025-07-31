/**
 * @fileoverview SSR-Safe TimePicker Component - Production Strategy Implementation
 * @description TimePicker component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Norwegian Enterprise Standards
 */

import React, { forwardRef, type InputHTMLAttributes } from 'react';
import { useTokens } from '../../hooks/useTokens';

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
    const { colors, spacing, typography, getToken } = useTokens();
    
    const inputId = props.id || 'time-picker';
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
            fontSize: typography.fontSize.xs,
          };
        case 'lg':
          return {
            height: '48px',
            fontSize: typography.fontSize.base,
          };
        default: // md
          return {
            height: '40px',
            fontSize: typography.fontSize.sm,
          };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'outline':
          return {
            border: '2px solid',
            borderColor: colors.border?.default || colors.neutral?.[200] || '#e5e7eb',
          };
        case 'filled':
          return {
            backgroundColor: colors.neutral?.[100] || '#f3f4f6',
            borderColor: colors.neutral?.[100] || '#f3f4f6',
          };
        default:
          return {
            borderColor: colors.border?.default || colors.neutral?.[200] || '#e5e7eb',
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

    const sizeStyles = getSizeStyles();
    const variantStyles = getVariantStyles();
    const stateStyles = getStateStyles();

    // Input styles
    const inputStyles: React.CSSProperties = {
      display: 'flex',
      width: '100%',
      borderRadius: borderRadius.md,
      border: '1px solid',
      backgroundColor: variant === 'filled' 
        ? (colors.neutral?.[100] || '#f3f4f6')
        : (colors.background?.default || '#ffffff'),
      paddingLeft: spacing[3],
      paddingRight: spacing[3],
      paddingTop: spacing[2],
      paddingBottom: spacing[2],
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
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
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.none,
      color: hasError 
        ? (colors.danger?.[500] || '#ef4444')
        : (colors.text?.primary || colors.neutral?.[900] || '#111827'),
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

    // Format hint styles
    const formatHintStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
    };

    // Required indicator styles
    const requiredStyles: React.CSSProperties = {
      marginLeft: spacing[1],
      color: colors.danger?.[500] || '#ef4444',
    };

    // Placeholder color
    const placeholderColor = colors.text?.secondary || colors.neutral?.[500] || '#6b7280';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
        {label && (
          <label htmlFor={inputId} style={labelStyles}>
            {label}
            {required && <span style={requiredStyles}>*</span>}
          </label>
        )}

        <>
          {/* CSS for placeholder styling */}
          <style dangerouslySetInnerHTML={{
            __html: `
              #${inputId}::placeholder {
                color: ${placeholderColor};
              }
            `
          }} />
          <input
            ref={ref}
            type="time"
            id={inputId}
            className={className}
            style={inputStyles}
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
                    e.currentTarget.style.outline = `2px solid ${colors.danger?.[500] || '#ef4444'}`;
                    break;
                  case 'success':
                    e.currentTarget.style.outline = `2px solid ${colors.success?.[500] || '#22c55e'}`;
                    break;
                  case 'warning':
                    e.currentTarget.style.outline = `2px solid ${colors.warning?.[500] || '#f59e0b'}`;
                    break;
                  default:
                    e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
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
        </>

        {showFormatHint && !error && !helperText && (
          <p style={formatHintStyles}>
            {use24Hour
              ? 'Format: tt:mm (24-timers format)'
              : 'Format: tt:mm AM/PM (12-timers format)'}
          </p>
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

TimePicker.displayName = 'TimePicker';
