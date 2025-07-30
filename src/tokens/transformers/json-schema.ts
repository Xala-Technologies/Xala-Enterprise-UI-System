/**
 * JSON Schema Transformer for Design Tokens
 * Generates JSON Schema for token validation and documentation
 */

import type { TokenSystem, TokenTransformer } from './typescript-types';

// =============================================================================
// JSON SCHEMA TRANSFORMER INTERFACES
// =============================================================================

export interface JSONSchemaOptions {
  /** Schema draft version */
  draft?: '07' | '2019-09' | '2020-12';
  /** Whether to include examples in the schema */
  includeExamples?: boolean;
  /** Whether to include descriptions */
  includeDescriptions?: boolean;
  /** Whether to make all properties required */
  strictRequired?: boolean;
  /** Custom schema ID */
  schemaId?: string;
  /** Whether to generate separate schemas for each token category */
  splitSchemas?: boolean;
}

export interface JSONSchemaResult {
  schema: Record<string, unknown>;
  schemas?: Record<string, Record<string, unknown>>;
  full: string;
}

// =============================================================================
// JSON SCHEMA TRANSFORMER
// =============================================================================

export class JSONSchemaTransformer implements TokenTransformer<JSONSchemaResult> {
  private defaultOptions: Required<JSONSchemaOptions> = {
    draft: '2020-12',
    includeExamples: true,
    includeDescriptions: true,
    strictRequired: false,
    schemaId: 'https://xala-technologies.com/schemas/design-tokens.json',
    splitSchemas: false,
  };

  transform(tokens: TokenSystem, options: JSONSchemaOptions = {}): JSONSchemaResult {
    const opts = { ...this.defaultOptions, ...options };
    
    if (opts.splitSchemas) {
      // Generate separate schemas for each category
      const schemas = this.generateSplitSchemas(tokens, opts);
      const mainSchema = this.generateMainSchema(tokens, opts, true);
      
      return {
        schema: mainSchema,
        schemas,
        full: JSON.stringify({ main: mainSchema, ...schemas }, null, 2),
      };
    } else {
      // Generate single unified schema
      const schema = this.generateMainSchema(tokens, opts, false);
      
      return {
        schema,
        full: JSON.stringify(schema, null, 2),
      };
    }
  }

  private generateMainSchema(
    tokens: TokenSystem,
    options: Required<JSONSchemaOptions>,
    withRefs: boolean
  ): Record<string, unknown> {
    const { draft, includeDescriptions, schemaId, strictRequired } = options;
    
    const schema: Record<string, unknown> = {
      $schema: this.getDraftUrl(draft),
      $id: schemaId,
      title: 'Design Token System',
      type: 'object',
    };

    if (includeDescriptions) {
      schema.description = 'Complete design token system for theming and styling';
    }

    const properties: Record<string, unknown> = {};
    const required: string[] = [];

    // Metadata
    properties.metadata = {
      type: 'object',
      properties: {
        id: { type: 'string', pattern: '^[a-z0-9-]+$' },
        name: { type: 'string' },
        category: { type: 'string' },
        mode: { type: 'string', enum: ['LIGHT', 'DARK'] },
        version: { type: 'string', pattern: '^\\d+\\.\\d+\\.\\d+$' },
      },
      required: ['id', 'name', 'category', 'mode', 'version'],
    };
    required.push('metadata');

    // Token categories
    if (withRefs) {
      // Use references to split schemas
      properties.colors = { $ref: '#/definitions/colors' };
      properties.typography = { $ref: '#/definitions/typography' };
      properties.spacing = { $ref: '#/definitions/spacing' };
      properties.borderRadius = { $ref: '#/definitions/borderRadius' };
      properties.shadows = { $ref: '#/definitions/shadows' };
      properties.zIndex = { $ref: '#/definitions/zIndex' };
      properties.animation = { $ref: '#/definitions/animation' };
      properties.transitions = { $ref: '#/definitions/transitions' };
      properties.branding = { $ref: '#/definitions/branding' };
      properties.accessibility = { $ref: '#/definitions/accessibility' };
      properties.responsive = { $ref: '#/definitions/responsive' };
    } else {
      // Inline schemas
      properties.colors = this.generateColorSchema(tokens.colors, options);
      properties.typography = this.generateTypographySchema(tokens.typography, options);
      properties.spacing = this.generateSpacingSchema(tokens.spacing, options);
      
      if (tokens.borderRadius) {
        properties.borderRadius = this.generateBorderRadiusSchema(tokens.borderRadius, options);
      }
      if (tokens.shadows) {
        properties.shadows = this.generateShadowSchema(tokens.shadows, options);
      }
      if (tokens.zIndex) {
        properties.zIndex = this.generateZIndexSchema(tokens.zIndex, options);
      }
      if (tokens.animation) {
        properties.animation = this.generateAnimationSchema(tokens.animation, options);
      }
      if (tokens.transitions) {
        properties.transitions = this.generateTransitionSchema(tokens.transitions, options);
      }
      
      properties.branding = this.generateBrandingSchema(tokens.branding, options);
      properties.accessibility = this.generateAccessibilitySchema(tokens.accessibility, options);
      properties.responsive = this.generateResponsiveSchema(tokens.responsive, options);
    }

    // Add required properties
    if (strictRequired) {
      required.push('colors', 'typography', 'spacing', 'branding', 'accessibility', 'responsive');
    } else {
      required.push('colors', 'typography', 'spacing');
    }

    schema.properties = properties;
    schema.required = required;
    schema.additionalProperties = false;

    return schema;
  }

  private generateSplitSchemas(
    tokens: TokenSystem,
    options: Required<JSONSchemaOptions>
  ): Record<string, Record<string, unknown>> {
    const schemas: Record<string, Record<string, unknown>> = {};

    schemas.colors = this.wrapSchema(
      this.generateColorSchema(tokens.colors, options),
      'Color Tokens Schema',
      options
    );

    schemas.typography = this.wrapSchema(
      this.generateTypographySchema(tokens.typography, options),
      'Typography Tokens Schema',
      options
    );

    schemas.spacing = this.wrapSchema(
      this.generateSpacingSchema(tokens.spacing, options),
      'Spacing Tokens Schema',
      options
    );

    if (tokens.borderRadius) {
      schemas.borderRadius = this.wrapSchema(
        this.generateBorderRadiusSchema(tokens.borderRadius, options),
        'Border Radius Tokens Schema',
        options
      );
    }

    if (tokens.shadows) {
      schemas.shadows = this.wrapSchema(
        this.generateShadowSchema(tokens.shadows, options),
        'Shadow Tokens Schema',
        options
      );
    }

    if (tokens.zIndex) {
      schemas.zIndex = this.wrapSchema(
        this.generateZIndexSchema(tokens.zIndex, options),
        'Z-Index Tokens Schema',
        options
      );
    }

    if (tokens.animation) {
      schemas.animation = this.wrapSchema(
        this.generateAnimationSchema(tokens.animation, options),
        'Animation Tokens Schema',
        options
      );
    }

    if (tokens.transitions) {
      schemas.transitions = this.wrapSchema(
        this.generateTransitionSchema(tokens.transitions, options),
        'Transition Tokens Schema',
        options
      );
    }

    schemas.branding = this.wrapSchema(
      this.generateBrandingSchema(tokens.branding, options),
      'Branding Tokens Schema',
      options
    );

    schemas.accessibility = this.wrapSchema(
      this.generateAccessibilitySchema(tokens.accessibility, options),
      'Accessibility Tokens Schema',
      options
    );

    schemas.responsive = this.wrapSchema(
      this.generateResponsiveSchema(tokens.responsive, options),
      'Responsive Tokens Schema',
      options
    );

    return schemas;
  }

  private wrapSchema(
    schema: Record<string, unknown>,
    title: string,
    options: Required<JSONSchemaOptions>
  ): Record<string, unknown> {
    return {
      $schema: this.getDraftUrl(options.draft),
      title,
      ...schema,
    };
  }

  private generateColorSchema(
    colors: Record<string, unknown> | undefined,
    options: Required<JSONSchemaOptions>
  ): Record<string, unknown> {
    const { includeDescriptions, includeExamples } = options;
    
    const schema: Record<string, unknown> = {
      type: 'object',
      patternProperties: {
        '^[a-zA-Z]+$': {
          type: 'object',
          patternProperties: {
            '^(50|100|200|300|400|500|600|700|800|900|950)$': {
              type: 'string',
              pattern: '^#[0-9a-fA-F]{6}$',
            },
          },
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    };

    if (includeDescriptions) {
      schema.description = 'Color token definitions with scales from 50 to 950';
    }

    if (includeExamples) {
      schema.examples = [
        {
          primary: {
            50: '#f0f9ff',
            500: '#3b82f6',
            900: '#1e3a8a',
          },
          neutral: {
            50: '#fafafa',
            500: '#737373',
            900: '#171717',
          },
        },
      ];
    }

    return schema;
  }

  private generateTypographySchema(
    typography: Record<string, unknown> | undefined,
    options: Required<JSONSchemaOptions>
  ): Record<string, unknown> {
    const { includeDescriptions, includeExamples } = options;
    
    const schema: Record<string, unknown> = {
      type: 'object',
      properties: {
        fontFamily: {
          type: 'object',
          patternProperties: {
            '^[a-zA-Z]+$': {
              type: 'array',
              items: { type: 'string' },
              minItems: 1,
            },
          },
        },
        fontSize: {
          type: 'object',
          patternProperties: {
            '^[a-zA-Z0-9]+$': {
              type: 'string',
              pattern: '^\\d+(\\.\\d+)?(px|rem|em)$',
            },
          },
        },
        fontWeight: {
          type: 'object',
          patternProperties: {
            '^[a-zA-Z]+$': {
              type: 'number',
              minimum: 100,
              maximum: 900,
              multipleOf: 100,
            },
          },
        },
        lineHeight: {
          type: 'object',
          patternProperties: {
            '^[a-zA-Z]+$': {
              type: 'number',
              minimum: 1,
              maximum: 3,
            },
          },
        },
      },
      required: ['fontFamily', 'fontSize'],
      additionalProperties: false,
    };

    if (includeDescriptions) {
      schema.description = 'Typography token definitions';
      (schema.properties as Record<string, any>).fontFamily.description = 'Font family stacks';
      (schema.properties as Record<string, any>).fontSize.description = 'Font size scale';
      (schema.properties as Record<string, any>).fontWeight.description = 'Font weight scale';
      (schema.properties as Record<string, any>).lineHeight.description = 'Line height scale';
    }

    if (includeExamples) {
      schema.examples = [
        {
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            mono: ['Fira Code', 'monospace'],
          },
          fontSize: {
            base: '1rem',
            lg: '1.125rem',
          },
          fontWeight: {
            normal: 400,
            bold: 700,
          },
          lineHeight: {
            normal: 1.5,
            tight: 1.25,
          },
        },
      ];
    }

    return schema;
  }

  private generateSpacingSchema(
    spacing: Record<string, unknown> | undefined,
    options: Required<JSONSchemaOptions>
  ): Record<string, unknown> {
    const { includeDescriptions, includeExamples } = options;
    
    const schema: Record<string, unknown> = {
      type: 'object',
      patternProperties: {
        '^[0-9]+(\\.[0-9]+)?$|^px$': {
          type: 'string',
          pattern: '^\\d+(\\.\\d+)?(px|rem|em)$',
        },
      },
      additionalProperties: false,
    };

    if (includeDescriptions) {
      schema.description = 'Spacing scale based on 8pt grid system';
    }

    if (includeExamples) {
      schema.examples = [
        {
          0: '0px',
          px: '1px',
          0.5: '0.125rem',
          1: '0.25rem',
          2: '0.5rem',
          4: '1rem',
          8: '2rem',
        },
      ];
    }

    return schema;
  }

  private generateBorderRadiusSchema(
    borderRadius: Record<string, unknown> | undefined,
    options: Required<JSONSchemaOptions>
  ): Record<string, unknown> {
    const { includeDescriptions, includeExamples } = options;
    
    const schema: Record<string, unknown> = {
      type: 'object',
      patternProperties: {
        '^[a-zA-Z0-9-]+$': {
          type: 'string',
          pattern: '^\\d+(\\.\\d+)?(px|rem|em|%)$|^9999px$',
        },
      },
      additionalProperties: false,
    };

    if (includeDescriptions) {
      schema.description = 'Border radius token definitions';
    }

    if (includeExamples) {
      schema.examples = [
        {
          none: '0px',
          sm: '0.125rem',
          DEFAULT: '0.25rem',
          lg: '0.5rem',
          full: '9999px',
        },
      ];
    }

    return schema;
  }

  private generateShadowSchema(
    shadows: Record<string, unknown> | undefined,
    options: Required<JSONSchemaOptions>
  ): Record<string, unknown> {
    const { includeDescriptions, includeExamples } = options;
    
    const schema: Record<string, unknown> = {
      type: 'object',
      patternProperties: {
        '^[a-zA-Z0-9-]+$': {
          type: 'string',
        },
      },
      additionalProperties: false,
    };

    if (includeDescriptions) {
      schema.description = 'Box shadow token definitions';
    }

    if (includeExamples) {
      schema.examples = [
        {
          sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        },
      ];
    }

    return schema;
  }

  private generateZIndexSchema(
    zIndex: Record<string, unknown> | undefined,
    options: Required<JSONSchemaOptions>
  ): Record<string, unknown> {
    const { includeDescriptions, includeExamples } = options;
    
    const schema: Record<string, unknown> = {
      type: 'object',
      patternProperties: {
        '^[a-zA-Z0-9-]+$': {
          type: ['string', 'number'],
          pattern: '^-?\\d+$',
        },
      },
      additionalProperties: false,
    };

    if (includeDescriptions) {
      schema.description = 'Z-index layering scale';
    }

    if (includeExamples) {
      schema.examples = [
        {
          base: '0',
          dropdown: '1000',
          modal: '1050',
          popover: '1100',
          tooltip: '1150',
        },
      ];
    }

    return schema;
  }

  private generateAnimationSchema(
    animation: Record<string, unknown> | undefined,
    options: Required<JSONSchemaOptions>
  ): Record<string, unknown> {
    const { includeDescriptions, includeExamples } = options;
    
    const schema: Record<string, unknown> = {
      type: 'object',
      properties: {
        keyframes: {
          type: 'object',
          additionalProperties: {
            type: 'object',
            additionalProperties: {
              type: 'object',
            },
          },
        },
        presets: {
          type: 'object',
          additionalProperties: {
            type: 'string',
          },
        },
      },
      additionalProperties: false,
    };

    if (includeDescriptions) {
      schema.description = 'Animation token definitions';
    }

    return schema;
  }

  private generateTransitionSchema(
    transitions: Record<string, unknown> | undefined,
    options: Required<JSONSchemaOptions>
  ): Record<string, unknown> {
    const { includeDescriptions } = options;
    
    const schema: Record<string, unknown> = {
      type: 'object',
      properties: {
        property: {
          type: 'object',
          additionalProperties: { type: 'string' },
        },
        duration: {
          type: 'object',
          additionalProperties: { type: 'string' },
        },
        timingFunction: {
          type: 'object',
          additionalProperties: { type: 'string' },
        },
      },
      additionalProperties: false,
    };

    if (includeDescriptions) {
      schema.description = 'Transition token definitions';
    }

    return schema;
  }

  private generateBrandingSchema(
    branding: Record<string, unknown> | undefined,
    options: Required<JSONSchemaOptions>
  ): Record<string, unknown> {
    const { includeDescriptions } = options;
    
    const schema: Record<string, unknown> = {
      type: 'object',
      properties: {
        logo: { type: 'string' },
        favicon: { type: 'string' },
        organizationName: { type: 'string' },
        brandColors: {
          type: 'object',
          additionalProperties: { type: 'string' },
        },
      },
      additionalProperties: true,
    };

    if (includeDescriptions) {
      schema.description = 'Branding and identity tokens';
    }

    return schema;
  }

  private generateAccessibilitySchema(
    accessibility: Record<string, unknown> | undefined,
    options: Required<JSONSchemaOptions>
  ): Record<string, unknown> {
    const { includeDescriptions } = options;
    
    const schema: Record<string, unknown> = {
      type: 'object',
      properties: {
        wcagLevel: {
          type: 'string',
          enum: ['A', 'AA', 'AAA'],
        },
        focusOutlineWidth: { type: 'string' },
        focusOutlineColor: { type: 'string' },
        minimumTouchTarget: { type: 'string' },
        reduceMotion: { type: 'boolean' },
        highContrast: { type: 'boolean' },
      },
      required: ['wcagLevel'],
      additionalProperties: true,
    };

    if (includeDescriptions) {
      schema.description = 'Accessibility configuration tokens';
    }

    return schema;
  }

  private generateResponsiveSchema(
    responsive: Record<string, unknown> | undefined,
    options: Required<JSONSchemaOptions>
  ): Record<string, unknown> {
    const { includeDescriptions, includeExamples } = options;
    
    const schema: Record<string, unknown> = {
      type: 'object',
      properties: {
        breakpoints: {
          type: 'object',
          patternProperties: {
            '^[a-zA-Z0-9-]+$': {
              type: 'string',
              pattern: '^\\d+(px|em|rem)$',
            },
          },
        },
      },
      required: ['breakpoints'],
      additionalProperties: false,
    };

    if (includeDescriptions) {
      schema.description = 'Responsive design tokens';
    }

    if (includeExamples) {
      schema.examples = [
        {
          breakpoints: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
          },
        },
      ];
    }

    return schema;
  }

  private getDraftUrl(draft: string): string {
    const draftUrls: Record<string, string> = {
      '07': 'http://json-schema.org/draft-07/schema#',
      '2019-09': 'https://json-schema.org/draft/2019-09/schema',
      '2020-12': 'https://json-schema.org/draft/2020-12/schema',
    };
    return draftUrls[draft] || draftUrls['2020-12'];
  }
}

// =============================================================================
// FACTORY FUNCTIONS
// =============================================================================

/**
 * Generate JSON Schema from theme template
 */
export function generateJSONSchema(
  theme: Record<string, unknown>,
  options: JSONSchemaOptions = {}
): JSONSchemaResult {
  // Convert theme to TokenSystem format
  const tokenSystem: TokenSystem = {
    colors: (theme.colors as Record<string, unknown>) || {},
    typography: (theme.typography as Record<string, unknown>) || {},
    spacing: (theme.spacing as Record<string, unknown>) || {},
    borderRadius: theme.borderRadius as Record<string, unknown>,
    shadows: theme.shadows as Record<string, unknown>,
    zIndex: theme.zIndex as Record<string, unknown>,
    animation: theme.animation as Record<string, unknown>,
    transitions: theme.transitions as Record<string, unknown>,
    components: theme.components as Record<string, unknown>,
    forms: theme.forms as Record<string, unknown>,
    branding: (theme.branding as Record<string, unknown>) || {},
    accessibility: (theme.accessibility as Record<string, unknown>) || {},
    responsive: (theme.responsive as Record<string, unknown>) || {},
    metadata: theme.metadata as TokenSystem['metadata'] || {
      id: theme.id as string || 'unknown',
      name: theme.name as string || 'Unknown Theme',
      category: theme.category as string || 'custom',
      mode: (theme.mode as 'LIGHT' | 'DARK') || 'LIGHT',
      version: theme.version as string || '1.0.0',
    },
  };

  const transformer = new JSONSchemaTransformer();
  return transformer.transform(tokenSystem, options);
}

/**
 * Validate tokens against schema
 */
export function validateTokensAgainstSchema(
  tokens: Record<string, unknown>,
  schema: Record<string, unknown>
): { valid: boolean; errors: Array<{ path: string; message: string }> } {
  // This is a simplified validation - in production, use a proper JSON Schema validator
  // like ajv or jsonschema
  const errors: Array<{ path: string; message: string }> = [];
  
  // Basic validation logic
  const validateObject = (
    obj: Record<string, unknown>,
    schema: Record<string, unknown>,
    path: string = ''
  ): void => {
    if (schema.type === 'object' && schema.properties) {
      const properties = schema.properties as Record<string, unknown>;
      const required = (schema.required as string[]) || [];
      
      // Check required properties
      for (const prop of required) {
        if (!(prop in obj)) {
          errors.push({
            path: path ? `${path}.${prop}` : prop,
            message: 'Required property missing',
          });
        }
      }
      
      // Validate each property
      for (const [key, value] of Object.entries(obj)) {
        const propSchema = properties[key];
        if (propSchema) {
          validateObject(
            value as Record<string, unknown>,
            propSchema as Record<string, unknown>,
            path ? `${path}.${key}` : key
          );
        }
      }
    }
  };
  
  validateObject(tokens, schema);
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

// Export transformer class
export default JSONSchemaTransformer;