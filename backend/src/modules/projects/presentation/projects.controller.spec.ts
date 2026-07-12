import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { CreateProject } from '../application/create-project';
import { ListProjects } from '../application/list-projects';
import { UpdateProject } from '../application/update-project';
import { DeleteProject } from '../application/delete-project';
import { IProjectRepository } from '../domain/repositories/i-project-repository';
import { Project } from '../domain/entities/project';
import { AuthGuard } from '../../auth/presentation/guards/auth.guard';
import { RolesGuard } from '../../auth/presentation/guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { PROJECT_REPOSITORY, TOKEN_SERVICE } from '../../../shared/domain/tokens';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let mockCreateProject: jest.Mocked<CreateProject>;
  let mockListProjects: jest.Mocked<ListProjects>;
  let mockUpdateProject: jest.Mocked<UpdateProject>;
  let mockDeleteProject: jest.Mocked<DeleteProject>;
  let mockRepository: jest.Mocked<IProjectRepository>;

  beforeEach(async () => {
    const mockCreate = { execute: jest.fn() };
    const mockList = { execute: jest.fn() };
    const mockUpdate = { execute: jest.fn() };
    const mockDelete = { execute: jest.fn() };
    const mockRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    const mockTokenService = {
      sign: jest.fn(),
      verify: jest.fn(),
    };
    const mockReflector = {
      getAllAndOverride: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        { provide: CreateProject, useValue: mockCreate },
        { provide: ListProjects, useValue: mockList },
        { provide: UpdateProject, useValue: mockUpdate },
        { provide: DeleteProject, useValue: mockDelete },
        { provide: PROJECT_REPOSITORY, useValue: mockRepo },
        { provide: TOKEN_SERVICE, useValue: mockTokenService },
        { provide: Reflector, useValue: mockReflector },
        AuthGuard,
        RolesGuard,
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    mockCreateProject = module.get(CreateProject);
    mockListProjects = module.get(ListProjects);
    mockUpdateProject = module.get(UpdateProject);
    mockDeleteProject = module.get(DeleteProject);
    mockRepository = module.get(PROJECT_REPOSITORY);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return projects', async () => {
      const mockProjects = [
        new Project('1', 'Title', 'Desc', ['Tech'], '', '', new Date()),
      ];
      mockListProjects.execute.mockResolvedValue(mockProjects);

      const result = await controller.list();

      expect(mockListProjects.execute).toHaveBeenCalled();
      expect(result).toBe(mockProjects);
    });
  });

  describe('findById', () => {
    it('should return project if found', async () => {
      const mockProject = new Project(
        '1',
        'Title',
        'Desc',
        ['Tech'],
        '',
        '',
        new Date(),
      );
      mockRepository.findById.mockResolvedValue(mockProject);

      const result = await controller.findById('1');

      expect(mockRepository.findById).toHaveBeenCalledWith('1');
      expect(result).toBe(mockProject);
    });

    it('should throw NotFoundException if not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(controller.findById('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create project', async () => {
      const dto = { title: 'Title', description: 'Desc', techStack: ['Tech'] };
      const mockProject = new Project(
        '1',
        'Title',
        'Desc',
        ['Tech'],
        '',
        '',
        new Date(),
      );
      mockCreateProject.execute.mockResolvedValue(mockProject);

      const result = await controller.create(dto);

      expect(mockCreateProject.execute).toHaveBeenCalledWith(dto);
      expect(result).toBe(mockProject);
    });
  });

  describe('update', () => {
    it('should update project', async () => {
      const dto = { title: 'New Title' };
      const mockProject = new Project(
        '1',
        'New Title',
        'Desc',
        ['Tech'],
        '',
        '',
        new Date(),
      );
      mockUpdateProject.execute.mockResolvedValue(mockProject);

      const result = await controller.update('1', dto);

      expect(mockUpdateProject.execute).toHaveBeenCalledWith({
        id: '1',
        ...dto,
      });
      expect(result).toBe(mockProject);
    });
  });

  describe('delete', () => {
    it('should delete project', async () => {
      mockDeleteProject.execute.mockResolvedValue(undefined);

      const result = await controller.delete('1');

      expect(mockDeleteProject.execute).toHaveBeenCalledWith('1');
      expect(result).toBeUndefined();
    });
  });
});
