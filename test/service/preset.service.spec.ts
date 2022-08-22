import { PresetService } from '../../src/service/preset.service';
import { PresetRepository } from '../../src/repository/preset.repository';
import { stub, useFakeTimers } from 'sinon';
import { createPresetEntity, createPresetUpsertPayload, createRandomNumber } from '../../src/test-util/test-factories';
import { expect } from 'chai';
import { PresetMapper } from '../../src/mapper/preset.mapper';

describe('PresetService', () => {
  describe('#listByUserId', () => {
    it('should list preset DTOs of given user', async () => {
      const presetRepository = new PresetRepository();
      const presetEntity = createPresetEntity();
      stub(presetRepository, 'listByUserId').resolves([presetEntity]);
      const preset = PresetMapper.toDTO(presetEntity);

      const presets = await new PresetService(presetRepository).listByUserId(createRandomNumber());

      expect(presets).to.deep.equal([preset]);
    });
  });

  describe('#findById', () => {
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

  describe('#update', () => {
    it('should call preset repository with correct attributes', async () => {
      const presetId = createRandomNumber();
      const payload = { name: 'new-name', userId: 2 };
      const presetRepository = new PresetRepository();
      stub(presetRepository, 'update').resolves();

      await new PresetService(presetRepository).update(presetId, payload);

      expect(presetRepository.update).to.have.been.calledOnceWithExactly(presetId, payload);
    });

    it('should give the updated preset DTO', async () => {
      const presetEntity = createPresetEntity();
      const presetRepository = new PresetRepository();
      stub(presetRepository, 'update').resolves(presetEntity);
      const preset = PresetMapper.toDTO(presetEntity);

      const result = await new PresetService(presetRepository).update(createRandomNumber(), {
        name: 'new-name',
        userId: 2
      });

      expect(result).to.deep.equal(preset);
    });

    it('should give null if preset is not found', async () => {
      const presetRepository = new PresetRepository();
      stub(presetRepository, 'update').resolves(null);

      const result = await new PresetService(presetRepository).update(createRandomNumber(), {
        name: 'new-name',
        userId: 2
      });

      expect(result).to.be.null;
    });
  });

  describe('#insert', () => {
    it('should call preset repository with correct attributes', async () => {
      const presetPayload = createPresetUpsertPayload();
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

      const result = await new PresetService(presetRepository).insert(createPresetUpsertPayload());

      expect(result).to.deep.equal(preset);
    });
  });

  describe('#delete', () => {
    it('should call preset repository with preset id to delete', async () => {
      const presetId = createRandomNumber();
      const presetRepository = new PresetRepository();
      stub(presetRepository, 'delete').resolves();

      await new PresetService(presetRepository).delete(presetId);

      expect(presetRepository.delete).to.have.been.calledOnceWithExactly(presetId);
    });
  });
});
