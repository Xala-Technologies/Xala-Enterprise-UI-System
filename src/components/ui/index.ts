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

// Re-export semantic components for convenience
export {
  Box,
  Text,
  Heading,
  Container,
  List,
  ListItem,
  Link,
  type BoxProps,
  type TextProps,
  type HeadingProps,
  type ContainerProps,
  type ListProps,
  type ListItemProps,
  type LinkProps
} from '../semantic';