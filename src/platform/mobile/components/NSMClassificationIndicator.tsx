import React from 'react';

import { useLocalization } from '../../../localization/hooks/useLocalization';

// NSMClassificationIndicator - Norwegian Security Authority classification display
interface NSMClassificationIndicatorProps {
  level: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  variant?: 'border' | 'badge' | 'background';
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  style?: any;
}

/**
 * NSMClassificationIndicator - Norwegian NSM classification visual indicator
 *
 * Features:
 * - NSM compliant classification levels
 * - Multiple display variants (border, badge, background)
 * - Norwegian government color standards
 * - Semantic accessibility support
 * - Design token integration
 */
export const NSMClassificationIndicator = React.forwardRef(
  (props: NSMClassificationIndicatorProps, ref: any): void => {
    const {
      level,
      variant = 'badge',
      size = 'medium',
      showLabel = false,
      position = 'top',
      style,
      ...restProps
    } = props;

    const { t } = useLocalization();

    // Classification definitions based on NSM standards
    const getClassificationConfig = (): void => {
      const configs: Record<string, any> = {
        ÅPEN: {
          color: 'var(--color-success-500)',
          backgroundColor: 'var(--color-success-50)',
          textColor: 'var(--color-success-700)',
          description: t('nsm.classification.åpen.description'),
        },
        BEGRENSET: {
          color: 'var(--color-warning-500)',
          backgroundColor: 'var(--color-warning-50)',
          textColor: 'var(--color-warning-700)',
          description: t('nsm.classification.begrenset.description'),
        },
        KONFIDENSIELT: {
          color: 'var(--color-danger-500)',
          backgroundColor: 'var(--color-danger-50)',
          textColor: 'var(--color-danger-700)',
          description: t('nsm.classification.konfidensielt.description'),
        },
        HEMMELIG: {
          color: 'var(--color-danger-700)',
          backgroundColor: 'var(--color-danger-100)',
          textColor: 'var(--color-danger-900)',
          description: t('nsm.classification.hemmelig.description'),
        },
      };
      return configs[level];
    };

    // Size configurations
    const getSizeConfig = (): void => {
      const sizes: Record<string, any> = {
        small: {
          fontSize: 'var(--font-size-xs)',
          padding: 'var(--spacing-1) var(--spacing-2)',
          borderWidth: '1px',
          indicatorSize: 'var(--spacing-2)',
        },
        medium: {
          fontSize: 'var(--font-size-sm)',
          padding: 'var(--spacing-2) var(--spacing-3)',
          borderWidth: '2px',
          indicatorSize: 'var(--spacing-3)',
        },
        large: {
          fontSize: 'var(--font-size-md)',
          padding: 'var(--spacing-3) var(--spacing-4)',
          borderWidth: '3px',
          indicatorSize: 'var(--spacing-4)',
        },
      };
      return sizes[size];
    };

    const config = getClassificationConfig();
    const sizeConfig = getSizeConfig();

    // Border variant
    if (variant === 'border') {
      return (
        <div
          ref={ref}
          style={{
            [`border${position.charAt(0).toUpperCase() + position.slice(1)}`]: `${sizeConfig.borderWidth} solid ${config.color}`,
            ...style,
          }}
          data-classification={level}
          data-testid="nsm-classification-border"
          {...restProps}
        />
      );
    }

    // Background variant
    if (variant === 'background') {
      return (
        <div
          ref={ref}
          style={{
            backgroundColor: config.backgroundColor,
            color: config.textColor,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...style,
          }}
          data-classification={level}
          data-testid="nsm-classification-background"
          aria-label={t('nsm.classification.level', { level })}
          {...restProps}
        >
          {showLabel && (
            <span
              style={{
                fontSize: sizeConfig.fontSize,
                fontWeight: 'var(--font-weight-semibold)',
                textTransform: 'uppercase',
              }}
            >
              {level}
            </span>
          )}
        </div>
      );
    }

    // Badge variant (default)
    return (
      <span
        ref={ref}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: sizeConfig.fontSize,
          fontWeight: 'var(--font-weight-semibold)',
          color: config.textColor,
          backgroundColor: config.backgroundColor,
          border: `1px solid ${config.color}`,
          borderRadius: 'var(--border-radius-md)',
          padding: sizeConfig.padding,
          textTransform: 'uppercase',
          lineHeight: 1,
          ...style,
        }}
        data-classification={level}
        data-testid="nsm-classification-badge"
        aria-label={`${t('nsm.classification.level')}: ${level}`}
        title={config.description}
        {...restProps}
      >
        {/* Classification indicator dot */}
        <span
          style={{
            width: sizeConfig.indicatorSize,
            height: sizeConfig.indicatorSize,
            backgroundColor: config.color,
            borderRadius: 'var(--border-radius-full)',
            marginRight: showLabel ? 'var(--spacing-1)' : '0',
          }}
          aria-hidden="true"
        />

        {/* Classification label */}
        {showLabel && level}
      </span>
    );
  }
);

NSMClassificationIndicator.displayName = 'NSMClassificationIndicator';
