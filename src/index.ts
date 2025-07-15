/**
 * @fileoverview Main UI System Entry Point - Production Optimized
 * @description Tree-shakeable exports organized for optimal bundle splitting
 * @version 4.0.0
 * @compliance SSR-Safe, Production-ready, Tree-shakeable
 */

// Main package index for @xala-technologies/ui-system

// Providers
export { DesignSystemProvider, DesignSystemProvider as UISystemProvider } from './providers/DesignSystemProvider';

// Action & Feedback Components
export { Button as ActionButton, Alert, ClassificationIndicator, LoadingSpinner, Modal, ModalBody, ModalContent, ModalHeader, Toast } from './components/action-feedback';
export type { LoadingSpinnerProps } from './components/action-feedback/ButtonIcon';
// Types: Action Feedback
export type { AlertProps as ActionAlertProps, ButtonProps as ActionButtonProps, DrawerProps as ActionDrawerProps, ActionFeedbackComponentProps, ActionFeedbackTypes, ModalProps as ActionModalProps, ButtonGroupProps, ConfirmationModalProps, LoadingOverlayProps, NorwegianActionContext, NorwegianFeedbackConfig, ProgressIndicatorProps, StatusBannerProps, ToastProps } from './types/action-feedback.types';

// Data Display Components
export { DataTable, KeyValueList, Tag } from './components/data-display';
export { Avatar, Badge, Blockquote, Code, Divider, Heading, Text, Tooltip, TooltipContent, TooltipTrigger, Typography } from './components/ui';
// Types: Data Display
export type { BadgeProps as DataBadgeProps, DataDisplayComponentProps, TooltipProps as DataTooltipProps, KeyValueItem, KeyValueListProps, StatusIndicatorProps, TagProps } from './types/data-display.types';

// Button, IconButton, and Related
export { Button, IconButton } from './components/ui';
export type { ButtonProps, IconButtonProps, IconButtonShape, IconButtonSize, IconButtonVariant } from './components/ui';

// Form Components
export { Form, OrganizationNumberInput, PersonalNumberInput, TextArea } from './components/form';
export { Checkbox, CheckboxGroup, Input, Radio, RadioGroup, Select, Slider, Switch, Textarea } from './components/ui';
// Types: Form
export type { FormComponentProps, InputProps as FormInputProps, FormProps, SelectOption as FormSelectOption, SelectProps as FormSelectProps, TextAreaProps as FormTextAreaProps, OrganizationData, OrganizationNumberInputProps, PersonalNumberInputProps, ValidationError, ValidationResult } from './types/form.types';

// Layout Components
export { Container, Grid, GridItem, HStack, PageLayout, Section, Stack, VStack } from './components/layout';
export { Card, CardContent, CardFooter, CardHeader } from './components/ui';
// Types: Layout
export type { ContainerProps, GridProps, LayoutComponentProps, PageLayoutProps, SectionProps, StackProps } from './types/layout.types';

// Navigation Components
export { Tabs } from './components/navigation/NavigationComponents';
export { Breadcrumb, Pagination, TabsContent, TabsList, TabsTrigger } from './components/ui';
export type { BreadcrumbItem, BreadcrumbProps, BreadcrumbSize, BreadcrumbVariant, PaginationProps, PaginationSize, PaginationVariant, TabsContentProps, TabsListProps, TabsOrientation, TabsTriggerProps } from './components/ui';

// Loading Components
export { CircularProgress, Progress, Skeleton, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonText } from './components/ui';
export type { CircularProgressProps, ProgressProps, ProgressSize, ProgressVariant, SkeletonAvatarProps, SkeletonButtonProps, SkeletonCardProps, SkeletonProps, SkeletonSpeed, SkeletonTextProps, SkeletonVariant } from './components/ui';

// Accordion Components
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui';
export type { AccordionContentProps, AccordionItemData, AccordionItemProps, AccordionProps, AccordionTriggerProps } from './components/ui';

// Command Palette
export { CommandPalette } from './components/ui';
export type { CommandGroup, CommandItem, CommandPaletteProps, CommandPaletteSize, CommandPaletteTexts, CommandPaletteVariant } from './components/ui';

// Drawer
export { Drawer, DrawerBody, DrawerFooter, DrawerHeader } from './components/ui';
export type { DrawerBodyProps, DrawerFooterProps, DrawerHeaderProps, DrawerOverlayVariant, DrawerProps, DrawerSide, DrawerSize } from './components/ui';

// Calendar
export { Calendar } from './components/ui';
export type { CalendarDate, CalendarProps, CalendarSize, CalendarVariant, NorwegianHoliday } from './components/ui';

// Tree View
export { TreeView, TreeViewItem } from './components/ui';
export type { TreeViewData, TreeViewItemProps, TreeViewProps } from './components/ui';

// Context Menu
export { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from './components/ui';
export type { ContextMenuContentProps, ContextMenuItemProps, ContextMenuProps, ContextMenuTriggerProps } from './components/ui';

// Timeline
export { Timeline, TimelineItem } from './components/ui';
export type { TimelineItemData, TimelineItemProps, TimelineProps } from './components/ui';

// Date & Time Pickers
export { DatePicker, TimePicker } from './components/ui';
export type { DatePickerProps, TimePickerProps } from './components/ui';

// Global Search
export { GlobalSearch, globalSearchVariants, searchInputVariants } from './components/global-search/GlobalSearch';
export type { GlobalSearchProps, GlobalSearchVariant, SearchInputVariant, SearchResultItem } from './components/global-search/GlobalSearch';

// Filter Bar
export { FilterBar, filterBarVariants } from './components/filter-bar/FilterBar';
export type { FilterBarProps, FilterBarVariant, FilterOption, ViewOption } from './components/filter-bar/FilterBar';

// Data Table
export { dataTableVariants, DataTable as XalaDataTable } from './components/data-table/DataTable';
export type { DataTableProps, DataTableVariant, TableAction, TableColumn } from './components/data-table/DataTable';

// Navigation (ProgressBar, Steps)
export { Tabs as NavigationTabs, ProgressBar, progressBarVariants, Steps, stepsVariants, tabsVariants } from './components/navigation/NavigationComponents';
export type { ProgressBarProps, ProgressBarVariant, StepItem, StepsProps, StepsVariant, TabItem, TabsProps, TabsVariant } from './components/navigation/NavigationComponents';

// Feedback (Notification, Spinner, etc.)
export { alertVariants, badgeVariants, Notification, notificationVariants, Spinner, spinnerVariants, Alert as XalaAlert, Badge as XalaBadge } from './components/feedback/FeedbackComponents';
export type { NotificationProps, NotificationVariant, SpinnerProps, SpinnerVariant } from './components/feedback/FeedbackComponents';

// Card Variants
export { cardVariants, ChartCard, chartCardVariants, statCardVariants, StatisticCard, Card as XalaCard } from './components/cards/CardComponents';
export type { CardVariant, ChartCardProps, ChartCardVariant, StatisticCardProps, StatisticCardVariant } from './components/cards/CardComponents';

// Platform Components
export { BottomNavigation } from './components/platform/mobile/BottomNavigation';
// Types: Platform
export type { PlatformComponentProps as PlatformComponentPropsType, PlatformDetection as PlatformDetectionType, PlatformTypes as PlatformTypesType, ResponsiveBreakpoints as ResponsiveBreakpointsType, TouchFriendlyProps as TouchFriendlyPropsType } from './types/platform.types';

// UISystemProvider (legacy alias)
export { UISystemProvider as LegacyUISystemProvider } from './components/UISystemProvider';

// Hooks
export { useUISystem } from './hooks';
export { useTokens } from './hooks/useTokens';
// Types: Core
export type { AccessibilityLevel, AuditTrailEntry, ComponentAccessibilityConfig, ComponentDefinition, ComponentType, PerformanceMetrics, SupportedLanguage, ThemeColors, ThemeDefinition, UISystemConfig, UISystemOptions } from './lib/types/core.types';
// Types: Interfaces
export type { AccessibilityService, AuditTrailFilter, AuditTrailService, ComponentFactory, ComponentFactoryFunction, ConfigurationService, EventPublisher, LocalizationService, PerformanceMonitor, ThemeManager, UISystemService } from './lib/interfaces/ui-system.interface';

// All types
// Explicitly export only required types at the top level (already done above)
