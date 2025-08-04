/**
 * @fileoverview Semantic List Components v5.0.0 - Complete List Element Abstraction
 * @description Semantic list components for ul, ol, li with design tokens
 * @version 5.0.0
 * @compliance WCAG AAA, SSR-Safe, Framework-agnostic, Norwegian compliance, Semantic hierarchy
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// SEMANTIC LIST TYPES
// =============================================================================

/**
 * List types (ordered, unordered, description)
 */
export type ListType = 'unordered' | 'ordered' | 'description';

/**
 * List semantic intents
 */
export type ListIntent = 
  | 'default'
  | 'navigation'   // Navigation menu
  | 'checklist'    // Checklist items
  | 'steps'        // Step-by-step process
  | 'features'     // Feature list
  | 'links'        // Link collection
  | 'breadcrumb'   // Breadcrumb navigation
  | 'tags';        // Tag collection

/**
 * List item marker types
 */
export type ListMarker = 
  | 'default'      // Default bullet/number
  | 'none'         // No marker
  | 'disc'         // Filled circle
  | 'circle'       // Empty circle
  | 'square'       // Square
  | 'decimal'      // Numbers (1, 2, 3)
  | 'lower-alpha'  // Letters (a, b, c)
  | 'upper-alpha'  // Letters (A, B, C)
  | 'lower-roman'  // Roman (i, ii, iii)
  | 'upper-roman'; // Roman (I, II, III)

/**
 * List spacing variants
 */
export type ListSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// =============================================================================
// LIST VARIANTS USING CVA AND DESIGN TOKENS
// =============================================================================

const listVariants = cva(
  // Base classes using design tokens
  'transition-colors duration-200 ease-in-out',
  {
    variants: {
      // List marker styling
      marker: {
        default: '',
        none: 'list-none',
        disc: 'list-disc',
        circle: 'list-circle',
        square: 'list-square',
        decimal: 'list-decimal',
        'lower-alpha': 'list-lower-alpha',
        'upper-alpha': 'list-upper-alpha',
        'lower-roman': 'list-lower-roman',
        'upper-roman': 'list-upper-roman',
      },
      
      // Spacing between items
      spacing: {
        none: 'space-y-0',
        xs: 'space-y-1',    // 4px
        sm: 'space-y-2',    // 8px
        md: 'space-y-3',    // 12px
        lg: 'space-y-4',    // 16px
        xl: 'space-y-6',    // 24px
      },
      
      // Padding/margin for list
      padding: {
        none: 'p-0',
        sm: 'pl-4',         // Compact indentation
        md: 'pl-6',         // Standard indentation
        lg: 'pl-8',         // Large indentation
      },
      
      // Visual variants
      variant: {
        default: '',
        bordered: 'border-l-2 border-border pl-4',
        card: 'bg-card border border-border rounded-md p-4',
        inline: 'inline-flex flex-wrap gap-2',
      },
      
      // Size variants
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      marker: 'default',
      spacing: 'sm',
      padding: 'md',
      variant: 'default',
      size: 'md',
    },
  }
);

const listItemVariants = cva(
  // Base list item classes
  'transition-colors duration-200 ease-in-out',
  {
    variants: {
      // Interactive state for clickable items
      interactive: {
        true: 'cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm px-2 py-1 -mx-2 -my-1',
        false: '',
      },
      
      // State styling
      state: {
        default: '',
        active: 'bg-accent text-accent-foreground font-medium',
        disabled: 'opacity-50 cursor-not-allowed',
        completed: 'line-through opacity-75',
      },
      
      // Padding for different contexts
      padding: {
        none: 'p-0',
        sm: 'py-1',
        md: 'py-2',
        lg: 'py-3',
      },
    },
    defaultVariants: {
      interactive: false,
      state: 'default',
      padding: 'sm',
    },
  }
);

// =============================================================================
// LIST COMPONENT INTERFACES
// =============================================================================

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement>,
    VariantProps<typeof listVariants> {
  /** List type */
  readonly type?: ListType;
  /** List semantic intent */
  readonly intent?: ListIntent;
  /** Custom list marker */
  readonly marker?: ListMarker;
  /** Children content */
  readonly children?: React.ReactNode;
  /** Language code for i18n */
  readonly lang?: string;
  /** Text direction for RTL support */
  readonly dir?: 'ltr' | 'rtl' | 'auto';
  /** Norwegian compliance classification */
  readonly nsmLevel?: 'OPEN' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';
  /** ARIA role override */
  readonly role?: string;
}

export interface ListItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  /** Whether item is clickable/interactive */
  readonly interactive?: boolean;
  /** Item state */
  readonly state?: 'default' | 'active' | 'disabled' | 'completed';
  /** Icon or prefix element */
  readonly icon?: React.ReactNode;
  /** Children content */
  readonly children?: React.ReactNode;
  /** Language code for i18n */
  readonly lang?: string;
  /** Norwegian compliance classification */
  readonly nsmLevel?: 'OPEN' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';
  /** Click handler for interactive items */
  readonly onItemClick?: () => void;
}

export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {
  /** Spacing between items */
  readonly spacing?: ListSpacing;
  /** Visual variant */
  readonly variant?: 'default' | 'bordered' | 'card';
  /** Children content */
  readonly children?: React.ReactNode;
  /** Norwegian compliance classification */
  readonly nsmLevel?: 'OPEN' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';
}

export interface DescriptionTermProps extends React.HTMLAttributes<HTMLElement> {
  /** Children content */
  readonly children?: React.ReactNode;
  /** Font weight */
  readonly weight?: 'medium' | 'semibold' | 'bold';
}

export interface DescriptionDetailsProps extends React.HTMLAttributes<HTMLElement> {
  /** Children content */
  readonly children?: React.ReactNode;
  /** Text variant */
  readonly variant?: 'default' | 'muted';
}

// =============================================================================
// SEMANTIC LIST COMPONENT
// =============================================================================

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  (
    {
      type = 'unordered',
      intent = 'default',
      marker = 'default',
      spacing = 'sm',
      padding = 'md',
      variant = 'default',
      size = 'md',
      lang,
      dir,
      nsmLevel,
      role,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Auto-configure based on intent
    const getIntentConfig = () => {
      if (!intent || intent === 'default') return {};
      
      const configs: Record<ListIntent, Partial<ListProps>> = {
        default: {},
        navigation: {
          marker: 'none',
          padding: 'none',
          role: 'navigation',
        },
        checklist: {
          marker: 'none',
          spacing: 'md',
        },
        steps: {
          type: 'ordered',
          marker: 'decimal',
          spacing: 'lg',
        },
        features: {
          marker: 'disc',
          spacing: 'md',
        },
        links: {
          marker: 'none',
          spacing: 'sm',
        },
        breadcrumb: {
          marker: 'none',
          padding: 'none',
          variant: 'inline',
          role: 'navigation',
        },
        tags: {
          marker: 'none',
          variant: 'inline',
          spacing: 'none',
        },
      };
      
      return configs[intent] || {};
    };

    // Enhanced accessibility attributes
    const getAccessibilityAttributes = () => {
      const attributes: Record<string, any> = {};
      
      if (role) {
        attributes.role = role;
      }
      
      if (lang) {
        attributes.lang = lang;
      }
      
      if (dir) {
        attributes.dir = dir;
      }
      
      // Add Norwegian compliance data attribute if specified
      if (nsmLevel) {
        attributes['data-nsm-level'] = nsmLevel;
      }
      
      return attributes;
    };

    const intentConfig = getIntentConfig();
    const finalMarker = intentConfig.marker || marker;
    const finalPadding = intentConfig.padding || padding;
    const finalVariant = intentConfig.variant || variant;
    const finalRole = intentConfig.role || role;
    const ListElement = intentConfig.type === 'ordered' || type === 'ordered' ? 'ol' : 'ul';
    const accessibilityAttributes = getAccessibilityAttributes();

    return (
      <ListElement
        ref={ref as any}
        className={cn(
          listVariants({
            marker: finalMarker,
            spacing,
            padding: finalPadding,
            variant: finalVariant,
            size,
          }),
          className
        )}
        role={finalRole}
        {...accessibilityAttributes}
        {...props}
      >
        {children}
      </ListElement>
    );
  }
);

List.displayName = 'List';

// =============================================================================
// SEMANTIC LIST ITEM COMPONENT
// =============================================================================

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      interactive = false,
      state = 'default',
      padding = 'sm',
      icon,
      lang,
      nsmLevel,
      onItemClick,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    // Enhanced accessibility attributes
    const getAccessibilityAttributes = () => {
      const attributes: Record<string, any> = {};
      
      if (interactive) {
        attributes.tabIndex = state === 'disabled' ? -1 : 0;
        attributes.role = 'button';
      }
      
      if (state === 'disabled') {
        attributes['aria-disabled'] = true;
      }
      
      if (state === 'active') {
        attributes['aria-current'] = true;
      }
      
      if (lang) {
        attributes.lang = lang;
      }
      
      // Add Norwegian compliance data attribute if specified
      if (nsmLevel) {
        attributes['data-nsm-level'] = nsmLevel;
      }
      
      return attributes;
    };

    const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
      if (state === 'disabled') return;
      
      onClick?.(event);
      onItemClick?.();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (!interactive || state === 'disabled') return;
      
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onItemClick?.();
      }
    };

    const accessibilityAttributes = getAccessibilityAttributes();

    return (
      <li
        ref={ref}
        className={cn(
          listItemVariants({
            interactive,
            state,
            padding,
          }),
          className
        )}
        onClick={interactive ? handleClick : onClick}
        onKeyDown={interactive ? handleKeyDown : undefined}
        {...accessibilityAttributes}
        {...props}
      >
        {icon && (
          <span className="inline-flex items-center mr-2" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';

// =============================================================================
// DESCRIPTION LIST COMPONENTS
// =============================================================================

export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  (
    {
      spacing = 'md',
      variant = 'default',
      nsmLevel,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const spacingClass = {
      none: 'space-y-0',
      xs: 'space-y-1',
      sm: 'space-y-2',
      md: 'space-y-4',
      lg: 'space-y-6',
      xl: 'space-y-8',
    }[spacing];

    const variantClass = {
      default: '',
      bordered: 'border-l-2 border-border pl-4',
      card: 'bg-card border border-border rounded-md p-4',
    }[variant];

    return (
      <dl
        ref={ref}
        className={cn(spacingClass, variantClass, className)}
        data-nsm-level={nsmLevel}
        {...props}
      >
        {children}
      </dl>
    );
  }
);

DescriptionList.displayName = 'DescriptionList';

export const DescriptionTerm = forwardRef<HTMLElement, DescriptionTermProps>(
  (
    {
      weight = 'semibold',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const weightClass = {
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    }[weight];

    return (
      <dt
        ref={ref as any}
        className={cn('text-foreground', weightClass, className)}
        {...props}
      >
        {children}
      </dt>
    );
  }
);

DescriptionTerm.displayName = 'DescriptionTerm';

export const DescriptionDetails = forwardRef<HTMLElement, DescriptionDetailsProps>(
  (
    {
      variant = 'default',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const variantClass = {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
    }[variant];

    return (
      <dd
        ref={ref as any}
        className={cn(variantClass, 'mt-1', className)}
        {...props}
      >
        {children}
      </dd>
    );
  }
);

DescriptionDetails.displayName = 'DescriptionDetails';

// =============================================================================
// SEMANTIC LIST VARIANTS FOR CONVENIENCE
// =============================================================================

/**
 * Navigation List component
 */
export const NavigationList = forwardRef<HTMLUListElement, Omit<ListProps, 'intent'>>(
  (props, ref) => <List ref={ref} intent="navigation" {...props} />
);
NavigationList.displayName = 'NavigationList';

/**
 * Checklist component
 */
export const Checklist = forwardRef<HTMLUListElement, Omit<ListProps, 'intent'>>(
  (props, ref) => <List ref={ref} intent="checklist" {...props} />
);
Checklist.displayName = 'Checklist';

/**
 * Steps List component
 */
export const StepsList = forwardRef<HTMLOListElement, Omit<ListProps, 'intent'>>(
  (props, ref) => <List ref={ref as any} intent="steps" {...props} />
);
StepsList.displayName = 'StepsList';

/**
 * Features List component
 */
export const FeaturesList = forwardRef<HTMLUListElement, Omit<ListProps, 'intent'>>(
  (props, ref) => <List ref={ref} intent="features" {...props} />
);
FeaturesList.displayName = 'FeaturesList';

/**
 * Breadcrumb component
 */
export const Breadcrumb = forwardRef<HTMLUListElement, Omit<ListProps, 'intent'>>(
  (props, ref) => <List ref={ref} intent="breadcrumb" {...props} />
);
Breadcrumb.displayName = 'Breadcrumb';

/**
 * Tag List component
 */
export const TagList = forwardRef<HTMLUListElement, Omit<ListProps, 'intent'>>(
  (props, ref) => <List ref={ref} intent="tags" {...props} />
);
TagList.displayName = 'TagList';