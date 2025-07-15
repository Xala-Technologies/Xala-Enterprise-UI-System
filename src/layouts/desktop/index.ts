/**
 * Desktop Layout Components
 * Refactored into smaller, focused components following SOLID principles
 */

// Import components for composition
import { DesktopHeader } from './components/DesktopHeader';
import { DesktopLayout } from './components/DesktopLayout';
import { DesktopMainContent } from './components/DesktopMainContent';
import { DesktopSidebar } from './components/DesktopSidebar';
import { DesktopStatusBar } from './components/DesktopStatusBar';
import { DesktopToolbar } from './components/DesktopToolbar';

// Core components
export { DesktopHeader } from './components/DesktopHeader';
export { DesktopLayout } from './components/DesktopLayout';
export { DesktopMainContent } from './components/DesktopMainContent';
export { DesktopSidebar } from './components/DesktopSidebar';
export { DesktopStatusBar } from './components/DesktopStatusBar';
export { DesktopToolbar } from './components/DesktopToolbar';

// Variants and types
export {
    desktopHeaderVariants,
    desktopMainContentVariants,
    desktopSidebarVariants,
    desktopStatusBarVariants,
    desktopToolbarVariants,
    type DesktopHeaderVariant,
    type DesktopMainContentVariant,
    type DesktopSidebarVariant,
    type DesktopStatusBarVariant,
    type DesktopToolbarVariant
} from './variants';

export type {
    DesktopHeaderProps,
    DesktopLayoutProps,
    DesktopMainContentProps,
    DesktopSidebarProps,
    DesktopStatusBarProps,
    DesktopToolbarProps
} from './types';

// Composition helper
export const DesktopLayoutComposition = {
  Header: DesktopHeader,
  Sidebar: DesktopSidebar,
  MainContent: DesktopMainContent,
  Toolbar: DesktopToolbar,
  StatusBar: DesktopStatusBar,
  Layout: DesktopLayout,
};
