import { Preset } from '../types';
import { PresetEntity } from '../entity/preset.entity';

export class PresetMapper {
  static toDTO(entity: PresetEntity): Preset {
    return {
      id: entity.id,
      name: entity.name,
      userId: entity.userId,
      createdAt: entity.createdAt
    };
  }

  static toDTOs(entities: PresetEntity[]): Preset[] {
    return entities.map(entity => this.toDTO(entity));
  }
}
