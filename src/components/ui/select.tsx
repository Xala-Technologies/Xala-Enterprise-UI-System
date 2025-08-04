/**
 * @fileoverview Select Component v6.0.0
 * @description Clean select using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { Box } from '../semantic/Box';

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
  ({ options = [], className, ...props }, ref) => (
    <select ref={ref} className={className} {...props}>
      {options.map(option => (
        <option 
          key={option.value} 
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </Box>
  )
);

Select.displayName = 'Select';