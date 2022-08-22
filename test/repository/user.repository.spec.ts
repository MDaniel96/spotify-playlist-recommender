import { dbDataSource } from '../../src/config/db-data-source';
import { UserEntity } from '../../src/entity/user.entity';
import { createRandomNumber, createUser } from '../../src/test-util/test-factories';
import { expect } from 'chai';
import { UserRepository } from '../../src/repository/user.repository';
import { User } from '../../src/types';

describe('UserRepository', () => {
  beforeEach(async () => {
    await dbDataSource.getRepository(UserEntity).clear();
  });

  describe('#findById', () => {
    it('should give back the correct user', async () => {
      const user = await insertToDb(createUser());
      await Promise.all([insertToDb(createUser()), insertToDb(createUser())]);

      const result = await new UserRepository().findById(user.id);

      expect(result).to.deep.equal(user);
    });

    it('should give back null if user is not found', async () => {
      await Promise.all([insertToDb(createUser()), insertToDb(createUser())]);

      const result = await new UserRepository().findById(createRandomNumber());

      expect(result).to.be.null;
    });
  });
});

async function insertToDb(user: User): Promise<UserEntity> {
  const repository = dbDataSource.getRepository(UserEntity);
  const userEntity = repository.create(user);
  return await repository.save(userEntity);
}
