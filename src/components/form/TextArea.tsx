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
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref): React.ReactElement => { return (
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
  ); });

/**
 * Label component
 */
const Label: React.FC<{ label: string;
  required?: boolean;
  htmlFor: string; }> = ({ label, required, htmlFor }): React.ReactElement => { return (
    <label className="textarea-field__label" htmlFor={htmlFor}>
      <span className="textarea-field__label-text">{label}</span>
      {required && (
        <span className="textarea-field__required-indicator" aria-label="Required">
          *
        </span>
      )}
    </label>
  ); };

TextArea.displayName = 'TextArea';
