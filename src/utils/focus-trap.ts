 
/**
 * @fileoverview Focus Trap Utilities v5.0.0 - Token-Based Design System
 * @description Comprehensive focus management and accessibility utilities for modal dialogs and complex UI
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID, WCAG AAA
 */

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';

// =============================================================================
// FOCUS TRAP TYPES
// =============================================================================

export interface FocusableElement extends HTMLElement {
  readonly tabIndex: number;
  readonly disabled?: boolean;
}

export interface FocusTrapConfig {
  readonly enabled: boolean;
  readonly restoreFocus: boolean;
  readonly autoFocus: boolean;
  readonly preventScroll: boolean;
  readonly allowOutsideClick: boolean;
  readonly escapeDeactivates: boolean;
  readonly clickOutsideDeactivates: boolean;
  readonly returnFocusOnDeactivate: boolean;
  readonly onActivate?: () => void;
  readonly onDeactivate?: () => void;
  readonly onPostActivate?: () => void;
  readonly onPostDeactivate?: () => void;
  readonly checkCanFocusTrap?: (element: HTMLElement) => boolean;
}

export interface FocusHistoryEntry {
  readonly element: HTMLElement;
  readonly timestamp: number;
  readonly reason: 'user' | 'programmatic' | 'trap' | 'restore';
}

export interface FocusManager {
  readonly currentFocus: HTMLElement | null;
  readonly previousFocus: HTMLElement | null;
  readonly focusHistory: FocusHistoryEntry[];
  readonly isTrapped: boolean;
  readonly trapElement: HTMLElement | null;
}

export interface KeyboardNavigationConfig {
  readonly enabled: boolean;
  readonly wrapAround: boolean;
  readonly includeContainer: boolean;
  readonly skipHidden: boolean;
  readonly skipDisabled: boolean;
  readonly customSelectors: string[];
}

export interface FocusIndicatorConfig {
  readonly enabled: boolean;
  readonly showForPointer: boolean;
  readonly showForKeyboard: boolean;
  readonly showForTouch: boolean;
  readonly className: string;
  readonly style: React.CSSProperties;
}

// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================

export const DEFAULT_FOCUS_TRAP_CONFIG: FocusTrapConfig = {
  enabled: true,
  restoreFocus: true,
  autoFocus: true,
  preventScroll: false,
  allowOutsideClick: false,
  escapeDeactivates: true,
  clickOutsideDeactivates: true,
  returnFocusOnDeactivate: true,
} as const;

export const DEFAULT_KEYBOARD_NAV_CONFIG: KeyboardNavigationConfig = {
  enabled: true,
  wrapAround: true,
  includeContainer: false,
  skipHidden: true,
  skipDisabled: true,
  customSelectors: [],
} as const;

export const DEFAULT_FOCUS_INDICATOR_CONFIG: FocusIndicatorConfig = {
  enabled: true,
  showForPointer: false,
  showForKeyboard: true,
  showForTouch: false,
  className: 'focus-visible',
  style: {
    outline: '2px solid #0066cc',
    outlineOffset: '2px',
  },
} as const;

// Focusable element selectors
const FOCUSABLE_SELECTORS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden="true"])',
  'select:not([disabled]):not([aria-hidden="true"])',
  'textarea:not([disabled]):not([aria-hidden="true"])',
  'button:not([disabled]):not([aria-hidden="true"])',
  'iframe:not([tabindex^="-"])',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex^="-"])',
] as const;

const TABBABLE_SELECTORS = [
  ...FOCUSABLE_SELECTORS,
  '[tabindex="0"]',
] as const;

// =============================================================================
// FOCUS UTILITIES
// =============================================================================

/**
 * Check if element is focusable
 */
const isFocusable = (element: HTMLElement): boolean => {
  if (element.hasAttribute('disabled') || element.getAttribute('aria-hidden') === 'true') {
    return false;
  }

  // Check if element matches focusable selectors
  const matches = FOCUSABLE_SELECTORS.some(selector => {
    try {
      return element.matches(selector);
    } catch {
      return false;
    }
  });

  if (!matches) return false;

  // Check if element is visible
  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden') {
    return false;
  }

  // Check if element has zero dimensions
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) {
    return false;
  }

  return true;
};

/**
 * Check if element is tabbable (can receive tab focus)
 */
const isTabbable = (element: HTMLElement): boolean => {
  if (!isFocusable(element)) {
    return false;
  }

  const tabIndex = element.tabIndex;
  
  // Elements with negative tabindex are focusable but not tabbable
  if (tabIndex < 0) {
    return false;
  }

  return true;
};

/**
 * Get all focusable elements within container
 */
const getFocusableElements = (
  container: HTMLElement,
  config: KeyboardNavigationConfig = DEFAULT_KEYBOARD_NAV_CONFIG
): HTMLElement[] => {
  const selectors = [...FOCUSABLE_SELECTORS, ...config.customSelectors];
  const elements = container.querySelectorAll(selectors.join(', ')) as NodeListOf<HTMLElement>;
  
  return Array.from(elements).filter(element => {
    if (config.skipHidden && !isElementVisible(element)) {
      return false;
    }
    
    if (config.skipDisabled && element.hasAttribute('disabled')) {
      return false;
    }
    
    return isFocusable(element);
  });
};

/**
 * Get all tabbable elements within container
 */
const getTabbableElements = (
  container: HTMLElement,
  config: KeyboardNavigationConfig = DEFAULT_KEYBOARD_NAV_CONFIG
): HTMLElement[] => {
  const focusableElements = getFocusableElements(container, config);
  return focusableElements.filter(isTabbable).sort((a, b) => {
    // Sort by tab index, then DOM order
    const aTabIndex = a.tabIndex || 0;
    const bTabIndex = b.tabIndex || 0;
    
    if (aTabIndex !== bTabIndex) {
      return aTabIndex - bTabIndex;
    }
    
    // Use DOM order for elements with same tab index
    return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });
};

/**
 * Check if element is visible
 */
const isElementVisible = (element: HTMLElement): boolean => {
  const style = window.getComputedStyle(element);
  
  if (style.display === 'none' || 
      style.visibility === 'hidden' || 
      style.opacity === '0') {
    return false;
  }
  
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
};

/**
 * Focus element safely
 */
const focusElement = (
  element: HTMLElement,
  options: FocusOptions = {},
  reason: FocusHistoryEntry['reason'] = 'programmatic'
): boolean => {
  if (!isFocusable(element)) {
    return false;
  }

  try {
    element.focus(options);
    return document.activeElement === element;
  } catch (error) {
    console.warn('Failed to focus element:', error);
    return false;
  }
};

/**
 * Find next/previous focusable element
 */
const findNextFocusableElement = (
  container: HTMLElement,
  currentElement: HTMLElement,
  direction: 'next' | 'previous',
  config: KeyboardNavigationConfig = DEFAULT_KEYBOARD_NAV_CONFIG
): HTMLElement | null => {
  const tabbableElements = getTabbableElements(container, config);
  const currentIndex = tabbableElements.indexOf(currentElement);
  
  if (currentIndex === -1) {
    return tabbableElements[0] || null;
  }
  
  let nextIndex: number;
  
  if (direction === 'next') {
    nextIndex = currentIndex + 1;
    if (nextIndex >= tabbableElements.length) {
      nextIndex = config.wrapAround ? 0 : tabbableElements.length - 1;
    }
  } else {
    nextIndex = currentIndex - 1;
    if (nextIndex < 0) {
      nextIndex = config.wrapAround ? tabbableElements.length - 1 : 0;
    }
  }
  
  return tabbableElements[nextIndex] || null;
};

// =============================================================================
// FOCUS TRAP HOOKS
// =============================================================================

/**
 * Main focus trap hook
 */
export const useFocusTrap = (
  containerRef: React.RefObject<HTMLElement>,
  config: Partial<FocusTrapConfig> = {}
): {
  activate: () => void;
  deactivate: () => void;
  isActive: boolean;
  pause: () => void;
  unpause: () => void;
  isPaused: boolean;
} => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const pausedElementRef = useRef<HTMLElement | null>(null);
  
  const finalConfig = useMemo(() => ({
    ...DEFAULT_FOCUS_TRAP_CONFIG,
    ...config,
  }), [config]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isActive || isPaused || !containerRef.current) return;

    // Handle Escape key
    if (event.key === 'Escape' && finalConfig.escapeDeactivates) {
      event.preventDefault();
      deactivate();
      return;
    }

    // Handle Tab key
    if (event.key === 'Tab') {
      event.preventDefault();
      
      const tabbableElements = getTabbableElements(containerRef.current);
      
      if (tabbableElements.length === 0) {
        return;
      }
      
      const currentElement = document.activeElement as HTMLElement;
      const currentIndex = tabbableElements.indexOf(currentElement);
      
      let nextIndex: number;
      
      if (event.shiftKey) {
        // Shift + Tab (backwards)
        nextIndex = currentIndex <= 0 ? tabbableElements.length - 1 : currentIndex - 1;
      } else {
        // Tab (forwards)
        nextIndex = currentIndex >= tabbableElements.length - 1 ? 0 : currentIndex + 1;
      }
      
      const nextElement = tabbableElements[nextIndex];
      if (nextElement) {
        focusElement(nextElement, { preventScroll: finalConfig.preventScroll }, 'trap');
      }
    }
  }, [isActive, isPaused, containerRef, finalConfig]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!isActive || isPaused || !containerRef.current) return;
    
    const target = event.target as HTMLElement;
    
    if (!containerRef.current.contains(target)) {
      if (finalConfig.clickOutsideDeactivates) {
        deactivate();
      } else if (!finalConfig.allowOutsideClick) {
        event.preventDefault();
        // Refocus the container
        const tabbableElements = getTabbableElements(containerRef.current);
        if (tabbableElements.length > 0) {
          focusElement(tabbableElements[0], { preventScroll: finalConfig.preventScroll }, 'trap');
        }
      }
    }
  }, [isActive, isPaused, containerRef, finalConfig]);

  const activate = useCallback(() => {
    if (isActive || !containerRef.current || !finalConfig.enabled) return;

    // Store previously focused element
    if (finalConfig.restoreFocus && document.activeElement) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
    }

    // Call onActivate callback
    if (finalConfig.onActivate) {
      finalConfig.onActivate();
    }

    setIsActive(true);

    // Auto focus first tabbable element
    if (finalConfig.autoFocus) {
      const tabbableElements = getTabbableElements(containerRef.current);
      if (tabbableElements.length > 0) {
        requestAnimationFrame(() => {
          focusElement(tabbableElements[0], { preventScroll: finalConfig.preventScroll }, 'trap');
          
          // Call onPostActivate callback
          if (finalConfig.onPostActivate) {
            finalConfig.onPostActivate();
          }
        });
      }
    }
  }, [isActive, containerRef, finalConfig]);

  const deactivate = useCallback(() => {
    if (!isActive) return;

    // Call onDeactivate callback
    if (finalConfig.onDeactivate) {
      finalConfig.onDeactivate();
    }

    setIsActive(false);
    setIsPaused(false);

    // Restore focus to previously focused element
    if (finalConfig.returnFocusOnDeactivate && previouslyFocusedElementRef.current) {
      requestAnimationFrame(() => {
        if (previouslyFocusedElementRef.current) {
          focusElement(
            previouslyFocusedElementRef.current, 
            { preventScroll: finalConfig.preventScroll }, 
            'restore'
          );
        }
        
        previouslyFocusedElementRef.current = null;
        
        // Call onPostDeactivate callback
        if (finalConfig.onPostDeactivate) {
          finalConfig.onPostDeactivate();
        }
      });
    }
  }, [isActive, finalConfig]);

  const pause = useCallback(() => {
    if (!isActive || isPaused) return;
    
    // Store currently focused element
    pausedElementRef.current = document.activeElement as HTMLElement;
    setIsPaused(true);
  }, [isActive, isPaused]);

  const unpause = useCallback(() => {
    if (!isActive || !isPaused) return;
    
    setIsPaused(false);
    
    // Restore focus to paused element or first tabbable element
    requestAnimationFrame(() => {
      if (pausedElementRef.current && containerRef.current?.contains(pausedElementRef.current)) {
        focusElement(pausedElementRef.current, { preventScroll: finalConfig.preventScroll }, 'trap');
      } else if (containerRef.current) {
        const tabbableElements = getTabbableElements(containerRef.current);
        if (tabbableElements.length > 0) {
          focusElement(tabbableElements[0], { preventScroll: finalConfig.preventScroll }, 'trap');
        }
      }
      
      pausedElementRef.current = null;
    });
  }, [isActive, isPaused, containerRef, finalConfig]);

  // Set up event listeners
  useEffect(() => {
    if (!isActive || isPaused) return;

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive, isPaused, handleKeyDown, handleClickOutside]);

  return {
    activate,
    deactivate,
    isActive,
    pause,
    unpause,
    isPaused,
  };
};

/**
 * Hook for focus management and history
 */
export const useFocusManager = (): FocusManager & {
  addToHistory: (element: HTMLElement, reason: FocusHistoryEntry['reason']) => void;
  clearHistory: () => void;
  restorePreviousFocus: () => void;
} => {
  const [currentFocus, setCurrentFocus] = useState<HTMLElement | null>(null);
  const [previousFocus, setPreviousFocus] = useState<HTMLElement | null>(null);
  const [focusHistory, setFocusHistory] = useState<FocusHistoryEntry[]>([]);
  const [isTrapped, setIsTrapped] = useState<boolean>(false);
  const [trapElement, setTrapElement] = useState<HTMLElement | null>(null);

  const addToHistory = useCallback((element: HTMLElement, reason: FocusHistoryEntry['reason']) => {
    const entry: FocusHistoryEntry = {
      element,
      timestamp: Date.now(),
      reason,
    };

    setFocusHistory(prev => [...prev.slice(-9), entry]); // Keep last 10 entries
  }, []);

  const clearHistory = useCallback(() => {
    setFocusHistory([]);
  }, []);

  const restorePreviousFocus = useCallback(() => {
    if (previousFocus && isFocusable(previousFocus)) {
      focusElement(previousFocus, {}, 'restore');
    }
  }, [previousFocus]);

  // Track focus changes
  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      
      if (target && target !== currentFocus) {
        setPreviousFocus(currentFocus);
        setCurrentFocus(target);
        addToHistory(target, 'user');
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      // Focus is leaving current element
      if (event.target === currentFocus) {
        // Don't immediately clear currentFocus as the new focus might not be set yet
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    // Set initial focus
    if (document.activeElement && document.activeElement !== document.body) {
      setCurrentFocus(document.activeElement as HTMLElement);
    }

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [currentFocus, addToHistory]);

  // Detect focus traps
  useEffect(() => {
    // This is a simplified trap detection
    // In a real implementation, you might want to coordinate with useFocusTrap
    const trapDetectionInterval = setInterval(() => {
      if (currentFocus) {
        const potentialTrap = currentFocus.closest('[data-focus-trap="true"]') as HTMLElement;
        if (potentialTrap !== trapElement) {
          setTrapElement(potentialTrap);
          setIsTrapped(!!potentialTrap);
        }
      }
    }, 100);

    return () => {
      clearInterval(trapDetectionInterval);
    };
  }, [currentFocus, trapElement]);

  return {
    currentFocus,
    previousFocus,
    focusHistory,
    isTrapped,
    trapElement,
    addToHistory,
    clearHistory,
    restorePreviousFocus,
  };
};

/**
 * Hook for keyboard navigation within container
 */
export const useKeyboardNavigation = (
  containerRef: React.RefObject<HTMLElement>,
  config: Partial<KeyboardNavigationConfig> = {}
): {
  focusNext: () => void;
  focusPrevious: () => void;
  focusFirst: () => void;
  focusLast: () => void;
  currentIndex: number;
  totalItems: number;
} => {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [totalItems, setTotalItems] = useState<number>(0);
  
  const finalConfig = useMemo(() => ({
    ...DEFAULT_KEYBOARD_NAV_CONFIG,
    ...config,
  }), [config]);

  const updateTabbableCount = useCallback(() => {
    if (!containerRef.current) return;
    
    const tabbableElements = getTabbableElements(containerRef.current, finalConfig);
    setTotalItems(tabbableElements.length);
    
    const activeElement = document.activeElement as HTMLElement;
    const newIndex = tabbableElements.indexOf(activeElement);
    setCurrentIndex(newIndex);
  }, [containerRef, finalConfig]);

  const focusNext = useCallback(() => {
    if (!containerRef.current) return;
    
    const tabbableElements = getTabbableElements(containerRef.current, finalConfig);
    const currentElement = document.activeElement as HTMLElement;
    const nextElement = findNextFocusableElement(containerRef.current, currentElement, 'next', finalConfig);
    
    if (nextElement) {
      focusElement(nextElement, {}, 'programmatic');
    }
  }, [containerRef, finalConfig]);

  const focusPrevious = useCallback(() => {
    if (!containerRef.current) return;
    
    const tabbableElements = getTabbableElements(containerRef.current, finalConfig);
    const currentElement = document.activeElement as HTMLElement;
    const previousElement = findNextFocusableElement(containerRef.current, currentElement, 'previous', finalConfig);
    
    if (previousElement) {
      focusElement(previousElement, {}, 'programmatic');
    }
  }, [containerRef, finalConfig]);

  const focusFirst = useCallback(() => {
    if (!containerRef.current) return;
    
    const tabbableElements = getTabbableElements(containerRef.current, finalConfig);
    if (tabbableElements.length > 0) {
      focusElement(tabbableElements[0], {}, 'programmatic');
    }
  }, [containerRef, finalConfig]);

  const focusLast = useCallback(() => {
    if (!containerRef.current) return;
    
    const tabbableElements = getTabbableElements(containerRef.current, finalConfig);
    if (tabbableElements.length > 0) {
      focusElement(tabbableElements[tabbableElements.length - 1], {}, 'programmatic');
    }
  }, [containerRef, finalConfig]);

  // Update tabbable count when container changes
  useEffect(() => {
    updateTabbableCount();
    
    if (!containerRef.current) return;
    
    const observer = new MutationObserver(updateTabbableCount);
    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['tabindex', 'disabled', 'aria-hidden'],
    });
    
    return () => {
      observer.disconnect();
    };
  }, [containerRef, updateTabbableCount]);

  // Track focus changes within container
  useEffect(() => {
    const handleFocusIn = () => {
      updateTabbableCount();
    };

    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [updateTabbableCount]);

  return {
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    currentIndex,
    totalItems,
  };
};

// =============================================================================
// FOCUS TRAP COMPONENT HELPERS
// =============================================================================

/**
 * Create focus trap container props
 */
export const createFocusTrapProps = (
  isActive: boolean,
  baseProps?: React.HTMLAttributes<HTMLDivElement>
): React.HTMLAttributes<HTMLDivElement> => {
  return {
    ...baseProps,
    'data-focus-trap': isActive.toString(),
  } as React.HTMLAttributes<HTMLDivElement>;
};

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export {
  isFocusable,
  isTabbable,
  getFocusableElements,
  getTabbableElements,
  isElementVisible,
  focusElement,
  findNextFocusableElement,
  FOCUSABLE_SELECTORS,
  TABBABLE_SELECTORS,
};