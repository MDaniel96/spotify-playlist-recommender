import { PresetController } from './preset.controller';
import { createFakeContext, createPreset, createRandomNumber } from '../../test-util/test-factories';
import { expect } from 'chai';
import { stub } from 'sinon';
import { PresetService } from '../../service/preset/preset.service';

describe('PresetController', () => {
  context('#list', () => {
    it('should give back 200', async () => {
      const context = createFakeContext();
      const presetService = createStubbedPresetService();

      await new PresetController(presetService).list(context);

      expect(context.status).to.eql(200);
    });

    it('should give back presets', async () => {
      const context = createFakeContext();
      const presets = [createPreset(), createPreset()];
      const presetService = createStubbedPresetService(presets);

      await new PresetController(presetService).list(context);

      expect(context.body).to.eql({ presets });
    });

    it('should give back presets of user', async () => {
      const userId = createRandomNumber();
      const context = createFakeContext({ params: { userId } });
      const presets = [createPreset(), createPreset()];
      const presetService = createStubbedPresetService(presets);

      await new PresetController(presetService).list(context);

      expect(presetService.listByUserId).to.have.been.calledWithExactly(userId);
    });
  });
});

const createStubbedPresetService = (listReturnValue = [createPreset()]): PresetService => {
  const service = PresetService.create();
  stub(service, 'listByUserId').resolves(listReturnValue);
  return service;
};
