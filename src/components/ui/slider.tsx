/**
 * @fileoverview SSR-Safe Slider Component - Production Strategy Implementation
 * @description Slider component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, useState, useCallback, useEffect, type InputHTMLAttributes } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Slider variant types
 */
export type SliderVariant = 'default' | 'success' | 'warning' | 'destructive';

/**
 * Slider size types
 */
export type SliderSize = 'sm' | 'default' | 'lg';

/**
 * Slider component props interface
 */
export interface SliderProps
  extends Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'size' | 'type' | 'disabled' | 'value' | 'defaultValue'
    > {
  readonly variant?: SliderVariant;
  readonly size?: SliderSize;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly value?: number[];
  readonly defaultValue?: number[];
  readonly disabled?: boolean;
  readonly onValueChange?: (value: number[]) => void;
  readonly label?: string;
  readonly helperText?: string;
  readonly errorText?: string;
  readonly successText?: string;
  readonly required?: boolean;
  readonly error?: boolean;
  readonly success?: boolean;
  readonly showValue?: boolean;
  readonly showTicks?: boolean;
  readonly formatValue?: (value: number) => string;
  readonly marks?: Array<{ value: number; label: string }>;
}

/**
 * Enhanced Slider component
 * @param variant - Slider variant (default, success, warning, destructive)
 * @param size - Slider size (sm, default, lg)
 * @param min - Minimum value
 * @param max - Maximum value
 * @param step - Step increment
 * @param value - Current value(s)
 * @param defaultValue - Default value(s)
 * @param onValueChange - Callback when value changes
 * @param label - Slider label
 * @param helperText - Helper text below slider
 * @param errorText - Error text (overrides helperText when present)
 * @param successText - Success text (overrides helperText when present)
 * @param required - Whether slider is required
 * @param error - Error state
 * @param success - Success state
 * @param showValue - Whether to show current value
 * @param showTicks - Whether to show tick marks
 * @param formatValue - Function to format display value
 * @param marks - Array of mark objects for labeled ticks
 * @param disabled - Disabled state
 * @param className - Additional CSS classes
 * @param id - Slider ID
 * @param props - Additional input props
 * @returns Enhanced Slider JSX element
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      variant,
      size,
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue = [min],
      onValueChange,
      label,
      helperText,
      errorText,
      successText,
      required,
      error,
      success,
      showValue = false,
      showTicks = false,
      formatValue,
      marks,
      disabled,
      id,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography, getToken } = useTokens();
    const [internalValue, setInternalValue] = React.useState(value || defaultValue);
    const [dragging, setDragging] = React.useState(false);

    // Generate ID if not provided and label exists
    const sliderId =
      id || (label ? `slider-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    // Determine actual variant based on state
    const actualVariant =
      error || errorText ? 'destructive' : success || successText ? 'success' : variant;

    // Helper text to display
    const displayHelperText = errorText || successText || helperText;

    // Update internal value when prop changes
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    // Calculate percentage for positioning
    const getPercentage = useCallback(
      (val: number): number => {
        return ((val - min) / (max - min)) * 100;
      },
      [min, max]
    );

    // Format value for display
    const formatDisplayValue = useCallback(
      (val: number): string => {
        return formatValue ? formatValue(val) : val.toString();
      },
      [formatValue]
    );

    // Handle value change
    const handleValueChange = useCallback(
      (newValue: number[]): void => {
        setInternalValue(newValue);
        onValueChange?.(newValue);
      },
      [onValueChange]
    );

    // Mouse/touch event handlers
    const handlePointerDown = useCallback(
      (event: React.PointerEvent<HTMLDivElement>): void => {
        if (disabled) return;

        setDragging(true);
        const rect = event.currentTarget.getBoundingClientRect();
        const percentage = ((event.clientX - rect.left) / rect.width) * 100;
        const newValue = min + (percentage / 100) * (max - min);
        const snappedValue = Math.round(newValue / step) * step;
        const clampedValue = Math.max(min, Math.min(max, snappedValue));

        handleValueChange([clampedValue]);
        event.preventDefault();
      },
      [disabled, min, max, step, handleValueChange]
    );

    const handlePointerMove = useCallback(
      (event: PointerEvent): void => {
        if (!dragging || disabled || !sliderId) return;

        const slider = document.getElementById(sliderId);
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        const percentage = ((event.clientX - rect.left) / rect.width) * 100;
        const newValue = min + (percentage / 100) * (max - min);
        const snappedValue = Math.round(newValue / step) * step;
        const clampedValue = Math.max(min, Math.min(max, snappedValue));

        handleValueChange([clampedValue]);
      },
      [dragging, disabled, sliderId, min, max, step, handleValueChange]
    );

    const handlePointerUp = useCallback((): void => {
      setDragging(false);
    }, []);

    // Add global event listeners for dragging
    useEffect(() => {
      if (dragging) {
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);

        return (): void => {
          document.removeEventListener('pointermove', handlePointerMove);
          document.removeEventListener('pointerup', handlePointerUp);
        };
      }

      return undefined;
    }, [dragging, handlePointerMove, handlePointerUp]);

    const currentValue = internalValue[0] || min;
    const percentage = getPercentage(currentValue);

    // Get border radius
    const borderRadius = {
      full: (getToken('borderRadius.full') as string) || '9999px',
    };

    // Size styles
    const getSizeStyles = (): { track: React.CSSProperties; thumb: React.CSSProperties } => {
      switch (size) {
        case 'sm':
          return {
            track: { height: '4px' },
            thumb: { height: '16px', width: '16px' },
          };
        case 'lg':
          return {
            track: { height: '12px' },
            thumb: { height: '24px', width: '24px' },
          };
        default: // default
          return {
            track: { height: '8px' },
            thumb: { height: '20px', width: '20px' },
          };
      }
    };

    // Variant styles
    const getVariantStyles = (): { background: string; indicator: string; thumb: string } => {
      switch (actualVariant) {
        case 'success':
          return {
            background: colors.success?.[100] || '#dcfce7',
            indicator: colors.success?.[500] || '#22c55e',
            thumb: colors.success?.[500] || '#22c55e',
          };
        case 'warning':
          return {
            background: colors.warning?.[100] || '#fef3c7',
            indicator: colors.warning?.[500] || '#eab308',
            thumb: colors.warning?.[500] || '#eab308',
          };
        case 'destructive':
          return {
            background: colors.danger?.[100] || '#fee2e2',
            indicator: colors.danger?.[500] || '#ef4444',
            thumb: colors.danger?.[500] || '#ef4444',
          };
        case 'default':
        default:
          return {
            background: colors.neutral?.[200] || '#e5e7eb',
            indicator: colors.primary?.[500] || '#3b82f6',
            thumb: colors.primary?.[500] || '#3b82f6',
          };
      }
    };

    const sizeStyles = getSizeStyles();
    const variantStyles = getVariantStyles();

    // Container styles
    const containerStyles: React.CSSProperties = {
      position: 'relative',
    };

    // Track styles
    const trackStyles: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      flexGrow: 1,
      overflow: 'hidden',
      borderRadius: borderRadius.full,
      backgroundColor: variantStyles.background,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      outline: 'none',
      ...sizeStyles.track,
    };

    // Range fill styles
    const rangeStyles: React.CSSProperties = {
      position: 'absolute',
      height: '100%',
      backgroundColor: variantStyles.indicator,
      transition: 'all 200ms ease-in-out',
      width: `${percentage}%`,
    };

    // Thumb styles
    const thumbStyles: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: `${percentage}%`,
      transform: 'translate(-50%, -50%)',
      display: 'block',
      borderRadius: borderRadius.full,
      border: `2px solid ${variantStyles.thumb}`,
      backgroundColor: colors.background?.default || '#ffffff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'all 200ms ease-in-out',
      cursor: disabled ? 'not-allowed' : 'grab',
      pointerEvents: disabled ? 'none' : 'auto',
      ...sizeStyles.thumb,
    };

    const sliderElement = (
      <div style={containerStyles}>
        <div
          id={sliderId}
          ref={ref}
          className={className}
          style={trackStyles}
          onPointerDown={handlePointerDown}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-label={label}
          aria-describedby={displayHelperText ? `${sliderId}-helper` : undefined}
          aria-required={required}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onFocus={(e) => {
            if (!disabled) {
              e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
              e.currentTarget.style.outlineOffset = '2px';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
          {...props}
        >
          {/* Range fill */}
          <div style={rangeStyles} />

          {/* Thumb */}
          <div
            style={{
              ...thumbStyles,
              cursor: dragging ? 'grabbing' : (disabled ? 'not-allowed' : 'grab'),
            }}
          />

          {/* Tick marks */}
          {showTicks && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}>
              {Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => {
                const tickValue = min + i * step;
                const tickPercentage = getPercentage(tickValue);
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: '2px',
                      height: '100%',
                      backgroundColor: `${colors.text?.secondary || colors.neutral?.[500] || '#6b7280'}30`, // 30% opacity
                      left: `${tickPercentage}%`,
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Marks */}
          {marks && (
            <div style={{
              position: 'absolute',
              bottom: '-24px',
              left: 0,
              width: '100%',
              pointerEvents: 'none',
            }}>
              {marks.map(mark => {
                const markPercentage = getPercentage(mark.value);
                return (
                  <div
                    key={mark.value}
                    style={{
                      position: 'absolute',
                      left: `${markPercentage}%`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div style={{
                      fontSize: typography.fontSize.xs,
                      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
                      whiteSpace: 'nowrap',
                    }}>
                      {mark.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Value display */}
        {showValue && (
          <div
            style={{
              position: 'absolute',
              top: '-32px',
              left: `${percentage}%`,
              transform: 'translateX(-50%)',
              paddingLeft: spacing[2],
              paddingRight: spacing[2],
              paddingTop: spacing[1],
              paddingBottom: spacing[1],
              fontSize: typography.fontSize.xs,
              backgroundColor: colors.background?.paper || colors.background?.default || '#ffffff',
              color: colors.text?.primary || colors.neutral?.[900] || '#111827',
              borderRadius: (getToken('borderRadius.sm') as string) || '0.125rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              pointerEvents: 'none',
            }}
          >
            {formatDisplayValue(currentValue)}
          </div>
        )}
      </div>
    );

    if (!label && !displayHelperText) {
      return (
        <div style={{ paddingBottom: marks ? '32px' : '0' }}>
          {sliderElement}
        </div>
      );
    }

    const fieldStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[3],
      paddingBottom: marks ? '32px' : '0',
    };

    const labelRowStyles: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    };

    const labelStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.none,
      cursor: disabled ? 'not-allowed' : 'default',
      opacity: disabled ? 0.7 : 1,
      color: (error || errorText) ? (colors.danger?.[600] || '#dc2626') : 
             (success || successText) ? (colors.success?.[700] || '#15803d') :
             (colors.text?.primary || colors.neutral?.[900] || '#111827'),
    };

    const valueDisplayStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
    };

    const helperTextStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: (error || errorText) ? (colors.danger?.[600] || '#dc2626') :
             (success || successText) ? (colors.success?.[600] || '#16a34a') :
             (colors.text?.secondary || colors.neutral?.[500] || '#6b7280'),
    };

    const requiredStyles: React.CSSProperties = {
      color: colors.danger?.[600] || '#dc2626',
      marginLeft: spacing[1],
    };

    return (
      <div style={fieldStyles}>
        {label && (
          <div style={labelRowStyles}>
            <label htmlFor={sliderId} style={labelStyles}>
              {label}
              {required && (
                <span style={requiredStyles} aria-label="required">
                  *
                </span>
              )}
            </label>

            {showValue && (
              <span style={valueDisplayStyles}>
                {formatDisplayValue(currentValue)}
              </span>
            )}
          </div>
        )}

        {sliderElement}

        {displayHelperText && (
          <p id={`${sliderId}-helper`} style={helperTextStyles}>
            {displayHelperText}
          </p>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

