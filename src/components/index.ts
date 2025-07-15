/**
 * Components Index
 * Comprehensive component system exports
 */

// Existing Components (keep original exports)
export * from './action-feedback';
export * from './data-display';
export * from './form';
export * from './layout';
export * from './platform';
export * from './UISystemProvider';

// UI Components (shadcn-ui style components) - with aliases to avoid conflicts
export {

    // Accordion components
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger, Avatar,
    // Navigation components
    Breadcrumb, Calendar,
    // Form components
    Checkbox,
    CheckboxGroup, CircularProgress,
    // Advanced UI components
    CommandPalette, ContextMenu, DatePicker, Divider, IconButton, Pagination, Radio,
    RadioGroup,
    // Loading components
    Skeleton,
    SkeletonAvatar,
    SkeletonButton,
    SkeletonCard,
    SkeletonText, Slider,
    Switch,
    // Individual Tabs components
    TabsContent,
    TabsList,
    TabsTrigger, TimePicker, Timeline, TreeView, Typography,
    // Feedback components
    Alert as UIAlert,
    AlertDescription as UIAlertDescription,
    AlertTitle as UIAlertTitle,
    // Data display components
    Badge as UIBadge, Button as UIButton,
    // Layout components
    Card as UICard, Drawer as UIDrawer, Input as UIInput, Progress as UIProgress, Select as UISelect, Textarea as UITextarea, Tooltip as UITooltip, type AccordionProps, type AvatarProps, type BreadcrumbItem,
    type BreadcrumbProps, type CalendarProps,
    // Export types
    type CheckboxProps, type CommandPaletteProps, type ContextMenuProps, type DatePickerProps, type DividerProps, type PaginationProps, type RadioProps, type SkeletonProps, type SliderProps,
    type SwitchProps, type TimePickerProps, type TimelineProps, type TreeViewProps, type TypographyProps, type AlertProps as UIAlertProps, type BadgeProps as UIBadgeProps, type DrawerProps as UIDrawerProps, type ProgressProps as UIProgressProps, type SelectOption as UISelectOption,
    type SelectProps as UISelectProps, type TextareaProps as UITextareaProps, type TooltipProps as UITooltipProps
} from './ui';

// New Components (with specific exports to avoid conflicts)
export {
    GlobalSearch,
    globalSearchVariants,
    searchInputVariants
} from './global-search/GlobalSearch';

export { FilterBar, filterBarVariants } from './filter-bar/FilterBar';

export { DataTable as XalaDataTable, dataTableVariants } from './data-table/DataTable';

export {
    ProgressBar,
    Steps,
    Tabs,
    progressBarVariants,
    stepsVariants,
    tabsVariants
} from './navigation/NavigationComponents';

export {
    Notification,
    Spinner,
    Alert as XalaAlert,
    Badge as XalaBadge,
    alertVariants,
    badgeVariants,
    notificationVariants,
    spinnerVariants
} from './feedback/FeedbackComponents';

export {
    ChartCard,
    StatisticCard,
    Card as XalaCard,
    cardVariants,
    chartCardVariants,
    statCardVariants
} from './cards/CardComponents';

// Global Search Types
export type {
    GlobalSearchProps,
    GlobalSearchVariant,
    SearchInputVariant,
    SearchResultItem
} from './global-search/GlobalSearch';

// Filter Bar Types
export type {
    FilterBarProps,
    FilterBarVariant,
    FilterOption,
    ViewOption
} from './filter-bar/FilterBar';

// Data Table Types
export type {
    DataTableProps,
    DataTableVariant,
    TableAction,
    TableColumn
} from './data-table/DataTable';

// Navigation Types
export type {
    ProgressBarProps,
    ProgressBarVariant,
    StepItem,
    StepsProps,
    StepsVariant,
    TabItem,
    TabsProps,
    TabsVariant
} from './navigation/NavigationComponents';

// Feedback Types
export type {
    AlertProps,
    AlertVariant,
    BadgeProps,
    BadgeVariant,
    NotificationProps,
    NotificationVariant,
    SpinnerProps,
    SpinnerVariant
} from './feedback/FeedbackComponents';

// Card Types
export type {
    CardProps,
    CardVariant,
    ChartCardProps,
    ChartCardVariant,
    StatisticCardProps,
    StatisticCardVariant
} from './cards/CardComponents';

