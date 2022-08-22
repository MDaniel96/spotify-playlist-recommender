import { PresetRepository } from '../../src/repository/preset.repository';
import { createPreset, createRandomNumber } from '../../src/test-util/test-factories';
import { Preset } from '../../src/types';
import { PresetEntity } from '../../src/entity/preset.entity';
import { dbDataSource } from '../../src/config/db-data-source';
import { expect } from 'chai';
import { randomUUID } from 'crypto';

describe('PresetRepository', () => {
  beforeEach(async () => {
    await dbDataSource.getRepository(PresetEntity).clear();
  });

  describe('#listByUserId', () => {
    it('should list presets of user', async () => {
      const userId = createRandomNumber();
      const userPreset = await insertToDb(createPreset({ userId }));
      const userOtherPreset = await insertToDb(createPreset({ userId }));
      await insertToDb(createPreset({ userId: userId + 1 }));

      const result = await new PresetRepository().listByUserId(userId);

      expect(result).to.deep.equal([userPreset, userOtherPreset]);
    });

    it('should give empty list when user id does not match', async () => {
      const userId = createRandomNumber();
      await insertToDb(createPreset({ userId: userId + 1 }));

      const result = await new PresetRepository().listByUserId(userId);

      expect(result).to.deep.equal([]);
    });
  });

  describe('#findById', () => {
    it('should give back the correct preset', async () => {
      const preset = await insertToDb(createPreset());
      await Promise.all([insertToDb(createPreset()), insertToDb(createPreset())]);

      const result = await new PresetRepository().findById(preset.id);

      expect(result).to.deep.equal(preset);
    });

    it('should give back null if preset is not found', async () => {
      await Promise.all([insertToDb(createPreset()), insertToDb(createPreset())]);

      const result = await new PresetRepository().findById(createRandomNumber());

      expect(result).to.be.null;
    });
  });

  describe('#insert', () => {
    it('should insert preset to the db', async () => {
      const preset = { name: randomUUID(), userId: createRandomNumber(), createdAt: new Date() };

      await new PresetRepository().insert(preset);

      expect(await getFirstFromDb()).to.containSubset({
        name: preset.name,
        userId: preset.userId,
        createdAt: preset.createdAt
      });
    });

    it('should give back the inserted record', async () => {
      const preset = { name: randomUUID(), userId: createRandomNumber(), createdAt: new Date() };

      const result = await new PresetRepository().insert(preset);

      const recordInDb = await getFirstFromDb();
      expect(result).to.eql({
        id: recordInDb!.id,
        name: preset.name,
        userId: preset.userId,
        createdAt: preset.createdAt
      });
    });
  });

  describe('#update', () => {
    it('should update preset in db', async () => {
      const oldPreset = await insertToDb(createPreset());
      const newPreset = { name: 'new-name', userId: 2 };

      await new PresetRepository().update(oldPreset.id, newPreset);

      const recordInDb = await getFirstFromDb();
      expect(recordInDb).to.deep.equal({ ...newPreset, id: oldPreset.id, createdAt: oldPreset.createdAt });
    });

    it('should return the updated preset', async () => {
      const oldPreset = await insertToDb(createPreset());
      const newPreset = { name: 'new-name', userId: 2 };

      const result = await new PresetRepository().update(oldPreset.id, newPreset);

      expect(result).to.deep.equal({ ...newPreset, id: oldPreset.id, createdAt: oldPreset.createdAt });
    });

    it('should return null if preset to update cannot be found', async () => {
      await insertToDb(createPreset());
      const newPreset = { name: 'new-name', userId: 2 };

      const result = await new PresetRepository().update(createRandomNumber(), newPreset);

      expect(result).to.be.null;
    });

    it('should not update the preset if another id is provided', async () => {
      const oldPreset = await insertToDb(createPreset());
      const newPreset = { name: 'new-name', userId: 2 };

      await new PresetRepository().update(createRandomNumber(), newPreset);

      const recordInDb = await getFirstFromDb();
      expect(recordInDb).to.deep.equal(oldPreset);
    });
  });

  describe('#delete', () => {
    it('should remove preset from the db', async () => {
      const [presetToDelete, presetNotToDelete] = await Promise.all([
        insertToDb(createPreset()),
        insertToDb(createPreset())
      ]);

      await new PresetRepository().delete(presetToDelete.id);

      expect(await countRecordsInDb()).to.equal(1);
      expect(await getFirstFromDb()).to.deep.equal(presetNotToDelete);
    });
  });
});

async function insertToDb(preset: Preset): Promise<PresetEntity> {
  const repository = dbDataSource.getRepository(PresetEntity);
  const presetEntity = repository.create(preset);
  return await repository.save(presetEntity);
}

async function getFirstFromDb(): Promise<PresetEntity | null> {
  const repository = dbDataSource.getRepository(PresetEntity);
  return await repository.findOne({ where: {} });
}

async function countRecordsInDb(): Promise<number> {
  const repository = dbDataSource.getRepository(PresetEntity);
  return await repository.count();
}
