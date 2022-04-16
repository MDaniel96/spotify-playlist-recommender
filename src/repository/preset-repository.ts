import { PresetEntity } from '../entity/preset-entity';
import { dbDataSource } from '../app';

export class PresetRepository {
  static create(): PresetRepository {
    return new PresetRepository();
  }

  async listByUserId(userId: number): Promise<PresetEntity[]> {
    const repository = dbDataSource.getRepository(PresetEntity);
    return await repository.findBy({ userId });
  }
}
