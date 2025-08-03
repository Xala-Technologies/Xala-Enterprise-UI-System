/**
 * Types for Next.js Navbar Generator MCP Server
 */

export interface NavbarConfig {
  readonly type: 'saas' | 'admin' | 'marketing' | 'adaptive';
  readonly name: string;
  readonly locale: string;
  readonly features: NavbarFeatures;
  readonly styling: StylingOptions;
  readonly navigation: NavigationConfig;
}

export interface NavbarFeatures {
  readonly logo: boolean;
  readonly search: boolean;
  readonly themeSwitcher: boolean;
  readonly userMenu: boolean;
  readonly notifications: boolean;
  readonly breadcrumbs: boolean;
  readonly mobileResponsive: boolean;
}

export interface StylingOptions {
  readonly variant: 'flat' | 'elevated' | 'outlined';
  readonly sticky: boolean;
  readonly theme: 'enterprise' | 'finance' | 'healthcare' | 'education' | 'ecommerce' | 'productivity';
}

export interface NavigationConfig {
  readonly items: NavigationItem[];
  readonly showIcons: boolean;
  readonly showBadges: boolean;
}

export interface NavigationItem {
  readonly key: string;
  readonly label: string;
  readonly href: string;
  readonly icon?: string;
  readonly badge?: string;
  readonly children?: NavigationItem[];
}

export interface GeneratedNavbar {
  readonly componentCode: string;
  readonly typesCode: string;
  readonly localizationKeys: Record<string, any>;
  readonly imports: string[];
  readonly dependencies: string[];
}

export interface NavbarTemplate {
  readonly name: string;
  readonly description: string;
  readonly type: NavbarConfig['type'];
  readonly defaultConfig: Partial<NavbarConfig>;
  readonly requiredFeatures: (keyof NavbarFeatures)[];
}
