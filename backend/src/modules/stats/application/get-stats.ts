import { Injectable, Inject } from '@nestjs/common';
import type { IStatsRepository } from '../domain/repositories/i-stats-repository';
import { STATS_REPOSITORY } from '../../../shared/domain/tokens';
import { StatsResult, toStatsResult } from './stats-result';

@Injectable()
export class GetStats {
  constructor(
    @Inject(STATS_REPOSITORY)
    private readonly statsRepository: IStatsRepository,
  ) {}

  async execute(): Promise<StatsResult> {
    return toStatsResult(await this.statsRepository.find());
  }
}
