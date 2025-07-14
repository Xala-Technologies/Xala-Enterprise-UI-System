import React from 'react';
import { getPriorityIcon } from './ToastHelpers';

/**
 * Renders a Norwegian priority indicator for a Toast notification.
 * @param props - PriorityIndicatorProps
 * @returns Priority indicator element
 */
export interface PriorityIndicatorProps {
  readonly priority?: string;
}

/**
 * PriorityIndicator renders the Norwegian priority icon for the toast.
 */
export default function PriorityIndicator({
  priority,
}: PriorityIndicatorProps): React.ReactElement {
  return (
    <span
      style={{ fontSize: 'var(--font-size-xs)', marginLeft: 'var(--spacing-1)', opacity: '0.9' }}
      aria-label={`Priority: ${priority}`}
      title={`Prioritet: ${priority}`}
    >
      {getPriorityIcon(priority || 'medium')}
    </span>
  );
}
