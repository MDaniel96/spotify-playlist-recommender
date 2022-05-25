import { Preset } from '../types';
import { randomUUID } from 'crypto';
import { PresetEntity } from '../entity/preset.entity';
import { dbDataSource } from '../config/db-data-source';

export const createRandomNumber = ({ max = 100000 } = {}): number => Math.floor(Math.random() * max) + 1;

export const createPreset = (additionalParams: Partial<Preset> = {}): Preset => ({
  id: createRandomNumber(),
  name: randomUUID(),
  userId: createRandomNumber(),
  createdAt: new Date(),
  ...additionalParams
});

export const createPresetEntity = (additionalParams: Partial<PresetEntity> = {}): PresetEntity => {
  const presetEntity = {
    id: createRandomNumber(),
    name: randomUUID(),
    userId: createRandomNumber(),
    createdAt: new Date(),
    ...additionalParams
  };
  const repository = dbDataSource.getRepository(PresetEntity);
  return repository.create(presetEntity);
};
