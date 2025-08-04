/**
 * @fileoverview Global Search Component - Enterprise Search
 * @description SSR-safe global search with CVA variants and design tokens
 * @version 5.0.0
 * @compliance WCAG AAA, NSM, Enterprise Standards, SSR-Safe
 */

import React, { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

// =============================================================================
// CVA VARIANTS
// =============================================================================

const globalSearchVariants = cva(
  'flex items-center space-x-2 bg-background border border-border rounded-lg focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        elevated: 'bg-card text-card-foreground shadow-md',
        outline: 'bg-transparent border-2',
        ghost: 'bg-transparent border-0',
      },
      size: {
        sm: 'h-9 text-sm px-3',
        md: 'h-11 text-base px-4',
        lg: 'h-13 text-lg px-6',
      },
      state: {
        default: '',
        error: 'border-destructive focus-within:ring-destructive',
        success: 'border-green-500 focus-within:ring-green-500',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
);

const searchInputVariants = cva(
  'flex-1 bg-transparent border-0 outline-none placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// =============================================================================
// INTERFACES
// =============================================================================

export interface GlobalSearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof globalSearchVariants> {
  readonly showSearchIcon?: boolean;
  readonly showClearButton?: boolean;
  readonly onClear?: () => void;
}

export interface GlobalSearchVariant {
  readonly default: string;
  readonly elevated: string;
  readonly outline: string;
  readonly ghost: string;
}

export interface SearchInputVariant {
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
}

export interface SearchResultItem {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly category?: string;
  readonly icon?: React.ReactNode;
  readonly url?: string;
  readonly onClick?: () => void;
}

// =============================================================================
// GLOBAL SEARCH COMPONENT
// =============================================================================

export const GlobalSearch = forwardRef<HTMLInputElement, GlobalSearchProps>(
  (
    {
      className,
      variant,
      size,
      state,
      showSearchIcon = true,
      showClearButton = true,
      onClear,
      placeholder = 'Search...',
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleClear = () => {
      onClear?.();
    };

    return (
      <div className={cn(globalSearchVariants({ variant, size, state }), className)}>
        {showSearchIcon && (
          <div className="flex-shrink-0 text-muted-foreground" aria-hidden="true">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        )}

        <input
          ref={ref}
          className={cn(searchInputVariants({ size }))}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          role="searchbox"
          aria-label="Global search"
          {...props}
        />

        {showClearButton && value && (
          <button
            type="button"
            onClick={handleClear}
            className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm transition-colors"
            aria-label="Clear search"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

GlobalSearch.displayName = 'GlobalSearch';

// Legacy exports for backward compatibility
export { GlobalSearch as EnhancedGlobalSearch };
export type { GlobalSearchProps as EnhancedGlobalSearchProps };

// CVA variants for external use
export { globalSearchVariants, searchInputVariants };

export default GlobalSearch;