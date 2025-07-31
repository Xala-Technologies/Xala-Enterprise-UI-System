/**
 * @fileoverview BaseLayout Component v5.0.0 - Token-Based Design System (SOLID Refactored)
 * @description Main entry point for layout system components following SOLID principles
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

// Re-export all layout components from the refactored components directory
export {
  BaseLayout,
  LayoutHeader as Header,
  LayoutSidebar as Sidebar,
  LayoutMainContent as MainContent,
  LayoutFooter as Footer,
  LayoutComposition,
  createLayout,
  LayoutProvider,
  useLayoutContext,
  baseLayoutVariants,
  headerVariants,
  sidebarVariants,
  mainContentVariants,
  footerVariants,
} from './components';

export type {
  BaseLayoutProps,
  LayoutHeaderProps as HeaderProps,
  LayoutSidebarProps as SidebarProps,
  LayoutMainContentProps as MainContentProps,
  LayoutFooterProps as FooterProps,
  BaseLayoutVariant,
  LayoutHeaderVariant as HeaderVariant,
  LayoutSidebarVariant as SidebarVariant,
  LayoutMainContentVariant as MainContentVariant,
  LayoutFooterVariant as FooterVariant,
  LayoutFactoryConfig,
} from './components';

// Platform detection hook (kept for backward compatibility)
import React from 'react';

/**
 * SSR-safe platform detection hook
 * @deprecated Use platform-specific variants instead
 */
export const useLayoutPlatform = (): 'mobile' | 'tablet' | 'desktop' => {
  const [platform, setPlatform] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  React.useEffect(() => {
    const detectPlatform = (): void => {
      if (typeof window === 'undefined') return;
      
      const width = window.innerWidth;
      const mobileBreakpoint = 768;
      const tabletBreakpoint = 1024;
      
      if (width < mobileBreakpoint) {
        setPlatform('mobile');
      } else if (width < tabletBreakpoint) {
        setPlatform('tablet');
      } else {
        setPlatform('desktop');
      }
    };

    detectPlatform();
    window.addEventListener('resize', detectPlatform);
    return (): void => window.removeEventListener('resize', detectPlatform);
  }, []);

  return platform;
};