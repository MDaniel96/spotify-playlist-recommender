import * as Koa from 'koa';
import { PresetRepository } from '../../repository/preset/preset.repository';
import { HttpStatus } from '../../lib/http-status/http-status';

export class PresetController {
  static create(): PresetController {
    return new PresetController(PresetRepository.create());
  }

  constructor(private presetRepository: PresetRepository) {
    this.list = this.list.bind(this);
  }

  async list(context: Koa.Context): Promise<void> {
    const userId = Number(context.params.userId);
    const presets = await this.presetRepository.listByUserId(userId);

    context.status = HttpStatus.OK;
    context.body = { presets };
  }
}
