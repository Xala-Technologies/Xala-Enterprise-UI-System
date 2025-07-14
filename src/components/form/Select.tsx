// React mock for development
import React from 'react';

// Select option interface
interface SelectOption {
  value: string;
  labelKey?: string;
  label?: string;
  disabled?: boolean;
  classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  group?: string;
}

// Select - Norwegian government-compliant select dropdown component
interface SelectProps {
  labelKey?: string;
  label?: string;
  placeholderKey?: string;
  placeholder?: string;
  helpTextKey?: string;
  helpText?: string;
  errorMessageKey?: string;
  errorMessage?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'filled' | 'outlined';
  status?: 'default' | 'error' | 'warning' | 'success';
  norwegian?: {
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    municipality?: string;
    includeMunicipalities?: boolean;
    includeCounties?: boolean;
    sortOrder?: 'alphabetical' | 'code' | 'population';
    filterByRegion?: string;
  };
  onChange?: (event: React.MouseEvent<HTMLElement>) => void;
  onBlur?: (event: React.MouseEvent<HTMLElement>) => void;
  onFocus?: (event: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
  id?: string;
}

/**
 * Select - Norwegian government-compliant dropdown selection
 *
 * Features:
 * - WCAG 2.2 AA accessibility compliance
 * - Norwegian municipality and county options
 * - NSM security classification support
 * - Grouped options with Norwegian regions
 * - Design token integration
 * - Multi-select capability
 *
 * Norwegian Compliance:
 * - Pre-loaded Norwegian municipalities and counties
 * - NSM data classification indicators
 * - DigDir form guidelines compliance
 * - Norwegian sorting and filtering
 */
export const Select = React.forwardRef((props: SelectProps, ref: unknown): React.ReactElement => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-2)',
        width: '100%',
        ...style,
      }}
    >
      {/* Label */}
      {(label || labelKey) && (
        <label
          htmlFor={selectId}
          style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: disabled ? 'var(--color-text-disabled)' : 'var(--color-text-primary)',
            lineHeight: 'var(--line-height-normal)',
          }}
        >
          {labelKey ? t(labelKey) : label}
          {required && (
            <span
              style={{
                color: 'var(--color-danger-500)',
                marginLeft: 'var(--spacing-1)',
              }}
              aria-label={t('form.required')}
            >
              *
            </span>
          )}
          {/* NSM Classification indicator */}
          {norwegian?.classification && (
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-normal)',
                color: 'var(--color-text-secondary)',
                marginLeft: 'var(--spacing-2)',
                textTransform: 'uppercase',
              }}
            >
              ({norwegian.classification})
            </span>
          )}
        </label>
      )}

      {/* Select */}
      <select
        ref={ref}
        id={selectId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
        multiple={multiple}
        aria-describedby={ariaDescribedBy}
        aria-invalid={status === 'error'}
        data-classification={norwegian?.classification}
        data-municipality={norwegian?.municipality}
        style={{
          width: '100%',
          border: '1px solid',
          borderRadius: 'var(--border-radius-md)',
          backgroundColor: disabled
            ? 'var(--color-surface-disabled)'
            : 'var(--color-surface-primary)',
          color: disabled ? 'var(--color-text-disabled)' : 'var(--color-text-primary)',
          fontFamily: 'var(--font-family-base)',
          lineHeight: 'var(--line-height-normal)',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          outline: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          ...sizeStyles,
          ...statusStyles,
          ...classificationStyles,
        }}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...restProps}
      >
        {/* Placeholder option */}
        {(placeholder || placeholderKey) && !multiple && (
          <option value="" disabled hidden>
            {placeholderKey ? t(placeholderKey) : placeholder}
          </option>
        )}

        {/* Options */}
        {renderOptions()}
      </select>

      {/* Help text */}
      {(helpText || helpTextKey) && (
        <div
          id={helpTextId}
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--line-height-normal)',
          }}
        >
          {helpTextKey ? t(helpTextKey) : helpText}
        </div>
      )}

      {/* Error message */}
      {(errorMessage || errorMessageKey) && (
        <div
          id={errorId}
          role="alert"
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-danger-600)',
            fontWeight: 'var(--font-weight-medium)',
            lineHeight: 'var(--line-height-normal)',
          }}
        >
          {errorMessageKey ? t(errorMessageKey) : errorMessage}
        </div>
      )}
    </div>
  );
});

Select.displayName = 'Select';
