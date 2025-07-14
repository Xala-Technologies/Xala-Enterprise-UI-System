/**
 * Desktop Toolbar Component
 * Single responsibility: Renders the desktop toolbar with left, center, and right items
 */

import { cn } from '@/lib/utils/cn';
import { forwardRef } from 'react';
import type { DesktopToolbarProps } from '../types';
import { desktopToolbarVariants } from '../variants';

/**
 * Desktop Toolbar Component
 *
 * Features:
 * - Left, center, and right aligned items
 * - Sticky positioning
 * - Flexible sizing
 * - Blur effect support
 */
export const DesktopToolbar = forwardRef<HTMLElement, DesktopToolbarProps>(
  (
    { className,
      variant,
      size,
      leftItems,
      centerItems,
      rightItems,
      sticky = false,
      children,
      ...props },
    ref
  ) => { return (
      <div
        ref={ref}
        className={cn(
          desktopToolbarVariants({ variant, size }),
          { 'sticky top-0': sticky, },
          className
        )}
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

DesktopToolbar.displayName = 'DesktopToolbar';
