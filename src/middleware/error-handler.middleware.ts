import * as Koa from 'koa';
import { Logger } from '../lib/logger';
import { HttpStatus } from '../lib/http-status';
import { KoaMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';

const logger = Logger.create('error-handler-middleware');

@Service()
@Middleware({ type: 'before' })
export class ErrorHandlerMiddleware implements KoaMiddlewareInterface {
  async use(context: Koa.Context, next: Koa.Next): Promise<void> {
    try {
      await next();
    } catch (error: any) {
      const status = error.statusCode || error.status || error.code || 500;
      this.logError(error, status, context);

      context.status = status;
      context.body = {
        message: error.message
      };
    }
  }

  private logError(error: any, status: number, context: Koa.Context): void {
    const logContext = {
      // TODO: extract to logger class
      error_name: error.name,
      error_message: error.message,
      error_stack: error.stack,
      status_code: status,
      path: context.request.path
    };
    if (status < HttpStatus.INTERNAL_SERVER_ERROR) {
      logger.warn('request-failed', logContext);
    } else {
      logger.error('request-failed', logContext);
    }
  }
}
