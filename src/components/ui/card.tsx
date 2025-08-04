/**
 * @fileoverview Card Component v6.0.0 - Enterprise Semantic Architecture
 * @description Production-ready card using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { Box, type BoxProps } from '../semantic/Box';

export interface CardProps extends BoxProps {
  readonly elevated?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ elevated = false, variant = 'surface', radius = 'lg', spacing = 'lg', ...props }, ref) => (
    <Box
      ref={ref}
      variant={elevated ? 'elevated' : variant}
      radius={radius}
      spacing={spacing}
      {...props}
    />
  )
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, BoxProps>(
  ({ spacing = 'md', ...props }, ref) => (
    <Box ref={ref} spacing={spacing} {...props} />
  )
);

CardHeader.displayName = 'CardHeader';

export const CardContent = forwardRef<HTMLDivElement, BoxProps>(
  ({ spacing = 'md', ...props }, ref) => (
    <Box ref={ref} spacing={spacing} {...props} />
  )
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, BoxProps>(
  ({ spacing = 'md', ...props }, ref) => (
    <Box ref={ref} spacing={spacing} {...props} />
  )
);

CardFooter.displayName = 'CardFooter';

export type { BoxProps as CardContentProps, BoxProps as CardFooterProps, BoxProps as CardHeaderProps };