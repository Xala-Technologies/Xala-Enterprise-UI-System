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
  // eslint-disable-next-line no-unused-vars
  readonly onChange?: (_value: string) => void;
  /** Search submit handler */
  // eslint-disable-next-line no-unused-vars
  readonly onSubmit?: (_value: string) => void;
  /** Search results */
  readonly results?: readonly SearchResultItem[];
  /** Loading state */
  readonly loading?: boolean;
  /** Show results dropdown */
  readonly isOpen?: boolean;
  /** Selected result index */
  readonly selectedIndex?: number;
  /** Search focus handler */
  readonly onFocus?: () => void;
  /** Search blur handler */
  readonly onBlur?: () => void;
  /** Left icon */
  readonly leftIcon?: ReactNode;
  /** Right action */
  readonly rightAction?: ReactNode;
  /** Result click handler */
  // eslint-disable-next-line no-unused-vars
  readonly onResultClick?: (_result: SearchResultItem) => void;
  /** Selected index change handler */
  // eslint-disable-next-line no-unused-vars
  readonly onSelectedIndexChange?: (_index: number) => void;
  /** Open state change handler */
  // eslint-disable-next-line no-unused-vars
  readonly onOpenChange?: (_isOpen: boolean) => void;
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
      isOpen = false,
      selectedIndex = -1,
      onFocus,
      onBlur,
      leftIcon,
      rightAction,
      onResultClick,
      onSelectedIndexChange,
      onOpenChange,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      onChange?.(newValue);
      onOpenChange?.(true);
      onSelectedIndexChange?.(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        onSelectedIndexChange?.(Math.min(selectedIndex + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        onSelectedIndexChange?.(Math.max(selectedIndex - 1, -1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        } else {
          onSubmit?.(value);
        }
      } else if (e.key === 'Escape') {
        onOpenChange?.(false);
        onSelectedIndexChange?.(-1);
      }
    };

    const handleFocus = (): void => {
      onOpenChange?.(true);
      onFocus?.();
    };

    const handleBlur = (): void => {
      // Delay closing to allow for result clicks
      setTimeout(() => {
        onOpenChange?.(false);
        onSelectedIndexChange?.(-1);
      }, 200);
      onBlur?.();
    };

    const handleResultClick = (result: SearchResultItem): void => {
      onResultClick?.(result);
      if (!onResultClick) {
        // Default behavior if no handler provided
        if (result.onClick) {
          result.onClick();
        } else if (result.url) {
          window.location.href = result.url;
        }
      }
    };

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
            type="text"
            value={value}
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
        {isOpen && results.length > 0 && (
          <div
            className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border border-border bg-popover shadow-lg"
            role="listbox"
          >
            {loading && (
              <div className="flex items-center justify-center p-4">
                <div className="text-sm text-muted-foreground">Loading...</div>
              </div>
            )}

            {!loading && results.length === 0 && (
              <div className="flex items-center justify-center p-4">
                <div className="text-sm text-muted-foreground">No results found</div>
              </div>
            )}

            {!loading &&
              results.map((result, index) => (
                <div
                  key={result.id}
                  className={cn(
                    'flex items-center px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground',
                    selectedIndex === index && 'bg-accent text-accent-foreground'
                  )}
                  onClick={() => handleResultClick(result)}
                  onMouseEnter={() => onSelectedIndexChange?.(index)}
                  role="option"
                  aria-selected={selectedIndex === index}
                >
                  {result.icon && <div className="mr-2">{result.icon}</div>}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{result.title}</div>
                    {result.description && (
                      <div className="text-sm text-muted-foreground truncate">
                        {result.description}
                      </div>
                    )}
                  </div>
                  {result.category && (
                    <div className="ml-2 text-xs text-muted-foreground">{result.category}</div>
                  )}
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
