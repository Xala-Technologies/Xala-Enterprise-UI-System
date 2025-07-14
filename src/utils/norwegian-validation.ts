// Norwegian validation utilities for @xala-mock/ui-system
// Personal Number (Fødselsnummer) and Organization Number validation

/**
 * Norwegian Personal Number (Fødselsnummer/D-nummer) validation
 * Format: DDMMYY-NNNNN (11 digits total)
 * First 6 digits: Birth date (DDMMYY)
 * Next 3 digits: Individual number
 * Last 2 digits: Control digits (checksum)
 */

export interface PersonalNumberValidation {
  isValid: boolean;
  errors: string[];
  type?: 'fødselsnummer' | 'd-nummer' | 'h-nummer';
  birthDate?: Date;
  gender?: 'male' | 'female';
  century?: number;
}

export interface OrganizationNumberValidation {
  isValid: boolean;
  errors: string[];
  type?: 'enterprise' | 'sub-organization';
  mainOrganization?: string;
}

// Norwegian personal number patterns
export const NORWEGIAN_PATTERNS = {
  personalNumber: /^[0-9]{11}$/,
  personalNumberFormatted: /^[0-9]{6}-[0-9]{5}$/,
  dNumber: /^[4-7][0-9]{10}$/,
  hNumber: /^[4-5][0-9]{10}$/,
  organizationNumber: /^[0-9]{9}$/,
  organizationNumberFormatted: /^[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/,
  postalCode: /^[0-9]{4}$/,
  phoneNumber: /^(\+47|0047|47)?[2-9][0-9]{7}$/,
  bankAccount: /^[0-9]{4}\.[0-9]{2}\.[0-9]{5}$/,
};

/**
 * Validate Norwegian Personal Number (Fødselsnummer)
 * Implements MOD11 checksum algorithm
 */
export function validatePersonalNumber(
  input: string,
  options: {
    allowDNumber?: boolean;
    allowHNumber?: boolean;
    strictFormat?: boolean;
  } = {}
): PersonalNumberValidation {
  const { allowDNumber = true, allowHNumber = true, strictFormat: _strictFormat = true } = options;

  // Clean input (remove spaces, hyphens)
  const cleaned = input.replace(/[\s-]/g, '');

  // Basic format validation
  if (!NORWEGIAN_PATTERNS.personalNumber.test(cleaned)) {
    return {
      isValid: false,
      errors: ['personal_number_invalid_format'],
    };
  }

  const _digits = cleaned.split('').map(Number);
  const [day, month, year] = [
    parseInt(cleaned.substring(0, 2)),
    parseInt(cleaned.substring(2, 4)),
    parseInt(cleaned.substring(4, 6)),
  ];

  const individualNumber = parseInt(cleaned.substring(6, 9));
  const _controlDigits = cleaned.substring(9, 11);

  const errors: string[] = [];
  let type: PersonalNumberValidation['type'] = 'fødselsnummer';

  // Check for D-number (day + 40)
  const isDNumber = day > 40;
  if (isDNumber) {
    if (!allowDNumber) {
      errors.push('d_number_not_allowed');
    }
    type = 'd-nummer';
  }

  // Check for H-number (month + 40)
  const isHNumber = month > 40;
  if (isHNumber) {
    if (!allowHNumber) {
      errors.push('h_number_not_allowed');
    }
    type = 'h-nummer';
  }

  // Date validation
  const actualDay = isDNumber ? day - 40 : day;
  const actualMonth = isHNumber ? month - 40 : month;

  if (actualDay < 1 || actualDay > 31) {
    errors.push('personal_number_invalid_day');
  }
  if (actualMonth < 1 || actualMonth > 12) {
    errors.push('personal_number_invalid_month');
  }

  // Century determination based on individual number
  let century: number;
  if (individualNumber >= 0 && individualNumber <= 499) {
    century = year >= 54 ? 1800 : 1900; // Born 1854-1899 or 1954-1999
  } else if (individualNumber >= 500 && individualNumber <= 749) {
    century = year >= 54 ? 1800 : 2000; // Born 1854-1899 or 2000-2039
  } else if (individualNumber >= 750 && individualNumber <= 899) {
    century = year >= 40 ? 1800 : 1900; // Born 1854-1899 or 1940-1999
  } else {
    century = 1900; // Default
  }

  const fullYear = century + year;
  const birthDate = new Date(fullYear, actualMonth - 1, actualDay);

  // Validate birth date
  if (
    birthDate.getDate() !== actualDay ||
    birthDate.getMonth() !== actualMonth - 1 ||
    birthDate.getFullYear() !== fullYear
  ) {
    errors.push('personal_number_invalid_date');
  }

  // Gender determination (odd = male, even = female)
  const gender: PersonalNumberValidation['gender'] = individualNumber % 2 === 1 ? 'male' : 'female';

  // MOD11 checksum validation
  const checksumValid = validateMod11Checksum(cleaned);
  if (!checksumValid) {
    errors.push('personal_number_invalid_checksum');
  }

  return {
    isValid: errors.length === 0,
    errors,
    type,
    birthDate: errors.length === 0 ? birthDate : undefined,
    gender,
    century,
  };
}

/**
 * Validate Norwegian Organization Number (Organisasjonsnummer)
 * Format: NNN NNN NNN (9 digits total)
 * Last digit is a checksum using MOD11 algorithm
 */
export function validateOrganizationNumber(input: string): OrganizationNumberValidation {
  // Clean input (remove spaces, hyphens)
  const cleaned = input.replace(/[\s-]/g, '');

  // Basic format validation
  if (!NORWEGIAN_PATTERNS.organizationNumber.test(cleaned)) {
    return {
      isValid: false,
      errors: ['organization_number_invalid_format'],
      type: undefined,
      mainOrganization: undefined,
    };
  }

  // Check for valid length
  if (cleaned.length !== 9) {
    return {
      isValid: false,
      errors: ['organization_number_invalid_length'],
      type: undefined,
      mainOrganization: undefined,
    };
  }

  const digits = cleaned.split('').map(Number);

  // Ensure we have valid digits
  if (digits.some(d => isNaN(d))) {
    return {
      isValid: false,
      errors: ['organization_number_invalid_format'],
      type: undefined,
      mainOrganization: undefined,
    };
  }

  // Check for invalid starting digit
  const firstDigit = digits[0];
  if (firstDigit === undefined || firstDigit < 8) {
    return {
      isValid: false,
      errors: ['organization_number_invalid_first_digit'],
      type: 'enterprise',
      mainOrganization: undefined,
    };
  }

  return {
    isValid: true,
    errors: [],
    type: firstDigit === 8 ? 'enterprise' : 'sub-organization',
    mainOrganization: firstDigit === 9 ? cleaned.substring(0, 6) : undefined,
  };
}

/**
 * MOD11 checksum validation for Norwegian personal numbers
 */
function validateMod11Checksum(personalNumber: string): boolean {
  const weights1 = [3, 7, 6, 1, 8, 9, 4, 5, 2];
  const weights2 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

  const digits = personalNumber.split('').map(Number);

  // First control digit
  let sum1 = 0;
  for (let i = 0; i < 9; i++) {
    sum1 += digits[i] * weights1[i];
  }
  const remainder1 = sum1 % 11;
  const control1 = remainder1 < 2 ? remainder1 : 11 - remainder1;

  if (control1 !== digits[9]) {
    return false;
  }

  // Second control digit
  let sum2 = 0;
  for (let i = 0; i < 10; i++) {
    sum2 += digits[i] * weights2[i];
  }
  const remainder2 = sum2 % 11;
  const control2 = remainder2 < 2 ? remainder2 : 11 - remainder2;

  return control2 === digits[10];
}

/**
 * MOD11 checksum validation for Norwegian organization numbers
 */
function validateOrganizationMod11(organizationNumber: string): boolean {
  const weights = [3, 2, 7, 6, 5, 4, 3, 2];

  const digits = organizationNumber.split('').map(Number);

  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += digits[i] * weights[i];
  }

  const remainder = sum % 11;
  const controlDigit = remainder < 2 ? remainder : 11 - remainder;

  return controlDigit === digits[8];
}

/**
 * Format personal number for display
 */
export function formatPersonalNumber(
  input: string,
  format: 'ddmmyy-nnnnn' | 'ddmmyynnnnn' = 'ddmmyy-nnnnn'
): string {
  const cleaned = input.replace(/[\s-]/g, '');

  if (cleaned.length !== 11) {
    return input; // Return as-is if not valid length
  }

  if (format === 'ddmmyy-nnnnn') {
    return `${cleaned.substring(0, 6)}-${cleaned.substring(6)}`;
  }

  return cleaned;
}

/**
 * Format organization number for display
 */
export function formatOrganizationNumber(
  input: string,
  format: 'nnn nnn nnn' | 'nnnnnnnnn' = 'nnn nnn nnn'
): string {
  const cleaned = input.replace(/\s/g, '');

  if (cleaned.length !== 9) {
    return input; // Return as-is if not valid length
  }

  if (format === 'nnn nnn nnn') {
    return `${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`;
  }

  return cleaned;
}

/**
 * Check if date is valid Norwegian birth date
 */
export function isValidNorwegianBirthDate(day: number, month: number, year: number): boolean {
  // Basic validation
  if (day < 1 || day > 31 || month < 1 || month > 12) {
    return false;
  }

  // Check actual date validity
  const date = new Date(year, month - 1, day);
  return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
}

/**
 * Get Norwegian error messages for localization
 */
export const NORWEGIAN_ERROR_MESSAGES = {
  personal_number_invalid_format: 'Ugyldig fødselsnummer format',
  personal_number_invalid_day: 'Ugyldig dag i fødselsnummer',
  personal_number_invalid_month: 'Ugyldig måned i fødselsnummer',
  personal_number_invalid_date: 'Ugyldig dato i fødselsnummer',
  personal_number_invalid_checksum: 'Ugyldig kontrollsiffer i fødselsnummer',
  d_number_not_allowed: 'D-nummer er ikke tillatt',
  h_number_not_allowed: 'H-nummer er ikke tillatt',
  organization_number_invalid_format: 'Ugyldig organisasjonsnummer format',
  organization_number_invalid_checksum: 'Ugyldig kontrollsiffer i organisasjonsnummer',
  sub_organization_not_allowed: 'Underorganisasjon er ikke tillatt',
} as const;

// MOD11 checksum validation for personal numbers
export function validateMOD11Checksum(digits: number[]): boolean {
  if (!digits || digits.length !== 11) {
    return false;
  }

  const weights1 = [3, 7, 6, 1, 8, 9, 4, 5, 2];
  const weights2 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

  let sum1 = 0;
  for (let i = 0; i < 9 && i < digits.length && i < weights1.length; i++) {
    const digit = digits[i];
    const weight = weights1[i];
    if (typeof digit === 'number' && typeof weight === 'number') {
      sum1 += digit * weight;
    }
  }

  const checkDigit1 = 11 - (sum1 % 11);
  const expectedDigit1 = checkDigit1 === 11 ? 0 : checkDigit1 === 10 ? -1 : checkDigit1;

  if (expectedDigit1 === -1 || digits[9] !== expectedDigit1) {
    return false;
  }

  let sum2 = 0;
  for (let i = 0; i < 10 && i < digits.length && i < weights2.length; i++) {
    const digit = digits[i];
    const weight = weights2[i];
    if (typeof digit === 'number' && typeof weight === 'number') {
      sum2 += digit * weight;
    }
  }

  const checkDigit2 = 11 - (sum2 % 11);
  const expectedDigit2 = checkDigit2 === 11 ? 0 : checkDigit2 === 10 ? -1 : checkDigit2;

  return expectedDigit2 !== -1 && digits[10] === expectedDigit2;
}

// MOD11 checksum validation for organization numbers
export function validateOrganizationMOD11(digits: number[]): boolean {
  if (!digits || digits.length !== 9) {
    return false;
  }

  const weights = [3, 2, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 8 && i < digits.length && i < weights.length; i++) {
    const digit = digits[i];
    const weight = weights[i];
    if (typeof digit === 'number' && typeof weight === 'number') {
      sum += digit * weight;
    }
  }

  const remainder = sum % 11;
  const checkDigit = remainder === 0 ? 0 : remainder === 1 ? -1 : 11 - remainder;

  return checkDigit !== -1 && digits[8] === checkDigit;
}
