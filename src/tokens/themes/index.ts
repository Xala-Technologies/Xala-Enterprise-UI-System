/**
 * @fileoverview Theme System Index - Comprehensive Industry & Municipal Themes
 * @description Centralized theme system for various industries and Norwegian municipalities
 * @version 3.2.0
 * @compliance NSM, DigDir, WCAG 2.2 AAA, Industry Standards
 */

import { Logger } from '../../lib/utils/multiplatform-logger';
import { ThemeFactory } from './theme.factory';
import type { ThemeModel } from './theme.model';
import { ThemeCategory, ThemeMode } from './theme.model';

const logger = Logger.create({
  serviceName: 'ui-system-themes',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

// =============================================================================
// THEME SYSTEM INTERFACES
// =============================================================================

// Re-export ThemeModel as BaseTheme for compatibility
export type BaseTheme = ThemeModel;

// Re-export types from theme.model for convenience
export type {
    AccessibilityLevel,
    ComplianceStandard, CreateThemeInput, IconStyle, ThemeAccessibility,
    ThemeBranding, ThemeCategory, ThemeColors, ThemeCompliance, ThemeMode, ThemePerformance,
    ThemeResponsive, ThemeSpacing, ThemeTypography, UpdateThemeInput
} from './theme.model';

// =============================================================================
// JSON THEME DEFINITIONS IMPORTS
// =============================================================================

// Municipal themes
import bergenDarkTheme from './definitions/bergen-dark.json' with { type: 'json' };
import bergenLightTheme from './definitions/bergen-light.json' with { type: 'json' };
import drammenDarkTheme from './definitions/drammen-dark.json' with { type: 'json' };
import drammenLightTheme from './definitions/drammen-light.json' with { type: 'json' };
import osloDarkTheme from './definitions/oslo-dark.json' with { type: 'json' };
import osloLightTheme from './definitions/oslo-light.json' with { type: 'json' };

// Enterprise themes
import enterpriseDarkTheme from './definitions/enterprise-dark.json' with { type: 'json' };
import enterpriseLightTheme from './definitions/enterprise-light.json' with { type: 'json' };

// E-commerce themes
import ecommerceDarkTheme from './definitions/ecommerce-dark.json' with { type: 'json' };
import ecommerceLightTheme from './definitions/ecommerce-light.json' with { type: 'json' };

// Healthcare themes
import healthcareDarkTheme from './definitions/healthcare-dark.json' with { type: 'json' };
import healthcareLightTheme from './definitions/healthcare-light.json' with { type: 'json' };

// Finance themes
import financeDarkTheme from './definitions/finance-dark.json' with { type: 'json' };
import financeLightTheme from './definitions/finance-light.json' with { type: 'json' };

// Education themes
import educationDarkTheme from './definitions/education-dark.json' with { type: 'json' };
import educationLightTheme from './definitions/education-light.json' with { type: 'json' };

// Productivity themes
import productivityDarkTheme from './definitions/productivity-dark.json' with { type: 'json' };
import productivityLightTheme from './definitions/productivity-light.json' with { type: 'json' };

// =============================================================================
// THEME FACTORY INSTANCES
// =============================================================================

const themeFactory = ThemeFactory.getInstance();

// =============================================================================
// PROCESSED THEMES EXPORT
// =============================================================================

// Municipal themes (Norwegian municipalities)
export const drammenLight = themeFactory.fromJSON(drammenLightTheme);
export const drammenDark = themeFactory.fromJSON(drammenDarkTheme);
export const osloLight = themeFactory.fromJSON(osloLightTheme);
export const osloDark = themeFactory.fromJSON(osloDarkTheme);
export const bergenLight = themeFactory.fromJSON(bergenLightTheme);
export const bergenDark = themeFactory.fromJSON(bergenDarkTheme);

// Enterprise themes (corporate sector)
export const enterpriseLight = themeFactory.fromJSON(enterpriseLightTheme);
export const enterpriseDark = themeFactory.fromJSON(enterpriseDarkTheme);

// E-commerce themes (retail sector)
export const ecommerceLight = themeFactory.fromJSON(ecommerceLightTheme);
export const ecommerceDark = themeFactory.fromJSON(ecommerceDarkTheme);

// Healthcare themes (medical sector)
export const healthcareLight = themeFactory.fromJSON(healthcareLightTheme);
export const healthcareDark = themeFactory.fromJSON(healthcareDarkTheme);

// Finance themes (financial sector)
export const financeLight = themeFactory.fromJSON(financeLightTheme);
export const financeDark = themeFactory.fromJSON(financeDarkTheme);

// Education themes (academic sector)
export const educationLight = themeFactory.fromJSON(educationLightTheme);
export const educationDark = themeFactory.fromJSON(educationDarkTheme);

// Productivity themes (productivity tools)
export const productivityLight = themeFactory.fromJSON(productivityLightTheme);
export const productivityDark = themeFactory.fromJSON(productivityDarkTheme);

// =============================================================================
// THEME COLLECTIONS
// =============================================================================

export const municipalThemes = {
  drammenLight,
  drammenDark,
  osloLight,
  osloDark,
  bergenLight,
  bergenDark,
} as const;

export const enterpriseThemes = {
  enterpriseLight,
  enterpriseDark,
} as const;

export const ecommerceThemes = {
  ecommerceLight,
  ecommerceDark,
} as const;

export const healthcareThemes = {
  healthcareLight,
  healthcareDark,
} as const;

export const financeThemes = {
  financeLight,
  financeDark,
} as const;

export const educationThemes = {
  educationLight,
  educationDark,
} as const;

export const productivityThemes = {
  productivityLight,
  productivityDark,
} as const;

// All themes collection
export const allThemes = {
  ...municipalThemes,
  ...enterpriseThemes,
  ...ecommerceThemes,
  ...healthcareThemes,
  ...financeThemes,
  ...educationThemes,
  ...productivityThemes,
} as const;

// =============================================================================
// THEME UTILITY FUNCTIONS
// =============================================================================

/**
 * Get all themes by category
 */
export function getThemesByCategory(category: ThemeCategory): ThemeModel[] {
  return Object.values(allThemes).filter(theme => theme.category === category);
}

/**
 * Get all themes by mode (light/dark)
 */
export function getThemesByMode(mode: ThemeMode): ThemeModel[] {
  return Object.values(allThemes).filter(theme => theme.mode === mode);
}

/**
 * Get theme by ID
 */
export function getThemeById(id: string): ThemeModel | undefined {
  return Object.values(allThemes).find(theme => theme.id === id);
}

/**
 * Get available theme categories
 */
export function getAvailableCategories(): ThemeCategory[] {
  return Object.values(ThemeCategory);
}

/**
 * Get themes compatible with current system mode
 */
export function getCompatibleThemes(prefersDark: boolean): ThemeModel[] {
  const mode = prefersDark ? ThemeMode.DARK : ThemeMode.LIGHT;
  return getThemesByMode(mode);
}

// =============================================================================
// THEME SYSTEM COMPONENTS EXPORT
// =============================================================================

// Theme system components
export * from './prisma.schema';
export * from './theme.factory';
export * from './theme.model';

// =============================================================================
// THEME REGISTRY
// =============================================================================

/**
 * Theme registry for runtime theme management
 */
export const themeRegistry = {
  register: (theme: ThemeModel): void => {
    logger.info(`Registering theme: ${theme.id}`, { category: theme.category, mode: theme.mode });
  },
  unregister: (themeId: string): void => {
    logger.info(`Unregistering theme: ${themeId}`);
  },
  getAll: () => allThemes,
  getById: getThemeById,
  getByCategory: getThemesByCategory,
  getByMode: getThemesByMode,
} as const;

logger.info('Theme system initialized', {
  totalThemes: Object.keys(allThemes).length,
  categories: getAvailableCategories(),
  municipalThemes: Object.keys(municipalThemes).length,
  enterpriseThemes: Object.keys(enterpriseThemes).length,
  ecommerceThemes: Object.keys(ecommerceThemes).length,
  healthcareThemes: Object.keys(healthcareThemes).length,
  financeThemes: Object.keys(financeThemes).length,
  educationThemes: Object.keys(educationThemes).length,
  productivityThemes: Object.keys(productivityThemes).length,
});
