import { Injectable } from '@nestjs/common';
import { Stats as PrismaStats } from '../../../../generated/prisma/client';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Stats } from '../../domain/entities/stats';
import { IStatsRepository } from '../../domain/repositories/i-stats-repository';

@Injectable()
export class StatsPrismaRepository implements IStatsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(): Promise<Stats> {
    let prismaStats = await this.prisma.stats.findFirst();

    if (!prismaStats) {
      prismaStats = await this.prisma.stats.create({
        data: {
          id: '1',
          projectsCount: 0,
          visitors: 0,
          events: {},
          updatedAt: new Date(),
        },
      });
    }

    return this.mapToDomain(prismaStats);
  }

  async update(stats: Stats): Promise<Stats> {
    const data = {
      projectsCount: stats.projectsCount,
      visitors: stats.visitors,
      events: stats.events,
      updatedAt: stats.updatedAt,
    };
    const prismaStats = await this.prisma.stats.update({
      where: { id: stats.id },
      data,
    });
    return this.mapToDomain(prismaStats);
  }

  async trackEvent(key: string, increment = 1): Promise<Stats> {
    const stats = await this.find();
    stats.trackEvent(key, increment);
    return this.update(stats);
  }

  private mapToDomain(prismaStats: PrismaStats): Stats {
    return new Stats(
      prismaStats.id,
      prismaStats.projectsCount,
      prismaStats.visitors,
      prismaStats.updatedAt,
      (prismaStats.events as Record<string, number> | null) ?? {},
    );
  }
}
