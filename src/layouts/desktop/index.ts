/**
 * Desktop Layout Components
 * Refactored into smaller, focused components following SOLID principles
 */

// Import v5.0 components
import {
  DesktopLayout as DesktopLayoutV5,
  DesktopHeader as DesktopHeaderV5,
  DesktopSidebar as DesktopSidebarV5,
  DesktopMainContent as DesktopMainContentV5,
  DesktopToolbar as DesktopToolbarV5,
  DesktopStatusBar as DesktopStatusBarV5,
  DesktopLayoutComposition as DesktopLayoutCompositionV5,
} from './DesktopLayout';

// Import legacy components for composition
import { DesktopHeader } from './components/DesktopHeader';
import { DesktopLayout } from './components/DesktopLayout';
import { DesktopMainContent } from './components/DesktopMainContent';
import { DesktopSidebar } from './components/DesktopSidebar';
import { DesktopStatusBar } from './components/DesktopStatusBar';
import { DesktopToolbar } from './components/DesktopToolbar';

// Export v5.0 components as primary
export {
  DesktopLayoutV5 as DesktopLayout,
  DesktopHeaderV5 as DesktopHeader,
  DesktopSidebarV5 as DesktopSidebar,
  DesktopMainContentV5 as DesktopMainContent,
  DesktopToolbarV5 as DesktopToolbar,
  DesktopStatusBarV5 as DesktopStatusBar,
  DesktopLayoutCompositionV5 as DesktopLayoutComposition,
};

// Export legacy components with suffix
export {
  DesktopHeader as DesktopHeaderLegacy,
  DesktopLayout as DesktopLayoutLegacy,
  DesktopMainContent as DesktopMainContentLegacy,
  DesktopSidebar as DesktopSidebarLegacy,
  DesktopStatusBar as DesktopStatusBarLegacy,
  DesktopToolbar as DesktopToolbarLegacy,
};

// Export all variants
export * from './DesktopLayout';

// Variants and types from legacy
export {
    desktopHeaderVariants,
    desktopMainContentVariants,
    desktopSidebarVariants,
    desktopStatusBarVariants,
    desktopToolbarVariants,
} from './variants';

export type {
    DesktopHeaderProps,
    DesktopLayoutProps,
    DesktopMainContentProps,
    DesktopSidebarProps,
    DesktopStatusBarProps,
    DesktopToolbarProps
} from './types';
