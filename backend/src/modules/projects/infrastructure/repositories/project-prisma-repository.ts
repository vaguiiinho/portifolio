import { Injectable } from '@nestjs/common';
import { Project as PrismaProject } from '../../../../generated/prisma/client';
import { mkdir, writeFile } from 'fs/promises';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Project } from '../../domain/entities/project';
import { IProjectRepository } from '../../domain/repositories/i-project-repository';

@Injectable()
export class ProjectPrismaRepository implements IProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });
    return projects.map((project) => this.mapToDomain(project));
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({ where: { id } });
    return project ? this.mapToDomain(project) : null;
  }

  async create(project: Project): Promise<Project> {
    const videoUrl = await this.persistVideoReference(project.videoUrl);
    const created = await this.prisma.project.create({
      data: {
        id: project.id,
        title: project.title,
        description: project.description,
        techStack: project.techStack,
        githubUrl: this.toNullable(project.githubUrl),
        liveUrl: this.toNullable(project.liveUrl),
        videoUrl: this.toNullable(videoUrl),
        problemTitle: this.toNullable(project.problemTitle),
        problemDescription: this.toNullable(project.problemDescription),
        solutionTitle: this.toNullable(project.solutionTitle),
        solutionDescription: this.toNullable(project.solutionDescription),
        resultTitle: this.toNullable(project.resultTitle),
        resultDescription: this.toNullable(project.resultDescription),
        featured: project.featured,
        createdAt: project.createdAt,
      },
    });
    return this.mapToDomain(created);
  }

  async update(project: Project): Promise<Project> {
    const videoUrl = await this.persistVideoReference(project.videoUrl);
    const updated = await this.prisma.project.update({
      where: { id: project.id },
      data: {
        title: project.title,
        description: project.description,
        techStack: project.techStack,
        githubUrl: this.toNullable(project.githubUrl),
        liveUrl: this.toNullable(project.liveUrl),
        videoUrl: this.toNullable(videoUrl),
        problemTitle: this.toNullable(project.problemTitle),
        problemDescription: this.toNullable(project.problemDescription),
        solutionTitle: this.toNullable(project.solutionTitle),
        solutionDescription: this.toNullable(project.solutionDescription),
        resultTitle: this.toNullable(project.resultTitle),
        resultDescription: this.toNullable(project.resultDescription),
        featured: project.featured,
      },
    });
    return this.mapToDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({ where: { id } });
  }

  private mapToDomain(project: PrismaProject): Project {
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

  private toNullable(value?: string): string | null {
    return value || null;
  }

  private async persistVideoReference(
    videoUrl?: string,
  ): Promise<string | undefined> {
    if (!videoUrl || videoUrl.startsWith('/uploads/')) return videoUrl;
    if (!videoUrl.startsWith('data:video/')) return videoUrl;

    const match = videoUrl.match(/^data:(video\/[a-z0-9.+-]+);base64,(.+)$/i);
    if (!match) return videoUrl;

    const mimeType = match[1];
    const uploadsDir = join(process.cwd(), 'uploads', 'projects');
    const fileName = `${randomUUID()}${this.extensionFromMimeType(mimeType)}`;

    await mkdir(uploadsDir, { recursive: true });
    await writeFile(
      join(uploadsDir, fileName),
      Buffer.from(match[2], 'base64'),
    );
    return `/uploads/projects/${fileName}`;
  }

  private extensionFromMimeType(mimeType: string): string {
    switch (mimeType.toLowerCase()) {
      case 'video/mp4':
        return '.mp4';
      case 'video/webm':
        return '.webm';
      case 'video/ogg':
        return '.ogv';
      case 'video/quicktime':
        return '.mov';
      default:
        return extname(mimeType.split('/').pop() ?? '') || '.mp4';
    }
  }
}
