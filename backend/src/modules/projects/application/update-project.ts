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

    const updatedProject = new Project(
      existingProject.id,
      input.title ?? existingProject.title,
      input.description ?? existingProject.description,
      input.techStack ?? existingProject.techStack,
      input.githubUrl ?? existingProject.githubUrl,
      input.liveUrl ?? existingProject.liveUrl,
      existingProject.createdAt,
      input.featured ?? existingProject.featured,
      input.videoUrl ?? existingProject.videoUrl,
      input.problemTitle ?? existingProject.problemTitle,
      input.problemDescription ?? existingProject.problemDescription,
      input.solutionTitle ?? existingProject.solutionTitle,
      input.solutionDescription ?? existingProject.solutionDescription,
      input.resultTitle ?? existingProject.resultTitle,
      input.resultDescription ?? existingProject.resultDescription,
    );

    return this.projectRepository.update(updatedProject);
  }
}
