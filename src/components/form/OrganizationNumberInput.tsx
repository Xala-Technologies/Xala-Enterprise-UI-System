/**
 * @fileoverview Organization Number Input Component - Enterprise Standards Compliant
 * @module OrganizationNumberInput
 * @description Specialized input for organization numbers using design tokens (no inline styles)
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';

import { useLocalization } from '../../localization/hooks/useLocalization';
import type { OrganizationNumberInputProps, OrganizationData } from '../../types/form.types';

// Placeholder validation functions (replace with actual validation package)
const validateOrganizationNumber = (value: string) => ({
  isValid: value.length === 9,
  errors: value.length === 9 ? [] : ['Invalid organization number'],
  type: 'enterprise' as const,
  mainOrganization: value,
});

const formatOrganizationNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
};

/**
 * Organization Number Input component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export function OrganizationNumberInput({
  labelKey,
  errorKey,
  helpKey,
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
}: OrganizationNumberInputProps): JSX.Element {
  const { t } = useLocalization();

  // State management
  const [internalValue, setInternalValue] = useState(value || defaultValue || '');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    errors: string[];
    type: 'enterprise';
    mainOrganization: string;
  }>({
    isValid: false,
    errors: [],
    type: 'enterprise',
    mainOrganization: '',
  });
  const [isValidating, setIsValidating] = useState(false);
  const [orgData, setOrgData] = useState<OrganizationData | undefined>();
  const [isFetchingData, setIsFetchingData] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Generate unique ID
  const inputId = id || `org-number-${name || Math.random().toString(36).substr(2, 9)}`;

  // Build CSS classes using design tokens
  const inputClasses = useMemo(() => {
    const classes = ['organization-number-input'];

    // Variant classes
    classes.push(`organization-number-input--variant-${variant}`);

    // State classes
    if (hasError || validationResult.errors.length > 0) {
      classes.push('organization-number-input--error');
    }

    if (disabled) {
      classes.push('organization-number-input--disabled');
    }

    if (readOnly) {
      classes.push('organization-number-input--readonly');
    }

    if (required) {
      classes.push('organization-number-input--required');
    }

    if (isValidating) {
      classes.push('organization-number-input--validating');
    }

    if (validationResult.isValid) {
      classes.push('organization-number-input--valid');
    }

    // Norwegian compliance classes
    if (norwegian.displayFormat) {
      classes.push(
        `organization-number-input--format-${norwegian.displayFormat.replace(/\s/g, '-')}`
      );
    }

    if (norwegian.maskInput) {
      classes.push('organization-number-input--masked');
    }

    if (norwegian.autoFormat) {
      classes.push('organization-number-input--auto-format');
    }

    if (norwegian.fetchOrganizationData) {
      classes.push('organization-number-input--fetch-data');
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
      setValidationResult({ isValid: false, errors: [], type: 'enterprise', mainOrganization: '' });
      setOrgData(undefined);
      return;
    }

    // Debounced validation
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setIsValidating(true);

      try {
        const result = validateOrganizationNumber(cleaned);
        setValidationResult(result);

        // Fetch organization data if enabled and valid
        if (result.isValid && norwegian.fetchOrganizationData && validation.brreg) {
          setIsFetchingData(true);
          try {
            const data = await mockFetchOrganizationData(cleaned);
            setOrgData(data || undefined);
          } catch (error) {
            console.warn('Failed to fetch organization data:', error);
          } finally {
            setIsFetchingData(false);
          }
        }

        onValidationChange?.(result.isValid, result.errors, orgData);
      } catch (error) {
        const errorResult = {
          isValid: false,
          errors: [t('organizationNumber.validationError')],
          type: 'enterprise' as const,
          mainOrganization: '',
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
  }, [value, internalValue, validation, norwegian, onValidationChange, orgData, t]);

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    // Auto-formatting
    if (norwegian.autoFormat) {
      const cleaned = newValue.replace(/\D/g, '');
      if (cleaned.length <= 9) {
        newValue = formatOrganizationNumber(cleaned);
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
    <div className="organization-number-field" data-testid={testId}>
      {/* Label */}
      {labelKey && <Label labelKey={labelKey} required={required} htmlFor={inputId} />}

      {/* Input with validation indicator */}
      <div className="organization-number-field__input-wrapper">
        <input
          id={inputId}
          name={name}
          type="text"
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder ? t(placeholder) : t('organizationNumber.placeholder')}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={norwegian.displayFormat === 'nnn nnn nnn' ? 11 : 9}
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

      {/* Organization data display */}
      {orgData && <OrganizationDisplay orgData={orgData} isLoading={isFetchingData} />}

      {/* Help text */}
      {helpKey && (
        <div id={`${inputId}-help`} className="organization-number-field__help">
          <span className="organization-number-field__help-icon" aria-hidden="true">
            ℹ️
          </span>
          <span className="organization-number-field__help-text">{t(helpKey)}</span>
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
 * Organization data display component
 */
const OrganizationDisplay: React.FC<{
  orgData?: OrganizationData;
  isLoading: boolean;
}> = ({ orgData, isLoading }) => {
  const { t } = useLocalization();

  if (isLoading) {
    return (
      <div className="organization-display organization-display--loading">
        <span className="organization-display__loading-icon" aria-hidden="true">
          ⏳
        </span>
        <span className="organization-display__loading-text">
          {t('organizationNumber.fetchingData')}
        </span>
      </div>
    );
  }

  if (!orgData) {
    return null;
  }

  const getStatusIcon = (status: string): string => {
    const icons = {
      active: '✅',
      inactive: '⚪',
      dissolved: '❌',
    };
    return icons[status as keyof typeof icons] || '❓';
  };

  return (
    <div className="organization-display">
      <div className="organization-display__header">
        <span className="organization-display__name">{orgData.name}</span>
        <span className="organization-display__status">
          <span className="organization-display__status-icon" aria-hidden="true">
            {getStatusIcon(orgData.status)}
          </span>
          <span className="organization-display__status-text">
            {t(`organizationNumber.status.${orgData.status}`)}
          </span>
        </span>
      </div>

      <div className="organization-display__details">
        <span className="organization-display__form">{orgData.organizationForm}</span>
        <span className="organization-display__location">
          {orgData.municipality}, {orgData.county}
        </span>
      </div>

      {orgData.industry && (
        <div className="organization-display__industry">
          <span className="organization-display__industry-code">{orgData.industry.code}</span>
          <span className="organization-display__industry-description">
            {orgData.industry.description}
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
}> = ({ isValid, isValidating, type }) => {
  const { t } = useLocalization();

  if (isValidating) {
    return (
      <div className="validation-indicator validation-indicator--validating">
        <span className="validation-indicator__icon" aria-hidden="true">
          ⏳
        </span>
        <span className="validation-indicator__text sr-only">{t('validation.checking')}</span>
      </div>
    );
  }

  if (isValid) {
    return (
      <div className="validation-indicator validation-indicator--valid">
        <span className="validation-indicator__icon" aria-hidden="true">
          ✅
        </span>
        <span className="validation-indicator__text sr-only">{t('validation.valid')}</span>
      </div>
    );
  }

  return null;
};

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
    <label className="organization-number-field__label" htmlFor={htmlFor}>
      <span className="organization-number-field__label-text">{t(labelKey)}</span>
      {required && (
        <span
          className="organization-number-field__required-indicator"
          aria-label={t('field.required')}
        >
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
  const { t } = useLocalization();

  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="organization-number-field__error-message" role="alert" aria-live="polite">
      {errors.map((error, index) => (
        <div key={index} className="organization-number-field__error-item">
          <span className="organization-number-field__error-icon" aria-hidden="true">
            ⚠️
          </span>
          <span className="organization-number-field__error-text">
            {t(`organizationNumber.error.${error}`) || error}
          </span>
        </div>
      ))}
    </div>
  );
};

// Mock function for fetching organization data
const mockFetchOrganizationData = async (orgNumber: string): Promise<OrganizationData | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock data
  const mockData: Record<string, OrganizationData> = {
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

OrganizationNumberInput.displayName = 'OrganizationNumberInput';
