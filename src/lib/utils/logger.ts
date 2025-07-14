/**
 * @fileoverview Enterprise Logging Utility
 * @module Logger
 * @description Production-ready logging with levels and structured output
 */

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface LogEntry {
  readonly timestamp: string;
  readonly level: LogLevel;
  readonly message: string;
  readonly context?: Record<string, unknown>;
  readonly error?: Error;
}

class Logger {
  private readonly logLevel: LogLevel;
  private readonly isProduction: boolean;

  constructor(logLevel: LogLevel = 'warn') {
    this.logLevel = logLevel;
    this.isProduction = process.env['NODE_ENV'] === 'production';
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    };
    return levels[level] <= levels[this.logLevel];
  }

  private formatMessage(level: LogLevel, message: string, context?: Record<string, unknown>): string {
    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = {
      timestamp,
      level,
      message,
      context,
    };

    if (this.isProduction) {
      return JSON.stringify(logEntry);
    }

    return `[${timestamp}] ${level.toUpperCase()}: ${message}${
      context ? ` ${JSON.stringify(context)}` : ''
    }`;
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    if (!this.shouldLog('error')) return;

    const logMessage = this.formatMessage('error', message, { ...context, error: error?.message });
    
    if (this.isProduction) {
      // In production, use structured logging service
      // This would integrate with your logging service (e.g., Winston, Pino)
      // For now, we'll suppress output in production
      return;
    }

    // Development only
    console.error(logMessage);
    if (error) {
      console.error(error.stack);
    }
  }

  warn(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog('warn')) return;

    const logMessage = this.formatMessage('warn', message, context);
    
    if (this.isProduction) {
      return;
    }

    console.warn(logMessage);
  }

  info(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog('info')) return;

    const logMessage = this.formatMessage('info', message, context);
    
    if (this.isProduction) {
      return;
    }

    console.info(logMessage);
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog('debug')) return;

    const logMessage = this.formatMessage('debug', message, context);
    
    if (this.isProduction) {
      return;
    }

    console.debug(logMessage);
  }
}

export const logger = new Logger();
export default logger; 