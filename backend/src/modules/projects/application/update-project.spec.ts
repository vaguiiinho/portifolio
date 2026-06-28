import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProject } from './update-project';
import { Project } from '../domain/entities/project';
import { IProjectRepository } from '../domain/repositories/i-project-repository';

describe('UpdateProject', () => {
  let service: UpdateProject;
  let mockRepository: jest.Mocked<IProjectRepository>;

  beforeEach(async () => {
    const mockRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProject,
        {
          provide: 'IProjectRepository',
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<UpdateProject>(UpdateProject);
    mockRepository = module.get('IProjectRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a project', async () => {
    const existingProject = new Project(
      '1',
      'Old Title',
      'Old Desc',
      ['Old Tech'],
      'old-github',
      'old-live',
      new Date(),
    );

    const input = {
      id: '1',
      title: 'New Title',
      description: 'New Desc',
      techStack: ['New Tech'],
    };

    const updatedProject = new Project(
      '1',
      'New Title',
      'New Desc',
      ['New Tech'],
      'old-github',
      'old-live',
      existingProject.createdAt,
    );

    mockRepository.findById.mockResolvedValue(existingProject);
    mockRepository.update.mockResolvedValue(updatedProject);

    const result = await service.execute(input);

    expect(mockRepository.findById).toHaveBeenCalledWith('1');
    expect(mockRepository.update).toHaveBeenCalled();
    expect(result.title).toBe('New Title');
  });

  it('should throw error if project not found', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(service.execute({ id: '1' })).rejects.toThrow(
      'Project not found',
    );
  });

  it('should keep existing values if not provided', async () => {
    const existingProject = new Project(
      '1',
      'Title',
      'Desc',
      ['Tech'],
      'github',
      'live',
      new Date(),
    );

    const updatedProject = new Project(
      '1',
      'New Title',
      'Desc',
      ['Tech'],
      'github',
      'live',
      existingProject.createdAt,
    );

    mockRepository.findById.mockResolvedValue(existingProject);
    mockRepository.update.mockResolvedValue(updatedProject);

    const result = await service.execute({ id: '1', title: 'New Title' });

    expect(result.description).toBe('Desc');
    expect(result.techStack).toEqual(['Tech']);
  });
});
