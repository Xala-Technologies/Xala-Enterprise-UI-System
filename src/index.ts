/**
 * @fileoverview Main UI System Entry Point - Production Optimized
 * @description Tree-shakeable exports organized for optimal bundle splitting
 * @version 4.5.0
 * @compliance SSR-Safe, Production-ready, Tree-shakeable
 */

// Main package index for @xala-technologies/ui-system

// ===== PROVIDERS =====
export { UISystemProvider as LegacyUISystemProvider } from './components/UISystemProvider';
export { DesignSystemProvider, DesignSystemProvider as UISystemProvider } from './providers/DesignSystemProvider';

// ===== CORE UI COMPONENTS =====

// Button Components (Primary exports)
export { Button, type ButtonProps } from './components/ui/button';
export { IconButton, type IconButtonProps, type IconButtonShape, type IconButtonSize, type IconButtonVariant } from './components/ui/icon-button';

// Card Components (Primary exports)  
export { Card, CardContent, CardFooter, CardHeader, type CardContentProps, type CardFooterProps, type CardHeaderProps, type CardProps } from './components/ui/card';

// Alert Components (Primary exports)
export { Alert, AlertDescription, AlertTitle, type AlertProps, type AlertVariant } from './components/ui/alert';

// Badge Components (Primary exports)
export { Badge, type BadgeProps, type BadgeSize, type BadgeVariant } from './components/ui/badge';

// ===== LAYOUT COMPONENTS =====
export { Container, Grid, GridItem, HStack, PageLayout, Section, Stack, VStack } from './components/layout';
export type { GridItemProps, StackAlign, StackDirection, StackGap, StackJustify, StackProps } from './components/layout';
export type { ContainerProps, GridProps, LayoutComponentProps, PageLayoutProps, SectionProps } from './types/layout.types';

// ===== FORM COMPONENTS =====
export { Form, OrganizationNumberInput, PersonalNumberInput, TextArea } from './components/form';
export { Checkbox, CheckboxGroup, Input, Radio, RadioGroup, Select, Slider, Switch, Textarea } from './components/ui';
export type { CheckboxGroupProps, CheckboxOption, CheckboxProps, CheckboxSize, CheckboxVariant } from './components/ui/checkbox';
export type { InputProps } from './components/ui/input';
export type { RadioGroupProps, RadioOption, RadioProps, RadioSize, RadioVariant } from './components/ui/radio';
export type { SelectOption, SelectProps, SelectSize, SelectVariant } from './components/ui/select';
export type { SliderProps, SliderSize, SliderVariant } from './components/ui/slider';
export type { SwitchProps, SwitchSize, SwitchVariant } from './components/ui/switch';
export type { TextareaProps, TextareaResize, TextareaSize, TextareaVariant } from './components/ui/textarea';

// Form Types
export type { FormComponentProps, InputProps as FormInputProps, FormProps, SelectOption as FormSelectOption, SelectProps as FormSelectProps, TextAreaProps as FormTextAreaProps, OrganizationData, OrganizationNumberInputProps, PersonalNumberInputProps, ValidationError, ValidationResult } from './types/form.types';

// ===== DATA DISPLAY COMPONENTS =====
export { DataTable, KeyValueList, Tag } from './components/data-display';
export { Avatar, type AvatarProps } from './components/ui/avatar';
export { Divider, type DividerOrientation, type DividerProps, type DividerSize, type DividerStyle, type DividerVariant } from './components/ui/divider';
export { Tooltip, TooltipContent, TooltipTrigger, type TooltipContentProps, type TooltipProps, type TooltipSide } from './components/ui/tooltip';
export { Blockquote, Code, Heading, Text, Typography, type TypographyAlign, type TypographyColor, type TypographyProps, type TypographyVariant } from './components/ui/typography';

// Data Display Types
export type { BadgeProps as DataBadgeProps, DataDisplayComponentProps, TooltipProps as DataTooltipProps, KeyValueItem, KeyValueListProps, StatusIndicatorProps, TagProps } from './types/data-display.types';

// ===== FEEDBACK COMPONENTS =====
export { CircularProgress, Progress, type CircularProgressProps, type ProgressProps, type ProgressSize, type ProgressVariant } from './components/ui/progress';
export { Skeleton, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonText, type SkeletonAvatarProps, type SkeletonButtonProps, type SkeletonCardProps, type SkeletonProps, type SkeletonSpeed, type SkeletonTextProps, type SkeletonVariant } from './components/ui/skeleton';

// ===== NAVIGATION COMPONENTS =====
export { Breadcrumb, type BreadcrumbItem, type BreadcrumbProps, type BreadcrumbSize, type BreadcrumbVariant } from './components/ui/breadcrumb';
export { Pagination, type PaginationProps, type PaginationSize, type PaginationVariant } from './components/ui/pagination';
export { TabsContent, TabsList, TabsTrigger, type TabsContentProps, type TabsListProps, type TabsOrientation, type TabsTriggerProps } from './components/ui/tabs-individual';

// ===== INTERACTIVE COMPONENTS =====
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, type AccordionContentProps, type AccordionItemData, type AccordionItemProps, type AccordionProps, type AccordionTriggerProps } from './components/ui/accordion';
export { CommandPalette, type CommandGroup, type CommandItem, type CommandPaletteProps, type CommandPaletteSize, type CommandPaletteTexts, type CommandPaletteVariant } from './components/ui/command-palette';
export { Drawer, DrawerBody, DrawerFooter, DrawerHeader, type DrawerBodyProps, type DrawerFooterProps, type DrawerHeaderProps, type DrawerOverlayVariant, type DrawerProps, type DrawerSide, type DrawerSize } from './components/ui/drawer';

// ===== SPECIALIZED COMPONENTS =====
export { Calendar, type CalendarDate, type CalendarProps, type CalendarSize, type CalendarVariant, type NorwegianHoliday } from './components/ui/calendar';
export { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, type ContextMenuContentProps, type ContextMenuItemProps, type ContextMenuProps, type ContextMenuTriggerProps } from './components/ui/context-menu';
export { DatePicker, type DatePickerProps } from './components/ui/date-picker';
export { TimePicker, type TimePickerProps } from './components/ui/time-picker';
export { Timeline, TimelineItem, type TimelineItemData, type TimelineItemProps, type TimelineProps } from './components/ui/timeline';
export { TreeView, TreeViewItem, type TreeViewData, type TreeViewItemProps, type TreeViewProps } from './components/ui/tree-view';

// ===== LAYOUT SYSTEM COMPONENTS =====
export {
  AdminContent,
  // Admin Layout Components
  AdminLayout, AdminSidebar, AdminTopBar,
  // Base Layout Components
  BaseLayout, DesktopHeader,
  // Desktop Layout Components
  DesktopLayout, DesktopLayoutComposition, DesktopMainContent, DesktopSidebar, DesktopStatusBar, DesktopToolbar, Footer, Header, LayoutComposition, MainContent, MobileBottomNavigation, MobileContent, MobileDrawer, MobileHeader,
  // Mobile Layout Components
  MobileLayout, MobileLayoutComposition, Sidebar, TabletHeader,
  // Tablet Layout Components
  TabletLayout, TabletSidebar,
  // Platform utilities
  usePlatform, WebContent, WebFooter,
  // Web Layout Components
  WebLayout, WebNavbar
} from './layouts';

// Layout System Types
export type {
  AdminContentProps,
  // Admin Layout Types
  AdminLayoutProps, AdminSidebarProps, AdminTopBarProps,
  // Base Layout Types
  BaseLayoutProps, DesktopHeaderProps,
  // Desktop Layout Types
  DesktopLayoutProps, DesktopMainContentProps, DesktopSidebarProps, DesktopStatusBarProps, DesktopToolbarProps, FooterProps, HeaderProps, MainContentProps, MobileBottomNavigationProps, MobileContentProps, MobileDrawerProps, MobileHeaderProps,
  // Mobile Layout Types
  MobileLayoutProps, SidebarProps, TabletHeaderProps,
  // Tablet Layout Types
  TabletLayoutProps, TabletSidebarProps, WebContentProps, WebFooterProps,
  // Web Layout Types
  WebLayoutProps, WebNavbarProps
} from './layouts';

// ===== CHAT INTERFACE COMPONENTS =====
export { ActionBar, actionBarVariants, actionButtonVariants, defaultActions, type ActionBarProps, type ActionConfig, type ActionType } from './components/ui/action-bar';
export { Box, type BoxProps } from './components/ui/box';
export { CodeBlock, languageConfig, type CodeBlockProps } from './components/ui/code-block';
export { MessageBubble, messageBubbleAvatarVariants, messageBubbleMetadataVariants, messageBubbleVariants, type MessageBubbleProps } from './components/ui/message-bubble';
export { ScrollArea, scrollAreaVariants, type ScrollAreaProps } from './components/ui/scroll-area';
export { Separator, type SeparatorProps } from './components/ui/separator';

// ===== ACTION FEEDBACK COMPONENTS =====
export { ClassificationIndicator, LoadingSpinner, Modal, ModalBody, ModalContent, ModalHeader, Toast } from './components/action-feedback';
export type { LoadingSpinnerProps } from './components/action-feedback/ButtonIcon';
export type { ActionFeedbackComponentProps, ActionFeedbackTypes, ButtonGroupProps, ConfirmationModalProps, LoadingOverlayProps, NorwegianActionContext, NorwegianFeedbackConfig, ProgressIndicatorProps, StatusBannerProps, ToastProps } from './types/action-feedback.types';

// ===== SEARCH AND FILTER COMPONENTS =====
export { FilterBar, filterBarVariants } from './components/filter-bar/FilterBar';
export type { FilterBarProps, FilterBarVariant, FilterOption, ViewOption } from './components/filter-bar/FilterBar';
export { GlobalSearch, globalSearchVariants, searchInputVariants } from './components/global-search/GlobalSearch';
export type { GlobalSearchProps, GlobalSearchVariant, SearchInputVariant, SearchResultItem } from './components/global-search/GlobalSearch';

// ===== DATA TABLE COMPONENTS =====
export { dataTableVariants, DataTable as XalaDataTable } from './components/data-table/DataTable';
export type { DataTableProps, DataTableVariant, TableAction, TableColumn } from './components/data-table/DataTable';

// ===== LEGACY NAVIGATION COMPONENTS =====
export { Tabs as NavigationTabs, ProgressBar, progressBarVariants, Steps, stepsVariants, tabsVariants } from './components/navigation/NavigationComponents';
export type { ProgressBarProps, ProgressBarVariant, StepItem, StepsProps, StepsVariant, TabItem, TabsProps, TabsVariant } from './components/navigation/NavigationComponents';

// ===== LEGACY FEEDBACK COMPONENTS =====
export { alertVariants, badgeVariants, Notification, notificationVariants, Spinner, spinnerVariants } from './components/feedback/FeedbackComponents';
export type { NotificationProps, NotificationVariant, SpinnerProps, SpinnerVariant } from './components/feedback/FeedbackComponents';

// ===== LEGACY CARD COMPONENTS =====
export { cardVariants, ChartCard, chartCardVariants, statCardVariants, StatisticCard } from './components/cards/CardComponents';
export type { CardVariant, ChartCardProps, ChartCardVariant, StatisticCardProps, StatisticCardVariant } from './components/cards/CardComponents';

// ===== PLATFORM COMPONENTS =====
export { BottomNavigation } from './components/platform/mobile/BottomNavigation';
export type { PlatformComponentProps as PlatformComponentPropsType, PlatformDetection as PlatformDetectionType, PlatformTypes as PlatformTypesType, ResponsiveBreakpoints as ResponsiveBreakpointsType, TouchFriendlyProps as TouchFriendlyPropsType } from './types/platform.types';

// ===== HOOKS =====
export { useUi, useTokens, useTheme, useLayout, useWhiteLabel, useSSR } from './providers/UiProvider/UiProvider';
export { useComponent, useComponentVariant } from './hooks/useComponent';
export { useMediaQuery, useResponsive, useBreakpoint } from './hooks/useMediaQuery';
export { useDebounce, useDebouncedCallback, useThrottle, useLoadingTimeout } from './hooks/useDebounce';

// ===== CORE TYPES =====
export type { AccessibilityService, AuditTrailFilter, AuditTrailService, ComponentFactory, ComponentFactoryFunction, ConfigurationService, EventPublisher, LocalizationService, PerformanceMonitor, ThemeManager, UISystemService } from './lib/interfaces/ui-system.interface';
export type { AccessibilityLevel, AuditTrailEntry, ComponentAccessibilityConfig, ComponentDefinition, ComponentType, PerformanceMetrics, SupportedLanguage, ThemeColors, ThemeDefinition, UISystemConfig, UISystemOptions } from './lib/types/core.types';

// =============================================================================
// TOKENS & THEME SYSTEM
// =============================================================================

// Base tokens and utilities
export { default as tokens } from './tokens/base';
export { default as baseTokens } from './tokens/base';
export * from './tokens/base';

// Theme system
export * from './tokens/themes';
export { default as tumTumSahour } from './tokens/themes/tum-tum-sahour';
export { default as lightTheme } from './tokens/themes/light';
export { default as darkTheme } from './tokens/themes/dark';
export { v5ThemeRegistry, v5ThemeUtils } from './tokens/themes/registry';

// ===== COMPATIBILITY ALIASES (Deprecated - will be removed in v5.0) =====
// @deprecated Use Button instead
export { Button as ActionButton } from './components/ui/button';
// @deprecated Use Alert instead  
export { Alert as XalaAlert } from './components/ui/alert';
// @deprecated Use Badge instead
export { Badge as XalaBadge } from './components/ui/badge';
// @deprecated Use Card instead
export { Card as XalaCard } from './components/ui/card';
// @deprecated Use Tabs instead
export { Tabs } from './components/navigation/NavigationComponents';
