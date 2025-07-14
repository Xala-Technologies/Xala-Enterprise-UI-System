/**
 * Data Table Component
 * Comprehensive table with pagination, filtering, sorting, and CRUD actions
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type ReactNode } from 'react';

/**
 * Data table variants using design tokens
 */
const dataTableVariants = cva(
  [
    'w-full overflow-auto',
    'border border-border rounded-md',
    'bg-background',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        primary: 'bg-primary/5 border-primary/20',
        secondary: 'bg-secondary/5 border-secondary/20',
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

/**
 * Table column definition
 */
export interface TableColumn<T = unknown> {
  /** Column key */
  readonly key: string;
  /** Column header */
  readonly header: string;
  /** Column sortable */
  readonly sortable?: boolean;
  /** Column width */
  readonly width?: string;
  /** Column render function */
  readonly render?: (value: unknown, item: T, index: number) => ReactNode;
  /** Column align */
  readonly align?: 'left' | 'center' | 'right';
}

/**
 * Table action definition
 */
export interface TableAction<T = unknown> {
  /** Action key */
  readonly key: string;
  /** Action label */
  readonly label: string;
  /** Action icon */
  readonly icon?: ReactNode;
  /** Action handler */
  readonly onClick: (_item: T, index: number) => void;
  /** Action disabled check */
  readonly disabled?: (_item: T, _index: number) => boolean;
  /** Action variant */
  readonly variant?: 'default' | 'primary' | 'secondary' | 'destructive';
}

/**
 * Data Table Props
 */
export interface DataTableProps<T = unknown>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'data'> {
  /** Table variant */
  readonly variant?: 'default' | 'primary' | 'secondary';
  /** Table size */
  readonly size?: 'sm' | 'md' | 'lg';
  /** Table data */
  readonly data: readonly T[];
  /** Table columns */
  readonly columns: readonly TableColumn<T>[];
  /** Table actions */
  readonly actions?: readonly TableAction<T>[];
  /** Loading state */
  readonly loading?: boolean;
  /** Empty state message */
  readonly emptyMessage?: string;
  /** Sort column */
  readonly sortBy?: string;
  /** Sort direction */
  readonly sortDirection?: 'asc' | 'desc';
  /** Sort change handler */
  readonly onSort?: (column: string, direction: 'asc' | 'desc') => void;
  /** Row selection */
  readonly selectedRows?: readonly string[];
  /** Row selection handler */
  readonly onRowSelect?: (selectedRows: readonly string[]) => void;
  /** Row key extractor */
  readonly rowKey?: (_item: T, _index: number) => string;
  /** Row click handler */
  readonly onRowClick?: (_item: T, _index: number) => void;
}

/**
 * Data Table Component
 * @param props - Data table properties
 * @returns React.ReactElement
 */
export const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  (
    {
      variant = 'default',
      size = 'md',
      data,
      columns,
      actions = [],
      loading = false,
      emptyMessage = 'No data available',
      sortBy,
      sortDirection = 'asc',
      onSort,
      selectedRows = [],
      onRowSelect,
      rowKey = (_, index) => index.toString(),
      onRowClick,
      className,
      ...props
    },
    ref
  ): void => {
    /**
     * Handle sort click
     * @param column - Column key
     */
    const handleSort = (column: string): void => {
      if (!onSort) return;

      const newDirection = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(column, newDirection);
    };

    /**
     * Handle row selection
     * @param rowId - Row identifier
     */
    const handleRowSelect = (rowId: string): void => {
      if (!onRowSelect) return;

      const newSelection = selectedRows.includes(rowId)
        ? selectedRows.filter(id => id !== rowId)
        : [...selectedRows, rowId];

      onRowSelect(newSelection);
    };

    /**
     * Handle select all
     */
    const handleSelectAll = (): void => {
      if (!onRowSelect) return;

      const allRowIds = data.map(rowKey);
      const newSelection = selectedRows.length === data.length ? [] : allRowIds;
      onRowSelect(newSelection);
    };

    /**
     * Render table header
     * @returns React.ReactElement
     */
    const renderHeader = (): React.ReactElement => (
      <thead className="bg-muted/50">
        <tr>
          {onRowSelect && (
            <th className="w-12 p-3 text-left">
              <input
                type="checkbox"
                checked={selectedRows.length === data.length && data.length > 0}
                onChange={handleSelectAll}
                className="rounded border-border focus:ring-ring"
                aria-label="Select all rows"
              />
            </th>
          )}
          {columns.map(column => (
            <th
              key={column.key}
              className={cn(
                'p-3 text-left font-medium text-foreground',
                column.align === 'center' && 'text-center',
                column.align === 'right' && 'text-right'
              )}
              style={{ width: column.width }}
            >
              {column.sortable ? (
                <button
                  onClick={() => handleSort(column.key)}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                  aria-label={`Sort by ${column.header}`}
                >
                  {column.header}
                  {sortBy === column.key && (
                    <span className="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </button>
              ) : (
                column.header
              )}
            </th>
          ))}
          {actions.length > 0 && (
            <th className="p-3 text-right font-medium text-foreground">Actions</th>
          )}
        </tr>
      </thead>
    );

    /**
     * Render table body
     * @returns React.ReactElement
     */
    const renderBody = (): React.ReactElement => (
      <tbody>
        {data.map((item, index): void => {
          const rowId = rowKey(item, index);
          const isSelected = selectedRows.includes(rowId);

          return (
            <tr
              key={rowId}
              className={cn(
                'border-b border-border transition-colors',
                'hover:bg-muted/50',
                isSelected && 'bg-primary/5',
                onRowClick && 'cursor-pointer'
              )}
              onClick={() => onRowClick?.(item, index)}
            >
              {onRowSelect && (
                <td className="w-12 p-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleRowSelect(rowId)}
                    className="rounded border-border focus:ring-ring"
                    aria-label={`Select row ${index + 1}`}
                  />
                </td>
              )}
              {columns.map(column => (
                <td
                  key={column.key}
                  className={cn(
                    'p-3 text-foreground',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                >
                  {column.render
                    ? column.render((item as Record<string, unknown>)[column.key], item, index)
                    : String((item as Record<string, unknown>)[column.key] || '')}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {actions.map(action => (
                      <button
                        key={action.key}
                        onClick={e => {
                          e.stopPropagation();
                          action.onClick(item, index);
                        }}
                        disabled={action.disabled?.(item, index)}
                        className={cn(
                          'p-2 rounded-md transition-colors',
                          'hover:bg-accent hover:text-accent-foreground',
                          'focus:outline-none focus:ring-2 focus:ring-ring',
                          'disabled:opacity-50 disabled:cursor-not-allowed',
                          action.variant === 'destructive' &&
                            'hover:bg-destructive hover:text-destructive-foreground'
                        )}
                        aria-label={action.label}
                        title={action.label}
                      >
                        {action.icon}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    );

    return (
      <div ref={ref} className={cn(dataTableVariants({ _variant, _size }), className)} {...props}>
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">{emptyMessage}</div>
        ) : (
          <table className="w-full">
            {renderHeader()}
            {renderBody()}
          </table>
        )}
      </div>
    );
  }
);

DataTable.displayName = 'DataTable';

/**
 * Data table variants and types
 */
export type DataTableVariant = VariantProps<typeof dataTableVariants>;

export { dataTableVariants };
