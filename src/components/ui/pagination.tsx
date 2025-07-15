/**
 * Pagination component with enterprise compliance
 * Uses semantic design tokens and pure presentational patterns
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Pagination variants using semantic design tokens
 */
const paginationVariants = cva('flex items-center justify-center space-x-1', {
  variants: {
    variant: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
    },
    size: {
      sm: 'text-sm',
      default: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

/**
 * Pagination item variants using semantic design tokens
 */
const paginationItemVariants = cva(
  [
    'flex items-center justify-center rounded-md transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'hover:bg-accent hover:text-accent-foreground',
          'data-[active=true]:bg-primary data-[active=true]:text-primary-foreground',
        ],
        primary: [
          'hover:bg-primary/10 hover:text-primary',
          'data-[active=true]:bg-primary data-[active=true]:text-primary-foreground',
        ],
        secondary: [
          'hover:bg-secondary/10 hover:text-secondary',
          'data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground',
        ],
      },
      size: {
        sm: 'h-8 w-8 text-xs',
        default: 'h-9 w-9 text-sm',
        lg: 'h-10 w-10 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * Pagination navigation variants
 */
const paginationNavVariants = cva(
  [
    'flex items-center justify-center rounded-md transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'hover:bg-accent hover:text-accent-foreground',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-9 px-3 text-sm',
        lg: 'h-10 px-4 text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * Pagination component props interface
 */
export interface PaginationProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paginationVariants> {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onPageChange?: (_page: number) => void;
  readonly showFirstLast?: boolean;
  readonly showPrevNext?: boolean;
  readonly maxVisible?: number;
  readonly disabled?: boolean;
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
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
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
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
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
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
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
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 10-1.414 1.414L14.586 10l-4.293 4.293a1 1 0 000 1.414zm-6 0a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 000 1.414z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Enhanced Pagination component
 * @param currentPage - Current active page (1-based)
 * @param totalPages - Total number of pages
 * @param onPageChange - Page change handler
 * @param showFirstLast - Show first/last page buttons
 * @param showPrevNext - Show previous/next buttons
 * @param maxVisible - Maximum visible page numbers
 * @param disabled - Disable all pagination controls
 * @param variant - Pagination styling variant
 * @param size - Pagination size
 * @param className - Additional CSS classes
 * @returns Enhanced Pagination JSX element
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
      ...props
    },
    ref
  ): React.ReactElement => {
    const visiblePages = getVisiblePages(currentPage, totalPages, maxVisible);
    const canGoPrevious = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    const handlePageClick = (page: number): void => {
      if (!disabled && page !== currentPage && page >= 1 && page <= totalPages) {
        onPageChange?.(page);
      }
    };

    if (totalPages <= 1) {
      return (
        <div
          ref={ref}
          className={cn(paginationVariants({ variant, size }), className)}
          {...props}
        />
      );
    }

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={cn(paginationVariants({ variant, size }), className)}
        {...props}
      >
        {/* First Page */}
        {showFirstLast && currentPage > 2 && (
          <button
            onClick={() => handlePageClick(1)}
            disabled={disabled || !canGoPrevious}
            className={cn(paginationNavVariants({ size }))}
            aria-label="Go to first page"
          >
            <DoubleChevronLeftIcon />
          </button>
        )}

        {/* Previous Page */}
        {showPrevNext && (
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={disabled || !canGoPrevious}
            className={cn(paginationNavVariants({ size }))}
            aria-label="Go to previous page"
          >
            <ChevronLeftIcon />
          </button>
        )}

        {/* Page Numbers */}
        {visiblePages.map(page => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            disabled={disabled}
            data-active={page === currentPage}
            className={cn(paginationItemVariants({ variant, size }))}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {/* Next Page */}
        {showPrevNext && (
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={disabled || !canGoNext}
            className={cn(paginationNavVariants({ size }))}
            aria-label="Go to next page"
          >
            <ChevronRightIcon />
          </button>
        )}

        {/* Last Page */}
        {showFirstLast && currentPage < totalPages - 1 && (
          <button
            onClick={() => handlePageClick(totalPages)}
            disabled={disabled || !canGoNext}
            className={cn(paginationNavVariants({ size }))}
            aria-label="Go to last page"
          >
            <DoubleChevronRightIcon />
          </button>
        )}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';

/**
 * Pagination variants type exports
 */
export type PaginationVariant = VariantProps<typeof paginationVariants>['variant'];
export type PaginationSize = VariantProps<typeof paginationVariants>['size'];
