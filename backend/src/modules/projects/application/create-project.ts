import { Injectable } from '@nestjs/common';
import { Project } from '../domain/entities/project';
import type { IProjectRepository } from '../domain/repositories/i-project-repository';

export interface CreateProjectInput {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

@Injectable()
export class CreateProject {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(input: CreateProjectInput): Promise<Project> {
    const id = this.generateId();
    const createdAt = new Date();

    const project = new Project(
      id,
      input.title,
      input.description,
      input.techStack,
      input.githubUrl || '',
      input.liveUrl || '',
      createdAt,
    );

    return this.projectRepository.create(project);
  }

  private generateId(): string {
    // Simple ID generation, in real app use UUID or CUID
    return Date.now().toString();
  }
}