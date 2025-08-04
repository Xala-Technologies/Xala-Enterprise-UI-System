/**
 * @fileoverview SSR-Safe ContextMenu Component - Production Strategy Implementation
 * @description Context menu component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import {
  Box,
  Text,
  Heading,
  List,
  ListItem,
  Link,
} from '../semantic';

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
      <Box ref={ref} className={className} {...props}>
        <Box onContextMenu={handleContextMenu}>{children}</Box>
        {isVisible && (
          <>
            <Box onClick={handleClose} />
            <Box>{content}</Box>
          </>
        )}
      </Box>
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
      <Box ref={ref} onContextMenu={onContextMenu} className={className} {...props}>
        {children}
      </Box>
    );
  }
);

ContextMenuTrigger.displayName = 'ContextMenuTrigger';

/**
 * Enhanced ContextMenuContent component
 */
export const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  (
    { children, visible = false, x = 0, y = 0, className, style, ...props },
    ref
  ): React.ReactElement => {
    if (!visible) return <></>;

    // Get border radius and shadows
    const borderRadius = {
      md: '0.375rem',
    };

    const shadows = {
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    };

    const contentStyles: React.CSSProperties = {
      position: 'fixed',
      left: x,
      top: y,
      zIndex: 50,
      minWidth: '8rem',
      overflow: 'hidden',
      borderRadius: borderRadius.md,
      border: '1px solid #e5e7eb',
      backgroundColor: '#ffffff',
      padding: '0.25rem',
      color: '#111827',
      boxShadow: shadows.md,
      // Animation would typically be handled by CSS animations in a real implementation
      animation: 'fadeIn 150ms ease-out, scaleIn 150ms ease-out',
      ...style,
    };

    return (
      <Box ref={ref} className={className} role="menu" {...props}>
        {children}
      </Box>
    );
  }
);

ContextMenuContent.displayName = 'ContextMenuContent';

/**
 * Enhanced ContextMenuItem component
 */
export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  (
    { children, disabled = false, onSelect, className, style, ...props },
    ref
  ): React.ReactElement => {
    const handleClick = (): void => {
      if (!disabled) {
        onSelect?.();
      }
    };

    // Get border radius
    const borderRadius = {
      sm: '0.125rem',
    };

    const itemStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      cursor: disabled ? 'not-allowed' : 'default',
      userSelect: 'none',
      alignItems: 'center',
      borderRadius: borderRadius.sm,
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
      outline: 'none',
      transition: 'all 150ms ease-in-out',
      pointerEvents: disabled ? 'none' : 'auto',
      opacity: disabled ? 0.5 : 1,
      color: '#111827',
      ...style,
    };

    return (
      <Box
        ref={ref}
        role="menuitem"
        data-disabled={disabled}
        className={className}
        onClick={handleClick}
        onMouseEnter={e => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.color = '#111827';
          }
        }}
        onMouseLeave={e => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#111827';
          }
        }}
        onFocus={e => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.color = '#111827';
          }
        }}
        onBlur={e => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#111827';
          }
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

ContextMenuItem.displayName = 'ContextMenuItem';
