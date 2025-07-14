/**
 * Desktop Layout Component
 * Single responsibility: Composes header, sidebar, content, toolbar, and status bar
 */

import { cn } from '@/lib/utils/cn';
import { forwardRef } from 'react';
import type { DesktopLayoutProps } from '../types';

/**
 * Desktop Layout Component
 *
 * Features:
 * - Flexible layout composition
 * - Full height layout
 * - Responsive design
 * - Keyboard navigation support
 */
export const DesktopLayout = forwardRef<HTMLDivElement, DesktopLayoutProps>(
  (
    { className,
      header,
      sidebar,
      toolbar,
      statusBar,
      fullHeight = true,
      responsive = true,
      children,
      ...props },
    ref
  ) => { return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col',
          { 'h-screen': fullHeight,
            'min-h-screen': !fullHeight,
            'md:flex-row': responsive, },
          className
        )}
        {...props}
      >
        {/* Header */}
        {header && <div className="flex-shrink-0">{header}</div>}

        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          {sidebar && <div className="flex-shrink-0">{sidebar}</div>}

          {/* Content area */}
          <div className="flex flex-1 flex-col">
            {/* Toolbar */}
            {toolbar && <div className="flex-shrink-0">{toolbar}</div>}

            {/* Main content */}
            <div className="flex-1 overflow-auto">{children}</div>

            {/* Status bar */}
            {statusBar && <div className="flex-shrink-0">{statusBar}</div>}
          </div>
        </div>
      </div>
    ); }
);

DesktopLayout.displayName = 'DesktopLayout';
