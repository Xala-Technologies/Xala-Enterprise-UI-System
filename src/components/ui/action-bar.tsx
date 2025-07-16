/**
 * @fileoverview ActionBar Component - Norwegian Compliance
 * @description Action bar component for message actions in chat interfaces
 * @version 1.0.0
 * @compliance WCAG 2.2 AAA, Norwegian Enterprise Standards
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, useState, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils/cn';

/**
 * ActionBar component variants using semantic design tokens
 */
const actionBarVariants = cva('flex items-center gap-1 transition-opacity', {
  variants: {
    variant: {
      default: 'bg-background/80 backdrop-blur-sm border border-border/50',
      ghost: 'bg-transparent',
      floating: 'bg-background/95 backdrop-blur-md border border-border/30 shadow-lg',
      inline: 'bg-transparent',
    },
    size: {
      sm: 'p-1 gap-0.5',
      md: 'p-2 gap-1',
      lg: 'p-3 gap-2',
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    visibility: {
      always: 'opacity-100',
      hover: 'opacity-0 group-hover:opacity-100',
      focus: 'opacity-0 group-focus-within:opacity-100',
      'hover-focus': 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
    },
    position: {
      'top-left': 'top-2 left-2',
      'top-right': 'top-2 right-2',
      'bottom-left': 'bottom-2 left-2',
      'bottom-right': 'bottom-2 right-2',
      'top-center': 'top-2 left-1/2 -translate-x-1/2',
      'bottom-center': 'bottom-2 left-1/2 -translate-x-1/2',
      relative: 'relative',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
  },
  compoundVariants: [
    {
      position: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'top-center',
        'bottom-center',
      ],
      className: 'absolute',
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'md',
    orientation: 'horizontal',
    visibility: 'hover',
    position: 'relative',
    rounded: 'md',
  },
});

/**
 * ActionBar button variants
 */
const actionButtonVariants = cva(
  'inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
        ghost: 'text-muted-foreground hover:text-foreground hover:bg-muted/30',
        outline:
          'text-muted-foreground hover:text-foreground border border-border hover:bg-muted/50',
        primary: 'text-primary hover:text-primary-foreground hover:bg-primary/90',
        destructive: 'text-destructive hover:text-destructive-foreground hover:bg-destructive/90',
        success: 'text-green-600 hover:text-green-50 hover:bg-green-600/90',
      },
      size: {
        sm: 'h-6 w-6 p-1 text-xs',
        md: 'h-8 w-8 p-1.5 text-sm',
        lg: 'h-10 w-10 p-2 text-base',
      },
      shape: {
        square: 'rounded-md',
        circle: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'square',
    },
  }
);

/**
 * Common action types with Norwegian labels
 */
export type ActionType =
  | 'copy'
  | 'regenerate'
  | 'edit'
  | 'delete'
  | 'save'
  | 'share'
  | 'download'
  | 'bookmark'
  | 'flag'
  | 'thumbs-up'
  | 'thumbs-down'
  | 'retry'
  | 'expand'
  | 'collapse'
  | 'more';

/**
 * Action configuration
 */
export interface ActionConfig {
  type: ActionType;
  label: string;
  icon: React.ReactNode;
  variant?: 'default' | 'ghost' | 'outline' | 'primary' | 'destructive' | 'success';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  tooltip?: string;
}

/**
 * Predefined action configurations with Norwegian labels
 */
export const defaultActions: Record<ActionType, Omit<ActionConfig, 'onClick'>> = {
  copy: {
    type: 'copy',
    label: 'Kopier',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    tooltip: 'Kopier innhold',
  },
  regenerate: {
    type: 'regenerate',
    label: 'Regenerer',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    tooltip: 'Regenerer svar',
  },
  edit: {
    type: 'edit',
    label: 'Rediger',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
    tooltip: 'Rediger melding',
  },
  delete: {
    type: 'delete',
    label: 'Slett',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    ),
    variant: 'destructive',
    tooltip: 'Slett melding',
  },
  save: {
    type: 'save',
    label: 'Lagre',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
        />
      </svg>
    ),
    tooltip: 'Lagre melding',
  },
  share: {
    type: 'share',
    label: 'Del',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
        />
      </svg>
    ),
    tooltip: 'Del melding',
  },
  download: {
    type: 'download',
    label: 'Last ned',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    tooltip: 'Last ned innhold',
  },
  bookmark: {
    type: 'bookmark',
    label: 'Bokmerk',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    ),
    tooltip: 'Legg til bokmerke',
  },
  flag: {
    type: 'flag',
    label: 'Flagg',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 2h7a2 2 0 012 2v6a2 2 0 01-2 2H9l-1-2H5a2 2 0 01-2-2zm9-13.5V9"
        />
      </svg>
    ),
    variant: 'destructive',
    tooltip: 'Rapporter innhold',
  },
  'thumbs-up': {
    type: 'thumbs-up',
    label: 'Liker',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        />
      </svg>
    ),
    variant: 'success',
    tooltip: 'Liker dette svaret',
  },
  'thumbs-down': {
    type: 'thumbs-down',
    label: 'Liker ikke',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
        />
      </svg>
    ),
    variant: 'destructive',
    tooltip: 'Liker ikke dette svaret',
  },
  retry: {
    type: 'retry',
    label: 'Prøv igjen',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    tooltip: 'Prøv operasjonen på nytt',
  },
  expand: {
    type: 'expand',
    label: 'Utvid',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
        />
      </svg>
    ),
    tooltip: 'Utvid visning',
  },
  collapse: {
    type: 'collapse',
    label: 'Slå sammen',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5"
        />
      </svg>
    ),
    tooltip: 'Slå sammen visning',
  },
  more: {
    type: 'more',
    label: 'Mer',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
        />
      </svg>
    ),
    tooltip: 'Flere handlinger',
  },
};

/**
 * ActionBar Props interface
 */
export interface ActionBarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof actionBarVariants> {
  /** List of actions to display */
  readonly actions: ActionConfig[];
  /** Show action labels */
  readonly showLabels?: boolean;
  /** Show tooltips */
  readonly showTooltips?: boolean;
  /** Maximum number of visible actions before showing "more" */
  readonly maxActions?: number;
  /** Custom "more" action configuration */
  readonly moreAction?: Partial<ActionConfig>;
}

/**
 * ActionButton component
 */
const ActionButton: React.FC<{
  action: ActionConfig;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  showTooltip?: boolean;
}> = ({ action, size = 'md', showLabel = false, showTooltip = true }) => {
  const [isLoading, setIsLoading] = useState(action.loading || false);

  const handleClick = async (): Promise<void> => {
    if (action.disabled || isLoading || !action.onClick) return;

    setIsLoading(true);
    try {
      await action.onClick();
    } catch (error) {
      console.error(`Action ${action.type} failed:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonContent = (
    <button
      className={cn(
        actionButtonVariants({
          variant: action.variant || 'default',
          size,
          shape: showLabel ? 'square' : 'circle',
        }),
        showLabel && 'px-3 gap-2 w-auto',
        (action.disabled || isLoading) && 'opacity-50 cursor-not-allowed'
      )}
      onClick={handleClick}
      disabled={action.disabled || isLoading}
      aria-label={action.label}
    >
      {isLoading ? (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        action.icon
      )}
      {showLabel && <span className="text-xs">{action.label}</span>}
    </button>
  );

  if (showTooltip && action.tooltip && !showLabel) {
    return (
      <div className="relative group">
        {buttonContent}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-foreground bg-background border border-border rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          {action.tooltip}
        </div>
      </div>
    );
  }

  return buttonContent;
};

/**
 * ActionBar component for message actions
 *
 * @example
 * ```tsx
 * // Basic action bar
 * <ActionBar
 *   actions={[
 *     { ...defaultActions.copy, onClick: () => copyToClipboard(content) },
 *     { ...defaultActions.regenerate, onClick: () => regenerateMessage() },
 *     { ...defaultActions.delete, onClick: () => deleteMessage() },
 *   ]}
 * />
 *
 * // Floating action bar with labels
 * <ActionBar
 *   variant="floating"
 *   position="top-right"
 *   visibility="hover"
 *   showLabels
 *   actions={messageActions}
 * />
 *
 * // Vertical action bar
 * <ActionBar
 *   orientation="vertical"
 *   size="lg"
 *   actions={compactActions}
 *   maxActions={3}
 * />
 * ```
 */
export const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  (
    {
      className,
      variant,
      size,
      orientation,
      visibility,
      position,
      rounded,
      actions,
      showLabels = false,
      showTooltips = true,
      maxActions,
      moreAction,
      ...props
    },
    ref
  ) => {
    const [showMoreActions, setShowMoreActions] = useState(false);

    // Split actions if maxActions is specified
    const visibleActions = maxActions ? actions.slice(0, maxActions) : actions;
    const hiddenActions = maxActions ? actions.slice(maxActions) : [];
    const hasHiddenActions = hiddenActions.length > 0;

    return (
      <div
        ref={ref}
        className={cn(
          actionBarVariants({
            variant,
            size,
            orientation,
            visibility,
            position,
            rounded,
          }),
          className
        )}
        {...props}
      >
        {/* Visible actions */}
        {visibleActions.map((action, index) => (
          <ActionButton
            key={`${action.type}-${index}`}
            action={action}
            size={size || 'md'}
            showLabel={showLabels}
            showTooltip={showTooltips}
          />
        ))}

        {/* More actions dropdown */}
        {hasHiddenActions && (
          <div className="relative">
            <ActionButton
              action={{
                ...defaultActions.more,
                ...moreAction,
                onClick: () => setShowMoreActions(!showMoreActions),
              }}
              size={size || 'md'}
              showLabel={showLabels}
              showTooltip={showTooltips}
            />

            {showMoreActions && (
              <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-md shadow-lg p-1 z-50 min-w-max">
                {hiddenActions.map((action, index) => (
                  <ActionButton
                    key={`hidden-${action.type}-${index}`}
                    action={{
                      ...action,
                      onClick: () => {
                        setShowMoreActions(false);
                        action.onClick?.();
                      },
                    }}
                    size="sm"
                    showLabel={true}
                    showTooltip={false}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

ActionBar.displayName = 'ActionBar';

/**
 * ActionBar component variants export
 */
export { actionBarVariants, actionButtonVariants };
