/**
 * Token Serialization and Deserialization
 * Handles conversion of tokens between different formats for storage and transmission
 */

import { TokenSystem } from '../types';
import { validateTokensAgainstSchema, generateJSONSchema } from '../transformers';

export interface SerializationOptions {
  format?: 'json' | 'yaml' | 'toml' | 'binary';
  minify?: boolean;
  includeMetadata?: boolean;
  compression?: 'none' | 'gzip' | 'brotli';
  validate?: boolean;
  pretty?: boolean;
  excludeEmpty?: boolean;
}

export interface SerializedTokens {
  format: string;
  version: string;
  timestamp: string;
  data: string | Buffer;
  metadata?: {
    originalSize: number;
    compressedSize?: number;
    checksum: string;
    compression?: string;
  };
}

/**
 * Token serializer class
 */
export class TokenSerializer {
  private static readonly VERSION = '1.0.0';

  /**
   * Serialize tokens to string format
   */
  static async serialize(
    tokens: TokenSystem,
    options: SerializationOptions = {}
  ): Promise<SerializedTokens> {
    const {
      format = 'json',
      minify = false,
      includeMetadata = true,
      compression = 'none',
      validate = true,
      pretty = !minify,
      excludeEmpty = false,
    } = options;

    // Validate tokens before serialization
    if (validate) {
      const schema = generateJSONSchema(tokens);
      const validation = validateTokensAgainstSchema(tokens, schema.schema);
      if (!validation.valid) {
        throw new Error(`Token validation failed: ${validation.errors.join(', ')}`);
      }
    }

    // Clean tokens if needed
    const cleanedTokens = excludeEmpty ? this.removeEmptyValues(tokens) : tokens;

    // Serialize based on format
    let serializedData: string;
    switch (format) {
      case 'json':
        serializedData = this.serializeToJSON(cleanedTokens, pretty);
        break;
      case 'yaml':
        serializedData = await this.serializeToYAML(cleanedTokens);
        break;
      case 'toml':
        serializedData = await this.serializeToTOML(cleanedTokens);
        break;
      case 'binary':
        serializedData = await this.serializeToBinary(cleanedTokens);
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    // Apply compression if needed
    const compressedData = await this.compress(serializedData, compression);

    // Generate metadata
    const metadata = includeMetadata ? {
      originalSize: Buffer.byteLength(serializedData, 'utf8'),
      compressedSize: compression !== 'none' ? Buffer.byteLength(compressedData, 'utf8') : undefined,
      checksum: this.generateChecksum(serializedData),
      compression: compression !== 'none' ? compression : undefined,
    } : undefined;

    return {
      format,
      version: this.VERSION,
      timestamp: new Date().toISOString(),
      data: compressedData,
      metadata,
    };
  }

  /**
   * Deserialize tokens from string format
   */
  static async deserialize(
    serialized: SerializedTokens,
    options: { validate?: boolean } = {}
  ): Promise<TokenSystem> {
    const { validate = true } = options;

    // Decompress if needed
    let decompressedData = serialized.data;
    if (serialized.metadata?.compression) {
      decompressedData = await this.decompress(
        serialized.data,
        serialized.metadata.compression as 'gzip' | 'brotli'
      );
    }

    // Verify checksum if available
    if (serialized.metadata?.checksum) {
      const currentChecksum = this.generateChecksum(decompressedData.toString());
      if (currentChecksum !== serialized.metadata.checksum) {
        throw new Error('Checksum verification failed');
      }
    }

    // Deserialize based on format
    let tokens: TokenSystem;
    switch (serialized.format) {
      case 'json':
        tokens = this.deserializeFromJSON(decompressedData.toString());
        break;
      case 'yaml':
        tokens = await this.deserializeFromYAML(decompressedData.toString());
        break;
      case 'toml':
        tokens = await this.deserializeFromTOML(decompressedData.toString());
        break;
      case 'binary':
        tokens = await this.deserializeFromBinary(decompressedData);
        break;
      default:
        throw new Error(`Unsupported format: ${serialized.format}`);
    }

    // Validate deserialized tokens
    if (validate) {
      const schema = generateJSONSchema(tokens);
      const validation = validateTokensAgainstSchema(tokens, schema.schema);
      if (!validation.valid) {
        throw new Error(`Deserialized token validation failed: ${validation.errors.join(', ')}`);
      }
    }

    return tokens;
  }

  /**
   * JSON serialization
   */
  private static serializeToJSON(tokens: TokenSystem, pretty: boolean): string {
    return JSON.stringify(tokens, null, pretty ? 2 : 0);
  }

  /**
   * JSON deserialization
   */
  private static deserializeFromJSON(data: string): TokenSystem {
    try {
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Failed to parse JSON: ${error}`);
    }
  }

  /**
   * YAML serialization (requires dynamic import)
   */
  private static async serializeToYAML(tokens: TokenSystem): Promise<string> {
    try {
      const yaml = await import('js-yaml');
      return yaml.dump(tokens);
    } catch (error) {
      throw new Error('YAML serialization requires js-yaml package');
    }
  }

  /**
   * YAML deserialization
   */
  private static async deserializeFromYAML(data: string): Promise<TokenSystem> {
    try {
      const yaml = await import('js-yaml');
      return yaml.load(data) as TokenSystem;
    } catch (error) {
      throw new Error('YAML deserialization requires js-yaml package');
    }
  }

  /**
   * TOML serialization (requires dynamic import)
   */
  private static async serializeToTOML(tokens: TokenSystem): Promise<string> {
    try {
      const toml = await import('@iarna/toml');
      return toml.stringify(tokens as any);
    } catch (error) {
      throw new Error('TOML serialization requires @iarna/toml package');
    }
  }

  /**
   * TOML deserialization
   */
  private static async deserializeFromTOML(data: string): Promise<TokenSystem> {
    try {
      const toml = await import('@iarna/toml');
      return toml.parse(data) as unknown as TokenSystem;
    } catch (error) {
      throw new Error('TOML deserialization requires @iarna/toml package');
    }
  }

  /**
   * Binary serialization using MessagePack
   */
  private static async serializeToBinary(tokens: TokenSystem): Promise<string> {
    try {
      const msgpack = await import('@msgpack/msgpack');
      const encoded = msgpack.encode(tokens);
      return Buffer.from(encoded).toString('base64');
    } catch (error) {
      throw new Error('Binary serialization requires @msgpack/msgpack package');
    }
  }

  /**
   * Binary deserialization
   */
  private static async deserializeFromBinary(data: string | Buffer): Promise<TokenSystem> {
    try {
      const msgpack = await import('@msgpack/msgpack');
      const buffer = typeof data === 'string' ? Buffer.from(data, 'base64') : data;
      return msgpack.decode(buffer) as TokenSystem;
    } catch (error) {
      throw new Error('Binary deserialization requires @msgpack/msgpack package');
    }
  }

  /**
   * Compress data
   */
  private static async compress(
    data: string,
    compression: 'none' | 'gzip' | 'brotli'
  ): Promise<string | Buffer> {
    if (compression === 'none') {
      return data;
    }

    const { promisify } = await import('util');
    const zlib = await import('zlib');

    const buffer = Buffer.from(data, 'utf8');

    switch (compression) {
      case 'gzip':
        const gzip = promisify(zlib.gzip);
        return await gzip(buffer);
      case 'brotli':
        const brotliCompress = promisify(zlib.brotliCompress);
        return await brotliCompress(buffer);
      default:
        return data;
    }
  }

  /**
   * Decompress data
   */
  private static async decompress(
    data: string | Buffer,
    compression: 'gzip' | 'brotli'
  ): Promise<Buffer> {
    const { promisify } = await import('util');
    const zlib = await import('zlib');

    const buffer = typeof data === 'string' ? Buffer.from(data, 'base64') : data;

    switch (compression) {
      case 'gzip':
        const gunzip = promisify(zlib.gunzip);
        return await gunzip(buffer);
      case 'brotli':
        const brotliDecompress = promisify(zlib.brotliDecompress);
        return await brotliDecompress(buffer);
      default:
        return buffer;
    }
  }

  /**
   * Generate checksum for data integrity
   */
  private static generateChecksum(data: string): string {
    const crypto = require('crypto');
    return crypto
      .createHash('sha256')
      .update(data, 'utf8')
      .digest('hex');
  }

  /**
   * Remove empty values from tokens
   */
  private static removeEmptyValues(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.filter(item => item != null).map(item => this.removeEmptyValues(item));
    } else if (obj !== null && typeof obj === 'object') {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value != null && value !== '' && !(Array.isArray(value) && value.length === 0)) {
          acc[key] = this.removeEmptyValues(value);
        }
        return acc;
      }, {} as any);
    }
    return obj;
  }
}

/**
 * Token storage interface
 */
export interface TokenStorage {
  save(key: string, tokens: TokenSystem): Promise<void>;
  load(key: string): Promise<TokenSystem | null>;
  exists(key: string): Promise<boolean>;
  delete(key: string): Promise<void>;
  list(): Promise<string[]>;
}

/**
 * Local storage implementation
 */
export class LocalStorageTokenStorage implements TokenStorage {
  private readonly prefix = 'xala-tokens-';

  async save(key: string, tokens: TokenSystem): Promise<void> {
    const serialized = await TokenSerializer.serialize(tokens, {
      format: 'json',
      minify: true,
      validate: true,
    });
    
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.prefix + key, JSON.stringify(serialized));
    }
  }

  async load(key: string): Promise<TokenSystem | null> {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    const item = localStorage.getItem(this.prefix + key);
    if (!item) {
      return null;
    }

    try {
      const serialized = JSON.parse(item) as SerializedTokens;
      return await TokenSerializer.deserialize(serialized);
    } catch (error) {
      console.error('Failed to load tokens:', error);
      return null;
    }
  }

  async exists(key: string): Promise<boolean> {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    return localStorage.getItem(this.prefix + key) !== null;
  }

  async delete(key: string): Promise<void> {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.prefix + key);
    }
  }

  async list(): Promise<string[]> {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [];
    }

    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keys.push(key.substring(this.prefix.length));
      }
    }
    return keys;
  }
}

/**
 * File system storage implementation (Node.js)
 */
export class FileSystemTokenStorage implements TokenStorage {
  constructor(private readonly basePath: string) {}

  async save(key: string, tokens: TokenSystem): Promise<void> {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const serialized = await TokenSerializer.serialize(tokens, {
      format: 'json',
      pretty: true,
      validate: true,
    });
    
    const filePath = path.join(this.basePath, `${key}.json`);
    await fs.writeFile(filePath, serialized.data);
  }

  async load(key: string): Promise<TokenSystem | null> {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const filePath = path.join(this.basePath, `${key}.json`);
    
    try {
      const data = await fs.readFile(filePath, 'utf8');
      const serialized: SerializedTokens = {
        format: 'json',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        data,
      };
      return await TokenSerializer.deserialize(serialized);
    } catch (error) {
      return null;
    }
  }

  async exists(key: string): Promise<boolean> {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const filePath = path.join(this.basePath, `${key}.json`);
    
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async delete(key: string): Promise<void> {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const filePath = path.join(this.basePath, `${key}.json`);
    await fs.unlink(filePath);
  }

  async list(): Promise<string[]> {
    const fs = await import('fs/promises');
    
    try {
      const files = await fs.readdir(this.basePath);
      return files
        .filter(file => file.endsWith('.json'))
        .map(file => file.replace('.json', ''));
    } catch {
      return [];
    }
  }
}