// Input component for @xala-mock/ui-system
// Norwegian-compliant input with accessibility and validation

import React, { forwardRef, useState, useCallback } from 'react';

import { InputProps } from '../../types/form.types';

// Helper function to generate CSS using design tokens
const getInputStyles = (props: InputProps): React.CSSProperties => {
  const {
    variant = 'default',
    size = 'md',
    hasError = false,
    disabled = false,
    readOnly = false,
  } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'block',
    width: '100%',
    fontFamily: 'var(--font-family-sans)',
    fontSize: getSizeStyles(size).fontSize,
    lineHeight: 'var(--line-height-normal)',
    padding: getSizeStyles(size).padding,
    border: getBorderStyles(variant, hasError),
    borderRadius: 'var(--border-radius-base)',
    backgroundColor: getBackgroundStyles(variant, disabled, readOnly),
    color: getTextStyles(disabled, readOnly),
    transition: 'all 0.2s ease-in-out',
    outline: 'none',
  };

  // Focus styles
  const focusStyles: React.CSSProperties = {
    ':focus': {
      borderColor: hasError ? 'var(--color-red-500)' : 'var(--color-primary-500)',
      boxShadow: hasError ? 'var(--shadow-focus-error)' : 'var(--shadow-focus)',
      outline: 'var(--focus-ring-width) solid var(--shadow-focus)',
      outlineOffset: 'var(--focus-ring-offset)',
    },
  };

  // Norwegian accessibility enhancements
  const norwegianStyles = getNorwegianStyles(props.norwegian);

  return { ...baseStyles, ...focusStyles, ...norwegianStyles };
};

// Get size-based styles
const getSizeStyles = (size: string) => {
  const sizes = {
    sm: {
      fontSize: 'var(--font-size-sm)',
      padding: 'var(--spacing-2) var(--spacing-3)',
    },
    md: {
      fontSize: 'var(--font-size-base)',
      padding: 'var(--spacing-3) var(--spacing-4)',
    },
    lg: {
      fontSize: 'var(--font-size-lg)',
      padding: 'var(--spacing-4) var(--spacing-5)',
    },
  };
  return sizes[size as keyof typeof sizes] || sizes.md;
};

// Get border styles
const getBorderStyles = (variant: string, hasError: boolean): string => {
  if (hasError) {
    return 'var(--border-width) solid var(--color-red-500)';
  }

  const borders = {
    default: 'var(--border-width) solid var(--border-primary)',
    government: 'var(--border-width) solid var(--color-gray-400)',
    municipal: 'var(--border-width) solid var(--color-primary-300)',
  };
  return borders[variant as keyof typeof borders] || borders.default;
};

// Get background styles
const getBackgroundStyles = (variant: string, disabled: boolean, readOnly: boolean): string => {
  if (disabled) { return 'var(--color-gray-100)'; }
  if (readOnly) { return 'var(--color-gray-50)'; }

  const backgrounds = {
    default: 'var(--background-primary)',
    government: 'var(--color-white)',
    municipal: 'var(--background-primary)',
  };
  return backgrounds[variant as keyof typeof backgrounds] || backgrounds.default;
};

// Get text color styles
const getTextStyles = (disabled: boolean, readOnly: boolean): string => {
  if (disabled) { return 'var(--text-disabled)'; }
  if (readOnly) { return 'var(--text-secondary)'; }
  return 'var(--text-primary)';
};

// Get Norwegian-specific styles
const getNorwegianStyles = (norwegian?: InputProps['norwegian']): React.CSSProperties => {
  if (!norwegian) { return {}; }

  const styles: React.CSSProperties = {};

  // Enhanced accessibility spacing for WCAG 2.2 AA
  if (norwegian.accessibility === 'WCAG_2_2_AAA') {
    styles.minHeight = 'var(--touch-target-min-height)'; // Norwegian minimum
    styles.padding = 'var(--spacing-4) var(--spacing-5)'; // Enhanced padding
  }

  return styles;
};

// Label component for accessibility
const Label = ({
  labelKey,
  required,
  htmlFor,
}: {
  labelKey: string;
  required?: boolean;
  htmlFor: string;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: 'block',
        marginBottom: 'var(--spacing-2)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
        color: 'var(--text-primary)',
        lineHeight: 'var(--line-height-tight)',
      }}
    >
      {/* TODO: Replace with actual localization */}
      {labelKey}
      {required && (
        <span
          style={{
            color: 'var(--color-red-500)',
            marginLeft: 'var(--spacing-1)',
          }}
          aria-label='påkrevd'
        >
          *
        </span>
      )}
    </label>
  );
};

// Error message component
const ErrorMessage = ({ errorKey, hasError }: { errorKey?: string; hasError: boolean }) => {
  if (!hasError || !errorKey) { return null; }

  return (
    <div
      role='alert'
      aria-live='polite'
      style={{
        marginTop: 'var(--spacing-1)',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--color-red-600)',
        lineHeight: 'var(--line-height-tight)',
      }}
    >
      {/* TODO: Replace with actual localization */}
      {errorKey}
    </div>
  );
};

// Help text component
const HelpText = ({ helpKey }: { helpKey?: string }) => {
  if (!helpKey) { return null; }

  return (
    <div
      style={{
        marginTop: 'var(--spacing-1)',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--text-secondary)',
        lineHeight: 'var(--line-height-tight)',
      }}
    >
      {/* TODO: Replace with actual localization */}
      {helpKey}
    </div>
  );
};

// Input component with forwardRef for className/style props
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    labelKey,
    errorKey,
    helpKey,
    required = false,
    disabled = false,
    readOnly = false,
    placeholder,
    name,
    id,
    type = 'text',
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    maxLength,
    minLength,
    pattern,
    autoComplete,
    hasError = false,
    validation,
    className,
    style,
    testId,
    'aria-label': ariaLabel,
    ...inputProps
  } = props;

  const [internalValue, setInternalValue] = useState(value || defaultValue || '');
  const [validationError, setValidationError] = useState<string | null>(null);

  const inputId = id || `input-${name || 'field'}`;
  const inputStyles = getInputStyles(props);
  const combinedStyles = { ...inputStyles, ...style };

  // Handle input change with validation
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInternalValue(newValue);

      // Custom validation
      if (validation?.custom) {
        const error = validation.custom(newValue);
        setValidationError(error);
      }

      if (onChange) {
        onChange(newValue, event);
      }
    },
    [onChange, validation]
  );

  const currentHasError = hasError || !!validationError;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
      data-testid={testId}
    >
      {/* Label */}
      <Label labelKey={labelKey} required={required} htmlFor={inputId} />

      {/* Input field */}
      <input
        ref={ref}
        className={className}
        style={combinedStyles}
        type={type}
        id={inputId}
        name={name}
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        autoComplete={autoComplete}
        aria-label={ariaLabel}
        aria-required={required}
        aria-invalid={currentHasError}
        aria-describedby={`${inputId}-help ${inputId}-error`}
        data-variant={props.variant}
        data-size={props.size}
      />

      {/* Help text */}
      <div id={`${inputId}-help`}>
        <HelpText helpKey={helpKey} />
      </div>

      {/* Error message */}
      <div id={`${inputId}-error`}>
        <ErrorMessage errorKey={validationError || errorKey} hasError={currentHasError} />
      </div>
    </div>
  );
});

Input.displayName = 'Input';
