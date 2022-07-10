import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import { dbDataSource } from './config/db-data-source';
import { useContainer, useKoaServer } from 'routing-controllers';
import { Container } from 'typedi';
import { PresetController } from './controller/preset.controller';
import { Logger } from './lib/logger';
import { ErrorHandlerMiddleware } from './middleware/error-handler.middleware';
import { config } from './config';

const logger = Logger.create('app');

export const app = new Koa();

app.use(bodyParser());
app.use(cors());

useContainer(Container);
useKoaServer(app, {
  routePrefix: '/api',
  controllers: [PresetController],
  middlewares: [ErrorHandlerMiddleware],
  defaultErrorHandler: false
});

dbDataSource.initialize().catch(error => logger.error('db-datasource-initialize-error', error));

const port = config.port;
app.listen(port, () => logger.info(`Listening on ${port}`));
