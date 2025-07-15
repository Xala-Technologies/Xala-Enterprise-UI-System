/**
 * Button Base Component
 * Main Button component using extracted modules
 */

import * as React from 'react';
import { useState } from 'react';

import { ConfirmationDialog } from './ButtonConfirmation';
import { getButtonStyles, type ButtonPropsWithNorwegian } from './ButtonHelpers';
import { ClassificationIndicator, LoadingSpinner } from './ButtonIcon';

/**
 * Button component with forwardRef
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonPropsWithNorwegian>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'md',
      type = 'button',
      disabled = false,
      loading = false,
      loadingText,
      children,
      labelKey,
      icon,
      iconPosition = 'left',
      className = '',
      style,
      norwegian,
      ariaLabel,
      testId = 'button',
      onClick,
      ...buttonProps
    } = props;

    const [showConfirmation, setShowConfirmation] = useState(false);

    const isDisabled = disabled || loading;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
      if (norwegian?.requiresConfirmation) {
        setShowConfirmation(true);
      } else {
        onClick?.(event);
      }
    };

    const handleConfirm = (): void => {
      setShowConfirmation(false);
      onClick?.({} as React.MouseEvent<HTMLButtonElement>);
    };

    const handleCancel = (): void => {
      setShowConfirmation(false);
    };

    const combinedStyles = {
      ...getButtonStyles(props),
      ...style,
    };

    return (
      <>
        <button
          ref={ref}
          type={type}
          disabled={isDisabled}
          className={`xala-button ${className}`}
          style={combinedStyles}
          aria-label={ariaLabel || labelKey}
          aria-busy={loading}
          aria-disabled={isDisabled}
          data-testid={testId}
          data-variant={variant}
          data-size={size}
          onClick={handleClick}
          {...buttonProps}
        >
          {iconPosition === 'left' && icon && <span className="xala-button__icon">{icon}</span>}
          {loading && <LoadingSpinner size={size} />}
          <span className="xala-button__text">
            {loading && loadingText ? loadingText : children}
          </span>
          {iconPosition === 'right' && icon && <span className="xala-button__icon">{icon}</span>}
          {norwegian?.classification && (
            <ClassificationIndicator level={norwegian.classification} />
          )}
        </button>

        {showConfirmation && (
          <ConfirmationDialog
            isOpen={showConfirmation}
            messageKey={norwegian?.confirmationMessageKey || 'confirm.message'}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </>
    );
  }
);

Button.displayName = 'Button';
