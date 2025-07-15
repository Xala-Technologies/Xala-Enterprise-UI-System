/**
 * @fileoverview SSR-Safe Template Loader - Production Strategy Implementation
 * @description Framework-agnostic JSON template loader with 3-tier fallback system
 * @version 4.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import { Logger } from '../lib/utils/multiplatform-logger';
import type { ThemeTemplate } from '../tokens/themes/template-loader';

// Import base templates for emergency fallback
import baseDarkTemplate from '../tokens/themes/definitions/base-dark.json';
import baseLightTemplate from '../tokens/themes/definitions/base-light.json';

const logger = Logger.create({
  serviceName: 'ui-system-template-loader',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

export interface TemplateValidationContext {
  templateId: string;
  source: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export function validateTemplateStructure(template: Record<string, unknown>, context: TemplateValidationContext): boolean {
  // Basic structure checks
  if (typeof template !== 'object' || template === null) {
    logger.warn('Invalid template structure: not an object', { templateId: context.templateId, source: context.source });
    return false;
  }

  // Check for required fields
  if (typeof template.id !== 'string' || typeof template.name !== 'string' || typeof template.version !== 'string') {
    logger.warn('Invalid template structure: missing required fields (id, name, version)', { templateId: context.templateId, source: context.source });
    return false;
  }

  // Check for optional fields
  if (typeof template.description !== 'string' && typeof template.description !== 'undefined') {
    logger.warn('Invalid template structure: description must be a string or undefined', { templateId: context.templateId, source: context.source });
    return false;
  }

  if (typeof template.isFallback !== 'boolean' && typeof template.isFallback !== 'undefined') {
    logger.warn('Invalid template structure: isFallback must be a boolean or undefined', { templateId: context.templateId, source: context.source });
    return false;
  }

  // Check for nested structure (e.g., tokens, colors, typography)
  if (typeof template.tokens !== 'object' || template.tokens === null) {
    logger.warn('Invalid template structure: tokens object missing or not an object', { templateId: context.templateId, source: context.source });
    return false;
  }

  if (typeof template.colors !== 'object' || template.colors === null) {
    logger.warn('Invalid template structure: colors object missing or not an object', { templateId: context.templateId, source: context.source });
    return false;
  }

  if (typeof template.typography !== 'object' || template.typography === null) {
    logger.warn('Invalid template structure: typography object missing or not an object', { templateId: context.templateId, source: context.source });
    return false;
  }

  // Recursive validation for nested objects
  const validateNested = (obj: Record<string, unknown>, prefix: string = ''): boolean => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          if (!validateNested(obj[key] as Record<string, unknown>, newKey)) {
            return false;
          }
        } else if (typeof obj[key] !== 'string' && typeof obj[key] !== 'number' && typeof obj[key] !== 'boolean' && typeof obj[key] !== 'undefined') {
          logger.warn(`Invalid template structure: unexpected type for ${newKey}`, { templateId: context.templateId, source: context.source });
          return false;
        }
      }
    }
    return true;
  };

  return validateNested(template);
}

export class TemplateLoader {
  private static instance: TemplateLoader;
  private templateCache = new Map<string, ThemeTemplate>();
  private baseTemplates: { light: ThemeTemplate; dark: ThemeTemplate } | null = null;
  private isSSR = typeof window === 'undefined';

  static getInstance(): TemplateLoader {
    if (!TemplateLoader.instance) {
      TemplateLoader.instance = new TemplateLoader();
    }
    return TemplateLoader.instance;
  }

  /**
   * Load template with 3-tier fallback system
   * 1. Requested template (from cache/fetch)
   * 2. Base template (base-light/base-dark)
   * 3. Emergency hardcoded fallback
   */
  async loadTemplate(templateId: string, mode: 'LIGHT' | 'DARK' = 'LIGHT'): Promise<ThemeTemplate> {
    try {
      // Tier 1: Try to load requested template
      if (this.templateCache.has(templateId)) {
        logger.info('Template loaded from cache', { templateId });
        return this.templateCache.get(templateId)!;
      }

      const template = await this.fetchTemplate(templateId);
      this.templateCache.set(templateId, template);
      logger.info('Template loaded successfully', { templateId });
      return template;
      
    } catch (error) {
      logger.warn(`Failed to load template ${templateId}, falling back to base template`, { error });
      
      try {
        // Tier 2: Fallback to base template
        const baseTemplate = await this.loadBaseTemplate(mode);
        logger.info('Base template loaded as fallback', { templateId, mode });
        return baseTemplate;
        
             } catch (baseError) {
         logger.error('Failed to load base template, using emergency fallback', { baseError });
         
         // Tier 3: Emergency fallback (uses base templates, no hard-coded values)
         const emergencyTemplate = this.getEmergencyFallback(mode);
         logger.warn('Emergency fallback template used (base template with emergency metadata)', { templateId, mode });
         return emergencyTemplate;
      }
    }
  }

  /**
   * Fetch template from various sources (SSR-safe)
   */
  private async fetchTemplate(templateId: string): Promise<ThemeTemplate> {
    // SSR-safe template loading
    if (this.isSSR) {
      // During SSR, try to load from imported JSON files
      return this.loadTemplateFromImports(templateId);
    }

    // Client-side: try multiple sources
    try {
      // Try CDN/API first
      const response = await fetch(`/api/templates/${templateId}.json`);
      if (response.ok) {
        return response.json();
      }
    } catch (apiError) {
      logger.warn('API template fetch failed, trying static files', { templateId, apiError });
    }

    try {
      // Fallback to static files
      const response = await fetch(`/templates/${templateId}.json`);
      if (response.ok) {
        return response.json();
      }
    } catch (staticError) {
      logger.warn('Static template fetch failed, trying imports', { templateId, staticError });
    }

    // Final fallback to imports
    return this.loadTemplateFromImports(templateId);
  }

  /**
   * Load template from dynamic imports (SSR-safe)
   */
  private async loadTemplateFromImports(templateId: string): Promise<ThemeTemplate> {
    const templateMap: Record<string, () => Promise<unknown>> = {
      'base-light': () => import('../tokens/themes/definitions/base-light.json'),
      'base-dark': () => import('../tokens/themes/definitions/base-dark.json'),
      'drammen-light': () => import('../tokens/themes/definitions/drammen-light.json'),
      'drammen-dark': () => import('../tokens/themes/definitions/drammen-dark.json'),
      'oslo-light': () => import('../tokens/themes/definitions/oslo-light.json'),
      'oslo-dark': () => import('../tokens/themes/definitions/oslo-dark.json'),
      'bergen-light': () => import('../tokens/themes/definitions/bergen-light.json'),
      'bergen-dark': () => import('../tokens/themes/definitions/bergen-dark.json'),
      'enterprise-light': () => import('../tokens/themes/definitions/enterprise-light.json'),
      'enterprise-dark': () => import('../tokens/themes/definitions/enterprise-dark.json'),
      'ecommerce-light': () => import('../tokens/themes/definitions/ecommerce-light.json'),
      'ecommerce-dark': () => import('../tokens/themes/definitions/ecommerce-dark.json'),
      'healthcare-light': () => import('../tokens/themes/definitions/healthcare-light.json'),
      'healthcare-dark': () => import('../tokens/themes/definitions/healthcare-dark.json'),
      'finance-light': () => import('../tokens/themes/definitions/finance-light.json'),
      'finance-dark': () => import('../tokens/themes/definitions/finance-dark.json'),
      'education-light': () => import('../tokens/themes/definitions/education-light.json'),
      'education-dark': () => import('../tokens/themes/definitions/education-dark.json'),
      'productivity-light': () => import('../tokens/themes/definitions/productivity-light.json'),
      'productivity-dark': () => import('../tokens/themes/definitions/productivity-dark.json'),
    };

    const loader = templateMap[templateId];
    if (!loader) {
      throw new Error(`Template ${templateId} not found in imports`);
    }

    const module = await loader() as { default: ThemeTemplate };
    return module.default || module;
  }

  /**
   * Load base template (SSR-safe)
   */
  private async loadBaseTemplate(mode: 'LIGHT' | 'DARK'): Promise<ThemeTemplate> {
    if (!this.baseTemplates) {
      // SSR-safe base template initialization
      this.baseTemplates = {
        light: baseLightTemplate as ThemeTemplate,
        dark: baseDarkTemplate as ThemeTemplate
      };
    }

    return mode === 'LIGHT' ? this.baseTemplates.light : this.baseTemplates.dark;
  }

  /**
   * Emergency fallback for extreme failure cases (SSR-safe)
   * Uses our existing base templates instead of hard-coding values
   */
  getEmergencyFallback(mode: 'LIGHT' | 'DARK'): ThemeTemplate {
    try {
      // Use our existing base templates as emergency fallback
      const baseTemplate = mode === 'LIGHT' ? baseLightTemplate : baseDarkTemplate;
      
      // Return base template with emergency fallback metadata
      return {
        ...baseTemplate,
        id: `emergency-${mode.toLowerCase()}`,
        name: `Emergency ${mode} Theme (Base Template)`,
        description: 'Emergency fallback using base template - no hard-coded values',
        isFallback: true,
        version: '4.0.0'
      } as ThemeTemplate;
      
    } catch (error) {
      logger.error('Even base templates failed, this should never happen', { error });
      
      // Absolutely minimal fallback if even base templates fail (should never happen)
      throw new Error(`Critical failure: Base templates unavailable for mode ${mode}. System unusable.`);
    }
  }

  /**
   * Get all available templates (SSR-safe)
   */
  async getAvailableTemplates(): Promise<string[]> {
    return [
      'base-light', 'base-dark',
      'drammen-light', 'drammen-dark',
      'oslo-light', 'oslo-dark',
      'bergen-light', 'bergen-dark',
      'enterprise-light', 'enterprise-dark',
      'ecommerce-light', 'ecommerce-dark',
      'healthcare-light', 'healthcare-dark',
      'finance-light', 'finance-dark',
      'education-light', 'education-dark',
      'productivity-light', 'productivity-dark'
    ];
  }

  /**
   * Preload templates for better performance (SSR-safe)
   */
  async preloadTemplates(templateIds: string[]): Promise<void> {
    if (this.isSSR) {
      logger.info('Skipping template preload during SSR');
      return;
    }

    const loadPromises = templateIds.map(templateId => 
      this.loadTemplate(templateId).catch(error => 
        logger.warn('Failed to preload template', { templateId, error })
      )
    );

    await Promise.allSettled(loadPromises);
    logger.info('Templates preloaded', { count: templateIds.length });
  }

  /**
   * Clear template cache
   */
  clearCache(): void {
    this.templateCache.clear();
    logger.info('Template cache cleared');
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; templates: string[] } {
    return {
      size: this.templateCache.size,
      templates: Array.from(this.templateCache.keys())
    };
  }
}

// Export singleton instance
export const templateLoader = TemplateLoader.getInstance();

logger.info('SSR-safe TemplateLoader initialized'); 