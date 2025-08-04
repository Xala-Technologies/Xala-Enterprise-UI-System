/**
 * @fileoverview Semantic Navigation Component v5.0.0 - Navigation Structure Abstraction
 * @description Semantic navigation with i18n support, design tokens, and accessibility
 * @version 5.0.0
 * @compliance WCAG AAA, SSR-Safe, Framework-agnostic, Norwegian compliance, i18n-ready
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTranslation } from '../../i18n/hooks/useTranslation';

// =============================================================================
// SEMANTIC NAVIGATION TYPES
// =============================================================================

/**
 * Navigation semantic intents for automatic configuration
 */
export type NavigationIntent = 
  | 'primary'       // Main site navigation
  | 'secondary'     // Secondary navigation
  | 'sidebar'       // Sidebar navigation
  | 'tabs'          // Tab navigation
  | 'breadcrumb'    // Breadcrumb navigation
  | 'pagination'    // Page navigation
  | 'steps'         // Step navigation
  | 'menu'          // Context menu
  | 'toolbar'       // Action toolbar
  | 'footer';       // Footer navigation

/**
 * Navigation item with semantic properties
 */
export interface NavigationItem {
  /** Item unique key */
  readonly key: string;
  /** Item label (can be translation key) */
  readonly label: string;
  /** Translation key for label */
  readonly labelKey?: string;
  /** Item description */
  readonly description?: string;
  /** Description translation key */
  readonly descriptionKey?: string;
  /** Leading icon */
  readonly icon?: React.ReactNode;
  /** Trailing icon */
  readonly trailingIcon?: React.ReactNode;
  /** Badge content */
  readonly badge?: React.ReactNode;
  /** Badge translation key */
  readonly badgeKey?: string;
  /** Item href for links */
  readonly href?: string;
  /** External link */
  readonly external?: boolean;
  /** Click handler */
  readonly onClick?: () => void;
  /** Disabled state */
  readonly disabled?: boolean;
  /** Keyboard shortcut */
  readonly shortcut?: string;
  /** Sub-items for nested navigation */
  readonly children?: NavigationItem[];
  /** Group name for grouping */
  readonly group?: string;
  /** Norwegian compliance level */
  readonly nsmLevel?: 'OPEN' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';
  /** Additional metadata */
  readonly metadata?: Record<string, any>;
}

// =============================================================================
// NAVIGATION VARIANTS USING CVA AND DESIGN TOKENS
// =============================================================================

const navigationVariants = cva(
  [
    'flex transition-all duration-200 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      // Intent-based variants
      intent: {
        primary: 'bg-background border-b border-border',
        secondary: 'bg-muted/30',
        sidebar: 'bg-card border-r border-border h-full flex-col',
        tabs: 'border-b border-border',
        breadcrumb: 'bg-transparent',
        pagination: 'bg-transparent justify-center',
        steps: 'bg-muted/20 p-4 rounded-lg',
        menu: 'bg-card border border-border shadow-lg rounded-md p-1',
        toolbar: 'bg-muted/30 border border-border rounded-md p-1',
        footer: 'bg-muted/50 border-t border-border',
      },

      // Orientation
      orientation: {
        horizontal: 'flex-row items-center',
        vertical: 'flex-col',
      },

      // Size variants
      size: {
        sm: 'text-xs gap-1 p-2',
        default: 'text-sm gap-2 p-4', 
        lg: 'text-base gap-4 p-6',
      },

      // Spacing variants
      spacing: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },

      // Responsive behavior
      responsive: {
        true: 'hidden sm:flex',
        false: 'flex',
      },
    },
    compoundVariants: [
      // Primary navigation styling
      {
        intent: 'primary',
        orientation: 'horizontal',
        className: 'justify-between px-4 py-3',
      },
      // Sidebar navigation styling
      {
        intent: 'sidebar',
        className: 'w-64 min-h-screen p-4',
      },
      // Tab navigation styling
      {
        intent: 'tabs',
        orientation: 'horizontal',
        className: 'px-4 overflow-x-auto',
      },
      // Steps navigation styling
      {
        intent: 'steps',
        orientation: 'horizontal',
        className: 'justify-between items-center',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      orientation: 'horizontal',
      size: 'default',
      spacing: 'md',
      responsive: false,
    },
  }
);

const navigationItemVariants = cva(
  [
    'relative flex items-center transition-all duration-150',
    'outline-none rounded-md',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  ],
  {
    variants: {
      // Interactive states
      interactive: {
        true: 'cursor-pointer hover:bg-muted/50',
        false: 'cursor-default',
      },

      // Item states
      state: {
        default: 'text-foreground',
        active: 'text-primary bg-primary/10 font-medium',
        disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
        restricted: 'text-orange-600 dark:text-orange-400',
        confidential: 'text-red-600 dark:text-red-400',
        secret: 'text-red-700 dark:text-red-300 font-semibold',
      },

      // Size variants
      size: {
        sm: 'px-2 py-1.5 text-xs gap-2',
        default: 'px-3 py-2 text-sm gap-2',
        lg: 'px-4 py-3 text-base gap-3',
      },

      // Intent-based styling
      intent: {
        primary: 'hover:bg-primary/10',
        secondary: 'hover:bg-muted',
        sidebar: 'w-full justify-start hover:bg-muted/70',
        tabs: 'border-b-2 border-transparent hover:border-muted-foreground',
        breadcrumb: 'hover:text-primary hover:underline',
        pagination: 'border border-border hover:bg-muted',
        steps: 'flex-col items-center text-center',
        menu: 'w-full justify-start hover:bg-muted',
        toolbar: 'hover:bg-muted',
        footer: 'hover:text-primary',
      },
    },
    compoundVariants: [
      // Active tab styling
      {
        intent: 'tabs',
        state: 'active',
        className: 'border-b-primary text-primary',
      },
      // Active step styling
      {
        intent: 'steps',
        state: 'active',
        className: 'text-primary',
      },
      // Sidebar active item
      {
        intent: 'sidebar',
        state: 'active',
        className: 'bg-primary/15 border-r-2 border-r-primary',
      },
    ],
    defaultVariants: {
      interactive: true,
      state: 'default',
      size: 'default',
      intent: 'primary',
    },
  }
);

const navigationGroupVariants = cva(
  'space-y-1',
  {
    variants: {
      intent: {
        primary: '',
        secondary: '',
        sidebar: 'space-y-2',
        tabs: 'flex space-y-0 space-x-2',
        breadcrumb: 'flex space-y-0 space-x-1',
        pagination: 'flex space-y-0 space-x-1',
        steps: 'flex space-y-0 space-x-4',
        menu: 'space-y-1',
        toolbar: 'flex space-y-0 space-x-1',
        footer: 'flex space-y-0 space-x-4',
      },
      collapsible: {
        true: 'transition-all duration-200',
        false: '',
      },
    },
    defaultVariants: {
      intent: 'primary',
      collapsible: false,
    },
  }
);

// =============================================================================
// NAVIGATION COMPONENT INTERFACE
// =============================================================================

export interface NavigationProps 
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'>,
    VariantProps<typeof navigationVariants> {
  /** Navigation items */
  readonly items: NavigationItem[];
  /** Active item keys */
  readonly activeKeys?: string[];
  /** Allow multi-select for active items */
  readonly multiSelect?: boolean;
  /** Item selection handler */
  readonly onItemSelect?: (key: string, item: NavigationItem) => void;
  /** Show separator between items */
  readonly showSeparator?: boolean;
  /** Enable keyboard navigation */
  readonly keyboardNavigation?: boolean;
  /** ARIA label */
  readonly ariaLabel?: string;
  /** ARIA label translation key */
  readonly ariaLabelKey?: string;
  /** Custom children override */
  readonly children?: React.ReactNode;
}

export interface NavigationGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navigationGroupVariants> {
  /** Group title */
  readonly title?: string;
  /** Group title translation key */
  readonly titleKey?: string;
  /** Group description */
  readonly description?: string;
  /** Group description translation key */
  readonly descriptionKey?: string;
  /** Group items */
  readonly items: NavigationItem[];
  /** Collapsible group */
  readonly collapsible?: boolean;
  /** Default collapsed state */
  readonly defaultCollapsed?: boolean;
  /** Collapsed state (controlled) */
  readonly collapsed?: boolean;
  /** Toggle collapse handler */
  readonly onToggleCollapse?: () => void;
  /** Item selection handler */
  readonly onItemSelect?: (key: string, item: NavigationItem) => void;
  /** Active item keys */
  readonly activeKeys?: string[];
}

// =============================================================================
// NAVIGATION SUB-COMPONENTS
// =============================================================================

/**
 * Navigation Item Component
 */
const NavigationItemComponent = forwardRef<HTMLDivElement, {
  item: NavigationItem;
  intent: NavigationIntent;
  size: 'sm' | 'default' | 'lg';
  isActive: boolean;
  onSelect?: (key: string, item: NavigationItem) => void;
}>(({ item, intent, size, isActive, onSelect }, ref) => {
  const { t } = useTranslation();
  
  const resolvedLabel = item.labelKey ? t(item.labelKey) : item.label;
  const resolvedDescription = item.descriptionKey ? t(item.descriptionKey) : item.description;
  const resolvedBadge = item.badgeKey ? t(item.badgeKey) : item.badge;
  
  // Get item state based on NSM level and active state
  const getItemState = () => {
    if (item.disabled) return 'disabled';
    if (isActive) return 'active';
    if (item.nsmLevel === 'RESTRICTED') return 'restricted';
    if (item.nsmLevel === 'CONFIDENTIAL') return 'confidential';
    if (item.nsmLevel === 'SECRET') return 'secret';
    return 'default';
  };

  const itemState = getItemState();
  const isInteractive = !!(item.href || item.onClick) && !item.disabled;

  const handleClick = () => {
    if (item.disabled) return;
    item.onClick?.();
    onSelect?.(item.key, item);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const itemContent = (
    <>
      {/* Leading icon */}
      {item.icon && (
        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
          {item.icon}
        </span>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium">{resolvedLabel}</span>
          {resolvedBadge && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
              {resolvedBadge}
            </span>
          )}
          {item.nsmLevel && (
            <span className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-current/20">
              {item.nsmLevel}
            </span>
          )}
        </div>
        {resolvedDescription && (
          <div className="text-xs text-muted-foreground truncate mt-0.5">
            {resolvedDescription}
          </div>
        )}
      </div>

      {/* Trailing content */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {item.shortcut && (
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            {item.shortcut}
          </kbd>
        )}
        
        {item.trailingIcon && (
          <span className="w-4 h-4 flex items-center justify-center">
            {item.trailingIcon}
          </span>
        )}
        
        {item.external && (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </div>
    </>
  );

  const itemProps = {
    ref,
    className: cn(
      navigationItemVariants({
        interactive: isInteractive,
        state: itemState,
        size,
        intent,
      })
    ),
    'data-nsm-level': item.nsmLevel,
    'aria-current': isActive ? ('page' as const) : undefined,
    'aria-disabled': item.disabled,
  };

  if (item.href && !item.disabled) {
    return (
      <a
        href={item.href}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
        onClick={(e) => {
          if (item.onClick) {
            e.preventDefault();
            item.onClick();
          }
          onSelect?.(item.key, item);
        }}
        {...itemProps}
      >
        {itemContent}
      </a>
    );
  }

  if (item.onClick && !item.disabled) {
    return (
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...itemProps}
        className={cn(itemProps.className, 'w-full border-none bg-transparent text-left')}
      >
        {itemContent}
      </button>
    );
  }

  return (
    <div
      {...itemProps}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive && !item.disabled ? 0 : -1}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
    >
      {itemContent}
    </div>
  );
});

NavigationItemComponent.displayName = 'NavigationItemComponent';

/**
 * Navigation Group Component
 */
export const NavigationGroup = forwardRef<HTMLDivElement, NavigationGroupProps>(
  (
    {
      title,
      titleKey,
      description,
      descriptionKey,
      items,
      intent = 'primary',
      collapsible = false,
      defaultCollapsed = false,
      collapsed: controlledCollapsed,
      onToggleCollapse,
      onItemSelect,
      activeKeys = [], 
      className,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();
    const collapsed = controlledCollapsed ?? defaultCollapsed;
    
    const resolvedTitle = titleKey ? t(titleKey) : title;
    const resolvedDescription = descriptionKey ? t(descriptionKey) : description;

    const handleToggleCollapse = () => {
      onToggleCollapse?.();
    };

    return (
      <div
        ref={ref}
        className={cn(navigationGroupVariants({ intent, collapsible }), className)}
        {...props}
      >
        {/* Group header */}
        {(resolvedTitle || resolvedDescription) && (
          <div className="mb-2">
            {resolvedTitle && (
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {resolvedTitle}
                </h3>
                {collapsible && (
                  <button
                    onClick={handleToggleCollapse}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label={collapsed ? t('navigation.expand') : t('navigation.collapse')}
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
            {resolvedDescription && (
              <p className="text-xs text-muted-foreground mb-2">
                {resolvedDescription}
              </p>
            )}
            <div className="h-px bg-border mb-2" />
          </div>
        )}

        {/* Group items */}
        {!collapsed && (
          <div className={navigationGroupVariants({ intent })}>
            {items.map((item) => (
              <NavigationItemComponent
                key={item.key}
                item={item}
                intent={intent || 'primary'}
                size="default"
                isActive={activeKeys.includes(item.key)}
                onSelect={onItemSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

NavigationGroup.displayName = 'NavigationGroup';

// =============================================================================
// SEMANTIC NAVIGATION COMPONENT
// =============================================================================

export const Navigation = forwardRef<HTMLElement, NavigationProps>(
  (
    {
      items,
      intent = 'primary',
      orientation = 'horizontal',
      size = 'default',
      spacing = 'md',
      responsive = false,
      activeKeys = [],
      multiSelect = false,
      onItemSelect,
      showSeparator = false,
      keyboardNavigation = true,
      ariaLabel,
      ariaLabelKey = 'navigation.main',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { t, getDirectionalClasses } = useTranslation();

    // Group items by group property
    const groupedItems = items.reduce((acc, item) => {
      const groupName = item.group || 'ungrouped';
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(item);
      return acc;
    }, {} as Record<string, NavigationItem[]>);

    const resolvedAriaLabel = ariaLabelKey ? t(ariaLabelKey) : ariaLabel;

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label={resolvedAriaLabel}
        className={cn(
          navigationVariants({ 
            intent, 
            orientation, 
            size, 
            spacing, 
            responsive 
          }),
          getDirectionalClasses(),
          className
        )}
        {...props}
      >
        {children ? (
          children
        ) : (
          <>
            {/* Ungrouped items */}
            {groupedItems.ungrouped && (
              <div className={navigationGroupVariants({ intent })}>
                {groupedItems.ungrouped.map((item, index) => (
                  <React.Fragment key={item.key}>
                    <NavigationItemComponent
                      item={item}
                      intent={intent || 'primary'}
                      size={size || 'default'}
                      isActive={activeKeys.includes(item.key)}
                      onSelect={onItemSelect}
                    />
                    {showSeparator && index < groupedItems.ungrouped.length - 1 && (
                      <div className="h-px bg-border" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Grouped items */}
            {Object.entries(groupedItems)
              .filter(([groupName]) => groupName !== 'ungrouped')
              .map(([groupName, groupItems]) => (
                <NavigationGroup
                  key={groupName}
                  title={groupName}
                  items={groupItems}
                  intent={intent || 'primary'}
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
// SEMANTIC NAVIGATION VARIANTS FOR CONVENIENCE
// =============================================================================

/**
 * Primary Navigation - Main site navigation
 */
export const PrimaryNavigation = forwardRef<HTMLElement, Omit<NavigationProps, 'intent'>>(
  (props, ref) => <Navigation ref={ref} intent="primary" {...props} />
);
PrimaryNavigation.displayName = 'PrimaryNavigation';

/**
 * Sidebar Navigation - Sidebar navigation
 */
export const SidebarNavigation = forwardRef<HTMLElement, Omit<NavigationProps, 'intent' | 'orientation'>>(
  (props, ref) => <Navigation ref={ref} intent="sidebar" orientation="vertical" {...props} />
);
SidebarNavigation.displayName = 'SidebarNavigation';

/**
 * Tab Navigation - Tab-based navigation
 */
export const TabNavigation = forwardRef<HTMLElement, Omit<NavigationProps, 'intent' | 'orientation'>>(
  (props, ref) => <Navigation ref={ref} intent="tabs" orientation="horizontal" {...props} />
);
TabNavigation.displayName = 'TabNavigation';

/**
 * Footer Navigation - Footer links
 */
export const FooterNavigation = forwardRef<HTMLElement, Omit<NavigationProps, 'intent' | 'orientation'>>(
  (props, ref) => <Navigation ref={ref} intent="footer" orientation="horizontal" {...props} />
);
FooterNavigation.displayName = 'FooterNavigation';

/**
 * Menu Navigation - Context menu
 */
export const MenuNavigation = forwardRef<HTMLElement, Omit<NavigationProps, 'intent' | 'orientation'>>(
  (props, ref) => <Navigation ref={ref} intent="menu" orientation="vertical" {...props} />
);
MenuNavigation.displayName = 'MenuNavigation';

/**
 * Steps Navigation - Step progression
 */
export const StepsNavigation = forwardRef<HTMLElement, Omit<NavigationProps, 'intent' | 'orientation'>>(
  (props, ref) => <Navigation ref={ref} intent="steps" orientation="horizontal" {...props} />
);
StepsNavigation.displayName = 'StepsNavigation';

// Export variants for external use
export { navigationVariants, navigationItemVariants, navigationGroupVariants };
export type NavigationVariant = VariantProps<typeof navigationVariants>;