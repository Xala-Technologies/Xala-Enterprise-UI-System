/**
 * @fileoverview UI Components Index v6.0.0
 * @description Clean export of essential UI components
 * @version 6.0.0
 */

// Core components that wrap semantic components
export { Button, type ButtonProps } from './button';
export { Input, type InputProps } from './input';
export { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter,
  type CardProps,
  type CardHeaderProps,
  type CardContentProps,
  type CardFooterProps
} from './card';

// Form components
export {
  Checkbox,
  CheckboxGroup,
  type CheckboxProps,
  type CheckboxGroupProps,
  type CheckboxOption,
  type CheckboxSize,
  type CheckboxVariant
} from './checkbox';

export {
  Select,
  type SelectProps,
  type SelectOption,
  type SelectSize,
  type SelectVariant
} from './select';

export {
  Textarea,
  type TextareaProps,
  type TextareaSize,
  type TextareaVariant,
  type TextareaResize
} from './textarea';

// Feedback components
export {
  Alert,
  AlertTitle,
  AlertDescription,
  type AlertProps,
  type AlertVariant
} from './alert';

// Additional UI components
export {
  Badge,
  type BadgeProps
} from './badge';

export {
  Tooltip,
  type TooltipProps
} from './tooltip';

export {
  Avatar,
  type AvatarProps
} from './avatar';

export {
  Skeleton,
  type SkeletonProps
} from './skeleton';

export {
  Spinner,
  type SpinnerProps
} from './spinner';

export {
  Progress,
  type ProgressProps
} from './progress';

export {
  Separator,
  type SeparatorProps
} from './separator';

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  type DialogProps,
  type DialogContentProps
} from './dialog';

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps
} from './tabs';

// Re-export essential semantic components for convenience
export {
  Box,
  Text,
  Heading,
  Container,
  List,
  ListItem,
  Link,
  Image,
  Toast,
  type BoxProps,
  type TextProps,
  type HeadingProps,
  type ContainerProps,
  type ListProps,
  type ListItemProps,
  type LinkProps,
  type ImageProps,
  type ToastProps,
} from '../semantic';