 
/**
 * @fileoverview Multiplatform Logger Implementation
 * @description Enterprise-grade logging that works on Web, Mobile (React Native), and Desktop (Electron)
 * @compliance Enterprise Standards, Cross-Platform Compatibility
 */

 

/**
 * Logger configuration interface
 */
export interface LoggerConfig {
  readonly serviceName: string;
  readonly logLevel: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  readonly enableConsoleLogging: boolean;
  readonly enableFileLogging: boolean;
}

/**
 * Logger interface for multiplatform compatibility
 */
export interface ILogger {
  readonly debug: (_message: string, _metadata?: unknown) => void;
  readonly info: (_message: string, _metadata?: unknown) => void;
  readonly warn: (_message: string, _metadata?: unknown) => void;
  readonly error: (_message: string, _error?: Error | unknown) => void;
  readonly fatal: (_message: string, _error?: Error | unknown) => void;
  readonly audit: (_data: unknown) => void;
  readonly child: (_metadata: unknown) => ILogger;
  readonly clearLogs: () => void;
}

/**
 * Platform detection utilities
 */
const Platform = {
  /**
   * Detect current platform
   */
  detect(): 'web' | 'react-native' | 'electron' | 'node' {
    // React Native detection
    if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
      return 'react-native';
    }
    
    // Electron detection (renderer process)
    if (typeof window !== 'undefined') {
      const win = window as unknown as { process?: { type?: string } };
      if (win.process?.type === 'renderer') {
        return 'electron';
      }
    }
    
    // Node.js detection
    if (typeof process !== 'undefined' && process.versions?.node) {
      return 'node';
    }
    
    // Default to web
    return 'web';
  },

  /**
   * Check if console methods are available
   */
  hasConsole(): boolean {
    return typeof console !== 'undefined';
  }
};

/**
 * Multiplatform logger implementation
 */
class MultiplatformLogger implements ILogger {
  private readonly config: LoggerConfig;
  private readonly prefix: string;
  private readonly platform: string;

  constructor(config: LoggerConfig) {
    this.config = config;
    this.prefix = `[${config.serviceName}]`;
    this.platform = Platform.detect();
  }

  private shouldLog(level: string): boolean {
    const levels = ['debug', 'info', 'warn', 'error', 'fatal'];
    const currentLevelIndex = levels.indexOf(this.config.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  }

  private formatMessage(level: string, message: string, metadata?: unknown): string {
    const timestamp = new Date().toISOString();
    const metaStr = metadata ? ` ${JSON.stringify(metadata)}` : '';
    return `${timestamp} ${level.toUpperCase()} ${this.prefix} ${message}${metaStr}`;
  }

  private logToConsole(level: 'debug' | 'info' | 'warn' | 'error', formattedMessage: string): void {
    if (!this.config.enableConsoleLogging || !Platform.hasConsole()) {
      return;
    }

    switch (level) {
      case 'debug':
         
        console.debug(formattedMessage);
        break;
      case 'info':
         
        console.info(formattedMessage);
        break;
      case 'warn':
         
        console.warn(formattedMessage);
        break;
      case 'error':
         
        console.error(formattedMessage);
        break;
    }
  }

  debug(message: string, metadata?: unknown): void {
    if (this.shouldLog('debug')) {
      this.logToConsole('debug', this.formatMessage('debug', message, metadata));
    }
  }

  info(message: string, metadata?: unknown): void {
    if (this.shouldLog('info')) {
      this.logToConsole('info', this.formatMessage('info', message, metadata));
    }
  }

  warn(message: string, metadata?: unknown): void {
    if (this.shouldLog('warn')) {
      this.logToConsole('warn', this.formatMessage('warn', message, metadata));
    }
  }

  error(message: string, error?: Error | unknown): void {
    if (this.shouldLog('error')) {
      const errorDetails = error instanceof Error ? error.stack : error;
      this.logToConsole('error', this.formatMessage('error', message, { error: errorDetails }));
    }
  }

  fatal(message: string, error?: Error | unknown): void {
    if (this.shouldLog('fatal')) {
      const errorDetails = error instanceof Error ? error.stack : error;
      this.logToConsole('error', this.formatMessage('fatal', message, { error: errorDetails }));
    }
  }

  audit(data: unknown): void {
    if (this.config.enableConsoleLogging) {
      this.logToConsole('info', this.formatMessage('audit', 'Audit log', data));
    }
  }

  child(_metadata: unknown): ILogger {
    return new MultiplatformLogger({
      ...this.config,
      serviceName: `${this.config.serviceName}:child`,
    });
  }

  clearLogs(): void {
    // Platform-specific log clearing could be implemented here
    // For now, this is a no-op since we can't clear console
  }
}

/**
 * Create a logger instance compatible with all platforms
 */
export function createLogger(config: LoggerConfig): ILogger {
  const platform = Platform.detect();
  const logger = new MultiplatformLogger(config);
  
  // Log platform detection for debugging
  if (config.logLevel === 'debug') {
    logger.debug(`Logger initialized for platform: ${platform}`);
  }
  
  return logger;
}

/**
 * Logger factory compatible with enterprise-standards API
 */
export const Logger = {
  create: createLogger,
};

/**
 * Default export
 */
export default Logger; 