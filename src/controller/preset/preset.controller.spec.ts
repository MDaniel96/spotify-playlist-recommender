import { PresetController } from './preset.controller';
import { createPreset, createRandomNumber } from '../../test-util/test-factories';
import { expect } from 'chai';
import { stub } from 'sinon';
import { PresetService } from '../../service/preset/preset.service';

describe('PresetController', () => {
  context('#listByUserId', () => {
    it('should give back presets', async () => {
      const userId = createRandomNumber();
      const presets = [createPreset(), createPreset()];
      stub(PresetService.prototype, 'listByUserId').resolves(presets);

      const response = await new PresetController().listByUserId(userId);

      expect(response).to.eql(presets);
    });

    it('should call preset service method', async () => {
      const userId = createRandomNumber();
      stub(PresetService.prototype, 'listByUserId');

      await new PresetController().listByUserId(userId);

      expect(PresetService.prototype.listByUserId).to.have.been.calledWithExactly(userId);
    });
  });
});
