/**
 * @fileoverview Clean Toast Component v6.0.0
 * @description Essential toast notification component
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils/cn';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly variant?: 'default' | 'destructive' | 'success' | 'warning';
  readonly position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface ToastActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly altText?: string;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ variant = 'default', className, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-background text-foreground border border-border',
      destructive: 'bg-destructive text-destructive-foreground border border-destructive',
      success: 'bg-green-500 text-white border border-green-600',
      warning: 'bg-yellow-500 text-yellow-900 border border-yellow-600',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md p-6 pr-8 shadow-lg transition-all',
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

export const ToastAction = forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ className, altText, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);

export const ToastClose = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100',
        className
      )}
      {...props}
    >
      <span className="sr-only">Close</span>
      ✕
    </button>
  )
);

export const ToastTitle = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm font-semibold', className)}
      {...props}
    />
  )
);

export const ToastDescription = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm opacity-90', className)}
      {...props}
    />
  )
);

Toast.displayName = 'Toast';
ToastAction.displayName = 'ToastAction';
ToastClose.displayName = 'ToastClose';
ToastTitle.displayName = 'ToastTitle';
ToastDescription.displayName = 'ToastDescription';