/**
 * Select component with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type SelectHTMLAttributes } from 'react';

/**
 * Chevron down icon component
 */
const ChevronDownIcon = ({ className }: { className?: string }): React.ReactElement => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Select option interface
 */
export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
  readonly group?: string;
}

/**
 * Select variants using class-variance-authority with semantic design tokens
 */
const selectVariants = cva(
  'flex w-full appearance-none rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
  {
    variants: {
      variant: {
        default: 'border-input focus-visible:ring-ring',
        destructive: 'border-destructive focus-visible:ring-destructive text-destructive',
        success: 'border-success focus-visible:ring-success text-success-foreground',
        warning: 'border-warning focus-visible:ring-warning text-warning-foreground',
      },
      size: {
        sm: 'h-8 px-3 py-1 text-xs pr-8',
        default: 'h-10 px-3 py-2 pr-10',
        lg: 'h-12 px-4 py-3 text-base pr-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * Select component props interface
 */
export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  readonly options: SelectOption[];
  readonly placeholder?: string;
  readonly label?: string;
  readonly helperText?: string;
  readonly errorText?: string;
  readonly successText?: string;
  readonly required?: boolean;
  readonly error?: boolean;
  readonly success?: boolean;
  readonly allowEmpty?: boolean;
  readonly emptyLabel?: string;
  onValueChange?: (value: string, event?: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * Group options by group property - pure function
 */
const getGroupedOptions = (options: SelectOption[]): Record<string, SelectOption[]> => {
  const groups: Record<string, SelectOption[]> = {};

  options.forEach(option => {
    const groupName = option.group || '';
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(option);
  });

  return groups;
};

/**
 * Enhanced Select component
 * @param variant - Select variant (default, destructive, success, warning)
 * @param size - Select size (sm, default, lg)
 * @param options - Array of select options
 * @param placeholder - Placeholder text
 * @param label - Select label
 * @param helperText - Helper text below select
 * @param errorText - Error text (overrides helperText when present)
 * @param successText - Success text (overrides helperText when present)
 * @param required - Whether select is required
 * @param error - Error state
 * @param success - Success state
 * @param allowEmpty - Whether to show an empty option
 * @param emptyLabel - Label for empty option
 * @param className - Additional CSS classes
 * @param id - Select ID
 * @param props - Additional select props
 * @returns Enhanced Select JSX element
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      options,
      placeholder,
      label,
      helperText,
      errorText,
      successText,
      required,
      error,
      success,
      allowEmpty = true,
      emptyLabel = 'Select an option...',
      id,
      onValueChange,
      ...props
    },
    ref
  ): React.ReactElement => {
    // Generate ID if not provided and label exists
    const selectId =
      id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    // Determine actual variant based on state
    const actualVariant =
      error || errorText ? 'destructive' : success || successText ? 'success' : variant;

    // Helper text to display
    const displayHelperText = errorText || successText || helperText;

    // Group options by group property
    const groupedOptions = getGroupedOptions(options);

    const selectElement = (
      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          className={cn(selectVariants({ variant: actualVariant, size }), className)}
          aria-invalid={error || !!errorText}
          aria-describedby={displayHelperText ? `${selectId}-helper` : undefined}
          aria-required={required}
          onChange={e => {
            onValueChange?.(e.target.value, e);
            if (props.onChange) props.onChange(e);
          }}
          {...props}
        >
          {allowEmpty && (
            <option value="" disabled={required}>
              {placeholder || emptyLabel}
            </option>
          )}

          {Object.entries(groupedOptions).map(([groupName, groupOptions]) => {
            if (groupName) {
              return (
                <optgroup key={groupName} label={groupName}>
                  {groupOptions.map(option => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              );
            } else {
              return groupOptions.map(option => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ));
            }
          })}
        </select>

        {/* Chevron icon */}
        <div
          className={cn(
            'absolute right-0 top-0 flex items-center justify-center pointer-events-none text-muted-foreground',
            {
              'h-8 w-8': size === 'sm',
              'h-10 w-10': size === 'default',
              'h-12 w-12': size === 'lg',
            }
          )}
        >
          <ChevronDownIcon
            className={cn({
              'h-3 w-3': size === 'sm',
              'h-4 w-4': size === 'default',
              'h-5 w-5': size === 'lg',
            })}
          />
        </div>
      </div>
    );

    if (!label && !displayHelperText) {
      return selectElement;
    }

    return (
      <div className="select-field space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              {
                'text-destructive': error || errorText,
                'text-success': success || successText,
              }
            )}
          >
            {label}
            {required && (
              <span className="text-destructive ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {selectElement}

        {displayHelperText && (
          <p
            id={`${selectId}-helper`}
            className={cn('text-xs', {
              'text-destructive': error || errorText,
              'text-success': success || successText,
              'text-muted-foreground': !error && !errorText && !success && !successText,
            })}
          >
            {displayHelperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

/**
 * Select variants type exports
 */
export type SelectVariant = VariantProps<typeof selectVariants>['variant'];
export type SelectSize = VariantProps<typeof selectVariants>['size'];
