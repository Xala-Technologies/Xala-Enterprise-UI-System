/**
 * Divider component with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Divider variants using class-variance-authority
 */
const dividerVariants = cva('border-border', {
  variants: {
    orientation: {
      horizontal: 'w-full border-t',
      vertical: 'h-full border-l',
    },
    variant: {
      default: 'border-border',
      primary: 'border-primary/30',
      secondary: 'border-secondary/30',
      muted: 'border-muted-foreground/20',
      destructive: 'border-destructive/30',
      success: 'border-green-500/30',
      warning: 'border-yellow-500/30',
    },
    size: {
      sm: '',
      default: '',
      lg: '',
    },
    style: {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    },
  },
  compoundVariants: [
    // Horizontal divider sizes
    {
      orientation: 'horizontal',
      size: 'sm',
      className: 'border-t-[0.5px]',
    },
    {
      orientation: 'horizontal',
      size: 'default',
      className: 'border-t',
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      className: 'border-t-2',
    },
    // Vertical divider sizes
    {
      orientation: 'vertical',
      size: 'sm',
      className: 'border-l-[0.5px]',
    },
    {
      orientation: 'vertical',
      size: 'default',
      className: 'border-l',
    },
    {
      orientation: 'vertical',
      size: 'lg',
      className: 'border-l-2',
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'default',
    size: 'default',
    style: 'solid',
  },
});

/**
 * Divider component props interface
 */
export interface DividerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'>,
    VariantProps<typeof dividerVariants> {
  readonly label?: string;
  readonly labelPosition?: 'left' | 'center' | 'right';
  readonly spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  readonly decorative?: boolean;
}

/**
 * Enhanced Divider component
 * @param orientation - Divider orientation (horizontal, vertical)
 * @param variant - Divider variant (default, primary, secondary, muted, destructive, success, warning)
 * @param size - Divider thickness (sm, default, lg)
 * @param style - Border style (solid, dashed, dotted)
 * @param label - Optional label text to display on the divider
 * @param labelPosition - Position of the label (left, center, right)
 * @param spacing - Spacing around the divider (none, sm, md, lg, xl)
 * @param decorative - Whether the divider is purely decorative (affects accessibility)
 * @param className - Additional CSS classes
 * @returns Enhanced Divider JSX element
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'default',
      size = 'default',
      style = 'solid',
      label,
      labelPosition = 'center',
      spacing = 'md',
      decorative = true,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const spacingClasses = {
      none: '',
      sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
      md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
      lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
      xl: orientation === 'horizontal' ? 'my-8' : 'mx-8',
    };

    // Simple divider without label
    if (!label) {
      return (
        <div
          ref={ref}
          role={decorative ? 'presentation' : 'separator'}
          aria-orientation={orientation || undefined}
          className={cn(
            dividerVariants({ orientation, variant, size, style }),
            spacingClasses[spacing],
            className
          )}
          {...props}
        />
      );
    }

    // Labeled divider (only for horizontal orientation)
    if (orientation === 'vertical') {
      // Labels are not supported with vertical orientation
      return (
        <div
          ref={ref}
          role={decorative ? 'presentation' : 'separator'}
          aria-orientation={orientation || undefined}
          className={cn(
            dividerVariants({ orientation, variant, size, style }),
            spacingClasses[spacing],
            className
          )}
          {...props}
        />
      );
    }

    const labelPositionClasses = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    };

    return (
      <div
        ref={ref}
        role={decorative ? 'presentation' : 'separator'}
        aria-label={!decorative ? label : undefined}
        className={cn('flex items-center', spacingClasses[spacing], className)}
        {...props}
      >
        {/* Left divider line (hidden when label is on the left) */}
        {labelPosition !== 'left' && (
          <div className={cn('flex-1', dividerVariants({ orientation, variant, size, style }))} />
        )}

        {/* Label */}
        <div
          className={cn(
            'flex',
            labelPositionClasses[labelPosition],
            labelPosition === 'center' ? 'px-3' : labelPosition === 'right' ? 'pl-3' : 'pr-3'
          )}
        >
          <span className="text-sm font-medium text-muted-foreground bg-background px-2">
            {label}
          </span>
        </div>

        {/* Right divider line (hidden when label is on the right) */}
        {labelPosition !== 'right' && (
          <div className={cn('flex-1', dividerVariants({ orientation, variant, size, style }))} />
        )}
      </div>
    );
  }
);

Divider.displayName = 'Divider';

/**
 * Divider variants type exports
 */
export type DividerVariant = VariantProps<typeof dividerVariants>['variant'];
export type DividerSize = VariantProps<typeof dividerVariants>['size'];
export type DividerOrientation = VariantProps<typeof dividerVariants>['orientation'];
export type DividerStyle = VariantProps<typeof dividerVariants>['style'];
