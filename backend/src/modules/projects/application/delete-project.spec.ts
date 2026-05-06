import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProject } from './delete-project';
import { Project } from '../domain/entities/project';
import { IProjectRepository } from '../domain/repositories/i-project-repository';

describe('DeleteProject', () => {
  let service: DeleteProject;
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
        DeleteProject,
        {
          provide: 'IProjectRepository',
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<DeleteProject>(DeleteProject);
    mockRepository = module.get('IProjectRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete a project', async () => {
    const existingProject = new Project(
      '1',
      'Title',
      'Desc',
      ['Tech'],
      'github',
      'live',
      new Date(),
    );

    mockRepository.findById.mockResolvedValue(existingProject);
    mockRepository.delete.mockResolvedValue(undefined);

    await expect(service.execute('1')).resolves.toBeUndefined();

    expect(mockRepository.findById).toHaveBeenCalledWith('1');
    expect(mockRepository.delete).toHaveBeenCalledWith('1');
  });

  it('should throw error if project not found', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(service.execute('1')).rejects.toThrow('Project not found');
  });
});