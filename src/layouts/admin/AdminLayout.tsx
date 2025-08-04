/**
 * @fileoverview AdminLayout Component v6.0.0
 * @description Clean admin layout using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { BaseLayout, type BaseLayoutProps } from '../BaseLayout';

export interface AdminLayoutProps extends BaseLayoutProps {
  readonly navigation?: React.ReactNode;
}

export const AdminLayout = forwardRef<HTMLDivElement, AdminLayoutProps>(
  ({ navigation, sidebar = navigation, ...props }, ref) => (
    <BaseLayout 
      ref={ref}
      sidebar={sidebar}
      {...props} 
    />
  )
);

AdminLayout.displayName = 'AdminLayout';