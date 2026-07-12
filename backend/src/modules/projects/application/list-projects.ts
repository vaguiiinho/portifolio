import { Injectable, Inject } from '@nestjs/common';
import { Project } from '../domain/entities/project';
import type { IProjectRepository } from '../domain/repositories/i-project-repository';
import { PROJECT_REPOSITORY } from '../../../shared/domain/tokens';

@Injectable()
export class ListProjects {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }
}
