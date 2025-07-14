/**
 * @fileoverview Stack Component - Enterprise Standards Compliant
 * @module Stack
 * @description Flexbox stack component using design tokens (no inline styles)
 */

import React from 'react';

import type { StackProps } from '../../types/layout.types';

/**
 * Stack component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export function Stack({
  children,
  direction = 'column',
  gap = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  reverse = false,
  background = 'transparent',
  padding = 'none',
  margin = 'none',
  className = '',
  testId,
  ...props
}: StackProps): JSX.Element {

  // Build CSS classes using design tokens
  const stackClasses = React.useMemo(() => {
    const classes = ['stack'];

    // Direction classes (with reverse support)
    const directionClass = reverse
      ? (direction === 'row' ? 'row-reverse' : 'column-reverse')
      : direction;
    classes.push(`stack--direction-${directionClass}`);

    // Gap classes
    classes.push(`stack--gap-${gap}`);

    // Alignment classes
    classes.push(`stack--align-${align}`);

    // Justification classes
    classes.push(`stack--justify-${justify}`);

    // Background classes
    classes.push(`stack--bg-${background}`);

    // Padding classes
    classes.push(`stack--padding-${padding}`);

    // Margin classes
    classes.push(`stack--margin-${margin}`);

    // Feature classes
    if (wrap) {
      classes.push('stack--wrap');
    }

    // Custom classes
    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [direction, gap, align, justify, wrap, reverse, background, padding, margin, className]);

  return (
    <div
      className={stackClasses}
      data-testid={testId}
      {...props}
    >
      {children}
    </div>
  );
}

Stack.displayName = 'Stack';
