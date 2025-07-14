/**
 * WCAG AAA accessibility utilities for enterprise UI systems
 * Norwegian compliance focused implementation
 */


/**
 * Focus management utilities for keyboard navigation
 */
export const focusManagement = {
  /**
   * Trap focus within a container element
   * @param container - Container element to trap focus within
   * @returns Cleanup function to remove focus trap
   */
  trapFocus: (container: HTMLElement): (() => void) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusableElement = focusableElements[0] as HTMLElement;
    const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent): void => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  },
};

/**
 * Color contrast utilities for WCAG compliance
 */
export const colorContrast = {
  /**
   * Calculate relative luminance of a color
   * @param color - Hex color string
   * @returns Relative luminance value
   */
  getLuminance: (color: string): number => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * (sRGB[0] ?? 0) + 0.7152 * (sRGB[1] ?? 0) + 0.0722 * (sRGB[2] ?? 0);
  },

  /**
   * Calculate contrast ratio between two colors
   * @param color1 - First color (hex)
   * @param color2 - Second color (hex)
   * @returns Contrast ratio
   */
  getContrastRatio: (color1: string, color2: string): number => {
    const lum1 = colorContrast.getLuminance(color1);
    const lum2 = colorContrast.getLuminance(color2);
    return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
  },

  /**
   * Check if color combination meets WCAG AA standard
   * @param foreground - Foreground color (hex)
   * @param background - Background color (hex)
   * @returns True if meets AA standard
   */
  meetsWCAGAA: (foreground: string, background: string): boolean => {
    const ratio = colorContrast.getContrastRatio(foreground, background);
    return ratio >= 4.5; // AA standard for normal text
  },

  /**
   * Check if color combination meets WCAG AAA standard
   * @param foreground - Foreground color (hex)
   * @param background - Background color (hex)
   * @returns True if meets AAA standard
   */
  meetsWCAGAAA: (foreground: string, background: string): boolean => {
    const ratio = colorContrast.getContrastRatio(foreground, background);
    return ratio >= 7; // AAA standard for normal text
  },

  /**
   * Find best contrasting color from a palette
   * @param backgroundColor - Background color (hex)
   * @param colorPalette - Array of color options (hex)
   * @returns Best contrasting color
   */
  findBestContrast: (backgroundColor: string, colorPalette: string[]): string => {
    if (colorPalette.length === 0) {
      return '#000000'; // Default fallback
    }
    
    let bestColor: string = colorPalette[0] || '#000000';
    let bestRatio = 0;

    for (const color of colorPalette) {
      const ratio = colorContrast.getContrastRatio(color, backgroundColor);
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestColor = color;
      }
    }

    return bestColor;
  },
};

/**
 * Keyboard navigation utilities
 */
export const keyboardNavigation = {
  /**
   * Handle arrow key navigation for lists/grids
   * @param items - Array of focusable elements
   * @param currentIndex - Current focused index
   * @param direction - Navigation direction
   * @returns Event handler function
   */
  handleArrowKeys: (
    items: HTMLElement[], 
    currentIndex: number, 
    direction: 'horizontal' | 'vertical' = 'horizontal'
  ): ((e: KeyboardEvent) => void) => {
    const isHorizontal = direction === 'horizontal';
    
    return (e: KeyboardEvent): void => {
      let newIndex = currentIndex;
      
      if (isHorizontal) {
        if (e.key === 'ArrowRight') newIndex = Math.min(currentIndex + 1, items.length - 1);
        if (e.key === 'ArrowLeft') newIndex = Math.max(currentIndex - 1, 0);
      } else {
        if (e.key === 'ArrowDown') newIndex = Math.min(currentIndex + 1, items.length - 1);
        if (e.key === 'ArrowUp') newIndex = Math.max(currentIndex - 1, 0);
      }
      
      if (newIndex !== currentIndex) {
        const targetElement = items[newIndex];
        if (targetElement) {
          targetElement.focus();
        }
        e.preventDefault();
      }
    };
  },
};

/**
 * Screen reader utilities
 */
export const screenReader = {
  /**
   * Announce message to screen readers
   * @param message - Message to announce
   * @param priority - Announcement priority
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },

  /**
   * Create accessible label for form elements
   * @param element - Form element
   * @param labelText - Label text
   * @param isRequired - Whether field is required
   */
  createLabel: (
    element: HTMLElement,
    labelText: string,
    isRequired: boolean = false
  ): void => {
    const label = document.createElement('label');
    label.textContent = labelText + (isRequired ? ' *' : '');
    label.setAttribute('for', element.id);
    
    const parent = element.parentNode;
    if (parent) {
      parent.insertBefore(label, element);
    }
  },
};

/**
 * Main accessibility utilities export
 */
export const xalaAccessibility = {
  focusManagement,
  colorContrast,
  keyboardNavigation,
  screenReader,
};

export default xalaAccessibility; 