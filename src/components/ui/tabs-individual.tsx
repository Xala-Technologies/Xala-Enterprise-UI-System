/**
 * Individual Tabs components with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

/**
 * Tabs list variants using class-variance-authority
 */
const tabsListVariants = cva(
  'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col h-auto',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

/**
 * Tabs trigger variants using class-variance-authority
 */
const tabsTriggerVariants = cva([
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5',
  'text-sm font-medium ring-offset-background transition-all',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  'focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  'data-[state=active]:bg-background data-[state=active]:text-foreground',
  'data-[state=active]:shadow-sm',
]);

/**
 * TabsList component props interface
 */
export interface TabsListProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {}

/**
 * TabsTrigger component props interface
 */
export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  readonly value: string;
  readonly disabled?: boolean;
  readonly active?: boolean;
}

/**
 * TabsContent component props interface
 */
export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  readonly value: string;
  readonly activeValue?: string;
  readonly children: ReactNode;
}

/**
 * Enhanced TabsList component
 * @param orientation - Tabs orientation (horizontal, vertical)
 * @param className - Additional CSS classes
 * @returns TabsList JSX element
 */
export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, orientation = 'horizontal', ...props }, ref): React.ReactElement => {
    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation || undefined}
        className={cn(tabsListVariants({ orientation }), className)}
        {...props}
      />
    );
  }
);

TabsList.displayName = 'TabsList';

/**
 * Enhanced TabsTrigger component
 * @param value - Tab value identifier
 * @param active - Whether tab is active
 * @param disabled - Whether tab is disabled
 * @param className - Additional CSS classes
 * @returns TabsTrigger JSX element
 */
export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, active = false, disabled = false, ...props }, ref): React.ReactElement => {
    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={active}
        aria-controls={`content-${value}`}
        data-state={active ? 'active' : 'inactive'}
        data-value={value}
        disabled={disabled}
        className={cn(tabsTriggerVariants(), className)}
        {...props}
      />
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

/**
 * Enhanced TabsContent component
 * @param value - Content value identifier
 * @param activeValue - Currently active tab value
 * @param children - Content to display
 * @param className - Additional CSS classes
 * @returns TabsContent JSX element
 */
export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, activeValue, children, ...props }, ref): React.ReactElement => {
    const isActive = value === activeValue;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`content-${value}`}
        aria-labelledby={`trigger-${value}`}
        data-state={isActive ? 'active' : 'inactive'}
        data-value={value}
        className={cn(
          'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-ring focus-visible:ring-offset-2',
          !isActive && 'hidden',
          className
        )}
        tabIndex={0}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';

/**
 * Tabs variants type exports
 */
export type TabsOrientation = VariantProps<typeof tabsListVariants>['orientation'];
