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
export const Form = forwardRef<HTMLFormElement, FormProps>((props, ref): React.ReactElement => { const formClasses = className || '';
  const handleSubmit = onSubmit || (() => {});
  const accessibility = {};

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
  ); });

Form.displayName = 'Form';
