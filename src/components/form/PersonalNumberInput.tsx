/**
 * @fileoverview Personal Number Input Component - Enterprise Standards Compliant
 * @module PersonalNumberInput
 * @description Specialized input for Norwegian personal numbers using design tokens (no inline styles)
 */

import React, { useCallback, useId, useState } from 'react';

import { cn } from '../../lib/utils/cn';
import type { PersonalNumberInputProps } from '../../types/form.types';

// Personal number validation result type
interface PersonalNumberValidationResult {
  isValid: boolean;
  errors: string[];
  type: 'fødselsnummer' | 'dnummer' | 'hnummer';
  birthDate: Date;
  gender: 'male' | 'female';
  century: number;
  age?: number;
}

// Placeholder validation functions (replace with actual validation package)
const validatePersonalNumber = (
  value: string,
  validation: PersonalNumberInputProps['validation']
) => {
  const digits = value.replace(/\D/g, '');
  const isValid = digits.length === 11;
  const errors: string[] = [];
  const type = 'fødselsnummer' as const;
  const birthDate = new Date();
  const gender = 'male' as const;
  const century = 20;

  if (!isValid) {
    errors.push('Invalid personal number');
  }

  return {
    isValid,
    errors,
    type,
    birthDate,
    gender,
    century,
  };
};

const formatPersonalNumber = (
  value: string,
  displayFormat: PersonalNumberInputProps['displayFormat']
): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');

  // Format as DDMMYY-NNNNN
  if (digits.length > 6) {
    return `${digits.slice(0, 6)}-${digits.slice(6, 11)}`;
  }
  return digits;
};

// Label component
interface LabelProps {
  label: string;
  required?: boolean;
  htmlFor?: string;
}

const Label: React.FC<LabelProps> = ({ label, required, htmlFor }) => (
  <label htmlFor={htmlFor} className="personal-number-field__label" data-required={required}>
    {label}
    {required && <span className="personal-number-field__required">*</span>}
  </label>
);

// Validation indicator component
interface ValidationIndicatorProps {
  isValid: boolean;
  isValidating: boolean;
  errors: string[];
}

const ValidationIndicator: React.FC<ValidationIndicatorProps> = ({
  isValid,
  isValidating,
  errors,
}) => {
  if (isValidating) {
    return (
      <div className="personal-number-field__validation personal-number-field__validation--loading">
        <span className="personal-number-field__validation-icon">⏳</span>
        <span className="personal-number-field__validation-text">Validating...</span>
      </div>
    );
  }

  if (!isValid && errors.length > 0) {
    return (
      <div className="personal-number-field__validation personal-number-field__validation--error">
        <span className="personal-number-field__validation-icon">❌</span>
        <span className="personal-number-field__validation-text">{errors[0]}</span>
      </div>
    );
  }

  if (isValid) {
    return (
      <div className="personal-number-field__validation personal-number-field__validation--success">
        <span className="personal-number-field__validation-icon">✅</span>
        <span className="personal-number-field__validation-text">Valid personal number</span>
      </div>
    );
  }

  return null;
};

/**
 * PersonalNumberInput component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export const PersonalNumberInput = React.forwardRef<HTMLInputElement, PersonalNumberInputProps>(
  (props, ref): React.ReactElement => {
    const {
      label,
      name,
      value,
      defaultValue,
      onChange,
      onValidationChange,
      onBlur,
      onFocus,
      placeholder,
      required = false,
      disabled = false,
      readOnly = false,
      variant = 'default',
      helpText,
      error,
      hasError = false,
      testId,
      className,
      displayFormat = 'ddmmyy-nnnnn',
      maskInput = false,
      autoFormat = true,
      validation = {
        checksum: true,
        allowDNumber: false,
        allowHNumber: false,
        strictFormat: true,
        realTimeValidation: true,
      },
      ...restProps
    } = props;

    // Generate IDs for accessibility
    const inputId = useId();
    const helpTextId = useId();
    const errorId = useId();
    const validationId = useId();

    // State for validation
    const [currentValue, setCurrentValue] = useState(value || defaultValue || '');
    const [validationResult, setValidationResult] = useState<PersonalNumberValidationResult | null>(
      null
    );
    const [isValidating, setIsValidating] = useState(false);

    // Determine if validation is enabled
    const enableValidation = validation?.realTimeValidation !== false;
    const showValidationIcon = enableValidation;

    // Handle change with validation
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const formattedValue = autoFormat
          ? formatPersonalNumber(inputValue, displayFormat)
          : inputValue;

        setCurrentValue(formattedValue);

        if (enableValidation) {
          setIsValidating(true);
          const result = validatePersonalNumber(formattedValue, validation);
          setValidationResult(result);
          setIsValidating(false);

          if (onValidationChange) {
            onValidationChange(result.isValid, result.errors);
          }
        }

        if (onChange) {
          onChange(formattedValue, validationResult?.isValid || false, e);
        }
      },
      [
        autoFormat,
        displayFormat,
        enableValidation,
        validation,
        onChange,
        onValidationChange,
        validationResult,
      ]
    );

    // Handle blur
    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
          onBlur(e);
        }
      },
      [onBlur]
    );

    // Handle focus
    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (onFocus) {
          onFocus(e);
        }
      },
      [onFocus]
    );

    // Determine validation state
    const hasValidationErrors = Boolean(
      error || hasError || (validationResult && !validationResult.isValid)
    );
    const inputClasses = cn(
      'personal-number-input',
      {
        'personal-number-input--error': hasValidationErrors,
        'personal-number-input--disabled': disabled,
        'personal-number-input--readonly': readOnly,
      },
      className
    );

    // Build aria-describedby
    const describedBy = [helpText && helpTextId, error && errorId, enableValidation && validationId]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="personal-number-field" data-testid={testId}>
        {/* Label */}
        {label && <Label label={label} required={required} htmlFor={inputId} />}

        {/* Input with validation indicator */}
        <div className="personal-number-field__input-wrapper">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type="text"
            value={currentValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder={placeholder || 'Enter personal number'}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={displayFormat === 'ddmmyy-nnnnn' ? 12 : 11}
            className={inputClasses}
            aria-invalid={hasValidationErrors}
            aria-describedby={describedBy || undefined}
            aria-required={required}
            data-variant={variant}
            {...restProps}
          />

          {/* Validation indicator */}
          {enableValidation && showValidationIcon && (
            <ValidationIndicator
              isValid={validationResult?.isValid || false}
              isValidating={isValidating}
              errors={validationResult?.errors || []}
            />
          )}
        </div>

        {/* Help text */}
        {helpText && (
          <div id={helpTextId} className="personal-number-field__help">
            <svg className="personal-number-field__help-icon" aria-hidden="true">
              <use xlinkHref="#icon-info" />
            </svg>
            <span className="personal-number-field__help-text">{helpText}</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div id={errorId} className="personal-number-field__error" role="alert">
            <svg className="personal-number-field__error-icon" aria-hidden="true">
              <use xlinkHref="#icon-error" />
            </svg>
            <span className="personal-number-field__error-text">{error}</span>
          </div>
        )}

        {/* Validation details */}
        {enableValidation && validationResult && (
          <div id={validationId} className="personal-number-field__validation-details">
            <div className="personal-number-field__validation-info">
              <span className="personal-number-field__validation-label">Type:</span>
              <span className="personal-number-field__validation-value">
                {validationResult.type}
              </span>
            </div>
            <div className="personal-number-field__validation-info">
              <span className="personal-number-field__validation-label">Gender:</span>
              <span className="personal-number-field__validation-value">
                {validationResult.gender}
              </span>
            </div>
            <div className="personal-number-field__validation-info">
              <span className="personal-number-field__validation-label">Age:</span>
              <span className="personal-number-field__validation-value">
                {validationResult.age}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

PersonalNumberInput.displayName = 'PersonalNumberInput';
