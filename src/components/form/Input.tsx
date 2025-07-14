/**
 * @fileoverview Input Component - Enterprise Standards Compliant
 * @module Input
 * @description Input component using design tokens (no inline styles)
 */

import React, { useEffect, useRef, useState } from 'react';

import type { InputProps } from '../../types/form.types';

/**
 * Input component using design tokens and semantic props
 * Follows enterprise standards - no inline styles, design token props only
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref): React.ReactElement => {
  return (
    <div className="input-field" data-testid={testId}>
      {/* Label */}
      {label && <Label label={label} required={required} htmlFor={inputId} />}

      {/* Input */}
      <input
        ref={ref}
        id={inputId}
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
        aria-describedby={`${helpTextId} ${errorId}`}
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
      <div id={errorId}>
        {error && <ErrorMessage error={error} />}
        {validationErrors.map((err, index) => (
          <ErrorMessage key={index} error={err} />
        ))}
      </div>

      {/* Validation indicator */}
      {isValidating && (
        <div className="input-field__validation-indicator">
          <span className="input-field__validation-icon" aria-hidden="true">
            ⏳
          </span>
          <span className="input-field__validation-text sr-only">Validating...</span>
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
