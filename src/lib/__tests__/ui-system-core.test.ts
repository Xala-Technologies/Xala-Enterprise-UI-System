/**
 * @fileoverview UI System Core tests
 * @module UISystemCoreTests
 */

import {
  UISystemCore,
  createDevelopmentUISystem,
  createProductionUISystem,
  createTestUISystem,
  createNorwegianUISystem,
} from '../core/index';

describe('@xala-technologies/ui-system - UI System Core', () => {
  // Reset singleton instance before each test
  beforeEach(() => {
    // Clear the singleton instance by accessing private property
    // @ts-ignore
    UISystemCore.instance = undefined;
  });

  describe('Basic Configuration Tests', () => {
    it('should create UI system with default configuration', async () => {
      const uiSystem = UISystemCore.create();
      expect(uiSystem).toBeInstanceOf(UISystemCore);

      await uiSystem.initialize();
      
      const config = uiSystem.getConfig();
      expect(config.name).toBe('xala-ui-system');
      expect(config.version).toBe('2.0.0');
      expect(config.defaultLanguage).toBe('nb-NO');
      expect(config.accessibility).toBe('enhanced');
    });

    it('should create UI system with custom configuration', async () => {
      const customConfig = {
        name: 'custom-ui-system',
        version: '1.0.0',
        defaultLanguage: 'en-US' as const,
        accessibility: 'enterprise' as const,
        theme: {
          mode: 'dark' as const,
          primary: '#000000',
          secondary: '#ffffff',
        },
      };

      const uiSystem = UISystemCore.create(customConfig);
      expect(uiSystem).toBeInstanceOf(UISystemCore);

      await uiSystem.initialize();
      
      const config = uiSystem.getConfig();
      expect(config.name).toBe('custom-ui-system');
      expect(config.version).toBe('1.0.0');
      expect(config.defaultLanguage).toBe('en-US');
      expect(config.accessibility).toBe('enterprise');
      expect(config.theme?.mode).toBe('dark');
    });

    it('should enforce singleton pattern', () => {
      const instance1 = UISystemCore.create();
      const instance2 = UISystemCore.create();
      
      expect(instance1).toBe(instance2);
    });

    it('should get instance after creation', () => {
      const created = UISystemCore.create();
      const gotten = UISystemCore.getInstance();
      
      expect(created).toBe(gotten);
    });

    it('should throw error when getting instance before creation', () => {
      expect(() => UISystemCore.getInstance()).toThrow(
        'UISystemCore not initialized. Call create() first.'
      );
    });
  });

  describe('System Information Tests', () => {
    it('should return correct system information', async () => {
      const uiSystem = UISystemCore.create();
      await uiSystem.initialize();

      const systemInfo = uiSystem.getSystemInfo();
      
      expect(systemInfo.name).toBe('xala-ui-system');
      expect(systemInfo.version).toBe('2.0.0');
      expect(systemInfo.defaultLanguage).toBe('nb-NO');
      expect(systemInfo.accessibility).toBe('enhanced');
      expect(systemInfo.componentCount).toBe(2); // Button and Input
      expect(systemInfo.themeCount).toBe(1); // default theme
    });
  });

  describe('Performance Tests', () => {
    it('should initialize within 100ms performance requirement', async () => {
      const startTime = Date.now();
      const uiSystem = UISystemCore.create();

      await uiSystem.initialize();
      const initTime = Date.now() - startTime;

      expect(initTime).toBeLessThan(100);
    });
  });

  describe('Component Registry Tests', () => {
    it('should register components successfully', async () => {
      const uiSystem = UISystemCore.create();
      await uiSystem.initialize();

      const mockComponent = {
        name: 'TestComponent',
        type: 'form' as const,
        props: { className: 'test' },
        state: {
          isLoading: false,
          isDisabled: false,
          isVisible: true,
          hasError: false,
          isFocused: false,
        },
        accessibility: { 'aria-label': 'Test' },
        theme: {
          name: 'default',
          colors: {
            primary: '#000',
            secondary: '#fff',
            success: '#0f0',
            warning: '#ff0',
            error: '#f00',
            info: '#00f',
            background: '#fff',
            surface: '#f5f5f5',
            text: '#000',
            border: '#ccc',
          },
          spacing: { sm: '8px', md: '16px', lg: '24px' },
          typography: { body: '16px', heading: '24px' },
          borderRadius: { sm: '4px', md: '8px' },
          shadows: { sm: '0 1px 2px rgba(0,0,0,0.1)' },
          breakpoints: { sm: '640px', md: '768px', lg: '1024px' },
        },
      };

      uiSystem.registerComponent('TestComponent', mockComponent);
      
      const retrieved = uiSystem.getComponent('TestComponent');
      expect(retrieved).toEqual(mockComponent);
    });

    it('should retrieve all components', async () => {
      const uiSystem = UISystemCore.create();
      await uiSystem.initialize();

      const allComponents = uiSystem.getAllComponents();
      expect(allComponents).toBeInstanceOf(Map);
      expect(allComponents.size).toBe(2); // Button and Input
      expect(allComponents.has('Button')).toBe(true);
      expect(allComponents.has('Input')).toBe(true);
    });
  });

  describe('Theme Registry Tests', () => {
    it('should register themes successfully', async () => {
      const uiSystem = UISystemCore.create();
      await uiSystem.initialize();

      const mockTheme = {
        name: 'custom-theme',
        colors: {
          primary: '#123456',
          secondary: '#654321',
          success: '#00ff00',
          warning: '#ffff00',
          error: '#ff0000',
          info: '#0000ff',
          background: '#ffffff',
          surface: '#f0f0f0',
          text: '#000000',
          border: '#cccccc',
        },
        spacing: { sm: '4px', md: '8px', lg: '16px' },
        typography: { body: '14px', heading: '20px' },
        borderRadius: { sm: '2px', md: '4px' },
        shadows: { sm: '0 1px 2px rgba(0,0,0,0.1)' },
        breakpoints: { sm: '640px', md: '768px', lg: '1024px' },
      };

      uiSystem.registerTheme('custom-theme', mockTheme);
      
      const retrieved = uiSystem.getTheme('custom-theme');
      expect(retrieved).toEqual(mockTheme);
    });

    it('should retrieve all themes', async () => {
      const uiSystem = UISystemCore.create();
      await uiSystem.initialize();

      const allThemes = uiSystem.getAllThemes();
      expect(allThemes).toBeInstanceOf(Map);
      expect(allThemes.size).toBe(1); // default theme
      expect(allThemes.has('default')).toBe(true);
    });
  });

  describe('Accessibility Tests', () => {
    it('should validate accessibility configuration', async () => {
      const uiSystem = UISystemCore.create();
      await uiSystem.initialize();

      expect(uiSystem.validateAccessibility('basic')).toBe(true);
      expect(uiSystem.validateAccessibility('enhanced')).toBe(true);
      expect(uiSystem.validateAccessibility('enterprise')).toBe(true);
      expect(uiSystem.validateAccessibility('invalid' as any)).toBe(false);
    });

    it('should get accessibility configuration', async () => {
      const uiSystem = UISystemCore.create({
        accessibility: 'enterprise',
      });
      await uiSystem.initialize();

      const accessibility = uiSystem.getAccessibilityConfig();
      expect(accessibility).toBe('enterprise');
    });
  });

  describe('Theme Management Tests', () => {
    it('should update theme configuration', async () => {
      const uiSystem = UISystemCore.create();
      await uiSystem.initialize();

      const newTheme = {
        mode: 'dark' as const,
        primary: '#ffffff',
        secondary: '#000000',
      };

      uiSystem.updateTheme(newTheme);
      
      const config = uiSystem.getConfig();
      expect(config.theme).toEqual(newTheme);
    });
  });

  describe('Factory Function Tests', () => {
    it('should create production UI system with correct configuration', async () => {
      const uiSystem = createProductionUISystem();

      await uiSystem.initialize();
      
      const config = uiSystem.getConfig();
      expect(config.name).toBe('production-ui-system');
      expect(config.defaultLanguage).toBe('en-US');
      expect(config.accessibility).toBe('enterprise');
      expect(config.development?.enableDebugMode).toBe(false);
      expect(config.development?.logLevel).toBe('error');
    });

    it('should create test UI system with correct configuration', async () => {
      const uiSystem = createTestUISystem();

      await uiSystem.initialize();
      
      const config = uiSystem.getConfig();
      expect(config.name).toBe('test-ui-system');
      expect(config.defaultLanguage).toBe('en-US');
      expect(config.accessibility).toBe('basic');
      expect(config.development?.enableDebugMode).toBe(true);
      expect(config.development?.logLevel).toBe('debug');
    });

    it('should create development UI system with correct configuration', async () => {
      const uiSystem = createDevelopmentUISystem();

      await uiSystem.initialize();
      
      const config = uiSystem.getConfig();
      expect(config.name).toBe('development-ui-system');
      expect(config.defaultLanguage).toBe('en-US');
      expect(config.accessibility).toBe('standard');
      expect(config.development?.enableDebugMode).toBe(true);
      expect(config.development?.logLevel).toBe('debug');
    });

    it('should create Norwegian UI system with correct configuration', async () => {
      const uiSystem = createNorwegianUISystem();

      await uiSystem.initialize();
      
      const config = uiSystem.getConfig();
      expect(config.name).toBe('norwegian-government-ui');
      expect(config.defaultLanguage).toBe('nb-NO');
      expect(config.accessibility).toBe('enterprise');
      expect(config.theme?.customTokens).toEqual({
        'gov-primary': '#1a365d',
        'gov-secondary': '#2d3748',
      });
    });
  });

  describe('Lifecycle Management Tests', () => {
    it('should support multiple initialization calls safely', async () => {
      const uiSystem = UISystemCore.create();

      // Multiple initialization calls should be safe
      await uiSystem.initialize();
      await uiSystem.initialize();

      // Should still work correctly
      const systemInfo = uiSystem.getSystemInfo();
      expect(systemInfo.componentCount).toBe(2);
      expect(systemInfo.themeCount).toBe(1);
    });

    it('should clean up resources on destroy', async () => {
      const uiSystem = UISystemCore.create();
      await uiSystem.initialize();

      // Register a component
      uiSystem.registerComponent('TestComponent', {
        name: 'Test',
        type: 'custom',
        props: {},
        state: {
          isLoading: false,
          isDisabled: false,
          isVisible: true,
          hasError: false,
          isFocused: false,
        },
        accessibility: {},
        theme: {
          name: 'test',
          colors: {
            primary: '#000',
            secondary: '#fff',
            success: '#0f0',
            warning: '#ff0',
            error: '#f00',
            info: '#00f',
            background: '#fff',
            surface: '#f5f5f5',
            text: '#000',
            border: '#ccc',
          },
          spacing: { sm: '8px', md: '16px', lg: '24px' },
          typography: { body: '16px', heading: '24px' },
          borderRadius: { sm: '4px', md: '8px' },
          shadows: { sm: '0 1px 2px rgba(0,0,0,0.1)' },
          breakpoints: { sm: '640px', md: '768px', lg: '1024px' },
        },
      });

      // Verify component was registered
      expect(uiSystem.getAllComponents().size).toBe(3);

      // Destroy should clean up
      uiSystem.destroy();

      // Registries should be cleared
      expect(uiSystem.getAllComponents().size).toBe(0);
      expect(uiSystem.getAllThemes().size).toBe(0);
    });
  });

  describe('Error Handling Tests', () => {
    it('should handle initialization errors gracefully', async () => {
      const uiSystem = UISystemCore.create();
      
      // Mock logger error to verify error handling
      const loggerSpy = jest.spyOn(console, 'error').mockImplementation();

      // Force an error by mocking a method to throw
      const originalInit = uiSystem['initializeThemeRegistry'];
      uiSystem['initializeThemeRegistry'] = jest.fn().mockRejectedValue(new Error('Test error'));

      await expect(uiSystem.initialize()).rejects.toThrow('Test error');

      // Restore
      uiSystem['initializeThemeRegistry'] = originalInit;
      loggerSpy.mockRestore();
    });
  });
});