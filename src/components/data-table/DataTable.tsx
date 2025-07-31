/**
 * Data Table Component
 * Comprehensive table with pagination, filtering, sorting, and CRUD actions
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { forwardRef, type ReactNode } from 'react';

/**
 * Data table text configuration interface
 */
export interface DataTableTexts {
  readonly loading: string;
  readonly selectAllRows: string;
  readonly actionsHeader: string;
}

/**
 * Default text configuration for data table
 */
const defaultTexts: DataTableTexts = {
  loading: 'Loading...',
  selectAllRows: 'Select all rows',
  actionsHeader: 'Actions',
};

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

  readonly render?: (_value: unknown, _item: T, _index: number) => ReactNode;
  /** Column align */
  readonly align?: 'left' | 'center' | 'right';
  /** Column accessor function (for simple access) */
  readonly accessor?: (_item: T) => string;
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

  // eslint-disable-next-line no-unused-vars
  readonly onClick: (_item: T, _index: number) => void;
  /** Action disabled check */

  // eslint-disable-next-line no-unused-vars
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
  /** Text configuration for localization */
  readonly texts?: Partial<DataTableTexts>;
  /** Sort column */
  readonly sortBy?: string;
  /** Sort direction */
  readonly sortDirection?: 'asc' | 'desc';
  /** Sort change handler */

  // eslint-disable-next-line no-unused-vars
  readonly onSort?: (_column: string, _direction: 'asc' | 'desc') => void;
  /** Row selection */
  readonly selectedRows?: readonly string[];
  /** Row selection handler */
  // eslint-disable-next-line no-unused-vars
  readonly onRowSelect?: (_selectedRows: readonly string[]) => void;
  /** Row key extractor */

  // eslint-disable-next-line no-unused-vars
  readonly rowKey?: (_item: T, _index: number) => string;
  /** Row click handler */

  // eslint-disable-next-line no-unused-vars
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
      texts: userTexts,
      sortBy,
      sortDirection = 'asc',
      onSort,
      selectedRows = [],
      onRowSelect,
      rowKey = (_: unknown, index: number): string => index.toString(),
      onRowClick,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    // Merge default texts with user provided texts
    const texts: DataTableTexts = {
      ...defaultTexts,
      ...userTexts,
    };

    const handleRowSelect = (rowId: string): void => {
      if (onRowSelect) {
        const isSelected = selectedRows.includes(rowId);
        if (isSelected) {
          onRowSelect(selectedRows.filter(id => id !== rowId));
        } else {
          onRowSelect([...selectedRows, rowId]);
        }
      }
    };

    const handleSort = (column: string): void => {
      if (onSort) {
        const newDirection = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
        onSort(column, newDirection);
      }
    };

    const canSelectRows = onRowSelect !== undefined;

    const renderHeader = (): React.ReactElement => (
      <thead>
        <tr className="border-b border-border">
          {canSelectRows && (
            <th className="w-12 p-3">
              <input
                type="checkbox"
                checked={selectedRows.length > 0 && selectedRows.length === data.length}
                onChange={() => {
                  if (selectedRows.length === data.length) {
                    onRowSelect([]);
                  } else {
                    onRowSelect(data.map((_, index) => rowKey(_, index)));
                  }
                }}
                className="rounded border-border focus:ring-ring"
                aria-label={texts.selectAllRows}
              />
            </th>
          )}
          {columns.map(column => (
            <th
              key={column.key}
              className={cn(
                'p-3 text-left font-medium text-muted-foreground',
                column.sortable && 'cursor-pointer hover:text-foreground'
              )}
              onClick={() => column.sortable && handleSort(column.key)}
            >
              <div className="flex items-center gap-2">
                {column.header}
                {column.sortable && sortBy === column.key && (
                  <span className="text-xs">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
          ))}
          {actions.length > 0 && <th className="w-20 p-3 text-right">{texts.actionsHeader}</th>}
        </tr>
      </thead>
    );

    const renderRow = (item: unknown, index: number): React.ReactElement => {
      const key = rowKey(item, index);
      const isSelected = selectedRows.includes(key);

      return (
        <tr
          key={key}
          className={cn(
            'border-b border-border hover:bg-muted/50 transition-colors',
            isSelected && 'bg-muted',
            onRowClick && 'cursor-pointer'
          )}
          onClick={() => onRowClick?.(item, index)}
        >
          {canSelectRows && (
            <td className="w-12 p-3">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleRowSelect(key)}
                className="rounded border-border focus:ring-ring"
                onClick={e => e.stopPropagation()}
              />
            </td>
          )}
          {columns.map(column => {
            const value = column.accessor?.(item) ?? (item as Record<string, unknown>)[column.key];
            return (
              <td key={column.key} className="p-3">
                {column.render ? column.render(value, item, index) : String(value ?? '')}
              </td>
            );
          })}
          {actions.length > 0 && (
            <td className="p-3 text-right">
              <div className="flex items-center justify-end gap-1">
                {actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    onClick={e => {
                      e.stopPropagation();
                      action.onClick(item, index);
                    }}
                    disabled={action.disabled?.(item, index)}
                    className={cn('p-1 rounded hover:bg-background transition-colors', {
                      'text-muted-foreground hover:text-foreground': action.variant === 'default',
                      'text-primary hover:text-primary/80': action.variant === 'primary',
                      'text-secondary hover:text-secondary/80': action.variant === 'secondary',
                      'text-destructive hover:text-destructive/80':
                        action.variant === 'destructive',
                    })}
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
    };

    return (
      <div ref={ref} className={cn(dataTableVariants({ variant, size }), className)} {...props}>
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">{texts.loading}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">{emptyMessage}</div>
        ) : (
          <table className="w-full">
            {renderHeader()}
            <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>
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
