/**
 * @fileoverview Form component type definitions
 * @module FormTypes
 */

import type React from 'react';

import type { ComponentProps } from '../lib/types/core.types';

// Base form component props
export interface FormComponentProps extends ComponentProps {
  label: string; // Required label text
  error?: string; // Error message text
  helpText?: string; // Help text
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  name?: string;
  id?: string;
}

// Form container props
export interface FormProps extends ComponentProps {
  onSubmit?: (_event: React.FormEvent<HTMLFormElement>) => void;
  noValidate?: boolean;
  autoComplete?: 'on' | 'off';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  margin?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'transparent' | 'white' | 'gray';
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
  onChange?: (
    _value: string,
    _event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    _event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onFocus?: (
    _event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  hasError?: boolean;
  validation?: {
    custom?: (_value: string) => string | null;
    debounceMs?: number;
  };
}

// TextArea component props
export interface TextAreaProps extends FormComponentProps {
  value?: string;
  defaultValue?: string;
  onChange?: (
    _value: string,
    _event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    _event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onFocus?: (
    _event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  rows?: number;
  cols?: number;
  maxLength?: number;
  minLength?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  variant?: 'default' | 'outlined' | 'filled';
  hasError?: boolean;
}

// Select component props
export interface SelectProps extends FormComponentProps {
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (_value: string | string[], _event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (
    _event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onFocus?: (
    _event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  multiple?: boolean;
  size?: number;
  options: SelectOption[];
  variant?: 'default' | 'outlined' | 'filled';
  hasError?: boolean;
  searchable?: boolean;
}

export interface SelectOption {
  value: string;
  label: string; // Label text for the option
  disabled?: boolean;
  group?: string;
}

// Checkbox component props
export interface CheckboxProps extends FormComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (_checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  indeterminate?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  hasError?: boolean;
}

// Radio component props
export interface RadioProps extends FormComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (_checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string; // Required for radio groups
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  hasError?: boolean;
}

// RadioGroup component props
export interface RadioGroupProps extends FormComponentProps {
  value?: string;
  defaultValue?: string;
  onChange?: (
    _value: string,
    _event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  options: RadioOption[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'outlined' | 'filled';
  hasError?: boolean;
}

export interface RadioOption {
  value: string;
  label: string; // Label text
  disabled?: boolean;
  helpText?: string; // Additional help text
}

// Personal Number Input (for Norwegian personal numbers)
export interface PersonalNumberInputProps extends FormComponentProps {
  value?: string;
  defaultValue?: string;
  onChange?: (_value: string, isValid: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  onValidationChange?: (_isValid: boolean, errors: string[]) => void;
  onBlur?: (
    _event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onFocus?: (
    _event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  variant?: 'default' | 'outlined' | 'filled';
  hasError?: boolean;
  validation?: {
    checksum?: boolean; // Enable checksum validation (default: true)
    allowDNumber?: boolean; // Allow D-numbers (temporary numbers)
    allowHNumber?: boolean; // Allow H-numbers (help numbers)
    strictFormat?: boolean; // Require 11 digits exactly
    realTimeValidation?: boolean; // Validate as user types
  };
  displayFormat?: 'ddmmyy-nnnnn' | 'ddmmyynnnnn'; // Display format
  maskInput?: boolean; // Show input mask
  autoFormat?: boolean; // Auto-format while typing
}

// Organization Number Input (for Norwegian organization numbers)
export interface OrganizationNumberInputProps extends FormComponentProps {
  value?: string;
  defaultValue?: string;
  onChange?: (_value: string, isValid: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  onValidationChange?: (_isValid: boolean, errors: string[], orgData?: OrganizationData) => void;
  onBlur?: (
    _event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onFocus?: (
    _event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  variant?: 'default' | 'outlined' | 'filled';
  hasError?: boolean;
  validation?: {
    checksum?: boolean; // Enable checksum validation (default: true)
    brreg?: boolean; // Check against BRREG database (default: false)
    realTimeValidation?: boolean; // Validate as user types
    allowInactive?: boolean; // Allow inactive organizations
  };
  displayFormat?: 'nnn nnn nnn' | 'nnnnnnnnn'; // Display format
  maskInput?: boolean; // Show input mask
  autoFormat?: boolean; // Auto-format while typing
  fetchOrganizationData?: boolean; // Fetch org data from BRREG
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
  message: string; // Error message text
  code: string; // Error code for programmatic handling
  severity: 'error' | 'warning';
}

// Form field state
export interface FormFieldState {
  value: string;
  isValid: boolean;
  errors: ValidationError[];
  warnings: string[];
  isTouched: boolean;
  isDirty: boolean;
  isValidating: boolean;
}
