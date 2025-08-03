#!/usr/bin/env node

/**
 * Xala UI System MCP Server
 * Comprehensive component generation server for Xala UI System v5.0.0
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { ComponentGenerator } from './generators/ComponentGenerator.js';
import { TemplateManager } from './templates/TemplateManager.js';
import { ComponentConfig, GenerationContext } from './types/index.js';

// Zod schemas for validation
const ComponentConfigSchema = z.object({
  name: z.string().min(1),
  category: z.enum(['layout', 'navigation', 'form', 'data-display', 'feedback', 'interactive', 'specialized', 'page-template']),
  variant: z.string().optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  theme: z.enum(['enterprise', 'finance', 'healthcare', 'education', 'ecommerce', 'productivity', 'oslo', 'bergen', 'drammen']).optional(),
  locale: z.enum(['en', 'no', 'fr', 'ar']).optional(),
  features: z.object({
    interactive: z.boolean().optional(),
    animated: z.boolean().optional(),
    searchable: z.boolean().optional(),
    sortable: z.boolean().optional(),
    filterable: z.boolean().optional(),
    paginated: z.boolean().optional(),
    selectable: z.boolean().optional(),
    draggable: z.boolean().optional(),
    resizable: z.boolean().optional(),
    collapsible: z.boolean().optional(),
    tooltips: z.boolean().optional(),
    icons: z.boolean().optional(),
    badges: z.boolean().optional(),
    loading: z.boolean().optional(),
    error: z.boolean().optional(),
    validation: z.boolean().optional(),
  }),
  styling: z.object({
    variant: z.enum(['default', 'outline', 'ghost', 'destructive', 'secondary']),
    colorScheme: z.enum(['light', 'dark', 'auto']).optional(),
    borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'full']).optional(),
    shadow: z.enum(['none', 'sm', 'md', 'lg', 'xl']).optional(),
    spacing: z.enum(['compact', 'comfortable', 'spacious']).optional(),
  }),
  accessibility: z.object({
    level: z.enum(['AA', 'AAA']),
    screenReader: z.boolean(),
    keyboardNavigation: z.boolean(),
    highContrast: z.boolean(),
    reducedMotion: z.boolean(),
    focusManagement: z.boolean(),
    ariaLabels: z.boolean(),
  }),
  responsive: z.object({
    breakpoints: z.array(z.enum(['mobile', 'tablet', 'desktop', 'wide', 'ultra'])),
    mobileFirst: z.boolean(),
    adaptiveLayout: z.boolean(),
    touchOptimized: z.boolean(),
    fluidTypography: z.boolean(),
  }),
});

const GenerationContextSchema = z.object({
  projectPath: z.string().optional(),
  outputPath: z.string().optional(),
  overwrite: z.boolean().optional(),
  format: z.boolean().optional(),
  addTests: z.boolean().optional(),
  addStories: z.boolean().optional(),
  addDocs: z.boolean().optional(),
});

class XalaUISystemMCPServer {
  private server: Server;
  private componentGenerator: ComponentGenerator;
  private templateManager: TemplateManager;

  constructor() {
    this.server = new Server(
      {
        name: 'xala-ui-system-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.componentGenerator = new ComponentGenerator();
    this.templateManager = new TemplateManager();
    this.setupToolHandlers();
  }

  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'generate_component',
            description: 'Generate a React component using Xala UI System with full TypeScript, accessibility, and localization support',
            inputSchema: {
              type: 'object',
              properties: {
                config: {
                  type: 'object',
                  description: 'Component configuration',
                },
                context: {
                  type: 'object',
                  description: 'Generation context and options',
                },
              },
              required: ['config'],
            },
          },
          {
            name: 'generate_layout',
            description: 'Generate a complete layout component (Admin, Web, Desktop, Mobile, Tablet)',
            inputSchema: {
              type: 'object',
              properties: {
                layoutType: {
                  type: 'string',
                  enum: ['admin', 'web', 'desktop', 'mobile', 'tablet', 'base'],
                  description: 'Type of layout to generate',
                },
                name: {
                  type: 'string',
                  description: 'Name of the layout component',
                },
                features: {
                  type: 'object',
                  description: 'Layout features (sidebar, header, footer, navigation)',
                },
                theme: {
                  type: 'string',
                  enum: ['enterprise', 'finance', 'healthcare', 'education', 'ecommerce', 'productivity'],
                  description: 'Industry theme',
                },
              },
              required: ['layoutType', 'name'],
            },
          },
          {
            name: 'generate_page_template',
            description: 'Generate a complete page template (Dashboard, Landing, Auth, Profile, Settings, etc.)',
            inputSchema: {
              type: 'object',
              properties: {
                template: {
                  type: 'string',
                  enum: ['dashboard', 'landing', 'auth', 'profile', 'settings', 'analytics', 'user-management', 'content-management', 'e-commerce', 'blog'],
                  description: 'Type of page template',
                },
                name: {
                  type: 'string',
                  description: 'Name of the page component',
                },
                sections: {
                  type: 'array',
                  description: 'Page sections to include',
                },
                data: {
                  type: 'object',
                  description: 'Sample data for the template',
                },
              },
              required: ['template', 'name'],
            },
          },
          {
            name: 'generate_form',
            description: 'Generate a complete form with validation, accessibility, and localization',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Name of the form component',
                },
                fields: {
                  type: 'array',
                  description: 'Form fields configuration',
                },
                validation: {
                  type: 'object',
                  description: 'Validation configuration',
                },
                submission: {
                  type: 'object',
                  description: 'Form submission configuration',
                },
              },
              required: ['name', 'fields'],
            },
          },
          {
            name: 'generate_data_table',
            description: 'Generate a data table with sorting, filtering, pagination, and actions',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Name of the table component',
                },
                columns: {
                  type: 'array',
                  description: 'Table columns configuration',
                },
                features: {
                  type: 'object',
                  description: 'Table features (sorting, filtering, pagination, etc.)',
                },
                actions: {
                  type: 'array',
                  description: 'Row actions configuration',
                },
              },
              required: ['name', 'columns'],
            },
          },
          {
            name: 'generate_navigation',
            description: 'Generate navigation components (Navbar, Sidebar, Breadcrumb, Tabs)',
            inputSchema: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['navbar', 'sidebar', 'breadcrumb', 'tabs', 'pagination'],
                  description: 'Type of navigation component',
                },
                name: {
                  type: 'string',
                  description: 'Name of the navigation component',
                },
                items: {
                  type: 'array',
                  description: 'Navigation items configuration',
                },
                features: {
                  type: 'object',
                  description: 'Navigation features (search, user menu, theme switcher, etc.)',
                },
              },
              required: ['type', 'name'],
            },
          },
          {
            name: 'list_templates',
            description: 'List all available component templates with descriptions and examples',
            inputSchema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  enum: ['layout', 'navigation', 'form', 'data-display', 'feedback', 'interactive', 'specialized', 'page-template', 'all'],
                  description: 'Filter templates by category',
                },
              },
            },
          },
          {
            name: 'get_template_config',
            description: 'Get the default configuration for a specific template',
            inputSchema: {
              type: 'object',
              properties: {
                templateName: {
                  type: 'string',
                  description: 'Name of the template',
                },
              },
              required: ['templateName'],
            },
          },
          {
            name: 'validate_config',
            description: 'Validate a component configuration before generation',
            inputSchema: {
              type: 'object',
              properties: {
                config: {
                  type: 'object',
                  description: 'Component configuration to validate',
                },
              },
              required: ['config'],
            },
          },
          {
            name: 'generate_complete_project',
            description: 'Generate a complete project structure with multiple components, layouts, and pages',
            inputSchema: {
              type: 'object',
              properties: {
                projectName: {
                  type: 'string',
                  description: 'Name of the project',
                },
                projectType: {
                  type: 'string',
                  enum: ['saas', 'admin-dashboard', 'marketing-site', 'e-commerce', 'blog', 'portfolio'],
                  description: 'Type of project to generate',
                },
                features: {
                  type: 'array',
                  description: 'Project features to include',
                },
                theme: {
                  type: 'string',
                  description: 'Project theme',
                },
              },
              required: ['projectName', 'projectType'],
            },
          },
        ] as Tool[],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'generate_component':
            return await this.handleGenerateComponent(args);
          case 'generate_layout':
            return await this.handleGenerateLayout(args);
          case 'generate_page_template':
            return await this.handleGeneratePageTemplate(args);
          case 'generate_form':
            return await this.handleGenerateForm(args);
          case 'generate_data_table':
            return await this.handleGenerateDataTable(args);
          case 'generate_navigation':
            return await this.handleGenerateNavigation(args);
          case 'list_templates':
            return await this.handleListTemplates(args);
          case 'get_template_config':
            return await this.handleGetTemplateConfig(args);
          case 'validate_config':
            return await this.handleValidateConfig(args);
          case 'generate_complete_project':
            return await this.handleGenerateCompleteProject(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  private async handleGenerateComponent(args: any) {
    const { config, context } = args;
    const validatedConfig = ComponentConfigSchema.parse(config);
    const validatedContext = context ? GenerationContextSchema.parse(context) : {};

    const result = await this.componentGenerator.generateComponent(validatedConfig);

    return {
      content: [
        {
          type: 'text',
          text: `# Generated Component: ${validatedConfig.name}\n\n## Component Code\n\n\`\`\`tsx\n${result.componentCode}\n\`\`\`\n\n## Types\n\n\`\`\`typescript\n${result.typesCode}\n\`\`\`\n\n## Localization Keys\n\n\`\`\`json\n${JSON.stringify(result.localizationKeys, null, 2)}\n\`\`\`\n\n## Dependencies\n\n${result.dependencies.map(dep => `- ${dep}`).join('\n')}\n\n## Files Generated\n\n${result.files.map(file => `- ${file.path} (${file.type})`).join('\n')}`,
        },
      ],
    };
  }

  private async handleGenerateLayout(args: any) {
    const layoutConfig = {
      name: args.name,
      category: 'layout' as const,
      layoutType: args.layoutType,
      features: args.features || {},
      styling: {
        variant: 'default' as const,
      },
      accessibility: {
        level: 'AAA' as const,
        screenReader: true,
        keyboardNavigation: true,
        highContrast: false,
        reducedMotion: false,
        focusManagement: true,
        ariaLabels: true,
      },
      responsive: {
        breakpoints: ['mobile', 'tablet', 'desktop'] as Array<'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultra'>,
        mobileFirst: true,
        adaptiveLayout: true,
        touchOptimized: true,
        fluidTypography: true,
      },
      theme: args.theme || 'enterprise',
      sections: [],
    };

    const result = await this.componentGenerator.generateLayout(layoutConfig);

    return {
      content: [
        {
          type: 'text',
          text: `# Generated Layout: ${args.name}\n\n## Layout Code\n\n\`\`\`tsx\n${result.componentCode}\n\`\`\`\n\n## Files Generated\n\n${result.files.map(file => `- ${file.path} (${file.type})`).join('\n')}`,
        },
      ],
    };
  }

  private async handleGeneratePageTemplate(args: any) {
    const pageConfig = {
      name: args.name,
      category: 'page-template' as const,
      template: args.template,
      sections: args.sections || [],
      data: args.data || {},
      styling: {
        variant: 'default' as const,
      },
      accessibility: {
        level: 'AAA' as const,
        screenReader: true,
        keyboardNavigation: true,
        highContrast: false,
        reducedMotion: false,
        focusManagement: true,
        ariaLabels: true,
      },
      responsive: {
        breakpoints: ['mobile', 'tablet', 'desktop'] as Array<'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultra'>,
        mobileFirst: true,
        adaptiveLayout: true,
        touchOptimized: true,
        fluidTypography: true,
      },
      features: {},
      layout: {} as any,
    };

    const result = await this.componentGenerator.generatePageTemplate(pageConfig);

    return {
      content: [
        {
          type: 'text',
          text: `# Generated Page Template: ${args.name}\n\n## Page Code\n\n\`\`\`tsx\n${result.componentCode}\n\`\`\`\n\n## Files Generated\n\n${result.files.map(file => `- ${file.path} (${file.type})`).join('\n')}`,
        },
      ],
    };
  }

  private async handleGenerateForm(args: any) {
    const formConfig = {
      name: args.name,
      category: 'form' as const,
      fields: args.fields,
      validation: args.validation || { realTime: true, showErrors: true, errorPosition: 'inline' },
      submission: args.submission || { method: 'POST', endpoint: '/api/submit' },
      styling: {
        variant: 'default' as const,
      },
      accessibility: {
        level: 'AAA' as const,
        screenReader: true,
        keyboardNavigation: true,
        highContrast: false,
        reducedMotion: false,
        focusManagement: true,
        ariaLabels: true,
      },
      responsive: {
        breakpoints: ['mobile', 'tablet', 'desktop'] as Array<'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultra'>,
        mobileFirst: true,
        adaptiveLayout: true,
        touchOptimized: true,
        fluidTypography: true,
      },
      features: {
        validation: true,
      },
    };

    const result = await this.componentGenerator.generateForm(formConfig);

    return {
      content: [
        {
          type: 'text',
          text: `# Generated Form: ${args.name}\n\n## Form Code\n\n\`\`\`tsx\n${result.componentCode}\n\`\`\`\n\n## Files Generated\n\n${result.files.map(file => `- ${file.path} (${file.type})`).join('\n')}`,
        },
      ],
    };
  }

  private async handleGenerateDataTable(args: any) {
    const tableConfig = {
      name: args.name,
      category: 'data-display' as const,
      columns: args.columns,
      features: args.features || { sorting: true, filtering: true, pagination: true, selection: false, search: true, export: false },
      actions: args.actions || [],
      styling: {
        variant: 'default' as const,
      },
      accessibility: {
        level: 'AAA' as const,
        screenReader: true,
        keyboardNavigation: true,
        highContrast: false,
        reducedMotion: false,
        focusManagement: true,
        ariaLabels: true,
      },
      responsive: {
        breakpoints: ['mobile', 'tablet', 'desktop'] as Array<'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultra'>,
        mobileFirst: true,
        adaptiveLayout: true,
        touchOptimized: true,
        fluidTypography: true,
      },
    };

    const result = await this.componentGenerator.generateDataTable(tableConfig);

    return {
      content: [
        {
          type: 'text',
          text: `# Generated Data Table: ${args.name}\n\n## Table Code\n\n\`\`\`tsx\n${result.componentCode}\n\`\`\`\n\n## Files Generated\n\n${result.files.map(file => `- ${file.path} (${file.type})`).join('\n')}`,
        },
      ],
    };
  }

  private async handleGenerateNavigation(args: any) {
    const navConfig = {
      name: args.name,
      category: 'navigation' as const,
      type: args.type,
      items: args.items || [],
      features: args.features || {},
      styling: {
        variant: 'default' as const,
      },
      accessibility: {
        level: 'AAA' as const,
        screenReader: true,
        keyboardNavigation: true,
        highContrast: false,
        reducedMotion: false,
        focusManagement: true,
        ariaLabels: true,
      },
      responsive: {
        breakpoints: ['mobile', 'tablet', 'desktop'] as Array<'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultra'>,
        mobileFirst: true,
        adaptiveLayout: true,
        touchOptimized: true,
        fluidTypography: true,
      },
    };

    const result = await this.componentGenerator.generateNavigation(navConfig);

    return {
      content: [
        {
          type: 'text',
          text: `# Generated Navigation: ${args.name}\n\n## Navigation Code\n\n\`\`\`tsx\n${result.componentCode}\n\`\`\`\n\n## Files Generated\n\n${result.files.map(file => `- ${file.path} (${file.type})`).join('\n')}`,
        },
      ],
    };
  }

  private async handleListTemplates(args: any) {
    const templates = this.templateManager.listTemplates(args.category || 'all');
    
    const templateList = templates.map(template => 
      `## ${template.name}\n**Category:** ${template.category}\n**Description:** ${template.description}\n**Required Features:** ${template.requiredFeatures.join(', ')}\n`
    ).join('\n');

    return {
      content: [
        {
          type: 'text',
          text: `# Available Templates\n\n${templateList}`,
        },
      ],
    };
  }

  private async handleGetTemplateConfig(args: any) {
    const template = this.templateManager.getTemplate(args.templateName);
    
    if (!template) {
      throw new Error(`Template not found: ${args.templateName}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: `# Template Configuration: ${template.name}\n\n\`\`\`json\n${JSON.stringify(template.defaultConfig, null, 2)}\n\`\`\`\n\n**Description:** ${template.description}\n**Required Features:** ${template.requiredFeatures.join(', ')}`,
        },
      ],
    };
  }

  private async handleValidateConfig(args: any) {
    try {
      const validatedConfig = ComponentConfigSchema.parse(args.config);
      return {
        content: [
          {
            type: 'text',
            text: `✅ Configuration is valid!\n\n\`\`\`json\n${JSON.stringify(validatedConfig, null, 2)}\n\`\`\``,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Configuration validation failed:\n\n${error instanceof Error ? error.message : 'Unknown validation error'}`,
          },
        ],
        isError: true,
      };
    }
  }

  private async handleGenerateCompleteProject(args: any) {
    // This would generate a complete project structure
    // For now, return a placeholder
    return {
      content: [
        {
          type: 'text',
          text: `# Complete Project Generation: ${args.projectName}\n\nProject Type: ${args.projectType}\nTheme: ${args.theme || 'enterprise'}\n\n🚧 Complete project generation is coming soon! This will generate:\n\n- Project structure\n- Multiple layouts\n- Page templates\n- Components\n- Navigation\n- Forms\n- Data tables\n- Localization files\n- Tests\n- Storybook stories\n- Documentation`,
        },
      ],
    };
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Xala UI System MCP Server running on stdio');
  }
}

const server = new XalaUISystemMCPServer();
server.run().catch(console.error);
