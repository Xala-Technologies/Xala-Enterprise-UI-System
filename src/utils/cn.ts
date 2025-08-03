/**
 * @fileoverview Class Name Utility - CVA Compatible Implementation
 * @description Utility for merging Tailwind CSS classes with clsx
 * @version 5.0.0
 * @compliance CVA Pattern, No hooks, CSS-only styling
 */

import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge class names with proper precedence
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export default cn;