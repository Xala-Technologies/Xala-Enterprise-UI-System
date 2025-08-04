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
    Avatar as UIAvatar, Blockquote,
    // Navigation components
    Breadcrumb as UIBreadcrumb, Calendar, CardContent,
    CardFooter, CardHeader,
    // Form components
    Checkbox,
    CheckboxGroup, CircularProgress, Code as UICode,
    // Advanced UI components
    CommandPalette, ContextMenu, ContextMenuContent,
    ContextMenuItem, ContextMenuTrigger, DatePicker, Divider, DrawerBody,
    DrawerFooter, DrawerHeader, Heading as UIHeading, IconButton as UIIconButton, Pagination, Radio,
    RadioGroup,
    // Dropdown components
    Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator, DropdownLabel,
    DropdownMenu, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup,
    DropdownMenuRadioItem, DropdownMenuSubTrigger, DropdownMenuLabel, DropdownMenuSeparator,
    Combobox, MultiSelect,
    // Loading components
    Skeleton,
    SkeletonAvatar,
    SkeletonButton,
    SkeletonCard,
    SkeletonText, Slider, Switch,
    // Individual Tabs components
    TabsContent,
    TabsList,
    TabsTrigger, Text as UIText, Timeline,
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
    type DrawerFooterProps, type DrawerHeaderProps, type IconButtonProps, type IconButtonShape, type IconButtonSize, type IconButtonVariant, type NorwegianHoliday, type PaginationProps, type PaginationSize, type PaginationVariant, type RadioGroupProps, type RadioOption, type RadioProps, type RadioSize, type RadioVariant, type SkeletonAvatarProps, type SkeletonButtonProps, type SkeletonCardProps, type SkeletonProps, type SkeletonTextProps, type SliderProps, type SliderSize, type SliderVariant, type SwitchProps, type SwitchSize, type SwitchVariant, type TabsContentProps, type TabsListProps, type TabsOrientation, type TabsTriggerProps, type TextareaResize, type TextareaSize, type TextareaVariant, type TimelineItemData, type TimelineItemProps, type TimelineProps, type TimePickerProps, type TooltipContentProps,
    type TreeViewData, type TreeViewItemProps, type TreeViewProps, type TypographyAlign, type TypographyColor, type TypographyProps,
    type TypographyVariant, type AlertProps as UIAlertProps,
    type AlertVariant as UIAlertVariant, type BadgeProps as UIBadgeProps, type BadgeSize as UIBadgeSize, type BadgeVariant as UIBadgeVariant, type ButtonProps as UIButtonProps, type CardProps as UICardProps, type DrawerProps as UIDrawerProps, type InputProps as UIInputProps, type ProgressProps as UIProgressProps, type ProgressSize as UIProgressSize, type ProgressVariant as UIProgressVariant, type SelectOption as UISelectOption,
    type SelectProps as UISelectProps, type SelectSize as UISelectSize, type SelectVariant as UISelectVariant, type TextareaProps as UITextareaProps, type TooltipProps as UITooltipProps,
    // Dropdown types
    type DropdownProps, type DropdownTriggerProps, type DropdownContentProps, type DropdownItemProps,
    type DropdownSeparatorProps, type DropdownLabelProps, type DropdownPlacement, type DropdownVariant,
    type DropdownSize, type DropdownMenuProps, type DropdownMenuItemProps, type DropdownMenuCheckboxItemProps,
    type DropdownMenuRadioGroupProps, type DropdownMenuRadioItemProps, type DropdownMenuSubTriggerProps,
    type DropdownMenuItemData, type DropdownMenuGroup, type ComboboxProps, type ComboboxOption,
    type ComboboxVariant, type ComboboxSize, type MultiSelectProps, type MultiSelectOption,
    type MultiSelectVariant, type MultiSelectSize, type MultiSelectDisplayMode
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

// =============================================================================
// SEMANTIC COMPONENTS - Complete HTML Element Abstraction System
// =============================================================================

/**
 * Semantic Components v5.0.0 - Replace all raw HTML elements
 * Complete semantic component system with design tokens and accessibility
 */
export {
    // Semantic Component Collections
    SemanticComponents,
    LayoutComponents,
    TypographyComponents, 
    InteractiveComponents,
    FormComponents,
    ContentComponents,
    
    // Layout Components
    Box,
    Section,
    Article,
    Header,
    Footer,
    Main,
    Nav,
    Aside,
    
    // Text Components
    Text,
    Paragraph,
    Label,
    Small,
    Code,
    Strong,
    Emphasis,
    
    // Heading Components
    Heading,
    PageTitle,
    SectionTitle,
    CardTitle,
    ModalTitle,
    DisplayHeading,
    Subtitle,
    
    // Button Components (Semantic versions)
    PrimaryButton,
    SecondaryButton,
    OutlineButton,
    GhostButton,
    DestructiveButton,
    IconButton as SemanticIconButton,
    
    // Input Components (Semantic versions)
    SearchInput,
    EmailInput,
    PasswordInput,
    PhoneInput,
    NumberInput,
    DateInput,
    FileInput,
    
    // List Components
    List,
    ListItem,
    DescriptionList,
    DescriptionTerm,
    DescriptionDetails,
    NavigationList,
    Checklist,
    StepsList,
    FeaturesList,
    Breadcrumb as SemanticBreadcrumb,
    TagList,
    
    // Link Components
    Link,
    NavigationLink,
    ExternalLink,
    EmailLink,
    PhoneLink,
    DownloadLink,
    AnchorLink,
    BreadcrumbLink,
    ButtonLink,
    
    // Image Components
    Image,
    Avatar as SemanticAvatar,
    Logo,
    HeroImage,
    Thumbnail,
    GalleryImage,
    ProductImage,
    IconImage,
    DecorativeImage,
    
    // Metadata
    SEMANTIC_COMPONENTS_VERSION,
    SEMANTIC_COMPONENTS_METADATA,
} from './semantic';

// Semantic Component Types
export type {
    // Box Types
    BoxProps,
    SemanticElement,
    SemanticRole,
    
    // Text Types
    TextProps,
    TextElement,
    TextIntent,
    TextLevel,
    
    // Heading Types
    HeadingProps,
    HeadingLevel,
    HeadingSize,
    HeadingIntent,
    
    // Button Types (Semantic)
    ButtonProps as SemanticButtonProps,
    ButtonIntent,
    ButtonSize as SemanticButtonSize,
    ButtonLoadingState,
    IconPosition,
    
    // Input Types (Semantic)
    InputProps as SemanticInputProps,
    InputType,
    InputIntent,
    InputState,
    InputSize as SemanticInputSize,
    
    // List Types
    ListProps,
    ListItemProps,
    DescriptionListProps,
    DescriptionTermProps,
    DescriptionDetailsProps,
    ListType,
    ListIntent,
    ListMarker,
    ListSpacing,
    
    // Link Types
    LinkProps,
    LinkIntent,
    LinkVariant,
    LinkSize,
    LinkTarget,
    
    // Image Types
    ImageProps,
    ImageIntent,
    ImageAspectRatio,
    ImageFit,
    ImageLoadingState,
    ImageSize,
} from './semantic';

