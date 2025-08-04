/**
 * @fileoverview ActionBar Component v5.0.0 - Token-Based Design System
 * @description Main action bar component following SOLID principles
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils/cn';
import { ActionButton } from './ActionButton';
import type { ActionBarProps, ActionConfig } from './types';
import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput, List, ListItem, Link } from '../../../semantic';

// =============================================================================
// ACTION BAR VARIANTS
// =============================================================================

const actionBarVariants = cva(
  [
    'inline-flex items-center',
    'transition-all duration-150 ease-in-out',
    'focus-within:outline-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background border border-border shadow-sm',
        ghost: 'bg-transparent',
        floating: 'bg-background border border-border shadow-lg',
        inline: 'bg-transparent',
      },
      size: {
        sm: 'gap-1 p-1',
        md: 'gap-2 p-2',
        lg: 'gap-3 p-3',
      },
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
      position: {
        'top-left': 'absolute top-2 left-2',
        'top-right': 'absolute top-2 right-2',
        'top-center': 'absolute top-2 left-1/2 transform -translate-x-1/2',
        'bottom-left': 'absolute bottom-2 left-2',
        'bottom-right': 'absolute bottom-2 right-2',
        'bottom-center': 'absolute bottom-2 left-1/2 transform -translate-x-1/2',
        relative: 'relative',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      orientation: 'horizontal',
      rounded: 'md',
      position: 'relative',
    },
  }
);

// =============================================================================
// ACTION BAR HOOKS AND UTILITIES
// =============================================================================

/**
 * Action bar theme styles utility
 * Follows SRP by handling only theme-related styling
 */
const useActionBarStyles = (
  variant: ActionBarProps['variant'],
  position: ActionBarProps['position'],
  customStyle?: React.CSSProperties
) => {
  
  return React.useMemo((): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      transition: 'all 150ms ease-in-out',
    };

    const variantStyles: React.CSSProperties = (() => {
      switch (variant) {
        case 'ghost':
          return { backgroundColor: 'transparent' };
        case 'floating':
          return {
            backgroundColor: colors.background?.elevated || '#ffffff',
            border: `1px solid ${colors.border?.default || '#e2e8f0'}`,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          };
        case 'inline':
          return { backgroundColor: 'transparent' };
        default: // default
          return {
            backgroundColor: colors.background?.default || '#ffffff',
            border: `1px solid ${colors.border?.default || '#e2e8f0'}`,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          };
      }
    })();

    const positionStyles: React.CSSProperties = (() => {
      if (position === 'relative') return {};
      
      return {
        position: 'absolute',
        zIndex: 10,
      };
    })();

    return {
      ...baseStyles,
      ...variantStyles,
      ...positionStyles,
      ...customStyle,
    };
  }, [colors, variant, position, customStyle]);
};

/**
 * Visibility management utility
 * Follows SRP by handling only visibility logic
 */
const useVisibilityManager = (visibility: ActionBarProps['visibility']) => {
  const [isVisible, setIsVisible] = React.useState(visibility === 'always');

  const handleMouseEnter = React.useCallback(() => {
    if (visibility === 'hover' || visibility === 'hover-focus') {
      setIsVisible(true);
    }
  }, [visibility]);

  const handleMouseLeave = React.useCallback(() => {
    if (visibility === 'hover' || visibility === 'hover-focus') {
      setIsVisible(false);
    }
  }, [visibility]);

  const handleFocus = React.useCallback(() => {
    if (visibility === 'focus' || visibility === 'hover-focus') {
      setIsVisible(true);
    }
  }, [visibility]);

  const handleBlur = React.useCallback(() => {
    if (visibility === 'focus' || visibility === 'hover-focus') {
      setIsVisible(false);
    }
  }, [visibility]);

  return {
    isVisible,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  };
};

// =============================================================================
// ACTION BAR COMPONENT
// =============================================================================

/**
 * ActionBar Component
 * Follows SOLID principles:
 * - SRP: Handles only action bar rendering and orchestration
 * - OCP: Extensible through action configuration
 * - LSP: Can be substituted with specialized action bars
 * - ISP: Provides focused interface for action bar needs
 * - DIP: Depends on action abstractions, not concrete implementations
 */
export const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  (
    {
      actions,
      variant = 'default',
      size = 'md',
      orientation = 'horizontal',
      visibility = 'always',
      position = 'relative',
      rounded = 'md',
      maxButtons,
      showLabels = false,
      showTooltips = true,
      disabled = false,
      loading = false,
      className,
      style,
      'aria-label': ariaLabel = 'Action toolbar',
      ...props
    },
    ref
  ): React.ReactElement => {
    // Custom hooks for separation of concerns
    const actionBarStyles = useActionBarStyles(variant, position, style);
    const visibilityManager = useVisibilityManager(visibility);

    // Process actions with limits
    const visibleActions = React.useMemo(() => {
      if (!maxButtons || actions.length <= maxButtons) {
        return actions;
      }
      
      // Show first (maxButtons - 1) actions plus a "more" action
      const primaryActions = actions.slice(0, maxButtons - 1);
      const moreActions = actions.slice(maxButtons - 1);
      
      // Create a "more" action that contains the remaining actions
      const moreAction: ActionConfig = {
        type: 'more',
        label: 'More',
        norwegianLabel: 'Mer',
        variant: 'ghost',
        onClick: () => {
          // This could trigger a dropdown or modal with remaining actions
          // console.log('More actions:', moreActions);
        },
      };
      
      return [...primaryActions, moreAction];
    }, [actions, maxButtons]);

    // Render individual action buttons
    const renderActionButton = React.useCallback((action: ActionConfig, index: number) => {
      return (
        <ActionButton
          key={`${action.type}-${index}`}
          icon={action.icon}
          label={action.label}
          loading={action.loading || loading}
          disabled={action.disabled || disabled}
          variant={action.variant}
          size={action.size || size}
          shape={action.shape}
          showLabel={showLabels}
          tooltipText={showTooltips ? action.tooltip : undefined}
          onClick={action.onClick}
          aria-label={action.label}
        />
      );
    }, [size, showLabels, showTooltips, disabled, loading]);

    return (
      <Box
        ref={ref}
        className={cn(
          actionBarVariants({ variant, size, orientation, rounded, position }),
          !visibilityManager.isVisible && 'opacity-0 pointer-events-none',
          className
        )}
       
        role="toolbar"
        aria-label={ariaLabel}
        aria-orientation={orientation}
        onMouseEnter={visibilityManager.handleMouseEnter}
        onMouseLeave={visibilityManager.handleMouseLeave}
        onFocus={visibilityManager.handleFocus}
        onBlur={visibilityManager.handleBlur}
        {...props}
      >
        {visibleActions.map(renderActionButton)}
      </Box>
    );
  }
);

ActionBar.displayName = 'ActionBar';

// Export variants type for external usage
export type ActionBarVariant = VariantProps<typeof actionBarVariants>;