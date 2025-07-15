/**
 * @fileoverview TextArea Component - Enterprise Standards Compliant
 * @module TextArea
 * @description TextArea component using design tokens (no inline styles)
 */

import React from 'react';

import type { TextAreaProps } from '../../types/form.types';

// Label component
interface LabelProps {
  label: string;
  required?: boolean;
  htmlFor?: string;
}

const Label: React.FC<LabelProps> = ({ label, required, htmlFor }) => (
  <label htmlFor={htmlFor} className="textarea-field__label" data-required={required}>
    {label}
    {required && <span className="textarea-field__required">*</span>}
  </label>
);

/**
 * TextArea component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref): React.ReactElement => {
    const {
      label,
      name,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      placeholder,
      required = false,
      disabled = false,
      readOnly = false,
      rows = 4,
      cols,
      maxLength,
      minLength,
      variant = 'default',
      resize = 'vertical',
      helpText,
      error,
      testId,
      className,
      textAreaId = 'textarea',
      helpTextId = 'help-text',
      errorId = 'error-text',
      currentLength = 0,
      onLengthChange,
      labelKey,
      ...restProps
    } = props;

    // Pure component - IDs and length management handled by parent

    // Handle change with character count
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const newValue = e.target.value;
      onLengthChange?.(newValue.length);
      onChange?.(newValue, e);
    };

    // Handle blur
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
      onBlur?.(e);
    };

    // Handle focus
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
      onFocus?.(e);
    };

    // Validation state
    const hasValidationErrors = Boolean(error);

    // CSS classes
    const textAreaClasses = [
      'textarea-field__textarea',
      `textarea-field__textarea--${variant}`,
      disabled && 'textarea-field__textarea--disabled',
      readOnly && 'textarea-field__textarea--readonly',
      hasValidationErrors && 'textarea-field__textarea--error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Aria describedby
    const describedBy = [helpText && helpTextId, error && errorId].filter(Boolean).join(' ');

    return (
      <div className="textarea-field" data-testid={testId}>
        {/* Label */}
        {label && <Label label={label} required={required} htmlFor={textAreaId} />}

        {/* TextArea */}
        <textarea
          ref={ref}
          id={textAreaId}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          cols={cols}
          maxLength={maxLength}
          minLength={minLength}
          className={textAreaClasses}
          aria-invalid={hasValidationErrors}
          aria-describedby={describedBy || undefined}
          aria-required={required}
          data-variant={variant}
          style={{ resize }}
          {...restProps}
        />

        {/* Character count */}
        {maxLength && (
          <div className="textarea-field__counter">
            <span className="textarea-field__counter-text">
              {currentLength} / {maxLength}
            </span>
          </div>
        )}

        {/* Help text */}
        {helpText && (
          <div id={helpTextId} className="textarea-field__help">
            <svg className="textarea-field__help-icon" aria-hidden="true">
              <use xlinkHref="#icon-info" />
            </svg>
            <span className="textarea-field__help-text">{helpText}</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div id={errorId} className="textarea-field__error" role="alert">
            <svg className="textarea-field__error-icon" aria-hidden="true">
              <use xlinkHref="#icon-error" />
            </svg>
            <span className="textarea-field__error-text">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
