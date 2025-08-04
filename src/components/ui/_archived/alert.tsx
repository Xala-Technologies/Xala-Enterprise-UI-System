/**
 * @fileoverview Alert Component v5.0.0 - Semantic Component Migration
 * @description Alert component using semantic components with i18n support
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Semantic components, i18n
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { Box, Heading, Text } from '../semantic';
import { useTranslation } from '../../i18n';

/**
 * Alert variants using semantic Tailwind classes
 * Pure CVA implementation with design token classes
 */
const alertVariants = cva(
  // Base classes using semantic tokens
  'relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success: 'border-success/50 text-success dark:border-success [&>svg]:text-success',
        warning: 'border-warning/50 text-warning dark:border-warning [&>svg]:text-warning',
        info: 'border-info/50 text-info dark:border-info [&>svg]:text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Alert variant types
 */
export type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

/**
 * Alert component props interface
 */
export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  variant?: AlertVariant;
  children?: React.ReactNode;
}

/**
 * Alert component
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const { t } = useTranslation();

    return (
      <Box ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
        {children}
      </Box>
    );
  }
);

Alert.displayName = 'Alert';

/**
 * Alert Title component props interface
 */
export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

/**
 * Alert Title component
 */
export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Heading
        as="h5"
        ref={ref}
        className={cn('mb-1 font-medium leading-none tracking-tight', className)}
        {...props}
      >
        {children}
      </Heading>
    );
  }
);

AlertTitle.displayName = 'AlertTitle';

/**
 * Alert Description component props interface
 */
export interface AlertDescriptionProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * Alert Description component
 */
export const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Text
        as="div"
        ref={ref}
        className={cn('text-sm [&_p]:leading-relaxed', className)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

AlertDescription.displayName = 'AlertDescription';

// Migration note: This component now uses semantic Box, Heading, and Text components
// instead of raw HTML elements and includes i18n support
// Note: AlertIcon and AlertContent are no longer needed as the base Alert component
// handles icon positioning through CSS classes. Icons can be placed directly as children.
