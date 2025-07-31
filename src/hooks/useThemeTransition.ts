/**
 * useThemeTransition Hook
 * Manages smooth theme transitions with CSS animations and state management
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from './useTheme';
import { useTokens } from './useTokens';

export interface ThemeTransitionOptions {
  duration?: number;
  easing?: string;
  properties?: string[];
  disableTransitions?: boolean;
  onTransitionStart?: (from: string, to: string) => void;
  onTransitionEnd?: (theme: string) => void;
}

interface TransitionState {
  isTransitioning: boolean;
  from: string | null;
  to: string | null;
  progress: number;
}

const DEFAULT_TRANSITION_DURATION = 300;
const DEFAULT_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DEFAULT_PROPERTIES = [
  'background-color',
  'color',
  'border-color',
  'box-shadow',
  'fill',
  'stroke',
];

export function useThemeTransition(options: ThemeTransitionOptions = {}): {
  transitionTheme: (theme: string) => Promise<void>;
  isTransitioning: boolean;
  transitionState: TransitionState;
  cancelTransition: () => void;
  getTransitionStyles: () => React.CSSProperties;
} {
  const { theme, setTheme } = useTheme();
  const tokens = useTokens();
  const [transitionState, setTransitionState] = useState<TransitionState>({
    isTransitioning: false,
    from: null,
    to: null,
    progress: 0,
  });
  
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const {
    duration = DEFAULT_TRANSITION_DURATION,
    easing = DEFAULT_EASING,
    properties = DEFAULT_PROPERTIES,
    disableTransitions = false,
    onTransitionStart,
    onTransitionEnd,
  } = options;

  // Clean up function
  const cleanup = useCallback(() => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = undefined;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
  }, []);

  // Cancel ongoing transition
  const cancelTransition = useCallback(() => {
    cleanup();
    setTransitionState({
      isTransitioning: false,
      from: null,
      to: null,
      progress: 0,
    });
  }, [cleanup]);

  // Update transition progress
  const updateProgress = useCallback((timestamp: number) => {
    if (!startTimeRef.current) return;

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    setTransitionState(prev => ({
      ...prev,
      progress,
    }));

    if (progress < 1) {
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }
  }, [duration]);

  // Transition to a new theme
  const transitionTheme = useCallback(async (newTheme: string): Promise<void> => {
    return new Promise((resolve) => {
      if (disableTransitions || theme === newTheme) {
        setTheme(newTheme);
        resolve();
        return;
      }

      // Cancel any ongoing transition
      cleanup();

      // Start transition
      setTransitionState({
        isTransitioning: true,
        from: theme,
        to: newTheme,
        progress: 0,
      });

      // Call transition start callback
      onTransitionStart?.(theme, newTheme);

      // Add transition styles to document
      const styleEl = document.createElement('style');
      styleEl.id = 'theme-transition-styles';
      styleEl.textContent = `
        * {
          transition-property: ${properties.join(', ')};
          transition-duration: ${duration}ms;
          transition-timing-function: ${easing};
        }
        
        /* Disable transitions for certain elements */
        img, video, iframe {
          transition: none !important;
        }
      `;
      document.head.appendChild(styleEl);

      // Start progress animation
      startTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(updateProgress);

      // Actually change the theme
      requestAnimationFrame(() => {
        setTheme(newTheme);
      });

      // Clean up after transition
      transitionTimeoutRef.current = setTimeout(() => {
        // Remove transition styles
        const style = document.getElementById('theme-transition-styles');
        style?.remove();

        // Update state
        setTransitionState({
          isTransitioning: false,
          from: null,
          to: null,
          progress: 0,
        });

        // Call transition end callback
        onTransitionEnd?.(newTheme);
        
        // Resolve promise
        resolve();
      }, duration);
    });
  }, [theme, setTheme, disableTransitions, duration, easing, properties, cleanup, updateProgress, onTransitionStart, onTransitionEnd]);

  // Get transition styles for manual application
  const getTransitionStyles = useCallback((): React.CSSProperties => {
    if (!transitionState.isTransitioning || disableTransitions) {
      return {};
    }

    return {
      transitionProperty: properties.join(', '),
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: easing,
    };
  }, [transitionState.isTransitioning, disableTransitions, properties, duration, easing]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    transitionTheme,
    isTransitioning: transitionState.isTransitioning,
    transitionState,
    cancelTransition,
    getTransitionStyles,
  };
}

/**
 * Theme transition presets
 */
export const themeTransitionPresets = {
  instant: {
    duration: 0,
    disableTransitions: true,
  },
  fast: {
    duration: 150,
    easing: 'ease-out',
  },
  smooth: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  slow: {
    duration: 500,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  dramatic: {
    duration: 800,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

/**
 * Advanced theme transition with cross-fade effect
 */
export function useThemeCrossfade(options: ThemeTransitionOptions = {}): {
  transitionTheme: (theme: string) => Promise<void>;
  isTransitioning: boolean;
  overlayOpacity: number;
} {
  const { transitionTheme: baseTransition, isTransitioning, transitionState } = useThemeTransition(options);
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  const transitionTheme = useCallback(async (newTheme: string) => {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${newTheme === 'dark' ? '#000' : '#fff'};
      opacity: 0;
      transition: opacity ${options.duration || DEFAULT_TRANSITION_DURATION}ms ${options.easing || DEFAULT_EASING};
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(overlay);

    // Fade in overlay
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      setOverlayOpacity(1);
    });

    // Wait for half the transition
    await new Promise(resolve => setTimeout(resolve, (options.duration || DEFAULT_TRANSITION_DURATION) / 2));

    // Change theme
    await baseTransition(newTheme);

    // Fade out overlay
    overlay.style.opacity = '0';
    setOverlayOpacity(0);

    // Remove overlay after fade
    setTimeout(() => {
      overlay.remove();
    }, (options.duration || DEFAULT_TRANSITION_DURATION) / 2);
  }, [baseTransition, options.duration, options.easing]);

  return {
    transitionTheme,
    isTransitioning,
    overlayOpacity,
  };
}