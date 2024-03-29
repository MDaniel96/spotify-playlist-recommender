import { PresetController } from '../../src/controller/preset.controller';
import {
  createPreset,
  createPresetEntity,
  createPresetUpsertPayload,
  createRandomNumber,
  createUserEntity
} from '../../src/test-util/test-factories';
import { expect } from 'chai';
import { stub } from 'sinon';
import { PresetService } from '../../src/service/preset.service';
import { Server } from 'http';
import { app } from '../../src/app';
import { PresetRepository } from '../../src/repository/preset.repository';
import * as request from 'supertest';
import { HttpStatus } from '../../src/lib/http-status';
import { NotFoundError } from 'routing-controllers';
import { UserRepository } from '../../src/repository/user.repository';

describe('PresetController', () => {
  describe('#listByUserId', () => {
    it('should give back presets', async () => {
      const userId = createRandomNumber();
      const presets = [createPreset(), createPreset()];
      const presetService = createStubbedPresetService({ presets });

      const response = await new PresetController(presetService).listByUserId(userId);

      expect(response).to.eql(presets);
    });

    it('should call preset service method', async () => {
      const userId = createRandomNumber();
      const presetService = createStubbedPresetService();

      await new PresetController(presetService).listByUserId(userId);

      expect(presetService.listByUserId).to.have.been.calledWithExactly(userId);
    });
  });

  describe('#findById', () => {
    it('should give back found preset', async () => {
      const preset = createPreset();
      const presetService = createStubbedPresetService({ presets: [preset] });

      const response = await new PresetController(presetService).findById(preset.id);

      expect(response).to.eql(preset);
    });

    it('should throw error if preset is not found', async () => {
      const presetService = new PresetService(new PresetRepository(), new UserRepository());
      stub(presetService, 'findById').resolves(null);

      await expect(new PresetController(presetService).findById(createRandomNumber())).to.be.rejectedWith(
        NotFoundError
      );
    });

    it('should call preset service method', async () => {
      const presetId = createRandomNumber();
      const presetService = createStubbedPresetService();

      await new PresetController(presetService).findById(presetId);

      expect(presetService.findById).to.have.been.calledWithExactly(presetId);
    });
  });

  describe('#update', () => {
    it('should give back found preset', async () => {
      const preset = createPreset();
      const presetService = createStubbedPresetService({ presets: [preset] });

      const response = await new PresetController(presetService).update(preset.id, { name: 'new-name' });

      expect(response).to.eql(preset);
    });

    it('should throw error if preset is not found', async () => {
      const presetService = new PresetService(new PresetRepository(), new UserRepository());
      stub(presetService, 'update').resolves(null);

      await expect(
        new PresetController(presetService).update(createRandomNumber(), { name: 'new-name' })
      ).to.be.rejectedWith(NotFoundError);
    });

    it('should call preset service method', async () => {
      const presetId = createRandomNumber();
      const payload = { name: 'new-name', userId: 2 };
      const presetService = createStubbedPresetService();

      await new PresetController(presetService).update(presetId, payload);

      expect(presetService.update).to.have.been.calledWithExactly(presetId, payload);
    });
  });

  describe('#insert', () => {
    it('should give back created preset', async () => {
      const insertedPreset = createPreset();
      const presetService = createStubbedPresetService({ insertedPreset });

      const response = await new PresetController(presetService).insert(
        createRandomNumber(),
        createPresetUpsertPayload()
      );

      expect(response).to.eql(insertedPreset);
    });

    it('should call preset service method', async () => {
      const userId = createRandomNumber();
      const payload = createPresetUpsertPayload();
      const presetService = createStubbedPresetService();

      await new PresetController(presetService).insert(userId, payload);

      expect(presetService.insert).to.have.been.calledOnceWithExactly(payload, userId);
    });
  });

  describe('#delete', () => {
    it('should call preset service delete method', async () => {
      const presetService = createStubbedPresetService();
      const presetId = createRandomNumber();

      await new PresetController(presetService).delete(presetId);

      expect(presetService.delete).to.have.been.calledOnceWithExactly(presetId);
    });
  });

  describe('Preset Routes', () => {
    let server: Server;

    beforeEach(() => (server = app.listen()));
    afterEach(() => server.close());

    describe('list by user route', async () => {
      it('should list all presets of user', async () => {
        const presets = [createPresetEntity({ user: createUserEntity() })];
        stub(PresetRepository.prototype, 'listByUserId').resolves(presets);

        const response = await request(server).get('/api/preset/user/123');

        expect(response).to.containSubset({
          status: HttpStatus.OK,
          body: JSON.parse(JSON.stringify(presets))
        });
      });
    });

    describe('get by id route', async () => {
      it('should return preset by id and status 200', async () => {
        const preset = createPresetEntity({ user: createUserEntity() });
        stub(PresetRepository.prototype, 'findById').resolves(preset);

        const response = await request(server).get('/api/preset/123');

        expect(response).to.containSubset({
          status: HttpStatus.OK,
          body: JSON.parse(JSON.stringify(preset))
        });
      });

      it('should return status 404 if preset is not found', async () => {
        stub(PresetRepository.prototype, 'findById').resolves(null);

        const response = await request(server).get('/api/preset/123');

        expect(response).to.containSubset({
          status: HttpStatus.NOT_FOUND,
          body: JSON.parse(JSON.stringify({ message: 'Preset is not found' }))
        });
      });
    });

    describe('update route', async () => {
      it('should return updated preset and status 200', async () => {
        const preset = createPresetEntity({ user: createUserEntity() });
        stub(PresetRepository.prototype, 'update').resolves(preset);

        const response = await request(server).put('/api/preset/123');

        expect(response).to.containSubset({
          status: HttpStatus.OK,
          body: JSON.parse(JSON.stringify(preset))
        });
      });

      it('should return status 404 if updated preset is not found', async () => {
        stub(PresetRepository.prototype, 'update').resolves(null);

        const response = await request(server).put('/api/preset/123');

        expect(response).to.containSubset({
          status: HttpStatus.NOT_FOUND,
          body: JSON.parse(JSON.stringify({ message: 'Preset to update is not found' }))
        });
      });
    });

    describe('insert route', async () => {
      it('should give inserted preset', async () => {
        const preset = createPresetEntity({ user: createUserEntity() });
        stub(PresetRepository.prototype, 'insert').resolves(preset);

        const response = await request(server).post('/api/preset/user/123').send(createPresetUpsertPayload());

        expect(response).to.containSubset({
          status: HttpStatus.OK,
          body: JSON.parse(JSON.stringify(preset))
        });
      });
    });

    describe('delete route', async () => {
      it('should delete the provided preset', async () => {
        stub(PresetRepository.prototype, 'delete').resolves();

        const response = await request(server).delete('/api/preset/123');

        expect(response).to.containSubset({
          status: HttpStatus.NO_CONTENT
        });
      });
    });
  });
});

function createStubbedPresetService({ presets = [createPreset()], insertedPreset = createPreset() } = {}) {
  const presetService = new PresetService(new PresetRepository(), new UserRepository());
  stub(presetService, 'listByUserId').resolves(presets);
  stub(presetService, 'findById').resolves(presets[0]);
  stub(presetService, 'update').resolves(presets[0]);
  stub(presetService, 'insert').resolves(insertedPreset);
  stub(presetService, 'delete').resolves();
  return presetService;
}
