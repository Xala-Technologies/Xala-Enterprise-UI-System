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
  readonly disabled?: (_item: T, index: number) => boolean;
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
  readonly rowKey?: (_item: T, index: number) => string;
  /** Row click handler */
  readonly onRowClick?: (_item: T, index: number) => void;
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
  ): React.ReactElement => {
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
      <div ref={ref} className={cn(dataTableVariants({ variant, size }), className)} {...props}>
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
