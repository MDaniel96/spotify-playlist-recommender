import * as Koa from 'koa';

export type Preset = {
  id: number;
  name: string;
  userId: number;
  createdAt: Date;
};

export type Route = {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  action: <T extends Koa.Context>(context: T) => Promise<void>;
};
