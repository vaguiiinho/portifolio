import { Test, TestingModule } from '@nestjs/testing';
import { ListProjects } from './list-projects';
import { PROJECT_REPOSITORY } from '../../../shared/domain/tokens';
import { Project } from '../domain/entities/project';
import { IProjectRepository } from '../domain/repositories/i-project-repository';

describe('ListProjects', () => {
  let service: ListProjects;
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
        ListProjects,
        {
          provide: PROJECT_REPOSITORY,
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ListProjects>(ListProjects);
    mockRepository = module.get(PROJECT_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all projects', async () => {
    const mockProjects = [
      new Project(
        '1',
        'Project 1',
        'Desc 1',
        ['Tech1'],
        'url1',
        'url2',
        new Date(),
      ),
      new Project(
        '2',
        'Project 2',
        'Desc 2',
        ['Tech2'],
        'url3',
        'url4',
        new Date(),
      ),
    ];

    mockRepository.findAll.mockResolvedValue(mockProjects);

    const result = await service.execute();

    expect(mockRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockProjects.map((project) => project.toJSON()));
  });
});
