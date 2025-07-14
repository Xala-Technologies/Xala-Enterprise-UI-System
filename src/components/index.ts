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

// New Components (with specific exports to avoid conflicts)
export {
    GlobalSearch,
    globalSearchVariants,
    searchInputVariants
} from './global-search/GlobalSearch';

export {
    FilterBar,
    filterBarVariants
} from './filter-bar/FilterBar';

export {
    DataTable as XalaDataTable,
    dataTableVariants
} from './data-table/DataTable';

export {
    ProgressBar, Steps, Tabs, progressBarVariants, stepsVariants, tabsVariants
} from './navigation/NavigationComponents';

export {
    Notification, Spinner,
    Alert as XalaAlert,
    Badge as XalaBadge, alertVariants,
    badgeVariants,
    notificationVariants, spinnerVariants
} from './feedback/FeedbackComponents';

export {
    ChartCard, StatisticCard, Card as XalaCard, cardVariants, chartCardVariants, statCardVariants
} from './cards/CardComponents';

// Global Search Types
export type {
    GlobalSearchProps, GlobalSearchVariant,
    SearchInputVariant, SearchResultItem
} from './global-search/GlobalSearch';

// Filter Bar Types
export type {
    FilterBarProps, FilterBarVariant, FilterOption,
    ViewOption
} from './filter-bar/FilterBar';

// Data Table Types
export type {
    DataTableProps, DataTableVariant, TableAction, TableColumn
} from './data-table/DataTable';

// Navigation Types
export type {
    ProgressBarProps, ProgressBarVariant, StepItem, StepsProps, StepsVariant, TabItem, TabsProps, TabsVariant
} from './navigation/NavigationComponents';

// Feedback Types
export type {
    AlertProps, AlertVariant, BadgeProps, BadgeVariant, NotificationProps, NotificationVariant, SpinnerProps, SpinnerVariant
} from './feedback/FeedbackComponents';

// Card Types
export type {
    CardProps, CardVariant, ChartCardProps, ChartCardVariant, StatisticCardProps, StatisticCardVariant
} from './cards/CardComponents';

