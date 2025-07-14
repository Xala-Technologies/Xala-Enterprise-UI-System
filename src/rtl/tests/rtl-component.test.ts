// RTL Component Testing for @xala-mock/ui-system
// Right-to-left language support testing (Arabic, Hebrew) with Norwegian compliance

import type { TextDirection, SupportedLocale } from '../../types/localization.types';
import { RTLDesignTokens } from '../../types/localization.types';
import {

  generateRTLTokens,
  RTL_COMPONENT_UTILITIES,
  NORWEGIAN_RTL_TESTING,
} from '../tokens/rtl-design-tokens';

// RTL Test Suite Interface
export interface RTLTestSuite {
  testName: string;
  locale: SupportedLocale;
  direction: TextDirection;
  testData: RTLTestData;
  expectedResults: RTLExpectedResults;
}

// RTL Test Data Structure
export interface RTLTestData {
  text: string;
  numbers: string;
  mixedContent: string;
  norwegianContent?: string;
  governmentTerms?: string[];
}

// Expected RTL Test Results
export interface RTLExpectedResults {
  textAlignment: 'left' | 'right' | 'center';
  direction: TextDirection;
  marginStart: string;
  marginEnd: string;
  paddingStart: string;
  paddingEnd: string;
  hasLogicalProperties: boolean;
  biDiIsolation: boolean;
}

// RTL Test Results
export interface RTLTestResults {
  passed: boolean;
  errors: string[];
  warnings: string[];
  performance: {
    renderTime: number;
    memoryUsage: number;
  };
  accessibility: {
    screenReaderCompatible: boolean;
    keyboardNavigable: boolean;
  };
}

// Arabic Language Test Suite
export const ARABIC_TEST_SUITE: RTLTestSuite = {
  testName: 'Arabic RTL Support',
  locale: 'ar',
  direction: 'rtl',
  testData: {
    text: 'مرحبا بكم في النرويج - أهلا وسهلا',
    numbers: '١٢٣٤٥٦٧٨٩٠',
    mixedContent: 'Velkommen مرحبا til Norge 2024',
    norwegianContent: 'رقم الهوية النرويجية: 12345678901',
    governmentTerms: [
      'Altinn الطين',
      'ID-porten هوية البوابة',
      'BankID الهوية المصرفية',
      'BRREG سجل برونويسوند',
    ],
  },
  expectedResults: {
    textAlignment: 'right',
    direction: 'rtl',
    marginStart: 'margin-right',
    marginEnd: 'margin-left',
    paddingStart: 'padding-right',
    paddingEnd: 'padding-left',
    hasLogicalProperties: true,
    biDiIsolation: true,
  },
};

// Hebrew Language Test Suite
export const HEBREW_TEST_SUITE: RTLTestSuite = {
  testName: 'Hebrew RTL Support',
  locale: 'he',
  direction: 'rtl',
  testData: {
    text: 'ברוכים הבאים לנורווגיה - שלום',
    numbers: '1234567890',
    mixedContent: 'Velkommen ברוכים הבאים til Norge 2024',
    norwegianContent: 'מספר זהות נורווגי: 12345678901',
    governmentTerms: [
      'Altinn אלטין',
      'ID-porten פורטל זהות',
      'BankID זהות בנקאית',
      'BRREG רישום ברונויסונד',
    ],
  },
  expectedResults: {
    textAlignment: 'right',
    direction: 'rtl',
    marginStart: 'margin-right',
    marginEnd: 'margin-left',
    paddingStart: 'padding-right',
    paddingEnd: 'padding-left',
    hasLogicalProperties: true,
    biDiIsolation: true,
  },
};

// Norwegian in RTL Mode Test Suite (for accessibility testing)
export const NORWEGIAN_RTL_TEST_SUITE: RTLTestSuite = {
  testName: 'Norwegian in RTL Mode (Accessibility Test)',
  locale: 'nb-NO',
  direction: 'rtl',
  testData: {
    text: 'Velkommen til Norge - RTL Test',
    numbers: '12345678901',
    mixedContent: 'Fødselsnummer: 12345678901 - Organisasjonsnummer: 123456789',
    norwegianContent: 'Dette er en test av norsk innhold i RTL-modus',
    governmentTerms: [
      'Altinn tjenester',
      'ID-porten innlogging',
      'BankID autentisering',
      'BRREG organisasjonsdata',
    ],
  },
  expectedResults: {
    textAlignment: 'right',
    direction: 'rtl',
    marginStart: 'margin-right',
    marginEnd: 'margin-left',
    paddingStart: 'padding-right',
    paddingEnd: 'padding-left',
    hasLogicalProperties: true,
    biDiIsolation: true,
  },
};

// RTL Component Testing Utilities
export class RTLComponentTester {
  private testResults: Map<string, RTLTestResults> = new Map();

  // Test a component with specific RTL configuration
  testComponent(componentElement: HTMLElement, testSuite: RTLTestSuite): RTLTestResults {
    const startTime = performance.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Set up RTL environment
      this.setupRTLEnvironment(componentElement, testSuite);

      // Run core RTL tests
      this.testDirectionHandling(componentElement, testSuite, errors, warnings);
      this.testSpacingProperties(componentElement, testSuite, errors, warnings);
      this.testTextAlignment(componentElement, testSuite, errors, warnings);
      this.testBiDiSupport(componentElement, testSuite, errors, warnings);

      // Test Norwegian government compliance in RTL mode
      if (testSuite.locale === 'nb-NO' || testSuite.locale === 'nn-NO') {
        this.testNorwegianRTLCompliance(componentElement, testSuite, errors, warnings);
      }

      // Test accessibility in RTL mode
      const accessibility = this.testRTLAccessibility(componentElement);

      const endTime = performance.now();
      const results: RTLTestResults = {
        passed: errors.length === 0,
        errors,
        warnings,
        performance: {
          renderTime: endTime - startTime,
          memoryUsage: this.estimateMemoryUsage(),
        },
        accessibility,
      };

      this.testResults.set(testSuite.testName, results);
      return results;
    } catch (error) {
      errors.push(`RTL test failed: ${error}`);
      return {
        passed: false,
        errors,
        warnings,
        performance: { renderTime: 0, memoryUsage: 0 },
        accessibility: { screenReaderCompatible: false, keyboardNavigable: false },
      };
    }
  }

  // Set up RTL testing environment
  private setupRTLEnvironment(element: HTMLElement, testSuite: RTLTestSuite): void {
    element.dir = testSuite.direction;
    element.lang = testSuite.locale;

    // Add RTL testing attributes
    element.setAttribute('data-rtl-test', 'true');
    element.setAttribute('data-test-suite', testSuite.testName);

    // Insert test content
    if (element.textContent !== null) {
      element.textContent = testSuite.testData.text;
    }
  }

  // Test direction handling
  private testDirectionHandling(
    element: HTMLElement,
    testSuite: RTLTestSuite,
    errors: string[],
    warnings: string[]
  ): void {
    const computedStyle = global.window.getComputedStyle(element);
    const actualDirection = computedStyle.direction;

    if (actualDirection !== testSuite.expectedResults.direction) {
      errors.push(
        `Direction mismatch: expected ${testSuite.expectedResults.direction}, got ${actualDirection}`
      );
    }

    // Check for dir attribute
    if (element.dir !== testSuite.direction) {
      warnings.push(`Element dir attribute should be "${testSuite.direction}"`);
    }
  }

  // Test spacing properties (margin, padding)
  private testSpacingProperties(
    element: HTMLElement,
    testSuite: RTLTestSuite,
    errors: string[],
    warnings: string[]
  ): void {
    const computedStyle = global.window.getComputedStyle(element);

    // Check for logical properties support
    const hasMarginInlineStart = computedStyle.marginInlineStart !== '';
    const hasMarginInlineEnd = computedStyle.marginInlineEnd !== '';
    const hasPaddingInlineStart = computedStyle.paddingInlineStart !== '';
    const hasPaddingInlineEnd = computedStyle.paddingInlineEnd !== '';

    const hasLogicalProperties =
      hasMarginInlineStart || hasMarginInlineEnd || hasPaddingInlineStart || hasPaddingInlineEnd;

    if (testSuite.expectedResults.hasLogicalProperties && !hasLogicalProperties) {
      warnings.push(
        'Consider using logical properties (margin-inline-start, etc.) for better RTL support'
      );
    }

    // Check for hardcoded left/right properties in RTL mode
    if (testSuite.direction === 'rtl') {
      const marginLeft = computedStyle.marginLeft;
      const marginRight = computedStyle.marginRight;

      if (marginLeft !== '0px' && marginRight !== '0px') {
        warnings.push('Avoid using both margin-left and margin-right in RTL mode');
      }
    }
  }

  // Test text alignment
  private testTextAlignment(
    element: HTMLElement,
    testSuite: RTLTestSuite,
    errors: string[],
    warnings: string[]
  ): void {
    const computedStyle = global.window.getComputedStyle(element);
    const textAlign = computedStyle.textAlign;

    // For RTL, expect right alignment or start alignment
    if (testSuite.direction === 'rtl') {
      if (textAlign !== 'right' && textAlign !== 'start') {
        warnings.push(`Text alignment "${textAlign}" may not be optimal for RTL`);
      }
    }
  }

  // Test BiDi (Bidirectional) support
  private testBiDiSupport(
    element: HTMLElement,
    testSuite: RTLTestSuite,
    errors: string[],
    warnings: string[]
  ): void {
    const computedStyle = global.window.getComputedStyle(element);
    const unicodeBidi = computedStyle.unicodeBidi;

    // Check for proper BiDi isolation
    if (testSuite.expectedResults.biDiIsolation) {
      if (unicodeBidi !== 'isolate' && unicodeBidi !== 'isolate-override') {
        warnings.push('Consider using unicode-bidi: isolate for better BiDi support');
      }
    }

    // Test mixed content handling
    if (testSuite.testData.mixedContent) {
      const hasProperBiDiMarks = this.checkBiDiMarks(testSuite.testData.mixedContent);
      if (!hasProperBiDiMarks) {
        warnings.push('Mixed content may benefit from BiDi control characters');
      }
    }
  }

  // Test Norwegian government compliance in RTL mode
  private testNorwegianRTLCompliance(
    element: HTMLElement,
    testSuite: RTLTestSuite,
    errors: string[],
    warnings: string[]
  ): void {
    // Test Norwegian personal number formatting in RTL
    if (testSuite.testData.norwegianContent?.includes('12345678901')) {
      const content = element.textContent || '';
      if (!content.includes('123456 78901') && !content.includes('12345678901')) {
        warnings.push('Norwegian personal numbers should maintain proper formatting in RTL');
      }
    }

    // Test government service terms in RTL
    if (testSuite.testData.governmentTerms) {
      testSuite.testData.governmentTerms.forEach(term => {
        if (term.includes('Altinn') || term.includes('ID-porten')) {
          // These should maintain LTR orientation even in RTL context
          warnings.push(`Government service names like "${term}" may need LTR override`);
        }
      });
    }
  }

  // Test RTL accessibility
  private testRTLAccessibility(element: HTMLElement): {
    screenReaderCompatible: boolean;
    keyboardNavigable: boolean;
  } {
    // Check for proper ARIA labels in RTL context
    const hasAriaLabel =
      element.hasAttribute('aria-label') || element.hasAttribute('aria-labelledby');

    // Check for keyboard navigation support
    const isKeyboardNavigable = element.tabIndex >= 0 || element.hasAttribute('role');

    return {
      screenReaderCompatible: hasAriaLabel,
      keyboardNavigable: isKeyboardNavigable,
    };
  }

  // Check for BiDi control characters
  private checkBiDiMarks(text: string): boolean {
    const bidiMarks = [
      '\u202A', // Left-to-Right Embedding
      '\u202B', // Right-to-Left Embedding
      '\u202C', // Pop Directional Formatting
      '\u202D', // Left-to-Right Override
      '\u202E', // Right-to-Left Override
      '\u061C', // Arabic Letter Mark
      '\u200E', // Left-to-Right Mark
      '\u200F', // Right-to-Left Mark
    ];

    return bidiMarks.some(mark => text.includes(mark));
  }

  // Estimate memory usage (mock implementation)
  private estimateMemoryUsage(): number {
    // Mock implementation - in real scenario would use performance.measureUserAgentSpecificMemory
    return Math.random() * 1000;
  }

  // Get all test results
  getTestResults(): Map<string, RTLTestResults> {
    return this.testResults;
  }

  // Generate RTL test report
  generateTestReport(): string {
    let report = '# RTL Testing Report\n\n';

    this.testResults.forEach((results, testName) => {
      report += `## ${testName}\n`;
      report += `**Status:** ${results.passed ? '✅ PASSED' : '❌ FAILED'}\n`;
      report += `**Render Time:** ${results.performance.renderTime.toFixed(2)}ms\n`;
      report += `**Memory Usage:** ${results.performance.memoryUsage.toFixed(2)} KB\n\n`;

      if (results.errors.length > 0) {
        report += '**Errors:**\n';
        results.errors.forEach(error => (report += `- ${error}\n`));
        report += '\n';
      }

      if (results.warnings.length > 0) {
        report += '**Warnings:**\n';
        results.warnings.forEach(warning => (report += `- ${warning}\n`));
        report += '\n';
      }

      report += '**Accessibility:**\n';
      report += `- Screen Reader Compatible: ${results.accessibility.screenReaderCompatible ? '✅' : '❌'}\n`;
      report += `- Keyboard Navigable: ${results.accessibility.keyboardNavigable ? '✅' : '❌'}\n\n`;
      report += '---\n\n';
    });

    return report;
  }
}

// Export default RTL tester instance
export const defaultRTLTester = new RTLComponentTester();

// Utility function to run all RTL tests
export const runAllRTLTests = (componentElement: HTMLElement): Map<string, RTLTestResults> => {
  const tester = new RTLComponentTester();

  // Test Arabic support
  tester.testComponent(componentElement, ARABIC_TEST_SUITE);

  // Test Hebrew support
  tester.testComponent(componentElement, HEBREW_TEST_SUITE);

  // Test Norwegian in RTL mode (accessibility test)
  tester.testComponent(componentElement, NORWEGIAN_RTL_TEST_SUITE);

  return tester.getTestResults();
};
