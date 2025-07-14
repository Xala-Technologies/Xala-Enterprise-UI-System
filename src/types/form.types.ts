// Form types for @xala-mock/ui-system
// Norwegian-compliant form component types with accessibility and validation

import { ComponentProps } from './index';

// Base form component props with Norwegian accessibility
export interface FormComponentProps extends ComponentProps {
  labelKey: string; // Required localization key
  errorKey?: string; // Error message localization key
  helpKey?: string; // Help text localization key
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  name?: string;
  id?: string;
  norwegian?: {
    accessibility?: 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
    validation?: 'strict' | 'lenient';
    format?: 'government' | 'municipal';
  };
}

// Form container props
export interface FormProps extends ComponentProps {
  onSubmit?: (event: any) => void;
  noValidate?: boolean;
  autoComplete?: 'on' | 'off';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  margin?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'transparent' | 'white' | 'gray';
  norwegian?: {
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    municipality?: string;
    submitBehavior?: 'immediate' | 'validate' | 'confirm';
  };
  accessibility?: {
    announceErrors?: boolean;
    landmark?: boolean;
  };
}

// Input component props
export interface InputProps extends FormComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: any) => void;
  onBlur?: (event: any) => void;
  onFocus?: (event: any) => void;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  variant?: 'default' | 'government' | 'municipal';
  size?: 'sm' | 'md' | 'lg';
  hasError?: boolean;
  validation?: {
    custom?: (value: string) => string | null;
    debounceMs?: number;
  };
}

// TextArea component props
export interface TextAreaProps extends FormComponentProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: any) => void;
  onBlur?: (event: any) => void;
  onFocus?: (event: any) => void;
  rows?: number;
  cols?: number;
  maxLength?: number;
  minLength?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  variant?: 'default' | 'government' | 'municipal';
  hasError?: boolean;
  norwegian?: FormComponentProps['norwegian'] & {
    characterCounter?: boolean; // Show Norwegian character count
    lineHeight?: 'compact' | 'standard' | 'relaxed'; // For Norwegian text
  };
}

// Select component props
export interface SelectProps extends FormComponentProps {
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[], event: any) => void;
  onBlur?: (event: any) => void;
  onFocus?: (event: any) => void;
  multiple?: boolean;
  size?: number;
  options: SelectOption[];
  variant?: 'default' | 'government' | 'municipal';
  hasError?: boolean;
  searchable?: boolean;
  norwegian?: FormComponentProps['norwegian'] & {
    sortAlphabetical?: boolean; // Sort by Norwegian alphabet
    includeRegions?: boolean; // Include Norwegian regions
  };
}

export interface SelectOption {
  value: string;
  labelKey: string; // Localization key for the option label
  disabled?: boolean;
  group?: string;
  norwegian?: {
    region?: 'øst' | 'vest' | 'nord' | 'sør' | 'midt';
    municipality?: string;
  };
}

// Checkbox component props
export interface CheckboxProps extends FormComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: any) => void;
  value?: string;
  indeterminate?: boolean;
  variant?: 'default' | 'government' | 'municipal';
  size?: 'sm' | 'md' | 'lg';
  hasError?: boolean;
}

// Radio component props
export interface RadioProps extends FormComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: any) => void;
  value: string;
  name: string; // Required for radio groups
  variant?: 'default' | 'government' | 'municipal';
  size?: 'sm' | 'md' | 'lg';
  hasError?: boolean;
}

// RadioGroup component props
export interface RadioGroupProps extends FormComponentProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: any) => void;
  options: RadioOption[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'government' | 'municipal';
  hasError?: boolean;
}

export interface RadioOption {
  value: string;
  labelKey: string; // Localization key
  disabled?: boolean;
  helpKey?: string; // Additional help text
}

// Norwegian Personal Number Input (Fødselsnummer/D-nummer)
export interface PersonalNumberInputProps extends FormComponentProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, isValid: boolean, event: any) => void;
  onValidationChange?: (isValid: boolean, errors: string[]) => void;
  onBlur?: (event: any) => void;
  onFocus?: (event: any) => void;
  variant?: 'default' | 'government' | 'municipal';
  hasError?: boolean;
  validation?: {
    checksum?: boolean; // Enable checksum validation (default: true)
    allowDNumber?: boolean; // Allow D-numbers (temporary numbers)
    allowHNumber?: boolean; // Allow H-numbers (help numbers)
    strictFormat?: boolean; // Require 11 digits exactly
    realTimeValidation?: boolean; // Validate as user types
  };
  norwegian?: FormComponentProps['norwegian'] & {
    displayFormat?: 'ddmmyy-nnnnn' | 'ddmmyynnnnn'; // Display format
    maskInput?: boolean; // Show input mask
    autoFormat?: boolean; // Auto-format while typing
  };
}

// Norwegian Organization Number Input (Organisasjonsnummer)
export interface OrganizationNumberInputProps extends FormComponentProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, isValid: boolean, event: any) => void;
  onValidationChange?: (isValid: boolean, errors: string[], orgData?: OrganizationData) => void;
  onBlur?: (event: any) => void;
  onFocus?: (event: any) => void;
  variant?: 'default' | 'government' | 'municipal';
  hasError?: boolean;
  validation?: {
    checksum?: boolean; // Enable checksum validation (default: true)
    brreg?: boolean; // Check against BRREG database (default: false)
    realTimeValidation?: boolean; // Validate as user types
    allowInactive?: boolean; // Allow inactive organizations
  };
  norwegian?: FormComponentProps['norwegian'] & {
    displayFormat?: 'nnn nnn nnn' | 'nnnnnnnnn'; // Display format
    maskInput?: boolean; // Show input mask
    autoFormat?: boolean; // Auto-format while typing
    fetchOrganizationData?: boolean; // Fetch org data from BRREG
  };
}

// Organization data from BRREG
export interface OrganizationData {
  name: string;
  organizationForm: string;
  municipality: string;
  county: string;
  status: 'active' | 'inactive' | 'dissolved';
  registrationDate: string;
  industry?: {
    code: string;
    description: string;
  };
}

// Form validation result
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings?: string[];
}

export interface ValidationError {
  field: string;
  messageKey: string; // Localization key for error message
  code: string; // Error code for programmatic handling
  severity: 'error' | 'warning';
}

// Norwegian-specific validation patterns
export interface NorwegianValidationPatterns {
  personalNumber: RegExp;
  dNumber: RegExp;
  hNumber: RegExp;
  organizationNumber: RegExp;
  postalCode: RegExp;
  phoneNumber: RegExp;
  bankAccount: RegExp;
}

// Form field state for Norwegian compliance
export interface FormFieldState {
  value: string;
  isValid: boolean;
  errors: ValidationError[];
  warnings: string[];
  isTouched: boolean;
  isDirty: boolean;
  isValidating: boolean;
  norwegian?: {
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    lastValidated?: Date;
    complianceChecks?: string[];
  };
}
