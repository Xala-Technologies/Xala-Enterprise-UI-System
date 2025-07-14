// React mock for development
import React from 'react';

const React = {
  forwardRef: (Component: unknown) => Component,
};

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
export const Select = React.forwardRef((props: SelectProps, ref: unknown): void => {
  const {
    labelKey,
    label,
    placeholderKey,
    placeholder,
    helpTextKey,
    helpText,
    errorMessageKey,
    errorMessage,
    name,
    value,
    defaultValue,
    options: providedOptions,
    required = false,
    disabled = false,
    multiple = false,
    size = 'medium',
    variant = 'default',
    status = 'default',
    norwegian,
    onChange,
    onBlur,
    onFocus,
    style,
    id,
    ...restProps
  } = props;

  // Mock translation function
  const t = (key: string) => key;

  // Generate unique ID if not provided
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const helpTextId = `${selectId}-help`;
  const errorId = `${selectId}-error`;

  // Norwegian municipalities data (sample)
  const norwegianMunicipalities: SelectOption[] = [
    { value: '0301', labelKey: 'municipalities.oslo', label: 'Oslo', group: 'Oslo' },
    { value: '1103', labelKey: 'municipalities.stavanger', label: 'Stavanger', group: 'Rogaland' },
    { value: '5001', labelKey: 'municipalities.trondheim', label: 'Trondheim', group: 'Trøndelag' },
    { value: '4601', labelKey: 'municipalities.bergen', label: 'Bergen', group: 'Vestland' },
    {
      value: '2103',
      labelKey: 'municipalities.tromso',
      label: 'Tromsø',
      group: 'Troms og Finnmark',
    },
    { value: '3401', labelKey: 'municipalities.hamar', label: 'Hamar', group: 'Innlandet' },
    {
      value: '1001',
      labelKey: 'municipalities.kristiansand',
      label: 'Kristiansand',
      group: 'Agder',
    },
  ];

  // Norwegian counties data (sample)
  const norwegianCounties: SelectOption[] = [
    { value: 'oslo', labelKey: 'counties.oslo', label: 'Oslo' },
    { value: 'rogaland', labelKey: 'counties.rogaland', label: 'Rogaland' },
    { value: 'trondelag', labelKey: 'counties.trondelag', label: 'Trøndelag' },
    { value: 'vestland', labelKey: 'counties.vestland', label: 'Vestland' },
    { value: 'troms-finnmark', labelKey: 'counties.tromsFinnmark', label: 'Troms og Finnmark' },
    { value: 'innlandet', labelKey: 'counties.innlandet', label: 'Innlandet' },
    { value: 'agder', labelKey: 'counties.agder', label: 'Agder' },
  ];

  // Build complete options list
  const getCompleteOptions = (): SelectOption[] => {
    let allOptions = [...providedOptions];

    if (norwegian?.includeMunicipalities) {
      allOptions = [...allOptions, ...norwegianMunicipalities];
    }

    if (norwegian?.includeCounties) {
      allOptions = [...allOptions, ...norwegianCounties];
    }

    // Sort options based on Norwegian preferences
    if (norwegian?.sortOrder === 'alphabetical') {
      allOptions.sort((a, b): void => {
        const aLabel = a.labelKey ? t(a.labelKey) : a.label || '';
        const bLabel = b.labelKey ? t(b.labelKey) : b.label || '';
        return aLabel.localeCompare(bLabel, 'nb-NO');
      });
    } else if (norwegian?.sortOrder === 'code') {
      allOptions.sort((a, b) => a.value.localeCompare(b.value));
    }

    // Filter by region if specified
    if (norwegian?.filterByRegion) {
      allOptions = allOptions.filter(
        option => !option.group || option.group === norwegian.filterByRegion
      );
    }

    return allOptions;
  };

  const completeOptions = getCompleteOptions();

  // Group options by region/category
  const groupedOptions = completeOptions.reduce(
    (groups: Record<string, SelectOption[]>, option): void => {
      const group = option.group || 'default';
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(option);
      return groups;
    },
    {}
  );

  // Size variants
  const getSizeStyles = (): void => {
    const sizes: Record<string, unknown> = {
      small: {
        fontSize: 'var(--font-size-sm)',
        padding: 'var(--spacing-2) var(--spacing-3)',
        minHeight: 'var(--spacing-10)', // ~40px
      },
      medium: {
        fontSize: 'var(--font-size-base)',
        padding: 'var(--spacing-3) var(--spacing-4)',
        minHeight: 'var(--spacing-11)', // ~44px
      },
      large: {
        fontSize: 'var(--font-size-lg)',
        padding: 'var(--spacing-4) var(--spacing-5)',
        minHeight: 'var(--spacing-12)', // ~48px
      },
    };
    return sizes[size];
  };

  // Status colors
  const getStatusStyles = (): void => {
    const statuses: Record<string, unknown> = {
      default: {
        borderColor: 'var(--color-border-default)',
        focusBorderColor: 'var(--color-primary-500)',
      },
      error: {
        borderColor: 'var(--color-danger-500)',
        focusBorderColor: 'var(--color-danger-600)',
      },
      warning: {
        borderColor: 'var(--color-warning-500)',
        focusBorderColor: 'var(--color-warning-600)',
      },
      success: {
        borderColor: 'var(--color-success-500)',
        focusBorderColor: 'var(--color-success-600)',
      },
    };
    return statuses[status];
  };

  // NSM Classification styling
  const getClassificationStyles = (): void => {
    if (!norwegian?.classification) {
      return {};
    }

    const classificationColors: Record<string, string> = {
      ÅPEN: 'var(--color-success-500)',
      BEGRENSET: 'var(--color-warning-500)',
      KONFIDENSIELT: 'var(--color-danger-500)',
      HEMMELIG: 'var(--color-danger-700)',
    };

    return {
      borderLeft: `4px solid ${classificationColors[norwegian.classification]}`,
      paddingLeft: 'calc(var(--spacing-4) - 4px)',
    };
  };

  const sizeStyles = getSizeStyles();
  const statusStyles = getStatusStyles();
  const classificationStyles = getClassificationStyles();

  // Build aria-describedby
  const ariaDescribedBy =
    [
      helpText || helpTextKey ? helpTextId : null,
      errorMessage || errorMessageKey ? errorId : null,
      restProps['aria-describedby'],
    ]
      .filter(Boolean)
      .join(' ') || undefined;

  // Render options or option groups
  const renderOptions = (): void => {
    if (Object.keys(groupedOptions).length > 1 && groupedOptions.default === undefined) {
      // Render with optgroups
      return Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
        <optgroup key={groupName} label={t(`regions.${groupName.toLowerCase()}`) || groupName}>
          {groupOptions.map(option => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              data-classification={option.classification}
            >
              {option.labelKey ? t(option.labelKey) : option.label}
            </option>
          ))}
        </optgroup>
      ));
    } else {
      // Render flat options
      return completeOptions.map(option => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          data-classification={option.classification}
        >
          {option.labelKey ? t(option.labelKey) : option.label}
        </option>
      ));
    }
  };

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
