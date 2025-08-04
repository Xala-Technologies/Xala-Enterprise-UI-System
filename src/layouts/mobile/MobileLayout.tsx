/**
 * @fileoverview MobileLayout Component v6.0.0
 * @description Clean mobile layout using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { BaseLayout, type BaseLayoutProps } from '../BaseLayout';

export interface MobileLayoutProps extends BaseLayoutProps {
  readonly bottomNav?: React.ReactNode;
}

export const MobileLayout = forwardRef<HTMLDivElement, MobileLayoutProps>(
  ({ bottomNav, ...props }, ref) => (
    <BaseLayout 
      ref={ref} 
      footer={bottomNav}
      {...props} 
    />
  )
);

MobileLayout.displayName = 'MobileLayout';