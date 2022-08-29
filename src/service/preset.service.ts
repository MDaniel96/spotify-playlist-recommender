import { PresetRepository } from '../repository/preset.repository';
import { Preset, PresetUpsertPayload } from '../types';
import { PresetMapper } from '../mapper/preset.mapper';
import { Service } from 'typedi';
import { UserRepository } from '../repository/user.repository';

@Service()
export class PresetService {
  constructor(private presetRepository: PresetRepository, private userRepository: UserRepository) {}

  async listByUserId(userId: number): Promise<Preset[]> {
    const presets = await this.presetRepository.listByUserId(userId);
    return PresetMapper.toDTOs(presets);
  }

  async findById(presetId: number): Promise<Preset | null> {
    const preset = await this.presetRepository.findById(presetId);
    return preset ? PresetMapper.toDTO(preset) : null;
  }

  async update(presetId: number, payload: PresetUpsertPayload): Promise<Preset | null> {
    const preset = await this.presetRepository.update(presetId, payload);
    return preset ? PresetMapper.toDTO(preset) : null;
  }

  async insert(payload: PresetUpsertPayload, userId: number): Promise<Preset> {
    const user = (await this.userRepository.findById(userId))!;
    const preset = await this.presetRepository.insert({ ...payload, user, createdAt: new Date() });
    return PresetMapper.toDTO(preset);
  }

  async delete(presetId: number): Promise<void> {
    await this.presetRepository.delete(presetId);
  }
}
