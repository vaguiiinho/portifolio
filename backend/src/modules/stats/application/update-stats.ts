import { Injectable, Inject } from '@nestjs/common';
import { Stats } from '../domain/entities/stats';
import type { IStatsRepository } from '../domain/repositories/i-stats-repository';
import { STATS_REPOSITORY } from '../../../shared/domain/tokens';
import { StatsResult, toStatsResult } from './stats-result';

export interface UpdateStatsInput {
  projectsCount?: number;
  visitors?: number;
}

@Injectable()
export class UpdateStats {
  constructor(
    @Inject(STATS_REPOSITORY)
    private readonly statsRepository: IStatsRepository,
  ) {}

  async execute(input: UpdateStatsInput): Promise<StatsResult> {
    const existingStats = await this.statsRepository.find();

    const updatedStats = new Stats(
      existingStats.id,
      input.projectsCount ?? existingStats.projectsCount,
      input.visitors ?? existingStats.visitors,
      new Date(),
      existingStats.events,
    );

    return toStatsResult(await this.statsRepository.update(updatedStats));
  }
}
