/**
 * Alert Component
 * Norwegian-compliant alert component with accessibility and classification support
 */

export { Alert } from './AlertBase';
export type { AlertPropsWithNorwegian } from './AlertHelpers';

// Re-export individual components for advanced usage
export { AlertActions, CloseButton } from './AlertActions';
export {
  AlertAcknowledgment,
  AlertDocumentationLink,
  AlertMessage,
  AlertTitle,
  CategoryIndicator,
  ClassificationIndicator,
  SeverityIndicator,
} from './AlertContent';
export {
  getAlertRole,
  getAlertStyles,
  getAriaLive,
  getClassificationStyles,
  getEscalationStyles,
  getSeverityStyles,
  getVariantStyles,
} from './AlertHelpers';
export { AlertIcon } from './AlertIcon';
