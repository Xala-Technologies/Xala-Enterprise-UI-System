/**
 * @fileoverview Layout Debugger v5.0.0 - Token-Based Design System
 * @description Comprehensive layout debugging utilities with visual overlays and runtime inspection
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import type { BreakpointKey } from './responsive';
import { useBreakpoint } from './responsive';

// =============================================================================
// LAYOUT DEBUGGER TYPES
// =============================================================================

export interface DebugOptions {
  readonly showGrid: boolean;
  readonly showSpacing: boolean;
  readonly showBreakpoints: boolean;
  readonly showFlexbox: boolean;
  readonly showZIndex: boolean;
  readonly showOverflow: boolean;
  readonly highlightElement: string | null;
  readonly showAccessibility: boolean;
  readonly opacity: number;
}

export interface DebugOverlayConfig {
  readonly enabled: boolean;
  readonly position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  readonly theme: 'light' | 'dark' | 'auto';
  readonly hotkey: string;
  readonly persistSettings: boolean;
}

export interface ElementDebugInfo {
  readonly element: HTMLElement;
  readonly computedStyles: CSSStyleDeclaration;
  readonly box: {
    readonly margin: BoxDimensions;
    readonly border: BoxDimensions;
    readonly padding: BoxDimensions;
    readonly content: { width: number; height: number };
  };
  readonly layout: {
    readonly display: string;
    readonly position: string;
    readonly flexDirection?: string;
    readonly gridTemplate?: string;
    readonly zIndex: string;
  };
  readonly accessibility: {
    readonly role: string | null;
    readonly ariaLabel: string | null;
    readonly tabIndex: number;
    readonly focusable: boolean;
  };
}

export interface BoxDimensions {
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

// =============================================================================
// DEFAULT CONFIGURATION
// =============================================================================

export const DEFAULT_DEBUG_OPTIONS: DebugOptions = {
  showGrid: false,
  showSpacing: false,
  showBreakpoints: true,
  showFlexbox: false,
  showZIndex: false,
  showOverflow: false,
  highlightElement: null,
  showAccessibility: false,
  opacity: 0.8,
} as const;

export const DEFAULT_OVERLAY_CONFIG: DebugOverlayConfig = {
  enabled: process.env.NODE_ENV === 'development',
  position: 'top-right',
  theme: 'auto',
  hotkey: 'ctrl+shift+d',
  persistSettings: true,
} as const;

// =============================================================================
// DEBUG STYLES
// =============================================================================

const DEBUG_STYLES = {
  grid: `
    background-image: 
      linear-gradient(rgba(255, 0, 0, 0.3) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 0, 0, 0.3) 1px, transparent 1px);
    background-size: 8px 8px;
  `,
  spacing: `
    box-shadow: 
      inset 0 0 0 1px rgba(255, 0, 0, 0.5),
      0 0 0 1px rgba(0, 255, 0, 0.5);
  `,
  flexbox: `
    outline: 2px dashed rgba(0, 0, 255, 0.7) !important;
    outline-offset: -2px;
  `,
  grid_container: `
    outline: 2px dashed rgba(255, 165, 0, 0.7) !important;
    outline-offset: -2px;
  `,
  overflow: `
    background: repeating-linear-gradient(
      45deg,
      rgba(255, 0, 0, 0.1),
      rgba(255, 0, 0, 0.1) 10px,
      transparent 10px,
      transparent 20px
    ) !important;
  `,
  zindex: `
    position: relative;
  `,
  highlight: `
    outline: 3px solid rgba(255, 255, 0, 0.8) !important;
    outline-offset: 2px;
    background: rgba(255, 255, 0, 0.1) !important;
  `,
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Parse box model values from computed styles
 */
const parseBoxDimensions = (value: string): BoxDimensions => {
  const values = value.split(' ').map(v => parseFloat(v) || 0);
  
  switch (values.length) {
    case 1:
      return { top: values[0], right: values[0], bottom: values[0], left: values[0] };
    case 2:
      return { top: values[0], right: values[1], bottom: values[0], left: values[1] };
    case 3:
      return { top: values[0], right: values[1], bottom: values[2], left: values[1] };
    case 4:
      return { top: values[0], right: values[1], bottom: values[2], left: values[3] };
    default:
      return { top: 0, right: 0, bottom: 0, left: 0 };
  }
};

/**
 * Get detailed element debug information
 */
const getElementDebugInfo = (element: HTMLElement): ElementDebugInfo => {
  const computedStyles = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  
  return {
    element,
    computedStyles,
    box: {
      margin: parseBoxDimensions(computedStyles.margin),
      border: parseBoxDimensions(computedStyles.borderWidth),
      padding: parseBoxDimensions(computedStyles.padding),
      content: {
        width: rect.width,
        height: rect.height,
      },
    },
    layout: {
      display: computedStyles.display,
      position: computedStyles.position,
      flexDirection: computedStyles.flexDirection || undefined,
      gridTemplate: computedStyles.gridTemplate || undefined,
      zIndex: computedStyles.zIndex,
    },
    accessibility: {
      role: element.getAttribute('role'),
      ariaLabel: element.getAttribute('aria-label'),
      tabIndex: element.tabIndex,
      focusable: element.tabIndex >= 0 || ['input', 'button', 'select', 'textarea', 'a'].includes(element.tagName.toLowerCase()),
    },
  };
};

/**
 * Apply debug styles to elements
 */
const applyDebugStyles = (options: DebugOptions): void => {
  if (typeof document === 'undefined') return;
  
  // Remove existing debug styles
  const existingStyle = document.getElementById('layout-debugger-styles');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  const style = document.createElement('style');
  style.id = 'layout-debugger-styles';
  
  let css = '';
  
  // Grid overlay
  if (options.showGrid) {
    css += `
      body { ${DEBUG_STYLES.grid} }
    `;
  }
  
  // Spacing visualization
  if (options.showSpacing) {
    css += `
      * { ${DEBUG_STYLES.spacing} }
    `;
  }
  
  // Flexbox visualization
  if (options.showFlexbox) {
    css += `
      [style*="display: flex"],
      [style*="display:flex"],
      .flex { ${DEBUG_STYLES.flexbox} }
    `;
  }
  
  // Grid container visualization
  if (options.showGrid) {
    css += `
      [style*="display: grid"],
      [style*="display:grid"],
      .grid { ${DEBUG_STYLES.grid_container} }
    `;
  }
  
  // Overflow visualization
  if (options.showOverflow) {
    css += `
      [style*="overflow: hidden"],
      [style*="overflow:hidden"],
      .overflow-hidden { ${DEBUG_STYLES.overflow} }
    `;
  }
  
  // Z-index visualization
  if (options.showZIndex) {
    css += `
      [style*="z-index"],
      [class*="z-"] {
        ${DEBUG_STYLES.zindex}
      }
      [style*="z-index"]:before,
      [class*="z-"]:before {
        content: attr(style);
        position: absolute;
        top: -20px;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 2px 4px;
        font-size: 10px;
        white-space: nowrap;
        pointer-events: none;
        z-index: 999999;
      }
    `;
  }
  
  // Element highlighting
  if (options.highlightElement) {
    css += `
      ${options.highlightElement} { ${DEBUG_STYLES.highlight} }
    `;
  }
  
  // Accessibility visualization
  if (options.showAccessibility) {
    css += `
      [role]:before {
        content: "role=" attr(role);
        position: absolute;
        top: -15px;
        right: 0;
        background: purple;
        color: white;
        padding: 1px 3px;
        font-size: 9px;
        pointer-events: none;
        z-index: 999999;
      }
      [aria-label]:after {
        content: "aria-label=" attr(aria-label);
        position: absolute;
        bottom: -15px;
        left: 0;
        background: blue;
        color: white;
        padding: 1px 3px;
        font-size: 9px;
        pointer-events: none;
        z-index: 999999;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `;
  }
  
  style.textContent = css;
  document.head.appendChild(style);
};

/**
 * Create breakpoint indicator
 */
const createBreakpointIndicator = (breakpoint: BreakpointKey, theme: 'light' | 'dark'): HTMLElement => {
  const indicator = document.createElement('div');
  indicator.id = 'breakpoint-indicator';
  indicator.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    background: ${theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
    color: ${theme === 'dark' ? 'white' : 'black'};
    padding: 8px 12px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
    font-weight: bold;
    z-index: 999999;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    pointer-events: none;
  `;
  indicator.textContent = `Breakpoint: ${breakpoint.toUpperCase()}`;
  
  return indicator;
};

// =============================================================================
// LAYOUT DEBUGGER HOOKS
// =============================================================================

/**
 * Main layout debugger hook
 */
export const useLayoutDebugger = (
  initialOptions: Partial<DebugOptions> = {},
  config: Partial<DebugOverlayConfig> = {}
): {
  options: DebugOptions;
  updateOptions: (newOptions: Partial<DebugOptions>) => void;
  toggleOption: (key: keyof DebugOptions) => void;
  inspectElement: (selector: string) => ElementDebugInfo | null;
  isEnabled: boolean;
  toggle: () => void;
} => {
  const [options, setOptions] = useState<DebugOptions>(() => ({
    ...DEFAULT_DEBUG_OPTIONS,
    ...initialOptions,
  }));
  
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const breakpoint = useBreakpoint();
  
  const finalConfig = useMemo(() => ({
    ...DEFAULT_OVERLAY_CONFIG,
    ...config,
  }), [config]);

  // Load persisted settings
  useEffect(() => {
    if (!finalConfig.persistSettings || typeof localStorage === 'undefined') return;
    
    try {
      const saved = localStorage.getItem('layout-debugger-options');
      if (saved) {
        const parsedOptions = JSON.parse(saved);
        setOptions(prev => ({ ...prev, ...parsedOptions }));
      }
      
      const savedEnabled = localStorage.getItem('layout-debugger-enabled');
      if (savedEnabled) {
        setIsEnabled(JSON.parse(savedEnabled));
      }
    } catch (error) {
      console.warn('Failed to load layout debugger settings:', error);
    }
  }, [finalConfig.persistSettings]);

  // Apply debug styles when options change
  useEffect(() => {
    if (isEnabled && finalConfig.enabled) {
      applyDebugStyles(options);
    } else {
      // Remove debug styles
      const existingStyle = document.getElementById('layout-debugger-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    }
  }, [options, isEnabled, finalConfig.enabled]);

  // Show/hide breakpoint indicator
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const existingIndicator = document.getElementById('breakpoint-indicator');
    if (existingIndicator) {
      existingIndicator.remove();
    }
    
    if (isEnabled && options.showBreakpoints && finalConfig.enabled) {
      const theme = finalConfig.theme === 'auto' 
        ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        : finalConfig.theme;
      
      const indicator = createBreakpointIndicator(breakpoint, theme);
      document.body.appendChild(indicator);
    }
  }, [isEnabled, options.showBreakpoints, breakpoint, finalConfig.enabled, finalConfig.theme]);

  // Hotkey listener
  useEffect(() => {
    if (!finalConfig.enabled || typeof window === 'undefined') return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      const hotkey = finalConfig.hotkey.toLowerCase();
      const keys = hotkey.split('+');
      
      const ctrlPressed = keys.includes('ctrl') ? event.ctrlKey : true;
      const shiftPressed = keys.includes('shift') ? event.shiftKey : true;
      const keyPressed = event.key.toLowerCase() === keys[keys.length - 1];
      
      if (ctrlPressed && shiftPressed && keyPressed) {
        event.preventDefault();
        setIsEnabled(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [finalConfig.enabled, finalConfig.hotkey]);

  const updateOptions = useCallback((newOptions: Partial<DebugOptions>) => {
    setOptions(prev => {
      const updated = { ...prev, ...newOptions };
      
      // Persist settings
      if (finalConfig.persistSettings && typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem('layout-debugger-options', JSON.stringify(updated));
        } catch (error) {
          console.warn('Failed to save layout debugger settings:', error);
        }
      }
      
      return updated;
    });
  }, [finalConfig.persistSettings]);

  const toggleOption = useCallback((key: keyof DebugOptions) => {
    updateOptions({ [key]: !options[key] });
  }, [options, updateOptions]);

  const toggle = useCallback(() => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);
    
    // Persist enabled state
    if (finalConfig.persistSettings && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('layout-debugger-enabled', JSON.stringify(newEnabled));
      } catch (error) {
        console.warn('Failed to save layout debugger enabled state:', error);
      }
    }
  }, [isEnabled, finalConfig.persistSettings]);

  const inspectElement = useCallback((selector: string): ElementDebugInfo | null => {
    if (typeof document === 'undefined') return null;
    
    try {
      const element = document.querySelector(selector) as HTMLElement;
      if (!element) return null;
      
      return getElementDebugInfo(element);
    } catch (error) {
      console.error('Failed to inspect element:', error);
      return null;
    }
  }, []);

  return {
    options,
    updateOptions,
    toggleOption,
    inspectElement,
    isEnabled,
    toggle,
  };
};

// =============================================================================
// LAYOUT DEBUGGER CLASS
// =============================================================================

/**
 * Layout Debugger utility class
 */
export class LayoutDebugger {
  private options: DebugOptions;
  private config: DebugOverlayConfig;
  private isEnabled: boolean = false;

  constructor(
    initialOptions: Partial<DebugOptions> = {},
    config: Partial<DebugOverlayConfig> = {}
  ) {
    this.options = { ...DEFAULT_DEBUG_OPTIONS, ...initialOptions };
    this.config = { ...DEFAULT_OVERLAY_CONFIG, ...config };
    
    if (this.config.enabled) {
      this.setupHotkey();
      this.loadSettings();
    }
  }

  /**
   * Enable/disable debugger
   */
  toggle(): void {
    this.isEnabled = !this.isEnabled;
    
    if (this.isEnabled) {
      this.applyStyles();
    } else {
      this.removeStyles();
    }
    
    this.saveSettings();
  }

  /**
   * Update debug options
   */
  updateOptions(newOptions: Partial<DebugOptions>): void {
    this.options = { ...this.options, ...newOptions };
    
    if (this.isEnabled) {
      this.applyStyles();
    }
    
    this.saveSettings();
  }

  /**
   * Inspect element
   */
  inspectElement(selector: string): ElementDebugInfo | null {
    if (typeof document === 'undefined') return null;
    
    try {
      const element = document.querySelector(selector) as HTMLElement;
      if (!element) return null;
      
      return getElementDebugInfo(element);
    } catch (error) {
      console.error('Failed to inspect element:', error);
      return null;
    }
  }

  /**
   * Get current options
   */
  getOptions(): DebugOptions {
    return { ...this.options };
  }

  /**
   * Check if debugger is enabled
   */
  isDebuggerEnabled(): boolean {
    return this.isEnabled;
  }

  private applyStyles(): void {
    applyDebugStyles(this.options);
  }

  private removeStyles(): void {
    const existingStyle = document.getElementById('layout-debugger-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    const indicator = document.getElementById('breakpoint-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  private setupHotkey(): void {
    if (typeof window === 'undefined') return;
    
    window.addEventListener('keydown', (event) => {
      const hotkey = this.config.hotkey.toLowerCase();
      const keys = hotkey.split('+');
      
      const ctrlPressed = keys.includes('ctrl') ? event.ctrlKey : true;
      const shiftPressed = keys.includes('shift') ? event.shiftKey : true;
      const keyPressed = event.key.toLowerCase() === keys[keys.length - 1];
      
      if (ctrlPressed && shiftPressed && keyPressed) {
        event.preventDefault();
        this.toggle();
      }
    });
  }

  private loadSettings(): void {
    if (!this.config.persistSettings || typeof localStorage === 'undefined') return;
    
    try {
      const savedOptions = localStorage.getItem('layout-debugger-options');
      if (savedOptions) {
        this.options = { ...this.options, ...JSON.parse(savedOptions) };
      }
      
      const savedEnabled = localStorage.getItem('layout-debugger-enabled');
      if (savedEnabled) {
        this.isEnabled = JSON.parse(savedEnabled);
        if (this.isEnabled) {
          this.applyStyles();
        }
      }
    } catch (error) {
      console.warn('Failed to load layout debugger settings:', error);
    }
  }

  private saveSettings(): void {
    if (!this.config.persistSettings || typeof localStorage === 'undefined') return;
    
    try {
      localStorage.setItem('layout-debugger-options', JSON.stringify(this.options));
      localStorage.setItem('layout-debugger-enabled', JSON.stringify(this.isEnabled));
    } catch (error) {
      console.warn('Failed to save layout debugger settings:', error);
    }
  }
}

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export const layoutDebugger = new LayoutDebugger();

// Export utility functions
export {
  parseBoxDimensions,
  getElementDebugInfo,
  applyDebugStyles,
  createBreakpointIndicator,
};