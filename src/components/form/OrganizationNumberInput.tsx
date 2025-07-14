/**
 * @fileoverview Organization Number Input Component
 * @module OrganizationNumberInput
 * @description Specialized input for organization numbers with validation
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

// Helper function to generate CSS using design tokens
const getOrganizationInputStyles = (props: OrganizationNumberInputProps): React.CSSProperties => {
  const { variant = 'default', hasError = false, disabled = false, readOnly = false } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'block',
    width: '100%',
    fontFamily: 'var(--font-family-mono)', // Monospace for number display
    fontSize: 'var(--font-size-base)',
    lineHeight: 'var(--line-height-normal)',
    padding: 'var(--spacing-3) var(--spacing-4)',
    border: getBorderStyles(variant, hasError),
    borderRadius: 'var(--border-radius-base)',
    backgroundColor: getBackgroundStyles(variant, disabled, readOnly),
    color: getTextStyles(disabled, readOnly),
    transition: 'all 0.2s ease-in-out',
    outline: 'none',
    letterSpacing: 'var(--letter-spacing-wide)', // Better number readability
  };

  // Norwegian accessibility enhancements
  const norwegianStyles = getNorwegianStyles(props.norwegian);

  // Focus styles
  const focusStyles: React.CSSProperties = {
    ':focus': {
      borderColor: hasError ? 'var(--color-red-500)' : 'var(--color-primary-500)',
      boxShadow: hasError ? 'var(--shadow-focus-error)' : 'var(--shadow-focus)',
      outline: 'var(--focus-ring-width) solid var(--shadow-focus)',
      outlineOffset: 'var(--focus-ring-offset)',
    },
  };

  return { ...baseStyles, ...norwegianStyles, ...focusStyles };
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
const getNorwegianStyles = (
  norwegian?: OrganizationNumberInputProps['norwegian']
): React.CSSProperties => {
  if (!norwegian) { return {}; }

  const styles: React.CSSProperties = {};

  // Enhanced accessibility spacing for WCAG 2.2 AA
  if (norwegian.accessibility === 'WCAG_2_2_AAA') {
    styles.minHeight = 'var(--touch-target-min-height)'; // Norwegian minimum
    styles.padding = 'var(--spacing-4) var(--spacing-5)'; // Enhanced padding
  }

  return styles;
};

// Organization data display component
const OrganizationDisplay = ({
  orgData,
  isLoading,
}: {
  orgData?: OrganizationData;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div
        style={{
          marginTop: 'var(--spacing-2)',
          padding: 'var(--spacing-3)',
          backgroundColor: 'var(--color-gray-50)',
          borderRadius: 'var(--border-radius-sm)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--text-secondary)',
        }}
      >
        🔍 Henter organisasjonsdata...
      </div>
    );
  }

  if (!orgData) { return null; }

  const getStatusColor = (status: string): string => {
    const colors = {
      active: 'var(--color-green-600)',
      inactive: 'var(--color-orange-600)',
      dissolved: 'var(--color-red-600)',
    };
    return colors[status as keyof typeof colors] || 'var(--text-secondary)';
  };

  const getStatusText = (status: string): string => {
    const texts = {
      active: 'Aktiv',
      inactive: 'Inaktiv',
      dissolved: 'Oppløst',
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <div
      style={{
        marginTop: 'var(--spacing-2)',
        padding: 'var(--spacing-3)',
        backgroundColor: 'var(--color-gray-50)',
        borderRadius: 'var(--border-radius-sm)',
        fontSize: 'var(--font-size-sm)',
        lineHeight: 'var(--line-height-relaxed)',
      }}
    >
      <div
        style={{
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--spacing-1)',
          color: 'var(--text-primary)',
        }}
      >
        {orgData.name}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)' }}>
        <span>
          <strong>Status:</strong>{' '}
          <span style={{ color: getStatusColor(orgData.status) }}>
            {getStatusText(orgData.status)}
          </span>
        </span>

        <span>
          <strong>Form:</strong> {orgData.organizationForm}
        </span>

        <span>
          <strong>Kommune:</strong> {orgData.municipality}
        </span>

        {orgData.industry && (
          <span>
            <strong>Bransje:</strong> {orgData.industry.description}
          </span>
        )}
      </div>
    </div>
  );
};

// Validation indicator component
const ValidationIndicator = ({
  isValid,
  isValidating,
  type,
}: {
  isValid: boolean;
  isValidating: boolean;
  type?: string;
}) => {
  if (isValidating) {
    return (
      <span
        style={{
          color: 'var(--color-orange-500)',
          fontSize: 'var(--font-size-sm)',
        }}
        aria-label='Validerer'
      >
        ⏳
      </span>
    );
  }

  if (isValid && type) {
    const icons = {
      enterprise: '🏢',
      'sub-organization': '🏬',
    };
    return (
      <span
        style={{
          color: 'var(--color-green-600)',
          fontSize: 'var(--font-size-sm)',
        }}
        aria-label={`Gyldig ${type === 'enterprise' ? 'organisasjon' : 'underorganisasjon'}`}
      >
        {icons[type as keyof typeof icons] || '✅'}
      </span>
    );
  }

  return null;
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
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-2)',
        marginBottom: 'var(--spacing-2)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
        color: 'var(--text-primary)',
        lineHeight: 'var(--line-height-tight)',
      }}
    >
      <span>
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
      </span>
    </label>
  );
};

// Error message component
const ErrorMessage = ({ errors }: { errors: string[] }) => {
  if (errors.length === 0) { return null; }

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
      {errors.map((error, index) => (
        <div key={index}>
          {/* TODO: Replace with actual localization */}
          {error}
        </div>
      ))}
    </div>
  );
};

// Mock BRREG data fetch (in real implementation, this would call actual BRREG API)
const mockFetchOrganizationData = async (orgNumber: string): Promise<OrganizationData | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock data for common test organizations
  const mockData: Record<string, OrganizationData> = {
    '123456789': {
      name: 'TESTORGANISASJON AS',
      organizationForm: 'Aksjeselskap',
      municipality: 'Oslo',
      county: 'Oslo',
      status: 'active',
      registrationDate: '2020-01-15',
      industry: {
        code: '62.010',
        description: 'Utvikling av programvare',
      },
    },
    '987654321': {
      name: 'KOMMUNE TESTBED',
      organizationForm: 'Kommunalt foretak',
      municipality: 'Drammen',
      county: 'Buskerud',
      status: 'active',
      registrationDate: '2010-03-20',
    },
  };

  return mockData[orgNumber] || null;
};

// OrganizationNumberInput component with forwardRef
export const OrganizationNumberInput = React.forwardRef<HTMLInputElement, OrganizationNumberInputProps>(
  (props, ref) => {
    const {
      labelKey,
      errorKey,
      helpKey,
      required = false,
      disabled = false,
      readOnly = false,
      placeholder = 'NNN NNN NNN',
      name,
      id,
      value,
      defaultValue,
      onChange,
      onValidationChange,
      validation = {
        checksum: true,
        brreg: false,
        realTimeValidation: true,
        allowInactive: true,
      },
      norwegian = {
        displayFormat: 'nnn nnn nnn',
        maskInput: true,
        autoFormat: true,
        fetchOrganizationData: false,
      },
      hasError = false,
      className,
      style,
      testId,
      'aria-label': ariaLabel,
      ...inputProps
    } = props;

    const [internalValue, setInternalValue] = useState(value || defaultValue || '');
    const [validationResult, setValidationResult] = useState({
      isValid: false,
      errors: [],
      type: undefined,
    });
    const [isValidating, setIsValidating] = useState(false);
    const [orgData, setOrgData] = useState<OrganizationData | null>(null);
    const [isLoadingOrgData, setIsLoadingOrgData] = useState(false);

    const inputId = id || `organization-number-${name || 'field'}`;
    const inputStyles = getOrganizationInputStyles(props);
    const combinedStyles = { ...inputStyles, ...style };

    // Validate organization number
    const validateInput = useMemo(
      () => async (inputValue: string) => {
        if (!inputValue.trim()) {
          setValidationResult({ isValid: false, errors: [], type: undefined });
          setOrgData(null);
          return;
        }

        setIsValidating(true);

        const result = validateOrganizationNumber(inputValue);

        setValidationResult(result);

        // Fetch organization data if enabled and validation passes
        if (result.isValid && norwegian.fetchOrganizationData) {
          setIsLoadingOrgData(true);
          try {
            const data = await mockFetchOrganizationData(inputValue.replace(/\s/g, ''));
            setOrgData(data);

            // Check if inactive organizations are allowed
            if (data && data.status !== 'active' && !validation.allowInactive) {
              result.errors.push('organization_inactive_not_allowed');
              result.isValid = false;
            }
          } catch (error) {
            console.error('Failed to fetch organization data:', error);
          } finally {
            setIsLoadingOrgData(false);
          }
        }

        setIsValidating(false);

        if (onValidationChange) {
          onValidationChange(result.isValid, result.errors, orgData || undefined);
        }
      },
      [validation, norwegian.fetchOrganizationData, onValidationChange, orgData]
    );

    // Handle input change with formatting and validation
    const handleChange = useMemo(
      () => (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = event.target.value;

        // Remove non-numeric characters and limit length
        const cleaned = newValue.replace(/\D/g, '');
        if (cleaned.length > 9) {
          return; // Don't allow more than 9 digits
        }

        // Auto-format during typing
        if (norwegian.autoFormat && norwegian.displayFormat === 'nnn nnn nnn') {
          if (cleaned.length > 6) {
            newValue = `${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`;
          } else if (cleaned.length > 3) {
            newValue = `${cleaned.substring(0, 3)} ${cleaned.substring(3)}`;
          } else {
            newValue = cleaned;
          }
        } else {
          newValue = cleaned;
        }

        setInternalValue(newValue);

        // Real-time validation
        if (validation.realTimeValidation && cleaned.length === 9) {
          validateInput(cleaned);
        }

        if (onChange) {
          onChange(newValue, validationResult.isValid, event);
        }
      },
      [norwegian, validation, onChange, validationResult.isValid, validateInput]
    );

    // Validate on blur for complete inputs
    const handleBlur = useMemo(
      () => (event: React.FocusEvent<HTMLInputElement>) => {
        const cleaned = internalValue.replace(/\D/g, '');
        if (cleaned.length === 9) {
          validateInput(cleaned);
        }

        if (props.onBlur) {
          props.onBlur(event);
        }
      },
      [internalValue, validateInput, props]
    );

    // Effect to validate controlled value changes
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length === 9) {
          validateInput(cleaned);
        }
      }
    }, [value, validateInput]);

    const currentValue = value !== undefined ? value : internalValue;
    const currentHasError = hasError || validationResult.errors.length > 0;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
        data-testid={testId}
      >
        {/* Label with validation indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <Label labelKey={labelKey} required={required} htmlFor={inputId} />
          <ValidationIndicator
            isValid={validationResult.isValid}
            isValidating={isValidating}
            type={validationResult.type}
          />
        </div>

        {/* Input field */}
        <input
          ref={ref}
          className={className}
          style={combinedStyles}
          type='text'
          id={inputId}
          name={name}
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={props.onFocus}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          placeholder={placeholder}
          maxLength={norwegian.displayFormat === 'nnn nnn nnn' ? 11 : 9} // Include spaces
          autoComplete='organization'
          inputMode='numeric'
          aria-label={ariaLabel || 'Organisasjonsnummer'}
          aria-required={required}
          aria-invalid={currentHasError}
          aria-describedby={`${inputId}-help ${inputId}-error ${inputId}-org-data`}
          data-variant={props.variant}
          data-type='organization-number'
        />

        {/* Organization data display */}
        <div id={`${inputId}-org-data`}>
          <OrganizationDisplay orgData={orgData} isLoading={isLoadingOrgData} />
        </div>

        {/* Help text */}
        {helpKey && (
          <div
            id={`${inputId}-help`}
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
