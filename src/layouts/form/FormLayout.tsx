/**
 * @fileoverview Form Layout Component v5.0.0 - Enterprise Form Layout System
 * @description Comprehensive form layout for structured form containers and multi-step forms
 * @version 5.0.0
 * @compliance WCAG 2.2 AAA, Enterprise Standards, SSR-Safe, Norwegian Compliance
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// FORM LAYOUT VARIANTS
// =============================================================================

const formLayoutVariants = cva(
  [
    'w-full',
    'bg-background text-foreground',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      layout: {
        centered: 'min-h-screen flex items-center justify-center',
        standard: 'container mx-auto py-8',
        fullscreen: 'min-h-screen flex flex-col',
        card: 'container mx-auto py-8 px-4',
        split: 'min-h-screen grid grid-cols-1 lg:grid-cols-2',
      },
      maxWidth: {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        '2xl': 'max-w-6xl',
        full: 'max-w-full',
      },
      spacing: {
        none: 'space-y-0',
        sm: 'space-y-4',
        md: 'space-y-6',
        lg: 'space-y-8',
        xl: 'space-y-12',
      },
    },
    defaultVariants: {
      layout: 'standard',
      maxWidth: 'lg',
      spacing: 'md',
    },
  }
);

const formContainerVariants = cva(
  [
    'w-full',
    'bg-card text-card-foreground',
    'border border-border',
    'transition-all duration-200 ease-in-out',
  ],
  {
    variants: {
      variant: {
        default: 'rounded-lg shadow-sm',
        elevated: 'rounded-xl shadow-md',
        bordered: 'rounded-lg border-2',
        flat: 'rounded-none shadow-none border-0',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'lg',
    },
  }
);

const formHeaderVariants = cva(
  [
    'text-center',
    'border-b border-border',
  ],
  {
    variants: {
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      spacing: {
        sm: 'pb-4 mb-6',
        md: 'pb-6 mb-8',
        lg: 'pb-8 mb-12',
      },
      border: {
        none: 'border-b-0 pb-0',
        subtle: 'border-b border-border/50',
        default: 'border-b border-border',
        strong: 'border-b-2 border-border',
      },
    },
    defaultVariants: {
      alignment: 'center',
      spacing: 'md',
      border: 'default',
    },
  }
);

const formSectionVariants = cva(
  [
    'space-y-4',
  ],
  {
    variants: {
      spacing: {
        tight: 'space-y-2',
        normal: 'space-y-4',
        relaxed: 'space-y-6',
        loose: 'space-y-8',
      },
      border: {
        none: '',
        subtle: 'pb-6 border-b border-border/30',
        default: 'pb-6 border-b border-border',
      },
    },
    defaultVariants: {
      spacing: 'normal',
      border: 'none',
    },
  }
);

const formActionsVariants = cva(
  [
    'flex items-center',
    'pt-6',
    'border-t border-border',
  ],
  {
    variants: {
      alignment: {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
      },
      direction: {
        row: 'flex-row space-x-4',
        column: 'flex-col space-y-4',
        'row-reverse': 'flex-row-reverse space-x-reverse space-x-4',
        'column-reverse': 'flex-col-reverse space-y-reverse space-y-4',
      },
      border: {
        none: 'border-t-0 pt-0',
        subtle: 'border-t border-border/50',
        default: 'border-t border-border',
        strong: 'border-t-2 border-border',
      },
    },
    defaultVariants: {
      alignment: 'right',
      direction: 'row',
      border: 'default',
    },
  }
);

const formStepperVariants = cva(
  [
    'flex items-center justify-center',
    'mb-8',
  ],
  {
    variants: {
      orientation: {
        horizontal: 'flex-row space-x-4',
        vertical: 'flex-col space-y-4',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
    },
  }
);

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface FormLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly layout?: 'centered' | 'standard' | 'fullscreen' | 'card' | 'split';
  readonly maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  readonly spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  readonly onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  readonly 'aria-label'?: string;
}

export interface FormContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly variant?: 'default' | 'elevated' | 'bordered' | 'flat';
  readonly padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  readonly loading?: boolean;
}

export interface FormHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children?: ReactNode;
  readonly title?: string;
  readonly subtitle?: string;
  readonly description?: string;
  readonly alignment?: 'left' | 'center' | 'right';
  readonly spacing?: 'sm' | 'md' | 'lg';
  readonly border?: 'none' | 'subtle' | 'default' | 'strong';
  readonly icon?: ReactNode;
}

export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly title?: string;
  readonly description?: string;
  readonly spacing?: 'tight' | 'normal' | 'relaxed' | 'loose';
  readonly border?: 'none' | 'subtle' | 'default';
  readonly required?: boolean;
}

export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly alignment?: 'left' | 'center' | 'right' | 'between' | 'around';
  readonly direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  readonly border?: 'none' | 'subtle' | 'default' | 'strong';
  readonly loading?: boolean;
}

export interface FormStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly steps: readonly FormStepProps[];
  readonly currentStep: number;
  readonly orientation?: 'horizontal' | 'vertical';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly onStepClick?: (step: number) => void;
}

export interface FormStepProps {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly status: 'pending' | 'current' | 'completed' | 'error';
  readonly disabled?: boolean;
}

export interface FormProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly currentStep: number;
  readonly totalSteps: number;
  readonly showPercentage?: boolean;
  readonly variant?: 'default' | 'minimal';
}

// =============================================================================
// FORM HEADER COMPONENT
// =============================================================================

export const FormHeader = forwardRef<HTMLDivElement, FormHeaderProps>(
  (
    {
      children,
      title,
      subtitle,
      description,
      alignment = 'center',
      spacing = 'md',
      border = 'default',
      icon,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing: spacingTokens } = useTokens();

    return (
      <div
        ref={ref}
        className={cn(formHeaderVariants({ alignment, spacing, border }), className)}
        {...props}
      >
        {icon && (
          <div className="flex justify-center mb-4">
            {icon}
          </div>
        )}
        
        {title && (
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
        )}
        
        {subtitle && (
          <h2 className="text-lg font-medium text-muted-foreground mt-2">
            {subtitle}
          </h2>
        )}
        
        {description && (
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            {description}
          </p>
        )}
        
        {children}
      </div>
    );
  }
);

FormHeader.displayName = 'FormHeader';

// =============================================================================
// FORM SECTION COMPONENT
// =============================================================================

export const FormSection = forwardRef<HTMLDivElement, FormSectionProps>(
  (
    {
      children,
      title,
      description,
      spacing = 'normal',
      border = 'none',
      required = false,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <section
        ref={ref}
        className={cn(formSectionVariants({ spacing, border }), className)}
        {...props}
      >
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h3 className="text-lg font-medium text-foreground flex items-center">
                {title}
                {required && (
                  <span className="text-destructive ml-1" aria-label="Required">
                    *
                  </span>
                )}
              </h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </section>
    );
  }
);

FormSection.displayName = 'FormSection';

// =============================================================================
// FORM ACTIONS COMPONENT
// =============================================================================

export const FormActions = forwardRef<HTMLDivElement, FormActionsProps>(
  (
    {
      children,
      alignment = 'right',
      direction = 'row',
      border = 'default',
      loading = false,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(
          formActionsVariants({ alignment, direction, border }),
          loading && 'opacity-50 pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FormActions.displayName = 'FormActions';

// =============================================================================
// FORM STEPPER COMPONENT
// =============================================================================

export const FormStepper = forwardRef<HTMLDivElement, FormStepperProps>(
  (
    {
      steps,
      currentStep,
      orientation = 'horizontal',
      size = 'md',
      onStepClick,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing } = useTokens();

    return (
      <nav
        ref={ref}
        className={cn(formStepperVariants({ orientation, size }), className)}
        aria-label="Form progress"
        {...props}
      >
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isClickable = onStepClick && !step.disabled;

          return (
            <div
              key={step.id}
              className={cn(
                'flex items-center',
                orientation === 'horizontal' && index < steps.length - 1 && 'after:flex-1 after:h-px after:bg-border after:mx-4',
                orientation === 'vertical' && index < steps.length - 1 && 'after:w-px after:h-8 after:bg-border after:mx-auto after:my-2'
              )}
            >
              <button
                type="button"
                onClick={() => isClickable && onStepClick(stepNumber)}
                disabled={step.disabled || !isClickable}
                className={cn(
                  'flex items-center space-x-3 p-2 rounded-lg transition-colors',
                  isClickable && 'hover:bg-secondary/50',
                  step.disabled && 'opacity-50 cursor-not-allowed'
                )}
                aria-current={isActive ? 'step' : undefined}
              >
                <div
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium',
                    isCompleted && 'bg-primary border-primary text-primary-foreground',
                    isActive && 'border-primary text-primary',
                    !isActive && !isCompleted && 'border-border text-muted-foreground',
                    step.status === 'error' && 'border-destructive text-destructive'
                  )}
                >
                  {isCompleted ? (
                    <span className="text-xs">✓</span>
                  ) : step.status === 'error' ? (
                    <span className="text-xs">!</span>
                  ) : (
                    stepNumber
                  )}
                </div>
                
                <div className="text-left">
                  <div
                    className={cn(
                      'text-sm font-medium',
                      isActive && 'text-foreground',
                      !isActive && 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-xs text-muted-foreground">
                      {step.description}
                    </div>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </nav>
    );
  }
);

FormStepper.displayName = 'FormStepper';

// =============================================================================
// FORM PROGRESS COMPONENT
// =============================================================================

export const FormProgress = forwardRef<HTMLDivElement, FormProgressProps>(
  (
    {
      currentStep,
      totalSteps,
      showPercentage = true,
      variant = 'default',
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors } = useTokens();
    const progress = Math.min((currentStep / totalSteps) * 100, 100);

    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        {variant === 'default' && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            {showPercentage && (
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}%
              </span>
            )}
          </div>
        )}
        
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Form progress: ${Math.round(progress)}% complete`}
          />
        </div>
      </div>
    );
  }
);

FormProgress.displayName = 'FormProgress';

// =============================================================================
// FORM CONTAINER COMPONENT
// =============================================================================

export const FormContainer = forwardRef<HTMLDivElement, FormContainerProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'lg',
      loading = false,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, borderRadius, elevation } = useTokens();

    const containerStyles: React.CSSProperties = {
      backgroundColor: colors.background?.paper || colors.background?.default,
      borderColor: colors.border?.default,
    };

    return (
      <div
        ref={ref}
        className={cn(
          formContainerVariants({ variant, padding }),
          loading && 'relative overflow-hidden',
          className
        )}
        style={containerStyles}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        {children}
      </div>
    );
  }
);

FormContainer.displayName = 'FormContainer';

// =============================================================================
// MAIN FORM LAYOUT COMPONENT
// =============================================================================

export const FormLayout = forwardRef<HTMLDivElement, FormLayoutProps>(
  (
    {
      children,
      layout = 'standard',
      maxWidth = 'lg',
      spacing = 'md',
      onSubmit,
      className,
      'aria-label': ariaLabel = 'Form',
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors } = useTokens();

    const layoutStyles: React.CSSProperties = {
      backgroundColor: colors.background?.default,
      color: colors.text?.primary,
    };

    const formContent = (
      <div
        className={cn(
          formLayoutVariants({ layout, maxWidth, spacing }),
          className
        )}
        style={layoutStyles}
      >
        {children}
      </div>
    );

    if (onSubmit) {
      return (
        <form
          ref={ref}
          onSubmit={onSubmit}
          aria-label={ariaLabel}
          noValidate
          {...props}
        >
          {formContent}
        </form>
      );
    }

    return (
      <div
        ref={ref}
        aria-label={ariaLabel}
        {...props}
      >
        {formContent}
      </div>
    );
  }
);

FormLayout.displayName = 'FormLayout';

// =============================================================================
// COMPOUND COMPONENT ATTACHMENTS
// =============================================================================

FormLayout.Container = FormContainer;
FormLayout.Header = FormHeader;
FormLayout.Section = FormSection;
FormLayout.Actions = FormActions;
FormLayout.Stepper = FormStepper;
FormLayout.Progress = FormProgress;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type FormLayoutVariant = VariantProps<typeof formLayoutVariants>;
export type FormContainerVariant = VariantProps<typeof formContainerVariants>;
export type FormHeaderVariant = VariantProps<typeof formHeaderVariants>;
export type FormSectionVariant = VariantProps<typeof formSectionVariants>;
export type FormActionsVariant = VariantProps<typeof formActionsVariants>;
export type FormStepperVariant = VariantProps<typeof formStepperVariants>;

export { 
  formLayoutVariants, 
  formContainerVariants, 
  formHeaderVariants, 
  formSectionVariants,
  formActionsVariants,
  formStepperVariants,
};