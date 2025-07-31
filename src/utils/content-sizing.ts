/**
 * @fileoverview Content Sizing Utilities v5.0.0 - Token-Based Design System
 * @description Intelligent content sizing and adaptive layout utilities for responsive design
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import type { BreakpointKey } from './responsive';
import { useBreakpoint } from './responsive';

// =============================================================================
// CONTENT SIZING TYPES
// =============================================================================

export interface ContentDimensions {
  readonly width: number;
  readonly height: number;
  readonly scrollWidth: number;
  readonly scrollHeight: number;
  readonly clientWidth: number;
  readonly clientHeight: number;
}

export interface TextMetrics {
  readonly characterCount: number;
  readonly wordCount: number;
  readonly lineCount: number;
  readonly estimatedReadingTime: number; // in minutes
  readonly averageWordsPerLine: number;
  readonly fontSize: number;
  readonly lineHeight: number;
}

export interface AdaptiveSizing {
  readonly minWidth?: string;
  readonly maxWidth?: string;
  readonly minHeight?: string;
  readonly maxHeight?: string;
  readonly aspectRatio?: string;
  readonly flexBasis?: string;
  readonly flexGrow?: number;
  readonly flexShrink?: number;
}

export interface SizingConstraints {
  readonly container: {
    readonly width: number;
    readonly height: number;
  };
  readonly content: ContentDimensions;
  readonly breakpoint: BreakpointKey;
  readonly orientation: 'portrait' | 'landscape';
  readonly devicePixelRatio: number;
}

export interface AutoSizingConfig {
  readonly enabled: boolean;
  readonly strategy: 'content' | 'container' | 'hybrid' | 'responsive';
  readonly maintainAspectRatio: boolean;
  readonly preventOverflow: boolean;
  readonly minScale: number;
  readonly maxScale: number;
  readonly scaleStep: number;
  readonly updateInterval: number; // ms
}

export interface SizingRule {
  readonly condition: (constraints: SizingConstraints) => boolean;
  readonly sizing: AdaptiveSizing;
  readonly priority: number;
}

export interface FluidTypography {
  readonly minFontSize: number;
  readonly maxFontSize: number;
  readonly minViewportWidth: number;
  readonly maxViewportWidth: number;
  readonly unitType: 'px' | 'rem' | 'em';
}

// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================

export const DEFAULT_AUTO_SIZING_CONFIG: AutoSizingConfig = {
  enabled: true,
  strategy: 'hybrid',
  maintainAspectRatio: false,
  preventOverflow: true,
  minScale: 0.5,
  maxScale: 2.0,
  scaleStep: 0.1,
  updateInterval: 100,
} as const;

export const COMMON_ASPECT_RATIOS = {
  square: '1:1',
  golden: '1.618:1',
  widescreen: '16:9',
  ultrawide: '21:9',
  photo: '4:3',
  portrait: '3:4',
  card: '5:7',
} as const;

// Reading speed constants (words per minute)
export const READING_SPEEDS = {
  slow: 150,
  average: 200,
  fast: 250,
} as const;

// =============================================================================
// CONTENT SIZING UTILITIES
// =============================================================================

/**
 * Calculate text metrics from element
 */
const calculateTextMetrics = (element: HTMLElement): TextMetrics => {
  const text = element.textContent || '';
  const computedStyle = window.getComputedStyle(element);
  
  const characterCount = text.length;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const fontSize = parseFloat(computedStyle.fontSize);
  const lineHeight = parseFloat(computedStyle.lineHeight) || fontSize * 1.2;
  
  // Estimate line count based on element height and line height
  const elementHeight = element.getBoundingClientRect().height;
  const lineCount = Math.max(1, Math.round(elementHeight / lineHeight));
  
  const averageWordsPerLine = lineCount > 0 ? wordCount / lineCount : wordCount;
  const estimatedReadingTime = wordCount / READING_SPEEDS.average;

  return {
    characterCount,
    wordCount,
    lineCount,
    estimatedReadingTime,
    averageWordsPerLine,
    fontSize,
    lineHeight,
  };
};

/**
 * Get element dimensions
 */
const getContentDimensions = (element: HTMLElement): ContentDimensions => {
  const rect = element.getBoundingClientRect();
  
  return {
    width: rect.width,
    height: rect.height,
    scrollWidth: element.scrollWidth,
    scrollHeight: element.scrollHeight,
    clientWidth: element.clientWidth,
    clientHeight: element.clientHeight,
  };
};

/**
 * Calculate optimal font size for container
 */
const calculateOptimalFontSize = (
  element: HTMLElement,
  targetWidth: number,
  targetHeight: number,
  constraints: { min: number; max: number }
): number => {
  const text = element.textContent || '';
  if (!text.trim()) return constraints.min;

  let fontSize = constraints.min;
  let bestFit = constraints.min;
  
  // Binary search for optimal font size
  let low = constraints.min;
  let high = constraints.max;
  
  while (high - low > 0.5) {
    fontSize = (low + high) / 2;
    element.style.fontSize = `${fontSize}px`;
    
    const rect = element.getBoundingClientRect();
    
    if (rect.width <= targetWidth && rect.height <= targetHeight) {
      bestFit = fontSize;
      low = fontSize;
    } else {
      high = fontSize;
    }
  }
  
  return bestFit;
};

/**
 * Generate fluid typography CSS
 */
const generateFluidTypography = (config: FluidTypography): string => {
  const { minFontSize, maxFontSize, minViewportWidth, maxViewportWidth, unitType } = config;
  
  const slope = (maxFontSize - minFontSize) / (maxViewportWidth - minViewportWidth);
  const yAxisIntersection = -minViewportWidth * slope + minFontSize;
  
  return `clamp(${minFontSize}${unitType}, ${yAxisIntersection}${unitType} + ${slope * 100}vw, ${maxFontSize}${unitType})`;
};

/**
 * Calculate container-based sizing
 */
const calculateContainerSizing = (
  containerWidth: number,
  containerHeight: number,
  contentAspectRatio?: string
): AdaptiveSizing => {
  const sizing: AdaptiveSizing = {
    maxWidth: `${containerWidth}px`,
    maxHeight: `${containerHeight}px`,
  };

  if (contentAspectRatio) {
    const [widthRatio, heightRatio] = contentAspectRatio.split(':').map(Number);
    const aspectRatio = widthRatio / heightRatio;
    
    // Calculate dimensions based on aspect ratio
    const widthBasedHeight = containerWidth / aspectRatio;
    const heightBasedWidth = containerHeight * aspectRatio;
    
    if (widthBasedHeight <= containerHeight) {
      sizing.width = `${containerWidth}px`;
      sizing.height = `${widthBasedHeight}px`;
    } else {
      sizing.width = `${heightBasedWidth}px`;
      sizing.height = `${containerHeight}px`;
    }
    
    sizing.aspectRatio = contentAspectRatio;
  }

  return sizing;
};

/**
 * Apply sizing rules based on constraints
 */
const applySizingRules = (
  rules: SizingRule[],
  constraints: SizingConstraints
): AdaptiveSizing => {
  const applicableRules = rules
    .filter(rule => rule.condition(constraints))
    .sort((a, b) => b.priority - a.priority);

  if (applicableRules.length === 0) {
    return {};
  }

  // Merge sizing from applicable rules
  return applicableRules.reduce((merged, rule) => ({
    ...merged,
    ...rule.sizing,
  }), {} as AdaptiveSizing);
};

// =============================================================================
// CONTENT SIZING HOOKS
// =============================================================================

/**
 * Hook for automatic content sizing
 */
export const useAutoSizing = (
  elementRef: React.RefObject<HTMLElement>,
  config: Partial<AutoSizingConfig> = {}
): {
  dimensions: ContentDimensions | null;
  sizing: AdaptiveSizing;
  isOverflowing: boolean;
  scale: number;
  updateSizing: () => void;
} => {
  const [dimensions, setDimensions] = useState<ContentDimensions | null>(null);
  const [sizing, setSizing] = useState<AdaptiveSizing>({});
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  
  const finalConfig = useMemo(() => ({
    ...DEFAULT_AUTO_SIZING_CONFIG,
    ...config,
  }), [config]);

  const breakpoint = useBreakpoint();
  const updateTimeoutRef = useRef<NodeJS.Timeout>();

  const updateSizing = useCallback(() => {
    if (!elementRef.current || !finalConfig.enabled) return;

    const element = elementRef.current;
    const parent = element.parentElement;
    if (!parent) return;

    const contentDims = getContentDimensions(element);
    const parentRect = parent.getBoundingClientRect();
    
    setDimensions(contentDims);

    // Check for overflow
    const overflow = contentDims.scrollWidth > contentDims.clientWidth || 
                    contentDims.scrollHeight > contentDims.clientHeight;
    setIsOverflowing(overflow);

    // Calculate sizing based on strategy
    let newSizing: AdaptiveSizing = {};
    
    switch (finalConfig.strategy) {
      case 'content':
        newSizing = {
          width: `${contentDims.scrollWidth}px`,
          height: `${contentDims.scrollHeight}px`,
        };
        break;
        
      case 'container':
        newSizing = calculateContainerSizing(
          parentRect.width,
          parentRect.height,
          finalConfig.maintainAspectRatio ? COMMON_ASPECT_RATIOS.golden : undefined
        );
        break;
        
      case 'hybrid':
        const maxWidth = Math.min(contentDims.scrollWidth, parentRect.width);
        const maxHeight = Math.min(contentDims.scrollHeight, parentRect.height);
        
        newSizing = {
          maxWidth: `${maxWidth}px`,
          maxHeight: `${maxHeight}px`,
          width: finalConfig.preventOverflow ? `min(${contentDims.scrollWidth}px, 100%)` : undefined,
          height: finalConfig.preventOverflow ? `min(${contentDims.scrollHeight}px, 100%)` : undefined,
        };
        break;
        
      case 'responsive':
        // Responsive sizing based on breakpoint
        const responsiveRules: SizingRule[] = [
          {
            condition: (c) => c.breakpoint === 'xs',
            sizing: { maxWidth: '100vw', maxHeight: '50vh' },
            priority: 1,
          },
          {
            condition: (c) => c.breakpoint === 'sm',
            sizing: { maxWidth: '90vw', maxHeight: '60vh' },
            priority: 1,
          },
          {
            condition: (c) => c.breakpoint === 'md',
            sizing: { maxWidth: '80vw', maxHeight: '70vh' },
            priority: 1,
          },
          {
            condition: (c) => c.breakpoint === 'lg' || c.breakpoint === 'xl' || c.breakpoint === '2xl',
            sizing: { maxWidth: '70vw', maxHeight: '80vh' },
            priority: 1,
          },
        ];
        
        const constraints: SizingConstraints = {
          container: { width: parentRect.width, height: parentRect.height },
          content: contentDims,
          breakpoint,
          orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
          devicePixelRatio: window.devicePixelRatio || 1,
        };
        
        newSizing = applySizingRules(responsiveRules, constraints);
        break;
    }

    setSizing(newSizing);

    // Calculate scale if needed
    if (overflow && finalConfig.preventOverflow) {
      const scaleX = parentRect.width / contentDims.scrollWidth;
      const scaleY = parentRect.height / contentDims.scrollHeight;
      const newScale = Math.max(
        finalConfig.minScale,
        Math.min(finalConfig.maxScale, Math.min(scaleX, scaleY))
      );
      setScale(newScale);
    } else {
      setScale(1);
    }
  }, [elementRef, finalConfig, breakpoint]);

  // Set up resize observer
  useEffect(() => {
    if (!elementRef.current || !finalConfig.enabled) return;

    const element = elementRef.current;
    
    // Initial update
    updateSizing();

    // Set up ResizeObserver
    let resizeObserver: ResizeObserver | null = null;
    
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        // Debounce updates
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }
        
        updateTimeoutRef.current = setTimeout(updateSizing, finalConfig.updateInterval);
      });
      
      resizeObserver.observe(element);
      if (element.parentElement) {
        resizeObserver.observe(element.parentElement);
      }
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [elementRef, finalConfig.enabled, finalConfig.updateInterval, updateSizing]);

  return {
    dimensions,
    sizing,
    isOverflowing,
    scale,
    updateSizing,
  };
};

/**
 * Hook for text content sizing
 */
export const useTextSizing = (
  elementRef: React.RefObject<HTMLElement>,
  targetSize?: { width?: number; height?: number }
): {
  metrics: TextMetrics | null;
  optimalFontSize: number;
  fluidTypography: string;
  updateMetrics: () => void;
} => {
  const [metrics, setMetrics] = useState<TextMetrics | null>(null);
  const [optimalFontSize, setOptimalFontSize] = useState<number>(16);
  
  const breakpoint = useBreakpoint();

  const updateMetrics = useCallback(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const textMetrics = calculateTextMetrics(element);
    setMetrics(textMetrics);

    // Calculate optimal font size if target size is provided
    if (targetSize?.width || targetSize?.height) {
      const optimal = calculateOptimalFontSize(
        element,
        targetSize.width || Infinity,
        targetSize.height || Infinity,
        { min: 12, max: 48 }
      );
      setOptimalFontSize(optimal);
    }
  }, [elementRef, targetSize]);

  // Generate fluid typography CSS
  const fluidTypography = useMemo(() => {
    if (!metrics) return '';

    const fluidConfig: FluidTypography = {
      minFontSize: Math.max(12, metrics.fontSize * 0.8),
      maxFontSize: Math.min(48, metrics.fontSize * 1.5),
      minViewportWidth: 320,
      maxViewportWidth: 1200,
      unitType: 'px',
    };

    return generateFluidTypography(fluidConfig);
  }, [metrics]);

  useEffect(() => {
    updateMetrics();
    
    // Update on resize
    const handleResize = () => updateMetrics();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateMetrics]);

  return {
    metrics,
    optimalFontSize,
    fluidTypography,
    updateMetrics,
  };
};

/**
 * Hook for adaptive image sizing
 */
export const useImageSizing = (
  imageRef: React.RefObject<HTMLImageElement>,
  containerRef: React.RefObject<HTMLElement>
): {
  sizing: AdaptiveSizing;
  isLoaded: boolean;
  naturalDimensions: { width: number; height: number } | null;
  fittingMode: 'contain' | 'cover' | 'fill';
} => {
  const [sizing, setSizing] = useState<AdaptiveSizing>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [naturalDimensions, setNaturalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [fittingMode, setFittingMode] = useState<'contain' | 'cover' | 'fill'>('contain');

  const updateImageSizing = useCallback(() => {
    if (!imageRef.current || !containerRef.current || !isLoaded) return;

    const image = imageRef.current;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;
    const naturalAspectRatio = naturalWidth / naturalHeight;
    const containerAspectRatio = containerRect.width / containerRect.height;

    setNaturalDimensions({ width: naturalWidth, height: naturalHeight });

    // Determine fitting mode based on aspect ratios
    let mode: 'contain' | 'cover' | 'fill' = 'contain';
    let newSizing: AdaptiveSizing = {};

    if (naturalAspectRatio > containerAspectRatio) {
      // Image is wider than container
      mode = 'contain';
      newSizing = {
        width: '100%',
        height: 'auto',
        maxWidth: `${containerRect.width}px`,
        maxHeight: `${containerRect.height}px`,
      };
    } else {
      // Image is taller than container
      mode = 'contain';
      newSizing = {
        width: 'auto',
        height: '100%',
        maxWidth: `${containerRect.width}px`,
        maxHeight: `${containerRect.height}px`,
      };
    }

    setFittingMode(mode);
    setSizing(newSizing);
  }, [imageRef, containerRef, isLoaded]);

  useEffect(() => {
    if (!imageRef.current) return;

    const image = imageRef.current;

    const handleLoad = () => {
      setIsLoaded(true);
      updateImageSizing();
    };

    const handleError = () => {
      setIsLoaded(false);
    };

    if (image.complete) {
      handleLoad();
    } else {
      image.addEventListener('load', handleLoad);
      image.addEventListener('error', handleError);
    }

    return () => {
      image.removeEventListener('load', handleLoad);
      image.removeEventListener('error', handleError);
    };
  }, [imageRef, updateImageSizing]);

  return {
    sizing,
    isLoaded,
    naturalDimensions,
    fittingMode,
  };
};

// =============================================================================
// CONTENT SIZING COMPONENT HELPERS
// =============================================================================

/**
 * Create auto-sizing container props
 */
export const createAutoSizedContainerProps = (
  sizing: AdaptiveSizing,
  scale: number,
  baseProps?: React.HTMLAttributes<HTMLDivElement>
): React.HTMLAttributes<HTMLDivElement> => {
  const containerStyle: React.CSSProperties = {
    ...baseProps?.style,
    ...sizing,
    transform: scale !== 1 ? `scale(${scale})` : undefined,
    transformOrigin: 'top left',
  };

  return {
    ...baseProps,
    style: containerStyle,
  };
};

/**
 * Create fluid text styles
 */
export const createFluidTextStyles = (
  minSize: number = 14,
  maxSize: number = 24,
  baseStyle?: React.CSSProperties
): React.CSSProperties => {
  const fluidTypography = generateFluidTypography({
    minFontSize: minSize,
    maxFontSize: maxSize,
    minViewportWidth: 320,
    maxViewportWidth: 1200,
    unitType: 'px',
  });

  return {
    ...baseStyle,
    fontSize: fluidTypography,
  };
};

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export {
  calculateTextMetrics,
  getContentDimensions,
  calculateOptimalFontSize,
  generateFluidTypography,
  calculateContainerSizing,
  applySizingRules,
  COMMON_ASPECT_RATIOS,
  READING_SPEEDS,
};