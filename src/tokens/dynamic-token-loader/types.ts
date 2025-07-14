/**
 * Dynamic Token Loader Types
 * Interface definitions for token configuration and loading
 */

import type { TokenValue } from '../semantic-token-system';

/**
 * Tenant-specific token configuration
 */
export interface TenantTokenConfig { /** Tenant unique identifier */
  tenantId: string;
  
  /** Tenant display name */
  name: string;
  
  /** Primary brand colors */
  primaryColors: { brand: string;
    brandHover: string;
    brandActive: string; };
  
  /** Secondary brand colors */
  secondaryColors: { background: string;
    surface: string;
    text: string; };
  
  /** Company information */
  company: { name: string;
    logo: string;
    logoAlt: string;
    website?: string; };
  
  /** Typography overrides */
  typography: { fontFamily: string;
    headingFont?: string;
    bodyFont?: string;
    monoFont?: string; };
  
  /** Custom token overrides */
  customTokens?: Record<string, TokenValue>; }

/**
 * White label configuration for complete branding
 */
export interface WhiteLabelConfig { /** White label identifier */
  brandId: string;
  
  /** Complete color palette override */
  colors: { primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    info: string; };
  
  /** Typography system override */
  typography: { fontFamily: string;
    weights: Record<string, number>;
    sizes: Record<string, string>; };
  
  /** Spacing system override */
  spacing: Record<string, string>;
  
  /** Brand assets */
  assets: { logo: string;
    logoAlt: string;
    favicon: string;
    brandImages: Record<string, string>; };
  
  /** Theme customization */
  theme: { mode: 'light' | 'dark' | 'auto';
    borderRadius: string;
    shadows: Record<string, string>; }; }

/**
 * Token override configuration for specific customizations
 */
export interface TokenOverrideConfig { /** Override scope */
  scope: 'global' | 'tenant' | 'user' | 'session';
  
  /** Token path to value mapping */
  overrides: Record<string, TokenValue>;
  
  /** Priority level for conflict resolution */
  priority: number;
  
  /** Expiration timestamp */
  expiresAt?: number; }

/**
 * Branding configuration for visual identity
 */
export interface BrandingConfig { /** Brand identifier */
  brandId: string;
  
  /** Brand colors */
  colors: { primary: string;
    secondary: string;
    accent: string; };
  
  /** Typography */
  typography: { fontFamily: string;
    fontSize: Record<string, string>;
    fontWeight: Record<string, number>; };
  
  /** Brand assets */
  assets: { logo: string;
    logoAlt: string;
    watermark?: string; };
  
  /** Theme preferences */
  theme: { mode: 'light' | 'dark' | 'auto';
    customProperties: Record<string, string>; }; }

/**
 * Main dynamic token loader configuration
 */
export interface DynamicTokenLoaderConfig { /** Default tenant configuration */
  defaultTenant?: TenantTokenConfig;
  
  /** White label configuration */
  whiteLabel?: WhiteLabelConfig;
  
  /** Token overrides */
  overrides?: TokenOverrideConfig[];
  
  /** Branding configuration */
  branding?: BrandingConfig;
  
  /** Cache configuration */
  cache?: { enabled: boolean;
    ttl: number;
    maxSize: number; };
  
  /** Remote configuration */
  remote?: { enabled: boolean;
    endpoint: string;
    headers: Record<string, string>;
    refreshInterval: number; };
  
  /** Development mode settings */
  development?: { hotReload: boolean;
    verbose: boolean; }; }

/**
 * Token loading result
 */
export interface TokenLoadResult { success: boolean;
  error?: string;
  loadedTokens: number;
  skippedTokens: number;
  tenantId?: string; }

/**
 * Token cache entry
 */
export interface TokenCacheEntry { tokens: Record<string, TokenValue>;
  timestamp: number;
  tenantId: string;
  version: string; } 