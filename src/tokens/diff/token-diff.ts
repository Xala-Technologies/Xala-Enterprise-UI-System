/**
 * Token Diffing System
 * Calculates and visualizes differences between token sets
 */

import type { TokenSystem } from '../types';
import { deepClone, get } from '../../utils/object';

export type DiffType = 'added' | 'modified' | 'removed' | 'unchanged';

export interface TokenDiff {
  path: string;
  type: DiffType;
  oldValue?: any;
  newValue?: any;
  category?: string;
  impact?: 'breaking' | 'minor' | 'patch';
  affectedComponents?: string[];
}

export interface DiffSummary {
  totalChanges: number;
  added: number;
  modified: number;
  removed: number;
  breaking: number;
  categories: Record<string, number>;
  impactAnalysis: {
    components: string[];
    riskLevel: 'low' | 'medium' | 'high';
    estimatedEffort: number; // hours
  };
}

export interface DiffOptions {
  ignoreMetadata?: boolean;
  ignoreComments?: boolean;
  deepComparison?: boolean;
  trackAffectedComponents?: boolean;
  includeUnchanged?: boolean;
  categorize?: boolean;
}

/**
 * Token diff analyzer
 */
export class TokenDiffAnalyzer {
  private componentTokenMap: Map<string, string[]> = new Map();

  constructor() {
    this.initializeComponentTokenMap();
  }

  /**
   * Calculate diff between two token systems
   */
  calculateDiff(
    oldTokens: TokenSystem,
    newTokens: TokenSystem,
    options: DiffOptions = {}
  ): TokenDiff[] {
    const {
      ignoreMetadata = true,
      deepComparison = true,
      trackAffectedComponents = true,
      includeUnchanged = false,
      categorize = true,
    } = options;

    const diffs: TokenDiff[] = [];
    const processedPaths = new Set<string>();

    // Process all paths in both old and new tokens
    this.walkTokens(oldTokens, '', (path, value) => {
      if (ignoreMetadata && path.includes('metadata')) return;
      
      processedPaths.add(path);
      const newValue = get(newTokens, path);
      
      if (newValue === undefined) {
        // Token was removed
        diffs.push({
          path,
          type: 'removed',
          oldValue: value,
          category: categorize ? this.categorizeToken(path) : undefined,
          impact: this.assessImpact('removed', path, value, undefined),
          affectedComponents: trackAffectedComponents ? this.getAffectedComponents(path) : undefined,
        });
      } else if (deepComparison ? !this.deepEqual(value, newValue) : value !== newValue) {
        // Token was modified
        diffs.push({
          path,
          type: 'modified',
          oldValue: value,
          newValue,
          category: categorize ? this.categorizeToken(path) : undefined,
          impact: this.assessImpact('modified', path, value, newValue),
          affectedComponents: trackAffectedComponents ? this.getAffectedComponents(path) : undefined,
        });
      } else if (includeUnchanged) {
        // Token is unchanged
        diffs.push({
          path,
          type: 'unchanged',
          oldValue: value,
          newValue,
          category: categorize ? this.categorizeToken(path) : undefined,
        });
      }
    });

    // Check for added tokens
    this.walkTokens(newTokens, '', (path, value) => {
      if (ignoreMetadata && path.includes('metadata')) return;
      
      if (!processedPaths.has(path)) {
        diffs.push({
          path,
          type: 'added',
          newValue: value,
          category: categorize ? this.categorizeToken(path) : undefined,
          impact: this.assessImpact('added', path, undefined, value),
          affectedComponents: trackAffectedComponents ? this.getAffectedComponents(path) : undefined,
        });
      }
    });

    return diffs.sort((a, b) => {
      // Sort by impact first, then by type
      const impactOrder = { breaking: 0, minor: 1, patch: 2, undefined: 3 };
      const typeOrder = { removed: 0, modified: 1, added: 2, unchanged: 3 };
      
      const impactDiff = (impactOrder[a.impact || 'undefined'] || 3) - (impactOrder[b.impact || 'undefined'] || 3);
      if (impactDiff !== 0) return impactDiff;
      
      return (typeOrder[a.type] || 3) - (typeOrder[b.type] || 3);
    });
  }

  /**
   * Generate diff summary
   */
  generateSummary(diffs: TokenDiff[]): DiffSummary {
    const summary: DiffSummary = {
      totalChanges: 0,
      added: 0,
      modified: 0,
      removed: 0,
      breaking: 0,
      categories: {},
      impactAnalysis: {
        components: [],
        riskLevel: 'low',
        estimatedEffort: 0,
      },
    };

    const affectedComponents = new Set<string>();

    for (const diff of diffs) {
      if (diff.type === 'unchanged') continue;
      
      summary.totalChanges++;
      summary[diff.type]++;
      
      if (diff.impact === 'breaking') {
        summary.breaking++;
      }
      
      if (diff.category) {
        summary.categories[diff.category] = (summary.categories[diff.category] || 0) + 1;
      }
      
      if (diff.affectedComponents) {
        diff.affectedComponents.forEach(comp => affectedComponents.add(comp));
      }
    }

    // Calculate impact analysis
    summary.impactAnalysis.components = Array.from(affectedComponents);
    
    // Determine risk level
    if (summary.breaking > 0 || summary.removed > 5) {
      summary.impactAnalysis.riskLevel = 'high';
    } else if (summary.modified > 10 || summary.removed > 0) {
      summary.impactAnalysis.riskLevel = 'medium';
    }
    
    // Estimate effort (simplified calculation)
    summary.impactAnalysis.estimatedEffort = Math.ceil(
      (summary.breaking * 4) + 
      (summary.removed * 2) + 
      (summary.modified * 0.5) + 
      (summary.added * 0.25)
    );

    return summary;
  }

  /**
   * Format diff for display
   */
  formatDiff(diff: TokenDiff, format: 'text' | 'html' | 'markdown' = 'text'): string {
    switch (format) {
      case 'html':
        return this.formatDiffAsHTML(diff);
      case 'markdown':
        return this.formatDiffAsMarkdown(diff);
      default:
        return this.formatDiffAsText(diff);
    }
  }

  /**
   * Generate full diff report
   */
  generateReport(
    oldTokens: TokenSystem,
    newTokens: TokenSystem,
    options: DiffOptions & { format?: 'text' | 'html' | 'markdown' } = {}
  ): string {
    const diffs = this.calculateDiff(oldTokens, newTokens, options);
    const summary = this.generateSummary(diffs);
    const format = options.format || 'markdown';

    switch (format) {
      case 'html':
        return this.generateHTMLReport(diffs, summary);
      case 'text':
        return this.generateTextReport(diffs, summary);
      default:
        return this.generateMarkdownReport(diffs, summary);
    }
  }

  /**
   * Walk through token structure
   */
  private walkTokens(
    obj: any,
    path: string,
    callback: (path: string, value: any) => void
  ): void {
    if (obj === null || obj === undefined) return;

    if (typeof obj !== 'object' || obj instanceof Date || obj instanceof RegExp) {
      callback(path, obj);
      return;
    }

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        this.walkTokens(item, `${path}[${index}]`, callback);
      });
    } else {
      Object.entries(obj).forEach(([key, value]) => {
        const newPath = path ? `${path}.${key}` : key;
        this.walkTokens(value, newPath, callback);
      });
    }
  }

  /**
   * Deep equality check
   */
  private deepEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (typeof a !== typeof b) return false;

    if (typeof a !== 'object') return a === b;

    if (Array.isArray(a) !== Array.isArray(b)) return false;

    if (Array.isArray(a)) {
      if (a.length !== b.length) return false;
      return a.every((item, index) => this.deepEqual(item, b[index]));
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    return keysA.every(key => this.deepEqual(a[key], b[key]));
  }

  /**
   * Categorize token by path
   */
  private categorizeToken(path: string): string {
    const firstSegment = path.split('.')[0];
    return firstSegment || 'root';
  }

  /**
   * Assess impact of change
   */
  private assessImpact(
    type: DiffType,
    path: string,
    oldValue: any,
    newValue: any
  ): 'breaking' | 'minor' | 'patch' {
    // Removed tokens are always breaking
    if (type === 'removed') {
      return 'breaking';
    }

    // Added tokens are usually patch
    if (type === 'added') {
      return 'patch';
    }

    // For modifications, check the nature of the change
    if (type === 'modified') {
      // Type changes are breaking
      if (typeof oldValue !== typeof newValue) {
        return 'breaking';
      }

      // Structure changes in objects are breaking
      if (typeof oldValue === 'object' && oldValue !== null) {
        const oldKeys = Object.keys(oldValue);
        const newKeys = Object.keys(newValue);
        
        if (oldKeys.some(key => !newKeys.includes(key))) {
          return 'breaking';
        }
        
        if (newKeys.some(key => !oldKeys.includes(key))) {
          return 'minor';
        }
      }

      // Color or spacing changes are minor
      if (path.includes('color') || path.includes('spacing')) {
        return 'minor';
      }
    }

    return 'patch';
  }

  /**
   * Get components affected by token change
   */
  private getAffectedComponents(tokenPath: string): string[] {
    const affected: string[] = [];
    
    // Check direct mappings
    if (this.componentTokenMap.has(tokenPath)) {
      affected.push(...this.componentTokenMap.get(tokenPath)!);
    }
    
    // Check partial path matches
    for (const [path, components] of this.componentTokenMap) {
      if (path.startsWith(tokenPath) || tokenPath.startsWith(path)) {
        affected.push(...components);
      }
    }
    
    return [...new Set(affected)];
  }

  /**
   * Initialize component-token mapping
   */
  private initializeComponentTokenMap(): void {
    // This would be populated based on actual component usage
    // Here's a simplified example
    this.componentTokenMap.set('colors.primary', ['Button', 'Link', 'Badge']);
    this.componentTokenMap.set('colors.danger', ['Button', 'Alert', 'Toast']);
    this.componentTokenMap.set('spacing', ['Card', 'Container', 'Grid']);
    this.componentTokenMap.set('typography.fontSize', ['Text', 'Heading', 'Button']);
    this.componentTokenMap.set('borderRadius', ['Card', 'Button', 'Input']);
    this.componentTokenMap.set('shadows', ['Card', 'Modal', 'Dropdown']);
  }

  /**
   * Format diff as text
   */
  private formatDiffAsText(diff: TokenDiff): string {
    let output = `${diff.type.toUpperCase()}: ${diff.path}`;
    
    if (diff.type === 'modified') {
      output += `\n  Old: ${JSON.stringify(diff.oldValue)}`;
      output += `\n  New: ${JSON.stringify(diff.newValue)}`;
    } else if (diff.type === 'removed') {
      output += `\n  Value: ${JSON.stringify(diff.oldValue)}`;
    } else if (diff.type === 'added') {
      output += `\n  Value: ${JSON.stringify(diff.newValue)}`;
    }
    
    if (diff.impact) {
      output += `\n  Impact: ${diff.impact}`;
    }
    
    if (diff.affectedComponents?.length) {
      output += `\n  Affects: ${diff.affectedComponents.join(', ')}`;
    }
    
    return output;
  }

  /**
   * Format diff as HTML
   */
  private formatDiffAsHTML(diff: TokenDiff): string {
    const typeColors = {
      added: '#22c55e',
      modified: '#f59e0b',
      removed: '#ef4444',
      unchanged: '#6b7280',
    };
    
    return `
      <div style="margin-bottom: 1em; padding: 0.5em; border-left: 4px solid ${typeColors[diff.type]};">
        <strong>${diff.type.toUpperCase()}</strong>: <code>${diff.path}</code>
        ${diff.type === 'modified' ? `
          <div style="margin-top: 0.5em;">
            <div>Old: <code>${JSON.stringify(diff.oldValue)}</code></div>
            <div>New: <code>${JSON.stringify(diff.newValue)}</code></div>
          </div>
        ` : ''}
        ${diff.type === 'removed' ? `
          <div style="margin-top: 0.5em;">
            Value: <code>${JSON.stringify(diff.oldValue)}</code>
          </div>
        ` : ''}
        ${diff.type === 'added' ? `
          <div style="margin-top: 0.5em;">
            Value: <code>${JSON.stringify(diff.newValue)}</code>
          </div>
        ` : ''}
        ${diff.impact ? `<div style="margin-top: 0.5em;">Impact: <strong>${diff.impact}</strong></div>` : ''}
        ${diff.affectedComponents?.length ? `
          <div style="margin-top: 0.5em;">
            Affects: ${diff.affectedComponents.join(', ')}
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Format diff as markdown
   */
  private formatDiffAsMarkdown(diff: TokenDiff): string {
    const typeEmojis = {
      added: '➕',
      modified: '🔄',
      removed: '❌',
      unchanged: '○',
    };
    
    let output = `### ${typeEmojis[diff.type]} ${diff.type.toUpperCase()}: \`${diff.path}\`\n\n`;
    
    if (diff.type === 'modified') {
      output += `- **Old**: \`${JSON.stringify(diff.oldValue)}\`\n`;
      output += `- **New**: \`${JSON.stringify(diff.newValue)}\`\n`;
    } else if (diff.type === 'removed') {
      output += `- **Value**: \`${JSON.stringify(diff.oldValue)}\`\n`;
    } else if (diff.type === 'added') {
      output += `- **Value**: \`${JSON.stringify(diff.newValue)}\`\n`;
    }
    
    if (diff.impact) {
      output += `- **Impact**: ${diff.impact}\n`;
    }
    
    if (diff.affectedComponents?.length) {
      output += `- **Affects**: ${diff.affectedComponents.join(', ')}\n`;
    }
    
    return output;
  }

  /**
   * Generate markdown report
   */
  private generateMarkdownReport(diffs: TokenDiff[], summary: DiffSummary): string {
    let report = '# Token Diff Report\n\n';
    
    // Summary section
    report += '## Summary\n\n';
    report += `- **Total Changes**: ${summary.totalChanges}\n`;
    report += `- **Added**: ${summary.added}\n`;
    report += `- **Modified**: ${summary.modified}\n`;
    report += `- **Removed**: ${summary.removed}\n`;
    report += `- **Breaking Changes**: ${summary.breaking}\n\n`;
    
    // Impact analysis
    report += '## Impact Analysis\n\n';
    report += `- **Risk Level**: ${summary.impactAnalysis.riskLevel.toUpperCase()}\n`;
    report += `- **Estimated Effort**: ${summary.impactAnalysis.estimatedEffort} hours\n`;
    report += `- **Affected Components**: ${summary.impactAnalysis.components.length}\n`;
    if (summary.impactAnalysis.components.length > 0) {
      report += `  - ${summary.impactAnalysis.components.join('\n  - ')}\n`;
    }
    report += '\n';
    
    // Changes by category
    if (Object.keys(summary.categories).length > 0) {
      report += '## Changes by Category\n\n';
      for (const [category, count] of Object.entries(summary.categories)) {
        report += `- **${category}**: ${count} changes\n`;
      }
      report += '\n';
    }
    
    // Detailed changes
    report += '## Detailed Changes\n\n';
    
    // Group by type
    const grouped = diffs.reduce((acc, diff) => {
      if (diff.type !== 'unchanged') {
        acc[diff.type] = acc[diff.type] || [];
        acc[diff.type].push(diff);
      }
      return acc;
    }, {} as Record<string, TokenDiff[]>);
    
    for (const [type, typeDiffs] of Object.entries(grouped)) {
      report += `### ${type.charAt(0).toUpperCase() + type.slice(1)} Tokens\n\n`;
      for (const diff of typeDiffs) {
        report += this.formatDiffAsMarkdown(diff) + '\n';
      }
    }
    
    return report;
  }

  /**
   * Generate text report
   */
  private generateTextReport(diffs: TokenDiff[], summary: DiffSummary): string {
    let report = 'TOKEN DIFF REPORT\n';
    report += '=================\n\n';
    
    report += 'SUMMARY\n';
    report += '-------\n';
    report += `Total Changes: ${summary.totalChanges}\n`;
    report += `Added: ${summary.added}\n`;
    report += `Modified: ${summary.modified}\n`;
    report += `Removed: ${summary.removed}\n`;
    report += `Breaking Changes: ${summary.breaking}\n\n`;
    
    report += 'IMPACT ANALYSIS\n';
    report += '---------------\n';
    report += `Risk Level: ${summary.impactAnalysis.riskLevel.toUpperCase()}\n`;
    report += `Estimated Effort: ${summary.impactAnalysis.estimatedEffort} hours\n`;
    report += `Affected Components: ${summary.impactAnalysis.components.join(', ')}\n\n`;
    
    report += 'DETAILED CHANGES\n';
    report += '----------------\n\n';
    
    for (const diff of diffs) {
      if (diff.type !== 'unchanged') {
        report += this.formatDiffAsText(diff) + '\n\n';
      }
    }
    
    return report;
  }

  /**
   * Generate HTML report
   */
  private generateHTMLReport(diffs: TokenDiff[], summary: DiffSummary): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Token Diff Report</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 2em; }
          h1, h2, h3 { color: #1f2937; }
          .summary { background: #f3f4f6; padding: 1em; border-radius: 0.5em; margin-bottom: 2em; }
          .summary-stat { display: inline-block; margin-right: 2em; }
          .impact { background: #fef3c7; padding: 1em; border-radius: 0.5em; margin-bottom: 2em; }
          .changes { margin-top: 2em; }
          code { background: #e5e7eb; padding: 0.2em 0.4em; border-radius: 0.25em; }
        </style>
      </head>
      <body>
        <h1>Token Diff Report</h1>
        
        <div class="summary">
          <h2>Summary</h2>
          <div class="summary-stat"><strong>Total Changes:</strong> ${summary.totalChanges}</div>
          <div class="summary-stat"><strong>Added:</strong> ${summary.added}</div>
          <div class="summary-stat"><strong>Modified:</strong> ${summary.modified}</div>
          <div class="summary-stat"><strong>Removed:</strong> ${summary.removed}</div>
          <div class="summary-stat"><strong>Breaking:</strong> ${summary.breaking}</div>
        </div>
        
        <div class="impact">
          <h2>Impact Analysis</h2>
          <p><strong>Risk Level:</strong> ${summary.impactAnalysis.riskLevel.toUpperCase()}</p>
          <p><strong>Estimated Effort:</strong> ${summary.impactAnalysis.estimatedEffort} hours</p>
          <p><strong>Affected Components:</strong> ${summary.impactAnalysis.components.join(', ')}</p>
        </div>
        
        <div class="changes">
          <h2>Detailed Changes</h2>
          ${diffs.filter(d => d.type !== 'unchanged').map(diff => this.formatDiffAsHTML(diff)).join('')}
        </div>
      </body>
      </html>
    `;
  }
}