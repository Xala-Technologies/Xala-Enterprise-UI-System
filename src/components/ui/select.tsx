/**
 * @fileoverview Select Component v5.0.0 - Token-Based Design System
 * @description Modern Select component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

// ✅ NO 'use client' directive - works in SSR
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { Box, Input } from '../semantic';

// =============================================================================
// SELECT VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Chevron down icon component
 */
const ChevronDownIcon = (): React.ReactElement => (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Select variants using semantic Tailwind classes
 * Pure CVA implementation with design token classes
 */
const selectVariants = cva(
  // Base classes using semantic tokens
  'flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
  {
    variants: {
      variant: {
        default: 'border-input bg-background',
        filled: 'border-transparent bg-muted',
        outline: 'border-2 border-input bg-transparent',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-10 px-3',
        lg: 'h-12 px-4 text-base',
      },
      state: {
        default: '',
        error: 'border-destructive focus:ring-destructive',
        success: 'border-success focus:ring-success',
        warning: 'border-warning focus:ring-warning',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default',
    },
  }
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

// =============================================================================
// COMPONENT TYPES
// =============================================================================

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  readonly options: SelectOption[];
  readonly placeholder?: string;
  readonly error?: boolean;
  readonly success?: boolean;
  readonly onValueChange?: (value: string) => void;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

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
 * Select component using CVA pattern with design tokens
 * Pure presentational component with external state management
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, size, state, options, placeholder, error, success, onValueChange, ...props }, ref) => {
    // Determine state based on error/success props
    const actualState = error ? 'error' : success ? 'success' : state;

    // Group options by group property
    const groupedOptions = getGroupedOptions(options);

    return (
      <Box className="relative">
        <Input
          as="select"
          className={cn(selectVariants({ variant, size, state: actualState }), className)}
          ref={ref}
          onChange={e => {
            onValueChange?.(e.target.value);
            props.onChange?.(e);
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
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
        </Input>

        {/* Chevron icon */}
        <Box className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon />
        </Box>
      </Box>
    );
  }
);

Select.displayName = 'Select';
