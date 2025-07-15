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

    const buttonContent = (
      <>
        {loading && <LoadingSpinner size={size} />}
        {icon && iconPosition === 'left' && !loading && icon}
        {norwegian?.classification && <ClassificationIndicator level={norwegian.classification} />}
        {children || labelKey}
        {icon && iconPosition === 'right' && !loading && icon}
      </>
    );

    return (
      <>
        <button
          ref={ref}
          type={type}
          disabled={isDisabled}
          className={className}
          style={combinedStyles}
          onClick={handleClick}
          aria-label={ariaLabel || (loading ? `Loading: ${labelKey || children}` : undefined)}
          aria-busy={loading}
          aria-disabled={isDisabled}
          data-testid={testId}
          data-variant={variant}
          data-size={size}
          data-classification={norwegian?.classification}
          data-municipality={norwegian?.municipality}
          data-action-type={norwegian?.actionType}
          data-priority={norwegian?.priority}
          {...buttonProps}
        >
          {buttonContent}
        </button>

        {/* Confirmation dialog */}
        <ConfirmationDialog
          isOpen={showConfirmation}
          {...(norwegian?.confirmationMessageKey && {
            messageKey: norwegian.confirmationMessageKey,
          })}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </>
    );
  }
);

Button.displayName = 'Button';
