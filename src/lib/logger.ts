import pino, { BaseLogger } from 'pino';

export class Logger {
  static create(name: string): Logger {
    const pinoLogger = pino({ name });
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
    this.pinoLogger.error({ action, ...attributes });
  }
}
