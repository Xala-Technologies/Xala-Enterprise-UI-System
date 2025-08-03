/**
 * Comprehensive Types for Xala UI System MCP Server
 */

export type ComponentCategory = 
  | 'layout'
  | 'navigation'
  | 'form'
  | 'data-display'
  | 'feedback'
  | 'interactive'
  | 'specialized'
  | 'page-template';

export type LayoutType = 
  | 'admin'
  | 'web'
  | 'desktop'
  | 'mobile'
  | 'tablet'
  | 'base';

export type PageTemplate = 
  | 'dashboard'
  | 'landing'
  | 'auth'
  | 'profile'
  | 'settings'
  | 'analytics'
  | 'user-management'
  | 'content-management'
  | 'e-commerce'
  | 'blog';

export type IndustryTheme = 
  | 'enterprise'
  | 'finance'
  | 'healthcare'
  | 'education'
  | 'ecommerce'
  | 'productivity';

export type MunicipalTheme = 
  | 'oslo'
  | 'bergen'
  | 'drammen';

export type SupportedLocale = 
  | 'en'
  | 'no'
  | 'fr'
  | 'ar';

export interface ComponentConfig {
  readonly name: string;
  readonly category: ComponentCategory;
  readonly variant?: string;
  readonly size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  readonly theme?: IndustryTheme | MunicipalTheme;
  readonly locale?: SupportedLocale;
  readonly features: ComponentFeatures;
  readonly styling: StylingOptions;
  readonly accessibility: AccessibilityOptions;
  readonly responsive: ResponsiveOptions;
}

export interface ComponentFeatures {
  readonly interactive?: boolean;
  readonly animated?: boolean;
  readonly searchable?: boolean;
  readonly sortable?: boolean;
  readonly filterable?: boolean;
  readonly paginated?: boolean;
  readonly selectable?: boolean;
  readonly draggable?: boolean;
  readonly resizable?: boolean;
  readonly collapsible?: boolean;
  readonly tooltips?: boolean;
  readonly icons?: boolean;
  readonly badges?: boolean;
  readonly loading?: boolean;
  readonly error?: boolean;
  readonly validation?: boolean;
}

export interface StylingOptions {
  readonly variant: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary';
  readonly colorScheme?: 'light' | 'dark' | 'auto';
  readonly borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  readonly shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  readonly spacing?: 'compact' | 'comfortable' | 'spacious';
}

export interface AccessibilityOptions {
  readonly level: 'AA' | 'AAA';
  readonly screenReader: boolean;
  readonly keyboardNavigation: boolean;
  readonly highContrast: boolean;
  readonly reducedMotion: boolean;
  readonly focusManagement: boolean;
  readonly ariaLabels: boolean;
}

export interface ResponsiveOptions {
  readonly breakpoints: Array<'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultra'>;
  readonly mobileFirst: boolean;
  readonly adaptiveLayout: boolean;
  readonly touchOptimized: boolean;
  readonly fluidTypography: boolean;
}

export interface LayoutConfig extends ComponentConfig {
  readonly layoutType: LayoutType;
  readonly sections: LayoutSection[];
  readonly navigation?: NavigationConfig;
  readonly sidebar?: SidebarConfig;
  readonly header?: HeaderConfig;
  readonly footer?: FooterConfig;
}

export interface LayoutSection {
  readonly name: string;
  readonly component: string;
  readonly props?: Record<string, any>;
  readonly children?: LayoutSection[];
}

export interface NavigationConfig {
  readonly type: 'horizontal' | 'vertical' | 'drawer' | 'tabs' | 'breadcrumb';
  readonly items: NavigationItem[];
  readonly showIcons: boolean;
  readonly showBadges: boolean;
  readonly collapsible?: boolean;
}

export interface NavigationItem {
  readonly key: string;
  readonly label: string;
  readonly href: string;
  readonly icon?: string;
  readonly badge?: string | number;
  readonly children?: NavigationItem[];
  readonly active?: boolean;
  readonly disabled?: boolean;
}

export interface SidebarConfig {
  readonly width: 'sm' | 'md' | 'lg';
  readonly collapsible: boolean;
  readonly position: 'left' | 'right';
  readonly overlay?: boolean;
}

export interface HeaderConfig {
  readonly height: 'sm' | 'md' | 'lg';
  readonly sticky: boolean;
  readonly transparent?: boolean;
  readonly blur?: boolean;
}

export interface FooterConfig {
  readonly sticky: boolean;
  readonly minimal: boolean;
  readonly links?: Array<{
    readonly label: string;
    readonly href: string;
  }>;
}

export interface PageTemplateConfig extends ComponentConfig {
  readonly template: PageTemplate;
  readonly layout: LayoutConfig;
  readonly sections: PageSection[];
  readonly data?: Record<string, any>;
}

export interface PageSection {
  readonly name: string;
  readonly component: string;
  readonly title?: string;
  readonly description?: string;
  readonly props?: Record<string, any>;
  readonly data?: any[];
}

export interface FormConfig extends ComponentConfig {
  readonly fields: FormField[];
  readonly validation: ValidationConfig;
  readonly submission: SubmissionConfig;
}

export interface FormField {
  readonly name: string;
  readonly type: 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'switch' | 'slider' | 'date' | 'time';
  readonly label: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly options?: Array<{ label: string; value: string }>;
  readonly validation?: FieldValidation;
}

export interface FieldValidation {
  readonly required?: boolean;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: string;
  readonly custom?: string;
}

export interface ValidationConfig {
  readonly realTime: boolean;
  readonly showErrors: boolean;
  readonly errorPosition: 'inline' | 'tooltip' | 'summary';
}

export interface SubmissionConfig {
  readonly method: 'POST' | 'PUT' | 'PATCH';
  readonly endpoint: string;
  readonly successMessage?: string;
  readonly errorMessage?: string;
  readonly redirect?: string;
}

export interface DataTableConfig extends Omit<ComponentConfig, 'features'> {
  readonly columns: TableColumn[];
  readonly features: TableFeatures;
  readonly actions?: TableAction[];
  readonly data?: Record<string, unknown>[];
}

export interface TableColumn {
  readonly key: string;
  readonly label: string;
  readonly type: 'text' | 'number' | 'date' | 'boolean' | 'badge' | 'avatar' | 'actions';
  readonly sortable?: boolean;
  readonly filterable?: boolean;
  readonly width?: string;
  readonly align?: 'left' | 'center' | 'right';
}

export interface TableFeatures {
  readonly sorting: boolean;
  readonly filtering: boolean;
  readonly pagination: boolean;
  readonly selection: boolean;
  readonly search: boolean;
  readonly export: boolean;
}

export interface TableAction {
  readonly key: string;
  readonly label: string;
  readonly icon?: string;
  readonly variant?: 'default' | 'destructive';
  readonly handler: string;
}

export interface GeneratedComponent {
  readonly componentCode: string;
  readonly typesCode?: string;
  readonly stylesCode?: string;
  readonly localizationKeys: Record<string, any>;
  testCode?: string;
  storyCode?: string;
  documentationCode?: string;
  readonly imports: string[];
  readonly dependencies: string[];
  readonly files: GeneratedFile[];
}

export interface GeneratedFile {
  readonly path: string;
  readonly content: string;
  readonly type: 'component' | 'types' | 'styles' | 'test' | 'story' | 'docs' | 'locale';
}

export interface ComponentTemplate {
  readonly name: string;
  readonly description: string;
  readonly category: ComponentCategory;
  readonly defaultConfig: Partial<ComponentConfig>;
  readonly requiredFeatures: (keyof ComponentFeatures)[];
  readonly template: string;
  readonly examples: ComponentExample[];
}

export interface ComponentExample {
  readonly name: string;
  readonly description: string;
  readonly config: ComponentConfig;
  readonly preview?: string;
}

export interface MCPToolConfig {
  readonly name: string;
  readonly description: string;
  readonly inputSchema: any;
  readonly handler: string;
}

export interface GenerationContext {
  readonly projectPath?: string;
  readonly outputPath?: string;
  readonly overwrite?: boolean;
  readonly format?: boolean;
  readonly addTests?: boolean;
  readonly addStories?: boolean;
  readonly addDocs?: boolean;
}
