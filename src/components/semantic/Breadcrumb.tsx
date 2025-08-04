/**
 * @fileoverview Clean Breadcrumb Component v6.0.0
 * @description Minimal breadcrumb using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { Box, type BoxProps } from './Box';
import { Text } from './Text';
import { cn } from '../../lib/utils/cn';

export interface BreadcrumbProps extends BoxProps {
  readonly separator?: string;
}

export interface BreadcrumbItemProps {
  readonly href?: string;
  readonly isActive?: boolean;
  readonly children: React.ReactNode;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator = '/', className, ...props }, ref) => (
    <Box
      ref={ref}
      as="nav"
      className={cn('flex items-center space-x-1 text-sm', className)}
      aria-label="Breadcrumb"
      {...props}
    />
  )
);

export const BreadcrumbItem = forwardRef<HTMLElement, BreadcrumbItemProps>(
  ({ href, isActive = false, children, ...props }, ref) => {
    if (href) {
      return (
        <a
          ref={ref as any}
          href={href}
          className={cn(
            'hover:text-foreground/80 transition-colors',
            isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
          )}
          {...props}
        >
          {children}
        </a>
      );
    }
    
    return (
      <span
        ref={ref as any}
        className={cn(
          'hover:text-foreground/80 transition-colors',
          isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

export const BreadcrumbSeparator: React.FC<{ children?: React.ReactNode }> = ({ 
  children = '/' 
}) => (
  <Text className="text-muted-foreground select-none" aria-hidden="true">
    {children}
  </Text>
);

Breadcrumb.displayName = 'Breadcrumb';
BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';