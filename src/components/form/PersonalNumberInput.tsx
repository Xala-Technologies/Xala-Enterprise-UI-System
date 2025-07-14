/**
 * @fileoverview Personal Number Input Component - Enterprise Standards Compliant
 * @module PersonalNumberInput
 * @description Specialized input for Norwegian personal numbers using design tokens (no inline styles)
 */

import React, { useCallback, useId, useState } from 'react';

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

const formatPersonalNumber = (value: string): string => {
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
      onBlur,
      onFocus,
      placeholder,
      required = false,
      disabled = false,
      readOnly = false,
      variant = 'default',
      helpText,
      error,
      testId,
      className,
      displayFormat = 'ddmmyy-nnnnn',
      validation = {
        checksum: true,
        allowDNumber: false,
        allowHNumber: false,
        strictFormat: true,
        realTimeValidation: true,
      },
      ...restProps
    } = props;

    // Generate unique IDs
    const baseId = useId();
    const inputId = `${baseId}-input`;
    const helpTextId = `${baseId}-help`;
    const errorId = `${baseId}-error`;
    const validationId = `${baseId}-validation`;

    // State
    const [currentValue, setCurrentValue] = useState<string>(
      (value || defaultValue || '').toString()
    );
    const [isValidating, setIsValidating] = useState<boolean>(false);
    const [validationResult, setValidationResult] = useState<ReturnType<
      typeof validatePersonalNumber
    > | null>(null);

    // Handle change with formatting and validation
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const formattedValue =
          displayFormat === 'ddmmyy-nnnnn'
            ? formatPersonalNumber(rawValue)
            : rawValue.replace(/\D/g, '').slice(0, 11);

        setCurrentValue(formattedValue);

        // Real-time validation
        if (validation.realTimeValidation) {
          setIsValidating(true);
          // Simulate async validation
          setTimeout(() => {
            const result = validatePersonalNumber(formattedValue.replace(/\D/g, ''));
            setValidationResult(result);
            setIsValidating(false);
          }, 300);
        }

        // Call parent onChange with raw value
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: formattedValue,
          },
        };
        onChange?.(formattedValue, validationResult?.isValid || false, syntheticEvent);
      },
      [onChange, displayFormat, validation.realTimeValidation]
    );

    // Handle blur with validation
    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (!validation.realTimeValidation) {
          setIsValidating(true);
          setTimeout(() => {
            const result = validatePersonalNumber(currentValue.replace(/\D/g, ''));
            setValidationResult(result);
            setIsValidating(false);
          }, 100);
        }
        onBlur?.(e);
      },
      [onBlur, currentValue, validation.realTimeValidation]
    );

    // Handle focus
    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(e);
      },
      [onFocus]
    );

    // Validation state
    const hasValidationErrors = Boolean(error) || (validationResult && !validationResult.isValid);

    // CSS classes
    const inputClasses = [
      'personal-number-field__input',
      `personal-number-field__input--${variant}`,
      disabled && 'personal-number-field__input--disabled',
      readOnly && 'personal-number-field__input--readonly',
      hasValidationErrors && 'personal-number-field__input--error',
      validationResult?.isValid && 'personal-number-field__input--valid',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Aria describedby
    const describedBy = [
      helpText && helpTextId,
      error && errorId,
      norwegian.enableValidation && validationId,
    ]
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
            maxLength={norwegian.displayFormat === 'ddmmyy-nnnnn' ? 12 : 11}
            className={inputClasses}
            aria-invalid={hasValidationErrors}
            aria-describedby={describedBy || undefined}
            aria-required={required}
            data-variant={variant}
            {...restProps}
          />

          {/* Validation indicator */}
          {norwegian.enableValidation && norwegian.showValidationIcon && (
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
        {norwegian.enableValidation && validationResult && (
          <div id={validationId} className="personal-number-field__validation-details">
            <div className="personal-number-field__validation-info">
              <span className="personal-number-field__validation-label">Type:</span>
              <span className="personal-number-field__validation-value">
                {validationResult.type}
              </span>
            </div>
            <div className="personal-number-field__validation-info">
              <span className="personal-number-field__validation-label">Birth Date:</span>
              <span className="personal-number-field__validation-value">
                {validationResult.birthDate.toLocaleDateString('no-NO')}
              </span>
            </div>
            <div className="personal-number-field__validation-info">
              <span className="personal-number-field__validation-label">Gender:</span>
              <span className="personal-number-field__validation-value">
                {validationResult.gender}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

PersonalNumberInput.displayName = 'PersonalNumberInput';
