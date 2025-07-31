/**
 * Token System Type Definitions
 * Core types for the design token system
 */

export interface ColorScale {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
  950?: string;
}

export interface ColorTokens {
  primary: ColorScale;
  secondary?: ColorScale;
  neutral?: ColorScale;
  success?: ColorScale;
  warning?: ColorScale;
  danger?: ColorScale;
  info?: ColorScale;
  white?: string;
  black?: string;
  transparent?: string;
  current?: string;
  [key: string]: ColorScale | string | undefined;
}

export interface TypographyTokens {
  fontFamily?: {
    sans?: string | string[];
    serif?: string | string[];
    mono?: string | string[];
    [key: string]: string | string[] | undefined;
  };
  fontSize?: Record<string, string>;
  fontWeight?: Record<string, number | string>;
  letterSpacing?: Record<string, string>;
  lineHeight?: Record<string, number | string>;
  [key: string]: any;
}

export interface SpacingTokens {
  [key: string]: string;
}

export interface TokenSystem {
  id?: string;
  name?: string;
  mode?: 'LIGHT' | 'DARK' | 'AUTO';
  version?: string;
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  borderRadius?: Record<string, string>;
  borderWidth?: Record<string, string>;
  boxShadow?: Record<string, string>;
  shadows?: Record<string, string>;
  opacity?: Record<string, number | string>;
  zIndex?: Record<string, number | string>;
  screens?: Record<string, string>;
  animation?: Record<string, any>;
  transition?: Record<string, any>;
  branding?: Record<string, any>;
  accessibility?: Record<string, any>;
  responsive?: Record<string, any>;
  interaction?: Record<string, any>;
  layout?: Record<string, any>;
  metadata?: {
    id: string;
    name: string;
    category?: string;
    mode: 'LIGHT' | 'DARK' | 'AUTO';
    version: string;
    created?: string;
    updated?: string;
    author?: string;
    description?: string;
  };
  [key: string]: any;
}

export interface TokenReference {
  token: string;
  fallback?: string;
}

export type TokenValue = string | number | boolean | TokenReference | Record<string, any>;