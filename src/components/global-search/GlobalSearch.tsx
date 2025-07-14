/**
 * Global Search Component
 * Comprehensive search with autocomplete and keyboard navigation
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type ReactNode } from 'react';

/**
 * Global search variants using design tokens
 */
const globalSearchVariants = cva(
  ['relative w-full', 'transition-all duration-200', 'motion-reduce:transition-none'],
  {
    variants: {
      variant: {
        default: 'bg-background border border-border',
        primary: 'bg-primary/10 border border-primary/20',
        secondary: 'bg-secondary/10 border border-secondary/20',
      },
      size: {
        sm: 'h-8',
        md: 'h-10',
        lg: 'h-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Search input variants using design tokens
 */
const searchInputVariants = cva(
  [
    'w-full bg-transparent outline-none',
    'text-foreground placeholder:text-muted-foreground',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/**
 * Search result item
 */
export interface SearchResultItem {
  /** Unique identifier */
  readonly id: string;
  /** Display title */
  readonly title: string;
  /** Description */
  readonly description?: string;
  /** Category */
  readonly category?: string;
  /** Icon */
  readonly icon?: ReactNode;
  /** URL */
  readonly url?: string;
  /** Click handler */
  readonly onClick?: () => void;
}

/**
 * Global Search Props
 */
export interface GlobalSearchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'results' | 'onChange' | 'onSubmit'> {
  /** Search variant */
  readonly variant?: 'default' | 'primary' | 'secondary';
  /** Search size */
  readonly size?: 'sm' | 'md' | 'lg';
  /** Placeholder text */
  readonly placeholder?: string;
  /** Search value */
  readonly value?: string;
  /** Search change handler */
  readonly onChange?: (value: string) => void;
  /** Search submit handler */
  readonly onSubmit?: (value: string) => void;
  /** Search results */
  readonly results?: readonly SearchResultItem[];
  /** Loading state */
  readonly loading?: boolean;
  /** Show results */
  readonly showResults?: boolean;
  /** Search focus handler */
  readonly onFocus?: () => void;
  /** Search blur handler */
  readonly onBlur?: () => void;
  /** Left icon */
  readonly leftIcon?: ReactNode;
  /** Right action */
  readonly rightAction?: ReactNode;
}

/**
 * Global Search Component
 * @param props - Search properties
 * @returns React.ReactElement
 */
export const GlobalSearch = forwardRef<HTMLDivElement, GlobalSearchProps>(
  (
    {
      variant = 'default',
      size = 'md',
      placeholder = 'Search...',
      value = '',
      onChange,
      onSubmit,
      results = [],
      loading = false,
      showResults = false,
      onFocus,
      onBlur,
      leftIcon,
      rightAction,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(
          globalSearchVariants({ variant, size }),
          'rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          className
        )}
        {...props}
      >
        <div className="flex items-center">
          {leftIcon && <div className="flex-shrink-0 ml-3">{leftIcon}</div>}

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={cn(searchInputVariants({ size }), leftIcon && 'pl-2', rightAction && 'pr-2')}
            aria-label="Global search"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            role="combobox"
          />

          {rightAction && <div className="flex-shrink-0 mr-3">{rightAction}</div>}
        </div>

        {/* Search Results */}
        {isOpen && (showResults || results.length > 0) && (
          <div
            ref={resultsRef}
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-card border border-border rounded-md shadow-lg max-h-64 overflow-auto"
            role="listbox"
            aria-label="Search results"
          >
            {loading && (
              <div className="p-4 text-center text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mx-auto"></div>
                <span className="sr-only">Loading...</span>
              </div>
            )}

            {!loading && results.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">No results found</div>
            )}

            {!loading &&
              results.map((result, index) => (
                <div
                  key={result.id}
                  className={cn(
                    'p-3 cursor-pointer border-b border-border last:border-b-0',
                    'hover:bg-accent hover:text-accent-foreground',
                    'transition-colors duration-200',
                    selectedIndex === index && 'bg-accent text-accent-foreground'
                  )}
                  onClick={() => handleResultClick(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  role="option"
                  aria-selected={selectedIndex === index}
                >
                  <div className="flex items-start space-x-3">
                    {result.icon && <div className="flex-shrink-0 mt-0.5">{result.icon}</div>}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium truncate">{result.title}</h3>
                        {result.category && (
                          <span className="text-xs text-muted-foreground ml-2">
                            {result.category}
                          </span>
                        )}
                      </div>

                      {result.description && (
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {result.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
);

GlobalSearch.displayName = 'GlobalSearch';

/**
 * Global search variants and types
 */
export type GlobalSearchVariant = VariantProps<typeof globalSearchVariants>;
export type SearchInputVariant = VariantProps<typeof searchInputVariants>;

export { globalSearchVariants, searchInputVariants };
