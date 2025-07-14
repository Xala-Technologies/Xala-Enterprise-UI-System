// Form components index for @xala-mock/ui-system
// Norwegian-compliant form components with accessibility and validation

export { Form } from './Form';
export { Input } from './Input';
export { TextArea } from './TextArea';
export { Select } from './Select';
export { PersonalNumberInput } from './PersonalNumberInput';
export { OrganizationNumberInput } from './OrganizationNumberInput';

// Export all form types
export type {
  FormProps,
  InputProps,
  TextAreaProps,
  SelectProps,
  SelectOption,
  CheckboxProps,
  RadioProps,
  RadioGroupProps,
  RadioOption,
  PersonalNumberInputProps,
  OrganizationNumberInputProps,
  OrganizationData,
  ValidationResult,
  ValidationError,
  NorwegianValidationPatterns,
  FormFieldState,
  FormComponentProps,
} from '../../types/form.types';

// Export validation utilities
export {
  validatePersonalNumber,
  validateOrganizationNumber,
  formatPersonalNumber,
  formatOrganizationNumber,
  NORWEGIAN_PATTERNS,
  NORWEGIAN_ERROR_MESSAGES,
} from '../../utils/norwegian-validation';

// Re-export common types for convenience
export type {
  PersonalNumberValidation,
  OrganizationNumberValidation,
} from '../../utils/norwegian-validation';
