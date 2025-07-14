/**
 * @fileoverview DataTable Component - Enterprise Standards Compliant
 * @module DataTable
 * @description Data table component using design tokens (no inline styles)
 */

import React from 'react';

import { useLocalization } from '../../localization/hooks/useLocalization';
import type { DataTableProps, TableColumn, TableData } from '../../types/data-display.types';

// Helper function
const getClassificationIcon = (level: string): string => { const icons = { 'ÅPEN': '🟢',
    'BEGRENSET': '🟡',
    'KONFIDENSIELT': '🔴',
    'HEMMELIG': '⚫', };
  return icons[level as keyof typeof icons] || '📋'; };


/**
 * DataTable component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export function DataTable({ data,
  columns,
  pagination: _pagination,
  sorting,
  selection,
  search: _search,
  export: exportConfig,
  norwegian,
  loading = false,
  empty = false,
  onRowClick,
  onSelectionChange: _onSelectionChange,
  onSortChange,
  onPageChange: _onPageChange,
  className = '',
  testId,
  ...props }: DataTableProps): React.ReactElement { const { t } = useLocalization();

  // Build CSS classes using design tokens
  const tableClasses = React.useMemo((): string => { const classes = ['datatable'];

    // State classes
    if (loading) { classes.push('datatable--loading'); }

    if (empty || data.length === 0) { classes.push('datatable--empty'); }

    // Feature classes
    if (onRowClick) { classes.push('datatable--clickable-rows'); }

    if (selection?.enabled) { classes.push('datatable--selectable'); }

    if (sorting?.enabled) { classes.push('datatable--sortable'); }

    // Norwegian compliance classes
    if (norwegian?.classification) { classes.push(`datatable--classification-${norwegian.classification}`); }

    if (norwegian?.showClassification) { classes.push('datatable--show-classification'); }

    // Custom classes
    if (className) { classes.push(className); }

    return classes.join(' '); }, [loading, empty, data.length, onRowClick, selection, sorting, norwegian, className]);

  // Show loading state
  if (loading) { return (
      <div className={`${tableClasses} datatable--state-loading`} data-testid={testId}>
        <LoadingState messageKey="table.loading" />
      </div>
    ); }

  // Show empty state
  if (empty || data.length === 0) { return (
      <div className={`${tableClasses} datatable--state-empty`} data-testid={testId}>
        <EmptyState messageKey="table.noData" />
      </div>
    ); }

  return (
    <div className={tableClasses} data-testid={testId} {...props}>
      <table className="datatable__table">
        <TableHeader
          columns={columns}
          sorting={sorting}
          onSortChange={onSortChange}
          norwegian={norwegian}
        />
        <TableBody data={data} columns={columns} onRowClick={onRowClick} norwegian={norwegian} />
      </table>

      {norwegian?.classification && (
        <div className="datatable__classification">
          <ClassificationIndicator level={norwegian.classification} />
        </div>
      )}
    </div>
  ); }

/**
 * Table header component
 */
const TableHeader: React.FC<{ columns: TableColumn[];
  sorting?: DataTableProps['sorting'];
  onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  norwegian?: DataTableProps['norwegian']; }> = ({ columns, sorting, onSortChange, norwegian }): React.ReactElement => { const { t } = useLocalization();

  const handleSort = (column: TableColumn): React.ReactElement => { return (
    <thead className="datatable__header">
      <tr className="datatable__header-row">
        {columns.map(column => (
          <th
            key={column.key}
            className={`datatable__header-cell ${ column.sortable ? 'datatable__header-cell--sortable' : '' } ${ column.norwegian?.classification
                ? `datatable__header-cell--classification-${column.norwegian.classification}`
                : '' }`}
            onClick={() => handleSort(column)}
            role={column.sortable ? 'button' : undefined}
            tabIndex={column.sortable ? 0 : undefined}
            aria-sort={ sorting?.defaultSortBy === column.key
                ? sorting.defaultSortOrder === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none' }
          >
            <span className="datatable__header-text">{t(column.labelKey)}</span>

            {column.sortable && (
              <span className="datatable__sort-indicator" aria-hidden="true">
                {sorting?.defaultSortBy === column.key
                  ? sorting.defaultSortOrder === 'asc'
                    ? '↑'
                    : '↓'
                  : '↕'}
              </span>
            )}

            {column.norwegian?.classification && norwegian?.showClassification && (
              <ClassificationIndicator level={column.norwegian.classification} />
            )}
          </th>
        ))}
      </tr>
    </thead>
  ); };

/**
 * Table body component
 */
const TableBody: React.FC<{ data: TableData[];
  columns: TableColumn[];
  onRowClick?: (row: TableData, index: number) => void;
  norwegian?: DataTableProps['norwegian']; }> = ({ data, columns, onRowClick, norwegian }): React.ReactElement => { const { t } = useLocalization();

  const formatCellValue = (value: unknown, column: TableColumn, row: TableData): React.ReactNode => { if (value === null || value === undefined) { return '-'; }

    // Handle custom render function
    if (column.render) { return column.render(value, row, column); }

    // Handle type-specific formatting
    switch (column.type) { case 'personalNumber':
        return formatPersonalNumber(String(value));
      case 'organizationNumber':
        return formatOrganizationNumber(String(value));
      case 'date':
        return formatDate(value, norwegian?.dateFormat || 'DD.MM.YYYY');
      case 'currency':
        return formatCurrency(Number(value), column.format?.currency || 'NOK');
      case 'number':
        return formatNumber(Number(value), column.format?.numberFormat);
      case 'boolean':
        return formatBoolean(Boolean(value), column.format?.boolean);
      case 'status':
        return String(value);
      default:
        return String(value); } };

  return (
    <tbody className="datatable__body">
      {data.map((row, index) => (
        <tr
          key={row.id}
          className={`datatable__row ${onRowClick ? 'datatable__row--clickable' : ''} ${ row.norwegian?.classification
              ? `datatable__row--classification-${row.norwegian.classification}`
              : '' }`}
          onClick={() => onRowClick?.(row, index)}
          role={onRowClick ? 'button' : undefined}
          tabIndex={onRowClick ? 0 : undefined}
          aria-label={onRowClick ? t('table.clickableRow', { id: String(row.id) }) : undefined}
        >
          {columns.map(column => (
            <td
              key={column.key}
              className={`datatable__cell datatable__cell--type-${column.type || 'text'} ${ column.norwegian?.sensitive ? 'datatable__cell--sensitive' : '' }`}
            >
              <span className="datatable__cell-content">
                {formatCellValue(row[column.key], column, row)}
              </span>

              {column.type === 'status' && <StatusIndicator status={String(row[column.key])} />}

              {column.norwegian?.classification && norwegian?.showClassification && (
                <ClassificationIndicator level={column.norwegian.classification} />
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  ); };

/**
 * Classification indicator component
 */
const ClassificationIndicator: React.FC<{ level: string }> = ({ level }): React.ReactElement => { return (
    <span className="datatable__classification-indicator" aria-hidden="true">
      {getClassificationIcon(level)}
    </span>
  ); };

/**
 * Status indicator component
 */
const getStatusIcon = (status: string): string => { const icons = { active: '✅',
    inactive: '⏸️',
    pending: '⏳',
    error: '❌', };
  return icons[status as keyof typeof icons] || '📊'; };

const StatusIndicator: React.FC<{ status: string }> = ({ status }): React.ReactElement => { return (
    <span className="datatable__status-indicator" aria-hidden="true">
      {getStatusIcon(status)}
    </span>
  ); };

/**
 * Empty state component
 */
const EmptyState: React.FC<{ messageKey?: string }> = ({ messageKey }): React.ReactElement => { return (
    <div className="datatable__empty-state">
      <div className="datatable__empty-icon" aria-hidden="true">
        📊
      </div>
      <span className="datatable__empty-message">{t(messageKey || 'table.noData')}</span>
    </div>
  ); };

/**
 * Loading state component
 */
const LoadingState: React.FC<{ messageKey?: string }> = ({ messageKey }): React.ReactElement => { return (
    <div className="datatable__loading-state">
      <div className="datatable__loading-icon" aria-hidden="true">
        ⏳
      </div>
      <span className="datatable__loading-message">{t(messageKey || 'table.loading')}</span>
    </div>
  ); };

// Utility formatting functions (simplified for enterprise standards)
function formatPersonalNumber(value: string): string { const cleaned = value.replace(/\D/g, '');
  if (cleaned.length === 11) { return `${cleaned.slice(0, 6)} ${cleaned.slice(6)}`; }
  return value; }

function formatOrganizationNumber(value: string): string { const cleaned = value.replace(/\D/g, '');
  if (cleaned.length === 9) { return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`; }
  return value; }

function formatDate(value: unknown, format: string): string { const date = new Date(value);
  if (isNaN(date.getTime())) { return String(value); }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  switch (format) { case 'DD.MM.YYYY':
      return `${day}.${month}.${year}`;
    case 'DD/MM/YYYY':
      return `${day}${month}${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    default:
      return `${day}.${month}.${year}`; } }

function formatCurrency(value: number, currency: string): string { return new Intl.NumberFormat('nb-NO', { style: 'currency',
    currency: currency, }).format(value); }

function formatNumber(value: number, format?: unknown): string { return new Intl.NumberFormat('nb-NO', format).format(value); }

function formatBoolean(value: boolean, format?: { trueKey: string; falseKey: string }): string { if (format) { return value ? format.trueKey : format.falseKey; }
  return value ? 'Ja' : 'Nei'; }

DataTable.displayName = 'DataTable';
