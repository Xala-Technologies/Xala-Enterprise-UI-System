/**
 * @fileoverview SSR-Safe Tooltip Component - Production Strategy Implementation
 * @description Tooltip component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput, List, ListItem, Link } from '../semantic';

/**
 * Tooltip side types
 */
export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

/**
 * Tooltip content props interface
 */
export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  readonly content: string;
  readonly side?: TooltipSide;
}

/**
 * Tooltip trigger props interface
 */
export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly content: string;
  readonly side?: TooltipSide;
  readonly disabled?: boolean;
  readonly delayDuration?: number; // Not implemented
}

/**
 * Enhanced Tooltip component with token-based styling
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      side = 'top',
      disabled = false,
      delayDuration: _delayDuration,
      className,
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    
    if (disabled || !content) {
      return <Box ref={ref} className={className}>{children}</Box>;
    }

    // Get border radius
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
    };

    // Container styles
    const containerStyles: React.CSSProperties = {
      position: 'relative',
      display: 'inline-block',
      ...style,
    };

    // Position styles based on side
    const getPositionStyles = (): React.CSSProperties => {
      switch (side) {
        case 'top':
          return {
            bottom: '100%',
            left: '50%',
            marginBottom: spacing[2],
            transform: 'translateX(-50%)',
          };
        case 'bottom':
          return {
            top: '100%',
            left: '50%',
            marginTop: spacing[2],
            transform: 'translateX(-50%)',
          };
        case 'left':
          return {
            right: '100%',
            top: '50%',
            marginRight: spacing[2],
            transform: 'translateY(-50%)',
          };
        case 'right':
          return {
            left: '100%',
            top: '50%',
            marginLeft: spacing[2],
            transform: 'translateY(-50%)',
          };
        default:
          return {};
      }
    };

    // Tooltip content styles
    const tooltipStyles: React.CSSProperties = {
      position: 'absolute',
      zIndex: 50,
      overflow: 'hidden',
      borderRadius: borderRadius.md,
      border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
      backgroundColor: colors.background?.paper || colors.background?.default || '#ffffff',
      paddingLeft: spacing[3],
      paddingRight: spacing[3],
      paddingTop: spacing[1.5],
      paddingBottom: spacing[1.5],
      fontSize: typography.fontSize.xs,
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
      boxShadow: shadows?.md || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      opacity: 0,
      visibility: 'hidden',
      transition: 'all 200ms ease-in-out',
      maxWidth: '200px',
      wordWrap: 'break-word',
      ...getPositionStyles(),
    };

    return (
      <Box 
        ref={ref} 
        className={className} 
       
        onMouseEnter={(e) => {
          const tooltip = e.currentTarget.querySelector('[role="tooltip"]') as HTMLElement;
          if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
          }
        }}
        onMouseLeave={(e) => {
          const tooltip = e.currentTarget.querySelector('[role="tooltip"]') as HTMLElement;
          if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
          }
        }}
        onFocus={(e) => {
          const tooltip = e.currentTarget.querySelector('[role="tooltip"]') as HTMLElement;
          if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
          }
        }}
        onBlur={(e) => {
          const tooltip = e.currentTarget.querySelector('[role="tooltip"]') as HTMLElement;
          if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
          }
        }}
        {...props}
      >
        {children}
        <Box
         
          role="tooltip"
          aria-live="polite"
        >
          {content}
        </Box>
      </Box>
    );
  }
);

Tooltip.displayName = 'Tooltip';

/**
 * Enhanced TooltipContent component for custom positioning with token-based styling
 */
export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ content, side = 'top', className, style, ...props }, ref): React.ReactElement => {
    
    // Get border radius
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
    };

    // Position styles based on side
    const getPositionStyles = (): React.CSSProperties => {
      switch (side) {
        case 'top':
          return {
            bottom: '100%',
            left: '50%',
            marginBottom: spacing[2],
            transform: 'translateX(-50%)',
          };
        case 'bottom':
          return {
            top: '100%',
            left: '50%',
            marginTop: spacing[2],
            transform: 'translateX(-50%)',
          };
        case 'left':
          return {
            right: '100%',
            top: '50%',
            marginRight: spacing[2],
            transform: 'translateY(-50%)',
          };
        case 'right':
          return {
            left: '100%',
            top: '50%',
            marginLeft: spacing[2],
            transform: 'translateY(-50%)',
          };
        default:
          return {};
      }
    };

    const contentStyles: React.CSSProperties = {
      position: 'absolute',
      zIndex: 50,
      overflow: 'hidden',
      borderRadius: borderRadius.md,
      border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
      backgroundColor: colors.background?.paper || colors.background?.default || '#ffffff',
      paddingLeft: spacing[3],
      paddingRight: spacing[3],
      paddingTop: spacing[1.5],
      paddingBottom: spacing[1.5],
      fontSize: typography.fontSize.xs,
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
      boxShadow: shadows?.md || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      maxWidth: '200px',
      wordWrap: 'break-word',
      ...getPositionStyles(),
      ...style,
    };

    return (
      <Box ref={ref} className={className} role="tooltip" {...props}>
        {content}
      </Box>
    );
  }
);

TooltipContent.displayName = 'TooltipContent';

/**
 * Simple TooltipTrigger wrapper component with token-based styling
 */
export const TooltipTrigger = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, style, ...props }, ref): React.ReactElement => {
    const triggerStyles: React.CSSProperties = {
      display: 'inline-block',
      ...style,
    };

    return (
      <Box ref={ref} className={className} {...props}>
        {children}
      </Box>
    );
  }
);

TooltipTrigger.displayName = 'TooltipTrigger';
