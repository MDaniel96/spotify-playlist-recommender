import * as Router from 'koa-router';
import { controllerRoutes } from './controller.routes';

export const controllers = (router: Router): void => {
  controllerRoutes.forEach(route => router[route.method](route.path, route.action));
};
