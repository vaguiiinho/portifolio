import { Module } from '@nestjs/common';
import { StatsController } from './presentation/stats.controller';
import { GetStats } from './application/get-stats';
import { UpdateStats } from './application/update-stats';
import { TrackStatsEvent } from './application/track-stats-event';
import { StatsPrismaRepository } from './infrastructure/repositories/stats-prisma-repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [StatsController],
  providers: [
    GetStats,
    UpdateStats,
    TrackStatsEvent,
    {
      provide: 'IStatsRepository',
      useClass: StatsPrismaRepository,
    },
  ],
})
export class StatsModule {}
