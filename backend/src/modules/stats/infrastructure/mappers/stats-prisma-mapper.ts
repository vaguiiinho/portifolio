import { Stats as PrismaStats } from '../../../../generated/prisma/client';
import { Stats } from '../../domain/entities/stats';

export class StatsPrismaMapper {
  static toDomain(stats: PrismaStats): Stats {
    return new Stats(
      stats.id,
      stats.projectsCount,
      stats.visitors,
      stats.updatedAt,
      (stats.events as Record<string, number> | null) ?? {},
    );
  }

  static toPersistence(stats: Stats) {
    return {
      id: stats.id,
      projectsCount: stats.projectsCount,
      visitors: stats.visitors,
      events: stats.events,
      updatedAt: stats.updatedAt,
    };
  }
}
