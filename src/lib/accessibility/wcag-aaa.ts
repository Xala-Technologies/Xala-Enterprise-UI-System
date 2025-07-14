/**

 * WCAG AAA Accessibility Utilities
 * Comprehensive accessibility functions for the Xala Design System
 */

/**
 * WCAG AAA contrast ratio requirements
 */
export const WCAG_AAA_STANDARDS = { NORMAL_TEXT: 7.0,     // 7:1 ratio for normal text
  LARGE_TEXT: 4.5,      // 4.5:1 ratio for large text (18pt+ or 14pt+ bold)
  GRAPHICAL: 3.0,       // 3:1 ratio for graphical objects and UI components } as const;

/**
 * Focus management utilities
 */
export const focusManagement = { /**
   * Focus ring styles that meet WCAG AAA requirements
   */
  getFocusRing: (color: string = '#1987ff'): string => { return `
      outline: 2px solid ${color};
      outline-offset: 2px;
      box-shadow: 0 0 0 4px ${color}25;
    `; },

  /**
   * Skip link styles for keyboard navigation
   */
  getSkipLinkStyles: (): string => { return `
      position: absolute;
      left: -9999px;
      z-index: 999;
      padding: 8px 16px;
      background: #000;
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      
      &:focus { left: 6px;
        top: 6px; }
    `; },

  /**
   * Trap focus within a container
   */
  trapFocus: (container: HTMLElement): (() => void) => { const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    if (focusableElements.length === 0) { return () => {}; }
    
    const firstFocusableElement = focusableElements[0] as HTMLElement;
    const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent): React.ReactElement => { return () => { container.removeEventListener('keydown', handleTabKey); }; }, };

/**
 * Color contrast calculation utilities
 */
export const colorContrast = { /**
   * Calculate relative luminance of a color
   */
  getLuminance: (color: string): number => { const hex = color.replace('#', '');
    if (hex.length < 6) { throw new Error('Invalid hex color format'); }
    
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const sRGB = [r, g, b].map((c) => { return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); });

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]; },

  /**
   * Calculate contrast ratio between two colors
   */
  getContrastRatio: (color1: string, color2: string): number => { const lum1 = colorContrast.getLuminance(color1);
    const lum2 = colorContrast.getLuminance(color2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    
    return (lighter + 0.05) / (darker + 0.05); },

  /**
   * Check if color combination meets WCAG AAA standards
   */
  meetsWCAGAAA: (
    foreground: string, 
    background: string, 
    isLargeText: boolean = false
  ): boolean => { const ratio = colorContrast.getContrastRatio(foreground, background);
    const requirement = isLargeText ? WCAG_AAA_STANDARDS.LARGE_TEXT : WCAG_AAA_STANDARDS.NORMAL_TEXT;
    return ratio >= requirement; },

  /**
   * Find the best contrast color for a given background
   */
  getBestContrastColor: (backgroundColor: string, textColors: string[]): string => { if (textColors.length === 0) { throw new Error('No text colors provided'); }
    
    let bestColor = textColors[0];
    let bestRatio = 0;

    textColors.forEach((color) => { const ratio = colorContrast.getContrastRatio(color, backgroundColor);
      if (ratio > bestRatio) { bestRatio = ratio;
        bestColor = color; } });

    return bestColor; }, };

/**
 * Keyboard navigation utilities
 */
export const keyboardNavigation = { /**
   * Standard keyboard event handlers
   */
  handleArrowKeys: (items: HTMLElement[], currentIndex: number, direction: 'horizontal' | 'vertical' = 'horizontal') => { const isHorizontal = direction === 'horizontal';
    
    return (e: KeyboardEvent): React.ReactElement => { return (e: KeyboardEvent): React.ReactElement => { return (e: KeyboardEvent): void => { if (e.key === 'Escape') { e.preventDefault();
        callback(); } }; }, };

/**
 * Screen reader utilities
 */
export const screenReader = { /**
   * Announce text to screen readers
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite'): void => { const announcer = document.createElemen'div';
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => { document.body.removeChild(announcer); }, 1000); },

  /**
   * Screen reader only styles
   */
  getScreenReaderOnlyStyles: (): string => { return `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `; },

  /**
   * Create accessible labels for form elements
   */
  createAccessibleLabel: (
    inputId: string,
    labelText: string,
    description?: string,
    isRequired: boolean = false
  ): { labelId: string;
    descriptionId?: string;
    ariaLabelledBy: string;
    ariaDescribedBy?: string; } => { const labelId = `${inputId}-label`;
    const descriptionId = description ? `${inputId}-description` : undefined;
    
    return { labelId,
      ...(descriptionId && { descriptionId }),
      ariaLabelledBy: labelId,
      ...(descriptionId && { ariaDescribedBy: descriptionId }), }; }, };

/**
 * Motion and animation utilities for accessibility
 */
export const motionAccessibility = { /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion: (): boolean => { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; },

  /**
   * Get safe animation duration based on user preference
   */
  getSafeAnimationDuration: (duration: number): number => { return motionAccessibility.prefersReducedMotion() ? 0 : duration; },

  /**
   * Responsive animation utility
   */
  getResponsiveAnimation: (
    normalAnimation: string,
    reducedAnimation: string = 'none'
  ): string => { return `
      @media (prefers-reduced-motion: reduce) { animation: ${reducedAnimation};
        transition: none; }
      
      @media (prefers-reduced-motion: no-preference) { animation: ${normalAnimation}; }
    `; }, };

/**
 * Touch target utilities
 */
export const touchTarget = { /**
   * Minimum touch target size (44px x 44px per WCAG)
   */
  MINIMUM_SIZE: 44,

  /**
   * Ensure touch target meets minimum size requirements
   */
  ensureMinimumSize: (width: number, height: number): { width: number; height: number } => { return { width: Math.max(width, touchTarget.MINIMUM_SIZE),
      height: Math.max(height, touchTarget.MINIMUM_SIZE), }; },

  /**
   * Get touch target styles
   */
  getTouchTargetStyles: (padding: number = 12): string => { return `
      min-width: ${touchTarget.MINIMUM_SIZE}px;
      min-height: ${touchTarget.MINIMUM_SIZE}px;
      padding: ${padding}px;
      touch-action: manipulation;
    `; }, };

/**
 * Typography accessibility utilities
 */
export const typographyAccessibility = { /**
   * Get accessible font size based on zoom level
   */
  getAccessibleFontSize: (baseFontSize: number, zoomLevel: number = 1): number => { return Math.max(baseFontSize * zoomLevel, 12); // Minimum 12px },

  /**
   * Get accessible line height for readability
   */
  getAccessibleLineHeight: (fontSize: number): number => { return Math.max(fontSize * 1.5, 24); // Minimum 1.5x line height },

  /**
   * Check if text size qualifies as "large text" per WCAG
   */
  isLargeText: (fontSize: number, fontWeight: number = 400): boolean => { return fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700); }, };

/**
 * Export all accessibility utilities
 */
export const xalaAccessibility = { focusManagement,
  colorContrast,
  keyboardNavigation,
  screenReader,
  motionAccessibility,
  touchTarget,
  typographyAccessibility,
  WCAG_AAA_STANDARDS, };

export default xalaAccessibility; 