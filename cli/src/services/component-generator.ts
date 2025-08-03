import { logger } from '../utils/logger.js';
import { TemplateEngine } from './template-engine.js';

export interface ComponentConfig {
  readonly type: string;
  readonly name: string;
  readonly platform: string;
  readonly output?: string;
  readonly template: string;
  readonly props: string;
  readonly features: ReadonlyArray<string>;
  readonly generateStory: boolean;
  readonly generateTest: boolean;
  readonly generateDocs: boolean;
}

export interface GenerationResult {
  readonly files: ReadonlyArray<GeneratedFile>;
  readonly importPath: string;
  readonly success: boolean;
}

export interface GeneratedFile {
  readonly path: string;
  readonly type: 'component' | 'story' | 'test' | 'docs' | 'types';
  readonly content: string;
}

export class ComponentGenerator {
  private readonly templateEngine: TemplateEngine;

  constructor() {
    this.templateEngine = new TemplateEngine();
  }

  async create(config: ComponentConfig): Promise<GenerationResult> {
    logger.info(`Creating ${config.type}: ${config.name}`);

    const files: GeneratedFile[] = [];

    try {
      // Generate main component file
      const componentFile = await this.generateComponentFile(config);
      files.push(componentFile);

      // Generate story file if requested
      if (config.generateStory) {
        const storyFile = await this.generateStoryFile(config);
        files.push(storyFile);
      }

      // Generate test file if requested
      if (config.generateTest) {
        const testFile = await this.generateTestFile(config);
        files.push(testFile);
      }

      // Generate documentation if requested
      if (config.generateDocs) {
        const docsFile = await this.generateDocsFile(config);
        files.push(docsFile);
      }

      // Generate type definitions if needed
      if (config.platform === 'typescript' || config.features.includes('typescript')) {
        const typesFile = await this.generateTypesFile(config);
        files.push(typesFile);
      }

      const importPath = this.getImportPath(config);

      return {
        files,
        importPath,
        success: true
      };

    } catch (error) {
      logger.error(`Failed to generate ${config.type}:`, error);
      throw error;
    }
  }

  private async generateComponentFile(config: ComponentConfig): Promise<GeneratedFile> {
    const templatePath = this.getTemplatePath(config.type, config.template, config.platform);
    const parsedProps = this.parseProps(config.props);
    
    const templateContext = {
      name: config.name,
      platform: config.platform,
      template: config.template,
      props: parsedProps,
      features: config.features,
      pascalCase: this.toPascalCase(config.name),
      camelCase: this.toCamelCase(config.name),
      kebabCase: this.toKebabCase(config.name),
      hasOptionalProps: parsedProps.some(p => p.optional),
      imports: this.generateImports(config),
      currentDate: new Date().toISOString()
    };

    const content = this.templateEngine.render(templatePath, templateContext);
    const filePath = this.getFilePath(config, 'component');

    return {
      path: filePath,
      type: 'component',
      content
    };
  }

  private async generateStoryFile(config: ComponentConfig): Promise<GeneratedFile> {
    const templatePath = 'stories/component-story.hbs';
    const parsedProps = this.parseProps(config.props);

    const templateContext = {
      name: config.name,
      platform: config.platform,
      props: parsedProps,
      features: config.features,
      pascalCase: this.toPascalCase(config.name),
      importPath: this.getRelativeImportPath(config),
      stories: this.generateStoryVariants(config, parsedProps)
    };

    const content = this.templateEngine.render(templatePath, templateContext);
    const filePath = this.getFilePath(config, 'story');

    return {
      path: filePath,
      type: 'story',
      content
    };
  }

  private async generateTestFile(config: ComponentConfig): Promise<GeneratedFile> {
    const templatePath = 'tests/component-test.hbs';
    const parsedProps = this.parseProps(config.props);

    const templateContext = {
      name: config.name,
      platform: config.platform,
      props: parsedProps,
      features: config.features,
      pascalCase: this.toPascalCase(config.name),
      importPath: this.getRelativeImportPath(config),
      tests: this.generateTestCases(config, parsedProps)
    };

    const content = this.templateEngine.render(templatePath, templateContext);
    const filePath = this.getFilePath(config, 'test');

    return {
      path: filePath,
      type: 'test',
      content
    };
  }

  private async generateDocsFile(config: ComponentConfig): Promise<GeneratedFile> {
    const templatePath = 'docs/component-docs.hbs';
    const parsedProps = this.parseProps(config.props);

    const templateContext = {
      name: config.name,
      platform: config.platform,
      props: parsedProps,
      features: config.features,
      pascalCase: this.toPascalCase(config.name),
      description: this.generateDescription(config),
      examples: this.generateExamples(config, parsedProps),
      currentDate: new Date().toLocaleDateString()
    };

    const content = this.templateEngine.render(templatePath, templateContext);
    const filePath = this.getFilePath(config, 'docs');

    return {
      path: filePath,
      type: 'docs',
      content
    };
  }

  private async generateTypesFile(config: ComponentConfig): Promise<GeneratedFile> {
    const templatePath = 'types/component-types.hbs';
    const parsedProps = this.parseProps(config.props);

    const templateContext = {
      name: config.name,
      props: parsedProps,
      pascalCase: this.toPascalCase(config.name),
      features: config.features
    };

    const content = this.templateEngine.render(templatePath, templateContext);
    const filePath = this.getFilePath(config, 'types');

    return {
      path: filePath,
      type: 'types',
      content
    };
  }

  private parseProps(propsString: string): Array<{
    name: string;
    type: string;
    optional: boolean;
    description?: string;
  }> {
    if (!propsString) return [];

    return propsString.split(',').map(prop => {
      const trimmed = prop.trim();
      const optional = trimmed.endsWith('?');
      const name = optional ? trimmed.slice(0, -1) : trimmed;
      
      // Infer type based on name
      let type = 'string';
      if (name.toLowerCase().includes('count') || name.toLowerCase().includes('size')) {
        type = 'number';
      } else if (name.toLowerCase().includes('enabled') || name.toLowerCase().includes('disabled')) {
        type = 'boolean';
      } else if (name.toLowerCase().includes('onclick') || name.toLowerCase().includes('onchange')) {
        type = '() => void';
      } else if (name === 'children') {
        type = 'React.ReactNode';
      }

      return {
        name,
        type,
        optional,
        description: this.generatePropDescription(name, type)
      };
    });
  }

  private generateImports(config: ComponentConfig): string {
    const imports = [];

    // Platform-specific imports
    switch (config.platform) {
      case 'react':
        imports.push("import React from 'react';");
        imports.push("import { Card, Stack, Typography, Button } from '@xala-technologies/ui-system';");
        imports.push("import { useTokens } from '@xala-technologies/ui-system';");
        imports.push("import { useLocalization } from '../hooks/useLocalization';");
        break;
      case 'vue':
        imports.push("import { Card, Stack, Typography, Button } from '@xala-technologies/ui-system';");
        imports.push("import { useTokens } from '@xala-technologies/ui-system';");
        imports.push("import { useLocalization } from '../composables/useLocalization';");
        break;
    }

    // Feature-specific imports
    if (config.features.includes('animations')) {
      imports.push("import { motion } from 'framer-motion';");
    }

    return imports.join('\n');
  }

  private generateStoryVariants(config: ComponentConfig, props: any[]): any[] {
    return [
      {
        name: 'Default',
        args: this.generateDefaultArgs(props)
      },
      {
        name: 'With All Props',
        args: this.generateFullArgs(props)
      },
      {
        name: 'Loading State',
        args: { ...this.generateDefaultArgs(props), loading: true }
      }
    ];
  }

  private generateTestCases(config: ComponentConfig, props: any[]): any[] {
    return [
      {
        name: 'renders correctly',
        type: 'render',
        props: this.generateDefaultArgs(props)
      },
      {
        name: 'handles user interactions',
        type: 'interaction',
        props: this.generateInteractionArgs(props)
      },
      {
        name: 'meets accessibility requirements',
        type: 'accessibility',
        props: this.generateDefaultArgs(props)
      }
    ];
  }

  private generateExamples(config: ComponentConfig, props: any[]): any[] {
    return [
      {
        title: 'Basic Usage',
        code: this.generateBasicExample(config, props)
      },
      {
        title: 'With Custom Props',
        code: this.generateAdvancedExample(config, props)
      }
    ];
  }

  private generateBasicExample(config: ComponentConfig, props: any[]): string {
    const componentName = this.toPascalCase(config.name);
    const basicProps = this.generateDefaultArgs(props);
    
    const propsString = Object.entries(basicProps)
      .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
      .join(' ');

    return `<${componentName} ${propsString} />`;
  }

  private generateAdvancedExample(config: ComponentConfig, props: any[]): string {
    const componentName = this.toPascalCase(config.name);
    const fullProps = this.generateFullArgs(props);
    
    const propsString = Object.entries(fullProps)
      .map(([key, value]) => `  ${key}={${JSON.stringify(value)}}`)
      .join('\n');

    return `<${componentName}\n${propsString}\n/>`;
  }

  private generateDefaultArgs(props: any[]): Record<string, any> {
    const args: Record<string, any> = {};
    
    props.forEach(prop => {
      if (!prop.optional) {
        switch (prop.type) {
          case 'string':
            args[prop.name] = `Sample ${prop.name}`;
            break;
          case 'number':
            args[prop.name] = 0;
            break;
          case 'boolean':
            args[prop.name] = false;
            break;
          case '() => void':
            args[prop.name] = '() => {}';
            break;
          default:
            args[prop.name] = null;
        }
      }
    });

    return args;
  }

  private generateFullArgs(props: any[]): Record<string, any> {
    const args: Record<string, any> = {};
    
    props.forEach(prop => {
      switch (prop.type) {
        case 'string':
          args[prop.name] = `Sample ${prop.name}`;
          break;
        case 'number':
          args[prop.name] = 42;
          break;
        case 'boolean':
          args[prop.name] = true;
          break;
        case '() => void':
          args[prop.name] = '() => console.log("clicked")';
          break;
        default:
          args[prop.name] = null;
      }
    });

    return args;
  }

  private generateInteractionArgs(props: any[]): Record<string, any> {
    const args = this.generateDefaultArgs(props);
    
    // Add interaction handlers
    props.forEach(prop => {
      if (prop.type === '() => void') {
        args[prop.name] = 'jest.fn()';
      }
    });

    return args;
  }

  private generateDescription(config: ComponentConfig): string {
    return `A ${config.template} ${config.type} component that follows Xala Design System guidelines.`;
  }

  private generatePropDescription(name: string, type: string): string {
    if (name === 'children') return 'Child elements to render';
    if (name.startsWith('on')) return `Handler for ${name.slice(2).toLowerCase()} events`;
    if (type === 'boolean') return `Whether the component is ${name}`;
    return `The ${name} of the component`;
  }

  private getTemplatePath(type: string, template: string, platform: string): string {
    return `${platform}/${type}-${template}.hbs`;
  }

  private getFilePath(config: ComponentConfig, fileType: string): string {
    const outputDir = config.output || `./src/${config.type}s`;
    const name = config.name;
    
    switch (fileType) {
      case 'component':
        return `${outputDir}/${name}/${name}.tsx`;
      case 'story':
        return `${outputDir}/${name}/${name}.stories.tsx`;
      case 'test':
        return `${outputDir}/${name}/${name}.test.tsx`;
      case 'docs':
        return `${outputDir}/${name}/${name}.md`;
      case 'types':
        return `${outputDir}/${name}/${name}.types.ts`;
      default:
        return `${outputDir}/${name}/${name}.tsx`;
    }
  }

  private getImportPath(config: ComponentConfig): string {
    return `./src/${config.type}s/${config.name}`;
  }

  private getRelativeImportPath(config: ComponentConfig): string {
    return `./${config.name}`;
  }

  // Utility methods
  private toPascalCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/[-_](.)/g, (_, c) => c.toUpperCase());
  }

  private toCamelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1).replace(/[-_](.)/g, (_, c) => c.toUpperCase());
  }

  private toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
}