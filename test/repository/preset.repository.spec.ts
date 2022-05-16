import { PresetRepository } from '../../src/repository/preset.repository';
import { createPreset, createRandomNumber } from '../test-util/test-factories.spec';
import { Preset } from '../../src/types';
import { PresetEntity } from '../../src/entity/preset.entity';
import { dbDataSource } from '../../src/config/db-data-source';
import { expect } from 'chai';

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

      const result = await PresetRepository.create().listByUserId(userId);

      expect(result).to.deep.equal([userPreset, userOtherPreset]);
    });

    it('should give empty list when user id does not match', async () => {
      const userId = createRandomNumber();
      await insertToDb(createPreset({ userId: userId + 1 }));

      const result = await PresetRepository.create().listByUserId(userId);

      expect(result).to.deep.equal([]);
    });
  });
});

async function insertToDb(preset: Preset): Promise<PresetEntity> {
  const repository = dbDataSource.getRepository(PresetEntity);
  const presetEntity = repository.create(preset);
  return await repository.save(presetEntity);
}
