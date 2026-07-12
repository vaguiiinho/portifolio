import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Stats } from '../../domain/entities/stats';
import { IStatsRepository } from '../../domain/repositories/i-stats-repository';
import { StatsPrismaMapper } from '../mappers/stats-prisma-mapper';

@Injectable()
export class StatsPrismaRepository implements IStatsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(): Promise<Stats> {
    const prismaStats = await this.prisma.stats.upsert({
      where: { id: '1' },
      create: {
        id: '1',
        projectsCount: 0,
        visitors: 0,
        events: {},
        updatedAt: new Date(),
      },
      update: {},
    });

    return StatsPrismaMapper.toDomain(prismaStats);
  }

  async update(stats: Stats): Promise<Stats> {
    const { id: _id, ...data } = StatsPrismaMapper.toPersistence(stats);
    const prismaStats = await this.prisma.stats.update({
      where: { id: stats.id },
      data,
    });
    return StatsPrismaMapper.toDomain(prismaStats);
  }

  async trackEvent(key: string, increment = 1): Promise<Stats> {
    const stats = await this.find();
    stats.trackEvent(key, increment);
    return this.update(stats);
  }
}
