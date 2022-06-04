import { PresetController } from '../../src/controller/preset.controller';
import { createPreset, createPresetEntity, createRandomNumber } from '../../src/test-util/test-factories';
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
      const presetService = createStubbedPresetService(presets);

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
  });
});

function createStubbedPresetService(presets = [createPreset()]) {
  const presetService = new PresetService(new PresetRepository());
  stub(presetService, 'listByUserId').resolves(presets);
  return presetService;
}
