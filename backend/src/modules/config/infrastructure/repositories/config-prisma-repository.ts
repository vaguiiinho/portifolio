import { Injectable } from '@nestjs/common';
import { Config as PrismaConfig } from '../../../../generated/prisma/client';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Config } from '../../domain/entities/config';
import { IConfigRepository } from '../../domain/repositories/i-config-repository';

const DEFAULT_CONFIG = {
  id: '1',
  siteName: 'João Silva',
  description:
    'Full Stack Developer building scalable and modern applications.',
};

@Injectable()
export class ConfigPrismaRepository implements IConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(): Promise<Config> {
    let prismaConfig = await this.prisma.config.findFirst();

    if (!prismaConfig) {
      prismaConfig = await this.prisma.config.create({
        data: {
          ...DEFAULT_CONFIG,
          updatedAt: new Date(),
        },
      });
    }

    return this.mapToDomain(prismaConfig);
  }

  async update(config: Config): Promise<Config> {
    const prismaConfig = await this.prisma.config.update({
      where: { id: config.id },
      data: {
        siteName: config.siteName,
        description: config.description,
        updatedAt: config.updatedAt,
      },
    });

    return this.mapToDomain(prismaConfig);
  }

  private mapToDomain(prismaConfig: PrismaConfig): Config {
    return new Config(
      prismaConfig.id,
      prismaConfig.siteName,
      prismaConfig.description,
      prismaConfig.updatedAt,
    );
  }
}
