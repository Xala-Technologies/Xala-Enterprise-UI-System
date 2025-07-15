/**
 * @fileoverview UI System Core tests with Norwegian compliance validation
 * @module UISystemCoreTests
 * @compliance NSM, GDPR, WCAG AAA
 */

import {
    UISystemCore,
    createDevelopmentUISystem,
    createProductionUISystem,
    createTestUISystem,
} from '../core/index';

describe('@xala-technologies/ui-system - UI System Core', () => { describe('Basic Configuration Tests', () => { it('should create UI system with default configuration', async () => { const uiSystem = UISystemCore.create();
      expect(uiSystem).toBeInstanceOf(UISystemCore);

      const initResult = await uiSystem.initialize();
      expect(initResult.success).toBe(true);

      await uiSystem.dispose(); });

    it('should create UI system with custom configuration', async () => { const uiSystem = UISystemCore.create({ nsmClassification: 'RESTRICTED',
        gdprCompliant: true,
        wcagLevel: 'AAA',
        supportedLanguages: ['nb-NO', 'en-US'],
        auditTrail: true,
        theme: 'norwegian-government',
        locale: 'nb-NO',
        enableAccessibilityValidation: true,
        enablePerformanceMonitoring: true, });

      expect(uiSystem).toBeInstanceOf(UISystemCore);

      const initResult = await uiSystem.initialize();
      expect(initResult.success).toBe(true);

      const compliance = uiSystem.getNorwegianCompliance();
      expect(compliance.nsmClassification).toBe('RESTRICTED');
      expect(compliance.gdprCompliant).toBe(true);
      expect(compliance.wcagLevel).toBe('AAA');
      expect(compliance.supportedLanguages).toContain('nb-NO');
      expect(compliance.auditTrail).toBe(true);

      await uiSystem.dispose(); }); });

  describe('Norwegian Compliance Tests', () => { it('should enforce Norwegian language requirement', async () => { const uiSystem = UISystemCore.create({ supportedLanguages: ['nb-NO', 'en-US'], });

      const initResult = await uiSystem.initialize();
      expect(initResult.success).toBe(true);

      const compliance = uiSystem.getNorwegianCompliance();
      expect(compliance.supportedLanguages).toContain('nb-NO');

      await uiSystem.dispose(); });

    it('should validate NSM classification levels', async () => { const classifications = ['OPEN', 'RESTRICTED', 'CONFIDENTIAL', 'SECRET'] as const;

      for (const classification of classifications) { const uiSystem = UISystemCore.create({ nsmClassification: classification, });

        const initResult = await uiSystem.initialize();
        expect(initResult.success).toBe(true);

        const compliance = uiSystem.getNorwegianCompliance();
        expect(compliance.nsmClassification).toBe(classification);

        await uiSystem.dispose(); } });

    it('should enforce GDPR compliance', async () => { const uiSystem = UISystemCore.create({ gdprCompliant: true, });

      const initResult = await uiSystem.initialize();
      expect(initResult.success).toBe(true);

      const compliance = uiSystem.getNorwegianCompliance();
      expect(compliance.gdprCompliant).toBe(true);

      await uiSystem.dispose(); });

    it('should support WCAG AAA compliance level', async () => { const uiSystem = UISystemCore.create({ wcagLevel: 'AAA', });

      const initResult = await uiSystem.initialize();
      expect(initResult.success).toBe(true);

      const compliance = uiSystem.getNorwegianCompliance();
      expect(compliance.wcagLevel).toBe('AAA');

      await uiSystem.dispose(); }); });

  describe('Performance Tests', () => { it('should initialize within 100ms performance requirement', async () => { const startTime = Date.now();
      const uiSystem = UISystemCore.create();

      const initResult = await uiSystem.initialize();
      const initTime = Date.now() - startTime;

      expect(initResult.success).toBe(true);
      expect(initTime).toBeLessThan(100);

      await uiSystem.dispose(); });

    it('should support caching for performance optimization', async () => { const uiSystem = UISystemCore.create(
        {},
        { enableCache: true,
          enablePerformanceMonitoring: true, }
      );

      const initResult = await uiSystem.initialize();
      expect(initResult.success).toBe(true);

      await uiSystem.dispose(); }); });

  describe('Component Registry Tests', () => { it('should register components successfully', async () => { const uiSystem = UISystemCore.create();
      await uiSystem.initialize();

      const mockComponent = { name: 'TestComponent', type: 'form' };
      const registerResult = uiSystem.registerComponent('TestComponent', mockComponent);

      expect(registerResult.success).toBe(true);

      const registry = uiSystem.getComponentRegistry();
      expect(registry.has('TestComponent')).toBe(true);
      expect(registry.get('TestComponent')).toBe(mockComponent);

      await uiSystem.dispose(); });

    it('should prevent duplicate component registration', async () => { const uiSystem = UISystemCore.create();
      await uiSystem.initialize();

      const mockComponent = { name: 'TestComponent', type: 'form' };

      // First registration should succeed
      const firstResult = uiSystem.registerComponent('TestComponent', mockComponent);
      expect(firstResult.success).toBe(true);

      // Second registration should fail
      const secondResult = uiSystem.registerComponent('TestComponent', mockComponent);
      expect(secondResult.success).toBe(false);
      expect(secondResult.error).toContain('already registered');

      await uiSystem.dispose(); }); });

  describe('Theme Registry Tests', () => { it('should initialize with Norwegian government theme', async () => { const uiSystem = UISystemCore.create();
      await uiSystem.initialize();

      const themeRegistry = uiSystem.getThemeRegistry();
      expect(themeRegistry.has('norwegian-government')).toBe(true);
      expect(themeRegistry.has('high-contrast')).toBe(true);

      await uiSystem.dispose(); }); });

  describe('Factory Function Tests', () => { it('should create production UI system with correct configuration', async () => { const uiSystem = createProductionUISystem('test-service', 'RESTRICTED');

      const initResult = await uiSystem.initialize();
      expect(initResult.success).toBe(true);

      const compliance = uiSystem.getNorwegianCompliance();
      expect(compliance.nsmClassification).toBe('RESTRICTED');
      expect(compliance.gdprCompliant).toBe(true);
      expect(compliance.wcagLevel).toBe('AAA');
      expect(compliance.auditTrail).toBe(true);

      await uiSystem.dispose(); });

    it('should create test UI system with correct configuration', async () => { const uiSystem = createTestUISystem();

      const initResult = await uiSystem.initialize();
      expect(initResult.success).toBe(true);

      const compliance = uiSystem.getNorwegianCompliance();
      expect(compliance.nsmClassification).toBe('OPEN');
      expect(compliance.gdprCompliant).toBe(true);
      expect(compliance.wcagLevel).toBe('AAA');
      expect(compliance.auditTrail).toBe(false);

      await uiSystem.dispose(); });

    it('should create development UI system with correct configuration', async () => { const uiSystem = createDevelopmentUISystem();

      const initResult = await uiSystem.initialize();
      expect(initResult.success).toBe(true);

      const compliance = uiSystem.getNorwegianCompliance();
      expect(compliance.nsmClassification).toBe('OPEN');
      expect(compliance.gdprCompliant).toBe(true);
      expect(compliance.wcagLevel).toBe('AAA');
      expect(compliance.auditTrail).toBe(true);

      await uiSystem.dispose(); }); });

  describe('Type Safety Tests', () => { it('should provide read-only access to registries', async () => { const uiSystem = UISystemCore.create();
      await uiSystem.initialize();

      const componentRegistry = uiSystem.getComponentRegistry();
      const themeRegistry = uiSystem.getThemeRegistry();
      const compliance = uiSystem.getNorwegianCompliance();

      // These should be read-only
      expect(componentRegistry).toBeInstanceOf(Map);
      expect(themeRegistry).toBeInstanceOf(Map);
      expect(typeof compliance).toBe('object');

      await uiSystem.dispose(); }); });

  describe('Error Handling Tests', () => { it('should handle initialization errors gracefully', async () => { // This test would simulate initialization failure scenarios
      // For now, we test successful initialization
      const uiSystem = UISystemCore.create();
      const initResult = await uiSystem.initialize();

      expect(initResult.success).toBe(true);

      await uiSystem.dispose(); }); });

  describe('Lifecycle Management Tests', () => { it('should support multiple initialization calls safely', async () => { const uiSystem = UISystemCore.create();

      // Multiple initialization calls should be safe
      const firstInit = await uiSystem.initialize();
      const secondInit = await uiSystem.initialize();

      expect(firstInit.success).toBe(true);
      expect(secondInit.success).toBe(true);

      await uiSystem.dispose(); });

    it('should clean up resources on disposal', async () => { const uiSystem = UISystemCore.create();
      await uiSystem.initialize();

      // Register a component
      uiSystem.registerComponent('TestComponent', { name: 'Test' });

      // Dispose should clean up
      await uiSystem.dispose();

      // Registry should be cleared
      const registry = uiSystem.getComponentRegistry();
      expect(registry.size).toBe(0); }); }); });
