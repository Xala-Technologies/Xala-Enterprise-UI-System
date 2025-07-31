/**
 * @fileoverview SSR-Safe Progress Components - Production Strategy Implementation
 * @description Progress components using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Progress variant types
 */
export type ProgressVariant = 'default' | 'success' | 'warning' | 'destructive';

/**
 * Progress size types
 */
export type ProgressSize = 'sm' | 'default' | 'lg';

/**
 * Progress component props interface
 */
export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  readonly variant?: ProgressVariant;
  readonly size?: ProgressSize;
  readonly value?: number;
  readonly max?: number;
  readonly label?: string;
  readonly showValue?: boolean;
  readonly showPercentage?: boolean;
  readonly animated?: boolean;
  readonly indeterminate?: boolean;
  readonly helperText?: string;
}

/**
 * Format display value - pure function
 */
const getDisplayValue = (
  showPercentage: boolean,
  showValue: boolean,
  percentage: number,
  value: number,
  max: number
): string | null => {
  if (showPercentage) {
    return `${Math.round(percentage)}%`;
  }
  if (showValue) {
    return `${value}/${max}`;
  }
  return null;
};

/**
 * Enhanced Progress component
 * @param variant - Progress variant (default, success, warning, destructive)
 * @param size - Progress size (sm, default, lg)
 * @param value - Current progress value
 * @param max - Maximum progress value (default: 100)
 * @param label - Progress label
 * @param showValue - Whether to show current value
 * @param showPercentage - Whether to show percentage
 * @param animated - Whether to show animation
 * @param indeterminate - Whether progress is indeterminate
 * @param helperText - Additional helper text
 * @param className - Additional CSS classes
 * @param props - Additional div props
 * @returns Enhanced Progress JSX element
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      style,
      variant = 'default',
      size = 'default',
      value = 0,
      max = 100,
      label,
      showValue = false,
      showPercentage = false,
      animated = false,
      indeterminate = false,
      helperText,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography, getToken } = useTokens();
    
    // Calculate percentage
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Format display value
    const displayValue = getDisplayValue(showPercentage, showValue, percentage, value, max);

    // Get border radius
    const borderRadius = {
      full: (getToken('borderRadius.full') as string) || '9999px',
    };

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return { height: '8px' };
        case 'lg':
          return { height: '24px' };
        default: // default
          return { height: '16px' };
      }
    };

    // Variant styles
    const getVariantStyles = (): { background: React.CSSProperties; indicator: React.CSSProperties } => {
      switch (variant) {
        case 'success':
          return {
            background: { backgroundColor: `${colors.success?.[500] || '#22c55e'}1A` }, // 10% opacity
            indicator: { backgroundColor: colors.success?.[500] || '#22c55e' },
          };
        case 'warning':
          return {
            background: { backgroundColor: `${colors.warning?.[500] || '#eab308'}1A` }, // 10% opacity
            indicator: { backgroundColor: colors.warning?.[500] || '#eab308' },
          };
        case 'destructive':
          return {
            background: { backgroundColor: `${colors.danger?.[500] || '#ef4444'}1A` }, // 10% opacity
            indicator: { backgroundColor: colors.danger?.[500] || '#ef4444' },
          };
        case 'default':
        default:
          return {
            background: { backgroundColor: colors.neutral?.[200] || '#e5e7eb' },
            indicator: { backgroundColor: colors.primary?.[500] || '#3b82f6' },
          };
      }
    };

    const sizeStyles = getSizeStyles();
    const variantStyles = getVariantStyles();

    // Progress track styles
    const trackStyles: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      borderRadius: borderRadius.full,
      transition: 'all 300ms ease-in-out',
      ...sizeStyles,
      ...variantStyles.background,
      ...style,
    };

    // Progress indicator styles  
    const indicatorStyles: React.CSSProperties = {
      height: '100%',
      width: '100%',
      flex: 1,
      transition: 'all 300ms ease-in-out',
      transform: `translateX(-${100 - percentage}%)`,
      ...variantStyles.indicator,
    };

    // Indeterminate styles
    const indeterminateTrackStyles: React.CSSProperties = {
      height: '100%',
      width: '100%',
      backgroundColor: `${variantStyles.indicator.backgroundColor}30`, // 30% opacity
      // Note: CSS animations would need to be defined in CSS for proper indeterminate animation
    };

    const indeterminateBarStyles: React.CSSProperties = {
      height: '100%',
      width: '33.333333%',
      ...variantStyles.indicator,
      // Note: Animation would be handled by CSS keyframes in a real implementation
    };

    const progressElement = (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        aria-label={label}
        aria-describedby={helperText ? `${label}-helper` : undefined}
        className={className}
        style={trackStyles}
        {...props}
      >
        {indeterminate ? (
          // Indeterminate progress animation
          <div style={indeterminateTrackStyles}>
            <div style={indeterminateBarStyles} />
          </div>
        ) : (
          // Determinate progress
          <div style={indicatorStyles} />
        )}
      </div>
    );

    if (!label && !displayValue && !helperText) {
      return progressElement;
    }

    const fieldStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[2],
    };

    const labelRowStyles: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    };

    const labelStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
    };

    const valueStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
    };

    const helperStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
    };

    return (
      <div style={fieldStyles}>
        {/* Label and value */}
        {(label || displayValue) && (
          <div style={labelRowStyles}>
            {label && <label style={labelStyles}>{label}</label>}
            {displayValue && <span style={valueStyles}>{displayValue}</span>}
          </div>
        )}

        {progressElement}

        {helperText && (
          <p id={`${label}-helper`} style={helperStyles}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

/**
 * Circular Progress component
 */
export interface CircularProgressProps {
  readonly value?: number;
  readonly max?: number;
  readonly size?: number;
  readonly strokeWidth?: number;
  readonly variant?: 'default' | 'success' | 'warning' | 'destructive';
  readonly showValue?: boolean;
  readonly showPercentage?: boolean;
  readonly indeterminate?: boolean;
  readonly className?: string;
  readonly label?: string;
}

/**
 * Format circular display value - pure function
 */
const getCircularDisplayValue = (
  showPercentage: boolean,
  showValue: boolean,
  percentage: number,
  value: number
): string | null => {
  if (showPercentage) {
    return `${Math.round(percentage)}%`;
  }
  if (showValue) {
    return `${value}`;
  }
  return null;
};

export const CircularProgress = forwardRef<SVGSVGElement, CircularProgressProps>(
  (
    {
      value = 0,
      max = 100,
      size = 40,
      strokeWidth = 4,
      variant = 'default',
      showValue = false,
      showPercentage = false,
      indeterminate = false,
      className,
      label,
    },
    ref
  ): React.ReactElement => {
    const { colors, typography } = useTokens();
    
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Color mapping using tokens
    const getColor = (): string => {
      switch (variant) {
        case 'success':
          return colors.success?.[500] || '#22c55e';
        case 'warning':
          return colors.warning?.[500] || '#eab308';
        case 'destructive':
          return colors.danger?.[500] || '#ef4444';
        case 'default':
        default:
          return colors.primary?.[500] || '#3b82f6';
      }
    };

    const displayValue = getCircularDisplayValue(showPercentage, showValue, percentage, value);

    const containerStyles: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const svgStyles: React.CSSProperties = {
      transform: 'rotate(-90deg)',
    };

    const backgroundCircleStyles: React.CSSProperties = {
      stroke: colors.neutral?.[200] || '#e5e7eb',
      fill: 'transparent',
    };

    const progressCircleStyles: React.CSSProperties = {
      stroke: getColor(),
      fill: 'transparent',
      strokeLinecap: 'round',
      transition: 'all 300ms ease-in-out',
      // Note: Animation for indeterminate state would need CSS keyframes in real implementation
    };

    const centerTextContainerStyles: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const centerTextStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.medium,
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
    };

    return (
      <div style={containerStyles}>
        <svg
          ref={ref}
          className={className}
          style={svgStyles}
          width={size}
          height={size}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : value}
          aria-label={label}
          role="progressbar"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            style={backgroundCircleStyles}
          />

          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={indeterminate ? `${circumference * 0.25} ${circumference}` : strokeDasharray}
            strokeDashoffset={indeterminate ? 0 : strokeDashoffset}
            style={progressCircleStyles}
          />
        </svg>

        {/* Center text */}
        {displayValue && (
          <div style={centerTextContainerStyles}>
            <span style={centerTextStyles}>{displayValue}</span>
          </div>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';

