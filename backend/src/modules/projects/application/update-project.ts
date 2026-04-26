import { Injectable } from '@nestjs/common';
import { Project } from '../domain/entities/project';
import type { IProjectRepository } from '../domain/repositories/i-project-repository';

export interface UpdateProjectInput {
  id: string;
  title?: string;
  description?: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

@Injectable()
export class UpdateProject {
  constructor(private readonly projectRepository: IProjectRepository) {}

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
      existingProject.createdAt, // Keep original createdAt
    );

    return this.projectRepository.update(updatedProject);
  }
}
