/**
 * @fileoverview Radio Component v5.0.0 - Token-Based Design System
 * @description Modern Radio component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

// ✅ NO 'use client' directive - works in SSR
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// RADIO VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Radio button icon component
 */
const RadioIcon = ({ size }: { size?: 'sm' | 'default' | 'lg' }): React.ReactElement => {
  const sizeClass = size === 'sm' ? 'h-1 w-1' : size === 'lg' ? 'h-2.5 w-2.5' : 'h-2 w-2';
  
  return (
    <div className={cn('rounded-full bg-current', sizeClass)} />
  );
};

/**
 * Radio variants using semantic Tailwind classes
 * Pure CVA implementation with design token classes
 */
const radioVariants = cva(
  // Base classes using semantic tokens
  'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-primary text-primary',
        destructive: 'border-destructive text-destructive',
        success: 'border-success text-success',
        warning: 'border-warning text-warning',
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

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof radioVariants> {}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

/**
 * Radio component using CVA pattern with design tokens
 * Pure presentational component with external state management
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, variant, size, checked, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <input
          type="radio"
          className={cn(radioVariants({ variant, size }), className)}
          ref={ref}
          checked={checked}
          {...props}
        />
        
        {/* Visual indicator */}
        {checked && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <RadioIcon size={size || 'default'} />
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
