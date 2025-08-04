/**
 * @fileoverview useDebounce Hook - Performance Optimization Utilities
 * @description Provides debounced state updates and function calls for performance optimization
 * @version 5.0.0
 * @compliance Enterprise Standards, Performance Optimized
 */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook for debouncing state updates
 * @param value - Value to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for debouncing function calls
 * @param callback - Function to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns Debounced function
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const callbackRef = useRef<T>(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update callback ref on each render
  callbackRef.current = callback;

  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]) as T;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Hook for throttling function calls
 * @param callback - Function to throttle
 * @param delay - Throttle delay in milliseconds
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const callbackRef = useRef<T>(callback);
  const lastCallRef = useRef<number>(0);

  // Update callback ref on each render
  callbackRef.current = callback;

  const throttledCallback = useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    
    if (now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      callbackRef.current(...args);
    }
  }, [delay]) as T;

  return throttledCallback;
}

/**
 * Hook for creating a loading state with timeout
 * @param isLoading - Current loading state
 * @param timeout - Timeout duration in milliseconds
 * @returns Boolean indicating if loading has timed out
 */
export function useLoadingTimeout(
  isLoading: boolean,
  timeout: number
): boolean {
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setHasTimedOut(false);
      return;
    }

    const timer = setTimeout(() => {
      setHasTimedOut(true);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, timeout]);

  return hasTimedOut;
}
