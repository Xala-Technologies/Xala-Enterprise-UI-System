/**
 * @fileoverview Essential Semantic Components v6.0.0
 * @description Only the core working semantic components
 * @version 6.0.0
 */

// ===== BOX COMPONENTS =====
export {
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
} from './Box';

// ===== CONTAINER COMPONENTS =====
export {
  Container,
  PageContainer,
  ContentContainer,
  CardContainer,
  HeroContainer,
  ArticleContainer,
  type ContainerProps,
  type ContainerVariant,
} from './Container';

// ===== TEXT COMPONENTS =====
export {
  Text,
  type TextProps,
} from './Text';

// ===== HEADING COMPONENTS =====
export {
  Heading,
  type HeadingProps,
  type HeadingLevel,
  type HeadingSize,
} from './Heading';

// ===== BUTTON COMPONENTS =====
export {
  Button,
  type ButtonProps,
  type ButtonIntent,
  type ButtonSize,
  type ButtonLoadingState,
} from './Button';

// ===== INPUT COMPONENTS =====
export {
  Input,
  type InputProps,
  type InputIntent,
  type InputSize,
  type InputState,
} from './Input';

// ===== BREADCRUMB COMPONENTS =====
export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  type BreadcrumbProps,
  type BreadcrumbItemProps,
} from './Breadcrumb';

// ===== LIST COMPONENTS =====
export {
  List,
  ListItem,
  OrderedList,
  UnorderedList,
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
  type ListProps,
  type ListItemProps,
} from './List';

// ===== NAVIGATION COMPONENTS =====
export {
  Navigation,
  NavigationItem,
  type NavigationProps,
  type NavigationItemProps,
  type NavigationIntent,
} from './Navigation';

// ===== TOAST COMPONENTS =====
export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastTitle,
  type ToastProps,
  type ToastActionProps,
} from './Toast';

// ===== LINK COMPONENTS =====
export {
  Link,
  ExternalLink,
  InternalLink,
  EmailLink,
  PhoneLink,
  DownloadLink,
  type LinkProps,
} from './Link';

// ===== IMAGE COMPONENTS =====
export {
  Image,
  type ImageProps,
} from './Image';