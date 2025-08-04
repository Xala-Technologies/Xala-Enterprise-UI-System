/**
 * @fileoverview Generation Engine - Intelligent Code Generation
 * @description Advanced code generation with context awareness and pattern recognition
 * @version 6.0.0
 */

import { ProjectStructure } from './CoreAnalysisEngine.js';

export interface GenerationContext {
  readonly projectStructure: ProjectStructure;
  readonly targetFramework: string;
  readonly conventions: ProjectConventions;
  readonly preferences: GenerationPreferences;
}

export interface ProjectConventions {
  readonly naming: 'camelCase' | 'PascalCase' | 'kebab-case' | 'snake_case';
  readonly fileStructure: 'flat' | 'nested' | 'feature-based';
  readonly importStyle: 'relative' | 'absolute' | 'mixed';
  readonly testLocation: 'colocated' | 'separate' | 'test-directory';
  readonly storyLocation: 'colocated' | 'stories-directory';
}

export interface GenerationPreferences {
  readonly includeTests: boolean;
  readonly includeStories: boolean;
  readonly includeDocs: boolean;
  readonly useTypeScript: boolean;
  readonly accessibilityLevel: 'basic' | 'enhanced' | 'AAA';
  readonly performanceOptimization: boolean;
}

export interface GenerationResult {
  readonly success: boolean;
  readonly files: GeneratedFile[];
  readonly warnings: string[];
  readonly suggestions: string[];
}

export interface GeneratedFile {
  readonly path: string;
  readonly content: string;
  readonly type: 'component' | 'test' | 'story' | 'documentation' | 'config';
}

export class GenerationEngine {
  private context: GenerationContext;
  private templates: Map<string, string> = new Map();

  public constructor(context: GenerationContext) {
    this.context = context;
    this.loadTemplates();
  }

  /**
   * Generate component from natural language description
   */
  public async generateFromDescription(description: string, options: Record<string, unknown> = {}): Promise<GenerationResult> {
    const requirements = this.parseRequirements(description);
    const componentSpec = this.createComponentSpec(requirements);
    
    return this.generateComponent(componentSpec, options);
  }

  /**
   * Generate complete page structure
   */
  public async generatePage(pageSpec: PageSpec): Promise<GenerationResult> {
    const files: GeneratedFile[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Generate main page component
    const pageComponent = this.generatePageComponent(pageSpec);
    files.push(pageComponent);

    // Generate required sub-components
    for (const component of pageSpec.components) {
      const subComponent = await this.generateComponent(component);
      files.push(...subComponent.files);
      warnings.push(...subComponent.warnings);
      suggestions.push(...subComponent.suggestions);
    }

    // Generate routing configuration if needed
    if (pageSpec.routing) {
      const routingConfig = this.generateRoutingConfig(pageSpec);
      files.push(routingConfig);
    }

    // Generate SEO and metadata
    if (pageSpec.seo) {
      const seoConfig = this.generateSEOConfig(pageSpec);
      files.push(seoConfig);
    }

    return { success: true, files, warnings, suggestions };
  }

  /**
   * Generate project structure from scratch
   */
  public async generateProject(projectSpec: ProjectSpec): Promise<GenerationResult> {
    const files: GeneratedFile[] = [];
    
    // Generate package.json
    files.push(this.generatePackageJson(projectSpec));
    
    // Generate configuration files
    files.push(...this.generateConfigFiles(projectSpec));
    
    // Generate initial project structure
    files.push(...this.generateProjectStructure(projectSpec));
    
    // Generate initial components
    if (projectSpec.initialComponents) {
      for (const componentSpec of projectSpec.initialComponents) {
        const result = await this.generateComponent(componentSpec);
        files.push(...result.files);
      }
    }

    return { success: true, files, warnings: [], suggestions: [] };
  }

  /**
   * Generate component with full ecosystem
   */
  public async generateComponent(spec: ComponentSpec, _options: Record<string, unknown> = {}): Promise<GenerationResult> {
    const files: GeneratedFile[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Generate main component
    const component = this.generateComponentFile(spec);
    files.push(component);

    // Generate tests if requested
    if (this.context.preferences.includeTests) {
      const tests = this.generateTestFile(spec);
      files.push(tests);
    }

    // Generate stories if requested
    if (this.context.preferences.includeStories) {
      const stories = this.generateStoryFile(spec);
      files.push(stories);
    }

    // Generate documentation if requested
    if (this.context.preferences.includeDocs) {
      const docs = this.generateDocumentationFile(spec);
      files.push(docs);
    }

    // Add suggestions based on component complexity
    if (spec.complexity === 'high') {
      suggestions.push('Consider breaking this component into smaller, more focused components');
      suggestions.push('Add performance monitoring for this complex component');
    }

    return { success: true, files, warnings, suggestions };
  }

  private parseRequirements(description: string): ComponentRequirements {
    // Advanced NLP parsing would go here
    // For now, simple keyword extraction
    const requirements: ComponentRequirements = {
      name: this.extractComponentName(description),
      type: this.extractComponentType(description),
      props: this.extractProps(description),
      features: this.extractFeatures(description),
      styling: this.extractStyling(description),
      accessibility: this.extractAccessibility(description)
    };

    return requirements;
  }

  private createComponentSpec(requirements: ComponentRequirements): ComponentSpec {
    return {
      name: requirements.name,
      type: requirements.type,
      props: requirements.props,
      features: requirements.features,
      styling: requirements.styling,
      accessibility: requirements.accessibility,
      complexity: this.assessComplexity(requirements)
    };
  }

  private generateComponentFile(spec: ComponentSpec): GeneratedFile {
    const template = this.getTemplate('component');
    const content = this.processTemplate(template, {
      name: spec.name,
      props: spec.props,
      features: spec.features,
      imports: this.generateImports(spec),
      variants: this.generateVariants(spec),
      component: this.generateComponentBody(spec)
    });

    return {
      path: this.getComponentPath(spec.name),
      content,
      type: 'component'
    };
  }

  private generateImports(spec: ComponentSpec): string {
    const imports = ['React'];
    
    if (spec.features.includes('state')) {
      imports.push('{ useState }');
    }
    
    if (spec.features.includes('effects')) {
      imports.push('{ useEffect }');
    }

    // Add Xala UI System imports
    const xalaImports = this.getXalaImports(spec);
    if (xalaImports.length > 0) {
      imports.push(`{ ${xalaImports.join(', ')}, cn }`);
    }

    return `import ${imports[0]} from 'react';
${imports.length > 1 ? `import ${imports.slice(1).join(', ')} from 'react';` : ''}
import { ${xalaImports.join(', ')}, cn } from '@xala-technologies/ui-system';
import { cva, type VariantProps } from 'class-variance-authority';`;
  }

  private getXalaImports(spec: ComponentSpec): string[] {
    const imports: string[] = ['Container'];
    
    if (spec.type === 'button') imports.push('Button');
    if (spec.type === 'form') imports.push('Form', 'Input');
    if (spec.type === 'card') imports.push('Card');
    if (spec.features.includes('navigation')) imports.push('Navigation');
    if (spec.features.includes('data-display')) imports.push('DataTable', 'Typography');
    
    return imports;
  }

  private generateVariants(spec: ComponentSpec): string {
    const variants = {
      variant: {
        default: 'border-border bg-background hover:bg-accent hover:text-accent-foreground',
        primary: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 text-lg'
      }
    };

    return `const ${spec.name.toLowerCase()}Variants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: ${JSON.stringify(variants, null, 6)},
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);`;
  }

  private generateComponentBody(spec: ComponentSpec): string {
    const hasProps = spec.props.length > 0;
    const propsInterface = hasProps ? this.generatePropsInterface(spec) : '';
    const componentFunction = this.generateComponentFunction(spec);
    
    return `${propsInterface}

${componentFunction}`;
  }

  private generatePropsInterface(spec: ComponentSpec): string {
    const props = spec.props.map(prop => 
      `  ${prop.name}${prop.optional ? '?' : ''}: ${prop.type};`
    ).join('\n');

    return `export interface ${spec.name}Props extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ${spec.name.toLowerCase()}Variants> {
${props}
}`;
  }

  private generateComponentFunction(spec: ComponentSpec): string {
    const hasProps = spec.props.length > 0;
    const propsParam = hasProps ? `{ ${spec.props.map(p => p.name).join(', ')}, className, ...props }: ${spec.name}Props` : 'props: React.HTMLAttributes<HTMLDivElement>';
    
    return `export const ${spec.name} = React.forwardRef<HTMLDivElement, ${hasProps ? `${spec.name}Props` : 'React.HTMLAttributes<HTMLDivElement>'}>(
  (${propsParam}, ref) => {
    return (
      <Container
        ref={ref}
        className={cn(${spec.name.toLowerCase()}Variants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Container>
    );
  }
);

${spec.name}.displayName = "${spec.name}";`;
  }

  private loadTemplates(): void {
    // Load component templates
    this.templates.set('component', this.getComponentTemplate());
    this.templates.set('test', this.getTestTemplate());
    this.templates.set('story', this.getStoryTemplate());
  }

  private getTemplate(type: string): string {
    return this.templates.get(type) || '';
  }

  private processTemplate(template: string, variables: Record<string, unknown>): string {
    let processed = template;
    for (const [key, value] of Object.entries(variables)) {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      processed = processed.replace(placeholder, String(value));
    }
    return processed;
  }

  private getComponentTemplate(): string {
    return `/**
 * @fileoverview {{name}} Component - Generated by Xala UI System MCP
 * @description {{description}}
 * @version 6.0.0
 */

{{imports}}

{{variants}}

{{component}}`;
  }

  private getTestTemplate(): string {
    return `/**
 * @fileoverview {{name}} Component Tests
 */

import { render, screen } from '@testing-library/react';
import { {{name}} } from './{{name}}';

describe('{{name}}', () => {
  it('renders correctly', () => {
    render(<{{name}}>Test content</{{name}}>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<{{name}} className="custom-class">Test</{{name}}>);
    expect(screen.getByText('Test')).toHaveClass('custom-class');
  });
});`;
  }

  private getStoryTemplate(): string {
    return `/**
 * @fileoverview {{name}} Stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { {{name}} } from './{{name}}';

const meta: Meta<typeof {{name}}> = {
  title: 'Components/{{name}}',
  component: {{name}},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default {{name}}',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary {{name}}',
  },
};`;
  }

  // Helper methods for parsing requirements
  private extractComponentName(description: string): string {
    const match = description.match(/(?:create|build|generate)\s+(?:a\s+)?(\w+)/i);
    return match && match[1] ? this.toPascalCase(match[1]) : 'CustomComponent';
  }

  private extractComponentType(description: string): string {
    if (/button/i.test(description)) return 'button';
    if (/form/i.test(description)) return 'form';
    if (/card/i.test(description)) return 'card';
    if (/modal|dialog/i.test(description)) return 'modal';
    if (/table/i.test(description)) return 'table';
    return 'component';
  }

  private extractProps(description: string): PropInfo[] {
    // Simple prop extraction - would be more sophisticated in practice
    const props: PropInfo[] = [];
    
    if (/with\s+(\w+)\s+prop/i.test(description)) {
      const match = description.match(/with\s+(\w+)\s+prop/i);
      if (match) {
        props.push({
          name: match[1] || 'prop',
          type: 'string',
          optional: true
        });
      }
    }
    
    return props;
  }

  private extractFeatures(description: string): string[] {
    const features: string[] = [];
    
    if (/clickable|interactive/i.test(description)) features.push('interactive');
    if (/state|stateful/i.test(description)) features.push('state');
    if (/effect|side.effect/i.test(description)) features.push('effects');
    if (/navigation/i.test(description)) features.push('navigation');
    if (/data|table|list/i.test(description)) features.push('data-display');
    
    return features;
  }

  private extractStyling(description: string): string[] {
    const styling: string[] = [];
    
    if (/primary|main/i.test(description)) styling.push('primary');
    if (/secondary/i.test(description)) styling.push('secondary');
    if (/large|big/i.test(description)) styling.push('large');
    if (/small|compact/i.test(description)) styling.push('small');
    
    return styling;
  }

  private extractAccessibility(description: string): string[] {
    const accessibility: string[] = [];
    
    if (/accessible|a11y|accessibility/i.test(description)) accessibility.push('enhanced');
    if (/screen.reader/i.test(description)) accessibility.push('screen-reader');
    if (/keyboard/i.test(description)) accessibility.push('keyboard-navigation');
    
    return accessibility;
  }

  private assessComplexity(requirements: ComponentRequirements): 'low' | 'medium' | 'high' {
    const score = requirements.props.length + requirements.features.length;
    if (score < 3) return 'low';
    if (score < 6) return 'medium';
    return 'high';
  }

  private toPascalCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  private getComponentPath(name: string): string {
    const convention = this.context.conventions.fileStructure;
    const basePath = 'src/components';
    
    switch (convention) {
      case 'flat':
        return `${basePath}/${name}.tsx`;
      case 'nested':
        return `${basePath}/${name}/${name}.tsx`;
      case 'feature-based':
        return `${basePath}/${name.toLowerCase()}/${name}.tsx`;
      default:
        return `${basePath}/${name}.tsx`;
    }
  }

  // Placeholder implementations for other generation methods
  private generatePageComponent(pageSpec: PageSpec): GeneratedFile {
    return {
      path: `src/pages/${pageSpec.name}.tsx`,
      content: `// Generated page component for ${pageSpec.name}`,
      type: 'component'
    };
  }

  private generateRoutingConfig(_pageSpec: PageSpec): GeneratedFile {
    return {
      path: 'src/routes.tsx',
      content: `// Generated routing configuration`,
      type: 'config'
    };
  }

  private generateSEOConfig(pageSpec: PageSpec): GeneratedFile {
    return {
      path: `src/seo/${pageSpec.name}.ts`,
      content: `// Generated SEO configuration`,
      type: 'config'
    };
  }

  private generatePackageJson(projectSpec: ProjectSpec): GeneratedFile {
    return {
      path: 'package.json',
      content: JSON.stringify({
        name: projectSpec.name,
        version: '1.0.0',
        dependencies: {
          '@xala-technologies/ui-system': 'latest',
          'react': '^18.0.0'
        }
      }, null, 2),
      type: 'config'
    };
  }

  private generateConfigFiles(_projectSpec: ProjectSpec): GeneratedFile[] {
    return [
      {
        path: 'tsconfig.json',
        content: '// TypeScript configuration',
        type: 'config'
      }
    ];
  }

  private generateProjectStructure(_projectSpec: ProjectSpec): GeneratedFile[] {
    return [
      {
        path: 'src/index.tsx',
        content: '// Main application entry point',
        type: 'component'
      }
    ];
  }

  private generateTestFile(spec: ComponentSpec): GeneratedFile {
    const template = this.getTemplate('test');
    const content = this.processTemplate(template, { name: spec.name });
    
    return {
      path: this.getTestPath(spec.name),
      content,
      type: 'test'
    };
  }

  private generateStoryFile(spec: ComponentSpec): GeneratedFile {
    const template = this.getTemplate('story');
    const content = this.processTemplate(template, { name: spec.name });
    
    return {
      path: this.getStoryPath(spec.name),
      content,
      type: 'story'
    };
  }

  private generateDocumentationFile(spec: ComponentSpec): GeneratedFile {
    return {
      path: `docs/${spec.name}.md`,
      content: `# ${spec.name} Component\n\nGenerated documentation for ${spec.name}.`,
      type: 'documentation'
    };
  }

  private getTestPath(name: string): string {
    const convention = this.context.conventions.testLocation;
    switch (convention) {
      case 'colocated':
        return `${this.getComponentPath(name).replace('.tsx', '.test.tsx')}`;
      case 'test-directory':
        return `src/__tests__/${name}.test.tsx`;
      default:
        return `src/components/${name}.test.tsx`;
    }
  }

  private getStoryPath(name: string): string {
    const convention = this.context.conventions.storyLocation;
    switch (convention) {
      case 'colocated':
        return `${this.getComponentPath(name).replace('.tsx', '.stories.tsx')}`;
      case 'stories-directory':
        return `src/stories/${name}.stories.tsx`;
      default:
        return `src/components/${name}.stories.tsx`;
    }
  }
}

// Type definitions
interface ComponentRequirements {
  readonly name: string;
  readonly type: string;
  readonly props: PropInfo[];
  readonly features: string[];
  readonly styling: string[];
  readonly accessibility: string[];
}

interface ComponentSpec {
  readonly name: string;
  readonly type: string;
  readonly props: PropInfo[];
  readonly features: string[];
  readonly styling: string[];
  readonly accessibility: string[];
  readonly complexity: 'low' | 'medium' | 'high';
}

interface PropInfo {
  readonly name: string;
  readonly type: string;
  readonly optional: boolean;
}

interface PageSpec {
  readonly name: string;
  readonly type: string;
  readonly components: ComponentSpec[];
  readonly routing?: boolean;
  readonly seo?: boolean;
}

interface ProjectSpec {
  readonly name: string;
  readonly framework: string;
  readonly template: string;
  readonly features: string[];
  readonly initialComponents?: ComponentSpec[];
}
