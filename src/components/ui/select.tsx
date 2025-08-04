/**
 * @fileoverview Select Component v6.0.0
 * @description Clean select using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils/cn';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'filled' | 'outline';

export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  readonly options?: SelectOption[];
  readonly size?: SelectSize;
  readonly variant?: SelectVariant;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options = [], className, size, variant, ...props }, ref) => (
    <select 
      ref={ref} 
      className={cn(
        'border border-input rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary',
        size === 'sm' && 'text-sm py-1',
        size === 'lg' && 'text-lg py-3',
        variant === 'filled' && 'bg-muted',
        variant === 'outline' && 'bg-transparent',
        className
      )} 
      {...props}
    >
      {options.map(option => (
        <option 
          key={option.value} 
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
);

Select.displayName = 'Select';