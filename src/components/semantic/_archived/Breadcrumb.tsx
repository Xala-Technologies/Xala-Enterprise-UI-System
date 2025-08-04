/**
 * @fileoverview Semantic Breadcrumb Component v5.0.0 - Navigation Path Abstraction
 * @description Semantic breadcrumb navigation with i18n support and design tokens
 * @version 5.0.0
 * @compliance WCAG AAA, SSR-Safe, Framework-agnostic, Norwegian compliance, i18n-ready
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTranslation } from '../../i18n/hooks/useTranslation';

// =============================================================================
// SEMANTIC BREADCRUMB TYPES
// =============================================================================

/**
 * Breadcrumb semantic intents for automatic configuration
 */
export type BreadcrumbIntent = 
  | 'navigation'    // Primary navigation path
  | 'hierarchy'     // Content hierarchy
  | 'process'       // Step-by-step process
  | 'category'      // Category/taxonomy path
  | 'temporal'      // Time-based progression
  | 'workflow';     // Workflow progression

/**
 * Breadcrumb item with semantic properties
 */
export interface BreadcrumbItem {
  /** Item unique key */
  readonly key: string;
  /** Item label (can be translation key) */
  readonly label: string;
  /** Translation key for label */
  readonly labelKey?: string;
  /** Item href for navigation */
  readonly href?: string;
  /** Click handler */
  readonly onClick?: () => void;
  /** Icon element */
  readonly icon?: React.ReactNode;
  /** Item disabled state */
  readonly disabled?: boolean;
  /** Norwegian compliance level */
  readonly nsmLevel?: 'OPEN' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';
  /** Additional metadata */
  readonly metadata?: Record<string, any>;
}

// =============================================================================
// BREADCRUMB VARIANTS USING CVA AND DESIGN TOKENS
// =============================================================================

const breadcrumbVariants = cva(
  [
    'flex items-center font-sans',
    'transition-colors duration-200 ease-in-out',
  ],
  {
    variants: {
      // Intent-based variants
      intent: {
        navigation: 'text-muted-foreground',
        hierarchy: 'text-muted-foreground',
        process: 'text-muted-foreground',
        category: 'text-primary/80',
        temporal: 'text-muted-foreground',
        workflow: 'text-indigo-600 dark:text-indigo-400',
      },

      // Size variants using design tokens
      size: {
        sm: 'text-xs gap-1',
        default: 'text-sm gap-2',
        lg: 'text-base gap-3',
      },

      // Visual variants
      variant: {
        default: '',
        primary: 'text-primary/80',
        secondary: 'text-secondary/80',
        accent: 'text-accent-foreground',
        ghost: 'text-muted-foreground',
      },

      // Responsive behavior
      responsive: {
        true: 'hidden sm:flex',
        false: 'flex',
      },
    },
    compoundVariants: [
      // Process intent styling
      {
        intent: 'process',
        className: 'px-3 py-2 bg-muted/30 rounded-md border border-border',
      },
      // Workflow intent styling
      {
        intent: 'workflow',
        className: 'px-2 py-1 bg-indigo-50 dark:bg-indigo-950/30 rounded-sm border border-indigo-200 dark:border-indigo-800',
      },
    ],
    defaultVariants: {
      intent: 'navigation',
      size: 'default',
      variant: 'default',
      responsive: false,
    },
  }
);

const breadcrumbItemVariants = cva(
  [
    'inline-flex items-center gap-2 transition-colors duration-150',
    'outline-none rounded-sm',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  ],
  {
    variants: {
      // Interactive states
      interactive: {
        true: 'cursor-pointer hover:text-primary hover:underline',
        false: 'cursor-default',
      },

      // Item states
      state: {
        default: 'text-foreground',
        current: 'font-medium text-foreground cursor-default',
        disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
        restricted: 'text-orange-600 dark:text-orange-400',
        confidential: 'text-red-600 dark:text-red-400',
        secret: 'text-red-700 dark:text-red-300 font-semibold',
      },

      // Item size variants
      size: {
        sm: 'px-1 py-0.5 text-xs',
        default: 'px-1.5 py-1 text-sm',
        lg: 'px-2 py-1.5 text-base',
      },
    },
    defaultVariants: {
      interactive: true,
      state: 'default',
      size: 'default',
    },
  }
);

const breadcrumbSeparatorVariants = cva(
  'inline-flex items-center justify-center text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'w-3 h-3',
        default: 'w-4 h-4',
        lg: 'w-5 h-5',
      },
      type: {
        chevron: '',
        slash: '',
        arrow: '',
        dot: '',
        pipe: '',
      },
    },
    defaultVariants: {
      size: 'default',
      type: 'chevron',
    },
  }
);

// =============================================================================
// BREADCRUMB COMPONENT INTERFACE
// =============================================================================

export interface BreadcrumbProps 
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'>,
    VariantProps<typeof breadcrumbVariants> {
  /** Breadcrumb items */
  readonly items: BreadcrumbItem[];
  /** Custom separator element or type */
  readonly separator?: React.ReactNode | 'chevron' | 'slash' | 'arrow' | 'dot' | 'pipe';
  /** Maximum items to show before truncation */
  readonly maxItems?: number;
  /** Show home icon/link at start */
  readonly showHome?: boolean;
  /** Home icon element */
  readonly homeIcon?: React.ReactNode;
  /** Home href */
  readonly homeHref?: string;
  /** Home click handler */
  readonly onHomeClick?: () => void;
  /** Home label translation key */
  readonly homeLabelKey?: string;
  /** Item click handler */
  readonly onItemClick?: (item: BreadcrumbItem, index: number) => void;
  /** Custom truncation label */
  readonly truncationLabelKey?: string;
}

export interface BreadcrumbSeparatorProps 
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof breadcrumbSeparatorVariants> {
  readonly children?: React.ReactNode;
}

// =============================================================================
// SEPARATOR ICONS
// =============================================================================

const SeparatorIcons = {
  chevron: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  slash: () => '/',
  arrow: () => '→',
  dot: () => '•',
  pipe: () => '|',
};

const HomeIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
    <path
      fillRule="evenodd"
      d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
      clipRule="evenodd"
    />
  </svg>
);

const EllipsisIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);

// =============================================================================
// BREADCRUMB SUB-COMPONENTS
// =============================================================================

export const BreadcrumbSeparator = forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ size, type = 'chevron', children, className, ...props }, ref) => {
    const separatorContent = children || (type ? SeparatorIcons[type] : null) || SeparatorIcons.chevron;
    
    return (
      <span
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn(breadcrumbSeparatorVariants({ size, type }), className)}
        {...props}
      >
        {typeof separatorContent === 'function' ? separatorContent() : separatorContent}
      </span>
    );
  }
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

// =============================================================================
// SEMANTIC BREADCRUMB COMPONENT
// =============================================================================

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      intent = 'navigation',
      size = 'default',
      variant = 'default',
      responsive = false,
      separator = 'chevron',
      maxItems = 0,
      showHome = false,
      homeIcon,
      homeHref = '/',
      onHomeClick,
      homeLabelKey = 'breadcrumb.home',
      onItemClick,
      truncationLabelKey = 'breadcrumb.more',
      className,
      ...props
    },
    ref
  ) => {
    const { t, isRTL, getDirectionalClasses } = useTranslation();

    // Truncate items if maxItems is specified
    const getTruncatedItems = () => {
      if (maxItems <= 0 || items.length <= maxItems) {
        return { beforeEllipsis: items, afterEllipsis: [], showEllipsis: false };
      }

      const beforeCount = Math.floor((maxItems - 1) / 2);
      const afterCount = maxItems - 1 - beforeCount;

      return {
        beforeEllipsis: items.slice(0, beforeCount),
        afterEllipsis: items.slice(-afterCount),
        showEllipsis: true,
      };
    };

    const { beforeEllipsis, afterEllipsis, showEllipsis } = getTruncatedItems();

    // Get item state based on NSM level and position
    const getItemState = (item: BreadcrumbItem, index: number, isLast: boolean) => {
      if (item.disabled) return 'disabled';
      if (isLast) return 'current';
      if (item.nsmLevel === 'RESTRICTED') return 'restricted';
      if (item.nsmLevel === 'CONFIDENTIAL') return 'confidential';
      if (item.nsmLevel === 'SECRET') return 'secret';
      return 'default';
    };

    // Render breadcrumb item
    const renderBreadcrumbItem = (
      item: BreadcrumbItem,
      index: number,
      isLast: boolean
    ) => {
      const resolvedLabel = item.labelKey ? t(item.labelKey) : item.label;
      const itemState = getItemState(item, index, isLast);
      const isInteractive = !!(item.href || item.onClick) && !item.disabled && !isLast;
      
      const itemContent = (
        <div className="flex items-center gap-1.5">
          {item.icon && (
            <span className="w-4 h-4 flex-shrink-0">
              {item.icon}
            </span>
          )}
          <span className="truncate">
            {resolvedLabel}
          </span>
          {item.nsmLevel && (
            <span className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-current/20">
              {item.nsmLevel}
            </span>
          )}
        </div>
      );

      const itemProps = {
        className: cn(
          breadcrumbItemVariants({
            interactive: isInteractive,
            state: itemState,
            size,
          }),
          '-mx-1.5 -my-1'
        ),
        'aria-current': isLast ? ('page' as const) : undefined,
        'data-nsm-level': item.nsmLevel,
      };

      if (item.href && !item.disabled && !isLast) {
        return (
          <React.Fragment key={item.key}>
            <a
              href={item.href}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
                onItemClick?.(item, index);
              }}
              {...itemProps}
            >
              {itemContent}
            </a>
            {!isLast && (
              <BreadcrumbSeparator size={size} type={typeof separator === 'string' ? separator as any : 'chevron'}>
                {typeof separator !== 'string' ? separator : undefined}
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        );
      }

      if (item.onClick && !item.disabled && !isLast) {
        return (
          <React.Fragment key={item.key}>
            <button
              type="button"
              onClick={() => {
                item.onClick?.();
                onItemClick?.(item, index);
              }}
              {...itemProps}
              className={cn(itemProps.className, 'border-none bg-transparent')}
            >
              {itemContent}
            </button>
            {!isLast && (
              <BreadcrumbSeparator size={size} type={typeof separator === 'string' ? separator as any : 'chevron'}>
                {typeof separator !== 'string' ? separator : undefined}
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        );
      }

      return (
        <React.Fragment key={item.key}>
          <span {...itemProps}>
            {itemContent}
          </span>
          {!isLast && (
            <BreadcrumbSeparator size={size} type={typeof separator === 'string' ? separator : 'chevron'}>
              {typeof separator !== 'string' ? separator : undefined}
            </BreadcrumbSeparator>
          )}
        </React.Fragment>
      );
    };

    return (
      <nav
        ref={ref}
        aria-label={t('breadcrumb.navigation')}
        className={cn(
          breadcrumbVariants({ intent, size, variant, responsive }),
          getDirectionalClasses(),
          className
        )}
        {...props}
      >
        <ol className="flex items-center gap-1 list-none m-0 p-0">
          {/* Home Item */}
          {showHome && (
            <>
              <li>
                {homeHref ? (
                  <a
                    href={homeHref}
                    className={cn(
                      breadcrumbItemVariants({ interactive: true, size }),
                      'w-5 h-5 -mx-1.5 -my-1'
                    )}
                    aria-label={t(homeLabelKey)}
                    title={t(homeLabelKey)}
                  >
                    {homeIcon || <HomeIcon />}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onHomeClick}
                    className={cn(
                      breadcrumbItemVariants({ interactive: true, size }),
                      'w-5 h-5 -mx-1.5 -my-1 border-none bg-transparent'
                    )}
                    aria-label={t(homeLabelKey)}
                    title={t(homeLabelKey)}
                  >
                    {homeIcon || <HomeIcon />}
                  </button>
                )}
              </li>
              {items.length > 0 && (
                <li>
                  <BreadcrumbSeparator size={size} type={typeof separator === 'string' ? separator as any : 'chevron'}>
                    {typeof separator !== 'string' ? separator : undefined}
                  </BreadcrumbSeparator>
                </li>
              )}
            </>
          )}

          {/* Before Ellipsis Items */}
          {beforeEllipsis.map((item, index) => (
            <li key={`before-${item.key}`}>
              {renderBreadcrumbItem(item, index, false)}
            </li>
          ))}

          {/* Ellipsis */}
          {showEllipsis && (
            <>
              <li>
                <BreadcrumbSeparator size={size} type={typeof separator === 'string' ? separator as any : 'chevron'}>
                  {typeof separator !== 'string' ? separator : undefined}
                </BreadcrumbSeparator>
              </li>
              <li>
                <span
                  className="inline-flex items-center text-muted-foreground w-4 h-4"
                  aria-label={t(truncationLabelKey)}
                  title={t(truncationLabelKey)}
                >
                  <EllipsisIcon />
                </span>
              </li>
              <li>
                <BreadcrumbSeparator size={size} type={typeof separator === 'string' ? separator as any : 'chevron'}>
                  {typeof separator !== 'string' ? separator : undefined}
                </BreadcrumbSeparator>
              </li>
            </>
          )}

          {/* After Ellipsis Items */}
          {afterEllipsis.map((item, index) => {
            const actualIndex = beforeEllipsis.length + index;
            const isLast = index === afterEllipsis.length - 1;
            return (
              <li key={`after-${item.key}`}>
                {renderBreadcrumbItem(item, actualIndex, isLast)}
              </li>
            );
          })}

          {/* All items when no truncation */}
          {!showEllipsis &&
            beforeEllipsis.map((item, index) => {
              const isLast = index === beforeEllipsis.length - 1;
              return (
                <li key={item.key}>
                  {renderBreadcrumbItem(item, index, isLast)}
                </li>
              );
            })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

// =============================================================================
// SEMANTIC BREADCRUMB VARIANTS FOR CONVENIENCE  
// =============================================================================

/**
 * Navigation Breadcrumb - Standard page navigation
 */
export const NavigationBreadcrumb = forwardRef<HTMLElement, Omit<BreadcrumbProps, 'intent'>>(
  (props, ref) => <Breadcrumb ref={ref} intent="navigation" showHome {...props} />
);
NavigationBreadcrumb.displayName = 'NavigationBreadcrumb';

/**
 * Process Breadcrumb - Step-by-step process
 */
export const ProcessBreadcrumb = forwardRef<HTMLElement, Omit<BreadcrumbProps, 'intent'>>(
  (props, ref) => <Breadcrumb ref={ref} intent="process" separator="arrow" {...props} />
);
ProcessBreadcrumb.displayName = 'ProcessBreadcrumb';

/**
 * Category Breadcrumb - Category/taxonomy navigation
 */
export const CategoryBreadcrumb = forwardRef<HTMLElement, Omit<BreadcrumbProps, 'intent'>>(
  (props, ref) => <Breadcrumb ref={ref} intent="category" separator="chevron" {...props} />
);
CategoryBreadcrumb.displayName = 'CategoryBreadcrumb';

/**
 * Workflow Breadcrumb - Workflow progression
 */
export const WorkflowBreadcrumb = forwardRef<HTMLElement, Omit<BreadcrumbProps, 'intent'>>(
  (props, ref) => <Breadcrumb ref={ref} intent="workflow" separator="arrow" {...props} />
);
WorkflowBreadcrumb.displayName = 'WorkflowBreadcrumb';

// Export variants for external use
export { breadcrumbVariants, breadcrumbItemVariants, breadcrumbSeparatorVariants };
export type BreadcrumbVariant = VariantProps<typeof breadcrumbVariants>;