import { PresetService } from '../service/preset.service';
import { Controller, Get, Param } from 'routing-controllers';
import { Preset } from '../types';

@Controller()
export class PresetController {
  @Get('/preset/:userId')
  async listByUserId(@Param('userId') userId: number): Promise<Preset[]> {
    const presetService = PresetService.create();
    return await presetService.listByUserId(userId);
  }
}
