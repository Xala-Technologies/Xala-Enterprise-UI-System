/**
 * @fileoverview Platform Tokens - Multi-Platform Design Token System
 * @description Platform-specific design tokens for desktop, mobile, and tablet
 * @version 3.0.0
 * @compliance WCAG 2.2 AAA, NSM, DigDir, Enterprise Standards
 */

import { aliasSpacingTokens } from './alias-tokens';
import { globalBreakpoints, globalSpacingPrimitives } from './global-tokens';
import type { TokenValue } from './semantic-token-system';


// =============================================================================
// PLATFORM DETECTION UTILITIES
// =============================================================================

/**
 * Platform detection utilities
 */
export const platformUtils = { /**
   * Get current platform based on window properties
   */
  getCurrentPlatform(): 'mobile' | 'tablet' | 'desktop' { if (typeof window === 'undefined') return 'desktop';
    
    const width = window.innerWidth;
    
    // Check for mobile devices (below md breakpoint)
    if (width < parseInt(globalBreakpoints.md)) return 'mobile';
    
    // Check for tablet devices (below lg breakpoint)
    if (width < parseInt(globalBreakpoints.lg)) return 'tablet';
    
    return 'desktop'; },

  /**
   * Check if device is mobile
   */
  isMobile(): boolean { return this.getCurrentPlatform() === 'mobile'; },

  /**
   * Check if device is tablet
   */
  isTablet(): boolean { return this.getCurrentPlatform() === 'tablet'; },

  /**
   * Check if device is desktop
   */
  isDesktop(): boolean { return this.getCurrentPlatform() === 'desktop'; },

  /**
   * Get responsive breakpoint for current platform
   */
  getResponsiveBreakpoint(): string { const platform = this.getCurrentPlatform();
    switch (platform) { case 'mobile':
        return globalBreakpoints.sm;
      case 'tablet':
        return globalBreakpoints.md;
      case 'desktop':
        return globalBreakpoints.lg;
      default:
        return globalBreakpoints.lg; } },

  /**
   * Check if device supports hover
   */
  supportsHover(): boolean { if (typeof window === 'undefined') return true;
    return window.matchMedia('(hover: hover)').matches; },

  /**
   * Check if device supports touch
   */
  supportsTouch(): boolean { if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0; }, };

// =============================================================================
// PLATFORM-SPECIFIC LAYOUT TOKENS
// =============================================================================

/**
 * Desktop platform tokens
 */
const desktopTokens = { layout: { container: { maxWidth: '1200px',
      padding: aliasSpacingTokens['container-padding'].lg,
      margin: '0 auto', },
    sidebar: { width: 280,
      minWidth: 240,
      maxWidth: 320,
      collapsedWidth: 60, },
    header: { height: 64,
      padding: aliasSpacingTokens['container-padding'].md, },
    content: { padding: aliasSpacingTokens['container-padding'].lg,
      gap: globalSpacingPrimitives[20], // 80px },
    grid: { columns: 12,
      gap: globalSpacingPrimitives[6], // 24px
      margin: globalSpacingPrimitives[8], // 32px }, },
  interaction: { clickTarget: { minSize: 24, // Smaller for precise mouse interaction },
    hover: { enabled: true,
      delay: 0, },
    focus: { ringWidth: 2,
      ringOffset: 2, }, },
  navigation: { topBar: { height: 64,
      padding: aliasSpacingTokens['container-padding'].md, },
    sidebar: { width: 280,
      itemHeight: 48,
      padding: aliasSpacingTokens['container-padding'].md, },
    breadcrumbs: { height: 40,
      padding: aliasSpacingTokens['container-padding'].sm, }, }, } as const;

/**
 * Mobile platform tokens
 */
const mobileTokens = { layout: { container: { maxWidth: '100%',
      padding: aliasSpacingTokens['container-padding'].sm,
      margin: '0', },
    sidebar: { width: '100%',
      minWidth: 280,
      maxWidth: 320,
      collapsedWidth: 0, },
    header: { height: 56,
      padding: aliasSpacingTokens['container-padding'].sm, },
    content: { padding: aliasSpacingTokens['container-padding'].sm,
      gap: globalSpacingPrimitives[4], // 16px },
    grid: { columns: 4,
      gap: globalSpacingPrimitives[4], // 16px
      margin: globalSpacingPrimitives[4], // 16px }, },
  interaction: { clickTarget: { minSize: 44, // WCAG AA minimum for touch targets },
    hover: { enabled: false,
      delay: 0, },
    focus: { ringWidth: 3,
      ringOffset: 1, }, },
  navigation: { topBar: { height: 56,
      padding: aliasSpacingTokens['container-padding'].sm, },
    bottomBar: { height: 72,
      padding: aliasSpacingTokens['container-padding'].sm, },
    drawer: { width: 280,
      itemHeight: 56,
      padding: aliasSpacingTokens['container-padding'].sm, }, }, } as const;

/**
 * Tablet platform tokens
 */
const tabletTokens = { layout: { container: { maxWidth: '100%',
      padding: aliasSpacingTokens['container-padding'].md,
      margin: '0', },
    sidebar: { width: 320,
      minWidth: 280,
      maxWidth: 360,
      collapsedWidth: 80, },
    header: { height: 60,
      padding: aliasSpacingTokens['container-padding'].md, },
    content: { padding: aliasSpacingTokens['container-padding'].md,
      gap: globalSpacingPrimitives[6], // 24px },
    grid: { columns: 8,
      gap: globalSpacingPrimitives[6], // 24px
      margin: globalSpacingPrimitives[6], // 24px }, },
  interaction: { clickTarget: { minSize: 32, // Compromise between desktop and mobile },
    hover: { enabled: true,
      delay: 100, },
    focus: { ringWidth: 2,
      ringOffset: 1, }, },
  navigation: { topBar: { height: 60,
      padding: aliasSpacingTokens['container-padding'].md, },
    sidebar: { width: 320,
      itemHeight: 52,
      padding: aliasSpacingTokens['container-padding'].md, },
    breadcrumbs: { height: 44,
      padding: aliasSpacingTokens['container-padding'].sm, }, }, } as const;

// =============================================================================
// UNIFIED PLATFORM TOKENS
// =============================================================================

/**
 * Unified platform tokens with responsive utilities
 */
export const platformTokens = { desktop: desktopTokens,
  mobile: mobileTokens,
  tablet: tabletTokens,
  utils: platformUtils,

  /**
   * Get current platform tokens
   */
  getCurrentPlatformTokens() { const platform = platformUtils.getCurrentPlatform();
    switch (platform) { case 'mobile':
        return mobileTokens;
      case 'tablet':
        return tabletTokens;
      case 'desktop':
        return desktopTokens;
      default:
        return desktopTokens; } },

  /**
   * Get responsive token value
   */
  getResponsiveToken(tokenPath: string): TokenValue { const currentTokens = this.getCurrentPlatformTokens();
    const pathParts = tokenPath.spli'.';
    
    let value: unknown = currentTokens;
    for (const part of pathParts) { value = value?.[part];
      if (value === undefined) break; }
    
    return value; },

  /**
   * Get platform-specific spacing
   */
  getPlatformSpacing(size: keyof typeof globalSpacingPrimitives): string { const platform = platformUtils.getCurrentPlatform();
    const multiplier = platform === 'mobile' ? 1 : platform === 'tablet' ? 1.2 : 1.5;
    
    const baseSpacing = globalSpacingPrimitives[size];
    const numericValue = parseFloat(baseSpacing);
    return `${numericValue * multiplier}px`; },

  /**
   * Get platform-specific click target size
   */
  getClickTargetSize(): number { const currentTokens = this.getCurrentPlatformTokens();
    return currentTokens.interaction.clickTarget.minSize; },

  /**
   * Check if platform supports hover interactions
   */
  supportsHover(): boolean { const currentTokens = this.getCurrentPlatformTokens();
    return currentTokens.interaction.hover.enabled && platformUtils.supportsHover(); },

  /**
   * Get platform-specific navigation height
   */
  getNavigationHeight(): number { const currentTokens = this.getCurrentPlatformTokens();
    return currentTokens.navigation.topBar.height; },

  /**
   * Get platform-specific sidebar width
   */
  getSidebarWidth(): number | string { const currentTokens = this.getCurrentPlatformTokens();
    return currentTokens.layout.sidebar.width; },

  /**
   * Get responsive grid columns
   */
  getGridColumns(): number { const currentTokens = this.getCurrentPlatformTokens();
    return currentTokens.layout.grid.columns; }, } as const;

// =============================================================================
// EXPORT EVERYTHING
// =============================================================================

export { desktopTokens,
    mobileTokens,
    tabletTokens };

    export type { TokenValue };

export default platformTokens; 