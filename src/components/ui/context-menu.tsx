/**
 * ContextMenu components with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';

/**
 * Context menu content variants
 */
const contextMenuContentVariants = cva([
  'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1',
  'text-popover-foreground shadow-md',
  'animate-in fade-in-0 zoom-in-95',
]);

/**
 * Context menu item variants
 */
const contextMenuItemVariants = cva([
  'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5',
  'text-sm outline-none transition-colors',
  'focus:bg-accent focus:text-accent-foreground',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
]);

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
export interface ContextMenuContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contextMenuContentVariants> {
  readonly children: ReactNode;
  readonly visible?: boolean;
  readonly x?: number;
  readonly y?: number;
}

/**
 * ContextMenuItem component props interface
 */
export interface ContextMenuItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contextMenuItemVariants> {
  readonly children: ReactNode;
  readonly disabled?: boolean;
  readonly onSelect?: () => void;
}

/**
 * Enhanced ContextMenu component
 * @param children - Trigger element
 * @param content - Context menu content
 * @param className - Additional CSS classes
 * @returns ContextMenu JSX element
 */
export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ children, content, className, ...props }, ref): React.ReactElement => {
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

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        <div onContextMenu={handleContextMenu}>{children}</div>
        {isVisible && (
          <>
            <div className="fixed inset-0 z-40" onClick={handleClose} />
            <div className="fixed z-50" style={{ left: position.x, top: position.y }}>
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
 * @param children - Trigger content
 * @param onContextMenu - Context menu handler
 * @param className - Additional CSS classes
 * @returns ContextMenuTrigger JSX element
 */
export const ContextMenuTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ children, onContextMenu, className, ...props }, ref): React.ReactElement => {
    return (
      <div
        ref={ref}
        onContextMenu={onContextMenu}
        className={cn('cursor-context-menu', className)}
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
 * @param children - Menu items
 * @param visible - Visibility state
 * @param x - X position
 * @param y - Y position
 * @param className - Additional CSS classes
 * @returns ContextMenuContent JSX element
 */
export const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ children, visible = false, x = 0, y = 0, className, ...props }, ref): React.ReactElement => {
    if (!visible) return <></>;

    return (
      <div
        ref={ref}
        className={cn(contextMenuContentVariants(), className)}
        style={{ position: 'fixed', left: x, top: y }}
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
 * @param children - Item content
 * @param disabled - Disabled state
 * @param onSelect - Selection handler
 * @param className - Additional CSS classes
 * @returns ContextMenuItem JSX element
 */
export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ children, disabled = false, onSelect, className, ...props }, ref): React.ReactElement => {
    const handleClick = (): void => {
      if (!disabled) {
        onSelect?.();
      }
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        data-disabled={disabled}
        className={cn(contextMenuItemVariants(), className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ContextMenuItem.displayName = 'ContextMenuItem';
