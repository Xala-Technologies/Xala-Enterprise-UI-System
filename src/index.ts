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
} from './components/ui';

// ===== PROVIDERS =====
export { ThemeProvider, type ThemeProviderProps } from './providers/ThemeProvider';
export { DesignSystemProvider, type DesignSystemProviderProps } from './providers/DesignSystemProvider';
export { BrandingProvider, type BrandingProviderProps } from './providers/BrandingProvider';
export { ResponsiveLayoutProvider, type ResponsiveLayoutProviderProps } from './providers/ResponsiveLayoutProvider';

// ===== HOOKS ===== (Temporarily removed for clean build)

// ===== TOKENS ===== (Basic tokens only)
// Export basic design tokens without conflicts

// ===== UTILITIES =====
export { cn } from './lib/utils/cn';
export { classNames } from './utils/classNames';

// ===== TYPES =====
export type * from './types';

// ===== VERSION =====
export const UI_SYSTEM_VERSION = '6.0.0';
export const SEMANTIC_ARCHITECTURE_VERSION = '1.0.0';