import pino, { BaseLogger } from 'pino';

export class Logger {
  static create(namespace: string): Logger {
    const isLoggingEnabled = process.env.NODE_ENV !== 'test';
    const pinoLogger = pino({
      name: namespace,
      enabled: isLoggingEnabled
    });
    return new Logger(pinoLogger);
  }

  constructor(private pinoLogger: BaseLogger) {}

  info(action: string, attributes: Record<string, unknown> = {}): void {
    this.pinoLogger.info({ action, ...attributes });
  }

  warn(action: string, attributes: Record<string, unknown> = {}): void {
    this.pinoLogger.warn({ action, ...attributes });
  }

  error(action: string, attributes: Record<string, unknown> = {}): void {
    // TODO: error attributes (or others are not logged)
    this.pinoLogger.error({ action, ...attributes });
  }
}
