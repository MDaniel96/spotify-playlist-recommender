import { User } from '../types';
import { UserEntity } from '../entity/user.entity';

export class UserMapper {
  static toDTO(entity: UserEntity): User {
    return {
      id: entity.id,
      email: entity.email,
      password: entity.password
    };
  }

  static toDTOs(entities: UserEntity[]): User[] {
    return entities.map(entity => this.toDTO(entity));
  }
}
