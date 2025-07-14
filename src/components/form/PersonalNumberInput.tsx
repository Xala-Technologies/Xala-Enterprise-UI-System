// PersonalNumberInput component for @xala-mock/ui-system
// Norwegian Personal Number (Fødselsnummer) input with validation

import React, { forwardRef, useState, useCallback, useEffect } from 'react';

import { PersonalNumberInputProps } from '../../types/form.types';
import {
  validatePersonalNumber,
  formatPersonalNumber,
  NORWEGIAN_ERROR_MESSAGES,
} from '../../utils/norwegian-validation';

// Helper function to generate CSS using design tokens
const getPersonalNumberInputStyles = (props: PersonalNumberInputProps): React.CSSProperties => {
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
  norwegian?: PersonalNumberInputProps['norwegian']
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
      fødselsnummer: '✅',
      'd-nummer': '🆔',
      'h-nummer': '🏥',
    };
    return (
      <span
        style={{
          color: 'var(--color-green-600)',
          fontSize: 'var(--font-size-sm)',
        }}
        aria-label={`Gyldig ${type}`}
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
          {NORWEGIAN_ERROR_MESSAGES[error as keyof typeof NORWEGIAN_ERROR_MESSAGES] || error}
        </div>
      ))}
    </div>
  );
};

// PersonalNumberInput component with forwardRef
export const PersonalNumberInput = forwardRef<HTMLInputElement, PersonalNumberInputProps>(
  (props, ref) => {
    const {
      labelKey,
      errorKey,
      helpKey,
      required = false,
      disabled = false,
      readOnly = false,
      placeholder = 'DDMMYY-NNNNN',
      name,
      id,
      value,
      defaultValue,
      onChange,
      onValidationChange,
      validation = {
        checksum: true,
        allowDNumber: true,
        allowHNumber: true,
        strictFormat: true,
        realTimeValidation: true,
      },
      norwegian = {
        displayFormat: 'ddmmyy-nnnnn',
        maskInput: true,
        autoFormat: true,
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

    const inputId = id || `personal-number-${name || 'field'}`;
    const inputStyles = getPersonalNumberInputStyles(props);
    const combinedStyles = { ...inputStyles, ...style };

    // Validate personal number
    const validateInput = useCallback(
      (inputValue: string) => {
        if (!inputValue.trim()) {
          setValidationResult({ isValid: false, errors: [], type: undefined });
          return;
        }

        setIsValidating(true);

        // Add small delay to simulate real validation
        setTimeout(() => {
          const result = validatePersonalNumber(inputValue, {
            allowDNumber: validation.allowDNumber,
            allowHNumber: validation.allowHNumber,
            strictFormat: validation.strictFormat,
          });

          setValidationResult(result);
          setIsValidating(false);

          if (onValidationChange) {
            onValidationChange(result.isValid, result.errors);
          }
        }, 300);
      },
      [validation, onValidationChange]
    );

    // Handle input change with formatting and validation
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = event.target.value;

        // Remove non-numeric characters and limit length
        const cleaned = newValue.replace(/\D/g, '');
        if (cleaned.length > 11) {
          return; // Don't allow more than 11 digits
        }

        // Auto-format during typing
        if (norwegian.autoFormat && norwegian.displayFormat === 'ddmmyy-nnnnn') {
          if (cleaned.length > 6) {
            newValue = `${cleaned.substring(0, 6)}-${cleaned.substring(6)}`;
          } else {
            newValue = cleaned;
          }
        } else {
          newValue = cleaned;
        }

        setInternalValue(newValue);

        // Real-time validation
        if (validation.realTimeValidation && cleaned.length === 11) {
          validateInput(cleaned);
        }

        if (onChange) {
          onChange(newValue, validationResult.isValid, event);
        }
      },
      [norwegian, validation, onChange, validationResult.isValid, validateInput]
    );

    // Validate on blur for complete inputs
    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        const cleaned = internalValue.replace(/\D/g, '');
        if (cleaned.length === 11) {
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
        if (cleaned.length === 11) {
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
          maxLength={norwegian.displayFormat === 'ddmmyy-nnnnn' ? 12 : 11} // Include hyphen
          autoComplete='off'
          inputMode='numeric'
          aria-label={ariaLabel || 'Fødselsnummer eller D-nummer'}
          aria-required={required}
          aria-invalid={currentHasError}
          aria-describedby={`${inputId}-help ${inputId}-error`}
          data-variant={props.variant}
          data-type='personal-number'
        />

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

PersonalNumberInput.displayName = 'PersonalNumberInput';
