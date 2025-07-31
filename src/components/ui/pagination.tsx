/**
 * @fileoverview SSR-Safe Pagination Component - Production Strategy Implementation
 * @description Pagination component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Pagination variant types
 */
export type PaginationVariant = 'default' | 'primary' | 'secondary';

/**
 * Pagination size types
 */
export type PaginationSize = 'sm' | 'default' | 'lg';

/**
 * Pagination component props interface
 */
export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onPageChange?: (_page: number) => void;
  readonly showFirstLast?: boolean;
  readonly showPrevNext?: boolean;
  readonly maxVisible?: number;
  readonly disabled?: boolean;
  readonly variant?: PaginationVariant;
  readonly size?: PaginationSize;
}

/**
 * Get visible page numbers - pure function
 */
const getVisiblePages = (currentPage: number, totalPages: number, maxVisible: number): number[] => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/**
 * Chevron Left Icon
 */
const ChevronLeftIcon = (): React.ReactElement => (
  <svg style={{ height: '16px', width: '16px' }} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Chevron Right Icon
 */
const ChevronRightIcon = (): React.ReactElement => (
  <svg style={{ height: '16px', width: '16px' }} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Double Chevron Left Icon
 */
const DoubleChevronLeftIcon = (): React.ReactElement => (
  <svg style={{ height: '16px', width: '16px' }} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Double Chevron Right Icon
 */
const DoubleChevronRightIcon = (): React.ReactElement => (
  <svg style={{ height: '16px', width: '16px' }} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 10-1.414 1.414L14.586 10l-4.293 4.293a1 1 0 000 1.414zm-6 0a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 000 1.414z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Enhanced Pagination component with token-based styling
 */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      showFirstLast = true,
      showPrevNext = true,
      maxVisible = 7,
      disabled = false,
      variant = 'default',
      size = 'default',
      className,
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography, getToken } = useTokens();
    const visiblePages = getVisiblePages(currentPage, totalPages, maxVisible);
    const canGoPrevious = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    const handlePageClick = (page: number): void => {
      if (!disabled && page !== currentPage && page >= 1 && page <= totalPages) {
        onPageChange?.(page);
      }
    };

    // Get border radius
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
    };

    // Container styles
    const getContainerStyles = (): React.CSSProperties => {
      const variantColor = (() => {
        switch (variant) {
          case 'primary':
            return colors.primary?.[500] || '#3b82f6';
          case 'secondary':
            return colors.neutral?.[100] || '#f3f4f6';
          default:
            return colors.text?.primary || colors.neutral?.[900] || '#111827';
        }
      })();

      const fontSize = (() => {
        switch (size) {
          case 'sm':
            return typography.fontSize.sm;
          case 'lg':
            return typography.fontSize.lg;
          default:
            return typography.fontSize.base;
        }
      })();

      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing[1],
        color: variantColor,
        fontSize,
        ...style,
      };
    };

    // Page item styles
    const getPageItemStyles = (page: number, isActive: boolean): React.CSSProperties => {
      const isDisabled = disabled;
      
      const sizeProps = (() => {
        switch (size) {
          case 'sm':
            return {
              height: '32px',
              width: '32px',
              fontSize: typography.fontSize.xs,
            };
          case 'lg':
            return {
              height: '40px',
              width: '40px',
              fontSize: typography.fontSize.base,
            };
          default:
            return {
              height: '36px',
              width: '36px',
              fontSize: typography.fontSize.sm,
            };
        }
      })();

      const baseStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.md,
        transition: 'all 150ms ease-in-out',
        outline: 'none',
        border: 'none',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        pointerEvents: isDisabled ? 'none' : 'auto',
        opacity: isDisabled ? 0.5 : 1,
        backgroundColor: 'transparent',
        ...sizeProps,
      };

      if (isActive) {
        switch (variant) {
          case 'primary':
            return {
              ...baseStyles,
              backgroundColor: colors.primary?.[500] || '#3b82f6',
              color: colors.background?.default || '#ffffff',
            };
          case 'secondary':
            return {
              ...baseStyles,
              backgroundColor: colors.neutral?.[100] || '#f3f4f6',
              color: colors.text?.primary || colors.neutral?.[900] || '#111827',
            };
          default:
            return {
              ...baseStyles,
              backgroundColor: colors.primary?.[500] || '#3b82f6',
              color: colors.background?.default || '#ffffff',
            };
        }
      }

      return {
        ...baseStyles,
        color: colors.text?.primary || colors.neutral?.[900] || '#111827',
      };
    };

    // Navigation button styles
    const getNavButtonStyles = (isDisabled: boolean): React.CSSProperties => {
      const sizeProps = (() => {
        switch (size) {
          case 'sm':
            return {
              height: '32px',
              paddingLeft: spacing[2],
              paddingRight: spacing[2],
              fontSize: typography.fontSize.xs,
            };
          case 'lg':
            return {
              height: '40px',
              paddingLeft: spacing[4],
              paddingRight: spacing[4],
              fontSize: typography.fontSize.base,
            };
          default:
            return {
              height: '36px',
              paddingLeft: spacing[3],
              paddingRight: spacing[3],
              fontSize: typography.fontSize.sm,
            };
        }
      })();

      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.md,
        transition: 'all 150ms ease-in-out',
        outline: 'none',
        border: 'none',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        pointerEvents: isDisabled ? 'none' : 'auto',
        opacity: isDisabled ? 0.5 : 1,
        backgroundColor: 'transparent',
        color: colors.text?.primary || colors.neutral?.[900] || '#111827',
        ...sizeProps,
      };
    };

    if (totalPages <= 1) {
      return (
        <div
          ref={ref}
          className={className}
          style={getContainerStyles()}
          {...props}
        />
      );
    }

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={className}
        style={getContainerStyles()}
        {...props}
      >
        {/* First Page */}
        {showFirstLast && currentPage > 2 && (
          <button
            onClick={() => handlePageClick(1)}
            disabled={disabled || !canGoPrevious}
            style={getNavButtonStyles(disabled || !canGoPrevious)}
            aria-label="Go to first page"
            onMouseEnter={(e) => {
              if (!(disabled || !canGoPrevious)) {
                e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
                e.currentTarget.style.color = colors.accent?.foreground || colors.text?.primary || '#111827';
              }
            }}
            onMouseLeave={(e) => {
              if (!(disabled || !canGoPrevious)) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colors.text?.primary || colors.neutral?.[900] || '#111827';
              }
            }}
            onFocus={(e) => {
              if (!(disabled || !canGoPrevious)) {
                e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
                e.currentTarget.style.outlineOffset = '2px';
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            <DoubleChevronLeftIcon />
          </button>
        )}

        {/* Previous Page */}
        {showPrevNext && (
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={disabled || !canGoPrevious}
            style={getNavButtonStyles(disabled || !canGoPrevious)}
            aria-label="Go to previous page"
            onMouseEnter={(e) => {
              if (!(disabled || !canGoPrevious)) {
                e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
                e.currentTarget.style.color = colors.accent?.foreground || colors.text?.primary || '#111827';
              }
            }}
            onMouseLeave={(e) => {
              if (!(disabled || !canGoPrevious)) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colors.text?.primary || colors.neutral?.[900] || '#111827';
              }
            }}
            onFocus={(e) => {
              if (!(disabled || !canGoPrevious)) {
                e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
                e.currentTarget.style.outlineOffset = '2px';
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            <ChevronLeftIcon />
          </button>
        )}

        {/* Page Numbers */}
        {visiblePages.map(page => {
          const isActive = page === currentPage;
          const isPageDisabled = disabled;
          
          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              disabled={isPageDisabled}
              data-active={isActive}
              style={getPageItemStyles(page, isActive)}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? 'page' : undefined}
              onMouseEnter={(e) => {
                if (!isPageDisabled && !isActive) {
                  switch (variant) {
                    case 'primary':
                      e.currentTarget.style.backgroundColor = `${colors.primary?.[500] || '#3b82f6'}1A`; // 10% opacity
                      e.currentTarget.style.color = colors.primary?.[500] || '#3b82f6';
                      break;
                    case 'secondary':
                      e.currentTarget.style.backgroundColor = `${colors.neutral?.[100] || '#f3f4f6'}1A`; // 10% opacity
                      e.currentTarget.style.color = colors.neutral?.[700] || '#374151';
                      break;
                    default:
                      e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
                      e.currentTarget.style.color = colors.accent?.foreground || colors.text?.primary || '#111827';
                      break;
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (!isPageDisabled && !isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = colors.text?.primary || colors.neutral?.[900] || '#111827';
                }
              }}
              onFocus={(e) => {
                if (!isPageDisabled) {
                  e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
                  e.currentTarget.style.outlineOffset = '2px';
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              {page}
            </button>
          );
        })}

        {/* Next Page */}
        {showPrevNext && (
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={disabled || !canGoNext}
            style={getNavButtonStyles(disabled || !canGoNext)}
            aria-label="Go to next page"
            onMouseEnter={(e) => {
              if (!(disabled || !canGoNext)) {
                e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
                e.currentTarget.style.color = colors.accent?.foreground || colors.text?.primary || '#111827';
              }
            }}
            onMouseLeave={(e) => {
              if (!(disabled || !canGoNext)) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colors.text?.primary || colors.neutral?.[900] || '#111827';
              }
            }}
            onFocus={(e) => {
              if (!(disabled || !canGoNext)) {
                e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
                e.currentTarget.style.outlineOffset = '2px';
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            <ChevronRightIcon />
          </button>
        )}

        {/* Last Page */}
        {showFirstLast && currentPage < totalPages - 1 && (
          <button
            onClick={() => handlePageClick(totalPages)}
            disabled={disabled || !canGoNext}
            style={getNavButtonStyles(disabled || !canGoNext)}
            aria-label="Go to last page"
            onMouseEnter={(e) => {
              if (!(disabled || !canGoNext)) {
                e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
                e.currentTarget.style.color = colors.accent?.foreground || colors.text?.primary || '#111827';
              }
            }}
            onMouseLeave={(e) => {
              if (!(disabled || !canGoNext)) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colors.text?.primary || colors.neutral?.[900] || '#111827';
              }
            }}
            onFocus={(e) => {
              if (!(disabled || !canGoNext)) {
                e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
                e.currentTarget.style.outlineOffset = '2px';
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            <DoubleChevronRightIcon />
          </button>
        )}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';
