import { Logger } from '../../src/lib/logger';
import { stub } from 'sinon';
import pino, { BaseLogger } from 'pino';
import { expect } from 'chai';

describe('Logger', () => {
  it('should create a pino logger with provided name', () => {
    stub(pino);

    Logger.create('name');

    expect(pino).to.have.been.calledWithExactly({ name: 'name', enabled: false });
  });

  it('should log info message with provided action name', () => {
    const pinoLogger = createStubbedPinoLogger();

    new Logger(pinoLogger as any).info('actionName');

    expect(pinoLogger.info).to.have.been.calledWithExactly({
      action: 'actionName'
    });
  });

  it('should log warn message with provided action name', () => {
    const pinoLogger = createStubbedPinoLogger();

    new Logger(pinoLogger as any).warn('actionName');

    expect(pinoLogger.warn).to.have.been.calledWithExactly({
      action: 'actionName'
    });
  });

  it('should log error message with provided action name', () => {
    const pinoLogger = createStubbedPinoLogger();

    new Logger(pinoLogger as any).error('actionName');

    expect(pinoLogger.error).to.have.been.calledWithExactly({
      action: 'actionName'
    });
  });

  it('should log additional info attributes', () => {
    const pinoLogger = createStubbedPinoLogger();

    new Logger(pinoLogger as any).info('actionName', {
      attribute: 123,
      otherAttribute: 'otherAttribute'
    });

    expect(pinoLogger.info).to.have.been.calledWithExactly({
      action: 'actionName',
      attribute: 123,
      otherAttribute: 'otherAttribute'
    });
  });
});

function createStubbedPinoLogger(): Partial<BaseLogger> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const pinoLogger = { info: () => {}, warn: () => {}, error: () => {} };
  stub(pinoLogger, 'info');
  stub(pinoLogger, 'warn');
  stub(pinoLogger, 'error');
  return pinoLogger;
}
