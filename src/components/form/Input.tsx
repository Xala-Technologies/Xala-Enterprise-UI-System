/**
 * @fileoverview Input Component - Enterprise Standards Compliant
 * @module Input
 * @description Input component using design tokens (no inline styles)
 */

import React, { useEffect, useRef, useState } from 'react';

import type { InputProps } from '../../types/form.types';

/**
 * Input component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref): void => {
  const {
    label,
    error,
    helpText,
    type = 'text',
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    required = false,
    disabled = false,
    readOnly = false,
    placeholder,
    name,
    id,
    maxLength,
    minLength,
    pattern,
    autoComplete,
    variant = 'default',
    size = 'md',
    hasError = false,
    validation,
    className = '',
    testId,
    ...inputProps
  } = props;

  // Generate unique ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const helpTextId = `${inputId}-help`;
  const errorId = `${inputId}-error`;

  // State for validation
  const [isValidating, setIsValidating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Custom validation
  useEffect((): void => {
    if (!validation?.custom || !value) return;

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async (): void => {
      setIsValidating(true);
      try {
        const result = await Promise.resolve(validation.custom!(value));
        setValidationErrors(result ? [result] : []);
      } catch (err) {
        setValidationErrors(['Validation error']);
      } finally {
        setIsValidating(false);
      }
    }, validation.debounceMs || 300);
  }, [value, validation]);

  // Build CSS classes using design tokens
  const inputClasses = React.useMemo((): void => {
    const classes = ['input'];

    // Variant classes
    classes.push(`input--variant-${variant}`);

    // Size classes
    classes.push(`input--size-${size}`);

    // State classes
    if (hasError || error || validationErrors.length > 0) {
      classes.push('input--error');
    }

    if (disabled) {
      classes.push('input--disabled');
    }

    if (readOnly) {
      classes.push('input--readonly');
    }

    if (required) {
      classes.push('input--required');
    }

    if (isValidating) {
      classes.push('input--validating');
    }

    // Custom classes
    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [
    variant,
    size,
    hasError,
    error,
    validationErrors,
    disabled,
    readOnly,
    required,
    isValidating,
    className,
  ]);

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    onChange?.(newValue, event);
  };

  // Handle input blur
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    onBlur?.(event);
  };

  // Handle input focus
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    onFocus?.(event);
  };

  const hasValidationErrors = hasError || error || validationErrors.length > 0;

  return (
    <div className="input-field" data-testid={testId}>
      {/* Label */}
      {label && <Label label={label} required={required} htmlFor={inputId} />}

      {/* Input */}
      <input
        ref={ref}
        id={inputId}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        autoComplete={autoComplete}
        className={inputClasses}
        aria-invalid={hasValidationErrors}
        aria-describedby={`${helpTextId} ${errorId}`}
        aria-required={required}
        data-variant={variant}
        data-size={size}
        {...inputProps}
      />

      {/* Help text */}
      {helpText && (
        <div id={helpTextId} className="input-field__help">
          <span className="input-field__help-icon" aria-hidden="true">
            ℹ️
          </span>
          <span className="input-field__help-text">{helpText}</span>
        </div>
      )}

      {/* Error messages */}
      <div id={errorId}>
        {error && <ErrorMessage error={error} />}
        {validationErrors.map((err, index) => (
          <ErrorMessage key={index} error={err} />
        ))}
      </div>

      {/* Validation indicator */}
      {isValidating && (
        <div className="input-field__validation-indicator">
          <span className="input-field__validation-icon" aria-hidden="true">
            ⏳
          </span>
          <span className="input-field__validation-text sr-only">Validating...</span>
        </div>
      )}
    </div>
  );
});

/**
 * Label component
 */
const Label: React.FC<{
  label: string;
  required?: boolean;
  htmlFor: string;
}> = ({ label, required, htmlFor }): void => {
  return (
    <label className="input-field__label" htmlFor={htmlFor}>
      <span className="input-field__label-text">{label}</span>
      {required && (
        <span className="input-field__required-indicator" aria-label="Required">
          *
        </span>
      )}
    </label>
  );
};

/**
 * Error message component
 */
const ErrorMessage: React.FC<{ error: string }> = ({ error }): void => {
  return (
    <div className="input-field__error" role="alert">
      <span className="input-field__error-icon" aria-hidden="true">
        ❌
      </span>
      <span className="input-field__error-text">{error}</span>
    </div>
  );
};

Input.displayName = 'Input';
