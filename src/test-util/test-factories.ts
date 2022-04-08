import * as Koa from 'koa';
import { Preset } from '../types';
import { randomUUID } from 'crypto';

type KoaContextRequest = {
  path: string;
  body: unknown;
  headers: Record<string, unknown>;
};

type KoaContextParams = {
  userId?: number;
};

type KoaContext = {
  request?: KoaContextRequest;
  params?: KoaContextParams;
  status?: unknown;
  query?: unknown;
};

export const createRandomNumber = ({ max = 100000 } = {}): number => Math.floor(Math.random() * max) + 1;

export const createPreset = (additionalParams: Partial<Preset> = {}): Preset => ({
  id: createRandomNumber(),
  name: randomUUID(),
  userId: createRandomNumber(),
  created_at: new Date(),
  ...additionalParams
});

export const createFakeContext = (additionalParams: Partial<KoaContext> = {}): Koa.Context =>
  ({
    params: { userId: createRandomNumber() },
    ...additionalParams
  } as unknown as Koa.Context);
