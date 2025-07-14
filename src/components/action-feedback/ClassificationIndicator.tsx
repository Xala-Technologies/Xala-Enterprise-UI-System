import React from 'react';
import { getClassificationIcon } from './ToastHelpers';

/**
 * Renders a Norwegian classification indicator for a Toast notification.
 * @param props - ClassificationIndicatorProps
 * @returns Classification indicator element
 */
export interface ClassificationIndicatorProps {
  readonly level: string;
}

/**
 * ClassificationIndicator renders the Norwegian classification icon for the toast.
 */
export default function ClassificationIndicator({
  level,
}: ClassificationIndicatorProps): React.ReactElement {
  return (
    <span
      style={{ fontSize: 'var(--font-size-xs)', marginLeft: 'var(--spacing-2)', opacity: '0.9' }}
      aria-label={`Classification: ${level}`}
      title={`Klassifisering: ${level}`}
    >
      {getClassificationIcon(level)}
    </span>
  );
}
