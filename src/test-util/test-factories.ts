import { Preset } from '../types';
import { randomUUID } from 'crypto';

export const createRandomNumber = ({ max = 100000 } = {}): number => Math.floor(Math.random() * max) + 1;

export const createPreset = (additionalParams: Partial<Preset> = {}): Preset => ({
  id: createRandomNumber(),
  name: randomUUID(),
  userId: createRandomNumber(),
  created_at: new Date(),
  ...additionalParams
});
