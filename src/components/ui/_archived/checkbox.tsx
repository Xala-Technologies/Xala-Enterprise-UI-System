/**
 * @fileoverview Checkbox Component v5.0.0 - Token-Based Design System
 * @description Modern Checkbox component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

// ✅ NO 'use client' directive - works in SSR
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { Box } from '../semantic';

// =============================================================================
// CHECKBOX VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Check icon component
 */
const CheckIcon = (): React.ReactElement => (
  <svg className="h-full w-full" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Indeterminate icon component
 */
const IndeterminateIcon = (): React.ReactElement => (
  <svg className="h-full w-full" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Checkbox variants using semantic Tailwind classes
 * Pure CVA implementation with design token classes
 */
const checkboxVariants = cva(
  // Base classes using semantic tokens
  'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
  {
    variants: {
      variant: {
        default:
          'border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary',
        destructive:
          'border-destructive data-[state=checked]:bg-destructive data-[state=indeterminate]:bg-destructive',
        success:
          'border-success data-[state=checked]:bg-success data-[state=indeterminate]:bg-success',
        warning:
          'border-warning data-[state=checked]:bg-warning data-[state=indeterminate]:bg-warning',
      },
      size: {
        sm: 'h-3 w-3',
        default: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// =============================================================================
// COMPONENT TYPES
// =============================================================================

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof checkboxVariants> {
  readonly indeterminate?: boolean;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

/**
 * Checkbox component using CVA pattern with design tokens
 * Pure presentational component with external state management
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, variant, size, checked, indeterminate, ...props }, ref) => {
    // Determine state for data attribute
    const state = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked';

    return (
      <Box className="relative flex items-center">
        <input
          type="checkbox"
          className={cn(checkboxVariants({ variant, size }), className)}
          ref={ref}
          checked={checked}
          data-state={state}
          {...props}
        />

        {/* Visual indicator overlay */}
        <Box className="pointer-events-none absolute inset-0 flex items-center justify-center text-current">
          {indeterminate ? <IndeterminateIcon /> : checked ? <CheckIcon /> : null}
        </Box>
      </Box>
    );
  }
);

Checkbox.displayName = 'Checkbox';
