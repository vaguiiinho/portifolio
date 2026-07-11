import { Global, Module } from '@nestjs/common';
import { EnvironmentService } from '../config';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [EnvironmentService, PrismaService],
  exports: [EnvironmentService, PrismaService],
})
export class DatabaseModule {}
