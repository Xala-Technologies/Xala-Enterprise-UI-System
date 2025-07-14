// Tooltip component for @xala-mock/ui-system
// Norwegian-compliant tooltip component with accessibility and classification support

import React, { useState, useRef, useEffect } from 'react';

import type { TooltipProps } from '../../types/data-display.types';

// Helper function to generate CSS using design tokens
const getTooltipStyles = (props: TooltipProps): React.CSSProperties => {
  const { placement = 'top', maxWidth, arrow = true, norwegian } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    zIndex: 'var(--z-index-tooltip)',
    padding: 'var(--spacing-2) var(--spacing-3)',
    backgroundColor: 'var(--color-gray-900)',
    color: 'var(--color-white)',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-normal)',
    borderRadius: 'var(--border-radius-base)',
    boxShadow: 'var(--shadow-lg)',
    whiteSpace: 'nowrap',
    maxWidth: maxWidth || 'var(--tooltip-max-width)',
    wordWrap: 'break-word',
    fontFamily: 'var(--font-family-sans)',
  };

  // Placement-based styles
  const placementStyles = getPlacementStyles(placement);

  // High contrast styling for Norwegian accessibility
  const accessibilityStyles = getAccessibilityStyles(
    norwegian?.accessibility,
    norwegian?.highContrast
  );

  // Classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);

  return {
    ...baseStyles,
    ...placementStyles,
    ...accessibilityStyles,
    ...classificationStyles,
  };
};

// Get placement-based styles
const getPlacementStyles = (placement: string): React.CSSProperties => {
  // Basic placement - actual positioning would be handled by JavaScript
  const placements = {
    top: {
      marginBottom: 'var(--spacing-2)',
    },
    bottom: {
      marginTop: 'var(--spacing-2)',
    },
    left: {
      marginRight: 'var(--spacing-2)',
    },
    right: {
      marginLeft: 'var(--spacing-2)',
    },
    auto: {},
  };
  return placements[placement as keyof typeof placements] || placements.top;
};

// Get accessibility styles
const getAccessibilityStyles = (
  accessibility?: string,
  highContrast?: boolean
): React.CSSProperties => {
  const styles: React.CSSProperties = {};

  if (accessibility === 'WCAG_2_2_AAA' || highContrast) {
    styles.backgroundColor = 'var(--color-black)';
    styles.color = 'var(--color-white)';
    styles.border = 'var(--border-width) solid var(--color-white)';
    styles.fontSize = 'var(--font-size-base)'; // Larger font for better readability
    styles.fontWeight = 'var(--font-weight-medium)';
  }

  return styles;
};

// Get Norwegian classification styles
const getClassificationStyles = (classification?: string): React.CSSProperties => {
  if (!classification) {
    return {};
  }

  const classificationStyles: Record<string, React.CSSProperties> = {
    ÅPEN: {
      borderLeft: 'var(--border-accent-width) solid var(--color-green-400)',
    },
    BEGRENSET: {
      borderLeft: 'var(--border-accent-width) solid var(--color-orange-400)',
      backgroundColor: 'var(--color-orange-900)',
    },
    KONFIDENSIELT: {
      borderLeft: 'var(--border-accent-width) solid var(--color-red-400)',
      backgroundColor: 'var(--color-red-900)',
    },
    HEMMELIG: {
      borderLeft: 'var(--border-accent-width) solid var(--color-red-300)',
      backgroundColor: 'var(--color-red-950)',
      border: 'var(--border-width) solid var(--color-red-400)',
    },
  };

  return classificationStyles[classification] || {};
};

// Arrow component
const TooltipArrow = ({
  placement,
  classification,
}: {
  placement: string;
  classification?: string;
}): void => {
  const getArrowStyles = (): React.CSSProperties => {
    const baseArrowStyles: React.CSSProperties = {
      position: 'absolute',
      width: 0,
      height: 0,
      border: 'var(--tooltip-arrow-size) solid transparent',
    };

    const arrowColor = classification
      ? getClassificationColor(classification)
      : 'var(--color-gray-900)';

    switch (placement) {
      case 'top':
        return {
          ...baseArrowStyles,
          top: '100%',
          left: '50%',
          marginLeft: 'calc(-1 * var(--tooltip-arrow-size))',
          borderTopColor: arrowColor,
          borderBottomWidth: 0,
        };
      case 'bottom':
        return {
          ...baseArrowStyles,
          bottom: '100%',
          left: '50%',
          marginLeft: 'calc(-1 * var(--tooltip-arrow-size))',
          borderBottomColor: arrowColor,
          borderTopWidth: 0,
        };
      case 'left':
        return {
          ...baseArrowStyles,
          left: '100%',
          top: '50%',
          marginTop: 'calc(-1 * var(--tooltip-arrow-size))',
          borderLeftColor: arrowColor,
          borderRightWidth: 0,
        };
      case 'right':
        return {
          ...baseArrowStyles,
          right: '100%',
          top: '50%',
          marginTop: 'calc(-1 * var(--tooltip-arrow-size))',
          borderRightColor: arrowColor,
          borderLeftWidth: 0,
        };
      default:
        return baseArrowStyles;
    }
  };

  const getClassificationColor = (classification: string): string => {
    const colors = {
      ÅPEN: 'var(--color-gray-900)',
      BEGRENSET: 'var(--color-orange-900)',
      KONFIDENSIELT: 'var(--color-red-900)',
      HEMMELIG: 'var(--color-red-950)',
    };
    return colors[classification as keyof typeof colors] || 'var(--color-gray-900)';
  };

  return <div style={getArrowStyles()} />;
};

// Classification indicator
const ClassificationIndicator = ({ level }: { level: string }): void => {
  const getClassificationIcon = (classification: string): string => {
    const icons = {
      ÅPEN: '🟢',
      BEGRENSET: '🟡',
      KONFIDENSIELT: '🔴',
      HEMMELIG: '⚫',
    };
    return icons[classification as keyof typeof icons] || '❓';
  };

  return (
    <span
      style={{
        fontSize: 'var(--font-size-xs)',
        marginRight: 'var(--spacing-1)',
        opacity: '0.9',
      }}
      aria-label={`Classification: ${level}`}
    >
      {getClassificationIcon(level)}
    </span>
  );
};

// Help category indicator
const HelpCategoryIndicator = ({ category }: { category?: string }): void => {
  if (!category) {
    return null;
  }

  const getCategoryIcon = (category: string): string => {
    const icons = {
      field: '📝',
      action: '⚡',
      status: '📊',
      navigation: '🧭',
    };
    return icons[category as keyof typeof icons] || 'ℹ️';
  };

  return (
    <span
      style={{
        fontSize: 'var(--font-size-xs)',
        marginRight: 'var(--spacing-1)',
        opacity: '0.8',
      }}
      aria-label={`Help category: ${category}`}
    >
      {getCategoryIcon(category)}
    </span>
  );
};

// Tooltip content component
const TooltipContent = ({
  contentKey,
  content,
  norwegian,
}: {
  contentKey?: string;
  content?: any;
  norwegian?: TooltipProps['norwegian'];
}): void => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-1)' }}>
      {/* Classification indicator */}
      {norwegian?.classification && <ClassificationIndicator level={norwegian.classification} />}

      {/* Help category indicator */}
      <HelpCategoryIndicator category={norwegian?.helpCategory} />

      {/* Tooltip text */}
      <span>
        {content || (contentKey ? /* TODO: Replace with actual localization */ contentKey : '')}
      </span>
    </div>
  );
};

// Tooltip component with forwardRef
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>((props, ref): void => {
  const {
    contentKey,
    content,
    children,
    placement = 'top',
    trigger = 'hover',
    delay = 200,
    maxWidth,
    interactive = false,
    arrow = true,
    norwegian,
    onOpen,
    onClose,
    className,
    style,
    testId,
    'aria-label': ariaLabel,
    ...divProps
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = (): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout((): void => {
      setIsVisible(true);
      onOpen?.();
    }, delay);
  };

  const hideTooltip = (): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsVisible(false);
    onClose?.();
  };

  const handleMouseEnter = (): void => {
    if (trigger === 'hover') {
      showTooltip();
    }
  };

  const handleMouseLeave = (): void => {
    if (trigger === 'hover' && !interactive) {
      hideTooltip();
    }
  };

  const handleClick = (): void => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  const handleFocus = (): void => {
    if (trigger === 'focus') {
      showTooltip();
    }
  };

  const handleBlur = (): void => {
    if (trigger === 'focus') {
      hideTooltip();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Escape' && isVisible) {
      hideTooltip();
    }
  };

  // Calculate position (simplified - real implementation would use more sophisticated positioning)
  useEffect((): void => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + 8;
          break;
        default:
          // Auto placement - simplified
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      }

      setPosition({ top, left });
    }
  }, [isVisible, placement]);

  // Cleanup timeout on unmount
  useEffect((): void => {
    return (): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipStyles = getTooltipStyles(props);
  const combinedStyles = {
    ...tooltipStyles,
    ...style,
    top: position.top,
    left: position.left,
    display: isVisible ? 'block' : 'none',
  };

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
          style={combinedStyles}
          data-testid={testId}
          data-placement={placement}
          data-classification={norwegian?.classification}
          data-municipality={norwegian?.municipality}
          data-help-category={norwegian?.helpCategory}
          aria-label={ariaLabel}
          onMouseEnter={interactive ? (): void => {} : undefined}
          onMouseLeave={interactive ? hideTooltip : undefined}
          {...divProps}
        >
          {/* Tooltip content */}
          <TooltipContent contentKey={contentKey} content={content} norwegian={norwegian} />

          {/* Arrow */}
          {arrow && (
            <TooltipArrow placement={placement} classification={norwegian?.classification} />
          )}
        </div>
      )}
    </>
  );
});

Tooltip.displayName = 'Tooltip';
