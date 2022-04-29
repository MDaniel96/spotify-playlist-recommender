import * as Koa from 'koa';
import { HttpStatus } from '../../lib/http-status/http-status';
import { PresetService } from '../../service/preset/preset.service';

export class PresetController {
  static create(): PresetController {
    return new PresetController(PresetService.create());
  }

  constructor(private presetService: PresetService) {
    this.list = this.list.bind(this);
  }

  async list(context: Koa.Context): Promise<void> {
    const userId = Number(context.params.userId);
    const presets = await this.presetService.listByUserId(userId);

    context.status = HttpStatus.OK;
    context.body = { presets };
  }
}
