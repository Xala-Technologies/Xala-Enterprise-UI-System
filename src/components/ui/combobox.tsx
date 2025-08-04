/**
 * @fileoverview SSR-Safe Combobox Component - Production Strategy Implementation
 * @description Searchable dropdown component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useMemo,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import {
  Box,
  Text,
  Heading,
  List,
  ListItem,
  Link,
} from '../semantic';

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
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(value ?? defaultValue ?? '');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Generate ID if not provided
    const comboboxId = id || (label ? `combobox-` : undefined);

    // Determine actual variant based on state
    const actualVariant =
      error || errorText ? 'destructive' : success || successText ? 'success' : variant;

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
            setHighlightedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (isOpen) {
            setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
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
      md: '0.375rem',
      sm: '0.125rem',
    };

    const shadows = {
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    };

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            height: '32px',
            paddingLeft: '0.75rem',
            paddingRight: '2rem',
            fontSize: '0.75rem',
          };
        case 'lg':
          return {
            height: '48px',
            paddingLeft: '1rem',
            paddingRight: spacing[10],
            fontSize: '1rem',
          };
        default:
          return {
            height: '40px',
            paddingLeft: '0.75rem',
            paddingRight: spacing[10],
            fontSize: '0.875rem',
          };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (actualVariant) {
        case 'destructive':
          return {
            borderColor: '#ef4444',
            color: '#ef4444',
          };
        case 'success':
          return {
            borderColor: '#22c55e',
            color: '#111827',
          };
        case 'warning':
          return {
            borderColor: '#f59e0b',
            color: '#111827',
          };
        default:
          return {
            borderColor: '#e5e7eb',
            color: '#111827',
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
      borderRadius: '0.375rem',
      border: '1px solid',
      backgroundColor: '#ffffff',
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
      marginTop: '0.25rem',
      maxHeight: typeof maxHeight === 'number' ? `px` : maxHeight,
      overflowY: 'auto',
      borderRadius: '0.375rem',
      border: `1px solid `,
      backgroundColor: '#ffffff',
      boxShadow: shadows.lg,
      zIndex: 50,
    };

    // Label styles
    const labelStyles: React.CSSProperties = {
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1',
      color:
        actualVariant === 'destructive'
          ? '#ef4444'
          : actualVariant === 'success'
            ? colors.success?.[600] || '#16a34a'
            : '#111827',
    };

    // Helper text styles
    const helperTextStyles: React.CSSProperties = {
      fontSize: '0.75rem',
      color:
        actualVariant === 'destructive'
          ? '#ef4444'
          : actualVariant === 'success'
            ? colors.success?.[600] || '#16a34a'
            : '#6b7280',
    };

    // Chevron icon
    const ChevronIcon = (): React.ReactElement => (
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    );

    const comboboxElement = (
      <Box ref={containerRef}>
        <Box>
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
          />
          <Box>
            <ChevronIcon />
          </Box>
        </Box>

        {isOpen && (
          <Box ref={listRef} id={`${comboboxId}-listbox`} role="listbox">
            {filteredOptions.length === 0 ? (
              <Box>{emptyMessage}</Box>
            ) : (
              Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                <Box key={groupName}>
                  {groupName && (
                    <Box className="px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {groupName}
                    </Box>
                  )}
                  {groupOptions.map((option, index) => {
                    const globalIndex = filteredOptions.indexOf(option);
                    const isHighlighted = globalIndex === highlightedIndex;
                    const isSelected = option.value === selectedValue;

                    return (
                      <Box
                        key={option.value}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                        onClick={() => !option.disabled && handleSelect(option)}
                        className={cn(
                          'px-3 py-2 text-sm cursor-pointer transition-colors',
                          isHighlighted && 'bg-accent',
                          isSelected && 'font-medium',
                          option.disabled && 'cursor-not-allowed opacity-50'
                        )}
                        onMouseEnter={() => !option.disabled && setHighlightedIndex(globalIndex)}
                      >
                        {option.icon && <Text as="span">{option.icon}</Text>}
                        <Box>
                          <Box>{option.label}</Box>
                          {option.description && <Box>{option.description}</Box>}
                        </Box>
                        {isSelected && (
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              ))
            )}
          </Box>
        )}
      </Box>
    );

    if (!label && !displayHelperText) {
      return comboboxElement;
    }

    return (
      <Box ref={ref} className={className} {...props}>
        {label && (
          <Text as="label" htmlFor={comboboxId}>
            {label}
            {required && (
              <Text as="span" aria-label="required">
                *
              </Text>
            )}
          </Text>
        )}

        {comboboxElement}

        {displayHelperText && <Text id={`${comboboxId}-helper`}>{displayHelperText}</Text>}
      </Box>
    );
  }
);

Combobox.displayName = 'Combobox';
