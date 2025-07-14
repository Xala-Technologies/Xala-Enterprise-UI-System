/**
 * Button Component
 * Norwegian-compliant button with accessibility and confirmation support
 */

export { Button } from './ButtonBase';
export type { ButtonPropsWithNorwegian } from './ButtonHelpers';

// Re-export individual components for advanced usage
export { ConfirmationDialog } from './ButtonConfirmation';
export {
  getButtonStyles,
  getClassificationStyles,
  getPriorityStyles,
  getShapeStyles,
  getSizeStyles,
  getVariantStyles,
  getWidthStyles,
} from './ButtonHelpers';
export { ClassificationIndicator, LoadingSpinner } from './ButtonIcon';
