/**
 * @fileoverview Dynamic Token Loader - Enterprise Token Management System
 * @description Dynamic loading and injection of design tokens for multi-tenant applications
 * @version 3.0.0
 * @compliance WCAG 2.2 AAA, Enterprise Standards
 */

import React from 'react';

import { globalColorPrimitives } from './global-tokens';
import type {
    TokenPath,
    TokenValue
} from './semantic-token-system';
import { tokenSystem } from './semantic-token-system';

// =============================================================================
// DYNAMIC TOKEN CONFIGURATION TYPES
// =============================================================================

/**
 * Tenant-specific token configuration
 */
export interface TenantTokenConfig {
  /** Tenant identifier */
  readonly tenantId: string;
  
  /** Tenant display name */
  readonly displayName: string;
  
  /** White labeling configuration */
  readonly whiteLabelConfig?: WhiteLabelConfig;
  
  /** Custom token overrides */
  readonly tokenOverrides?: TokenOverrideConfig;
  
  /** Branding configuration */
  readonly branding?: BrandingConfig;
}

/**
 * White labeling configuration
 */
export interface WhiteLabelConfig {
  /** Primary brand colors */
  readonly primaryColors?: {
    readonly brand: string;
    readonly brandHover: string;
    readonly brandActive: string;
  };
  
  /** Secondary brand colors */
  readonly secondaryColors?: {
    readonly background: string;
    readonly surface: string;
    readonly text: string;
  };
  
  /** Company branding */
  readonly company?: {
    readonly logo?: string;
    readonly logoAlt?: string;
    readonly name?: string;
  };
  
  /** Typography overrides */
  readonly typography?: {
    readonly fontFamily?: string;
    readonly headingFont?: string;
    readonly bodyFont?: string;
    readonly monoFont?: string;
  };
}

/**
 * Token override configuration
 */
export interface TokenOverrideConfig {
  /** Global token overrides */
  readonly global?: Record<string, TokenValue>;
  
  /** Alias token overrides */
  readonly alias?: Record<string, TokenValue>;
  
  /** Component token overrides */
  readonly component?: Record<string, TokenValue>;
  
  /** Custom token additions */
  readonly custom?: Record<string, TokenValue>;
}

/**
 * Branding configuration
 */
export interface BrandingConfig {
  /** Company information */
  readonly company?: {
    readonly name?: string;
    readonly logo?: string;
    readonly logoAlt?: string;
    readonly website?: string;
  };
  
  /** Brand colors */
  readonly colors?: {
    readonly primary?: string;
    readonly secondary?: string;
    readonly accent?: string;
  };
  
  /** Custom CSS variables */
  readonly cssVariables?: Record<string, string>;
}

/**
 * Dynamic token loader configuration
 */
export interface DynamicTokenLoaderConfig {
  /** Base token configuration URL */
  readonly configUrl?: string;
  
  /** Local configuration path */
  readonly configPath?: string;
  
  /** Cache configuration */
  readonly cache?: {
    readonly enabled: boolean;
    readonly ttl: number; // Time to live in milliseconds
  };
  
  /** Validation configuration */
  readonly validation?: {
    readonly enabled: boolean;
    readonly strict: boolean;
  };
  
  /** Fallback configuration */
  readonly fallback?: {
    readonly enabled: boolean;
    readonly config: TenantTokenConfig;
  };
}

// =============================================================================
// DYNAMIC TOKEN LOADER CLASS
// =============================================================================

/**
 * Dynamic Token Loader
 * 
 * Handles loading, caching, and injection of tenant-specific design tokens
 */
export class DynamicTokenLoader {
  private readonly config: DynamicTokenLoaderConfig;
  private readonly cache = new Map<string, { config: TenantTokenConfig; timestamp: number }>();
  private currentTenant: string | null = null;
  private isInitialized = false;

  constructor(config: DynamicTokenLoaderConfig = {}) {
    this.config = {
      cache: { enabled: true, ttl: 5 * 60 * 1000 }, // 5 minutes default
      validation: { enabled: true, strict: false },
      fallback: { enabled: true, config: this.getDefaultConfig() },
      ...config,
    };
  }

  /**
   * Initialize the dynamic token loader
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Load base configuration if provided
      if (this.config.configUrl || this.config.configPath) {
        const baseConfig = await this.loadConfigFromSource();
        if (baseConfig) {
          this.cache.set('base', { config: baseConfig, timestamp: Date.now() });
        }
      }

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize dynamic token loader:', error);
      
      if (this.config.fallback?.enabled) {
        this.cache.set('fallback', { 
          config: this.config.fallback.config, 
          timestamp: Date.now() 
        });
      }
    }
  }

  /**
   * Load tenant-specific configuration
   */
  public async loadTenantConfig(tenantId: string): Promise<TenantTokenConfig | null> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    // Check cache first
    if (this.config.cache?.enabled) {
      const cached = this.cache.get(tenantId);
      if (cached && this.isCacheValid(cached.timestamp)) {
        return cached.config;
      }
    }

    try {
      // Load from remote source
      const config = await this.loadTenantConfigFromSource(tenantId);
      
      if (config) {
        // Validate configuration
        if (this.config.validation?.enabled) {
          this.validateTenantConfig(config);
        }

        // Cache the configuration
        if (this.config.cache?.enabled) {
          this.cache.set(tenantId, { config, timestamp: Date.now() });
        }

        return config;
      }
    } catch (error) {
      console.error(`Failed to load tenant config for ${tenantId}:`, error);
    }

    // Return fallback if available
    if (this.config.fallback?.enabled) {
      return this.config.fallback.config;
    }

    return null;
  }

  /**
   * Apply tenant configuration to the token system
   */
  public async applyTenantConfig(tenantId: string): Promise<boolean> {
    const config = await this.loadTenantConfig(tenantId);
    if (!config) return false;

    try {
      // Apply token overrides
      if (config.tokenOverrides) {
        this.applyTokenOverrides(config.tokenOverrides);
      }

      // Apply white labeling
      if (config.whiteLabelConfig) {
        this.applyWhiteLabelConfig(config.whiteLabelConfig);
      }

      // Apply branding
      if (config.branding) {
        this.applyBrandingConfig(config.branding);
      }

      // Update current tenant
      this.currentTenant = tenantId;

      // Trigger token system update
      tokenSystem.notifyTokensChanged();

      return true;
    } catch (error) {
      console.error(`Failed to apply tenant config for ${tenantId}:`, error);
      return false;
    }
  }

  /**
   * Inject custom tokens at runtime
   */
  public injectCustomTokens(tokens: Record<string, TokenValue>): void {
    Object.entries(tokens).forEach(([path, value]) => {
      tokenSystem.setCustomToken(path as TokenPath, value);
    });

    tokenSystem.notifyTokensChanged();
  }

  /**
   * Get current tenant ID
   */
  public getCurrentTenant(): string | null {
    return this.currentTenant;
  }

  /**
   * Clear tenant configuration and revert to defaults
   */
  public clearTenantConfig(): void {
    this.currentTenant = null;
    tokenSystem.clearCustomTokens();
    tokenSystem.notifyTokensChanged();
  }

  /**
   * Get available tenant configurations
   */
  public getAvailableTenants(): string[] {
    return Array.from(this.cache.keys()).filter(key => key !== 'base' && key !== 'fallback');
  }

  // =============================================================================
  // PRIVATE METHODS
  // =============================================================================

  /**
   * Load configuration from source
   */
  private async loadConfigFromSource(): Promise<TenantTokenConfig | null> {
    if (this.config.configUrl) {
      const response = await fetch(this.config.configUrl);
      if (response.ok) {
        return await response.json();
      }
    }

    if (this.config.configPath) {
      // For Node.js environments
      try {
        const fs = await impor'fs';
        const configData = await fs.promises.readFile(this.config.configPath, 'utf-8');
        return JSON.parse(configData);
      } catch (error) {
        console.warn('Failed to load local config file:', error);
      }
    }

    return null;
  }

  /**
   * Load tenant-specific configuration from source
   */
  private async loadTenantConfigFromSource(tenantId: string): Promise<TenantTokenConfig | null> {
    if (this.config.configUrl) {
      const tenantUrl = `${this.config.configUrl}/tenants/${tenantId}`;
      const response = await fetch(tenantUrl);
      if (response.ok) {
        return await response.json();
      }
    }

    if (this.config.configPath) {
      try {
        const fs = await impor'fs';
        const path = await impor'path';

        const tenantPath = path.join(path.dirname(this.config.configPath), `tenant-${tenantId}.json`);
        const configData = await fs.promises.readFile(tenantPath, 'utf-8');
        return JSON.parse(configData);
      } catch (error) {
        console.warn(`Failed to load tenant config file for ${tenantId}:`, error);
      }
    }

    return null;
  }

  /**
   * Validate tenant configuration
   */
  private validateTenantConfig(config: TenantTokenConfig): void {
    if (!config.tenantId) {
      throw new Error('Tenant configuration must have a tenantId');
    }

    if (!config.displayName) {
      throw new Error('Tenant configuration must have a displayName');
    }

    // Validate color values if provided
    if (config.whiteLabelConfig?.primaryColors) {
      Object.values(config.whiteLabelConfig.primaryColors).forEach(color => {
        if (!this.isValidColor(color)) {
          throw new Error(`Invalid color value: ${color}`);
        }
      });
    }
  }

  /**
   * Apply token overrides
   */
  private applyTokenOverrides(overrides: TokenOverrideConfig): void {
    if (overrides.global) {
      Object.entries(overrides.global).forEach(([path, value]) => {
        tokenSystem.setGlobalToken(path as TokenPath, value);
      });
    }

    if (overrides.alias) {
      Object.entries(overrides.alias).forEach(([path, value]) => {
        tokenSystem.setAliasToken(path as TokenPath, value);
      });
    }

    if (overrides.component) {
      Object.entries(overrides.component).forEach(([path, value]) => {
        tokenSystem.setComponentToken(path as TokenPath, value);
      });
    }

    if (overrides.custom) {
      Object.entries(overrides.custom).forEach(([path, value]) => {
        tokenSystem.setCustomToken(path as TokenPath, value);
      });
    }
  }

  /**
   * Apply white label configuration
   */
  private applyWhiteLabelConfig(config: WhiteLabelConfig): void {
    if (config.primaryColors) {
      tokenSystem.setAliasToken('alias.color.brand.primary', config.primaryColors.brand);
      tokenSystem.setAliasToken('alias.color.brand.primaryHover', config.primaryColors.brandHover);
      tokenSystem.setAliasToken('alias.color.brand.primaryActive', config.primaryColors.brandActive);
    }

    if (config.secondaryColors) {
      tokenSystem.setAliasToken('alias.color.brand.secondaryBackground', config.secondaryColors.background);
      tokenSystem.setAliasToken('alias.color.brand.secondarySurface', config.secondaryColors.surface);
      tokenSystem.setAliasToken('alias.color.brand.secondaryText', config.secondaryColors.text);
    }

    if (config.company?.logo) {
      tokenSystem.setCustomToken('custom.company.logo', config.company.logo);
    }

    if (config.company?.logoAlt) {
      tokenSystem.setCustomToken('custom.company.logoAlt', config.company.logoAlt);
    }

    if (config.company?.name) {
      tokenSystem.setCustomToken('custom.company.name', config.company.name);
    }

    if (config.typography?.fontFamily) {
      tokenSystem.setGlobalToken('global.typography.fontFamily.primary', config.typography.fontFamily);
    }

    if (config.typography?.headingFont) {
      tokenSystem.setGlobalToken('global.typography.fontFamily.heading', config.typography.headingFont);
    }

    if (config.typography?.bodyFont) {
      tokenSystem.setGlobalToken('global.typography.fontFamily.body', config.typography.bodyFont);
    }

    if (config.typography?.monoFont) {
      tokenSystem.setGlobalToken('global.typography.fontFamily.mono', config.typography.monoFont);
    }
  }

  /**
   * Apply branding configuration
   */
  private applyBrandingConfig(config: BrandingConfig): void {
    if (config.company) {
      if (config.company.name) {
        tokenSystem.setCustomToken('custom.company.name', config.company.name);
      }
      if (config.company.logo) {
        tokenSystem.setCustomToken('custom.company.logo', config.company.logo);
      }
      if (config.company.logoAlt) {
        tokenSystem.setCustomToken('custom.company.logoAlt', config.company.logoAlt);
      }
      if (config.company.website) {
        tokenSystem.setCustomToken('custom.company.website', config.company.website);
      }
    }

    if (config.colors) {
      if (config.colors.primary) {
        tokenSystem.setAliasToken('alias.color.brand.primary', config.colors.primary);
      }
      if (config.colors.secondary) {
        tokenSystem.setAliasToken('alias.color.brand.secondary', config.colors.secondary);
      }
      if (config.colors.accent) {
        tokenSystem.setAliasToken('alias.color.brand.accent', config.colors.accent);
      }
    }

    if (config.cssVariables) {
      Object.entries(config.cssVariables).forEach(([name, value]) => {
        tokenSystem.setCustomToken(name as TokenPath, value);
      });
    }
  }

  /**
   * Check if cache is valid
   */
  private isCacheValid(timestamp: number): boolean {
    const ttl = this.config.cache?.ttl || 5 * 60 * 1000;
    return Date.now() - timestamp < ttl;
  }

  /**
   * Validate color value
   */
  private isValidColor(color: string): boolean {
    const colorRegex = /^#([0-9A-F]{3}){1,2}$/i;
    return colorRegex.test(color) || color.startsWith('rgb') || color.startsWith('hsl');
  }

  /**
   * Get default configuration
   */
  private getDefaultConfig(): TenantTokenConfig {
    return {
      tenantId: 'default',
      displayName: 'Default Configuration',
      branding: {
        company: {
          name: 'Xala Enterprise',
          logo: globalColorPrimitives.blue[600],
          logoAlt: globalColorPrimitives.blue[600],
          website: 'https://xala.com',
        },
        colors: {
          primary: globalColorPrimitives.blue[600],
          secondary: globalColorPrimitives.gray[600],
          accent: globalColorPrimitives.purple[600],
        },
        cssVariables: {
          '--primary-font': 'var(--font-primary)',
          '--secondary-font': 'var(--font-secondary)',
          '--mono-font': 'var(--font-mono)',
          '--heading-font': 'var(--font-heading)',
        },
      },
      whiteLabelConfig: {
        primaryColors: {
          brand: globalColorPrimitives.blue[600],
          brandHover: globalColorPrimitives.blue[700],
          brandActive: globalColorPrimitives.blue[800],
        },
        secondaryColors: {
          background: globalColorPrimitives.gray[100],
          surface: globalColorPrimitives.gray[200],
          text: globalColorPrimitives.gray[900],
        },
        typography: {
          fontFamily: 'var(--font-primary)',
          headingFont: 'var(--font-heading)',
          bodyFont: 'var(--font-primary)',
          monoFont: 'var(--font-mono)',
        },
      },
    };
  }
}

// =============================================================================
// SINGLETON INSTANCE
// =============================================================================

/**
 * Global dynamic token loader instance
 */
export const dynamicTokenLoader = new DynamicTokenLoader();

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

/**
 * Load and apply tenant configuration
 */
export async function loadTenantConfiguration(tenantId: string): Promise<boolean> {
  return await dynamicTokenLoader.applyTenantConfig(tenantId);
}

/**
 * Load tenant configuration from JSON
 */
export async function loadTenantFromJSON(config: TenantTokenConfig): Promise<boolean> {
  const loader = new DynamicTokenLoader();
  loader['cache'].set(config.tenantId, { config, timestamp: Date.now() });
  return await loader.applyTenantConfig(config.tenantId);
}

/**
 * Inject custom tokens at runtime
 */
export function injectCustomTokens(tokens: Record<string, TokenValue>): void {
  dynamicTokenLoader.injectCustomTokens(tokens);
}

/**
 * Clear current tenant configuration
 */
export function clearTenantConfiguration(): void {
  dynamicTokenLoader.clearTenantConfig();
}

/**
 * Get current tenant ID
 */
export function getCurrentTenant(): string | null {
  return dynamicTokenLoader.getCurrentTenant();
}

/**
 * Initialize dynamic token loader with configuration
 */
export async function initializeDynamicTokens(config: DynamicTokenLoaderConfig): Promise<void> {
  const loader = new DynamicTokenLoader(config);
  await loader.initialize();
}

// =============================================================================
// EXPORT TYPES
// =============================================================================

export type {
    BrandingConfig, DynamicTokenLoaderConfig, TenantTokenConfig, TokenOverrideConfig, WhiteLabelConfig
};
