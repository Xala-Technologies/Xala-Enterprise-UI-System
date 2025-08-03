/**
 * Layout Components Index
 * Comprehensive layout system exports for Enterprise UI System v5.0.0
 */

// =============================================================================
// BASE LAYOUT COMPONENTS
// =============================================================================

export * from './BaseLayout';
export * from './components';

// =============================================================================
// PLATFORM-SPECIFIC LAYOUTS
// =============================================================================

// Mobile Layout Components
export * from './mobile/MobileLayout';

// Tablet Layout Components
export * from './tablet/TabletLayout';

// Desktop Layout Components
export * from './desktop';

// Web Layout Components
export * from './web/WebLayout';

// Admin Layout Components
export * from './admin/AdminLayout';

// =============================================================================
// ENTERPRISE LAYOUT SYSTEMS
// =============================================================================

// Dashboard Layouts - Analytics and Metrics
export * from './dashboard';

// Form Layouts - Structured Form Containers
export * from './form';

// Content Layouts - Articles, Documentation, Blog Posts
export * from './content';

// Authentication Layouts - Login, Register, Password Reset
export * from './auth';

// E-commerce Layouts - Product, Checkout, Payment, Invoice
export * from './ecommerce';

// Communication Layouts - Chat, Forum, Feed, Comments
export * from './communication';

// Specialized Layouts - Error, Maintenance, Settings, Help
export * from './specialized';

// =============================================================================
// LAYOUT COMPOSITION UTILITIES
// =============================================================================

export { LayoutComposition } from './BaseLayout';
export { DesktopLayoutComposition } from './desktop';
export { MobileLayoutComposition } from './mobile/MobileLayout';

// =============================================================================
// BASE LAYOUT TYPES
// =============================================================================

export type {
    BaseLayoutProps,
    FooterProps,
    HeaderProps,
    MainContentProps,
    SidebarProps
} from './BaseLayout';

// =============================================================================
// PLATFORM-SPECIFIC LAYOUT TYPES
// =============================================================================

// Mobile Layout Types
export type {
    MobileBottomNavigationProps,
    MobileContentProps,
    MobileDrawerProps,
    MobileHeaderProps,
    MobileLayoutProps
} from './mobile/MobileLayout';

// Tablet Layout Types
export type {
    TabletHeaderProps,
    TabletLayoutProps,
    TabletSidebarProps
} from './tablet/TabletLayout';

// Desktop Layout Types
export type {
    DesktopHeaderProps,
    DesktopLayoutProps,
    DesktopMainContentProps,
    DesktopSidebarProps,
    DesktopStatusBarProps,
    DesktopToolbarProps
} from './desktop';

// Web Layout Types
export type {
    WebContentProps,
    WebFooterProps,
    WebLayoutProps,
    WebNavbarProps
} from './web/WebLayout';

// Admin Layout Types
export type {
    AdminContentProps,
    AdminLayoutProps,
    AdminSidebarProps,
    AdminTopBarProps
} from './admin/AdminLayout';

// =============================================================================
// ENTERPRISE LAYOUT TYPES
// =============================================================================

// Dashboard Layout Types
export type {
    DashboardLayoutProps,
    DashboardHeaderProps,
    DashboardSidebarProps,
    DashboardContentProps,
    DashboardGridProps,
    DashboardStatsProps,
    DashboardChartContainerProps,
} from './dashboard';

// Form Layout Types
export type {
    FormLayoutProps,
    FormContainerProps,
    FormHeaderProps,
    FormSectionProps,
    FormActionsProps,
    FormStepperProps,
    FormStepProps,
    FormProgressProps,
} from './form';

// Content Layout Types
export type {
    ContentLayoutProps,
    ContentHeaderProps,
    ContentSidebarProps,
    ContentBodyProps,
    ContentMetaProps,
    ContentTableOfContentsProps,
    ContentNavigationProps,
    ContentShareProps,
    TOCHeading,
} from './content';

// Authentication Layout Types
export type {
    AuthLayoutProps,
    AuthCardProps,
    AuthHeaderProps,
    AuthSplitPanelProps,
    AuthFooterProps,
    AuthFooterLink,
    LoginLayoutProps,
    RegisterLayoutProps,
    ForgotPasswordLayoutProps,
    EmailVerificationLayoutProps,
} from './auth';

// E-commerce Layout Types
export type {
    EcommerceLayoutProps,
    ProductLayoutProps,
    ProductGalleryProps,
    ProductDetailsProps,
    CheckoutStepsProps,
    OrderSummaryProps,
    InvoiceProps,
    ProductImage,
    CheckoutStep,
    OrderItem,
    OrderShipping,
    OrderTax,
    OrderDiscount,
    OrderTotal,
    InvoiceData,
    InvoiceContact,
    InvoiceItem,
} from './ecommerce';

// Communication Layout Types
export type {
    CommunicationLayoutProps,
    ChatLayoutProps,
    ChatSidebarProps,
    MessageListProps,
    MessageInputProps,
    ForumPostProps,
    FeedItemProps,
    CommentThreadProps,
    ChatUser,
    ChatChannel,
    ChatMessage,
    MessageReaction,
    MessageAttachment,
    ForumPost,
    ForumUser,
    FeedItem,
    FeedUser,
    FeedMedia,
    Comment,
    CommentUser,
} from './communication';

// Specialized Layout Types
export type {
    SpecializedLayoutProps,
    ErrorPageProps,
    MaintenancePageProps,
    MaintenanceContact,
    SettingsLayoutProps,
    SettingsSection,
    SettingsSidebarProps,
    SettingsPanelProps,
    HelpLayoutProps,
    HelpCategory,
    HelpArticle,
    HelpSearchProps,
    HelpSearchResult,
    ComingSoonPageProps,
    SocialLink,
} from './specialized';

// =============================================================================
// PLATFORM UTILITIES
// =============================================================================

export { useLayoutPlatform } from './BaseLayout';

// =============================================================================
// LAYOUT CONSTANTS
// =============================================================================

/**
 * Available layout categories for enterprise applications
 */
export const LAYOUT_CATEGORIES = {
    BASE: 'base',
    PLATFORM: 'platform',
    DASHBOARD: 'dashboard',
    FORM: 'form',
    CONTENT: 'content',
    AUTH: 'auth',
    ECOMMERCE: 'ecommerce',
    COMMUNICATION: 'communication',
    SPECIALIZED: 'specialized',
} as const;

/**
 * Layout variant collections for easy imports
 */
export const LAYOUT_VARIANTS = {
    DASHBOARD: ['standard', 'compact', 'wide', 'fluid', 'minimal'] as const,
    FORM: ['centered', 'standard', 'fullscreen', 'card', 'split'] as const,
    CONTENT: ['article', 'blog', 'documentation', 'magazine', 'minimal', 'wide', 'fullwidth'] as const,
    AUTH: ['centered', 'split', 'fullscreen', 'floating', 'minimal'] as const,
    ECOMMERCE: ['product', 'checkout', 'payment', 'invoice', 'cart', 'catalog'] as const,
    COMMUNICATION: ['chat', 'forum', 'feed', 'comments', 'messaging', 'discussion'] as const,
    SPECIALIZED: ['error', 'maintenance', 'settings', 'help', 'comingSoon', 'notFound'] as const,
} as const;
