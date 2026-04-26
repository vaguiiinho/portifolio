import { Injectable } from '@nestjs/common';
import { Project } from '../domain/entities/project';
import type { IProjectRepository } from '../domain/repositories/i-project-repository';

@Injectable()
export class ListProjects {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }
}