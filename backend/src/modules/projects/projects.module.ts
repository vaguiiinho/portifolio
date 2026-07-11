import { Module } from '@nestjs/common';
import { ProjectsController } from './presentation/projects.controller';
import { CreateProject } from './application/create-project';
import { ListProjects } from './application/list-projects';
import { UpdateProject } from './application/update-project';
import { DeleteProject } from './application/delete-project';
import { ProjectPrismaRepository } from './infrastructure/repositories/project-prisma-repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ProjectsController],
  providers: [
    CreateProject,
    ListProjects,
    UpdateProject,
    DeleteProject,
    {
      provide: 'IProjectRepository',
      useClass: ProjectPrismaRepository,
    },
  ],
})
export class ProjectsModule {}
