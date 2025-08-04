/**
 * @fileoverview SwipeableDrawer Component v5.0.0 - Token-Based Design System
 * @description Mobile-specific drawer with swipe gestures and touch interactions
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

import React, { useState, useRef, useEffect } from 'react';
import { Box, Text, Heading } from '../../semantic';
import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils/cn';
import { cn } from '../../../lib/utils/cn';
import { useTouchGestures, type SwipeEvent } from '../../../hooks/useTouchGestures';
import { useTouchGestures, type SwipeEvent } from '../../../hooks/useTouchGestures';
import { usePlatform } from '../../../hooks';
import { usePlatform } from '../../../hooks';

// =============================================================================
// SWIPEABLE DRAWER VARIANTS
// =============================================================================

const swipeableDrawerVariants = cva(
  [
    'fixed inset-y-0 z-50',
    'bg-background',
    'transform transition-transform duration-300 ease-out',
    'motion-reduce:transition-none',
    'will-change-transform',
  ],
  {
    variants: {
      side: {
        left: 'left-0 border-r border-border',
        right: 'right-0 border-l border-border',
        top: 'top-0 left-0 right-0 border-b border-border',
        bottom: 'bottom-0 left-0 right-0 border-t border-border',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        full: '',
      },
      open: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Left drawer sizes
      { side: 'left', size: 'sm', className: 'w-64' },
      { side: 'left', size: 'md', className: 'w-80' },
      { side: 'left', size: 'lg', className: 'w-96' },
      { side: 'left', size: 'full', className: 'w-full' },
      // Right drawer sizes
      { side: 'right', size: 'sm', className: 'w-64' },
      { side: 'right', size: 'md', className: 'w-80' },
      { side: 'right', size: 'lg', className: 'w-96' },
      { side: 'right', size: 'full', className: 'w-full' },
      // Top drawer sizes
      { side: 'top', size: 'sm', className: 'h-64' },
      { side: 'top', size: 'md', className: 'h-80' },
      { side: 'top', size: 'lg', className: 'h-96' },
      { side: 'top', size: 'full', className: 'h-full' },
      // Bottom drawer sizes
      { side: 'bottom', size: 'sm', className: 'h-64' },
      { side: 'bottom', size: 'md', className: 'h-80' },
      { side: 'bottom', size: 'lg', className: 'h-96' },
      { side: 'bottom', size: 'full', className: 'h-full' },
      // Open/close states
      { side: 'left', open: false, className: '-translate-x-full' },
      { side: 'right', open: false, className: 'translate-x-full' },
      { side: 'top', open: false, className: '-translate-y-full' },
      { side: 'bottom', open: false, className: 'translate-y-full' },
      { side: 'left', open: true, className: 'translate-x-0' },
      { side: 'right', open: true, className: 'translate-x-0' },
      { side: 'top', open: true, className: 'translate-y-0' },
      { side: 'bottom', open: true, className: 'translate-y-0' },
    ],
    defaultVariants: {
      side: 'left',
      size: 'md',
      open: false,
    },
  }
);

// =============================================================================
// SWIPEABLE DRAWER INTERFACES
// =============================================================================

export interface SwipeableDrawerProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof swipeableDrawerVariants> {
  /** Drawer content */
  readonly children: React.ReactNode;
  /** Open state */
  readonly open?: boolean;
  /** Close handler */
  readonly onClose?: () => void;
  /** Open handler */
  readonly onOpen?: () => void;
  /** Enable swipe to open */
  readonly swipeToOpen?: boolean;
  /** Enable swipe to close */
  readonly swipeToClose?: boolean;
  /** Swipe threshold percentage (0-1) */
  readonly swipeThreshold?: number;
  /** Show handle indicator */
  readonly showHandle?: boolean;
  /** Overlay click closes drawer */
  readonly closeOnOverlayClick?: boolean;
  /** Lock body scroll when open */
  readonly lockScroll?: boolean;
}

// =============================================================================
// SWIPEABLE DRAWER HOOKS
// =============================================================================

/**
 * Hook for managing drawer swipe state
 */
const useSwipeableDrawer = ({
  side = 'left',
  open = false,
  onClose,
  onOpen,
  swipeThreshold = 0.3,
}: Pick<SwipeableDrawerProps, 'side' | 'open' | 'onClose' | 'onOpen' | 'swipeThreshold'>) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [willClose, setWillClose] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Get drawer dimensions
  const getDrawerSize = (): number => {
    if (!drawerRef.current) return 0;
    const rect = drawerRef.current.getBoundingClientRect();
    return side === 'left' || side === 'right' ? rect.width : rect.height;
  };

  // Handle swipe events
  const handleSwipe = (event: SwipeEvent) => {
    const drawerSize = getDrawerSize();
    const threshold = drawerSize * swipeThreshold;

    if (open) {
      // Swipe to close
      if (
        (side === 'left' && event.direction === 'left' && event.distance > threshold) ||
        (side === 'right' && event.direction === 'right' && event.distance > threshold) ||
        (side === 'top' && event.direction === 'up' && event.distance > threshold) ||
        (side === 'bottom' && event.direction === 'down' && event.distance > threshold)
      ) {
        onClose?.();
      }
    } else {
      // Swipe to open
      if (
        (side === 'left' && event.direction === 'right' && event.distance > threshold) ||
        (side === 'right' && event.direction === 'left' && event.distance > threshold) ||
        (side === 'top' && event.direction === 'down' && event.distance > threshold) ||
        (side === 'bottom' && event.direction === 'up' && event.distance > threshold)
      ) {
        onOpen?.();
      }
    }
  };

  // Calculate drag transform
  const getDragTransform = (): string => {
    if (!isDragging || dragOffset === 0) return '';

    switch (side) {
      case 'left':
        return `translateX(${Math.min(0, dragOffset)}px)`;
      case 'right':
        return `translateX(${Math.max(0, dragOffset)}px)`;
      case 'top':
        return `translateY(${Math.min(0, dragOffset)}px)`;
      case 'bottom':
        return `translateY(${Math.max(0, dragOffset)}px)`;
      default:
        return '';
    }
  };

  return {
    drawerRef,
    isDragging,
    dragOffset,
    willClose,
    handleSwipe,
    getDragTransform,
    setIsDragging,
    setDragOffset,
    setWillClose,
  };
};

// =============================================================================
// SWIPEABLE DRAWER COMPONENT
// =============================================================================

/**
 * Mobile-optimized drawer with swipe gestures
 */
export const SwipeableDrawer = React.forwardRef<HTMLDivElement, SwipeableDrawerProps>(
  (
    {
      children,
      side = 'left',
      size = 'md',
      open = false,
      onClose,
      onOpen,
      swipeToOpen = true,
      swipeToClose = true,
      swipeThreshold = 0.3,
      showHandle = true,
      closeOnOverlayClick = true,
      lockScroll = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
        const { platform } = usePlatform();
    const {
      drawerRef,
      isDragging,
      dragOffset,
      handleSwipe,
      getDragTransform,
    } = useSwipeableDrawer({ side, open, onClose, onOpen, swipeThreshold });

    // Combine refs
    React.useImperativeHandle(ref, () => drawerRef.current!);

    // Touch gesture handlers
    const { ref: gestureRef } = useTouchGestures(
      {
        onSwipe: swipeToClose || swipeToOpen ? handleSwipe : undefined,
      },
      {
        enableSwipe: true,
        enablePinch: false,
        enableTap: false,
        swipeThreshold: 30,
      }
    );

    // Apply gesture ref to drawer
    React.useEffect(() => {
      // Gesture ref is managed internally by the hook
      // No need to manually sync refs
    }, []);

    // Lock body scroll when open
    useEffect(() => {
      if (!lockScroll || !open) return;

      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }, [open, lockScroll]);

    // Drawer styles
    const drawerStyles = React.useMemo((): React.CSSProperties => ({
      backgroundColor: colors.background?.default || '#ffffff',
      boxShadow: open ? getToken('shadows.2xl') as string : 'none',
      transform: getDragTransform(),
      ...style,
    }), [colors, open, getDragTransform, getToken, style]);

    // Handle styles
    const handleStyles = React.useMemo((): React.CSSProperties => ({
      position: 'absolute',
      backgroundColor: colors.border?.default || '#e2e8f0',
      borderRadius: getToken('borderRadius.full') as string,
      opacity: 0.5,
      ...(side === 'left' || side === 'right'
        ? {
            top: '50%',
            transform: 'translateY(-50%)',
            width: '4px',
            height: '32px',
            ...(side === 'left' ? { right: spacing?.[2] } : { left: spacing?.[2] }),
          }
        : {
            left: '50%',
            transform: 'translateX(-50%)',
            width: '32px',
            height: '4px',
            ...(side === 'top' ? { bottom: spacing?.[2] } : { top: spacing?.[2] }),
          }),
    }), [colors, side, spacing, getToken]);

    // Overlay styles
    const overlayStyles = React.useMemo((): React.CSSProperties => ({
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      zIndex: 49,
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity 300ms ease-in-out',
    }), [open]);

    // Edge swipe area for opening
    const edgeSwipeStyles = React.useMemo((): React.CSSProperties => ({
      position: 'fixed',
      zIndex: 48,
      ...(side === 'left'
        ? { left: 0, top: 0, bottom: 0, width: '20px' }
        : side === 'right'
        ? { right: 0, top: 0, bottom: 0, width: '20px' }
        : side === 'top'
        ? { top: 0, left: 0, right: 0, height: '20px' }
        : { bottom: 0, left: 0, right: 0, height: '20px' }),
    }), [side]);

    return (
      <>
        {/* Overlay */}
        {open && (
          <Box
           
            onClick={closeOnOverlayClick ? onClose : undefined}
            aria-hidden="true"
          />
        )}

        {/* Edge swipe area for opening */}
        {!open && swipeToOpen && platform === 'mobile' && (
          <Box
            ref={gestureRef as React.RefObject<HTMLDivElement>}
           
            aria-hidden="true"
          />
        )}

        {/* Drawer */}
        <Box
          ref={drawerRef}
          className={cn(
            swipeableDrawerVariants({ side, size, open }),
            isDragging && 'transition-none',
            className
          )}
         
          role="dialog"
          aria-modal="true"
          aria-label="Mobile drawer"
          {...props}
        >
          {/* Handle indicator */}
          {showHandle && (
            <Box aria-hidden="true" />
          )}

          {/* Content */}
          {children}
        </Box>
      </>
    );
  }
);

SwipeableDrawer.displayName = 'SwipeableDrawer';

// Export variants for external use
export { swipeableDrawerVariants };
export type SwipeableDrawerVariant = VariantProps<typeof swipeableDrawerVariants>;
