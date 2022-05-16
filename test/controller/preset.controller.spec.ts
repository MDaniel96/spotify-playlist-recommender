import { PresetController } from '../../src/controller/preset.controller';
import { createPreset, createRandomNumber } from '../test-util/test-factories.spec';
import { expect } from 'chai';
import { stub } from 'sinon';
import { PresetService } from '../../src/service/preset.service';
import { Server } from 'http';
import { app } from '../../src/app';
import { PresetRepository } from '../../src/repository/preset.repository';
import * as request from 'supertest';

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

  describe('Preset Routes', () => {
    let server: Server;

    beforeEach(() => (server = app.listen()));
    afterEach(() => server.close());

    context('list route', async () => {
      it('should list all presets of user', async () => {
        const presets = [createPreset()];
        stub(PresetRepository.prototype, 'listByUserId').resolves(presets);

        const response = await request(server).get('/api/preset/123');

        expect(response).to.containSubset({
          status: 200,
          body: JSON.parse(JSON.stringify(presets))
        });
      });
    });
  });
});
