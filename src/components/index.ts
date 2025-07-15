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
    AccordionTrigger,
    // Data display components
    Avatar, Blockquote,
    // Navigation components
    Breadcrumb, Calendar, CardContent,
    CardFooter, CardHeader,
    // Form components
    Checkbox,
    CheckboxGroup, CircularProgress, Code,
    // Advanced UI components
    CommandPalette, ContextMenu, ContextMenuContent,
    ContextMenuItem, ContextMenuTrigger, DatePicker, Divider, DrawerBody,
    DrawerFooter, DrawerHeader, Heading, IconButton, Pagination, Radio,
    RadioGroup,
    // Loading components
    Skeleton,
    SkeletonAvatar,
    SkeletonButton,
    SkeletonCard,
    SkeletonText, Slider, Switch,
    // Individual Tabs components
    TabsContent,
    TabsList,
    TabsTrigger, Text, Timeline,
    TimelineItem, TimePicker, TooltipContent,
    TooltipTrigger, TreeView,
    TreeViewItem, Typography,
    // Feedback components
    Alert as UIAlert,
    AlertDescription as UIAlertDescription,
    AlertTitle as UIAlertTitle, Badge as UIBadge,
    // Button components
    Button as UIButton,
    // Layout components
    Card as UICard, Drawer as UIDrawer, Input as UIInput, Progress as UIProgress, Select as UISelect, Textarea as UITextarea, Tooltip as UITooltip, type AccordionContentProps,
    type AccordionItemData, type AccordionItemProps, type AccordionProps, type AccordionTriggerProps, type AvatarProps, type BreadcrumbItem,
    type BreadcrumbProps, type BreadcrumbSize, type BreadcrumbVariant, type CalendarDate, type CalendarProps, type CalendarSize, type CalendarVariant, type CardContentProps,
    type CardFooterProps, type CardHeaderProps, type CheckboxGroupProps, type CheckboxOption, type CheckboxProps, type CheckboxSize, type CheckboxVariant, type CircularProgressProps, type CommandGroup, type CommandItem, type CommandPaletteProps, type CommandPaletteSize, type CommandPaletteTexts, type CommandPaletteVariant, type ContextMenuContentProps,
    type ContextMenuItemProps, type ContextMenuProps,
    type ContextMenuTriggerProps, type DatePickerProps, type DividerOrientation, type DividerProps, type DividerSize, type DividerStyle, type DividerVariant, type DrawerBodyProps,
    type DrawerFooterProps, type DrawerHeaderProps, type DrawerOverlayVariant, type DrawerSide,
    type DrawerSize, type IconButtonProps, type IconButtonShape, type IconButtonSize, type IconButtonVariant, type NorwegianHoliday, type PaginationProps, type PaginationSize, type PaginationVariant, type RadioGroupProps, type RadioOption, type RadioProps, type RadioSize, type RadioVariant, type SkeletonAvatarProps, type SkeletonButtonProps, type SkeletonCardProps, type SkeletonProps, type SkeletonSpeed, type SkeletonTextProps, type SkeletonVariant, type SliderProps, type SliderSize, type SliderVariant, type SwitchProps, type SwitchSize, type SwitchVariant, type TabsContentProps, type TabsListProps, type TabsOrientation, type TabsTriggerProps, type TextareaResize, type TextareaSize, type TextareaVariant, type TimelineItemData, type TimelineItemProps, type TimelineProps, type TimePickerProps, type TooltipContentProps,
    type TooltipSide, type TreeViewData, type TreeViewItemProps, type TreeViewProps, type TypographyAlign, type TypographyColor, type TypographyProps,
    type TypographyVariant, type AlertProps as UIAlertProps,
    type AlertVariant as UIAlertVariant, type BadgeProps as UIBadgeProps, type BadgeSize as UIBadgeSize, type BadgeVariant as UIBadgeVariant, type ButtonProps as UIButtonProps, type CardProps as UICardProps, type DrawerProps as UIDrawerProps, type InputProps as UIInputProps, type ProgressProps as UIProgressProps, type ProgressSize as UIProgressSize, type ProgressVariant as UIProgressVariant, type SelectOption as UISelectOption,
    type SelectProps as UISelectProps, type SelectSize as UISelectSize, type SelectVariant as UISelectVariant, type TextareaProps as UITextareaProps, type TooltipProps as UITooltipProps
} from './ui';

// New Components (with specific exports to avoid conflicts)
export {
    GlobalSearch,
    globalSearchVariants,
    searchInputVariants
} from './global-search/GlobalSearch';

export { FilterBar, filterBarVariants } from './filter-bar/FilterBar';

export { dataTableVariants, DataTable as XalaDataTable } from './data-table/DataTable';

export {
    ProgressBar, progressBarVariants, Steps, stepsVariants, Tabs, tabsVariants
} from './navigation/NavigationComponents';

export {
    alertVariants,
    badgeVariants, Notification, notificationVariants, Spinner, spinnerVariants, Alert as XalaAlert,
    Badge as XalaBadge
} from './feedback/FeedbackComponents';

export {
    cardVariants, ChartCard, chartCardVariants,
    statCardVariants, StatisticCard,
    Card as XalaCard
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

