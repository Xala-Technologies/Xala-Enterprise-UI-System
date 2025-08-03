/**
 * @fileoverview Platform Adapter Engine - Universal Design System to Platform-Specific Code Generation
 * @description Transforms universal design system specifications into platform-specific implementations
 * @version 1.0.0
 * @aiOptimized Designed for AI code generation tools to create stunning cross-platform designs
 */

import type { 
  UniversalTokenSchema, 
  ComponentSpecification, 
  PlatformAdapter, 
  TransformationResult 
} from '../types/universal-types';

// =============================================================================
// PLATFORM ADAPTER ENGINE
// =============================================================================

export class PlatformAdapterEngine {
  private adapters: Map<string, PlatformAdapter> = new Map();
  private transformationCache: Map<string, TransformationResult> = new Map();

  constructor() {
    this.registerDefaultAdapters();
  }

  // =============================================================================
  // PUBLIC API - AI-FRIENDLY METHODS
  // =============================================================================

  /**
   * Transform universal design system to platform-specific implementation
   * AI tools can use this to generate code for any platform
   */
  async transformToTarget(
    universalSystem: UniversalTokenSchema,
    targetPlatform: string,
    options: TransformationOptions = {}
  ): Promise<TransformationResult> {
    const cacheKey = `${universalSystem.id}-${targetPlatform}-${JSON.stringify(options)}`;
    
    if (this.transformationCache.has(cacheKey)) {
      return this.transformationCache.get(cacheKey)!;
    }

    const adapter = this.adapters.get(targetPlatform);
    if (!adapter) {
      throw new Error(`No adapter found for platform: ${targetPlatform}`);
    }

    const result = await adapter.transform(universalSystem, options);
    this.transformationCache.set(cacheKey, result);
    
    return result;
  }

  /**
   * Generate component code for specific platform
   * Perfect for AI tools to create platform-specific components
   */
  async generateComponent(
    componentSpec: ComponentSpecification,
    targetPlatform: string,
    props: Record<string, any> = {}
  ): Promise<string> {
    const adapter = this.adapters.get(targetPlatform);
    if (!adapter) {
      throw new Error(`No adapter found for platform: ${targetPlatform}`);
    }

    return adapter.generateComponentCode(componentSpec, props);
  }

  /**
   * Get available platforms for transformation
   * AI tools can use this to understand supported targets
   */
  getAvailablePlatforms(): string[] {
    return Array.from(this.adapters.keys());
  }

  /**
   * Get AI-optimized recommendations for platform
   * Helps AI choose the best patterns for each platform
   */
  getAIRecommendations(targetPlatform: string): AIRecommendations {
    const adapter = this.adapters.get(targetPlatform);
    return adapter?.getAIRecommendations() || this.getDefaultRecommendations();
  }

  // =============================================================================
  // ADAPTER REGISTRATION
  // =============================================================================

  registerAdapter(platform: string, adapter: PlatformAdapter): void {
    this.adapters.set(platform, adapter);
  }

  private registerDefaultAdapters(): void {
    // Register all built-in adapters
    this.registerAdapter('react', new ReactAdapter());
    this.registerAdapter('vue', new VueAdapter());
    this.registerAdapter('angular', new AngularAdapter());
    this.registerAdapter('svelte', new SvelteAdapter());
    this.registerAdapter('flutter', new FlutterAdapter());
    this.registerAdapter('ios-swift', new IOSSwiftAdapter());
    this.registerAdapter('android-kotlin', new AndroidKotlinAdapter());
    this.registerAdapter('css', new CSSAdapter());
    this.registerAdapter('tailwind', new TailwindAdapter());
  }

  private getDefaultRecommendations(): AIRecommendations {
    return {
      preferredComponents: ['Button', 'Card', 'Input', 'Container', 'Stack'],
      layoutPatterns: ['container-stack', 'card-grid', 'form-stack'],
      styling: 'tokens',
      accessibility: 'wcag-aa'
    };
  }
}

// =============================================================================
// REACT ADAPTER - Most Popular Platform
// =============================================================================

export class ReactAdapter implements PlatformAdapter {
  async transform(
    universalSystem: UniversalTokenSchema, 
    options: TransformationOptions
  ): Promise<TransformationResult> {
    return {
      platform: 'react',
      tokens: this.transformTokens(universalSystem.tokens),
      components: this.transformComponents(universalSystem.components),
      theme: this.generateThemeProvider(universalSystem),
      utils: this.generateUtilities(universalSystem),
      examples: this.generateAIOptimizedExamples(universalSystem)
    };
  }

  async generateComponentCode(
    spec: ComponentSpecification, 
    props: Record<string, any>
  ): Promise<string> {
    const { name, category, props: specProps, variants } = spec;
    
    // Generate TypeScript interface
    const propsInterface = this.generatePropsInterface(name, specProps);
    
    // Generate component implementation
    const componentImpl = this.generateComponentImplementation(name, spec, props);
    
    // Generate export statement
    const exportStatement = `export { ${name}, type ${name}Props };`;
    
    return `${propsInterface}\n\n${componentImpl}\n\n${exportStatement}`;
  }

  getAIRecommendations(): AIRecommendations {
    return {
      preferredComponents: ['Button', 'Card', 'Input', 'Container', 'Stack', 'Grid', 'Text'],
      layoutPatterns: ['container-stack', 'card-grid', 'form-stack', 'dashboard-layout'],
      styling: 'styled-components',
      accessibility: 'wcag-aa',
      patterns: {
        'form': {
          template: '<Stack direction="vertical" gap="md"><Input label="{{field}}" /><Button type="submit">Submit</Button></Stack>',
          components: ['Stack', 'Input', 'Button']
        },
        'card-list': {
          template: '<Grid cols="3" gap="lg">{items.map(item => <Card key={item.id}><Text variant="h3">{item.title}</Text><Text>{item.description}</Text></Card>)}</Grid>',
          components: ['Grid', 'Card', 'Text']
        },
        'dashboard': {
          template: '<Container><Stack direction="vertical" gap="xl"><Text variant="h1">Dashboard</Text><Grid cols="4" gap="lg"><Card>Stats</Card></Grid></Stack></Container>',
          components: ['Container', 'Stack', 'Text', 'Grid', 'Card']
        }
      }
    };
  }

  private transformTokens(tokens: any): Record<string, any> {
    return {
      // CSS Custom Properties for React
      cssVariables: this.generateCSSVariables(tokens),
      // JavaScript objects for runtime access
      jsTokens: this.generateJSTokens(tokens),
      // Styled-components theme
      styledTheme: this.generateStyledComponentsTheme(tokens)
    };
  }

  private transformComponents(components: Record<string, ComponentSpecification>): Record<string, string> {
    const result: Record<string, string> = {};
    
    Object.entries(components).forEach(([name, spec]) => {
      result[name] = this.generateReactComponent(spec);
    });
    
    return result;
  }

  private generatePropsInterface(name: string, props: Record<string, any>): string {
    const interfaceName = `${name}Props`;
    const propLines: string[] = [];
    
    Object.entries(props).forEach(([propName, propSpec]: [string, any]) => {
      const optional = propSpec.required === false ? '?' : '';
      const type = this.mapTypeToTypeScript(propSpec.type);
      const comment = propSpec.description ? `  /** ${propSpec.description} */\n` : '';
      
      propLines.push(`${comment}  readonly ${propName}${optional}: ${type};`);
    });
    
    return `interface ${interfaceName} {\n${propLines.join('\n')}\n}`;
  }

  private generateComponentImplementation(
    name: string, 
    spec: ComponentSpecification, 
    props: Record<string, any>
  ): string {
    const propsDestructuring = this.generatePropsDestructuring(spec.props);
    const componentBody = this.generateComponentBody(spec, props);
    
    return `export const ${name} = React.forwardRef<HTML${spec.category === 'form' ? 'Input' : 'Div'}Element, ${name}Props>(
  (${propsDestructuring}, ref) => {
    const { tokens } = useDesignSystem();
    
    ${componentBody}
  }
);

${name}.displayName = '${name}';`;
  }

  private generateReactComponent(spec: ComponentSpecification): string {
    // This would generate a complete React component based on the specification
    // For brevity, showing the structure
    return `
// Generated React Component: ${spec.name}
import React from 'react';
import { useDesignSystem } from '../hooks/useDesignSystem';

export const ${spec.name} = ({ children, variant = 'default', ...props }) => {
  const { tokens } = useDesignSystem();
  
  return (
    <div className={\`\${spec.name.toLowerCase()}-\${variant}\`} {...props}>
      {children}
    </div>
  );
};
    `.trim();
  }

  private generateCSSVariables(tokens: any): string {
    const cssVars: string[] = [];
    
    const processTokens = (obj: any, prefix: string = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          processTokens(value, `${prefix}${key}-`);
        } else {
          cssVars.push(`  --${prefix}${key}: ${value};`);
        }
      });
    };
    
    processTokens(tokens);
    
    return `:root {\n${cssVars.join('\n')}\n}`;
  }

  private generateJSTokens(tokens: any): Record<string, any> {
    return {
      colors: tokens.semantic?.color || {},
      spacing: tokens.semantic?.spacing || {},
      typography: tokens.semantic?.typography || {},
      primitive: tokens.primitive || {}
    };
  }

  private generateStyledComponentsTheme(tokens: any): Record<string, any> {
    return {
      colors: tokens.semantic?.color || {},
      space: tokens.primitive?.spacing || {},
      fonts: tokens.primitive?.typography?.fontFamily || {},
      fontSizes: tokens.primitive?.typography?.fontSize || {},
      radii: tokens.primitive?.borderRadius || {},
      shadows: tokens.primitive?.shadow || {}
    };
  }

  private generateThemeProvider(universalSystem: UniversalTokenSchema): string {
    return `
import React, { createContext, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const DesignSystemContext = createContext(null);

export const DesignSystemProvider = ({ children, theme }) => {
  return (
    <DesignSystemContext.Provider value={{ tokens: theme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </DesignSystemContext.Provider>
  );
};

export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within DesignSystemProvider');
  }
  return context;
};
    `.trim();
  }

  private generateUtilities(universalSystem: UniversalTokenSchema): Record<string, string> {
    return {
      'cn.ts': `
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
      `.trim(),
      'tokens.ts': `
export const tokens = ${JSON.stringify(universalSystem.tokens, null, 2)};
      `.trim()
    };
  }

  private generateAIOptimizedExamples(universalSystem: UniversalTokenSchema): Record<string, string> {
    return {
      'dashboard-example.tsx': `
import { Container, Stack, Text, Grid, Card, Button } from '@/components/ui';

export function DashboardExample() {
  return (
    <Container size="xl">
      <Stack direction="vertical" gap="xl">
        <Text variant="h1">Dashboard</Text>
        <Grid cols={{ base: 1, md: 2, lg: 4 }} gap="lg">
          <Card>
            <Stack direction="vertical" gap="md">
              <Text variant="h3">Revenue</Text>
              <Text variant="h2">$12,345</Text>
              <Button variant="outline" size="sm">View Details</Button>
            </Stack>
          </Card>
          {/* More cards... */}
        </Grid>
      </Stack>
    </Container>
  );
}
      `.trim(),
      'form-example.tsx': `
import { Card, Stack, Input, Button, Text } from '@/components/ui';

export function ContactForm() {
  return (
    <Card padding="xl">
      <Stack direction="vertical" gap="lg">
        <Text variant="h2">Contact Us</Text>
        <Stack direction="vertical" gap="md">
          <Input label="Name" required />
          <Input label="Email" type="email" required />
          <Input label="Message" multiline rows={4} />
          <Button type="submit" size="lg">Send Message</Button>
        </Stack>
      </Stack>
    </Card>
  );
}
      `.trim()
    };
  }

  private generatePropsDestructuring(props: Record<string, any>): string {
    const propNames = Object.keys(props);
    const destructuredProps = propNames
      .filter(name => name !== 'children')
      .map(name => {
        const spec = props[name];
        const defaultValue = spec.default !== undefined ? ` = ${JSON.stringify(spec.default)}` : '';
        return `${name}${defaultValue}`;
      });
    
    if (props.children) {
      destructuredProps.push('children');
    }
    
    destructuredProps.push('...restProps');
    
    return `{ ${destructuredProps.join(', ')} }`;
  }

  private generateComponentBody(spec: ComponentSpecification, props: Record<string, any>): string {
    const elementType = this.getElementType(spec.category);
    const className = `${spec.name.toLowerCase()}`;
    
    return `
    const styles = React.useMemo(() => ({
      // Dynamic styling based on tokens and props
      ...tokens.component.${spec.name.toLowerCase()}?.variants?.[variant] || {},
      ...tokens.component.${spec.name.toLowerCase()}?.sizing?.[size] || {}
    }), [variant, size, tokens]);

    return (
      <${elementType}
        ref={ref}
        className={cn('${className}', \`\${className}--\${variant}\`, className)}
        style={styles}
        {...restProps}
      >
        {children}
      </${elementType}>
    );`;
  }

  private getElementType(category: string): string {
    const elementMap: Record<string, string> = {
      'form': 'input',
      'layout': 'div',
      'navigation': 'nav',
      'feedback': 'div',
      'data-display': 'div',
      'overlay': 'div',
      'media': 'div'
    };
    
    return elementMap[category] || 'div';
  }

  private mapTypeToTypeScript(type: string): string {
    const typeMap: Record<string, string> = {
      'string': 'string',
      'number': 'number',
      'boolean': 'boolean',
      'array': 'Array<any>',
      'object': 'Record<string, any>',
      'function': '(...args: any[]) => any',
      'node': 'React.ReactNode',
      'element': 'React.ReactElement'
    };
    
    return typeMap[type] || 'any';
  }
}

// =============================================================================
// VUE ADAPTER
// =============================================================================

export class VueAdapter implements PlatformAdapter {
  async transform(universalSystem: UniversalTokenSchema, options: TransformationOptions): Promise<TransformationResult> {
    return {
      platform: 'vue',
      tokens: this.transformTokens(universalSystem.tokens),
      components: this.transformComponents(universalSystem.components),
      theme: this.generateThemeComposition(universalSystem),
      utils: this.generateUtilities(universalSystem),
      examples: this.generateVueExamples(universalSystem)
    };
  }

  async generateComponentCode(spec: ComponentSpecification, props: Record<string, any>): Promise<string> {
    const propsDefinition = this.generateVueProps(spec.props);
    const template = this.generateVueTemplate(spec);
    const script = this.generateVueScript(spec, propsDefinition);
    
    return `<template>\n${template}\n</template>\n\n<script setup lang="ts">\n${script}\n</script>`;
  }

  getAIRecommendations(): AIRecommendations {
    return {
      preferredComponents: ['Button', 'Card', 'Input', 'Container', 'Stack'],
      layoutPatterns: ['container-stack', 'card-grid', 'form-stack'],
      styling: 'css-modules',
      accessibility: 'wcag-aa',
      patterns: {
        'form': {
          template: '<Stack direction="vertical" gap="md"><Input :label="field" /><Button type="submit">Submit</Button></Stack>',
          components: ['Stack', 'Input', 'Button']
        }
      }
    };
  }

  private transformTokens(tokens: any): Record<string, any> {
    return {
      cssVariables: this.generateCSSVariables(tokens),
      composables: this.generateVueComposables(tokens)
    };
  }

  private transformComponents(components: Record<string, ComponentSpecification>): Record<string, string> {
    const result: Record<string, string> = {};
    Object.entries(components).forEach(([name, spec]) => {
      result[name] = this.generateVueComponent(spec);
    });
    return result;
  }

  private generateVueProps(props: Record<string, any>): string {
    const propLines: string[] = [];
    
    Object.entries(props).forEach(([propName, propSpec]: [string, any]) => {
      const type = this.mapTypeToVue(propSpec.type);
      const required = propSpec.required !== false;
      const defaultValue = propSpec.default !== undefined ? `, default: ${JSON.stringify(propSpec.default)}` : '';
      
      propLines.push(`  ${propName}: { type: ${type}, required: ${required}${defaultValue} }`);
    });
    
    return `{\n${propLines.join(',\n')}\n}`;
  }

  private generateVueTemplate(spec: ComponentSpecification): string {
    const elementType = this.getElementType(spec.category);
    const className = spec.name.toLowerCase();
    
    return `  <${elementType} :class="[\`${className}\`, \`${className}--\${variant}\`]" v-bind="$attrs">
    <slot />
  </${elementType}>`;
  }

  private generateVueScript(spec: ComponentSpecification, propsDefinition: string): string {
    return `import { computed } from 'vue';
import { useDesignSystem } from '../composables/useDesignSystem';

interface ${spec.name}Props {
  variant?: string;
  // ... other props
}

const props = defineProps<${spec.name}Props>();
const { tokens } = useDesignSystem();

const styles = computed(() => ({
  ...tokens.value.component.${spec.name.toLowerCase()}?.variants?.[props.variant] || {}
}));`;
  }

  private generateVueComponent(spec: ComponentSpecification): string {
    return `
<template>
  <div :class="classes" :style="styles">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDesignSystem } from '../composables/useDesignSystem';

interface Props {
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
});

const { tokens } = useDesignSystem();

const classes = computed(() => [
  '${spec.name.toLowerCase()}',
  \`${spec.name.toLowerCase()}--\${props.variant}\`
]);

const styles = computed(() => ({
  ...tokens.value.component.${spec.name.toLowerCase()}?.variants?.[props.variant]
}));
</script>
    `.trim();
  }

  private generateCSSVariables(tokens: any): string {
    // Same as React adapter
    return ':root { /* CSS variables */ }';
  }

  private generateVueComposables(tokens: any): Record<string, string> {
    return {
      'useDesignSystem.ts': `
import { ref, computed } from 'vue';

const tokens = ref(${JSON.stringify(tokens, null, 2)});

export function useDesignSystem() {
  return {
    tokens: computed(() => tokens.value)
  };
}
      `.trim()
    };
  }

  private generateThemeComposition(universalSystem: UniversalTokenSchema): string {
    return `
import { App } from 'vue';

export function createDesignSystem(tokens: any) {
  return {
    install(app: App) {
      app.provide('designSystem', { tokens });
    }
  };
}
    `.trim();
  }

  private generateUtilities(universalSystem: UniversalTokenSchema): Record<string, string> {
    return {
      'tokens.ts': `export const tokens = ${JSON.stringify(universalSystem.tokens, null, 2)};`
    };
  }

  private generateVueExamples(universalSystem: UniversalTokenSchema): Record<string, string> {
    return {
      'Dashboard.vue': `
<template>
  <Container size="xl">
    <Stack direction="vertical" gap="xl">
      <Text variant="h1">Dashboard</Text>
      <Grid :cols="{ base: 1, md: 2, lg: 4 }" gap="lg">
        <Card v-for="item in items" :key="item.id">
          <Text variant="h3">{{ item.title }}</Text>
        </Card>
      </Grid>
    </Stack>
  </Container>
</template>
      `.trim()
    };
  }

  private getElementType(category: string): string {
    const elementMap: Record<string, string> = {
      'form': 'input',
      'layout': 'div',
      'navigation': 'nav'
    };
    return elementMap[category] || 'div';
  }

  private mapTypeToVue(type: string): string {
    const typeMap: Record<string, string> = {
      'string': 'String',
      'number': 'Number',
      'boolean': 'Boolean',
      'array': 'Array',
      'object': 'Object',
      'function': 'Function'
    };
    return typeMap[type] || 'String';
  }
}

// =============================================================================
// FLUTTER ADAPTER - Mobile Platform
// =============================================================================

export class FlutterAdapter implements PlatformAdapter {
  async transform(universalSystem: UniversalTokenSchema, options: TransformationOptions): Promise<TransformationResult> {
    return {
      platform: 'flutter',
      tokens: this.transformTokens(universalSystem.tokens),
      components: this.transformComponents(universalSystem.components),
      theme: this.generateFlutterTheme(universalSystem),
      utils: this.generateDartUtilities(universalSystem),
      examples: this.generateFlutterExamples(universalSystem)
    };
  }

  async generateComponentCode(spec: ComponentSpecification, props: Record<string, any>): Promise<string> {
    const className = `${spec.name}Widget`;
    const constructor = this.generateFlutterConstructor(spec);
    const buildMethod = this.generateFlutterBuild(spec);
    
    return `
class ${className} extends StatelessWidget {
  ${constructor}
  
  @override
  Widget build(BuildContext context) {
    ${buildMethod}
  }
}
    `.trim();
  }

  getAIRecommendations(): AIRecommendations {
    return {
      preferredComponents: ['Button', 'Card', 'Input', 'Container', 'Stack'],
      layoutPatterns: ['column-layout', 'card-grid', 'form-column'],
      styling: 'material-theme',
      accessibility: 'flutter-semantics',
      patterns: {
        'form': {
          template: 'Column(children: [TextField(decoration: InputDecoration(labelText: "{{field}}")), ElevatedButton(onPressed: () {}, child: Text("Submit"))])',
          components: ['Column', 'TextField', 'ElevatedButton']
        }
      }
    };
  }

  private transformTokens(tokens: any): Record<string, any> {
    return {
      dartTheme: this.generateDartThemeData(tokens),
      colorPalette: this.generateFlutterColors(tokens.primitive?.color)
    };
  }

  private transformComponents(components: Record<string, ComponentSpecification>): Record<string, string> {
    const result: Record<string, string> = {};
    Object.entries(components).forEach(([name, spec]) => {
      result[name] = this.generateFlutterWidget(spec);
    });
    return result;
  }

  private generateFlutterConstructor(spec: ComponentSpecification): string {
    const props = Object.entries(spec.props)
      .map(([name, propSpec]: [string, any]) => {
        const optional = propSpec.required === false ? '' : 'required ';
        const type = this.mapTypeToDart(propSpec.type);
        return `${optional}this.${name}`;
      })
      .join(', ');
    
    return `const ${spec.name}Widget({Key? key, ${props}}) : super(key: key);`;
  }

  private generateFlutterBuild(spec: ComponentSpecification): string {
    const widget = this.getFlutterWidget(spec.category);
    
    return `
    final theme = Theme.of(context);
    
    return ${widget}(
      // Widget properties based on props
      child: child,
    );`;
  }

  private generateFlutterWidget(spec: ComponentSpecification): string {
    return `
class ${spec.name}Widget extends StatelessWidget {
  const ${spec.name}Widget({Key? key, required this.child}) : super(key: key);
  
  final Widget child;
  
  @override
  Widget build(BuildContext context) {
    return Container(
      child: child,
    );
  }
}
    `.trim();
  }

  private generateDartThemeData(tokens: any): string {
    return `
ThemeData(
  primarySwatch: MaterialColor(
    0xFF${tokens.semantic?.color?.brand?.primary?.replace('#', '') || '3B82F6'},
    <int, Color>{
      // Material color swatch
    },
  ),
  colorScheme: ColorScheme.fromSeed(
    seedColor: Color(0xFF${tokens.semantic?.color?.brand?.primary?.replace('#', '') || '3B82F6'}),
  ),
)
    `.trim();
  }

  private generateFlutterColors(colors: any): string {
    if (!colors) return 'const AppColors = {};';
    
    const colorEntries = Object.entries(colors)
      .map(([name, value]) => `  static const ${name} = Color(0xFF${String(value).replace('#', '')});`)
      .join('\n');
    
    return `class AppColors {\n${colorEntries}\n}`;
  }

  private generateFlutterTheme(universalSystem: UniversalTokenSchema): string {
    return `
import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: Colors.blue,
      ),
    );
  }
}
    `.trim();
  }

  private generateDartUtilities(universalSystem: UniversalTokenSchema): Record<string, string> {
    return {
      'tokens.dart': `
class DesignTokens {
  static const spacing = ${JSON.stringify(universalSystem.tokens.primitive?.spacing || {})};
  static const colors = AppColors();
}
      `.trim()
    };
  }

  private generateFlutterExamples(universalSystem: UniversalTokenSchema): Record<string, string> {
    return {
      'dashboard_screen.dart': `
class DashboardScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Dashboard')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            Text('Dashboard', style: Theme.of(context).textTheme.headlineLarge),
            SizedBox(height: 24),
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                children: [
                  Card(child: Padding(padding: EdgeInsets.all(16), child: Text('Metric 1'))),
                  Card(child: Padding(padding: EdgeInsets.all(16), child: Text('Metric 2'))),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
      `.trim()
    };
  }

  private getFlutterWidget(category: string): string {
    const widgetMap: Record<string, string> = {
      'form': 'TextField',
      'layout': 'Container',
      'navigation': 'NavigationBar'
    };
    return widgetMap[category] || 'Container';
  }

  private mapTypeToDart(type: string): string {
    const typeMap: Record<string, string> = {
      'string': 'String',
      'number': 'double',
      'boolean': 'bool',
      'array': 'List<dynamic>',
      'object': 'Map<String, dynamic>',
      'function': 'VoidCallback',
      'node': 'Widget'
    };
    return typeMap[type] || 'dynamic';
  }
}

// =============================================================================
// CSS ADAPTER - Universal Styling
// =============================================================================

export class CSSAdapter implements PlatformAdapter {
  async transform(universalSystem: UniversalTokenSchema, options: TransformationOptions): Promise<TransformationResult> {
    return {
      platform: 'css',
      tokens: this.transformTokens(universalSystem.tokens),
      components: this.transformComponents(universalSystem.components),
      theme: this.generateCSSTheme(universalSystem),
      utils: this.generateCSSUtilities(universalSystem),
      examples: this.generateCSSExamples(universalSystem)
    };
  }

  async generateComponentCode(spec: ComponentSpecification, props: Record<string, any>): Promise<string> {
    const baseClass = spec.name.toLowerCase();
    const variants = this.generateVariantClasses(spec, baseClass);
    const baseStyles = this.generateBaseStyles(spec, baseClass);
    
    return `${baseStyles}\n\n${variants}`;
  }

  getAIRecommendations(): AIRecommendations {
    return {
      preferredComponents: ['Button', 'Card', 'Input', 'Container', 'Stack'],
      layoutPatterns: ['container-grid', 'card-layout', 'form-layout'],
      styling: 'css-custom-properties',
      accessibility: 'wcag-aa'
    };
  }

  private transformTokens(tokens: any): Record<string, any> {
    return {
      cssVariables: this.generateCSSCustomProperties(tokens),
      utilities: this.generateUtilityClasses(tokens)
    };
  }

  private transformComponents(components: Record<string, ComponentSpecification>): Record<string, string> {
    const result: Record<string, string> = {};
    Object.entries(components).forEach(([name, spec]) => {
      result[name] = this.generateCSSComponent(spec);
    });
    return result;
  }

  private generateCSSCustomProperties(tokens: any): string {
    const vars: string[] = [];
    
    const processTokens = (obj: any, prefix: string = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          processTokens(value, `${prefix}${key}-`);
        } else {
          vars.push(`  --${prefix}${key}: ${value};`);
        }
      });
    };
    
    processTokens(tokens);
    
    return `:root {\n${vars.join('\n')}\n}`;
  }

  private generateUtilityClasses(tokens: any): string {
    const utilities: string[] = [];
    
    // Spacing utilities
    if (tokens.primitive?.spacing) {
      Object.entries(tokens.primitive.spacing).forEach(([key, value]) => {
        utilities.push(`.p-${key} { padding: ${value}; }`);
        utilities.push(`.m-${key} { margin: ${value}; }`);
      });
    }
    
    // Color utilities
    if (tokens.semantic?.color?.brand) {
      Object.entries(tokens.semantic.color.brand).forEach(([key, value]) => {
        utilities.push(`.text-${key} { color: ${value}; }`);
        utilities.push(`.bg-${key} { background-color: ${value}; }`);
      });
    }
    
    return utilities.join('\n');
  }

  private generateBaseStyles(spec: ComponentSpecification, baseClass: string): string {
    return `
.${baseClass} {
  /* Base styles for ${spec.name} */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-sans);
  font-weight: var(--font-weight-medium);
  transition: all 150ms ease-in-out;
}
    `.trim();
  }

  private generateVariantClasses(spec: ComponentSpecification, baseClass: string): string {
    const variants: string[] = [];
    
    Object.entries(spec.variants || {}).forEach(([variantName, variantSpec]: [string, any]) => {
      if (variantSpec.values) {
        variantSpec.values.forEach((value: string) => {
          variants.push(`
.${baseClass}--${value} {
  /* ${variantName}: ${value} */
  /* Styles would be generated based on token mappings */
}
          `.trim());
        });
      }
    });
    
    return variants.join('\n\n');
  }

  private generateCSSComponent(spec: ComponentSpecification): string {
    const baseClass = spec.name.toLowerCase();
    
    return `
/* ${spec.name} Component */
.${baseClass} {
  /* Component styles */
}

/* Variants */
.${baseClass}--primary {
  background-color: var(--color-brand-primary);
  color: var(--color-text-inverse);
}

.${baseClass}--secondary {
  background-color: var(--color-background-elevated);
  color: var(--color-text-primary);
}
    `.trim();
  }

  private generateCSSTheme(universalSystem: UniversalTokenSchema): string {
    return this.generateCSSCustomProperties(universalSystem.tokens);
  }

  private generateCSSUtilities(universalSystem: UniversalTokenSchema): Record<string, string> {
    return {
      'utilities.css': this.generateUtilityClasses(universalSystem.tokens),
      'reset.css': `
/* Modern CSS Reset */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
body { line-height: 1.5; -webkit-font-smoothing: antialiased; }
      `.trim()
    };
  }

  private generateCSSExamples(universalSystem: UniversalTokenSchema): Record<string, string> {
    return {
      'dashboard.css': `
.dashboard {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.dashboard__title {
  font-size: var(--text-h1-size);
  margin-bottom: var(--spacing-xl);
}

.dashboard__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}
      `.trim()
    };
  }
}

// Additional adapters (TailwindAdapter, AngularAdapter, etc.) would follow similar patterns...

// =============================================================================
// STUB ADAPTERS (for completeness)
// =============================================================================

export class TailwindAdapter implements PlatformAdapter {
  async transform(universalSystem: UniversalTokenSchema, options: TransformationOptions): Promise<TransformationResult> {
    // Generate Tailwind config from universal tokens
    return { platform: 'tailwind', tokens: {}, components: {}, theme: '', utils: {}, examples: {} };
  }
  
  async generateComponentCode(spec: ComponentSpecification, props: Record<string, any>): Promise<string> {
    return `<!-- Tailwind component classes for ${spec.name} -->`;
  }
  
  getAIRecommendations(): AIRecommendations {
    return { preferredComponents: [], layoutPatterns: [], styling: 'tailwind', accessibility: 'wcag-aa' };
  }
}

export class AngularAdapter implements PlatformAdapter {
  async transform(universalSystem: UniversalTokenSchema, options: TransformationOptions): Promise<TransformationResult> {
    return { platform: 'angular', tokens: {}, components: {}, theme: '', utils: {}, examples: {} };
  }
  
  async generateComponentCode(spec: ComponentSpecification, props: Record<string, any>): Promise<string> {
    return `// Angular component for ${spec.name}`;
  }
  
  getAIRecommendations(): AIRecommendations {
    return { preferredComponents: [], layoutPatterns: [], styling: 'angular-material', accessibility: 'wcag-aa' };
  }
}

export class SvelteAdapter implements PlatformAdapter {
  async transform(universalSystem: UniversalTokenSchema, options: TransformationOptions): Promise<TransformationResult> {
    return { platform: 'svelte', tokens: {}, components: {}, theme: '', utils: {}, examples: {} };
  }
  
  async generateComponentCode(spec: ComponentSpecification, props: Record<string, any>): Promise<string> {
    return `<!-- Svelte component for ${spec.name} -->`;
  }
  
  getAIRecommendations(): AIRecommendations {
    return { preferredComponents: [], layoutPatterns: [], styling: 'svelte-scoped', accessibility: 'wcag-aa' };
  }
}

export class IOSSwiftAdapter implements PlatformAdapter {
  async transform(universalSystem: UniversalTokenSchema, options: TransformationOptions): Promise<TransformationResult> {
    return { platform: 'ios-swift', tokens: {}, components: {}, theme: '', utils: {}, examples: {} };
  }
  
  async generateComponentCode(spec: ComponentSpecification, props: Record<string, any>): Promise<string> {
    return `// iOS SwiftUI component for ${spec.name}`;
  }
  
  getAIRecommendations(): AIRecommendations {
    return { preferredComponents: [], layoutPatterns: [], styling: 'swiftui', accessibility: 'ios-accessibility' };
  }
}

export class AndroidKotlinAdapter implements PlatformAdapter {
  async transform(universalSystem: UniversalTokenSchema, options: TransformationOptions): Promise<TransformationResult> {
    return { platform: 'android-kotlin', tokens: {}, components: {}, theme: '', utils: {}, examples: {} };
  }
  
  async generateComponentCode(spec: ComponentSpecification, props: Record<string, any>): Promise<string> {
    return `// Android Compose component for ${spec.name}`;
  }
  
  getAIRecommendations(): AIRecommendations {
    return { preferredComponents: [], layoutPatterns: [], styling: 'material-design', accessibility: 'android-accessibility' };
  }
}

// =============================================================================
// TYPES
// =============================================================================

export interface TransformationOptions {
  target?: 'development' | 'production';
  features?: string[];
  optimization?: boolean;
  accessibility?: 'wcag-a' | 'wcag-aa' | 'wcag-aaa';
}

export interface TransformationResult {
  platform: string;
  tokens: Record<string, any>;
  components: Record<string, string>;
  theme: string;
  utils: Record<string, string>;
  examples: Record<string, string>;
}

export interface PlatformAdapter {
  transform(universalSystem: UniversalTokenSchema, options: TransformationOptions): Promise<TransformationResult>;
  generateComponentCode(spec: ComponentSpecification, props: Record<string, any>): Promise<string>;
  getAIRecommendations(): AIRecommendations;
}

export interface AIRecommendations {
  preferredComponents: string[];
  layoutPatterns: string[];
  styling: string;
  accessibility: string;
  patterns?: Record<string, {
    template: string;
    components: string[];
  }>;
}