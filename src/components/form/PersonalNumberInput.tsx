/**
 * @fileoverview Personal Number Input Component - Enterprise Standards Compliant
 * @module PersonalNumberInput
 * @description Specialized input for Norwegian personal numbers using design tokens (no inline styles)
 */

import React, { useEffect, useRef, useState } from 'react';

import type { PersonalNumberInputProps } from '../../types/form.types';

// Placeholder validation functions (replace with actual validation package)
const validatePersonalNumber = (value: string) => ({
  isValid: value.length === 11,
  errors: value.length === 11 ? [] : ['Invalid personal number'],
  type: 'fødselsnummer' as const,
  birthDate: new Date(),
  gender: 'male' as const,
  century: 20,
});

const formatPersonalNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.replace(/(\d{6})(\d{5})/, '$1-$2');
};

/**
 * Personal Number Input component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export function PersonalNumberInput({
  label,
  error,
  helpText,
  value,
  defaultValue,
  onChange,
  onValidationChange,
  onBlur,
  onFocus,
  required = false,
  disabled = false,
  readOnly = false,
  placeholder,
  name,
  id,
  variant = 'default',
  hasError = false,
  validation = {},
  norwegian = {},
  className = '',
  testId,
  ...inputProps
}: PersonalNumberInputProps): JSX.Element {
  // State management
  const [internalValue, setInternalValue] = useState(value || defaultValue || '');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    errors: string[];
    type: 'fødselsnummer';
    birthDate: Date;
    gender: 'male' | 'female';
    century: number;
  }>({
    isValid: false,
    errors: [],
    type: 'fødselsnummer',
    birthDate: new Date(),
    gender: 'male',
    century: 20,
  });
  const [isValidating, setIsValidating] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Generate unique ID
  const inputId = id || `personal-number-${name || Math.random().toString(36).substr(2, 9)}`;

  // Build CSS classes using design tokens
  const inputClasses = React.useMemo(() => {
    const classes = ['personal-number-input'];

    // Variant classes
    classes.push(`personal-number-input--variant-${variant}`);

    // State classes
    if (hasError || validationResult.errors.length > 0) {
      classes.push('personal-number-input--error');
    }

    if (disabled) {
      classes.push('personal-number-input--disabled');
    }

    if (readOnly) {
      classes.push('personal-number-input--readonly');
    }

    if (required) {
      classes.push('personal-number-input--required');
    }

    if (isValidating) {
      classes.push('personal-number-input--validating');
    }

    if (validationResult.isValid) {
      classes.push('personal-number-input--valid');
    }

    // Norwegian compliance classes
    if (norwegian.displayFormat) {
      classes.push(
        `personal-number-input--format-${norwegian.displayFormat.replace(/[-\s]/g, '')}`
      );
    }

    if (norwegian.maskInput) {
      classes.push('personal-number-input--masked');
    }

    if (norwegian.autoFormat) {
      classes.push('personal-number-input--auto-format');
    }

    // Custom classes
    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [
    variant,
    hasError,
    validationResult,
    disabled,
    readOnly,
    required,
    isValidating,
    norwegian,
    className,
  ]);

  // Validation and formatting
  useEffect(() => {
    const currentValue = value !== undefined ? value : internalValue;
    const cleaned = currentValue.replace(/\D/g, '');

    if (cleaned.length === 0) {
      setValidationResult({
        isValid: false,
        errors: [],
        type: 'fødselsnummer',
        birthDate: new Date(),
        gender: 'male',
        century: 20,
      });
      return;
    }

    // Debounced validation
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setIsValidating(true);

      try {
        const result = validatePersonalNumber(cleaned);
        setValidationResult(result);
        onValidationChange?.(result.isValid, result.errors);
      } catch (error) {
        const errorResult = {
          isValid: false,
          errors: ['Invalid personal number'],
          type: 'fødselsnummer' as const,
          birthDate: new Date(),
          gender: 'male' as const,
          century: 20,
        };
        setValidationResult(errorResult);
        onValidationChange?.(false, errorResult.errors);
      } finally {
        setIsValidating(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [value, internalValue, validation, norwegian, onValidationChange]);

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    // Auto-formatting
    if (norwegian.autoFormat) {
      const cleaned = newValue.replace(/\D/g, '');
      if (cleaned.length <= 11) {
        newValue = formatPersonalNumber(cleaned);
      }
    }

    setInternalValue(newValue);
    onChange?.(newValue, validationResult.isValid, event);
  };

  // Handle blur
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
  };

  // Handle focus
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(event);
  };

  const currentValue = value !== undefined ? value : internalValue;
  const hasValidationErrors = hasError || validationResult.errors.length > 0;

  return (
    <div className="personal-number-field" data-testid={testId}>
      {/* Label */}
      {label && <Label label={label} required={required} htmlFor={inputId} />}

      {/* Input with validation indicator */}
      <div className="personal-number-field__input-wrapper">
        <input
          id={inputId}
          name={name}
          type="text"
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder ? placeholder : 'Enter personal number'}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={norwegian.displayFormat === 'ddmmyy-nnnnn' ? 12 : 11}
          className={inputClasses}
          aria-invalid={hasValidationErrors}
          aria-describedby={`${inputId}-help ${inputId}-error ${inputId}-validation`}
          aria-required={required}
          data-variant={variant}
          {...inputProps}
        />

        {/* Validation indicator */}
        <ValidationIndicator
          isValid={validationResult.isValid}
          isValidating={isValidating}
          type={validationResult.type}
        />
      </div>

      {/* Help text */}
      {helpText && (
        <div id={`${inputId}-help`} className="personal-number-field__help">
          <span className="personal-number-field__help-icon" aria-hidden="true">
            ℹ️
          </span>
          <span className="personal-number-field__help-text">{helpText}</span>
        </div>
      )}

      {/* Error messages */}
      <div id={`${inputId}-error`}>
        <ErrorMessage errors={validationResult.errors} />
      </div>
    </div>
  );
}

/**
 * Validation indicator component
 */
const ValidationIndicator: React.FC<{
  isValid: boolean;
  isValidating: boolean;
  type?: string;
}> = ({ isValid, isValidating, type }) => {
  if (isValidating) {
    return (
      <div className="validation-indicator validation-indicator--validating">
        <span className="validation-indicator__icon" aria-hidden="true">
          ⏳
        </span>
        <span className="validation-indicator__text sr-only">Checking...</span>
      </div>
    );
  }

  if (isValid) {
    return (
      <div className="validation-indicator validation-indicator--valid">
        <span className="validation-indicator__icon" aria-hidden="true">
          ✅
        </span>
        <span className="validation-indicator__text sr-only">Valid</span>
      </div>
    );
  }

  return null;
};

/**
 * Label component
 */
const Label: React.FC<{
  label: string;
  required?: boolean;
  htmlFor: string;
}> = ({ label, required, htmlFor }) => {
  return (
    <label className="personal-number-field__label" htmlFor={htmlFor}>
      <span className="personal-number-field__label-text">{label}</span>
      {required && (
        <span className="personal-number-field__required-indicator" aria-label="Required">
          *
        </span>
      )}
    </label>
  );
};

/**
 * Error message component
 */
const ErrorMessage: React.FC<{ errors: string[] }> = ({ errors }) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="personal-number-field__error-message" role="alert" aria-live="polite">
      {errors.map((error, index) => (
        <div key={index} className="personal-number-field__error-item">
          <span className="personal-number-field__error-icon" aria-hidden="true">
            ⚠️
          </span>
          <span className="personal-number-field__error-text">{error}</span>
        </div>
      ))}
    </div>
  );
};

PersonalNumberInput.displayName = 'PersonalNumberInput';
