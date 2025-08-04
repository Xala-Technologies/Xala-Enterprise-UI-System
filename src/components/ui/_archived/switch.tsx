/**
 * @fileoverview Switch Component v5.0.0 - Token-Based Design System
 * @description Modern Switch component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

// ✅ NO 'use client' directive - works in SSR
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// SWITCH VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Switch variants using semantic Tailwind classes
 * Pure CVA implementation with design token classes
 */
const switchVariants = cva(
  // Base classes using semantic tokens
  'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
  {
    variants: {
      variant: {
        default: 'data-[state=checked]:bg-primary',
        destructive: 'data-[state=checked]:bg-destructive',
        success: 'data-[state=checked]:bg-success',
        warning: 'data-[state=checked]:bg-warning',
      },
      size: {
        sm: 'h-4 w-7',
        default: 'h-6 w-11',
        lg: 'h-8 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * Switch thumb variants using semantic Tailwind classes
 */
const switchThumbVariants = cva(
  // Base classes using semantic tokens
  'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
  {
    variants: {
      size: {
        sm: 'h-3 w-3 data-[state=checked]:translate-x-3',
        default: 'h-5 w-5 data-[state=checked]:translate-x-5',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

// =============================================================================
// COMPONENT TYPES
// =============================================================================

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof switchVariants> {
  readonly onCheckedChange?: (checked: boolean) => void;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

/**
 * Switch component using CVA pattern with design tokens
 * Pure presentational component with external state management
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, variant, size, checked, onCheckedChange, ...props }, ref) => {
    // Determine state for data attribute
    const state = checked ? 'checked' : 'unchecked';

    return (
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="sr-only"
          ref={ref}
          checked={checked}
          data-state={state}
          role="switch"
          aria-checked={checked}
          onChange={e => {
            onCheckedChange?.(e.target.checked);
            props.onChange?.(e);
          }}
          {...props}
        />
        
        {/* Switch track */}
        <div
          className={cn(switchVariants({ variant, size }), className)}
          data-state={state}
        >
          {/* Switch thumb */}
          <div
            className={cn(switchThumbVariants({ size }))}
            data-state={state}
          />
        </div>
      </label>
    );
  }
);

Switch.displayName = 'Switch';

