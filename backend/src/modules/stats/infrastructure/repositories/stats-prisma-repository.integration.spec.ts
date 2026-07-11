import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { execSync } from 'child_process';
import { StatsPrismaRepository } from './stats-prisma-repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { EnvironmentService } from '../../../../shared/config';
import { Stats } from '../../domain/entities/stats';

describe('StatsPrismaRepository (Integration)', () => {
  let container: StartedPostgreSqlContainer;
  let prismaService: PrismaService;
  let repository: StatsPrismaRepository;

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
    prismaService = new PrismaService(new EnvironmentService());

    // Create repository
    repository = new StatsPrismaRepository(prismaService);
  }, 60000); // Increase timeout for container startup
  afterAll(async () => {
    await prismaService.$disconnect();
    await container.stop();
  });

  beforeEach(async () => {
    // Clean up database
    await prismaService.stats.deleteMany();
  });

  it('should find stats, creating default if none exist', async () => {
    const stats = await repository.find();
    expect(stats.id).toBe('1');
    expect(stats.projectsCount).toBe(0);
    expect(stats.visitors).toBe(0);
  });

  it('should update stats', async () => {
    // First find to create default
    await repository.find();

    const updatedStats = new Stats('1', 10, 200, new Date());
    const result = await repository.update(updatedStats);

    expect(result.projectsCount).toBe(10);
    expect(result.visitors).toBe(200);
  });
});
