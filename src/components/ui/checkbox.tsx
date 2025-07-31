/**
 * @fileoverview SSR-Safe Checkbox Component - Production Strategy Implementation
 * @description Checkbox component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type InputHTMLAttributes } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Check icon component
 */
const CheckIcon = (): React.ReactElement => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Indeterminate icon component
 */
const IndeterminateIcon = (): React.ReactElement => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
    <path
      fillRule="evenodd"
      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Checkbox variant types
 */
export type CheckboxVariant = 'default' | 'destructive' | 'success' | 'warning';

/**
 * Checkbox size types
 */
export type CheckboxSize = 'sm' | 'default' | 'lg';

/**
 * Checkbox component props interface
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Checkbox variant */
  readonly variant?: CheckboxVariant;
  /** Checkbox size */
  readonly size?: CheckboxSize;
  /** Checkbox label */
  readonly label?: string;
  /** Additional description text */
  readonly description?: string;
  /** Error state */
  readonly error?: boolean;
  /** Error text to display */
  readonly errorText?: string;
  /** Indeterminate state */
  readonly indeterminate?: boolean;
  /** Whether checkbox is required */
  readonly required?: boolean;
}

/**
 * Checkbox component
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant = 'default',
      size = 'default',
      label,
      description,
      error,
      errorText,
      indeterminate = false,
      required,
      checked,
      disabled,
      id,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { colors, spacing, typography, getToken } = useTokens();
    
    // Get border radius
    const borderRadius = {
      sm: (getToken('borderRadius.sm') as string) || '0.125rem',
    };
    
    // Size mappings
    const sizeMap = {
      sm: { width: '12px', height: '12px' },
      default: { width: '16px', height: '16px' },
      lg: { width: '20px', height: '20px' },
    };
    
    // Get variant colors
    const getVariantColors = (): { borderColor: string; backgroundColor: string; color: string } => {
      const isChecked = checked || indeterminate;
      
      const actualVariant = error || errorText ? 'destructive' : variant;
      switch (actualVariant) {
        case 'destructive':
          return {
            borderColor: isChecked ? (colors.danger?.[500] || '#ef4444') : (colors.danger?.[300] || '#fca5a5'),
            backgroundColor: isChecked ? (colors.danger?.[500] || '#ef4444') : 'transparent',
            color: isChecked ? (colors.background?.default || '#ffffff') : 'currentColor',
          };
        case 'success':
          return {
            borderColor: isChecked ? (colors.success?.[500] || '#22c55e') : (colors.success?.[300] || '#86efac'),
            backgroundColor: isChecked ? (colors.success?.[500] || '#22c55e') : 'transparent',
            color: isChecked ? (colors.background?.default || '#ffffff') : 'currentColor',
          };
        case 'warning':
          return {
            borderColor: isChecked ? (colors.warning?.[500] || '#f59e0b') : (colors.warning?.[300] || '#fcd34d'),
            backgroundColor: isChecked ? (colors.warning?.[500] || '#f59e0b') : 'transparent',
            color: isChecked ? (colors.background?.default || '#ffffff') : 'currentColor',
          };
        default:
          return {
            borderColor: isChecked ? (colors.primary?.[500] || '#3b82f6') : (colors.border?.default || colors.neutral?.[300] || '#d1d5db'),
            backgroundColor: isChecked ? (colors.primary?.[500] || '#3b82f6') : 'transparent',
            color: isChecked ? (colors.background?.default || '#ffffff') : 'currentColor',
          };
      }
    };
    
    const variantColors = getVariantColors();
    
    // Checkbox styles
    const checkboxStyles: React.CSSProperties = {
      ...sizeMap[size],
      flexShrink: 0,
      borderRadius: borderRadius.sm,
      border: '1px solid',
      borderColor: variantColors.borderColor,
      backgroundColor: variantColors.backgroundColor,
      color: variantColors.color,
      transition: 'all 200ms ease-in-out',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      appearance: 'none',
      position: 'relative',
      outline: 'none',
      ...style,
    };
    // Generate ID if not provided and label exists
    const checkboxId =
      id || (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    // Determine actual variant based on state
    const actualVariant = error || errorText ? 'destructive' : variant;

    // Determine checkbox state for aria and styling
    const checkboxState = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked';

    const checkboxElement = (
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          id={checkboxId}
          ref={ref}
          type="checkbox"
          className={className}
          style={checkboxStyles}
          checked={checked}
          disabled={disabled}
          aria-invalid={error || !!errorText}
          aria-describedby={description || errorText ? `${checkboxId}-description` : undefined}
          aria-required={required}
          data-state={checkboxState}
          onFocus={(e) => {
            e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
            e.currentTarget.style.outlineOffset = '2px';
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
            props.onBlur?.(e);
          }}
          {...props}
        />

        {/* Visual indicator overlay */}
        <div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'currentColor',
            transition: 'opacity 200ms ease-in-out',
            ...sizeMap[size],
            opacity: checked || indeterminate ? 1 : 0,
          }}
        >
          {indeterminate ? (
            <IndeterminateIcon />
          ) : checked ? (
            <CheckIcon />
          ) : null}
        </div>
      </div>
    );

    if (!label && !description && !errorText) {
      return checkboxElement;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1.5] || '0.375rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing[3] }}>
          {checkboxElement}

          {label && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
              <label
                htmlFor={checkboxId}
                style={{
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                  lineHeight: typography.lineHeight.none,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  opacity: disabled ? 0.7 : 1,
                  color: error || errorText ? (colors.danger?.[500] || '#ef4444') : (colors.text?.primary || colors.neutral?.[900] || '#111827'),
                }}
              >
                {label}
                {required && (
                  <span style={{ color: colors.danger?.[500] || '#ef4444', marginLeft: spacing[1] }} aria-label="required">
                    *
                  </span>
                )}
              </label>

              {description && (
                <p id={`${checkboxId}-description`} style={{
                  fontSize: typography.fontSize.xs,
                  color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
                }}>
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {errorText && (
          <p id={`${checkboxId}-description`} style={{
            fontSize: typography.fontSize.xs,
            color: colors.danger?.[500] || '#ef4444',
            marginLeft: `calc(${spacing[4]} + ${spacing[3]})`,
          }}>
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

/**
 * Checkbox option interface for CheckboxGroup
 */
export interface CheckboxOption {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
  readonly disabled?: boolean;
}

/**
 * Checkbox Group component props interface
 */
export interface CheckboxGroupProps {
  readonly name: string;
  readonly options: CheckboxOption[];
  readonly value?: string[];
  readonly defaultValue?: string[];
  readonly onValueChange?: (_newValues: string[]) => void;
  readonly variant?: CheckboxProps['variant'];
  readonly size?: CheckboxProps['size'];
  readonly orientation?: 'horizontal' | 'vertical';
  readonly label?: string;
  readonly description?: string;
  readonly error?: boolean;
  readonly errorText?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly id?: string;
  readonly maxSelections?: number;
  readonly minSelections?: number;
}

/**
 * Checkbox Group component for managing multiple checkbox options
 */
export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      name,
      options,
      value,
      defaultValue,
      onValueChange,
      variant,
      size,
      orientation = 'vertical',
      label,
      description,
      error,
      errorText,
      required,
      disabled,
      className,
      id,
      maxSelections,
      minSelections,
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography } = useTokens();
    
    // Use value prop or defaultValue as controlled/uncontrolled values
    const selectedValues = value || defaultValue || [];

    // Generate ID if not provided and label exists
    const groupId =
      id || (label ? `checkbox-group-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const handleChange = (optionValue: string, checked: boolean): void => {
      let newValues: string[];

      if (checked) {
        // Add value if not already selected and within max limit
        if (!selectedValues.includes(optionValue)) {
          newValues = [...selectedValues, optionValue];

          // Check max selections limit
          if (maxSelections && newValues.length > maxSelections) {
            return; // Don't allow selection beyond max
          }
        } else {
          return; // Already selected
        }
      } else {
        // Remove value
        newValues = selectedValues.filter(v => v !== optionValue);

        // Check min selections limit
        if (minSelections && newValues.length < minSelections) {
          return; // Don't allow deselection below min
        }
      }

      onValueChange?.(newValues);
    };

    const isSelectionLimitReached = maxSelections && selectedValues.length >= maxSelections;

    const groupElement = (
      <div
        ref={ref}
        role="group"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={description || errorText ? `${groupId}-description` : undefined}
        aria-invalid={error || !!errorText}
        aria-required={required}
        style={{
          display: 'flex',
          ...(orientation === 'vertical' ? {
            flexDirection: 'column' as const,
            gap: spacing[3],
          } : {
            flexDirection: 'row' as const,
            flexWrap: 'wrap' as const,
            gap: spacing[6],
          }),
        }}
        className={className}
      >
        {options.map(option => {
          const isSelected = selectedValues.includes(option.value);
          const isOptionDisabled =
            disabled || option.disabled || (!isSelected && Boolean(isSelectionLimitReached));

          return (
            <Checkbox
              key={option.value}
              name={name}
              checked={isSelected}
              onChange={e => handleChange(option.value, e.target.checked)}
              variant={variant}
              size={size}
              label={option.label}
              description={option.description}
              disabled={isOptionDisabled}
              error={error && !isSelected && required}
            />
          );
        })}
      </div>
    );

    // If label or description provided, wrap in a fieldset
    if (label || description || errorText) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
          {label && (
            <label
              id={`${groupId}-label`}
              style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                lineHeight: typography.lineHeight.none,
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.7 : 1,
                color: error ? (colors.danger?.[500] || '#ef4444') : (colors.text?.primary || colors.neutral?.[900] || '#111827'),
              }}
            >
              {label}
              {required && <span style={{ color: colors.danger?.[500] || '#ef4444', marginLeft: spacing[1] }}>*</span>}
            </label>
          )}

          {groupElement}

          {description && !errorText && (
            <p id={`${groupId}-description`} style={{
              fontSize: typography.fontSize.xs,
              color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
            }}>
              {description}
            </p>
          )}

          {errorText && (
            <p id={`${groupId}-description`} style={{
              fontSize: typography.fontSize.xs,
              color: colors.danger?.[500] || '#ef4444',
            }}>
              {errorText}
            </p>
          )}
        </div>
      );
    }

    return groupElement;
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';

