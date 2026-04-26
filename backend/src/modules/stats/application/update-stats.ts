import { Injectable } from '@nestjs/common';
import { Stats } from '../domain/entities/stats';
import type { IStatsRepository } from '../domain/repositories/i-stats-repository';

export interface UpdateStatsInput {
  projectsCount?: number;
  visitors?: number;
}

@Injectable()
export class UpdateStats {
  constructor(private readonly statsRepository: IStatsRepository) {}

  async execute(input: UpdateStatsInput): Promise<Stats> {
    const existingStats = await this.statsRepository.find();

    const updatedStats = new Stats(
      existingStats.id,
      input.projectsCount ?? existingStats.projectsCount,
      input.visitors ?? existingStats.visitors,
      new Date(), // updatedAt
    );

    return this.statsRepository.update(updatedStats);
  }
}
