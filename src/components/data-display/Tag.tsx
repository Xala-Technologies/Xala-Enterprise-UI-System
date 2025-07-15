/**
 * @fileoverview Tag Component - Enterprise Standards Compliant
 * @module Tag
 * @description Tag component using design tokens (no inline styles)
 */

import React from 'react';

import type { TagProps } from '../../types/data-display.types';

// Helper function
const getClassificationText = (level: string): string => {
  const texts = {
    ÅPEN: 'Open',
    BEGRENSET: 'Restricted',
    KONFIDENSIELT: 'Confidential',
    HEMMELIG: 'Secret',
  };
  return texts[level as keyof typeof texts] || level;
};

const getClassificationIcon = (level: string): string => {
  const icons = {
    ÅPEN: '🟢',
    BEGRENSET: '🟡',
    KONFIDENSIELT: '🔴',
    HEMMELIG: '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};
/**
 * Tag component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */

const getCategoryIcon = (category: string): string => {
  const icons = {
    system: '⚙️',
    validation: '✅',
    security: '🔒',
    process: '🔄',
    user: '👤',
  };
  return icons[category as keyof typeof icons] || '📋';
};

export function Tag({
  children,
  variant = 'default',
  size = 'md',
  interactive = false,
  removable = false,
  onClick,
  onRemove,
  className = '',
  testId,
  ...props
}: TagProps): React.ReactElement {
  // const { t } = useLocalization();
  // eslint-disable-next-line no-unused-vars
  const _t = (key: string): string => key; // Placeholder for localization

  // Mock norwegian config for now
  const norwegian = {
    classification: 'ÅPEN' as const,
    municipality: 'Oslo',
    category: 'system',
  };

  // Build CSS classes using design tokens
  const getTagClasses = (): string => {
    const classes = ['tag'];

    // Variant class
    classes.push(`tag--${variant}`);

    // Size class
    classes.push(`tag--${size}`);

    // Interactive class
    if (interactive) {
      classes.push('tag--interactive');
    }

    // Removable class
    if (removable) {
      classes.push('tag--removable');
    }

    // Classification class
    if (norwegian?.classification) {
      classes.push(`tag--classification-${norwegian.classification.toLowerCase()}`);
    }

    // Custom class
    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  };

  // Handle click events
  const handleClick = (): void => {
    if (interactive && onClick) {
      onClick();
    }
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={getTagClasses()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      data-testid={testId}
      {...props}
    >
      {/* Classification indicator */}
      {norwegian?.classification && <ClassificationIndicator level={norwegian.classification} />}

      {/* Content */}
      {children}

      {/* Municipality indicator */}
      {norwegian?.municipality && <MunicipalityIndicator municipality={norwegian.municipality} />}

      {/* Category icon */}
      {norwegian?.category && (
        <span className="tag__category-icon" aria-label={`Category: ${norwegian.category}`}>
          {getCategoryIcon(norwegian.category)}
        </span>
      )}

      {/* Remove button */}
      {removable && <RemoveButton onRemove={onRemove} size={size} />}
    </div>
  );
}

/**
 * Classification indicator component
 */
const ClassificationIndicator: React.FC<{ level: string }> = ({ level }): React.ReactElement => {
  return (
    <span
      className="tag__classification-indicator"
      aria-label={`Classification: ${getClassificationText(level)}`}
      title={`Classification: ${getClassificationText(level)}`}
    >
      {getClassificationIcon(level)}
    </span>
  );
};

/**
 * Remove button component
 */
const RemoveButton: React.FC<{ onRemove?: () => void; size: string }> = ({
  onRemove,
  size,
}): React.ReactElement => {
  const buttonClasses = `tag__remove-button tag__remove-button--${size}`;

  const handleClick = (): void => {
    if (onRemove) {
      onRemove();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={'Remove tag'}
      title={'Remove tag'}
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
const MunicipalityIndicator: React.FC<{ municipality?: string }> = ({
  municipality,
}): React.ReactElement => {
  return (
    <span
      className="tag__municipality-indicator"
      aria-label={`Municipality: ${municipality}`}
      title={`Municipality: ${municipality}`}
    >
      {municipality && getMunicipalityIcon(municipality)}
    </span>
  );
};

/**
 * Get municipality icon for Norwegian municipalities
 */
function getMunicipalityIcon(municipality: string): string {
  const icons = {
    oslo: '🏛️',
    bergen: '🏔️',
    trondheim: '⛪',
    stavanger: '🛢️',
    kristiansand: '🏖️',
  };
  return icons[municipality as keyof typeof icons] || '🏷️';
}

Tag.displayName = 'Tag';
