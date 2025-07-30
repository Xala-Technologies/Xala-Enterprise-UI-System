/**
 * Type definitions for theme system
 * Comprehensive type definitions for tokens, themes, and configurations
 */

/**
 * Color scale type (50-900)
 */
export type ColorScale = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

/**
 * Color palette type
 */
export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  1000: string;
}

/**
 * Semantic colors
 */
export interface SemanticColors {
  background: {
    light: string;
    dark: string;
  };
  foreground: {
    light: string;
    dark: string;
  };
  border: {
    light: string;
    dark: string;
  };
  surface: {
    light: string;
    dark: string;
  };
  surfaceAlt: {
    light: string;
    dark: string;
  };
}

/**
 * Typography definitions
 */
export interface Typography {
  families: {
    primary: string;
    secondary: string;
    mono: string;
  };
  weights: {
    light: string;
    regular: string;
    medium: string;
    bold: string;
    heavy: string;
  };
  sizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
  lineHeights: {
    tight: string;
    snug: string;
    normal: string;
    relaxed: string;
    loose: string;
  };
}

/**
 * Spacing system based on 8pt grid
 */
export interface Spacing {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
  40: string;
  48: string;
  56: string;
  64: string;
}

/**
 * Border radius system
 */
export interface BorderRadius {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
  organic: string;
}

/**
 * Shadow system
 */
export interface Shadows {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}

/**
 * Motion system
 */
export interface Motion {
  ease: {
    default: string;
    in: string;
    out: string;
    inOut: string;
    bounce: string;
    sacred: string;
  };
  duration: {
    instant: string;
    fast: string;
    normal: string;
    slow: string;
    sacred: string;
    prayer: string;
  };
}

/**
 * Breakpoint system
 */
export interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

/**
 * Z-index system
 */
export interface ZIndex {
  hide: number;
  auto: string;
  base: number;
  docked: number;
  dropdown: number;
  sticky: number;
  banner: number;
  overlay: number;
  modal: number;
  popover: number;
  skipLink: number;
  toast: number;
  tooltip: number;
}

/**
 * Component tokens
 */
export interface ComponentTokens {
  button: {
    padding: {
      sm: string;
      md: string;
      lg: string;
    };
    radius: {
      default: string;
      pill: string;
      organic: string;
    };
  };
  card: {
    padding: {
      sm: string;
      md: string;
      lg: string;
    };
    radius: string;
    borderWidth: string;
    gradients?: Record<string, string>;
  };
  input: {
    padding: {
      sm: string;
      md: string;
      lg: string;
    };
    radius: string;
    borderWidth: string;
  };
}

/**
 * Complete token system
 */
export interface TokenSystem {
  colors: {
    primary: ColorPalette;
    secondary: ColorPalette;
    success: ColorPalette;
    warning: ColorPalette;
    error: ColorPalette;
    info: ColorPalette;
    neutral: ColorPalette;
    background: SemanticColors['background'];
    foreground: SemanticColors['foreground'];
    border: SemanticColors['border'];
    surface: SemanticColors['surface'];
    surfaceAlt: SemanticColors['surfaceAlt'];
  };
  typography: Typography;
  spacing: Spacing;
  radius: BorderRadius;
  shadows: Shadows;
  motion: Motion;
  breakpoints: Breakpoints;
  zIndex: ZIndex;
  components: ComponentTokens;
}

/**
 * Theme type
 */
export type ThemeType = 'light' | 'dark' | 'system' | string;

/**
 * Theme configuration
 */
export interface ThemeConfig {
  id: string;
  name: string;
  description?: string;
  type: ThemeType;
  tokens: Partial<TokenSystem>;
  metadata?: {
    author?: string;
    version?: string;
    tags?: string[];
    category?: string;
  };
}

/**
 * White label configuration
 */
export interface WhiteLabelConfig {
  tenantId: string;
  brand: {
    name: string;
    logo?: string;
    favicon?: string;
    colors: {
      primary: string;
      secondary?: string;
      accent?: string;
    };
  };
  tokens?: Partial<TokenSystem>;
  features?: {
    [key: string]: boolean;
  };
  assets?: {
    fonts?: string[];
    images?: Record<string, string>;
  };
  routes?: {
    [key: string]: string;
  };
}

/**
 * Theme context value
 */
export interface ThemeContextValue {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  tokens: TokenSystem;
  updateTokens: (tokens: Partial<TokenSystem>) => void;
  isDark: boolean;
  systemTheme: 'light' | 'dark';
}

/**
 * Platform context value
 */
export interface PlatformContextValue {
  platform: 'mobile' | 'tablet' | 'desktop' | 'web';
  device: 'ios' | 'android' | 'windows' | 'mac' | 'linux' | 'unknown';
  isTouch: boolean;
  supportsHover: boolean;
  prefersReducedMotion: boolean;
  screen: {
    width: number;
    height: number;
    orientation: 'portrait' | 'landscape';
    pixelRatio: number;
  };
}

/**
 * Layout context value
 */
export interface LayoutContextValue {
  layout: string;
  setLayout: (layout: string) => void;
  regions: {
    header?: boolean;
    sidebar?: boolean;
    footer?: boolean;
  };
  breakpoints: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
}

/**
 * Provider props
 */
export interface UiProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeType;
  defaultTokens?: Partial<TokenSystem>;
  whiteLabelConfig?: WhiteLabelConfig;
  platformConfig?: {
    mobileBreakpoint?: number;
    tabletBreakpoint?: number;
    desktopBreakpoint?: number;
  };
  enableSSR?: boolean;
  enableHydration?: boolean;
}

/**
 * Hook return types
 */
export interface UseTokensReturn {
  tokens: TokenSystem;
  updateTokens: (tokens: Partial<TokenSystem>) => void;
  resetTokens: () => void;
}

export interface UseThemeReturn {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isDark: boolean;
  systemTheme: 'light' | 'dark';
  toggle: () => void;
}

export interface UsePlatformReturn {
  platform: PlatformContextValue['platform'];
  device: PlatformContextValue['device'];
  isTouch: boolean;
  supportsHover: boolean;
  prefersReducedMotion: boolean;
  screen: PlatformContextValue['screen'];
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export interface UseLayoutReturn {
  layout: string;
  setLayout: (layout: string) => void;
  regions: LayoutContextValue['regions'];
  breakpoints: LayoutContextValue['breakpoints'];
}
