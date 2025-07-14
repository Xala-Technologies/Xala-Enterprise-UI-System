// KeyValueList component for @xala-mock/ui-system
// Norwegian-compliant key-value list with classification and formatting

import React from 'react';

import { KeyValueListProps, KeyValueItem } from '../../types/data-display.types';

// Helper function to generate CSS using design tokens
const getKeyValueListStyles = (props: KeyValueListProps): React.CSSProperties => {
  const { layout = 'vertical', spacing = 'comfortable', loading = false, norwegian } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    width: '100%',
    fontFamily: 'var(--font-family-sans)',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-normal)',
    backgroundColor: 'var(--background-primary)',
  };

  // Layout-specific styles
  const layoutStyles = getLayoutStyles(layout);

  // Spacing styles
  const spacingStyles = getSpacingStyles(spacing);

  // Norwegian classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);

  return { ...baseStyles, ...layoutStyles, ...spacingStyles, ...classificationStyles };
};

// Get layout-specific styles
const getLayoutStyles = (layout: string): React.CSSProperties => {
  const layouts = {
    vertical: {
      display: 'flex',
      flexDirection: 'column',
    },
    horizontal: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(var(--keyvalue-min-width), 1fr))',
      gap: 'var(--spacing-4)',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(var(--keyvalue-grid-width), 1fr))',
      gap: 'var(--spacing-6)',
    },
  };
  return layouts[layout as keyof typeof layouts] || layouts.vertical;
};

// Get spacing styles
const getSpacingStyles = (spacing: string): React.CSSProperties => {
  const spacings = {
    compact: {
      gap: 'var(--spacing-2)',
    },
    comfortable: {
      gap: 'var(--spacing-4)',
    },
    spacious: {
      gap: 'var(--spacing-6)',
    },
  };
  return spacings[spacing as keyof typeof spacings] || spacings.comfortable;
};

// Get Norwegian classification styles
const getClassificationStyles = (classification?: string): React.CSSProperties => {
  if (!classification) { return {}; }

  const classificationStyles: Record<string, React.CSSProperties> = {
    ÅPEN: {
      borderLeft: 'var(--border-accent-width) solid var(--color-green-500)',
      paddingLeft: 'var(--spacing-3)',
    },
    BEGRENSET: {
      borderLeft: 'var(--border-accent-width) solid var(--color-orange-500)',
      paddingLeft: 'var(--spacing-3)',
    },
    KONFIDENSIELT: {
      borderLeft: 'var(--border-accent-width) solid var(--color-red-500)',
      paddingLeft: 'var(--spacing-3)',
      backgroundColor: 'var(--color-red-25)',
    },
    HEMMELIG: {
      borderLeft: 'var(--border-accent-width) solid var(--color-red-800)',
      paddingLeft: 'var(--spacing-3)',
      backgroundColor: 'var(--color-red-50)',
      border: 'var(--border-width) solid var(--color-red-200)',
    },
  };

  return classificationStyles[classification] || {};
};

// Key-value item component
const KeyValueItem = ({
  item,
  showDividers,
  norwegian,
}: {
  item: KeyValueItem;
  showDividers?: boolean;
  norwegian?: KeyValueListProps['norwegian'];
}) => {
  const formatValue = (value: any, item: KeyValueItem): string => {
    if (value === null || value === undefined) { return ''; }
    if (norwegian?.hideEmptyValues && !value) { return ''; }

    // Norwegian-specific formatting
    switch (item.type) {
      case 'personalNumber':
        return formatPersonalNumber(value);
      case 'organizationNumber':
        return formatOrganizationNumber(value);
      case 'date':
        return formatDate(value, norwegian?.dateFormat || 'DD.MM.YYYY');
      case 'currency':
        return formatCurrency(value, item.format?.currency || 'NOK');
      case 'number':
        return formatNumber(value);
      case 'boolean':
        return formatBoolean(value, item.format?.boolean);
      case 'link':
        return String(value); // Links handled separately
      case 'status':
        return String(value); // Status handled separately
      default:
        return String(value);
    }
  };

  const getClassificationIcon = (classification?: string): string => {
    if (!classification) { return ''; }
    const icons = {
      ÅPEN: '🟢',
      BEGRENSET: '🟡',
      KONFIDENSIELT: '🔴',
      HEMMELIG: '⚫',
    };
    return icons[classification as keyof typeof icons] || '';
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-1)',
    padding: 'var(--spacing-3)',
    borderRadius: 'var(--border-radius-sm)',
    backgroundColor: item.sensitive ? 'var(--color-orange-25)' : 'transparent',
    border: item.sensitive ? 'var(--border-width) solid var(--color-orange-200)' : 'none',
    borderBottom: showDividers ? 'var(--border-width) solid var(--border-secondary)' : 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: 'var(--letter-spacing-wide)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-1)',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-normal)',
    color: 'var(--text-primary)',
    cursor: item.onClick ? 'pointer' : 'default',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-2)',
  };

  const formattedValue = formatValue(item.value, item);

  // Don't render if value is empty and hideEmptyValues is true
  if (norwegian?.hideEmptyValues && !formattedValue) {
    return null;
  }

  return (
    <div style={itemStyle}>
      {/* Label */}
      <div style={labelStyle}>
        {/* TODO: Replace with actual localization */}
        <span>{item.labelKey}</span>

        {/* Classification indicator */}
        {item.norwegian?.classification && norwegian?.showClassificationIcons && (
          <span
            title={`Klassifisering: ${item.norwegian.classification}`}
            aria-label={`Classification: ${item.norwegian.classification}`}
          >
            {getClassificationIcon(item.norwegian.classification)}
          </span>
        )}

        {/* Sensitive data indicator */}
        {item.sensitive && (
          <span
            title='Sensitiv informasjon'
            aria-label='Sensitive information'
            style={{ fontSize: 'var(--font-size-xs)' }}
          >
            🔒
          </span>
        )}
      </div>

      {/* Value */}
      <div
        style={valueStyle}
        onClick={item.onClick}
        role={item.onClick ? 'button' : undefined}
        tabIndex={item.onClick ? 0 : undefined}
        aria-label={item.onClick ? `Click to interact with ${item.labelKey}` : undefined}
      >
        {/* Render value based on type */}
        {item.type === 'link' ? (
          <a
            href={String(item.value)}
            target={item.format?.link?.openInNewTab ? '_blank' : undefined}
            rel={item.format?.link?.external ? 'noopener noreferrer' : undefined}
            style={{
              color: 'var(--color-primary-600)',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            {formattedValue}
          </a>
        ) : item.type === 'status' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)' }}>
            <StatusIndicator status={String(item.value)} />
            <span>{formattedValue}</span>
          </div>
        ) : (
          <span>{formattedValue}</span>
        )}

        {/* Copy button for copyable items */}
        {item.copyable && (
          <button
            style={{
              padding: 'var(--spacing-1)',
              border: 'none',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              borderRadius: 'var(--border-radius-sm)',
              fontSize: 'var(--font-size-xs)',
            }}
            onClick={e => {
              e.stopPropagation();
              navigator.clipboard.writeText(String(item.value));
            }}
            aria-label={`Copy ${item.labelKey}`}
            title='Kopier verdi'
          >
            📋
          </button>
        )}
      </div>
    </div>
  );
};

// Status indicator component
const StatusIndicator = ({ status }: { status: string }) => {
  const getStatusIcon = (status: string): string => {
    const icons = {
      active: '🟢',
      inactive: '🔴',
      pending: '🟡',
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
    };
    return icons[status as keyof typeof icons] || '❓';
  };

  return (
    <span style={{ fontSize: 'var(--font-size-sm)' }} aria-label={`Status: ${status}`}>
      {getStatusIcon(status)}
    </span>
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

    if (format === 'relative') {
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) { return 'I dag'; }
      if (diffDays === 1) { return 'I går'; }
      if (diffDays < 7) { return `${diffDays} dager siden`; }
      if (diffDays < 30) { return `${Math.floor(diffDays / 7)} uker siden`; }
      if (diffDays < 365) { return `${Math.floor(diffDays / 30)} måneder siden`; }
      return `${Math.floor(diffDays / 365)} år siden`;
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

const formatNumber = (value: number): string => {
  try {
    return new Intl.NumberFormat('nb-NO').format(value);
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

// KeyValueList component with forwardRef
export const KeyValueList = React.forwardRef<HTMLDivElement, KeyValueListProps>((props, ref) => {
  const {
    items,
    layout = 'vertical',
    spacing = 'comfortable',
    showDividers = false,
    highlightChanges = false,
    loading = false,
    empty = false,
    emptyMessageKey,
    loadingMessageKey,
    norwegian,
    className,
    style,
    testId,
    'aria-label': ariaLabel,
    ...divProps
  } = props;

  const listStyles = getKeyValueListStyles(props);
  const combinedStyles = { ...listStyles, ...style };

  // Filter out empty items if hideEmptyValues is enabled
  const displayedItems = norwegian?.hideEmptyValues
    ? items.filter(item => item.value !== null && item.value !== undefined && item.value !== '')
    : items;

  // Handle empty state
  if (!loading && (displayedItems.length === 0 || empty)) {
    return (
      <div
        style={{
          ...combinedStyles,
          padding: 'var(--spacing-8)',
          textAlign: 'center',
          color: 'var(--text-secondary)',
        }}
        data-testid={testId}
        className={className}
      >
        <div style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-2)' }}>📄</div>
        <div>
          {/* TODO: Replace with actual localization */}
          {emptyMessageKey || 'Ingen data å vise'}
        </div>
      </div>
    );
  }

  // Handle loading state
  if (loading) {
    return (
      <div
        style={{
          ...combinedStyles,
          padding: 'var(--spacing-8)',
          textAlign: 'center',
          color: 'var(--text-secondary)',
        }}
        data-testid={testId}
        className={className}
      >
        <div style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-2)' }}>⏳</div>
        <div>
          {/* TODO: Replace with actual localization */}
          {loadingMessageKey || 'Laster data...'}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={combinedStyles}
      className={className}
      data-testid={testId}
      data-classification={norwegian?.classification}
      aria-label={ariaLabel || 'Key-value list'}
      role='list'
      {...divProps}
    >
      {displayedItems.map(item => (
        <KeyValueItem
          key={item.key}
          item={item}
          showDividers={showDividers}
          norwegian={norwegian}
        />
      ))}
    </div>
  );
});

KeyValueList.displayName = 'KeyValueList';
