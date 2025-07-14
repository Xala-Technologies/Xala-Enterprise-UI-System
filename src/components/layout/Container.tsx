/**
 * @fileoverview Container Component - Enterprise Standards Compliant
 * @module Container
 * @description Layout container component using design tokens (no inline styles)
 */

import React from 'react';

import type { ContainerProps } from '../../types/layout.types';

/**
 * Container component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export function Container({
  children,
  size = 'lg',
  background = 'transparent',
  padding = 'md',
  margin = 'auto',
  maxWidth,
  centerContent = false,
  responsive = true,
  accessibilityMode = true,
  norwegianMaxWidth = true,
  className = '',
  testId,
  ...props
}: ContainerProps): JSX.Element {
  // Build CSS classes using design tokens
  const containerClasses = React.useMemo(() => {
    const classes = ['container'];

    // Size classes
    classes.push(`container--${size}`);

    // Background classes
    classes.push(`container--bg-${background}`);

    // Padding classes
    classes.push(`container--padding-${padding}`);

    // Margin classes
    classes.push(`container--margin-${margin}`);

    // Feature classes
    if (centerContent) {
      classes.push('container--center-content');
    }

    if (responsive) {
      classes.push('container--responsive');
    }

    if (accessibilityMode) {
      classes.push('container--accessibility');
    }

    if (norwegianMaxWidth) {
      classes.push('container--norwegian-sizing');
    }

    // Custom classes
    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [
    size,
    background,
    padding,
    margin,
    centerContent,
    responsive,
    accessibilityMode,
    norwegianMaxWidth,
    className,
  ]);

  // CSS custom properties for dynamic max-width
  const containerStyle = React.useMemo(() => {
    const style: any = {};

    if (maxWidth) {
      style['--container-max-width'] = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
    }

    return style as React.CSSProperties;
  }, [maxWidth]);

  return (
    <div className={containerClasses} style={containerStyle} data-testid={testId} {...props}>
      {children}
    </div>
  );
}

Container.displayName = 'Container';
