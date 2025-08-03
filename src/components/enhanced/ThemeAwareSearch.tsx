/**
 * @fileoverview Theme-Aware Enhanced Search Component v5.0.0
 * @description Production-ready search component with multi-theme support
 * @version 5.0.0
 * @compliance Design token-driven, Accessible, Professional animations
 */

import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, useState, useRef, useEffect, type InputHTMLAttributes, useMemo } from 'react';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// THEME-AWARE SEARCH VARIANTS
// =============================================================================

/**
 * Theme-aware search variants that adapt to any theme
 */
const themeAwareSearchVariants = cva(
  [
    'relative',
    'flex',
    'items-center',
    'transition-all',
    'focus-within:ring-2',
    'focus-within:ring-primary',
    'focus-within:ring-offset-2',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-background',
          'border',
          'border-border',
          'hover:border-border',
          'focus-within:border-primary',
        ],
        filled: [
          'bg-muted',
          'border',
          'border-transparent',
          'hover:bg-muted/80',
          'focus-within:bg-background',
          'focus-within:border-primary',
        ],
        outlined: [
          'bg-transparent',
          'border-2',
          'border-border',
          'hover:border-primary/50',
          'focus-within:border-primary',
        ],
        floating: [
          'bg-background',
          'border',
          'border-border',
          'shadow-lg',
          'hover:shadow-xl',
          'focus-within:shadow-xl',
          'focus-within:border-primary',
        ],
        ghost: [
          'bg-transparent',
          'border',
          'border-transparent',
          'hover:bg-muted/50',
          'focus-within:bg-background',
          'focus-within:border-primary',
        ],
      },
      size: {
        sm: 'h-10 px-3 text-sm',
        md: 'h-12 px-4 text-base',
        lg: 'h-14 px-5 text-lg',
        xl: 'h-16 px-6 text-xl',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        full: 'rounded-full',
      },
      width: {
        auto: 'w-auto',
        sm: 'w-64',
        md: 'w-80',
        lg: 'w-96',
        xl: 'w-[28rem]',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: 'lg',
      width: 'md',
    },
  }
);

// =============================================================================
// INTERFACES
// =============================================================================

export interface SearchResult {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly category?: string;
  readonly url?: string;
  readonly icon?: React.ReactNode;
  readonly meta?: string;
}

/**
 * Enhanced search component props with full theme integration
 */
export interface ThemeAwareSearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>,
    VariantProps<typeof themeAwareSearchVariants> {
  /** Search results */
  readonly results?: SearchResult[];
  
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
  readonly onChange?: (value: string) => void;
  
  /** Search submit handler */
  readonly onSubmit?: (value: string) => void;
  
  /** Result selection handler */
  readonly onResultSelect?: (result: SearchResult) => void;
  
  /** Clear handler */
  readonly onClear?: () => void;
  
  /** Custom spacing multiplier */
  readonly spacing?: number;
  
  /** Enable theme-specific animations */
  readonly enableAnimations?: boolean;
  
  /** Max results to show */
  readonly maxResults?: number;
  
  /** Show categories in results */
  readonly showCategories?: boolean;
  
  /** Auto-focus on mount */
  readonly autoFocus?: boolean;
  
  /** Debounce delay in ms */
  readonly debounceDelay?: number;
}

// =============================================================================
// THEME-AWARE SEARCH COMPONENT
// =============================================================================

/**
 * Enhanced theme-aware search component
 */
export const ThemeAwareSearch = forwardRef<HTMLInputElement, ThemeAwareSearchProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      width,
      results = [],
      loading = false,
      error = false,
      errorMessage,
      showSearchIcon = true,
      showClearButton = true,
      searchIcon,
      clearIcon,
      onChange,
      onSubmit,
      onResultSelect,
      onClear,
      spacing = 1,
      enableAnimations = true,
      maxResults = 5,
      showCategories = true,
      autoFocus = false,
      debounceDelay = 300,
      value: controlledValue,
      placeholder = 'Search...',
      ...props
    },
    ref
  ): React.ReactElement => {
    const [internalValue, setInternalValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const searchRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout>();
    
    // Use controlled or uncontrolled value
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    
    // ✅ Access theme tokens
    const { 
      colors, 
      spacing: spacingTokens, 
      elevation,
      borderRadius,
      motion,
      componentSizing,
      typography,
      themeInfo 
    } = useTokens();
    
    // Calculate dynamic styling based on current theme
    const searchStyles = useMemo((): React.CSSProperties => {
      const transitionDuration = enableAnimations 
        ? (motion?.duration?.normal || '300ms')
        : '0ms';
      const transitionEasing = motion?.easing?.easeOut || 'ease-out';
      
      const borderRadiusValue = rounded === 'full' 
        ? '9999px' 
        : (borderRadius?.lg || '8px');
      
      return {
        borderRadius: borderRadiusValue,
        transition: `all ${transitionDuration} ${transitionEasing}`,
        fontSize: typography?.fontSize?.base || '16px',
      };
    }, [enableAnimations, motion, borderRadius, rounded, typography]);
    
    // Results dropdown styling
    const dropdownStyles = useMemo((): React.CSSProperties => {
      const shadowValue = elevation?.lg || '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      const borderRadiusValue = borderRadius?.lg || '8px';
      
      return {
        boxShadow: shadowValue,
        borderRadius: borderRadiusValue,
        backgroundColor: colors?.background?.default || '#ffffff',
        borderColor: colors?.border?.default || '#e5e7eb',
      };
    }, [elevation, borderRadius, colors]);

    // Filter and limit results
    const filteredResults = useMemo(() => {
      if (!results.length || !value.trim()) return [];
      
      const filtered = results
        .filter(result => 
          result.title.toLowerCase().includes(value.toLowerCase()) ||
          result.description?.toLowerCase().includes(value.toLowerCase()) ||
          result.category?.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, maxResults);
      
      return filtered;
    }, [results, value, maxResults]);

    // Handle input change with debouncing
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      
      // Clear existing debounce
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      // Set new debounce
      debounceRef.current = setTimeout(() => {
        onChange?.(newValue);
      }, debounceDelay);
      
      setIsOpen(newValue.length > 0);
      setFocusedIndex(-1);
    };

    const handleSubmit = (e: React.FormEvent): void => {
      e.preventDefault();
      if (value.trim()) {
        onSubmit?.(value.trim());
        setIsOpen(false);
      }
    };

    const handleClear = (): void => {
      if (controlledValue === undefined) {
        setInternalValue('');
      }
      onChange?.('');
      onClear?.();
      setIsOpen(false);
      searchRef.current?.focus();
    };

    const handleResultSelect = (result: SearchResult): void => {
      onResultSelect?.(result);
      setIsOpen(false);
      searchRef.current?.blur();
    };

    const handleKeyDown = (e: React.KeyboardEvent): void => {
      if (!isOpen || filteredResults.length === 0) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => 
            prev < filteredResults.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredResults.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0) {
            handleResultSelect(filteredResults[focusedIndex]);
          } else {
            handleSubmit(e);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent): void => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
      };
    }, []);

    // Auto-focus
    useEffect(() => {
      if (autoFocus && searchRef.current) {
        searchRef.current.focus();
      }
    }, [autoFocus]);

    return (
      <div ref={containerRef} className="relative">
        <form onSubmit={handleSubmit}>
          <div
            className={cn(
              themeAwareSearchVariants({
                variant,
                size,
                rounded,
                width,
              }),
              error && 'border-destructive focus-within:border-destructive focus-within:ring-destructive',
              className
            )}
            style={searchStyles}
          >
            {/* Search Icon */}
            {showSearchIcon && (
              <div className="flex items-center pl-1 text-muted-foreground">
                {searchIcon || (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </div>
            )}
            
            {/* Input */}
            <input
              ref={searchRef}
              type="text"
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsOpen(value.length > 0)}
              placeholder={placeholder}
              className={cn(
                'flex-1 bg-transparent border-0 outline-none',
                'placeholder:text-muted-foreground',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
              {...props}
            />
            
            {/* Loading Spinner */}
            {loading && (
              <div className="flex items-center pr-1">
                <div className="w-4 h-4 border-2 border-muted-foreground border-t-primary rounded-full animate-spin" />
              </div>
            )}
            
            {/* Clear Button */}
            {showClearButton && value && !loading && (
              <button
                type="button"
                onClick={handleClear}
                className={cn(
                  'flex items-center pr-1 text-muted-foreground',
                  'hover:text-foreground transition-colors',
                  'focus:outline-none focus:text-foreground'
                )}
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
        </form>
        
        {/* Error Message */}
        {error && errorMessage && (
          <p className="mt-1 text-sm text-destructive">
            {errorMessage}
          </p>
        )}
        
        {/* Results Dropdown */}
        {isOpen && filteredResults.length > 0 && (
          <div
            className={cn(
              'absolute top-full left-0 right-0 z-50 mt-1',
              'bg-background border border-border',
              'max-h-80 overflow-y-auto',
              'motion-reduce:transition-none',
              enableAnimations && 'animate-in slide-in-from-top-2 duration-200'
            )}
            style={dropdownStyles}
          >
            {filteredResults.map((result, index) => (
              <button
                key={result.id}
                type="button"
                onClick={() => handleResultSelect(result)}
                className={cn(
                  'w-full px-4 py-3 text-left transition-colors',
                  'hover:bg-muted/50 focus:bg-muted/50',
                  'focus:outline-none border-0',
                  focusedIndex === index && 'bg-muted/50',
                  'first:rounded-t-lg last:rounded-b-lg'
                )}
              >
                <div className="flex items-start gap-3">
                  {result.icon && (
                    <div className="flex-shrink-0 mt-0.5 text-muted-foreground">
                      {result.icon}
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-foreground truncate">
                        {result.title}
                      </h4>
                      {showCategories && result.category && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md flex-shrink-0">
                          {result.category}
                        </span>
                      )}
                    </div>
                    
                    {result.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {result.description}
                      </p>
                    )}
                    
                    {result.meta && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {result.meta}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
        
        {/* No Results */}
        {isOpen && value && filteredResults.length === 0 && !loading && (
          <div
            className={cn(
              'absolute top-full left-0 right-0 z-50 mt-1',
              'bg-background border border-border p-4 text-center',
              'text-muted-foreground'
            )}
            style={dropdownStyles}
          >
            <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p>No results found for "{value}"</p>
          </div>
        )}
        
        {/* Theme indicator (dev mode) */}
        {process.env.NODE_ENV === 'development' && isOpen && (
          <div className="absolute top-full right-0 mt-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded text-[10px] z-50">
            {themeInfo.name} ({themeInfo.mode})
          </div>
        )}
      </div>
    );
  }
);

ThemeAwareSearch.displayName = 'ThemeAwareSearch';

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type ThemeAwareSearchVariant = VariantProps<typeof themeAwareSearchVariants>;
export { themeAwareSearchVariants };