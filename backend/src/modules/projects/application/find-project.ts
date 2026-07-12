import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IProjectRepository } from '../domain/repositories/i-project-repository';
import { PROJECT_REPOSITORY } from '../../../shared/domain/tokens';
import { ProjectResult, toProjectResult } from './project-result';

@Injectable()
export class FindProject {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(id: string): Promise<ProjectResult> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return toProjectResult(project);
  }
}
