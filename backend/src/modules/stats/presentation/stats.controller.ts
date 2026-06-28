import { Controller, Get, Put, Post, Body } from '@nestjs/common';
import { GetStats } from '../application/get-stats';
import { UpdateStats } from '../application/update-stats';
import { TrackStatsEvent } from '../application/track-stats-event';
import { UpdateStatsDto, TrackStatsEventDto } from './dtos';

@Controller('stats')
export class StatsController {
  constructor(
    private readonly getStats: GetStats,
    private readonly updateStats: UpdateStats,
    private readonly trackStatsEvent: TrackStatsEvent,
  ) {}

  @Get()
  async get() {
    return this.getStats.execute();
  }

  @Put()
  async update(@Body() dto: UpdateStatsDto) {
    return this.updateStats.execute(dto);
  }

  @Post('events')
  async trackEvent(@Body() dto: TrackStatsEventDto) {
    return this.trackStatsEvent.execute(dto);
  }
}
