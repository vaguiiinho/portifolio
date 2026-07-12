import { Test, TestingModule } from '@nestjs/testing';
import { CreateProject } from './create-project';
import { ID_GENERATOR, PROJECT_REPOSITORY } from '../../../shared/domain/tokens';
import { Project } from '../domain/entities/project';
import { IProjectRepository } from '../domain/repositories/i-project-repository';

describe('CreateProject', () => {
  let service: CreateProject;
  let mockRepository: jest.Mocked<IProjectRepository>;
  const idGenerator = { generate: jest.fn(() => 'project-id') };

  beforeEach(async () => {
    const mockRepo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProject,
        {
          provide: PROJECT_REPOSITORY,
          useValue: mockRepo,
        },
        {
          provide: ID_GENERATOR,
          useValue: idGenerator,
        },
      ],
    }).compile();

    service = module.get<CreateProject>(CreateProject);
    mockRepository = module.get(PROJECT_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a project', async () => {
    const input = {
      title: 'Test Project',
      description: 'A test project',
      techStack: ['TypeScript', 'NestJS'],
      githubUrl: 'https://github.com/test',
      liveUrl: 'https://live.com',
      featured: true,
    };

    const mockProject = new Project(
      '123',
      input.title,
      input.description,
      input.techStack,
      input.githubUrl,
      input.liveUrl,
      new Date(),
      true,
    );

    mockRepository.create.mockResolvedValue(mockProject);

    const result = await service.execute(input);

    expect(mockRepository.create).toHaveBeenCalled();
    expect(idGenerator.generate).toHaveBeenCalled();
    expect(result).toBe(mockProject);
    expect(result.title).toBe(input.title);
    expect(result.featured).toBe(true);
  });

  it('should create project with empty urls if not provided', async () => {
    const input = {
      title: 'Test Project',
      description: 'A test project',
      techStack: ['TypeScript'],
    };

    const mockProject = new Project(
      '123',
      input.title,
      input.description,
      input.techStack,
      '',
      '',
      new Date(),
    );

    mockRepository.create.mockResolvedValue(mockProject);

    const result = await service.execute(input);

    expect(result.githubUrl).toBe('');
    expect(result.liveUrl).toBe('');
  });
});
