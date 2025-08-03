/**
 * @fileoverview Enhanced Global Search Component - Enterprise Search
 * @description Advanced search with suggestions, filters, and real-time results with WCAG AAA compliance
 * @version 5.0.0
 * @compliance WCAG AAA, NSM, Enterprise Standards
 */

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// INTERFACES
// =============================================================================

export interface SearchSuggestion {
  readonly id: string;
  readonly text: string;
  readonly category?: string;
  readonly icon?: React.ReactNode;
  readonly metadata?: string;
  readonly onClick?: () => void;
}

export interface SearchFilter {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly count?: number;
  readonly isActive?: boolean;
}

export interface SearchResult {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly category?: string;
  readonly url?: string;
  readonly icon?: React.ReactNode;
  readonly metadata?: {
    readonly lastModified?: string;
    readonly author?: string;
    readonly type?: string;
  };
}

export interface RecentSearch {
  readonly id: string;
  readonly query: string;
  readonly timestamp: string;
  readonly resultsCount?: number;
}

export interface EnhancedGlobalSearchProps {
  readonly placeholder?: string;
  readonly suggestions?: readonly SearchSuggestion[];
  readonly filters?: readonly SearchFilter[];
  readonly recentSearches?: readonly RecentSearch[];
  readonly results?: readonly SearchResult[];
  readonly isLoading?: boolean;
  readonly hasAdvancedSearch?: boolean;
  readonly showFilters?: boolean;
  readonly showRecentSearches?: boolean;
  readonly maxSuggestions?: number;
  readonly debounceMs?: number;
  readonly onSearch: (query: string, filters?: readonly string[]) => void;
  readonly onFilterChange?: (filterId: string, isActive: boolean) => void;
  readonly onClear?: () => void;
  readonly onAdvancedSearch?: () => void;
  readonly className?: string;
  readonly ariaLabel?: string;
}

// =============================================================================
// ENHANCED GLOBAL SEARCH COMPONENT
// =============================================================================

export const EnhancedGlobalSearch = ({
  placeholder = 'Search...',
  suggestions = [],
  filters = [],
  recentSearches = [],
  results = [],
  isLoading = false,
  hasAdvancedSearch = true,
  showFilters = true,
  showRecentSearches = true,
  maxSuggestions = 8,
  debounceMs = 300,
  onSearch,
  onFilterChange,
  onClear,
  onAdvancedSearch,
  className = '',
  ariaLabel = 'Global search'
}: EnhancedGlobalSearchProps): JSX.Element => {
  const { colors, spacing, typography, elevation, borderRadius, componentSizing, motion } = useTokens();
  
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Handle input change with debouncing
  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
    setFocusedIndex(-1);
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      if (value.trim()) {
        onSearch(value, Array.from(activeFilters));
      }
    }, debounceMs);
  }, [onSearch, activeFilters, debounceMs]);

  // Handle filter toggle
  const handleFilterToggle = useCallback((filterId: string) => {
    setActiveFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(filterId)) {
        newFilters.delete(filterId);
      } else {
        newFilters.add(filterId);
      }
      
      onFilterChange?.(filterId, !prev.has(filterId));
      
      // Re-search with new filters if query exists
      if (query.trim()) {
        onSearch(query, Array.from(newFilters));
      }
      
      return newFilters;
    });
  }, [query, onSearch, onFilterChange]);

  // Handle suggestion selection
  const handleSuggestionClick = useCallback((suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setIsExpanded(false);
    setFocusedIndex(-1);
    
    if (suggestion.onClick) {
      suggestion.onClick();
    } else {
      onSearch(suggestion.text, Array.from(activeFilters));
    }
  }, [onSearch, activeFilters]);

  // Handle recent search selection
  const handleRecentSearchClick = useCallback((recentSearch: RecentSearch) => {
    setQuery(recentSearch.query);
    setIsExpanded(false);
    setFocusedIndex(-1);
    onSearch(recentSearch.query, Array.from(activeFilters));
  }, [onSearch, activeFilters]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const combinedItems = [
      ...suggestions.slice(0, maxSuggestions),
      ...(showRecentSearches ? recentSearches : [])
    ];

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => 
          prev < combinedItems.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => prev > -1 ? prev - 1 : -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[focusedIndex]);
        } else if (focusedIndex >= suggestions.length && showRecentSearches) {
          const recentIndex = focusedIndex - suggestions.length;
          if (recentIndex < recentSearches.length) {
            handleRecentSearchClick(recentSearches[recentIndex]);
          }
        } else if (query.trim()) {
          onSearch(query, Array.from(activeFilters));
          setIsExpanded(false);
        }
        break;
      case 'Escape':
        setIsExpanded(false);
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }, [
    suggestions, 
    recentSearches, 
    maxSuggestions, 
    showRecentSearches, 
    focusedIndex, 
    query, 
    activeFilters, 
    onSearch,
    handleSuggestionClick,
    handleRecentSearchClick
  ]);

  // Handle clear
  const handleClear = useCallback(() => {
    setQuery('');
    setIsExpanded(false);
    setFocusedIndex(-1);
    onClear?.();
    inputRef.current?.focus();
  }, [onClear]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Generate search container styles
  const searchContainerStyles = useMemo(() => ({
    backgroundColor: colors.background?.paper,
    borderColor: isExpanded ? colors.primary?.[500] || '#3b82f6' : colors.border?.default,
    borderRadius: borderRadius?.lg,
    boxShadow: isExpanded ? elevation?.lg : elevation?.sm,
    transition: `all ${motion?.duration?.fast || '150ms'} ${motion?.easing?.ease || 'ease'}`,
  }), [isExpanded, colors, borderRadius, elevation, motion]);

  // Generate input styles
  const inputStyles = useMemo(() => ({
    minHeight: componentSizing?.input?.md || '56px',
    fontSize: typography.fontSize?.base || '1rem',
    color: colors.text?.primary,
    backgroundColor: 'transparent',
    borderRadius: borderRadius?.lg,
  }), [componentSizing, typography, colors, borderRadius]);

  // Render search suggestion
  const renderSuggestion = useCallback((suggestion: SearchSuggestion, index: number) => {
    const isFocused = index === focusedIndex;
    
    return (
      <div
        key={suggestion.id}
        className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
        style={{
          backgroundColor: isFocused 
            ? colors.background?.elevated 
            : 'transparent',
          color: colors.text?.primary,
          borderRadius: borderRadius?.md
        }}
        onClick={() => handleSuggestionClick(suggestion)}
        role="option"
        aria-selected={isFocused}
      >
        {suggestion.icon && (
          <div
            className="flex-shrink-0"
            style={{ color: colors.text?.muted }}
            aria-hidden="true"
          >
            {suggestion.icon}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <p
            className="truncate"
            style={{
              fontSize: typography.fontSize?.sm || '0.875rem',
              fontWeight: 500
            }}
          >
            {suggestion.text}
          </p>
          {suggestion.metadata && (
            <p
              className="truncate mt-1"
              style={{
                color: colors.text?.muted,
                fontSize: typography.fontSize?.xs || '0.75rem'
              }}
            >
              {suggestion.metadata}
            </p>
          )}
        </div>

        {suggestion.category && (
          <span
            className="px-2 py-1 rounded text-xs font-medium"
            style={{
              backgroundColor: colors.background?.elevated,
              color: colors.text?.secondary,
              fontSize: typography.fontSize?.xs || '0.75rem'
            }}
          >
            {suggestion.category}
          </span>
        )}
      </div>
    );
  }, [
    focusedIndex, 
    colors, 
    borderRadius, 
    typography, 
    handleSuggestionClick
  ]);

  // Render recent search
  const renderRecentSearch = useCallback((recent: RecentSearch, index: number) => {
    const adjustedIndex = suggestions.length + index;
    const isFocused = adjustedIndex === focusedIndex;
    
    return (
      <div
        key={recent.id}
        className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
        style={{
          backgroundColor: isFocused 
            ? colors.background?.elevated 
            : 'transparent',
          color: colors.text?.primary,
          borderRadius: borderRadius?.md
        }}
        onClick={() => handleRecentSearchClick(recent)}
        role="option"
        aria-selected={isFocused}
      >
        <div
          className="flex-shrink-0"
          style={{ color: colors.text?.muted }}
          aria-hidden="true"
        >
          🕒
        </div>
        
        <div className="flex-1 min-w-0">
          <p
            className="truncate"
            style={{
              fontSize: typography.fontSize?.sm || '0.875rem'
            }}
          >
            {recent.query}
          </p>
          <p
            className="truncate mt-1"
            style={{
              color: colors.text?.muted,
              fontSize: typography.fontSize?.xs || '0.75rem'
            }}
          >
            {recent.timestamp}
            {recent.resultsCount !== undefined && ` • ${recent.resultsCount} results`}
          </p>
        </div>
      </div>
    );
  }, [
    suggestions.length,
    focusedIndex,
    colors,
    borderRadius,
    typography,
    handleRecentSearchClick
  ]);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input Container */}
      <div
        className="flex items-center border"
        style={searchContainerStyles}
      >
        <div className="flex-1 flex items-center">
          <div
            className="flex-shrink-0 pl-4"
            style={{ color: colors.text?.muted }}
            aria-hidden="true"
          >
            🔍
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 focus:outline-none"
            style={inputStyles}
            aria-label={ariaLabel}
            aria-expanded={isExpanded}
            aria-autocomplete="list"
            aria-owns={isExpanded ? 'search-dropdown' : undefined}
            role="combobox"
          />
        </div>

        <div className="flex items-center space-x-2 pr-2">
          {isLoading && (
            <div
              className="animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"
              style={{ width: '16px', height: '16px' }}
              aria-label="Searching..."
            />
          )}

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                color: colors.text?.muted,
                minWidth: '32px',
                minHeight: '32px'
              }}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}

          {hasAdvancedSearch && (
            <button
              type="button"
              onClick={onAdvancedSearch}
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                color: colors.primary?.[500] || '#3b82f6',
                minHeight: '36px'
              }}
              aria-label="Advanced search"
            >
              Advanced
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      {showFilters && filters.length > 0 && (
        <div
          className="flex flex-wrap gap-2 mt-3"
          role="group"
          aria-label="Search filters"
        >
          {filters.map(filter => {
            const isActive = activeFilters.has(filter.id);
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => handleFilterToggle(filter.id)}
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: isActive 
                    ? colors.primary?.[500] || '#3b82f6'
                    : colors.background?.paper,
                  borderColor: isActive 
                    ? colors.primary?.[500] || '#3b82f6'
                    : colors.border?.default,
                  color: isActive 
                    ? 'white' 
                    : colors.text?.primary
                }}
                aria-pressed={isActive}
              >
                <span>{filter.label}</span>
                {filter.count !== undefined && (
                  <span
                    className="rounded-full text-xs"
                    style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : colors.background?.elevated,
                      color: isActive ? 'white' : colors.text?.muted,
                      padding: '2px 6px',
                      minWidth: '18px',
                      textAlign: 'center'
                    }}
                  >
                    {filter.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Dropdown */}
      {isExpanded && (suggestions.length > 0 || (showRecentSearches && recentSearches.length > 0)) && (
        <div
          id="search-dropdown"
          className="absolute z-50 w-full mt-2 border rounded-lg"
          style={{
            backgroundColor: colors.background?.paper,
            borderColor: colors.border?.default,
            borderRadius: borderRadius?.lg,
            boxShadow: elevation?.lg,
            maxHeight: '400px',
            overflowY: 'auto'
          }}
          role="listbox"
          aria-label="Search suggestions"
        >
          {/* Suggestions */}
          {suggestions.slice(0, maxSuggestions).map((suggestion, index) => 
            renderSuggestion(suggestion, index)
          )}

          {/* Divider */}
          {suggestions.length > 0 && showRecentSearches && recentSearches.length > 0 && (
            <div
              className="border-t my-2"
              style={{ borderColor: colors.border?.muted }}
            />
          )}

          {/* Recent Searches */}
          {showRecentSearches && recentSearches.length > 0 && (
            <>
              <div
                className="px-4 py-2"
                style={{
                  color: colors.text?.muted,
                  fontSize: typography.fontSize?.xs || '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Recent Searches
              </div>
              {recentSearches.map((recent, index) => 
                renderRecentSearch(recent, index)
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedGlobalSearch;