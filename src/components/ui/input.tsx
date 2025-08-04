/**
 * @fileoverview Input Component v6.0.0 - Enterprise Semantic Architecture
 * @description Production-ready input using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { Input as SemanticInput, type InputProps as SemanticInputProps } from '../semantic/Input';

export type InputProps = SemanticInputProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <SemanticInput ref={ref} {...props} />
);

Input.displayName = 'Input';