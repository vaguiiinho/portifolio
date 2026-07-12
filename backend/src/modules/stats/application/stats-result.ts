import { Stats } from '../domain/entities/stats';

export interface StatsResult {
  id: string;
  projectsCount: number;
  visitors: number;
  events: Record<string, number>;
  updatedAt: Date;
}

export function toStatsResult(stats: Stats): StatsResult {
  return {
    id: stats.id,
    projectsCount: stats.projectsCount,
    visitors: stats.visitors,
    events: stats.events,
    updatedAt: stats.updatedAt,
  };
}
