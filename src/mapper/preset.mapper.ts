import { Preset } from '../types';
import { PresetEntity } from '../entity/preset.entity';
import { UserMapper } from './user.mapper';

export class PresetMapper {
  static toDTO(entity: PresetEntity): Preset {
    return {
      id: entity.id,
      name: entity.name,
      user: UserMapper.toDTO(entity.user),
      createdAt: entity.createdAt
    };
  }

  static toDTOs(entities: PresetEntity[]): Preset[] {
    return entities.map(entity => this.toDTO(entity));
  }
}
