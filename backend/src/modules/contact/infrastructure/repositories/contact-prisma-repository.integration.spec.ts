import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';
import { ContactPrismaRepository } from './contact-prisma-repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Contact } from '../../domain/entities/contact';

describe('ContactPrismaRepository (Integration)', () => {
  let container: StartedPostgreSqlContainer;
  let prismaService: PrismaService;
  let repository: ContactPrismaRepository;

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
    repository = new ContactPrismaRepository(prismaService);
  }, 60000);

  afterAll(async () => {
    await prismaService.$disconnect();
    await container.stop();
  });

  beforeEach(async () => {
    // Clean up database
    await prismaService.contact.deleteMany();
  });

  it('should create and find a contact', async () => {
    const contact = new Contact(
      '1',
      'John Doe',
      'john@example.com',
      'Hello',
      new Date(),
    );

    const created = await repository.create(contact);
    expect(created.id).toBe('1');
    expect(created.name).toBe('John Doe');

    const found = await repository.findById('1');
    expect(found).toBeTruthy();
    expect(found!.name).toBe('John Doe');
  });

  it('should find all contacts', async () => {
    const contact1 = new Contact('1', 'John', 'john@example.com', 'Msg1', new Date());
    const contact2 = new Contact('2', 'Jane', 'jane@example.com', 'Msg2', new Date());

    await repository.create(contact1);
    await repository.create(contact2);

    const all = await repository.findAll();
    expect(all).toHaveLength(2);
    expect(all.map(c => c.name)).toEqual(['John', 'Jane']);
  });

  it('should update a contact', async () => {
    const contact = new Contact('1', 'Old Name', 'old@example.com', 'Msg', new Date());
    await repository.create(contact);

    const updatedContact = new Contact('1', 'New Name', 'new@example.com', 'Msg', new Date());
    const result = await repository.update(updatedContact);

    expect(result.name).toBe('New Name');
  });

  it('should delete a contact', async () => {
    const contact = new Contact('1', 'Name', 'email@example.com', 'Msg', new Date());
    await repository.create(contact);

    await repository.delete('1');

    const found = await repository.findById('1');
    expect(found).toBeNull();
  });

  it('should return null for non-existent contact', async () => {
    const found = await repository.findById('non-existent');
    expect(found).toBeNull();
  });
});