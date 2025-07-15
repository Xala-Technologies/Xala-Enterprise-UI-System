/**
 * Token Validation System
 * Automated validation and CSS generation for design tokens
 */

import { Logger } from '../../lib/utils/multiplatform-logger';
import { semanticTokens } from '../semantic';
import type { TokenPath, TokenValue } from '../semantic-token-system';

/**
 * Token validation configuration
 */
export interface TokenValidationConfig {
  readonly enforceNorwegianCompliance: boolean;
  readonly validateWCAG: boolean;
  readonly validateNSM: boolean;
  readonly strictMode: boolean;
  readonly outputFormat: 'css' | 'scss' | 'less' | 'stylus';
}

/**
 * CSS generation options
 */
export interface CSSGenerationOptions {
  readonly prefix: string;
  readonly includeComments: boolean;
  readonly minify: boolean;
  readonly includeRootVars: boolean;
  readonly includeUtilityClasses: boolean;
}

/**
 * Token validation error
 */
export interface TokenValidationError {
  readonly path: TokenPath;
  readonly message: string;
  readonly severity: 'error' | 'warning' | 'info';
  readonly code: string;
  readonly suggestion?: string;
}

/**
 * Token validation report
 */
export interface TokenValidationReport {
  readonly valid: boolean;
  readonly errors: TokenValidationError[];
  readonly warnings: TokenValidationError[];
  readonly info: TokenValidationError[];
  readonly totalTokens: number;
  readonly validTokens: number;
  readonly complianceScore: number;
}

/**
 * Token validator class
 */


const logger = Logger.create({
  serviceName: 'ui-system-token-validator',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

export class TokenValidator {
  private config: TokenValidationConfig;
  // eslint-disable-next-line no-unused-vars
  private validationRules: Map<string, (value: TokenValue) => TokenValidationError[]>;

  constructor(config: Partial<TokenValidationConfig> = {}) {
    this.config = {
      enforceNorwegianCompliance: true,
      validateWCAG: true,
      validateNSM: true,
      strictMode: false,
      outputFormat: 'css',
      ...config
    };

    this.validationRules = new Map();
    this.initializeValidationRules();
  }

  /**
   * Initialize validation rules
   */
  private initializeValidationRules(): void {
    // Color validation rules
    this.validationRules.set('color', (value: TokenValue) => {
      const errors: TokenValidationError[] = [];
      const colorStr = String(value);

      // Validate hex color format
      if (colorStr.startsWith('#') && !/^#([A-Fa-f0-9]{3}){1,2}$/.test(colorStr)) {
        errors.push({
          path: '',
          message: 'Invalid hex color format',
          severity: 'error',
          code: 'INVALID_COLOR_FORMAT',
          suggestion: 'Use valid hex color format (e.g., #FF0000 or #F00)'
        });
      }

      // WCAG contrast validation
      if (this.config.validateWCAG) {
        // Simplified WCAG validation - can be enhanced
        if (colorStr === '#FFFFFF' || colorStr === '#000000') {
          errors.push({
            path: '',
            message: 'Pure white or black may not meet WCAG contrast requirements',
            severity: 'warning',
            code: 'WCAG_CONTRAST_WARNING'
          });
        }
      }

      return errors;
    });

    // Spacing validation rules
    this.validationRules.set('spacing', (value: TokenValue) => {
      const errors: TokenValidationError[] = [];
      const spacingStr = String(value);

      // Validate spacing units
      if (!/^(\d+(\.\d+)?)(px|rem|em|%)$/.test(spacingStr)) {
        errors.push({
          path: '',
          message: 'Invalid spacing unit',
          severity: 'error',
          code: 'INVALID_SPACING_UNIT',
          suggestion: 'Use valid CSS units (px, rem, em, %)'
        });
      }

      // Norwegian compliance - minimum touch targets
      if (this.config.enforceNorwegianCompliance) {
        const numValue = parseFloat(spacingStr);
        if (spacingStr.includes('px') && numValue < 44) {
          errors.push({
            path: '',
            message: 'Touch targets should be at least 44px for Norwegian compliance',
            severity: 'warning',
            code: 'NORWEGIAN_TOUCH_TARGET'
          });
        }
      }

      return errors;
    });

    // Typography validation rules
    this.validationRules.set('typography', (value: TokenValue) => {
      const errors: TokenValidationError[] = [];
      
      if (typeof value === 'object' && value !== null) {
        const typoObj = value as Record<string, unknown>;
        
        // Validate font size
        if (typoObj.fontSize) {
          const fontSize = String(typoObj.fontSize);
          if (!/^(\d+(\.\d+)?)(px|rem|em)$/.test(fontSize)) {
            errors.push({
              path: '',
              message: 'Invalid font size unit',
              severity: 'error',
              code: 'INVALID_FONT_SIZE'
            });
          }
        }

        // Norwegian compliance - minimum font sizes
        if (this.config.enforceNorwegianCompliance && typoObj.fontSize) {
          const fontSize = parseFloat(String(typoObj.fontSize));
          if (fontSize < 14) {
            errors.push({
              path: '',
              message: 'Font size should be at least 14px for Norwegian compliance',
              severity: 'warning',
              code: 'NORWEGIAN_FONT_SIZE'
            });
          }
        }
      }

      return errors;
    });
  }

  /**
   * Validate a single token
   */
  validateToken(path: TokenPath, value: TokenValue): TokenValidationError[] {
    const errors: TokenValidationError[] = [];

    // Determine token category from path
    const category = this.getTokenCategory(path);
    const rule = this.validationRules.get(category);

    if (rule) {
      const ruleErrors = rule(value);
      ruleErrors.forEach(error => {
        errors.push({ ...error, path });
      });
    }

    // NSM classification validation
    if (this.config.validateNSM && path.includes('classification')) {
      const classificationValue = String(value);
      const validClassifications = ['ÅPEN', 'BEGRENSET', 'KONFIDENSIELT', 'HEMMELIG'];
      
      if (!validClassifications.includes(classificationValue)) {
        errors.push({
          path,
          message: 'Invalid NSM classification level',
          severity: 'error',
          code: 'INVALID_NSM_CLASSIFICATION',
          suggestion: 'Use valid NSM classification: ÅPEN, BEGRENSET, KONFIDENSIELT, HEMMELIG'
        });
      }
    }

    return errors;
  }

  /**
   * Validate all tokens
   */
  validateAllTokens(): TokenValidationReport {
    const errors: TokenValidationError[] = [];
    const warnings: TokenValidationError[] = [];
    const info: TokenValidationError[] = [];
    let totalTokens = 0;
    let validTokens = 0;

    // Validate semantic tokens
    const validateTokenObject = (obj: Record<string, unknown>, basePath: string = ''): void => {
      Object.entries(obj).forEach(([key, value]) => {
        const currentPath = basePath ? `${basePath}.${key}` : key;
        totalTokens++;

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          validateTokenObject(value as Record<string, unknown>, currentPath);
        } else {
          const validationErrors = this.validateToken(currentPath as TokenPath, value as TokenValue);
          
          if (validationErrors.length === 0) {
            validTokens++;
          } else {
            validationErrors.forEach(error => {
              switch (error.severity) {
                case 'error':
                  errors.push(error);
                  break;
                case 'warning':
                  warnings.push(error);
                  break;
                case 'info':
                  info.push(error);
                  break;
              }
            });
          }
        }
      });
    };

    validateTokenObject(semanticTokens);

    const complianceScore = totalTokens > 0 ? (validTokens / totalTokens) * 100 : 0;

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      info,
      totalTokens,
      validTokens,
      complianceScore
    };
  }

  /**
   * Generate CSS from tokens
   */
  generateCSS(options: Partial<CSSGenerationOptions> = {}): string {
    const opts: CSSGenerationOptions = {
      prefix: '--xala',
      includeComments: true,
      minify: false,
      includeRootVars: true,
      includeUtilityClasses: false,
      ...options
    };

    const cssLines: string[] = [];

    if (opts.includeComments && !opts.minify) {
      cssLines.push('/**');
      cssLines.push(' * Xala UI System - Generated CSS Variables');
      cssLines.push(' * Auto-generated from semantic tokens');
      cssLines.push(' * Do not edit manually');
      cssLines.push(' */');
      cssLines.push('');
    }

    if (opts.includeRootVars) {
      cssLines.push(':root {');
      
      const generateCSSVars = (obj: Record<string, unknown>, basePath: string = ''): void => {
        Object.entries(obj).forEach(([key, value]) => {
          const currentPath = basePath ? `${basePath}-${key}` : key;
          
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            generateCSSVars(value as Record<string, unknown>, currentPath);
          } else {
            const cssVar = `${opts.prefix}-${currentPath}`;
            const cssValue = this.formatCSSValue(value);
            
            if (opts.includeComments && !opts.minify) {
              cssLines.push(`  /* ${basePath ? `${basePath}.${key}` : key} */`);
            }
            
            cssLines.push(`  ${cssVar}: ${cssValue};`);
          }
        });
      };

      generateCSSVars(semanticTokens);
      cssLines.push('}');
    }

    if (opts.includeUtilityClasses) {
      cssLines.push('');
      cssLines.push('/* Utility Classes */');
      cssLines.push(this.generateUtilityClasses(opts));
    }

    return cssLines.join(opts.minify ? '' : '\n');
  }

  /**
   * Generate utility classes
   */
  private generateUtilityClasses(options: CSSGenerationOptions): string {
    const classes: string[] = [];

    // Color utilities
    classes.push('/* Color Utilities */');
    Object.entries(semanticTokens.color || {}).forEach(([category, colors]) => {
      if (typeof colors === 'object' && colors !== null) {
         
        // eslint-disable-next-line no-unused-vars
        Object.entries(colors).forEach(([name, _value]) => {
          classes.push(`.text-${category}-${name} { color: var(${options.prefix}-color-${category}-${name}); }`);
          classes.push(`.bg-${category}-${name} { background-color: var(${options.prefix}-color-${category}-${name}); }`);
        });
      }
    });

    // Spacing utilities
    classes.push('/* Spacing Utilities */');
    Object.entries(semanticTokens.spacing || {}).forEach(([category, spacing]) => {
      if (typeof spacing === 'object' && spacing !== null) {
         
        // eslint-disable-next-line no-unused-vars
        Object.entries(spacing).forEach(([name, _value]) => {
          classes.push(`.m-${category}-${name} { margin: var(${options.prefix}-spacing-${category}-${name}); }`);
          classes.push(`.p-${category}-${name} { padding: var(${options.prefix}-spacing-${category}-${name}); }`);
        });
      }
    });

    return classes.join(options.minify ? '' : '\n');
  }

  /**
   * Format CSS value
   */
  private formatCSSValue(value: unknown): string {
    if (typeof value === 'string') {
      return value;
    }
    
    if (typeof value === 'number') {
      return `${value}px`;
    }
    
    if (typeof value === 'object' && value !== null) {
      // Handle complex token values
      return JSON.stringify(value);
    }
    
    return String(value);
  }

  /**
   * Get token category from path
   */
  private getTokenCategory(path: TokenPath): string {
    const segments = path.split('.');
    
    if (segments.includes('color') || segments.includes('colors')) {
      return 'color';
    }
    
    if (segments.includes('spacing') || segments.includes('space')) {
      return 'spacing';
    }
    
    if (segments.includes('typography') || segments.includes('font')) {
      return 'typography';
    }
    
    return 'general';
  }
}

/**
 * Default token validator instance
 */
export const tokenValidator = new TokenValidator();

/**
 * Utility functions
 */
export function validateTokens(): TokenValidationReport {
  return tokenValidator.validateAllTokens();
}

export function generateTokenCSS(options?: Partial<CSSGenerationOptions>): string {
  return tokenValidator.generateCSS(options);
}

export function validateSingleToken(path: TokenPath, value: TokenValue): TokenValidationError[] {
  return tokenValidator.validateToken(path, value);
}

/**
 * Build-time validation
 */
export function validateTokensAtBuildTime(): boolean {
  const report = validateTokens();
  
  if (report.errors.length > 0) {
    logger.error('Token validation failed:');
    report.errors.forEach(error => {
      logger.error(`  ${error.path}: ${error.message} (${error.code})`);
    });
    return false;
  }
  
  if (report.warnings.length > 0) {
    logger.warn('Token validation warnings:');
    report.warnings.forEach(warning => {
      logger.warn(`  ${warning.path}: ${warning.message} (${warning.code})`);
    });
  }
  
  logger.info(`Token validation passed: ${report.validTokens}/${report.totalTokens} tokens valid (${report.complianceScore.toFixed(1)}% compliance)`);
  return true;
} 