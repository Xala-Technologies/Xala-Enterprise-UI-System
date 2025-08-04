/**
 * @fileoverview Migration Engine - Automated Code Migration and Transformation
 * @description Advanced migration system with codemods, compatibility layers, and rollback support
 * @version 6.0.0
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { join, relative } from 'path';
import { execSync } from 'child_process';

export interface MigrationContext {
  readonly sourceFramework: string;
  readonly targetFramework: string;
  readonly projectPath: string;
  readonly migrationStrategy: MigrationStrategy;
  readonly preserveOriginal: boolean;
  readonly dryRun: boolean;
}

export interface MigrationStrategy {
  readonly approach: 'incremental' | 'complete' | 'hybrid';
  readonly phases: MigrationPhase[];
  readonly rollbackEnabled: boolean;
  readonly backupStrategy: 'full' | 'incremental' | 'none';
}

export interface MigrationPhase {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly priority: number;
  readonly dependencies: string[];
  readonly estimatedTime: string;
  readonly riskLevel: 'low' | 'medium' | 'high';
  readonly components: string[];
  readonly transformations: Transformation[];
}

export interface Transformation {
  readonly id: string;
  readonly type: 'replace' | 'modify' | 'add' | 'remove' | 'rename';
  readonly source: string;
  readonly target?: string;
  readonly pattern?: RegExp;
  readonly replacement?: string;
  readonly validator?: (content: string) => boolean;
}

export interface MigrationResult {
  readonly success: boolean;
  readonly completedPhases: string[];
  readonly failedPhases: string[];
  readonly modifiedFiles: string[];
  readonly backupLocation?: string;
  readonly rollbackInstructions: string[];
  readonly warnings: string[];
  readonly errors: string[];
}

// Mutable version for internal use
interface MutableMigrationResult {
  success: boolean;
  completedPhases: string[];
  failedPhases: string[];
  modifiedFiles: string[];
  backupLocation?: string;
  rollbackInstructions: string[];
  warnings: string[];
  errors: string[];
}

export interface CodemodResult {
  readonly success: boolean;
  readonly transformedFiles: string[];
  readonly skippedFiles: string[];
  readonly errors: TransformationError[];
}

// Mutable version for internal use
interface MutableCodemodResult {
  success: boolean;
  transformedFiles: string[];
  skippedFiles: string[];
  errors: TransformationError[];
}

export interface TransformationError {
  readonly file: string;
  readonly line: number;
  readonly column: number;
  readonly message: string;
  readonly severity: 'error' | 'warning';
}

export class MigrationEngine {
  private context: MigrationContext;
  private transformationMap: Map<string, ComponentMapping> = new Map();
  private backupPath: string;

  public constructor(context: MigrationContext) {
    this.context = context;
    this.backupPath = join(context.projectPath, '.migration-backup');
    this.initializeTransformationMap();
  }

  /**
   * Execute complete migration strategy
   */
  public async executeMigration(): Promise<MigrationResult> {
    const result: MutableMigrationResult = {
      success: false,
      completedPhases: [],
      failedPhases: [],
      modifiedFiles: [],
      rollbackInstructions: [],
      warnings: [],
      errors: [],
      backupLocation: undefined
    };

    try {
      // Create backup if not dry run
      if (!this.context.dryRun && this.context.migrationStrategy.backupStrategy !== 'none') {
        result.backupLocation = await this.createBackup();
      }

      // Execute phases in order
      for (const phase of this.context.migrationStrategy.phases) {
        try {
          const phaseResult = await this.executePhase(phase);
          
          if (phaseResult.success) {
            result.completedPhases.push(phase.id);
            result.modifiedFiles.push(...phaseResult.modifiedFiles);
          } else {
            result.failedPhases.push(phase.id);
            result.errors.push(...phaseResult.errors);
            
            // Stop on critical failure
            if (phase.riskLevel === 'high') {
              break;
            }
          }
        } catch (error) {
          result.failedPhases.push(phase.id);
          const errorMessage = error instanceof Error ? error.message : String(error);
          result.errors.push(`Phase ${phase.id} failed: ${errorMessage}`);
        }
      }

      // Generate rollback instructions
      if (result.failedPhases.length > 0 && result.backupLocation) {
        result.rollbackInstructions = this.generateRollbackInstructions(result.backupLocation);
      }

      result.success = result.failedPhases.length === 0;
      return result as MigrationResult;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      result.errors.push(`Migration failed: ${errorMessage}`);
      return result as MigrationResult;
    }
  }

  /**
   * Execute specific migration phase
   */
  public async executePhase(phase: MigrationPhase): Promise<PhaseResult> {
    const result = {
      success: false,
      modifiedFiles: [] as string[],
      errors: [] as string[],
      warnings: [] as string[]
    };

    try {
      // Check phase dependencies
      const dependenciesResult = await this.checkPhaseDependencies(phase);
      if (!dependenciesResult.satisfied) {
        result.errors.push(`Phase dependencies not satisfied: ${dependenciesResult.missing.join(', ')}`);
        return result;
      }

      // Execute transformations
      for (const transformation of phase.transformations) {
        const transformResult = await this.executeTransformation(transformation, phase.components);
        
        if (transformResult.success) {
          result.modifiedFiles.push(...transformResult.transformedFiles);
        } else {
          result.errors.push(...transformResult.errors.map(e => e.message));
        }
      }

      // Validate phase completion
      const validationResult = await this.validatePhase(phase, result.modifiedFiles);
      result.success = validationResult.success;
      result.warnings.push(...validationResult.warnings);

      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      result.errors.push(`Phase execution failed: ${errorMessage}`);
      return result;
    }
  }

  /**
   * Execute individual transformation
   */
  public async executeTransformation(transformation: Transformation, targetComponents: string[]): Promise<CodemodResult> {
    const result: MutableCodemodResult = {
      success: true,
      transformedFiles: [],
      skippedFiles: [],
      errors: []
    };

    try {
      const filesToTransform = await this.getFilesForTransformation(transformation, targetComponents);

      for (const filePath of filesToTransform) {
        try {
          const transformResult = await this.transformFile(filePath, transformation);
          
          if (transformResult.success) {
            result.transformedFiles.push(filePath);
          } else {
            result.skippedFiles.push(filePath);
            result.errors.push(...transformResult.errors);
          }
        } catch (error) {
          result.errors.push({
            file: filePath,
            line: 0,
            column: 0,
            message: error instanceof Error ? error.message : String(error),
            severity: 'error'
          });
        }
      }

      result.success = result.errors.length === 0;
      return result;

    } catch (error) {
      result.success = false;
      result.errors.push({
        file: 'unknown',
        line: 0,
        column: 0,
        message: `Transformation failed: ${error instanceof Error ? error.message : String(error)}`,
        severity: 'error'
      });
      return result;
    }
  }

  /**
   * Transform individual file
   */
  public async transformFile(filePath: string, transformation: Transformation): Promise<FileTransformResult> {
    const result: MutableFileTransformResult = {
      success: false,
      errors: []
    };

    try {
      const originalContent = readFileSync(filePath, 'utf-8');
      let transformedContent = originalContent;

      switch (transformation.type) {
        case 'replace':
          transformedContent = this.performReplacement(originalContent, transformation);
          break;
        case 'modify':
          transformedContent = this.performModification(originalContent, transformation);
          break;
        case 'add':
          transformedContent = this.performAddition(originalContent, transformation);
          break;
        case 'remove':
          transformedContent = this.performRemoval(originalContent, transformation);
          break;
        case 'rename':
          transformedContent = this.performRename(originalContent, transformation);
          break;
      }

      // Validate transformation if validator provided
      if (transformation.validator && !transformation.validator(transformedContent)) {
        result.errors.push({
          file: filePath,
          line: 0,
          column: 0,
          message: 'Transformation validation failed',
          severity: 'error'
        });
        return result;
      }

      // Write transformed content if not dry run
      if (!this.context.dryRun && transformedContent !== originalContent) {
        writeFileSync(filePath, transformedContent, 'utf-8');
      }

      result.success = true;
      return result;

    } catch (error) {
      result.errors.push({
        file: filePath,
        line: 0,
        column: 0,
        message: error instanceof Error ? error.message : String(error),
        severity: 'error'
      });
      return result;
    }
  }

  /**
   * Generate component mapping for migration
   */
  public generateComponentMapping(sourceFramework: string, targetFramework: string): ComponentMapping[] {
    const mappings: ComponentMapping[] = [];

    // Material-UI to Xala UI System mappings
    if (sourceFramework === 'material-ui' && targetFramework === 'xala-ui-system') {
      mappings.push(
        { source: 'Button', target: 'Button', importPath: '@xala-technologies/ui-system' },
        { source: 'TextField', target: 'Input', importPath: '@xala-technologies/ui-system' },
        { source: 'Card', target: 'Card', importPath: '@xala-technologies/ui-system' },
        { source: 'Box', target: 'Container', importPath: '@xala-technologies/ui-system' },
        { source: 'Typography', target: 'Typography', importPath: '@xala-technologies/ui-system' },
        { source: 'Stack', target: 'Stack', importPath: '@xala-technologies/ui-system' },
        { source: 'Grid', target: 'Grid', importPath: '@xala-technologies/ui-system' }
      );
    }

    // Ant Design to Xala UI System mappings
    if (sourceFramework === 'antd' && targetFramework === 'xala-ui-system') {
      mappings.push(
        { source: 'Button', target: 'Button', importPath: '@xala-technologies/ui-system' },
        { source: 'Input', target: 'Input', importPath: '@xala-technologies/ui-system' },
        { source: 'Card', target: 'Card', importPath: '@xala-technologies/ui-system' },
        { source: 'Space', target: 'Stack', importPath: '@xala-technologies/ui-system' },
        { source: 'Typography', target: 'Typography', importPath: '@xala-technologies/ui-system' }
      );
    }

    // Chakra UI to Xala UI System mappings
    if (sourceFramework === 'chakra-ui' && targetFramework === 'xala-ui-system') {
      mappings.push(
        { source: 'Button', target: 'Button', importPath: '@xala-technologies/ui-system' },
        { source: 'Input', target: 'Input', importPath: '@xala-technologies/ui-system' },
        { source: 'Box', target: 'Container', importPath: '@xala-technologies/ui-system' },
        { source: 'Text', target: 'Typography', importPath: '@xala-technologies/ui-system' },
        { source: 'VStack', target: 'Stack', importPath: '@xala-technologies/ui-system', props: { direction: 'vertical' } },
        { source: 'HStack', target: 'Stack', importPath: '@xala-technologies/ui-system', props: { direction: 'horizontal' } }
      );
    }

    return mappings;
  }

  /**
   * Create automated codemods
   */
  public async createCodemods(mappings: ComponentMapping[]): Promise<string[]> {
    const codemods: string[] = [];

    for (const mapping of mappings) {
      const codemod = this.generateCodemod(mapping);
      codemods.push(codemod);
    }

    return codemods;
  }

  /**
   * Execute rollback to previous state
   */
  public async rollback(backupLocation: string): Promise<RollbackResult> {
    const result: MutableRollbackResult = {
      success: false,
      restoredFiles: [],
      errors: []
    };

    try {
      if (!existsSync(backupLocation)) {
        result.errors.push('Backup location not found');
        return result;
      }

      // Restore files from backup
      const backupFiles = this.getBackupFiles(backupLocation);
      
      for (const backupFile of backupFiles) {
        try {
          const originalPath = this.getOriginalPath(backupFile, backupLocation);
          copyFileSync(backupFile, originalPath);
          result.restoredFiles.push(originalPath);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          result.errors.push(`Failed to restore ${backupFile}: ${errorMessage}`);
        }
      }

      result.success = result.errors.length === 0;
      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      result.errors.push(`Rollback failed: ${errorMessage}`);
      return result;
    }
  }

  // Private helper methods
  private initializeTransformationMap(): void {
    const mappings = this.generateComponentMapping(
      this.context.sourceFramework,
      this.context.targetFramework
    );

    for (const mapping of mappings) {
      this.transformationMap.set(mapping.source, mapping);
    }
  }

  private async createBackup(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = join(this.backupPath, `backup-${timestamp}`);
    
    if (!existsSync(this.backupPath)) {
      mkdirSync(this.backupPath, { recursive: true });
    }
    
    mkdirSync(backupDir, { recursive: true });
    
    // Copy project files to backup
    execSync(`cp -r ${this.context.projectPath}/src ${backupDir}/`);
    
    return backupDir;
  }

  private async checkPhaseDependencies(phase: MigrationPhase): Promise<DependencyCheckResult> {
    const result: MutableDependencyCheckResult = {
      satisfied: true,
      missing: []
    };

    for (const dependency of phase.dependencies) {
      // Check if dependency phase was completed
      // This would integrate with a phase tracking system
      const dependencyExists = await this.checkDependencyExists(dependency);
      if (!dependencyExists) {
        result.satisfied = false;
        result.missing.push(dependency);
      }
    }

    return result;
  }

  private async checkDependencyExists(_dependency: string): Promise<boolean> {
    // Implementation would check completed phases
    return true;
  }

  private async validatePhase(phase: MigrationPhase, modifiedFiles: string[]): Promise<ValidationResult> {
    const result: ValidationResult = {
      success: true,
      warnings: []
    };

    // Validate that all expected files were modified
    for (const component of phase.components) {
      const componentFiles = await this.getComponentFiles(component);
      const modifiedComponentFiles = componentFiles.filter(file => modifiedFiles.includes(file));
      
      if (modifiedComponentFiles.length === 0) {
        result.warnings.push(`No files modified for component: ${component}`);
      }
    }

    return result;
  }

  private async getFilesForTransformation(transformation: Transformation, targetComponents: string[]): Promise<string[]> {
    const files: string[] = [];
    
    for (const component of targetComponents) {
      const componentFiles = await this.getComponentFiles(component);
      files.push(...componentFiles);
    }
    
    return files;
  }

  private async getComponentFiles(component: string): Promise<string[]> {
    // Implementation would scan for component files
    return [`src/components/${component}.tsx`];
  }

  private performReplacement(content: string, transformation: Transformation): string {
    if (transformation.pattern && transformation.replacement) {
      return content.replace(transformation.pattern, transformation.replacement);
    }
    return content.replace(transformation.source, transformation.target || '');
  }

  private performModification(content: string, _transformation: Transformation): string {
    // Advanced AST-based modifications would go here
    return content;
  }

  private performAddition(content: string, transformation: Transformation): string {
    // Add imports, exports, or code blocks
    return content + (transformation.target || '');
  }

  private performRemoval(content: string, transformation: Transformation): string {
    if (transformation.pattern) {
      return content.replace(transformation.pattern, '');
    }
    return content.replace(transformation.source, '');
  }

  private performRename(content: string, transformation: Transformation): string {
    const pattern = new RegExp(`\\b${transformation.source}\\b`, 'g');
    return content.replace(pattern, transformation.target || '');
  }

  private generateCodemod(mapping: ComponentMapping): string {
    return `
// Codemod for ${mapping.source} -> ${mapping.target}
import { Transform } from 'jscodeshift';

const transform: Transform = (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Replace import
  root.find(j.ImportDeclaration)
    .filter(path => path.value.source.value.includes('${mapping.source}'))
    .forEach(path => {
      path.value.source.value = '${mapping.importPath}';
    });

  // Replace component usage
  root.find(j.JSXElement)
    .filter(path => path.value.openingElement.name.name === '${mapping.source}')
    .forEach(path => {
      path.value.openingElement.name.name = '${mapping.target}';
      if (path.value.closingElement) {
        path.value.closingElement.name.name = '${mapping.target}';
      }
    });

  return root.toSource();
};

export default transform;
    `;
  }

  private generateRollbackInstructions(backupLocation: string): string[] {
    return [
      `Backup created at: ${backupLocation}`,
      `To rollback: cp -r ${backupLocation}/src ${this.context.projectPath}/`,
      `Or use: migration-engine rollback ${backupLocation}`
    ];
  }

  private getBackupFiles(_backupLocation: string): string[] {
    // Implementation would recursively get all backup files
    return [];
  }

  private getOriginalPath(backupFile: string, backupLocation: string): string {
    const relativePath = relative(backupLocation, backupFile);
    return join(this.context.projectPath, relativePath);
  }
}

// Type definitions
interface ComponentMapping {
  readonly source: string;
  readonly target: string;
  readonly importPath: string;
  readonly props?: Record<string, unknown>;
}

interface PhaseResult {
  readonly success: boolean;
  readonly modifiedFiles: string[];
  readonly errors: string[];
  readonly warnings: string[];
}

interface FileTransformResult {
  readonly success: boolean;
  readonly errors: TransformationError[];
}

// Mutable version for internal use
interface MutableFileTransformResult {
  success: boolean;
  errors: TransformationError[];
}

interface DependencyCheckResult {
  readonly satisfied: boolean;
  readonly missing: string[];
}

// Mutable version for internal use
interface MutableDependencyCheckResult {
  satisfied: boolean;
  missing: string[];
}

interface ValidationResult {
  readonly success: boolean;
  readonly warnings: string[];
}

interface RollbackResult {
  readonly success: boolean;
  readonly restoredFiles: string[];
  readonly errors: string[];
}

// Mutable version for internal use
interface MutableRollbackResult {
  success: boolean;
  restoredFiles: string[];
  errors: string[];
}
