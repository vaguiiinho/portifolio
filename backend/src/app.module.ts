import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './shared/infrastructure/prisma.service';
import { ProjectsModule } from './modules/projects/projects.module';
import { ContactModule } from './modules/contact/contact.module';
import { StatsModule } from './modules/stats/stats.module';
import { ConfigModule } from './modules/config/config.module';

@Module({
  imports: [ProjectsModule, ContactModule, StatsModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
