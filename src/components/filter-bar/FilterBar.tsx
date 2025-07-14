/**
 * Filter Bar Component
 * Comprehensive filter bar with search, combo boxes, and view toggles
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type ReactNode } from 'react';

/**
 * Filter bar variants using design tokens
 */
const filterBarVariants = cva(
  [
    'w-full border-b border-border',
    'bg-background/95 backdrop-blur',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        primary: 'bg-primary/5 border-primary/20',
        secondary: 'bg-secondary/5 border-secondary/20',
      },
      size: {
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Filter option for combo boxes
 */
export interface FilterOption {
  /** Option value */
  readonly value: string;
  /** Option label */
  readonly label: string;
  /** Option disabled state */
  readonly disabled?: boolean;
}

/**
 * View toggle option
 */
export interface ViewOption {
  /** View value */
  readonly value: string;
  /** View label */
  readonly label: string;
  /** View icon */
  readonly icon?: ReactNode;
  /** View disabled state */
  readonly disabled?: boolean;
}

/**
 * Filter Bar Props
 */
export interface FilterBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Filter bar variant */
  readonly variant?: 'default' | 'primary' | 'secondary';
  /** Filter bar size */
  readonly size?: 'sm' | 'md' | 'lg';
  /** Search placeholder */
  readonly searchPlaceholder?: string;
  /** Search value */
  readonly searchValue?: string;
  /** Search change handler */
  readonly onSearchChange?: (value: string) => void;
  /** Filter options */
  readonly filters?: readonly {
    readonly id: string;
    readonly label: string;
    readonly value: string;
    readonly options: readonly FilterOption[];
    readonly placeholder?: string;
  }[];
  /** Filter change handler */
  readonly onFilterChange?: (filterId: string, value: string) => void;
  /** View options */
  readonly viewOptions?: readonly ViewOption[];
  /** Current view value */
  readonly currentView?: string;
  /** View change handler */
  readonly onViewChange?: (value: string) => void;
  /** Additional actions */
  readonly actions?: ReactNode;
}

/**
 * Filter Bar Component
 * @param props - Filter bar properties
 * @returns JSX.Element
 */
export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(
  (
    {
      variant = 'default',
      size = 'md',
      searchPlaceholder = 'Search...',
      searchValue = '',
      onSearchChange,
      filters = [],
      onFilterChange,
      viewOptions = [],
      currentView = '',
      onViewChange,
      actions,
      className,
      ...props
    },
    ref
  ): void => {
    /**
     * Handle search input change
     * @param e - Input change event
     */
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      onSearchChange?.(e.target.value);
    };

    /**
     * Handle filter change
     * @param filterId - Filter identifier
     * @param value - Selected value
     */
    const handleFilterChange = (filterId: string, value: string): void => {
      onFilterChange?.(filterId, value);
    };

    /**
     * Handle view change
     * @param value - Selected view value
     */
    const handleViewChange = (value: string): void => {
      onViewChange?.(value);
    };

    return (
      <div ref={ref} className={cn(filterBarVariants({ variant, size }), className)} {...props}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left Section - Search and Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder}
                className="w-full sm:w-64 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Search"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Filter Combo Boxes */}
            {filters.map(filter => (
              <div key={filter.id} className="flex items-center gap-2">
                <label className="text-sm font-medium text-foreground whitespace-nowrap">
                  {filter.label}:
                </label>
                <select
                  value={filter.value}
                  onChange={e => handleFilterChange(filter.id, e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label={`Filter by ${filter.label}`}
                >
                  {filter.placeholder && <option value="">{filter.placeholder}</option>}
                  {filter.options.map(option => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Right Section - View Toggles and Actions */}
          <div className="flex items-center gap-3">
            {/* View Toggles */}
            {viewOptions.length > 0 && (
              <div className="flex items-center bg-muted rounded-md p-1">
                {viewOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleViewChange(option.value)}
                    disabled={option.disabled}
                    className={cn(
                      'px-3 py-1 text-sm font-medium rounded-sm transition-colors',
                      'hover:bg-background hover:text-foreground',
                      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      currentView === option.value
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground'
                    )}
                    aria-label={`Switch to ${option.label} view`}
                    aria-pressed={currentView === option.value}
                  >
                    <div className="flex items-center gap-2">
                      {option.icon}
                      <span>{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Additional Actions */}
            {actions}
          </div>
        </div>
      </div>
    );
  }
);

FilterBar.displayName = 'FilterBar';

/**
 * Filter bar variants and types
 */
export type FilterBarVariant = VariantProps<typeof filterBarVariants>;

export { filterBarVariants };
