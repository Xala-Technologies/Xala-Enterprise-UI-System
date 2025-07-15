/**
 * Drawer/Sheet component with enterprise compliance
 * Mobile-friendly slide-out panels using semantic design tokens
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

/**
 * Drawer overlay variants using semantic design tokens
 */
const drawerOverlayVariants = cva(
  [
    'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background/80',
        dark: 'bg-background/90',
        light: 'bg-background/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Drawer content variants using semantic design tokens
 */
const drawerContentVariants = cva(
  [
    'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:duration-300 data-[state=open]:duration-500',
  ],
  {
    variants: {
      side: {
        top: [
          'inset-x-0 top-0 border-b border-border',
          'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        ],
        bottom: [
          'inset-x-0 bottom-0 border-t border-border',
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        ],
        left: [
          'inset-y-0 left-0 h-full w-3/4 border-r border-border',
          'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
          'sm:max-w-sm',
        ],
        right: [
          'inset-y-0 right-0 h-full w-3/4 border-l border-border',
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
          'sm:max-w-sm',
        ],
      },
      size: {
        sm: '',
        default: '',
        lg: '',
        xl: '',
        full: '',
      },
    },
    compoundVariants: [
      {
        side: ['top', 'bottom'],
        size: 'sm',
        class: 'max-h-48',
      },
      {
        side: ['top', 'bottom'],
        size: 'default',
        class: 'max-h-64',
      },
      {
        side: ['top', 'bottom'],
        size: 'lg',
        class: 'max-h-80',
      },
      {
        side: ['top', 'bottom'],
        size: 'xl',
        class: 'max-h-96',
      },
      {
        side: ['top', 'bottom'],
        size: 'full',
        class: 'max-h-screen',
      },
      {
        side: ['left', 'right'],
        size: 'sm',
        class: 'w-1/2 sm:max-w-xs',
      },
      {
        side: ['left', 'right'],
        size: 'default',
        class: 'w-3/4 sm:max-w-sm',
      },
      {
        side: ['left', 'right'],
        size: 'lg',
        class: 'w-4/5 sm:max-w-md',
      },
      {
        side: ['left', 'right'],
        size: 'xl',
        class: 'w-5/6 sm:max-w-lg',
      },
      {
        side: ['left', 'right'],
        size: 'full',
        class: 'w-full sm:max-w-none',
      },
    ],
    defaultVariants: {
      side: 'right',
      size: 'default',
    },
  }
);

/**
 * Drawer header variants using semantic design tokens
 */
const drawerHeaderVariants = cva('flex flex-col space-y-1.5 text-center sm:text-left', {
  variants: {
    size: {
      sm: 'pb-2',
      default: 'pb-4',
      lg: 'pb-6',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

/**
 * Drawer component props interface
 */
export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  readonly isOpen?: boolean;
  readonly onClose?: () => void;
  readonly side?: 'top' | 'bottom' | 'left' | 'right';
  readonly size?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
  readonly overlayVariant?: 'default' | 'dark' | 'light';
  readonly closeOnOverlayClick?: boolean;
  readonly closeOnEscape?: boolean;
  readonly showCloseButton?: boolean;
  readonly children: ReactNode;
}

/**
 * Drawer header component props interface
 */
export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  readonly title?: string;
  readonly description?: string;
  readonly size?: 'sm' | 'default' | 'lg';
  readonly children?: ReactNode;
}

/**
 * Drawer body component props interface
 */
export interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

/**
 * Drawer footer component props interface
 */
export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

/**
 * Close icon component
 */
const CloseIcon = (): React.ReactElement => (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Enhanced Drawer component
 * @param isOpen - Whether drawer is open
 * @param onClose - Close handler
 * @param side - Side to slide out from
 * @param size - Drawer size
 * @param overlayVariant - Overlay styling variant
 * @param closeOnOverlayClick - Close when clicking overlay
 * @param closeOnEscape - Close on escape key
 * @param showCloseButton - Show close button
 * @param children - Drawer content
 * @param className - Additional CSS classes
 * @returns Enhanced Drawer JSX element
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen = false,
      onClose,
      side = 'right',
      size = 'default',
      overlayVariant = 'default',
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      children,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const handleOverlayClick = (): void => {
      if (closeOnOverlayClick && onClose) {
        onClose();
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent): void => {
      if (event.key === 'Escape' && closeOnEscape && onClose) {
        onClose();
      }
    };

    if (!isOpen) {
      return <></>;
    }

    return (
      <>
        {/* Overlay */}
        <div
          className={cn(drawerOverlayVariants({ variant: overlayVariant }))}
          data-state={isOpen ? 'open' : 'closed'}
          onClick={handleOverlayClick}
          onKeyDown={handleKeyDown}
          aria-hidden="true"
        />

        {/* Drawer content */}
        <div
          ref={ref}
          className={cn(drawerContentVariants({ side, size }), className)}
          data-state={isOpen ? 'open' : 'closed'}
          role="dialog"
          aria-modal="true"
          aria-label="Drawer"
          onKeyDown={handleKeyDown}
          {...props}
        >
          {/* Close button */}
          {showCloseButton && onClose && (
            <button
              onClick={onClose}
              className={cn(
                'absolute z-10 rounded-sm opacity-70 ring-offset-background transition-opacity',
                'hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                'disabled:pointer-events-none',
                side === 'top' && 'right-4 top-4',
                side === 'bottom' && 'right-4 top-4',
                side === 'left' && 'right-4 top-4',
                side === 'right' && 'left-4 top-4'
              )}
              aria-label="Lukk"
            >
              <CloseIcon />
            </button>
          )}

          {children}
        </div>
      </>
    );
  }
);

Drawer.displayName = 'Drawer';

/**
 * DrawerHeader component
 * @param title - Header title
 * @param description - Header description
 * @param size - Header size
 * @param children - Custom header content
 * @param className - Additional CSS classes
 * @returns DrawerHeader JSX element
 */
export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  (
    { title, description, size = 'default', children, className, ...props },
    ref
  ): React.ReactElement => (
    <div ref={ref} className={cn(drawerHeaderVariants({ size }), className)} {...props}>
      {children || (
        <>
          {title && (
            <h2 className="text-lg font-semibold leading-none tracking-tight text-foreground">
              {title}
            </h2>
          )}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </>
      )}
    </div>
  )
);

DrawerHeader.displayName = 'DrawerHeader';

/**
 * DrawerBody component
 * @param children - Body content
 * @param className - Additional CSS classes
 * @returns DrawerBody JSX element
 */
export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className, ...props }, ref): React.ReactElement => (
    <div ref={ref} className={cn('flex-1 overflow-auto', className)} {...props}>
      {children}
    </div>
  )
);

DrawerBody.displayName = 'DrawerBody';

/**
 * DrawerFooter component
 * @param children - Footer content
 * @param className - Additional CSS classes
 * @returns DrawerFooter JSX element
 */
export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, className, ...props }, ref): React.ReactElement => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

DrawerFooter.displayName = 'DrawerFooter';

/**
 * Drawer variants type exports
 */
export type DrawerSide = 'top' | 'bottom' | 'left' | 'right';
export type DrawerSize = 'sm' | 'default' | 'lg' | 'xl' | 'full';
export type DrawerOverlayVariant = VariantProps<typeof drawerOverlayVariants>['variant'];
