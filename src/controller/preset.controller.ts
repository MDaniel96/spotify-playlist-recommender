import { PresetService } from '../service/preset.service';
import { Body, Controller, Delete, Get, OnUndefined, Param, Post } from 'routing-controllers';
import { Preset, PresetInsertPayload } from '../types';
import { Service } from 'typedi';
import { HttpStatus } from '../lib/http-status';

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

  @Delete('/preset/:id')
  @OnUndefined(HttpStatus.NO_CONTENT)
  async delete(@Param('id') presetId: number): Promise<void> {
    return await this.presetService.delete(presetId);
  }
}
