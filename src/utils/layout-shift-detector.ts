/**
 * @fileoverview Layout Shift Detector v5.0.0 - Token-Based Design System
 * @description Advanced Cumulative Layout Shift (CLS) detection and prevention system
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';

// =============================================================================
// LAYOUT SHIFT DETECTION TYPES
// =============================================================================

export interface LayoutShiftEntry {
  readonly timestamp: number;
  readonly value: number; // Layout shift score
  readonly sources: LayoutShiftSource[];
  readonly hadRecentInput: boolean;
  readonly lastInputTime: number;
  readonly windowWidth: number;
  readonly windowHeight: number;
  readonly url: string;
}

export interface LayoutShiftSource {
  readonly node: string; // CSS selector or node description
  readonly previousRect: DOMRectReadOnly;
  readonly currentRect: DOMRectReadOnly;
  readonly impactFraction: number;
  readonly distanceFraction: number;
}

export interface CLSMetrics {
  readonly currentCLS: number;
  readonly maxSessionWindow: number;
  readonly sessionWindows: SessionWindow[];
  readonly totalShifts: number;
  readonly shiftsWithoutInput: number;
  readonly largestShift: LayoutShiftEntry | null;
}

export interface SessionWindow {
  readonly startTime: number;
  readonly endTime: number;
  readonly value: number;
  readonly entries: LayoutShiftEntry[];
}

export interface LayoutShiftPrevention {
  readonly reserveSpace: boolean;
  readonly dimensions: { width?: string; height?: string };
  readonly aspectRatio?: string;
  readonly placeholder?: boolean;
  readonly skeleton?: boolean;
}

export interface LayoutShiftConfig {
  readonly enabled: boolean;
  readonly trackCLS: boolean;
  readonly sessionWindowGap: number; // Max gap between entries in a session (ms)
  readonly maxSessionDuration: number; // Max session duration (ms)
  readonly inputDelay: number; // Time window after input to ignore shifts (ms)
  readonly thresholds: {
    readonly good: number;
    readonly needsImprovement: number;
    readonly poor: number;
  };
  readonly onShiftDetected?: (entry: LayoutShiftEntry) => void;
  readonly onCLSUpdate?: (cls: number) => void;
}

export interface ElementObservation {
  readonly element: Element;
  readonly selector: string;
  readonly initialRect: DOMRectReadOnly;
  readonly prevention: LayoutShiftPrevention;
}

// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================

export const DEFAULT_SHIFT_CONFIG: LayoutShiftConfig = {
  enabled: process.env.NODE_ENV === 'development',
  trackCLS: true,
  sessionWindowGap: 1000, // 1 second
  maxSessionDuration: 5000, // 5 seconds
  inputDelay: 500, // 500ms after input
  thresholds: {
    good: 0.1,
    needsImprovement: 0.25,
    poor: Infinity,
  },
} as const;

// =============================================================================
// LAYOUT SHIFT DETECTION UTILITIES
// =============================================================================

/**
 * Create element selector for identification
 */
const createElementSelector = (element: Element): string => {
  if (element.id) {
    return `#${element.id}`;
  }
  
  if (element.className) {
    const classes = element.className.split(' ').filter(Boolean);
    if (classes.length > 0) {
      return `.${classes.join('.')}`;
    }
  }
  
  const tagName = element.tagName.toLowerCase();
  const parent = element.parentElement;
  
  if (parent) {
    const siblings = Array.from(parent.children);
    const index = siblings.indexOf(element);
    return `${createElementSelector(parent)} > ${tagName}:nth-child(${index + 1})`;
  }
  
  return tagName;
};

/**
 * Calculate layout shift score
 */
const calculateShiftScore = (
  impactFraction: number,
  distanceFraction: number
): number => {
  return impactFraction * distanceFraction;
};

/**
 * Check if shift occurred after recent input
 */
const hadRecentInput = (shiftTime: number, lastInputTime: number, inputDelay: number): boolean => {
  return shiftTime - lastInputTime < inputDelay;
};

/**
 * Group layout shift entries into session windows
 */
const groupIntoSessionWindows = (
  entries: LayoutShiftEntry[],
  sessionWindowGap: number,
  maxSessionDuration: number
): SessionWindow[] => {
  if (entries.length === 0) return [];

  const sessionWindows: SessionWindow[] = [];
  let currentWindow: LayoutShiftEntry[] = [];
  let windowStartTime = entries[0].timestamp;

  for (const entry of entries) {
    const timeSinceWindowStart = entry.timestamp - windowStartTime;
    const timeSinceLastEntry = currentWindow.length > 0 
      ? entry.timestamp - currentWindow[currentWindow.length - 1].timestamp 
      : 0;

    // Start new session window if gap is too large or duration exceeded
    if (timeSinceLastEntry > sessionWindowGap || timeSinceWindowStart > maxSessionDuration) {
      if (currentWindow.length > 0) {
        const windowValue = currentWindow.reduce((sum, e) => sum + e.value, 0);
        sessionWindows.push({
          startTime: windowStartTime,
          endTime: currentWindow[currentWindow.length - 1].timestamp,
          value: windowValue,
          entries: [...currentWindow],
        });
      }
      
      currentWindow = [entry];
      windowStartTime = entry.timestamp;
    } else {
      currentWindow.push(entry);
    }
  }

  // Add final window
  if (currentWindow.length > 0) {
    const windowValue = currentWindow.reduce((sum, e) => sum + e.value, 0);
    sessionWindows.push({
      startTime: windowStartTime,
      endTime: currentWindow[currentWindow.length - 1].timestamp,
      value: windowValue,
      entries: [...currentWindow],
    });
  }

  return sessionWindows;
};

/**
 * Calculate CLS from session windows
 */
const calculateCLS = (sessionWindows: SessionWindow[]): number => {
  if (sessionWindows.length === 0) return 0;
  
  // CLS is the maximum session window value
  return Math.max(...sessionWindows.map(window => window.value));
};

// =============================================================================
// LAYOUT SHIFT PREVENTION UTILITIES
// =============================================================================

/**
 * Generate space reservation styles
 */
const generateSpaceReservationStyles = (prevention: LayoutShiftPrevention): React.CSSProperties => {
  const styles: React.CSSProperties = {};

  if (prevention.dimensions.width) {
    styles.width = prevention.dimensions.width;
  }

  if (prevention.dimensions.height) {
    styles.height = prevention.dimensions.height;
  }

  if (prevention.aspectRatio) {
    styles.aspectRatio = prevention.aspectRatio;
  }

  if (prevention.placeholder) {
    styles.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    styles.borderRadius = '4px';
  }

  return styles;
};

/**
 * Create skeleton loading styles
 */
const generateSkeletonStyles = (): React.CSSProperties => {
  return {
    background: 'linear-gradient(90deg, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.1) 75%)',
    backgroundSize: '200% 100%',
    animation: 'skeleton-loading 1.5s infinite',
  };
};

// =============================================================================
// LAYOUT SHIFT DETECTION HOOKS
// =============================================================================

/**
 * Main layout shift detection hook
 */
export const useLayoutShiftDetector = (
  config: Partial<LayoutShiftConfig> = {}
): {
  clsMetrics: CLSMetrics;
  isTracking: boolean;
  startTracking: () => void;
  stopTracking: () => void;
  resetMetrics: () => void;
} => {
  const [clsMetrics, setCLSMetrics] = useState<CLSMetrics>({
    currentCLS: 0,
    maxSessionWindow: 0,
    sessionWindows: [],
    totalShifts: 0,
    shiftsWithoutInput: 0,
    largestShift: null,
  });
  
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [entries, setEntries] = useState<LayoutShiftEntry[]>([]);
  const lastInputTimeRef = useRef<number>(0);
  const observerRef = useRef<PerformanceObserver | null>(null);

  const finalConfig = useMemo(() => ({
    ...DEFAULT_SHIFT_CONFIG,
    ...config,
  }), [config]);

  // Track user input
  useEffect(() => {
    if (!finalConfig.enabled || typeof window === 'undefined') return;

    const handleInput = () => {
      lastInputTimeRef.current = performance.now();
    };

    const events = ['mousedown', 'keydown', 'touchstart', 'pointerdown'];
    events.forEach(event => {
      document.addEventListener(event, handleInput, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInput);
      });
    };
  }, [finalConfig.enabled]);

  const processLayoutShiftEntries = useCallback((performanceEntries: PerformanceEntry[]) => {
    const newEntries: LayoutShiftEntry[] = [];

    performanceEntries.forEach((entry: any) => {
      if (entry.entryType === 'layout-shift') {
        const shiftEntry: LayoutShiftEntry = {
          timestamp: entry.startTime,
          value: entry.value,
          sources: entry.sources?.map((source: any) => ({
            node: source.node ? createElementSelector(source.node) : 'unknown',
            previousRect: source.previousRect,
            currentRect: source.currentRect,
            impactFraction: source.impactFraction || 0,
            distanceFraction: source.distanceFraction || 0,
          })) || [],
          hadRecentInput: hadRecentInput(
            entry.startTime,
            lastInputTimeRef.current,
            finalConfig.inputDelay
          ),
          lastInputTime: lastInputTimeRef.current,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          url: window.location.href,
        };

        newEntries.push(shiftEntry);

        // Call callback if provided
        if (finalConfig.onShiftDetected) {
          finalConfig.onShiftDetected(shiftEntry);
        }
      }
    });

    if (newEntries.length > 0) {
      setEntries(prev => {
        const allEntries = [...prev, ...newEntries];
        
        // Calculate session windows
        const sessionWindows = groupIntoSessionWindows(
          allEntries,
          finalConfig.sessionWindowGap,
          finalConfig.maxSessionDuration
        );

        // Calculate CLS
        const currentCLS = calculateCLS(sessionWindows);
        const maxSessionWindow = sessionWindows.length > 0 
          ? Math.max(...sessionWindows.map(w => w.value))
          : 0;

        // Find largest shift
        const largestShift = allEntries.reduce((largest, entry) => 
          !largest || entry.value > largest.value ? entry : largest
        , null as LayoutShiftEntry | null);

        // Update metrics
        const newMetrics: CLSMetrics = {
          currentCLS,
          maxSessionWindow,
          sessionWindows,
          totalShifts: allEntries.length,
          shiftsWithoutInput: allEntries.filter(e => !e.hadRecentInput).length,
          largestShift,
        };

        setCLSMetrics(newMetrics);

        // Call CLS update callback
        if (finalConfig.onCLSUpdate) {
          finalConfig.onCLSUpdate(currentCLS);
        }

        return allEntries;
      });
    }
  }, [finalConfig]);

  const startTracking = useCallback(() => {
    if (isTracking || !finalConfig.enabled || typeof window === 'undefined') return;
    if (!('PerformanceObserver' in window)) return;

    try {
      observerRef.current = new PerformanceObserver((list) => {
        processLayoutShiftEntries(list.getEntries());
      });

      observerRef.current.observe({ entryTypes: ['layout-shift'] });
      setIsTracking(true);
    } catch (error) {
      console.warn('Failed to start layout shift tracking:', error);
    }
  }, [isTracking, finalConfig.enabled, processLayoutShiftEntries]);

  const stopTracking = useCallback(() => {
    if (!isTracking || !observerRef.current) return;

    observerRef.current.disconnect();
    observerRef.current = null;
    setIsTracking(false);
  }, [isTracking]);

  const resetMetrics = useCallback(() => {
    setEntries([]);
    setCLSMetrics({
      currentCLS: 0,
      maxSessionWindow: 0,
      sessionWindows: [],
      totalShifts: 0,
      shiftsWithoutInput: 0,
      largestShift: null,
    });
  }, []);

  // Auto-start tracking if enabled
  useEffect(() => {
    if (finalConfig.enabled && finalConfig.trackCLS) {
      startTracking();
    }

    return () => {
      stopTracking();
    };
  }, [finalConfig.enabled, finalConfig.trackCLS, startTracking, stopTracking]);

  return {
    clsMetrics,
    isTracking,
    startTracking,
    stopTracking,
    resetMetrics,
  };
};

/**
 * Hook for preventing layout shifts
 */
export const useLayoutShiftPrevention = (
  prevention: LayoutShiftPrevention
): {
  styles: React.CSSProperties;
  shouldShowPlaceholder: boolean;
} => {
  const styles = useMemo(() => {
    let baseStyles = generateSpaceReservationStyles(prevention);
    
    if (prevention.skeleton) {
      baseStyles = { ...baseStyles, ...generateSkeletonStyles() };
    }
    
    return baseStyles;
  }, [prevention]);

  const shouldShowPlaceholder = useMemo(() => {
    return Boolean(prevention.placeholder || prevention.skeleton);
  }, [prevention.placeholder, prevention.skeleton]);

  return { styles, shouldShowPlaceholder };
};

/**
 * Hook for observing element layout shifts
 */
export const useElementShiftObserver = (
  elementRef: React.RefObject<HTMLElement>,
  prevention?: LayoutShiftPrevention
) => {
  const [isObserving, setIsObserving] = useState<boolean>(false);
  const [shiftCount, setShiftCount] = useState<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const startObserving = useCallback(() => {
    if (!elementRef.current || isObserving) return;

    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Element is visible, track any shifts
              setShiftCount(prev => prev + 1);
            }
          });
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(elementRef.current);
      setIsObserving(true);
    }
  }, [elementRef, isObserving]);

  const stopObserving = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
      setIsObserving(false);
    }
  }, []);

  useEffect(() => {
    startObserving();
    return stopObserving;
  }, [startObserving, stopObserving]);

  return {
    isObserving,
    shiftCount,
    startObserving,
    stopObserving,
  };
};

// =============================================================================
// LAYOUT SHIFT DETECTOR CLASS
// =============================================================================

/**
 * Layout Shift Detector utility class
 */
export class LayoutShiftDetector {
  private config: LayoutShiftConfig;
  private isTracking: boolean = false;
  private entries: LayoutShiftEntry[] = [];
  private observer: PerformanceObserver | null = null;
  private lastInputTime: number = 0;

  constructor(config: Partial<LayoutShiftConfig> = {}) {
    this.config = { ...DEFAULT_SHIFT_CONFIG, ...config };
    this.setupInputTracking();
  }

  /**
   * Start tracking layout shifts
   */
  startTracking(): void {
    if (this.isTracking || !this.config.enabled) return;
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      this.observer = new PerformanceObserver((list) => {
        this.processEntries(list.getEntries());
      });

      this.observer.observe({ entryTypes: ['layout-shift'] });
      this.isTracking = true;
    } catch (error) {
      console.warn('Failed to start layout shift tracking:', error);
    }
  }

  /**
   * Stop tracking
   */
  stopTracking(): void {
    if (!this.isTracking || !this.observer) return;

    this.observer.disconnect();
    this.observer = null;
    this.isTracking = false;
  }

  /**
   * Get current CLS metrics
   */
  getCLSMetrics(): CLSMetrics {
    const sessionWindows = groupIntoSessionWindows(
      this.entries,
      this.config.sessionWindowGap,
      this.config.maxSessionDuration
    );

    const currentCLS = calculateCLS(sessionWindows);
    const maxSessionWindow = sessionWindows.length > 0 
      ? Math.max(...sessionWindows.map(w => w.value))
      : 0;

    const largestShift = this.entries.reduce((largest, entry) => 
      !largest || entry.value > largest.value ? entry : largest
    , null as LayoutShiftEntry | null);

    return {
      currentCLS,
      maxSessionWindow,
      sessionWindows,
      totalShifts: this.entries.length,
      shiftsWithoutInput: this.entries.filter(e => !e.hadRecentInput).length,
      largestShift,
    };
  }

  /**
   * Reset all metrics
   */
  resetMetrics(): void {
    this.entries = [];
  }

  /**
   * Get all entries
   */
  getEntries(): LayoutShiftEntry[] {
    return [...this.entries];
  }

  private setupInputTracking(): void {
    if (typeof document === 'undefined') return;

    const handleInput = () => {
      this.lastInputTime = performance.now();
    };

    const events = ['mousedown', 'keydown', 'touchstart', 'pointerdown'];
    events.forEach(event => {
      document.addEventListener(event, handleInput, { passive: true });
    });
  }

  private processEntries(performanceEntries: PerformanceEntry[]): void {
    performanceEntries.forEach((entry: any) => {
      if (entry.entryType === 'layout-shift') {
        const shiftEntry: LayoutShiftEntry = {
          timestamp: entry.startTime,
          value: entry.value,
          sources: entry.sources?.map((source: any) => ({
            node: source.node ? createElementSelector(source.node) : 'unknown',
            previousRect: source.previousRect,
            currentRect: source.currentRect,
            impactFraction: source.impactFraction || 0,
            distanceFraction: source.distanceFraction || 0,
          })) || [],
          hadRecentInput: hadRecentInput(
            entry.startTime,
            this.lastInputTime,
            this.config.inputDelay
          ),
          lastInputTime: this.lastInputTime,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          url: window.location.href,
        };

        this.entries.push(shiftEntry);

        if (this.config.onShiftDetected) {
          this.config.onShiftDetected(shiftEntry);
        }

        if (this.config.onCLSUpdate) {
          const cls = this.getCLSMetrics().currentCLS;
          this.config.onCLSUpdate(cls);
        }
      }
    });
  }
}

// =============================================================================
// LAYOUT SHIFT PREVENTION COMPONENT HELPERS
// =============================================================================

/**
 * Create layout shift prevention props
 */
export const createLayoutShiftPreventionProps = (
  prevention: LayoutShiftPrevention,
  baseProps?: React.HTMLAttributes<HTMLDivElement>
): React.HTMLAttributes<HTMLDivElement> => {
  const styles = generateSpaceReservationStyles(prevention);
  const skeletonStyles = prevention.skeleton ? generateSkeletonStyles() : {};

  return {
    ...baseProps,
    style: {
      ...baseProps?.style,
      ...styles,
      ...skeletonStyles,
    },
    role: 'presentation',
    'aria-hidden': 'true',
    className: `${baseProps?.className || ''} layout-shift-placeholder`.trim(),
  };
};

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export const layoutShiftDetector = new LayoutShiftDetector();

// Export utility functions
export {
  createElementSelector,
  calculateShiftScore,
  hadRecentInput,
  groupIntoSessionWindows,
  calculateCLS,
  generateSpaceReservationStyles,
  generateSkeletonStyles,
};