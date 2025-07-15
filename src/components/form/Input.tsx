/**
 * @fileoverview Input Component - Enterprise Standards Compliant
 * @module Input
 * @description Input component using design tokens (no inline styles)
 */

import React, { useId } from 'react';

import type { InputProps } from '../../types/form.types';

/**
 * Input component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref): React.ReactElement => {
    const {
      testId = 'input',
      label,
      required = false,
      id,
      name,
      type = 'text',
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      placeholder,
      disabled = false,
      readOnly = false,
      maxLength,
      minLength,
      pattern,
      autoComplete,
      variant = 'default',
      size = 'md',
      helpText,
      error,
      hasError = false,
      validation,
      className,
      ...inputProps
    } = props;

    // Generate ID if not provided
    const generatedId = useId();
    const finalInputId = id || generatedId;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (onChange) {
        onChange(e.target.value, e);
      }
    };

    const handleBlur = onBlur || ((): void => {});
    const handleFocus = onFocus || ((): void => {});
    const inputClasses = className || 'input';
    const hasValidationErrors = !!error || hasError;

    const helpTextId = finalInputId ? `${finalInputId}-help` : undefined;
    const errorId = finalInputId ? `${finalInputId}-error` : undefined;

    return (
      <div className="input-field" data-testid={testId}>
        {/* Label */}
        {label && <Label label={label} required={required} htmlFor={finalInputId} />}

        {/* Input */}
        <input
          ref={ref}
          id={finalInputId}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          autoComplete={autoComplete}
          className={inputClasses}
          aria-invalid={hasValidationErrors}
          aria-describedby={`${helpTextId || ''} ${errorId || ''}`.trim()}
          aria-required={required}
          data-variant={variant}
          data-size={size}
          {...inputProps}
        />

        {/* Help text */}
        {helpText && (
          <div id={helpTextId} className="input-field__help">
            <span className="input-field__help-icon" aria-hidden="true">
              ℹ️
            </span>
            <span className="input-field__help-text">{helpText}</span>
          </div>
        )}

        {/* Error messages */}
        <div id={errorId}>{error && <ErrorMessage error={error} />}</div>

        {/* Validation indicator */}
        {validation && (
          <div className="input-field__validation-indicator">
            <span className="input-field__validation-icon" aria-hidden="true">
              ⏳
            </span>
            <span className="input-field__validation-text sr-only">Validating...</span>
          </div>
        )}
      </div>
    );
  }
);

/**
 * Label component
 */
const Label: React.FC<{
  label: string;
  required?: boolean;
  htmlFor: string;
}> = ({ label, required, htmlFor }): React.ReactElement => {
  return (
    <label className="input-field__label" htmlFor={htmlFor}>
      <span className="input-field__label-text">{label}</span>
      {required && (
        <span className="input-field__required-indicator" aria-label="Required">
          *
        </span>
      )}
    </label>
  );
};

/**
 * Error message component
 */
const ErrorMessage: React.FC<{ error: string }> = ({ error }): React.ReactElement => {
  return (
    <div className="input-field__error" role="alert">
      <span className="input-field__error-icon" aria-hidden="true">
        ❌
      </span>
      <span className="input-field__error-text">{error}</span>
    </div>
  );
};

Input.displayName = 'Input';
