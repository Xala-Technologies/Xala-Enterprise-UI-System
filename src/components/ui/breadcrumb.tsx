/**
 * @fileoverview SSR-Safe Breadcrumb Component - Production Strategy Implementation
 * @description Breadcrumb component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Breadcrumb variant types
 */
export type BreadcrumbVariant = 'default' | 'primary' | 'secondary';

/**
 * Breadcrumb size types
 */
export type BreadcrumbSize = 'sm' | 'default' | 'lg';

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
export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
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
  /** Breadcrumb styling variant */
  readonly variant?: BreadcrumbVariant;
  /** Breadcrumb size */
  readonly size?: BreadcrumbSize;
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
  { size?: BreadcrumbSize; children?: ReactNode }
>(
  ({ size = 'default', children }, ref): React.ReactElement => {
    const separatorSizeMap = {
      sm: '12px',
      default: '16px',
      lg: '20px',
    };
    
    return (
      <span
        ref={ref}
        role="presentation"
        aria-hidden="true"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: separatorSizeMap[size || 'default'],
          height: separatorSizeMap[size || 'default'],
        }}
      >
        {children || <ChevronRightIcon />}
      </span>
    );
  }
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

/**
 * Breadcrumb component
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      separator,
      maxItems = 0,
      showHome = false,
      homeIcon,
      homeHref = '/', // eslint-disable-line @typescript-eslint/no-unused-vars
      onHomeClick,
      variant = 'default',
      size = 'default',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { colors, typography, spacing } = useTokens();
    
    // Get variant styles
    const getVariantColor = (): string => {
      switch (variant) {
        case 'primary':
          return `rgba(${hexToRgb(colors.primary?.[500] || '#3b82f6')}, 0.8)`;
        case 'secondary':
          return `rgba(${hexToRgb(colors.secondary?.[500] || '#8b5cf6')}, 0.8)`;
        default:
          return colors.text?.secondary || colors.neutral?.[500] || '#6b7280';
      }
    };
    
    // Get size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return { fontSize: typography?.fontSize?.xs || '0.75rem' };
        case 'lg':
          return { fontSize: typography?.fontSize?.base || '1rem' };
        default:
          return { fontSize: typography?.fontSize?.sm || '0.875rem' };
      }
    };
    
    // Base breadcrumb styles
    const breadcrumbStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      color: getVariantColor(),
      fontFamily: typography?.fontFamily?.sans?.join(', ') || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      ...getSizeStyles(),
      ...style,
    };
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
      
      const itemStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        transition: 'color 150ms ease-in-out',
        outline: 'none',
        borderRadius: '4px',
        padding: '2px 4px',
        margin: '-2px -4px',
        fontWeight: isLast ? typography?.fontWeight?.medium || 500 : typography?.fontWeight?.normal || 400,
        color: isLast ? (colors.text?.primary || colors.neutral?.[900] || '#111827') : 'inherit',
        cursor: isLast ? 'default' : (item.disabled ? 'not-allowed' : 'pointer'),
        opacity: item.disabled ? 0.5 : 1,
        border: 'none',
        background: 'transparent',
        textDecoration: 'none',
      };
      
      const hoverStyles = !isLast && !item.disabled ? {
        '&:hover': {
          color: variant === 'primary' ? (colors.primary?.[500] || '#3b82f6') : 
                 variant === 'secondary' ? (colors.secondary?.[500] || '#8b5cf6') : 
                 (colors.text?.primary || colors.neutral?.[900] || '#111827'),
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: colors.primary?.[500] || '#3b82f6',
          outlineOffset: '2px',
        },
      } : {};

      return (
        <React.Fragment key={`${item.label}-${index}`}>
          <ItemComponent
            {...(item.href && { href: item.href })}
            onClick={item.onClick}
            disabled={item.disabled}
            style={{
              ...itemStyles,
              ...Object.entries(hoverStyles).reduce((acc, [key, value]) => {
                if (key.startsWith('&:')) {
                  // Handle pseudo-classes manually
                  return acc;
                }
                return { ...acc, [key]: value };
              }, {}),
            }}
            aria-current={isLast ? 'page' : undefined}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing?.[1] || '0.25rem' }}>
              {item.icon && <span style={{ width: '16px', height: '16px' }}>{item.icon}</span>}
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
        className={className}
        style={breadcrumbStyles}
        {...props}
      >
        <ol style={{ display: 'flex', alignItems: 'center', gap: spacing?.[1] || '0.25rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {/* Home Item */}
          {showHome && (
            <>
              <li>
                <button
                  onClick={onHomeClick}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    transition: 'color 150ms ease-in-out',
                    outline: 'none',
                    borderRadius: '4px',
                    padding: '2px 4px',
                    margin: '-2px -4px',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'transparent',
                    color: 'inherit',
                  }}
                  aria-label="Home"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = variant === 'primary' ? (colors.primary?.[500] || '#3b82f6') : 
                                                   variant === 'secondary' ? (colors.secondary?.[500] || '#8b5cf6') : 
                                                   (colors.text?.primary || colors.neutral?.[900] || '#111827');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'inherit';
                  }}
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
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: 'inherit',
                  }}
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
 * Helper function to convert hex to RGB
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}
