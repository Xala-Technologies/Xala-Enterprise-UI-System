/**
 * Navigation Components
 * Comprehensive navigation with tabs, steps, and progress bar
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type ReactNode } from 'react';

/**
 * Tabs variants using design tokens
 */
const tabsVariants = cva(
  [
    'border-b border-border',
    'bg-background',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'border-border',
        primary: 'border-primary/20',
        secondary: 'border-secondary/20',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Steps variants using design tokens
 */
const stepsVariants = cva(
  ['flex items-center', 'transition-all duration-200', 'motion-reduce:transition-none'],
  {
    variants: {
      variant: {
        default: 'text-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary',
      },
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
    },
    defaultVariants: {
      variant: 'default',
      orientation: 'horizontal',
    },
  }
);

/**
 * Progress bar variants using design tokens
 */
const progressBarVariants = cva(
  ['w-full bg-muted rounded-full', 'transition-all duration-200', 'motion-reduce:transition-none'],
  {
    variants: {
      variant: {
        default: 'bg-muted',
        primary: 'bg-primary/10',
        secondary: 'bg-secondary/10',
      },
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Tab item interface
 */
export interface TabItem {
  /** Tab key */
  readonly key: string;
  /** Tab label */
  readonly label: string;
  /** Tab content */
  readonly content: ReactNode;
  /** Tab disabled state */
  readonly disabled?: boolean;
  /** Tab icon */
  readonly icon?: ReactNode;
}

/**
 * Step item interface
 */
export interface StepItem {
  /** Step key */
  readonly key: string;
  /** Step title */
  readonly title: string;
  /** Step description */
  readonly description?: string;
  /** Step status */
  readonly status: 'pending' | 'current' | 'completed' | 'error';
  /** Step icon */
  readonly icon?: ReactNode;
}

/**
 * Tabs Props
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Tabs variant */
  readonly variant?: 'default' | 'primary' | 'secondary';
  /** Tabs size */
  readonly size?: 'sm' | 'md' | 'lg';
  /** Tab items */
  readonly items: readonly TabItem[];
  /** Active tab key */
  readonly activeKey?: string;
  /** Tab change handler */
  readonly onChange?: (key: string) => void;
}

/**
 * Steps Props
 */
export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Steps variant */
  readonly variant?: 'default' | 'primary' | 'secondary';
  /** Steps orientation */
  readonly orientation?: 'horizontal' | 'vertical';
  /** Step items */
  readonly items: readonly StepItem[];
  /** Current step key */
  readonly currentKey?: string;
  /** Step click handler */
  readonly onStepClick?: (key: string) => void;
}

/**
 * Progress Bar Props
 */
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress variant */
  readonly variant?: 'default' | 'primary' | 'secondary';
  /** Progress size */
  readonly size?: 'sm' | 'md' | 'lg';
  /** Progress value (0-100) */
  readonly value: number;
  /** Progress label */
  readonly label?: string;
  /** Show percentage */
  readonly showPercentage?: boolean;
}

/**
 * Tabs Component
 * @param props - Tabs properties
 * @returns React.ReactElement
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    { variant = 'default', size = 'md', items, activeKey, onChange, className, ...props },
    ref
  ): React.ReactElement => {
    const currentActiveKey = activeKey || items[0]?.key;

    const handleTabClick = (key: string): void => {
      onChange?.(key);
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {/* Tab Headers */}
        <div className={cn(tabsVariants({ variant, size }))}>
          <div className="flex space-x-8">
            {items.map(item => (
              <button
                key={item.key}
                onClick={() => handleTabClick(item.key)}
                disabled={item.disabled}
                className={cn(
                  'px-1 py-4 font-medium border-b-2 transition-colors',
                  'hover:text-foreground hover:border-border',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  currentActiveKey === item.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground'
                )}
                aria-selected={currentActiveKey === item.key}
                role="tab"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {items.map(item => (
            <div
              key={item.key}
              className={cn(
                'transition-all duration-200',
                currentActiveKey === item.key ? 'block' : 'hidden'
              )}
              role="tabpanel"
              aria-hidden={currentActiveKey !== item.key}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

/**
 * Steps Component
 * @param props - Steps properties
 * @returns React.ReactElement
 */
export const Steps = forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      variant = 'default',
      orientation = 'horizontal',
      items,
      currentKey,
      onStepClick,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(
          stepsVariants({ variant, orientation }),
          orientation === 'vertical' && 'space-y-4',
          className
        )}
        {...props}
      >
        {items.map((item, index) => (
          <div
            key={item.key}
            className={cn(
              'flex items-center',
              orientation === 'horizontal' && index < items.length - 1 && 'flex-1'
            )}
          >
            {/* Step Circle */}
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors',
                item.status === 'completed' && 'bg-primary border-primary text-primary-foreground',
                item.status === 'current' && 'bg-primary border-primary text-primary-foreground',
                item.status === 'pending' &&
                  'bg-background border-muted-foreground text-muted-foreground',
                item.status === 'error' &&
                  'bg-destructive border-destructive text-destructive-foreground',
                onStepClick && 'cursor-pointer hover:border-primary'
              )}
              onClick={() => onStepClick?.(item.key)}
            >
              {item.icon || <span className="text-sm font-medium">{index + 1}</span>}
            </div>

            {/* Step Content */}
            <div className="ml-3">
              <div className="text-sm font-medium text-foreground">{item.title}</div>
              {item.description && (
                <div className="text-xs text-muted-foreground">{item.description}</div>
              )}
            </div>

            {/* Connector */}
            {orientation === 'horizontal' && index < items.length - 1 && (
              <div className="flex-1 h-0.5 mx-4 bg-muted" />
            )}
          </div>
        ))}
      </div>
    );
  }
);

Steps.displayName = 'Steps';

/**
 * Progress Bar Component
 * @param props - Progress bar properties
 * @returns React.ReactElement
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    { variant = 'default', size = 'md', value, label, showPercentage = false, className, ...props },
    ref
  ): React.ReactElement => {
    const clampedValue = Math.min(Math.max(value, 0), 100);

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {/* Progress Label */}
        {(label || showPercentage) && (
          <div className="flex items-center justify-between mb-2">
            {label && <span className="text-sm font-medium text-foreground">{label}</span>}
            {showPercentage && (
              <span className="text-sm text-muted-foreground">{Math.round(clampedValue)}%</span>
            )}
          </div>
        )}

        {/* Progress Bar */}
        <div className={cn(progressBarVariants({ variant, size }))}>
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300',
              variant === 'primary' && 'bg-primary',
              variant === 'secondary' && 'bg-secondary',
              variant === 'default' && 'bg-primary'
            )}
            style={{ width: `${clampedValue}%` }}
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

/**
 * Navigation component variants and types
 */
export type TabsVariant = VariantProps<typeof tabsVariants>;
export type StepsVariant = VariantProps<typeof stepsVariants>;
export type ProgressBarVariant = VariantProps<typeof progressBarVariants>;

export { progressBarVariants, stepsVariants, tabsVariants };
