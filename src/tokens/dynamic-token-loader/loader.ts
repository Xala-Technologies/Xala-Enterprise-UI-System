/**
 * Dynamic Token Loader
 * Single responsibility: Orchestrate token loading and injection
 */

import type { TokenValue } from '../semantic-token-system';
import { TokenCacheManager } from './cache-manager';
import { TenantConfigurationLoader } from './tenant-loader';
import type { DynamicTokenLoaderConfig, TokenLoadResult } from './types';

/**
 * Dynamic Token Loader
 * Main class that orchestrates token loading from various sources
 */
export class DynamicTokenLoader { private config: DynamicTokenLoaderConfig;
  private tenantLoader: TenantConfigurationLoader;
  private cache: TokenCacheManager;
  private isInitialized = false;

  constructor(config: DynamicTokenLoaderConfig = {}) { this.config = config;
    
    this.tenantLoader = new TenantConfigurationLoader({ endpoint: config.remote?.endpoint,
      headers: config.remote?.headers,
      timeout: 5000,
      cache: config.cache, });
    
    this.cache = new TokenCacheManager({ maxSize: config.cache?.maxSize ?? 100,
      ttl: config.cache?.ttl ?? 5 * 60 * 1000,
      persistent: true,
      storagePrefix: 'ui-tokens-', }); }

  /**
   * Initialize the dynamic token loader
   */
  async initialize(): Promise<void> { if (this.isInitialized) { return; }
    
    try { // Initialize cache from storage
      this.cache.initializeFromStorage();
      
      // Load default tenant if configured
      if (this.config.defaultTenant) { await this.tenantLoader.loadFromJSON(this.config.defaultTenant); }
      
      this.isInitialized = true; } catch (error) { console.error('Failed to initialize dynamic token loader:', error);
      throw error; } }

  /**
   * Load tenant configuration
   */
  async loadTenant(tenantId: string): Promise<TokenLoadResult> { if (!this.isInitialized) { await this.initialize(); }
    
    return this.tenantLoader.loadTenant(tenantId); }

  /**
   * Load tenant from JSON configuration
   */
  async loadTenantFromJSON(config: any): Promise<TokenLoadResult> { if (!this.isInitialized) { await this.initialize(); }
    
    return this.tenantLoader.loadFromJSON(config); }

  /**
   * Get current tenant ID
   */
  getCurrentTenant(): string | null { return this.tenantLoader.getCurrentTenant(); }

  /**
   * Clear current tenant configuration
   */
  clearTenantConfiguration(): void { this.tenantLoader.clearTenant(); }

  /**
   * Inject custom tokens
   */
  injectCustomTokens(tokens: Record<string, TokenValue>): void { // Apply custom tokens to the token system
    Object.entries(tokens).forEach(([path, value]) => { this.injectToken(path, value); }); }

  /**
   * Get cached tokens for a tenant
   */
  getCachedTokens(tenantId: string): Record<string, TokenValue> | null { return this.tenantLoader.getCachedTokens(tenantId); }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number;
    maxSize: number;
    hitRate: number;
    entries: string[]; } { return this.cache.getStats(); }

  /**
   * Check if loader is initialized
   */
  isReady(): boolean { return this.isInitialized; }

  /**
   * Inject a single token into the system
   */
  private injectToken(path: string, value: TokenValue): void { // This would integrate with the semantic token system
    // For now, we'll just log the injection
    if (this.config.development?.verbose) { console.log(`Injecting token: ${path} = ${value}`); }
    
    // TODO: Integrate with semantic token system
    // tokenSystem.setToken(path, value); }

  /**
   * Validate configuration
   */
  private validateConfig(config: DynamicTokenLoaderConfig): void { if (config.remote?.enabled && !config.remote?.endpoint) { throw new Error('Remote endpoint is required when remote loading is enabled'); }
    
    if (config.cache?.maxSize && config.cache.maxSize <= 0) { throw new Error('Cache max size must be greater than 0'); }
    
    if (config.cache?.ttl && config.cache.ttl <= 0) { throw new Error('Cache TTL must be greater than 0'); } } } 