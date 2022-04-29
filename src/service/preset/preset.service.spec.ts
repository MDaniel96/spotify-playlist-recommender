import { PresetService } from './preset.service';
import { PresetRepository } from '../../repository/preset/preset.repository';
import { stub } from 'sinon';
import { createPresetEntity, createRandomNumber } from '../../test-util/test-factories';
import { expect } from 'chai';
import { PresetMapper } from '../../mapper/preset.mapper';

describe('PresetService', () => {
  context('#listByUserId', () => {
    it('should list preset DTOs of given user', async () => {
      const presetRepository = PresetRepository.create();
      const presetEntity = createPresetEntity();
      stub(presetRepository, 'listByUserId').resolves([presetEntity]);
      const preset = PresetMapper.toDTO(presetEntity);

      const presets = await new PresetService(presetRepository).listByUserId(createRandomNumber());

      expect(presets).to.deep.equal([preset]);
    });
  });
});
