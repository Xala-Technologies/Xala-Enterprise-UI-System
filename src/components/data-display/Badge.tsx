/**
 * @fileoverview Badge Component - Enterprise Standards Compliant
 * @module Badge
 * @description Semantic badge component using design tokens (no inline styles)
 */

import React from 'react';

import { useLocalization } from '../../localization/hooks/useLocalization';
import type { BadgeProps } from '../../types/data-display.types';

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

/**
 * Format count display - pure function
 */
const getDisplayCount = (
  count: number | undefined,
  maxCount: number,
  showZero: boolean,
  children: React.ReactNode
): React.ReactNode => {
  if (typeof count !== 'number') {
    return children;
  }
  if (count === 0 && !showZero) {
    return null;
  }
  return count > maxCount ? `${maxCount}+` : count.toString();
};

/**
 * Build CSS classes using design tokens - pure function
 */
const getBadgeClasses = (
  variant: string,
  size: string,
  shape: string,
  position: string,
  pulse: boolean,
  dot: boolean,
  classification: string | undefined,
  priority: string | undefined,
  className: string
): string => {
  const classes = ['badge'];

  // Variant classes
  classes.push(`badge--${variant}`);

  // Size classes
  classes.push(`badge--${size}`);

  // Shape classes
  classes.push(`badge--${shape}`);

  // Position classes
  if (position !== 'inline') {
    classes.push('badge--positioned');
    classes.push(`badge--${position}`);
  }

  // State classes
  if (pulse) {
    classes.push('badge--pulse');
  }

  if (dot) {
    classes.push('badge--dot');
  }

  // Classification classes
  if (classification) {
    classes.push(`badge--classification-${classification}`);
  }

  // Priority classes
  if (priority) {
    classes.push(`badge--priority-${priority}`);
  }

  // Custom classes
  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

/**
 * Get accessibility props - pure function
 */
const getAccessibilityProps = (ariaLabel: string | undefined): Record<string, string> => {
  const props: Record<string, string> = {};
  if (ariaLabel) {
    props['aria-label'] = ariaLabel;
  }
  return props;
};

/**
 * Badge component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  shape = 'rounded',
  position = 'inline',
  pulse = false,
  count,
  maxCount = 99,
  showZero = false,
  dot = false,
  classification,
  priority,
  // eslint-disable-next-line no-unused-vars
  accessible: _accessible = true,
  ariaLabel,
  className = '',
  testId,
  ...props
}: BadgeProps): React.ReactElement {
  // eslint-disable-next-line no-unused-vars
  const { t: _t } = useLocalization();

  // Format count display
  const displayCount = getDisplayCount(count, maxCount, showZero, children);

  // Build CSS classes using design tokens
  const badgeClasses = getBadgeClasses(
    variant,
    size,
    shape,
    position,
    pulse,
    dot,
    classification,
    priority,
    className
  );

  // Accessibility props
  const accessibilityProps = getAccessibilityProps(ariaLabel);

  if (displayCount === null) {
    return <></>;
  }

  return (
    <span className={badgeClasses} data-testid={testId} {...accessibilityProps} {...props}>
      {displayCount}
      {classification && <ClassificationIndicator level={classification} />}
      {priority && <PriorityIndicator priority={priority} />}
    </span>
  );
}

/**
 * Classification indicator component
 */
const ClassificationIndicator: React.FC<{ level: string }> = ({ level }): React.ReactElement => {
  return (
    <span className="badge__classification" aria-hidden="true">
      {getClassificationIcon(level)}
    </span>
  );
};

/**
 * Priority indicator component
 */
const getPriorityIcon = (priority: string): string => {
  const icons = {
    low: '▪',
    medium: '■',
    high: '◆',
    critical: '⬛',
  };
  return icons[priority as keyof typeof icons] || '■';
};

const PriorityIndicator: React.FC<{ priority: string }> = ({ priority }): React.ReactElement => {
  return (
    <span className="badge__priority" aria-hidden="true">
      {getPriorityIcon(priority)}
    </span>
  );
};

// Helper function
Badge.displayName = 'Badge';
