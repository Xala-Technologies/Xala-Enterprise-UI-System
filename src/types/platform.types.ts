/**
 * @fileoverview Platform component type definitions
 * @module PlatformTypes
 */

import type { ReactNode } from 'react';
import type { ComponentProps } from '../lib/types/core.types';

// Base platform component props
export interface PlatformComponentProps extends ComponentProps {
  platform?: 'auto' | 'desktop' | 'mobile' | 'tablet';
}

// Mobile Header component props
export interface MobileHeaderProps extends PlatformComponentProps {
  title?: string; // Header title text
  showBackButton?: boolean;
  showMenu?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  notificationCount?: number;
  searchPlaceholder?: string;
  onBackClick?: () => void;
  onMenuClick?: () => void;
  onSearchFocus?: () => void;
  onNotificationClick?: () => void;
}

// Bottom Navigation component props
export interface BottomNavigationProps extends PlatformComponentProps {
  items: BottomNavigationItem[];
  activeItem?: string;
  onItemClick?: (item: BottomNavigationItem, index: number) => void;
  showLabels?: boolean;
  showBadges?: boolean;
}

// Bottom navigation item configuration
export interface BottomNavigationItem {
  label: string; // Tab label text
  icon: ReactNode;
  activeIcon?: ReactNode;
  badgeCount?: number;
  badgeColor?: string;
  disabled?: boolean;
  testId?: string;
}

// Mobile Drawer component props
export interface MobileDrawerProps extends PlatformComponentProps {
  isOpen: boolean;
  title?: string; // Drawer title text
  children: ReactNode;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  onClose?: () => void;
}

// Desktop Sidebar component props
export interface DesktopSidebarProps extends PlatformComponentProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  collapsible?: boolean;
  collapsed?: boolean;
  position?: 'left' | 'right';
  onToggle?: () => void;
  onClose?: () => void;
}

// Top Navigation component props
interface NavigationAction {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TopNavigationProps extends PlatformComponentProps {
  title?: string; // Navigation title text
  showBreadcrumbs?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  actions?: NavigationAction[];
  onAction?: (action: NavigationAction) => void;
}

// Breadcrumb item configuration
export interface BreadcrumbItem {
  label: string; // Breadcrumb text
  href?: string;
  active?: boolean;
  disabled?: boolean;
  testId?: string;
}

// Resizable Table component props
export interface ResizableTableProps<T = unknown> extends PlatformComponentProps {
  columns: ResizableTableColumn[];
  data: T[];
  sortable?: boolean;
  resizable?: boolean;
  reorderable?: boolean;
  selectable?: boolean;
  virtualized?: boolean;
  stickyHeader?: boolean;
  stickyColumns?: number;
  minColumnWidth?: number;
  maxColumnWidth?: number;
  defaultColumnWidth?: number;
  rowHeight?: number;
  headerHeight?: number;
  emptyStateMessage?: string; // Empty state message text
  loadingStateMessage?: string; // Loading state message text
}

// Resizable table column definition
export interface ResizableTableColumn {
  id: string;
  label: string; // Column header text
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  resizable?: boolean;
  sticky?: boolean;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'number' | 'date' | 'currency' | 'percentage' | 'classification';
  format?: string;
}

// Responsive breakpoints
export interface ResponsiveBreakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

// Touch-friendly component props
export interface TouchFriendlyProps {
  touchOptimized?: boolean;
  tapTargetSize?: 'small' | 'medium' | 'large';
  swipeGestures?: boolean;
}

// Hover-friendly component props
export interface HoverFriendlyProps {
  hoverEffects?: boolean;
  hoverDelay?: number;
  focusVisible?: boolean;
}

// Platform types
export type PlatformTypes = 'desktop' | 'mobile' | 'tablet' | 'auto';

// Platform detection
export interface PlatformDetection {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  userAgent: string;
  platform: PlatformTypes;
}
