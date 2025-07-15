/**
 * Desktop Layout Types
 * Type definitions for desktop layout components
 */

import type React from 'react';
import type {
  DesktopHeaderVariant,
  DesktopMainContentVariant,
  DesktopSidebarVariant,
  DesktopStatusBarVariant,
  DesktopToolbarVariant,
} from './variants';

/**
 * Desktop header component props
 */
export interface DesktopHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    DesktopHeaderVariant {
  /**
   * Logo or brand element
   */
  logo?: React.ReactNode;

  /**
   * Navigation items
   */
  navigation?: React.ReactNode;

  /**
   * Action items (search, user menu, etc.)
   */
  actions?: React.ReactNode;

  /**
   * Whether the header should be sticky
   */
  sticky?: boolean;

  /**
   * Whether the header should have a blur effect
   */
  blur?: boolean;
}

/**
 * Desktop sidebar component props
 */
export interface DesktopSidebarProps
  extends React.HTMLAttributes<HTMLElement>,
    DesktopSidebarVariant {
  /**
   * Whether the sidebar is collapsed
   */
  collapsed?: boolean;

  /**
   * Whether the sidebar is resizable
   */
  resizable?: boolean;

  /**
   * Minimum width when resized
   */
  minWidth?: number;

  /**
   * Maximum width when resized
   */
  maxWidth?: number;

  /**
   * Toggle collapse state
   */
  // eslint-disable-next-line no-unused-vars
  onToggle?: (_collapsed: boolean) => void;

  /**
   * Resize callback
   */
  // eslint-disable-next-line no-unused-vars
  onResize?: (_width: number) => void;
}

/**
 * Desktop main content component props
 */
export interface DesktopMainContentProps
  extends React.HTMLAttributes<HTMLElement>,
    DesktopMainContentVariant {
  /**
   * Whether the content should be scrollable
   */
  scrollable?: boolean;

  /**
   * Whether the content should have a max width
   */
  maxWidth?: boolean;

  /**
   * Whether the content should be centered
   */
  centered?: boolean;
}

/**
 * Desktop toolbar component props
 */
export interface DesktopToolbarProps
  extends React.HTMLAttributes<HTMLElement>,
    DesktopToolbarVariant {
  /**
   * Left-aligned toolbar items
   */
  leftItems?: React.ReactNode;

  /**
   * Right-aligned toolbar items
   */
  rightItems?: React.ReactNode;

  /**
   * Center-aligned toolbar items
   */
  centerItems?: React.ReactNode;

  /**
   * Whether the toolbar should be sticky
   */
  sticky?: boolean;
}

/**
 * Desktop status bar component props
 */
export interface DesktopStatusBarProps
  extends React.HTMLAttributes<HTMLElement>,
    DesktopStatusBarVariant {
  /**
   * Left-aligned status items
   */
  leftItems?: React.ReactNode;

  /**
   * Right-aligned status items
   */
  rightItems?: React.ReactNode;

  /**
   * Center-aligned status items
   */
  centerItems?: React.ReactNode;
}

/**
 * Desktop layout component props
 */
export interface DesktopLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Header component
   */
  header?: React.ReactNode;

  /**
   * Sidebar component
   */
  sidebar?: React.ReactNode;

  /**
   * Main content
   */
  children: React.ReactNode;

  /**
   * Toolbar component
   */
  toolbar?: React.ReactNode;

  /**
   * Status bar component
   */
  statusBar?: React.ReactNode;

  /**
   * Whether the layout should be full height
   */
  fullHeight?: boolean;

  /**
   * Whether the layout should be responsive
   */
  responsive?: boolean;
}
