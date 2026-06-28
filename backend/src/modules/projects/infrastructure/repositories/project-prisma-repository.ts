import { Injectable } from '@nestjs/common';
import {
  Prisma,
  Project as PrismaProject,
} from '../../../../generated/prisma/client';
import { mkdir, writeFile } from 'fs/promises';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Project } from '../../domain/entities/project';
import { IProjectRepository } from '../../domain/repositories/i-project-repository';

type RawProject = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  videoUrl: string | null;
  problemTitle: string | null;
  problemDescription: string | null;
  solutionTitle: string | null;
  solutionDescription: string | null;
  resultTitle: string | null;
  resultDescription: string | null;
  createdAt: Date;
};

@Injectable()
export class ProjectPrismaRepository implements IProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    const hasExtendedColumns = await this.hasExtendedColumns();
    const prismaProjects = hasExtendedColumns
      ? await this.prisma.$queryRaw<RawProject[]>(
          Prisma.sql`
            SELECT
              id,
              title,
              description,
              "techStack",
              "githubUrl",
              "liveUrl",
              "videoUrl",
              "problemTitle",
              "problemDescription",
              "solutionTitle",
              "solutionDescription",
              "resultTitle",
              "resultDescription",
              "createdAt"
            FROM "projects"
            ORDER BY "createdAt" DESC
          `,
        )
      : await this.prisma.$queryRaw<RawProject[]>(
          Prisma.sql`
            SELECT
              id,
              title,
              description,
              "techStack",
              "githubUrl",
              "liveUrl",
              NULL AS "videoUrl",
              NULL AS "problemTitle",
              NULL AS "problemDescription",
              NULL AS "solutionTitle",
              NULL AS "solutionDescription",
              NULL AS "resultTitle",
              NULL AS "resultDescription",
              "createdAt"
            FROM "projects"
            ORDER BY "createdAt" DESC
          `,
        );
    return prismaProjects.map(this.mapToDomain);
  }

  async findById(id: string): Promise<Project | null> {
    const hasExtendedColumns = await this.hasExtendedColumns();
    const prismaProjects = hasExtendedColumns
      ? await this.prisma.$queryRaw<RawProject[]>(
          Prisma.sql`
            SELECT
              id,
              title,
              description,
              "techStack",
              "githubUrl",
              "liveUrl",
              "videoUrl",
              "problemTitle",
              "problemDescription",
              "solutionTitle",
              "solutionDescription",
              "resultTitle",
              "resultDescription",
              "createdAt"
            FROM "projects"
            WHERE id = ${id}
            LIMIT 1
          `,
        )
      : await this.prisma.$queryRaw<RawProject[]>(
          Prisma.sql`
            SELECT
              id,
              title,
              description,
              "techStack",
              "githubUrl",
              "liveUrl",
              NULL AS "videoUrl",
              NULL AS "problemTitle",
              NULL AS "problemDescription",
              NULL AS "solutionTitle",
              NULL AS "solutionDescription",
              NULL AS "resultTitle",
              NULL AS "resultDescription",
              "createdAt"
            FROM "projects"
            WHERE id = ${id}
            LIMIT 1
          `,
        );
    return prismaProjects[0] ? this.mapToDomain(prismaProjects[0]) : null;
  }

  async create(project: Project): Promise<Project> {
    const hasExtendedColumns = await this.hasExtendedColumns();
    const videoUrl = await this.persistVideoReference(project.videoUrl);
    const prismaProjects = hasExtendedColumns
      ? await this.prisma.$queryRaw<RawProject[]>(
          Prisma.sql`
            INSERT INTO "projects" (
              id,
              title,
              description,
              "techStack",
              "githubUrl",
              "liveUrl",
              "videoUrl",
              "createdAt",
              "updatedAt"
            ) VALUES (
              ${project.id},
              ${project.title},
              ${project.description},
              ${project.techStack},
              ${project.githubUrl || null},
              ${project.liveUrl || null},
              ${videoUrl || null},
              ${project.createdAt},
              ${new Date()}
            )
            RETURNING
              id,
              title,
              description,
              "techStack",
              "githubUrl",
              "liveUrl",
              "videoUrl",
              "problemTitle",
              "problemDescription",
              "solutionTitle",
              "solutionDescription",
              "resultTitle",
              "resultDescription",
              "createdAt"
          `,
        )
      : await this.prisma.$queryRaw<RawProject[]>(
          Prisma.sql`
            INSERT INTO "projects" (
              id,
              title,
              description,
              "techStack",
              "githubUrl",
              "liveUrl",
              "createdAt",
              "updatedAt"
            ) VALUES (
              ${project.id},
              ${project.title},
              ${project.description},
              ${project.techStack},
              ${project.githubUrl || null},
              ${project.liveUrl || null},
              ${project.createdAt},
              ${new Date()}
            )
            RETURNING
              id,
              title,
              description,
              "techStack",
              "githubUrl",
              "liveUrl",
              NULL AS "videoUrl",
              NULL AS "problemTitle",
              NULL AS "problemDescription",
              NULL AS "solutionTitle",
              NULL AS "solutionDescription",
              NULL AS "resultTitle",
              NULL AS "resultDescription",
              "createdAt"
          `,
        );
    return this.mapToDomain(prismaProjects[0]);
  }

  async update(project: Project): Promise<Project> {
    const hasExtendedColumns = await this.hasExtendedColumns();
    const videoUrl = await this.persistVideoReference(project.videoUrl);
    const prismaProjects = hasExtendedColumns
      ? await this.prisma.$queryRaw<RawProject[]>(
          Prisma.sql`
            UPDATE "projects"
            SET
              title = ${project.title},
              description = ${project.description},
              "techStack" = ${project.techStack},
              "githubUrl" = ${project.githubUrl || null},
              "liveUrl" = ${project.liveUrl || null},
              "videoUrl" = ${videoUrl || null},
              "problemTitle" = ${project.problemTitle || null},
              "problemDescription" = ${project.problemDescription || null},
              "solutionTitle" = ${project.solutionTitle || null},
              "solutionDescription" = ${project.solutionDescription || null},
              "resultTitle" = ${project.resultTitle || null},
              "resultDescription" = ${project.resultDescription || null},
              "updatedAt" = ${new Date()}
            WHERE id = ${project.id}
            RETURNING
              id,
              title,
              description,
              "techStack",
              "githubUrl",
              "liveUrl",
              "videoUrl",
              "problemTitle",
              "problemDescription",
              "solutionTitle",
              "solutionDescription",
              "resultTitle",
              "resultDescription",
              "createdAt"
          `,
        )
      : await this.prisma.$queryRaw<RawProject[]>(
          Prisma.sql`
            UPDATE "projects"
            SET
              title = ${project.title},
              description = ${project.description},
              "techStack" = ${project.techStack},
              "githubUrl" = ${project.githubUrl || null},
              "liveUrl" = ${project.liveUrl || null},
              "updatedAt" = ${new Date()}
            WHERE id = ${project.id}
            RETURNING
              id,
              title,
              description,
              "techStack",
              "githubUrl",
              "liveUrl",
              NULL AS "videoUrl",
              NULL AS "problemTitle",
              NULL AS "problemDescription",
              NULL AS "solutionTitle",
              NULL AS "solutionDescription",
              NULL AS "resultTitle",
              NULL AS "resultDescription",
              "createdAt"
          `,
        );
    return this.mapToDomain(prismaProjects[0]);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.$executeRaw(
      Prisma.sql`DELETE FROM "projects" WHERE id = ${id}`,
    );
  }

  private mapToDomain(prismaProject: RawProject): Project {
    const project = prismaProject as unknown as PrismaProject & RawProject;
    return new Project(
      project.id,
      project.title,
      project.description,
      project.techStack,
      project.githubUrl || '',
      project.liveUrl || '',
      project.createdAt,
      project.videoUrl ?? undefined,
      project.problemTitle ?? undefined,
      project.problemDescription ?? undefined,
      project.solutionTitle ?? undefined,
      project.solutionDescription ?? undefined,
      project.resultTitle ?? undefined,
      project.resultDescription ?? undefined,
    );
  }

  private async hasExtendedColumns(): Promise<boolean> {
    const result = await this.prisma.$queryRaw<Array<{ exists: boolean }>>(
      Prisma.sql`
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'projects'
            AND column_name = 'problemTitle'
        ) AS "exists"
      `,
    );

    return result[0]?.exists ?? false;
  }

  private async persistVideoReference(
    videoUrl?: string,
  ): Promise<string | undefined> {
    if (!videoUrl) {
      return undefined;
    }

    if (videoUrl.startsWith('/uploads/')) {
      return videoUrl;
    }

    if (!videoUrl.startsWith('data:video/')) {
      return videoUrl;
    }

    const match = videoUrl.match(/^data:(video\/[a-z0-9.+-]+);base64,(.+)$/i);
    if (!match) {
      return videoUrl;
    }

    const mimeType = match[1];
    const base64Data = match[2];
    const extension = this.extensionFromMimeType(mimeType);
    const uploadsDir = join(process.cwd(), 'uploads', 'projects');
    const fileName = `${randomUUID()}${extension}`;
    const filePath = join(uploadsDir, fileName);

    await mkdir(uploadsDir, { recursive: true });
    await writeFile(filePath, Buffer.from(base64Data, 'base64'));

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
