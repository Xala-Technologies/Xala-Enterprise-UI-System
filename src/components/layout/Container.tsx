/**
 * Container layout component with responsive design and enterprise compliance
 * Uses design tokens and CSS variables for spacing and breakpoints
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Container variants using class-variance-authority
 */
const containerVariants = cva('w-full mx-auto', {
  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
      full: 'max-w-full',
      screen: 'max-w-screen-xl',
    },
    padding: {
      none: 'px-0',
      sm: 'px-4',
      md: 'px-6',
      lg: 'px-8',
      xl: 'px-12',
      '2xl': 'px-16',
    },
    center: {
      true: 'flex items-center justify-center',
      false: '',
    },
  },
  defaultVariants: {
    size: 'full',
    padding: 'md',
    center: false,
  },
});

/**
 * Container component props interface
 */
export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  readonly as?: keyof JSX.IntrinsicElements;
}

/**
 * Container component
 * @param size - Container max width
 * @param padding - Container padding
 * @param center - Center content
 * @param className - Additional CSS classes
 * @param as - HTML element type
 * @param props - Additional props
 * @returns Container JSX element
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, center, as: Component = 'div', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(containerVariants({ size, padding, center }), className)}
      {...props}
    />
  )
);

Container.displayName = 'Container';

/**
 * Container variants type exports
 */
export type ContainerSize = VariantProps<typeof containerVariants>['size'];
export type ContainerPadding = VariantProps<typeof containerVariants>['padding'];
