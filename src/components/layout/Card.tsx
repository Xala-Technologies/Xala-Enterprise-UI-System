/**
 * @fileoverview Card Component - Enterprise Standards Compliant
 * @module Card
 * @description Card layout component using design tokens (no inline styles)
 */

import React from 'react';

import { useLocalization } from '../../localization/hooks/useLocalization';
import type { CardProps } from '../../types/layout.types';

/**
 * Card component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export function Card({
  children,
  variant = 'default',
  shadow = 'sm',
  borderRadius = 'md',
  header,
  footer,
  metadata,
  interactive = false,
  background = 'transparent',
  padding = 'md',
  margin = 'none',
  className = '',
  testId,
  ...props
}: CardProps): JSX.Element {
  const { t } = useLocalization();

  // Build CSS classes using design tokens
  const cardClasses = React.useMemo((): void => {
    const classes = ['card'];

    // Variant classes
    classes.push(`card--${variant}`);

    // Shadow classes
    classes.push(`card--shadow-${shadow}`);

    // Border radius classes
    classes.push(`card--radius-${borderRadius}`);

    // Background classes
    classes.push(`card--bg-${background}`);

    // Padding classes
    classes.push(`card--padding-${padding}`);

    // Margin classes
    classes.push(`card--margin-${margin}`);

    // Feature classes
    if (interactive) {
      classes.push('card--interactive');
    }

    if (metadata) {
      classes.push('card--with-metadata');
    }

    // Metadata classification classes
    if (metadata?.classification) {
      classes.push(`card--classification-${metadata.classification}`);
    }

    // Custom classes
    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [
    variant,
    shadow,
    borderRadius,
    background,
    padding,
    margin,
    interactive,
    metadata,
    className,
  ]);

  return (
    <div
      className={cardClasses}
      data-testid={testId}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {header && <div className="card__header">{header}</div>}

      <div className="card__content">{children}</div>

      {footer && <div className="card__footer">{footer}</div>}

      {metadata && <MetadataSection metadata={metadata} />}
    </div>
  );
}

/**
 * Metadata section component
 */
const MetadataSection: React.FC<{ metadata: CardProps['metadata'] }> = ({ metadata }): void => {
  const { t } = useLocalization();

  if (!metadata) {
    return null;
  }

  return (
    <div className="card__metadata">
      {metadata.lastUpdated && (
        <div className="card__metadata-item">
          <span className="card__metadata-label">{t('card.lastUpdated')}:</span>
          <span className="card__metadata-value">{metadata.lastUpdated}</span>
        </div>
      )}

      {metadata.municipality && (
        <div className="card__metadata-item">
          <span className="card__metadata-label">{t('card.municipality')}:</span>
          <span className="card__metadata-value">{metadata.municipality}</span>
        </div>
      )}

      {metadata.classification && (
        <div className="card__metadata-item card__metadata-item--classification">
          <ClassificationIndicator level={metadata.classification} />
          <span className="card__metadata-value">
            {t(`classification.${metadata.classification}`)}
          </span>
        </div>
      )}

      {metadata.compliance && metadata.compliance.length > 0 && (
        <div className="card__metadata-item">
          <span className="card__metadata-label">{t('card.compliance')}:</span>
          <span className="card__metadata-value">{metadata.compliance.join(', ')}</span>
        </div>
      )}
    </div>
  );
};

/**
 * Classification indicator component
 */
const ClassificationIndicator: React.FC<{ level: string }> = ({ level }): void => {
  const getClassificationIcon = (classification: string): string => {
    const icons = {
      ÅPEN: '🔓',
      BEGRENSET: '🔒',
      KONFIDENSIELT: '🔐',
      HEMMELIG: '🔴',
    };
    return icons[classification as keyof typeof icons] || '🔓';
  };

  return (
    <span className="card__classification-indicator" aria-hidden="true">
      {getClassificationIcon(level)}
    </span>
  );
};

Card.displayName = 'Card';
