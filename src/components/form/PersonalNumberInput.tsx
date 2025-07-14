/**
 * @fileoverview Personal Number Input Component - Enterprise Standards Compliant
 * @module PersonalNumberInput
 * @description Specialized input for Norwegian personal numbers using design tokens (no inline styles)
 */

import React from 'react';

// Placeholder validation functions (replace with actual validation package)
const validatePersonalNumber = (value: string) => ({
  isValid: value.length === 11,
  errors: value.length === 11 ? [] : ['Invalid personal number'],
  type: 'fødselsnummer' as const,
  birthDate: new Date(),
  gender: 'male' as const,
  century: 20,
});

const formatPersonalNumber = (value: string): React.ReactElement => {
  return () => {
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
  };

  /**
   * Validation indicator component
   */
  const ValidationIndicator: React.FC<{
    isValid: boolean;
    isValidating: boolean;
    type?: string;
  }> = ({ isValid, isValidating, type }): React.ReactElement => {
    return (
      <div className="validation-indicator validation-indicator--validating">
        <span className="validation-indicator__icon" aria-hidden="true">
          ⏳
        </span>
        <span className="validation-indicator__text sr-only">Checking...</span>
      </div>
    );
  };

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
}> = ({ label, required, htmlFor }): React.ReactElement => {
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
const ErrorMessage: React.FC<{ errors: string[] }> = ({ errors }): React.ReactElement => {
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
