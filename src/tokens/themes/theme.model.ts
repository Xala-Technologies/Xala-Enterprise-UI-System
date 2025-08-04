/**
 * @fileoverview Theme Model - Database-Compatible Theme System
 * @description Prisma-ready theme models with configurable accessibility and properties
 * @version 3.2.0
 * @compliance Database-ready, JSON-serializable, Prisma-compatible
 */

import { Logger } from '../../lib/utils/multiplatform-logger';

const logger = Logger.create({
  serviceName: 'ui-system-theme-model',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

// =============================================================================
// PRISMA-COMPATIBLE ENUMS
// =============================================================================

/**
 * Theme categories (Prisma enum compatible)
 */
 
export enum ThemeCategory {
  BASE = 'base',
  MUNICIPAL = 'municipal',
  ENTERPRISE = 'enterprise',
  ECOMMERCE = 'ecommerce',
  HEALTHCARE = 'healthcare',
  EDUCATION = 'education',
  FINANCE = 'finance',
  PRODUCTIVITY = 'productivity',
  PUBLIC_SECTOR = 'public_sector',
}

/**
 * Theme modes (Prisma enum compatible)
 */
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
}

/**
 * Accessibility levels (Prisma enum compatible)
 */
export enum AccessibilityLevel {
  OFF = 'off',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  WCAG_AA = 'wcag_aa',
  WCAG_AAA = 'wcag_aaa',
}

/**
 * Compliance standards (Prisma enum compatible)
 */
export enum ComplianceStandard {
  GDPR = 'gdpr',
  CCPA = 'ccpa',
  HIPAA = 'hipaa',
  PCI_DSS = 'pci_dss',
  SOC2 = 'soc2',
  ISO27001 = 'iso27001',
  NSM = 'nsm',
}

/**
 * Icon styles (Prisma enum compatible)
 */
export enum IconStyle {
  OUTLINED = 'outlined',
  FILLED = 'filled',
  ROUNDED = 'rounded',
  SHARP = 'sharp',
}

// =============================================================================
// THEME MODEL INTERFACES (DATABASE-COMPATIBLE)
// =============================================================================

/**
 * Color configuration (JSON-serializable)
 */
export interface ThemeColors {
  readonly primary: string;
  readonly secondary: string;
  readonly accent: string;
  readonly success: string;
  readonly warning: string;
  readonly error: string;
  readonly info: string;
  readonly background: string;
  readonly surface: string;
  readonly text: string;
  readonly textSecondary: string;
  readonly border: string;
  readonly focus: string;
  readonly hover: string;
  readonly active: string;
  readonly disabled: string;
}

/**
 * Typography configuration (JSON-serializable)
 */
export interface ThemeTypography {
  readonly fontFamily: string;
  readonly headingFont: string;
  readonly monoFont: string;
  readonly baseFontSize: string;
  readonly scaleRatio: number;
  readonly lineHeight: number;
  readonly letterSpacing: number;
}

/**
 * Spacing configuration (JSON-serializable)
 */
export interface ThemeSpacing {
  readonly baseUnit: number;
  readonly scale: number[];
  readonly containerMaxWidth: string;
  readonly gridGutter: string;
  readonly componentPadding: string;
}

/**
 * Accessibility configuration (JSON-serializable)
 */
export interface ThemeAccessibility {
  readonly level: AccessibilityLevel;
  readonly enabled: boolean;
  readonly highContrast: boolean;
  readonly reducedMotion: boolean;
  readonly screenReaderOptimized: boolean;
  readonly keyboardNavigation: boolean;
  readonly focusManagement: boolean;
  readonly minimumTouchTarget: string;
  readonly minimumFontSize: string;
  readonly contrastRatio: number;
}

/**
 * Branding configuration (JSON-serializable)
 */
export interface ThemeBranding {
  readonly logoUrl?: string;
  readonly logoAlt?: string;
  readonly faviconUrl?: string;
  readonly motto?: string;
  readonly companyName?: string;
  readonly website?: string;
  readonly iconStyle: IconStyle;
  readonly borderRadius: string;
  readonly shadowIntensity: number;
}

/**
 * Compliance configuration (JSON-serializable)
 */
export interface ThemeCompliance {
  readonly standards: ComplianceStandard[];
  readonly dataRetention: number;
  readonly encryptionRequired: boolean;
  readonly auditLogging: boolean;
  readonly privacyMode: boolean;
}

/**
 * Performance configuration (JSON-serializable)
 */
export interface ThemePerformance {
  readonly enableAnimations: boolean;
  readonly enableTransitions: boolean;
  readonly enableVirtualization: boolean;
  readonly enableLazyLoading: boolean;
  readonly bundleOptimization: boolean;
  readonly cacheStrategy: 'memory' | 'storage' | 'none';
}

/**
 * Responsive configuration (JSON-serializable)
 */
export interface ThemeResponsive {
  readonly breakpoints: Record<string, string>;
  readonly fluidTypography: boolean;
  readonly adaptiveSpacing: boolean;
  readonly mobileFirst: boolean;
  readonly touchOptimized: boolean;
}

// =============================================================================
// MAIN THEME MODEL (PRISMA-READY)
// =============================================================================

/**
 * Complete theme model (Prisma-compatible)
 */
export interface ThemeModel {
  // Core identification
  readonly id: string;
  readonly name: string;
  readonly displayName: string;
  readonly description: string;
  readonly version: string;
  readonly category: ThemeCategory;
  readonly mode: ThemeMode;

  // Configuration sections (JSON fields in Prisma)
  readonly colors: ThemeColors;
  readonly typography: ThemeTypography;
  readonly spacing: ThemeSpacing;
  readonly accessibility: ThemeAccessibility;
  readonly branding: ThemeBranding;
  readonly compliance: ThemeCompliance;
  readonly performance: ThemePerformance;
  readonly responsive: ThemeResponsive;

  // Metadata
  readonly isDefault: boolean;
  readonly isActive: boolean;
  readonly isPublic: boolean;
  readonly authorId?: string;
  readonly organizationId?: string;
  readonly tags: string[];
  
  // Timestamps (handled by Prisma)
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

/**
 * Theme creation input (for API/forms)
 */
export interface CreateThemeInput {
  readonly name: string;
  readonly displayName: string;
  readonly description: string;
  readonly category: ThemeCategory;
  readonly mode: ThemeMode;
  readonly colors: ThemeColors;
  readonly typography: ThemeTypography;
  readonly spacing: ThemeSpacing;
  readonly accessibility: ThemeAccessibility;
  readonly branding: ThemeBranding;
  readonly compliance: ThemeCompliance;
  readonly performance: ThemePerformance;
  readonly responsive: ThemeResponsive;
  readonly tags?: string[];
  readonly isPublic?: boolean;
}

/**
 * Theme update input (partial updates)
 */
export interface UpdateThemeInput {
  readonly name?: string;
  readonly displayName?: string;
  readonly description?: string;
  readonly colors?: Partial<ThemeColors>;
  readonly typography?: Partial<ThemeTypography>;
  readonly spacing?: Partial<ThemeSpacing>;
  readonly accessibility?: Partial<ThemeAccessibility>;
  readonly branding?: Partial<ThemeBranding>;
  readonly compliance?: Partial<ThemeCompliance>;
  readonly performance?: Partial<ThemePerformance>;
  readonly responsive?: Partial<ThemeResponsive>;
  readonly tags?: string[];
  readonly isActive?: boolean;
  readonly isPublic?: boolean;
}

// =============================================================================
// THEME UTILITIES
// =============================================================================

/**
 * Create default accessibility configuration
 */
export const createDefaultAccessibility = (level: AccessibilityLevel = AccessibilityLevel.ENHANCED): ThemeAccessibility => {
  const configs = {
    [AccessibilityLevel.OFF]: {
      level: AccessibilityLevel.OFF,
      enabled: false,
      highContrast: false,
      reducedMotion: false,
      screenReaderOptimized: false,
      keyboardNavigation: false,
      focusManagement: false,
      minimumTouchTarget: '32px',
      minimumFontSize: '12px',
      contrastRatio: 3.0,
    },
    [AccessibilityLevel.BASIC]: {
      level: AccessibilityLevel.BASIC,
      enabled: true,
      highContrast: false,
      reducedMotion: false,
      screenReaderOptimized: true,
      keyboardNavigation: true,
      focusManagement: true,
      minimumTouchTarget: '44px',
      minimumFontSize: '14px',
      contrastRatio: 4.5,
    },
    [AccessibilityLevel.ENHANCED]: {
      level: AccessibilityLevel.ENHANCED,
      enabled: true,
      highContrast: true,
      reducedMotion: true,
      screenReaderOptimized: true,
      keyboardNavigation: true,
      focusManagement: true,
      minimumTouchTarget: '44px',
      minimumFontSize: '16px',
      contrastRatio: 4.5,
    },
    [AccessibilityLevel.WCAG_AA]: {
      level: AccessibilityLevel.WCAG_AA,
      enabled: true,
      highContrast: true,
      reducedMotion: true,
      screenReaderOptimized: true,
      keyboardNavigation: true,
      focusManagement: true,
      minimumTouchTarget: '44px',
      minimumFontSize: '16px',
      contrastRatio: 4.5,
    },
    [AccessibilityLevel.WCAG_AAA]: {
      level: AccessibilityLevel.WCAG_AAA,
      enabled: true,
      highContrast: true,
      reducedMotion: true,
      screenReaderOptimized: true,
      keyboardNavigation: true,
      focusManagement: true,
      minimumTouchTarget: '44px',
      minimumFontSize: '16px',
      contrastRatio: 7.0,
    },
  };

  return configs[level];
};

/**
 * Validate theme model
 */
export const validateThemeModel = (theme: Partial<ThemeModel>): boolean => {
  try {
    const required = ['id', 'name', 'displayName', 'category', 'mode', 'colors'];
    const isValid = required.every(field => theme[field as keyof ThemeModel] !== undefined);
    
    if (!isValid) {
      logger.warn('Theme validation failed: missing required fields', { theme });
    }
    
    return isValid;
  } catch (error) {
    logger.error('Theme validation error', { error });
    return false;
  }
};

/**
 * Convert theme to JSON (database storage)
 */
export const themeToJson = (theme: ThemeModel): string => {
  try {
    return JSON.stringify(theme, null, 2);
  } catch (error) {
    logger.error('Failed to serialize theme to JSON', { error });
    throw new Error('Theme serialization failed');
  }
};

/**
 * Parse theme from JSON (database retrieval)
 */
export const themeFromJson = (json: string): ThemeModel => {
  try {
    const theme = JSON.parse(json) as ThemeModel;
    
    if (!validateThemeModel(theme)) {
      throw new Error('Invalid theme data');
    }
    
    return theme;
  } catch (error) {
    logger.error('Failed to parse theme from JSON', { error });
    throw new Error('Theme parsing failed');
  }
}; 