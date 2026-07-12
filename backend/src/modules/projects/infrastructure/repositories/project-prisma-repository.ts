import { Injectable } from '@nestjs/common';
import { mkdir, writeFile } from 'fs/promises';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Project } from '../../domain/entities/project';
import { IProjectRepository } from '../../domain/repositories/i-project-repository';
import { ProjectPrismaMapper } from '../mappers/project-prisma-mapper';

@Injectable()
export class ProjectPrismaRepository implements IProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });
    return projects.map(ProjectPrismaMapper.toDomain);
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({ where: { id } });
    return project ? ProjectPrismaMapper.toDomain(project) : null;
  }

  async create(project: Project): Promise<Project> {
    const videoUrl = await this.persistVideoReference(project.videoUrl);
    const created = await this.prisma.project.create({
      data: {
        ...ProjectPrismaMapper.toPersistence(project),
        videoUrl: videoUrl || null,
      },
    });
    return ProjectPrismaMapper.toDomain(created);
  }

  async update(project: Project): Promise<Project> {
    const videoUrl = await this.persistVideoReference(project.videoUrl);
    const updated = await this.prisma.project.update({
      where: { id: project.id },
      data: (() => {
        const {
          id: _id,
          createdAt: _createdAt,
          ...data
        } = ProjectPrismaMapper.toPersistence(project);
        return { ...data, videoUrl: videoUrl || null };
      })(),
    });
    return ProjectPrismaMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({ where: { id } });
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
