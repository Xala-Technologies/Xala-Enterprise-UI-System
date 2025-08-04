/**
 * @fileoverview SplitView Component v5.0.0 - Token-Based Design System
 * @description Tablet-specific split view layout with resizable panes
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Box, Text, Heading } from '../../semantic';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils/cn';
import { cn } from '../../../lib/utils/cn';
import { usePlatform } from '../../../hooks';
import { usePlatform } from '../../../hooks';

// =============================================================================
// SPLIT VIEW VARIANTS
// =============================================================================

const splitViewVariants = cva(
  [
    'flex h-full w-full',
    'bg-background',
    'relative overflow-hidden',
  ],
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      variant: {
        default: '',
        bordered: '',
        elevated: 'shadow-lg',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'default',
    },
  }
);

const splitPaneVariants = cva(
  [
    'overflow-auto',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        paper: 'bg-card',
        elevated: 'bg-background shadow-md',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

// =============================================================================
// SPLIT VIEW INTERFACES
// =============================================================================

export interface SplitViewProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-orientation'>,
    VariantProps<typeof splitViewVariants> {
  /** Primary pane content */
  readonly primaryPane: React.ReactNode;
  /** Secondary pane content */
  readonly secondaryPane: React.ReactNode;
  /** Initial split position (percentage) */
  readonly initialSplit?: number;
  /** Minimum pane size (pixels) */
  readonly minSize?: number;
  /** Maximum pane size (pixels) */
  readonly maxSize?: number;
  /** Allow resizing */
  readonly resizable?: boolean;
  /** Collapsed state */
  readonly collapsed?: boolean;
  /** Which pane to collapse */
  readonly collapsedPane?: 'primary' | 'secondary';
  /** Show divider */
  readonly showDivider?: boolean;
  /** Pane variant */
  readonly paneVariant?: VariantProps<typeof splitPaneVariants>['variant'];
  /** Pane padding */
  readonly panePadding?: VariantProps<typeof splitPaneVariants>['padding'];
  /** Split change handler */
  readonly onSplitChange?: (split: number) => void;
}

// =============================================================================
// SPLIT VIEW HOOKS
// =============================================================================

/**
 * Hook for managing split view resize
 */
const useSplitResize = ({
  orientation,
  initialSplit,
  minSize,
  maxSize,
  onSplitChange,
}: {
  orientation: 'horizontal' | 'vertical';
  initialSplit: number;
  minSize: number;
  maxSize?: number;
  onSplitChange?: (split: number) => void;
}) => {
  const [split, setSplit] = useState(initialSplit);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef<number>(0);
  const startSplitRef = useRef<number>(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startPosRef.current = orientation === 'horizontal' ? e.clientX : e.clientY;
    startSplitRef.current = split;
  }, [orientation, split]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const size = orientation === 'horizontal' ? rect.width : rect.height;
    const pos = orientation === 'horizontal' ? e.clientX : e.clientY;
    const start = orientation === 'horizontal' ? rect.left : rect.top;
    
    const currentPos = pos - start;
    const percentage = (currentPos / size) * 100;
    
    // Apply constraints
    const minPercentage = (minSize / size) * 100;
    const maxPercentage = maxSize ? (maxSize / size) * 100 : 100 - minPercentage;
    
    const newSplit = Math.max(minPercentage, Math.min(maxPercentage, percentage));
    setSplit(newSplit);
    onSplitChange?.(newSplit);
  }, [isResizing, orientation, minSize, maxSize, onSplitChange]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = orientation === 'horizontal' ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }

    return () => {
      // Cleanup function for when isResizing is false
    };
  }, [isResizing, orientation, handleMouseMove, handleMouseUp]);

  return {
    split,
    isResizing,
    containerRef,
    handleMouseDown,
  };
};

// =============================================================================
// SPLIT VIEW COMPONENT
// =============================================================================

/**
 * Tablet-optimized split view layout
 */
export const SplitView = React.forwardRef<HTMLDivElement, SplitViewProps>(
  (
    {
      primaryPane,
      secondaryPane,
      orientation = 'horizontal',
      variant = 'default',
      initialSplit = 50,
      minSize = 200,
      maxSize,
      resizable = true,
      collapsed = false,
      collapsedPane = 'secondary',
      showDivider = true,
      paneVariant = 'default',
      panePadding = 'md',
      onSplitChange,
      className,
      style,
      ...props
    },
    ref
  ) => {
        const { platform } = usePlatform();
    const { split, isResizing, containerRef, handleMouseDown } = useSplitResize({
      orientation: orientation || 'horizontal',
      initialSplit: collapsed ? (collapsedPane === 'primary' ? 0 : 100) : initialSplit,
      minSize,
      maxSize,
      onSplitChange,
    });

    // Calculate pane sizes
    const primarySize = collapsed && collapsedPane === 'primary' ? '0' : `${split}%`;
    const secondarySize = collapsed && collapsedPane === 'secondary' ? '0' : `${100 - split}%`;

    // Divider styles
    const dividerStyles = React.useMemo((): React.CSSProperties => ({
      position: 'absolute',
      backgroundColor: colors.border?.default || '#e2e8f0',
      zIndex: 10,
      cursor: resizable ? (orientation === 'horizontal' ? 'col-resize' : 'row-resize') : 'default',
      transition: isResizing ? 'none' : 'all 200ms ease-in-out',
      ...(orientation === 'horizontal'
        ? {
            top: 0,
            bottom: 0,
            left: `${split}%`,
            width: variant === 'bordered' ? '1px' : '4px',
            transform: 'translateX(-50%)',
          }
        : {
            left: 0,
            right: 0,
            top: `${split}%`,
            height: variant === 'bordered' ? '1px' : '4px',
            transform: 'translateY(-50%)',
          }),
    }), [colors, orientation, split, variant, resizable, isResizing]);

    // Divider handle styles
    const dividerHandleStyles = React.useMemo((): React.CSSProperties => ({
      position: 'absolute',
      backgroundColor: colors.primary?.[500] || '#3b82f6',
      borderRadius: getToken('borderRadius.full') as string,
      opacity: isResizing ? 1 : 0,
      transition: 'opacity 150ms ease-in-out',
      ...(orientation === 'horizontal'
        ? {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '48px',
          }
        : {
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '48px',
            height: '8px',
          }),
    }), [colors, orientation, isResizing, getToken]);

    // Primary pane styles
    const primaryPaneStyles = React.useMemo((): React.CSSProperties => ({
      ...(orientation === 'horizontal'
        ? { width: primarySize, minWidth: collapsed && collapsedPane === 'primary' ? 0 : minSize }
        : { height: primarySize, minHeight: collapsed && collapsedPane === 'primary' ? 0 : minSize }),
    }), [orientation, primarySize, minSize, collapsed, collapsedPane]);

    // Secondary pane styles
    const secondaryPaneStyles = React.useMemo((): React.CSSProperties => ({
      flex: 1,
      ...(orientation === 'horizontal'
        ? { minWidth: collapsed && collapsedPane === 'secondary' ? 0 : minSize }
        : { minHeight: collapsed && collapsedPane === 'secondary' ? 0 : minSize }),
    }), [orientation, minSize, collapsed, collapsedPane]);

    return (
      <Box
        ref={containerRef}
        className={cn(splitViewVariants({ orientation, variant }), className)}
       
        {...props}
      >
        {/* Primary pane */}
        <Box
          className={cn(splitPaneVariants({ variant: paneVariant, padding: panePadding }))}
         
        >
          {primaryPane}
        </Box>

        {/* Divider */}
        {showDivider && !collapsed && (
          <Box
           
            onMouseDown={resizable ? handleMouseDown : undefined}
            role="separator"
            aria-orientation={orientation as 'horizontal' | 'vertical'}
            aria-valuenow={split}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {resizable && (
              <Box aria-hidden="true" />
            )}
          </Box>
        )}

        {/* Secondary pane */}
        <Box
          className={cn(splitPaneVariants({ variant: paneVariant, padding: panePadding }))}
         
        >
          {secondaryPane}
        </Box>
      </Box>
    );
  }
);

SplitView.displayName = 'SplitView';

// =============================================================================
// SPLIT VIEW COMPOSITIONS
// =============================================================================

export const SplitViewComposition = {
  /**
   * Master-detail layout for tablet
   */
  MasterDetail: ({
    master,
    detail,
    masterWidth = 35,
    onItemSelect,
    selectedId,
    ...props
  }: {
    master: React.ReactNode;
    detail: React.ReactNode;
    masterWidth?: number;
    onItemSelect?: (id: string) => void;
    selectedId?: string;
  } & Omit<SplitViewProps, 'primaryPane' | 'secondaryPane'>): React.ReactElement => {
    return (
      <SplitView
        primaryPane={master}
        secondaryPane={detail}
        initialSplit={masterWidth}
        minSize={250}
        maxSize={500}
        variant="bordered"
        {...props}
      />
    );
  },

  /**
   * Two-column layout for tablet
   */
  TwoColumn: ({
    left,
    right,
    collapsible = true,
    ...props
  }: {
    left: React.ReactNode;
    right: React.ReactNode;
    collapsible?: boolean;
  } & Omit<SplitViewProps, 'primaryPane' | 'secondaryPane'>): React.ReactElement => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <Box className="relative h-full">
        {collapsible && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute top-4 right-4 z-20 p-2 bg-background rounded-md shadow-md"
            aria-label={collapsed ? 'Expand view' : 'Collapse view'}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={collapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
              />
            </svg>
          </button>
        )}
        <SplitView
          primaryPane={left}
          secondaryPane={right}
          collapsed={collapsed}
          collapsedPane="secondary"
          {...props}
        />
      </Box>
    );
  },
};

// Export variants for external use
export { splitViewVariants, splitPaneVariants };
export type SplitViewVariant = VariantProps<typeof splitViewVariants>;
export type SplitPaneVariant = VariantProps<typeof splitPaneVariants>;
