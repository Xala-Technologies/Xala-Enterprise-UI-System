/**
 * @fileoverview Textarea Component v6.0.0
 * @description Clean textarea using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { Box } from '../semantic/Box';

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaVariant = 'default' | 'filled' | 'outline';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly size?: TextareaSize;
  readonly variant?: TextareaVariant;
  readonly resize?: TextareaResize;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, resize = 'vertical', style, ...props }, ref) => (
    <textarea
      ref={ref} 
      className={className}
      style={{ resize, ...style }}
      {...props} 
    />
  )
);

Textarea.displayName = 'Textarea';