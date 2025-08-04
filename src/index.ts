/**
 * @fileoverview Xala UI System v6.0.0 - Enterprise Semantic Architecture
 * @description Clean, production-ready UI component library
 * @version 6.0.0
 */

// ===== SEMANTIC COMPONENTS (Core) =====
export {
  // Box components
  Box,
  Section,
  Article,
  Header,
  Footer,
  Main,
  Nav,
  Aside,
  type BoxProps,
  type SemanticElement,
  type SemanticRole,
  
  // Container components  
  Container,
  PageContainer,
  ContentContainer,
  CardContainer,
  HeroContainer,
  ArticleContainer,
  type ContainerProps,
  type ContainerVariant,
  
  // Text components
  Text,
  Text as Typography, // Alias for external compatibility
  type TextProps,
  
  // Heading components
  Heading,
  type HeadingProps,
  type HeadingLevel,
  type HeadingSize,
  
  // Button components
  Button,
  type ButtonProps,
  type ButtonIntent,
  type ButtonSize,
  type ButtonLoadingState,
  
  // Input components
  Input,
  type InputProps,
  type InputIntent,
  type InputSize,
  type InputState,
  
  // List components
  List,
  ListItem,
  OrderedList,
  UnorderedList,
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
  type ListProps,
  type ListItemProps,
  
  // Breadcrumb components
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  type BreadcrumbProps,
  type BreadcrumbItemProps,
  
  // Navigation components
  Navigation,
  NavigationItem,
  type NavigationProps,
  type NavigationItemProps,
  type NavigationIntent,
  
  // Toast components  
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastTitle,
  type ToastProps,
  type ToastActionProps,
  
  // Link components
  Link,
  ExternalLink,
  InternalLink,
  EmailLink,
  PhoneLink,
  DownloadLink,
  type LinkProps,
  
  // Image components
  Image,
  type ImageProps,
} from './components/semantic';

// ===== UI COMPONENTS =====
export {
  // Form components
  Checkbox,
  CheckboxGroup,
  type CheckboxProps,
  type CheckboxGroupProps,
  type CheckboxOption,
  type CheckboxSize,
  type CheckboxVariant,
  
  // Layout UI components  
  Card,
  type CardProps,
  
  // Form UI components
  Textarea,
  type TextareaProps,
  type TextareaSize,
  type TextareaVariant,
  type TextareaResize,

  Select,
  type SelectProps,
  type SelectOption,
  type SelectSize,
  type SelectVariant,
  
  // Additional UI components
  Badge,
  type BadgeProps,
  Tooltip,
  type TooltipProps,
  Avatar,
  type AvatarProps,
  Skeleton,
  type SkeletonProps,
  Spinner,
  type SpinnerProps,
  Progress,
  type ProgressProps,
  Separator,
  type SeparatorProps,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  type DialogProps,
  type DialogContentProps,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
  
  // Alert components
  Alert,
  AlertTitle,
  AlertDescription,
  type AlertProps,
  type AlertVariant,
  
  // Data display components
  DataTable,
  type DataTableProps,
  type DataTableColumn,
  type DataTablePagination,
  
  // Norwegian compliance components
  ClassificationIndicator,
  ClassificationBanner,
  type ClassificationIndicatorProps,
  type ClassificationBannerProps,
  
  // Modal components
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalTrigger,
  ConfirmModal,
  type ModalProps,
  type ModalContentProps,
  type ConfirmModalProps,
  
  // Pagination components
  Pagination,
  SimplePagination,
  type PaginationProps,
  type SimplePaginationProps,
} from './components/ui';

// ===== LAYOUT COMPONENTS =====
export {
  // Grid system
  Grid,
  GridItem,
  type GridProps,
  type GridItemProps,
  type GridCols,
  type GridGap,
  type GridItemSpan,
  type GridItemStart,
  
  // Stack system
  Stack,
  HStack,
  VStack,
  type StackProps,
  
  // Dashboard layouts
  Dashboard,
  type DashboardProps,
  type KPICardData,
  type QuickAction,
  type ActivityItem,
  
  // Page layouts
  PageLayout,
  
  // Legacy layout components (maintained for compatibility)
  Card as LayoutCard,
  Section as LayoutSection,
} from './components/layout';

// ===== SPECIALIZED LAYOUTS =====
export {
  // Base layouts
  BaseLayout,
  type BaseLayoutProps,
} from './layouts/BaseLayout';

export {
  // Admin layouts
  AdminLayout,
  type AdminLayoutProps,
} from './layouts/admin/AdminLayout';

export {
  // Desktop layout
  DesktopLayout,
  type DesktopLayoutProps,
} from './layouts/desktop/DesktopLayout';

export {
  // Mobile layout  
  MobileLayout,
  type MobileLayoutProps,
} from './layouts/mobile/MobileLayout';

export {
  // Tablet layout
  TabletLayout,
  type TabletLayoutProps,
} from './layouts/tablet/TabletLayout';

export {
  // Web layout
  WebLayout,
  type WebLayoutProps,
} from './layouts/web/WebLayout';

// ===== FORM COMPONENTS =====
export {
  // Norwegian compliance inputs
  OrganizationNumberInput,
  type OrganizationNumberInputProps,
  PersonalNumberInput,
  type PersonalNumberInputProps,
  
  // Form components
  Form,
  type FormProps,
  TextArea,
  type TextAreaProps,
} from './components/form';

// ===== NAVIGATION COMPONENTS =====
export {
  // Navigation bar
  WebNavbar,
  MobileWebNavbar,
  type WebNavbarProps,
  type MobileWebNavbarProps,
  type WebNavbarVariant,
} from './components/navigation';

// ===== PROVIDERS =====
export { 
  UISystemProvider, 
  useUISystem,
  type UISystemProviderProps 
} from './providers/UISystemProvider';
export { ThemeProvider, type ThemeProviderProps } from './providers/ThemeProvider';
export { DesignSystemProvider, type DesignSystemProviderProps } from './providers/DesignSystemProvider';
export { BrandingProvider, type BrandingProviderProps } from './providers/BrandingProvider';
export { ResponsiveLayoutProvider, type ResponsiveLayoutProviderProps } from './providers/ResponsiveLayoutProvider';
export { SSRProvider, type SSRProviderProps } from './providers/SSRProvider';
export { HydrationProvider, type HydrationProviderProps } from './providers/HydrationProvider';

// ===== HOOKS ===== (Temporarily removed for clean build)

// ===== TOKENS ===== (Basic tokens only)
// Export basic design tokens without conflicts

// ===== UTILITIES =====
// Core styling utilities
export { cn } from './lib/utils/cn';
export { classNames } from './utils/classNames';

// Platform and responsive utilities
export { 
  getPlatformType, 
  getDeviceType, 
  isTouchDevice,
  supportsHover,
  prefersReducedMotion,
  prefersDarkMode,
  getScreenDimensions,
  getOrientation,
  type PlatformType,
  type DeviceType 
} from './utils/platform';

// Object and data utilities
export {
  mergeDeep,
  deepClone
} from './utils/objects';

// Validation utilities
export {
  createSuccessResult,
  createFailureResult,
  type ValidationResult
} from './lib/utils/validation';

// SSR utilities
export {
  isServer,
  canUseDOM
} from './utils/ssr';

// ===== TYPES =====
export type * from './types';

// ===== VERSION =====
export const UI_SYSTEM_VERSION = '6.0.0';
export const SEMANTIC_ARCHITECTURE_VERSION = '1.0.0';