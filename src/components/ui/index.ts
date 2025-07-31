/**
 * Shadcn-ui components index
 * Exports all UI components with design tokens and CSS variables
 */

// Button components
export { Button, type ButtonProps } from './button';
export { IconButton, type IconButtonProps, type IconButtonShape, type IconButtonSize, type IconButtonVariant } from './icon-button';

// Form components
export { Checkbox, CheckboxGroup, type CheckboxGroupProps, type CheckboxOption, type CheckboxProps, type CheckboxSize, type CheckboxVariant } from './checkbox';
export { Input, type InputProps } from './input';
export { Radio, RadioGroup, type RadioGroupProps, type RadioOption, type RadioProps, type RadioSize, type RadioVariant } from './radio';
export { Select, type SelectOption, type SelectProps, type SelectSize, type SelectVariant } from './select';
export { Slider, type SliderProps, type SliderSize, type SliderVariant } from './slider';
export { Switch, type SwitchProps, type SwitchSize, type SwitchVariant } from './switch';
export { Textarea, type TextareaProps, type TextareaResize, type TextareaSize, type TextareaVariant } from './textarea';

// Data display components
export { Avatar, type AvatarProps } from './avatar';
export { Badge, type BadgeProps, type BadgeSize, type BadgeVariant } from './badge';
export { Divider, type DividerOrientation, type DividerProps, type DividerSize, type DividerStyle, type DividerVariant } from './divider';
export { Blockquote, Code, Heading, Text, Typography, type TypographyAlign, type TypographyColor, type TypographyProps, type TypographyVariant } from './typography';

// Feedback components
export { Alert, AlertDescription, AlertTitle, type AlertProps, type AlertVariant } from './alert';
export { CircularProgress, Progress, type CircularProgressProps, type ProgressProps, type ProgressSize, type ProgressVariant } from './progress';
export { Tooltip, TooltipContent, TooltipTrigger, type TooltipContentProps, type TooltipProps, type TooltipSide } from './tooltip';

// Layout components
export { Card, CardContent, CardFooter, CardHeader, type CardContentProps, type CardFooterProps, type CardHeaderProps, type CardProps } from './card';
export { 
  Header, 
  HeaderSection, 
  HeaderTitle, 
  HeaderLogo, 
  HeaderComposition,
  headerVariants,
  headerSectionVariants,
  type HeaderProps, 
  type HeaderSectionProps, 
  type HeaderTitleProps, 
  type HeaderLogoProps,
  type HeaderVariant,
  type HeaderSectionVariant
} from './header';
export {
  Sidebar,
  SidebarHeader,
  SidebarSection,
  SidebarItem,
  SidebarComposition,
  sidebarVariants,
  sidebarOverlayVariants,
  sidebarContentVariants,
  type SidebarProps,
  type SidebarHeaderProps,
  type SidebarSectionProps,
  type SidebarItemProps,
  type SidebarVariant,
  type SidebarOverlayVariant,
  type SidebarContentVariant
} from './sidebar';

// Navigation components
export { Breadcrumb, type BreadcrumbItem, type BreadcrumbProps, type BreadcrumbSize, type BreadcrumbVariant } from './breadcrumb';
export { Pagination, type PaginationProps, type PaginationSize, type PaginationVariant } from './pagination';

// Loading components
export {
    Skeleton, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonText, type SkeletonAvatarProps, type SkeletonButtonProps, type SkeletonCardProps, type SkeletonProps, type SkeletonSpeed, type SkeletonTextProps, type SkeletonVariant
} from './skeleton';

// Accordion components
export {
    Accordion, AccordionContent, AccordionItem, AccordionTrigger, type AccordionContentProps, type AccordionItemData, type AccordionItemProps, type AccordionProps, type AccordionTriggerProps
} from './accordion';

// Individual Tabs components (shadcn-ui style)
export { TabsContent, TabsList, TabsTrigger, type TabsContentProps, type TabsListProps, type TabsOrientation, type TabsTriggerProps } from './tabs-individual';

// Command Palette
export { CommandPalette, type CommandGroup, type CommandItem, type CommandPaletteProps, type CommandPaletteSize, type CommandPaletteTexts, type CommandPaletteVariant } from './command-palette';

// Drawer
export {
    Drawer, DrawerBody, DrawerFooter, DrawerHeader, type DrawerBodyProps, type DrawerFooterProps, type DrawerHeaderProps, type DrawerOverlayVariant, type DrawerProps, type DrawerSide, type DrawerSize
} from './drawer';

// Calendar
export { Calendar, type CalendarDate, type CalendarProps, type CalendarSize, type CalendarVariant, type NorwegianHoliday } from './calendar';

// Tree View
export { TreeView, TreeViewItem, type TreeViewData, type TreeViewItemProps, type TreeViewProps } from './tree-view';

// Context Menu
export {
    ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, type ContextMenuContentProps, type ContextMenuItemProps, type ContextMenuProps, type ContextMenuTriggerProps
} from './context-menu';

// Timeline
export { Timeline, TimelineItem, type TimelineItemData, type TimelineItemProps, type TimelineProps } from './timeline';

// Date & Time Pickers
export { DatePicker, type DatePickerProps } from './date-picker';
export { TimePicker, type TimePickerProps } from './time-picker';

// Chat Interface Components
export {
    ActionBar,
    defaultActions, 
    type ActionBarProps,
    type ActionBarVariant, 
    type ActionBarSize, 
    type ActionBarOrientation, 
    type ActionBarVisibility, 
    type ActionBarPosition, 
    type ActionBarRounded,
    type ActionButtonVariant, 
    type ActionButtonSize, 
    type ActionButtonShape,
    type ActionConfig,
    type ActionType
} from './action-bar';
export { Box, type BoxProps } from './box';
export {
    CodeBlock, languageConfig, type CodeBlockProps
} from './code-block';
export {
    MessageBubble, messageBubbleAvatarVariants,
    messageBubbleMetadataVariants, messageBubbleVariants, type MessageBubbleProps
} from './message-bubble';
export { ScrollArea, scrollAreaVariants, type ScrollAreaProps } from './scroll-area';
export { Separator, type SeparatorProps } from './separator';

