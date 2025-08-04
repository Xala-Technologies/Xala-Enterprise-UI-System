/**
 * @fileoverview Pagination Component v6.0.0
 * @description Content pagination with page size controls
 * @version 6.0.0
 */

import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, useMemo } from 'react';
import { cn } from '../../lib/utils/cn';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react';
import { Button } from './button';
import { Select } from './select';

const paginationVariants = cva(
  'flex items-center gap-2',
  {
    variants: {
      variant: {
        default: '',
        compact: 'gap-1',
        full: 'justify-between w-full',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface PaginationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paginationVariants> {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
  readonly pageSize?: number;
  readonly onPageSizeChange?: (size: number) => void;
  readonly pageSizeOptions?: number[];
  readonly showPageSize?: boolean;
  readonly showFirstLast?: boolean;
  readonly showPageNumbers?: boolean;
  readonly maxPageButtons?: number;
  readonly showInfo?: boolean;
  readonly totalItems?: number;
  readonly locale?: 'nb-NO' | 'en-US' | 'fr-FR' | 'ar-SA';
  readonly disabled?: boolean;
}

/**
 * Pagination Component
 * Navigation controls for paginated content
 * 
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={10}
 *   onPageChange={setCurrentPage}
 *   pageSize={20}
 *   onPageSizeChange={setPageSize}
 *   showPageSize
 *   showFirstLast
 * />
 * ```
 */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  ({ 
    className,
    variant,
    size,
    currentPage,
    totalPages,
    onPageChange,
    pageSize = 10,
    onPageSizeChange,
    pageSizeOptions = [10, 20, 30, 50, 100],
    showPageSize = false,
    showFirstLast = false,
    showPageNumbers = true,
    maxPageButtons = 5,
    showInfo = false,
    totalItems,
    locale = 'en-US',
    disabled = false,
    ...props 
  }, ref) => {
    // Localization
    const t = (key: string): string => {
      const translations: Record<string, Record<string, string>> = {
        'en-US': {
          first: 'First',
          last: 'Last',
          previous: 'Previous',
          next: 'Next',
          page: 'Page',
          of: 'of',
          showing: 'Showing',
          to: 'to',
          items: 'items',
          perPage: 'per page',
        },
        'nb-NO': {
          first: 'Første',
          last: 'Siste',
          previous: 'Forrige',
          next: 'Neste',
          page: 'Side',
          of: 'av',
          showing: 'Viser',
          to: 'til',
          items: 'elementer',
          perPage: 'per side',
        },
        'fr-FR': {
          first: 'Premier',
          last: 'Dernier',
          previous: 'Précédent',
          next: 'Suivant',
          page: 'Page',
          of: 'de',
          showing: 'Affichage',
          to: 'à',
          items: 'éléments',
          perPage: 'par page',
        },
        'ar-SA': {
          first: 'الأول',
          last: 'الأخير',
          previous: 'السابق',
          next: 'التالي',
          page: 'صفحة',
          of: 'من',
          showing: 'عرض',
          to: 'إلى',
          items: 'عناصر',
          perPage: 'لكل صفحة',
        },
      };
      return translations[locale]?.[key] || translations['en-US'][key];
    };

    // Calculate page numbers to show
    const pageNumbers = useMemo(() => {
      if (!showPageNumbers || totalPages <= 1) return [];

      const pages: (number | string)[] = [];
      const halfButtons = Math.floor(maxPageButtons / 2);
      
      let startPage = Math.max(1, currentPage - halfButtons);
      let endPage = Math.min(totalPages, currentPage + halfButtons);
      
      // Adjust if we're near the beginning or end
      if (currentPage <= halfButtons) {
        endPage = Math.min(totalPages, maxPageButtons);
      }
      if (currentPage > totalPages - halfButtons) {
        startPage = Math.max(1, totalPages - maxPageButtons + 1);
      }

      // Add first page and ellipsis if needed
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }

      // Add page numbers
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis and last page if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }

      return pages;
    }, [currentPage, totalPages, maxPageButtons, showPageNumbers]);

    // Calculate showing info
    const showingInfo = useMemo(() => {
      if (!showInfo || !totalItems) return null;
      
      const start = (currentPage - 1) * pageSize + 1;
      const end = Math.min(currentPage * pageSize, totalItems);
      
      return `${t('showing')} ${start} ${t('to')} ${end} ${t('of')} ${totalItems} ${t('items')}`;
    }, [currentPage, pageSize, totalItems, showInfo, t]);

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && !disabled) {
        onPageChange(page);
      }
    };

    return (
      <nav
        ref={ref}
        className={cn(paginationVariants({ variant, size }), className)}
        aria-label="Pagination Navigation"
        {...props}
      >
        {/* Page size selector */}
        {showPageSize && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <Select
              value={String(pageSize)}
              onValueChange={(value) => onPageSizeChange(Number(value))}
              disabled={disabled}
              className="w-20"
              aria-label="Items per page"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={String(option)}>
                  {option}
                </option>
              ))}
            </Select>
            <span className="text-sm text-muted-foreground">
              {t('perPage')}
            </span>
          </div>
        )}

        {/* Info text */}
        {showingInfo && variant === 'full' && (
          <div className="text-sm text-muted-foreground">
            {showingInfo}
          </div>
        )}

        {/* Pagination controls */}
        <div className="flex items-center gap-1">
          {/* First page button */}
          {showFirstLast && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1 || disabled}
              aria-label={t('first')}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
          )}

          {/* Previous page button */}
          <Button
            variant="outline"
            size={size === 'sm' ? 'sm' : 'icon'}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || disabled}
            aria-label={t('previous')}
          >
            <ChevronLeft className="h-4 w-4" />
            {size !== 'sm' && <span className="ml-1 hidden sm:inline">{t('previous')}</span>}
          </Button>

          {/* Page numbers */}
          {showPageNumbers && (
            <div className="flex items-center gap-1">
              {pageNumbers.map((page, index) => {
                if (page === '...') {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="flex h-9 w-9 items-center justify-center"
                    >
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </span>
                  );
                }
                
                const pageNum = page as number;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => handlePageChange(pageNum)}
                    disabled={disabled}
                    aria-label={`${t('page')} ${pageNum}`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
          )}

          {/* Page indicator (when not showing page numbers) */}
          {!showPageNumbers && (
            <span className="px-2 text-sm text-muted-foreground">
              {t('page')} {currentPage} {t('of')} {totalPages}
            </span>
          )}

          {/* Next page button */}
          <Button
            variant="outline"
            size={size === 'sm' ? 'sm' : 'icon'}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || disabled}
            aria-label={t('next')}
          >
            {size !== 'sm' && <span className="mr-1 hidden sm:inline">{t('next')}</span>}
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Last page button */}
          {showFirstLast && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages || disabled}
              aria-label={t('last')}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Info text (compact variant) */}
        {showingInfo && variant !== 'full' && (
          <div className="text-sm text-muted-foreground">
            {showingInfo}
          </div>
        )}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';

/**
 * SimplePagination Component
 * Simplified pagination with just prev/next
 */
export interface SimplePaginationProps {
  readonly hasPrevious: boolean;
  readonly hasNext: boolean;
  readonly onPrevious: () => void;
  readonly onNext: () => void;
  readonly currentInfo?: string;
  readonly locale?: 'nb-NO' | 'en-US' | 'fr-FR' | 'ar-SA';
  readonly disabled?: boolean;
}

export const SimplePagination = forwardRef<HTMLDivElement, SimplePaginationProps>(
  ({ 
    hasPrevious,
    hasNext,
    onPrevious,
    onNext,
    currentInfo,
    locale = 'en-US',
    disabled = false,
    ...props
  }, ref) => {
    const t = (key: string): string => {
      const translations: Record<string, Record<string, string>> = {
        'en-US': {
          previous: 'Previous',
          next: 'Next',
        },
        'nb-NO': {
          previous: 'Forrige',
          next: 'Neste',
        },
      };
      return translations[locale]?.[key] || translations['en-US'][key];
    };

    return (
      <div ref={ref} className="flex items-center gap-4" {...props}>
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={!hasPrevious || disabled}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t('previous')}
        </Button>
        
        {currentInfo && (
          <span className="text-sm text-muted-foreground">
            {currentInfo}
          </span>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!hasNext || disabled}
        >
          {t('next')}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    );
  }
);

SimplePagination.displayName = 'SimplePagination';