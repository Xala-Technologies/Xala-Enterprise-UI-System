/**
 * Utility for combining class names
 * Used for shadcn-ui components with cva variants
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with proper precedence
 * @param inputs - Class values to combine
 * @returns Combined class name string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
} 