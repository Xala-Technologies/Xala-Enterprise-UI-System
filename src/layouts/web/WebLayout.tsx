/**
 * @fileoverview WebLayout Component v6.0.0
 * @description Clean web layout using semantic components
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { BaseLayout, type BaseLayoutProps } from '../BaseLayout';

export type WebLayoutProps = BaseLayoutProps;

export const WebLayout = forwardRef<HTMLDivElement, WebLayoutProps>(
  (props, ref) => <BaseLayout ref={ref} {...props} />
);

WebLayout.displayName = 'WebLayout';