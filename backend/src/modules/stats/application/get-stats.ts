import { Injectable, Inject } from '@nestjs/common';
import { Stats } from '../domain/entities/stats';
import type { IStatsRepository } from '../domain/repositories/i-stats-repository';
import { STATS_REPOSITORY } from '../../../shared/domain/tokens';

@Injectable()
export class GetStats {
  constructor(
    @Inject(STATS_REPOSITORY)
    private readonly statsRepository: IStatsRepository,
  ) {}

  async execute(): Promise<Stats> {
    return this.statsRepository.find();
  }
}
