/**
 * @fileoverview SSR-Safe Combobox Component - Production Strategy Implementation
 * @description Searchable dropdown component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, useState, useRef, useEffect, useMemo, type HTMLAttributes, type ReactNode } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Combobox option interface
 */
export interface ComboboxOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
  readonly group?: string;
  readonly description?: string;
  readonly icon?: ReactNode;
}

/**
 * Combobox variant types
 */
export type ComboboxVariant = 'default' | 'destructive' | 'success' | 'warning';

/**
 * Combobox size types
 */
export type ComboboxSize = 'sm' | 'default' | 'lg';

/**
 * Combobox component props interface
 */
export interface ComboboxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  readonly options: ComboboxOption[];
  readonly value?: string;
  readonly defaultValue?: string;
  readonly onValueChange?: (value: string, option?: ComboboxOption) => void;
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
  readonly variant?: ComboboxVariant;
  readonly size?: ComboboxSize;
  readonly emptyMessage?: string;
  readonly maxHeight?: string | number;
  readonly allowCustomValue?: boolean;
  readonly filterFunction?: (option: ComboboxOption, searchValue: string) => boolean;
}

/**
 * Default filter function
 */
const defaultFilterFunction = (option: ComboboxOption, searchValue: string): boolean => {
  const search = searchValue.toLowerCase();
  return (
    option.label.toLowerCase().includes(search) ||
    option.value.toLowerCase().includes(search) ||
    (option.description?.toLowerCase().includes(search) ?? false)
  );
};

/**
 * Enhanced Combobox component
 */
export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options,
      value,
      defaultValue,
      onValueChange,
      placeholder = 'Select an option...',
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
      allowCustomValue = false,
      filterFunction = defaultFilterFunction,
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
    const [selectedValue, setSelectedValue] = useState(value ?? defaultValue ?? '');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Generate ID if not provided
    const comboboxId = id || (label ? `combobox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    // Determine actual variant based on state
    const actualVariant = error || errorText ? 'destructive' : success || successText ? 'success' : variant;

    // Helper text to display
    const displayHelperText = errorText || successText || helperText;

    // Get selected option
    const selectedOption = useMemo(
      () => options.find(opt => opt.value === selectedValue),
      [options, selectedValue]
    );

    // Filter options based on search
    const filteredOptions = useMemo(() => {
      if (!searchValue) return options;
      return options.filter(option => filterFunction(option, searchValue));
    }, [options, searchValue, filterFunction]);

    // Group filtered options
    const groupedOptions = useMemo(() => {
      const groups: Record<string, ComboboxOption[]> = {};
      filteredOptions.forEach(option => {
        const groupName = option.group || '';
        if (!groups[groupName]) groups[groupName] = [];
        groups[groupName].push(option);
      });
      return groups;
    }, [filteredOptions]);

    // Update selected value when prop changes
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
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
              handleSelect(option);
            }
          } else if (allowCustomValue && searchValue) {
            handleSelect({ value: searchValue, label: searchValue });
          }
          break;
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          setSearchValue('');
          break;
      }
    };

    const handleSelect = (option: ComboboxOption): void => {
      setSelectedValue(option.value);
      setSearchValue('');
      setIsOpen(false);
      setHighlightedIndex(-1);
      onValueChange?.(option.value, option);
      inputRef.current?.blur();
    };

    const handleInputFocus = (): void => {
      if (!disabled) {
        setIsOpen(true);
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchValue(event.target.value);
      setHighlightedIndex(-1);
      if (!isOpen) {
        setIsOpen(true);
      }
    };

    // Get design tokens
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
      sm: (getToken('borderRadius.sm') as string) || '0.125rem',
    };
    
    const shadows = {
      lg: (getToken('shadows.lg') as string) || '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    };

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            height: '32px',
            paddingLeft: spacing[3],
            paddingRight: spacing[8],
            fontSize: typography.fontSize.xs,
          };
        case 'lg':
          return {
            height: '48px',
            paddingLeft: spacing[4],
            paddingRight: spacing[10],
            fontSize: typography.fontSize.base,
          };
        default:
          return {
            height: '40px',
            paddingLeft: spacing[3],
            paddingRight: spacing[10],
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
            color: colors.danger?.[500] || '#ef4444',
          };
        case 'success':
          return {
            borderColor: colors.success?.[500] || '#22c55e',
            color: colors.text?.primary || colors.neutral?.[900] || '#111827',
          };
        case 'warning':
          return {
            borderColor: colors.warning?.[500] || '#f59e0b',
            color: colors.text?.primary || colors.neutral?.[900] || '#111827',
          };
        default:
          return {
            borderColor: colors.border?.default || colors.neutral?.[200] || '#e5e7eb',
            color: colors.text?.primary || colors.neutral?.[900] || '#111827',
          };
      }
    };

    const sizeStyles = getSizeStyles();
    const variantStyles = getVariantStyles();

    // Input styles
    const inputStyles: React.CSSProperties = {
      display: 'flex',
      width: '100%',
      appearance: 'none',
      borderRadius: borderRadius.md,
      border: '1px solid',
      backgroundColor: colors.background?.default || '#ffffff',
      outline: 'none',
      cursor: disabled ? 'not-allowed' : 'text',
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

    // Chevron icon
    const ChevronIcon = (): React.ReactElement => (
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
    );

    const comboboxElement = (
      <div ref={containerRef} style={{ position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <input
            ref={inputRef}
            id={comboboxId}
            type="text"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={`${comboboxId}-listbox`}
            aria-invalid={error || !!errorText}
            aria-describedby={displayHelperText ? `${comboboxId}-helper` : undefined}
            aria-required={required}
            value={searchValue || (isOpen ? '' : selectedOption?.label || '')}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder={isOpen ? searchPlaceholder : placeholder}
            disabled={disabled}
            style={inputStyles}
          />
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: sizeStyles.height,
              pointerEvents: 'none',
              color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
            }}
          >
            <ChevronIcon />
          </div>
        </div>

        {isOpen && (
          <div
            ref={listRef}
            id={`${comboboxId}-listbox`}
            role="listbox"
            style={dropdownStyles}
          >
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
                  {groupOptions.map((option, index) => {
                    const globalIndex = filteredOptions.indexOf(option);
                    const isHighlighted = globalIndex === highlightedIndex;
                    const isSelected = option.value === selectedValue;

                    return (
                      <div
                        key={option.value}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                        onClick={() => !option.disabled && handleSelect(option)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: spacing[2],
                          padding: `${spacing[2]} ${spacing[3]}`,
                          cursor: option.disabled ? 'not-allowed' : 'pointer',
                          opacity: option.disabled ? 0.5 : 1,
                          backgroundColor: isHighlighted
                            ? colors.accent?.default || colors.neutral?.[100] || '#f3f4f6'
                            : 'transparent',
                          color: colors.text?.primary || colors.neutral?.[900] || '#111827',
                          fontSize: typography.fontSize.sm,
                          transition: 'background-color 150ms ease-in-out',
                        }}
                        onMouseEnter={() => !option.disabled && setHighlightedIndex(globalIndex)}
                      >
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
                        {isSelected && (
                          <svg
                            style={{ height: '16px', width: '16px' }}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
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
      return comboboxElement;
    }

    return (
      <div ref={ref} className={className} style={{ display: 'flex', flexDirection: 'column', gap: spacing[1.5], ...style }} {...props}>
        {label && (
          <label htmlFor={comboboxId} style={labelStyles}>
            {label}
            {required && (
              <span style={{ marginLeft: spacing[1], color: colors.danger?.[500] || '#ef4444' }} aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {comboboxElement}

        {displayHelperText && (
          <p id={`${comboboxId}-helper`} style={helperTextStyles}>
            {displayHelperText}
          </p>
        )}
      </div>
    );
  }
);

Combobox.displayName = 'Combobox';