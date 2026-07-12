import { Injectable, Inject } from '@nestjs/common';
import { Project } from '../domain/entities/project';
import type { IProjectRepository } from '../domain/repositories/i-project-repository';
import type { IIdGenerator } from '../../../shared/domain/services/i-id-generator';

export interface CreateProjectInput {
  title: string;
  description: string;
  techStack: string[];
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
export class CreateProject {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,
    @Inject('IIdGenerator') private readonly idGenerator: IIdGenerator,
  ) {}

  async execute(input: CreateProjectInput): Promise<Project> {
    const id = this.idGenerator.generate();
    const createdAt = new Date();

    const project = new Project(
      id,
      input.title,
      input.description,
      input.techStack,
      input.githubUrl || '',
      input.liveUrl || '',
      createdAt,
      input.featured ?? false,
      input.videoUrl,
      input.problemTitle,
      input.problemDescription,
      input.solutionTitle,
      input.solutionDescription,
      input.resultTitle,
      input.resultDescription,
    );

    return this.projectRepository.create(project);
  }
}
