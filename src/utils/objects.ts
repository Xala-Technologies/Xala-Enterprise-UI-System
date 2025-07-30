/**
 * Deep object merging utilities for token system
 * Provides type-safe deep merging for design tokens and configurations
 */

/**
 * Deep merge utility for objects and arrays
 * Handles nested objects, arrays, and primitive values
 * @param target - The target object to merge into
 * @param sources - The source objects to merge from
 * @returns The merged object
 */
export function mergeDeep<T extends Record<string, unknown>>(
  target: T,
  ...sources: Array<Partial<T> | undefined | null>
): T {
  if (!sources.length) return target;

  const source = sources.shift();
  if (!source) return mergeDeep(target, ...sources);

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(
          target[key] as Record<string, unknown>,
          source[key] as Record<string, unknown>
        );
      } else if (Array.isArray(source[key]) && Array.isArray(target[key])) {
        // Merge arrays by concatenation and deduplication
        const merged = [...(target[key] as unknown[]), ...(source[key] as unknown[])];
        (target[key] as unknown[]) = [...new Set(merged)];
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

/**
 * Helper function to check if a value is a plain object
 * @param item - The value to check
 * @returns True if the value is a plain object
 */
function isObject(item: unknown): item is Record<string, unknown> {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep clone utility for creating immutable copies
 * @param obj - The object to clone
 * @returns A deep clone of the object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }

  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }

  return obj;
}

/**
 * Utility to flatten nested objects into dot notation
 * @param obj - The object to flatten
 * @param prefix - The prefix for the key
 * @returns Flattened object with dot notation keys
 */
export function flattenObject(
  obj: Record<string, unknown>,
  prefix = ''
): Record<string, unknown> {
  const flattened: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (isObject(value)) {
        Object.assign(flattened, flattenObject(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    }
  }

  return flattened;
}

/**
 * Utility to unflatten dot notation keys into nested objects
 * @param obj - The flattened object
 * @returns The unflattened nested object
 */
export function unflattenObject(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const keys = key.split('.');
      let current = result;

      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!(k in current) || !isObject(current[k])) {
          current[k] = {};
        }
        current = current[k] as Record<string, unknown>;
      }

      current[keys[keys.length - 1]] = obj[key];
    }
  }

  return result;
}

/**
 * Utility to validate token structure
 * @param tokens - The tokens to validate
 * @returns Validation result with errors
 */
export function validateTokens(tokens: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!isObject(tokens)) {
    errors.push('Tokens must be an object');
    return { valid: false, errors };
  }

  // Add specific token validation logic here
  // This is a placeholder for comprehensive token validation

  return { valid: errors.length === 0, errors };
}
