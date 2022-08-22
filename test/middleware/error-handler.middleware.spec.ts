import { createFakeContext, createFakeRequest } from '../../src/test-util/test-factories';
import { ErrorHandlerMiddleware } from '../../src/middleware/error-handler.middleware';
import { expect } from 'chai';
import { stub } from 'sinon';
import { Logger } from '../../src/lib/logger';
import { randomUUID } from 'crypto';

describe('ErrorHandlerMiddleware', () => {
  describe('setting status code', () => {
    it('should set status code from error status', async () => {
      const status = 444;
      const next = async () => {
        throw new CustomError({ status });
      };
      const context = createFakeContext();

      await new ErrorHandlerMiddleware().use(context, next);

      expect(context.status).to.equal(status);
    });

    it('should set status code from error statusCode', async () => {
      const statusCode = 444;
      const next = async () => {
        throw new CustomError({ status: statusCode });
      };
      const context = createFakeContext();

      await new ErrorHandlerMiddleware().use(context, next);

      expect(context.status).to.equal(statusCode);
    });

    it('should set default status code when it is not on error', async () => {
      const next = async () => {
        throw new Error();
      };
      const context = createFakeContext();

      await new ErrorHandlerMiddleware().use(context, next);

      expect(context.status).to.equal(500);
    });
  });

  describe('logging', () => {
    it('should log error when status code is 500 or higher', async () => {
      const status = 500;
      const next = async () => {
        throw new CustomError({ status: status });
      };
      const context = createFakeContext({
        request: createFakeRequest({ path: 'test/path' })
      });
      stub(Logger.prototype, 'error');

      await new ErrorHandlerMiddleware().use(context, next);

      expect(Logger.prototype.error).to.have.been.calledWithMatch('request-failed', {
        status_code: status,
        path: 'test/path'
      });
    });

    it('should log warn when status code is lower than 500', async () => {
      const status = 404;
      const next = async () => {
        throw new CustomError({ status: status });
      };
      const context = createFakeContext({
        request: createFakeRequest({ path: 'test/path' })
      });
      stub(Logger.prototype, 'warn');

      await new ErrorHandlerMiddleware().use(context, next);

      expect(Logger.prototype.warn).to.have.been.calledWithMatch('request-failed', {
        status_code: status,
        path: 'test/path'
      });
    });
  });

  describe('message', () => {
    it('should set message from error', async () => {
      const errorMessage = randomUUID();
      const next = async () => {
        throw new Error(errorMessage);
      };
      const context = createFakeContext();

      await new ErrorHandlerMiddleware().use(context, next);

      expect(context.body).to.deep.equal({
        message: errorMessage
      });
    });
  });
});

class CustomError extends Error {
  constructor(properties: any) {
    super();
    Object.assign(this, properties);
  }
}
