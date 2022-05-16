import { app } from '../../app';
import * as request from 'supertest';
import { expect } from 'chai';
import { stub } from 'sinon';
import { PresetRepository } from '../../repository/preset/preset.repository';
import { createPreset } from '../../test-util/test-factories';
import { Server } from 'http';

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
