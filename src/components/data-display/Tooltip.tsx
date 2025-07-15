// Tooltip component for @xala-mock/ui-system
// Norwegian-compliant tooltip component with accessibility and classification support

import React from 'react';

import type { TooltipProps } from '../../types/data-display.types';

const getTooltipStyles = (props: TooltipProps): React.CSSProperties => {
  const { placement = 'top', arrow = true } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    zIndex: 'var(--z-index-tooltip)',
    padding: 'var(--spacing-2) var(--spacing-3)',
    backgroundColor: 'var(--color-gray-900)',
    color: 'var(--color-white)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-sm)',
    whiteSpace: 'nowrap',
    boxShadow: 'var(--shadow-lg)',
  };

  // Placement-specific styles
  const placementStyles: React.CSSProperties = {};
  switch (placement) {
    case 'top':
      placementStyles.bottom = '100%';
      placementStyles.left = '50%';
      placementStyles.transform = 'translateX(-50%)';
      placementStyles.marginBottom = arrow ? 'var(--spacing-1)' : '0';
      break;
    case 'bottom':
      placementStyles.top = '100%';
      placementStyles.left = '50%';
      placementStyles.transform = 'translateX(-50%)';
      placementStyles.marginTop = arrow ? 'var(--spacing-1)' : '0';
      break;
    case 'left':
      placementStyles.right = '100%';
      placementStyles.top = '50%';
      placementStyles.transform = 'translateY(-50%)';
      placementStyles.marginRight = arrow ? 'var(--spacing-1)' : '0';
      break;
    case 'right':
      placementStyles.left = '100%';
      placementStyles.top = '50%';
      placementStyles.transform = 'translateY(-50%)';
      placementStyles.marginLeft = arrow ? 'var(--spacing-1)' : '0';
      break;
    default:
      placementStyles.bottom = '100%';
      placementStyles.left = '50%';
      placementStyles.transform = 'translateX(-50%)';
      placementStyles.marginBottom = arrow ? 'var(--spacing-1)' : '0';
  }

  return { ...baseStyles, ...placementStyles };
};

// Minimal tooltip content component
const TooltipContent = ({ content }: { content?: string }): React.ReactElement => (
  <span>{content || ''}</span>
);

// Minimal arrow component
const TooltipArrow = ({ placement: _placement }: { placement: string }): React.ReactElement => (
  <span aria-label={`Tooltip arrow for ${_placement}`}>▲</span>
);

// Tooltip component with forwardRef
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (props, ref): React.ReactElement => {
    const {
      children,
      content,
      placement = 'top',
      trigger = 'hover',
      // delay: _delay = 0,
      // disabled: _disabled = false,
      arrow = true,
      className,
      testId = 'tooltip',
      isVisible = false,
      onVisibilityChange,
      ...divProps
    } = props;

    const triggerRef = React.useRef<HTMLDivElement>(null);
    const tooltipRef = React.useRef<HTMLDivElement>(null);

    const handleMouseEnter = (): void => onVisibilityChange?.(true);
    const handleMouseLeave = (): void => onVisibilityChange?.(false);
    const handleClick = (): void => onVisibilityChange?.(!isVisible);
    const handleFocus = (): void => onVisibilityChange?.(true);
    const handleBlur = (): void => onVisibilityChange?.(false);
    const handleKeyDown = (e: React.KeyboardEvent): void => {
      if (e.key === 'Escape') onVisibilityChange?.(false);
    };

    const getCombinedStyles = (): React.CSSProperties => getTooltipStyles(props);

    return (
      <>
        {/* Trigger element */}
        <div
          ref={triggerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{ display: 'inline-block', position: 'relative' }}
          aria-describedby={isVisible ? `tooltip-${testId}` : undefined}
        >
          {children}
        </div>

        {/* Tooltip */}
        {isVisible && (
          <div
            ref={ref || tooltipRef}
            id={`tooltip-${testId}`}
            role="tooltip"
            className={className}
            style={getCombinedStyles()}
            data-testid={testId}
            data-placement={placement}
            data-trigger={trigger}
            {...divProps}
          >
            {/* Tooltip content */}
            <TooltipContent content={content} />

            {/* Arrow */}
            {arrow && <TooltipArrow placement={placement} />}
          </div>
        )}
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';
