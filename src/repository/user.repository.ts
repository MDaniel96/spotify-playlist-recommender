import { Service } from 'typedi';
import { dbDataSource } from '../config/db-data-source';
import { UserEntity } from '../entity/user.entity';

@Service()
export class UserRepository {
  private readonly repository = dbDataSource.getRepository(UserEntity);

  async findById(userId: number): Promise<UserEntity | null> {
    return await this.repository.findOneBy({ id: userId });
  }
}
