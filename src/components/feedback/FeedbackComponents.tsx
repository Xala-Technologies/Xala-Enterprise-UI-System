/**
 * Feedback Components
 * Comprehensive feedback with spinner, alerts, notifications, and badges
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type ReactNode } from 'react';

/**
 * Spinner variants using design tokens
 */
const spinnerVariants = cva(
  [
    'animate-spin rounded-full border-2 border-current',
    'border-t-transparent',
    'transition-all duration-200',
    'motion-reduce:animate-none',
  ],
  {
    variants: {
      variant: {
        default: 'text-primary',
        primary: 'text-primary',
        secondary: 'text-secondary',
        muted: 'text-muted-foreground',
      },
      size: {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Alert variants using design tokens
 */
const alertVariants = cva(
  [
    'relative w-full rounded-md border p-4',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        destructive: 'bg-destructive/15 text-destructive-foreground border-destructive/50',
        success: 'bg-green-50 text-green-900 border-green-200',
        warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
        info: 'bg-blue-50 text-blue-900 border-blue-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Badge variants using design tokens
 */
const badgeVariants = cva(
  [
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        info: 'bg-blue-100 text-blue-800',
        outline: 'border border-border text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Notification variants using design tokens
 */
const notificationVariants = cva(
  [
    'relative w-full max-w-sm rounded-md border p-4 shadow-lg',
    'bg-background text-foreground',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'border-border',
        success: 'border-green-200 bg-green-50 text-green-900',
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-900',
        error: 'border-red-200 bg-red-50 text-red-900',
        info: 'border-blue-200 bg-blue-50 text-blue-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Spinner Props
 */
export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spinner variant */
  readonly variant?: 'default' | 'primary' | 'secondary' | 'muted';
  /** Spinner size */
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Spinner label */
  readonly label?: string;
}

/**
 * Alert Props
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alert variant */
  readonly variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  /** Alert title */
  readonly title?: string;
  /** Alert description */
  readonly description?: string;
  /** Alert icon */
  readonly icon?: ReactNode;
  /** Alert dismissible */
  readonly dismissible?: boolean;
  /** Alert dismiss handler */
  readonly onDismiss?: () => void;
}

/**
 * Badge Props
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  readonly variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'info'
    | 'outline';
  /** Badge content */
  readonly children: ReactNode;
}

/**
 * Notification Props
 */
export interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Notification variant */
  readonly variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Notification title */
  readonly title?: string;
  /** Notification description */
  readonly description?: string;
  /** Notification icon */
  readonly icon?: ReactNode;
  /** Notification dismissible */
  readonly dismissible?: boolean;
  /** Notification dismiss handler */
  readonly onDismiss?: () => void;
  /** Notification actions */
  readonly actions?: ReactNode;
}

/**
 * Spinner Component
 * @param props - Spinner properties
 * @returns React.ReactElement
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ variant = 'default', size = 'md', label, className, ...props }, ref): React.ReactElement => {
  return (
      <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
        <div
          className={cn(spinnerVariants({ variant, size }))}
          role="status"
          aria-label={label || 'Loading'}
        >
          <span className="sr-only">{label || 'Loading'}</span>
        </div>
        {label && <span className="text-sm text-muted-foreground">{label}</span>}
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

/**
 * Alert Component
 * @param props - Alert properties
 * @returns React.ReactElement
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'default',
      title,
      description,
      icon,
      dismissible = false,
      onDismiss,
      className,
      children,
      ...props
    },
    ref
  ): React.ReactElement => {
  return (
      <div ref={ref} className={cn(alertVariants({ variant }), className)} role="alert" {...props}>
        <div className="flex items-start gap-3">
          {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}

          <div className="flex-1">
            {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}

            {description && <div className="text-sm opacity-90">{description}</div>}

            {children}
          </div>

          {dismissible && onDismiss && (
            <button
              onClick={onDismiss}
              className="flex-shrink-0 p-1 rounded-sm hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Dismiss alert"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

/**
 * Badge Component
 * @param props - Badge properties
 * @returns React.ReactElement
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, children, ...props }, ref): React.ReactElement => {
  return (
      <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

/**
 * Notification Component
 * @param props - Notification properties
 * @returns React.ReactElement
 */
export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      variant = 'default',
      title,
      description,
      icon,
      dismissible = true,
      onDismiss,
      actions,
      className,
      children,
      ...props
    },
    ref
  ): React.ReactElement => {
  return (
      <div
        ref={ref}
        className={cn(notificationVariants({ variant }), className)}
        role="alert"
        {...props}
      >
        <div className="flex items-start gap-3">
          {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}

          <div className="flex-1">
            {title && <h6 className="mb-1 font-medium leading-none tracking-tight">{title}</h6>}

            {description && <div className="text-sm opacity-90 mb-2">{description}</div>}

            {children}

            {actions && <div className="flex items-center gap-2 mt-3">{actions}</div>}
          </div>

          {dismissible && onDismiss && (
            <button
              onClick={onDismiss}
              className="flex-shrink-0 p-1 rounded-sm hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Dismiss notification"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Notification.displayName = 'Notification';

/**
 * Feedback component variants and types
 */
export type SpinnerVariant = VariantProps<typeof spinnerVariants>;
export type AlertVariant = VariantProps<typeof alertVariants>;
export type BadgeVariant = VariantProps<typeof badgeVariants>;
export type NotificationVariant = VariantProps<typeof notificationVariants>;

export { alertVariants, badgeVariants, notificationVariants, spinnerVariants };
