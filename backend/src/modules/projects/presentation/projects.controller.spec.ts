import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { CreateProject } from '../application/create-project';
import { ListProjects } from '../application/list-projects';
import { FindProject } from '../application/find-project';
import { UpdateProject } from '../application/update-project';
import { DeleteProject } from '../application/delete-project';
import { AuthGuard } from '../../auth/presentation/guards/auth.guard';
import { RolesGuard } from '../../auth/presentation/guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { TOKEN_SERVICE } from '../../../shared/domain/tokens';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let mockCreateProject: jest.Mocked<CreateProject>;
  let mockListProjects: jest.Mocked<ListProjects>;
  let mockFindProject: jest.Mocked<FindProject>;
  let mockUpdateProject: jest.Mocked<UpdateProject>;
  let mockDeleteProject: jest.Mocked<DeleteProject>;

  beforeEach(async () => {
    const mockCreate = { execute: jest.fn() };
    const mockList = { execute: jest.fn() };
    const mockFind = { execute: jest.fn() };
    const mockUpdate = { execute: jest.fn() };
    const mockDelete = { execute: jest.fn() };
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
        { provide: FindProject, useValue: mockFind },
        { provide: UpdateProject, useValue: mockUpdate },
        { provide: DeleteProject, useValue: mockDelete },
        { provide: TOKEN_SERVICE, useValue: mockTokenService },
        { provide: Reflector, useValue: mockReflector },
        AuthGuard,
        RolesGuard,
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    mockCreateProject = module.get(CreateProject);
    mockListProjects = module.get(ListProjects);
    mockFindProject = module.get(FindProject);
    mockUpdateProject = module.get(UpdateProject);
    mockDeleteProject = module.get(DeleteProject);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return projects', async () => {
      const mockProjects = [
        { id: '1', title: 'Title', description: 'Desc', techStack: ['Tech'], githubUrl: '', liveUrl: '', featured: false, createdAt: new Date() },
      ];
      mockListProjects.execute.mockResolvedValue(mockProjects);

      const result = await controller.list();

      expect(mockListProjects.execute).toHaveBeenCalled();
      expect(result).toBe(mockProjects);
    });
  });

  describe('findById', () => {
    it('should return project if found', async () => {
      const mockProject = { id: '1', title: 'Title', description: 'Desc', techStack: ['Tech'], githubUrl: '', liveUrl: '', featured: false, createdAt: new Date() };
      mockFindProject.execute.mockResolvedValue(mockProject);

      const result = await controller.findById('1');

      expect(mockFindProject.execute).toHaveBeenCalledWith('1');
      expect(result).toBe(mockProject);
    });

    it('should propagate a not found error', async () => {
      mockFindProject.execute.mockRejectedValue(new Error('Project not found'));

      await expect(controller.findById('1')).rejects.toThrow('Project not found');
    });
  });

  describe('create', () => {
    it('should create project', async () => {
      const dto = { title: 'Title', description: 'Desc', techStack: ['Tech'] };
      const mockProject = { id: '1', title: 'Title', description: 'Desc', techStack: ['Tech'], githubUrl: '', liveUrl: '', featured: false, createdAt: new Date() };
      mockCreateProject.execute.mockResolvedValue(mockProject);

      const result = await controller.create(dto);

      expect(mockCreateProject.execute).toHaveBeenCalledWith(dto);
      expect(result).toBe(mockProject);
    });
  });

  describe('update', () => {
    it('should update project', async () => {
      const dto = { title: 'New Title' };
      const mockProject = { id: '1', title: 'New Title', description: 'Desc', techStack: ['Tech'], githubUrl: '', liveUrl: '', featured: false, createdAt: new Date() };
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
