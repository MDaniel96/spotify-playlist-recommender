import { PresetRepository } from '../../repository/preset/preset.repository';
import { Preset } from '../../types';
import { PresetMapper } from '../../mapper/preset.mapper';

export class PresetService {
  static create(): PresetService {
    return new PresetService(PresetRepository.create());
  }

  constructor(private presetRepository: PresetRepository) {}

  async listByUserId(userId: number): Promise<Preset[]> {
    const presets = await this.presetRepository.listByUserId(userId);
    return PresetMapper.toDTOs(presets);
  }
}
