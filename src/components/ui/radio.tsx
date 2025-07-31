/**
 * @fileoverview SSR-Safe Radio Component - Production Strategy Implementation
 * @description Radio button components using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type InputHTMLAttributes } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Radio variant types
 */
export type RadioVariant = 'default' | 'destructive' | 'success' | 'warning';

/**
 * Radio size types
 */
export type RadioSize = 'sm' | 'default' | 'lg';

/**
 * Radio button icon component
 */
const RadioIcon = ({ size }: { size: RadioSize }): React.ReactElement => {
  const iconSize = (() => {
    switch (size) {
      case 'sm':
        return { width: '4px', height: '4px' };
      case 'lg':
        return { width: '10px', height: '10px' };
      default:
        return { width: '8px', height: '8px' };
    }
  })();

  return (
    <div 
      style={{
        ...iconSize,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
      }}
    />
  );
};

/**
 * Radio option interface
 */
export interface RadioOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
  readonly description?: string;
}

/**
 * Radio component props interface
 */
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  readonly label?: string;
  readonly description?: string;
  readonly error?: boolean;
  readonly errorText?: string;
  readonly required?: boolean;
  readonly variant?: RadioVariant;
  readonly size?: RadioSize;
}

/**
 * Radio Group component props interface
 */
export interface RadioGroupProps {
  readonly name: string;
  readonly options: RadioOption[];
  readonly value?: string;
  readonly defaultValue?: string;
  readonly onValueChange?: (value: string) => void;
  readonly variant?: RadioProps['variant'];
  readonly size?: RadioProps['size'];
  readonly orientation?: 'horizontal' | 'vertical';
  readonly label?: string;
  readonly description?: string;
  readonly error?: boolean;
  readonly errorText?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly id?: string;
}

/**
 * Enhanced Radio component with token-based styling
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      style,
      variant = 'default',
      size = 'default',
      label,
      description,
      error,
      errorText,
      required,
      checked = false,
      disabled,
      id,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography } = useTokens();

    // Generate ID if not provided and label exists
    const radioId = id || (label ? `radio-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    // Determine actual variant based on state
    const actualVariant = error || errorText ? 'destructive' : variant;

    // Determine radio state for aria and styling
    const radioState = checked ? 'checked' : 'unchecked';

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return { height: '12px', width: '12px' };
        case 'lg':
          return { height: '20px', width: '20px' };
        default:
          return { height: '16px', width: '16px' };
      }
    };

    // Variant styles
    const getVariantStyles = (): { border: string; background: string; color: string } => {
      switch (actualVariant) {
        case 'destructive':
          return {
            border: colors.danger?.[500] || '#ef4444',
            background: checked ? (colors.danger?.[500] || '#ef4444') : 'transparent',
            color: checked ? (colors.background?.default || '#ffffff') : (colors.danger?.[500] || '#ef4444'),
          };
        case 'success':
          return {
            border: colors.success?.[500] || '#22c55e',
            background: checked ? (colors.success?.[500] || '#22c55e') : 'transparent',
            color: checked ? (colors.background?.default || '#ffffff') : (colors.success?.[500] || '#22c55e'),
          };
        case 'warning':
          return {
            border: colors.warning?.[500] || '#f59e0b',
            background: checked ? (colors.warning?.[500] || '#f59e0b') : 'transparent',
            color: checked ? (colors.background?.default || '#ffffff') : (colors.warning?.[500] || '#f59e0b'),
          };
        default:
          return {
            border: colors.primary?.[500] || '#3b82f6',
            background: checked ? (colors.primary?.[500] || '#3b82f6') : 'transparent',
            color: checked ? (colors.background?.default || '#ffffff') : (colors.primary?.[500] || '#3b82f6'),
          };
      }
    };

    const sizeStyles = getSizeStyles();
    const variantStyles = getVariantStyles();

    // Radio button styles
    const radioButtonStyles: React.CSSProperties = {
      position: 'relative',
      aspectRatio: '1',
      borderRadius: '50%',
      border: `1px solid ${variantStyles.border}`,
      backgroundColor: variantStyles.background,
      color: variantStyles.color,
      transition: 'all 200ms ease-in-out',
      outline: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...sizeStyles,
      ...style,
    };

    // Container styles
    const containerStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    };

    // Input styles (hidden)
    const inputStyles: React.CSSProperties = {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: 0,
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: 0,
    };

    // Indicator container styles
    const indicatorStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    };

    // Label styles
    const labelStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.none,
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: error || errorText 
        ? (colors.danger?.[500] || '#ef4444')
        : (colors.text?.primary || colors.neutral?.[900] || '#111827'),
      opacity: disabled ? 0.7 : 1,
    };

    // Description styles
    const descriptionStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
    };

    // Error text styles
    const errorTextStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: colors.danger?.[500] || '#ef4444',
    };

    // Required indicator styles
    const requiredStyles: React.CSSProperties = {
      marginLeft: spacing[1],
      color: colors.danger?.[500] || '#ef4444',
    };

    const radioElement = (
      <div className={className} style={containerStyles}>
        <input
          id={radioId}
          ref={ref}
          type="radio"
          style={inputStyles}
          checked={checked}
          disabled={disabled}
          aria-invalid={error || !!errorText}
          aria-describedby={description || errorText ? `${radioId}-description` : undefined}
          aria-required={required}
          data-state={radioState}
          {...props}
        />

        {/* Visual radio button */}
        <div
          style={radioButtonStyles}
          data-state={radioState}
          onFocus={(e) => {
            if (!disabled) {
              e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
              e.currentTarget.style.outlineOffset = '2px';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
        >
          {/* Radio indicator */}
          {checked && (
            <div style={indicatorStyles}>
              <RadioIcon size={size} />
            </div>
          )}
        </div>
      </div>
    );

    if (!label && !description && !errorText) {
      return radioElement;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1.5] }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing[3] }}>
          {radioElement}

          {label && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
              <label htmlFor={radioId} style={labelStyles}>
                {label}
                {required && (
                  <span style={requiredStyles} aria-label="required">
                    *
                  </span>
                )}
              </label>

              {description && (
                <p id={`${radioId}-description`} style={descriptionStyles}>
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {errorText && (
          <p 
            id={`${radioId}-description`} 
            style={{
              ...errorTextStyles,
              marginLeft: `calc(${sizeStyles.width} + ${spacing[3]})`,
            }}
          >
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

/**
 * Enhanced RadioGroup component with token-based styling
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
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
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography } = useTokens();
    const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || '');

    // Generate ID if not provided and label exists
    const groupId =
      id || (label ? `radio-group-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleChange = (optionValue: string): void => {
      setSelectedValue(optionValue);
      onValueChange?.(optionValue);
    };

    // Group container styles
    const groupStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      gap: orientation === 'vertical' ? spacing[3] : spacing[6],
    };

    // Label styles
    const labelStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.none,
      color: error || errorText 
        ? (colors.danger?.[500] || '#ef4444')
        : (colors.text?.primary || colors.neutral?.[900] || '#111827'),
    };

    // Description styles
    const descriptionStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
    };

    // Error text styles
    const errorTextStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: colors.danger?.[500] || '#ef4444',
    };

    // Required indicator styles
    const requiredStyles: React.CSSProperties = {
      marginLeft: spacing[1],
      color: colors.danger?.[500] || '#ef4444',
    };

    const groupElement = (
      <div
        ref={ref}
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={description || errorText ? `${groupId}-description` : undefined}
        aria-invalid={error || !!errorText}
        aria-required={required}
        className={className}
        style={groupStyles}
      >
        {options.map(option => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
            disabled={disabled || option.disabled}
            label={option.label}
            description={option.description}
            variant={variant}
            size={size}
            error={error}
          />
        ))}
      </div>
    );

    if (!label && !description && !errorText) {
      return groupElement;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
        {label && (
          <label id={`${groupId}-label`} style={labelStyles}>
            {label}
            {required && (
              <span style={requiredStyles} aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {description && (
          <p id={`${groupId}-description`} style={descriptionStyles}>
            {description}
          </p>
        )}

        {groupElement}

        {errorText && (
          <p id={`${groupId}-description`} style={errorTextStyles}>
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
