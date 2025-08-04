/**
 * @fileoverview Universal Design System Types
 * @description TypeScript type definitions for the Universal Design System
 * @version 1.0.0
 * @aiOptimized Types designed for AI code generation tools
 */

// =============================================================================
// CORE UNIVERSAL TYPES
// =============================================================================

/**
 * Universal Token Schema - Platform-agnostic design token structure
 */
export interface UniversalTokenSchema {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly version: string;
  readonly category: ThemeCategory;
  readonly mode: ThemeMode;
  readonly aiContext: AIContext;
  readonly tokens: TokenSystem;
  readonly components: Record<string, ComponentSpecification>;
  readonly composition: CompositionSystem;
  readonly platformAdapters?: PlatformAdapterConfig;
  readonly accessibility: AccessibilityConfig;
  readonly compliance: ComplianceConfig;
}

/**
 * AI Context - Information for AI code generation tools
 */
export interface AIContext {
  readonly designIntent: DesignIntent;
  readonly targetPlatforms: Platform[];
  readonly useCases: UseCase[];
  readonly industryVertical: IndustryVertical;
}

/**
 * Token System - Hierarchical design token structure
 */
export interface TokenSystem {
  readonly primitive: PrimitiveTokens;
  readonly semantic: SemanticTokens;
  readonly component: ComponentTokens;
}

/**
 * Component Specification - Universal component definition
 */
export interface ComponentSpecification {
  readonly name: string;
  readonly category: ComponentCategory;
  readonly description: string;
  readonly aiTags: string[];
  readonly props: Record<string, PropSpecification>;
  readonly variants: Record<string, VariantSpecification>;
  readonly composition: CompositionSpecification;
  readonly accessibility: ComponentAccessibility;
  readonly examples: ComponentExample[];
}

/**
 * Composition System - Smart layout and pattern definitions
 */
export interface CompositionSystem {
  readonly layouts: Record<string, LayoutPattern>;
  readonly patterns: CompositionPatterns;
}

// =============================================================================
// TOKEN SYSTEM TYPES
// =============================================================================

/**
 * Primitive Tokens - Raw design values
 */
export interface PrimitiveTokens {
  readonly color: Record<string, ColorScale | string>;
  readonly spacing: Record<string, string>;
  readonly typography: TypographyTokens;
  readonly borderRadius: Record<string, string>;
  readonly shadow: Record<string, string>;
  readonly animation: AnimationTokens;
}

/**
 * Semantic Tokens - Contextual design meanings
 */
export interface SemanticTokens {
  readonly color: SemanticColorTokens;
  readonly spacing: SemanticSpacingTokens;
  readonly typography: SemanticTypographyTokens;
}

/**
 * Component Tokens - Component-specific values
 */
export interface ComponentTokens {
  readonly [componentName: string]: {
    readonly sizing: Record<string, ComponentSizing>;
    readonly variants: Record<string, ComponentVariant>;
    readonly states: ComponentStates;
  };
}

/**
 * Color Scale - Standard color progression
 */
export interface ColorScale {
  readonly 50: string;
  readonly 100: string;
  readonly 200: string;
  readonly 300: string;
  readonly 400: string;
  readonly 500: string;
  readonly 600: string;
  readonly 700: string;
  readonly 800: string;
  readonly 900: string;
  readonly 950?: string;
}

/**
 * Typography Tokens - Font-related values
 */
export interface TypographyTokens {
  readonly fontFamily: Record<string, string[]>;
  readonly fontSize: Record<string, string>;
  readonly fontWeight: Record<string, number>;
  readonly lineHeight: Record<string, number>;
  readonly letterSpacing?: Record<string, string>;
}

/**
 * Animation Tokens - Motion-related values
 */
export interface AnimationTokens {
  readonly duration: Record<string, string>;
  readonly easing: Record<string, string>;
}

/**
 * Semantic Color Tokens - Contextual color meanings
 */
export interface SemanticColorTokens {
  readonly brand: BrandColors;
  readonly background: BackgroundColors;
  readonly text: TextColors;
  readonly border: BorderColors;
  readonly status: StatusColors;
  readonly interactive: InteractiveColors;
}

/**
 * Brand Colors - Primary brand identity colors
 */
export interface BrandColors {
  readonly primary: string;
  readonly secondary: string;
  readonly tertiary?: string;
}

/**
 * Background Colors - Surface and background colors
 */
export interface BackgroundColors {
  readonly default: string;
  readonly paper: string;
  readonly elevated: string;
  readonly overlay?: string;
}

/**
 * Text Colors - Typography colors
 */
export interface TextColors {
  readonly primary: string;
  readonly secondary: string;
  readonly tertiary: string;
  readonly inverse: string;
  readonly disabled: string;
}

/**
 * Border Colors - Boundary and separator colors
 */
export interface BorderColors {
  readonly default: string;
  readonly subtle: string;
  readonly strong: string;
  readonly focus: string;
}

/**
 * Status Colors - Feedback and state colors
 */
export interface StatusColors {
  readonly success: string;
  readonly warning: string;
  readonly error: string;
  readonly info: string;
}

/**
 * Interactive Colors - Action and interaction colors
 */
export interface InteractiveColors {
  readonly default: string;
  readonly hover: string;
  readonly active: string;
  readonly disabled: string;
  readonly focus: string;
}

/**
 * Semantic Spacing Tokens - Contextual spacing values
 */
export interface SemanticSpacingTokens {
  readonly layout: LayoutSpacing;
  readonly component: ComponentSpacing;
  readonly content: ContentSpacing;
}

/**
 * Layout Spacing - Page and section-level spacing
 */
export interface LayoutSpacing {
  readonly containerPadding: string;
  readonly sectionSpacing: string;
  readonly gridGap: string;
}

/**
 * Component Spacing - Component-level spacing
 */
export interface ComponentSpacing {
  readonly padding: string;
  readonly margin: string;
  readonly gap: string;
}

/**
 * Content Spacing - Content-level spacing
 */
export interface ContentSpacing {
  readonly lineSpacing: string;
  readonly paragraphSpacing: string;
}

/**
 * Semantic Typography Tokens - Contextual typography styles
 */
export interface SemanticTypographyTokens {
  readonly heading: HeadingStyles;
  readonly body: BodyStyles;
  readonly ui: UIStyles;
}

/**
 * Heading Styles - Heading typography variants
 */
export interface HeadingStyles {
  readonly primary: TypographyStyle;
  readonly secondary: TypographyStyle;
}

/**
 * Body Styles - Body text typography variants
 */
export interface BodyStyles {
  readonly default: TypographyStyle;
  readonly small: TypographyStyle;
  readonly large: TypographyStyle;
}

/**
 * UI Styles - Interface typography variants
 */
export interface UIStyles {
  readonly button: TypographyStyle;
  readonly label: TypographyStyle;
  readonly caption: TypographyStyle;
}

/**
 * Typography Style - Complete typography specification
 */
export interface TypographyStyle {
  readonly fontFamily: string;
  readonly fontSize: string;
  readonly fontWeight: number;
  readonly lineHeight: number;
  readonly letterSpacing?: string;
}

// =============================================================================
// COMPONENT SPECIFICATION TYPES
// =============================================================================

/**
 * Prop Specification - Universal component prop definition
 */
export interface PropSpecification {
  readonly type: PropType;
  readonly description: string;
  readonly required: boolean;
  readonly default?: any;
  readonly aiRecommended: boolean;
  readonly values?: readonly any[];
  readonly validation?: PropValidation;
}

/**
 * Variant Specification - Component variant definition
 */
export interface VariantSpecification {
  readonly name: string;
  readonly description: string;
  readonly default: boolean;
  readonly aiRecommended: boolean;
  readonly values: readonly string[];
}

/**
 * Composition Specification - Component usage rules
 */
export interface CompositionSpecification {
  readonly children: ChildrenSpecification;
  readonly parent: ParentSpecification;
  readonly siblings: SiblingSpecification;
}

/**
 * Children Specification - Allowed child components
 */
export interface ChildrenSpecification {
  readonly allowed: readonly string[];
  readonly recommended: readonly string[];
}

/**
 * Parent Specification - Recommended parent components
 */
export interface ParentSpecification {
  readonly recommended: readonly string[];
}

/**
 * Sibling Specification - Compatible sibling components
 */
export interface SiblingSpecification {
  readonly worksWellWith: readonly string[];
}

/**
 * Component Accessibility - Accessibility specification
 */
export interface ComponentAccessibility {
  readonly role?: string;
  readonly ariaAttributes: readonly string[];
  readonly keyboardSupport: readonly string[];
}

/**
 * Component Example - Usage example
 */
export interface ComponentExample {
  readonly name: string;
  readonly description: string;
  readonly useCase: string;
  readonly aiOptimized: boolean;
  readonly code: Record<string, string>;
}

/**
 * Component Sizing - Size-specific dimensions
 */
export interface ComponentSizing {
  readonly height?: string;
  readonly width?: string;
  readonly padding?: string;
  readonly margin?: string;
}

/**
 * Component Variant - Visual variant styling
 */
export interface ComponentVariant {
  readonly background?: string;
  readonly color?: string;
  readonly border?: string;
  readonly borderRadius?: string;
  readonly shadow?: string;
}

/**
 * Component States - Interactive state styling
 */
export interface ComponentStates {
  readonly default: ComponentState;
  readonly hover: ComponentState;
  readonly active: ComponentState;
  readonly focus: ComponentState;
  readonly disabled: ComponentState;
}

/**
 * Component State - Single state styling
 */
export interface ComponentState {
  readonly background?: string;
  readonly color?: string;
  readonly border?: string;
  readonly shadow?: string;
  readonly transform?: string;
  readonly opacity?: number;
}

/**
 * Prop Validation - Prop value validation rules
 */
export interface PropValidation {
  readonly min?: number;
  readonly max?: number;
  readonly pattern?: string;
}

// =============================================================================
// LAYOUT AND COMPOSITION TYPES
// =============================================================================

/**
 * Layout Pattern - Smart layout definition
 */
export interface LayoutPattern {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly aiTags: readonly string[];
  readonly components: readonly string[];
  readonly structure: LayoutStructure;
  readonly responsive: ResponsiveConfig;
  readonly professionalScore: number;
  readonly accessibilityScore: number;
}

/**
 * Layout Structure - Hierarchical layout definition
 */
export interface LayoutStructure {
  readonly type: string;
  readonly props?: Record<string, any>;
  readonly children?: readonly LayoutStructure[];
  readonly content?: string;
}

/**
 * Composition Patterns - Smart composition rules
 */
export interface CompositionPatterns {
  readonly autoLayouts: readonly AutoLayout[];
  readonly smartDefaults: Record<string, any>;
}

/**
 * Auto Layout - Automatic layout generation rule
 */
export interface AutoLayout {
  readonly name: string;
  readonly trigger: string;
  readonly pattern: Record<string, any>;
}

/**
 * Responsive Config - Responsive behavior specification
 */
export interface ResponsiveConfig {
  readonly mobile?: ResponsiveBehavior;
  readonly tablet?: ResponsiveBehavior;
  readonly desktop?: ResponsiveBehavior;
  readonly [breakpoint: string]: ResponsiveBehavior | undefined;
}

/**
 * Responsive Behavior - Breakpoint-specific behavior
 */
export interface ResponsiveBehavior {
  readonly [property: string]: any;
}

// =============================================================================
// PLATFORM ADAPTER TYPES
// =============================================================================

/**
 * Platform Adapter Config - Platform-specific settings
 */
export interface PlatformAdapterConfig {
  readonly web?: WebAdapterConfig;
  readonly react?: ReactAdapterConfig;
  readonly vue?: VueAdapterConfig;
  readonly angular?: AngularAdapterConfig;
  readonly flutter?: FlutterAdapterConfig;
  readonly ios?: IOSAdapterConfig;
  readonly android?: AndroidAdapterConfig;
}

/**
 * Platform Adapter - Platform transformation interface
 */
export interface PlatformAdapter {
  transform(
    universalSystem: UniversalTokenSchema, 
    options: TransformationOptions
  ): Promise<TransformationResult>;
  
  generateComponentCode(
    spec: ComponentSpecification, 
    props: Record<string, any>
  ): Promise<string>;
  
  getAIRecommendations(): AIRecommendations;
}

/**
 * Transformation Options - Platform transformation settings
 */
export interface TransformationOptions {
  readonly target?: 'development' | 'production';
  readonly features?: readonly string[];
  readonly optimization?: boolean;
  readonly accessibility?: AccessibilityLevel;
}

/**
 * Transformation Result - Platform transformation output
 */
export interface TransformationResult {
  readonly platform: string;
  readonly tokens: Record<string, any>;
  readonly components: Record<string, string>;
  readonly theme: string;
  readonly utils: Record<string, string>;
  readonly examples: Record<string, string>;
}

/**
 * AI Recommendations - Platform-specific AI guidance
 */
export interface AIRecommendations {
  readonly preferredComponents: readonly string[];
  readonly layoutPatterns: readonly string[];
  readonly styling: string;
  readonly accessibility: string;
  readonly patterns?: Record<string, AIPattern>;
}

/**
 * AI Pattern - AI-optimized code pattern
 */
export interface AIPattern {
  readonly template: string;
  readonly components: readonly string[];
}

/**
 * Web Adapter Config - Web platform settings
 */
export interface WebAdapterConfig {
  readonly cssCustomProperties?: boolean;
  readonly sassVariables?: boolean;
  readonly tailwindConfig?: boolean;
}

/**
 * React Adapter Config - React platform settings
 */
export interface ReactAdapterConfig {
  readonly styledComponents?: boolean;
  readonly emotion?: boolean;
  readonly cssModules?: boolean;
}

/**
 * Vue Adapter Config - Vue platform settings
 */
export interface VueAdapterConfig {
  readonly scoped?: boolean;
  readonly cssVariables?: boolean;
}

/**
 * Angular Adapter Config - Angular platform settings
 */
export interface AngularAdapterConfig {
  readonly materialTheme?: boolean;
  readonly scssVariables?: boolean;
}

/**
 * Flutter Adapter Config - Flutter platform settings
 */
export interface FlutterAdapterConfig {
  readonly materialTheme?: boolean;
  readonly cupertinoTheme?: boolean;
}

/**
 * iOS Adapter Config - iOS platform settings
 */
export interface IOSAdapterConfig {
  readonly uiKitTheme?: boolean;
  readonly swiftUITheme?: boolean;
}

/**
 * Android Adapter Config - Android platform settings
 */
export interface AndroidAdapterConfig {
  readonly materialTheme?: boolean;
  readonly xmlResources?: boolean;
}

// =============================================================================
// ACCESSIBILITY TYPES
// =============================================================================

/**
 * Accessibility Config - Accessibility requirements
 */
export interface AccessibilityConfig {
  readonly level: AccessibilityLevel;
  readonly highContrast?: boolean;
  readonly reducedMotion?: boolean;
  readonly forceFocus?: boolean;
  readonly screenReader?: boolean;
}

// =============================================================================
// COMPLIANCE TYPES
// =============================================================================

/**
 * Compliance Config - Regulatory compliance settings
 */
export interface ComplianceConfig {
  readonly standards: readonly ComplianceStandard[];
  readonly dataClassification: DataClassification;
}

// =============================================================================
// ENUMERATION TYPES
// =============================================================================

/**
 * Theme Category - Theme categorization
 */
export type ThemeCategory = 
  | 'base' 
  | 'enterprise' 
  | 'ecommerce' 
  | 'productivity' 
  | 'education' 
  | 'healthcare' 
  | 'fintech' 
  | 'saas' 
  | 'marketing' 
  | 'dashboard';

/**
 * Theme Mode - Color scheme mode
 */
export type ThemeMode = 
  | 'light' 
  | 'dark' 
  | 'auto' 
  | 'high-contrast';

/**
 * Design Intent - Overall design approach
 */
export type DesignIntent = 
  | 'professional' 
  | 'playful' 
  | 'minimal' 
  | 'bold' 
  | 'elegant' 
  | 'modern' 
  | 'classic' 
  | 'corporate';

/**
 * Platform - Target platform
 */
export type Platform = 
  | 'web' 
  | 'mobile' 
  | 'desktop' 
  | 'tablet' 
  | 'watch' 
  | 'tv';

/**
 * Use Case - Primary application use case
 */
export type UseCase = 
  | 'dashboard' 
  | 'landing-page' 
  | 'form' 
  | 'e-commerce' 
  | 'blog' 
  | 'portfolio' 
  | 'admin' 
  | 'mobile-app';

/**
 * Industry Vertical - Business domain
 */
export type IndustryVertical = 
  | 'technology' 
  | 'healthcare' 
  | 'finance' 
  | 'education' 
  | 'retail' 
  | 'government' 
  | 'nonprofit' 
  | 'entertainment';

/**
 * Component Category - Component classification
 */
export type ComponentCategory = 
  | 'layout' 
  | 'form' 
  | 'navigation' 
  | 'feedback' 
  | 'data-display' 
  | 'overlay' 
  | 'media';

/**
 * Prop Type - Component prop data type
 */
export type PropType = 
  | 'string' 
  | 'number' 
  | 'boolean' 
  | 'array' 
  | 'object' 
  | 'function' 
  | 'node' 
  | 'element';

/**
 * Accessibility Level - WCAG compliance level
 */
export type AccessibilityLevel = 
  | 'WCAG_2_1_A' 
  | 'WCAG_2_1_AA' 
  | 'WCAG_2_1_AAA' 
  | 'WCAG_2_2_A' 
  | 'WCAG_2_2_AA' 
  | 'WCAG_2_2_AAA';

/**
 * Compliance Standard - Regulatory compliance standard
 */
export type ComplianceStandard = 
  | 'GDPR' 
  | 'NSM' 
  | 'HIPAA' 
  | 'SOX' 
  | 'PCI-DSS';

/**
 * Data Classification - Data sensitivity level
 */
export type DataClassification = 
  | 'PUBLIC' 
  | 'INTERNAL' 
  | 'CONFIDENTIAL' 
  | 'RESTRICTED' 
  | 'SECRET';

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Token Path - Type-safe token path
 */
export type TokenPath = string;

/**
 * Token Value - Token value type
 */
export type TokenValue = string | number | readonly string[] | Record<string, any>;

/**
 * Component Props - Universal component props
 */
export type ComponentProps<T = Record<string, any>> = T & {
  readonly className?: string;
  readonly style?: Record<string, any>;
  readonly children?: any;
};

/**
 * Layout Options - Layout generation options
 */
export interface LayoutOptions {
  readonly responsive?: boolean;
  readonly accessibility?: AccessibilityLevel;
  readonly customizations?: Record<string, any>;
  readonly targetPlatform?: string;
}

/**
 * Generated Layout - Smart composition output
 */
export interface GeneratedLayout {
  readonly pattern: string;
  readonly structure: LayoutStructure;
  readonly components: readonly string[];
  readonly responsive: ResponsiveConfig;
  readonly accessibility: readonly string[];
  readonly aiOptimized: boolean;
}

// =============================================================================
// EXPORT ALL TYPES
// =============================================================================

// These type files will be created separately
// export * from './layout-types';
// export * from './component-types';
// export * from './token-types';

// Type guards for runtime type checking
export const isUniversalTokenSchema = (obj: any): obj is UniversalTokenSchema => {
  return obj && typeof obj.id === 'string' && obj.tokens && obj.components;
};

export const isComponentSpecification = (obj: any): obj is ComponentSpecification => {
  return obj && typeof obj.name === 'string' && obj.category && obj.props;
};

export const isLayoutPattern = (obj: any): obj is LayoutPattern => {
  return obj && typeof obj.id === 'string' && obj.structure;
};