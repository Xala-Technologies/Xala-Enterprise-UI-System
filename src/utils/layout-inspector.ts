 
/**
 * @fileoverview Layout Inspector v5.0.0 - Token-Based Design System
 * @description Comprehensive layout inspection and debugging tools for development
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import type { ResponsiveBreakpoints, BreakpointKey } from './responsive';
import { DEFAULT_BREAKPOINTS, getCurrentBreakpoint } from './responsive';

// =============================================================================
// LAYOUT INSPECTION TYPES
// =============================================================================

export interface LayoutElement {
  readonly id: string;
  readonly tagName: string;
  readonly className: string;
  readonly computedStyles: Partial<CSSStyleDeclaration>;
  readonly dimensions: {
    readonly width: number;
    readonly height: number;
    readonly top: number;
    readonly left: number;
  };
  readonly children: LayoutElement[];
  readonly parent?: string;
}

export interface LayoutInspectionResult {
  readonly timestamp: number;
  readonly viewport: {
    readonly width: number;
    readonly height: number;
    readonly breakpoint: BreakpointKey;
  };
  readonly elements: LayoutElement[];
  readonly stats: {
    readonly totalElements: number;
    readonly maxDepth: number;
    readonly averageNesting: number;
  };
}

export interface LayoutViolation {
  readonly type: 'overflow' | 'layout-shift' | 'accessibility' | 'performance';
  readonly severity: 'low' | 'medium' | 'high' | 'critical';
  readonly element: string;
  readonly message: string;
  readonly suggestion?: string;
}

export interface LayoutMetrics {
  readonly cls: number; // Cumulative Layout Shift
  readonly lcp: number; // Largest Contentful Paint
  readonly fid: number; // First Input Delay
  readonly renderTime: number;
  readonly layoutTime: number;
}

export interface LayoutInspectorConfig {
  readonly enabled: boolean;
  readonly includeInternalElements: boolean;
  readonly trackPerformance: boolean;
  readonly detectViolations: boolean;
  readonly breakpoints: ResponsiveBreakpoints;
}

// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================

export const DEFAULT_INSPECTOR_CONFIG: LayoutInspectorConfig = {
  enabled: process.env.NODE_ENV === 'development',
  includeInternalElements: false,
  trackPerformance: true,
  detectViolations: true,
  breakpoints: DEFAULT_BREAKPOINTS,
} as const;

// =============================================================================
// LAYOUT INSPECTION UTILITIES
// =============================================================================

/**
 * Extract element information for inspection
 */
const extractElementInfo = (
  element: Element,
  index: number,
  parentId?: string
): LayoutElement => {
  const rect = element.getBoundingClientRect();
  const computedStyles = window.getComputedStyle(element);
  
  // Generate unique ID
  const id = element.id || `element-${index}-${Date.now()}`;
  
  // Extract relevant computed styles
  const relevantStyles: Partial<CSSStyleDeclaration> = {
    display: computedStyles.display,
    position: computedStyles.position,
    width: computedStyles.width,
    height: computedStyles.height,
    margin: computedStyles.margin,
    padding: computedStyles.padding,
    border: computedStyles.border,
    flexDirection: computedStyles.flexDirection,
    justifyContent: computedStyles.justifyContent,
    alignItems: computedStyles.alignItems,
    gridTemplateColumns: computedStyles.gridTemplateColumns,
    gridTemplateRows: computedStyles.gridTemplateRows,
    zIndex: computedStyles.zIndex,
    overflow: computedStyles.overflow,
  };

  return {
    id,
    tagName: element.tagName.toLowerCase(),
    className: element.className || '',
    computedStyles: relevantStyles,
    dimensions: {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
    },
    children: [],
    parent: parentId,
  };
};

/**
 * Recursively inspect DOM tree
 */
const inspectDOMTree = (
  element: Element,
  config: LayoutInspectorConfig,
  index: number = 0,
  parentId?: string,
  depth: number = 0
): LayoutElement => {
  const elementInfo = extractElementInfo(element, index, parentId);
  
  // Recursively inspect children
  const children = Array.from(element.children)
    .filter(child => {
      if (!config.includeInternalElements) {
        // Skip script, style, and other internal elements
        const skipTags = ['script', 'style', 'meta', 'link', 'title'];
        return !skipTags.includes(child.tagName.toLowerCase());
      }
      return true;
    })
    .map((child, childIndex) => 
      inspectDOMTree(child, config, childIndex, elementInfo.id, depth + 1)
    );

  return {
    ...elementInfo,
    children,
  };
};

/**
 * Calculate layout statistics
 */
const calculateLayoutStats = (elements: LayoutElement[]): LayoutInspectionResult['stats'] => {
  const flatElements = flattenElements(elements);
  const totalElements = flatElements.length;
  
  let maxDepth = 0;
  let totalDepth = 0;
  
  const calculateDepth = (element: LayoutElement, currentDepth: number = 0): void => {
    maxDepth = Math.max(maxDepth, currentDepth);
    totalDepth += currentDepth;
    
    element.children.forEach(child => calculateDepth(child, currentDepth + 1));
  };
  
  elements.forEach(element => calculateDepth(element));
  
  return {
    totalElements,
    maxDepth,
    averageNesting: totalElements > 0 ? totalDepth / totalElements : 0,
  };
};

/**
 * Flatten element tree into array
 */
const flattenElements = (elements: LayoutElement[]): LayoutElement[] => {
  const result: LayoutElement[] = [];
  
  const flatten = (element: LayoutElement): void => {
    result.push(element);
    element.children.forEach(flatten);
  };
  
  elements.forEach(flatten);
  return result;
};

/**
 * Detect layout violations
 */
const detectLayoutViolations = (elements: LayoutElement[]): LayoutViolation[] => {
  const violations: LayoutViolation[] = [];
  const flatElements = flattenElements(elements);
  
  flatElements.forEach(element => {
    // Check for overflow issues
    if (element.computedStyles.overflow === 'visible') {
      const parentWidth = element.dimensions.width;
      const hasWideChildren = element.children.some(
        child => child.dimensions.width > parentWidth
      );
      
      if (hasWideChildren) {
        violations.push({
          type: 'overflow',
          severity: 'medium',
          element: element.id,
          message: 'Element has children wider than parent with overflow: visible',
          suggestion: 'Consider setting overflow: hidden or overflow: auto',
        });
      }
    }
    
    // Check for accessibility issues
    if (element.tagName === 'div' && element.computedStyles.display === 'flex') {
      const hasFlexChildren = element.children.length > 0;
      if (hasFlexChildren && !element.className.includes('gap-')) {
        violations.push({
          type: 'accessibility',
          severity: 'low',
          element: element.id,
          message: 'Flex container without gap spacing may cause accessibility issues',
          suggestion: 'Add appropriate gap spacing using Tailwind gap-* classes',
        });
      }
    }
    
    // Check for performance issues
    if (element.computedStyles.position === 'fixed' && element.children.length > 10) {
      violations.push({
        type: 'performance',
        severity: 'high',
        element: element.id,
        message: 'Fixed positioned element with many children may cause performance issues',
        suggestion: 'Consider using absolute positioning or reducing child count',
      });
    }
  });
  
  return violations;
};

// =============================================================================
// LAYOUT INSPECTION HOOKS
// =============================================================================

/**
 * Hook for inspecting current layout
 */
export const useLayoutInspector = (
  config: Partial<LayoutInspectorConfig> = {}
): {
  inspectionResult: LayoutInspectionResult | null;
  violations: LayoutViolation[];
  metrics: LayoutMetrics | null;
  inspect: () => void;
  isInspecting: boolean;
} => {
  const [inspectionResult, setInspectionResult] = useState<LayoutInspectionResult | null>(null);
  const [violations, setViolations] = useState<LayoutViolation[]>([]);
  const [metrics, setMetrics] = useState<LayoutMetrics | null>(null);
  const [isInspecting, setIsInspecting] = useState<boolean>(false);
  
  const finalConfig = useMemo(() => ({
    ...DEFAULT_INSPECTOR_CONFIG,
    ...config,
  }), [config]);

  const inspect = useCallback(() => {
    if (!finalConfig.enabled || typeof window === 'undefined') return;
    
    setIsInspecting(true);
    const startTime = performance.now();
    
    try {
      // Get viewport information
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: getCurrentBreakpoint(window.innerWidth, finalConfig.breakpoints),
      };
      
      // Inspect DOM tree starting from body
      const bodyElement = document.body;
      const rootElements = Array.from(bodyElement.children)
        .map((element, index) => inspectDOMTree(element, finalConfig, index));
      
      // Calculate statistics
      const stats = calculateLayoutStats(rootElements);
      
      // Create inspection result
      const result: LayoutInspectionResult = {
        timestamp: Date.now(),
        viewport,
        elements: rootElements,
        stats,
      };
      
      setInspectionResult(result);
      
      // Detect violations if enabled
      if (finalConfig.detectViolations) {
        const detectedViolations = detectLayoutViolations(rootElements);
        setViolations(detectedViolations);
      }
      
      // Track performance metrics if enabled
      if (finalConfig.trackPerformance) {
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        // Get web vitals if available
        const metricsData: LayoutMetrics = {
          cls: 0, // Would need additional setup to track CLS
          lcp: 0, // Would need additional setup to track LCP
          fid: 0, // Would need additional setup to track FID
          renderTime,
          layoutTime: renderTime, // Simplified for now
        };
        
        setMetrics(metricsData);
      }
    } catch (error) {
      console.error('Layout inspection failed:', error);
    } finally {
      setIsInspecting(false);
    }
  }, [finalConfig]);

  return {
    inspectionResult,
    violations,
    metrics,
    inspect,
    isInspecting,
  };
};

/**
 * Hook for continuous layout monitoring
 */
export const useLayoutMonitor = (
  config: Partial<LayoutInspectorConfig> = {},
  interval: number = 5000
): {
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  violations: LayoutViolation[];
  metrics: LayoutMetrics[];
} => {
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false);
  const [violations, setViolations] = useState<LayoutViolation[]>([]);
  const [metrics, setMetrics] = useState<LayoutMetrics[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  
  const { inspect } = useLayoutInspector(config);
  
  const startMonitoring = useCallback(() => {
    if (isMonitoring || typeof window === 'undefined') return;
    
    setIsMonitoring(true);
    
    const id = setInterval(() => {
      inspect();
    }, interval);
    
    setIntervalId(id);
  }, [isMonitoring, inspect, interval]);
  
  const stopMonitoring = useCallback(() => {
    if (!isMonitoring || !intervalId) return;
    
    clearInterval(intervalId);
    setIntervalId(null);
    setIsMonitoring(false);
  }, [isMonitoring, intervalId]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);
  
  return {
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    violations,
    metrics,
  };
};

// =============================================================================
// LAYOUT INSPECTOR CLASS
// =============================================================================

/**
 * Layout Inspector utility class
 */
export class LayoutInspector {
  private config: LayoutInspectorConfig;
  private isMonitoring: boolean = false;
  private monitoringInterval: NodeJS.Timeout | null = null;

  constructor(config: Partial<LayoutInspectorConfig> = {}) {
    this.config = { ...DEFAULT_INSPECTOR_CONFIG, ...config };
  }

  /**
   * Inspect current layout
   */
  inspect(): LayoutInspectionResult | null {
    if (!this.config.enabled || typeof window === 'undefined') {
      return null;
    }

    try {
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: getCurrentBreakpoint(window.innerWidth, this.config.breakpoints),
      };

      const bodyElement = document.body;
      const rootElements = Array.from(bodyElement.children)
        .map((element, index) => inspectDOMTree(element, this.config, index));

      const stats = calculateLayoutStats(rootElements);

      return {
        timestamp: Date.now(),
        viewport,
        elements: rootElements,
        stats,
      };
    } catch (error) {
      console.error('Layout inspection failed:', error);
      return null;
    }
  }

  /**
   * Detect layout violations
   */
  detectViolations(): LayoutViolation[] {
    const result = this.inspect();
    if (!result) return [];

    return detectLayoutViolations(result.elements);
  }

  /**
   * Start continuous monitoring
   */
  startMonitoring(interval: number = 5000, callback?: (result: LayoutInspectionResult) => void): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.monitoringInterval = setInterval(() => {
      const result = this.inspect();
      if (result && callback) {
        callback(result);
      }
    }, interval);
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    if (!this.isMonitoring || !this.monitoringInterval) return;

    clearInterval(this.monitoringInterval);
    this.monitoringInterval = null;
    this.isMonitoring = false;
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<LayoutInspectorConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get current configuration
   */
  getConfig(): LayoutInspectorConfig {
    return { ...this.config };
  }
}

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export const layoutInspector = new LayoutInspector(DEFAULT_INSPECTOR_CONFIG);

// Export utility functions
export {
  extractElementInfo,
  inspectDOMTree,
  calculateLayoutStats,
  flattenElements,
  detectLayoutViolations,
};