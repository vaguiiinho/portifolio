import { ProjectPrismaMapper } from './project-prisma-mapper';
import { Project } from '../../domain/entities/project';

describe('ProjectPrismaMapper', () => {
  it('converts optional domain fields to nullable persistence fields', () => {
    const project = new Project(
      'project-1',
      'Portfolio',
      'A project description',
      [' TypeScript ', 'TypeScript'],
      '',
      '',
      new Date('2026-01-01T00:00:00.000Z'),
    );

    const persisted = ProjectPrismaMapper.toPersistence(project);

    expect(persisted.techStack).toEqual(['TypeScript']);
    expect(persisted.githubUrl).toBeNull();
    expect(persisted.liveUrl).toBeNull();
    expect(persisted.videoUrl).toBeNull();
  });
});
