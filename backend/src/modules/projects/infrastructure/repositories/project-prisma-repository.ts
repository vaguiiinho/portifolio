import { Injectable } from '@nestjs/common';
import { Project as PrismaProject } from '../../../../generated/prisma/client';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Project } from '../../domain/entities/project';
import { IProjectRepository } from '../../domain/repositories/i-project-repository';

@Injectable()
export class ProjectPrismaRepository implements IProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    const prismaProjects = await this.prisma.project.findMany();
    return prismaProjects.map(this.mapToDomain);
  }

  async findById(id: string): Promise<Project | null> {
    const prismaProject = await this.prisma.project.findUnique({
      where: { id },
    });
    return prismaProject ? this.mapToDomain(prismaProject) : null;
  }

  async create(project: Project): Promise<Project> {
    const data = {
      id: project.id,
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      createdAt: project.createdAt,
    };
    const prismaProject = await this.prisma.project.create({ data });
    return this.mapToDomain(prismaProject);
  }

  async update(project: Project): Promise<Project> {
    const data = {
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
    };
    const prismaProject = await this.prisma.project.update({
      where: { id: project.id },
      data,
    });
    return this.mapToDomain(prismaProject);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaProject: PrismaProject): Project {
    return new Project(
      prismaProject.id,
      prismaProject.title,
      prismaProject.description,
      prismaProject.techStack,
      prismaProject.githubUrl || '',
      prismaProject.liveUrl || '',
      prismaProject.createdAt,
    );
  }
}
