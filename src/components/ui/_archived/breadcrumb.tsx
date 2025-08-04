/**
 * @fileoverview Breadcrumb Component - CVA Pattern Implementation
 * @description SSR-safe breadcrumb component using CVA variants and semantic tokens
 * @version 5.0.0
 * @compliance WCAG AAA, CVA Pattern, SSR-Safe, Semantic Tokens
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { Box, Text, Link, List, ListItem } from '../semantic';

// =============================================================================
// CVA VARIANTS
// =============================================================================

const breadcrumbVariants = cva('flex items-center font-sans', {
  variants: {
    variant: {
      default: 'text-muted-foreground',
      primary: 'text-primary/80',
      secondary: 'text-secondary/80',
    },
    size: {
      sm: 'text-xs gap-1',
      default: 'text-sm gap-2',
      lg: 'text-base gap-3',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const breadcrumbItemVariants = cva(
  [
    'inline-flex items-center gap-2 transition-colors duration-150',
    'outline-none rounded-sm',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default: 'text-foreground hover:text-primary',
        primary: 'text-primary hover:text-primary/80',
        secondary: 'text-secondary hover:text-secondary/80',
      },
      state: {
        default: '',
        current: 'font-medium text-foreground cursor-default',
        disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
      interactive: {
        true: 'cursor-pointer hover:underline',
        false: 'cursor-default',
      },
    },
    defaultVariants: {
      variant: 'default',
      state: 'default',
      interactive: true,
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
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

// =============================================================================
// INTERFACES
// =============================================================================

export interface BreadcrumbItem {
  readonly label: string;
  readonly href?: string;
  readonly onClick?: () => void;
  readonly icon?: ReactNode;
  readonly disabled?: boolean;
}

export interface BreadcrumbProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  /** Breadcrumb items */
  readonly items: BreadcrumbItem[];
  /** Custom separator element */
  readonly separator?: ReactNode;
  /** Maximum items to show before truncation */
  readonly maxItems?: number;
  /** Show home icon/link at start */
  readonly showHome?: boolean;
  /** Custom home icon */
  readonly homeIcon?: ReactNode;
  /** Home link href */
  readonly homeHref?: string;
  /** Home click handler */
  readonly onHomeClick?: () => void;
}

export interface BreadcrumbSeparatorProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof breadcrumbSeparatorVariants> {
  readonly children?: ReactNode;
}

// =============================================================================
// ICONS
// =============================================================================

const ChevronRightIcon = (): React.ReactElement => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const HomeIcon = (): React.ReactElement => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
    <path
      fillRule="evenodd"
      d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
      clipRule="evenodd"
    />
  </svg>
);

const EllipsisIcon = (): React.ReactElement => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

export const BreadcrumbSeparator = forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ size, children, className, ...props }, ref) => {
    return (
      <Text
        as="span"
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn(breadcrumbSeparatorVariants({ size }), className)}
        {...props}
      >
        {children || <ChevronRightIcon />}
      </Text>
    );
  }
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

// =============================================================================
// MAIN COMPONENT
// =============================================================================

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
      variant,
      size,
      className,
      ...props
    },
    ref
  ) => {
    // Get truncated items with ellipsis - pure function
    const getTruncatedItems = (
      items: BreadcrumbItem[],
      maxItems: number
    ): {
      beforeEllipsis: BreadcrumbItem[];
      afterEllipsis: BreadcrumbItem[];
      showEllipsis: boolean;
    } => {
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

    const { beforeEllipsis, afterEllipsis, showEllipsis } =
      maxItems > 0
        ? getTruncatedItems(items, maxItems)
        : { beforeEllipsis: items, afterEllipsis: [], showEllipsis: false };

    const renderBreadcrumbItem = (
      item: BreadcrumbItem,
      index: number,
      isLast: boolean
    ): React.ReactElement => {
      const ItemComponent = item.href ? 'a' : 'button';
      const isInteractive = !!(item.href || item.onClick) && !item.disabled;

      const itemContent = (
        <Box className="flex items-center gap-1">
          {item.icon && (
            <Text as="span" className="w-4 h-4 flex-shrink-0">
              {item.icon}
            </Text>
          )}
          <Text as="span" className="truncate">
            {item.label}
          </Text>
        </Box>
      );

      if (item.href && !item.disabled) {
        return (
          <React.Fragment key={`${item.label}-${index}`}>
            <Link
              href={item.href}
              className={cn(
                breadcrumbItemVariants({
                  variant,
                  state: isLast ? 'current' : 'default',
                  interactive: isInteractive,
                }),
                'px-1 py-0.5 -mx-1 -my-0.5'
              )}
              onClick={item.onClick}
              aria-current={isLast ? 'page' : undefined}
            >
              {itemContent}
            </Link>
            {!isLast && <BreadcrumbSeparator size={size}>{separator}</BreadcrumbSeparator>}
          </React.Fragment>
        );
      }

      if (item.onClick && !item.disabled) {
        return (
          <React.Fragment key={`${item.label}-${index}`}>
            <Text
              as="button"
              type="button"
              onClick={item.onClick}
              disabled={item.disabled}
              className={cn(
                breadcrumbItemVariants({
                  variant,
                  state: item.disabled ? 'disabled' : isLast ? 'current' : 'default',
                  interactive: isInteractive,
                }),
                'px-1 py-0.5 -mx-1 -my-0.5 border-none bg-transparent'
              )}
              aria-current={isLast ? 'page' : undefined}
            >
              {itemContent}
            </Text>
            {!isLast && <BreadcrumbSeparator size={size}>{separator}</BreadcrumbSeparator>}
          </React.Fragment>
        );
      }

      return (
        <React.Fragment key={`${item.label}-${index}`}>
          <Text
            as="span"
            className={cn(
              breadcrumbItemVariants({
                variant,
                state: item.disabled ? 'disabled' : isLast ? 'current' : 'default',
                interactive: false,
              })
            )}
            aria-current={isLast ? 'page' : undefined}
          >
            {itemContent}
          </Text>
          {!isLast && <BreadcrumbSeparator size={size}>{separator}</BreadcrumbSeparator>}
        </React.Fragment>
      );
    };

    return (
      <Box
        as="nav"
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(breadcrumbVariants({ variant, size }), className)}
        {...props}
      >
        <List className="flex items-center gap-1 list-none m-0 p-0">
          {/* Home Item */}
          {showHome && (
            <>
              <ListItem>
                {homeHref ? (
                  <Link
                    href={homeHref}
                    className={cn(
                      breadcrumbItemVariants({ variant, interactive: true }),
                      'px-1 py-0.5 -mx-1 -my-0.5 w-5 h-5'
                    )}
                    aria-label="Home"
                  >
                    {homeIcon || <HomeIcon />}
                  </Link>
                ) : (
                  <Text
                    as="button"
                    type="button"
                    onClick={onHomeClick}
                    className={cn(
                      breadcrumbItemVariants({ variant, interactive: true }),
                      'px-1 py-0.5 -mx-1 -my-0.5 w-5 h-5 border-none bg-transparent'
                    )}
                    aria-label="Home"
                  >
                    {homeIcon || <HomeIcon />}
                  </Text>
                )}
              </ListItem>
              {items.length > 0 && (
                <ListItem>
                  <BreadcrumbSeparator size={size}>{separator}</BreadcrumbSeparator>
                </ListItem>
              )}
            </>
          )}

          {/* Before Ellipsis Items */}
          {beforeEllipsis.map((item, index) => (
            <ListItem key={`before-${index}`}>{renderBreadcrumbItem(item, index, false)}</ListItem>
          ))}

          {/* Ellipsis */}
          {showEllipsis && (
            <>
              <ListItem>
                <BreadcrumbSeparator size={size}>{separator}</BreadcrumbSeparator>
              </ListItem>
              <ListItem>
                <Text
                  as="span"
                  className="inline-flex items-center text-muted-foreground w-4 h-4"
                  aria-label="More items"
                >
                  <EllipsisIcon />
                </Text>
              </ListItem>
              <ListItem>
                <BreadcrumbSeparator size={size}>{separator}</BreadcrumbSeparator>
              </ListItem>
            </>
          )}

          {/* After Ellipsis Items */}
          {afterEllipsis.map((item, index) => {
            const actualIndex = beforeEllipsis.length + index;
            const isLast = index === afterEllipsis.length - 1;
            return (
              <ListItem key={`after-${index}`}>
                {renderBreadcrumbItem(item, actualIndex, isLast)}
              </ListItem>
            );
          })}

          {/* All items when no truncation */}
          {!showEllipsis &&
            beforeEllipsis.map((item, index) => {
              const isLast = index === beforeEllipsis.length - 1;
              return <ListItem key={index}>{renderBreadcrumbItem(item, index, isLast)}</ListItem>;
            })}
        </List>
      </Box>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

// Export variants for external use
export { breadcrumbVariants, breadcrumbItemVariants, breadcrumbSeparatorVariants };
export type BreadcrumbVariant = VariantProps<typeof breadcrumbVariants>;
export type BreadcrumbItemVariant = VariantProps<typeof breadcrumbItemVariants>;
export type BreadcrumbSeparatorVariant = VariantProps<typeof breadcrumbSeparatorVariants>;
