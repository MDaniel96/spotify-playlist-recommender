import { PresetEntity } from '../entity/preset.entity';
import { dbDataSource } from '../config/db-data-source';
import { Service } from 'typedi';
import { Preset } from '../types';

@Service()
export class PresetRepository {
  private readonly repository = dbDataSource.getRepository(PresetEntity);

  async listByUserId(userId: number): Promise<PresetEntity[]> {
    return await this.repository.findBy({ userId });
  }

  async insert(preset: Omit<Preset, 'id'>): Promise<PresetEntity> {
    const presetEntity = this.repository.create(preset);
    return await this.repository.save(presetEntity);
  }
}
