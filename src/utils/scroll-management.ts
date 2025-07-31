/**
 * @fileoverview Scroll Management Utilities v5.0.0 - Token-Based Design System
 * @description Comprehensive scroll management with smooth scrolling, virtualization, and accessibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';

// =============================================================================
// SCROLL MANAGEMENT TYPES
// =============================================================================

export interface ScrollPosition {
  readonly x: number;
  readonly y: number;
  readonly direction: {
    readonly horizontal: 'left' | 'right' | 'none';
    readonly vertical: 'up' | 'down' | 'none';
  };
  readonly velocity: {
    readonly x: number;
    readonly y: number;
  };
  readonly isAtTop: boolean;
  readonly isAtBottom: boolean;
  readonly isAtLeft: boolean;
  readonly isAtRight: boolean;
  readonly percentage: {
    readonly x: number; // 0-100
    readonly y: number; // 0-100
  };
}

export interface ScrollTarget {
  readonly element?: HTMLElement;
  readonly selector?: string;
  readonly x?: number;
  readonly y?: number;
  readonly behavior?: ScrollBehavior;
  readonly block?: ScrollLogicalPosition;
  readonly inline?: ScrollLogicalPosition;
}

export interface SmoothScrollConfig {
  readonly duration: number; // ms
  readonly easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'custom';
  readonly customEasing?: (t: number) => number;
  readonly offset: { x: number; y: number };
}

export interface ScrollLockConfig {
  readonly reserveScrollBarGap: boolean;
  readonly allowTouchMove: boolean;
  readonly preventTouchMoveDefault: boolean;
}

export interface VirtualScrollConfig {
  readonly itemHeight: number | ((index: number) => number);
  readonly containerHeight: number;
  readonly overscan: number; // Number of items to render outside visible area
  readonly scrollToAlignment: 'auto' | 'start' | 'center' | 'end';
}

export interface ScrollSpyConfig {
  readonly offset: number;
  readonly smooth: boolean;
  readonly activeClass: string;
  readonly onActiveChange?: (activeId: string | null) => void;
}

export interface InfiniteScrollConfig {
  readonly threshold: number; // Distance from bottom to trigger load
  readonly hasMore: boolean;
  readonly loading: boolean;
  readonly onLoadMore: () => void | Promise<void>;
}

export interface ScrollRestorationState {
  readonly url: string;
  readonly position: { x: number; y: number };
  readonly timestamp: number;
}

// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================

export const DEFAULT_SMOOTH_SCROLL_CONFIG: SmoothScrollConfig = {
  duration: 500,
  easing: 'ease-out',
  offset: { x: 0, y: 0 },
} as const;

export const DEFAULT_SCROLL_LOCK_CONFIG: ScrollLockConfig = {
  reserveScrollBarGap: true,
  allowTouchMove: false,
  preventTouchMoveDefault: true,
} as const;

export const DEFAULT_SCROLL_SPY_CONFIG: ScrollSpyConfig = {
  offset: 0,
  smooth: true,
  activeClass: 'active',
} as const;

export const DEFAULT_VIRTUAL_SCROLL_CONFIG: Omit<VirtualScrollConfig, 'itemHeight' | 'containerHeight'> = {
  overscan: 5,
  scrollToAlignment: 'auto',
} as const;

// =============================================================================
// EASING FUNCTIONS
// =============================================================================

export const EASING_FUNCTIONS = {
  linear: (t: number) => t,
  'ease-in': (t: number) => t * t,
  'ease-out': (t: number) => t * (2 - t),
  'ease-in-out': (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
} as const;

// =============================================================================
// SCROLL UTILITIES
// =============================================================================

/**
 * Get scroll position with metadata
 */
const getScrollPosition = (element: HTMLElement | Window): ScrollPosition => {
  const isWindow = element === window;
  const scrollElement = isWindow ? document.documentElement : element as HTMLElement;
  
  const scrollLeft = isWindow ? window.pageXOffset : scrollElement.scrollLeft;
  const scrollTop = isWindow ? window.pageYOffset : scrollElement.scrollTop;
  
  const scrollWidth = scrollElement.scrollWidth;
  const scrollHeight = scrollElement.scrollHeight;
  const clientWidth = isWindow ? window.innerWidth : scrollElement.clientWidth;
  const clientHeight = isWindow ? window.innerHeight : scrollElement.clientHeight;
  
  const maxScrollLeft = scrollWidth - clientWidth;
  const maxScrollTop = scrollHeight - clientHeight;
  
  return {
    x: scrollLeft,
    y: scrollTop,
    direction: {
      horizontal: 'none', // Will be updated by tracking
      vertical: 'none',   // Will be updated by tracking
    },
    velocity: {
      x: 0, // Will be calculated by tracking
      y: 0, // Will be calculated by tracking
    },
    isAtTop: scrollTop <= 0,
    isAtBottom: scrollTop >= maxScrollTop - 1,
    isAtLeft: scrollLeft <= 0,
    isAtRight: scrollLeft >= maxScrollLeft - 1,
    percentage: {
      x: maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * 100 : 0,
      y: maxScrollTop > 0 ? (scrollTop / maxScrollTop) * 100 : 0,
    },
  };
};

/**
 * Smooth scroll to target
 */
const smoothScrollTo = (
  element: HTMLElement | Window,
  target: ScrollTarget,
  config: SmoothScrollConfig
): Promise<void> => {
  return new Promise((resolve) => {
    const isWindow = element === window;
    const scrollElement = isWindow ? document.documentElement : element as HTMLElement;
    
    // Calculate target position
    let targetX = target.x ?? (isWindow ? window.pageXOffset : scrollElement.scrollLeft);
    let targetY = target.y ?? (isWindow ? window.pageYOffset : scrollElement.scrollTop);
    
    if (target.element) {
      const elementRect = target.element.getBoundingClientRect();
      const containerRect = isWindow 
        ? { top: 0, left: 0 } 
        : scrollElement.getBoundingClientRect();
      
      targetX = elementRect.left - containerRect.left + (isWindow ? window.pageXOffset : scrollElement.scrollLeft);
      targetY = elementRect.top - containerRect.top + (isWindow ? window.pageYOffset : scrollElement.scrollTop);
    } else if (target.selector) {
      const targetElement = document.querySelector(target.selector) as HTMLElement;
      if (targetElement) {
        const elementRect = targetElement.getBoundingClientRect();
        const containerRect = isWindow 
          ? { top: 0, left: 0 } 
          : scrollElement.getBoundingClientRect();
        
        targetX = elementRect.left - containerRect.left + (isWindow ? window.pageXOffset : scrollElement.scrollLeft);
        targetY = elementRect.top - containerRect.top + (isWindow ? window.pageYOffset : scrollElement.scrollTop);
      }
    }
    
    // Apply offset
    targetX += config.offset.x;
    targetY += config.offset.y;
    
    // Get current position
    const startX = isWindow ? window.pageXOffset : scrollElement.scrollLeft;
    const startY = isWindow ? window.pageYOffset : scrollElement.scrollTop;
    
    const distanceX = targetX - startX;
    const distanceY = targetY - startY;
    
    const startTime = performance.now();
    const easingFunction = config.easing === 'custom' && config.customEasing 
      ? config.customEasing 
      : EASING_FUNCTIONS[config.easing as keyof typeof EASING_FUNCTIONS];
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / config.duration, 1);
      const easedProgress = easingFunction(progress);
      
      const currentX = startX + distanceX * easedProgress;
      const currentY = startY + distanceY * easedProgress;
      
      if (isWindow) {
        window.scrollTo(currentX, currentY);
      } else {
        scrollElement.scrollLeft = currentX;
        scrollElement.scrollTop = currentY;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    };
    
    requestAnimationFrame(animate);
  });
};

/**
 * Lock scroll on body/element
 */
const lockScroll = (config: ScrollLockConfig = DEFAULT_SCROLL_LOCK_CONFIG): (() => void) => {
  if (typeof document === 'undefined') return () => {};
  
  const body = document.body;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  
  // Store original styles
  const originalStyles = {
    overflow: body.style.overflow,
    paddingRight: body.style.paddingRight,
  };
  
  // Apply scroll lock
  body.style.overflow = 'hidden';
  
  if (config.reserveScrollBarGap && scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }
  
  // Prevent touch scrolling on mobile
  const preventTouchMove = (e: TouchEvent) => {
    if (!config.allowTouchMove && config.preventTouchMoveDefault) {
      e.preventDefault();
    }
  };
  
  if (config.preventTouchMoveDefault) {
    document.addEventListener('touchmove', preventTouchMove, { passive: false });
  }
  
  // Return unlock function
  return () => {
    body.style.overflow = originalStyles.overflow;
    body.style.paddingRight = originalStyles.paddingRight;
    
    if (config.preventTouchMoveDefault) {
      document.removeEventListener('touchmove', preventTouchMove);
    }
  };
};

/**
 * Calculate virtual scroll items
 */
const calculateVirtualItems = (
  scrollTop: number,
  config: VirtualScrollConfig,
  totalItems: number
): {
  startIndex: number;
  endIndex: number;
  offsetY: number;
  visibleItems: number;
} => {
  const { itemHeight, containerHeight, overscan } = config;
  
  // Handle dynamic item height
  if (typeof itemHeight === 'function') {
    // For dynamic heights, we need to calculate positions
    let currentHeight = 0;
    let startIndex = 0;
    let endIndex = 0;
    
    // Find start index
    for (let i = 0; i < totalItems; i++) {
      const height = itemHeight(i);
      if (currentHeight + height > scrollTop) {
        startIndex = Math.max(0, i - overscan);
        break;
      }
      currentHeight += height;
    }
    
    // Find end index
    let visibleHeight = 0;
    for (let i = startIndex; i < totalItems; i++) {
      const height = itemHeight(i);
      visibleHeight += height;
      if (visibleHeight >= containerHeight) {
        endIndex = Math.min(totalItems - 1, i + overscan);
        break;
      }
    }
    
    // Calculate offset
    let offsetY = 0;
    for (let i = 0; i < startIndex; i++) {
      offsetY += itemHeight(i);
    }
    
    return {
      startIndex,
      endIndex,
      offsetY,
      visibleItems: endIndex - startIndex + 1,
    };
  } else {
    // Fixed item height
    const visibleItems = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(totalItems - 1, startIndex + visibleItems + overscan * 2);
    const offsetY = startIndex * itemHeight;
    
    return {
      startIndex,
      endIndex,
      offsetY,
      visibleItems: endIndex - startIndex + 1,
    };
  }
};

// =============================================================================
// SCROLL MANAGEMENT HOOKS
// =============================================================================

/**
 * Hook for tracking scroll position
 */
export const useScrollPosition = (
  elementRef?: React.RefObject<HTMLElement>
): ScrollPosition => {
  const [position, setPosition] = useState<ScrollPosition>(() => 
    getScrollPosition(window)
  );
  
  const previousPosition = useRef<ScrollPosition>(position);
  const previousTime = useRef<number>(performance.now());

  useEffect(() => {
    const element = elementRef?.current || window;
    
    const updatePosition = () => {
      const currentTime = performance.now();
      const currentPosition = getScrollPosition(element);
      const timeDelta = currentTime - previousTime.current;
      
      if (timeDelta > 0) {
        const velocityX = (currentPosition.x - previousPosition.current.x) / timeDelta;
        const velocityY = (currentPosition.y - previousPosition.current.y) / timeDelta;
        
        const directionX = currentPosition.x > previousPosition.current.x ? 'right' :
                          currentPosition.x < previousPosition.current.x ? 'left' : 'none';
        const directionY = currentPosition.y > previousPosition.current.y ? 'down' :
                          currentPosition.y < previousPosition.current.y ? 'up' : 'none';
        
        const enhancedPosition: ScrollPosition = {
          ...currentPosition,
          direction: { horizontal: directionX, vertical: directionY },
          velocity: { x: velocityX, y: velocityY },
        };
        
        setPosition(enhancedPosition);
        previousPosition.current = enhancedPosition;
        previousTime.current = currentTime;
      }
    };
    
    updatePosition(); // Initial position
    
    const handleScroll = () => {
      requestAnimationFrame(updatePosition);
    };
    
    if (element === window) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      (element as HTMLElement).addEventListener('scroll', handleScroll, { passive: true });
    }
    
    return () => {
      if (element === window) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        (element as HTMLElement).removeEventListener('scroll', handleScroll);
      }
    };
  }, [elementRef]);

  return position;
};

/**
 * Hook for smooth scrolling
 */
export const useSmoothScroll = (
  elementRef?: React.RefObject<HTMLElement>,
  config: Partial<SmoothScrollConfig> = {}
): {
  scrollTo: (target: ScrollTarget) => Promise<void>;
  scrollToTop: () => Promise<void>;
  scrollToBottom: () => Promise<void>;
  isScrolling: boolean;
} => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  
  const finalConfig = useMemo(() => ({
    ...DEFAULT_SMOOTH_SCROLL_CONFIG,
    ...config,
  }), [config]);

  const scrollTo = useCallback(async (target: ScrollTarget) => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    
    const element = elementRef?.current || window;
    
    try {
      await smoothScrollTo(element, target, finalConfig);
    } finally {
      setIsScrolling(false);
    }
  }, [elementRef, finalConfig, isScrolling]);

  const scrollToTop = useCallback(() => {
    return scrollTo({ x: 0, y: 0 });
  }, [scrollTo]);

  const scrollToBottom = useCallback(() => {
    const element = elementRef?.current || window;
    const isWindow = element === window;
    const scrollElement = isWindow ? document.documentElement : element as HTMLElement;
    const maxScrollTop = scrollElement.scrollHeight - (isWindow ? window.innerHeight : scrollElement.clientHeight);
    
    return scrollTo({ x: 0, y: maxScrollTop });
  }, [elementRef, scrollTo]);

  return {
    scrollTo,
    scrollToTop,
    scrollToBottom,
    isScrolling,
  };
};

/**
 * Hook for scroll locking
 */
export const useScrollLock = (
  enabled: boolean = false,
  config: Partial<ScrollLockConfig> = {}
): {
  lock: () => void;
  unlock: () => void;
  isLocked: boolean;
} => {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const unlockRef = useRef<(() => void) | null>(null);
  
  const finalConfig = useMemo(() => ({
    ...DEFAULT_SCROLL_LOCK_CONFIG,
    ...config,
  }), [config]);

  const lock = useCallback(() => {
    if (isLocked || typeof document === 'undefined') return;
    
    const unlock = lockScroll(finalConfig);
    unlockRef.current = unlock;
    setIsLocked(true);
  }, [isLocked, finalConfig]);

  const unlock = useCallback(() => {
    if (!isLocked || !unlockRef.current) return;
    
    unlockRef.current();
    unlockRef.current = null;
    setIsLocked(false);
  }, [isLocked]);

  useEffect(() => {
    if (enabled) {
      lock();
    } else {
      unlock();
    }
    
    return () => {
      unlock();
    };
  }, [enabled, lock, unlock]);

  return { lock, unlock, isLocked };
};

/**
 * Hook for virtual scrolling
 */
export const useVirtualScroll = <T>(
  items: T[],
  config: VirtualScrollConfig
): {
  containerProps: React.HTMLProps<HTMLDivElement>;
  visibleItems: { index: number; item: T }[];
  scrollToItem: (index: number, alignment?: VirtualScrollConfig['scrollToAlignment']) => void;
  totalHeight: number;
} => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const virtualItems = useMemo(() => {
    return calculateVirtualItems(scrollTop, config, items.length);
  }, [scrollTop, config, items.length]);

  const visibleItems = useMemo(() => {
    return Array.from(
      { length: virtualItems.endIndex - virtualItems.startIndex + 1 },
      (_, i) => ({
        index: virtualItems.startIndex + i,
        item: items[virtualItems.startIndex + i],
      })
    ).filter(item => item.item !== undefined);
  }, [items, virtualItems]);

  const totalHeight = useMemo(() => {
    if (typeof config.itemHeight === 'function') {
      return items.reduce((total, _, index) => total + config.itemHeight(index), 0);
    }
    return items.length * config.itemHeight;
  }, [items, config.itemHeight]);

  const scrollToItem = useCallback((
    index: number, 
    alignment: VirtualScrollConfig['scrollToAlignment'] = config.scrollToAlignment
  ) => {
    if (!containerRef.current) return;
    
    const itemHeight = typeof config.itemHeight === 'function' 
      ? config.itemHeight(index)
      : config.itemHeight;
    
    let scrollTop = 0;
    
    if (typeof config.itemHeight === 'function') {
      for (let i = 0; i < index; i++) {
        scrollTop += config.itemHeight(i);
      }
    } else {
      scrollTop = index * itemHeight;
    }
    
    switch (alignment) {
      case 'start':
        // No adjustment needed
        break;
      case 'center':
        scrollTop -= (config.containerHeight - itemHeight) / 2;
        break;
      case 'end':
        scrollTop -= config.containerHeight - itemHeight;
        break;
      case 'auto':
        // Scroll only if item is not visible
        const currentScrollTop = containerRef.current.scrollTop;
        const itemTop = scrollTop;
        const itemBottom = scrollTop + itemHeight;
        const containerTop = currentScrollTop;
        const containerBottom = currentScrollTop + config.containerHeight;
        
        if (itemTop < containerTop) {
          // Item is above visible area
          scrollTop = itemTop;
        } else if (itemBottom > containerBottom) {
          // Item is below visible area
          scrollTop = itemBottom - config.containerHeight;
        } else {
          // Item is already visible
          return;
        }
        break;
    }
    
    containerRef.current.scrollTop = Math.max(0, scrollTop);
  }, [config]);

  const containerProps: React.HTMLProps<HTMLDivElement> = {
    ref: containerRef,
    style: {
      height: config.containerHeight,
      overflow: 'auto',
    },
    onScroll: (e) => {
      setScrollTop((e.target as HTMLDivElement).scrollTop);
    },
  };

  return {
    containerProps,
    visibleItems,
    scrollToItem,
    totalHeight,
  };
};

/**
 * Hook for infinite scrolling
 */
export const useInfiniteScroll = (
  config: InfiniteScrollConfig,
  elementRef?: React.RefObject<HTMLElement>
): {
  triggerRef: React.RefObject<HTMLDivElement>;
} => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const { threshold, hasMore, loading, onLoadMore } = config;

  useEffect(() => {
    if (!hasMore || loading) return;

    const trigger = triggerRef.current;
    const container = elementRef?.current || window;
    
    if (!trigger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: container === window ? null : container,
        rootMargin: `${threshold}px`,
        threshold: 0,
      }
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading, threshold, onLoadMore, elementRef]);

  return { triggerRef };
};

// =============================================================================
// SCROLL MANAGEMENT COMPONENTS
// =============================================================================

/**
 * Virtual scroll container component
 */
export const VirtualScrollContainer: React.FC<{
  items: any[];
  itemHeight: number | ((index: number) => number);
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  className?: string;
  overscan?: number;
}> = ({ 
  items, 
  itemHeight, 
  containerHeight, 
  renderItem, 
  className, 
  overscan = 5 
}) => {
  const { containerProps, visibleItems, totalHeight } = useVirtualScroll(
    items,
    { itemHeight, containerHeight, overscan, scrollToAlignment: 'auto' }
  );

  return (
    <div {...containerProps} className={className}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ item, index }) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: typeof itemHeight === 'function' 
                ? visibleItems.slice(0, visibleItems.findIndex(vi => vi.index === index))
                    .reduce((sum, vi) => sum + itemHeight(vi.index), 0)
                : index * itemHeight,
              width: '100%',
              height: typeof itemHeight === 'function' ? itemHeight(index) : itemHeight,
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Infinite scroll container component
 */
export const InfiniteScrollContainer: React.FC<{
  children: React.ReactNode;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void | Promise<void>;
  threshold?: number;
  loadingComponent?: React.ReactNode;
  className?: string;
}> = ({ 
  children, 
  hasMore, 
  loading, 
  onLoadMore, 
  threshold = 100,
  loadingComponent,
  className 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { triggerRef } = useInfiniteScroll(
    { hasMore, loading, onLoadMore, threshold },
    containerRef
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
      {hasMore && (
        <div ref={triggerRef}>
          {loading && loadingComponent}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export {
  getScrollPosition,
  smoothScrollTo,
  lockScroll,
  calculateVirtualItems,
  EASING_FUNCTIONS,
};