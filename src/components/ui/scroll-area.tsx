/**
 * @fileoverview ScrollArea Component - Norwegian Compliance
 * @description ScrollArea component for smooth scrolling in chat interfaces
 * @version 1.0.0
 * @compliance WCAG 2.2 AAA, Norwegian Enterprise Standards
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils/cn';

/**
 * ScrollArea component variants using semantic design tokens
 */
const scrollAreaVariants = cva(
  'relative overflow-hidden bg-background border border-border rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-background border-border',
        ghost: 'bg-transparent border-transparent',
        outline: 'bg-background border-border',
      },
      size: {
        sm: 'h-32',
        md: 'h-64',
        lg: 'h-96',
        xl: 'h-[600px]',
        full: 'h-full',
      },
      orientation: {
        vertical: 'overflow-y-auto overflow-x-hidden',
        horizontal: 'overflow-x-auto overflow-y-hidden',
        both: 'overflow-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      orientation: 'vertical',
    },
  }
);

/**
 * ScrollArea viewport variants
 */
const scrollAreaViewportVariants = cva('h-full w-full rounded-[inherit]', {
  variants: {
    orientation: {
      vertical: 'overflow-y-auto overflow-x-hidden',
      horizontal: 'overflow-x-auto overflow-y-hidden',
      both: 'overflow-auto',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

/**
 * ScrollArea scrollbar variants
 */
const scrollAreaScrollbarVariants = cva('flex touch-none select-none transition-colors', {
  variants: {
    orientation: {
      vertical: 'h-full w-2.5 border-l border-l-transparent p-[1px]',
      horizontal: 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      both: 'h-2.5 w-2.5 border border-transparent p-[1px]',
    },
  },
});

/**
 * ScrollArea thumb variants
 */
const scrollAreaThumbVariants = cva(
  'relative flex-1 rounded-full bg-border hover:bg-muted-foreground transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-border hover:bg-muted-foreground',
        ghost: 'bg-muted hover:bg-muted-foreground',
        outline: 'bg-border hover:bg-primary/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * ScrollArea Props interface
 */
export interface ScrollAreaProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scrollAreaVariants> {
  /** Child content to be scrolled */
  readonly children: React.ReactNode;
  /** Hide scrollbars */
  readonly hideScrollbars?: boolean;
  /** Custom scrollbar style */
  readonly scrollbarStyle?: 'auto' | 'overlay' | 'none';
  /** Smooth scrolling behavior */
  readonly smoothScroll?: boolean;
}

/**
 * ScrollArea component for smooth scrolling
 *
 * @example
 * ```tsx
 * <ScrollArea size="lg" orientation="vertical">
 *   <div className="space-y-4">
 *     {messages.map(message => (
 *       <MessageBubble key={message.id} message={message} />
 *     ))}
 *   </div>
 * </ScrollArea>
 * ```
 */
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      variant,
      size,
      orientation,
      children,
      hideScrollbars = false,
      scrollbarStyle = 'auto',
      smoothScroll = true,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          scrollAreaVariants({ variant, size, orientation }),
          hideScrollbars && 'scrollbar-hide',
          smoothScroll && 'scroll-smooth',
          className
        )}
        style={{
          scrollbarWidth: scrollbarStyle === 'none' ? 'none' : 'thin',
          // @ts-expect-error CSS custom properties for WebKit scrollbars
          '--scrollbar-thumb': 'hsl(var(--border))',
          '--scrollbar-track': 'hsl(var(--background))',
        }}
        {...props}
      >
        <div
          className={cn(
            scrollAreaViewportVariants({ orientation }),
            'scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
            'scrollbar-thumb-border scrollbar-track-background'
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';

/**
 * ScrollArea component variants export
 */
export {
  scrollAreaScrollbarVariants,
  scrollAreaThumbVariants,
  scrollAreaVariants,
  scrollAreaViewportVariants,
};
