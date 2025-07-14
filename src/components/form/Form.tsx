/**
 * @fileoverview Form Component - Enterprise Standards Compliant
 * @module Form
 * @description Form container component using design tokens (no inline styles)
 */

import React, { forwardRef } from 'react';

import type { FormProps } from '../../types/form.types';

/**
 * Form component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export const Form = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const {
    children,
    padding = 'md',
    margin = 'none',
    background = 'transparent',
    accessibility,
    onSubmit,
    className = '',
    testId,
    ...formProps
  } = props;

  // Build CSS classes using design tokens
  const formClasses = React.useMemo(() => {
    const classes = ['form'];

    // Layout classes
    classes.push(`form--padding-${padding}`);
    classes.push(`form--margin-${margin}`);
    classes.push(`form--background-${background}`);

    // Accessibility classes
    if (accessibility?.announceErrors) {
      classes.push('form--announce-errors');
    }

    if (accessibility?.landmark) {
      classes.push('form--landmark');
    }

    // Custom classes
    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [padding, margin, background, accessibility, className]);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Enhanced validation for forms with error announcements
    if (accessibility?.announceErrors) {
      const form = event.currentTarget;
      const firstError = form.querySelector('[aria-invalid="true"]') as HTMLElement;
      if (firstError) {
        firstError.focus();
        return;
      }
    }

    onSubmit?.(event);
  };

  return (
    <form
      ref={ref}
      className={formClasses}
      onSubmit={handleSubmit}
      noValidate={accessibility?.announceErrors} // Use custom validation when announcing errors
      aria-label={accessibility?.landmark ? 'Form' : undefined}
      data-testid={testId}
      {...formProps}
    >
      {/* Form content */}
      <div className="form__content">{children}</div>
    </form>
  );
});

Form.displayName = 'Form';
