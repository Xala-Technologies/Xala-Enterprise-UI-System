/**
 * Desktop Sidebar Component
 * Single responsibility: Renders the desktop sidebar with collapse/expand functionality
 */

import { cn } from '@/lib/utils/cn';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import type { DesktopSidebarProps } from '../types';
import { desktopSidebarVariants } from '../variants';

/**
 * Desktop Sidebar Component
 *
 * Features:
 * - Collapsible sidebar
 * - Resizable functionality
 * - Keyboard navigation
 * - Smooth transitions
 */
export const DesktopSidebar = forwardRef<HTMLElement, DesktopSidebarProps>(
  (
    { className,
      variant,
      size,
      collapsed = false,
      resizable = false,
      minWidth = 200,
      maxWidth = 400,
      onToggle,
      onResize,
      children,
      ...props },
    ref
  ) => { const [currentWidth, setCurrentWidth] = useState<number>(
      collapsed ? 64 : size === 'sm' ? 192 : size === 'lg' ? 256 : 224
    );

    const handleToggle = useCallback(() => { onToggle?.(!collapsed); }, [collapsed, onToggle]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => { if (event.key === 'Escape' && !collapsed) { handleToggle(); } },
      [collapsed, handleToggle]
    );

    useEffect(() => { if (collapsed) { setCurrentWidth(64); } else { const defaultWidth = size === 'sm' ? 192 : size === 'lg' ? 256 : 224;
        setCurrentWidth(defaultWidth); } }, [collapsed, size]);

    return (
      <aside
        ref={ref}
        className={cn(desktopSidebarVariants({ variant, size, collapsed }), className)}
        style={{ width: `${currentWidth}px`,
          minWidth: collapsed ? '64px' : `${minWidth}px`,
          maxWidth: collapsed ? '64px' : `${maxWidth}px`, }}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        {...props}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div
            className={cn(
              'transition-opacity duration-200',
              collapsed ? 'opacity-0' : 'opacity-100'
            )}
          >
            <h2 className="text-lg font-semibold">Navigation</h2>
          </div>

          <button
            onClick={handleToggle}
            className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              className={cn(
                'w-4 h-4 transition-transform duration-200',
                collapsed ? 'rotate-0' : 'rotate-180'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>

        {/* Resize Handle */}
        {resizable && !collapsed && (
          <div
            className="absolute right-0 top-0 bottom-0 w-1 bg-transparent hover:bg-border cursor-col-resize"
            onMouseDown={e => { e.preventDefault();
              const startX = e.clientX;
              const startWidth = currentWidth;

              const handleMouseMove = (e: MouseEvent) => { const newWidth = Math.max(
                  minWidth,
                  Math.min(maxWidth, startWidth + (e.clientX - startX))
                );
                setCurrentWidth(newWidth);
                onResize?.(newWidth); };

              const handleMouseUp = () => { document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp); };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp); }}
          />
        )}
      </aside>
    ); }
);

DesktopSidebar.displayName = 'DesktopSidebar';
