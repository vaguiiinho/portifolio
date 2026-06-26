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
      updatedAt: stats.updatedAt,
    };
    const prismaStats = await this.prisma.stats.update({
      where: { id: stats.id },
      data,
    });
    return this.mapToDomain(prismaStats);
  }

  private mapToDomain(prismaStats: PrismaStats): Stats {
    return new Stats(
      prismaStats.id,
      prismaStats.projectsCount,
      prismaStats.visitors,
      prismaStats.updatedAt,
    );
  }
}
