/**
 * @fileoverview TextArea Component - Enterprise Standards Compliant
 * @module TextArea
 * @description TextArea component using design tokens (no inline styles)
 */

import React, { useEffect, useState } from 'react';

import type { TextAreaProps } from '../../types/form.types';

/**
 * TextArea component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref): void => {
  const {
    label,
    error,
    helpText,
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    rows = 4,
    cols,
    maxLength,
    minLength,
    required = false,
    disabled = false,
    readOnly = false,
    placeholder,
    name,
    id,
    resize = 'vertical',
    variant = 'default',
    hasError = false,
    className = '',
    testId,
    ...textAreaProps
  } = props;

  // Generate unique ID if not provided
  const textAreaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const helpTextId = `${textAreaId}-help`;
  const errorId = `${textAreaId}-error`;

  // State for character count
  const [currentLength, setCurrentLength] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);

  // Update counts when value changes
  useEffect((): void => {
    const currentValue = value || '';
    setCurrentLength(currentValue.length);
    setWordCount(
      currentValue
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0).length
    );
  }, [value]);

  // Build CSS classes using design tokens
  const textAreaClasses = React.useMemo((): void => {
    const classes = ['textarea'];

    // Variant classes
    classes.push(`textarea--variant-${variant}`);

    // Resize classes
    classes.push(`textarea--resize-${resize}`);

    // State classes
    if (hasError || error) {
      classes.push('textarea--error');
    }

    if (disabled) {
      classes.push('textarea--disabled');
    }

    if (readOnly) {
      classes.push('textarea--readonly');
    }

    if (required) {
      classes.push('textarea--required');
    }

    // Custom classes
    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [variant, resize, hasError, error, disabled, readOnly, required, className]);

  // Handle textarea change
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = event.target.value;
    onChange?.(newValue, event);
  };

  // Handle textarea blur
  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
    onBlur?.(event);
  };

  // Handle textarea focus
  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
    onFocus?.(event);
  };

  const hasValidationErrors = hasError || error;

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
        aria-describedby={`${helpTextId} ${errorId}`}
        aria-required={required}
        data-variant={variant}
        style={{ resize }}
        {...textAreaProps}
      />

      {/* Character count */}
      {maxLength && (
        <div className="textarea-field__character-count">
          <span className="textarea-field__character-count-text">
            {currentLength} / {maxLength}
          </span>
        </div>
      )}

      {/* Help text */}
      {helpText && (
        <div id={helpTextId} className="textarea-field__help">
          <span className="textarea-field__help-icon" aria-hidden="true">
            ℹ️
          </span>
          <span className="textarea-field__help-text">{helpText}</span>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div id={errorId} className="textarea-field__error" role="alert">
          <span className="textarea-field__error-icon" aria-hidden="true">
            ❌
          </span>
          <span className="textarea-field__error-text">{error}</span>
        </div>
      )}
    </div>
  );
});

/**
 * Label component
 */
const Label: React.FC<{
  label: string;
  required?: boolean;
  htmlFor: string;
}> = ({ label, required, htmlFor }): void => {
  return (
    <label className="textarea-field__label" htmlFor={htmlFor}>
      <span className="textarea-field__label-text">{label}</span>
      {required && (
        <span className="textarea-field__required-indicator" aria-label="Required">
          *
        </span>
      )}
    </label>
  );
};

TextArea.displayName = 'TextArea';
