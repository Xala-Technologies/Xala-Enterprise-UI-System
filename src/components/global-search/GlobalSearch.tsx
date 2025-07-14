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
    // State management
    const [inputValue, setInputValue] = React.useState(value);
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    // Refs
    const inputRef = React.useRef<HTMLInputElement>(null);
    const resultsRef = React.useRef<HTMLDivElement>(null);

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange?.(newValue);
      setIsOpen(true);
      setSelectedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        } else {
          onSubmit?.(inputValue);
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    const handleFocus = () => {
      setIsOpen(true);
      onFocus?.();
    };

    const handleBlur = () => {
      // Delay closing to allow for result clicks
      setTimeout(() => {
        setIsOpen(false);
        setSelectedIndex(-1);
      }, 200);
      onBlur?.();
    };

    const handleResultClick = (result: SearchResultItem) => {
      setInputValue(result.title);
      setIsOpen(false);
      setSelectedIndex(-1);
      if (result.onClick) {
        result.onClick();
      } else if (result.url) {
        window.location.href = result.url;
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
                  onMouseEnter={() => setSelectedIndex(index)}
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
