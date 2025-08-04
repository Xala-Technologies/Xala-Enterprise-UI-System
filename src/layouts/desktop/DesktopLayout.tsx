/**
 * @fileoverview DesktopLayout Component v6.0.0
 * @description Clean desktop layout using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { BaseLayout, type BaseLayoutProps } from '../BaseLayout';

export interface DesktopLayoutProps extends BaseLayoutProps {
  readonly sidebarCollapsed?: boolean;
}

export const DesktopLayout = forwardRef<HTMLDivElement, DesktopLayoutProps>(
  ({ sidebarCollapsed, ...props }, ref) => (
    <BaseLayout 
      ref={ref}
      {...props} 
    />
  )
);

DesktopLayout.displayName = 'DesktopLayout';