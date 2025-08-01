/**
 * @fileoverview Validation utilities for UI System
 * @module Validation
 * @compliance NSM, GDPR, WCAG AAA
 */

/**
 * Simple ValidationResult implementation
 */


export interface ValidationResult<T> { readonly success: boolean;
  readonly data?: T;
  readonly error?: string; }

/**
 * Create a successful validation result
 */
export function createSuccessResult<T>(data: T): ValidationResult<T> { return { success: true,
    data, }; }

/**
 * Create a failed validation result
 */
export function createFailureResult<T>(error: string): ValidationResult<T> { return { success: false,
    error, }; }

/**
 * Validation result factory
 */
export const createValidationResult = { success: createSuccessResult,
  failure: createFailureResult, };

/**
 * Safe object property access
 */
export function safeGet<T>(obj: Record<string, unknown>, path: string, defaultValue: T): T {
  const keys = path.split('.');
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return defaultValue;
    }
  }
  
  return current as T;
}

/**
 * Safe array access
 */
export function safeArrayAccess<T>(array: T[], index: number): T | undefined { if (Array.isArray(array) && index >= 0 && index < array.length) { return array[index]; }
  return undefined; }

/**
 * Simple email validation
 */
export function isValidEmail(email: string): boolean { const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && emailRegex.test(email); }

/**
 * Simple URL validation
 */
export function isValidUrl(url: string): boolean { try { new URL(url);
    return true; } catch { return false; } }
