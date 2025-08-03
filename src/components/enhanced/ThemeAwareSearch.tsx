/**
 * @fileoverview Enhanced Search Component v5.0.0 - CVA Pattern
 * @description Production-ready search component using CVA pattern with semantic tokens
 * @version 5.0.0
 * @compliance CVA-based, SSR-Safe, No hooks, Semantic tokens, Accessible
 */

import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type InputHTMLAttributes } from 'react';

// =============================================================================
// ENHANCED SEARCH VARIANTS
// =============================================================================

/**
 * Enhanced search variants using semantic tokens - CVA pattern
 */
const enhancedSearchVariants = cva(
  // Base classes using semantic tokens
  'relative flex items-center w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-input bg-background',
        filled: 'border-transparent bg-muted',
        outline: 'border-2 border-input bg-transparent',
        floating: 'border-input bg-background shadow-lg hover:shadow-xl',
        ghost: 'border-transparent bg-transparent hover:bg-muted/50',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-3 py-2 text-sm',
        lg: 'h-12 px-4 py-3 text-base',
      },
      state: {
        default: '',
        error: 'border-destructive focus-within:ring-destructive',
        success: 'border-success focus-within:ring-success',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
      fullWidth: true,
    },
  }
);

// =============================================================================
// INTERFACES
// =============================================================================

/**
 * Enhanced search component props using CVA pattern
 */
export interface EnhancedSearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>,
    VariantProps<typeof enhancedSearchVariants> {
  /** Loading state */
  readonly loading?: boolean;
  
  /** Error state */
  readonly error?: boolean;
  readonly errorMessage?: string;
  
  /** Show search icon */
  readonly showSearchIcon?: boolean;
  
  /** Show clear button */
  readonly showClearButton?: boolean;
  
  /** Custom search icon */
  readonly searchIcon?: React.ReactNode;
  
  /** Custom clear icon */
  readonly clearIcon?: React.ReactNode;
  
  /** Search change handler */
  readonly onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
  
  /** Clear handler */
  readonly onClear?: () => void;
}

// =============================================================================
// ENHANCED SEARCH COMPONENT
// =============================================================================

/**
 * Enhanced search component using CVA pattern
 */
export const EnhancedSearch = forwardRef<HTMLInputElement, EnhancedSearchProps>(
  ({
    className,
    type = 'text',
    variant = 'default',
    size = 'md',
    state: stateProp,
    fullWidth = true,
    loading = false,
    error = false,
    errorMessage,
    showSearchIcon = true,
    showClearButton = true,
    searchIcon,
    clearIcon,
    onChange,
    onClear,
    disabled,
    value,
    placeholder = 'Search...',
    ...props
  }, ref) => {
    // Determine state based on props
    const state = error ? 'error' : stateProp || 'default';

    // Handle input change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const inputValue = event.target.value;
      onChange?.(inputValue, event);
    };

    // Handle clear
    const handleClear = (): void => {
      onClear?.();
      // Focus the input after clearing if ref is available
      if (ref && typeof ref === 'object' && ref.current) {
        ref.current.focus();
      }
    };

    return (
      <div className="relative">
        <div
          className={cn(
            enhancedSearchVariants({
              variant,
              size,
              state,
              fullWidth,
            }),
            className
          )}
        >
          {/* Search Icon */}
          {showSearchIcon && (
            <div className="flex items-center mr-2 text-muted-foreground">
              {searchIcon || (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
          )}
          
          {/* Input */}
          <input
            className="flex-1 bg-transparent border-0 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            type={type}
            ref={ref}
            disabled={disabled || loading}
            aria-invalid={error || state === 'error'}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            {...props}
          />
          
          {/* Loading Spinner */}
          {loading && (
            <div className="flex items-center ml-2">
              <div className="w-4 h-4 border-2 border-muted-foreground border-t-primary rounded-full animate-spin" />
            </div>
          )}
          
          {/* Clear Button */}
          {showClearButton && value && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center ml-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
              aria-label="Clear search"
            >
              {clearIcon || (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          )}
        </div>
        
        {/* Error Message */}
        {error && errorMessage && (
          <p className="mt-1 text-sm text-destructive">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

EnhancedSearch.displayName = 'EnhancedSearch';

// Backward compatibility export
export const ThemeAwareSearch = EnhancedSearch;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type EnhancedSearchVariant = VariantProps<typeof enhancedSearchVariants>;
export { enhancedSearchVariants };

// Backward compatibility exports
export type ThemeAwareSearchProps = EnhancedSearchProps;
export type ThemeAwareSearchVariant = EnhancedSearchVariant;
export const themeAwareSearchVariants = enhancedSearchVariants;