/**
 * @fileoverview Semantic Components Index v5.0.0 - Complete Semantic Component System
 * @description Export all semantic components for easy importing and usage
 * @version 5.0.0
 * @compliance WCAG AAA, SSR-Safe, Framework-agnostic, Norwegian compliance
 */

// Import components for the collection objects
import { Box } from './Box';
import { Container } from './Container';
import { Text } from './Text';
import { Heading } from './Heading';
import { Button } from './Button';
import { Input } from './Input';
import { List, ListItem } from './List';
import { Breadcrumb } from './Breadcrumb';
import { Navigation } from './Navigation';
import { Toast } from './Toast';
import { Link } from './Link';
import { Image } from './Image';

// =============================================================================
// BOX COMPONENTS - Layout and Container Elements
// =============================================================================

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

// =============================================================================
// CONTAINER COMPONENTS - Layout Container Elements
// =============================================================================

export {
  Container,
  PageContainer,
  ContentContainer,
  CardContainer,
  HeroContainer,
  ArticleContainer,
  SidebarContainer,
  ModalContainer,
  containerVariants,
  intentVariants,
  type ContainerProps,
  type ContainerElement,
  type ContainerIntent,
  type ContainerVariant,
} from './Container';

// =============================================================================
// TEXT COMPONENTS - Typography and Text Elements
// =============================================================================

export {
  Text,
  Paragraph,
  Label,
  Small,
  Code,
  Strong,
  Emphasis,
  type TextProps,
  type TextElement,
  type TextIntent,
  type TextLevel,
} from './Text';

// =============================================================================
// HEADING COMPONENTS - Heading Elements with Semantic Hierarchy
// =============================================================================

export {
  Heading,
  PageTitle,
  SectionTitle,
  CardTitle,
  ModalTitle,
  DisplayHeading,
  Subtitle,
  type HeadingProps,
  type HeadingLevel,
  type HeadingSize,
  type HeadingIntent,
} from './Heading';

// =============================================================================
// BUTTON COMPONENTS - Interactive Button Elements
// =============================================================================

export {
  Button,
  PrimaryButton,
  SecondaryButton,
  OutlineButton,
  GhostButton,
  DestructiveButton,
  IconButton,
  type ButtonProps,
  type ButtonIntent,
  type ButtonSize,
  type ButtonLoadingState,
  type IconPosition,
} from './Button';

// =============================================================================
// INPUT COMPONENTS - Form Input Elements
// =============================================================================

export {
  Input,
  SearchInput,
  EmailInput,
  PasswordInput,
  PhoneInput,
  NumberInput,
  DateInput,
  FileInput,
  type InputProps,
  type InputType,
  type InputIntent,
  type InputState,
  type InputSize,
} from './Input';

// =============================================================================
// LIST COMPONENTS - List and Navigation Elements
// =============================================================================

export {
  List,
  ListItem,
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
  NavigationList,
  Checklist,
  StepsList,
  FeaturesList,
  TagList,
  type ListProps,
  type ListItemProps,
  type DescriptionListProps,
  type DescriptionTermProps,
  type DescriptionDetailsProps,
  type ListType,
  type ListIntent,
  type ListMarker,
  type ListSpacing,
} from './List';

// =============================================================================
// BREADCRUMB COMPONENTS - Navigation Path Elements
// =============================================================================

export {
  Breadcrumb,
  BreadcrumbSeparator,
  NavigationBreadcrumb,
  ProcessBreadcrumb,
  CategoryBreadcrumb,
  WorkflowBreadcrumb,
  breadcrumbVariants,
  breadcrumbItemVariants,
  breadcrumbSeparatorVariants,
  type BreadcrumbProps,
  type BreadcrumbSeparatorProps,
  type BreadcrumbItem,
  type BreadcrumbIntent,
  type BreadcrumbVariant,
} from './Breadcrumb';

// =============================================================================  
// NAVIGATION COMPONENTS - Navigation Structure Elements
// =============================================================================

export {
  Navigation,
  NavigationGroup,
  PrimaryNavigation,
  SidebarNavigation,
  TabNavigation,
  FooterNavigation,
  MenuNavigation,
  StepsNavigation,
  navigationVariants,
  navigationItemVariants,
  navigationGroupVariants,
  type NavigationProps,
  type NavigationGroupProps,
  type NavigationItem,
  type NavigationIntent,
  type NavigationVariant,
} from './Navigation';

// =============================================================================
// TOAST COMPONENTS - Feedback Notification Elements
// =============================================================================

export {
  Toast,
  SuccessToast,
  ErrorToast,
  WarningToast,
  InfoToast,
  LoadingToast,
  ProgressToast,
  toastVariants,
  nsmVariants,
  type ToastProps,
  type ToastAction,
  type ToastIntent,
  type ToastPosition,
  type ToastPriority,
  type ToastVariant,
} from './Toast';

// =============================================================================
// LINK COMPONENTS - Link and Navigation Elements
// =============================================================================

export {
  Link,
  NavigationLink,
  ExternalLink,
  EmailLink,
  PhoneLink,
  DownloadLink,
  AnchorLink,
  BreadcrumbLink,
  ButtonLink,
  type LinkProps,
  type LinkIntent,
  type LinkVariant,
  type LinkSize,
  type LinkTarget,
} from './Link';

// =============================================================================
// IMAGE COMPONENTS - Image and Media Elements
// =============================================================================

export {
  Image,
  Avatar,
  Logo,
  HeroImage,
  Thumbnail,
  GalleryImage,
  ProductImage,
  IconImage,
  DecorativeImage,
  type ImageProps,
  type ImageIntent,
  type ImageAspectRatio,
  type ImageFit,
  type ImageLoadingState,
  type ImageSize,
} from './Image';

// =============================================================================
// SEMANTIC COMPONENTS COLLECTION
// =============================================================================

/**
 * Complete collection of all semantic components for easy bulk import
 */
export const SemanticComponents = {
  // Layout Components
  Box: Box,
  Section: Box,
  Article: Box,
  Header: Box,
  Footer: Box,
  Main: Box,
  Nav: Box,
  Aside: Box,
  
  // Container Components
  Container: Container,
  PageContainer: Container,
  ContentContainer: Container,
  CardContainer: Container,
  HeroContainer: Container,
  ArticleContainer: Container,
  SidebarContainer: Container,
  ModalContainer: Container,
  
  // Text Components  
  Text: Text,
  Paragraph: Text,
  Label: Text,
  Small: Text,
  Code: Text,
  Strong: Text,
  Emphasis: Text,
  
  // Heading Components
  Heading: Heading,
  PageTitle: Heading,
  SectionTitle: Heading,
  CardTitle: Heading,
  ModalTitle: Heading,
  DisplayHeading: Heading,
  Subtitle: Heading,
  
  // Button Components
  Button: Button,
  PrimaryButton: Button,
  SecondaryButton: Button,
  OutlineButton: Button,
  GhostButton: Button,
  DestructiveButton: Button,
  IconButton: Button,
  
  // Input Components
  Input: Input,
  SearchInput: Input,
  EmailInput: Input,
  PasswordInput: Input,
  PhoneInput: Input,
  NumberInput: Input,
  DateInput: Input,
  FileInput: Input,
  
  // List Components
  List: List,
  ListItem: ListItem,
  DescriptionList: List,
  DescriptionTerm: Text,
  DescriptionDetails: Text,
  NavigationList: List,
  Checklist: List,
  StepsList: List,
  FeaturesList: List,
  TagList: List,
  
  // Breadcrumb Components
  Breadcrumb: Breadcrumb,
  NavigationBreadcrumb: Breadcrumb,
  ProcessBreadcrumb: Breadcrumb,
  CategoryBreadcrumb: Breadcrumb,
  WorkflowBreadcrumb: Breadcrumb,
  
  // Navigation Components
  Navigation: Navigation,
  PrimaryNavigation: Navigation,
  SidebarNavigation: Navigation,
  TabNavigation: Navigation,
  FooterNavigation: Navigation,
  MenuNavigation: Navigation,
  StepsNavigation: Navigation,
  
  // Toast Components
  Toast: Toast,
  SuccessToast: Toast,
  ErrorToast: Toast,
  WarningToast: Toast,
  InfoToast: Toast,
  LoadingToast: Toast,
  ProgressToast: Toast,
  
  // Link Components
  Link: Link,
  NavigationLink: Link,
  ExternalLink: Link,
  EmailLink: Link,
  PhoneLink: Link,
  DownloadLink: Link,
  AnchorLink: Link,
  BreadcrumbLink: Link,
  ButtonLink: Link,
  
  // Image Components
  Image: Image,
  Avatar: Image,
  Logo: Image,
  HeroImage: Image,
  Thumbnail: Image,
  GalleryImage: Image,
  ProductImage: Image,
  IconImage: Image,
  DecorativeImage: Image,
} as const;

// =============================================================================
// SEMANTIC COMPONENT GROUPS
// =============================================================================

/**
 * Layout-focused semantic components
 */
export const LayoutComponents = {
  Box: Box,
  Section: Box,
  Article: Box,
  Header: Box,
  Footer: Box,
  Main: Box,
  Nav: Box,
  Aside: Box,
  Container: Container,
  PageContainer: Container,
  ContentContainer: Container,
  CardContainer: Container,
  HeroContainer: Container,
  ArticleContainer: Container,
  SidebarContainer: Container,
  ModalContainer: Container,
} as const;

/**
 * Typography-focused semantic components
 */
export const TypographyComponents = {
  Text: Text,
  Paragraph: Text,
  Label: Text,
  Small: Text,
  Code: Text,
  Strong: Text,
  Emphasis: Text,
  Heading: Heading,
  PageTitle: Heading,
  SectionTitle: Heading,
  CardTitle: Heading,
  ModalTitle: Heading,
  DisplayHeading: Heading,
  Subtitle: Heading,
} as const;

/**
 * Interactive semantic components
 */
export const InteractiveComponents = {
  Button: Button,
  PrimaryButton: Button,
  SecondaryButton: Button,
  OutlineButton: Button,
  GhostButton: Button,
  DestructiveButton: Button,
  IconButton: Button,
  Link: Link,
  NavigationLink: Link,
  ExternalLink: Link,
  EmailLink: Link,
  PhoneLink: Link,
  DownloadLink: Link,
  AnchorLink: Link,
  BreadcrumbLink: Link,
  ButtonLink: Link,
} as const;

/**
 * Form-related semantic components
 */
export const FormComponents = {
  Input: Input,
  SearchInput: Input,
  EmailInput: Input,
  PasswordInput: Input,
  PhoneInput: Input,
  NumberInput: Input,
  DateInput: Input,
  FileInput: Input,
  Label: Text,
  Button: Button,
} as const;

/**
 * Content semantic components
 */
export const ContentComponents = {
  List: List,
  ListItem: ListItem,
  DescriptionList: List,
  DescriptionTerm: Text,
  DescriptionDetails: Text,
  NavigationList: List,
  Checklist: List,
  StepsList: List,
  FeaturesList: List,
  TagList: List,
  Breadcrumb: Breadcrumb,
  NavigationBreadcrumb: Breadcrumb,
  ProcessBreadcrumb: Breadcrumb,
  CategoryBreadcrumb: Breadcrumb,
  WorkflowBreadcrumb: Breadcrumb,
  Navigation: Navigation,
  PrimaryNavigation: Navigation,
  SidebarNavigation: Navigation,
  TabNavigation: Navigation,
  FooterNavigation: Navigation,
  MenuNavigation: Navigation,
  StepsNavigation: Navigation,
  Toast: Toast,
  SuccessToast: Toast,
  ErrorToast: Toast,
  WarningToast: Toast,
  InfoToast: Toast,
  LoadingToast: Toast,
  ProgressToast: Toast,
  Image: Image,
  Avatar: Image,
  Logo: Image,
  HeroImage: Image,
  Thumbnail: Image,
  GalleryImage: Image,
  ProductImage: Image,
  IconImage: Image,
  DecorativeImage: Image,
} as const;

// =============================================================================
// USAGE EXAMPLES AND DOCUMENTATION
// =============================================================================

/**
 * @example Basic Layout Structure
 * ```tsx
 * import { Main, Section, Header, Footer } from '@/components/semantic';
 * 
 * function PageLayout() {
 *   return (
 *     <>
 *       <Header variant="elevated" spacing="lg">
 *         <PageTitle>Welcome</PageTitle>
 *       </Header>
 *       <Main spacing="xl">
 *         <Section variant="card" spacing="lg">
 *           <SectionTitle>Main Content</SectionTitle>
 *           <Paragraph>Content goes here...</Paragraph>
 *         </Section>
 *       </Main>
 *       <Footer variant="muted" spacing="md">
 *         <Small>© 2024 Company</Small>
 *       </Footer>
 *     </>
 *   );
 * }
 * ```
 */

/**
 * @example Form with Semantic Components
 * ```tsx
 * import { Box, Heading, Input, Button } from '@/components/semantic';
 * 
 * function ContactForm() {
 *   return (
 *     <Box as="form" variant="card" spacing="lg">
 *       <CardTitle>Contact Us</CardTitle>
 *       <EmailInput 
 *         label="Email" 
 *         required 
 *         helperText="We'll never share your email"
 *       />
 *       <Input 
 *         label="Message" 
 *         as="textarea" 
 *         required
 *       />
 *       <PrimaryButton type="submit" fullWidth>
 *         Send Message
 *       </PrimaryButton>
 *     </Box>
 *   );
 * }
 * ```
 */

/**
 * @example Navigation with Semantic Components
 * ```tsx
 * import { Nav, NavigationList, ListItem, NavigationLink } from '@/components/semantic';
 * 
 * function MainNavigation() {
 *   return (
 *     <Nav intent="navigation">
 *       <NavigationList spacing="sm">
 *         <ListItem>
 *           <NavigationLink href="/" state="active">Home</NavigationLink>  
 *         </ListItem>
 *         <ListItem>
 *           <NavigationLink href="/about">About</NavigationLink>
 *         </ListItem>
 *         <ListItem>
 *           <NavigationLink href="/contact">Contact</NavigationLink>
 *         </ListItem>
 *       </NavigationList>
 *     </Nav>
 *   );
 * }
 * ```
 */

/**
 * @example Media with Semantic Components
 * ```tsx
 * import { Box, HeroImage, Avatar, GalleryImage } from '@/components/semantic';
 * 
 * function MediaShowcase() {
 *   return (
 *     <Box spacing="xl">
 *       <HeroImage 
 *         src="/hero.jpg" 
 *         alt="Beautiful landscape"
 *         priority
 *       />
 *       <Box display="flex" gap="md" align="center">
 *         <Avatar 
 *           src="/user.jpg" 
 *           alt="John Doe"
 *           size="lg"
 *         />
 *         <Box>
 *           <Text weight="semibold">John Doe</Text>
 *           <Small variant="muted">Photographer</Small>
 *         </Box>
 *       </Box>
 *     </Box>
 *   );
 * }
 * ```
 */

// =============================================================================
// VERSION AND METADATA
// =============================================================================

/**
 * Semantic components system version and metadata
 */
export const SEMANTIC_COMPONENTS_VERSION = '5.0.0';

export const SEMANTIC_COMPONENTS_METADATA = {
  version: SEMANTIC_COMPONENTS_VERSION,
  name: 'Xala Enterprise Semantic Components',
  description: 'Complete semantic component system replacing raw HTML elements',
  compliance: ['WCAG AAA', 'Norwegian NSM', 'GDPR', 'SSR-Safe'],
  features: [
    'CVA pattern with design tokens',
    'TypeScript interfaces',
    'forwardRef implementation', 
    'i18n support',
    'Accessibility attributes',
    'Norwegian compliance',
    'Touch-friendly sizing',
    'Performance optimized',
  ],
  components: {
    layout: Object.keys(LayoutComponents).length,
    typography: Object.keys(TypographyComponents).length,
    interactive: Object.keys(InteractiveComponents).length,
    form: Object.keys(FormComponents).length,
    content: Object.keys(ContentComponents).length,
    total: Object.keys(SemanticComponents).length,
  },
} as const;