/**
 * @fileoverview KeyValue List Component - Enterprise Standards Compliant
 * @module KeyValueList
 * @description Key-value display component using design tokens (no inline styles)
 */

import { Logger } from '@xala-technologies/enterprise-standards';
import React from 'react';
// import { useLocalization } from '../../localization/hooks/useLocalization';
import type { KeyValueItem, KeyValueListProps } from '../../types/data-display.types';

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

const logger = Logger.create({
  serviceName: 'ui-system-keyvalslist',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

/**
 * KeyValue List component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export function KeyValueList({
  items,
  layout = 'vertical',
  spacing = 'comfortable',
  showDividers = false,
  highlightChanges = false,
  norwegian,
  className = '',
  testId,
  ...props
}: KeyValueListProps): React.ReactElement {
  // const { t } = useLocalization();
  const t = (key: string): string => key; // Placeholder for localization

  // Build CSS classes using design tokens
  const listClasses = React.useMemo(() => {
    const classes = ['keyvalue-list'];

    // Layout variant
    classes.push(`keyvalue-list--${layout}`);

    // Spacing variant
    classes.push(`keyvalue-list--${spacing}`);

    // Optional features
    if (showDividers) {
      classes.push('keyvalue-list--with-dividers');
    }

    if (highlightChanges) {
      classes.push('keyvalue-list--highlight-changes');
    }

    // Custom classes
    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [layout, spacing, showDividers, highlightChanges, className]);

  // Filter out empty values if requested
  const displayItems = React.useMemo(() => {
    return items.filter(item => {
      return item.value !== null && item.value !== undefined && item.value !== '';
    });
  }, [items]);

  // Handle empty state
  if (displayItems.length === 0) {
    return (
      <div className={`${listClasses} keyvalue-list--empty`} data-testid={testId}>
        <span className="keyvalue-list__empty-message">{t('keyvalue.noItems')}</span>
      </div>
    );
  }

  return (
    <div className={listClasses} data-testid={testId} {...props}>
      {displayItems.map((item, index) => (
        <KeyValueItemComponent
          key={item.key || index}
          item={item}
          showDividers={showDividers && index < displayItems.length - 1}
          norwegian={norwegian}
        />
      ))}
    </div>
  );
}

/**
 * Individual KeyValue Item component
 */
const KeyValueItemComponent: React.FC<{
  item: KeyValueItem;
  showDividers?: boolean;
  norwegian?: KeyValueListProps['norwegian'];
}> = ({ item, showDividers, norwegian }): React.ReactElement => {
  // const { t } = useLocalization();
  const t = (key: string): string => key; // Placeholder for localization

  const itemClasses = React.useMemo(() => {
    const classes = ['keyvalue-item'];

    if (item.changed) {
      classes.push('keyvalue-item--changed');
    }

    if (item.onClick) {
      classes.push('keyvalue-item--clickable');
    }

    if (showDividers) {
      classes.push('keyvalue-item--with-divider');
    }

    return classes.join(' ');
  }, [item.changed, item.onClick, showDividers]);

  const handleClick = (): void => {
    if (item.onClick) {
      item.onClick();
    }
  };

  const handleCopy = async (): Promise<void> => {
    try {
      const valueText = formatValue(item.value, item, norwegian);
      await navigator.clipboard.writeText(valueText);
    } catch (error) {
      logger.error('Failed to copy value to clipboard', { error });
    }
  };

  return (
    <div
      className={itemClasses}
      onClick={handleClick}
      role={item.onClick ? 'button' : undefined}
      tabIndex={item.onClick ? 0 : undefined}
      aria-label={item.onClick ? 'Clickable item' : undefined}
    >
      <div className="keyvalue-item__label">
        {/* Classification icons temporarily disabled */}
        <span className="keyvalue-item__label-text">
          {item.labelKey ? t(item.labelKey) : item.label}
        </span>
      </div>

      <div className="keyvalue-item__value">
        <span className="keyvalue-item__value-text">
          {formatValue(item.value, item, norwegian)}
        </span>

        {item.copyable && (
          <button
            className="keyvalue-item__copy-button"
            onClick={handleCopy}
            aria-label={'Copy value'}
            type="button"
          >
            📋
          </button>
        )}

        {item.type === 'status' && <StatusIndicator status={String(item.value)} />}
      </div>
    </div>
  );
};

/**
 * Classification icon component
 */
const _ClassificationIcon: React.FC<{ classification: string }> = ({
  classification,
}): React.ReactElement => {
  return (
    <span className="keyvalue-item__classification-icon" aria-hidden="true">
      {getClassificationIcon(classification)}
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
    <span className="keyvalue-item__status-indicator" aria-hidden="true">
      {getStatusIcon(status)}
    </span>
  );
};

// Helper function
/**
 * Value formatting function
 */
function formatValue(value: unknown, item: KeyValueItem, norwegian?: any): string {
  if (value === null || value === undefined) {
    return '';
  }

  switch (item.type) {
    case 'personalNumber':
      return formatPersonalNumber(String(value));
    case 'organizationNumber':
      return formatOrganizationNumber(String(value));
    case 'date':
      return formatDate(value, norwegian?.dateFormat || 'DD.MM.YYYY');
    case 'currency':
      return formatCurrency(Number(value), item.format?.currency || 'NOK');
    case 'number':
      return formatNumber(Number(value), item.format?.numberFormat);
    case 'boolean':
      return formatBoolean(Boolean(value), item.format?.boolean);
    case 'link':
      return String(value);
    case 'status':
      return String(value);
    default:
      return String(value);
  }
}

// Utility formatting functions (simplified for enterprise standards)
function formatPersonalNumber(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 6)} ${cleaned.slice(6)}`;
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
  // Type guard for valid date inputs
  if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      // Simple Norwegian date formatting
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
  }
  return String(value);
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

function formatBoolean(value: boolean, format?: { trueText: string; falseText: string }): string {
  if (format) {
    return value ? format.trueText : format.falseText;
  }
  return value ? 'Ja' : 'Nei';
}

KeyValueList.displayName = 'KeyValueList';
