import { PresetEntity } from '../entity/preset.entity';
import { dbDataSource } from '../config/db-data-source';
import { Service } from 'typedi';

@Service()
export class PresetRepository {
  private readonly repository = dbDataSource.getRepository(PresetEntity);

  async listByUserId(userId: number): Promise<PresetEntity[]> {
    return await this.repository.findBy({ userId });
  }
}
