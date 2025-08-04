/**
 * @fileoverview Accordion Component - Enterprise Interactive
 * @description SSR-safe accordion with CVA variants and design tokens
 * @version 5.0.0
 * @compliance WCAG AAA, NSM, Enterprise Standards, SSR-Safe
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

// =============================================================================
// CVA VARIANTS
// =============================================================================

const accordionVariants = cva('space-y-0 bg-background', {
  variants: {
    variant: {
      default: 'bg-background',
      bordered: 'border border-border rounded-lg overflow-hidden',
      elevated: 'border border-border rounded-lg shadow-sm',
      minimal: 'bg-transparent',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const accordionItemVariants = cva('border-b border-border last:border-b-0', {
  variants: {
    variant: {
      default: 'border-b border-border',
      bordered: 'border-0',
      elevated: 'border-0',
      minimal: 'border-b border-border/50',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionTriggerVariants = cva(
  'flex w-full items-center justify-between py-4 px-6 font-medium transition-all hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed [&[data-state=open]>svg]:rotate-180',
  {
    variants: {
      variant: {
        default: 'hover:bg-muted/50',
        bordered: 'hover:bg-muted/50',
        elevated: 'hover:bg-muted/50',
        minimal: 'px-0 hover:bg-transparent',
      },
      size: {
        sm: 'py-3 px-4 text-sm',
        md: 'py-4 px-6 text-base',
        lg: 'py-6 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const accordionContentVariants = cva(
  'overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
  {
    variants: {
      variant: {
        default: 'px-6 pb-4',
        bordered: 'px-6 pb-4',
        elevated: 'px-6 pb-4',
        minimal: 'px-0 pb-4',
      },
      size: {
        sm: 'px-4 pb-3 text-sm',
        md: 'px-6 pb-4 text-sm',
        lg: 'px-8 pb-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// =============================================================================
// INTERFACES
// =============================================================================

export interface AccordionProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  readonly type?: 'single' | 'multiple';
  readonly collapsible?: boolean;
  readonly defaultValue?: string | string[];
  readonly value?: string | string[];
  readonly onValueChange?: (value: string | string[]) => void;
}

export interface AccordionItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionItemVariants> {
  readonly value: string;
  readonly disabled?: boolean;
}

export interface AccordionTriggerProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof accordionTriggerVariants> {
  readonly children: React.ReactNode;
  readonly asChild?: boolean;
}

export interface AccordionContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionContentVariants> {
  readonly children: React.ReactNode;
  readonly asChild?: boolean;
}

// For backward compatibility
export interface AccordionItem {
  readonly id: string;
  readonly title: string;
  readonly content: React.ReactNode;
  readonly icon?: React.ReactNode;
  readonly badge?: string | number;
  readonly isDisabled?: boolean;
  readonly isDefaultExpanded?: boolean;
}

export interface AccordionItemData extends AccordionItem {}

// =============================================================================
// ACCORDION COMPONENTS
// =============================================================================

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div ref={ref} className={cn(accordionVariants({ variant, size }), className)} {...props} />
  )
);

Accordion.displayName = 'Accordion';

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(accordionItemVariants({ variant }), className)} {...props} />
  )
);

AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(accordionTriggerVariants({ variant, size }), className)}
      type="button"
      {...props}
    >
      {children}
      <svg
        className="h-4 w-4 shrink-0 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
);

AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(accordionContentVariants({ variant, size }), className)}
      {...props}
    >
      <div className="pt-0">{children}</div>
    </div>
  )
);

AccordionContent.displayName = 'AccordionContent';

// =============================================================================
// SIMPLE ACCORDION WRAPPER (For backward compatibility)
// =============================================================================

interface SimpleAccordionProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  readonly items: readonly AccordionItem[];
  readonly allowMultiple?: boolean;
  readonly defaultExpanded?: string[];
}

export const SimpleAccordion = forwardRef<HTMLDivElement, SimpleAccordionProps>(
  (
    { className, variant, size, items, allowMultiple = false, defaultExpanded = [], ...props },
    ref
  ) => {
    return (
      <Accordion
        ref={ref}
        className={className}
        variant={variant}
        size={size}
        type={allowMultiple ? 'multiple' : 'single'}
        defaultValue={allowMultiple ? defaultExpanded : defaultExpanded[0]}
        {...props}
      >
        {items.map(item => (
          <AccordionItem key={item.id} value={item.id} variant={variant}>
            <AccordionTrigger
              variant={variant}
              size={size}
              disabled={item.isDisabled}
              className="text-left"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {item.icon && (
                  <div className="flex-shrink-0 text-muted-foreground">{item.icon}</div>
                )}
                <span className="truncate">{item.title}</span>
                {item.badge && (
                  <span className="inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {item.badge}
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent variant={variant} size={size}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }
);

SimpleAccordion.displayName = 'SimpleAccordion';

// Legacy exports for backward compatibility
export { SimpleAccordion as EnhancedAccordion };
export type { SimpleAccordionProps as EnhancedAccordionProps };

// CVA variants for external use
export {
  accordionVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
};

export default Accordion;
