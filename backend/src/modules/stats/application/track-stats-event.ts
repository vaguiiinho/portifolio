import { Injectable, Inject } from '@nestjs/common';
import { Stats } from '../domain/entities/stats';
import type { IStatsRepository } from '../domain/repositories/i-stats-repository';

export interface TrackStatsEventInput {
  key: string;
  increment?: number;
}

@Injectable()
export class TrackStatsEvent {
  constructor(
    @Inject('IStatsRepository')
    private readonly statsRepository: IStatsRepository,
  ) {}

  async execute(input: TrackStatsEventInput): Promise<Stats> {
    const stats = await this.statsRepository.find();
    const increment = input.increment ?? 1;

    stats.trackEvent(input.key, increment);
    return this.statsRepository.update(stats);
  }
}
