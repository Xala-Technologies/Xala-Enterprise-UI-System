/**
 * @fileoverview Layout Components v5.0.0 - Token-Based Design System
 * @description Centralized exports for all layout components following SOLID principles
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

// Base layout component
export { BaseLayout, baseLayoutVariants } from './BaseLayout';
export type { BaseLayoutProps, BaseLayoutVariant } from './BaseLayout';

// Individual layout components
export { LayoutHeader, headerVariants } from './LayoutHeader';
export type { LayoutHeaderProps, LayoutHeaderVariant } from './LayoutHeader';

export { LayoutSidebar, sidebarVariants } from './LayoutSidebar';
export type { LayoutSidebarProps, LayoutSidebarVariant } from './LayoutSidebar';

export { LayoutMainContent, mainContentVariants } from './LayoutMainContent';
export type { LayoutMainContentProps, LayoutMainContentVariant } from './LayoutMainContent';

export { LayoutFooter, footerVariants } from './LayoutFooter';
export type { LayoutFooterProps, LayoutFooterVariant } from './LayoutFooter';

// Composition utilities
export { 
  LayoutComposition, 
  createLayout,
  LayoutProvider,
  useLayoutContext 
} from './LayoutComposition';
export type { LayoutFactoryConfig } from './LayoutComposition';