/**
 * Token Versioning System
 * Manages versions, migrations, and compatibility for design tokens
 */

import { TokenSystem } from '../types';
import { deepClone, get, set } from '../../utils/object';
import { TokenSerializer } from '../serialization';

export interface TokenVersion {
  version: string;
  createdAt: string;
  createdBy?: string;
  description?: string;
  breaking?: boolean;
  tags?: string[];
  parent?: string;
  changes?: TokenChange[];
}

export interface TokenChange {
  type: 'add' | 'modify' | 'remove' | 'rename';
  path: string;
  oldValue?: any;
  newValue?: any;
  reason?: string;
}

export interface TokenMigration {
  fromVersion: string;
  toVersion: string;
  description?: string;
  breaking?: boolean;
  migrate: (tokens: TokenSystem) => TokenSystem | Promise<TokenSystem>;
  rollback?: (tokens: TokenSystem) => TokenSystem | Promise<TokenSystem>;
}

export interface VersioningOptions {
  autoTag?: boolean;
  enforceBreaking?: boolean;
  maxVersions?: number;
  compressionThreshold?: number;
}

/**
 * Semantic version utilities
 */
export class SemanticVersion {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string;
  build?: string;

  constructor(version: string) {
    const parsed = this.parse(version);
    this.major = parsed.major;
    this.minor = parsed.minor;
    this.patch = parsed.patch;
    this.prerelease = parsed.prerelease;
    this.build = parsed.build;
  }

  private parse(version: string): SemanticVersion {
    const match = version.match(
      /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/
    );

    if (!match) {
      throw new Error(`Invalid semantic version: ${version}`);
    }

    return {
      major: parseInt(match[1], 10),
      minor: parseInt(match[2], 10),
      patch: parseInt(match[3], 10),
      prerelease: match[4],
      build: match[5],
    };
  }

  toString(): string {
    let version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease) {
      version += `-${this.prerelease}`;
    }
    if (this.build) {
      version += `+${this.build}`;
    }
    return version;
  }

  increment(type: 'major' | 'minor' | 'patch'): SemanticVersion {
    const newVersion = new SemanticVersion(this.toString());
    
    switch (type) {
      case 'major':
        newVersion.major++;
        newVersion.minor = 0;
        newVersion.patch = 0;
        break;
      case 'minor':
        newVersion.minor++;
        newVersion.patch = 0;
        break;
      case 'patch':
        newVersion.patch++;
        break;
    }
    
    newVersion.prerelease = undefined;
    newVersion.build = undefined;
    
    return newVersion;
  }

  compare(other: SemanticVersion | string): number {
    const otherVersion = typeof other === 'string' ? new SemanticVersion(other) : other;
    
    if (this.major !== otherVersion.major) {
      return this.major - otherVersion.major;
    }
    if (this.minor !== otherVersion.minor) {
      return this.minor - otherVersion.minor;
    }
    if (this.patch !== otherVersion.patch) {
      return this.patch - otherVersion.patch;
    }
    
    // Handle prerelease comparison
    if (this.prerelease && !otherVersion.prerelease) return -1;
    if (!this.prerelease && otherVersion.prerelease) return 1;
    if (this.prerelease && otherVersion.prerelease) {
      return this.prerelease.localeCompare(otherVersion.prerelease);
    }
    
    return 0;
  }

  isCompatible(other: SemanticVersion | string): boolean {
    const otherVersion = typeof other === 'string' ? new SemanticVersion(other) : other;
    
    // Major version must match for compatibility
    if (this.major !== otherVersion.major) {
      return false;
    }
    
    // If major is 0, minor must also match (0.x.x versions are unstable)
    if (this.major === 0 && this.minor !== otherVersion.minor) {
      return false;
    }
    
    return true;
  }
}

/**
 * Token versioning manager
 */
export class TokenVersionManager {
  private versions: Map<string, { version: TokenVersion; tokens: TokenSystem }> = new Map();
  private migrations: TokenMigration[] = [];
  private currentVersion: string = '1.0.0';

  constructor(private options: VersioningOptions = {}) {}

  /**
   * Create a new version
   */
  async createVersion(
    tokens: TokenSystem,
    versionInfo: Omit<TokenVersion, 'version' | 'createdAt'>
  ): Promise<string> {
    const currentSemVer = new SemanticVersion(this.currentVersion);
    
    // Determine version increment type
    let incrementType: 'major' | 'minor' | 'patch' = 'patch';
    
    if (versionInfo.breaking || this.hasBreakingChanges(versionInfo.changes)) {
      incrementType = 'major';
    } else if (this.hasNewFeatures(versionInfo.changes)) {
      incrementType = 'minor';
    }

    const newSemVer = currentSemVer.increment(incrementType);
    const newVersion = newSemVer.toString();

    // Calculate changes if not provided
    const changes = versionInfo.changes || await this.calculateChanges(
      this.getCurrentTokens(),
      tokens
    );

    const version: TokenVersion = {
      version: newVersion,
      createdAt: new Date().toISOString(),
      parent: this.currentVersion,
      ...versionInfo,
      changes,
    };

    // Store version
    this.versions.set(newVersion, {
      version,
      tokens: deepClone(tokens),
    });

    // Update current version
    this.currentVersion = newVersion;

    // Cleanup old versions if needed
    if (this.options.maxVersions && this.versions.size > this.options.maxVersions) {
      this.pruneOldVersions();
    }

    // Auto-tag if enabled
    if (this.options.autoTag && versionInfo.tags) {
      await this.tagVersion(newVersion, versionInfo.tags);
    }

    return newVersion;
  }

  /**
   * Get a specific version
   */
  getVersion(version: string): { version: TokenVersion; tokens: TokenSystem } | null {
    return this.versions.get(version) || null;
  }

  /**
   * Get current tokens
   */
  getCurrentTokens(): TokenSystem | null {
    const current = this.versions.get(this.currentVersion);
    return current ? current.tokens : null;
  }

  /**
   * List all versions
   */
  listVersions(): TokenVersion[] {
    return Array.from(this.versions.values())
      .map(v => v.version)
      .sort((a, b) => {
        const semA = new SemanticVersion(a.version);
        const semB = new SemanticVersion(b.version);
        return semB.compare(semA); // Reverse order (newest first)
      });
  }

  /**
   * Switch to a specific version
   */
  async switchToVersion(version: string): Promise<TokenSystem> {
    const versionData = this.versions.get(version);
    if (!versionData) {
      throw new Error(`Version ${version} not found`);
    }

    this.currentVersion = version;
    return versionData.tokens;
  }

  /**
   * Add a migration
   */
  addMigration(migration: TokenMigration): void {
    this.migrations.push(migration);
    this.migrations.sort((a, b) => {
      const fromA = new SemanticVersion(a.fromVersion);
      const fromB = new SemanticVersion(b.fromVersion);
      return fromA.compare(fromB);
    });
  }

  /**
   * Migrate tokens from one version to another
   */
  async migrate(
    tokens: TokenSystem,
    fromVersion: string,
    toVersion: string
  ): Promise<TokenSystem> {
    const fromSemVer = new SemanticVersion(fromVersion);
    const toSemVer = new SemanticVersion(toVersion);

    if (fromSemVer.compare(toSemVer) === 0) {
      return tokens;
    }

    const isUpgrade = fromSemVer.compare(toSemVer) < 0;
    let currentTokens = deepClone(tokens);
    let currentVersion = fromVersion;

    if (isUpgrade) {
      // Apply migrations in order
      for (const migration of this.migrations) {
        const migrationFrom = new SemanticVersion(migration.fromVersion);
        const migrationTo = new SemanticVersion(migration.toVersion);

        if (
          migrationFrom.compare(currentVersion) >= 0 &&
          migrationTo.compare(toVersion) <= 0
        ) {
          currentTokens = await migration.migrate(currentTokens);
          currentVersion = migration.toVersion;
        }
      }
    } else {
      // Apply rollbacks in reverse order
      const reverseMigrations = [...this.migrations].reverse();
      for (const migration of reverseMigrations) {
        if (migration.rollback) {
          const migrationFrom = new SemanticVersion(migration.fromVersion);
          const migrationTo = new SemanticVersion(migration.toVersion);

          if (
            migrationTo.compare(currentVersion) <= 0 &&
            migrationFrom.compare(toVersion) >= 0
          ) {
            currentTokens = await migration.rollback(currentTokens);
            currentVersion = migration.fromVersion;
          }
        }
      }
    }

    return currentTokens;
  }

  /**
   * Tag a version
   */
  async tagVersion(version: string, tags: string[]): Promise<void> {
    const versionData = this.versions.get(version);
    if (!versionData) {
      throw new Error(`Version ${version} not found`);
    }

    versionData.version.tags = [
      ...(versionData.version.tags || []),
      ...tags,
    ];
  }

  /**
   * Get versions by tag
   */
  getVersionsByTag(tag: string): TokenVersion[] {
    return Array.from(this.versions.values())
      .map(v => v.version)
      .filter(v => v.tags?.includes(tag));
  }

  /**
   * Calculate changes between two token systems
   */
  private async calculateChanges(
    oldTokens: TokenSystem | null,
    newTokens: TokenSystem
  ): Promise<TokenChange[]> {
    const changes: TokenChange[] = [];

    if (!oldTokens) {
      // Everything is new
      changes.push({
        type: 'add',
        path: '',
        newValue: newTokens,
        reason: 'Initial version',
      });
      return changes;
    }

    // Deep diff the token systems
    this.diffTokens(oldTokens, newTokens, '', changes);

    return changes;
  }

  /**
   * Diff two token systems
   */
  private diffTokens(
    oldObj: any,
    newObj: any,
    path: string,
    changes: TokenChange[]
  ): void {
    const oldKeys = Object.keys(oldObj || {});
    const newKeys = Object.keys(newObj || {});
    const allKeys = new Set([...oldKeys, ...newKeys]);

    for (const key of allKeys) {
      const currentPath = path ? `${path}.${key}` : key;
      const oldValue = oldObj?.[key];
      const newValue = newObj?.[key];

      if (oldValue === undefined && newValue !== undefined) {
        // Added
        changes.push({
          type: 'add',
          path: currentPath,
          newValue,
        });
      } else if (oldValue !== undefined && newValue === undefined) {
        // Removed
        changes.push({
          type: 'remove',
          path: currentPath,
          oldValue,
        });
      } else if (typeof oldValue !== typeof newValue) {
        // Type changed
        changes.push({
          type: 'modify',
          path: currentPath,
          oldValue,
          newValue,
        });
      } else if (typeof oldValue === 'object' && oldValue !== null) {
        // Recurse into objects
        this.diffTokens(oldValue, newValue, currentPath, changes);
      } else if (oldValue !== newValue) {
        // Value changed
        changes.push({
          type: 'modify',
          path: currentPath,
          oldValue,
          newValue,
        });
      }
    }
  }

  /**
   * Check if changes contain breaking changes
   */
  private hasBreakingChanges(changes?: TokenChange[]): boolean {
    if (!changes) return false;

    return changes.some(change => 
      change.type === 'remove' ||
      (change.type === 'modify' && this.isBreakingModification(change))
    );
  }

  /**
   * Check if a modification is breaking
   */
  private isBreakingModification(change: TokenChange): boolean {
    // Check if type changed
    if (typeof change.oldValue !== typeof change.newValue) {
      return true;
    }

    // Check if structure changed significantly
    if (typeof change.oldValue === 'object') {
      const oldKeys = Object.keys(change.oldValue || {});
      const newKeys = Object.keys(change.newValue || {});
      
      // If keys were removed, it's breaking
      return oldKeys.some(key => !newKeys.includes(key));
    }

    return false;
  }

  /**
   * Check if changes contain new features
   */
  private hasNewFeatures(changes?: TokenChange[]): boolean {
    if (!changes) return false;

    return changes.some(change => change.type === 'add');
  }

  /**
   * Prune old versions
   */
  private pruneOldVersions(): void {
    const sortedVersions = this.listVersions();
    const versionsToKeep = sortedVersions.slice(0, this.options.maxVersions);
    const versionKeysToKeep = new Set(versionsToKeep.map(v => v.version));

    // Remove old versions
    for (const [key] of this.versions) {
      if (!versionKeysToKeep.has(key)) {
        this.versions.delete(key);
      }
    }
  }

  /**
   * Export version history
   */
  async exportHistory(options?: { format?: 'json' | 'yaml' }): Promise<string> {
    const history = {
      currentVersion: this.currentVersion,
      versions: this.listVersions(),
      migrations: this.migrations.map(m => ({
        fromVersion: m.fromVersion,
        toVersion: m.toVersion,
        description: m.description,
        breaking: m.breaking,
      })),
    };

    if (options?.format === 'yaml') {
      const yaml = await import('js-yaml');
      return yaml.dump(history);
    }

    return JSON.stringify(history, null, 2);
  }
}