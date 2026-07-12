import { Project as PrismaProject } from '../../../../generated/prisma/client';
import { Project } from '../../domain/entities/project';

export class ProjectPrismaMapper {
  static toDomain(project: PrismaProject): Project {
    return new Project(
      project.id,
      project.title,
      project.description,
      project.techStack,
      project.githubUrl ?? '',
      project.liveUrl ?? '',
      project.createdAt,
      project.featured,
      project.videoUrl ?? undefined,
      project.problemTitle ?? undefined,
      project.problemDescription ?? undefined,
      project.solutionTitle ?? undefined,
      project.solutionDescription ?? undefined,
      project.resultTitle ?? undefined,
      project.resultDescription ?? undefined,
    );
  }

  static toPersistence(project: Project) {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      githubUrl: project.githubUrl || null,
      liveUrl: project.liveUrl || null,
      videoUrl: project.videoUrl || null,
      problemTitle: project.problemTitle || null,
      problemDescription: project.problemDescription || null,
      solutionTitle: project.solutionTitle || null,
      solutionDescription: project.solutionDescription || null,
      resultTitle: project.resultTitle || null,
      resultDescription: project.resultDescription || null,
      featured: project.featured,
      createdAt: project.createdAt,
    };
  }
}
