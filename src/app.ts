import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as logger from 'koa-logger';
import { controllers } from './controller/controllers';
import { dbDataSource } from './config/db-data-source';

export const app = new Koa();
const router = new Router();

controllers(router);

app.use(bodyParser());
app.use(cors());
app.use(logger());

app.use(router.routes());
app.use(router.allowedMethods());

dbDataSource.initialize().catch(error => console.log(error));

// TODO: get from config
app.listen(3000, () => console.log('started'));
