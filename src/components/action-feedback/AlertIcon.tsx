/**
 * Alert Icon Component
 * Icon rendering for Alert component
 */

import React from 'react';

import { getVariantIcon } from '../../utils/norwegian-compliance';

/**
 * Alert icon component props
 */
export interface AlertIconProps {
  variant: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Alert icon component
 * @param props - AlertIcon component props
 * @returns Alert icon element
 */
export const AlertIcon: React.FC<AlertIconProps> = ({ variant, className, style }) => {
  const iconStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-lg)',
    flexShrink: 0,
    marginTop: 'var(--spacing-1)',
    ...style,
  };

  return (
    <span className={className} style={iconStyle} aria-hidden="true" data-testid="alert-icon">
      {getVariantIcon(variant)}
    </span>
  );
};
