/**
 * @fileoverview Data display component type definitions
 * @module DataDisplayTypes
 */

import type { ComponentProps } from '../lib/types/core.types';

// Base data display component props
export interface DataDisplayComponentProps extends ComponentProps {
  loading?: boolean;
  empty?: boolean;
  emptyMessageKey?: string;
  loadingMessageKey?: string;
  norwegian?: {
    accessibility?: 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
    format?: 'government' | 'municipal' | 'modern';
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  };
}

// DataTable component props with Norwegian features
export interface DataTableProps extends DataDisplayComponentProps {
  data: TableData[];
  columns: TableColumn[];
  pagination?: PaginationConfig;
  sorting?: SortingConfig;
  selection?: SelectionConfig;
  search?: SearchConfig;
  export?: ExportConfig;
  norwegian?: DataDisplayComponentProps['norwegian'] & {
    dateFormat?: 'DD.MM.YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
    numberFormat?: 'norwegian' | 'international';
    municipality?: string;
    showClassification?: boolean;
  };
  onRowClick?: (row: TableData, index: number) => void;
  onSelectionChange?: (selectedRows: TableData[]) => void;
  onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  onPageChange?: (page: number, pageSize: number) => void;
}

// Table column definition
export interface TableColumn {
  key: string;
  labelKey: string; // Localization key for column header
  width?: string | number;
  sortable?: boolean;
  filterable?: boolean;
  type?:
    | 'text'
    | 'number'
    | 'date'
    | 'boolean'
    | 'personalNumber'
    | 'organizationNumber'
    | 'currency'
    | 'status';
  format?: TableColumnFormat;
  align?: 'left' | 'center' | 'right';
  norwegian?: {
    sensitive?: boolean; // Mark as sensitive data
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    municipalitySpecific?: boolean;
  };
  render?: (value: any, row: TableData, column: TableColumn) => any;
}

// Table column formatting options
export interface TableColumnFormat {
  currency?: 'NOK' | 'EUR' | 'USD';
  dateFormat?: 'DD.MM.YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  numberFormat?: {
    decimals?: number;
    thousandsSeparator?: '.' | ' ' | ',';
    decimalSeparator?: ',' | '.';
  };
  boolean?: {
    trueKey: string; // Localization key for true value
    falseKey: string; // Localization key for false value
  };
}

// Table data row type
export interface TableData {
  id: string | number;
  [key: string]: any;
  norwegian?: {
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    sensitive?: boolean;
    municipality?: string;
    lastModified?: Date;
  };
}

// Pagination configuration
export interface PaginationConfig {
  enabled?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showTotal?: boolean;
  showFirstLast?: boolean;
  position?: 'top' | 'bottom' | 'both';
  norwegian?: {
    showInNorwegian?: boolean;
    compactMode?: boolean;
  };
}

// Sorting configuration
export interface SortingConfig {
  enabled?: boolean;
  defaultSortBy?: string;
  defaultSortOrder?: 'asc' | 'desc';
  multiSort?: boolean;
  norwegian?: {
    collation?: 'norwegian' | 'standard'; // Norwegian alphabetical order
    personalNumberSort?: boolean; // Special sorting for personal numbers
  };
}

// Selection configuration
export interface SelectionConfig {
  enabled?: boolean;
  multiple?: boolean;
  showSelectAll?: boolean;
  preserveSelection?: boolean;
  norwegian?: {
    confirmationRequired?: boolean; // Require confirmation for sensitive data
    auditLog?: boolean; // Log selections for compliance
  };
}

// Search configuration
export interface SearchConfig {
  enabled?: boolean;
  placeholder?: string;
  debounceMs?: number;
  searchableColumns?: string[];
  norwegian?: {
    searchInNorwegian?: boolean; // Enable Norwegian character search
    highlightMatches?: boolean;
  };
}

// Export configuration
export interface ExportConfig {
  enabled?: boolean;
  formats?: ('csv' | 'excel' | 'pdf')[];
  includeHeaders?: boolean;
  includeSelection?: boolean;
  norwegian?: {
    filename?: string;
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    watermark?: boolean;
  };
}

// KeyValueList component props
export interface KeyValueListProps extends DataDisplayComponentProps {
  items: KeyValueItem[];
  layout?: 'horizontal' | 'vertical' | 'grid';
  spacing?: 'compact' | 'comfortable' | 'spacious';
  showDividers?: boolean;
  highlightChanges?: boolean;
  norwegian?: DataDisplayComponentProps['norwegian'] & {
    hideEmptyValues?: boolean;
    showClassificationIcons?: boolean;
    dateFormat?: 'DD.MM.YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  };
}

// Key-value item definition
export interface KeyValueItem {
  key: string;
  labelKey: string; // Localization key for the label
  value: any;
  type?:
    | 'text'
    | 'number'
    | 'date'
    | 'boolean'
    | 'personalNumber'
    | 'organizationNumber'
    | 'link'
    | 'status'
    | 'currency';
  format?: KeyValueFormat;
  copyable?: boolean;
  sensitive?: boolean;
  norwegian?: {
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    municipalityData?: boolean;
    auditRequired?: boolean;
  };
  onClick?: () => void;
}

// Key-value formatting options
export interface KeyValueFormat {
  currency?: 'NOK' | 'EUR' | 'USD';
  dateFormat?: 'DD.MM.YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'relative';
  numberFormat?: {
    decimals?: number;
    thousandsSeparator?: '.' | ' ' | ',';
    decimalSeparator?: ',' | '.';
  };
  boolean?: {
    trueKey: string;
    falseKey: string;
  };
  link?: {
    external?: boolean;
    openInNewTab?: boolean;
  };
}

// Tag component props
export interface TagProps extends ComponentProps {
  labelKey?: string; // Localization key for tag text
  children?: any;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  removable?: boolean;
  icon?: any;
  norwegian?: {
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    municipality?: string;
    category?: 'status' | 'category' | 'priority' | 'role' | 'location';
  };
  onClick?: () => void;
  onRemove?: () => void;
}

// Badge component props
export interface BadgeProps extends ComponentProps {
  labelKey?: string; // Localization key for badge text
  children?: any;
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'count';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'pill' | 'square';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline';
  count?: number;
  maxCount?: number;
  showZero?: boolean;
  pulse?: boolean;
  dot?: boolean;
  classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  accessible?: boolean;
  norwegian?: {
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    priority?: 'low' | 'medium' | 'high' | 'critical';
    category?: 'notification' | 'status' | 'count' | 'achievement';
  };
}

// Tooltip component props
export interface TooltipProps extends ComponentProps {
  contentKey?: string; // Localization key for tooltip content
  content?: any;
  children: any;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  trigger?: 'hover' | 'click' | 'focus' | 'manual';
  delay?: number;
  maxWidth?: string | number;
  interactive?: boolean;
  arrow?: boolean;
  norwegian?: {
    accessibility?: 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    highContrast?: boolean;
    municipality?: string;
    helpCategory?: 'field' | 'action' | 'status' | 'navigation';
  };
  onOpen?: () => void;
  onClose?: () => void;
}

// Status indicator props for Norwegian compliance
export interface StatusIndicatorProps extends ComponentProps {
  status: 'active' | 'inactive' | 'pending' | 'error' | 'success' | 'warning' | 'info';
  labelKey?: string; // Localization key for status text
  showLabel?: boolean;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  norwegian?: {
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    category?: 'system' | 'user' | 'process' | 'security' | 'compliance';
    priority?: 'low' | 'medium' | 'high' | 'critical';
    municipality?: string;
  };
}

// Table state management
export interface TableState {
  currentPage: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  selectedRows: string[] | number[];
  searchQuery?: string;
  filters?: Record<string, any>;
  loading: boolean;
  error?: string;
}

// Norwegian data formatting utilities
export interface NorwegianDataFormatters {
  formatPersonalNumber: (value: string) => string;
  formatOrganizationNumber: (value: string) => string;
  formatCurrency: (value: number, currency?: string) => string;
  formatDate: (value: Date | string, format?: string) => string;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatBoolean: (value: boolean, trueKey: string, falseKey: string) => string;
}

// Data classification helpers
export interface DataClassificationConfig {
  level: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  displayIcon: boolean;
  restrictExport: boolean;
  requireAudit: boolean;
  maskValue: boolean;
  watermark: boolean;
}

// Export type for all data display types
export type DataDisplayTypes =
  | DataTableProps
  | KeyValueListProps
  | TagProps
  | BadgeProps
  | TooltipProps
  | StatusIndicatorProps;
