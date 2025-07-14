/**
 * Desktop Header Component
 * Single responsibility: Renders the desktop header with logo, navigation, and actions
 */

import { cn } from '@/lib/utils/cn';
import { forwardRef } from 'react';
import type { DesktopHeaderProps } from '../types';
import { desktopHeaderVariants } from '../variants';

/**
 * Desktop Header Component
 *
 * Features:
 * - Logo or brand element
 * - Navigation items
 * - Action items (search, user menu, etc.)
 * - Sticky positioning
 * - Blur effect support
 */
export const DesktopHeader = forwardRef<HTMLElement, DesktopHeaderProps>(
  (
    { className,
      variant,
      size,
      logo,
      navigation,
      actions,
      sticky = true,
      blur = true,
      children,
      ...props },
    ref
  ) => { return (
      <header
        ref={ref}
        className={cn(
          desktopHeaderVariants({ variant, size }),
          { 'sticky top-0': sticky,
            'backdrop-blur supports-[backdrop-filter]:bg-background/60': blur, },
          className
        )}
        {...props}
      >
        {logo && <div className="flex items-center">{logo}</div>}

        {navigation && <nav className="flex-1 flex items-center justify-center">{navigation}</nav>}

        {actions && <div className="flex items-center gap-2">{actions}</div>}

        {children}
      </header>
    ); }
);

DesktopHeader.displayName = 'DesktopHeader';
