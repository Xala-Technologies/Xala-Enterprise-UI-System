/**
 * @fileoverview Tabs Component - Enterprise Navigation
 * @description SSR-safe tabs with CVA variants and design tokens
 * @version 5.0.0
 * @compliance WCAG AAA, NSM, Enterprise Standards, SSR-Safe
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

// =============================================================================
// CVA VARIANTS
// =============================================================================

const tabsVariants = cva(
  'w-full',
  {
    variants: {
      orientation: {
        horizontal: 'flex flex-col',
        vertical: 'flex flex-row',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

const tabsListVariants = cva(
  'inline-flex items-center justify-start',
  {
    variants: {
      variant: {
        default: 'h-10 rounded-md bg-muted p-1',
        pills: 'h-10 rounded-lg bg-muted/50 p-1 gap-1',
        underlined: 'h-10 border-b border-border bg-transparent p-0',
        cards: 'h-auto bg-transparent p-0 gap-px',
        minimal: 'h-10 bg-transparent p-0 gap-4',
      },
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col h-auto w-auto',
      },
      size: {
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      orientation: 'horizontal',
      size: 'md',
    },
  }
);

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        pills: 'rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        underlined: 'rounded-none border-b-2 border-transparent bg-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent',
        cards: 'rounded-t-md border border-border border-b-0 bg-muted data-[state=active]:bg-background data-[state=active]:border-border',
        minimal: 'rounded-none bg-transparent px-0 py-2 data-[state=active]:bg-transparent font-semibold',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const tabsContentVariants = cva(
  'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'p-4',
        pills: 'p-4',
        underlined: 'p-4 pt-6',
        cards: 'rounded-b-md border border-border border-t-0 bg-background p-4',
        minimal: 'p-0 pt-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// =============================================================================
// INTERFACES
// =============================================================================

export interface TabsProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsVariants> {
  readonly defaultValue?: string;
  readonly value?: string;
  readonly onValueChange?: (value: string) => void;
}

export interface TabsListProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {
  readonly children: React.ReactNode;
}

export interface TabsTriggerProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
  readonly value: string;
  readonly disabled?: boolean;
  readonly active?: boolean;
  readonly children: React.ReactNode;
}

export interface TabsContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsContentVariants> {
  readonly value: string;
  readonly activeValue?: string;
  readonly children: React.ReactNode;
}

// For backward compatibility
export interface TabItem {
  readonly id: string;
  readonly label: string;
  readonly content: React.ReactNode;
  readonly icon?: React.ReactNode;
  readonly badge?: string | number;
  readonly isDisabled?: boolean;
  readonly isClosable?: boolean;
  readonly isLoading?: boolean;
}

export type TabsOrientation = 'horizontal' | 'vertical';

// =============================================================================
// TABS COMPONENTS
// =============================================================================

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, orientation, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(tabsVariants({ orientation }), className)}
      {...props}
    />
  )
);

Tabs.displayName = 'Tabs';

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant, orientation, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(tabsListVariants({ variant, orientation, size }), className)}
      role="tablist"
      {...props}
    />
  )
);

TabsList.displayName = 'TabsList';

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, variant, size, value, active, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(tabsTriggerVariants({ variant, size }), className)}
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      tabIndex={active ? 0 : -1}
      data-state={active ? 'active' : 'inactive'}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
);

TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, variant, value, activeValue, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        tabsContentVariants({ variant }),
        value === activeValue ? 'block' : 'hidden',
        className
      )}
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
      id={`tabpanel-${value}`}
      tabIndex={0}
      data-state={value === activeValue ? 'active' : 'inactive'}
      {...props}
    >
      {children}
    </div>
  )
);

TabsContent.displayName = 'TabsContent';

// =============================================================================
// SIMPLE TABS WRAPPER (For backward compatibility)
// =============================================================================

interface SimpleTabsProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {
  readonly tabs: readonly TabItem[];
  readonly defaultActiveTab?: string;
  readonly onTabChange?: (tabId: string) => void;
  readonly onTabClose?: (tabId: string) => void;
  readonly ariaLabel?: string;
}

export const SimpleTabs = forwardRef<HTMLDivElement, SimpleTabsProps>(
  ({ 
    className, 
    variant, 
    orientation, 
    size,
    tabs, 
    defaultActiveTab,
    onTabChange,
    onTabClose,
    ariaLabel = 'Tab navigation',
    ...props 
  }, ref) => {
    // Use controlled or default active tab without internal state
    const activeTab = defaultActiveTab || tabs.find(tab => !tab.isDisabled)?.id || tabs[0]?.id || '';

    const handleTabChange = (tabId: string) => {
      const tab = tabs.find(t => t.id === tabId);
      if (!tab || tab.isDisabled) return;
      
      onTabChange?.(tabId);
    };

    const handleTabClose = (tabId: string, event: React.MouseEvent) => {
      event.stopPropagation();
      onTabClose?.(tabId);
    };

    return (
      <Tabs
        ref={ref}
        className={cn('w-full', className)}
        orientation={orientation}
        {...props}
      >
        <TabsList 
          variant={variant} 
          orientation={orientation} 
          size={size}
          aria-label={ariaLabel}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              variant={variant}
              size={size}
              active={tab.id === activeTab}
              disabled={tab.isDisabled}
              onClick={() => handleTabChange(tab.id)}
              className="relative"
            >
              <div className="flex items-center space-x-2">
                {tab.icon && (
                  <span className="flex-shrink-0 w-4 h-4" aria-hidden="true">
                    {tab.icon}
                  </span>
                )}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {tab.badge}
                  </span>
                )}
                {tab.isLoading && (
                  <div
                    className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"
                    aria-label="Loading..."
                  />
                )}
                {tab.isClosable && (
                  <button
                    type="button"
                    onClick={(e) => handleTabClose(tab.id, e)}
                    className="ml-1 p-0.5 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-1 focus:ring-primary rounded-sm"
                    aria-label={`Close ${tab.label} tab`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            activeValue={activeTab}
            variant={variant}
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    );
  }
);

SimpleTabs.displayName = 'SimpleTabs';

// Legacy exports for backward compatibility
export { SimpleTabs as EnhancedTabs };
export type { SimpleTabsProps as EnhancedTabsProps };

// CVA variants for external use
export { 
  tabsVariants, 
  tabsListVariants, 
  tabsTriggerVariants, 
  tabsContentVariants 
};

export default Tabs;