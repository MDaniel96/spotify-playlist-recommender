import { PresetService } from '../service/preset.service';
import { Controller, Get, Param } from 'routing-controllers';
import { Preset } from '../types';
import { Service } from 'typedi';

@Controller()
@Service()
export class PresetController {
  constructor(private presetService: PresetService) {}

  @Get('/preset/:userId')
  async listByUserId(@Param('userId') userId: number): Promise<Preset[]> {
    return await this.presetService.listByUserId(userId);
  }
}
