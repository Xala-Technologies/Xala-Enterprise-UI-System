/**
 * @fileoverview SSR-Safe Tabs Components - Production Strategy Implementation
 * @description Individual tabs components using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Tabs orientation types
 */
export type TabsOrientation = 'horizontal' | 'vertical';

/**
 * TabsList component props interface
 */
export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  readonly orientation?: TabsOrientation;
}

/**
 * TabsTrigger component props interface
 */
export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  readonly value: string;
  readonly disabled?: boolean;
  readonly active?: boolean;
}

/**
 * TabsContent component props interface
 */
export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  readonly value: string;
  readonly activeValue?: string;
  readonly children: ReactNode;
}

/**
 * Enhanced TabsList component with token-based styling
 */
export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, style, orientation = 'horizontal', ...props }, ref): React.ReactElement => {
    const { colors, spacing, getToken } = useTokens();

    // Get border radius
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
    };

    // List styles
    const listStyles: React.CSSProperties = {
      display: 'inline-flex',
      height: orientation === 'vertical' ? 'auto' : '40px',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.md,
      backgroundColor: colors.neutral?.[100] || '#f3f4f6',
      padding: spacing[1],
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      ...style,
    };

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        className={className}
        style={listStyles}
        {...props}
      />
    );
  }
);

TabsList.displayName = 'TabsList';

/**
 * Enhanced TabsTrigger component with token-based styling
 */
export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, style, value, active = false, disabled = false, ...props }, ref): React.ReactElement => {
    const { colors, spacing, typography, getToken } = useTokens();

    // Get border radius
    const borderRadius = {
      sm: (getToken('borderRadius.sm') as string) || '0.125rem',
    };

    // Trigger styles
    const triggerStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      borderRadius: borderRadius.sm,
      paddingLeft: spacing[3],
      paddingRight: spacing[3],
      paddingTop: spacing[1.5],
      paddingBottom: spacing[1.5],
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      transition: 'all 150ms ease-in-out',
      outline: 'none',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      pointerEvents: disabled ? 'none' : 'auto',
      opacity: disabled ? 0.5 : 1,
      backgroundColor: active 
        ? (colors.background?.default || '#ffffff')
        : 'transparent',
      color: active 
        ? (colors.text?.primary || colors.neutral?.[900] || '#111827')
        : (colors.text?.secondary || colors.neutral?.[500] || '#6b7280'),
      boxShadow: active ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none',
      ...style,
    };

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={active}
        aria-controls={`content-${value}`}
        data-state={active ? 'active' : 'inactive'}
        data-value={value}
        disabled={disabled}
        className={className}
        style={triggerStyles}
        onFocus={(e) => {
          if (!disabled) {
            e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
            e.currentTarget.style.outlineOffset = '2px';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
        onMouseEnter={(e) => {
          if (!disabled && !active) {
            e.currentTarget.style.backgroundColor = `${colors.neutral?.[100] || '#f3f4f6'}80`; // 50% opacity
            e.currentTarget.style.color = colors.text?.primary || colors.neutral?.[900] || '#111827';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !active) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.text?.secondary || colors.neutral?.[500] || '#6b7280';
          }
        }}
        {...props}
      />
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

/**
 * Enhanced TabsContent component with token-based styling
 */
export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, style, value, activeValue, children, ...props }, ref): React.ReactElement => {
    const { colors, spacing } = useTokens();
    const isActive = value === activeValue;

    // Content styles
    const contentStyles: React.CSSProperties = {
      marginTop: spacing[2],
      outline: 'none',
      display: isActive ? 'block' : 'none',
      ...style,
    };

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`content-${value}`}
        aria-labelledby={`trigger-${value}`}
        data-state={isActive ? 'active' : 'inactive'}
        data-value={value}
        className={className}
        style={contentStyles}
        tabIndex={0}
        onFocus={(e) => {
          e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';
