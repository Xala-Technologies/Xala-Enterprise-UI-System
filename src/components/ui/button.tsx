/**
 * @fileoverview Button Component v6.0.0 - Enterprise Semantic Architecture
 * @description Production-ready button using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { Button as SemanticButton, type ButtonProps as SemanticButtonProps } from '../semantic/Button';

export type ButtonProps = SemanticButtonProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <SemanticButton ref={ref} {...props} />
);

Button.displayName = 'Button';