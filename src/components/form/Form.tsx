// Form component for @xala-mock/ui-system
// Norwegian-compliant form container with accessibility support

import React, { forwardRef } from 'react';

import { FormProps } from '../../types/form.types';

// Helper function to generate CSS using design tokens
const getFormStyles = (props: FormProps): React.CSSProperties => {
  const {
    padding = 'md',
    margin = 'none',
    background = 'transparent',
    norwegian,
    accessibility,
  } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--form-field-spacing)',
    width: '100%',
    backgroundColor: getBackgroundToken(background),
    padding: getPaddingToken(padding),
    margin: getMarginToken(margin),
    fontFamily: 'var(--font-family-sans)',
    lineHeight: 'var(--line-height-normal)',
  };

  // Norwegian classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);

  // Accessibility enhancements
  const accessibilityStyles = getAccessibilityStyles(accessibility);

  return { ...baseStyles, ...classificationStyles, ...accessibilityStyles };
};

// Get background color token
const getBackgroundToken = (background: string): string => {
  const backgrounds = {
    primary: 'var(--background-primary)',
    secondary: 'var(--background-secondary)',
    tertiary: 'var(--color-gray-50)',
    transparent: 'transparent',
  };
  return backgrounds[background as keyof typeof backgrounds] || backgrounds.transparent;
};

// Get padding token
const getPaddingToken = (padding: string): string => {
  const paddings = {
    none: '0',
    sm: 'var(--spacing-4)',
    md: 'var(--spacing-6)',
    lg: 'var(--spacing-8)',
    xl: 'var(--spacing-12)',
  };
  return paddings[padding as keyof typeof paddings] || paddings.md;
};

// Get margin token
const getMarginToken = (margin: string): string => {
  const margins = {
    none: '0',
    sm: 'var(--spacing-4)',
    md: 'var(--spacing-6)',
    lg: 'var(--spacing-8)',
    xl: 'var(--spacing-12)',
  };
  return margins[margin as keyof typeof margins] || margins.none;
};

// Get Norwegian classification styles
const getClassificationStyles = (classification?: string): React.CSSProperties => {
  if (!classification) { return {}; }

  const classificationStyles: Record<string, React.CSSProperties> = {
    ÅPEN: {
      borderLeft: 'var(--border-accent-width) solid var(--color-green-500)',
      backgroundColor: 'var(--color-green-50)',
    },
    BEGRENSET: {
      borderLeft: 'var(--border-accent-width) solid var(--color-orange-500)',
      backgroundColor: 'var(--color-orange-50)',
    },
    KONFIDENSIELT: {
      borderLeft: 'var(--border-accent-width) solid var(--color-red-500)',
      backgroundColor: 'var(--color-red-50)',
    },
    HEMMELIG: {
      borderLeft: 'var(--border-accent-width) solid var(--color-red-800)',
      backgroundColor: 'var(--color-red-100)',
      border: 'var(--border-width) solid var(--color-red-800)',
    },
  };

  return classificationStyles[classification] || {};
};

// Get accessibility enhancement styles
const getAccessibilityStyles = (
  accessibility?: FormProps['accessibility']
): React.CSSProperties => {
  if (!accessibility) { return {}; }

  return {
    // Enhanced focus management
    ':focus-within': {
      outline: 'var(--focus-ring-width) solid var(--shadow-focus)',
      outlineOffset: 'var(--focus-ring-offset)',
    },
  };
};

// Classification indicator component
const ClassificationIndicator = ({
  classification,
  municipality,
}: {
  classification?: string;
  municipality?: string;
}) => {
  if (!classification) { return null; }

  const getClassificationText = (level: string): string => {
    const texts = {
      ÅPEN: 'Åpen informasjon',
      BEGRENSET: 'Begrenset tilgang',
      KONFIDENSIELT: 'Konfidensielt',
      HEMMELIG: 'Hemmelig',
    };
    return texts[level as keyof typeof texts] || level;
  };

  const getClassificationColor = (level: string): string => {
    const colors = {
      ÅPEN: 'var(--color-green-700)',
      BEGRENSET: 'var(--color-orange-700)',
      KONFIDENSIELT: 'var(--color-red-700)',
      HEMMELIG: 'var(--color-red-900)',
    };
    return colors[level as keyof typeof colors] || 'var(--text-secondary)';
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-2)',
        marginBottom: 'var(--spacing-4)',
        padding: 'var(--spacing-2) var(--spacing-3)',
        backgroundColor: 'var(--color-gray-100)',
        borderRadius: 'var(--border-radius-sm)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
        color: getClassificationColor(classification),
      }}
    >
      <span>🔒</span>
      <span>{getClassificationText(classification)}</span>
      {municipality && (
        <>
          <span>•</span>
          <span>{municipality}</span>
        </>
      )}
    </div>
  );
};

// Form component with forwardRef for className/style props
export const Form = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const {
    children,
    onSubmit,
    noValidate = false,
    autoComplete = 'on',
    norwegian,
    accessibility,
    className,
    style,
    testId,
    'aria-label': ariaLabel,
    ...formProps
  } = props;

  const formStyles = getFormStyles(formProps);
  const combinedStyles = { ...formStyles, ...style };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Norwegian form submission behavior
    if (norwegian?.submitBehavior === 'confirm') {
      const confirmed = window.confirm('Er du sikker på at du vil sende inn skjemaet?');
      if (!confirmed) {
        event.preventDefault();
        return;
      }
    }

    if (onSubmit) {
      onSubmit(event);
    }
  };

  return (
    <form
      ref={ref}
      className={className}
      style={combinedStyles}
      onSubmit={handleSubmit}
      noValidate={noValidate}
      autoComplete={autoComplete}
      data-testid={testId}
      aria-label={ariaLabel || 'Norwegian form'}
      aria-required={false}
      aria-invalid={false}
      aria-describedby='form-classification-info'
      role={accessibility?.landmark ? 'form' : undefined}
      data-classification={norwegian?.classification}
      data-municipality={norwegian?.municipality}
    >
      {/* Norwegian classification indicator */}
      <ClassificationIndicator
        classification={norwegian?.classification}
        municipality={norwegian?.municipality}
      />

      {/* Error announcement region for screen readers */}
      {accessibility?.announceErrors && (
        <div
          aria-live='polite'
          aria-atomic='true'
          style={{
            position: 'absolute',
            left: 'var(--screen-reader-only-left)',
            top: 'var(--screen-reader-only-top)',
            width: 'var(--screen-reader-only-width)',
            height: 'var(--screen-reader-only-height)',
            overflow: 'hidden',
            clipPath: 'inset(50%)',
            whiteSpace: 'nowrap',
          }}
          data-testid='form-error-announcer'
        />
      )}

      {/* Form content */}
      {children}
    </form>
  );
});

Form.displayName = 'Form';
