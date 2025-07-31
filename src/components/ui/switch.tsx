/**
 * @fileoverview SSR-Safe Switch Component - Production Strategy Implementation
 * @description Switch component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type InputHTMLAttributes } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Switch variant types
 */
export type SwitchVariant = 'default' | 'destructive' | 'success' | 'warning';

/**
 * Switch size types
 */
export type SwitchSize = 'sm' | 'default' | 'lg';

/**
 * Switch component props interface
 */
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  readonly variant?: SwitchVariant;
  readonly size?: SwitchSize;
  readonly label?: string;
  readonly description?: string;
  readonly error?: boolean;
  readonly errorText?: string;
  readonly required?: boolean;
  readonly onCheckedChange?: (checked: boolean) => void;
}

/**
 * Enhanced Switch component
 * @param variant - Switch variant (default, destructive, success, warning)
 * @param size - Switch size (sm, default, lg)
 * @param label - Switch label
 * @param description - Additional description text
 * @param error - Error state
 * @param errorText - Error text to display
 * @param required - Whether switch is required
 * @param checked - Checked state
 * @param disabled - Disabled state
 * @param onCheckedChange - Callback when checked state changes
 * @param className - Additional CSS classes
 * @param id - Switch ID
 * @param props - Additional input props
 * @returns Enhanced Switch JSX element
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      style,
      variant = 'default',
      size = 'default',
      label,
      description,
      error,
      errorText,
      required,
      checked = false,
      disabled,
      onCheckedChange,
      id,
      onChange,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography, getToken, shadows } = useTokens();
    
    // Generate ID if not provided and label exists
    const switchId =
      id || (label ? `switch-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    // Determine actual variant based on state
    const actualVariant = error || errorText ? 'destructive' : variant;

    // Determine switch state for aria and styling
    const switchState = checked ? 'checked' : 'unchecked';

    // Handle change events
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newChecked = event.target.checked;
        onCheckedChange?.(newChecked);
        onChange?.(event);
      },
      [onCheckedChange, onChange]
    );

    // Get border radius
    const borderRadius = {
      full: (getToken('borderRadius.full') as string) || '9999px',
    };

    // Size styles
    const getSizeStyles = (): { track: React.CSSProperties; thumb: React.CSSProperties } => {
      switch (size) {
        case 'sm':
          return {
            track: { height: '16px', width: '28px' },
            thumb: { height: '12px', width: '12px' },
          };
        case 'lg':
          return {
            track: { height: '28px', width: '48px' },
            thumb: { height: '20px', width: '20px' },
          };
        default: // default
          return {
            track: { height: '24px', width: '44px' },
            thumb: { height: '20px', width: '20px' },
          };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      const baseColor = colors.neutral?.[300] || '#d1d5db';
      
      switch (actualVariant) {
        case 'destructive':
          return {
            backgroundColor: checked ? (colors.danger?.[500] || '#ef4444') : baseColor,
          };
        case 'success':
          return {
            backgroundColor: checked ? (colors.success?.[500] || '#22c55e') : baseColor,
          };
        case 'warning':
          return {
            backgroundColor: checked ? (colors.warning?.[500] || '#eab308') : baseColor,
          };
        case 'default':
        default:
          return {
            backgroundColor: checked ? (colors.primary?.[500] || '#3b82f6') : baseColor,
          };
      }
    };

    const sizeStyles = getSizeStyles();

    // Track styles
    const trackStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      borderRadius: borderRadius.full,
      border: '2px solid transparent',
      transition: 'all 200ms ease-in-out',
      opacity: disabled ? 0.5 : 1,
      outline: 'none',
      position: 'relative',
      ...sizeStyles.track,
      ...getVariantStyles(),
      ...style,
    };

    // Thumb styles
    const getThumbTransform = (): string => {
      if (!checked) return 'translateX(0px)';
      
      switch (size) {
        case 'sm':
          return 'translateX(12px)';
        case 'lg':
          return 'translateX(20px)';
        default:
          return 'translateX(20px)';
      }
    };

    const thumbStyles: React.CSSProperties = {
      pointerEvents: 'none',
      display: 'block',
      borderRadius: borderRadius.full,
      backgroundColor: colors.background?.default || '#ffffff',
      boxShadow: shadows?.md || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'transform 200ms ease-in-out',
      transform: getThumbTransform(),
      ...sizeStyles.thumb,
    };

    // Container styles
    const containerStyles: React.CSSProperties = {
      position: 'relative',
    };

    // Input styles (visually hidden)
    const inputStyles: React.CSSProperties = {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: 0,
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: 0,
    };

    const switchElement = (
      <div style={containerStyles}>
        <input
          id={switchId}
          ref={ref}
          type="checkbox"
          role="switch"
          style={inputStyles}
          checked={checked}
          disabled={disabled}
          aria-invalid={error || !!errorText}
          aria-describedby={description || errorText ? `${switchId}-description` : undefined}
          aria-required={required}
          data-state={switchState}
          onChange={handleChange}
          {...props}
        />

        {/* Switch track */}
        <div
          className={className}
          style={trackStyles}
          data-state={switchState}
          onFocus={(e) => {
            if (!disabled) {
              e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
              e.currentTarget.style.outlineOffset = '2px';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
        >
          {/* Switch thumb */}
          <div style={thumbStyles} data-state={switchState} />
        </div>
      </div>
    );

    if (!label && !description && !errorText) {
      return switchElement;
    }

    const fieldStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[1.5],
    };

    const rowStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: spacing[3],
    };

    const labelContainerStyles: React.CSSProperties = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[1],
    };

    const labelStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.none,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.7 : 1,
      color: (error || errorText) ? (colors.danger?.[600] || '#dc2626') : (colors.text?.primary || colors.neutral?.[900] || '#111827'),
    };

    const descriptionStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
    };

    const errorStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: colors.danger?.[600] || '#dc2626',
      marginLeft: size === 'sm' ? '32px' : size === 'lg' ? '52px' : '48px',
    };

    const requiredStyles: React.CSSProperties = {
      color: colors.danger?.[600] || '#dc2626',
      marginLeft: spacing[1],
    };

    return (
      <div style={fieldStyles}>
        <div style={rowStyles}>
          {switchElement}

          {label && (
            <div style={labelContainerStyles}>
              <label htmlFor={switchId} style={labelStyles}>
                {label}
                {required && (
                  <span style={requiredStyles} aria-label="required">
                    *
                  </span>
                )}
              </label>

              {description && (
                <p id={`${switchId}-description`} style={descriptionStyles}>
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {errorText && (
          <p id={`${switchId}-description`} style={errorStyles}>
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

