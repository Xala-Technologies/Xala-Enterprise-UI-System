/**
 * Token Cache Manager
 * Single responsibility: Handle token caching and cache invalidation
 */

import type { TokenValue } from '../semantic-token-system';
import type { TokenCacheEntry } from './types';

/**
 * Cache configuration options
 */
export interface CacheConfig {
  /** Maximum cache size in entries */
  maxSize: number;
  
  /** Time-to-live in milliseconds */
  ttl: number;
  
  /** Enable cache persistence */
  persistent: boolean;
  
  /** Storage key prefix */
  storagePrefix: string;
}

/**
 * Token Cache Manager
 * Handles caching of token configurations with TTL and size limits
 */
export class TokenCacheManager {
  private cache = new Map<string, TokenCacheEntry>();
  private config: CacheConfig;
  private timers = new Map<string, NodeJS.Timeout>();

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      maxSize: 100,
      ttl: 5 * 60 * 1000, // 5 minutes default
      persistent: false,
      storagePrefix: 'ui-tokens-',
      ...config,
    };
  }

  /**
   * Get cached tokens for a tenant
   */
  get(tenantId: string): TokenCacheEntry | null {
    const entry = this.cache.get(tenantId);
    
    if (!entry) {
      return null;
    }
    
    // Check if entry is expired
    if (Date.now() - entry.timestamp > this.config.ttl) {
      this.delete(tenantId);
      return null;
    }
    
    return entry;
  }

  /**
   * Set cached tokens for a tenant
   */
  set(tenantId: string, tokens: Record<string, TokenValue>, version: string): void {
    // Remove oldest entry if cache is full
    if (this.cache.size >= this.config.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.delete(oldestKey);
      }
    }
    
    const entry: TokenCacheEntry = {
      tokens,
      timestamp: Date.now(),
      tenantId,
      version,
    };
    
    this.cache.set(tenantId, entry);
    
    // Set TTL timer
    const timer = setTimeout(() => {
      this.delete(tenantId);
    }, this.config.ttl);
    
    this.timers.set(tenantId, timer);
    
    // Persist to storage if enabled
    if (this.config.persistent) {
      this.persistToStorage(tenantId, entry);
    }
  }

  /**
   * Delete cached tokens for a tenant
   */
  delete(tenantId: string): boolean {
    const deleted = this.cache.delete(tenantId);
    
    // Clear timer
    const timer = this.timers.get(tenantId);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(tenantId);
    }
    
    // Remove from storage if persistent
    if (this.config.persistent && typeof localStorage !== 'undefined') {
      localStorage.removeItem(`${this.config.storagePrefix}${tenantId}`);
    }
    
    return deleted;
  }

  /**
   * Clear all cached tokens
   */
  clear(): void {
    this.cache.clear();
    
    // Clear all timers
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
    
    // Clear storage if persistent
    if (this.config.persistent && typeof localStorage !== 'undefined') {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(this.config.storagePrefix)) {
          localStorage.removeItem(key);
        }
      });
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number;
    maxSize: number;
    hitRate: number;
    entries: string[];
  } {
    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      hitRate: 0, // TODO: Implement hit rate tracking
      entries: Array.from(this.cache.keys()),
    };
  }

  /**
   * Check if tenant is cached
   */
  has(tenantId: string): boolean {
    return this.cache.has(tenantId);
  }

  /**
   * Get all cached tenant IDs
   */
  getTenantIds(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Persist entry to storage
   */
  private persistToStorage(tenantId: string, entry: TokenCacheEntry): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    
    try {
      const serialized = JSON.stringify(entry);
      localStorage.setItem(`${this.config.storagePrefix}${tenantId}`, serialized);
    } catch (error) {
      console.warn('Failed to persist token cache:', error);
    }
  }

  /**
   * Load entry from storage
   */
  private loadFromStorage(tenantId: string): TokenCacheEntry | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    
    try {
      const serialized = localStorage.getItem(`${this.config.storagePrefix}${tenantId}`);
      if (!serialized) {
        return null;
      }
      
      return JSON.parse(serialized) as TokenCacheEntry;
    } catch (error) {
      console.warn('Failed to load token cache:', error);
      return null;
    }
  }

  /**
   * Initialize cache from storage
   */
  initializeFromStorage(): void {
    if (!this.config.persistent || typeof localStorage === 'undefined') {
      return;
    }
    
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.config.storagePrefix)) {
        const tenantId = key.replace(this.config.storagePrefix, '');
        const entry = this.loadFromStorage(tenantId);
        
        if (entry && Date.now() - entry.timestamp < this.config.ttl) {
          this.cache.set(tenantId, entry);
        }
      }
    });
  }
} 