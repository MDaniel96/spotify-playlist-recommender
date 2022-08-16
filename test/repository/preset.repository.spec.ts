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

  context('#listByUserId', () => {
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

  context('#insert', () => {
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
