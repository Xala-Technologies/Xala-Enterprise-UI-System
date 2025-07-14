/**
 * Dynamic Token Loader Module
 * Refactored from single file into focused modules following SOLID principles
 */

// Core classes
export { TokenCacheManager } from './cache-manager';
export { DynamicTokenLoader } from './loader';
export { TenantConfigurationLoader } from './tenant-loader';

// Types
export type {
  BrandingConfig,
  DynamicTokenLoaderConfig,
  TenantTokenConfig,
  TokenCacheEntry,
  TokenLoadResult,
  TokenOverrideConfig,
  WhiteLabelConfig,
} from './types';

// Default instance
export { DynamicTokenLoader } from './loader';
export const dynamicTokenLoader = new DynamicTokenLoader();

// Convenience functions
export async function loadTenantConfiguration(tenantId: string): Promise<boolean> {
  const result = await dynamicTokenLoader.loadTenant(tenantId);
  return result.success;
}

export async function loadTenantFromJSON(config: any): Promise<boolean> {
  const result = await dynamicTokenLoader.loadTenantFromJSON(config);
  return result.success;
}

export function clearTenantConfiguration(): void {
  dynamicTokenLoader.clearTenantConfiguration();
}

export function getCurrentTenant(): string | null {
  return dynamicTokenLoader.getCurrentTenant();
}

export async function initializeDynamicTokens(config: DynamicTokenLoaderConfig): Promise<void> {
  const loader = new DynamicTokenLoader(config);
  await loader.initialize();
}
