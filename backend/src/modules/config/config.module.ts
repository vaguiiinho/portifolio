import { Module } from '@nestjs/common';
import { ConfigController } from './presentation/config.controller';
import { GetConfig } from './application/get-config';
import { UpdateConfig } from './application/update-config';
import { ConfigPrismaRepository } from './infrastructure/repositories/config-prisma-repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ConfigController],
  providers: [
    GetConfig,
    UpdateConfig,
    {
      provide: 'IConfigRepository',
      useClass: ConfigPrismaRepository,
    },
  ],
  exports: [GetConfig, UpdateConfig],
})
export class ConfigModule {}
