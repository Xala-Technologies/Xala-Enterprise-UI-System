/**
 * @fileoverview useTouchGestures Hook v5.0.0 - Token-Based Design System
 * @description Hook for handling touch gestures on mobile devices
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

import React, { useRef, useEffect, useCallback } from 'react';
import { usePlatform } from '../hooks';
import { useTokens } from './useTokens';

export interface TouchGestureConfig {
  /** Enable swipe gestures */
  enableSwipe?: boolean;
  /** Enable pinch gestures */
  enablePinch?: boolean;
  /** Enable tap gestures */
  enableTap?: boolean;
  /** Enable long press */
  enableLongPress?: boolean;
  /** Swipe threshold in pixels */
  swipeThreshold?: number;
  /** Long press duration in ms */
  longPressDuration?: number;
  /** Prevent default touch behavior */
  preventDefault?: boolean;
}

export interface SwipeEvent {
  direction: 'left' | 'right' | 'up' | 'down';
  distance: number;
  velocity: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface PinchEvent {
  scale: number;
  centerX: number;
  centerY: number;
}

export interface TapEvent {
  x: number;
  y: number;
  tapCount: number;
}

export interface TouchGestureHandlers {
  onSwipe?: (event: SwipeEvent) => void;
  onSwipeLeft?: (event: SwipeEvent) => void;
  onSwipeRight?: (event: SwipeEvent) => void;
  onSwipeUp?: (event: SwipeEvent) => void;
  onSwipeDown?: (event: SwipeEvent) => void;
  onPinch?: (event: PinchEvent) => void;
  onTap?: (event: TapEvent) => void;
  onDoubleTap?: (event: TapEvent) => void;
  onLongPress?: (event: TapEvent) => void;
}

export interface UseTouchGesturesReturn {
  /** Ref to attach to the element */
  ref: React.RefObject<HTMLElement>;
  /** Manual gesture handlers */
  handlers: {
    onTouchStart: (e: TouchEvent) => void;
    onTouchMove: (e: TouchEvent) => void;
    onTouchEnd: (e: TouchEvent) => void;
  };
  /** Current gesture state */
  isGesturing: boolean;
  /** Reset gesture state */
  reset: () => void;
}

/**
 * Hook for handling touch gestures
 */
export const useTouchGestures = (
  handlers: TouchGestureHandlers = {},
  config: TouchGestureConfig = {}
): UseTouchGesturesReturn => {
  const {
    enableSwipe = true,
    enablePinch = true,
    enableTap = true,
    enableLongPress = true,
    swipeThreshold = 50,
    longPressDuration = 500,
    preventDefault = true,
  } = config;

  const { platform } = usePlatform();
  const { getToken } = useTokens();
  const ref = useRef<HTMLElement>(null);

  // Gesture state
  const [isGesturing, setIsGesturing] = React.useState(false);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTapRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pinchStartRef = useRef<{ distance: number } | null>(null);

  // Calculate distance between two touch points
  const getDistance = (touch1: Touch, touch2: Touch): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Handle touch start
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (preventDefault) e.preventDefault();
    setIsGesturing(true);

    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };

    // Handle pinch start
    if (enablePinch && e.touches.length === 2) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      pinchStartRef.current = { distance };
    }

    // Handle long press
    if (enableLongPress && e.touches.length === 1) {
      longPressTimerRef.current = setTimeout(() => {
        if (touchStartRef.current) {
          handlers.onLongPress?.({
            x: touch.clientX,
            y: touch.clientY,
            tapCount: 1,
          });
        }
      }, longPressDuration);
    }
  }, [preventDefault, enablePinch, enableLongPress, longPressDuration, handlers]);

  // Handle touch move
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (preventDefault) e.preventDefault();

    // Cancel long press on move
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Handle pinch
    if (enablePinch && e.touches.length === 2 && pinchStartRef.current) {
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const scale = currentDistance / pinchStartRef.current.distance;
      const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

      handlers.onPinch?.({
        scale,
        centerX,
        centerY,
      });
    }
  }, [preventDefault, enablePinch, handlers]);

  // Handle touch end
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (preventDefault) e.preventDefault();
    setIsGesturing(false);

    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    const startX = touchStartRef.current.x;
    const startY = touchStartRef.current.y;
    const startTime = touchStartRef.current.time;
    const endTime = Date.now();

    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const duration = endTime - startTime;
    const velocity = distance / duration;

    // Handle swipe
    if (enableSwipe && distance > swipeThreshold) {
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      let direction: 'left' | 'right' | 'up' | 'down';

      if (absX > absY) {
        direction = dx > 0 ? 'right' : 'left';
      } else {
        direction = dy > 0 ? 'down' : 'up';
      }

      const swipeEvent: SwipeEvent = {
        direction,
        distance,
        velocity,
        startX,
        startY,
        endX,
        endY,
      };

      handlers.onSwipe?.(swipeEvent);

      switch (direction) {
        case 'left':
          handlers.onSwipeLeft?.(swipeEvent);
          break;
        case 'right':
          handlers.onSwipeRight?.(swipeEvent);
          break;
        case 'up':
          handlers.onSwipeUp?.(swipeEvent);
          break;
        case 'down':
          handlers.onSwipeDown?.(swipeEvent);
          break;
      }
    }
    // Handle tap
    else if (enableTap && distance < 10 && duration < 300) {
      const tapEvent: TapEvent = {
        x: endX,
        y: endY,
        tapCount: 1,
      };

      // Check for double tap
      if (lastTapRef.current) {
        const lastTap = lastTapRef.current;
        const tapInterval = endTime - lastTap.time;
        const tapDistance = Math.sqrt(
          Math.pow(endX - lastTap.x, 2) + Math.pow(endY - lastTap.y, 2)
        );

        if (tapInterval < 300 && tapDistance < 30) {
          tapEvent.tapCount = 2;
          handlers.onDoubleTap?.(tapEvent);
          lastTapRef.current = null;
        } else {
          handlers.onTap?.(tapEvent);
          lastTapRef.current = { x: endX, y: endY, time: endTime };
        }
      } else {
        handlers.onTap?.(tapEvent);
        lastTapRef.current = { x: endX, y: endY, time: endTime };
      }
    }

    // Reset state
    touchStartRef.current = null;
    pinchStartRef.current = null;
  }, [preventDefault, enableSwipe, enableTap, swipeThreshold, handlers]);

  // Attach event listeners
  useEffect(() => {
    const element = ref.current;
    if (!element || platform !== 'mobile') return;

    element.addEventListener('touchstart', handleTouchStart as any, { passive: !preventDefault });
    element.addEventListener('touchmove', handleTouchMove as any, { passive: !preventDefault });
    element.addEventListener('touchend', handleTouchEnd as any, { passive: !preventDefault });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart as any);
      element.removeEventListener('touchmove', handleTouchMove as any);
      element.removeEventListener('touchend', handleTouchEnd as any);
    };
  }, [platform, preventDefault, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Reset function
  const reset = useCallback(() => {
    setIsGesturing(false);
    touchStartRef.current = null;
    lastTapRef.current = null;
    pinchStartRef.current = null;
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  return {
    ref,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    isGesturing,
    reset,
  };
};

/**
 * Swipeable component wrapper
 */
export interface SwipeableProps {
  /** Children to make swipeable */
  children: React.ReactNode;
  /** Swipe handlers */
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  /** Configuration */
  config?: TouchGestureConfig;
  /** Additional class name */
  className?: string;
}

export const Swipeable: React.FC<SwipeableProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  config,
  className,
}) => {
  const { ref } = useTouchGestures(
    {
      onSwipeLeft: onSwipeLeft ? () => onSwipeLeft() : undefined,
      onSwipeRight: onSwipeRight ? () => onSwipeRight() : undefined,
      onSwipeUp: onSwipeUp ? () => onSwipeUp() : undefined,
      onSwipeDown: onSwipeDown ? () => onSwipeDown() : undefined,
    },
    config
  );

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
};