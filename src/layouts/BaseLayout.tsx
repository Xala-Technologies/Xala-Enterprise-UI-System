/**
 * @fileoverview BaseLayout Component v6.0.0
 * @description Clean base layout using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { Box, type BoxProps } from '../components/semantic/Box';

export interface BaseLayoutProps extends BoxProps {
  readonly header?: React.ReactNode;
  readonly sidebar?: React.ReactNode;
  readonly footer?: React.ReactNode;
  readonly children: React.ReactNode;
}

export const BaseLayout = forwardRef<HTMLDivElement, BaseLayoutProps>(
  ({ header, sidebar, footer, children, ...props }, ref) => (
    <Box ref={ref} display="flex" direction="col" height="screen" {...props}>
      {header && <Box as="header">{header}</Box>}
      <Box display="flex" width="full" height="full">
        {sidebar && <Box as="aside" width="fit">{sidebar}</Box>}
        <Box as="main" width="full" overflow="auto">
          {children}
        </Box>
      </Box>
      {footer && <Box as="footer">{footer}</Box>}
    </Box>
  )
);

BaseLayout.displayName = 'BaseLayout';