import { PresetService } from '../service/preset.service';
import { Body, Controller, Get, Param, Post } from 'routing-controllers';
import { Preset, PresetInsertPayload } from '../types';
import { Service } from 'typedi';

@Controller()
@Service()
export class PresetController {
  constructor(private presetService: PresetService) {}

  @Get('/preset/:userId')
  async listByUserId(@Param('userId') userId: number): Promise<Preset[]> {
    return await this.presetService.listByUserId(userId);
  }

  @Post('/preset')
  async insert(@Body() presetPayload: PresetInsertPayload): Promise<Preset> {
    return await this.presetService.insert(presetPayload);
  }
}
