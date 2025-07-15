/**
 * @fileoverview Organization Number Input Component - Enterprise Standards Compliant
 * @module OrganizationNumberInput
 * @description Specialized input for Norwegian organization numbers using design tokens (no inline styles)
 */

import React, { useId, useState } from 'react';

import type { OrganizationNumberInputProps } from '../../types/form.types';

// Import the correct OrganizationData type
import type { OrganizationData } from '../../types/form.types';

// Placeholder validation functions (replace with actual validation package)
const validateOrganizationNumber = (
  value: string
): { isValid: boolean; errors: string[]; type: string; mainOrganization: string } => ({
  isValid: value.length === 9,
  errors: value.length === 9 ? [] : ['Invalid organization number'],
  type: 'organisasjonsnummer' as const,
  mainOrganization: value,
});

const formatOrganizationNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  return value;
};

// Main component
export const OrganizationNumberInput = React.forwardRef<
  HTMLInputElement,
  OrganizationNumberInputProps
>((props, ref): React.ReactElement => {
  const {
    label,
    required = false,
    testId = 'org-number-input',
    helpText,
    error,
    value,
    defaultValue,
    onChange,
    onValidationChange,
    onBlur,
    onFocus,
    variant = 'default',
    hasError = false,
    autoFormat = true,
    disabled = false,
    readOnly = false,
    placeholder = 'Enter organization number',
    className,
    ...inputProps
  } = props;

  const [currentValue, setCurrentValue] = useState(value || defaultValue || '');
  const [validationResult, setValidationResult] = useState(validateOrganizationNumber(''));
  const [_isValidating] = useState(false);
  const [_organizationData] = useState<OrganizationData | null>(null);

  // Display format for validation
  const displayFormat = autoFormat ? 'nnn nnn nnn' : 'nnnnnnnnn';

  // Generate ID if not provided
  const generatedId = useId();
  const inputId = `${testId}-input-${generatedId}`;
  const hasValidationErrors = !validationResult.isValid || hasError;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    const formattedValue = autoFormat ? formatOrganizationNumber(inputValue) : inputValue;

    setCurrentValue(formattedValue);
    const result = validateOrganizationNumber(formattedValue);
    setValidationResult(result);

    if (onChange) {
      onChange(formattedValue, result.isValid, e);
    }

    if (onValidationChange) {
      onValidationChange(result.isValid, result.errors, undefined);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (onFocus) {
      onFocus(e);
    }
  };

  const inputClasses = `organization-number-input ${hasValidationErrors ? 'organization-number-input--error' : ''} ${className || ''}`;

  return (
    <div className="organization-number-field" data-testid={testId}>
      {/* Label */}
      {label && <Label label={label} required={required} htmlFor={inputId} />}

      {/* Input with validation indicator */}
      <div className="organization-number-field__input-wrapper">
        <input
          ref={ref}
          id={inputId}
          type="text"
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={displayFormat === 'nnn nnn nnn' ? 11 : 9}
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
          _isValidating={_isValidating}
          errors={validationResult.errors}
        />
      </div>

      {/* Help text */}
      {helpText && (
        <div id={`${inputId}-help`} className="organization-number-field__help">
          <span className="organization-number-field__help-icon" aria-hidden="true">
            ℹ️
          </span>
          <span className="organization-number-field__help-text">{helpText}</span>
        </div>
      )}

      {/* Error messages */}
      {(error || hasValidationErrors) && (
        <div id={`${inputId}-error`} className="organization-number-field__error" role="alert">
          <span className="organization-number-field__error-icon" aria-hidden="true">
            ❌
          </span>
          <span className="organization-number-field__error-text">
            {error || validationResult.errors.join(', ')}
          </span>
        </div>
      )}

      {/* Organization data display */}
      {_organizationData && (
        <div className="organization-number-field__org-data">
          <h4 className="organization-number-field__org-name">{_organizationData.name}</h4>
          <p className="organization-number-field__org-details">
            {_organizationData.organizationForm} - {_organizationData.status}
          </p>
          <p className="organization-number-field__org-address">
            {_organizationData.municipality}, {_organizationData.county}
          </p>
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
}> = ({ label, required, htmlFor }): React.ReactElement => {
  return (
    <label className="organization-number-field__label" htmlFor={htmlFor}>
      <span className="organization-number-field__label-text">{label}</span>
      {required && (
        <span className="organization-number-field__required-indicator" aria-label="Required">
          *
        </span>
      )}
    </label>
  );
};

/**
 * Validation indicator component
 */
const ValidationIndicator: React.FC<{
  isValid: boolean;
  _isValidating: boolean;
  errors: string[];
}> = ({ isValid, _isValidating, errors }): React.ReactElement => {
  if (_isValidating) {
    return (
      <div className="organization-number-field__validation-indicator organization-number-field__validation-indicator--loading">
        <span className="organization-number-field__validation-icon" aria-hidden="true">
          ⏳
        </span>
        <span className="sr-only">Validating...</span>
      </div>
    );
  }

  if (isValid) {
    return (
      <div className="organization-number-field__validation-indicator organization-number-field__validation-indicator--valid">
        <span className="organization-number-field__validation-icon" aria-hidden="true">
          ✅
        </span>
        <span className="sr-only">Valid</span>
      </div>
    );
  }

  return (
    <div className="organization-number-field__validation-indicator organization-number-field__validation-indicator--error">
      <span className="organization-number-field__validation-icon" aria-hidden="true">
        ❌
      </span>
      <span className="sr-only">Invalid: {errors.join(', ')}</span>
    </div>
  );
};

OrganizationNumberInput.displayName = 'OrganizationNumberInput';
