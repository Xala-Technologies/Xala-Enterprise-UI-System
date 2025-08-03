/**
 * @fileoverview SSR-Safe MultiSelect Component - Production Strategy Implementation
 * @description Multi-select dropdown component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, useState, useRef, useEffect, useMemo, type HTMLAttributes, type ReactNode } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * MultiSelect option interface
 */
export interface MultiSelectOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
  readonly group?: string;
  readonly description?: string;
  readonly icon?: ReactNode;
}

/**
 * MultiSelect variant types
 */
export type MultiSelectVariant = 'default' | 'destructive' | 'success' | 'warning';

/**
 * MultiSelect size types
 */
export type MultiSelectSize = 'sm' | 'default' | 'lg';

/**
 * MultiSelect display mode types
 */
export type MultiSelectDisplayMode = 'chips' | 'counter' | 'list';

/**
 * MultiSelect component props interface
 */
export interface MultiSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  readonly options: MultiSelectOption[];
  readonly value?: string[];
  readonly defaultValue?: string[];
  readonly onValueChange?: (values: string[], options?: MultiSelectOption[]) => void;
  readonly placeholder?: string;
  readonly searchPlaceholder?: string;
  readonly label?: string;
  readonly helperText?: string;
  readonly errorText?: string;
  readonly successText?: string;
  readonly required?: boolean;
  readonly error?: boolean;
  readonly success?: boolean;
  readonly disabled?: boolean;
  readonly variant?: MultiSelectVariant;
  readonly size?: MultiSelectSize;
  readonly emptyMessage?: string;
  readonly maxHeight?: string | number;
  readonly max?: number;
  readonly displayMode?: MultiSelectDisplayMode;
  readonly filterFunction?: (option: MultiSelectOption, searchValue: string) => boolean;
  readonly selectAllLabel?: string;
  readonly clearAllLabel?: string;
  readonly showSelectAll?: boolean;
}

/**
 * Default filter function
 */
const defaultFilterFunction = (option: MultiSelectOption, searchValue: string): boolean => {
  const search = searchValue.toLowerCase();
  return (
    option.label.toLowerCase().includes(search) ||
    option.value.toLowerCase().includes(search) ||
    (option.description?.toLowerCase().includes(search) ?? false)
  );
};

/**
 * Enhanced MultiSelect component
 */
export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onValueChange,
      placeholder = 'Select options...',
      searchPlaceholder = 'Search...',
      label,
      helperText,
      errorText,
      successText,
      required,
      error,
      success,
      disabled,
      variant = 'default',
      size = 'default',
      emptyMessage = 'No results found',
      maxHeight = 300,
      max,
      displayMode = 'chips',
      filterFunction = defaultFilterFunction,
      selectAllLabel = 'Select All',
      clearAllLabel = 'Clear All',
      showSelectAll = true,
      id,
      className,
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography, getToken } = useTokens();
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedValues, setSelectedValues] = useState<string[]>(value ?? defaultValue ?? []);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Generate ID if not provided
    const multiSelectId = id || (label ? `multiselect-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    // Determine actual variant based on state
    const actualVariant = error || errorText ? 'destructive' : success || successText ? 'success' : variant;

    // Helper text to display
    const displayHelperText = errorText || successText || helperText;

    // Get selected options
    const selectedOptions = useMemo(
      () => options.filter(opt => selectedValues.includes(opt.value)),
      [options, selectedValues]
    );

    // Filter options based on search
    const filteredOptions = useMemo(() => {
      if (!searchValue) return options;
      return options.filter(option => filterFunction(option, searchValue));
    }, [options, searchValue, filterFunction]);

    // Group filtered options
    const groupedOptions = useMemo(() => {
      const groups: Record<string, MultiSelectOption[]> = {};
      filteredOptions.forEach(option => {
        const groupName = option.group || '';
        if (!groups[groupName]) groups[groupName] = [];
        groups[groupName].push(option);
      });
      return groups;
    }, [filteredOptions]);

    // Update selected values when prop changes
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValues(value);
      }
    }, [value]);

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent): void => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (disabled) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex(prev => 
              prev < filteredOptions.length - 1 ? prev + 1 : prev
            );
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (isOpen) {
            setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
          }
          break;
        case 'Enter':
          event.preventDefault();
          if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
            const option = filteredOptions[highlightedIndex];
            if (!option.disabled) {
              handleToggleOption(option);
            }
          }
          break;
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          setSearchValue('');
          break;
      }
    };

    const handleToggleOption = (option: MultiSelectOption): void => {
      if (max && selectedValues.length >= max && !selectedValues.includes(option.value)) {
        return;
      }

      const newValues = selectedValues.includes(option.value)
        ? selectedValues.filter(v => v !== option.value)
        : [...selectedValues, option.value];

      setSelectedValues(newValues);
      const newSelectedOptions = options.filter(opt => newValues.includes(opt.value));
      onValueChange?.(newValues, newSelectedOptions);
    };

    const handleSelectAll = (): void => {
      const availableOptions = filteredOptions.filter(opt => !opt.disabled);
      const availableValues = availableOptions.map(opt => opt.value);
      const maxValues = max ? availableValues.slice(0, max) : availableValues;
      
      setSelectedValues(maxValues);
      const newSelectedOptions = options.filter(opt => maxValues.includes(opt.value));
      onValueChange?.(maxValues, newSelectedOptions);
    };

    const handleClearAll = (): void => {
      setSelectedValues([]);
      onValueChange?.([], []);
    };

    const handleRemoveChip = (valueToRemove: string): void => {
      const newValues = selectedValues.filter(v => v !== valueToRemove);
      setSelectedValues(newValues);
      const newSelectedOptions = options.filter(opt => newValues.includes(opt.value));
      onValueChange?.(newValues, newSelectedOptions);
    };

    // Get design tokens
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
      sm: (getToken('borderRadius.sm') as string) || '0.125rem',
      full: (getToken('borderRadius.full') as string) || '9999px',
    };
    
    const shadows = {
      lg: (getToken('shadows.lg') as string) || '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    };

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            minHeight: '32px',
            paddingLeft: spacing[3],
            paddingRight: spacing[8],
            paddingTop: spacing[1],
            paddingBottom: spacing[1],
            fontSize: typography.fontSize.xs,
          };
        case 'lg':
          return {
            minHeight: '48px',
            paddingLeft: spacing[4],
            paddingRight: spacing[10],
            paddingTop: spacing[2],
            paddingBottom: spacing[2],
            fontSize: typography.fontSize.base,
          };
        default:
          return {
            minHeight: '40px',
            paddingLeft: spacing[3],
            paddingRight: spacing[10],
            paddingTop: spacing[1.5],
            paddingBottom: spacing[1.5],
            fontSize: typography.fontSize.sm,
          };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (actualVariant) {
        case 'destructive':
          return {
            borderColor: colors.danger?.[500] || '#ef4444',
          };
        case 'success':
          return {
            borderColor: colors.success?.[500] || '#22c55e',
          };
        case 'warning':
          return {
            borderColor: colors.warning?.[500] || '#f59e0b',
          };
        default:
          return {
            borderColor: colors.border?.default || colors.neutral?.[200] || '#e5e7eb',
          };
      }
    };

    const sizeStyles = getSizeStyles();
    const variantStyles = getVariantStyles();

    // Container styles
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: spacing[1],
      borderRadius: borderRadius.md,
      border: '1px solid',
      backgroundColor: colors.background?.default || '#ffffff',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 150ms ease-in-out',
      ...sizeStyles,
      ...variantStyles,
      ...(disabled && {
        opacity: 0.5,
      }),
    };

    // Dropdown styles
    const dropdownStyles: React.CSSProperties = {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: spacing[1],
      maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
      overflowY: 'auto',
      borderRadius: borderRadius.md,
      border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
      backgroundColor: colors.background?.paper || colors.background?.default || '#ffffff',
      boxShadow: shadows.lg,
      zIndex: 50,
    };

    // Label styles
    const labelStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.none,
      color: actualVariant === 'destructive' 
        ? (colors.danger?.[500] || '#ef4444')
        : actualVariant === 'success'
        ? (colors.success?.[600] || '#16a34a')
        : (colors.text?.primary || colors.neutral?.[900] || '#111827'),
    };

    // Helper text styles
    const helperTextStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: actualVariant === 'destructive' 
        ? (colors.danger?.[500] || '#ef4444') 
        : actualVariant === 'success'
        ? (colors.success?.[600] || '#16a34a')
        : (colors.text?.secondary || colors.neutral?.[500] || '#6b7280'),
    };

    // Chip styles
    const chipStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: spacing[1],
      padding: `${spacing[0.5]} ${spacing[2]}`,
      backgroundColor: colors.primary?.[100] || '#dbeafe',
      color: colors.primary?.[700] || '#1d4ed8',
      borderRadius: borderRadius.full,
      fontSize: typography.fontSize.xs,
    };

    // Render selected display
    const renderSelectedDisplay = (): ReactNode => {
      if (selectedValues.length === 0) {
        return (
          <span style={{ color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280' }}>
            {placeholder}
          </span>
        );
      }

      switch (displayMode) {
        case 'counter':
          return <span>{selectedValues.length} selected</span>;
        case 'list':
          return <span>{selectedOptions.map(opt => opt.label).join(', ')}</span>;
        case 'chips':
        default:
          return selectedOptions.map(option => (
            <span key={option.value} style={chipStyles}>
              {option.label}
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveChip(option.value);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  aria-label={`Remove ${option.label}`}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </span>
          ));
      }
    };

    const multiSelectElement = (
      <div ref={containerRef} style={{ position: 'relative' }}>
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          style={containerStyles}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${multiSelectId}-listbox`}
          aria-invalid={error || !!errorText}
          aria-describedby={displayHelperText ? `${multiSelectId}-helper` : undefined}
          aria-required={required}
        >
          <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: spacing[1] }}>
            {renderSelectedDisplay()}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              flexShrink: 0,
              color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
            }}
          >
            <svg
              style={{
                height: '16px',
                width: '16px',
                transition: 'transform 150ms ease-in-out',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div
            ref={listRef}
            id={`${multiSelectId}-listbox`}
            role="listbox"
            aria-multiselectable="true"
            style={dropdownStyles}
          >
            <div style={{ padding: spacing[2] }}>
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={searchPlaceholder}
                style={{
                  width: '100%',
                  padding: spacing[2],
                  borderRadius: borderRadius.sm,
                  border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
                  backgroundColor: colors.background?.default || '#ffffff',
                  fontSize: typography.fontSize.sm,
                  outline: 'none',
                }}
              />
            </div>

            {showSelectAll && filteredOptions.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: `${spacing[1]} ${spacing[3]}`,
                  borderBottom: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
                }}
              >
                <button
                  type="button"
                  onClick={handleSelectAll}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: spacing[1],
                    cursor: 'pointer',
                    color: colors.primary?.[600] || '#2563eb',
                    fontSize: typography.fontSize.sm,
                  }}
                >
                  {selectAllLabel}
                </button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: spacing[1],
                    cursor: 'pointer',
                    color: colors.primary?.[600] || '#2563eb',
                    fontSize: typography.fontSize.sm,
                  }}
                >
                  {clearAllLabel}
                </button>
              </div>
            )}

            {filteredOptions.length === 0 ? (
              <div
                style={{
                  padding: spacing[3],
                  textAlign: 'center',
                  color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
                  fontSize: typography.fontSize.sm,
                }}
              >
                {emptyMessage}
              </div>
            ) : (
              Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                <div key={groupName}>
                  {groupName && (
                    <div
                      style={{
                        padding: `${spacing[1.5]} ${spacing[3]}`,
                        fontSize: typography.fontSize.xs,
                        fontWeight: typography.fontWeight.semibold,
                        color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
                      }}
                    >
                      {groupName}
                    </div>
                  )}
                  {groupOptions.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    const isDisabled = option.disabled || (max && selectedValues.length >= max && !isSelected);

                    return (
                      <div
                        key={option.value}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={isDisabled}
                        onClick={() => !isDisabled && handleToggleOption(option)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: spacing[2],
                          padding: `${spacing[2]} ${spacing[3]}`,
                          cursor: isDisabled ? 'not-allowed' : 'pointer',
                          opacity: isDisabled ? 0.5 : 1,
                          backgroundColor: 'transparent',
                          color: colors.text?.primary || colors.neutral?.[900] || '#111827',
                          fontSize: typography.fontSize.sm,
                          transition: 'background-color 150ms ease-in-out',
                        }}
                        onMouseEnter={(e) => {
                          if (!isDisabled) {
                            e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: borderRadius.sm,
                            border: `2px solid ${isSelected ? colors.primary?.[600] || '#2563eb' : colors.border?.default || colors.neutral?.[300] || '#d1d5db'}`,
                            backgroundColor: isSelected ? colors.primary?.[600] || '#2563eb' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {isSelected && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="white">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        {option.icon && (
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px' }}>
                            {option.icon}
                          </span>
                        )}
                        <div style={{ flex: 1 }}>
                          <div>{option.label}</div>
                          {option.description && (
                            <div
                              style={{
                                fontSize: typography.fontSize.xs,
                                color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
                              }}
                            >
                              {option.description}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );

    if (!label && !displayHelperText) {
      return multiSelectElement;
    }

    return (
      <div ref={ref} className={className} style={{ display: 'flex', flexDirection: 'column', gap: spacing[1.5], ...style }} {...props}>
        {label && (
          <label htmlFor={multiSelectId} style={labelStyles}>
            {label}
            {required && (
              <span style={{ marginLeft: spacing[1], color: colors.danger?.[500] || '#ef4444' }} aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {multiSelectElement}

        {displayHelperText && (
          <p id={`${multiSelectId}-helper`} style={helperTextStyles}>
            {displayHelperText}
          </p>
        )}
      </div>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';