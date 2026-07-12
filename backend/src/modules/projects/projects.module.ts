import { Module } from '@nestjs/common';
import { ProjectsController } from './presentation/projects.controller';
import { CreateProject } from './application/create-project';
import { ListProjects } from './application/list-projects';
import { UpdateProject } from './application/update-project';
import { DeleteProject } from './application/delete-project';
import { FindProject } from './application/find-project';
import { ProjectPrismaRepository } from './infrastructure/repositories/project-prisma-repository';
import { AuthModule } from '../auth/auth.module';
import { IdentifiersModule } from '../../shared/infrastructure';
import { PROJECT_REPOSITORY } from '../../shared/domain/tokens';

@Module({
  imports: [AuthModule, IdentifiersModule],
  controllers: [ProjectsController],
  providers: [
    CreateProject,
    ListProjects,
    FindProject,
    UpdateProject,
    DeleteProject,
    {
      provide: PROJECT_REPOSITORY,
      useClass: ProjectPrismaRepository,
    },
  ],
})
export class ProjectsModule {}
