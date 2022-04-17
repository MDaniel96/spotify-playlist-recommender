import { PresetEntity } from '../../entity/preset.entity';
import { dbDataSource } from '../../config/db-data-source';
import { Repository } from 'typeorm';

export class PresetRepository {
  static create(): PresetRepository {
    return new PresetRepository(dbDataSource.getRepository(PresetEntity));
  }

  constructor(private repository: Repository<PresetEntity>) {}

  async listByUserId(userId: number): Promise<PresetEntity[]> {
    return await this.repository.findBy({ userId });
  }
}
