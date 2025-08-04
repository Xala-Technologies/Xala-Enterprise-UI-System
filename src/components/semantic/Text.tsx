/**
 * @fileoverview Simple Text Component v6.0.0
 * @description Minimal text component
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils/cn';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  readonly as?: 'p' | 'span' | 'div' | 'strong' | 'em' | 'small';
  readonly size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  readonly variant?: 'default' | 'muted' | 'destructive';
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ as: Component = 'p', size = 'base', variant = 'default', className, ...props }, ref) => {
    const sizeClasses = {
      xs: 'text-xs',
      sm: 'text-sm', 
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };

    const variantClasses = {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      destructive: 'text-destructive',
    };

    return React.createElement(
      Component,
      {
        ref,
        className: cn(sizeClasses[size], variantClasses[variant], className),
        ...props,
      }
    );
  }
);

Text.displayName = 'Text';