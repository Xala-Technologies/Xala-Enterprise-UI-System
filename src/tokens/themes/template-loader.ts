/**
 * @fileoverview Database-Ready Theme Template Loader
 * @description Pure JSON template system with fallback mechanisms
 * @version 3.2.0
 * @compliance Database-compatible, Framework-agnostic, Fallback-safe
 */

import { Logger } from '../../lib/utils/multiplatform-logger';

const logger = Logger.create({
  serviceName: 'ui-system-template-loader',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

// =============================================================================
// TEMPLATE LOADER INTERFACES
// =============================================================================

export interface ThemeTemplate {
  id: string;
  name: string;
  description: string;
  version: string;
  category: string;
  mode: 'LIGHT' | 'DARK';
  isDefault?: boolean;
  isActive?: boolean;
  isPublic?: boolean;
  isFallback?: boolean;
  [key: string]: unknown; // Allow additional properties for database storage
}

export interface TemplateLoaderConfig {
  /** Base template for light mode - used as fallback */
  baseLightTemplate?: ThemeTemplate | string;
  /** Base template for dark mode - used as fallback */  
  baseDarkTemplate?: ThemeTemplate | string;
  /** Default template to use when no configuration provided */
  defaultTemplate?: string; // Template ID
  /** Enable strict fallback (always use base on any error) */
  strictFallback?: boolean;
  /** Template source (database, file system, etc.) */
  templateSource?: 'database' | 'filesystem' | 'memory';
}

export interface TemplateLoadResult {
  template: ThemeTemplate;
  isFromFallback: boolean;
  fallbackReason?: string;
  loadSource: 'requested' | 'default' | 'fallback-base-light' | 'fallback-base-dark';
}

// =============================================================================
// TEMPLATE LOADER CLASS
// =============================================================================

export class ThemeTemplateLoader {
  private static instance: ThemeTemplateLoader;
  private config: TemplateLoaderConfig;
  private templateCache: Map<string, ThemeTemplate> = new Map();
  private baseLightTemplate: ThemeTemplate | null = null;
  private baseDarkTemplate: ThemeTemplate | null = null;

  private constructor(config: TemplateLoaderConfig = {}) {
    this.config = {
      strictFallback: false,
      templateSource: 'filesystem',
      defaultTemplate: 'base-light',
      ...config,
    };
    this.initializeBaseTemplates();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(config?: TemplateLoaderConfig): ThemeTemplateLoader {
    if (!ThemeTemplateLoader.instance) {
      ThemeTemplateLoader.instance = new ThemeTemplateLoader(config);
    }
    return ThemeTemplateLoader.instance;
  }

  /**
   * Initialize base templates (fallback templates)
   */
  private async initializeBaseTemplates(): Promise<void> {
    try {
      // Load base templates from JSON files
      this.baseLightTemplate = await this.loadTemplateFromFile('./definitions/base-light.json');
      this.baseDarkTemplate = await this.loadTemplateFromFile('./definitions/base-dark.json');
      
      logger.info('Base templates initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize base templates - using hardcoded fallbacks', { error });
      
      // Create minimal hardcoded fallbacks if files fail to load
      this.baseLightTemplate = this.createHardcodedFallback('LIGHT');
      this.baseDarkTemplate = this.createHardcodedFallback('DARK');
    }
  }

  /**
   * Load template by ID with automatic fallback
   */
  public async loadTemplate(templateId?: string): Promise<TemplateLoadResult> {
    try {
      // If no template ID provided, use default
      const targetId = templateId || this.config.defaultTemplate || 'base-light';
      
      logger.info('Loading template', { templateId: targetId });

      // Try to load requested template
      if (targetId !== 'base-light' && targetId !== 'base-dark') {
        try {
          const template = await this.loadTemplateFromSource(targetId);
          if (template) {
            return {
              template,
              isFromFallback: false,
              loadSource: 'requested'
            };
          }
        } catch (error) {
          logger.warn('Failed to load requested template, falling back', { 
            templateId: targetId, 
            error: error instanceof Error ? error.message : 'Unknown error' 
          });
        }
      }

      // Use base template as fallback
      const mode = this.detectModeFromId(templateId);
      const baseTemplate = mode === 'DARK' ? this.baseDarkTemplate : this.baseLightTemplate;
      
      if (!baseTemplate) {
        throw new Error('Base templates not initialized');
      }

      return {
        template: baseTemplate,
        isFromFallback: targetId !== baseTemplate.id,
        fallbackReason: targetId ? `Template ${targetId} not found` : 'No template specified',
        loadSource: mode === 'DARK' ? 'fallback-base-dark' : 'fallback-base-light'
      };

    } catch (error) {
      logger.error('Critical error in template loading', { error });
      
      // Last resort: return hardcoded fallback
      const fallbackTemplate = this.createHardcodedFallback('LIGHT');
      return {
        template: fallbackTemplate,
        isFromFallback: true,
        fallbackReason: 'Critical loading failure',
        loadSource: 'fallback-base-light'
      };
    }
  }

  /**
   * Load template from various sources (database, file, etc.)
   */
  private async loadTemplateFromSource(templateId: string): Promise<ThemeTemplate | null> {
    // Check cache first
    if (this.templateCache.has(templateId)) {
      return this.templateCache.get(templateId)!;
    }

    switch (this.config.templateSource) {
      case 'database':
        return await this.loadTemplateFromDatabase(templateId);
      case 'filesystem':
        return await this.loadTemplateFromFile(`./definitions/${templateId}.json`);
      case 'memory':
        return this.loadTemplateFromMemory(templateId);
      default:
        throw new Error(`Unknown template source: ${this.config.templateSource}`);
    }
  }

  /**
   * Load template from JSON file
   */
  private async loadTemplateFromFile(filePath: string): Promise<ThemeTemplate> {
    try {
      // In a real implementation, this would use fs.readFile or fetch
      // For now, we'll import the JSON directly (this works in build)
      const module = await import(filePath);
      const template = module.default || module;
      
      // Cache the template
      this.templateCache.set(template.id, template);
      return template;
    } catch (error) {
      logger.error('Failed to load template from file', { filePath, error });
      throw error;
    }
  }

  /**
   * Load template from database (placeholder for database integration)
   */
  private async loadTemplateFromDatabase(templateId: string): Promise<ThemeTemplate | null> {
    try {
      // This would integrate with your actual database
      // Example pseudo-code:
      // const result = await db.query('SELECT * FROM theme_templates WHERE id = ?', [templateId]);
      // return result.rows[0];
      
      logger.warn('Database template loading not implemented yet', { templateId });
      return null;
    } catch (error) {
      logger.error('Database template loading failed', { templateId, error });
      return null;
    }
  }

  /**
   * Load template from memory cache
   */
  private loadTemplateFromMemory(templateId: string): ThemeTemplate | null {
    return this.templateCache.get(templateId) || null;
  }

  /**
   * Detect mode (LIGHT/DARK) from template ID
   */
  private detectModeFromId(templateId?: string): 'LIGHT' | 'DARK' {
    if (!templateId) return 'LIGHT';
    return templateId.includes('dark') ? 'DARK' : 'LIGHT';
  }

  /**
   * Create minimal hardcoded fallback template
   */
  private createHardcodedFallback(mode: 'LIGHT' | 'DARK'): ThemeTemplate {
    const isLight = mode === 'LIGHT';
    
    return {
      id: `fallback-${mode.toLowerCase()}`,
      name: `Fallback ${mode}`,
      description: `Emergency fallback template for ${mode.toLowerCase()} mode`,
      version: '1.0.0',
      category: 'BASE',
      mode,
      isDefault: true,
      isFallback: true,
      colors: {
        background: { default: isLight ? '#ffffff' : '#0f172a' },
        text: { primary: isLight ? '#000000' : '#ffffff' },
        primary: { 500: isLight ? '#64748b' : '#94a3b8' }
      },
      typography: {
        fontFamily: { sans: ['system-ui', 'sans-serif'] },
        fontSize: { base: '1rem' }
      },
      spacing: { 4: '1rem' }
    };
  }

  /**
   * Get all cached templates
   */
  public getCachedTemplates(): Map<string, ThemeTemplate> {
    return new Map(this.templateCache);
  }

  /**
   * Clear template cache
   */
  public clearCache(): void {
    this.templateCache.clear();
    logger.info('Template cache cleared');
  }

  /**
   * Add template to cache (useful for database-loaded templates)
   */
  public cacheTemplate(template: ThemeTemplate): void {
    this.templateCache.set(template.id, template);
    logger.info('Template cached', { templateId: template.id });
  }

  /**
   * Get base templates
   */
  public getBaseTemplates(): { light: ThemeTemplate | null; dark: ThemeTemplate | null } {
    return {
      light: this.baseLightTemplate,
      dark: this.baseDarkTemplate
    };
  }
}

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

/**
 * Simple function to load a theme template (database-ready)
 */
export async function loadThemeTemplate(
  templateId?: string, 
  config?: TemplateLoaderConfig
): Promise<TemplateLoadResult> {
  const loader = ThemeTemplateLoader.getInstance(config);
  return await loader.loadTemplate(templateId);
}

/**
 * Get template for specific mode with fallback
 */
export async function getTemplateForMode(
  mode: 'LIGHT' | 'DARK',
  preferredTemplateId?: string
): Promise<TemplateLoadResult> {
  const fallbackId = mode === 'DARK' ? 'base-dark' : 'base-light';
  const templateId = preferredTemplateId || fallbackId;
  
  return await loadThemeTemplate(templateId);
}

/**
 * Database integration helper - store template in cache from database result
 */
export function registerDatabaseTemplate(dbResult: Record<string, unknown>): void {
  const loader = ThemeTemplateLoader.getInstance();
  const template = dbResult as ThemeTemplate;
  loader.cacheTemplate(template);
}

logger.info('ThemeTemplateLoader system initialized'); 