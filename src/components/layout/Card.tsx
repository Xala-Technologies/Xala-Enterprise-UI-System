/**
 * @fileoverview Card Component v5.0.0 - CVA Design System
 * @description Modern Card component using CVA pattern with semantic tokens
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, CVA-pattern
 */

import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Card variants using semantic Tailwind classes with CVA pattern
 * All spacing uses semantic token classes
 */
const cardVariants = cva(
  'border border-border bg-card text-card-foreground transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        outlined: 'border-2 border-border bg-background text-foreground',
        elevated: 'bg-card text-card-foreground shadow-lg',
        filled: 'bg-secondary text-secondary-foreground border-0',
        ghost: 'border-0 bg-transparent text-foreground',
        gradient: 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0',
        success: 'bg-green-50 text-green-900 border-green-200',
        warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
        error: 'bg-red-50 text-red-900 border-red-200',
        info: 'bg-blue-50 text-blue-900 border-blue-200',
      },
      shadow: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
        '2xl': 'shadow-2xl',
      },
      borderRadius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        full: 'rounded-full',
      },
      padding: {
        none: 'p-0',
        xs: 'p-2',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-12',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200',
        false: '',
      },
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'w-full',
        fit: 'w-fit',
      },
    },
    defaultVariants: {
      variant: 'default',
      shadow: 'sm',
      borderRadius: 'md',
      padding: 'md',
      interactive: false,
      size: 'full',
    },
  }
);

const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5 p-6 pb-4',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-4 pb-2',
        md: 'p-6 pb-4',
        lg: 'p-8 pb-6',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  }
);

const cardContentVariants = cva('p-6 pt-0', {
  variants: {
    padding: {
      none: 'p-0',
      sm: 'p-4 pt-0',
      md: 'p-6 pt-0',
      lg: 'p-8 pt-0',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
});

const cardFooterVariants = cva(
  'flex items-center p-6 pt-4',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-4 pt-2',
        md: 'p-6 pt-4',
        lg: 'p-8 pt-6',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  }
);

// Helper function for Norwegian classification icons
const getClassificationIcon = (level: string): string => {
  const icons = {
    ÅPEN: '🟢',
    BEGRENSET: '🟡',
    KONFIDENSIELT: '🔴',
    HEMMELIG: '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};

/**
 * Base variant props from class-variance-authority
 */
export interface CardProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  readonly header?: React.ReactNode;
  readonly footer?: React.ReactNode;
  readonly metadata?: {
    readonly lastUpdated?: string;
    readonly municipality?: string;
    readonly classification?: string;
    readonly compliance?: readonly string[];
  };
  readonly testId?: string;
  readonly as?: keyof JSX.IntrinsicElements;
}

export interface CardHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

export interface CardContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

export interface CardFooterProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

// =============================================================================
// CARD SUB-COMPONENTS
// =============================================================================

/**
 * Card Header component
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ padding }), className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Content component
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants({ padding }), className)}
      {...props}
    />
  )
);

CardContent.displayName = 'CardContent';

/**
 * Card Footer component
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ padding }), className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

// =============================================================================
// CARD COMPONENT
// =============================================================================

/**
 * Card component with pure CVA pattern styling
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    shadow, 
    borderRadius, 
    padding, 
    interactive, 
    size,
    header,
    footer,
    metadata,
    testId,
    as: Component = 'div',
    ...props 
  }, ref) => {
    const ElementType = Component as React.ElementType;

    return (
      <ElementType
        ref={ref}
        className={cn(
          cardVariants({
            variant,
            shadow,
            borderRadius,
            padding,
            interactive,
            size,
          }),
          className
        )}
        data-testid={testId}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {header && (
          <CardHeader>
            {header}
          </CardHeader>
        )}

        <CardContent>
          {props.children}
        </CardContent>

        {footer && (
          <CardFooter>
            {footer}
          </CardFooter>
        )}

        {metadata && <MetadataSection metadata={metadata} />}
      </ElementType>
    );
  }
);

Card.displayName = 'Card';

// =============================================================================
// METADATA COMPONENTS
// =============================================================================

/**
 * Metadata section component
 */
const MetadataSection: React.FC<{ metadata: CardProps['metadata'] }> = ({
  metadata,
}): React.ReactElement | null => {
  if (!metadata) return null;

  return (
    <div className="border-t border-border p-4 bg-muted/50">
      <div className="space-y-2 text-sm">
        {metadata.lastUpdated && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Last Updated:</span>
            <span className="font-medium text-foreground">{metadata.lastUpdated}</span>
          </div>
        )}

        {metadata.municipality && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Municipality:</span>
            <span className="font-medium text-foreground">{metadata.municipality}</span>
          </div>
        )}

        {metadata.classification && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Classification:</span>
            <div className="flex items-center space-x-2">
              <ClassificationIndicator level={metadata.classification} />
              <span className="font-medium text-foreground">
                {metadata.classification}
              </span>
            </div>
          </div>
        )}

        {metadata.compliance && metadata.compliance.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Compliance:</span>
            <span className="font-medium text-foreground">{metadata.compliance.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Classification indicator component
 */
const ClassificationIndicator: React.FC<{ level: string }> = ({ level }): React.ReactElement => {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center" aria-hidden="true">
      {getClassificationIcon(level)}
    </span>
  );
};

/**
 * Card variants type exports
 */
export type CardVariants = VariantProps<typeof cardVariants>;
export { cardVariants, cardHeaderVariants, cardContentVariants, cardFooterVariants };
