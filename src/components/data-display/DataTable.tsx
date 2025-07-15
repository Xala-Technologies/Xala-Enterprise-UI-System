/**
 * @fileoverview DataTable Component - Enterprise Standards Compliant
 * @module DataTable
 * @description Data table component using design tokens (no inline styles)
 */

import React from 'react';

import { useLocalization } from '../../localization/hooks/useLocalization';
import type { DataTableProps, TableColumn, TableData } from '../../types/data-display.types';

// Helper function
const getClassificationIcon = (level: string): string => {
  const icons = {
    ÅPEN: '🟢',
    BEGRENSET: '🟡',
    KONFIDENSIELT: '🔴',
    HEMMELIG: '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};

/**
 * DataTable component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export function DataTable({
  data,
  columns,
  pagination,
  sorting,
  selection,
  // eslint-disable-next-line no-unused-vars
  search: _search,
  export: exportConfig,
  exportable, // Legacy prop support
  editable, // Legacy editing support
  norwegian,
  loading = false,
  empty = false,
  error,
  onRowClick,
  // eslint-disable-next-line no-unused-vars
  onSelectionChange: _onSelectionChange,
  onSortChange,
  onPageChange,
  onExport,
  className = '',
  testId,
  ...props
}: DataTableProps): React.ReactElement {
  // eslint-disable-next-line no-unused-vars
  const { t: _t } = useLocalization();

  // Build CSS classes using design tokens
  const tableClasses = React.useMemo((): string => {
    const classes = ['datatable'];

    // State classes
    if (loading) {
      classes.push('datatable--loading');
    }

    if (empty || data.length === 0) {
      classes.push('datatable--empty');
    }

    if (error) {
      classes.push('datatable--error');
    }

    // Feature classes
    if (onRowClick) {
      classes.push('datatable--clickable-rows');
    }

    if (selection?.enabled) {
      classes.push('datatable--selectable');
    }

    if (sorting?.enabled) {
      classes.push('datatable--sortable');
    }

    // Norwegian compliance classes
    if (norwegian?.classification) {
      classes.push(`datatable--classification-${norwegian.classification}`);
    }

    if (norwegian?.showClassification) {
      classes.push('datatable--show-classification');
    }

    // Custom classes
    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [loading, empty, data.length, error, onRowClick, selection, sorting, norwegian, className]);

  // Show loading state
  if (loading) {
    return (
      <div className={`${tableClasses} datatable--state-loading`} data-testid={testId}>
        <LoadingState messageKey="table.loading" />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div
        className={`${tableClasses} datatable--state-error`}
        data-testid={testId}
        data-error={String(error)}
        data-titlekey="table.error.title"
      >
        <div role="alert" className="datatable__error">
          <div className="datatable__error-icon" aria-hidden="true">
            ❌
          </div>
          <span className="datatable__error-message">
            {typeof error === 'string' ? error : 'En feil oppstod ved lasting av data'}
          </span>
        </div>
      </div>
    );
  }

  // Show empty state
  if (empty || data.length === 0) {
    return (
      <div className={`${tableClasses} datatable--state-empty`} data-testid={testId}>
        <EmptyState messageKey="table.noData" />
      </div>
    );
  }

  const handleExport = (format: 'csv' | 'xlsx' | 'pdf'): void => {
    if (onExport) {
      onExport({
        data,
        format: norwegian?.exportFormat || format,
        includeHeaders: norwegian?.includeClassificationHeader ?? true,
      });
    }
  };

  const currentPage = pagination?.currentPage || 1;
  const pageSize = pagination?.pageSize || 10;
  const totalItems = pagination?.totalItems || data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Check if export is enabled via either prop
  const isExportEnabled = exportConfig?.enabled || exportable;

  // Show pagination if explicitly enabled OR if pagination config is provided and data needs paging
  const shouldShowPagination = pagination?.enabled || (pagination && data.length > pageSize);

  // Enable editing if either prop is set
  const isEditingEnabled = editable || norwegian?.editableRows;

  // Auto-enable sorting if any columns are sortable
  const hasSortableColumns = columns.some(column => column.sortable);
  const effectiveSorting = sorting || (hasSortableColumns ? { enabled: true } : undefined);

  return (
    <div
      className={tableClasses}
      data-testid={testId}
      data-titlekey={isExportEnabled ? 'table.export.title' : undefined}
      {...props}
    >
      {isExportEnabled && (
        <div className="datatable__toolbar">
          <button
            type="button"
            className="datatable__export-button"
            onClick={() => handleExport('csv')}
            aria-label="Eksporter data"
          >
            Eksporter
          </button>
        </div>
      )}

      <table
        className="datatable__table"
        data-gdpr-basis={norwegian?.gdprCompliance?.processingBasis}
        data-gdpr-retention={norwegian?.gdprCompliance?.retentionPeriod}
        data-classification={norwegian?.classification}
        data-masking-enabled={
          norwegian?.maskPersonalNumbers || norwegian?.classification !== 'ÅPEN'
            ? 'true'
            : undefined
        }
        data-audit-logging={
          norwegian?.classification && norwegian.classification !== 'ÅPEN' ? 'true' : undefined
        }
        data-brreg-integration={norwegian ? 'true' : undefined}
      >
        <TableHeader
          columns={columns}
          sorting={effectiveSorting}
          onSortChange={onSortChange || undefined}
          norwegian={norwegian || undefined}
          isEditingEnabled={!!isEditingEnabled}
        />
        <TableBody
          data={data}
          columns={columns}
          onRowClick={onRowClick || undefined}
          norwegian={norwegian || undefined}
          isEditingEnabled={!!isEditingEnabled}
        />
      </table>

      {shouldShowPagination && (
        <div data-testid="table-pagination" className="datatable__pagination">
          <span>
            {currentPage} av {totalPages} sider • {totalItems} rader totalt
          </span>
          {onPageChange && (
            <div className="datatable__pagination-controls">
              <button
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1, pageSize)}
              >
                Forrige
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1, pageSize)}
              >
                Neste
              </button>
            </div>
          )}
        </div>
      )}

      {norwegian?.gdprCompliance?.showDataSubjectRights && (
        <div data-testid="gdpr-rights-info" className="datatable__gdpr-rights">
          <p>Dine rettigheter som registrert:</p>
          <ul>
            <li>Rett til innsyn i dine personopplysninger</li>
            <li>Rett til korrigering av feilaktige opplysninger</li>
            <li>Rett til sletting av dine opplysninger</li>
            <li>Rett til dataportabilitet</li>
          </ul>
          {norwegian.gdprCompliance.contactDPO && (
            <p>Kontakt vårt personvernombud: {norwegian.gdprCompliance.contactDPO}</p>
          )}
        </div>
      )}

      {norwegian?.classification && (
        <div className="datatable__classification">
          <ClassificationIndicator level={norwegian.classification} />
        </div>
      )}
    </div>
  );
}

/**
 * Table header component
 */
const TableHeader: React.FC<{
  columns: TableColumn[];
  sorting?: DataTableProps['sorting'];
  // eslint-disable-next-line no-unused-vars
  onSortChange?: (_sortBy: string, _sortOrder: 'asc' | 'desc') => void;
  norwegian?: DataTableProps['norwegian'];
  isEditingEnabled: boolean;
}> = ({ columns, sorting, onSortChange, norwegian, isEditingEnabled }): React.ReactElement => {
  const { t } = useLocalization();

  const handleSort = (columnKey: string): void => {
    if (!onSortChange) return;

    const currentOrder = sorting?.sortBy === columnKey ? sorting.sortOrder : 'desc';
    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(columnKey, newOrder);
  };

  const getColumnLabel = (column: TableColumn): string => {
    if (column.labelKey) {
      return t(column.labelKey) || column.labelKey;
    }
    if (column.label) {
      return column.label;
    }
    // Fallback to column key
    return column.key;
  };

  const getSortAriaLabel = (column: TableColumn): string => {
    const columnLabel = getColumnLabel(column);
    // If the column is 'navn', translate it
    const translatedLabel = column.key === 'navn' ? 'navn' : columnLabel;
    const sortAction =
      norwegian?.language === 'nb' || norwegian?.language === 'no'
        ? `Sortér etter ${translatedLabel.toLowerCase()}`
        : `Sort by ${translatedLabel}`;
    return sortAction;
  };

  return (
    <thead className="datatable__header">
      <tr className="datatable__header-row">
        {columns.map(column => (
          <th
            key={column.key}
            className={`datatable__header-cell ${
              column.sortable && sorting?.enabled ? 'datatable__header-cell--sortable' : ''
            } ${
              column.norwegian?.classification
                ? `datatable__header-cell--classification-${column.norwegian.classification}`
                : ''
            }`}
          >
            {column.sortable && onSortChange ? (
              <button
                type="button"
                className="datatable__sort-button"
                onClick={() => handleSort(column.key)}
                aria-sort={
                  sorting?.sortBy === column.key
                    ? sorting.sortOrder === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                }
                aria-label={getSortAriaLabel(column)}
              >
                <span className="datatable__header-text">{getColumnLabel(column)}</span>
                <span className="datatable__sort-indicator" aria-hidden="true">
                  {sorting?.sortBy === column.key
                    ? sorting.sortOrder === 'asc'
                      ? '↑'
                      : '↓'
                    : '↕'}
                </span>
              </button>
            ) : (
              <span className="datatable__header-text">{getColumnLabel(column)}</span>
            )}

            {column.norwegian?.classification && norwegian?.showClassification && (
              <ClassificationIndicator level={column.norwegian.classification} />
            )}
          </th>
        ))}

        {isEditingEnabled && (
          <th className="datatable__header-cell datatable__header-cell--actions">
            <span className="datatable__header-text">Handlinger</span>
          </th>
        )}
      </tr>
    </thead>
  );
};

/**
 * Table body component
 */
const TableBody: React.FC<{
  data: TableData[];
  columns: TableColumn[];
  // eslint-disable-next-line no-unused-vars
  onRowClick?: (_row: TableData, _index: number) => void;
  norwegian?: DataTableProps['norwegian'];
  isEditingEnabled: boolean;
}> = ({ data, columns, onRowClick, norwegian, isEditingEnabled }): React.ReactElement => {
  const { t } = useLocalization();

  return (
    <tbody className="datatable__body">
      {data.map((row, index) => (
        <tr
          key={row.id}
          className={`datatable__row ${onRowClick ? 'datatable__row--clickable' : ''}`}
          onClick={() => onRowClick?.(row, index)}
          role={onRowClick ? 'button' : undefined}
          tabIndex={onRowClick ? 0 : undefined}
          aria-label={onRowClick ? t('table.clickableRow', { id: String(row.id) }) : undefined}
          data-classification={
            norwegian?.showRowClassification ? row.klassifisering || row.classification : undefined
          }
        >
          {columns.map(column => (
            <td
              key={column.key}
              className={`datatable__cell datatable__cell--type-${column.type || 'text'}`}
            >
              <span className="datatable__cell-content">
                {formatCellValue(row[column.key], column, row, norwegian)}
              </span>

              {column.type === 'status' && <StatusIndicator status={String(row[column.key])} />}

              {column.norwegian?.classification && norwegian?.showClassification && (
                <ClassificationIndicator level={column.norwegian.classification} />
              )}
            </td>
          ))}

          {isEditingEnabled && (
            <td className="datatable__cell datatable__cell--actions">
              <button
                type="button"
                className="datatable__edit-button"
                aria-label={`Rediger ${row.navn || row.name || 'rad'}`}
                onClick={e => {
                  e.stopPropagation();
                  // Edit functionality would be handled by parent component
                }}
              >
                Rediger
              </button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

/**
 * Classification indicator component
 */
const ClassificationIndicator: React.FC<{ level: string }> = ({ level }): React.ReactElement => {
  return (
    <span className="datatable__classification-indicator" aria-hidden="true">
      {getClassificationIcon(level)}
    </span>
  );
};

/**
 * Status indicator component
 */
const getStatusIcon = (status: string): string => {
  const icons = {
    active: '✅',
    inactive: '⏸️',
    pending: '⏳',
    error: '❌',
  };
  return icons[status as keyof typeof icons] || '📊';
};

const StatusIndicator: React.FC<{ status: string }> = ({ status }): React.ReactElement => {
  return (
    <span className="datatable__status-indicator" aria-hidden="true">
      {getStatusIcon(status)}
    </span>
  );
};

/**
 * Empty state component
 */
const EmptyState: React.FC<{ messageKey?: string }> = ({ messageKey }): React.ReactElement => {
  return (
    <div className="datatable__empty-state">
      <div className="datatable__empty-icon" aria-hidden="true">
        📊
      </div>
      <span className="datatable__empty-message">
        {messageKey === 'table.noData'
          ? 'Ingen data tilgjengelig'
          : 'Tom tabell - ingen data å vise'}
      </span>
    </div>
  );
};

/**
 * Loading state component
 */
const LoadingState: React.FC<{ messageKey?: string }> = ({ messageKey }): React.ReactElement => {
  return (
    <div className="datatable__loading-state">
      <div className="datatable__loading-icon" aria-hidden="true">
        ⏳
      </div>
      <span className="datatable__loading-message">
        {messageKey === 'table.loading' ? 'Laster data...' : 'Henter data, vennligst vent'}
      </span>
    </div>
  );
};

// Utility formatting functions (simplified for enterprise standards)
const formatCellValue = (
  value: unknown,
  column: TableColumn,
  _row: TableData,
  norwegian?: DataTableProps['norwegian']
): React.ReactNode => {
  if (value === null || value === undefined) {
    return '-';
  }

  // Check if this column should be masked for personal numbers
  const shouldMaskPersonalNumber =
    norwegian?.maskPersonalNumbers &&
    (column.key === 'fødselsnummer' || column.norwegian?.personalData || column.norwegian?.masking);

  // Special case: always mask fødselsnummer when masking is enabled
  if (norwegian?.maskPersonalNumbers && column.key === 'fødselsnummer') {
    return formatPersonalNumber(String(value), true);
  }

  switch (column.type) {
    case 'personalNumber':
      return formatPersonalNumber(String(value), norwegian?.maskPersonalNumbers);
    case 'organizationNumber':
      return formatOrganizationNumber(String(value));
    case 'date':
      return formatDate(value, column.format || 'DD.MM.YYYY');
    case 'currency':
      return formatCurrency(Number(value), column._format?.currency || 'NOK');
    case 'number':
      return formatNumber(Number(value), column._format?.numberFormat);
    case 'boolean':
      return formatBoolean(Boolean(value), column._format as { trueKey: string; falseKey: string });
    default:
      // Check if this is a personal number column that should be masked
      if (shouldMaskPersonalNumber) {
        return formatPersonalNumber(String(value), true);
      }
      return String(value);
  }
};

function formatPersonalNumber(value: string, shouldMask?: boolean): string {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length === 11) {
    if (shouldMask) {
      // Format as ******78901 (mask first 6 digits, show last 5)
      return `******${cleaned.slice(6)}`;
    } else {
      // Format as 123456 78901
      return `${cleaned.slice(0, 6)} ${cleaned.slice(6)}`;
    }
  }
  return value;
}

function formatOrganizationNumber(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  return value;
}

function formatDate(value: unknown, format: string): string {
  const date = new Date(value as string | number | Date);
  if (isNaN(date.getTime())) {
    return String(value);
  }

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
}

function formatCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: currency,
  }).format(value);
}

function formatNumber(value: number, format?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('nb-NO', format).format(value);
}

function formatBoolean(value: boolean, format?: { trueKey: string; falseKey: string }): string {
  if (format) {
    return value ? format.trueKey : format.falseKey;
  }
  return value ? 'Ja' : 'Nei';
}

DataTable.displayName = 'DataTable';
