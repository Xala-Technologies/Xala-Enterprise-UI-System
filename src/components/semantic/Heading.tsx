/**
 * @fileoverview Clean Heading Component v6.0.0
 * @description Minimal heading using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

const headingVariants = cva(
  'font-semibold text-foreground',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      size: 'lg',
      align: 'left',
    },
  }
);

export interface HeadingProps 
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  readonly level?: HeadingLevel;
  readonly as?: `h${HeadingLevel}`;
}

const getDefaultSize = (level: HeadingLevel): HeadingSize => {
  switch (level) {
    case 1: return '4xl';
    case 2: return '3xl';
    case 3: return '2xl';
    case 4: return 'xl';
    case 5: return 'lg';
    case 6: return 'md';
    default: return 'lg';
  }
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, as, size, align, className, children, ...props }, ref) => {
    const Component = as || `h${level}`;
    const finalSize = size || getDefaultSize(level);
    
    return React.createElement(
      Component,
      {
        ref,
        className: cn(headingVariants({ size: finalSize, align }), className),
        ...props,
      },
      children
    );
  }
);

Heading.displayName = 'Heading';