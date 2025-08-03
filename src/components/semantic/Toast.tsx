/**
 * @fileoverview Semantic Toast Component v5.0.0 - Feedback Notification Abstraction
 * @description Semantic toast notifications with i18n support and design tokens
 * @version 5.0.0
 * @compliance WCAG AAA, SSR-Safe, Framework-agnostic, Norwegian compliance, i18n-ready
 */

import React, { forwardRef, useEffect, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTranslation } from '../../i18n/hooks/useTranslation';

// =============================================================================
// SEMANTIC TOAST TYPES
// =============================================================================

/**
 * Toast semantic intents for automatic configuration
 */
export type ToastIntent = 
  | 'info'          // Information message
  | 'success'       // Success feedback
  | 'warning'       // Warning notification
  | 'error'         // Error notification
  | 'loading'       // Loading state
  | 'announcement'  // System announcement
  | 'confirmation'  // Confirmation dialog
  | 'progress';     // Progress update

/**
 * Toast positions on screen
 */
export type ToastPosition = 
  | 'top-left'
  | 'top-center' 
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'center';

/**
 * Toast priority levels for Norwegian compliance
 */
export type ToastPriority = 'low' | 'medium' | 'high' | 'critical';

// =============================================================================
// TOAST VARIANTS USING CVA AND DESIGN TOKENS
// =============================================================================

const toastVariants = cva(
  [
    'fixed flex items-start gap-3 p-4 min-w-80 max-w-md rounded-lg border font-sans text-sm leading-normal shadow-xl backdrop-blur-md z-50',
    'transition-all duration-300 ease-out cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
  ],
  {
    variants: {
      // Intent-based variants using design tokens
      intent: {
        info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100',
        success: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100',
        warning: 'bg-orange-50 border-orange-200 text-orange-900 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-100',
        error: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100',
        loading: 'bg-gray-50 border-gray-200 text-gray-900 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100',
        announcement: 'bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-950 dark:border-purple-800 dark:text-purple-100',
        confirmation: 'bg-indigo-50 border-indigo-200 text-indigo-900 dark:bg-indigo-950 dark:border-indigo-800 dark:text-indigo-100',
        progress: 'bg-cyan-50 border-cyan-200 text-cyan-900 dark:bg-cyan-950 dark:border-cyan-800 dark:text-cyan-100',
      },

      // Position variants
      position: {
        'top-left': 'top-4 left-4 animate-[toast-slide-in-left_300ms_ease-out]',
        'top-center': 'top-4 left-1/2 -translate-x-1/2 animate-[toast-slide-in-top_300ms_ease-out]',
        'top-right': 'top-4 right-4 animate-[toast-slide-in-right_300ms_ease-out]',
        'bottom-left': 'bottom-4 left-4 animate-[toast-slide-in-left_300ms_ease-out]',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 animate-[toast-slide-in-bottom_300ms_ease-out]',
        'bottom-right': 'bottom-4 right-4 animate-[toast-slide-in-right_300ms_ease-out]',
        'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[toast-fade-in_300ms_ease-out]',
      },

      // Priority variants for Norwegian compliance
      priority: {
        low: 'opacity-90',
        medium: 'shadow-lg',
        high: 'border-2 shadow-xl ring-1 ring-black/5 dark:ring-white/10',
        critical: 'border-2 shadow-2xl ring-2 ring-red-500/20 animate-pulse',
      },

      // Size variants
      size: {
        compact: 'min-w-64 max-w-sm p-3 text-xs',
        default: 'min-w-80 max-w-md p-4 text-sm',
        large: 'min-w-96 max-w-lg p-6 text-base',
      },

      // Exit animation state
      isExiting: {
        true: 'opacity-0 scale-95',
        false: 'opacity-100 scale-100',
      },
    },
    compoundVariants: [
      // Position-based exit animations
      {
        position: ['top-left', 'top-center', 'top-right'],
        isExiting: true,
        className: 'animate-[toast-slide-out-top_300ms_ease-in]',
      },
      {
        position: ['bottom-left', 'bottom-center', 'bottom-right'],
        isExiting: true,
        className: 'animate-[toast-slide-out-bottom_300ms_ease-in]',
      },
      {
        position: 'center',
        isExiting: true,
        className: 'animate-[toast-fade-out_300ms_ease-in]',
      },
    ],
    defaultVariants: {
      intent: 'info',
      position: 'bottom-right',
      priority: 'medium',
      size: 'default',
      isExiting: false,
    },
  }
);

// Norwegian compliance classification variants
const nsmVariants = cva('', {
  variants: {
    nsmLevel: {
      OPEN: 'border-l-4 border-l-green-400',
      RESTRICTED: 'border-l-4 border-l-orange-400',
      CONFIDENTIAL: 'border-l-4 border-l-red-400 bg-red-50/50 dark:bg-red-950/50',
      SECRET: 'border-l-4 border-l-red-300 bg-red-100/50 dark:bg-red-900/50 shadow-[0_0_0_1px_rgb(248_113_113)]',
    },
  },
});

// =============================================================================
// TOAST COMPONENT INTERFACE
// =============================================================================

export interface ToastAction {
  /** Action label translation key */
  readonly labelKey: string;
  /** Action click handler */
  readonly onClick?: () => void;
  /** Action variant */
  readonly variant?: 'primary' | 'secondary' | 'destructive';
}

export interface ToastProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof toastVariants> {
  /** Toast semantic intent */
  readonly intent?: ToastIntent;
  /** Toast title (supports translation key) */
  readonly title?: string;
  /** Toast title translation key */
  readonly titleKey?: string;
  /** Toast message (supports translation key) */
  readonly message?: string;
  /** Toast message translation key */
  readonly messageKey?: string;
  /** Custom icon element */
  readonly icon?: React.ReactNode;
  /** Auto-dismiss duration in milliseconds */
  readonly duration?: number;
  /** Prevent auto-dismiss */
  readonly persistent?: boolean;
  /** Show close button */
  readonly closable?: boolean;
  /** Pause timer on hover */
  readonly pauseOnHover?: boolean;
  /** Toast actions */
  readonly actions?: ToastAction[];
  /** Norwegian compliance classification */
  readonly nsmLevel?: 'OPEN' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';
  /** Visibility state */
  readonly isVisible?: boolean;
  /** Loading state */
  readonly isLoading?: boolean;
  /** Progress value (0-100) for progress intent */
  readonly progress?: number;
  /** Close handler */
  readonly onClose?: () => void;
  /** Action click handler */
  readonly onActionClick?: (action: ToastAction) => void;
  /** Visibility change handler */
  readonly onVisibilityChange?: (visible: boolean) => void;
}

// =============================================================================
// TOAST ICONS
// =============================================================================

const ToastIcons = {
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  loading: (
    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  announcement: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  confirmation: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  progress: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

// =============================================================================
// SEMANTIC TOAST COMPONENT
// =============================================================================

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      intent = 'info',
      position = 'bottom-right',
      priority = 'medium',
      size = 'default',
      title,
      titleKey,
      message,
      messageKey,
      icon,
      duration = 5000,
      persistent = false,
      closable = true,
      pauseOnHover = true,
      actions,
      nsmLevel,
      isVisible = true,
      isLoading = false,
      isExiting = false,
      progress,
      className,
      onClose,
      onActionClick,
      onVisibilityChange,
      children,
      ...props
    },
    ref
  ) => {
    const { t, isRTL, getDirectionalClasses } = useTranslation();
    const [isPaused, setIsPaused] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(duration);

    // Auto-dismiss logic
    useEffect(() => {
      if (persistent || !isVisible || isPaused || isExiting) return;

      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 100) {
            onClose?.();
            return 0;
          }
          return prev - 100;
        });
      }, 100);

      return () => clearInterval(interval);
    }, [persistent, isVisible, isPaused, isExiting, onClose]);

    // Handle mouse interactions for pause on hover
    const handleMouseEnter = () => {
      if (pauseOnHover) {
        setIsPaused(true);
      }
    };

    const handleMouseLeave = () => {
      if (pauseOnHover) {
        setIsPaused(false);
      }
    };

    // Get ARIA attributes based on intent
    const getAriaAttributes = () => {
      const attributes: Record<string, any> = {
        role: intent === 'error' || intent === 'warning' ? 'alert' : 'status',
        'aria-live': intent === 'error' || intent === 'warning' ? 'assertive' : 'polite',
        'aria-atomic': 'true',
      };

      if (nsmLevel) {
        attributes['data-nsm-level'] = nsmLevel;
        attributes['aria-label'] = t(`toast.nsmLevel.${nsmLevel.toLowerCase()}`);
      }

      return attributes;
    };

    // Get resolved text content with i18n support
    const resolvedTitle = titleKey ? t(titleKey) : title;
    const resolvedMessage = messageKey ? t(messageKey) : message;

    // Get default icon for intent
    const defaultIcon = ToastIcons[intent] || ToastIcons.info;
    const displayIcon = icon || defaultIcon;

    if (!isVisible && !isExiting) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          toastVariants({
            intent,
            position,
            priority,
            size,
            isExiting,
          }),
          nsmLevel && nsmVariants({ nsmLevel }),
          getDirectionalClasses(),
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...getAriaAttributes()}
        {...props}
      >
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {isLoading ? ToastIcons.loading : displayIcon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          {resolvedTitle && (
            <div className="text-base font-semibold mb-1 flex items-center gap-2">
              <span className="truncate">{resolvedTitle}</span>
              
              {/* Norwegian classification indicator */}
              {nsmLevel && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-current/10">
                  {nsmLevel}
                </span>
              )}
              
              {/* Priority indicator */}
              {priority === 'high' && (
                <span className="w-2 h-2 bg-red-500 rounded-full" aria-label={t('toast.priority.high')} />
              )}
              {priority === 'critical' && (
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" aria-label={t('toast.priority.critical')} />
              )}
            </div>
          )}

          {/* Message */}
          {(resolvedMessage || children) && (
            <div className="text-sm leading-relaxed text-current/80">
              {children || resolvedMessage}
            </div>
          )}

          {/* Progress bar for progress intent */}
          {intent === 'progress' && typeof progress === 'number' && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-current/60 mb-1">
                <span>{t('toast.progress.label')}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-current/20 rounded-full h-1.5">
                <div 
                  className="bg-current h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          {actions && actions.length > 0 && (
            <div className="flex gap-2 mt-3">
              {actions.map((action, index) => (
                <button
                  key={index}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                    'border border-current/20 hover:bg-current/10',
                    'focus:outline-none focus:ring-2 focus:ring-current/20',
                    action.variant === 'primary' && 'bg-current/20 hover:bg-current/30',
                    action.variant === 'destructive' && 'text-red-600 border-red-600/20 hover:bg-red-600/10'
                  )}
                  onClick={() => {
                    action.onClick?.();
                    onActionClick?.(action);
                  }}
                >
                  {t(action.labelKey)}
                </button>
              ))}
            </div>
          )}

          {/* Auto-dismiss progress indicator */}
          {!persistent && !isPaused && !isExiting && closable && (
            <div className="mt-2 w-full bg-current/20 rounded-full h-0.5">
              <div 
                className="bg-current h-0.5 rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${((duration - timeRemaining) / duration) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Close button */}
        {closable && (
          <button
            className={cn(
              'flex-shrink-0 p-1 text-current/60 hover:text-current transition-colors rounded-sm',
              'focus:outline-none focus:ring-2 focus:ring-current/20'
            )}
            onClick={onClose}
            aria-label={t('toast.close')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

// =============================================================================
// SEMANTIC TOAST VARIANTS FOR CONVENIENCE
// =============================================================================

/**
 * Success Toast - Success feedback
 */
export const SuccessToast = forwardRef<HTMLDivElement, Omit<ToastProps, 'intent'>>(
  (props, ref) => <Toast ref={ref} intent="success" {...props} />
);
SuccessToast.displayName = 'SuccessToast';

/**
 * Error Toast - Error notification
 */
export const ErrorToast = forwardRef<HTMLDivElement, Omit<ToastProps, 'intent'>>(
  (props, ref) => <Toast ref={ref} intent="error" priority="high" {...props} />
);
ErrorToast.displayName = 'ErrorToast';

/**
 * Warning Toast - Warning notification
 */
export const WarningToast = forwardRef<HTMLDivElement, Omit<ToastProps, 'intent'>>(
  (props, ref) => <Toast ref={ref} intent="warning" priority="medium" {...props} />
);
WarningToast.displayName = 'WarningToast';

/**
 * Info Toast - Information message
 */
export const InfoToast = forwardRef<HTMLDivElement, Omit<ToastProps, 'intent'>>(
  (props, ref) => <Toast ref={ref} intent="info" {...props} />
);
InfoToast.displayName = 'InfoToast';

/**
 * Loading Toast - Loading state
 */
export const LoadingToast = forwardRef<HTMLDivElement, Omit<ToastProps, 'intent' | 'isLoading'>>(
  (props, ref) => <Toast ref={ref} intent="loading" isLoading persistent {...props} />
);
LoadingToast.displayName = 'LoadingToast';

/**
 * Progress Toast - Progress update
 */
export const ProgressToast = forwardRef<HTMLDivElement, Omit<ToastProps, 'intent'>>(
  (props, ref) => <Toast ref={ref} intent="progress" persistent {...props} />
);
ProgressToast.displayName = 'ProgressToast';

// Export variants for external use
export { toastVariants, nsmVariants };
export type ToastVariant = VariantProps<typeof toastVariants>;