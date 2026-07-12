import { Injectable, Inject } from '@nestjs/common';
import type { IProjectRepository } from '../domain/repositories/i-project-repository';
import { PROJECT_REPOSITORY } from '../../../shared/domain/tokens';
import { ProjectResult, toProjectResult } from './project-result';

export interface UpdateProjectInput {
  id: string;
  title?: string;
  description?: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  problemTitle?: string;
  problemDescription?: string;
  solutionTitle?: string;
  solutionDescription?: string;
  resultTitle?: string;
  resultDescription?: string;
  featured?: boolean;
}

@Injectable()
export class UpdateProject {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(input: UpdateProjectInput): Promise<ProjectResult> {
    const existingProject = await this.projectRepository.findById(input.id);
    if (!existingProject) {
      throw new Error('Project not found');
    }

    existingProject.updateDetails(input);
    return toProjectResult(await this.projectRepository.update(existingProject));
  }
}
