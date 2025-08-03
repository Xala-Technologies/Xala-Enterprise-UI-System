/**
 * @fileoverview CVA Toast Component - Pure CSS Animations
 * @description Toast component using CVA pattern with pure CSS animations
 * @version 5.1.0
 * @compliance CVA pattern, Pure CSS animations, External state management
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

import { CloseButton } from './AlertActions';
import ClassificationIndicator from './ClassificationIndicator';
import PriorityIndicator from './PriorityIndicator';
import ToastIcon from './ToastIcon';

/**
 * Toast component variants using CVA
 */
const toastVariants = cva(
  "fixed flex items-start gap-3 p-4 min-w-80 max-w-md rounded-lg border font-sans text-sm leading-normal shadow-xl backdrop-blur-md z-50 cursor-pointer transition-all duration-fast ease-out",
  {
    variants: {
      variant: {
        info: "bg-blue-600 border-blue-700 text-white",
        success: "bg-green-600 border-green-700 text-white",
        warning: "bg-orange-600 border-orange-700 text-white",
        error: "bg-red-600 border-red-700 text-white",
      },
      position: {
        'top-left': "top-4 left-4 animate-[toast-slide-in-left_300ms_ease-out]",
        'top-center': "top-4 left-1/2 -translate-x-1/2 animate-[toast-slide-in-top_300ms_ease-out]",
        'top-right': "top-4 right-4 animate-[toast-slide-in-right_300ms_ease-out]",
        'bottom-left': "bottom-4 left-4 animate-[toast-slide-in-left_300ms_ease-out]",
        'bottom-center': "bottom-4 left-1/2 -translate-x-1/2 animate-[toast-slide-in-bottom_300ms_ease-out]",
        'bottom-right': "bottom-4 right-4 animate-[toast-slide-in-right_300ms_ease-out]",
      },
      priority: {
        low: "opacity-90",
        medium: "",
        high: "border-2 shadow-2xl",
        critical: "border-2 shadow-2xl animate-[toast-pulse_2s_infinite]",
      },
      isExiting: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        position: ['top-left', 'top-center', 'top-right'],
        isExiting: true,
        className: "animate-[toast-slide-out-top_300ms_ease-in] opacity-0",
      },
      {
        position: ['bottom-left', 'bottom-center', 'bottom-right'],
        isExiting: true,
        className: "animate-[toast-slide-out-bottom_300ms_ease-in] opacity-0",
      },
    ],
    defaultVariants: {
      variant: "info",
      position: "bottom-right",
      priority: "medium",
      isExiting: false,
    },
  }
);

const toastClassificationVariants = cva(
  "",
  {
    variants: {
      classification: {
        ÅPEN: "border-l-4 border-l-green-400",
        BEGRENSET: "border-l-4 border-l-orange-400",
        KONFIDENSIELT: "border-l-4 border-l-red-400 bg-red-800",
        HEMMELIG: "border-l-4 border-l-red-300 bg-red-900 shadow-[0_0_0_1px_rgb(248_113_113),0_25px_50px_-12px_rgba(0,0,0,0.25)]",
      },
    },
  }
);


// Toast component with forwardRef
/**
 * Enhanced Toast component interface with CVA variants
 */
export interface ToastProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>,
    VariantProps<typeof toastVariants> {
  readonly isOpen?: boolean;
  readonly title?: string;
  readonly titleKey?: string;
  readonly message?: string;
  readonly messageKey?: string;
  readonly icon?: React.ReactNode;
  readonly duration?: number;
  readonly persistent?: boolean;
  readonly closable?: boolean;
  readonly pauseOnHover?: boolean;
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly actions?: Array<{ labelKey: string; onClick?: () => void }>;
  readonly norwegian?: {
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    priority?: 'low' | 'medium' | 'high' | 'critical';
  };
  readonly ariaLabel?: string;
  readonly testId?: string;
  readonly isVisible?: boolean;
  readonly isPaused?: boolean;
  readonly isExiting?: boolean;
  readonly onClose?: () => void;
  readonly onOpen?: () => void;
  readonly onActionClick?: (action: { labelKey: string; onClick?: () => void }) => void;
  readonly onVisibilityChange?: (visible: boolean) => void;
  readonly onPauseChange?: (paused: boolean) => void;
}

/**
 * Pure Toast component using CVA pattern (stateless)
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (props, ref): React.ReactElement => {
    const {
      isOpen = true,
      variant = 'info',
      position = 'bottom-right',
      priority = 'medium',
      isExiting = false,
      title,
      titleKey,
      message,
      messageKey,
      icon,
      closable = true,
      pauseOnHover = true,
      children,
      className,
      actions,
      norwegian,
      ariaLabel,
      testId = 'toast',
      isVisible = true,
      onClose,
      onActionClick,
      onPauseChange,
      ...divProps
    } = props;

    const handleClose = (): void => {
      onClose?.();
    };

    const handleMouseEnter = (): void => {
      if (pauseOnHover) {
        onPauseChange?.(true);
      }
    };

    const handleMouseLeave = (): void => {
      if (pauseOnHover) {
        onPauseChange?.(false);
      }
    };

    const getToastRole = (): string => {
      return variant === 'error' || variant === 'warning' ? 'alert' : 'status';
    };

    const getAriaLive = (): 'polite' | 'assertive' | 'off' => {
      if (variant === 'error') return 'assertive';
      if (variant === 'warning') return 'assertive';
      return 'polite';
    };

    if (!isVisible) {
      return <></>;
    }

    return (
      <div
        ref={ref}
        role={getToastRole()}
        aria-live={getAriaLive()}
        aria-atomic="true"
        className={cn(
          toastVariants({ variant, position, priority, isExiting }),
          norwegian?.classification && toastClassificationVariants({ classification: norwegian.classification }),
          className
        )}
        data-testid={testId}
        data-variant={variant}
        data-position={position}
        data-classification={norwegian?.classification}
        data-priority={norwegian?.priority}
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...divProps}
      >
        {/* Toast icon */}
        <div className="flex-shrink-0">{icon || <ToastIcon variant={variant} />}</div>

        {/* Toast content */}
        <div className="flex-1 min-w-0">
          {/* Toast title */}
          {(title || titleKey) && (
            <div className="text-base font-semibold mb-1 flex items-center gap-1">
              <span>{title || titleKey}</span>

              {/* Classification indicator */}
              {norwegian?.classification && (
                <ClassificationIndicator level={norwegian.classification} />
              )}

              {/* Priority indicator */}
              {norwegian?.priority && <PriorityIndicator priority={norwegian.priority} />}
            </div>
          )}

          {/* Toast message */}
          {(message || messageKey || children) && (
            <div className="text-sm leading-relaxed">
              {children || message || messageKey}
            </div>
          )}

          {/* Action buttons */}
          {actions && actions.length > 0 && (
            <div className="flex gap-2 mt-3">
              {actions.map((action, index) => (
                <button
                  key={index}
                  className="px-2 py-1 text-xs font-medium bg-transparent text-current border border-current rounded-sm cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => onActionClick?.(action)}
                >
                  {action.labelKey}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Close button */}
        {closable && <CloseButton onClose={handleClose} />}
      </div>
    );
  }
);

Toast.displayName = 'Toast';
