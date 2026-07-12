import { Injectable, Inject } from '@nestjs/common';
import { Project } from '../domain/entities/project';
import type { IProjectRepository } from '../domain/repositories/i-project-repository';

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
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(input: UpdateProjectInput): Promise<Project> {
    const existingProject = await this.projectRepository.findById(input.id);
    if (!existingProject) {
      throw new Error('Project not found');
    }

    existingProject.updateDetails(input);
    return this.projectRepository.update(existingProject);
  }
}
