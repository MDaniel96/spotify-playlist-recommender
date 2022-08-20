import { PresetController } from '../../src/controller/preset.controller';
import {
  createPreset,
  createPresetEntity,
  createPresetInsertPayload,
  createRandomNumber
} from '../../src/test-util/test-factories';
import { expect } from 'chai';
import { stub } from 'sinon';
import { PresetService } from '../../src/service/preset.service';
import { Server } from 'http';
import { app } from '../../src/app';
import { PresetRepository } from '../../src/repository/preset.repository';
import * as request from 'supertest';
import { HttpStatus } from '../../src/lib/http-status';

describe('PresetController', () => {
  context('#listByUserId', () => {
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

  context('#insert', () => {
    it('should give back created preset', async () => {
      const insertedPreset = createPreset();
      const presetService = createStubbedPresetService({ insertedPreset });

      const response = await new PresetController(presetService).insert(createPresetInsertPayload());

      expect(response).to.eql(insertedPreset);
    });

    it('should call preset service method', async () => {
      const payload = createPresetInsertPayload();
      const presetService = createStubbedPresetService();

      await new PresetController(presetService).insert(payload);

      expect(presetService.insert).to.have.been.calledOnceWithExactly(payload);
    });
  });

  context('#delete', () => {
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

    context('list route', async () => {
      it('should list all presets of user', async () => {
        const presets = [createPresetEntity()];
        stub(PresetRepository.prototype, 'listByUserId').resolves(presets);

        const response = await request(server).get('/api/preset/123');

        expect(response).to.containSubset({
          status: HttpStatus.OK,
          body: JSON.parse(JSON.stringify(presets))
        });
      });
    });

    context('insert route', async () => {
      it('should give inserted preset', async () => {
        const preset = createPreset();
        stub(PresetRepository.prototype, 'insert').resolves(preset);

        const response = await request(server).post('/api/preset').send(createPresetInsertPayload());

        expect(response).to.containSubset({
          status: HttpStatus.OK,
          body: JSON.parse(JSON.stringify(preset))
        });
      });
    });

    context('delete route', async () => {
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
  const presetService = new PresetService(new PresetRepository());
  stub(presetService, 'listByUserId').resolves(presets);
  stub(presetService, 'insert').resolves(insertedPreset);
  stub(presetService, 'delete').resolves();
  return presetService;
}
