import { PresetService } from '../../src/service/preset.service';
import { PresetRepository } from '../../src/repository/preset.repository';
import { stub, useFakeTimers } from 'sinon';
import { createPresetEntity, createPresetInsertPayload, createRandomNumber } from '../../src/test-util/test-factories';
import { expect } from 'chai';
import { PresetMapper } from '../../src/mapper/preset.mapper';

describe('PresetService', () => {
  context('#listByUserId', () => {
    it('should list preset DTOs of given user', async () => {
      const presetRepository = new PresetRepository();
      const presetEntity = createPresetEntity();
      stub(presetRepository, 'listByUserId').resolves([presetEntity]);
      const preset = PresetMapper.toDTO(presetEntity);

      const presets = await new PresetService(presetRepository).listByUserId(createRandomNumber());

      expect(presets).to.deep.equal([preset]);
    });
  });

  context('#findById', () => {
    it('should call preset repository with correct id', async () => {
      const presetId = createRandomNumber();
      const presetRepository = new PresetRepository();
      stub(presetRepository, 'findById').resolves();

      await new PresetService(presetRepository).findById(presetId);

      expect(presetRepository.findById).to.have.been.calledOnceWithExactly(presetId);
    });

    it('should give found preset DTO', async () => {
      const presetRepository = new PresetRepository();
      const presetEntity = createPresetEntity();
      stub(presetRepository, 'findById').resolves(presetEntity);
      const preset = PresetMapper.toDTO(presetEntity);

      const result = await new PresetService(presetRepository).findById(createRandomNumber());

      expect(result).to.deep.equal(preset);
    });

    it('should give null if preset is not found', async () => {
      const presetRepository = new PresetRepository();
      stub(presetRepository, 'findById').resolves(null);

      const result = await new PresetService(presetRepository).findById(createRandomNumber());

      expect(result).to.deep.equal(null);
    });
  });

  context('#insert', () => {
    it('should call preset repository with correct attributes', async () => {
      const presetPayload = createPresetInsertPayload();
      const presetRepository = new PresetRepository();
      stub(presetRepository, 'insert').resolves(createPresetEntity());
      const today = new Date();
      useFakeTimers(today);

      await new PresetService(presetRepository).insert(presetPayload);

      expect(presetRepository.insert).to.have.been.calledOnceWithExactly({
        ...presetPayload,
        createdAt: today
      });
    });

    it('should give created preset DTO', async () => {
      const presetRepository = new PresetRepository();
      const presetEntity = createPresetEntity();
      stub(presetRepository, 'insert').resolves(presetEntity);
      const preset = PresetMapper.toDTO(presetEntity);

      const result = await new PresetService(presetRepository).insert(createPresetInsertPayload());

      expect(result).to.deep.equal(preset);
    });
  });

  context('#delete', () => {
    it('should call preset repository with preset id to delete', async () => {
      const presetId = createRandomNumber();
      const presetRepository = new PresetRepository();
      stub(presetRepository, 'delete').resolves();

      await new PresetService(presetRepository).delete(presetId);

      expect(presetRepository.delete).to.have.been.calledOnceWithExactly(presetId);
    });
  });
});
