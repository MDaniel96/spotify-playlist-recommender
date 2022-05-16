import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as logger from 'koa-logger';
import { dbDataSource } from './config/db-data-source';
import { useKoaServer } from 'routing-controllers';
import { PresetController } from './controller/preset.controller';

export const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(logger());

useKoaServer(app, {
  routePrefix: '/api',
  controllers: [PresetController]
});

dbDataSource.initialize().catch(error => console.log(error));

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on ${port}`));
