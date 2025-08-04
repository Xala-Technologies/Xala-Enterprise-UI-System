/**
 * @fileoverview Components Index v6.0.0
 * @description Clean export of all components
 * @version 6.0.0
 */

// Semantic components (core) - export everything
export * from './semantic';

// UI components - export specific items to avoid conflicts with semantic
export {
  // Form components
  Checkbox,
  CheckboxGroup,
  type CheckboxProps,
  type CheckboxGroupProps,
  type CheckboxOption,
  type CheckboxSize,
  type CheckboxVariant,
  
  // Alert components
  Alert,
  AlertTitle,
  AlertDescription,
  type AlertProps,
  type AlertVariant,
  
  // Textarea
  Textarea,
  type TextareaProps,
  type TextareaSize,
  type TextareaVariant,
  type TextareaResize
} from './ui';

// Layout components - export specific items to avoid conflicts
export {
  // Stack components only (no Container/Section conflicts)
  HStack,
  Stack,
  VStack,
  type StackProps,
  
  // Grid components
  Grid,
  GridItem,
  type GridCols,
  type GridGap,
  type GridItemProps,
  type GridItemSpan,
  type GridItemStart,
  type GridProps,
  
  // Card and PageLayout
  Card,
  PageLayout,
  
  // Dashboard
  Dashboard,
  type DashboardProps,
  type KPICardData,
  type QuickAction,
  type ActivityItem
} from './layout';

// Enhanced components
export * from './enhanced';

// Form components - export specific items to avoid Input conflict
export {
  Form,
  OrganizationNumberInput,
  PersonalNumberInput,
  Select as FormSelect,
  TextArea,
  type FormComponentProps,
  type FormProps,
  type OrganizationData,
  type OrganizationNumberInputProps,
  type PersonalNumberInputProps,
  type SelectOption,
  type SelectProps as FormSelectProps,
  type TextAreaProps,
  type ValidationError,
  type ValidationResult
} from './form';