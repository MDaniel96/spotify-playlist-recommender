import { PresetRepository } from '../repository/preset.repository';
import { Preset } from '../types';
import { PresetMapper } from '../mapper/preset.mapper';
import { Service } from 'typedi';

@Service()
export class PresetService {
  constructor(private presetRepository: PresetRepository) {}

  async listByUserId(userId: number): Promise<Preset[]> {
    const presets = await this.presetRepository.listByUserId(userId);
    return PresetMapper.toDTOs(presets);
  }
}
