/**
 * Alert Base Component
 * Main Alert component using extracted modules
 */

import React from 'react';

import { AlertActions, CloseButton } from './AlertActions';
import {
  AlertAcknowledgment,
  AlertDocumentationLink,
  AlertMessage,
  AlertTitle,
} from './AlertContent';
import {
  getAlertRole,
  getAlertStyles,
  getAriaLive,
  type AlertPropsWithNorwegian,
} from './AlertHelpers';
import { AlertIcon } from './AlertIcon';

/**
 * Alert component with forwardRef
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertPropsWithNorwegian>((props, ref) => {
  const {
    variant = 'info',
    severity = 'medium',
    title,
    titleKey,
    message,
    messageKey,
    icon,
    closable = false,
    children,
    className = '',
    style,
    actions,
    norwegian,
    ariaLabel,
    testId = 'alert',
    onClose,
    ...divProps
  } = props;

  const [isVisible, setIsVisible] = React.useState(true);

  const handleClose = (): void => {
    setIsVisible(false);
    onClose?.();
  };

  const combinedStyles = {
    ...getAlertStyles(props),
    ...style,
  };

  if (!isVisible) {
    return <></>;
  }

  return (
    <div
      ref={ref}
      role={getAlertRole(severity)}
      aria-live={getAriaLive(severity)}
      aria-atomic="true"
      className={className}
      style={combinedStyles}
      data-testid={testId}
      data-variant={variant}
      data-severity={severity}
      data-classification={norwegian?.classification}
      data-municipality={norwegian?.municipality}
      data-category={norwegian?.category}
      data-escalation-level={norwegian?.escalationLevel}
      aria-label={ariaLabel}
      {...divProps}
    >
      {/* Alert icon */}
      {icon || <AlertIcon variant={variant} />}

      {/* Alert content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Alert title */}
        <AlertTitle
          {...(title && { title })}
          {...(titleKey && { titleKey })}
          severity={severity}
          norwegian={norwegian}
        />

        {/* Alert message */}
        <AlertMessage
          {...(message && { message })}
          {...(messageKey && { messageKey })}
          children={children}
        />

        {/* Action buttons */}
        {actions && <AlertActions actions={actions} />}

        {/* Acknowledgment requirement */}
        <AlertAcknowledgment norwegian={norwegian} />

        {/* Related documentation link */}
        <AlertDocumentationLink norwegian={norwegian} />
      </div>

      {/* Close button */}
      {closable && <CloseButton onClose={handleClose} />}
    </div>
  );
});

Alert.displayName = 'Alert';
