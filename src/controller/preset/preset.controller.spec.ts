import { PresetController } from './preset.controller';
import { createFakeContext, createPreset, createRandomNumber } from '../../test-util/test-factories';
import { expect } from 'chai';
import { PresetRepository } from '../../repository/preset/preset.repository';
import { stub } from 'sinon';

describe('PresetController', () => {
  context('#list', () => {
    it('should give back 200', async () => {
      const context = createFakeContext();
      const presetRepository = createStubbedPresetRepository();

      await new PresetController(presetRepository).list(context);

      expect(context.status).to.eql(200);
    });

    it('should give back presets', async () => {
      const context = createFakeContext();
      const presets = [createPreset(), createPreset()];
      const presetRepository = createStubbedPresetRepository(presets);

      await new PresetController(presetRepository).list(context);

      expect(context.body).to.eql({ presets });
    });

    it('should give back presets of user', async () => {
      const userId = createRandomNumber();
      const context = createFakeContext({ params: { userId } });
      const presets = [createPreset(), createPreset()];
      const presetRepository = createStubbedPresetRepository(presets);

      await new PresetController(presetRepository).list(context);

      expect(presetRepository.listByUserId).to.have.been.calledWithExactly(userId);
    });
  });
});

const createStubbedPresetRepository = (listReturnValue = [createPreset()]): PresetRepository => {
  const repository = PresetRepository.create();
  stub(repository, 'listByUserId').resolves(listReturnValue);
  return repository;
};
