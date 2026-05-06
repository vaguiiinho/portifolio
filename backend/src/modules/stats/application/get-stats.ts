import { Injectable, Inject } from '@nestjs/common';
import { Stats } from '../domain/entities/stats';
import type { IStatsRepository } from '../domain/repositories/i-stats-repository';

@Injectable()
export class GetStats {
  constructor(
    @Inject('IStatsRepository')
    private readonly statsRepository: IStatsRepository,
  ) {}

  async execute(): Promise<Stats> {
    return this.statsRepository.find();
  }
}
