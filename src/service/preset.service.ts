import { PresetRepository } from '../repository/preset.repository';
import { Preset, PresetInsertPayload } from '../types';
import { PresetMapper } from '../mapper/preset.mapper';
import { Service } from 'typedi';

@Service()
export class PresetService {
  constructor(private presetRepository: PresetRepository) {}

  async listByUserId(userId: number): Promise<Preset[]> {
    const presets = await this.presetRepository.listByUserId(userId);
    return PresetMapper.toDTOs(presets);
  }

  async findById(presetId: number): Promise<Preset | null> {
    const preset = await this.presetRepository.findById(presetId);
    return preset ? PresetMapper.toDTO(preset) : null;
  }

  async insert(presetPayload: PresetInsertPayload): Promise<Preset> {
    const preset = await this.presetRepository.insert({ ...presetPayload, createdAt: new Date() });
    return PresetMapper.toDTO(preset);
  }

  async delete(presetId: number): Promise<void> {
    await this.presetRepository.delete(presetId);
  }
}
