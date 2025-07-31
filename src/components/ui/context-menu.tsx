/**
 * @fileoverview SSR-Safe ContextMenu Component - Production Strategy Implementation
 * @description Context menu component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * ContextMenu component props interface
 */
export interface ContextMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  readonly children: ReactNode;
  readonly content: ReactNode;
}

/**
 * ContextMenuTrigger component props interface
 */
export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly onContextMenu?: (_event: React.MouseEvent) => void;
}

/**
 * ContextMenuContent component props interface
 */
export interface ContextMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly visible?: boolean;
  readonly x?: number;
  readonly y?: number;
}

/**
 * ContextMenuItem component props interface
 */
export interface ContextMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly disabled?: boolean;
  readonly onSelect?: () => void;
}

/**
 * Enhanced ContextMenu component
 */
export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ children, content, className, style, ...props }, ref): React.ReactElement => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleContextMenu = (event: React.MouseEvent): void => {
      event.preventDefault();
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handleClose = (): void => {
      setIsVisible(false);
    };

    const containerStyles: React.CSSProperties = {
      position: 'relative',
      ...style,
    };

    const overlayStyles: React.CSSProperties = {
      position: 'fixed',
      inset: 0,
      zIndex: 40,
    };

    const menuStyles: React.CSSProperties = {
      position: 'fixed',
      zIndex: 50,
      left: position.x,
      top: position.y,
    };

    return (
      <div ref={ref} className={className} style={containerStyles} {...props}>
        <div onContextMenu={handleContextMenu}>{children}</div>
        {isVisible && (
          <>
            <div style={overlayStyles} onClick={handleClose} />
            <div style={menuStyles}>
              {content}
            </div>
          </>
        )}
      </div>
    );
  }
);

ContextMenu.displayName = 'ContextMenu';

/**
 * Enhanced ContextMenuTrigger component
 */
export const ContextMenuTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ children, onContextMenu, className, style, ...props }, ref): React.ReactElement => {
    const triggerStyles: React.CSSProperties = {
      cursor: 'context-menu',
      ...style,
    };

    return (
      <div
        ref={ref}
        onContextMenu={onContextMenu}
        className={className}
        style={triggerStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ContextMenuTrigger.displayName = 'ContextMenuTrigger';

/**
 * Enhanced ContextMenuContent component
 */
export const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ children, visible = false, x = 0, y = 0, className, style, ...props }, ref): React.ReactElement => {
    const { colors, spacing, typography, getToken } = useTokens();
    
    if (!visible) return <></>;

    // Get border radius and shadows
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
    };
    
    const shadows = {
      md: (getToken('shadows.md') as string) || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    };

    const contentStyles: React.CSSProperties = {
      position: 'fixed',
      left: x,
      top: y,
      zIndex: 50,
      minWidth: '8rem',
      overflow: 'hidden',
      borderRadius: borderRadius.md,
      border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
      backgroundColor: colors.popover?.default || colors.background?.paper || colors.background?.default || '#ffffff',
      padding: spacing[1],
      color: colors.popover?.foreground || colors.text?.primary || colors.neutral?.[900] || '#111827',
      boxShadow: shadows.md,
      // Animation would typically be handled by CSS animations in a real implementation
      animation: 'fadeIn 150ms ease-out, scaleIn 150ms ease-out',
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={contentStyles}
        role="menu"
        {...props}
      >
        {children}
      </div>
    );
  }
);

ContextMenuContent.displayName = 'ContextMenuContent';

/**
 * Enhanced ContextMenuItem component
 */
export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ children, disabled = false, onSelect, className, style, ...props }, ref): React.ReactElement => {
    const { colors, spacing, typography, getToken } = useTokens();
    
    const handleClick = (): void => {
      if (!disabled) {
        onSelect?.();
      }
    };

    // Get border radius
    const borderRadius = {
      sm: (getToken('borderRadius.sm') as string) || '0.125rem',
    };

    const itemStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      cursor: disabled ? 'not-allowed' : 'default',
      userSelect: 'none',
      alignItems: 'center',
      borderRadius: borderRadius.sm,
      padding: `${spacing[1.5]} ${spacing[2]}`,
      fontSize: typography.fontSize.sm,
      outline: 'none',
      transition: 'all 150ms ease-in-out',
      pointerEvents: disabled ? 'none' : 'auto',
      opacity: disabled ? 0.5 : 1,
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
      ...style,
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        data-disabled={disabled}
        className={className}
        style={itemStyles}
        onClick={handleClick}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
            e.currentTarget.style.color = colors.accent?.foreground || colors.text?.primary || '#111827';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.text?.primary || colors.neutral?.[900] || '#111827';
          }
        }}
        onFocus={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
            e.currentTarget.style.color = colors.accent?.foreground || colors.text?.primary || '#111827';
          }
        }}
        onBlur={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.text?.primary || colors.neutral?.[900] || '#111827';
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ContextMenuItem.displayName = 'ContextMenuItem';