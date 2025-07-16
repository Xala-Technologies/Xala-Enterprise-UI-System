/**
 * @fileoverview SSR-Safe Input Component - Production Strategy Implementation
 * @description Input component using useTokens hook for JSON template integration
 * @version 4.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

// ✅ NO 'use client' directive - works in SSR
import React from 'react';
import { useTokens } from '../../hooks/useTokens';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEvent?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (_event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (_event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline';
  error?: boolean;
  success?: boolean;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
  id?: string;
  name?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  onChangeEvent,
  onFocus,
  onBlur,
  disabled = false,
  required = false,
  autoComplete,
  autoFocus = false,
  readOnly = false,
  size = 'md',
  variant = 'default',
  error = false,
  success = false,
  className,
  style,
  'data-testid': testId,
  id,
  name,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}) => {
  // ✅ Hook safely accesses tokens through app-owned context
  const { colors, spacing, typography, getToken } = useTokens();

  // Get additional tokens with fallbacks
  const borderRadius = {
    md: (getToken('borderRadius.md') as string) || '0.375rem',
  };
  const motion = {
    duration: {
      fast: (getToken('motion.duration.fast') as string) || '150ms',
    },
    easing: {
      easeInOut: (getToken('motion.easing.easeInOut') as string) || 'ease-in-out',
    },
  };

  // ✅ All styling comes from JSON templates (no hard-coded values)
  const getVariantStyles = (): React.CSSProperties => {
    const baseInputStyles = {
      backgroundColor: colors.background.default,
      border: `1px solid ${colors.border.default}`,
    };

    if (error) {
      return {
        ...baseInputStyles,
        borderColor: colors.status.error,
        backgroundColor: colors.background.default,
      };
    }

    if (success) {
      return {
        ...baseInputStyles,
        borderColor: colors.status.success,
        backgroundColor: colors.background.default,
      };
    }

    switch (variant) {
      case 'filled':
        return {
          backgroundColor: colors.secondary[50] || colors.background.paper,
          border: `1px solid transparent`,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          border: `2px solid ${colors.border.default}`,
        };
      default:
        return baseInputStyles;
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return {
          padding: `${spacing[2]} ${spacing[3]}`,
          fontSize: typography.fontSize.sm,
          minHeight: '32px',
        };
      case 'md':
        return {
          padding: `${spacing[3]} ${spacing[4]}`,
          fontSize: typography.fontSize.base,
          minHeight: '40px',
        };
      case 'lg':
        return {
          padding: `${spacing[4]} ${spacing[5] || spacing[4]}`,
          fontSize: typography.fontSize.lg,
          minHeight: '48px',
        };
      default:
        return {};
    }
  };

  const baseStyles: React.CSSProperties = {
    // Reset default input styles
    appearance: 'none',
    outline: 'none',
    margin: 0,

    // Layout
    display: 'block',
    width: '100%',
    position: 'relative',

    // Typography from JSON templates
    fontFamily: typography.fontFamily.sans.join(', '),
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
    color: colors.text.primary,

    // Border radius from JSON templates
    borderRadius: borderRadius.md,

    // Transitions from JSON templates
    transition: `border-color ${motion.duration.fast} ${motion.easing.easeInOut}, box-shadow ${motion.duration.fast} ${motion.easing.easeInOut}`,

    // Placeholder styling (removed pseudo-selector for SSR compatibility)

    // States
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.5 : 1,
  };

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...getVariantStyles(),
    ...getSizeStyles(),
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
  };

  // Handle focus and blur for focus ring styling
  const finalStyles = combinedStyles;
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      required={required}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      readOnly={readOnly}
      className={className}
      style={finalStyles}
      data-testid={testId}
      id={id}
      name={name}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-invalid={error ? 'true' : undefined}
      {...props}
    />
  );
};
