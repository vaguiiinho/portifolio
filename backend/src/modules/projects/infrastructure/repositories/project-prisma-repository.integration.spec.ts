import { Test, TestingModule } from '@nestjs/testing';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { execSync } from 'child_process';
import { ProjectPrismaRepository } from './project-prisma-repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Project } from '../../domain/entities/project';

describe('ProjectPrismaRepository (Integration)', () => {
  let container: StartedPostgreSqlContainer;
  let prismaService: PrismaService;
  let repository: ProjectPrismaRepository;

  beforeAll(async () => {
    // Start PostgreSQL container
    container = await new PostgreSqlContainer('postgres:15').start();

    const host = container.getHost();
    const port = container.getMappedPort(5432);

    const databaseUrl = `postgresql://test:test@${host}:${port}/test`;

    process.env.DATABASE_URL = databaseUrl;

    execSync('npx prisma db push', {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: databaseUrl,
      },
    });

    // Create PrismaService
    prismaService = new PrismaService();

    // Create repository
    repository = new ProjectPrismaRepository(prismaService);
  }, 60000); // Increase timeout for container startup

  afterAll(async () => {
    await prismaService.$disconnect();
    await container.stop();
  });

  beforeEach(async () => {
    // Clean up database
    await prismaService.project.deleteMany();
  });

  it('should create and find a project', async () => {
    const project = new Project(
      '1',
      'Test Project',
      'Description',
      ['TypeScript'],
      'github.com',
      'live.com',
      new Date(),
    );

    const created = await repository.create(project);
    expect(created.id).toBe('1');
    expect(created.title).toBe('Test Project');

    const found = await repository.findById('1');
    expect(found).toBeTruthy();
    expect(found!.title).toBe('Test Project');
  });

  it('should find all projects', async () => {
    const project1 = new Project(
      '1',
      'Project 1',
      'Desc1',
      ['Tech1'],
      '',
      '',
      new Date(),
    );
    const project2 = new Project(
      '2',
      'Project 2',
      'Desc2',
      ['Tech2'],
      '',
      '',
      new Date(),
    );

    await repository.create(project1);
    await repository.create(project2);

    const all = await repository.findAll();
    expect(all).toHaveLength(2);
    expect(all.map((p) => p.title)).toEqual(['Project 1', 'Project 2']);
  });

  it('should update a project', async () => {
    const project = new Project(
      '1',
      'Old Title',
      'Desc',
      ['Tech'],
      '',
      '',
      new Date(),
    );
    await repository.create(project);

    const updatedProject = new Project(
      '1',
      'New Title',
      'Desc',
      ['Tech'],
      '',
      '',
      new Date(),
    );
    const result = await repository.update(updatedProject);

    expect(result.title).toBe('New Title');
  });

  it('should delete a project', async () => {
    const project = new Project(
      '1',
      'Title',
      'Desc',
      ['Tech'],
      '',
      '',
      new Date(),
    );
    await repository.create(project);

    await repository.delete('1');

    const found = await repository.findById('1');
    expect(found).toBeNull();
  });

  it('should return null for non-existent project', async () => {
    const found = await repository.findById('non-existent');
    expect(found).toBeNull();
  });
});
