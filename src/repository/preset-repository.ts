import { Preset } from '../types';
import { createPreset } from '../test-util/test-factories';

export class PresetRepository {
  static create(): PresetRepository {
    return new PresetRepository();
  }

  async listByUserId(userId: number): Promise<Preset[]> {
    // TODO: implement using DB
    const presets = [createPreset({ userId })];
    return Promise.resolve(presets);
  }
}
