/**
 * @fileoverview Main exports for @xala-technologies/ui-system
 * @module UISystem
 * @compliance NSM, GDPR, WCAG AAA
 */

// Core library exports
export {
  UISystemCore,
  createProductionUISystem,
  createTestUISystem,
  createDevelopmentUISystem,
  VERSION,
  PACKAGE_NAME,
  PACKAGE_INFO,
} from './lib/index';

// Type definitions with enterprise compliance
export type {
  // Core types
  UISystemConfig,
  UISystemOptions,
  NorwegianCompliance,
  NorwegianLanguage,
  WCAGLevel,
  ThemeDefinition,
  ThemeColors,
  AccessibilityConfig,
  ComponentDefinition,
  ComponentType,
  ComponentAccessibilityConfig,
  ValidationError,
  PerformanceMetrics,
  AuditTrailEntry,

  // Service interfaces
  UISystemService,
  ComponentFactory,
  ComponentFactoryFunction,
  ThemeManager,
  AccessibilityService,
  PerformanceMonitor,
  NorwegianComplianceValidator,
  AuditTrailService,
  ConfigurationService,
  EventPublisher,
  LocalizationService,

  // Component types
  ComponentProps,
  SemanticComponentProps,
  MobileComponentProps,
  DesktopComponentProps,
  NorwegianFormProps,
  AccessibilityProps,
  EventHandlers,
  ComponentState,
  ThemeContext,
  LocalizationContext,

  // UI configuration
  NorwegianUIConfig,
  DesignToken,
  CSSProperties,

  // Norwegian validation types
  NorwegianPersonalNumber,
  NorwegianOrganizationNumber,
  NorwegianPostalCode,
  NorwegianPhoneNumber,
} from './types/index';

// Norwegian compliance utilities
export {
  isValidNorwegianPersonalNumber,
  isValidNorwegianOrganizationNumber,
  isValidNorwegianPostalCode,
  isValidNorwegianPhoneNumber,
  validateNorwegianCompliance,
  isValidNSMClassification,
  isValidWCAGLevel,
  isValidNorwegianLanguage,
  isValidNorwegianMunicipalityCode,
  getNSMClassificationLabel,
  canDisplayClassification,
  sanitizeDataForClassification,
  validateGDPRConsent,
  validateColorContrast,
} from './lib/index';

// Type safety utilities
export {
  isValidComponentProps,
  isValidAccessibilityProps,
  isValidEventHandlers,
  isValidComponentState,
  safeGetComponentProp,
  safeGetChildAt,
  validateComponentProps,
  validateNorwegianComplianceConfig,
  safeAccessObject,
  validateEmailWithNorwegianSupport,
  validateUrlWithNorwegianCompliance,
  createSafeEventHandler,
  validateAccessibilityRequirements,
  createComponentFactory,
  validateTouchTargetSize,
  validateColorContrastRatio,
} from './lib/index';

// Design tokens (preserved from existing implementation)
export { colors, colorTokens, municipalityColors } from './tokens/colors';
export { spacing, spacingTokens, norwegianSpacing } from './tokens/spacing';
export { typography, typographyTokens, norwegianTypography } from './tokens/typography';
export { borderRadius, borderRadiusTokens, norwegianBorderRadius } from './tokens/border-radius';
export { shadows, shadowTokens, norwegianShadows } from './tokens/shadows';
export { validateDesignTokens } from './tokens/validation';
export { generateThemeTokens, municipalityThemes } from './tokens';
export type { NorwegianThemeConfig, MunicipalityTheme } from './tokens';

// React hooks (preserved from existing implementation)
export { useUISystem } from './hooks/index';

// Core components (preserved from existing implementation)
export { UISystemProvider } from './components/UISystemProvider';
