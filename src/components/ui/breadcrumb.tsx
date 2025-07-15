/**
 * Breadcrumb component with enterprise compliance
 * Uses semantic design tokens and pure presentational patterns
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

/**
 * Breadcrumb variants using semantic design tokens
 */
const breadcrumbVariants = cva('flex items-center space-x-1 text-sm text-muted-foreground', {
  variants: {
    variant: {
      default: 'text-muted-foreground',
      primary: 'text-primary/80',
      secondary: 'text-secondary/80',
    },
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

/**
 * Breadcrumb item variants using semantic design tokens
 */
const breadcrumbItemVariants = cva(
  [
    'inline-flex items-center transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default: 'hover:text-foreground',
        primary: 'hover:text-primary',
        secondary: 'hover:text-secondary',
      },
      active: {
        true: 'text-foreground font-medium cursor-default',
        false: 'text-muted-foreground cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
      active: false,
    },
  }
);

/**
 * Breadcrumb separator variants
 */
const breadcrumbSeparatorVariants = cva('inline-flex items-center justify-center', {
  variants: {
    size: {
      sm: 'h-3 w-3',
      default: 'h-4 w-4',
      lg: 'h-5 w-5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  readonly label: string;
  readonly href?: string;
  readonly onClick?: () => void;
  readonly icon?: ReactNode;
  readonly disabled?: boolean;
}

/**
 * Breadcrumb component props interface
 */
export interface BreadcrumbProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  readonly items: BreadcrumbItem[];
  readonly separator?: ReactNode;
  readonly maxItems?: number;
  readonly showHome?: boolean;
  readonly homeIcon?: ReactNode;
  readonly homeHref?: string;
  readonly onHomeClick?: () => void;
}

/**
 * Get truncated items with ellipsis - pure function
 */
const getTruncatedItems = (
  items: BreadcrumbItem[],
  maxItems: number
): { beforeEllipsis: BreadcrumbItem[]; afterEllipsis: BreadcrumbItem[]; showEllipsis: boolean } => {
  if (items.length <= maxItems) {
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

/**
 * Default Chevron Right Icon
 */
const ChevronRightIcon = (): React.ReactElement => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Default Home Icon
 */
const HomeIcon = (): React.ReactElement => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
    <path
      fillRule="evenodd"
      d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Ellipsis Icon
 */
const EllipsisIcon = (): React.ReactElement => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);

/**
 * Breadcrumb Separator Component
 */
const BreadcrumbSeparator = forwardRef<
  HTMLSpanElement,
  { size?: 'sm' | 'default' | 'lg'; children?: ReactNode }
>(
  ({ size = 'default', children }, ref): React.ReactElement => (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn(breadcrumbSeparatorVariants({ size }))}
    >
      {children || <ChevronRightIcon />}
    </span>
  )
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

/**
 * Enhanced Breadcrumb component
 * @param items - Array of breadcrumb items
 * @param separator - Custom separator element
 * @param maxItems - Maximum items to show before truncation
 * @param showHome - Show home icon/link at start
 * @param homeIcon - Custom home icon
 * @param homeHref - Home link href
 * @param onHomeClick - Home click handler
 * @param variant - Breadcrumb styling variant
 * @param size - Breadcrumb size
 * @param className - Additional CSS classes
 * @returns Enhanced Breadcrumb JSX element
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      separator,
      maxItems = 0,
      showHome = false,
      homeIcon,
      homeHref = '/',
      onHomeClick,
      variant = 'default',
      size = 'default',
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { beforeEllipsis, afterEllipsis, showEllipsis } =
      maxItems > 0
        ? getTruncatedItems(items, maxItems)
        : { beforeEllipsis: items, afterEllipsis: [], showEllipsis: false };

    const safeSize = size || 'default';

    const renderBreadcrumbItem = (
      item: BreadcrumbItem,
      index: number,
      isLast: boolean
    ): React.ReactElement => {
      const ItemComponent = item.href || item.onClick ? 'button' : 'span';

      return (
        <React.Fragment key={`${item.label}-${index}`}>
          <ItemComponent
            {...(item.href && { href: item.href })}
            onClick={item.onClick}
            disabled={item.disabled}
            className={cn(
              breadcrumbItemVariants({ variant, active: isLast }),
              item.disabled && 'opacity-50 cursor-not-allowed'
            )}
            aria-current={isLast ? 'page' : undefined}
          >
            <div className="flex items-center space-x-1">
              {item.icon && <span className="h-4 w-4">{item.icon}</span>}
              <span>{item.label}</span>
            </div>
          </ItemComponent>

          {!isLast && <BreadcrumbSeparator size={safeSize}>{separator}</BreadcrumbSeparator>}
        </React.Fragment>
      );
    };

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(breadcrumbVariants({ variant, size }), className)}
        {...props}
      >
        <ol className="flex items-center space-x-1">
          {/* Home Item */}
          {showHome && (
            <>
              <li>
                <button
                  onClick={onHomeClick}
                  className={cn(breadcrumbItemVariants({ variant, active: false }))}
                  aria-label="Home"
                >
                  {homeIcon || <HomeIcon />}
                </button>
              </li>
              {items.length > 0 && (
                <li>
                  <BreadcrumbSeparator size={safeSize}>{separator}</BreadcrumbSeparator>
                </li>
              )}
            </>
          )}

          {/* Before Ellipsis Items */}
          {beforeEllipsis.map((item, index) => (
            <li key={`before-${index}`}>{renderBreadcrumbItem(item, index, false)}</li>
          ))}

          {/* Ellipsis */}
          {showEllipsis && (
            <>
              <li>
                <BreadcrumbSeparator size={safeSize}>{separator}</BreadcrumbSeparator>
              </li>
              <li>
                <span
                  className={cn(breadcrumbItemVariants({ variant, active: false }))}
                  aria-label="More items"
                >
                  <EllipsisIcon />
                </span>
              </li>
              <li>
                <BreadcrumbSeparator size={safeSize}>{separator}</BreadcrumbSeparator>
              </li>
            </>
          )}

          {/* After Ellipsis Items */}
          {afterEllipsis.map((item, index) => {
            const actualIndex = beforeEllipsis.length + index;
            const isLast = index === afterEllipsis.length - 1;
            return (
              <li key={`after-${index}`}>{renderBreadcrumbItem(item, actualIndex, isLast)}</li>
            );
          })}

          {/* All items when no truncation */}
          {!showEllipsis &&
            beforeEllipsis.map((item, index) => {
              const isLast = index === beforeEllipsis.length - 1;
              return <li key={index}>{renderBreadcrumbItem(item, index, isLast)}</li>;
            })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

/**
 * Breadcrumb variants type exports
 */
export type BreadcrumbVariant = VariantProps<typeof breadcrumbVariants>['variant'];
export type BreadcrumbSize = VariantProps<typeof breadcrumbVariants>['size'];
