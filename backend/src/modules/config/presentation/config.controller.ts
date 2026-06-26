import { Body, Controller, Get, Put } from '@nestjs/common';
import { GetConfig } from '../application/get-config';
import { UpdateConfig } from '../application/update-config';
import { UpdateConfigDto } from './dtos';

@Controller('config')
export class ConfigController {
  constructor(
    private readonly getConfig: GetConfig,
    private readonly updateConfig: UpdateConfig,
  ) {}

  @Get()
  async get() {
    return this.getConfig.execute();
  }

  @Put()
  async update(@Body() dto: UpdateConfigDto) {
    return this.updateConfig.execute(dto);
  }
}
