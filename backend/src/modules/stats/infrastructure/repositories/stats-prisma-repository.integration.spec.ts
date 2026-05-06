import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';
import { StatsPrismaRepository } from './stats-prisma-repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Stats } from '../../domain/entities/stats';

describe('StatsPrismaRepository (Integration)', () => {
  let container: StartedPostgreSqlContainer;
  let prismaService: PrismaService;
  let repository: StatsPrismaRepository;

  beforeAll(async () => {
    // Start PostgreSQL container
    container = await new PostgreSqlContainer().start();

    // Set DATABASE_URL for Prisma
    process.env.DATABASE_URL = container.getConnectionUri();

    // Run Prisma migrations
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });

    // Create PrismaService
    prismaService = new PrismaService();

    // Create repository
    repository = new StatsPrismaRepository(prismaService);
  }, 60000);

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