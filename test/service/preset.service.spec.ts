import { PresetService } from '../../src/service/preset.service';
import { PresetRepository } from '../../src/repository/preset.repository';
import { stub, useFakeTimers } from 'sinon';
import {
  createPresetEntity,
  createPresetUpsertPayload,
  createRandomNumber,
  createUserEntity
} from '../../src/test-util/test-factories';
import { expect } from 'chai';
import { PresetMapper } from '../../src/mapper/preset.mapper';
import { UserRepository } from '../../src/repository/user.repository';

describe('PresetService', () => {
  describe('#listByUserId', () => {
    it('should list preset DTOs of given user', async () => {
      const presetRepository = new PresetRepository();
      const presetEntity = createPresetEntity({ user: createUserEntity() });
      stub(presetRepository, 'listByUserId').resolves([presetEntity]);
      const preset = PresetMapper.toDTO(presetEntity);

      const presets = await createStubbedPresetService({ presetRepository }).listByUserId(createRandomNumber());

      expect(presets).to.deep.equal([preset]);
    });
  });

  describe('#findById', () => {
    it('should call preset repository with correct id', async () => {
      const presetId = createRandomNumber();
      const presetRepository = new PresetRepository();
      stub(presetRepository, 'findById').resolves();

      await createStubbedPresetService({ presetRepository }).findById(presetId);

      expect(presetRepository.findById).to.have.been.calledOnceWithExactly(presetId);
    });

    it('should give found preset DTO', async () => {
      const presetRepository = new PresetRepository();
      const presetEntity = createPresetEntity({ user: createUserEntity() });
      stub(presetRepository, 'findById').resolves(presetEntity);
      const preset = PresetMapper.toDTO(presetEntity);

      const result = await createStubbedPresetService({ presetRepository }).findById(createRandomNumber());

      expect(result).to.deep.equal(preset);
    });

    it('should give null if preset is not found', async () => {
      const presetRepository = new PresetRepository();
      stub(presetRepository, 'findById').resolves(null);

      const result = await createStubbedPresetService({ presetRepository }).findById(createRandomNumber());

      expect(result).to.deep.equal(null);
    });
  });

  describe('#update', () => {
    it('should call preset repository with correct attributes', async () => {
      const presetId = createRandomNumber();
      const payload = { name: 'new-name' };
      const presetRepository = new PresetRepository();
      stub(presetRepository, 'update').resolves();

      await createStubbedPresetService({ presetRepository }).update(presetId, payload);

      expect(presetRepository.update).to.have.been.calledOnceWithExactly(presetId, payload);
    });

    it('should give the updated preset DTO', async () => {
      const presetEntity = createPresetEntity({ user: createUserEntity() });
      const presetRepository = new PresetRepository();
      stub(presetRepository, 'update').resolves(presetEntity);
      const preset = PresetMapper.toDTO(presetEntity);

      const result = await createStubbedPresetService({ presetRepository }).update(createRandomNumber(), {
        name: 'new-name'
      });

      expect(result).to.deep.equal(preset);
    });

    it('should give null if preset is not found', async () => {
      const presetRepository = new PresetRepository();
      stub(presetRepository, 'update').resolves(null);

      const result = await createStubbedPresetService({ presetRepository }).update(createRandomNumber(), {
        name: 'new-name'
      });

      expect(result).to.be.null;
    });
  });

  describe('#insert', () => {
    it('should call preset repository with correct attributes', async () => {
      const presetPayload = createPresetUpsertPayload();
      const presetRepository = new PresetRepository();
      stub(presetRepository, 'insert').resolves(createPresetEntity({ user: createUserEntity() }));

      const user = createUserEntity();
      const userRepository = new UserRepository();
      stub(userRepository, 'findById').resolves(user);

      const today = new Date();
      useFakeTimers(today);

      await createStubbedPresetService({ presetRepository, userRepository }).insert(presetPayload, user.id);

      expect(presetRepository.insert).to.have.been.calledOnceWithExactly({
        ...presetPayload,
        user,
        createdAt: today
      });
    });

    it('should give the created preset DTO', async () => {
      const user = createUserEntity();
      const userRepository = new UserRepository();
      stub(userRepository, 'findById').resolves(user);

      const presetRepository = new PresetRepository();
      const presetEntity = createPresetEntity({ user });
      stub(presetRepository, 'insert').resolves(presetEntity);
      const preset = PresetMapper.toDTO(presetEntity);

      const result = await createStubbedPresetService({ presetRepository, userRepository }).insert(
        createPresetUpsertPayload(),
        user.id
      );

      expect(result).to.deep.equal(preset);
    });
  });

  describe('#delete', () => {
    it('should call preset repository with preset id to delete', async () => {
      const presetId = createRandomNumber();
      const presetRepository = new PresetRepository();
      stub(presetRepository, 'delete').resolves();

      await createStubbedPresetService({ presetRepository }).delete(presetId);

      expect(presetRepository.delete).to.have.been.calledOnceWithExactly(presetId);
    });
  });
});

const createStubbedPresetService = ({
  presetRepository = new PresetRepository(),
  userRepository = new UserRepository()
}): PresetService => {
  return new PresetService(presetRepository, userRepository);
};
