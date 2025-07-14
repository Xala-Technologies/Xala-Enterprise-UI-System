// DataTable component for @xala-mock/ui-system
// Norwegian-compliant data table with accessibility and compliance features

import React, { useState, useMemo, useCallback } from 'react';

import { DataTableProps, TableColumn, TableData, TableState } from '../../types/data-display.types';

// Helper function to generate CSS using design tokens
const getDataTableStyles = (props: DataTableProps): React.CSSProperties => {
  const { loading = false, empty = false, norwegian } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    width: '100%',
    fontFamily: 'var(--font-family-sans)',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-normal)',
    backgroundColor: 'var(--background-primary)',
    border: 'var(--border-width) solid var(--border-primary)',
    borderRadius: 'var(--border-radius-base)',
    overflow: 'hidden',
  };

  // Norwegian classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);

  // Loading/empty state styling
  const stateStyles = getStateStyles(loading, empty);

  return { ...baseStyles, ...classificationStyles, ...stateStyles };
};

// Get Norwegian classification styles
const getClassificationStyles = (classification?: string): React.CSSProperties => {
  if (!classification) { return {}; }

  const classificationStyles: Record<string, React.CSSProperties> = {
    ÅPEN: {
      borderTop: 'var(--border-accent-width) solid var(--color-green-500)',
    },
    BEGRENSET: {
      borderTop: 'var(--border-accent-width) solid var(--color-orange-500)',
    },
    KONFIDENSIELT: {
      borderTop: 'var(--border-accent-width) solid var(--color-red-500)',
    },
    HEMMELIG: {
      borderTop: 'var(--border-accent-width) solid var(--color-red-800)',
      backgroundColor: 'var(--color-red-50)',
    },
  };

  return classificationStyles[classification] || {};
};

// Get state-based styles
const getStateStyles = (loading: boolean, empty: boolean): React.CSSProperties => {
  if (loading || empty) {
    return {
      opacity: '0.7',
      pointerEvents: 'none',
    };
  }
  return {};
};

// Table header component
const TableHeader = ({
  columns,
  sorting,
  onSortChange,
  norwegian,
}: {
  columns: TableColumn[];
  sorting?: DataTableProps['sorting'];
  onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  norwegian?: DataTableProps['norwegian'];
}) => {
  const handleSort = (column: TableColumn) => {
    if (!column.sortable || !onSortChange) { return; }

    // Toggle sort order or default to 'asc'
    const newOrder = 'asc'; // Simplified for this implementation
    onSortChange(column.key, newOrder);
  };

  return (
    <thead
      style={{
        backgroundColor: 'var(--color-gray-50)',
        borderBottom: 'var(--border-width) solid var(--border-primary)',
      }}
    >
      <tr>
        {columns.map(column => (
          <th
            key={column.key}
            style={{
              padding: 'var(--spacing-3) var(--spacing-4)',
              textAlign: column.align || 'left',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--text-primary)',
              cursor: column.sortable ? 'pointer' : 'default',
              userSelect: 'none',
              width: column.width,
              position: 'relative',
            }}
            onClick={() => handleSort(column)}
            aria-sort={
              column.sortable
                ? sorting?.defaultSortBy === column.key
                  ? sorting.defaultSortOrder === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
                : undefined
            }
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)' }}>
              {/* TODO: Replace with actual localization */}
              <span>{column.labelKey}</span>

              {/* Classification indicator */}
              {column.norwegian?.classification && (
                <ClassificationIndicator level={column.norwegian.classification} />
              )}

              {/* Sort indicator */}
              {column.sortable && (
                <span style={{ fontSize: 'var(--font-size-xs)', opacity: '0.6' }}>↕️</span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

// Table body component
const TableBody = ({
  data,
  columns,
  onRowClick,
  norwegian,
}: {
  data: TableData[];
  columns: TableColumn[];
  onRowClick?: (row: TableData, index: number) => void;
  norwegian?: DataTableProps['norwegian'];
}) => {
  const formatCellValue = (value: any, column: TableColumn, row: TableData): string => {
    if (value === null || value === undefined) { return ''; }

    // Norwegian-specific formatting
    switch (column.type) {
      case 'personalNumber':
        return formatPersonalNumber(value);
      case 'organizationNumber':
        return formatOrganizationNumber(value);
      case 'date':
        return formatDate(value, norwegian?.dateFormat || 'DD.MM.YYYY');
      case 'currency':
        return formatCurrency(value, column.format?.currency || 'NOK');
      case 'number':
        return formatNumber(value, norwegian?.numberFormat);
      case 'boolean':
        return formatBoolean(value, column.format?.boolean);
      default:
        return String(value);
    }
  };

  return (
    <tbody>
      {data.map((row, index) => (
        <tr
          key={row.id}
          style={{
            borderBottom: 'var(--border-width) solid var(--border-secondary)',
            cursor: onRowClick ? 'pointer' : 'default',
            transition: 'background-color 0.2s ease',
            ':hover': onRowClick
              ? {
                backgroundColor: 'var(--color-gray-25)',
              }
              : {},
          }}
          onClick={() => onRowClick?.(row, index)}
          role={onRowClick ? 'button' : undefined}
          tabIndex={onRowClick ? 0 : undefined}
          aria-label={onRowClick ? `Select row ${index + 1}` : undefined}
        >
          {columns.map(column => (
            <td
              key={column.key}
              style={{
                padding: 'var(--spacing-3) var(--spacing-4)',
                textAlign: column.align || 'left',
                color: 'var(--text-primary)',
                verticalAlign: 'middle',
                minHeight: 'var(--touch-target-min-height)', // Norwegian accessibility
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                {/* Cell content */}
                <span>
                  {column.render
                    ? column.render(row[column.key], row, column)
                    : formatCellValue(row[column.key], column, row)}
                </span>

                {/* Sensitive data indicator */}
                {column.norwegian?.sensitive && (
                  <span
                    style={{ fontSize: 'var(--font-size-xs)', opacity: '0.6' }}
                    aria-label='Sensitive data'
                    title='Sensitive data'
                  >
                    🔒
                  </span>
                )}

                {/* Row classification indicator */}
                {row.norwegian?.classification && norwegian?.showClassification && (
                  <ClassificationIndicator level={row.norwegian.classification} />
                )}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

// Classification indicator component
const ClassificationIndicator = ({ level }: { level: string }) => {
  const getClassificationIcon = (classification: string): string => {
    const icons = {
      ÅPEN: '🟢',
      BEGRENSET: '🟡',
      KONFIDENSIELT: '🔴',
      HEMMELIG: '⚫',
    };
    return icons[classification as keyof typeof icons] || '❓';
  };

  const getClassificationText = (classification: string): string => {
    const texts = {
      ÅPEN: 'Åpen',
      BEGRENSET: 'Begrenset',
      KONFIDENSIELT: 'Konfidensielt',
      HEMMELIG: 'Hemmelig',
    };
    return texts[classification as keyof typeof texts] || classification;
  };

  return (
    <span
      style={{
        fontSize: 'var(--font-size-xs)',
        padding: 'var(--spacing-1)',
        borderRadius: 'var(--border-radius-sm)',
        backgroundColor: 'var(--color-gray-100)',
      }}
      aria-label={`Classification: ${getClassificationText(level)}`}
      title={`Klassifisering: ${getClassificationText(level)}`}
    >
      {getClassificationIcon(level)}
    </span>
  );
};

// Empty state component
const EmptyState = ({ messageKey }: { messageKey?: string }) => {
  return (
    <div
      style={{
        padding: 'var(--spacing-12) var(--spacing-8)',
        textAlign: 'center',
        color: 'var(--text-secondary)',
      }}
    >
      <div
        style={{
          fontSize: 'var(--font-size-lg)',
          marginBottom: 'var(--spacing-2)',
        }}
      >
        📄
      </div>
      <div style={{ fontSize: 'var(--font-size-base)' }}>
        {/* TODO: Replace with actual localization */}
        {messageKey || 'Ingen data å vise'}
      </div>
    </div>
  );
};

// Loading state component
const LoadingState = ({ messageKey }: { messageKey?: string }) => {
  return (
    <div
      style={{
        padding: 'var(--spacing-12) var(--spacing-8)',
        textAlign: 'center',
        color: 'var(--text-secondary)',
      }}
    >
      <div
        style={{
          fontSize: 'var(--font-size-lg)',
          marginBottom: 'var(--spacing-2)',
        }}
      >
        ⏳
      </div>
      <div style={{ fontSize: 'var(--font-size-base)' }}>
        {/* TODO: Replace with actual localization */}
        {messageKey || 'Laster data...'}
      </div>
    </div>
  );
};

// Norwegian data formatting functions
const formatPersonalNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.substring(0, 6)}-${cleaned.substring(6)}`;
  }
  return value;
};

const formatOrganizationNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length === 9) {
    return `${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`;
  }
  return value;
};

const formatDate = (value: any, format: string): string => {
  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) { return String(value); }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    switch (format) {
      case 'DD.MM.YYYY':
        return `${day}.${month}.${year}`;
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      default:
        return `${day}.${month}.${year}`;
    }
  } catch {
    return String(value);
  }
};

const formatCurrency = (value: number, currency: string): string => {
  try {
    return new Intl.NumberFormat('nb-NO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${value} ${currency}`;
  }
};

const formatNumber = (value: number, format?: string): string => {
  try {
    if (format === 'norwegian') {
      return new Intl.NumberFormat('nb-NO').format(value);
    }
    return new Intl.NumberFormat('en-US').format(value);
  } catch {
    return String(value);
  }
};

const formatBoolean = (value: boolean, format?: { trueKey: string; falseKey: string }): string => {
  if (format) {
    // TODO: Replace with actual localization
    return value ? format.trueKey : format.falseKey;
  }
  return value ? 'Ja' : 'Nei';
};

// DataTable component with forwardRef
export const DataTable = React.forwardRef<HTMLTableElement, DataTableProps>((props, ref) => {
  const {
    data,
    columns,
    pagination,
    sorting,
    selection,
    search,
    export: exportConfig,
    loading = false,
    empty = false,
    emptyMessageKey,
    loadingMessageKey,
    norwegian,
    onRowClick,
    onSelectionChange,
    onSortChange,
    onPageChange,
    className,
    style,
    testId,
    'aria-label': ariaLabel,
    ...tableProps
  } = props;

  const [tableState, setTableState] = useState<TableState>({
    currentPage: 1,
    pageSize: pagination?.pageSize || 25,
    selectedRows: [],
    loading: loading,
    error: undefined,
  });

  const tableStyles = getDataTableStyles(props);
  const combinedStyles = { ...tableStyles, ...style };

  // Calculate displayed data based on pagination
  const displayedData = useMemo(() => {
    let filtered = data;

    // Apply pagination
    if (pagination?.enabled) {
      const startIndex = (tableState.currentPage - 1) * tableState.pageSize;
      const endIndex = startIndex + tableState.pageSize;
      filtered = filtered.slice(startIndex, endIndex);
    }

    return filtered;
  }, [data, pagination, tableState.currentPage, tableState.pageSize]);

  // Handle empty state
  if (!loading && (data.length === 0 || empty)) {
    return (
      <div style={combinedStyles} data-testid={testId} className={className}>
        <EmptyState messageKey={emptyMessageKey} />
      </div>
    );
  }

  // Handle loading state
  if (loading) {
    return (
      <div style={combinedStyles} data-testid={testId} className={className}>
        <LoadingState messageKey={loadingMessageKey} />
      </div>
    );
  }

  return (
    <div
      style={combinedStyles}
      data-testid={testId}
      className={className}
      data-classification={norwegian?.classification}
      data-municipality={norwegian?.municipality}
    >
      {/* Classification header */}
      {norwegian?.classification && norwegian.showClassification && (
        <div
          style={{
            padding: 'var(--spacing-2) var(--spacing-4)',
            backgroundColor: 'var(--color-gray-50)',
            borderBottom: 'var(--border-width) solid var(--border-primary)',
            fontSize: 'var(--font-size-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-2)',
          }}
        >
          <ClassificationIndicator level={norwegian.classification} />
          <span style={{ color: 'var(--text-secondary)' }}>
            Klassifisering: {norwegian.classification}
          </span>
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table
          ref={ref}
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 'var(--font-size-sm)',
            lineHeight: 'var(--line-height-normal)',
          }}
          aria-label={ariaLabel || 'Data table'}
          role='table'
          {...tableProps}
        >
          <TableHeader
            columns={columns}
            sorting={sorting}
            onSortChange={onSortChange}
            norwegian={norwegian}
          />
          <TableBody
            data={displayedData}
            columns={columns}
            onRowClick={onRowClick}
            norwegian={norwegian}
          />
        </table>
      </div>

      {/* Pagination footer */}
      {pagination?.enabled && (
        <div
          style={{
            padding: 'var(--spacing-3) var(--spacing-4)',
            borderTop: 'var(--border-width) solid var(--border-primary)',
            backgroundColor: 'var(--color-gray-25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--text-secondary)',
          }}
        >
          <div>
            {/* TODO: Replace with actual localization */}
            Viser {Math.min(data.length, tableState.pageSize)} av {data.length} rader
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <button
              style={{
                padding: 'var(--spacing-1) var(--spacing-2)',
                border: 'var(--border-width) solid var(--border-primary)',
                borderRadius: 'var(--border-radius-sm)',
                backgroundColor: 'var(--background-primary)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm)',
              }}
              disabled={tableState.currentPage === 1}
              onClick={() =>
                setTableState(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))
              }
              aria-label='Previous page'
            >
              ← Forrige
            </button>

            <span style={{ padding: '0 var(--spacing-3)' }}>Side {tableState.currentPage}</span>

            <button
              style={{
                padding: 'var(--spacing-1) var(--spacing-2)',
                border: 'var(--border-width) solid var(--border-primary)',
                borderRadius: 'var(--border-radius-sm)',
                backgroundColor: 'var(--background-primary)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm)',
              }}
              disabled={displayedData.length < tableState.pageSize}
              onClick={() =>
                setTableState(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))
              }
              aria-label='Next page'
            >
              Neste →
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

DataTable.displayName = 'DataTable';
