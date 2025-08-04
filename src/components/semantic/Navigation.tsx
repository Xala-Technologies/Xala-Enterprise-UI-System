/**
 * @fileoverview Clean Navigation Component v6.0.0
 * @description Minimal navigation using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { Box, type BoxProps } from './Box';
import { Button } from './Button';
import { cn } from '../../lib/utils/cn';

export type NavigationIntent = 'primary' | 'secondary' | 'sidebar' | 'footer' | 'breadcrumb';

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  readonly intent?: NavigationIntent;
  readonly vertical?: boolean;
}

export interface NavigationItemProps {
  readonly href?: string;
  readonly isActive?: boolean;
  readonly disabled?: boolean;
  readonly onClick?: () => void;
  readonly children: React.ReactNode;
}

export const Navigation = forwardRef<HTMLElement, NavigationProps>(
  ({ intent = 'primary', vertical = false, className, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        'flex gap-2',
        vertical ? 'flex-col' : 'flex-row items-center',
        intent === 'sidebar' && 'flex-col space-y-1',
        intent === 'footer' && 'justify-center',
        className
      )}
      {...props}
    />
  )
);

export const NavigationItem = forwardRef<HTMLElement, NavigationItemProps>(
  ({ href, isActive = false, disabled = false, onClick, children, ...props }, ref) => {
    if (href) {
      return (
        <a
          ref={ref as any}
          href={href}
          className={cn(
            'px-3 py-2 rounded-md text-sm transition-colors',
            isActive 
              ? 'bg-primary text-primary-foreground' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted',
            disabled && 'opacity-50 pointer-events-none'
          )}
          aria-current={isActive ? 'page' : undefined}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as any}
        className={cn(
          'px-3 py-2 rounded-md text-sm transition-colors',
          isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground hover:bg-muted',
          disabled && 'opacity-50 pointer-events-none'
        )}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Navigation.displayName = 'Navigation';
NavigationItem.displayName = 'NavigationItem';