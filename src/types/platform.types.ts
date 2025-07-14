/**
 * @fileoverview Platform component type definitions
 * @module PlatformTypes
 */

import type { ComponentProps } from '../lib/types/core.types';

// Base platform component props
export interface PlatformComponentProps extends ComponentProps {
  platform?: 'mobile' | 'desktop' | 'responsive';
  norwegian?: {
    accessibility?: 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    municipality?: string;
    deviceOptimization?: boolean;
    touchOptimized?: boolean;
    governmentWorkflow?: boolean;
    auditLog?: boolean;
  };
}

// Mobile Header component props
export interface MobileHeaderProps extends PlatformComponentProps {
  titleKey?: string; // Localization key for header title
  title?: string;
  showBackButton?: boolean;
  showMenu?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  notificationCount?: number;
  searchPlaceholderKey?: string;
  height?: 'compact' | 'standard' | 'extended';
  sticky?: boolean;
  transparent?: boolean;
  norwegian?: PlatformComponentProps['norwegian'] & {
    showClassificationBadge?: boolean;
    emergencyContactAccess?: boolean;
    municipalityLogo?: boolean;
    safeAreaHandling?: boolean;
    governmentBranding?: boolean;
  };
  onBack?: () => void;
  onMenuToggle?: () => void;
  onSearchFocus?: () => void;
  onNotificationPress?: () => void;
}

// Bottom Navigation component props
export interface BottomNavigationProps extends PlatformComponentProps {
  items: BottomNavigationItem[];
  activeIndex?: number;
  showLabels?: boolean;
  showBadges?: boolean;
  height?: 'compact' | 'standard' | 'extended';
  safeAreaBottom?: boolean;
  norwegian?: PlatformComponentProps['norwegian'] & {
    emergencyTab?: boolean;
    classificationIndicators?: boolean;
    municipalityContext?: boolean;
    accessibilityAnnouncements?: boolean;
    hapticFeedback?: boolean;
    auditLog?: boolean;
  };
  onItemPress?: (index: number, item: BottomNavigationItem) => void;
}

// Bottom navigation item configuration
export interface BottomNavigationItem {
  labelKey: string; // Localization key for tab label
  icon: any;
  activeIcon?: any;
  badgeCount?: number;
  badgeColor?: string;
  disabled?: boolean;
  testId?: string;
  norwegian?: {
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    priority?: 'low' | 'medium' | 'high' | 'emergency';
    requiresAuth?: boolean;
    auditTrail?: boolean;
  };
}

// Mobile Drawer component props
export interface MobileDrawerProps extends PlatformComponentProps {
  isOpen: boolean;
  titleKey?: string; // Localization key for drawer title
  title?: string;
  children: any;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'small' | 'medium' | 'large' | 'full';
  overlay?: boolean;
  swipeToClose?: boolean;
  swipeToOpen?: boolean;
  snapPoints?: number[]; // Percentage snap points for bottom sheets
  closeOnOutsidePress?: boolean;
  norwegian?: PlatformComponentProps['norwegian'] & {
    safeAreaHandling?: boolean;
    emergencyAccess?: boolean;
    classificationHeader?: boolean;
    municipalityInfo?: boolean;
    gestureOptimization?: boolean;
    voiceOverSupport?: boolean;
  };
  onOpen?: () => void;
  onClose?: () => void;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
}

// Desktop Sidebar component props
export interface DesktopSidebarProps extends PlatformComponentProps {
  isCollapsed?: boolean;
  isResizable?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  position?: 'left' | 'right';
  showToggle?: boolean;
  persistent?: boolean;
  overlay?: boolean;
  children: any;
  norwegian?: PlatformComponentProps['norwegian'] & {
    classificationBanner?: boolean;
    municipalityBranding?: boolean;
    quickAccess?: {
      emergencyContacts?: boolean;
      helpDesk?: boolean;
      systemStatus?: boolean;
    };
    workspacePersonalization?: boolean;
    keyboardShortcuts?: boolean;
    auditLog?: boolean;
  };
  onToggle?: (collapsed: boolean) => void;
  onResize?: (width: number) => void;
  onCollapse?: () => void;
  onExpand?: () => void;
}

// Top Navigation component props
export interface TopNavigationProps extends PlatformComponentProps {
  titleKey?: string; // Localization key for navigation title
  title?: string;
  showBreadcrumbs?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
  showSystemStatus?: boolean;
  searchPlaceholderKey?: string;
  height?: 'compact' | 'standard' | 'extended';
  sticky?: boolean;
  children?: any;
  norwegian?: PlatformComponentProps['norwegian'] & {
    classificationBanner?: boolean;
    municipalityBranding?: boolean;
    systemStatus?: 'operational' | 'maintenance' | 'degraded' | 'offline';
    emergencyBanner?: boolean;
    governmentLogo?: boolean;
    accessibilityMenu?: boolean;
  };
  onSearchFocus?: () => void;
  onNotificationPress?: () => void;
  onUserMenuPress?: () => void;
  onBreadcrumbPress?: (item: BreadcrumbItem, index: number) => void;
}

// Breadcrumb item configuration
export interface BreadcrumbItem {
  labelKey: string; // Localization key for breadcrumb
  href?: string;
  active?: boolean;
  disabled?: boolean;
  testId?: string;
  norwegian?: {
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    secureLink?: boolean;
    auditTrail?: boolean;
  };
}

// Resizable Table component props
export interface ResizableTableProps extends PlatformComponentProps {
  columns: ResizableTableColumn[];
  data: any[];
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
  emptyStateKey?: string; // Localization key for empty state
  loadingStateKey?: string; // Localization key for loading state
  norwegian?: PlatformComponentProps['norwegian'] & {
    classificationColumns?: boolean;
    auditColumns?: boolean;
    exportRestrictions?: boolean;
    dataClassification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    complianceMode?: boolean;
    norwegianSorting?: boolean;
  };
  onColumnResize?: (columnId: string, width: number) => void;
  onColumnReorder?: (fromIndex: number, toIndex: number) => void;
  onSort?: (columnId: string, direction: 'asc' | 'desc') => void;
  onRowSelect?: (selectedRows: any[]) => void;
  onRowClick?: (row: any, index: number) => void;
}

// Resizable table column configuration
export interface ResizableTableColumn {
  id: string;
  labelKey: string; // Localization key for column header
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  resizable?: boolean;
  sticky?: boolean;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'number' | 'date' | 'currency' | 'percentage' | 'classification';
  format?: string;
  norwegian?: {
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
    personalData?: boolean;
    auditRequired?: boolean;
    exportRestricted?: boolean;
    sortingMethod?: 'norwegian' | 'standard';
  };
  render?: (value: any, row: any, index: number) => any;
  headerRender?: () => any;
}

// Touch-friendly variant props
export interface TouchFriendlyProps {
  touchOptimized?: boolean;
  minTouchTarget?: number; // Minimum touch target size in pixels
  touchPadding?: number;
  hapticFeedback?: boolean;
  swipeGestures?: boolean;
  longPressActions?: boolean;
  norwegian?: {
    accessibilityCompliance?: 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
    norwegianTouchStandards?: boolean;
    municipalityAccessibility?: boolean;
    elderlyOptimization?: boolean;
    disabilitySupport?: boolean;
  };
}

// Hover-friendly variant props
export interface HoverFriendlyProps {
  hoverOptimized?: boolean;
  showTooltips?: boolean;
  tooltipDelay?: number;
  hoverEffects?: boolean;
  contextMenus?: boolean;
  keyboardShortcuts?: boolean;
  norwegian?: {
    keyboardNavigation?: boolean;
    norwegianShortcuts?: boolean;
    accessibilityTooltips?: boolean;
    governmentWorkflow?: boolean;
    expertMode?: boolean;
  };
}

// Norwegian platform configuration
export interface NorwegianPlatformConfig {
  platform: 'mobile' | 'desktop' | 'responsive';
  municipality?: string;
  accessibilityLevel: 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
  classificationLevel: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  touchOptimization: boolean;
  keyboardOptimization: boolean;
  voiceOverSupport: boolean;
  hapticFeedback: boolean;
  emergencyFeatures: boolean;
  auditLogging: boolean;
  complianceMode: boolean;
  governmentBranding: boolean;
  safeAreaHandling: boolean;
  deviceOrientation: boolean;
  norwegianLocale: 'nb-NO' | 'nn-NO' | 'en-NO';
}

// Responsive breakpoint configuration
export interface ResponsiveBreakpoints {
  mobile: {
    small: number; // Small phones
    medium: number; // Standard phones
    large: number; // Large phones/small tablets
  };
  tablet: {
    small: number; // Small tablets
    large: number; // Large tablets
  };
  desktop: {
    small: number; // Small desktop
    medium: number; // Standard desktop
    large: number; // Large desktop
    xlarge: number; // Extra large desktop
  };
}

// Platform detection utilities
export interface PlatformDetection {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouchScreen: boolean;
  hasHover: boolean;
  supportsHaptics: boolean;
  orientation: 'portrait' | 'landscape';
  screenSize: 'small' | 'medium' | 'large' | 'xlarge';
  deviceType: 'phone' | 'tablet' | 'desktop' | 'tv';
}

// Export type for all platform types
export type PlatformTypes =
  | MobileHeaderProps
  | BottomNavigationProps
  | MobileDrawerProps
  | DesktopSidebarProps
  | TopNavigationProps
  | ResizableTableProps
  | TouchFriendlyProps
  | HoverFriendlyProps;
