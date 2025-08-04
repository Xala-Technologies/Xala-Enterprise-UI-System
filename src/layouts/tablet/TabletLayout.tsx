/**
 * @fileoverview TabletLayout Component v6.0.0
 * @description Clean tablet layout using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { BaseLayout, type BaseLayoutProps } from '../BaseLayout';

export interface TabletLayoutProps extends BaseLayoutProps {
  readonly splitView?: boolean;
}

export const TabletLayout = forwardRef<HTMLDivElement, TabletLayoutProps>(
  ({ splitView, ...props }, ref) => (
    <BaseLayout 
      ref={ref}
      {...props} 
    />
  )
);

TabletLayout.displayName = 'TabletLayout';