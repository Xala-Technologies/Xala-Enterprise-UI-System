/**
 * @fileoverview Tag Component - Enterprise Standards Compliant
 * @module Tag
 * @description Tag component using design tokens (no inline styles)
 */

import React from 'react';

import { useLocalization } from '../../localization/hooks/useLocalization';
import type { TagProps } from '../../types/data-display.types';


// Helper function
const getClassificationText = (level: string): string => { const texts = { 'ÅPEN': 'Open',
    'BEGRENSET': 'Restricted',
    'KONFIDENSIELT': 'Confidential',
    'HEMMELIG': 'Secret', };
  return texts[level as keyof typeof texts] || level; };

const getClassificationIcon = (level: string): string => { const icons = { 'ÅPEN': '🟢',
    'BEGRENSET': '🟡',
    'KONFIDENSIELT': '🔴',
    'HEMMELIG': '⚫', };
  return icons[level as keyof typeof icons] || '📋'; };
/**
 * Tag component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */

const getCategoryIcon = (category: string): string => { const icons = { system: '⚙️',
    validation: '✅',
    security: '🔒',
    process: '🔄',
    user: '👤', };
  return icons[category as keyof typeof icons] || '📋'; };

export function Tag({ children,
  variant = 'default',
  size = 'md',
  interactive = false,
  removable = false,
  norwegian,
  onClick,
  onRemove,
  className = '',
  testId,
  ...props }: TagProps): React.ReactElement { const { t } = useLocalization();

  // Build CSS classes using design tokens
  const tagClasses = React.useMemo((): React.ReactElement => { return (
    <span
      className={tagClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? t('tag.clickable', { content: String(children) }) : undefined}
      data-testid={testId}
      {...props}
    >
      {/* Classification indicator */}
      {norwegian?.classification && <ClassificationIndicator level={norwegian.classification} />}

      {/* Municipality indicator */}
      {norwegian?.municipality && <MunicipalityIndicator municipality={norwegian.municipality} />}

      {/* Main content */}
      <span className="tag__content">{children}</span>

      {/* Category indicator */}
      {norwegian?.category && (
        <span
          className="tag__category-indicator"
          aria-label={t('tag.category', { category: norwegian.category })}
        >
          {getCategoryIcon(norwegian.category)}
        </span>
      )}

      {/* Remove button */}
      {removable && onRemove && <RemoveButton onRemove={onRemove} size={size} />}
    </span>
  ); }

/**
 * Classification indicator component
 */
const ClassificationIndicator: React.FC<{ level: string }> = ({ level }): React.ReactElement => { return (
    <span
      className="tag__classification-indicator"
      aria-label={t('tag.classification', { level: getClassificationText(level) })}
      title={`${t('tag.classification.label')}: ${getClassificationText(level)}`}
    >
      {getClassificationIcon(level)}
    </span>
  ); };

/**
 * Remove button component
 */
const RemoveButton: React.FC<{ onRemove?: () => void; size: string }> = ({ onRemove, _size }): React.ReactElement => { return (
    <button
      type="button"
      className={buttonClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={t('tag.remove')}
      title={t('tag.remove')}
    >
      <span className="tag__remove-icon" aria-hidden="true">
        ✕
      </span>
    </button>
  ); };

/**
 * Municipality indicator component
 */
const MunicipalityIndicator: React.FC<{ municipality?: string }> = ({ municipality }): React.ReactElement => { return (
    <span
      className="tag__municipality-indicator"
      aria-label={t('tag.municipality', { name: municipality })}
      title={`${t('tag.municipality.label')}: ${municipality}`}
    >
      {getMunicipalityIcon(municipality)}
    </span>
  ); };

/**
 * Get category icon for Norwegian categories
 */
function getCategoryIcon(category: string): string { const icons = { status: '📊',
    category: '🏷️',
    priority: '⭐',
    role: '👤',
    location: '📍', };
  return icons[category as keyof typeof icons] || '🏷️'; }

Tag.displayName = 'Tag';
