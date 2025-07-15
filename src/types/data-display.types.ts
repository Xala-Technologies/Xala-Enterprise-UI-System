/**
 * Data Display Types
 * Enterprise-grade data display and table type definitions
 */

/* eslint-disable no-unused-vars */

import type React from 'react';

import type { ComponentProps } from '../lib/types/core.types';
import type { NorwegianFeedbackConfig } from './action-feedback.types';

// Base data display component props
export interface DataDisplayComponentProps extends ComponentProps {
  loading?: boolean;
  empty?: boolean;
}

// DataTable component props
export interface DataTableProps extends DataDisplayComponentProps {
  data: TableData[];
  columns: TableColumn[];
  norwegian?: NorwegianFeedbackConfig; // Norwegian compliance configuration
  pagination?: {
    enabled: boolean;
    pageSize: number;
    currentPage: number;
    totalItems: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
  };
  sorting?: {
    enabled: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    defaultSortBy?: string; // Default sort column
    defaultSortOrder?: 'asc' | 'desc'; // Default sort order
  };
  selection?: {
    enabled: boolean;
    multiple?: boolean;
    selectedRows?: string[];
  };
  search?: {
    enabled: boolean;
    placeholder?: string;
    debounceMs?: number;
  };
  export?: {
    enabled: boolean;
    formats?: ('csv' | 'xlsx' | 'pdf')[];
    filename?: string;
  };
   
  onRowClick?: (_row: TableData, _index: number) => void;
  onSelectionChange?: (_selectedRows: string[]) => void;
   
  onSortChange?: (_sortBy: string, _sortOrder: 'asc' | 'desc') => void;
   
  onPageChange?: (_page: number, _pageSize: number) => void;
}

// Table column definition
export interface TableColumn {
  id: string;
  label: string; // Column header text
  labelKey?: string; // Translation key for label
  key: string; // Data key to access from row object
  norwegian?: NorwegianFeedbackConfig; // Norwegian compliance configuration
  format?: string; // Column format string
  type?:
    | 'text'
    | 'number'
    | 'date'
    | 'boolean'
    | 'currency'
    | 'personalNumber'
    | 'organizationNumber'
    | 'status';
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  alignment?: 'left' | 'center' | 'right';
  _format?: {
    currency?: string;
    numberFormat?: Intl.NumberFormatOptions;
    dateFormat?: string;
    boolean?: {
      trueText: string; // Text for true value
      falseText: string; // Text for false value
    };
  };
   
   
  render?: (_value: unknown, _row: Record<string, unknown>, _column: TableColumn) => React.ReactNode;
}

// Table data row definition
export interface TableData {
  id: string;
  [key: string]: unknown;
}

// Key-value list component props
export interface KeyValueListProps extends DataDisplayComponentProps {
  items: KeyValueItem[];
  layout?: 'horizontal' | 'vertical';
  spacing?: 'compact' | 'comfortable' | 'spacious';
  showDividers?: boolean;
  highlightChanges?: boolean;
  norwegian?: NorwegianFeedbackConfig; // Norwegian compliance configuration
}

// Key-value item definition
export interface KeyValueItem {
  key: string;
  label: string; // Label text for the key
  labelKey?: string; // Translation key for label
  value: unknown;
  type?:
    | 'text'
    | 'number'
    | 'date'
    | 'boolean'
    | 'currency'
    | 'personalNumber'
    | 'organizationNumber'
    | 'link'
    | 'status';
  format?: {
    currency?: string;
    dateFormat?: string;
    numberFormat?: Intl.NumberFormatOptions;
    boolean?: {
      trueText: string;
      falseText: string;
    };
  };
  _format?: {
    currency?: string;
    dateFormat?: string;
    numberFormat?: Intl.NumberFormatOptions;
  };
  changed?: boolean; // Highlight if changed
  copyable?: boolean; // Allow copying value
  onClick?: () => void; // Click handler
}

// Tag component props
export interface TagProps extends DataDisplayComponentProps {
  label?: string; // Tag text
  children?: React.ReactNode;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  removable?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
}

// Badge component props
export interface BadgeProps extends DataDisplayComponentProps {
  label?: string; // Badge text
  children?: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'pill';
  count?: number;
  showZero?: boolean;
  max?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'inline'; // Badge position
  pulse?: boolean; // Animated pulse effect
  maxCount?: number; // Maximum count to display
  dot?: boolean; // Show as dot instead of count
  classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG'; // Norwegian classification
  priority?: 'low' | 'medium' | 'high' | 'critical'; // Priority level
  accessible?: boolean; // Enhanced accessibility features
  ariaLabel?: string; // Accessibility label
}

// Tooltip component props
export interface TooltipProps extends DataDisplayComponentProps {
  content?: string; // Tooltip content text
  children: React.ReactNode;
  trigger?: 'hover' | 'click' | 'focus' | 'manual';
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  delay?: number;
  disabled?: boolean;
  arrow?: boolean;
  norwegian?: {
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    helpCategory?: 'general' | 'form' | 'navigation' | 'data' | 'system';
    municipalityBranding?: boolean;
    municipality?: string;
  };
}

// Status indicator component props
export interface StatusIndicatorProps extends DataDisplayComponentProps {
  label?: string; // Status text
  status: 'active' | 'inactive' | 'pending' | 'error' | 'success' | 'warning' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  pulse?: boolean;
}

// Utility functions for data formatting
export const formatters = {
  currency: (value: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(value);
  },
  date: (value: Date | string, _format: string = 'DD.MM.YYYY'): string => {
    const date = typeof value === 'string' ? new Date(value) : value;
    // Implementation depends on date library
    return date.toLocaleDateString();
  },
  number: (value: number, options?: Intl.NumberFormatOptions): string => {
    return new Intl.NumberFormat('en-US', options).format(value);
  },
  boolean: (value: boolean, options?: { trueText: string; falseText: string }): string => {
    return value ? options?.trueText || 'Yes' : options?.falseText || 'No';
  },
  personalNumber: (value: string): string => {
    // Generic formatting - can be customized per locale
    return value.replace(/(\d{6})(\d{5})/, '$1-$2');
  },
  organizationNumber: (value: string): string => {
    // Generic formatting - can be customized per locale
    return value.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
  },
};
