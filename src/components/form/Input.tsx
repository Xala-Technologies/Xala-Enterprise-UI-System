/**
 * @fileoverview Input Component - Enterprise Standards Compliant
 * @module Input
 * @description Input component using design tokens (no inline styles)
 */

import React, { forwardRef, useState, useCallback } from 'react';
import type { InputProps } from '../../types/form.types';
import { useLocalization } from '../../localization/hooks/useLocalization';

/**
 * Input component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    labelKey,
    errorKey,
    helpKey,
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
    norwegian,
    className = '',
    testId,
    ...inputProps
  } = props;

  const { t } = useLocalization();
  const [internalValue, setInternalValue] = useState(value || defaultValue || '');
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Generate unique ID if not provided
  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;

  // Build CSS classes using design tokens
  const inputClasses = React.useMemo(() => {
    const classes = ['input'];
    
    // Variant classes
    classes.push(`input--variant-${variant}`);
    
    // Size classes
    classes.push(`input--size-${size}`);
    
    // State classes
    if (hasError || validationError) {
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
    
    // Type classes
    classes.push(`input--type-${type}`);
    
    // Norwegian compliance classes
    if (norwegian?.accessibility) {
      classes.push(`input--accessibility-${norwegian.accessibility.replace('_', '-').toLowerCase()}`);
    }
    
    if (norwegian?.format) {
      classes.push(`input--format-${norwegian.format}`);
    }
    
    if (norwegian?.validation) {
      classes.push(`input--validation-${norwegian.validation}`);
    }
    
    // Custom classes
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  }, [variant, size, hasError, validationError, disabled, readOnly, required, isValidating, type, norwegian, className]);

  // Handle input change
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInternalValue(newValue);

      // Custom validation
      if (validation?.custom) {
        setIsValidating(true);
        
        setTimeout(async () => {
          try {
            const error = await validation.custom!(newValue);
            setValidationError(error);
          } catch (err) {
            setValidationError(t('input.validationError'));
          } finally {
            setIsValidating(false);
          }
        }, validation.debounceMs || 300);
      }

      onChange?.(newValue, event);
    },
    [onChange, validation, t]
  );

  // Handle blur event
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);
    },
    [onBlur]
  );

  // Handle focus event
  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(event);
    },
    [onFocus]
  );

  const currentValue = value !== undefined ? value : internalValue;
  const currentError = hasError || !!validationError;

  return (
    <div className="input-field" data-testid={testId}>
      {/* Label */}
      {labelKey && (
        <Label labelKey={labelKey} required={required} htmlFor={inputId} />
      )}

      {/* Input element */}
      <input
        ref={ref}
        id={inputId}
        name={name}
        type={type}
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder ? t(placeholder) : undefined}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        autoComplete={autoComplete}
        className={inputClasses}
        aria-invalid={currentError}
        aria-describedby={`${inputId}-help ${inputId}-error`}
        aria-required={required}
        data-variant={variant}
        data-size={size}
        {...inputProps}
      />

      {/* Validation indicator */}
      {isValidating && (
        <div className="input__validation-indicator" aria-hidden="true">
          ⏳
        </div>
      )}

      {/* Help text */}
      {helpKey && <HelpText helpKey={helpKey} inputId={inputId} />}

      {/* Error message */}
      <ErrorMessage
        errorKey={errorKey}
        validationError={validationError}
        hasError={currentError}
        inputId={inputId}
      />
    </div>
  );
});

/**
 * Label component
 */
const Label: React.FC<{
  labelKey: string;
  required?: boolean;
  htmlFor: string;
}> = ({ labelKey, required, htmlFor }) => {
  const { t } = useLocalization();

  return (
    <label className="input__label" htmlFor={htmlFor}>
      <span className="input__label-text">
        {t(labelKey)}
      </span>
      {required && (
        <span className="input__required-indicator" aria-label={t('input.required')}>
          *
        </span>
      )}
    </label>
  );
};

/**
 * Error message component
 */
const ErrorMessage: React.FC<{
  errorKey?: string;
  validationError?: string | null;
  hasError: boolean;
  inputId: string;
}> = ({ errorKey, validationError, hasError, inputId }) => {
  const { t } = useLocalization();

  if (!hasError && !validationError) return null;

  const errorMessage = validationError || (errorKey ? t(errorKey) : t('input.error.generic'));

  return (
    <div
      id={`${inputId}-error`}
      className="input__error-message"
      role="alert"
      aria-live="polite"
    >
      <span className="input__error-icon" aria-hidden="true">
        ⚠️
      </span>
      <span className="input__error-text">
        {errorMessage}
      </span>
    </div>
  );
};

/**
 * Help text component
 */
const HelpText: React.FC<{
  helpKey: string;
  inputId: string;
}> = ({ helpKey, inputId }) => {
  const { t } = useLocalization();

  return (
    <div
      id={`${inputId}-help`}
      className="input__help-text"
    >
      <span className="input__help-icon" aria-hidden="true">
        ℹ️
      </span>
      <span className="input__help-content">
        {t(helpKey)}
      </span>
    </div>
  );
};

Input.displayName = 'Input';
