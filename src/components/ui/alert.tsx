/**
 * @fileoverview Alert Component v6.0.0
 * @description Clean alert using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { Box, type BoxProps } from '../semantic/Box';
import { Text } from '../semantic/Text';
import { Heading } from '../semantic/Heading';

export type AlertVariant = 'default' | 'destructive' | 'success' | 'warning';

export interface AlertProps extends Omit<BoxProps, 'variant'> {
  readonly variant?: AlertVariant;
}

const getAlertStyles = (variant: AlertVariant): BoxProps => {
  switch (variant) {
    case 'destructive':
      return { variant: 'filled', className: 'border-red-500 bg-red-50 text-red-900' };
    case 'success':
      return { variant: 'filled', className: 'border-green-500 bg-green-50 text-green-900' };
    case 'warning':
      return { variant: 'filled', className: 'border-yellow-500 bg-yellow-50 text-yellow-900' };
    default:
      return { variant: 'filled' };
  }
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', className, ...props }, ref) => (
    <Box
      ref={ref}
      {...getAlertStyles(variant)}
      className={className}
      aria-role="alert"
      {...props}
    />
  )
);

Alert.displayName = 'Alert';

export const AlertTitle = Heading;
export const AlertDescription = Text;