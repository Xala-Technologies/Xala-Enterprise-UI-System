/**
 * @fileoverview Drawer/Sheet Component - CVA Pattern Implementation
 * @description Pure CSS drawer with CVA variants, no hooks, external state management
 * @version 5.0.0
 * @compliance CVA Pattern, No hooks, CSS-only styling, WCAG AAA
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput, List, ListItem, Link } from '../semantic';

/**
 * Drawer overlay variants using CVA
 */
const drawerOverlayVariants = cva(
  // Base styles - CSS-only backdrop with semantic tokens
  'fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  {
    variants: {
      variant: {
        default: 'bg-black/80',
        dark: 'bg-black/90',
        light: 'bg-black/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Drawer content variants using CVA
 */
const drawerContentVariants = cva(
  // Base styles using semantic Tailwind classes
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
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
        class: 'max-w-xs',
      },
      {
        side: ['left', 'right'],
        size: 'default',
        class: 'max-w-sm',
      },
      {
        side: ['left', 'right'],
        size: 'lg',
        class: 'max-w-md',
      },
      {
        side: ['left', 'right'],
        size: 'xl',
        class: 'max-w-lg',
      },
      {
        side: ['left', 'right'],
        size: 'full',
        class: 'max-w-full',
      },
    ],
    defaultVariants: {
      side: 'right',
      size: 'default',
    },
  }
);

/**
 * Drawer header variants
 */
const drawerHeaderVariants = cva(
  'grid gap-1.5 p-4 text-center sm:text-left',
  {
    variants: {
      size: {
        sm: 'p-3',
        default: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * Drawer title variants
 */
const drawerTitleVariants = cva(
  'text-lg font-semibold leading-none tracking-tight',
  {
    variants: {
      size: {
        sm: 'text-base',
        default: 'text-lg',
        lg: 'text-xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * Drawer description variants
 */
const drawerDescriptionVariants = cva(
  'text-sm text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * Drawer component props interface
 */
export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  readonly open?: boolean;
  readonly children: ReactNode;
}

/**
 * Drawer overlay props interface
 */
export interface DrawerOverlayProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof drawerOverlayVariants> {
  readonly open?: boolean;
}

/**
 * Drawer content props interface
 */
export interface DrawerContentProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof drawerContentVariants> {
  readonly open?: boolean;
  readonly children: ReactNode;
}

/**
 * Drawer header props interface
 */
export interface DrawerHeaderProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof drawerHeaderVariants> {
  readonly children: ReactNode;
}

/**
 * Drawer title props interface
 */
export interface DrawerTitleProps 
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof drawerTitleVariants> {
  readonly children: ReactNode;
}

/**
 * Drawer description props interface
 */
export interface DrawerDescriptionProps 
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof drawerDescriptionVariants> {
  readonly children: ReactNode;
}

/**
 * Drawer body props interface
 */
export interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

/**
 * Drawer footer props interface
 */
export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

/**
 * Drawer close button props interface
 */
export interface DrawerCloseProps extends HTMLAttributes<HTMLButtonElement> {
  readonly children?: ReactNode;
}


/**
 * Drawer root component - Pure container, no state management
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
      style,
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

    // Get shadows
    const shadows = {
      lg: (getToken('shadows.lg') as string) || '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    };

    // Overlay styles
    const getOverlayStyles = (): React.CSSProperties => {
      const baseOpacity = overlayVariant === 'dark' ? 0.9 : overlayVariant === 'light' ? 0.6 : 0.8;
      return {
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: `${colors.background?.default || '#ffffff'}${Math.round(baseOpacity * 255).toString(16).padStart(2, '0')}`,
        backdropFilter: 'blur(4px)',
        transition: 'all 150ms ease-in-out',
      };
    };

    // Side positioning styles
    const getSideStyles = (): React.CSSProperties => {
      switch (side) {
        case 'top':
          return {
            top: 0,
            left: 0,
            right: 0,
            borderBottom: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
          };
        case 'bottom':
          return {
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
          };
        case 'left':
          return {
            top: 0,
            bottom: 0,
            left: 0,
            height: '100%',
            borderRight: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
          };
        case 'right':
          return {
            top: 0,
            bottom: 0,
            right: 0,
            height: '100%',
            borderLeft: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
          };
        default:
          return {};
      }
    };

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      if (side === 'top' || side === 'bottom') {
        switch (size) {
          case 'sm':
            return { maxHeight: '12rem' }; // 192px
          case 'lg':
            return { maxHeight: '20rem' }; // 320px
          case 'xl':
            return { maxHeight: '24rem' }; // 384px
          case 'full':
            return { maxHeight: '100vh' };
          default:
            return { maxHeight: '16rem' }; // 256px
        }
      } else {
        switch (size) {
          case 'sm':
            return { width: '50%', maxWidth: '20rem' }; // max-w-xs
          case 'lg':
            return { width: '80%', maxWidth: '28rem' }; // max-w-md
          case 'xl':
            return { width: '83.333333%', maxWidth: '32rem' }; // max-w-lg
          case 'full':
            return { width: '100%', maxWidth: 'none' };
          default:
            return { width: '75%', maxWidth: '24rem' }; // max-w-sm
        }
      }
    };

    // Close button positioning
    const getCloseButtonPosition = (): React.CSSProperties => {
      const baseStyles = {
        position: 'absolute' as const,
        zIndex: 10,
      };

      switch (side) {
        case 'top':
        case 'bottom':
          return { ...baseStyles, right: spacing[4], top: spacing[4] };
        case 'left':
          return { ...baseStyles, right: spacing[4], top: spacing[4] };
        case 'right':
          return { ...baseStyles, left: spacing[4], top: spacing[4] };
        default:
          return { ...baseStyles, right: spacing[4], top: spacing[4] };
      }
    };

    // Content styles
    const contentStyles: React.CSSProperties = {
      position: 'fixed',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[4],
      backgroundColor: colors.background?.default || '#ffffff',
      padding: spacing[6],
      boxShadow: shadows.lg,
      transition: 'all 300ms ease-in-out',
      ...getSideStyles(),
      ...getSizeStyles(),
      ...style,
    };

    // Close button styles
    const closeButtonStyles: React.CSSProperties = {
      ...getCloseButtonPosition(),
      opacity: 0.7,
      cursor: 'pointer',
      transition: 'opacity 150ms ease-in-out',
      outline: 'none',
      backgroundColor: 'transparent',
      border: 'none',
      padding: spacing[1],
      borderRadius: '2px',
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
    };

    return (
      <>
        {/* Overlay */}
        <Box
         
          data-state={isOpen ? 'open' : 'closed'}
          onClick={handleOverlayClick}
          onKeyDown={handleKeyDown}
          aria-hidden="true"
        />

        {/* Drawer content */}
        <Box
          ref={ref}
          className={className}
         
          data-state={isOpen ? 'open' : 'closed'}
          role="dialog"
          aria-modal="true"
          aria-label="Drawer"
          onKeyDown={handleKeyDown}
          {...props}
        >
          {/* Close button */}
          {showCloseButton && onClose && (
            <Text as="button"
              onClick={onClose}
             
              aria-label="Lukk"
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.7';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              <CloseIcon />
            </Text>
          )}

          {children}
        </Box>
      </>
    );
  }
);

Drawer.displayName = 'Drawer';

/**
 * Enhanced DrawerHeader component
 */
export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  (
    { title, description, size = 'default', children, className, style, ...props },
    ref
  ): React.ReactElement => {
    
    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return { paddingBottom: spacing[2] };
        case 'lg':
          return { paddingBottom: spacing[6] };
        default:
          return { paddingBottom: spacing[4] };
      }
    };

    const headerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[1.5],
      textAlign: 'center',
      ...getSizeStyles(),
      ...style,
      // Note: Media queries not supported in inline styles, use CSS-in-JS or CSS classes for responsive behavior
    };

    const titleStyles: React.CSSProperties = {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.none,
      letterSpacing: typography.letterSpacing?.tight || '-0.025em',
      color: colors.text?.primary || colors.neutral?.[900] || '#111827',
    };

    const descriptionStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
    };

    return (
      <Box ref={ref} className={className} {...props}>
        {children || (
          <>
            {title && <Heading level={2}>{title}</Heading>}
            {description && <Text>{description}</Text>}
          </>
        )}
      </Box>
    );
  }
);

DrawerHeader.displayName = 'DrawerHeader';

/**
 * Enhanced DrawerBody component
 */
export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className, style, ...props }, ref): React.ReactElement => {
    const bodyStyles: React.CSSProperties = {
      flex: 1,
      overflow: 'auto',
      ...style,
    };

    return (
      <Box ref={ref} className={className} {...props}>
        {children}
      </Box>
    );
  }
);

DrawerBody.displayName = 'DrawerBody';

/**
 * Enhanced DrawerFooter component
 */
export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, className, style, ...props }, ref): React.ReactElement => {
    
    const footerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column-reverse',
      paddingTop: spacing[4],
      gap: spacing[2],
      ...style,
      // Note: Media queries not supported in inline styles, use CSS-in-JS or CSS classes for responsive behavior
    };

    return (
      <Box ref={ref} className={className} {...props}>
        {children}
      </Box>
    );
  }
);

DrawerFooter.displayName = 'DrawerFooter';
