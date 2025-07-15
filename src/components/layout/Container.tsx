/**
 * @fileoverview Container Component - Enterprise Standards Compliant
 * @description Pure container layout component using design tokens
 * @version 5.0.0
 * @compliance Pure component, no hooks, uses design tokens
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type HTMLAttributes } from 'react';

/**
 * Container variants using design tokens
 */
const containerVariants = cva(
  'w-full box-border min-w-0', // Base classes
  {
    variants: {
      maxWidth: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-full',
        none: 'max-w-none',
      },
      padding: {
        none: 'p-0',
        sm: 'px-3 py-2',
        md: 'p-4',
        lg: 'p-6',
      },
      centered: {
        true: 'mx-auto',
        false: 'mx-0',
      },
      fluid: {
        true: 'w-full max-w-none',
        false: '',
      },
    },
    defaultVariants: {
      maxWidth: 'lg',
      padding: 'md',
      centered: true,
      fluid: false,
    },
  }
);

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  readonly children: React.ReactNode;
  readonly 'data-testid'?: string;
}

/**
 * Container component using design tokens and semantic props
 * Pure presentational component with no hooks
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      maxWidth,
      padding,
      centered,
      fluid,
      className,
      'data-testid': testId,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(
          containerVariants({
            maxWidth,
            padding,
            centered,
            fluid,
          }),
          className
        )}
        data-testid={testId}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
