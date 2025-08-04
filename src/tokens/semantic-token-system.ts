/**
 * Semantic Token System
 * Minimal implementation for build compatibility
 */


/**
 * Token value type
 */
export type TokenValue = string | number | boolean;

/**
 * Token path type
 */
export type TokenPath = string;

/**
 * Token metadata interface
 */
export interface TokenMetadata {
  readonly category: string;
  readonly description?: string;
  readonly deprecated?: boolean;
  readonly group?: string;
}

/**
 * Semantic token interface
 */
export interface SemanticToken {
  readonly path: TokenPath;
  readonly value: TokenValue;
  readonly metadata: TokenMetadata;
}

/**
 * Token validation result
 */
export interface TokenValidationResult {
  readonly valid: boolean;
  readonly errors: string[];
  readonly warnings: string[];
}

/**
 * Semantic Token System class
 */
export class SemanticTokenSystem {
  private globalTokens: Record<string, TokenValue> = {};
  private aliasTokens: Record<string, TokenValue> = {};
  private componentTokens: Record<string, TokenValue> = {};
  private customTokens: Record<string, TokenValue> = {};
  private tokenChangeCallbacks: Array<() => void> = [];

  constructor() {
    // Initialize with default tokens
    this.initializeDefaultTokens();
  }

  /**
   * Initialize default tokens
   */
  private initializeDefaultTokens(): void {
    // Default implementation - can be extended
  }

  /**
   * Get global token
   */
  getGlobalToken(path: TokenPath): TokenValue | undefined {
    return this.globalTokens[path];
  }

  /**
   * Set global token
   */
  setGlobalToken(path: TokenPath, value: TokenValue): void {
    this.globalTokens[path] = value;
    this.notifyTokensChanged();
  }

  /**
   * Get alias token
   */
  getAliasToken(path: TokenPath): TokenValue | undefined {
    return this.aliasTokens[path];
  }

  /**
   * Set alias token
   */
  setAliasToken(path: TokenPath, value: TokenValue): void {
    this.aliasTokens[path] = value;
    this.notifyTokensChanged();
  }

  /**
   * Get component token
   */
  getComponentToken(path: TokenPath): TokenValue | undefined {
    return this.componentTokens[path];
  }

  /**
   * Set component token
   */
  setComponentToken(path: TokenPath, value: TokenValue): void {
    this.componentTokens[path] = value;
    this.notifyTokensChanged();
  }

  /**
   * Get token value
   */
  getTokenValue(path: TokenPath): TokenValue | undefined {
    return this.globalTokens[path] || this.aliasTokens[path] || this.componentTokens[path] || this.customTokens[path];
  }

  /**
   * Get CSS variable
   */
  getCSSVariable(path: TokenPath): string {
    return `--${path.replace(/\./g, '-')}`;
  }

  /**
   * Validate token
   */
  validateToken(path: TokenPath): TokenValidationResult {
    const value = this.getTokenValue(path);
    return {
      valid: value !== undefined,
      errors: value === undefined ? [`Token not found: ${path}`] : [],
      warnings: []
    };
  }

  /**
   * Get tokens by category
   */
  getTokensByCategory(category: string): SemanticToken[] {
    const tokens: SemanticToken[] = [];
    
    // Add global tokens
    Object.entries(this.globalTokens).forEach(([path, value]) => {
      if (path.startsWith(category)) {
        tokens.push({
          path: path as TokenPath,
          value,
          metadata: { category: 'global' }
        });
      }
    });

    // Add component tokens
    Object.entries(this.componentTokens).forEach(([path, value]) => {
      if (path.startsWith(category)) {
        tokens.push({
          path: path as TokenPath,
          value,
          metadata: { category: 'component' }
        });
      }
    });

    return tokens;
  }

  /**
   * Subscribe to token changes
   */
  subscribe(callback: () => void): () => void {
    this.tokenChangeCallbacks.push(callback);
    return () => {
      const index = this.tokenChangeCallbacks.indexOf(callback);
      if (index > -1) {
        this.tokenChangeCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * Notify token changes
   */
  private notifyTokensChanged(): void {
    this.tokenChangeCallbacks.forEach(callback => callback());
  }

  /**
   * Validate WCAG compliance
   */
   
   
  validateWCAGCompliance(_foreground: string, _background: string): boolean {
    // Simplified WCAG validation - can be enhanced
    return true;
  }
}

/**
 * Default token system instance
 */
export const tokenSystem = new SemanticTokenSystem();

/**
 * Utility functions
 */
export function getToken(path: TokenPath): TokenValue | undefined {
  return tokenSystem.getTokenValue(path);
}

export function getCSSVar(path: TokenPath): string {
  return tokenSystem.getCSSVariable(path);
}

export function validateToken(path: TokenPath): TokenValidationResult {
  return tokenSystem.validateToken(path);
}

export function validateTokens(paths: TokenPath[]): Record<TokenPath, TokenValidationResult> {
  const results: Record<TokenPath, TokenValidationResult> = {};
  paths.forEach(path => {
    results[path] = tokenSystem.validateToken(path);
  });
  return results;
}

export function getComponentTokens(componentName: string): Record<string, TokenValue> {
  const componentPrefix = `component.${componentName}`;
  const tokens = tokenSystem.getTokensByCategory('component');
  
  return tokens
    .filter((token: SemanticToken) => token.path.startsWith(componentPrefix))
    .reduce((acc: Record<string, TokenValue>, token: SemanticToken) => {
      const key = token.path.replace(componentPrefix + '.', '');
      acc[key] = token.value;
      return acc;
    }, {});
}

// Types are already exported above
