import chalk from 'chalk';
import inquirer from 'inquirer';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import ora from 'ora';
import { CommandMetadata } from './index.js';
import { logger } from '../utils/logger.js';
import { ThemeGenerator } from '../services/theme-generator.js';
import { ValidationError } from '../utils/errors.js';

export interface ThemeOptions {
  readonly brand?: string;
  readonly colors?: string;
  readonly output?: string;
  readonly template?: string;
  readonly industry?: string;
  readonly accessibility?: string;
  readonly preview?: boolean;
}

export interface ThemeConfig {
  readonly name: string;
  readonly brand?: string;
  readonly industry: string;
  readonly colors: Record<string, string>;
  readonly accessibility: 'AA' | 'AAA';
  readonly features: ReadonlyArray<string>;
  readonly locales: ReadonlyArray<string>;
}

export const themesCommand: CommandMetadata = {
  name: 'themes',
  description: 'Theme management and customization',
  options: [
    {
      flags: '--brand <name>',
      description: 'Brand name for the theme'
    },
    {
      flags: '--colors <colors>',
      description: 'Color overrides (format: primary=#0891b2,secondary=#0f766e)'
    },
    {
      flags: '--output <path>',
      description: 'Output directory for theme files',
      defaultValue: './src/themes'
    },
    {
      flags: '--template <template>',
      description: 'Base theme template (light|dark|auto)',
      defaultValue: 'light'
    },
    {
      flags: '--industry <industry>',
      description: 'Industry-specific theme (healthcare|finance|education|ecommerce)',
      defaultValue: 'general'
    },
    {
      flags: '--accessibility <level>',
      description: 'Accessibility compliance level (AA|AAA)',
      defaultValue: 'AAA'
    },
    {
      flags: '--preview',
      description: 'Preview theme changes',
      defaultValue: false
    }
  ],
  action: async (options: ThemeOptions = {}) => {
    try {
      const subcommand = process.argv[3];
      
      switch (subcommand) {
        case 'create':
          return await handleCreateTheme(options);
        case 'apply':
          return await handleApplyTheme(options);
        case 'customize':
          return await handleCustomizeTheme(options);
        case 'list':
          return await handleListThemes(options);
        case 'preview':
          return await handlePreviewTheme(options);
        default:
          return await showThemesHelp();
      }
    } catch (error) {
      logger.error('Themes command failed:', error);
      throw error;
    }
  }
};

async function handleCreateTheme(options: ThemeOptions): Promise<void> {
  const themeName = process.argv[4];
  
  if (!themeName) {
    throw new ValidationError('Theme name is required. Example: xala themes create my-theme');
  }

  logger.info(`Creating theme: ${themeName}`);
  
  const config = await collectThemeInfo(themeName, options);
  const generator = new ThemeGenerator();
  
  const spinner = ora('Creating theme files...').start();
  
  try {
    await generator.createTheme(config, {
      outputDir: options.output || './src/themes',
      preview: options.preview || false
    });
    
    spinner.succeed(`Theme "${themeName}" created successfully`);
    
    console.log(chalk.bold('\n📁 Generated Files:'));
    console.log(`  ${config.name}.theme.ts - Theme definition`);
    console.log(`  ${config.name}.tokens.json - Design tokens`);
    console.log(`  ${config.name}.css - CSS variables`);
    console.log(`  ${config.name}.tailwind.js - Tailwind config`);
    
    console.log(chalk.bold('\n🎨 Next Steps:'));
    console.log(`  1. Apply theme: ${chalk.cyan(`xala themes apply ${themeName}`)}`);
    console.log(`  2. Preview theme: ${chalk.cyan(`xala themes preview ${themeName}`)}`);
    console.log(`  3. Customize colors: ${chalk.cyan(`xala themes customize ${themeName}`)}`);
    
  } catch (error) {
    spinner.fail('Theme creation failed');
    throw error;
  }
}

async function handleApplyTheme(options: ThemeOptions): Promise<void> {
  const themeName = process.argv[4];
  
  if (!themeName) {
    throw new ValidationError('Theme name is required. Example: xala themes apply my-theme');
  }

  logger.info(`Applying theme: ${themeName}`);
  
  const generator = new ThemeGenerator();
  const spinner = ora('Applying theme...').start();
  
  try {
    await generator.applyTheme(themeName, {
      updateConfig: true,
      generateCSS: true,
      updateTailwind: true
    });
    
    spinner.succeed(`Theme "${themeName}" applied successfully`);
    
    console.log(chalk.bold('\n✅ Theme Applied:'));
    console.log(`  Updated xala.config.js`);
    console.log(`  Generated CSS variables`);
    console.log(`  Updated Tailwind configuration`);
    console.log(`  Updated design token exports`);
    
    console.log(chalk.bold('\n🔄 Restart Required:'));
    console.log('  Restart your development server to see changes');
    
  } catch (error) {
    spinner.fail('Theme application failed');
    throw error;
  }
}

async function handleCustomizeTheme(options: ThemeOptions): Promise<void> {
  const themeName = process.argv[4];
  
  if (!themeName) {
    throw new ValidationError('Theme name is required. Example: xala themes customize my-theme');
  }

  logger.info(`Customizing theme: ${themeName}`);
  
  const customizations = await collectCustomizations(options);
  const generator = new ThemeGenerator();
  
  const spinner = ora('Applying customizations...').start();
  
  try {
    await generator.customizeTheme(themeName, customizations);
    
    spinner.succeed('Theme customizations applied');
    
    if (options.preview) {
      await handlePreviewTheme({ ...options, theme: themeName });
    }
    
  } catch (error) {
    spinner.fail('Theme customization failed');
    throw error;
  }
}

async function handleListThemes(options: ThemeOptions): Promise<void> {
  const generator = new ThemeGenerator();
  const themes = await generator.listAvailableThemes();
  
  console.log(chalk.bold('\n🎨 Available Themes:'));
  
  if (themes.length === 0) {
    console.log(chalk.dim('  No themes found. Create one with: xala themes create my-theme'));
    return;
  }
  
  for (const theme of themes) {
    const status = theme.isActive ? chalk.green('● Active') : chalk.dim('○ Available');
    console.log(`  ${status} ${chalk.cyan(theme.name)}`);
    console.log(`    ${chalk.dim(theme.description)}`);
    console.log(`    ${chalk.dim(`Industry: ${theme.industry} | Accessibility: ${theme.accessibility}`)}`);
    console.log();
  }
  
  console.log(chalk.bold('📖 Commands:'));
  console.log(`  ${chalk.cyan('apply <name>')}     Apply a theme`);
  console.log(`  ${chalk.cyan('customize <name>')} Customize theme colors`);
  console.log(`  ${chalk.cyan('preview <name>')}   Preview theme`);
}

async function handlePreviewTheme(options: ThemeOptions): Promise<void> {
  const themeName = process.argv[4] || options.theme;
  
  if (!themeName) {
    throw new ValidationError('Theme name is required. Example: xala themes preview my-theme');
  }

  logger.info(`Generating preview for theme: ${themeName}`);
  
  const generator = new ThemeGenerator();
  const spinner = ora('Generating theme preview...').start();
  
  try {
    const previewUrl = await generator.generatePreview(themeName, {
      port: 3002,
      openBrowser: true
    });
    
    spinner.succeed('Theme preview generated');
    
    console.log(chalk.bold('\n👀 Theme Preview:'));
    console.log(`  Preview URL: ${chalk.cyan(previewUrl)}`);
    console.log(`  Press ${chalk.yellow('Ctrl+C')} to stop preview server`);
    
  } catch (error) {
    spinner.fail('Theme preview failed');
    throw error;
  }
}

async function collectThemeInfo(name: string, options: ThemeOptions): Promise<ThemeConfig> {
  const questions: any[] = [];

  if (!options.industry) {
    questions.push({
      type: 'list',
      name: 'industry',
      message: 'Select industry vertical:',
      choices: [
        { name: 'General/Universal', value: 'general' },
        { name: 'Healthcare & Medical', value: 'healthcare' },
        { name: 'Financial Services', value: 'finance' },
        { name: 'Education & Learning', value: 'education' },
        { name: 'E-commerce & Retail', value: 'ecommerce' },
        { name: 'Government & Public', value: 'government' },
        { name: 'Technology & SaaS', value: 'technology' },
        { name: 'Media & Entertainment', value: 'media' }
      ]
    });
  }

  if (!options.colors) {
    questions.push({
      type: 'input',
      name: 'primaryColor',
      message: 'Primary brand color (hex):',
      default: '#0891b2',
      validate: (input: string) => /^#[0-9a-fA-F]{6}$/.test(input) || 'Please enter a valid hex color'
    });

    questions.push({
      type: 'input',
      name: 'secondaryColor',
      message: 'Secondary color (hex):',
      default: '#0f766e',
      validate: (input: string) => /^#[0-9a-fA-F]{6}$/.test(input) || 'Please enter a valid hex color'
    });
  }

  questions.push({
    type: 'checkbox',
    name: 'features',
    message: 'Select theme features:',
    choices: [
      { name: 'Dark mode support', value: 'darkMode' },
      { name: 'High contrast mode', value: 'highContrast' },
      { name: 'Reduced motion support', value: 'reducedMotion' },
      { name: 'RTL language support', value: 'rtl' },
      { name: 'Print-friendly styles', value: 'print' },
      { name: 'Mobile-first responsive', value: 'responsive' },
      { name: 'Color blind friendly', value: 'colorBlind' },
      { name: 'Custom focus indicators', value: 'customFocus' }
    ]
  });

  questions.push({
    type: 'checkbox',
    name: 'locales',
    message: 'Select supported locales:',
    choices: [
      { name: 'English (US)', value: 'en-US', checked: true },
      { name: 'Norwegian Bokmål', value: 'nb-NO' },
      { name: 'French', value: 'fr-FR' },
      { name: 'Arabic', value: 'ar-SA' },
      { name: 'German', value: 'de-DE' },
      { name: 'Spanish', value: 'es-ES' },
      { name: 'Chinese (Simplified)', value: 'zh-CN' },
      { name: 'Japanese', value: 'ja-JP' }
    ]
  });

  const answers = await inquirer.prompt(questions);

  // Parse colors from options or answers
  const colors: Record<string, string> = {};
  if (options.colors) {
    const colorPairs = options.colors.split(',');
    for (const pair of colorPairs) {
      const [key, value] = pair.split('=');
      if (key && value) {
        colors[key.trim()] = value.trim();
      }
    }
  } else {
    colors.primary = answers.primaryColor;
    colors.secondary = answers.secondaryColor;
  }

  return {
    name,
    brand: options.brand,
    industry: options.industry || answers.industry,
    colors,
    accessibility: (options.accessibility as 'AA' | 'AAA') || 'AAA',
    features: answers.features || [],
    locales: answers.locales || ['en-US']
  };
}

async function collectCustomizations(options: ThemeOptions): Promise<any> {
  const questions = [
    {
      type: 'list',
      name: 'customizationType',
      message: 'What would you like to customize?',
      choices: [
        { name: 'Colors', value: 'colors' },
        { name: 'Typography', value: 'typography' },
        { name: 'Spacing', value: 'spacing' },
        { name: 'Border Radius', value: 'borderRadius' },
        { name: 'Shadows', value: 'shadows' },
        { name: 'Animations', value: 'animations' }
      ]
    }
  ];

  const { customizationType } = await inquirer.prompt(questions);

  switch (customizationType) {
    case 'colors':
      return await collectColorCustomizations();
    case 'typography':
      return await collectTypographyCustomizations();
    case 'spacing':
      return await collectSpacingCustomizations();
    default:
      return {};
  }
}

async function collectColorCustomizations(): Promise<any> {
  const questions = [
    {
      type: 'input',
      name: 'primary',
      message: 'Primary color (hex):',
      validate: (input: string) => !input || /^#[0-9a-fA-F]{6}$/.test(input) || 'Please enter a valid hex color'
    },
    {
      type: 'input',
      name: 'secondary',
      message: 'Secondary color (hex):',
      validate: (input: string) => !input || /^#[0-9a-fA-F]{6}$/.test(input) || 'Please enter a valid hex color'
    },
    {
      type: 'input',
      name: 'accent',
      message: 'Accent color (hex):',
      validate: (input: string) => !input || /^#[0-9a-fA-F]{6}$/.test(input) || 'Please enter a valid hex color'
    }
  ];

  const answers = await inquirer.prompt(questions);
  
  // Filter out empty values
  const colors: Record<string, string> = {};
  Object.entries(answers).forEach(([key, value]) => {
    if (value) {
      colors[key] = value as string;
    }
  });

  return { colors };
}

async function collectTypographyCustomizations(): Promise<any> {
  const questions = [
    {
      type: 'list',
      name: 'fontFamily',
      message: 'Select font family:',
      choices: [
        { name: 'System Default', value: 'system' },
        { name: 'Inter (Recommended)', value: 'inter' },
        { name: 'Roboto', value: 'roboto' },
        { name: 'Open Sans', value: 'opensans' },
        { name: 'Poppins', value: 'poppins' },
        { name: 'Montserrat', value: 'montserrat' },
        { name: 'Custom', value: 'custom' }
      ]
    },
    {
      type: 'list',
      name: 'scale',
      message: 'Typography scale:',
      choices: [
        { name: 'Minor Second (1.067)', value: 'minorSecond' },
        { name: 'Major Second (1.125)', value: 'majorSecond' },
        { name: 'Minor Third (1.200)', value: 'minorThird' },
        { name: 'Major Third (1.250)', value: 'majorThird' },
        { name: 'Perfect Fourth (1.333)', value: 'perfectFourth' }
      ]
    }
  ];

  return await inquirer.prompt(questions);
}

async function collectSpacingCustomizations(): Promise<any> {
  const questions = [
    {
      type: 'list',
      name: 'baseUnit',
      message: 'Base spacing unit:',
      choices: [
        { name: '4px (Tight)', value: 4 },
        { name: '8px (Standard)', value: 8 },
        { name: '12px (Comfortable)', value: 12 },
        { name: '16px (Spacious)', value: 16 }
      ]
    },
    {
      type: 'list',
      name: 'scale',
      message: 'Spacing scale progression:',
      choices: [
        { name: 'Linear (1x, 2x, 3x, 4x)', value: 'linear' },
        { name: 'Fibonacci (1x, 2x, 3x, 5x, 8x)', value: 'fibonacci' },
        { name: 'Powers of 2 (1x, 2x, 4x, 8x, 16x)', value: 'powers' }
      ]
    }
  ];

  return await inquirer.prompt(questions);
}

async function showThemesHelp(): Promise<void> {
  console.log(chalk.bold('\n🎨 Theme Commands:'));
  console.log(`  ${chalk.cyan('create')} <name>       Create a new theme`);
  console.log(`  ${chalk.cyan('apply')} <name>        Apply an existing theme`);
  console.log(`  ${chalk.cyan('customize')} <name>    Customize theme properties`);
  console.log(`  ${chalk.cyan('list')}               List all available themes`);
  console.log(`  ${chalk.cyan('preview')} <name>      Preview theme in browser`);
  
  console.log(chalk.bold('\n🎯 Examples:'));
  console.log(`  xala themes create healthcare --brand "Medical Corp" --colors primary=#0891b2`);
  console.log(`  xala themes apply healthcare`);
  console.log(`  xala themes customize healthcare`);
  console.log(`  xala themes preview healthcare`);
  
  console.log(chalk.bold('\n🏭 Industry Templates:'));
  console.log('  • Healthcare & Medical');
  console.log('  • Financial Services');
  console.log('  • Education & Learning');
  console.log('  • E-commerce & Retail');
  console.log('  • Government & Public');
  console.log('  • Technology & SaaS');
}