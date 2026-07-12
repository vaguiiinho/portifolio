import { Injectable, Inject } from '@nestjs/common';
import type { IStatsRepository } from '../domain/repositories/i-stats-repository';
import { STATS_REPOSITORY } from '../../../shared/domain/tokens';
import { StatsResult, toStatsResult } from './stats-result';

export interface TrackStatsEventInput {
  key: string;
  increment?: number;
}

@Injectable()
export class TrackStatsEvent {
  constructor(
    @Inject(STATS_REPOSITORY)
    private readonly statsRepository: IStatsRepository,
  ) {}

  async execute(input: TrackStatsEventInput): Promise<StatsResult> {
    const stats = await this.statsRepository.find();
    const increment = input.increment ?? 1;

    stats.trackEvent(input.key, increment);
    return toStatsResult(await this.statsRepository.update(stats));
  }
}
