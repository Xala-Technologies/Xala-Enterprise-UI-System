/**
 * Layout Components Index
 * Comprehensive layout system exports
 */

// Base Layout Components
export * from './BaseLayout';

// Mobile Layout Components
export * from './mobile/MobileLayout';

// Tablet Layout Components
export * from './tablet/TabletLayout';

// Desktop Layout Components
export * from './desktop';

// Web Layout Components
export * from './web/WebLayout';

// Admin Layout Components
export * from './admin/AdminLayout';

// Layout composition utilities
export { LayoutComposition } from './BaseLayout';
export { DesktopLayoutComposition } from './desktop';
export { MobileLayoutComposition } from './mobile/MobileLayout';

// Layout types - Base
export type {
    BaseLayoutProps,
    FooterProps,
    HeaderProps,
    MainContentProps,
    SidebarProps
} from './BaseLayout';

// Layout types - Mobile
export type {
    MobileBottomNavigationProps,
    MobileContentProps,
    MobileDrawerProps,
    MobileHeaderProps,
    MobileLayoutProps
} from './mobile/MobileLayout';

// Layout types - Tablet
export type {
    TabletHeaderProps,
    TabletLayoutProps,
    TabletSidebarProps
} from './tablet/TabletLayout';

// Layout types - Desktop
export type {
    DesktopHeaderProps,
    DesktopLayoutProps,
    DesktopMainContentProps,
    DesktopSidebarProps,
    DesktopStatusBarProps,
    DesktopToolbarProps
} from './desktop';

// Layout types - Web
export type {
    WebContentProps,
    WebFooterProps,
    WebLayoutProps,
    WebNavbarProps
} from './web/WebLayout';

// Layout types - Admin
export type {
    AdminContentProps,
    AdminLayoutProps,
    AdminSidebarProps,
    AdminTopBarProps
} from './admin/AdminLayout';

// Platform utilities
export { useLayoutPlatform } from './BaseLayout';
