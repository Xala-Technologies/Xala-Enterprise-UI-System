/* eslint-disable no-console */
/**
 * @fileoverview Semantic Component Compliance Validator v5.0.0
 * @description Validates semantic component usage and compliance with standards
 * @version 5.0.0
 * @compliance WCAG AAA, SSR-Safe, Framework-agnostic, Norwegian compliance
 */

import React from 'react';

// =============================================================================
// VALIDATION TYPES
// =============================================================================

/**
 * Validation severity levels
 */
export type ValidationSeverity = 'error' | 'warning' | 'info';

/**
 * Validation rule interface
 */
export interface ValidationRule {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly severity: ValidationSeverity;
  readonly category: 'semantic' | 'accessibility' | 'i18n' | 'nsm' | 'performance';
  readonly validator: (element: React.ReactElement) => ValidationResult[];
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  readonly ruleId: string;
  readonly severity: ValidationSeverity;
  readonly message: string;
  readonly element?: React.ReactElement;
  readonly suggestion?: string;
  readonly documentation?: string;
}

/**
 * Validation report interface
 */
export interface ValidationReport {
  readonly totalElements: number;
  readonly totalIssues: number;
  readonly errors: ValidationResult[];
  readonly warnings: ValidationResult[];
  readonly infos: ValidationResult[];
  readonly summary: {
    readonly semantic: number;
    readonly accessibility: number;
    readonly i18n: number;
    readonly nsm: number;
    readonly performance: number;
  };
  readonly compliance: {
    readonly semanticScore: number;
    readonly accessibilityScore: number;
    readonly i18nScore: number;
    readonly nsmScore: number;
    readonly overallScore: number;
  };
}

// =============================================================================
// VALIDATION RULES
// =============================================================================

/**
 * Semantic HTML validation rules
 */
const semanticRules: ValidationRule[] = [
  {
    id: 'semantic-div-usage',
    name: 'Avoid Raw Div Usage',
    description: 'Raw div elements should be replaced with semantic Box components',
    severity: 'warning',
    category: 'semantic',
    validator: (element) => {
      if (element.type === 'div' && !element.props.className?.includes('semantic-')) {
        return [{
          ruleId: 'semantic-div-usage',
          severity: 'warning',
          message: 'Use semantic Box component instead of raw div',
          element,
          suggestion: 'Replace <div> with <Box> from semantic components',
          documentation: '/docs/semantic-components/box'
        }];
      }
      return [];
    }
  },
  {
    id: 'semantic-span-usage',
    name: 'Avoid Raw Span Usage',
    description: 'Raw span elements should be replaced with semantic Text components',
    severity: 'warning',
    category: 'semantic',
    validator: (element) => {
      if (element.type === 'span' && !element.props.className?.includes('semantic-')) {
        return [{
          ruleId: 'semantic-span-usage',
          severity: 'warning',
          message: 'Use semantic Text component instead of raw span',
          element,
          suggestion: 'Replace <span> with <Text> from semantic components',
          documentation: '/docs/semantic-components/text'
        }];
      }
      return [];
    }
  },
  {
    id: 'semantic-button-usage',
    name: 'Avoid Raw Button Usage',
    description: 'Raw button elements should be replaced with semantic Button components',
    severity: 'error',
    category: 'semantic',
    validator: (element) => {
      if (element.type === 'button' && !element.props.className?.includes('semantic-')) {
        return [{
          ruleId: 'semantic-button-usage',
          severity: 'error',
          message: 'Use semantic Button component instead of raw button',
          element,
          suggestion: 'Replace <button> with <Button> from semantic components',
          documentation: '/docs/semantic-components/button'
        }];
      }
      return [];
    }
  },
  {
    id: 'semantic-heading-hierarchy',
    name: 'Proper Heading Hierarchy',
    description: 'Headings should follow proper hierarchy (h1 > h2 > h3...)',
    severity: 'error',
    category: 'semantic',
    validator: (element) => {
      const headingTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      if (headingTypes.includes(element.type as string)) {
        return [{
          ruleId: 'semantic-heading-hierarchy',
          severity: 'error',
          message: 'Use semantic Heading component with proper hierarchy',
          element,
          suggestion: 'Replace with <Heading level={n}> or intent-based variants like <PageTitle>',
          documentation: '/docs/semantic-components/heading'
        }];
      }
      return [];
    }
  }
];

/**
 * Accessibility validation rules
 */
const accessibilityRules: ValidationRule[] = [
  {
    id: 'aria-label-missing',
    name: 'Missing ARIA Label',
    description: 'Interactive elements should have appropriate ARIA labels',
    severity: 'error',
    category: 'accessibility',
    validator: (element) => {
      const interactiveTypes = ['button', 'a', 'input', 'select', 'textarea'];
      if (interactiveTypes.includes(element.type as string)) {
        const hasAriaLabel = element.props['aria-label'] || element.props['aria-labelledby'];
        const hasLabel = element.props.children || element.props.placeholder;
        
        if (!hasAriaLabel && !hasLabel) {
          return [{
            ruleId: 'aria-label-missing',
            severity: 'error',
            message: 'Interactive element missing accessible label',
            element,
            suggestion: 'Add aria-label or aria-labelledby attribute',
            documentation: '/docs/accessibility/aria-labels'
          }];
        }
      }
      return [];
    }
  },
  {
    id: 'alt-text-missing',
    name: 'Missing Alt Text',
    description: 'Images should have descriptive alt text',
    severity: 'error',
    category: 'accessibility',
    validator: (element) => {
      if (element.type === 'img' && !element.props.alt) {
        return [{
          ruleId: 'alt-text-missing',
          severity: 'error',
          message: 'Image missing alt text',
          element,
          suggestion: 'Add descriptive alt attribute or use semantic Image component',
          documentation: '/docs/semantic-components/image'
        }];
      }
      return [];
    }
  },
  {
    id: 'touch-target-size',
    name: 'Touch Target Size',
    description: 'Interactive elements should meet minimum 44px touch target size',
    severity: 'warning',
    category: 'accessibility',
    validator: (element) => {
      if (element.type === 'button' || element.type === 'a') {
        const className = element.props.className || '';
        const hasMinSize = className.includes('h-11') || className.includes('h-12') || 
                          className.includes('h-14') || className.includes('min-h-11');
        
        if (!hasMinSize) {
          return [{
            ruleId: 'touch-target-size',
            severity: 'warning',
            message: 'Interactive element may not meet minimum touch target size (44px)',
            element,
            suggestion: 'Use semantic Button component with appropriate size prop',
            documentation: '/docs/accessibility/touch-targets'
          }];
        }
      }
      return [];
    }
  }
];

/**
 * Internationalization validation rules
 */
const i18nRules: ValidationRule[] = [
  {
    id: 'hardcoded-text',
    name: 'Hardcoded Text Detected',
    description: 'Text content should use translation functions',
    severity: 'warning',
    category: 'i18n',
    validator: (element) => {
      const hasHardcodedText = typeof element.props.children === 'string' && 
                              element.props.children.length > 0 &&
                              !element.props.children.includes('t(');
      
      if (hasHardcodedText) {
        return [{
          ruleId: 'hardcoded-text',
          severity: 'warning',
          message: 'Consider using translation function for text content',
          element,
          suggestion: 'Wrap text content with t() function or use semantic components with i18n support',
          documentation: '/docs/i18n/translation-functions'
        }];
      }
      return [];
    }
  },
  {
    id: 'missing-lang-attribute',
    name: 'Missing Language Attribute',
    description: 'Text elements should specify language for proper i18n',
    severity: 'info',
    category: 'i18n',
    validator: (element) => {
      const textElements = ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      if (textElements.includes(element.type as string) && !element.props.lang) {
        return [{
          ruleId: 'missing-lang-attribute',
          severity: 'info',
          message: 'Consider adding lang attribute for i18n support',
          element,
          suggestion: 'Add lang attribute or use semantic components with automatic i18n',
          documentation: '/docs/i18n/language-attributes'
        }];
      }
      return [];
    }
  }
];

/**
 * Norwegian compliance validation rules
 */
const nsmRules: ValidationRule[] = [
  {
    id: 'missing-nsm-classification',
    name: 'Missing NSM Classification',
    description: 'Components handling sensitive data should have NSM classification',
    severity: 'warning',
    category: 'nsm',
    validator: (element) => {
      const sensitiveComponents = ['form', 'input', 'textarea', 'select'];
      if (sensitiveComponents.includes(element.type as string) && !element.props['data-nsm-level']) {
        return [{
          ruleId: 'missing-nsm-classification',
          severity: 'warning',
          message: 'Consider adding NSM classification for sensitive data handling',
          element,
          suggestion: 'Add nsmLevel prop or data-nsm-level attribute',
          documentation: '/docs/compliance/nsm-classification'
        }];
      }
      return [];
    }
  }
];

/**
 * Performance validation rules
 */
const performanceRules: ValidationRule[] = [
  {
    id: 'excessive-nesting',
    name: 'Excessive Component Nesting',
    description: 'Deeply nested components can impact performance',
    severity: 'info',
    category: 'performance',
    validator: (element) => {
      // This would need DOM analysis in real implementation
      // For now, just check for obvious patterns
      return [];
    }
  }
];

// Combine all rules
const allRules: ValidationRule[] = [
  ...semanticRules,
  ...accessibilityRules,
  ...i18nRules,
  ...nsmRules,
  ...performanceRules
];

// =============================================================================
// SEMANTIC COMPLIANCE VALIDATOR
// =============================================================================

export class SemanticComplianceValidator {
  private rules: ValidationRule[];

  constructor(customRules: ValidationRule[] = []) {
    this.rules = [...allRules, ...customRules];
  }

  /**
   * Validate a single React element
   */
  validateElement(element: React.ReactElement): ValidationResult[] {
    const results: ValidationResult[] = [];

    for (const rule of this.rules) {
      try {
        const ruleResults = rule.validator(element);
        results.push(...ruleResults);
      } catch (error) {
        console.warn(`Validation rule ${rule.id} failed:`, error);
      }
    }

    return results;
  }

  /**
   * Validate a React component tree
   */
  validateTree(element: React.ReactElement): ValidationReport {
    const results: ValidationResult[] = [];
    let totalElements = 0;

    const traverse = (node: React.ReactNode) => {
      if (React.isValidElement(node)) {
        totalElements++;
        const elementResults = this.validateElement(node);
        results.push(...elementResults);

        // Traverse children
        if (node.props.children) {
          React.Children.forEach(node.props.children, traverse);
        }
      }
    };

    traverse(element);

    // Categorize results
    const errors = results.filter(r => r.severity === 'error');
    const warnings = results.filter(r => r.severity === 'warning');
    const infos = results.filter(r => r.severity === 'info');

    // Calculate summary by category
    const summary = {
      semantic: results.filter(r => this.getRuleById(r.ruleId)?.category === 'semantic').length,
      accessibility: results.filter(r => this.getRuleById(r.ruleId)?.category === 'accessibility').length,
      i18n: results.filter(r => this.getRuleById(r.ruleId)?.category === 'i18n').length,
      nsm: results.filter(r => this.getRuleById(r.ruleId)?.category === 'nsm').length,
      performance: results.filter(r => this.getRuleById(r.ruleId)?.category === 'performance').length,
    };

    // Calculate compliance scores (percentage)
    const totalPossibleIssues = totalElements * this.rules.length;
    const compliance = {
      semanticScore: Math.max(0, 100 - (summary.semantic / totalElements) * 100),
      accessibilityScore: Math.max(0, 100 - (summary.accessibility / totalElements) * 100),
      i18nScore: Math.max(0, 100 - (summary.i18n / totalElements) * 100),
      nsmScore: Math.max(0, 100 - (summary.nsm / totalElements) * 100),
      overallScore: Math.max(0, 100 - (results.length / totalElements) * 25)
    };

    return {
      totalElements,
      totalIssues: results.length,
      errors,
      warnings,
      infos,
      summary,
      compliance
    };
  }

  /**
   * Get validation rule by ID
   */
  private getRuleById(id: string): ValidationRule | undefined {
    return this.rules.find(rule => rule.id === id);
  }

  /**
   * Add custom validation rule
   */
  addRule(rule: ValidationRule): void {
    this.rules.push(rule);
  }

  /**
   * Remove validation rule by ID
   */
  removeRule(id: string): void {
    this.rules = this.rules.filter(rule => rule.id !== id);
  }

  /**
   * Get all validation rules
   */
  getRules(): ValidationRule[] {
    return [...this.rules];
  }

  /**
   * Get rules by category
   */
  getRulesByCategory(category: ValidationRule['category']): ValidationRule[] {
    return this.rules.filter(rule => rule.category === category);
  }
}

// =============================================================================
// VALIDATION UTILITIES
// =============================================================================

/**
 * Create a new semantic compliance validator
 */
export const createSemanticValidator = (customRules: ValidationRule[] = []): SemanticComplianceValidator => {
  return new SemanticComplianceValidator(customRules);
};

/**
 * Quick validation function for single elements
 */
export const validateSemanticElement = (element: React.ReactElement): ValidationResult[] => {
  const validator = createSemanticValidator();
  return validator.validateElement(element);
};

/**
 * Quick validation function for component trees
 */
export const validateSemanticTree = (element: React.ReactElement): ValidationReport => {
  const validator = createSemanticValidator();
  return validator.validateTree(element);
};

/**
 * Format validation report as readable text
 */
export const formatValidationReport = (report: ValidationReport): string => {
  const lines: string[] = [];
  
  lines.push('='.repeat(60));
  lines.push('SEMANTIC COMPONENT COMPLIANCE REPORT');
  lines.push('='.repeat(60));
  lines.push('');
  
  // Summary
  lines.push(`Total Elements: ${report.totalElements}`);
  lines.push(`Total Issues: ${report.totalIssues}`);
  lines.push(`Errors: ${report.errors.length}`);
  lines.push(`Warnings: ${report.warnings.length}`);
  lines.push(`Info: ${report.infos.length}`);
  lines.push('');
  
  // Compliance Scores
  lines.push('COMPLIANCE SCORES:');
  lines.push(`Overall: ${report.compliance.overallScore.toFixed(1)}%`);
  lines.push(`Semantic: ${report.compliance.semanticScore.toFixed(1)}%`);
  lines.push(`Accessibility: ${report.compliance.accessibilityScore.toFixed(1)}%`);
  lines.push(`Internationalization: ${report.compliance.i18nScore.toFixed(1)}%`);
  lines.push(`Norwegian NSM: ${report.compliance.nsmScore.toFixed(1)}%`);
  lines.push('');
  
  // Issues by Category
  lines.push('ISSUES BY CATEGORY:');
  lines.push(`Semantic: ${report.summary.semantic}`);
  lines.push(`Accessibility: ${report.summary.accessibility}`);
  lines.push(`Internationalization: ${report.summary.i18n}`);
  lines.push(`Norwegian NSM: ${report.summary.nsm}`);
  lines.push(`Performance: ${report.summary.performance}`);
  lines.push('');
  
  // Detailed Issues
  if (report.errors.length > 0) {
    lines.push('ERRORS:');
    report.errors.forEach((error, index) => {
      lines.push(`${index + 1}. ${error.message}`);
      if (error.suggestion) {
        lines.push(`   Suggestion: ${error.suggestion}`);
      }
      if (error.documentation) {
        lines.push(`   Documentation: ${error.documentation}`);
      }
      lines.push('');
    });
  }
  
  if (report.warnings.length > 0) {
    lines.push('WARNINGS:');
    report.warnings.forEach((warning, index) => {
      lines.push(`${index + 1}. ${warning.message}`);
      if (warning.suggestion) {
        lines.push(`   Suggestion: ${warning.suggestion}`);
      }
      lines.push('');
    });
  }
  
  lines.push('='.repeat(60));
  
  return lines.join('\n');
};

// Export default validator instance
export const semanticValidator = createSemanticValidator();