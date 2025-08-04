/**
 * @fileoverview Checkbox Component v6.0.0
 * @description Clean checkbox using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { Box } from '../semantic/Box';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'default' | 'primary';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  readonly label?: string;
  readonly size?: CheckboxSize;
  readonly variant?: CheckboxVariant;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => (
    <label className="inline-flex items-center gap-2">
      <input
        ref={ref}
        type="checkbox"
        className={className}
        {...props}
      />
      {label && <span>{label}</span>}
    </label>
  )
);

Checkbox.displayName = 'Checkbox';

export interface CheckboxOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

export interface CheckboxGroupProps {
  readonly options: CheckboxOption[];
  readonly value?: string[];
  readonly onChange?: (value: string[]) => void;
  readonly name?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ 
  options, 
  value = [], 
  onChange,
  name 
}) => (
  <Box display="flex" direction="col" gap="sm">
    {options.map(option => (
      <Checkbox
        key={option.value}
        name={name}
        value={option.value}
        label={option.label}
        disabled={option.disabled}
        checked={value.includes(option.value)}
        onChange={(e) => {
          if (onChange) {
            if (e.target.checked) {
              onChange([...value, option.value]);
            } else {
              onChange(value.filter(v => v !== option.value));
            }
          }
        }}
      />
    ))}
  </Box>
);

CheckboxGroup.displayName = 'CheckboxGroup';