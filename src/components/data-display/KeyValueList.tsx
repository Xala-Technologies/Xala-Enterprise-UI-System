/**
 * @fileoverview KeyValue List Component - Enterprise Standards Compliant
 * @module KeyValueList
 * @description Key-value display component using design tokens (no inline styles)
 */

import { Logger } from '@xala-technologies/enterprise-standards';
import React from 'react';
import { useLocalization } from '../../localization/hooks/useLocalization';
import type { KeyValueItem, KeyValueListProps } from '../../types/data-display.types';

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
}: KeyValueListProps): JSX.Element {
  const { t } = useLocalization();

  // Build CSS classes using design tokens
  const listClasses = React.useMemo((): void => {
    const classes = ['keyvalue-list'];

    // Layout classes
    classes.push(`keyvalue-list--${layout}`);

    // Spacing classes
    classes.push(`keyvalue-list--spacing-${spacing}`);

    // Feature classes
    if (showDividers) {
      classes.push('keyvalue-list--dividers');
    }

    if (highlightChanges) {
      classes.push('keyvalue-list--highlight-changes');
    }

    // Norwegian compliance classes
    if (norwegian?.classification) {
      classes.push(`keyvalue-list--classification-${norwegian.classification}`);
    }

    if (norwegian?.showClassificationIcons) {
      classes.push('keyvalue-list--show-icons');
    }

    // Custom classes
    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [layout, spacing, showDividers, highlightChanges, norwegian, className]);

  if (!items || items.length === 0) {
    return (
      <div className={`${listClasses} keyvalue-list--empty`} data-testid={testId}>
        <span className="keyvalue-list__empty-message">
          {t(norwegian?.hideEmptyValues ? 'keyvalue.noVisibleItems' : 'keyvalue.noItems')}
        </span>
      </div>
    );
  }

  // Filter out empty values if requested
  const displayItems = React.useMemo((): void => {
    if (!norwegian?.hideEmptyValues) {
      return items;
    }
    return items.filter(item => {
      const { value } = item;
      return value !== null && value !== undefined && value !== '';
    });
  }, [items, norwegian?.hideEmptyValues]);

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
}> = ({ item, showDividers, norwegian }): void => {
  const { t } = useLocalization();

  // Build item CSS classes
  const itemClasses = React.useMemo((): void => {
    const classes = ['keyvalue-item'];

    // Type classes
    if (item.type) {
      classes.push(`keyvalue-item--type-${item.type}`);
    }

    // State classes
    if (item.sensitive) {
      classes.push('keyvalue-item--sensitive');
    }

    if (item.copyable) {
      classes.push('keyvalue-item--copyable');
    }

    if (item.onClick) {
      classes.push('keyvalue-item--clickable');
    }

    // Classification classes
    if (item.norwegian?.classification) {
      classes.push(`keyvalue-item--classification-${item.norwegian.classification}`);
    }

    // Divider classes
    if (showDividers) {
      classes.push('keyvalue-item--with-divider');
    }

    return classes.join(' ');
  }, [item, showDividers]);

  // Format the value based on type
  const formattedValue = React.useMemo((): void => {
    return formatValue(item.value, item, norwegian);
  }, [item, norwegian]);

  // Handle click
  const handleClick = React.useCallback((): void => {
    if (item.onClick) {
      item.onClick();
    }
  }, [item]);

  // Handle copy
  const handleCopy = React.useCallback(async (): void => {
    if (item.copyable && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(String(item.value));
        // You could add a toast notification here
      } catch (error) {
        logger.error('Failed to copy to clipboard:', error);
      }
    }
  }, [item]);

  return (
    <div
      className={itemClasses}
      onClick={handleClick}
      role={item.onClick ? 'button' : undefined}
      tabIndex={item.onClick ? 0 : undefined}
      aria-label={item.onClick ? t('keyvalue.clickable', { label: t(item.labelKey) }) : undefined}
    >
      <div className="keyvalue-item__label">
        {norwegian?.showClassificationIcons && item.norwegian?.classification && (
          <ClassificationIcon classification={item.norwegian.classification} />
        )}
        <span className="keyvalue-item__label-text">{t(item.labelKey)}</span>
      </div>

      <div className="keyvalue-item__value">
        <span className="keyvalue-item__value-text">{formattedValue}</span>

        {item.copyable && (
          <button
            className="keyvalue-item__copy-button"
            onClick={handleCopy}
            aria-label={t('keyvalue.copy', { value: formattedValue })}
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
const ClassificationIcon: React.FC<{ classification: string }> = ({ classification }): void => {
  const getClassificationIcon = (level: string): string => {
    const icons = {
      ÅPEN: '🔓',
      BEGRENSET: '🔒',
      KONFIDENSIELT: '🔐',
      HEMMELIG: '🔴',
    };
    return icons[level as keyof typeof icons] || '🔓';
  };

  return (
    <span className="keyvalue-item__classification-icon" aria-hidden="true">
      {getClassificationIcon(classification)}
    </span>
  );
};

/**
 * Status indicator component
 */
const StatusIndicator: React.FC<{ status: string }> = ({ status }): void => {
  const getStatusIcon = (status: string): string => {
    const icons = {
      active: '🟢',
      inactive: '⚪',
      pending: '🟡',
      error: '🔴',
      success: '✅',
      warning: '⚠️',
      info: 'ℹ️',
    };
    return icons[status as keyof typeof icons] || '❓';
  };

  return (
    <span className="keyvalue-item__status-indicator" aria-hidden="true">
      {getStatusIcon(status)}
    </span>
  );
};

/**
 * Value formatting function
 */
function formatValue(
  value: any,
  item: KeyValueItem,
  norwegian?: KeyValueListProps['norwegian']
): string {
  if (value === null || value === undefined) {
    return '-';
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

function formatDate(value: any, format: string): string {
  const date = new Date(value);
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

function formatNumber(value: number, format?: any): string {
  return new Intl.NumberFormat('nb-NO', format).format(value);
}

function formatBoolean(value: boolean, format?: { trueKey: string; falseKey: string }): string {
  if (format) {
    return value ? format.trueKey : format.falseKey;
  }
  return value ? 'Ja' : 'Nei';
}

KeyValueList.displayName = 'KeyValueList';
