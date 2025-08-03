/**
 * @fileoverview Slider Component v5.0.0 - Token-Based Design System
 * @description Modern Slider component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

// ✅ NO 'use client' directive - works in SSR
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// SLIDER VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Slider variants using semantic Tailwind classes
 * Pure CVA implementation with design token classes
 */
const sliderVariants = cva(
  // Base classes using semantic tokens
  'relative flex w-full touch-none select-none items-center',
  {
    variants: {
      size: {
        sm: 'h-4',
        default: 'h-6',
        lg: 'h-8',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * Slider track variants using semantic Tailwind classes
 */
const sliderTrackVariants = cva(
  // Base classes using semantic tokens
  'relative w-full grow overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        default: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * Slider range variants using semantic Tailwind classes
 */
const sliderRangeVariants = cva(
  // Base classes using semantic tokens
  'absolute h-full bg-primary',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning',
        destructive: 'bg-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Slider thumb variants using semantic Tailwind classes
 */
const sliderThumbVariants = cva(
  // Base classes using semantic tokens
  'block rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-primary',
        success: 'border-success',
        warning: 'border-warning',
        destructive: 'border-destructive',
      },
      size: {
        sm: 'h-4 w-4',
        default: 'h-5 w-5',
        lg: 'h-6 w-6',
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

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'value' | 'defaultValue'>,
    VariantProps<typeof sliderVariants> {
  readonly variant?: 'default' | 'success' | 'warning' | 'destructive';
  readonly value?: number[];
  readonly defaultValue?: number[];
  readonly onValueChange?: (value: number[]) => void;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

/**
 * Slider component using CVA pattern with design tokens
 * Pure presentational component with external state management
 * Uses native HTML input[type="range"] for accessibility and simplicity
 */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ 
    className, 
    variant = 'default', 
    size, 
    value, 
    defaultValue, 
    onValueChange, 
    min = 0, 
    max = 100, 
    step = 1,
    ...props 
  }, ref) => {
    // Use first value from array or default to min
    const currentValue = value?.[0] ?? defaultValue?.[0] ?? min;
    const percentage = ((currentValue - min) / (max - min)) * 100;

    return (
      <div ref={ref} className={cn(sliderVariants({ size }), className)}>
        {/* Track */}
        <div className={cn(sliderTrackVariants({ size }))}>
          {/* Range fill */}
          <div 
            className={cn(sliderRangeVariants({ variant: variant as 'default' | 'success' | 'warning' | 'destructive' }))}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Native input for accessibility */}
        <input
          type="range"
          className="absolute inset-0 w-full cursor-pointer opacity-0"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            onValueChange?.([newValue]);
          }}
          {...props}
        />
        
        {/* Thumb */}
        <div
          className={cn(sliderThumbVariants({ variant: variant as 'default' | 'success' | 'warning' | 'destructive', size }))}
          style={{
            position: 'absolute',
            left: `${percentage}%`,
            transform: 'translateX(-50%)',
            top: '50%',
            marginTop: '-0.625rem', // Adjust for thumb size
          }}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';

