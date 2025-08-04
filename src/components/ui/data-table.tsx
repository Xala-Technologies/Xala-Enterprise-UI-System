/**
 * @fileoverview DataTable Component v6.0.0
 * @description Advanced data grid with Norwegian compliance
 * @version 6.0.0
 */

import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, useState, useMemo, useCallback } from 'react';
import { cn } from '../../lib/utils/cn';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Select } from './select';

const tableVariants = cva(
  'w-full caption-bottom text-sm',
  {
    variants: {
      variant: {
        default: 'border border-border',
        striped: 'border border-border',
        compact: 'border border-border text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface DataTableColumn<T = any> {
  readonly key: string;
  readonly title: string;
  readonly sortable?: boolean;
  readonly width?: string | number;
  readonly align?: 'left' | 'center' | 'right';
  readonly render?: (item: T, index: number) => React.ReactNode;
  readonly className?: string;
}

export interface DataTablePagination {
  pageSize?: number;
  showSizeSelector?: boolean;
  pageSizes?: number[];
}

export interface DataTableProps<T = any>
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tableVariants> {
  readonly data: T[];
  readonly columns: DataTableColumn<T>[];
  readonly pagination?: DataTablePagination | boolean;
  readonly sortable?: boolean;
  readonly filterable?: boolean;
  readonly selectable?: boolean;
  readonly onRowClick?: (item: T, index: number) => void;
  readonly onSelectionChange?: (selectedItems: T[]) => void;
  readonly emptyMessage?: string;
  readonly loading?: boolean;
  readonly nsmClassification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  readonly gdprCompliant?: boolean;
  readonly auditTrail?: boolean;
  readonly locale?: 'nb-NO' | 'en-US' | 'fr-FR' | 'ar-SA';
  readonly accessibilityLevel?: 'A' | 'AA' | 'AAA' | 'WCAG_2_2_AAA';
}

/**
 * DataTable Component
 * Advanced data grid with sorting, filtering, pagination, and Norwegian compliance
 */
export const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  ({ 
    className,
    variant,
    data = [],
    columns = [],
    pagination = false,
    sortable = false,
    filterable = false,
    selectable = false,
    onRowClick,
    onSelectionChange,
    emptyMessage = 'No data available',
    loading = false,
    nsmClassification,
    gdprCompliant,
    auditTrail,
    locale = 'en-US',
    accessibilityLevel = 'AAA',
    ...props 
  }, ref) => {
    // State management
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(
      typeof pagination === 'object' ? pagination.pageSize || 10 : 10
    );
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [filterValue, setFilterValue] = useState('');
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

    // Filter data
    const filteredData = useMemo(() => {
      if (!filterable || !filterValue) return data;
      
      return data.filter((item) => {
        return columns.some((column) => {
          const value = (item as any)[column.key];
          if (value == null) return false;
          return String(value).toLowerCase().includes(filterValue.toLowerCase());
        });
      });
    }, [data, filterValue, filterable, columns]);

    // Sort data
    const sortedData = useMemo(() => {
      if (!sortable || !sortColumn) return filteredData;
      
      return [...filteredData].sort((a, b) => {
        const aValue = (a as any)[sortColumn];
        const bValue = (b as any)[sortColumn];
        
        if (aValue == null) return 1;
        if (bValue == null) return -1;
        
        const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }, [filteredData, sortColumn, sortDirection, sortable]);

    // Paginate data
    const paginatedData = useMemo(() => {
      if (!pagination) return sortedData;
      
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return sortedData.slice(startIndex, endIndex);
    }, [sortedData, currentPage, pageSize, pagination]);

    // Total pages
    const totalPages = Math.ceil(sortedData.length / pageSize);

    // Handle sort
    const handleSort = useCallback((column: string) => {
      if (!sortable) return;
      
      if (sortColumn === column) {
        setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    }, [sortColumn, sortable]);

    // Handle row selection
    const handleRowSelect = useCallback((index: number) => {
      if (!selectable) return;
      
      const newSelection = new Set(selectedRows);
      if (newSelection.has(index)) {
        newSelection.delete(index);
      } else {
        newSelection.add(index);
      }
      setSelectedRows(newSelection);
      
      if (onSelectionChange) {
        const selectedItems = Array.from(newSelection).map(i => paginatedData[i]);
        onSelectionChange(selectedItems);
      }
    }, [selectedRows, selectable, onSelectionChange, paginatedData]);

    // Handle select all
    const handleSelectAll = useCallback(() => {
      if (!selectable) return;
      
      if (selectedRows.size === paginatedData.length) {
        setSelectedRows(new Set());
        onSelectionChange?.([]);
      } else {
        const allIndices = new Set(paginatedData.map((_, i) => i));
        setSelectedRows(allIndices);
        onSelectionChange?.(paginatedData);
      }
    }, [selectedRows, selectable, paginatedData, onSelectionChange]);

    // Localization
    const t = (key: string): string => {
      const translations: Record<string, Record<string, string>> = {
        'en-US': {
          search: 'Search...',
          showing: 'Showing',
          of: 'of',
          entries: 'entries',
          previous: 'Previous',
          next: 'Next',
          rowsPerPage: 'Rows per page:',
        },
        'nb-NO': {
          search: 'Søk...',
          showing: 'Viser',
          of: 'av',
          entries: 'oppføringer',
          previous: 'Forrige',
          next: 'Neste',
          rowsPerPage: 'Rader per side:',
        },
      };
      return translations[locale]?.[key] || translations['en-US'][key];
    };

    return (
      <div 
        ref={ref}
        className={cn('space-y-4', className)}
        data-nsm-classification={nsmClassification}
        data-gdpr-compliant={gdprCompliant}
        data-audit-trail={auditTrail}
        {...props}
      >
        {/* Filter input */}
        {filterable && (
          <div className="flex items-center justify-between">
            <Input
              type="search"
              placeholder={t('search')}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="max-w-sm"
              aria-label="Search table"
            />
          </div>
        )}

        {/* Table */}
        <div className="relative overflow-auto rounded-md border">
          <table className={cn(tableVariants({ variant }))}>
            <thead className="bg-muted/50">
              <tr className="border-b transition-colors hover:bg-muted/50">
                {selectable && (
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                      onChange={handleSelectAll}
                      aria-label="Select all rows"
                      className="h-4 w-4"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
                      column.sortable && sortable && 'cursor-pointer select-none',
                      column.className
                    )}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{column.title}</span>
                      {column.sortable && sortable && (
                        <span className="flex flex-col">
                          <ChevronUp 
                            className={cn(
                              'h-3 w-3',
                              sortColumn === column.key && sortDirection === 'asc' 
                                ? 'text-foreground' 
                                : 'text-muted-foreground/30'
                            )}
                          />
                          <ChevronDown 
                            className={cn(
                              'h-3 w-3 -mt-1',
                              sortColumn === column.key && sortDirection === 'desc' 
                                ? 'text-foreground' 
                                : 'text-muted-foreground/30'
                            )}
                          />
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)} className="h-24 text-center">
                    <div className="flex items-center justify-center">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </div>
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)} className="h-24 text-center text-muted-foreground">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className={cn(
                      'border-b transition-colors',
                      onRowClick && 'cursor-pointer',
                      selectedRows.has(index) && 'bg-muted/50',
                      variant === 'striped' && index % 2 === 0 && 'bg-muted/20',
                      'hover:bg-muted/50'
                    )}
                    onClick={() => onRowClick?.(item, index)}
                  >
                    {selectable && (
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(index)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleRowSelect(index);
                          }}
                          aria-label={`Select row ${index + 1}`}
                          className="h-4 w-4"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          'p-4',
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right',
                          column.className
                        )}
                      >
                        {column.render 
                          ? column.render(item, index)
                          : (item as any)[column.key]
                        }
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-muted-foreground">
              {t('showing')} {Math.min((currentPage - 1) * pageSize + 1, sortedData.length)} - {Math.min(currentPage * pageSize, sortedData.length)} {t('of')} {sortedData.length} {t('entries')}
            </div>
            <div className="flex items-center gap-4">
              {typeof pagination === 'object' && pagination.showSizeSelector && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{t('rowsPerPage')}</span>
                  <Select
                    value={String(pageSize)}
                    onValueChange={(value) => {
                      setPageSize(Number(value));
                      setCurrentPage(1);
                    }}
                  >
                    {(pagination.pageSizes || [10, 20, 30, 50, 100]).map((size) => (
                      <option key={size} value={String(size)}>
                        {size}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  {t('previous')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  {t('next')}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DataTable.displayName = 'DataTable';