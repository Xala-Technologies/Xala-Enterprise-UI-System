/**
 * @fileoverview Clean List Components v6.0.0
 * @description Essential list components using semantic HTML
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils/cn';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  readonly as?: 'ul' | 'ol' | 'dl';
  readonly variant?: 'default' | 'unstyled' | 'disc' | 'decimal';
  readonly size?: 'sm' | 'md' | 'lg';
}

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  readonly active?: boolean;
}

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({ as: Component = 'ul', variant = 'default', size = 'md', className, ...props }, ref) => {
    const variantClasses = {
      default: Component === 'ol' ? 'list-decimal list-inside' : 'list-disc list-inside',
      unstyled: 'list-none',
      disc: 'list-disc list-inside',
      decimal: 'list-decimal list-inside',
    };

    const sizeClasses = {
      sm: 'text-sm space-y-1',
      md: 'text-base space-y-2',
      lg: 'text-lg space-y-3',
    };

    return React.createElement(
      Component,
      {
        ref,
        className: cn(variantClasses[variant], sizeClasses[size], className),
        ...props,
      }
    );
  }
);

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ active = false, className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        'transition-colors',
        active && 'font-medium text-primary',
        className
      )}
      {...props}
    />
  )
);

// Convenience exports
export const UnorderedList = forwardRef<HTMLUListElement, Omit<ListProps, 'as'>>(
  (props, ref) => <List ref={ref} as="ul" {...props} />
);

export const OrderedList = forwardRef<HTMLOListElement, Omit<ListProps, 'as'>>(
  (props, ref) => <List ref={ref} as="ol" {...props} />
);

export const DescriptionList = forwardRef<HTMLDListElement, React.HTMLAttributes<HTMLDListElement>>(
  ({ className, ...props }, ref) => (
    <dl ref={ref} className={cn('space-y-2', className)} {...props} />
  )
);

export const DescriptionTerm = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <dt ref={ref} className={cn('font-medium text-foreground', className)} {...props} />
  )
);

export const DescriptionDetails = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <dd ref={ref} className={cn('text-muted-foreground ml-4', className)} {...props} />
  )
);

List.displayName = 'List';
ListItem.displayName = 'ListItem';
UnorderedList.displayName = 'UnorderedList';
OrderedList.displayName = 'OrderedList';
DescriptionList.displayName = 'DescriptionList';
DescriptionTerm.displayName = 'DescriptionTerm';
DescriptionDetails.displayName = 'DescriptionDetails';