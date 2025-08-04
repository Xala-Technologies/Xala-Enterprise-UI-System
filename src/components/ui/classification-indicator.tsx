/**
 * @fileoverview ClassificationIndicator Component v6.0.0
 * @description NSM Security Classification display component
 * @version 6.0.0
 */

import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils/cn';
import { Shield, AlertTriangle, Lock, Eye } from 'lucide-react';

const classificationVariants = cva(
  'inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md border-2',
  {
    variants: {
      level: {
        ÅPEN: 'bg-green-50 text-green-700 border-green-500',
        BEGRENSET: 'bg-yellow-50 text-yellow-700 border-yellow-500',
        KONFIDENSIELT: 'bg-orange-50 text-orange-700 border-orange-500',
        HEMMELIG: 'bg-red-50 text-red-700 border-red-500',
      },
      size: {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-1.5',
        lg: 'text-base px-4 py-2',
      },
      position: {
        'top-left': 'absolute top-2 left-2',
        'top-right': 'absolute top-2 right-2',
        'bottom-left': 'absolute bottom-2 left-2',
        'bottom-right': 'absolute bottom-2 right-2',
        inline: 'relative',
      },
    },
    defaultVariants: {
      level: 'ÅPEN',
      size: 'md',
      position: 'inline',
    },
  }
);

export interface ClassificationIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof classificationVariants> {
  readonly level: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  readonly position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'inline';
  readonly showIcon?: boolean;
  readonly auditTrail?: boolean;
  readonly locale?: 'nb-NO' | 'en-US';
  readonly customLabel?: string;
  readonly onClassificationClick?: () => void;
}

/**
 * ClassificationIndicator Component
 * Displays NSM security classification levels according to Norwegian standards
 * 
 * @example
 * ```tsx
 * <ClassificationIndicator 
 *   level="KONFIDENSIELT" 
 *   position="top-right"
 *   auditTrail={true}
 * />
 * ```
 */
export const ClassificationIndicator = forwardRef<HTMLDivElement, ClassificationIndicatorProps>(
  ({ 
    className,
    level,
    size,
    position = 'inline',
    showIcon = true,
    auditTrail = false,
    locale = 'nb-NO',
    customLabel,
    onClassificationClick,
    ...props 
  }, ref) => {
    // Get the appropriate icon for the classification level
    const getIcon = () => {
      switch (level) {
        case 'ÅPEN':
          return <Eye className="h-3.5 w-3.5" />;
        case 'BEGRENSET':
          return <Shield className="h-3.5 w-3.5" />;
        case 'KONFIDENSIELT':
          return <AlertTriangle className="h-3.5 w-3.5" />;
        case 'HEMMELIG':
          return <Lock className="h-3.5 w-3.5" />;
        default:
          return <Shield className="h-3.5 w-3.5" />;
      }
    };

    // Get the label based on locale
    const getLabel = () => {
      if (customLabel) return customLabel;

      const labels: Record<string, Record<string, string>> = {
        'nb-NO': {
          ÅPEN: 'ÅPEN',
          BEGRENSET: 'BEGRENSET',
          KONFIDENSIELT: 'KONFIDENSIELT',
          HEMMELIG: 'HEMMELIG',
        },
        'en-US': {
          ÅPEN: 'OPEN',
          BEGRENSET: 'RESTRICTED',
          KONFIDENSIELT: 'CONFIDENTIAL',
          HEMMELIG: 'SECRET',
        },
      };

      return labels[locale]?.[level] || labels['nb-NO'][level];
    };

    // Log classification access if audit trail is enabled
    React.useEffect(() => {
      if (auditTrail) {
        // In a real implementation, this would send to an audit service
        console.log(`[AUDIT] Classification indicator displayed: ${level} at ${new Date().toISOString()}`);
      }
    }, [level, auditTrail]);

    return (
      <div
        ref={ref}
        className={cn(
          classificationVariants({ level, size, position }),
          onClassificationClick && 'cursor-pointer hover:opacity-80 transition-opacity',
          className
        )}
        onClick={onClassificationClick}
        role={onClassificationClick ? 'button' : undefined}
        tabIndex={onClassificationClick ? 0 : undefined}
        aria-label={`Security classification: ${getLabel()}`}
        data-nsm-classification={level}
        data-audit-trail={auditTrail}
        {...props}
      >
        {showIcon && getIcon()}
        <span className="font-bold tracking-wide uppercase">
          {getLabel()}
        </span>
      </div>
    );
  }
);

ClassificationIndicator.displayName = 'ClassificationIndicator';

/**
 * ClassificationBanner Component
 * Full-width banner for classification display
 */
export interface ClassificationBannerProps extends ClassificationIndicatorProps {
  readonly description?: string;
  readonly showHandlingInstructions?: boolean;
}

export const ClassificationBanner = forwardRef<HTMLDivElement, ClassificationBannerProps>(
  ({ 
    level,
    description,
    showHandlingInstructions = false,
    locale = 'nb-NO',
    className,
    ...props 
  }, ref) => {
    const getHandlingInstructions = () => {
      const instructions: Record<string, Record<string, string>> = {
        'nb-NO': {
          ÅPEN: 'Informasjon kan deles offentlig',
          BEGRENSET: 'Kun for intern bruk. Skal ikke deles eksternt.',
          KONFIDENSIELT: 'Strengt konfidensielt. Krever særskilt tilgang.',
          HEMMELIG: 'Hemmelig informasjon. Krever sikkerhetsklarering.',
        },
        'en-US': {
          ÅPEN: 'Information can be shared publicly',
          BEGRENSET: 'Internal use only. Do not share externally.',
          KONFIDENSIELT: 'Strictly confidential. Requires special access.',
          HEMMELIG: 'Secret information. Requires security clearance.',
        },
      };

      return instructions[locale]?.[level] || instructions['nb-NO'][level];
    };

    const getBannerStyles = () => {
      switch (level) {
        case 'ÅPEN':
          return 'bg-green-100 border-green-500 text-green-800';
        case 'BEGRENSET':
          return 'bg-yellow-100 border-yellow-500 text-yellow-800';
        case 'KONFIDENSIELT':
          return 'bg-orange-100 border-orange-500 text-orange-800';
        case 'HEMMELIG':
          return 'bg-red-100 border-red-500 text-red-800';
        default:
          return 'bg-gray-100 border-gray-500 text-gray-800';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full px-4 py-3 border-t-4 border-b',
          getBannerStyles(),
          className
        )}
        role="banner"
        aria-label={`Security classification banner`}
        {...props}
      >
        <div className="flex items-center justify-between">
          <ClassificationIndicator
            level={level}
            position="inline"
            size="md"
            locale={locale}
            className="bg-white/50"
          />
          <div className="text-sm">
            {description || (showHandlingInstructions && getHandlingInstructions())}
          </div>
        </div>
      </div>
    );
  }
);

ClassificationBanner.displayName = 'ClassificationBanner';