/**
 * Tenant Configuration Loader
 * Single responsibility: Load and manage tenant-specific token configurations
 */

import type { TokenValue } from '../semantic-token-system';
import { TokenCacheManager } from './cache-manager';
import type { TenantTokenConfig, TokenLoadResult } from './types';

/**
 * Tenant loader configuration
 */
export interface TenantLoaderConfig {
  /** Remote API endpoint */
  endpoint?: string;

  /** Request headers */
  headers?: Record<string, string>;

  /** Request timeout in milliseconds */
  timeout?: number;

  /** Retry configuration */
  retry?: {
    attempts: number;
    delay: number;
    exponentialBackoff: boolean;
  };

  /** Cache configuration */
  cache?: {
    enabled: boolean;
    ttl: number;
    maxSize: number;
  };
}

/**
 * Tenant Configuration Loader
 * Handles loading tenant configurations from various sources
 */
export class TenantConfigurationLoader {
  private config: TenantLoaderConfig;
  private cache: TokenCacheManager;
  private currentTenant: string | null = null;

  constructor(config: TenantLoaderConfig = {}) {
    this.config = {
      timeout: 5000,
      retry: {
        attempts: 3,
        delay: 1000,
        exponentialBackoff: true,
      },
      cache: {
        enabled: true,
        ttl: 5 * 60 * 1000, // 5 minutes
        maxSize: 100,
      },
      ...config,
    };

    this.cache = new TokenCacheManager(this.config.cache);
  }

  /**
   * Load tenant configuration by ID
   */
  async loadTenant(tenantId: string): Promise<TokenLoadResult> {
    try {
      // Check cache first
      if (this.config.cache?.enabled) {
        const cached = this.cache.get(tenantId);
        if (cached) {
          this.currentTenant = tenantId;
          return {
            success: true,
            loadedTokens: Object.keys(cached.tokens).length,
            skippedTokens: 0,
            tenantId,
          };
        }
      }

      // Load from remote or local source
      const tenantConfig = await this.fetchTenantConfig(tenantId);

      if (!tenantConfig) {
        return {
          success: false,
          error: `Tenant ${tenantId} not found`,
          loadedTokens: 0,
          skippedTokens: 0,
        };
      }

      // Process and cache the configuration
      const tokens = this.processTokens(tenantConfig);

      if (this.config.cache?.enabled) {
        this.cache.set(tenantId, tokens, tenantConfig.tenantId);
      }

      this.currentTenant = tenantId;

      return {
        success: true,
        loadedTokens: Object.keys(tokens).length,
        skippedTokens: 0,
        tenantId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        loadedTokens: 0,
        skippedTokens: 0,
      };
    }
  }

  /**
   * Load tenant configuration from JSON
   */
  async loadFromJSON(config: TenantTokenConfig): Promise<TokenLoadResult> {
    try {
      const tokens = this.processTokens(config);

      if (this.config.cache?.enabled) {
        this.cache.set(config.tenantId, tokens, config.tenantId);
      }

      this.currentTenant = config.tenantId;

      return {
        success: true,
        loadedTokens: Object.keys(tokens).length,
        skippedTokens: 0,
        tenantId: config.tenantId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load tenant configuration',
        loadedTokens: 0,
        skippedTokens: 0,
      };
    }
  }

  /**
   * Get current tenant ID
   */
  getCurrentTenant(): string | null {
    return this.currentTenant;
  }

  /**
   * Clear current tenant configuration
   */
  clearTenant(): void {
    this.currentTenant = null;
    this.cache.clear();
  }

  /**
   * Get cached tenant tokens
   */
  getCachedTokens(tenantId: string): Record<string, TokenValue> | null {
    const cached = this.cache.get(tenantId);
    return cached?.tokens ?? null;
  }

  /**
   * Fetch tenant configuration from remote source
   */
  private async fetchTenantConfig(tenantId: string): Promise<TenantTokenConfig | null> {
    if (!this.config.endpoint) {
      // Return null if no endpoint configured
      return null;
    }

    const url = `${this.config.endpoint}/tenants/${tenantId}`;

    for (let attempt = 0; attempt < (this.config.retry?.attempts ?? 1); attempt++) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...this.config.headers,
          },
          signal: AbortSignal.timeout(this.config.timeout ?? 5000),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const config = await response.json();
        return this.validateTenantConfig(config);
      } catch (error) {
        if (attempt === (this.config.retry?.attempts ?? 1) - 1) {
          throw error;
        }

        // Wait before retry
        const delay = this.config.retry?.exponentialBackoff
          ? (this.config.retry?.delay ?? 1000) * Math.pow(2, attempt)
          : (this.config.retry?.delay ?? 1000);

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    return null;
  }

  /**
   * Process tenant configuration into tokens
   */
  private processTokens(config: TenantTokenConfig): Record<string, TokenValue> {
    const tokens: Record<string, TokenValue> = {};

    // Process primary colors
    if (config.primaryColors) {
      tokens['alias.color.brand.primary'] = config.primaryColors.brand;
      tokens['alias.color.brand.primaryHover'] = config.primaryColors.brandHover;
      tokens['alias.color.brand.primaryActive'] = config.primaryColors.brandActive;
    }

    // Process secondary colors
    if (config.secondaryColors) {
      tokens['alias.color.brand.secondaryBackground'] = config.secondaryColors.background;
      tokens['alias.color.brand.secondarySurface'] = config.secondaryColors.surface;
      tokens['alias.color.brand.secondaryText'] = config.secondaryColors.text;
    }

    // Process typography
    if (config.typography) {
      tokens['global.typography.fontFamily.primary'] = config.typography.fontFamily;
      if (config.typography.headingFont) {
        tokens['global.typography.fontFamily.heading'] = config.typography.headingFont;
      }
      if (config.typography.bodyFont) {
        tokens['global.typography.fontFamily.body'] = config.typography.bodyFont;
      }
      if (config.typography.monoFont) {
        tokens['global.typography.fontFamily.mono'] = config.typography.monoFont;
      }
    }

    // Process company information
    if (config.company) {
      tokens['custom.company.name'] = config.company.name;
      tokens['custom.company.logo'] = config.company.logo;
      tokens['custom.company.logoAlt'] = config.company.logoAlt;
      if (config.company.website) {
        tokens['custom.company.website'] = config.company.website;
      }
    }

    // Process custom tokens
    if (config.customTokens) {
      Object.entries(config.customTokens).forEach(([key, value]) => {
        tokens[key] = value;
      });
    }

    return tokens;
  }

  /**
   * Validate tenant configuration
   */
  private validateTenantConfig(config: unknown): TenantTokenConfig {
    if (!config || typeof config !== 'object') {
      throw new Error('Invalid tenant configuration: must be an object');
    }

    const typedConfig = config as Partial<TenantTokenConfig>;

    if (!typedConfig.tenantId || typeof typedConfig.tenantId !== 'string') {
      throw new Error('Invalid tenant configuration: tenantId is required');
    }

    if (!typedConfig.name || typeof typedConfig.name !== 'string') {
      throw new Error('Invalid tenant configuration: name is required');
    }

    return typedConfig as TenantTokenConfig;
  }
}
