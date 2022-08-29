import { PresetRepository } from '../../src/repository/preset.repository';
import { createPresetEntity, createRandomNumber, createUserEntity } from '../../src/test-util/test-factories';
import { PresetEntity } from '../../src/entity/preset.entity';
import { dbDataSource } from '../../src/config/db-data-source';
import { expect } from 'chai';
import { UserEntity } from '../../src/entity/user.entity';
import { clearPresetTable, clearUserTable } from '../../src/test-util/db';

describe('PresetRepository', () => {
  beforeEach(async () => {
    await clearUserTable();
    await clearPresetTable();
  });

  describe('#listByUserId', () => {
    it('should list presets of user', async () => {
      const user = await insertUserToDb(createUserEntity());
      const otherUser = await insertUserToDb(createUserEntity());
      const userPreset = await insertToDb(createPresetEntity({ user }));
      const userOtherPreset = await insertToDb(createPresetEntity({ user }));
      await insertToDb(createPresetEntity({ user: otherUser }));

      const result = await new PresetRepository().listByUserId(user.id);

      expect(result).to.deep.equal([userPreset, userOtherPreset]);
    });

    it('should give empty list when user id does not match', async () => {
      const user = await insertUserToDb(createUserEntity());
      await insertToDb(createPresetEntity({ user }));

      const result = await new PresetRepository().listByUserId(createRandomNumber());

      expect(result).to.deep.equal([]);
    });
  });

  describe('#findById', () => {
    it('should give back the correct preset', async () => {
      const user = await insertUserToDb(createUserEntity());
      const preset = createPresetEntity({ user });
      await Promise.all([insertToDb(preset), insertToDb(createPresetEntity()), insertToDb(createPresetEntity())]);

      const result = await new PresetRepository().findById(preset.id);

      expect(result).to.deep.equal(preset);
    });

    it('should give back null if preset is not found', async () => {
      await Promise.all([insertToDb(createPresetEntity()), insertToDb(createPresetEntity())]);

      const result = await new PresetRepository().findById(createRandomNumber());

      expect(result).to.be.null;
    });
  });

  describe('#insert', () => {
    it('should insert preset to the db', async () => {
      const user = await insertUserToDb(createUserEntity());
      const preset = createPresetEntity({ user });

      await new PresetRepository().insert(preset);

      expect(await getFirstFromDb()).to.containSubset({
        name: preset.name,
        user: {
          id: preset.user.id,
          email: preset.user.email,
          password: preset.user.password
        },
        createdAt: preset.createdAt
      });
    });

    it('should give back the inserted record', async () => {
      const user = await insertUserToDb(createUserEntity());
      const preset = createPresetEntity({ user });

      const result = await new PresetRepository().insert(preset);

      const recordInDb = await getFirstFromDb();
      expect(result).to.eql({
        id: recordInDb!.id,
        name: preset.name,
        user: {
          id: preset.user.id,
          email: preset.user.email,
          password: preset.user.password
        },
        createdAt: preset.createdAt
      });
    });
  });

  describe('#update', () => {
    it('should update preset in db', async () => {
      const user = await insertUserToDb(createUserEntity());
      const oldPreset = await insertToDb(createPresetEntity({ user }));
      const newPreset = { name: 'new-name' };

      await new PresetRepository().update(oldPreset.id, newPreset);

      const recordInDb = await getFirstFromDb();
      expect(recordInDb).to.deep.equal({ ...oldPreset, ...newPreset });
    });

    it('should return the updated preset', async () => {
      const user = await insertUserToDb(createUserEntity());
      const oldPreset = await insertToDb(createPresetEntity({ user }));
      const newPreset = { name: 'new-name' };

      const result = await new PresetRepository().update(oldPreset.id, newPreset);

      expect(result).to.deep.equal({ ...oldPreset, ...newPreset });
    });

    it('should return null if preset to update cannot be found', async () => {
      await insertToDb(createPresetEntity());
      const newPreset = { name: 'new-name' };

      const result = await new PresetRepository().update(createRandomNumber(), newPreset);

      expect(result).to.be.null;
    });

    it('should not update the preset if another id is provided', async () => {
      const user = await insertUserToDb(createUserEntity());
      const oldPreset = await insertToDb(createPresetEntity({ user }));
      const newPreset = { name: 'new-name' };

      await new PresetRepository().update(createRandomNumber(), newPreset);

      const recordInDb = await getFirstFromDb();
      expect(recordInDb).to.deep.equal(oldPreset);
    });
  });

  describe('#delete', () => {
    it('should remove preset from the db', async () => {
      const user = await insertUserToDb(createUserEntity());
      const [presetToDelete, presetNotToDelete] = await Promise.all([
        insertToDb(createPresetEntity({ user })),
        insertToDb(createPresetEntity({ user }))
      ]);

      await new PresetRepository().delete(presetToDelete.id);

      expect(await countRecordsInDb()).to.equal(1);
      expect(await getFirstFromDb()).to.deep.equal(presetNotToDelete);
    });
  });
});

// TODO: remove them to common test file
async function insertToDb(preset: PresetEntity): Promise<PresetEntity> {
  const repository = dbDataSource.getRepository(PresetEntity);
  return await repository.save(preset);
}

async function insertUserToDb(user: UserEntity): Promise<UserEntity> {
  const repository = dbDataSource.getRepository(UserEntity);
  return await repository.save(user);
}

async function getFirstFromDb(): Promise<PresetEntity | null> {
  const repository = dbDataSource.getRepository(PresetEntity);
  return await repository.findOne({ where: {}, relations: { user: true } });
}

async function countRecordsInDb(): Promise<number> {
  const repository = dbDataSource.getRepository(PresetEntity);
  return await repository.count();
}
