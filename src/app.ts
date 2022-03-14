import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as logger from 'koa-logger';

const app = new Koa();
const router = new Router();

router.get('/', async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.body = { message: 'Hello World!' };
  await next();
});

app.use(bodyParser());
app.use(cors());
app.use(logger());

app.use(router.routes());
app.use(router.allowedMethods());

// TODO: get port from config
app.listen(3000, () => console.log('started'));
