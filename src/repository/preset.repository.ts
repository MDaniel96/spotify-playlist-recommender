import { PresetEntity } from '../entity/preset.entity';
import { dbDataSource } from '../config/db-data-source';
import { Service } from 'typedi';
import { PresetUpsertPayload } from '../types';

@Service()
export class PresetRepository {
  private readonly repository = dbDataSource.getRepository(PresetEntity);

  async listByUserId(userId: number): Promise<PresetEntity[]> {
    return await this.repository.find({ where: { user: { id: userId } }, relations: { user: true } });
  }

  async findById(presetId: number): Promise<PresetEntity | null> {
    return await this.repository.findOne({ where: { id: presetId }, relations: { user: true } });
  }

  async update(presetId: number, payload: PresetUpsertPayload): Promise<PresetEntity | null> {
    await this.repository.update({ id: presetId }, payload);
    return await this.findById(presetId);
  }

  async insert(payload: Omit<PresetEntity, 'id'>): Promise<PresetEntity> {
    const presetEntity = this.repository.create(payload);
    const { id } = await this.repository.save(presetEntity);
    return (await this.findById(id))!;
  }

  async delete(presetId: number): Promise<void> {
    await this.repository.delete({ id: presetId });
  }
}
