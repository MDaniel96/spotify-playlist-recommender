import * as Koa from 'koa';
import { Preset, PresetUpsertPayload, User } from '../types';
import { randomUUID } from 'crypto';
import { PresetEntity } from '../entity/preset.entity';
import { dbDataSource } from '../config/db-data-source';
import { UserEntity } from '../entity/user.entity';

export const createRandomNumber = ({ max = 100000 } = {}): number => Math.floor(Math.random() * max) + 1;

type KoaContextRequest = {
  path?: string;
  body?: unknown;
  headers?: Record<string, unknown>;
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

export const createFakeRequest = (additionalParams: Partial<KoaContextRequest> = {}): Koa.Request =>
  ({
    path: randomUUID(),
    ...additionalParams
  } as unknown as Koa.Request);

export const createFakeContext = (additionalParams: Partial<KoaContext> = {}): Koa.Context =>
  ({
    params: { userId: createRandomNumber() },
    request: createFakeRequest(),
    ...additionalParams
  } as unknown as Koa.Context);

export const createPreset = (additionalParams: Partial<Preset> = {}): Preset => ({
  id: createRandomNumber(),
  name: randomUUID(),
  user: createUser(),
  createdAt: new Date(),
  ...additionalParams
});

export const createPresetUpsertPayload = (
  additionalParams: Partial<PresetUpsertPayload> = {}
): PresetUpsertPayload => ({
  name: randomUUID(),
  ...additionalParams
});

export const createPresetEntity = (additionalParams: Partial<PresetEntity> = {}): PresetEntity => {
  const presetEntity = {
    id: createRandomNumber(),
    name: randomUUID(),
    user: undefined,
    createdAt: new Date(),
    ...additionalParams
  };
  const repository = dbDataSource.getRepository(PresetEntity);
  return repository.create(presetEntity);
};

export const createUser = (additionalParams: Partial<User> = {}): User => ({
  id: createRandomNumber(),
  email: randomUUID(),
  password: randomUUID(),
  ...additionalParams
});

export const createUserEntity = (additionalParams: Partial<UserEntity> = {}): UserEntity => {
  const userEntity = {
    id: createRandomNumber(),
    email: randomUUID(),
    password: randomUUID(),
    ...additionalParams
  };
  const repository = dbDataSource.getRepository(UserEntity);
  return repository.create(userEntity);
};
