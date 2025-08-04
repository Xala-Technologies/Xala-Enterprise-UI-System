/**
 * @fileoverview Checkbox Component v6.0.0
 * @description Clean checkbox using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils/cn';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'default' | 'primary';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  readonly label?: string;
  readonly size?: CheckboxSize;
  readonly variant?: CheckboxVariant;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, size, variant, ...props }, ref) => (
    <label className="inline-flex items-center gap-2">
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          'rounded border-input focus:ring-2 focus:ring-primary',
          size === 'sm' && 'h-3 w-3',
          size === 'md' && 'h-4 w-4',
          size === 'lg' && 'h-5 w-5',
          variant === 'primary' && 'accent-primary',
          className
        )}
        {...props}
      />
      {label && <span className="text-sm">{label}</span>}
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
  <div className="flex flex-col gap-2">
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
  </div>
);

CheckboxGroup.displayName = 'CheckboxGroup';