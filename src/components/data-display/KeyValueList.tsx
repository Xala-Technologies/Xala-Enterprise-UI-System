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
}: KeyValueListProps): React.ReactElement {
  const { t } = useLocalization();

  // Build CSS classes using design tokens
  const listClasses = React.useMemo((): React.ReactElement => {
  return (
      <div className={`${listClasses} keyvalue-list--empty`} data-testid={testId}>
        <span className="keyvalue-list__empty-message">
          {t(norwegian?.hideEmptyValues ? 'keyvalue.noVisibleItems' : 'keyvalue.noItems')}
        </span>
      </div>
    );
  }

  // Filter out empty values if requested
  const displayItems = React.useMemo((): React.ReactElement => {
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
const ClassificationIcon: React.FC<{ classification: string }> = ({ classification }): React.ReactElement => {
  return (
    <span className="keyvalue-item__classification-icon" aria-hidden="true">
      {getClassificationIcon(classification)}
    </span>
  );
};

/**
 * Status indicator component
 */
const StatusIndicator: React.FC<{ status: string }> = ({ status }): React.ReactElement => {
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
  value: unknown,
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

function formatDate(value: unknown, format: string): string {
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

function formatNumber(value: number, format?: unknown): string {
  return new Intl.NumberFormat('nb-NO', format).format(value);
}

function formatBoolean(value: boolean, format?: { trueKey: string; falseKey: string }): string {
  if (format) {
    return value ? format.trueKey : format.falseKey;
  }
  return value ? 'Ja' : 'Nei';
}

KeyValueList.displayName = 'KeyValueList';
