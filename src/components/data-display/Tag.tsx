/**
 * @fileoverview Tag Component - Enterprise Standards Compliant
 * @module Tag
 * @description Tag component using design tokens (no inline styles)
 */

import React from 'react';

import { useLocalization } from '../../localization/hooks/useLocalization';
import type { TagProps } from '../../types/data-display.types';

/**
 * Tag component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export function Tag({
  children,
  variant = 'default',
  size = 'md',
  interactive = false,
  removable = false,
  norwegian,
  onClick,
  onRemove,
  className = '',
  testId,
  ...props
}: TagProps): JSX.Element {
  const { t } = useLocalization();

  // Build CSS classes using design tokens
  const tagClasses = React.useMemo(() => {
    const classes = ['tag'];

    // Variant classes
    classes.push(`tag--variant-${variant}`);

    // Size classes
    classes.push(`tag--size-${size}`);

    // Feature classes
    if (interactive) {
      classes.push('tag--interactive');
    }

    if (removable) {
      classes.push('tag--removable');
    }

    // Norwegian compliance classes
    if (norwegian?.classification) {
      classes.push(`tag--classification-${norwegian.classification}`);
    }

    if (norwegian?.municipality) {
      classes.push(`tag--municipality-${norwegian.municipality.toLowerCase().replace(/\s+/g, '-')}`);
    }

    if (norwegian?.category) {
      classes.push(`tag--category-${norwegian.category}`);
    }

    // Custom classes
    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [variant, size, interactive, removable, norwegian, className]);

  // Handle click events
  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (interactive && onClick) {
      onClick();
    }
  };

  // Handle keyboard events for accessibility
  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (interactive && onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
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
      {norwegian?.classification && (
        <ClassificationIndicator level={norwegian.classification} />
      )}

      {/* Municipality indicator */}
      {norwegian?.municipality && (
        <MunicipalityIndicator municipality={norwegian.municipality} />
      )}

      {/* Main content */}
      <span className="tag__content">
        {children}
      </span>

      {/* Category indicator */}
      {norwegian?.category && (
        <span className="tag__category-indicator" aria-label={t('tag.category', { category: norwegian.category })}>
          {getCategoryIcon(norwegian.category)}
        </span>
      )}

      {/* Remove button */}
      {removable && onRemove && (
        <RemoveButton onRemove={onRemove} size={size} />
      )}
    </span>
  );
}

/**
 * Classification indicator component
 */
const ClassificationIndicator: React.FC<{ level: string }> = ({ level }) => {
  const { t } = useLocalization();

  const getClassificationIcon = (classification: string): string => {
    const icons = {
      'ÅPEN': '🔓',
      'BEGRENSET': '🔒',
      'KONFIDENSIELT': '🔐',
      'HEMMELIG': '🔴',
    };
    return icons[classification as keyof typeof icons] || '🔓';
  };

  const getClassificationText = (classification: string): string => {
    const texts = {
      'ÅPEN': 'Åpen',
      'BEGRENSET': 'Begrenset',
      'KONFIDENSIELT': 'Konfidensielt',
      'HEMMELIG': 'Hemmelig',
    };
    return texts[classification as keyof typeof texts] || classification;
  };

  return (
    <span
      className="tag__classification-indicator"
      aria-label={t('tag.classification', { level: getClassificationText(level) })}
      title={`${t('tag.classification.label')}: ${getClassificationText(level)}`}
    >
      {getClassificationIcon(level)}
    </span>
  );
};

/**
 * Remove button component
 */
const RemoveButton: React.FC<{ onRemove?: () => void; size: string }> = ({ onRemove, size }) => {
  const { t } = useLocalization();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onRemove?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      onRemove?.();
    }
  };

  const buttonClasses = React.useMemo(() => {
    const classes = ['tag__remove-button'];
    classes.push(`tag__remove-button--size-${size}`);
    return classes.join(' ');
  }, [size]);

  return (
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
  );
};

/**
 * Municipality indicator component
 */
const MunicipalityIndicator: React.FC<{ municipality?: string }> = ({ municipality }) => {
  const { t } = useLocalization();

  if (!municipality) { return null; }

  const getMunicipalityIcon = (municipality: string): string => {
    // Norwegian municipality icons mapping
    const icons: Record<string, string> = {
      'Oslo': '🏛️',
      'Bergen': '🏔️',
      'Stavanger': '⚓',
      'Trondheim': '🏰',
      'Bærum': '🌲',
      'Tromsø': '❄️',
      'Fredrikstad': '🏭',
      'Drammen': '🌉',
      'Asker': '🌿',
      'Lillestrøm': '🚂',
    };
    return icons[municipality] || '🏘️';
  };

  return (
    <span
      className="tag__municipality-indicator"
      aria-label={t('tag.municipality', { name: municipality })}
      title={`${t('tag.municipality.label')}: ${municipality}`}
    >
      {getMunicipalityIcon(municipality)}
    </span>
  );
};

/**
 * Get category icon for Norwegian categories
 */
function getCategoryIcon(category: string): string {
  const icons = {
    'status': '📊',
    'category': '🏷️',
    'priority': '⭐',
    'role': '👤',
    'location': '📍',
  };
  return icons[category as keyof typeof icons] || '🏷️';
}

Tag.displayName = 'Tag';
