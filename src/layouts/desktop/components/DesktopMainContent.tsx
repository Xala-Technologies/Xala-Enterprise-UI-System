/**
 * Desktop Main Content Component
 * Single responsibility: Renders the main content area with scrolling and layout options
 */

import { cn } from '@/lib/utils/cn';
import { forwardRef } from 'react';
import type { DesktopMainContentProps } from '../types';
import { desktopMainContentVariants } from '../variants';

/**
 * Desktop Main Content Component
 *
 * Features:
 * - Scrollable content area
 * - Max width constraint
 * - Centered layout option
 * - Flexible padding
 */
export const DesktopMainContent = forwardRef<HTMLElement, DesktopMainContentProps>(
  (
    {
      className,
      variant,
      padding,
      scrollable = true,
      maxWidth = false,
      centered = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <main
        ref={ref}
        className={cn(
          desktopMainContentVariants({ variant, padding }),
          {
            'overflow-y-auto': scrollable,
            'max-w-7xl': maxWidth,
            'mx-auto': centered,
          },
          className
        )}
        {...props}
      >
        {children}
      </main>
    );
  }
);

DesktopMainContent.displayName = 'DesktopMainContent';
