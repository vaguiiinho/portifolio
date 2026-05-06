import {
  Controller,
  Get,
  Put,
  Body,
} from '@nestjs/common';
import { GetStats } from '../application/get-stats';
import { UpdateStats } from '../application/update-stats';
import { UpdateStatsDto } from './dtos';

@Controller('stats')
export class StatsController {
  constructor(
    private readonly getStats: GetStats,
    private readonly updateStats: UpdateStats,
  ) {}

  @Get()
  async get() {
    return this.getStats.execute();
  }

  @Put()
  async update(@Body() dto: UpdateStatsDto) {
    return this.updateStats.execute(dto);
  }
}
