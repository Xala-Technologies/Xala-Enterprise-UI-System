/**
 * @fileoverview Data display component type definitions
 * @module DataDisplayTypes
 */

import type React from 'react';

import type { ComponentProps } from '../lib/types/core.types';


// Base data display component props
export interface DataDisplayComponentProps extends ComponentProps { loading?: boolean;
  empty?: boolean; }

// DataTable component props
export interface DataTableProps extends DataDisplayComponentProps { data: TableData[];
  columns: TableColumn[];
  pagination?: { enabled: boolean;
    pageSize: number;
    currentPage: number;
    totalItems: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean; };
  sorting?: { enabled: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc'; };
  selection?: { enabled: boolean;
    multiple?: boolean;
    selectedRows?: string[]; };
  search?: { enabled: boolean;
    placeholder?: string;
    debounceMs?: number; };
  export?: { enabled: boolean;
    formats?: ('csv' | 'xlsx' | 'pdf')[];
    filename?: string; };
  onRowClick?: (_row: TableData, index: number) => void;
  onSelectionChange?: (_selectedRows: string[]) => void;
  onSortChange?: (_sortBy: string, _sortOrder: 'asc' | 'desc') => void;
  onPageChange?: (_page: number, _pageSize: number) => void; }

// Table column definition
export interface TableColumn { id: string;
  label: string; // Column header text
  key: string; // Data key to access from row object
  type?: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'personalNumber' | 'organizationNumber' | 'status';
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  alignment?: 'left' | 'center' | 'right';
  _format?: { currency?: string;
    numberFormat?: Intl.NumberFormatOptions;
    dateFormat?: string;
    boolean?: { trueText: string; // Text for true value
      falseText: string; // Text for false value }; };
  render?: (_value: unknown, _row: Record<string, unknown>, _column: TableColumn) => React.ReactNode; }

// Table data row definition
export interface TableData { id: string;
  [key: string]: unknown; }

// Key-value list component props
export interface KeyValueListProps extends DataDisplayComponentProps { items: KeyValueItem[];
  layout?: 'horizontal' | 'vertical';
  spacing?: 'compact' | 'comfortable' | 'spacious';
  showDividers?: boolean;
  highlightChanges?: boolean; }

// Key-value item definition
export interface KeyValueItem { key: string;
  label: string; // Label text for the key
  value: unknown;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'personalNumber' | 'organizationNumber';
  _format?: { currency?: string;
    dateFormat?: string;
    numberFormat?: Intl.NumberFormatOptions; };
  changed?: boolean; // Highlight if changed }

// Tag component props
export interface TagProps extends DataDisplayComponentProps { label?: string; // Tag text
  children?: React.ReactNode;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  removable?: boolean;
  onClick?: () => void;
  onRemove?: () => void; }

// Badge component props
export interface BadgeProps extends DataDisplayComponentProps { label?: string; // Badge text
  children?: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'pill';
  count?: number;
  showZero?: boolean;
  max?: number; }

// Tooltip component props
export interface TooltipProps extends DataDisplayComponentProps { content?: string; // Tooltip content text
  children: React.ReactNode;
  trigger?: 'hover' | 'click' | 'focus' | 'manual';
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  delay?: number;
  disabled?: boolean;
  arrow?: boolean; }

// Status indicator component props
export interface StatusIndicatorProps extends DataDisplayComponentProps { label?: string; // Status text
  status: 'active' | 'inactive' | 'pending' | 'error' | 'success' | 'warning' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  pulse?: boolean; }

// Utility functions for data formatting
export const formatters = { currency: (_value: number, currency: string = 'USD'): string => { return new Intl.NumberFormat('en-US', { style: 'currency',
      currency: currency, }).format(_value); },
  date: (_value: Date | string, format: string = 'DD.MM.YYYY'): string => { const date = typeof _value === 'string' ? new Date(_value) : value;
    // Implementation depends on date library
    return date.toLocaleDateString(); },
  number: (_value: number, options?: Intl.NumberFormatOptions): string => { return new Intl.NumberFormat('en-US', options).format(_value); },
  boolean: (_value: boolean, options?: { trueText: string; falseText: string }): string => { return _value ? (options?.trueText || 'Yes') : (options?.falseText || 'No'); },
  personalNumber: (_value: string): string => { // Generic formatting - can be customized per locale
    return value.replace(/(\d{6})(\d{5})/, '$1-$2'); },
  organizationNumber: (_value: string): string => { // Generic formatting - can be customized per locale
    return value.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3'); }, };
