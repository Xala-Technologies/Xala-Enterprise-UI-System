 
/**
 * @fileoverview Layout Performance Monitor v5.0.0 - Token-Based Design System
 * @description Comprehensive performance monitoring for layout operations and web vitals
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';

// =============================================================================
// PERFORMANCE MONITORING TYPES
// =============================================================================

export interface LayoutPerformanceMetrics {
  // Core Web Vitals
  cls: number; // Cumulative Layout Shift
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  inp: number; // Interaction to Next Paint
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  
  // Layout-specific metrics
  readonly layoutTime: number;
  readonly paintTime: number;
  readonly reflows: number;
  readonly repaints: number;
  readonly domNodes: number;
  readonly cssRules: number;
  
  // Memory metrics
  readonly memoryUsage: {
    readonly used: number;
    readonly total: number;
    readonly limit: number;
  };
  
  // Timing metrics
  readonly renderTime: number;
  readonly hydrationTime: number;
  readonly interactionTime: number;
}

export interface PerformanceEntry {
  readonly timestamp: number;
  readonly type: 'render' | 'interaction' | 'layout' | 'paint' | 'navigation';
  readonly duration: number;
  readonly details: Record<string, any>;
  readonly url: string;
  readonly viewport: {
    readonly width: number;
    readonly height: number;
  };
}

export interface PerformanceThresholds {
  readonly cls: { good: number; needs_improvement: number; poor: number };
  readonly lcp: { good: number; needs_improvement: number; poor: number };
  readonly fid: { good: number; needs_improvement: number; poor: number };
  readonly inp: { good: number; needs_improvement: number; poor: number };
  readonly layoutTime: { good: number; needs_improvement: number; poor: number };
  readonly memoryUsage: { good: number; needs_improvement: number; poor: number };
}

export interface PerformanceReport {
  readonly metrics: LayoutPerformanceMetrics;
  readonly entries: PerformanceEntry[];
  readonly recommendations: PerformanceRecommendation[];
  readonly score: number; // Overall performance score (0-100)
  readonly generatedAt: number;
}

export interface PerformanceRecommendation {
  readonly type: 'critical' | 'warning' | 'info';
  readonly category: 'layout' | 'memory' | 'interaction' | 'loading';
  readonly message: string;
  readonly action: string;
  readonly impact: 'high' | 'medium' | 'low';
}

export interface PerformanceMonitorConfig {
  readonly enabled: boolean;
  readonly collectWebVitals: boolean;
  readonly trackLayoutShifts: boolean;
  readonly trackMemoryUsage: boolean;
  readonly trackInteractions: boolean;
  readonly sampleRate: number; // 0-1, percentage of sessions to monitor
  readonly bufferSize: number; // Maximum number of entries to keep
  readonly reportInterval: number; // Milliseconds between reports
}

// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================

export const DEFAULT_PERFORMANCE_THRESHOLDS: PerformanceThresholds = {
  cls: { good: 0.1, needs_improvement: 0.25, poor: Infinity },
  lcp: { good: 2500, needs_improvement: 4000, poor: Infinity },
  fid: { good: 100, needs_improvement: 300, poor: Infinity },
  inp: { good: 200, needs_improvement: 500, poor: Infinity },
  layoutTime: { good: 16, needs_improvement: 50, poor: Infinity },
  memoryUsage: { good: 50, needs_improvement: 100, poor: Infinity }, // MB
} as const;

export const DEFAULT_MONITOR_CONFIG: PerformanceMonitorConfig = {
  enabled: process.env.NODE_ENV === 'development',
  collectWebVitals: true,
  trackLayoutShifts: true,
  trackMemoryUsage: true,
  trackInteractions: true,
  sampleRate: 1.0,
  bufferSize: 100,
  reportInterval: 30000, // 30 seconds
} as const;

// =============================================================================
// PERFORMANCE MEASUREMENT UTILITIES
// =============================================================================

/**
 * Get current memory usage
 */
const getMemoryUsage = (): LayoutPerformanceMetrics['memoryUsage'] => {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return { used: 0, total: 0, limit: 0 };
  }

  const memory = (performance as any).memory;
  if (!memory) {
    return { used: 0, total: 0, limit: 0 };
  }

  return {
    used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
    total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
    limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024), // MB
  };
};

/**
 * Count DOM nodes and CSS rules
 */
const getDOMMetrics = (): { domNodes: number; cssRules: number } => {
  if (typeof document === 'undefined') {
    return { domNodes: 0, cssRules: 0 };
  }

  const domNodes = document.querySelectorAll('*').length;
  
  let cssRules = 0;
  try {
    for (let i = 0; i < document.styleSheets.length; i++) {
      const styleSheet = document.styleSheets[i];
      if (styleSheet.cssRules) {
        cssRules += styleSheet.cssRules.length;
      }
    }
  } catch (error) {
    // Cross-origin stylesheets may throw errors
    console.warn('Could not access stylesheet rules:', error);
  }

  return { domNodes, cssRules };
};

/**
 * Measure layout performance
 */
const measureLayoutPerformance = (): Promise<Partial<LayoutPerformanceMetrics>> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('performance' in window)) {
      resolve({});
      return;
    }

    const startTime = performance.now();
    
    // Force layout calculation
    requestAnimationFrame(() => {
      const element = document.createElement('div');
      element.style.position = 'absolute';
      element.style.top = '0';
      element.style.left = '0';
      document.body.appendChild(element);
      
      // Trigger layout
      const height = element.offsetHeight;
      
      // Trigger paint
      element.style.backgroundColor = 'red';
      
      requestAnimationFrame(() => {
        document.body.removeChild(element);
        
        const endTime = performance.now();
        const layoutTime = endTime - startTime;
        
        resolve({
          layoutTime,
          paintTime: layoutTime, // Simplified - actual paint time would need more sophisticated measurement
          ...getDOMMetrics(),
          memoryUsage: getMemoryUsage(),
        });
      });
    });
  });
};

/**
 * Collect Web Vitals using Performance Observer API
 */
const collectWebVitals = (): Promise<Partial<LayoutPerformanceMetrics>> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      resolve({});
      return;
    }

    const metrics: Partial<LayoutPerformanceMetrics> = {};
    let observersCreated = 0;
    let observersCompleted = 0;

    const checkComplete = () => {
      observersCompleted++;
      if (observersCompleted >= observersCreated) {
        resolve(metrics);
      }
    };

    // Largest Contentful Paint
    try {
      observersCreated++;
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        if (lastEntry) {
          metrics.lcp = lastEntry.startTime;
        }
        checkComplete();
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      
      // Auto-disconnect after 10 seconds
      setTimeout(() => {
        lcpObserver.disconnect();
        if (observersCompleted < observersCreated) checkComplete();
      }, 10000);
    } catch (error) {
      checkComplete();
    }

    // First Input Delay
    try {
      observersCreated++;
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            metrics.fid = entry.processingStart - entry.startTime;
          }
        });
        checkComplete();
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      
      setTimeout(() => {
        fidObserver.disconnect();
        if (observersCompleted < observersCreated) checkComplete();
      }, 10000);
    } catch (error) {
      checkComplete();
    }

    // Cumulative Layout Shift
    try {
      observersCreated++;
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        metrics.cls = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      
      setTimeout(() => {
        clsObserver.disconnect();
        checkComplete();
      }, 10000);
    } catch (error) {
      checkComplete();
    }

    // Navigation timing
    try {
      observersCreated++;
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0];
        metrics.ttfb = nav.responseStart - nav.requestStart;
        metrics.fcp = nav.loadEventEnd - nav.fetchStart;
      }
      checkComplete();
    } catch (error) {
      checkComplete();
    }

    // If no observers were created, resolve immediately
    if (observersCreated === 0) {
      resolve(metrics);
    }
  });
};

/**
 * Generate performance recommendations
 */
const generateRecommendations = (
  metrics: LayoutPerformanceMetrics,
  thresholds: PerformanceThresholds
): PerformanceRecommendation[] => {
  const recommendations: PerformanceRecommendation[] = [];

  // CLS recommendations
  if (metrics.cls > thresholds.cls.poor) {
    recommendations.push({
      type: 'critical',
      category: 'layout',
      message: `Cumulative Layout Shift (${metrics.cls.toFixed(3)}) is poor`,
      action: 'Specify dimensions for images and embeds, avoid inserting content above existing content',
      impact: 'high',
    });
  } else if (metrics.cls > thresholds.cls.needs_improvement) {
    recommendations.push({
      type: 'warning',
      category: 'layout',
      message: `Cumulative Layout Shift (${metrics.cls.toFixed(3)}) needs improvement`,
      action: 'Reserve space for dynamic content and use CSS transforms for animations',
      impact: 'medium',
    });
  }

  // LCP recommendations
  if (metrics.lcp > thresholds.lcp.poor) {
    recommendations.push({
      type: 'critical',
      category: 'loading',
      message: `Largest Contentful Paint (${Math.round(metrics.lcp)}ms) is poor`,
      action: 'Optimize server response times, eliminate render-blocking resources, optimize critical resource loading',
      impact: 'high',
    });
  } else if (metrics.lcp > thresholds.lcp.needs_improvement) {
    recommendations.push({
      type: 'warning',
      category: 'loading',
      message: `Largest Contentful Paint (${Math.round(metrics.lcp)}ms) needs improvement`,
      action: 'Preload key resources and optimize images',
      impact: 'medium',
    });
  }

  // Memory usage recommendations
  const memoryUsagePercent = (metrics.memoryUsage.used / metrics.memoryUsage.limit) * 100;
  if (memoryUsagePercent > 80) {
    recommendations.push({
      type: 'critical',
      category: 'memory',
      message: `Memory usage is very high (${metrics.memoryUsage.used}MB / ${metrics.memoryUsage.limit}MB)`,
      action: 'Check for memory leaks, reduce DOM size, optimize component re-renders',
      impact: 'high',
    });
  } else if (memoryUsagePercent > 60) {
    recommendations.push({
      type: 'warning',
      category: 'memory',
      message: `Memory usage is elevated (${metrics.memoryUsage.used}MB / ${metrics.memoryUsage.limit}MB)`,
      action: 'Consider component virtualization and lazy loading',
      impact: 'medium',
    });
  }

  // Layout time recommendations
  if (metrics.layoutTime > thresholds.layoutTime.poor) {
    recommendations.push({
      type: 'critical',
      category: 'layout',
      message: `Layout calculation time (${Math.round(metrics.layoutTime)}ms) is too slow`,
      action: 'Reduce DOM complexity, avoid complex CSS selectors, use CSS containment',
      impact: 'high',
    });
  }

  // DOM size recommendations
  if (metrics.domNodes > 5000) {
    recommendations.push({
      type: 'warning',
      category: 'layout',
      message: `DOM has many nodes (${metrics.domNodes})`,
      action: 'Consider component virtualization, lazy loading, and DOM cleanup',
      impact: 'medium',
    });
  }

  return recommendations;
};

/**
 * Calculate overall performance score
 */
const calculatePerformanceScore = (
  metrics: LayoutPerformanceMetrics,
  thresholds: PerformanceThresholds
): number => {
  const scores: number[] = [];

  // CLS score (0-100)
  if (metrics.cls <= thresholds.cls.good) {
    scores.push(100);
  } else if (metrics.cls <= thresholds.cls.needs_improvement) {
    scores.push(70);
  } else {
    scores.push(30);
  }

  // LCP score (0-100)
  if (metrics.lcp <= thresholds.lcp.good) {
    scores.push(100);
  } else if (metrics.lcp <= thresholds.lcp.needs_improvement) {
    scores.push(70);
  } else {
    scores.push(30);
  }

  // Memory score (0-100)
  const memoryUsagePercent = (metrics.memoryUsage.used / metrics.memoryUsage.limit) * 100;
  if (memoryUsagePercent <= 40) {
    scores.push(100);
  } else if (memoryUsagePercent <= 60) {
    scores.push(70);
  } else {
    scores.push(30);
  }

  // Layout time score (0-100)
  if (metrics.layoutTime <= thresholds.layoutTime.good) {
    scores.push(100);
  } else if (metrics.layoutTime <= thresholds.layoutTime.needs_improvement) {
    scores.push(70);
  } else {
    scores.push(30);
  }

  // Calculate weighted average
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
};

// =============================================================================
// PERFORMANCE MONITORING HOOKS
// =============================================================================

/**
 * Hook for monitoring layout performance
 */
export const useLayoutPerformance = (
  config: Partial<PerformanceMonitorConfig> = {}
): {
  metrics: LayoutPerformanceMetrics | null;
  report: PerformanceReport | null;
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  generateReport: () => Promise<PerformanceReport>;
} => {
  const [metrics, setMetrics] = useState<LayoutPerformanceMetrics | null>(null);
  const [report, setReport] = useState<PerformanceReport | null>(null);
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false);
  const [entries, setEntries] = useState<PerformanceEntry[]>([]);
  
  const finalConfig = useMemo(() => ({
    ...DEFAULT_MONITOR_CONFIG,
    ...config,
  }), [config]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const collectMetrics = useCallback(async (): Promise<LayoutPerformanceMetrics> => {
    const startTime = performance.now();
    
    // Collect all metrics
    const [webVitals, layoutMetrics] = await Promise.all([
      finalConfig.collectWebVitals ? collectWebVitals() : Promise.resolve({}),
      measureLayoutPerformance(),
    ]);

    const endTime = performance.now();

    // Combine all metrics
    const combinedMetrics: LayoutPerformanceMetrics = {
      cls: 0,
      lcp: 0,
      fid: 0,
      inp: 0,
      fcp: 0,
      ttfb: 0,
      layoutTime: 0,
      paintTime: 0,
      reflows: 0,
      repaints: 0,
      domNodes: 0,
      cssRules: 0,
      memoryUsage: { used: 0, total: 0, limit: 0 },
      renderTime: endTime - startTime,
      hydrationTime: 0,
      interactionTime: 0,
      ...webVitals,
      ...layoutMetrics,
    };

    return combinedMetrics;
  }, [finalConfig.collectWebVitals]);

  const generateReport = useCallback(async (): Promise<PerformanceReport> => {
    const currentMetrics = await collectMetrics();
    const recommendations = generateRecommendations(currentMetrics, DEFAULT_PERFORMANCE_THRESHOLDS);
    const score = calculatePerformanceScore(currentMetrics, DEFAULT_PERFORMANCE_THRESHOLDS);

    const newReport: PerformanceReport = {
      metrics: currentMetrics,
      entries: [...entries],
      recommendations,
      score,
      generatedAt: Date.now(),
    };

    setReport(newReport);
    return newReport;
  }, [collectMetrics, entries]);

  const startMonitoring = useCallback(() => {
    if (isMonitoring || !finalConfig.enabled) return;

    // Check sample rate
    if (Math.random() > finalConfig.sampleRate) return;

    setIsMonitoring(true);

    // Initial metrics collection
    collectMetrics().then(setMetrics);

    // Set up periodic collection
    intervalRef.current = setInterval(async () => {
      const currentMetrics = await collectMetrics();
      setMetrics(currentMetrics);

      // Add performance entry
      const entry: PerformanceEntry = {
        timestamp: Date.now(),
        type: 'layout',
        duration: currentMetrics.layoutTime,
        details: currentMetrics,
        url: typeof window !== 'undefined' ? window.location.href : '',
        viewport: {
          width: typeof window !== 'undefined' ? window.innerWidth : 0,
          height: typeof window !== 'undefined' ? window.innerHeight : 0,
        },
      };

      setEntries(prev => {
        const newEntries = [...prev, entry];
        // Keep only recent entries within buffer size
        return newEntries.slice(-finalConfig.bufferSize);
      });
    }, finalConfig.reportInterval);
  }, [isMonitoring, finalConfig, collectMetrics]);

  const stopMonitoring = useCallback(() => {
    if (!isMonitoring) return;

    setIsMonitoring(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isMonitoring]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    metrics,
    report,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    generateReport,
  };
};

/**
 * Hook for tracking specific performance events
 */
export const usePerformanceTracker = () => {
  const addEntry = useCallback((
    type: PerformanceEntry['type'],
    duration: number,
    details: Record<string, any> = {}
  ) => {
    const entry: PerformanceEntry = {
      timestamp: Date.now(),
      type,
      duration,
      details,
      url: typeof window !== 'undefined' ? window.location.href : '',
      viewport: {
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
      },
    };

    // Store in performance buffer or send to analytics
    console.info('Performance Entry:', entry);
  }, []);

  const trackRender = useCallback((componentName: string, renderTime: number) => {
    addEntry('render', renderTime, { componentName });
  }, [addEntry]);

  const trackInteraction = useCallback((interactionType: string, duration: number) => {
    addEntry('interaction', duration, { interactionType });
  }, [addEntry]);

  const trackLayout = useCallback((layoutOperation: string, duration: number) => {
    addEntry('layout', duration, { layoutOperation });
  }, [addEntry]);

  return {
    addEntry,
    trackRender,
    trackInteraction,
    trackLayout,
  };
};

// =============================================================================
// PERFORMANCE MONITOR CLASS
// =============================================================================

/**
 * Performance Monitor utility class
 */
export class LayoutPerformanceMonitor {
  private config: PerformanceMonitorConfig;
  private isMonitoring: boolean = false;
  private entries: PerformanceEntry[] = [];
  private intervalId: NodeJS.Timeout | null = null;

  constructor(config: Partial<PerformanceMonitorConfig> = {}) {
    this.config = { ...DEFAULT_MONITOR_CONFIG, ...config };
  }

  /**
   * Start monitoring performance
   */
  async startMonitoring(): Promise<void> {
    if (this.isMonitoring || !this.config.enabled) return;

    // Check sample rate
    if (Math.random() > this.config.sampleRate) return;

    this.isMonitoring = true;

    // Set up periodic collection
    this.intervalId = setInterval(async () => {
      const metrics = await this.collectMetrics();
      
      const entry: PerformanceEntry = {
        timestamp: Date.now(),
        type: 'layout',
        duration: metrics.layoutTime,
        details: metrics,
        url: typeof window !== 'undefined' ? window.location.href : '',
        viewport: {
          width: typeof window !== 'undefined' ? window.innerWidth : 0,
          height: typeof window !== 'undefined' ? window.innerHeight : 0,
        },
      };

      this.addEntry(entry);
    }, this.config.reportInterval);
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    if (!this.isMonitoring) return;

    this.isMonitoring = false;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Collect current metrics
   */
  async collectMetrics(): Promise<LayoutPerformanceMetrics> {
    const startTime = performance.now();
    
    const [webVitals, layoutMetrics] = await Promise.all([
      this.config.collectWebVitals ? collectWebVitals() : Promise.resolve({}),
      measureLayoutPerformance(),
    ]);

    const endTime = performance.now();

    return {
      cls: 0,
      lcp: 0,
      fid: 0,
      inp: 0,
      fcp: 0,
      ttfb: 0,
      layoutTime: 0,
      paintTime: 0,
      reflows: 0,
      repaints: 0,
      domNodes: 0,
      cssRules: 0,
      memoryUsage: { used: 0, total: 0, limit: 0 },
      renderTime: endTime - startTime,
      hydrationTime: 0,
      interactionTime: 0,
      ...webVitals,
      ...layoutMetrics,
    };
  }

  /**
   * Generate performance report
   */
  async generateReport(): Promise<PerformanceReport> {
    const metrics = await this.collectMetrics();
    const recommendations = generateRecommendations(metrics, DEFAULT_PERFORMANCE_THRESHOLDS);
    const score = calculatePerformanceScore(metrics, DEFAULT_PERFORMANCE_THRESHOLDS);

    return {
      metrics,
      entries: [...this.entries],
      recommendations,
      score,
      generatedAt: Date.now(),
    };
  }

  /**
   * Add performance entry
   */
  addEntry(entry: PerformanceEntry): void {
    this.entries.push(entry);
    
    // Keep only recent entries within buffer size
    if (this.entries.length > this.config.bufferSize) {
      this.entries = this.entries.slice(-this.config.bufferSize);
    }
  }

  /**
   * Get current entries
   */
  getEntries(): PerformanceEntry[] {
    return [...this.entries];
  }

  /**
   * Clear all entries
   */
  clearEntries(): void {
    this.entries = [];
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<PerformanceMonitorConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export const layoutPerformanceMonitor = new LayoutPerformanceMonitor();

// Export utility functions
export {
  getMemoryUsage,
  getDOMMetrics,
  measureLayoutPerformance,
  collectWebVitals,
  generateRecommendations,
  calculatePerformanceScore,
};