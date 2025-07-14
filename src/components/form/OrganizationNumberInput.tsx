/**
 * @fileoverview Organization Number Input Component - Enterprise Standards Compliant
 * @module OrganizationNumberInput
 * @description Specialized input for Norwegian organization numbers using design tokens (no inline styles)
 */

import { Logger } from '@xala-technologies/enterprise-standards';
import React, { useEffect, useRef, useState } from 'react';

import type { OrganizationNumberInputProps } from '../../types/form.types';


const logger = Logger.create({
  serviceName: 'ui-system-org-number-input',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

// Placeholder validation functions (replace with actual validation package)
const validateOrganizationNumber = (value: string) => ({
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
export const OrganizationNumberInput = React.forwardRef<HTMLInputElement, OrganizationNumberInputProps>(
  (props, ref): React.ReactElement => {
    const {
      label,
      required,
      testId = 'org-number-input',
      helpText,
      norwegian,
      ...inputProps
    } = props;

    const [currentValue, setCurrentValue] = React.useState('');
    const [validationResult, setValidationResult] = React.useState(validateOrganizationNumber(''));
    const [isValidating, setIsValidating] = React.useState(false);
    const [isFetchingData, setIsFetchingData] = React.useState(false);
    const [orgData, setOrgData] = React.useState<any>(null);

    const inputId = `${testId}-input`;
    const hasValidationErrors = !validationResult.isValid;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      setCurrentValue(value);
      setValidationResult(validateOrganizationNumber(value));
    };

    const handleBlur = (): void => {
      // Additional validation on blur
    };

    const handleFocus = (): void => {
      // Handle focus events
    };

    const inputClasses = `organization-number-input ${hasValidationErrors ? 'organization-number-input--error' : ''}`;

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
          placeholder="Enter organization number"
          required={required}
          maxLength={9}
          className={inputClasses}
          aria-invalid={hasValidationErrors}
          aria-describedby={`${inputId}-help ${inputId}-error ${inputId}-validation`}
          aria-required={required}
          {...inputProps}
        />

        {/* Validation indicator */}
        <ValidationIndicator
          isValid={validationResult.isValid}
          isValidating={isValidating}
          type={validationResult.type}
        />
      </div>

      {/* Organization data display */}
      {orgData && <OrganizationDisplay orgData={orgData} isLoading={isFetchingData} />}

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
      <div id={`${inputId}-error`}>
        <ErrorMessage errors={validationResult.errors} />
      </div>
    </div>
  );
  }
);

OrganizationNumberInput.displayName = 'OrganizationNumberInput';

/**
 * Organization data display component
 */
const OrganizationDisplay: React.FC<{
  orgData?: unknown; // Changed type to any as OrganizationData is removed
  isLoading: boolean;
}> = ({ orgData, isLoading }): React.ReactElement => {
  if (isLoading) {
    return (
      <div className="organization-display organization-display--loading">
        <span className="organization-display__loading-icon" aria-hidden="true">
          ⏳
        </span>
        <span className="organization-display__loading-text">Fetching data...</span>
      </div>
    );
  }

  if (!orgData) {
    return <></>;
  }

  const getStatusIcon = (status: string): string => {
    const icons = {
      active: '✅',
      inactive: '⚪',
      dissolved: '❌',
    };
    return icons[status as keyof typeof icons] || '❓';
  };

  const data = orgData as any;
  
  return (
    <div className="organization-display">
      <div className="organization-display__header">
        <span className="organization-display__name">{data?.name || 'Unknown'}</span>
        <span className="organization-display__status">
          <span className="organization-display__status-icon" aria-hidden="true">
            {getStatusIcon(data?.status || 'unknown')}
          </span>
          <span className="organization-display__status-text">{data?.status || 'Unknown'}</span>
        </span>
      </div>

      <div className="organization-display__details">
        <span className="organization-display__form">{data?.organizationForm || 'Unknown'}</span>
        <span className="organization-display__location">
          {data?.municipality || 'Unknown'}, {data?.county || 'Unknown'}
        </span>
      </div>

      {data?.industry && (
        <div className="organization-display__industry">
          <span className="organization-display__industry-code">{data.industry.code}</span>
          <span className="organization-display__industry-description">
            {data.industry.description}
          </span>
        </div>
      )}
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

  return <></>;
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
 * Error message component
 */
const ErrorMessage: React.FC<{ errors: string[] }> = ({ errors }): React.ReactElement => {
  return (
    <div className="organization-number-field__error-message" role="alert" aria-live="polite">
      {errors.map((error, index) => (
        <div key={index} className="organization-number-field__error-item">
          <span className="organization-number-field__error-icon" aria-hidden="true">
            ⚠️
          </span>
          <span className="organization-number-field__error-text">{error}</span>
        </div>
      ))}
    </div>
  );
};

// Mock function for fetching organization data
const mockFetchOrganizationData = async (orgNumber: string): Promise<any | null> => {
  // Changed type to any as OrganizationData is removed
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock data
  const mockData: Record<string, unknown> = {
    // Changed type to any as OrganizationData is removed
    '123456789': {
      name: 'Test Bedrift AS',
      organizationForm: 'Aksjeselskap',
      municipality: 'Oslo',
      county: 'Oslo',
      status: 'active',
      registrationDate: '2020-01-15',
      industry: {
        code: '62.010',
        description: 'Programmering og systemutvikling',
      },
    },
  };

  return mockData[orgNumber] || null;
};
