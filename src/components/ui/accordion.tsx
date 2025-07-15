/**
 * Accordion components - Pure presentational components
 * Collapsible content sections with Norwegian compliance
 * No client-side logic or state management
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

/**
 * Accordion container variants
 */
const accordionVariants = cva(['divide-y divide-border'], {
  variants: {
    variant: {
      default: 'border border-border rounded-md',
      ghost: '',
      separated: 'space-y-2',
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

/**
 * Accordion item variants
 */
const accordionItemVariants = cva([''], {
  variants: {
    variant: {
      default: '',
      ghost: '',
      separated: 'border border-border rounded-md',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Accordion trigger variants
 */
const accordionTriggerVariants = cva(
  [
    'flex w-full items-center justify-between py-4 px-4',
    'font-medium transition-all',
    'hover:bg-accent hover:text-accent-foreground',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    '[&[data-state=open]>svg]:rotate-180',
  ],
  {
    variants: {
      variant: {
        default: 'text-left',
        ghost: 'px-0',
        separated: 'rounded-md',
      },
      size: {
        sm: 'text-sm py-2 px-3',
        md: 'text-base py-4 px-4',
        lg: 'text-lg py-5 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Accordion content variants
 */
const accordionContentVariants = cva(['overflow-hidden transition-all duration-200 ease-in-out'], {
  variants: {
    variant: {
      default: 'px-4 pb-4',
      ghost: 'px-0 pb-4',
      separated: 'px-4 pb-4',
    },
    size: {
      sm: 'px-3 pb-2',
      md: 'px-4 pb-4',
      lg: 'px-5 pb-5',
    },
    state: {
      open: 'data-[state=open]:animate-accordion-down',
      closed: 'data-[state=closed]:animate-accordion-up',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    state: 'closed',
  },
});

/**
 * Accordion item data interface
 */
export interface AccordionItemData {
  readonly id: string;
  readonly title: string;
  readonly content: ReactNode;
  readonly disabled?: boolean;
  readonly defaultOpen?: boolean;
  readonly icon?: ReactNode;
}

/**
 * Accordion component props interface
 */
export interface AccordionProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  /** Accordion items data */
  readonly items?: AccordionItemData[];
  /** Allow multiple items to be open simultaneously */
  readonly multiple?: boolean;
  /** Collapsible behavior */
  readonly collapsible?: boolean;
  /** Norwegian compliance metadata */
  readonly norwegian?: {
    readonly classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    readonly accessibilityLabel?: string;
  };
}

/**
 * AccordionItem component props interface
 */
export interface AccordionItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionItemVariants> {
  /** Unique item identifier */
  readonly value: string;
  /** Item disabled state */
  readonly disabled?: boolean;
  /** Children components (trigger and content) */
  readonly children: ReactNode;
}

/**
 * AccordionTrigger component props interface
 */
export interface AccordionTriggerProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof accordionTriggerVariants> {
  /** Trigger content */
  readonly children: ReactNode;
  /** Open state */
  readonly isOpen?: boolean;
  /** Click handler */
  readonly onToggle?: () => void;
  /** Show expand/collapse icon */
  readonly showIcon?: boolean;
  /** Custom icon */
  readonly icon?: ReactNode;
}

/**
 * AccordionContent component props interface
 */
export interface AccordionContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionContentVariants> {
  /** Content to display */
  readonly children: ReactNode;
  /** Open state */
  readonly isOpen?: boolean;
}

/**
 * Accordion component - Pure presentational component
 * @param items - Array of accordion items (optional, can use children instead)
 * @param variant - Accordion styling variant
 * @param size - Accordion size
 * @param multiple - Allow multiple items open
 * @param collapsible - Allow items to be collapsed
 * @param norwegian - Norwegian compliance configuration
 * @param className - Additional CSS classes
 * @param children - Child components (for manual composition)
 * @param props - Additional HTML attributes
 * @returns Accordion JSX element
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      items,
      variant = 'default',
      size = 'md',
      multiple = false,
      collapsible = true,
      norwegian,
      className,
      children,
      ...props
    },
    ref
  ): React.ReactElement => {
    // If items are provided, render them automatically
    if (items) {
      return (
        <div
          ref={ref}
          className={cn(accordionVariants({ variant, size }), className)}
          role="region"
          aria-label={norwegian?.accessibilityLabel || 'Accordion'}
          {...props}
        >
          {items.map((item, index) => (
            <AccordionItem key={item.id} value={item.id} variant={variant} disabled={item.disabled}>
              <AccordionTrigger
                variant={variant}
                size={size}
                isOpen={item.defaultOpen}
                showIcon={true}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent variant={variant} size={size} isOpen={item.defaultOpen}>
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </div>
      );
    }

    // Manual composition mode
    return (
      <div
        ref={ref}
        className={cn(accordionVariants({ variant, size }), className)}
        role="region"
        aria-label={norwegian?.accessibilityLabel || 'Accordion'}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';

/**
 * AccordionItem component - Pure presentational component
 * @param value - Unique item identifier
 * @param variant - Item styling variant
 * @param disabled - Item disabled state
 * @param children - Trigger and content components
 * @param className - Additional CSS classes
 * @param props - Additional HTML attributes
 * @returns AccordionItem JSX element
 */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    { value, variant = 'default', disabled = false, children, className, ...props },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        data-value={value}
        data-disabled={disabled}
        className={cn(accordionItemVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

/**
 * AccordionTrigger component - Pure presentational component
 * @param children - Trigger content
 * @param variant - Trigger styling variant
 * @param size - Trigger size
 * @param isOpen - Open state
 * @param onToggle - Toggle handler
 * @param showIcon - Show expand/collapse icon
 * @param icon - Custom icon
 * @param className - Additional CSS classes
 * @param props - Additional HTML attributes
 * @returns AccordionTrigger JSX element
 */
export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      isOpen = false,
      onToggle,
      showIcon = true,
      icon,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(accordionTriggerVariants({ variant, size }), className)}
        data-state={isOpen ? 'open' : 'closed'}
        aria-expanded={isOpen}
        onClick={onToggle}
        {...props}
      >
        <span className="flex-1 text-left">{children}</span>
        {showIcon && (
          <span className="ml-2 transition-transform duration-200">
            {icon || (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 shrink-0"
              >
                <path
                  d="m4.5 6 3 3 3-3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        )}
      </button>
    );
  }
);

AccordionTrigger.displayName = 'AccordionTrigger';

/**
 * AccordionContent component - Pure presentational component
 * @param children - Content to display
 * @param variant - Content styling variant
 * @param size - Content size
 * @param isOpen - Open state
 * @param className - Additional CSS classes
 * @param props - Additional HTML attributes
 * @returns AccordionContent JSX element
 */
export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  (
    { children, variant = 'default', size = 'md', state, isOpen = false, className, ...props },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(
          accordionContentVariants({ variant, size, state }),
          !isOpen && 'hidden',
          className
        )}
        data-state={isOpen ? 'open' : 'closed'}
        role="region"
        {...props}
      >
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    );
  }
);

AccordionContent.displayName = 'AccordionContent';
