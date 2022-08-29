import { PresetService } from '../service/preset.service';
import { Body, Controller, Delete, Get, NotFoundError, OnUndefined, Param, Post, Put } from 'routing-controllers';
import { Preset, PresetUpsertPayload } from '../types';
import { Service } from 'typedi';
import { HttpStatus } from '../lib/http-status';

@Controller()
@Service()
export class PresetController {
  constructor(private presetService: PresetService) {}

  @Get('/preset/user/:userId')
  async listByUserId(@Param('userId') userId: number): Promise<Preset[]> {
    return await this.presetService.listByUserId(userId);
  }

  @Get('/preset/:id')
  async findById(@Param('id') presetId: number): Promise<Preset> {
    const preset = await this.presetService.findById(presetId);
    if (!preset) {
      throw new NotFoundError('Preset is not found');
    }
    return preset;
  }

  @Put('/preset/:id')
  async update(@Param('id') presetId: number, @Body() payload: PresetUpsertPayload): Promise<Preset> {
    const preset = await this.presetService.update(presetId, payload);
    if (!preset) {
      throw new NotFoundError('Preset to update is not found');
    }
    return preset;
  }

  @Post('/preset/user/:userId')
  async insert(@Param('userId') userId: number, @Body() payload: PresetUpsertPayload): Promise<Preset> {
    return await this.presetService.insert(payload, userId);
  }

  @Delete('/preset/:id')
  @OnUndefined(HttpStatus.NO_CONTENT)
  async delete(@Param('id') presetId: number): Promise<void> {
    return await this.presetService.delete(presetId);
  }
}
