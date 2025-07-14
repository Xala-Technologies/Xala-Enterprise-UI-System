/**
 * Desktop Status Bar Component
 * Single responsibility: Renders the desktop status bar with left, center, and right items
 */

import { cn } from '@/lib/utils/cn';
import { forwardRef } from 'react';
import type { DesktopStatusBarProps } from '../types';
import { desktopStatusBarVariants } from '../variants';

/**
 * Desktop Status Bar Component
 *
 * Features:
 * - Left, center, and right aligned items
 * - Small text for status information
 * - Flexible sizing
 * - Accessible status updates
 */
export const DesktopStatusBar = forwardRef<HTMLElement, DesktopStatusBarProps>(
  ({ className, variant, size, leftItems, centerItems, rightItems, children, ...props }, ref) => { return (
      <div
        ref={ref}
        className={cn(desktopStatusBarVariants({ variant, size }), className)}
        role="status"
        aria-live="polite"
        {...props}
      >
        {leftItems && <div className="flex items-center gap-2">{leftItems}</div>}

        {centerItems && (
          <div className="flex-1 flex items-center justify-center gap-2">{centerItems}</div>
        )}

        {rightItems && <div className="flex items-center gap-2">{rightItems}</div>}

        {children}
      </div>
    ); }
);

DesktopStatusBar.displayName = 'DesktopStatusBar';
