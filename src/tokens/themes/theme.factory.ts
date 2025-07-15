/**
 * @fileoverview Theme Factory - JSON to TypeScript Theme Conversion
 * @description Factory for creating themes from JSON definitions with database compatibility
 * @version 3.2.0
 * @compliance JSON-compatible, Prisma-ready, Type-safe
 */

import { Logger } from '../../lib/utils/multiplatform-logger';
import type {
    AccessibilityLevel,
    CreateThemeInput,
    ThemeCategory,
    ThemeColors,
    ThemeModel,
    UpdateThemeInput,
} from './theme.model';
import {
    ThemeMode,
    createDefaultAccessibility,
    themeToJson,
    validateThemeModel
} from './theme.model';

const logger = Logger.create({
  serviceName: 'ui-system-theme-factory',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

// =============================================================================
// THEME FACTORY CLASS
// =============================================================================

/**
 * Theme factory for creating and managing themes
 */
export class ThemeFactory {
  private static instance: ThemeFactory;
  private themeCache: Map<string, ThemeModel> = new Map();

  private constructor() {
    // Singleton pattern
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): ThemeFactory {
    if (!ThemeFactory.instance) {
      ThemeFactory.instance = new ThemeFactory();
    }
    return ThemeFactory.instance;
  }

  /**
   * Create theme from JSON definition
   */
  public async createFromJson(jsonDefinition: string): Promise<ThemeModel> {
    try {
      const parsed = JSON.parse(jsonDefinition);
      
      // Convert enum strings to proper enum values
      const theme: ThemeModel = {
        ...parsed,
        category: parsed.category as ThemeCategory,
        mode: parsed.mode as ThemeMode,
        createdAt: new Date(parsed.createdAt || Date.now()),
        updatedAt: new Date(parsed.updatedAt || Date.now()),
      };

      // Validate the theme
      if (!validateThemeModel(theme)) {
        throw new Error('Invalid theme definition');
      }

      // Cache the theme
      this.themeCache.set(theme.id, theme);

      logger.info('Theme created from JSON', { themeId: theme.id, name: theme.name });
      return theme;
    } catch (error) {
      logger.error('Failed to create theme from JSON', { error });
      throw new Error(`Theme creation failed: ${error}`);
    }
  }

  /**
   * Create theme from JSON object (synchronous version for imports)
   */
  public fromJSON(jsonObject: unknown): ThemeModel {
    try {
      const parsed = jsonObject as Record<string, unknown>;
      
      // Convert enum strings to proper enum values and add missing required fields
      const theme: ThemeModel = {
        ...parsed,
        displayName: parsed.name as string, // Use name as displayName if not provided
        category: parsed.category as ThemeCategory,
        mode: parsed.mode as ThemeMode,
        isDefault: (parsed.isDefault as boolean) ?? false,
        isActive: (parsed.isActive as boolean) ?? true,
        isPublic: (parsed.isPublic as boolean) ?? true,
        tags: (parsed.tags as string[]) ?? [],
        createdAt: new Date(parsed.createdAt as string || Date.now()),
        updatedAt: new Date(parsed.updatedAt as string || Date.now()),
      } as ThemeModel;

      // Cache the theme
      this.themeCache.set(theme.id, theme);

      logger.info('Theme created from JSON object', { themeId: theme.id, name: theme.name });
      return theme;
    } catch (error) {
      logger.error('Failed to create theme from JSON object', { error });
      throw new Error(`Theme creation failed: ${error}`);
    }
  }

  /**
   * Create theme from file path
   */
  public async createFromFile(filePath: string): Promise<ThemeModel> {
    try {
      // In a real implementation, you would use fs.readFile
      // For now, we'll simulate loading the file
      const jsonContent = await this.loadJsonFile(filePath);
      return this.createFromJson(jsonContent);
    } catch (error) {
      logger.error('Failed to create theme from file', { filePath, error });
      throw new Error(`Theme file loading failed: ${error}`);
    }
  }

  /**
   * Create theme from input data
   */
  public createFromInput(input: CreateThemeInput): ThemeModel {
    try {
      const now = new Date();
      const theme: ThemeModel = {
        id: this.generateThemeId(input.name, input.mode),
        version: '1.0.0',
        isDefault: false,
        isActive: true,
        isPublic: input.isPublic ?? false,
        tags: input.tags ?? [],
        createdAt: now,
        updatedAt: now,
        ...input,
      };

      // Validate the theme
      if (!validateThemeModel(theme)) {
        throw new Error('Invalid theme input data');
      }

      // Cache the theme
      this.themeCache.set(theme.id, theme);

      logger.info('Theme created from input', { themeId: theme.id, name: theme.name });
      return theme;
    } catch (error) {
      logger.error('Failed to create theme from input', { error });
      throw new Error(`Theme creation failed: ${error}`);
    }
  }

  /**
   * Update existing theme
   */
  public updateTheme(themeId: string, updates: UpdateThemeInput): ThemeModel {
    try {
      const existingTheme = this.themeCache.get(themeId);
      if (!existingTheme) {
        throw new Error(`Theme ${themeId} not found in cache`);
      }

      const updatedTheme: ThemeModel = {
        ...existingTheme,
        ...updates,
        updatedAt: new Date(),
        // Deep merge configuration objects
        colors: updates.colors ? { ...existingTheme.colors, ...updates.colors } : existingTheme.colors,
        typography: updates.typography ? { ...existingTheme.typography, ...updates.typography } : existingTheme.typography,
        spacing: updates.spacing ? { ...existingTheme.spacing, ...updates.spacing } : existingTheme.spacing,
        accessibility: updates.accessibility ? { ...existingTheme.accessibility, ...updates.accessibility } : existingTheme.accessibility,
        branding: updates.branding ? { ...existingTheme.branding, ...updates.branding } : existingTheme.branding,
        compliance: updates.compliance ? { ...existingTheme.compliance, ...updates.compliance } : existingTheme.compliance,
        performance: updates.performance ? { ...existingTheme.performance, ...updates.performance } : existingTheme.performance,
        responsive: updates.responsive ? { ...existingTheme.responsive, ...updates.responsive } : existingTheme.responsive,
      };

      // Validate the updated theme
      if (!validateThemeModel(updatedTheme)) {
        throw new Error('Invalid theme update data');
      }

      // Update cache
      this.themeCache.set(themeId, updatedTheme);

      logger.info('Theme updated', { themeId, updates: Object.keys(updates) });
      return updatedTheme;
    } catch (error) {
      logger.error('Failed to update theme', { themeId, error });
      throw new Error(`Theme update failed: ${error}`);
    }
  }

  /**
   * Toggle accessibility for theme
   */
  public toggleAccessibility(themeId: string, level: AccessibilityLevel): ThemeModel {
    return this.updateTheme(themeId, {
      accessibility: createDefaultAccessibility(level),
    });
  }

  /**
   * Create dark variant of existing theme
   */
  public createDarkVariant(lightThemeId: string): ThemeModel {
    try {
      const lightTheme = this.themeCache.get(lightThemeId);
      if (!lightTheme) {
        throw new Error(`Light theme ${lightThemeId} not found`);
      }

      if (lightTheme.mode !== ThemeMode.LIGHT) {
        throw new Error('Can only create dark variant from light theme');
      }

      const darkColors = this.generateDarkColors(lightTheme.colors);
      const darkTheme: ThemeModel = {
        ...lightTheme,
        id: lightThemeId.replace('-light', '-dark'),
        displayName: lightTheme.displayName.replace('Light', 'Dark'),
        mode: ThemeMode.DARK,
        description: lightTheme.description.replace('light', 'dark') + ' with enhanced readability for extended use',
        colors: darkColors,
        updatedAt: new Date(),
      };

      // Cache the dark theme
      this.themeCache.set(darkTheme.id, darkTheme);

      logger.info('Dark variant created', { 
        lightThemeId, 
        darkThemeId: darkTheme.id 
      });
      return darkTheme;
    } catch (error) {
      logger.error('Failed to create dark variant', { lightThemeId, error });
      throw new Error(`Dark variant creation failed: ${error}`);
    }
  }

  /**
   * Export theme to JSON
   */
  public exportToJson(themeId: string): string {
    try {
      const theme = this.themeCache.get(themeId);
      if (!theme) {
        throw new Error(`Theme ${themeId} not found`);
      }

      return themeToJson(theme);
    } catch (error) {
      logger.error('Failed to export theme to JSON', { themeId, error });
      throw new Error(`Theme export failed: ${error}`);
    }
  }

  /**
   * Get theme from cache
   */
  public getTheme(themeId: string): ThemeModel | undefined {
    return this.themeCache.get(themeId);
  }

  /**
   * Get all cached themes
   */
  public getAllThemes(): ThemeModel[] {
    return Array.from(this.themeCache.values());
  }

  /**
   * Clear theme cache
   */
  public clearCache(): void {
    this.themeCache.clear();
    logger.info('Theme cache cleared');
  }

  // =============================================================================
  // PRIVATE UTILITY METHODS
  // =============================================================================

  /**
   * Generate unique theme ID
   */
  private generateThemeId(name: string, mode: ThemeMode): string {
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const modeString = mode.toLowerCase();
    return `${cleanName}-${modeString}`;
  }

  /**
   * Load JSON file (simulated for now)
   */
  private async loadJsonFile(filePath: string): Promise<string> {
    // In a real implementation, this would use fs.readFile
    // For now, we'll return a placeholder
    logger.debug('Loading JSON file', { filePath });
    
    // This would typically be:
    // return fs.readFile(filePath, 'utf-8');
    throw new Error('File loading not implemented in browser environment');
  }

  /**
   * Generate dark mode colors from light mode colors
   */
  private generateDarkColors(lightColors: ThemeColors): ThemeColors {
    return {
      ...lightColors,
      // Invert background/surface colors
      background: '#0a0a0a',
      surface: '#171717',
      text: '#fafafa',
      textSecondary: '#a3a3a3',
      border: '#404040',
      
      // Adjust primary colors for dark mode (make them lighter)
      primary: this.lightenColor(lightColors.primary, 0.3),
      secondary: this.lightenColor(lightColors.secondary, 0.2),
      
      // Adjust state colors for better contrast
      hover: this.lightenColor(lightColors.hover, 0.2),
      active: this.lightenColor(lightColors.active, 0.1),
      disabled: '#525252',
    };
  }

  /**
   * Lighten a hex color by a percentage
   */
  private lightenColor(hex: string, percent: number): string {
    // Remove # if present
    const cleanHex = hex.replace('#', '');
    
    // Parse RGB values
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    
    // Lighten each component
    const newR = Math.min(255, Math.round(r + (255 - r) * percent));
    const newG = Math.min(255, Math.round(g + (255 - g) * percent));
    const newB = Math.min(255, Math.round(b + (255 - b) * percent));
    
    // Convert back to hex
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }
}

// =============================================================================
// CONVENIENCE EXPORTS
// =============================================================================

/**
 * Default theme factory instance
 */
export const themeFactory = ThemeFactory.getInstance();

/**
 * Quick theme creation helpers
 */
export const createThemeFromJson = (json: string): Promise<ThemeModel> => 
  themeFactory.createFromJson(json);

export const createThemeFromFile = (filePath: string): Promise<ThemeModel> => 
  themeFactory.createFromFile(filePath);

export const createThemeFromInput = (input: CreateThemeInput): ThemeModel => 
  themeFactory.createFromInput(input);

export const toggleThemeAccessibility = (themeId: string, level: AccessibilityLevel): ThemeModel => 
  themeFactory.toggleAccessibility(themeId, level);

export const createDarkThemeVariant = (lightThemeId: string): ThemeModel => 
  themeFactory.createDarkVariant(lightThemeId); 