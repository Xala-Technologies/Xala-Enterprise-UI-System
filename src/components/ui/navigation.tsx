/* eslint-disable no-console */
/**
 * @fileoverview Navigation Component v5.0.0 - Token-Based Design System
 * @description Comprehensive Navigation system using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { Typography } from './typography';
import { Badge } from './badge';
import { Separator } from './separator';

// =============================================================================
// NAVIGATION VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Navigation variants following CVA pattern
 */
const navigationVariants = cva(
  [
    'flex',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        filled: 'bg-card border border-border',
        elevated: 'bg-card shadow-md border border-border',
        minimal: 'bg-transparent',
        sidebar: 'bg-card border-r border-border h-full',
        horizontal: 'bg-background border-b border-border',
      },
      orientation: {
        vertical: 'flex-col',
        horizontal: 'flex-row items-center',
      },
      spacing: {
        none: 'gap-0',
        sm: 'gap-1',
        md: 'gap-2',
        lg: 'gap-4',
        xl: 'gap-6',
      },
      padding: {
        none: 'p-0',
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      orientation: 'vertical',
      spacing: 'md',
      padding: 'md',
    },
  }
);

const navigationItemVariants = cva(
  [
    'relative flex items-center justify-between',
    'transition-all duration-150',
    'motion-reduce:transition-none',
    'focus:outline-none focus:ring-2 focus:ring-primary/20',
  ],
  {
    variants: {
      variant: {
        default: [
          'text-muted-foreground hover:text-foreground',
          'hover:bg-muted/50',
        ],
        active: [
          'text-primary bg-primary/10',
          'hover:bg-primary/15',
        ],
        ghost: [
          'text-muted-foreground hover:text-foreground',
          'hover:bg-transparent',
        ],
        filled: [
          'text-foreground bg-muted',
          'hover:bg-muted/80',
        ],
      },
      size: {
        sm: 'px-2 py-1.5 text-sm',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-3 text-base',
        xl: 'px-6 py-4 text-lg',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: 'md',
      disabled: false,
    },
  }
);

const navigationGroupVariants = cva(
  'space-y-1',
  {
    variants: {
      collapsible: {
        true: 'transition-all duration-200',
        false: '',
      },
    },
    defaultVariants: {
      collapsible: false,
    },
  }
);

const navigationLinkVariants = cva(
  [
    'inline-flex items-center gap-2',
    'no-underline',
    'transition-colors duration-150',
    'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default: 'text-foreground hover:text-primary',
        primary: 'text-primary hover:text-primary/80',
        muted: 'text-muted-foreground hover:text-foreground',
        destructive: 'text-destructive hover:text-destructive/80',
      },
      underline: {
        none: 'no-underline',
        hover: 'hover:underline',
        always: 'underline',
      },
    },
    defaultVariants: {
      variant: 'default',
      underline: 'hover',
    },
  }
);

// =============================================================================
// NAVIGATION INTERFACES
// =============================================================================

export interface NavigationProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navigationVariants> {
  /** Navigation items */
  readonly items?: NavigationItemData[];
  /** Show separator between items */
  readonly showSeparator?: boolean;
  /** Allow multi-select for active items */
  readonly multiSelect?: boolean;
  /** Active item keys */
  readonly activeKeys?: string[];
  /** Item selection handler */
  readonly onItemSelect?: (key: string, item: NavigationItemData) => void;
  /** Enable keyboard navigation */
  readonly keyboardNavigation?: boolean;
  /** ARIA label for navigation */
  readonly ariaLabel?: string;
}

export interface NavigationItemProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'children'>,
    VariantProps<typeof navigationItemVariants> {
  /** Item unique key */
  readonly itemKey: string;
  /** Item label */
  readonly label: ReactNode;
  /** Item description */
  readonly description?: ReactNode;
  /** Leading icon */
  readonly icon?: ReactNode;
  /** Trailing icon */
  readonly trailingIcon?: ReactNode;
  /** Badge content */
  readonly badge?: ReactNode;
  /** Badge variant */
  readonly badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  /** Item href for links */
  readonly href?: string;
  /** External link */
  readonly external?: boolean;
  /** Click handler */
  readonly onClick?: (key: string) => void;
  /** Active state */
  readonly active?: boolean;
  /** Keyboard shortcut */
  readonly shortcut?: string;
  /** Sub-items for nested navigation */
  readonly children?: NavigationItemData[];
  /** Expandable state */
  readonly expanded?: boolean;
  /** Toggle expand handler */
  readonly onToggleExpand?: (key: string) => void;
}

export interface NavigationGroupProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof navigationGroupVariants> {
  /** Group title */
  readonly title?: ReactNode;
  /** Group description */
  readonly description?: ReactNode;
  /** Group items */
  readonly items: NavigationItemData[];
  /** Collapsible group */
  readonly collapsible?: boolean;
  /** Default collapsed state */
  readonly defaultCollapsed?: boolean;
  /** Collapsed state */
  readonly collapsed?: boolean;
  /** Toggle collapse handler */
  readonly onToggleCollapse?: () => void;
  /** Item selection handler */
  readonly onItemSelect?: (key: string, item: NavigationItemData) => void;
  /** Active item keys */
  readonly activeKeys?: string[];
}

export interface NavigationLinkProps 
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navigationLinkVariants> {
  /** Link text */
  readonly children: ReactNode;
  /** Leading icon */
  readonly icon?: ReactNode;
  /** Trailing icon */
  readonly trailingIcon?: ReactNode;
  /** External link */
  readonly external?: boolean;
  /** Disable link */
  readonly disabled?: boolean;
}

export interface NavigationItemData {
  readonly key: string;
  readonly label: ReactNode;
  readonly description?: ReactNode;
  readonly icon?: ReactNode;
  readonly trailingIcon?: ReactNode;
  readonly badge?: ReactNode;
  readonly badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  readonly href?: string;
  readonly external?: boolean;
  readonly disabled?: boolean;
  readonly shortcut?: string;
  readonly children?: NavigationItemData[];
  readonly group?: string;
}

// =============================================================================
// NAVIGATION SUB-COMPONENTS
// =============================================================================

/**
 * Navigation Item Component
 */
export const NavigationItem = forwardRef<HTMLDivElement, NavigationItemProps>(
  ({
    itemKey,
    label,
    description,
    icon,
    trailingIcon,
    badge,
    badgeVariant = 'default',
    href,
    external = false,
    onClick,
    active = false,
    shortcut,
    children = [],
    expanded = false,
    onToggleExpand,
    variant,
    size,
    rounded,
    disabled,
    className,
    ...props
  }, ref) => {
    const hasChildren = children.length > 0;
    const isExpandable = hasChildren && onToggleExpand;
    
    const handleClick = () => {
      if (disabled) return;
      
      if (isExpandable) {
        onToggleExpand?.(itemKey);
      } else {
        onClick?.(itemKey);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    };

    const ItemContent = (
      <>
        {/* Leading icon */}
        {icon && (
          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
            {icon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate font-medium">{label}</span>
            {badge && (
              <Badge variant={badgeVariant} size="sm">
                {badge}
              </Badge>
            )}
          </div>
          {description && (
            <Typography variant="small" className="text-muted-foreground truncate">
              {description}
            </Typography>
          )}
        </div>

        {/* Trailing content */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {shortcut && (
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              {shortcut}
            </kbd>
          )}
          
          {trailingIcon && (
            <div className="w-4 h-4 flex items-center justify-center">
              {trailingIcon}
            </div>
          )}
          
          {isExpandable && (
            <div className={cn(
              'w-4 h-4 flex items-center justify-center transition-transform',
              expanded && 'rotate-90'
            )}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
          
          {external && (
            <div className="w-3 h-3 flex items-center justify-center">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          )}
        </div>
      </>
    );

    if (href && !disabled) {
      return (
        <div ref={ref} className={className} {...props}>
          <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className={cn(
              navigationItemVariants({ 
                variant: active ? 'active' : variant, 
                size, 
                rounded, 
                disabled 
              }),
              'w-full'
            )}
            aria-label={typeof label === 'string' ? label : undefined}
          >
            {ItemContent}
          </a>
          
          {/* Sub-items */}
          {hasChildren && expanded && (
            <div className="ml-6 mt-1 space-y-1">
              {children.map((child) => (
                <NavigationItem
                  key={child.key}
                  itemKey={child.key}
                  label={child.label}
                  description={child.description}
                  icon={child.icon}
                  trailingIcon={child.trailingIcon}
                  badge={child.badge}
                  badgeVariant={child.badgeVariant}
                  href={child.href}
                  external={child.external}
                  onClick={onClick}
                  disabled={child.disabled}
                  shortcut={child.shortcut}
                  size="sm"
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div ref={ref} className={className} {...props}>
        <div
          className={cn(
            navigationItemVariants({ 
              variant: active ? 'active' : variant, 
              size, 
              rounded, 
              disabled 
            }),
            'w-full'
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={typeof label === 'string' ? label : undefined}
          aria-expanded={isExpandable ? expanded : undefined}
        >
          {ItemContent}
        </div>
        
        {/* Sub-items */}
        {hasChildren && expanded && (
          <div className="ml-6 mt-1 space-y-1">
            {children.map((child) => (
              <NavigationItem
                key={child.key}
                itemKey={child.key}
                label={child.label}
                description={child.description}
                icon={child.icon}
                trailingIcon={child.trailingIcon}
                badge={child.badge}
                badgeVariant={child.badgeVariant}
                href={child.href}
                external={child.external}
                onClick={onClick}
                disabled={child.disabled}
                shortcut={child.shortcut}
                size="sm"
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

NavigationItem.displayName = 'NavigationItem';

/**
 * Navigation Group Component
 */
export const NavigationGroup = forwardRef<HTMLDivElement, NavigationGroupProps>(
  ({
    title,
    description,
    items,
    collapsible = false,
    defaultCollapsed = false,
    collapsed: controlledCollapsed,
    onToggleCollapse,
    onItemSelect,
    activeKeys = [],
    className,
    ...props
  }, ref) => {
    // Use controlled collapsed state only
    const collapsed = controlledCollapsed ?? defaultCollapsed;

    const handleToggleCollapse = () => {
      onToggleCollapse?.();
    };

    return (
      <div ref={ref} className={cn(navigationGroupVariants({ collapsible }), className)} {...props}>
        {/* Group header */}
        {(title || description) && (
          <div className="mb-2">
            {title && (
              <div className="flex items-center justify-between mb-1">
                <Typography 
                  variant="small" 
                  className="font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  {title}
                </Typography>
                {collapsible && (
                  <button
                    onClick={handleToggleCollapse}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={collapsed ? 'Expand group' : 'Collapse group'}
                  >
                    <svg 
                      className={cn('w-4 h-4 transition-transform', collapsed && 'rotate-180')} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
            )}
            {description && (
              <Typography variant="small" className="text-muted-foreground">
                {description}
              </Typography>
            )}
            <Separator className="mt-2" />
          </div>
        )}

        {/* Group items */}
        {!collapsed && (
          <div className="space-y-1">
            {items.map((item) => (
              <NavigationItem
                key={item.key}
                itemKey={item.key}
                label={item.label}
                description={item.description}
                icon={item.icon}
                trailingIcon={item.trailingIcon}
                badge={item.badge}
                badgeVariant={item.badgeVariant}
                href={item.href}
                external={item.external}
                onClick={onItemSelect ? (key) => onItemSelect(key, item) : undefined}
                active={activeKeys.includes(item.key)}
                disabled={item.disabled}
                shortcut={item.shortcut}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

NavigationGroup.displayName = 'NavigationGroup';

/**
 * Navigation Link Component
 */
export const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  ({
    children,
    icon,
    trailingIcon,
    external = false,
    disabled = false,
    variant,
    underline,
    className,
    href,
    ...props
  }, ref) => {
    if (disabled) {
      return (
        <span 
          className={cn(
            navigationLinkVariants({ variant, underline }),
            'opacity-50 cursor-not-allowed',
            className
          )}
        >
          {icon}
          {children}
          {trailingIcon}
        </span>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cn(navigationLinkVariants({ variant, underline }), className)}
        {...props}
      >
        {icon}
        {children}
        {trailingIcon}
        {external && (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </a>
    );
  }
);

NavigationLink.displayName = 'NavigationLink';

// =============================================================================
// MAIN NAVIGATION COMPONENT
// =============================================================================

/**
 * Navigation Component with token-based styling
 * Provides comprehensive navigation layouts for applications
 */
export const Navigation = forwardRef<HTMLElement, NavigationProps>(
  ({
    items = [],
    showSeparator = false,
    multiSelect = false,
    activeKeys = [],
    onItemSelect,
    keyboardNavigation = true,
    ariaLabel = 'Navigation',
    variant,
    orientation,
    spacing,
    padding,
    className,
    children,
    ...props
  }, ref) => {
    // Handle item expansion - now requires external state management
    const handleToggleExpand = (key: string) => {
      // This should be handled by parent component through props
      console.warn('Navigation: Item expansion should be handled by parent component');
    };

    // Group items by group property - computed inline
    const groups: Record<string, NavigationItemData[]> = {};
    const ungrouped: NavigationItemData[] = [];

    items.forEach(item => {
      if (item.group) {
        if (!groups[item.group]) {
          groups[item.group] = [];
        }
        groups[item.group].push(item);
      } else {
        ungrouped.push(item);
      }
    });

    const groupedItems = { groups, ungrouped };

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label={ariaLabel}
        className={cn(
          navigationVariants({ variant, orientation, spacing, padding }),
          className
        )}
        {...props}
      >
        {children ? (
          children
        ) : (
          <>
            {/* Ungrouped items */}
            {groupedItems.ungrouped.length > 0 && (
              <div className={cn(
                orientation === 'vertical' ? 'space-y-1' : 'flex items-center gap-2'
              )}>
                {groupedItems.ungrouped.map((item, index) => (
                  <React.Fragment key={item.key}>
                    <NavigationItem
                      itemKey={item.key}
                      label={item.label}
                      description={item.description}
                      icon={item.icon}
                      trailingIcon={item.trailingIcon}
                      badge={item.badge}
                      badgeVariant={item.badgeVariant}
                      href={item.href}
                      external={item.external}
                      onClick={onItemSelect ? (key) => onItemSelect(key, item) : undefined}
                      active={activeKeys.includes(item.key)}
                      disabled={item.disabled}
                      shortcut={item.shortcut}
                      children={item.children}
                      expanded={false} // External state management required
                      onToggleExpand={item.children ? handleToggleExpand : undefined}
                    />
                    {showSeparator && index < groupedItems.ungrouped.length - 1 && (
                      <Separator orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Grouped items */}
            {Object.entries(groupedItems.groups).map(([groupName, groupItems]) => (
              <NavigationGroup
                key={groupName}
                title={groupName}
                items={groupItems}
                onItemSelect={onItemSelect}
                activeKeys={activeKeys}
              />
            ))}
          </>
        )}
      </nav>
    );
  }
);

Navigation.displayName = 'Navigation';

// =============================================================================
// NAVIGATION COMPOSITIONS
// =============================================================================

/**
 * Pre-built navigation compositions for common use cases
 */
export const NavigationComposition = {
  /**
   * Sidebar navigation
   */
  Sidebar: ({ 
    items, 
    activeKeys, 
    onItemSelect, 
    ...props 
  }: Omit<NavigationProps, 'variant' | 'orientation'>) => (
    <Navigation
      items={items}
      activeKeys={activeKeys}
      onItemSelect={onItemSelect}
      variant="sidebar"
      orientation="vertical"
      spacing="sm"
      padding="md"
      {...props}
    />
  ),

  /**
   * Top navigation bar
   */
  TopBar: ({ 
    items, 
    activeKeys, 
    onItemSelect, 
    ...props 
  }: Omit<NavigationProps, 'variant' | 'orientation'>) => (
    <Navigation
      items={items}
      activeKeys={activeKeys}
      onItemSelect={onItemSelect}
      variant="horizontal"
      orientation="horizontal"
      spacing="lg"
      padding="md"
      showSeparator
      {...props}
    />
  ),

  /**
   * Tab navigation
   */
  Tabs: ({ 
    items, 
    activeKeys, 
    onItemSelect, 
    ...props 
  }: Omit<NavigationProps, 'variant' | 'orientation'>) => (
    <Navigation
      items={items}
      activeKeys={activeKeys}
      onItemSelect={onItemSelect}
      variant="minimal"
      orientation="horizontal"
      spacing="md"
      padding="sm"
      {...props}
    />
  ),

  /**
   * Minimal navigation
   */
  Minimal: ({ 
    items, 
    activeKeys, 
    onItemSelect, 
    ...props 
  }: Omit<NavigationProps, 'variant'>) => (
    <Navigation
      items={items}
      activeKeys={activeKeys}
      onItemSelect={onItemSelect}
      variant="minimal"
      spacing="sm"
      padding="none"
      {...props}
    />
  ),
};

// Export variants for external usage
export { navigationVariants, navigationItemVariants, navigationGroupVariants, navigationLinkVariants };
export type NavigationVariant = VariantProps<typeof navigationVariants>;
export type NavigationItemVariant = VariantProps<typeof navigationItemVariants>;
export type NavigationGroupVariant = VariantProps<typeof navigationGroupVariants>;
export type NavigationLinkVariant = VariantProps<typeof navigationLinkVariants>;