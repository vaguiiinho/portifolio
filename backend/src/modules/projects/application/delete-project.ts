import { Injectable, Inject } from '@nestjs/common';
import type { IProjectRepository } from '../domain/repositories/i-project-repository';
import { PROJECT_REPOSITORY } from '../../../shared/domain/tokens';

@Injectable()
export class DeleteProject {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existingProject = await this.projectRepository.findById(id);
    if (!existingProject) {
      throw new Error('Project not found');
    }

    return this.projectRepository.delete(id);
  }
}
