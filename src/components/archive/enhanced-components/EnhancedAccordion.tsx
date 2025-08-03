/**
 * @fileoverview Enhanced Accordion Component - Enterprise Interactive
 * @description Expandable accordion with icons, badges, and smooth animations with WCAG AAA compliance
 * @version 5.0.0
 * @compliance WCAG AAA, NSM, Enterprise Standards
 */

import React, { useState, useCallback, useMemo } from 'react';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// INTERFACES
// =============================================================================

export interface AccordionItem {
  readonly id: string;
  readonly title: string;
  readonly content: React.ReactNode;
  readonly icon?: React.ReactNode;
  readonly badge?: string | number;
  readonly isDisabled?: boolean;
  readonly isDefaultExpanded?: boolean;
}

export interface EnhancedAccordionProps {
  readonly items: readonly AccordionItem[];
  readonly allowMultiple?: boolean;
  readonly variant?: 'default' | 'bordered' | 'elevated' | 'minimal';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly expandIcon?: React.ReactNode;
  readonly collapseIcon?: React.ReactNode;
  readonly animationDuration?: number;
  readonly onItemToggle?: (itemId: string, isExpanded: boolean) => void;
  readonly className?: string;
  readonly ariaLabel?: string;
}

// =============================================================================
// ENHANCED ACCORDION COMPONENT
// =============================================================================

export const EnhancedAccordion = ({
  items,
  allowMultiple = false,
  variant = 'default',
  size = 'md',
  expandIcon,
  collapseIcon,
  animationDuration = 200,
  onItemToggle,
  className = '',
  ariaLabel = 'Accordion'
}: EnhancedAccordionProps): JSX.Element => {
  const { colors, spacing, typography, elevation, borderRadius, componentSizing, motion } = useTokens();
  
  // Initialize expanded items based on default expanded state
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    const defaultExpanded = new Set<string>();
    items.forEach(item => {
      if (item.isDefaultExpanded && !item.isDisabled) {
        defaultExpanded.add(item.id);
      }
    });
    return defaultExpanded;
  });

  // Handle item toggle
  const handleItemToggle = useCallback((itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item || item.isDisabled) return;

    setExpandedItems(prev => {
      const newSet = new Set(prev);
      const wasExpanded = newSet.has(itemId);
      
      if (!allowMultiple && !wasExpanded) {
        // If single mode and expanding, collapse all others
        newSet.clear();
        newSet.add(itemId);
      } else if (wasExpanded) {
        // Collapsing
        newSet.delete(itemId);
      } else {
        // Expanding
        newSet.add(itemId);
      }
      
      onItemToggle?.(itemId, !wasExpanded);
      return newSet;
    });
  }, [items, allowMultiple, onItemToggle]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent, itemId: string) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleItemToggle(itemId);
        break;
    }
  }, [handleItemToggle]);

  // Generate variant styles
  const accordionStyles = useMemo(() => {
    const baseStyles = {
      backgroundColor: colors.background?.paper,
      borderRadius: borderRadius?.lg,
    };

    switch (variant) {
      case 'bordered':
        return {
          ...baseStyles,
          border: `1px solid ${colors.border?.default}`,
        };
      case 'elevated':
        return {
          ...baseStyles,
          border: `1px solid ${colors.border?.muted}`,
          boxShadow: elevation?.md,
        };
      case 'minimal':
        return {
          backgroundColor: 'transparent',
        };
      default:
        return baseStyles;
    }
  }, [variant, colors, borderRadius, elevation]);

  // Generate size-based spacing
  const sizeStyles = useMemo(() => {
    const sizeMap = {
      sm: {
        padding: spacing[3],
        fontSize: typography.fontSize?.sm || '0.875rem',
        iconSize: '16px',
      },
      md: {
        padding: spacing[4],
        fontSize: typography.fontSize?.base || '1rem',
        iconSize: '20px',
      },
      lg: {
        padding: spacing[6],
        fontSize: typography.fontSize?.lg || '1.125rem',
        iconSize: '24px',
      },
    };
    
    return sizeMap[size];
  }, [size, spacing, typography]);

  // Render accordion item
  const renderAccordionItem = useCallback((item: AccordionItem, index: number) => {
    const isExpanded = expandedItems.has(item.id);
    const isFirst = index === 0;
    const isLast = index === items.length - 1;

    const headerStyles = {
      padding: sizeStyles.padding,
      backgroundColor: item.isDisabled 
        ? colors.background?.elevated 
        : isExpanded 
        ? colors.background?.elevated 
        : 'transparent',
      borderRadius: variant === 'minimal' 
        ? '0' 
        : isFirst 
        ? `${borderRadius?.lg} ${borderRadius?.lg} 0 0` 
        : isLast && !isExpanded 
        ? `0 0 ${borderRadius?.lg} ${borderRadius?.lg}` 
        : '0',
      borderBottom: variant !== 'minimal' && !isLast 
        ? `1px solid ${colors.border?.muted}` 
        : 'none',
      cursor: item.isDisabled ? 'not-allowed' : 'pointer',
      opacity: item.isDisabled ? 0.6 : 1,
      transition: `all ${animationDuration}ms ${motion?.easing?.ease || 'ease'}`,
    };

    const contentStyles = {
      padding: `0 ${sizeStyles.padding} ${sizeStyles.padding}`,
      borderBottom: variant !== 'minimal' && !isLast 
        ? `1px solid ${colors.border?.muted}` 
        : 'none',
      borderRadius: isLast && isExpanded 
        ? `0 0 ${borderRadius?.lg} ${borderRadius?.lg}` 
        : '0',
    };

    const defaultExpandIcon = (
      <div
        style={{
          transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: `transform ${animationDuration}ms ${motion?.easing?.ease || 'ease'}`,
          width: sizeStyles.iconSize,
          height: sizeStyles.iconSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: sizeStyles.fontSize
        }}
        aria-hidden="true"
      >
        ▶
      </div>
    );

    return (
      <div key={item.id} className="accordion-item">
        {/* Header */}
        <h3>
          <button
            type="button"
            onClick={() => handleItemToggle(item.id)}
            onKeyDown={(e) => handleKeyDown(e, item.id)}
            disabled={item.isDisabled}
            className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            style={headerStyles}
            aria-expanded={isExpanded}
            aria-controls={`accordion-content-${item.id}`}
            id={`accordion-header-${item.id}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {item.icon && (
                  <div
                    className="flex-shrink-0"
                    style={{
                      color: item.isDisabled 
                        ? colors.text?.muted 
                        : colors.text?.secondary,
                      width: sizeStyles.iconSize,
                      height: sizeStyles.iconSize
                    }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                )}
                
                <span
                  className="font-medium truncate"
                  style={{
                    color: item.isDisabled 
                      ? colors.text?.muted 
                      : colors.text?.primary,
                    fontSize: sizeStyles.fontSize,
                    lineHeight: typography.lineHeight?.tight || 1.25
                  }}
                >
                  {item.title}
                </span>

                {item.badge && (
                  <span
                    className="inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: colors.primary?.[100] || '#dbeafe',
                      color: colors.primary?.[700] || '#1d4ed8',
                      fontSize: typography.fontSize?.xs || '0.75rem',
                      minWidth: '20px'
                    }}
                    aria-label={`${item.badge} items`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="flex-shrink-0 ml-3">
                {isExpanded && collapseIcon 
                  ? collapseIcon 
                  : expandIcon || defaultExpandIcon}
              </div>
            </div>
          </button>
        </h3>

        {/* Content */}
        {isExpanded && (
          <div
            id={`accordion-content-${item.id}`}
            role="region"
            aria-labelledby={`accordion-header-${item.id}`}
            style={contentStyles}
            className="accordion-content"
          >
            <div
              style={{
                color: colors.text?.secondary,
                fontSize: sizeStyles.fontSize,
                lineHeight: typography.lineHeight?.relaxed || 1.625,
                animation: `accordionSlideDown ${animationDuration}ms ${motion?.easing?.ease || 'ease'}`
              }}
            >
              {item.content}
            </div>
          </div>
        )}
      </div>
    );
  }, [
    expandedItems,
    items.length,
    sizeStyles,
    colors,
    borderRadius,
    variant,
    motion,
    animationDuration,
    typography,
    expandIcon,
    collapseIcon,
    handleItemToggle,
    handleKeyDown
  ]);

  return (
    <>
      {/* CSS Animation Keyframes */}
      <style>
        {`
          @keyframes accordionSlideDown {
            from {
              opacity: 0;
              transform: translateY(-8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @media (prefers-reduced-motion: reduce) {
            .accordion-content {
              animation: none !important;
            }
          }
        `}
      </style>

      <div
        className={`accordion ${className}`}
        style={accordionStyles}
        role="presentation"
        aria-label={ariaLabel}
      >
        {items.map(renderAccordionItem)}
      </div>
    </>
  );
};

export default EnhancedAccordion;