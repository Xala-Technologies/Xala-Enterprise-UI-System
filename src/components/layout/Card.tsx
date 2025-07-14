/**
 * @fileoverview Card Component - Enterprise Standards Compliant
 * @module Card
 * @description Card layout component using design tokens (no inline styles)
 */

import React from 'react';

import { useLocalization } from '../../localization/hooks/useLocalization';
import type { CardProps } from '../../types/layout.types';

// Helper function
const getClassificationIcon = (level: string): string => {
  const icons = {
    'ÅPEN': '🟢',
    'BEGRENSET': '🟡',
    'KONFIDENSIELT': '🔴',
    'HEMMELIG': '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};


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
}: CardProps): React.ReactElement {
  const { t } = useLocalization();

  // Build CSS classes using design tokens
  const cardClasses = React.useMemo((): string => {
    const classes = ['card'];
    
    // Variant class
    classes.push(`card--${variant}`);
    
    // Shadow class
    classes.push(`card--shadow-${shadow}`);
    
    // Border radius class
    classes.push(`card--radius-${borderRadius}`);
    
    // Interactive class
    if (interactive) {
      classes.push('card--interactive');
    }
    
    // Background class
    classes.push(`card--bg-${background}`);
    
    // Padding class
    classes.push(`card--padding-${padding}`);
    
    // Margin class
    if (margin !== 'none') {
      classes.push(`card--margin-${margin}`);
    }
    
    // Custom class
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  }, [variant, shadow, borderRadius, interactive, background, padding, margin, className]);

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
const MetadataSection: React.FC<{ metadata?: CardProps['metadata'] }> = ({ metadata }): React.ReactElement | null => {
  const { t } = useLocalization();
  if (!metadata) return null;
  
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
const ClassificationIndicator: React.FC<{ level: string }> = ({ level }): React.ReactElement => {
  return (
    <span className="card__classification-indicator" aria-hidden="true">
      {getClassificationIcon(level)}
    </span>
  );
};

Card.displayName = 'Card';
