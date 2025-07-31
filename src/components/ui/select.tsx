/**
 * @fileoverview SSR-Safe Select Component - Production Strategy Implementation
 * @description Select component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type SelectHTMLAttributes } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Chevron down icon component
 */
const ChevronDownIcon = (): React.ReactElement => (
  <svg style={{ height: '16px', width: '16px' }} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Select option interface
 */
export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
  readonly group?: string;
}

/**
 * Select variant types
 */
export type SelectVariant = 'default' | 'destructive' | 'success' | 'warning';

/**
 * Select size types
 */
export type SelectSize = 'sm' | 'default' | 'lg';

/**
 * Select component props interface
 */
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  readonly options: SelectOption[];
  readonly placeholder?: string;
  readonly label?: string;
  readonly helperText?: string;
  readonly errorText?: string;
  readonly successText?: string;
  readonly required?: boolean;
  readonly error?: boolean;
  readonly success?: boolean;
  readonly allowEmpty?: boolean;
  readonly emptyLabel?: string;
  readonly variant?: SelectVariant;
  readonly size?: SelectSize;
  onValueChange?: (value: string, event?: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * Group options by group property - pure function
 */
const getGroupedOptions = (options: SelectOption[]): Record<string, SelectOption[]> => {
  const groups: Record<string, SelectOption[]> = {};

  options.forEach(option => {
    const groupName = option.group || '';
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(option);
  });

  return groups;
};

/**
 * Enhanced Select component with token-based styling
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      style,
      variant = 'default',
      size = 'default',
      options,
      placeholder,
      label,
      helperText,
      errorText,
      successText,
      required,
      error,
      success,
      allowEmpty = true,
      emptyLabel = 'Select an option...',
      id,
      onValueChange,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography, getToken } = useTokens();
    
    // Generate ID if not provided and label exists
    const selectId =
      id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    // Determine actual variant based on state
    const actualVariant =
      error || errorText ? 'destructive' : success || successText ? 'success' : variant;

    // Helper text to display
    const displayHelperText = errorText || successText || helperText;

    // Group options by group property
    const groupedOptions = getGroupedOptions(options);

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
            paddingLeft: spacing[3],
            paddingRight: spacing[8],
            paddingTop: spacing[1],
            paddingBottom: spacing[1],
            fontSize: typography.fontSize.xs,
          };
        case 'lg':
          return {
            height: '48px',
            paddingLeft: spacing[4],
            paddingRight: spacing[12],
            paddingTop: spacing[3],
            paddingBottom: spacing[3],
            fontSize: typography.fontSize.base,
          };
        default:
          return {
            height: '40px',
            paddingLeft: spacing[3],
            paddingRight: spacing[10],
            paddingTop: spacing[2],
            paddingBottom: spacing[2],
            fontSize: typography.fontSize.sm,
          };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (actualVariant) {
        case 'destructive':
          return {
            borderColor: colors.danger?.[500] || '#ef4444',
            color: colors.danger?.[500] || '#ef4444',
          };
        case 'success':
          return {
            borderColor: colors.success?.[500] || '#22c55e',
            color: colors.text?.primary || colors.neutral?.[900] || '#111827',
          };
        case 'warning':
          return {
            borderColor: colors.warning?.[500] || '#f59e0b',
            color: colors.text?.primary || colors.neutral?.[900] || '#111827',
          };
        default:
          return {
            borderColor: colors.border?.default || colors.neutral?.[200] || '#e5e7eb',
            color: colors.text?.primary || colors.neutral?.[900] || '#111827',
          };
      }
    };

    const sizeStyles = getSizeStyles();
    const variantStyles = getVariantStyles();

    // Select styles
    const selectStyles: React.CSSProperties = {
      display: 'flex',
      width: '100%',
      appearance: 'none',
      borderRadius: borderRadius.md,
      border: '1px solid',
      backgroundColor: colors.background?.default || '#ffffff',
      outline: 'none',
      cursor: 'pointer',
      transition: 'all 150ms ease-in-out',
      ...sizeStyles,
      ...variantStyles,
      ...(props.disabled && {
        cursor: 'not-allowed',
        opacity: 0.5,
      }),
      ...style,
    };

    // Icon container styles
    const getIconContainerStyles = (): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        position: 'absolute',
        right: 0,
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
      };

      switch (size) {
        case 'sm':
          return { ...baseStyles, height: '32px', width: '32px' };
        case 'lg':
          return { ...baseStyles, height: '48px', width: '48px' };
        default:
          return { ...baseStyles, height: '40px', width: '40px' };
      }
    };

    // Label styles
    const labelStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.none,
      color: error || errorText 
        ? (colors.danger?.[500] || '#ef4444')
        : success || successText
        ? (colors.success?.[600] || '#16a34a')
        : (colors.text?.primary || colors.neutral?.[900] || '#111827'),
    };

    // Helper text styles
    const helperTextStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: error || errorText 
        ? (colors.danger?.[500] || '#ef4444') 
        : success || successText
        ? (colors.success?.[600] || '#16a34a')
        : (colors.text?.secondary || colors.neutral?.[500] || '#6b7280'),
    };

    // Required indicator styles
    const requiredStyles: React.CSSProperties = {
      marginLeft: spacing[1],
      color: colors.danger?.[500] || '#ef4444',
    };

    const selectElement = (
      <div style={{ position: 'relative' }}>
        <select
          id={selectId}
          ref={ref}
          className={className}
          style={selectStyles}
          aria-invalid={error || !!errorText}
          aria-describedby={displayHelperText ? `${selectId}-helper` : undefined}
          aria-required={required}
          onChange={e => {
            onValueChange?.(e.target.value, e);
            if (props.onChange) props.onChange(e);
          }}
          onFocus={(e) => {
            if (!props.disabled) {
              switch (actualVariant) {
                case 'destructive':
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
        >
          {allowEmpty && (
            <option value="" disabled={required}>
              {placeholder || emptyLabel}
            </option>
          )}

          {Object.entries(groupedOptions).map(([groupName, groupOptions]) => {
            if (groupName) {
              return (
                <optgroup key={groupName} label={groupName}>
                  {groupOptions.map(option => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              );
            } else {
              return groupOptions.map(option => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ));
            }
          })}
        </select>

        {/* Chevron icon */}
        <div style={getIconContainerStyles()}>
          <ChevronDownIcon />
        </div>
      </div>
    );

    if (!label && !displayHelperText) {
      return selectElement;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1.5] }}>
        {label && (
          <label
            htmlFor={selectId}
            style={labelStyles}
          >
            {label}
            {required && (
              <span style={requiredStyles} aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {selectElement}

        {displayHelperText && (
          <p
            id={`${selectId}-helper`}
            style={helperTextStyles}
          >
            {displayHelperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
